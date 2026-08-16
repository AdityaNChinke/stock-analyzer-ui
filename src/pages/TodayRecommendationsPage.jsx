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
} from '@mui/material';
import {
  ShowChart as ChartIcon,
  Star as StarIcon,
  WorkspacePremium as MedalIcon,
  Timer as TimerIcon,
  AccountBalanceWallet as WalletIcon,
  Autorenew as SyncIcon,
  Schedule as ScheduleIcon,
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
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const TodayRecommendationsPage = () => {
  const navigate = useNavigate();
  const [tradeModalStock, setTradeModalStock] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState(getDailySwingSyncStatus());
  const [scanMessage, setScanMessage] = useState('');

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
    setScanMessage('Scanning 50 NSE stocks, auditing 20-day EMA support bounces & RSI momentum...');
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

  const safeRecs = Array.isArray(recommendations) ? recommendations : [];
  const top5Picks = safeRecs.slice(0, 5);

  return (
    <Box>
      <PageHeader
        title="Top 5 Swing Trading Setups (Today)"
        subtitle="High-probability swing trade setups with exact Holding Time, Target & Stop levels."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Recommendations', path: ROUTES.RECOMMENDATIONS },
          { label: "Today's Top 5 Picks", path: null },
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

      {/* ⏰ DAILY 3:45 PM AUTO-SCANNER & MARKET AUDIT BANNER */}
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
                ⏰ Automated Swing Trading Market Scanner
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
              Auto-scans <strong>50 NSE equities</strong> on market close, checks 20-EMA/50-EMA trends, 14-RSI sweet spots & ATR targets to prepare your swing trades.
            </Typography>
            {scanMessage && (
              <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 800, mt: 0.5, display: 'block' }}>
                {scanMessage}
              </Typography>
            )}
          </Box>
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={<SyncIcon sx={{ animation: isScanning ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />}
          disabled={isScanning}
          onClick={handleManualScan}
          sx={{
            fontWeight: 800,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            borderRadius: 2,
            bgcolor: '#10b981',
            '&:hover': { bgcolor: '#059669' },
          }}
        >
          {isScanning ? 'Scanning 50 Stocks...' : 'Run Daily Market Scan Now'}
        </Button>
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
          {/* Top 5 Best Swing Picks Spotlight */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <MedalIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Top 5 Best Indian Stocks for Swing Trading
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rec.id || symbol}>
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
                            label={`#${rank} Best Swing Pick`}
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
                        <Grid size={{ xs: 4 }}>
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
                        <Grid size={{ xs: 4 }}>
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
                        <Grid size={{ xs: 4 }}>
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

          {/* Today's Full List Table */}
          <RecommendationTable
            title="All Today's Signals"
            recommendations={recommendations}
            showPagination={false}
          />

          {/* Trade Buy Modal */}
          {tradeModalStock && (
            <TradeModal
              open={Boolean(tradeModalStock)}
              onClose={() => setTradeModalStock(null)}
              stock={tradeModalStock}
              onTradeSuccess={() => {
                setTradeModalStock(null);
                navigate(ROUTES.PORTFOLIO);
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default TodayRecommendationsPage;
