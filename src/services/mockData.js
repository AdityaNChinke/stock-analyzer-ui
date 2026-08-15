/**
 * Indian Equities (NSE / BSE / NIFTY 50) Full Dataset
 */

export const INDIAN_SYMBOLS = [
  'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'BHARTIARTL', 'SBIN', 'ITC', 'LT', 'TATAMOTORS',
  'BAJFINANCE', 'SUNPHARMA', 'MARUTI', 'WIPRO', 'TITAN', 'KOTAKBANK', 'AXISBANK', 'HINDUNILVR', 'NTPC',
  'POWERGRID', 'ONGC', 'BPCL', 'COALINDIA', 'HCLTECH', 'TECHM', 'LTIM', 'INDUSINDBK', 'BAJAJFINSV',
  'HDFCLIFE', 'SBILIFE', 'M&M', 'BAJAJ-AUTO', 'EICHERMOT', 'HEROMOTOCO', 'NESTLEIND', 'BRITANNIA',
  'TATACONSUM', 'TATASTEEL', 'JSWSTEEL', 'HINDALCO', 'ULTRACEMCO', 'GRASIM', 'CIPLA', 'DRREDDY',
  'APOLLOHOSP', 'DIVISLAB', 'ASIANPAINT', 'TRENT', 'ZOMATO', 'ADANIENT', 'ADANIPORTS'
];

export const isIndianStock = (item) => {
  if (!item) return false;
  const symbol = (typeof item === 'string' ? item : item.symbol || item.stock || '').toUpperCase();
  const exchange = (item.exchange || '').toUpperCase();
  if (exchange === 'NSE' || exchange === 'BSE') return true;
  return INDIAN_SYMBOLS.includes(symbol);
};

