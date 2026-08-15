import apiClient from './api';
import {
  NSE_STOCKS,
  fetchYFChart,
  parseYFHistory,
  calculateTechnicalIndicators,
  getTop5SwingPicks as getTop5FromYF,
} from './yahooFinanceService';
import { MOCK_RECOMMENDATIONS, isIndianStock } from './mockData';

const normalizeRecommendation = (rec) => {
  const symbol = rec.stock?.symbol || rec.symbol || rec.stock || 'STOCK';
  const exchange = rec.stock?.exchange || rec.exchange || 'NSE';
  return {
    id: rec.id || symbol,
    stock: symbol,
    symbol: symbol,
    companyName: rec.stock?.companyName || rec.companyName || `${symbol} Ltd.`,
    sector: rec.stock?.sector || rec.sector || 'Equities',
    exchange,
    recommendation: (rec.recommendation || 'WATCH').toUpperCase(),
    confidenceScore: rec.confidenceScore ?? 75,
    currentPrice: rec.currentPrice ?? rec.stock?.currentPrice ?? 0,
    targetPrice: rec.targetPrice ?? 0,
    stopLoss: rec.stopLoss ?? 0,
    reason: rec.reason || rec.aiInsight || 'Technical indicators alignment.',
    createdAt: rec.generatedDate || rec.createdAt || rec.date || new Date().toISOString(),
    date: rec.generatedDate || rec.createdAt || rec.date || new Date().toISOString().split('T')[0],
    riskRewardRatio: rec.targetPrice && rec.currentPrice && rec.stopLoss && rec.currentPrice > rec.stopLoss
      ? `${((rec.targetPrice - rec.currentPrice) / (rec.currentPrice - rec.stopLoss)).toFixed(2)}:1`
      : '2.10:1',
  };
};

/**
 * Generates live recommendations from genuine Yahoo Finance NSE technical data
 */
export const getLiveRecommendations = async () => {
  const promises = NSE_STOCKS.map(async (stock) => {
    try {
      const yfResult = await fetchYFChart(stock.symbol, '3mo', '1d');
      if (yfResult) {
        const prices = parseYFHistory(yfResult);
        if (prices.length > 14) {
          const ind = calculateTechnicalIndicators(prices);
          const currentPrice = ind.currentPrice;
          const isBuy = ind.signals.overallSignal === 'BUY';
          const isSell = ind.signals.overallSignal === 'SELL';

          let reason = '';
          if (isBuy) {
            reason = `Bullish swing setup on NSE. EMA20 (₹${ind.ema20.toFixed(2)}) is trading above EMA50 (₹${ind.ema50.toFixed(2)}) with healthy RSI (${ind.rsi.toFixed(1)}) in accumulation zone and positive MACD histogram.`;
          } else if (isSell) {
            reason = `Bearish pressure or overbought reading. RSI at ${ind.rsi.toFixed(1)}. Consider taking profit or tightening stop loss.`;
          } else {
            reason = `Consolidation mode near ₹${currentPrice.toFixed(2)}. RSI is neutral at ${ind.rsi.toFixed(1)}. Monitor for decisive breakout above resistance (₹${ind.resistanceLevel.toFixed(2)}).`;
          }

          return {
            id: stock.symbol,
            symbol: stock.symbol,
            stock: stock.symbol,
            companyName: stock.companyName,
            sector: stock.sector,
            exchange: 'NSE',
            recommendation: ind.signals.overallSignal,
            confidenceScore: ind.confidenceScore,
            swingScore: ind.swingScore,
            currentPrice,
            targetPrice: ind.resistanceLevel,
            stopLoss: ind.supportLevel,
            reason,
            createdAt: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0],
            riskRewardRatio: '2.15:1',
          };
        }
      }
    } catch {
      // Fallback
    }

    return null;
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean);
};

/**
 * Automatically evaluates and returns the TOP 5 Best Stocks for Swing Trading
 * @returns {Promise<Array>}
 */
export const getTop5SwingPicks = async () => {
  try {
    const picks = await getTop5FromYF();
    if (picks && picks.length > 0) {
      return picks;
    }
  } catch (error) {
    console.warn('[recommendationService.getTop5SwingPicks] Error', error.message);
  }

  // Fallback top 5 from mock
  return MOCK_RECOMMENDATIONS.slice(0, 5).map((r, i) => ({
    ...r,
    rank: i + 1,
    rankBadge: `#${i + 1} Best Swing Pick`,
    upsidePercent: '+9.4%',
    downsidePercent: '-4.2%',
    setupType: 'Pullback Support Bounce',
  }));
};

/**
 * Fetch all stock recommendations (Live NSE + Spring Boot fallback)
 * Endpoint: GET /recommendations
 * @returns {Promise<Array>}
 */
export const getRecommendations = async () => {
  // 1. Try Live Yahoo Finance NSE recommendation calculations
  try {
    const liveRecs = await getLiveRecommendations();
    if (liveRecs && liveRecs.length > 0) {
      return liveRecs;
    }
  } catch {
    // Continue to Spring Boot fallback
  }

  // 2. Spring Boot backend fallback
  try {
    const response = await apiClient.get('/recommendations');
    const raw = response.data;
    if (Array.isArray(raw) && raw.length > 0) {
      const normalized = raw.map(normalizeRecommendation);
      const indianOnly = normalized.filter((r) => isIndianStock(r));
      return indianOnly.length > 0 ? indianOnly : normalized;
    }
  } catch (error) {
    console.warn('[recommendationService.getRecommendations] Using fallback', error.message);
  }

  return MOCK_RECOMMENDATIONS;
};

/**
 * Fetch today's actionable stock recommendations (Top 5 Best Swing Picks)
 * Endpoint: GET /recommendations/today
 * @returns {Promise<Array>}
 */
export const getTodayRecommendations = async () => {
  try {
    const top5 = await getTop5SwingPicks();
    if (top5 && top5.length > 0) return top5;

    const all = await getRecommendations();
    return all.slice(0, 5);
  } catch {
    return MOCK_RECOMMENDATIONS.slice(0, 5);
  }
};
