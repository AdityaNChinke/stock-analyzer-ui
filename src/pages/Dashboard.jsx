import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ShowChart as StocksIcon,
  TrendingUp as BuyIcon,
  TrendingDown as SellIcon,
  Visibility as WatchIcon,
  ArrowForward as ArrowForwardIcon,
  AutoGraph as SentimentIcon,
  Star as StarIcon,
  CandlestickChart as ChartIcon,
  WorkspacePremium as MedalIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import { getTop5SwingPicks } from '../services/recommendationService';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import RecommendationTable from '../components/recommendations/RecommendationTable';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import StatusChip from '../components/common/StatusChip';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useDashboard();
  const [top5Picks, setTop5Picks] = useState([]);
  const [loadingPicks, setLoadingPicks] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTop5SwingPicks()
      .then((picks) => {
        if (isMounted) {
          setTop5Picks(picks || []);
          setLoadingPicks(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingPicks(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading && !data) {
    return (
      <Box>
        <PageHeader
          title="Indian Market Overview"
          subtitle="Real-time algorithmic stock analysis and swing trading intelligence (NSE/BSE)."
        />
        <LoadingComponent mode="card" count={4} />
        <Box sx={{ mt: 3 }}>
          <LoadingComponent mode="table" count={4} />
        </Box>
      </Box>
    );
  }

  if (error && !data) {
    return (
      <Box>
        <PageHeader
          title="Indian Market Overview"
          subtitle="Real-time algorithmic stock analysis and swing trading intelligence (NSE/BSE)."
        />
        <ErrorComponent
          title="Unable to load dashboard"
          message="Could not connect to the backend server to retrieve summary metrics."
          errorDetails={error}
          onRetry={refetch}
        />
      </Box>
    );
  }

  const {
    totalStocks = 12,
    buyRecommendations = 7,
    sellRecommendations = 1,
    watchRecommendations = 4,
    latestRecommendations = [],
    topMovers = [],
    sectorAllocation = [],
    marketSentiment = { status: 'Bullish Momentum (NIFTY 50)', bullishPercent: 74 },
  } = data || {};

  return (
    <Box>
      {/* Page Header */}
      <PageHeader
        title="Indian Market Overview"
        subtitle="Real-time algorithmic stock analysis and swing trading intelligence (NSE/BSE)."
        onRefresh={refetch}
        refreshing={loading}
        actions={
          <Button
            variant="contained"
            color="primary"
            startIcon={<BuyIcon />}
            onClick={() => navigate(ROUTES.TODAY_RECOMMENDATIONS)}
            sx={{ fontWeight: 700 }}
          >
            Today's Top 5 Picks
          </Button>
        }
      />

      {/* Primary KPI Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        {/* Total Stocks */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="NSE Tracked Equities"
            value={totalStocks}
            subtitle="Actively monitored tickers"
            icon={<StocksIcon />}
            accentColor="#3b82f6"
            badgeText="Live Feeds"
            badgeType="neutral"
            onClick={() => navigate(ROUTES.STOCKS)}
          />
        </Grid>

        {/* Buy Recommendations */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Buy Recommendations"
            value={buyRecommendations}
            subtitle="High conviction swing setups"
            icon={<BuyIcon />}
            accentColor="#10b981"
            badgeText="Bullish Bias"
            badgeType="positive"
            onClick={() => navigate(ROUTES.RECOMMENDATIONS)}
          />
        </Grid>

        {/* Sell Recommendations */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Sell Recommendations"
            value={sellRecommendations}
            subtitle="Overextended / take profit"
            icon={<SellIcon />}
            accentColor="#ef4444"
            badgeText="Bearish Risk"
            badgeType="negative"
            onClick={() => navigate(ROUTES.RECOMMENDATIONS)}
          />
        </Grid>

        {/* Watch Recommendations */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Watchlist Setups"
            value={watchRecommendations}
            subtitle="Testing key levels & setups"
            icon={<WatchIcon />}
            accentColor="#f59e0b"
            badgeText="Monitor"
            badgeType="neutral"
            onClick={() => navigate(ROUTES.RECOMMENDATIONS)}
          />
        </Grid>
      </Grid>

      {/* 🔥 FEATURED SECTION: TOP 5 BEST STOCKS FOR SWING TRADING */}
      <Paper
        sx={{
          p: 3,
          mb: 3.5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MedalIcon sx={{ fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
                🔥 Top 5 Best Stocks for Swing Trading
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ranked quantitatively by Trend Alignment (EMA 20/50), RSI Dip Zone & MACD Momentum
              </Typography>
            </Box>
          </Box>
          <Button
            size="small"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(ROUTES.TODAY_RECOMMENDATIONS)}
            sx={{ fontWeight: 700, textTransform: 'none' }}
          >
            View All Setups
          </Button>
        </Box>

        {loadingPicks ? (
          <LoadingComponent mode="card" count={3} />
        ) : (
          <Grid container spacing={2.5}>
            {top5Picks.map((pick, idx) => {
              const rankColor = idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : idx === 2 ? '#d97706' : '#3b82f6';
              const rankLabel = `#${idx + 1} Best Pick`;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={pick.symbol}>
                  <Card
                    onClick={() => navigate(`/stocks/${pick.symbol}`)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: 2.5,
                      border: '1px solid',
                      borderColor: idx === 0 ? 'primary.main' : 'divider',
                      bgcolor: 'background.paper',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      {/* Rank & Status Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Chip
                          icon={<StarIcon sx={{ fontSize: '13px !important' }} />}
                          label={rankLabel}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            bgcolor: `${rankColor}1A`,
                            color: rankColor,
                            border: `1px solid ${rankColor}40`,
                          }}
                        />
                        <StatusChip status={pick.recommendation} size="small" />
                      </Box>

                      {/* Stock Symbol & Name */}
                      <Box sx={{ mb: 1.5 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'primary.main',
                            lineHeight: 1.2,
                          }}
                        >
                          {pick.symbol}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontWeight: 500,
                          }}
                        >
                          {pick.companyName}
                        </Typography>
                      </Box>

                      {/* Current Price */}
                      <Box sx={{ mb: 1.5, p: 1, borderRadius: 1.5, bgcolor: 'background.subtle' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                          LIVE PRICE
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                          {formatCurrency(pick.currentPrice)}
                        </Typography>
                      </Box>

                      {/* Target vs Stop Loss */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, fontSize: '0.75rem' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            TARGET
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'success.main' }}>
                            {formatCurrency(pick.targetPrice)}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            STOP LOSS
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'error.main' }}>
                            {formatCurrency(pick.stopLoss)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Conviction & Setup Tag */}
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                            Swing Conviction
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>
                            {pick.confidenceScore}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={pick.confidenceScore}
                          sx={{
                            height: 5,
                            borderRadius: 3,
                            bgcolor: 'rgba(59, 130, 246, 0.15)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'primary.main',
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    </CardContent>

                    <Button
                      size="small"
                      endIcon={<ChartIcon sx={{ fontSize: 16 }} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stocks/${pick.symbol}`);
                      }}
                      sx={{
                        py: 0.75,
                        borderRadius: 0,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                      }}
                    >
                      Analyze Setup
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>

      {/* Middle Section: Top Movers & Market Sentiment */}
      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        {/* Top Active Movers */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Top Active Signals
              </Typography>
              <Button
                size="small"
                onClick={() => navigate(ROUTES.STOCKS)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                All Stocks
              </Button>
            </Box>

            <Grid container spacing={2}>
              {topMovers.map((mover) => (
                <Grid size={{ xs: 12, sm: 6 }} key={mover.symbol}>
                  <Card
                    onClick={() => navigate(`/stocks/${mover.symbol}`)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: 'background.subtle',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                            {mover.symbol}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {mover.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={mover.signal}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            bgcolor:
                              mover.signal === 'BUY'
                                ? 'rgba(16, 185, 129, 0.12)'
                                : 'rgba(239, 68, 68, 0.12)',
                            color: mover.signal === 'BUY' ? '#10b981' : '#ef4444',
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                          {mover.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: mover.change.startsWith('+') ? 'success.main' : 'error.main',
                          }}
                        >
                          {mover.change}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Market Sentiment & Sector Weights */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Market Sentiment
                </Typography>
                <Chip
                  icon={<SentimentIcon sx={{ fontSize: '14px !important' }} />}
                  label={marketSentiment.status}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    bgcolor: 'rgba(16, 185, 129, 0.12)',
                    color: '#10b981',
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Bullish Bias Ratio
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace', color: '#10b981' }}>
                    {marketSentiment.bullishPercent}% Bullish
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={marketSentiment.bullishPercent}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(239, 68, 68, 0.12)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#10b981',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                Sector Concentration
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {sectorAllocation.slice(0, 3).map((sec) => (
                  <Box key={sec.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {sec.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}>
                      {sec.count} stocks ({sec.value}%)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(ROUTES.PERFORMANCE)}
              sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
            >
              View System Performance
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Latest Recommendations Table */}
      <RecommendationTable
        title="Latest Algorithmic Recommendations"
        recommendations={latestRecommendations}
        compact={true}
        limit={5}
        showPagination={false}
      />
    </Box>
  );
};

export default Dashboard;