export const MOCK_STOCKS = [
  { id: 1, symbol: 'RELIANCE', companyName: 'Reliance Industries Ltd.', sector: 'Energy & Petrochemicals', exchange: 'NSE', price: 1310.00, change: 17.00, changePercent: 1.31, volume: '6.4M', marketCap: '₹17.7L Cr' },
  { id: 2, symbol: 'TCS', companyName: 'Tata Consultancy Services Ltd.', sector: 'Information Technology', exchange: 'NSE', price: 4221.96, change: 35.20, changePercent: 0.84, volume: '2.1M', marketCap: '₹15.2L Cr' },
  { id: 3, symbol: 'HDFCBANK', companyName: 'HDFC Bank Limited', sector: 'Banking & Financial Services', exchange: 'NSE', price: 1747.89, change: 22.40, changePercent: 1.30, volume: '14.8M', marketCap: '₹13.3L Cr' },
  { id: 4, symbol: 'INFY', companyName: 'Infosys Limited', sector: 'Information Technology', exchange: 'NSE', price: 1958.96, change: 28.10, changePercent: 1.45, volume: '7.3M', marketCap: '₹8.1L Cr' },
  { id: 5, symbol: 'ICICIBANK', companyName: 'ICICI Bank Limited', sector: 'Banking & Financial Services', exchange: 'NSE', price: 1245.30, change: 14.20, changePercent: 1.15, volume: '9.5M', marketCap: '₹8.7L Cr' },
  { id: 6, symbol: 'BHARTIARTL', companyName: 'Bharti Airtel Limited', sector: 'Telecommunications', exchange: 'NSE', price: 1540.60, change: 24.80, changePercent: 1.63, volume: '5.2M', marketCap: '₹8.9L Cr' },
  { id: 7, symbol: 'SBIN', companyName: 'State Bank of India', sector: 'Banking & Financial Services', exchange: 'NSE', price: 845.20, change: -4.30, changePercent: -0.51, volume: '18.2M', marketCap: '₹7.5L Cr' },
  { id: 8, symbol: 'ITC', companyName: 'ITC Limited', sector: 'FMCG & Consumer Goods', exchange: 'NSE', price: 495.40, change: 3.10, changePercent: 0.63, volume: '11.4M', marketCap: '₹6.2L Cr' },
  { id: 9, symbol: 'LT', companyName: 'Larsen & Toubro Limited', sector: 'Engineering & Infrastructure', exchange: 'NSE', price: 3680.50, change: 48.00, changePercent: 1.32, volume: '1.9M', marketCap: '₹5.1L Cr' },
  { id: 10, symbol: 'TATAMOTORS', companyName: 'Tata Motors Passenger & EV', sector: 'Automobile', exchange: 'NSE', price: 1065.80, change: 18.20, changePercent: 1.74, volume: '8.7M', marketCap: '₹3.9L Cr' },
  { id: 11, symbol: 'BAJFINANCE', companyName: 'Bajaj Finance Limited', sector: 'Banking & Financial Services', exchange: 'NSE', price: 6920.00, change: -42.00, changePercent: -0.60, volume: '1.1M', marketCap: '₹4.3L Cr' },
  { id: 12, symbol: 'SUNPHARMA', companyName: 'Sun Pharmaceutical Industries', sector: 'Healthcare & Pharma', exchange: 'NSE', price: 1780.25, change: 19.50, changePercent: 1.11, volume: '2.4M', marketCap: '₹4.2L Cr' },
  { id: 13, symbol: 'TRENT', companyName: 'Trent Limited (Zudio/Westside)', sector: 'Retail & Consumer', exchange: 'NSE', price: 6850.00, change: 142.00, changePercent: 2.12, volume: '1.8M', marketCap: '₹2.4L Cr' },
  { id: 14, symbol: 'ZOMATO', companyName: 'Zomato Limited (Blinkit)', sector: 'Consumer Internet', exchange: 'NSE', price: 265.40, change: 7.80, changePercent: 3.03, volume: '32.4M', marketCap: '₹2.3L Cr' },
  { id: 15, symbol: 'MARUTI', companyName: 'Maruti Suzuki India Limited', sector: 'Automobile', exchange: 'NSE', price: 12250.00, change: 185.00, changePercent: 1.53, volume: '0.8M', marketCap: '₹3.8L Cr' },
  { id: 16, symbol: 'TITAN', companyName: 'Titan Company Limited', sector: 'Consumer Discretionary', exchange: 'NSE', price: 3480.00, change: 38.00, changePercent: 1.10, volume: '1.2M', marketCap: '₹3.1L Cr' },
  { id: 17, symbol: 'M&M', companyName: 'Mahindra & Mahindra Limited', sector: 'Automobile', exchange: 'NSE', price: 2890.00, change: 44.00, changePercent: 1.55, volume: '3.1M', marketCap: '₹3.5L Cr' },
  { id: 18, symbol: 'NTPC', companyName: 'NTPC Limited', sector: 'Power & Energy', exchange: 'NSE', price: 385.40, change: 4.80, changePercent: 1.26, volume: '12.8M', marketCap: '₹3.7L Cr' },
  { id: 19, symbol: 'POWERGRID', companyName: 'Power Grid Corp of India', sector: 'Power & Energy', exchange: 'NSE', price: 315.60, change: 2.80, changePercent: 0.90, volume: '9.4M', marketCap: '₹2.9L Cr' },
  { id: 20, symbol: 'ONGC', companyName: 'Oil & Natural Gas Corp Ltd.', sector: 'Energy & Petrochemicals', exchange: 'NSE', price: 242.50, change: 3.10, changePercent: 1.29, volume: '14.2M', marketCap: '₹3.0L Cr' },
  { id: 21, symbol: 'WIPRO', companyName: 'Wipro Limited', sector: 'Information Technology', exchange: 'NSE', price: 530.20, change: 6.40, changePercent: 1.22, volume: '8.1M', marketCap: '₹2.8L Cr' },
  { id: 22, symbol: 'HCLTECH', companyName: 'HCL Technologies Limited', sector: 'Information Technology', exchange: 'NSE', price: 1785.40, change: 21.00, changePercent: 1.19, volume: '2.6M', marketCap: '₹4.8L Cr' },
  { id: 23, symbol: 'TECHM', companyName: 'Tech Mahindra Limited', sector: 'Information Technology', exchange: 'NSE', price: 1540.80, change: 16.50, changePercent: 1.08, volume: '2.1M', marketCap: '₹1.5L Cr' },
  { id: 24, symbol: 'KOTAKBANK', companyName: 'Kotak Mahindra Bank Limited', sector: 'Banking & Financial Services', exchange: 'NSE', price: 1820.50, change: 14.50, changePercent: 0.80, volume: '4.8M', marketCap: '₹3.6L Cr' },
  { id: 25, symbol: 'AXISBANK', companyName: 'Axis Bank Limited', sector: 'Banking & Financial Services', exchange: 'NSE', price: 1195.40, change: 12.00, changePercent: 1.01, volume: '6.9M', marketCap: '₹3.7L Cr' },
  { id: 26, symbol: 'TATASTEEL', companyName: 'Tata Steel Limited', sector: 'Metals & Mining', exchange: 'NSE', price: 154.20, change: 1.80, changePercent: 1.18, volume: '34.2M', marketCap: '₹1.9L Cr' },
  { id: 27, symbol: 'JSWSTEEL', companyName: 'JSW Steel Limited', sector: 'Metals & Mining', exchange: 'NSE', price: 945.00, change: 11.20, changePercent: 1.20, volume: '3.8M', marketCap: '₹2.3L Cr' },
  { id: 28, symbol: 'HINDALCO', companyName: 'Hindalco Industries Limited', sector: 'Metals & Mining', exchange: 'NSE', price: 675.40, change: 9.40, changePercent: 1.41, volume: '7.2M', marketCap: '₹1.5L Cr' },
  { id: 29, symbol: 'ULTRACEMCO', companyName: 'UltraTech Cement Limited', sector: 'Cement & Building Materials', exchange: 'NSE', price: 11420.00, change: 135.00, changePercent: 1.20, volume: '0.4M', marketCap: '₹3.3L Cr' },
  { id: 30, symbol: 'ADANIENT', companyName: 'Adani Enterprises Limited', sector: 'Conglomerate & Infra', exchange: 'NSE', price: 3040.00, change: 48.00, changePercent: 1.60, volume: '2.5M', marketCap: '₹3.5L Cr' },
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: 101,
    symbol: 'TRENT',
    companyName: 'Trent Limited (Zudio / Westside)',
    stock: 'TRENT',
    exchange: 'NSE',
    recommendation: 'BUY',
    confidenceScore: 96.0,
    currentPrice: 6850.00,
    targetPrice: 7535.00,
    stopLoss: 6540.00,
    reason: 'Multi-week institutional accumulation with EMA20 crossing sharply above EMA50 and RSI in the strong 60.4 zone.',
    createdAt: '2026-08-15T09:30:00Z',
    date: '2026-08-15',
    sector: 'Retail & Consumer',
    timeframe: 'Swing (2-4 Weeks)',
    riskRewardRatio: '2.21:1',
  },
  {
    id: 102,
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd.',
    stock: 'RELIANCE',
    exchange: 'NSE',
    recommendation: 'BUY',
    confidenceScore: 94.0,
    currentPrice: 1310.00,
    targetPrice: 1441.00,
    stopLoss: 1251.00,
    reason: 'Bullish momentum setup on NSE. Trading above EMA20 (₹1,285.00) and EMA50 (₹1,260.00) with RSI at 61.4 and institutional accumulation.',
    createdAt: '2026-08-15T09:30:00Z',
    date: '2026-08-15',
    sector: 'Energy & Petrochemicals',
    timeframe: 'Swing (2-4 Weeks)',
    riskRewardRatio: '2.22:1',
  },
  {
    id: 103,
    symbol: 'ZOMATO',
    companyName: 'Zomato Limited (Blinkit)',
    stock: 'ZOMATO',
    exchange: 'NSE',
    recommendation: 'BUY',
    confidenceScore: 92.0,
    currentPrice: 265.40,
    targetPrice: 292.00,
    stopLoss: 253.50,
    reason: 'Quick commerce Blinkit hyper-growth. RSI at 58.2 in prime accumulation zone with expanding green MACD momentum.',
    createdAt: '2026-08-15T10:00:00Z',
    date: '2026-08-15',
    sector: 'Consumer Internet',
    timeframe: 'Swing (1-3 Weeks)',
    riskRewardRatio: '2.24:1',
  },
  {
    id: 104,
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services Ltd.',
    stock: 'TCS',
    exchange: 'NSE',
    recommendation: 'BUY',
    confidenceScore: 91.0,
    currentPrice: 4221.96,
    targetPrice: 4580.00,
    stopLoss: 4050.00,
    reason: 'Golden cross on IT rally. Robust deal book pipeline driving earnings momentum. MACD histogram expanding in positive territory.',
    createdAt: '2026-08-15T10:15:00Z',
    date: '2026-08-15',
    sector: 'Information Technology',
    timeframe: 'Medium Term',
    riskRewardRatio: '2.08:1',
  },
  {
    id: 105,
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    stock: 'HDFCBANK',
    exchange: 'NSE',
    recommendation: 'BUY',
    confidenceScore: 89.0,
    currentPrice: 1747.89,
    targetPrice: 1920.00,
    stopLoss: 1660.00,
    reason: 'Credit growth turnaround and margin expansion. Price sustained above 50-day moving average with high delivery volumes.',
    createdAt: '2026-08-15T11:00:00Z',
    date: '2026-08-15',
    sector: 'Banking & Financial Services',
    timeframe: 'Swing Trade',
    riskRewardRatio: '1.96:1',
  },
];

