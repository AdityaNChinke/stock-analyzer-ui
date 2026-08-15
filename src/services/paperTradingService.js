/**
 * Paper Trading / Virtual Portfolio Service
 * Allows users to practice swing trading with a simulated ₹1,00,000 balance and track live P&L.
 * 100% Free - Persisted in browser localStorage.
 */

const STORAGE_KEY = 'stock_analyzer_paper_portfolio_v1';
const INITIAL_CASH = 100000.00; // ₹1,00,000.00 Initial Virtual Cash

const getDefaultPortfolio = () => ({
  cashBalance: INITIAL_CASH,
  positions: [
    {
      id: 'pos_init_1',
      symbol: 'TRENT',
      companyName: 'Trent Limited (Zudio/Westside)',
      shares: 4,
      buyPrice: 6250.00,
      buyDate: '2026-08-01',
      targetPrice: 7500.00,
      stopLoss: 5950.00,
      notes: 'Bullish breakout swing entry',
    },
    {
      id: 'pos_init_2',
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd.',
      shares: 20,
      buyPrice: 1260.00,
      buyDate: '2026-08-05',
      targetPrice: 1440.00,
      stopLoss: 1210.00,
      notes: 'EMA 20 bounce after bonus consolidation',
    },
  ],
  tradeHistory: [
    {
      id: 'trade_hist_1',
      symbol: 'ZOMATO',
      companyName: 'Zomato Limited (Blinkit)',
      shares: 100,
      buyPrice: 235.00,
      buyDate: '2026-07-15',
      sellPrice: 265.00,
      sellDate: '2026-08-10',
      realizedPnl: 3000.00,
      realizedPnlPercent: 12.77,
      outcome: 'WIN (Target Hit)',
      durationDays: 26,
    },
    {
      id: 'trade_hist_2',
      symbol: 'TATAMOTORS',
      companyName: 'Tata Motors Passenger & EV',
      shares: 25,
      buyPrice: 960.00,
      buyDate: '2026-07-20',
      sellPrice: 1060.00,
      sellDate: '2026-08-08',
      realizedPnl: 2500.00,
      realizedPnlPercent: 10.42,
      outcome: 'WIN (Target Hit)',
      durationDays: 19,
    },
  ],
});

export const getPortfolio = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const def = getDefaultPortfolio();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
      return def;
    }
    return JSON.parse(data);
  } catch {
    return getDefaultPortfolio();
  }
};

export const savePortfolio = (portfolio) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    window.dispatchEvent(new Event('portfolio-updated'));
  } catch (err) {
    console.error('Failed to save paper portfolio', err);
  }
};

/**
 * Buy stock with virtual cash
 */
export const buyStock = ({ symbol, companyName, shares, currentPrice, targetPrice, stopLoss, notes = '' }) => {
  const portfolio = getPortfolio();
  const numShares = Number(shares);
  const price = Number(currentPrice);
  const totalCost = numShares * price;

  if (totalCost > portfolio.cashBalance) {
    throw new Error(`Insufficient virtual cash! Required: ₹${totalCost.toLocaleString('en-IN')}, Available: ₹${portfolio.cashBalance.toLocaleString('en-IN')}`);
  }

  portfolio.cashBalance -= totalCost;
  const newPosition = {
    id: `pos_${Date.now()}`,
    symbol: symbol.toUpperCase(),
    companyName: companyName || `${symbol} Ltd.`,
    shares: numShares,
    buyPrice: price,
    buyDate: new Date().toISOString().split('T')[0],
    targetPrice: Number(targetPrice || price * 1.10),
    stopLoss: Number(stopLoss || price * 0.955),
    notes,
  };

  portfolio.positions.unshift(newPosition);
  savePortfolio(portfolio);
  return { success: true, position: newPosition, newBalance: portfolio.cashBalance };
};

/**
 * Sell an existing position and record in trade history
 */
