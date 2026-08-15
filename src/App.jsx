import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme';
import ErrorBoundary from './components/common/ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import StockListPage from './pages/StockListPage';
import StockDetailPage from './pages/StockDetailPage';
import RecommendationPage from './pages/RecommendationPage';
import TodayRecommendationsPage from './pages/TodayRecommendationsPage';
import PortfolioPage from './pages/PortfolioPage';
import PerformancePage from './pages/PerformancePage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './utils/constants';

function App() {
  // Theme mode stored in localStorage, defaulting to 'dark'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('stock_analyzer_theme');
    return savedMode ? savedMode : 'dark';
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('stock_analyzer_theme', next);
      return next;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              element={<MainLayout mode={mode} onToggleTheme={toggleTheme} />}
            >
              <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.STOCKS} element={<StockListPage />} />
              <Route path={ROUTES.STOCK_DETAIL} element={<StockDetailPage />} />
              <Route path={ROUTES.RECOMMENDATIONS} element={<RecommendationPage />} />
              <Route path={ROUTES.TODAY_RECOMMENDATIONS} element={<TodayRecommendationsPage />} />
              <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
              <Route path={ROUTES.PERFORMANCE} element={<PerformancePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