export const MOCK_DASHBOARD_SUMMARY = {
  totalStocks: 50,
  buyRecommendations: 34,
  sellRecommendations: 4,
  watchRecommendations: 12,
  marketSentiment: {
    status: 'Strong Bullish Momentum (NIFTY 50)',
    bullishPercent: 82,
  },
  topMovers: [
    { symbol: 'ZOMATO', name: 'Zomato Ltd (Blinkit)', change: '+3.03%', price: '₹265.40', signal: 'BUY' },
    { symbol: 'TRENT', name: 'Trent Ltd (Zudio)', change: '+2.12%', price: '₹6,850.00', signal: 'BUY' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors', change: '+1.74%', price: '₹1,065.80', signal: 'BUY' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', change: '+1.63%', price: '₹1,540.60', signal: 'BUY' },
  ],
  sectorAllocation: [
    { name: 'Banking & Financials', count: 10, value: 32 },
    { name: 'Information Technology', count: 6, value: 20 },
    { name: 'Automobile & Mobility', count: 6, value: 16 },
    { name: 'Energy & Power', count: 6, value: 14 },
    { name: 'Consumer & Retail', count: 8, value: 18 },
  ],
  latestRecommendations: MOCK_RECOMMENDATIONS,
};

export const MOCK_PRICES_RELIANCE = Array.from({ length: 60 }).map((_, i) => {
  const date = new Date(2026, 5, 1);
  date.setDate(date.getDate() + i);
  const base = 1240 + i * 1.2 + (Math.sin(i / 3) * 15);
  const high = base + 12 + Math.random() * 8;
  const low = base - 10 - Math.random() * 5;
  const close = base + (Math.random() * 8 - 4);
  return {
    date: date.toISOString().split('T')[0],
    tradeDate: date.toISOString().split('T')[0],
    open: Number(base.toFixed(2)),
    openPrice: Number(base.toFixed(2)),
    high: Number(high.toFixed(2)),
    highPrice: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    lowPrice: Number(low.toFixed(2)),
    close: Number(close.toFixed(2)),
    closePrice: Number(close.toFixed(2)),
    volume: Math.floor(4000000 + Math.random() * 3000000),
    change: Number((close - base).toFixed(2)),
    changePercent: Number((((close - base) / base) * 100).toFixed(2)),
  };
});

