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
} from '@mui/material';
import {
  ShowChart as ChartIcon,
  Star as StarIcon,
  WorkspacePremium as MedalIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecommendations } from '../hooks/useRecommendations';
import PageHeader from '../components/common/PageHeader';
import RecommendationTable from '../components/recommendations/RecommendationTable';
import StatusChip from '../components/common/StatusChip';
import ConfidenceGauge from '../components/common/ConfidenceGauge';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const TodayRecommendationsPage = () => {
  const navigate = useNavigate();
  const {
    recommendations,
    loading,
    error,
    refetch,
  } = useRecommendations(true);

  const top5Picks = recommendations.slice(0, 5);

  return (
    <Box>
      <PageHeader
        title="Top 5 Swing Trading Setups (Today)"
        subtitle="High-probability swing trade setups with exact Holding Time and When to Sell rules."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Recommendations', path: ROUTES.RECOMMENDATIONS },
          { label: "Today's Top 5 Picks", path: null },
        ]}
        onRefresh={refetch}
        refreshing={loading}
      />

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
                        <StatusChip status={rec.recommendation} size="small" />
                      </Box>

                      {/* Stock Symbol & Setup Type */}
                      <Box sx={{ mb: 1.5 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'primary.main',
                          }}
                        >
                          {symbol}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {rec.companyName || rec.sector}
                          </Typography>
                          {rec.setupType && (
                            <Chip
                              label={rec.setupType}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.65rem', fontWeight: 700, height: 20 }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* ⏱️ HOLDING PERIOD BADGE */}
                      <Box sx={{ mb: 2, p: 1, borderRadius: 1.5, bgcolor: 'rgba(59, 130, 246, 0.08)', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimerIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          Expected Holding Period: <strong>{holdingTime}</strong>
                        </Typography>
                      </Box>

                      {/* Confidence Score Gauge */}
                      <Box sx={{ mb: 2 }}>
                        <ConfidenceGauge score={rec.confidenceScore} />
                      </Box>

                      {/* Key Price Targets */}
                      <Grid container spacing={1.5} sx={{ mb: 2 }}>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                              ENTRY
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                              {formatCurrency(rec.currentPrice)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                              SELL TARGET
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'success.main' }}>
                              {formatCurrency(rec.targetPrice)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 4 }}>
                          <Box sx={{ p: 1.2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                              STOP LOSS
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'error.main' }}>
                              {formatCurrency(rec.stopLoss)}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Analysis Reason */}
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', lineHeight: 1.5, mb: 1 }}>
                        {rec.reason}
                      </Typography>
                    </CardContent>

                    <Divider />

                    <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        R:R Ratio: <strong style={{ color: '#10b981' }}>{rec.riskRewardRatio || '2.22:1'}</strong>
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        endIcon={<ChartIcon />}
                        onClick={() => navigate(`/stocks/${symbol}`)}
                        sx={{ textTransform: 'none', fontWeight: 700 }}
                      >
                        When to Sell & Chart
                      </Button>
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
        </>
      )}
    </Box>
  );
};

export default TodayRecommendationsPage;
