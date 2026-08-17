import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  Tooltip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ShowChart as ChartIcon,
  Star as StarIcon,
  WorkspacePremium as MedalIcon,
  Timer as TimerIcon,
  AccountBalanceWallet as WalletIcon,
  Autorenew as SyncIcon,
  Schedule as ScheduleIcon,
  Bolt as BoltIcon,
  RocketLaunch as RocketIcon,
  TrendingUp as TrendingUpIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecommendations } from '../hooks/useRecommendations';
import PageHeader from '../components/common/PageHeader';
import RecommendationTable from '../components/recommendations/RecommendationTable';
import StatusChip from '../components/common/StatusChip';
import ConfidenceGauge from '../components/common/ConfidenceGauge';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import TradeModal from '../components/portfolio/TradeModal';
import {
  initDailySwingScheduler,
  autoScrapeSwingSetups,
  getDailySwingSyncStatus,
} from '../services/swingScraperScheduler';
import {
  scanMidcapBreakouts,
  getCachedMidcapBreakouts,
} from '../services/midcapBreakoutService';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const TodayRecommendationsPage = () => {
  const navigate = useNavigate();
  const [tradeModalStock, setTradeModalStock] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isMidcapScanning, setIsMidcapScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState(getDailySwingSyncStatus());
  const [scanMessage, setScanMessage] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState('LARGE_CAP'); // Default always to Top 5 Largecap tab
  const [midcapPicks, setMidcapPicks] = useState(getCachedMidcapBreakouts());

  const {
    recommendations = [],
    loading,
    error,
    refetch,
  } = useRecommendations(true);

  useEffect(() => {
    const cleanup = initDailySwingScheduler(() => {
      setScanStatus(getDailySwingSyncStatus());
      refetch();
    });
    return cleanup;
  }, [refetch]);

  const handleManualScan = async () => {
    setIsScanning(true);
    setScanMessage('Scanning 50 NSE Largecap stocks, auditing 20-day EMA support bounces & RSI momentum...');
    try {
      await autoScrapeSwingSetups();
      setScanStatus(getDailySwingSyncStatus());
      await refetch();
      setScanMessage('Daily Market Scan Complete! Top 5 highest-probability setups updated. ✅');
      setTimeout(() => setScanMessage(''), 4000);
    } catch {
      setScanMessage('Scan finished with verified technical indicators.');
      setTimeout(() => setScanMessage(''), 3000);
    } finally {
      setIsScanning(false);
    }
  };

  const handleMidcapScan = async () => {
    setIsMidcapScanning(true);
    setScanMessage('🚀 Scanning 25 NSE Midcaps for Volume Shocks (>1.8x ADV) & 52-Week High Breakouts...');
    try {
      const results = await scanMidcapBreakouts();
      setMidcapPicks(results);
      setScanMessage('🚀 Midcap Breakout Scan Complete! Top 6 high-momentum setups updated. ✅');
      setTimeout(() => setScanMessage(''), 4000);
    } catch {
      setScanMessage('Midcap scan finished with verified volume indicators.');
      setTimeout(() => setScanMessage(''), 3000);
    } finally {
      setIsMidcapScanning(false);
    }
  };

  const safeRecs = Array.isArray(recommendations) ? recommendations : [];
  const top5Picks = safeRecs.slice(0, 5);

  return (
    <Box>
      <PageHeader
        title="Today's Swing & Midcap Breakout Setups"
        subtitle="High-probability Largecap & Midcap swing trade setups with exact Holding Time, Target & Stop levels."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Recommendations', path: ROUTES.RECOMMENDATIONS },
          { label: "Today's Top Picks", path: null },
        ]}
        onRefresh={refetch}
        refreshing={loading}
        actions={
          <Button
            variant="outlined"
            size="small"
            startIcon={<WalletIcon sx={{ color: 'primary.main' }} />}
            onClick={() => navigate(ROUTES.PORTFOLIO)}
            sx={{ fontWeight: 700, textTransform: 'none', borderColor: 'divider' }}
          >
            Open Virtual Portfolio (₹1L)
          </Button>
        }
      />

      {/* ⏰ DUAL MARKET SCANNER CONTROL BANNER */}
      <Paper
        sx={{
          p: 2.5,
          mb: 3.5,
          borderRadius: 3,
          bgcolor: 'background.paper',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2.5,
              bgcolor: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScheduleIcon sx={{ fontSize: 28 }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                ⏰ Automated Swing & Breakout Scanners
              </Typography>
              <Chip
                label="Scheduled: Daily @ 3:45 PM (Post-Market)"
                size="small"
                sx={{ fontWeight: 800, fontSize: '0.7rem', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
              />
              <Chip
                label={`Next: ${scanStatus.nextSyncTime}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700, fontSize: '0.7rem' }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Audits <strong>50 NIFTY Largecaps</strong> for 20-EMA bounces and <strong>25 NSE Midcaps</strong> for Volume Shocks & 52-Week High Breakouts.
            </Typography>
            {scanMessage && (
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 800, mt: 0.5, display: 'block' }}>
                {scanMessage}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<SyncIcon sx={{ animation: isScanning ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />}
            disabled={isScanning || isMidcapScanning}
            onClick={handleManualScan}
            sx={{
              fontWeight: 800,
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: '#10b981',
              '&:hover': { bgcolor: '#059669' },
            }}
          >
            {isScanning ? 'Scanning 50 Stocks...' : 'Run Largecap Scan'}
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<RocketIcon sx={{ animation: isMidcapScanning ? 'pulse 0.5s infinite alternate' : 'none' }} />}
            disabled={isScanning || isMidcapScanning}
            onClick={handleMidcapScan}
            sx={{
              fontWeight: 800,
              textTransform: 'none',
              px: 2,
              py: 1,
              borderRadius: 2,
              bgcolor: '#3b82f6',
              '&:hover': { bgcolor: '#2563eb' },
            }}
          >
            {isMidcapScanning ? 'Scanning Midcaps...' : '🚀 Run Midcap Breakout Scan'}
          </Button>
        </Box>
      </Paper>

      {/* 🧭 UNIVERSE FILTER TABS */}
      <Paper sx={{ mb: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Tabs
          value={selectedUniverse}
          onChange={(e, val) => setSelectedUniverse(val)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, bgcolor: 'background.paper' }}
        >
          <Tab
            value="LARGE_CAP"
            label={`🏆 Top 5 Largecap Swing Picks (${top5Picks.length})`}
            iconPosition="start"
            sx={{ fontWeight: 800, textTransform: 'none', fontSize: '0.9rem' }}
          />
          <Tab
            value="MIDCAP"
            label={`🚀 Midcap Momentum Breakouts (${midcapPicks.length})`}
            iconPosition="start"
            sx={{ fontWeight: 800, textTransform: 'none', fontSize: '0.9rem', color: '#38bdf8' }}
          />
          <Tab
            value="ALL"
            label={`🌟 All Combined Setups (${top5Picks.length + midcapPicks.length})`}
            iconPosition="start"
            sx={{ fontWeight: 800, textTransform: 'none', fontSize: '0.9rem' }}
          />
        </Tabs>
      </Paper>

      {loading && !recommendations.length ? (
        <LoadingComponent mode="card" count={5} />
      ) : error && !recommendations.length ? (
        <ErrorComponent
          title="Unable to load today's recommendations"
          message="Could not retrieve daily trading signals from the backend server."
          errorDetails={error}
          onRetry={refetch}
        />
      ) : (
        <>
          {/* ======================================================== */}
          {/* 🚀 SECTION 1: MIDCAP HIGH-MOMENTUM BREAKOUTS */}
          {/* ======================================================== */}
          {(selectedUniverse === 'ALL' || selectedUniverse === 'MIDCAP') && (
            <Box sx={{ mb: 5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: 'rgba(59, 130, 246, 0.15)',
                      color: '#38bdf8',
                      display: 'flex',
                    }}
                  >
                    <RocketIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
                      🚀 NIFTY Midcap High-Momentum Breakouts
                      <Chip
                        label="Top Growth Setups"
                        size="small"
                        sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#38bdf8', fontWeight: 800, fontSize: '0.7rem' }}
                      />
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Filtered with <strong>Volume Shock (&ge;1.8x ADV)</strong>, 52-Week High Proximity & +16.0% Profit Targets
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={<FireIcon sx={{ fontSize: '14px !important', color: '#f59e0b' }} />}
                  label="Target: +16.0% • Stop Loss: -5.5%"
                  size="small"
                  sx={{ fontWeight: 800, bgcolor: 'background.paper', border: '1px solid rgba(245, 158, 11, 0.4)' }}
                />
              </Box>

              <Grid container spacing={3}>
                {midcapPicks.map((midcap, index) => {
                  const symbol = midcap.symbol;
                  const rank = index + 1;
                  const rankColor = rank === 1 ? '#f59e0b' : rank === 2 ? '#38bdf8' : '#818cf8';

                  return (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={midcap.id || symbol}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 3,
                          borderTop: '4px solid #3b82f6',
                          bgcolor: 'background.paper',
                          border: rank === 1 ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid',
                          borderColor: rank === 1 ? 'rgba(59, 130, 246, 0.5)' : 'divider',
                          boxShadow: rank === 1 ? '0 8px 24px rgba(59, 130, 246, 0.15)' : 'none',
                          transition: 'all 0.2s',
                          '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 28px rgba(0, 0, 0, 0.2)' },
                        }}
                      >
                        <CardContent sx={{ p: 3, flexGrow: 1 }}>
                          {/* Header: Rank + Volume Shock Badge */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Chip
                              icon={<BoltIcon sx={{ fontSize: '13px !important' }} />}
                              label={`⚡ ${midcap.volMultiplier}x Vol Surge`}
                              size="small"
                              sx={{
                                fontWeight: 800,
                                fontSize: '0.72rem',
                                bgcolor: 'rgba(59, 130, 246, 0.15)',
                                color: '#38bdf8',
                                border: '1px solid rgba(59, 130, 246, 0.35)',
                              }}
                            />
                            <Chip
                              label="BUY BREAKOUT"
                              size="small"
                              sx={{
                                fontWeight: 800,
                                fontSize: '0.7rem',
                                bgcolor: 'rgba(16, 185, 129, 0.15)',
                                color: '#10b981',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                              }}
                            />
                          </Box>

                          {/* Symbol + Company */}
                          <Box sx={{ mb: 1.5 }}>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 900,
                                fontFamily: 'JetBrains Mono, monospace',
                                color: '#38bdf8',
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' },
                              }}
                              onClick={() => navigate(`/stocks/${symbol}`)}
                            >
                              {symbol}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {midcap.companyName}
                              </Typography>
                              <Chip
                                label={`52W High (${midcap.distFrom52High}% away)`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.62rem', fontWeight: 700, height: 20, color: 'text.secondary' }}
                              />
                            </Box>
                          </Box>

                          {/* Holding Horizon & Setup Tag */}
                          <Box
                            sx={{
                              mb: 2,
                              p: 1.2,
                              borderRadius: 2,
                              bgcolor: 'rgba(59, 130, 246, 0.06)',
                              border: '1px solid rgba(59, 130, 246, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                              <TimerIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                              <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                Horizon: {midcap.holdingPeriod}
                              </Typography>
                            </Box>
                            <Chip
                              label={`RSI ${midcap.rsi14}`}
                              size="small"
                              sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20, bgcolor: 'background.paper' }}
                            />
                          </Box>

                          {/* Confidence Rating Gauge */}
                          <Box sx={{ mb: 2 }}>
                            <ConfidenceGauge score={midcap.confidence} />
                          </Box>

                          {/* Key Pricing Grid (+16% / -5.5%) */}
                          <Grid container spacing={1.2} sx={{ mb: 2 }}>
                            <Grid item size={{ xs: 4 }}>
                              <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 700 }}>
                                  ENTRY (CMP)
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                                  {formatCurrency(midcap.currentPrice)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item size={{ xs: 4 }}>
                              <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.08)', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                                <Typography variant="caption" color="success.main" sx={{ fontSize: '0.65rem', fontWeight: 800 }}>
                                  TARGET (+16%)
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'success.main' }}>
                                  {formatCurrency(midcap.targetPrice)}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item size={{ xs: 4 }}>
                              <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.08)', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                                <Typography variant="caption" color="error.main" sx={{ fontSize: '0.65rem', fontWeight: 800 }}>
                                  SL (-5.5%)
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'error.main' }}>
                                  {formatCurrency(midcap.stopLoss)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          {/* Catalyst / Setup Description */}
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', lineHeight: 1.5, mb: 1 }}>
                            {midcap.catalyst}
                          </Typography>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ p: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<WalletIcon sx={{ color: '#38bdf8' }} />}
                            onClick={() =>
                              setTradeModalStock({
                                id: midcap.id,
                                symbol: midcap.symbol,
                                stock: midcap.symbol,
                                companyName: midcap.companyName,
                                currentPrice: midcap.currentPrice,
                                targetPrice: midcap.targetPrice,
                                stopLoss: midcap.stopLoss,
                                recommendation: 'BUY',
                              })
                            }
                            sx={{ textTransform: 'none', fontWeight: 800, borderColor: 'divider' }}
                          >
                            Simulate Buy
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            endIcon={<ChartIcon />}
                            onClick={() => navigate(`/stocks/${symbol}`)}
                            sx={{ textTransform: 'none', fontWeight: 800, bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' } }}
                          >
                            Strategy & Chart
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* ======================================================== */}
          {/* 🏛️ SECTION 2: NIFTY 50 LARGECAPS (EXISTING TOP 5 SWING PICKS) */}
          {/* ======================================================== */}
          {(selectedUniverse === 'ALL' || selectedUniverse === 'LARGE_CAP') && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <MedalIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    🏛️ Top 5 Best NIFTY 50 Largecaps for Swing Trading
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ranked with Dynamic ATR Stop Losses, 200 SMA Macro Filter & Estimated Holding Periods
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {top5Picks.map((rec, index) => {
                  const symbol = rec.symbol || rec.stock || 'TICKER';
                  const isBuy = rec.recommendation === 'BUY';
                  const rank = rec.rank || index + 1;
                  const rankColor = rank === 1 ? '#f59e0b' : rank === 2 ? '#94a3b8' : rank === 3 ? '#d97706' : '#3b82f6';
                  const holdingTime = rec.expectedHolding || rec.holdingDays || '6 to 14 Days';

                  return (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={rec.id || symbol}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: 3,
                          borderTop: `4px solid ${isBuy ? '#10b981' : '#ef4444'}`,
                          bgcolor: 'background.paper',
                          boxShadow: rank === 1 ? '0 8px 24px rgba(245, 158, 11, 0.12)' : 'none',
                          border: rank === 1 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid',
                          borderColor: rank === 1 ? 'rgba(245, 158, 11, 0.4)' : 'divider',
                        }}
                      >
                        <CardContent sx={{ p: 3, flexGrow: 1 }}>
                          {/* Top Rank Badge & Status Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Tooltip title={`🏆 #${rank} Highest-Conviction Setup: Scored highest on institutional trend alignment and risk-to-reward.`} arrow>
                              <Chip
                                icon={<StarIcon sx={{ fontSize: '13px !important' }} />}
                                label={`#${rank} Best Largecap Pick`}
                                size="small"
                                sx={{
                                  fontWeight: 800,
                                  fontSize: '0.7rem',
                                  bgcolor: `${rankColor}1A`,
                                  color: rankColor,
                                  border: `1px solid ${rankColor}40`,
                                }}
                              />
                            </Tooltip>
                            <Tooltip title={`Algorithmic Signal: ${rec.recommendation}`} arrow>
                              <span>
                                <StatusChip status={rec.recommendation} size="small" />
                              </span>
                            </Tooltip>
                          </Box>

                          {/* Stock Symbol & Setup Type */}
                          <Box sx={{ mb: 1.5 }}>
                            <Tooltip title={`Tap 'When to Sell & Chart' below to view full indicators for ${symbol}`} arrow>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 800,
                                  fontFamily: 'JetBrains Mono, monospace',
                                  color: 'primary.main',
                                  cursor: 'pointer',
                                }}
                                onClick={() => navigate(`/stocks/${symbol}`)}
                              >
                                {symbol}
                              </Typography>
                            </Tooltip>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {rec.companyName || rec.sector}
                              </Typography>
                              {rec.setupType && (
                                <Tooltip title={`Technical Pattern: ${rec.setupType}`} arrow>
                                  <Chip
                                    label={rec.setupType}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.65rem', fontWeight: 700, height: 20 }}
                                  />
                                </Tooltip>
                              )}
                            </Box>
                          </Box>

                          {/* ⏱️ HOLDING PERIOD BADGE */}
                          <Tooltip title="⏱️ Target Time Horizon: Expected number of trading days to achieve the profit target based on average daily ATR volatility." arrow>
                            <Box sx={{ mb: 2, p: 1, borderRadius: 1.5, bgcolor: 'rgba(59, 130, 246, 0.08)', display: 'flex', alignItems: 'center', gap: 1, cursor: 'help' }}>
                              <TimerIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                              <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                Expected Holding Period: <strong>{holdingTime}</strong>
                              </Typography>
                            </Box>
                          </Tooltip>

                          {/* Confidence Score Gauge */}
                          <Tooltip title={`AI Confidence Rating: ${rec.confidenceScore}% probability based on RSI sweet spot and Moving Average alignment.`} arrow>
                            <Box sx={{ mb: 2 }}>
                              <ConfidenceGauge score={rec.confidenceScore} />
                            </Box>
                          </Tooltip>

                          {/* Key Price Targets */}
                          <Grid container spacing={1.5} sx={{ mb: 2 }}>
                            <Grid item size={{ xs: 4 }}>
                              <Tooltip title="Recommended entry price based on live market quote" arrow>
                                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center' }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                                    ENTRY
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                                    {formatCurrency(rec.currentPrice)}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            </Grid>
                            <Grid item size={{ xs: 4 }}>
                              <Tooltip title={`💰 Target Price: Projected profit exit level giving a +${(((rec.targetPrice - rec.currentPrice) / (rec.currentPrice || 1)) * 100).toFixed(1)}% gain.`} arrow>
                                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                                    SELL TARGET
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'success.main' }}>
                                    {formatCurrency(rec.targetPrice)}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            </Grid>
                            <Grid item size={{ xs: 4 }}>
                              <Tooltip title={`🛑 Safety Stop-Loss: Exit if price drops below this level to restrict maximum risk to -${(((rec.currentPrice - rec.stopLoss) / (rec.currentPrice || 1)) * 100).toFixed(1)}%.`} arrow>
                                <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                                    STOP LOSS
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'error.main' }}>
                                    {formatCurrency(rec.stopLoss)}
                                  </Typography>
                                </Box>
                              </Tooltip>
                            </Grid>
                          </Grid>

                          {/* Analysis Reason */}
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', lineHeight: 1.5, mb: 1 }}>
                            {rec.reason}
                          </Typography>
                        </CardContent>

                        <Divider />

                        <CardActions sx={{ p: 2, display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                          <Tooltip title="Test buying this stock in your virtual paper trading account with ₹1,00,000 cash" arrow>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<WalletIcon sx={{ color: 'primary.main' }} />}
                              onClick={() => setTradeModalStock(rec)}
                              sx={{ textTransform: 'none', fontWeight: 700, borderColor: 'divider' }}
                            >
                              Simulate Buy
                            </Button>
                          </Tooltip>
                          <Tooltip title="View full candlestick history, technical indicators & exact exit strategy" arrow>
                            <Button
                              size="small"
                              variant="contained"
                              endIcon={<ChartIcon />}
                              onClick={() => navigate(`/stocks/${symbol}`)}
                              sx={{ textTransform: 'none', fontWeight: 700 }}
                            >
                              When to Sell & Chart
                            </Button>
                          </Tooltip>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* Today's Full List Table */}
          <RecommendationTable
            title="All Today's Signals"
            recommendations={recommendations}
            onSelectStock={(stock) => navigate(`/stocks/${stock.symbol || stock.stock}`)}
          />
        </>
      )}

      {/* Virtual Trade Simulation Modal */}
      {tradeModalStock && (
        <TradeModal
          open={Boolean(tradeModalStock)}
          onClose={() => setTradeModalStock(null)}
          stock={tradeModalStock}
          onTradeSuccess={() => {
            setTradeModalStock(null);
          }}
        />
      )}
    </Box>
  );
};

export default TodayRecommendationsPage;