export const MOCK_INDICATORS_RELIANCE = {
  symbol: 'RELIANCE',
  companyName: 'Reliance Industries Ltd.',
  sector: 'Energy & Petrochemicals',
  currentPrice: 1310.00,
  rsi: 61.4,
  rsi14: 61.4,
  ema20: 1285.00,
  ema50: 1260.00,
  macd: {
    macd: 18.2,
    signal: 14.5,
    histogram: 3.7,
  },
  supportLevel: 1251.00,
  resistanceLevel: 1441.00,
  signals: {
    rsiSignal: 'ACCUMULATION_ZONE',
    trendSignal: 'BULLISH_UPTREND',
    macdSignal: 'BULLISH',
    overallSignal: 'BUY',
  },
  history: Array.from({ length: 30 }).map((_, i) => ({
    date: `Day ${i + 1}`,
    rsi: Number((50 + Math.sin(i / 4) * 18 + (i * 0.4)).toFixed(1)),
    ema20: Number((1260 + i * 1.5).toFixed(2)),
    ema50: Number((1245 + i * 1.1).toFixed(2)),
    macd: Number((Math.sin(i / 3) * 8 + i * 0.2).toFixed(2)),
    signal: Number((Math.sin((i - 1) / 3) * 6 + i * 0.15).toFixed(2)),
    histogram: Number((Math.sin(i / 2) * 3).toFixed(2)),
  })),
};

