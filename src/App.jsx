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
import IpoPage from './pages/IpoPage';
import NotFoundPage from './pages/NotFoundPage';
import VoiceLoginPage from './pages/VoiceLoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ROUTES } from './utils/constants';

function AppContent({ mode, toggleTheme }) {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<VoiceLoginPage />} />
      ) : (
        <Route
          element={<MainLayout mode={mode} onToggleTheme={toggleTheme} />}
        >
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.STOCKS} element={<StockListPage />} />
          <Route path={ROUTES.STOCK_DETAIL} element={<StockDetailPage />} />
          <Route path={ROUTES.RECOMMENDATIONS} element={<RecommendationPage />} />
          <Route path={ROUTES.TODAY_RECOMMENDATIONS} element={<TodayRecommendationsPage />} />
          <Route path={ROUTES.IPOS} element={<IpoPage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={ROUTES.PERFORMANCE} element={<PerformancePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      )}
    </Routes>
  );
}

function App() {
  const [mode, setMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('stock_analyzer_theme');
      return savedMode ? savedMode : 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('stock_analyzer_theme', next);
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <AppContent mode={mode} toggleTheme={toggleTheme} />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