export const sellStock = (positionId, currentPrice) => {
  const portfolio = getPortfolio();
  const index = portfolio.positions.findIndex((p) => p.id === positionId);

  if (index === -1) {
    throw new Error('Position not found');
  }

  const pos = portfolio.positions[index];
  const sellPrice = Number(currentPrice || pos.buyPrice);
  const totalProceeds = pos.shares * sellPrice;
  const totalCost = pos.shares * pos.buyPrice;
  const realizedPnl = totalProceeds - totalCost;
  const realizedPnlPercent = ((sellPrice - pos.buyPrice) / pos.buyPrice) * 100;

  const buyD = new Date(pos.buyDate);
  const nowD = new Date();
  const diffDays = Math.max(1, Math.round((nowD - buyD) / (1000 * 60 * 60 * 24)));

  const isWin = realizedPnl >= 0;
  const outcome = isWin
    ? (sellPrice >= pos.targetPrice ? 'WIN (Target Hit)' : 'WIN (Profit Taken)')
    : (sellPrice <= pos.stopLoss ? 'LOSS (Stop Hit)' : 'LOSS (Exited)');

  const closedTrade = {
    id: `trade_${Date.now()}`,
    symbol: pos.symbol,
    companyName: pos.companyName,
    shares: pos.shares,
    buyPrice: pos.buyPrice,
    buyDate: pos.buyDate,
    sellPrice,
    sellDate: new Date().toISOString().split('T')[0],
    realizedPnl: Number(realizedPnl.toFixed(2)),
    realizedPnlPercent: Number(realizedPnlPercent.toFixed(2)),
    outcome,
    durationDays: diffDays,
  };

  portfolio.cashBalance += totalProceeds;
  portfolio.positions.splice(index, 1);
  portfolio.tradeHistory.unshift(closedTrade);

  savePortfolio(portfolio);
  return { success: true, closedTrade, newBalance: portfolio.cashBalance };
};

/**
 * Reset portfolio back to initial ₹1,00,000 cash balance
 */
export const resetPortfolio = () => {
  const def = {
    cashBalance: INITIAL_CASH,
    positions: [],
    tradeHistory: [],
  };
  savePortfolio(def);
  return def;
};

/**
 * Computes live portfolio metrics against latest prices
 */
export const computePortfolioSummary = (portfolio, livePricesMap = {}) => {
  let totalInvested = 0;
  let currentHoldingsValue = 0;

  const enrichedPositions = (portfolio.positions || []).map((pos) => {
    const livePrice = livePricesMap[pos.symbol] || pos.buyPrice;
    const invested = pos.shares * pos.buyPrice;
    const currentValue = pos.shares * livePrice;
    const pnl = currentValue - invested;
    const pnlPercent = ((livePrice - pos.buyPrice) / pos.buyPrice) * 100;

    totalInvested += invested;
    currentHoldingsValue += currentValue;

    return {
      ...pos,
      currentPrice: livePrice,
      currentValue: Number(currentValue.toFixed(2)),
      pnl: Number(pnl.toFixed(2)),
      pnlPercent: Number(pnlPercent.toFixed(2)),
    };
  });

  const totalPortfolioValue = portfolio.cashBalance + currentHoldingsValue;
  const unrealizedPnl = currentHoldingsValue - totalInvested;
  const unrealizedPnlPercent = totalInvested > 0 ? (unrealizedPnl / totalInvested) * 100 : 0;

  const totalClosedTrades = (portfolio.tradeHistory || []).length;
  const winningTrades = (portfolio.tradeHistory || []).filter((t) => t.realizedPnl > 0).length;
  const winRate = totalClosedTrades > 0 ? Math.round((winningTrades / totalClosedTrades) * 100) : 0;
  const totalRealizedPnl = (portfolio.tradeHistory || []).reduce((sum, t) => sum + t.realizedPnl, 0);

  return {
    cashBalance: Number(portfolio.cashBalance.toFixed(2)),
    totalInvested: Number(totalInvested.toFixed(2)),
    currentHoldingsValue: Number(currentHoldingsValue.toFixed(2)),
    totalPortfolioValue: Number(totalPortfolioValue.toFixed(2)),
    unrealizedPnl: Number(unrealizedPnl.toFixed(2)),
    unrealizedPnlPercent: Number(unrealizedPnlPercent.toFixed(2)),
    totalRealizedPnl: Number(totalRealizedPnl.toFixed(2)),
    winRate,
    totalTrades: totalClosedTrades + enrichedPositions.length,
    closedTradesCount: totalClosedTrades,
    openPositionsCount: enrichedPositions.length,
    positions: enrichedPositions,
    tradeHistory: portfolio.tradeHistory || [],
  };
};

export const getPaperTradingAccount = getPortfolio;