export const MOCK_PERFORMANCE = {
  accuracyRate: 82.4,
  totalTrades: 168,
  winningTrades: 138,
  losingTrades: 30,
  avgProfit: 16.8,
  avgLoss: -4.5,
  profitFactor: 3.12,
  strategyReturn: 54.6,
  benchmarkReturn: 14.8,
  monthlyPerformance: [
    { month: 'Jan', strategy: 6.8, benchmark: 2.1 },
    { month: 'Feb', strategy: 8.2, benchmark: -1.2 },
    { month: 'Mar', strategy: 7.4, benchmark: 1.8 },
    { month: 'Apr', strategy: 9.1, benchmark: 2.4 },
    { month: 'May', strategy: 11.5, benchmark: 3.0 },
    { month: 'Jun', strategy: 8.9, benchmark: 1.5 },
    { month: 'Jul', strategy: 12.4, benchmark: 2.8 },
    { month: 'Aug', strategy: 9.8, benchmark: 2.4 },
  ],
  closedCalls: [
    { id: 1, symbol: 'TRENT', entryPrice: 6150.00, exitPrice: 6850.00, returnPercent: 11.38, outcome: 'WIN (Target Hit)', duration: '12 Days', closedDate: '2026-08-14' },
    { id: 2, symbol: 'ZOMATO', entryPrice: 238.00, exitPrice: 265.00, returnPercent: 11.34, outcome: 'WIN (Target Hit)', duration: '16 Days', closedDate: '2026-08-13' },
    { id: 3, symbol: 'RELIANCE', entryPrice: 1220.00, exitPrice: 1335.00, returnPercent: 9.43, outcome: 'WIN (Target Hit)', duration: '18 Days', closedDate: '2026-08-12' },
    { id: 4, symbol: 'TCS', entryPrice: 3950.00, exitPrice: 4250.00, returnPercent: 7.59, outcome: 'WIN (Target Hit)', duration: '14 Days', closedDate: '2026-08-10' },
    { id: 5, symbol: 'TATAMOTORS', entryPrice: 940.00, exitPrice: 1080.00, returnPercent: 14.89, outcome: 'WIN (Target Hit)', duration: '22 Days', closedDate: '2026-08-08' },
  ],
};
