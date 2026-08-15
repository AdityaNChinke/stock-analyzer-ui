export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const ROUTES = {
  DASHBOARD: '/dashboard',
  STOCKS: '/stocks',
  STOCK_DETAIL: '/stocks/:symbol',
  RECOMMENDATIONS: '/recommendations',
  TODAY_RECOMMENDATIONS: '/recommendations/today',
  PORTFOLIO: '/portfolio',
  PERFORMANCE: '/performance',
};

export const RECOMMENDATION_TYPES = {
  BUY: 'BUY',
  SELL: 'SELL',
  WATCH: 'WATCH',
  HOLD: 'HOLD',
};

export const RECOMMENDATION_COLORS = {
  BUY: {
    main: '#10b981',
    light: '#d1fae5',
    dark: '#065f46',
    border: 'rgba(16, 185, 129, 0.3)',
    bgDark: 'rgba(16, 185, 129, 0.12)',
  },
  SELL: {
    main: '#ef4444',
    light: '#fee2e2',
    dark: '#991b1b',
    border: 'rgba(239, 68, 68, 0.3)',
    bgDark: 'rgba(239, 68, 68, 0.12)',
  },
  WATCH: {
    main: '#f59e0b',
    light: '#fef3c7',
    dark: '#92400e',
    border: 'rgba(245, 158, 11, 0.3)',
    bgDark: 'rgba(245, 158, 11, 0.12)',
  },
  HOLD: {
    main: '#6366f1',
    light: '#e0e7ff',
    dark: '#3730a3',
    border: 'rgba(99, 102, 241, 0.3)',
    bgDark: 'rgba(99, 102, 241, 0.12)',
  },
};

export const TIMEFRAMES = [
  { label: '1W', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
  { label: 'ALL', value: 'ALL' },
];
