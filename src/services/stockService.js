import apiClient from './api';
import {
  NSE_STOCKS,
  fetchYFChart,
  parseYFHistory,
  calculateTechnicalIndicators,
  getLiveIndianStocks,
  generateBaselinePrices,
} from './yahooFinanceService';
import { MOCK_STOCKS, isIndianStock } from './mockData';

/**
 * Fetch all tracked Indian stocks
 * Endpoint: GET /stocks + Instant YF NSE cache
 * @returns {Promise<Array>}
 */
export const getStocks = async () => {
  // 1. Return live Indian stock list instantly from memory
  try {
    const liveStocks = await getLiveIndianStocks();
    if (liveStocks && liveStocks.length > 0) {
      return liveStocks;
    }
  } catch {
    // Continue to Spring Boot fallback
  }

  // 2. Fall back to Spring Boot local backend
  try {
    const response = await apiClient.get('/stocks');
    const raw = response.data;
    if (Array.isArray(raw)) {
      const indianStocks = raw.filter((s) => isIndianStock(s));
      const listToMap = indianStocks.length > 0 ? indianStocks : raw;

      return listToMap.map((s) => ({
        id: s.id,
        symbol: s.symbol,
        companyName: s.companyName,
        sector: s.sector || s.industry || 'Equities',
        exchange: s.exchange || 'NSE',
        price: s.currentPrice ?? s.price ?? 0,
        changePercent: s.changePercent ?? s.change ?? 0,
        volume: s.volume ? String(s.volume) : '2.5M',
      }));
    }
  } catch {
    // Ignore
  }

  return MOCK_STOCKS;
};

/**
 * Fetch historical prices for a given stock symbol
 * Endpoint: GET /prices/{symbol}
 * @param {string} symbol - e.g. 'RELIANCE'
 * @returns {Promise<Array>}
 */
export const getStockPrices = async (symbol) => {
  if (!symbol) return [];
  const sym = symbol.toUpperCase().replace('.NS', '');
  const meta = NSE_STOCKS.find((s) => s.symbol === sym) || { basePrice: 1500 };

  // 1. Try Live Yahoo Finance NSE
  try {
    const yfResult = await fetchYFChart(sym, '3mo', '1d');
    if (yfResult) {
      const parsed = parseYFHistory(yfResult);
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // Continue
  }

  // 2. Spring Boot backend fallback
  try {
    const response = await apiClient.get(`/prices/${sym}`);
    const raw = response.data;
    if (Array.isArray(raw) && raw.length > 0) {
      const sorted = [...raw].sort((a, b) => new Date(a.tradeDate || a.date) - new Date(b.tradeDate || b.date));
      return sorted.map((p) => ({
        date: p.tradeDate || p.date,
        displayDate: p.tradeDate || p.date,
        close: p.closePrice ?? p.close ?? p.price ?? 0,
        price: p.closePrice ?? p.close ?? p.price ?? 0,
        open: p.openPrice ?? p.open ?? (p.closePrice ?? 0),
        high: p.highPrice ?? p.high ?? Math.max(p.openPrice ?? 0, p.closePrice ?? 0),
        low: p.lowPrice ?? p.low ?? Math.min(p.openPrice ?? 0, p.closePrice ?? 0),
        volume: p.volume ?? 0,
      }));
    }
  } catch {
    // Ignore
  }

  // 3. Guaranteed instant realistic baseline
  return generateBaselinePrices(meta.basePrice, sym);
};

/**
 * Fetch technical indicators (RSI, EMA20, EMA50, MACD)
 * Endpoint: GET /indicators/{symbol}
 * @param {string} symbol - e.g. 'RELIANCE'
 * @returns {Promise<Object>}
 */
export const getStockIndicators = async (symbol) => {
  if (!symbol) return null;
  const sym = symbol.toUpperCase().replace('.NS', '');
  const stockMeta = NSE_STOCKS.find((s) => s.symbol === sym) || {
    companyName: `${sym} Ltd.`,
    sector: 'Equities',
    basePrice: 1500,
  };

  try {
    const prices = await getStockPrices(sym);
    const indicators = calculateTechnicalIndicators(prices);
    return {
      symbol: sym,
      companyName: stockMeta.companyName,
      sector: stockMeta.sector,
      ...indicators,
    };
  } catch (error) {
    console.warn(`[stockService.getStockIndicators] Error for ${symbol}`, error.message);
  }

  const baselinePrices = generateBaselinePrices(stockMeta.basePrice, sym);
  return {
    symbol: sym,
    companyName: stockMeta.companyName,
    sector: stockMeta.sector,
    ...calculateTechnicalIndicators(baselinePrices),
  };
};

/**
 * Helper to fetch a single stock overview
 */
export const getStockBySymbol = async (symbol) => {
  if (!symbol) return null;
  const sym = symbol.toUpperCase().replace('.NS', '');
  try {
    const stocks = await getStocks();
    return stocks.find((s) => s.symbol.toUpperCase() === sym) || null;
  } catch {
    return NSE_STOCKS.find((s) => s.symbol === sym) || null;
  }
};
