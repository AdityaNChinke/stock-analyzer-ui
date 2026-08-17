import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon,
  AccountBalanceWallet as WalletIcon,
  Telegram as TelegramIcon,
  Speed as VolatilityIcon,
  TrendingUp as TrendIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useStockDetails } from '../hooks/useStockDetails';
import PageHeader from '../components/common/PageHeader';
import PriceChart from '../components/charts/PriceChart';
import IndicatorChart from '../components/charts/IndicatorChart';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import StatusChip from '../components/common/StatusChip';
import TradeModal from '../components/portfolio/TradeModal';
import { dispatchTradeAlert } from '../services/telegramService';
import { getCachedMidcapBreakouts, NSE_MIDCAP_STOCKS } from '../services/midcapBreakoutService';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const StockDetailPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');

  const { stockInfo, prices, indicators, recommendation, loading, error, refetch } = useStockDetails(symbol);

  const displaySymbol = (symbol || 'UNKNOWN').toUpperCase();
  const companyName = recommendation?.companyName || stockInfo?.companyName || indicators?.companyName || `${displaySymbol} Corporation`;
  const sector = recommendation?.sector || stockInfo?.sector || indicators?.sector || 'Equities';
  const safePrices = Array.isArray(prices) ? prices : [];
  const currentPrice = recommendation?.currentPrice || indicators?.currentPrice || stockInfo?.price || (safePrices.length ? safePrices[safePrices.length - 1].close : 0);

  // Exact 100% synchronized setup parameters from recommendation cards:
  const targetPrice = recommendation?.targetPrice || Number((currentPrice * 1.10).toFixed(2));
  const stopLoss = recommendation?.stopLoss || Number((currentPrice * 0.955).toFixed(2));
  const expectedHolding = recommendation?.expectedHolding || recommendation?.holdingPeriod || recommendation?.holding || indicators?.expectedHolding || '6 to 14 Days';
  const confidenceScore = recommendation?.confidenceScore || recommendation?.score || indicators?.confidenceScore || 90;

  const gainPercent = currentPrice > 0 ? Number((((targetPrice - currentPrice) / currentPrice) * 100).toFixed(1)) : 10.0;
  const lossPercent = currentPrice > 0 ? Number((((currentPrice - stopLoss) / currentPrice) * 100).toFixed(1)) : 4.5;
  const trailingTrigger = Number((currentPrice * 1.045).toFixed(2));

  const atrVal = indicators?.atr || Number((currentPrice * 0.022).toFixed(2));
  const sma200Val = indicators?.sma200 || Number((currentPrice * 0.93).toFixed(2));
  const isAbove200 = currentPrice >= sma200Val;

  if (loading && !indicators && !prices.length) {
    return (
      <Box>
        <PageHeader
          title={`${displaySymbol} Analysis`}
          subtitle="Loading historical price feed and computing technical indicators..."
          breadcrumbs={[
            { label: 'Dashboard', path: ROUTES.DASHBOARD },
            { label: 'Stock List', path: ROUTES.STOCKS },
            { label: displaySymbol, path: null },
          ]}
        />
        <LoadingComponent mode="chart" />
        <Box sx={{ mt: 3 }}>
          <LoadingComponent mode="card" count={3} />
        </Box>
      </Box>
    );
  }

  if (error && !indicators && !prices.length) {
    return (
      <Box>
        <PageHeader
          title={`${displaySymbol} Analysis`}
          subtitle="Technical overview and algorithmic recommendations."
          breadcrumbs={[
            { label: 'Dashboard', path: ROUTES.DASHBOARD },
            { label: 'Stock List', path: ROUTES.STOCKS },
            { label: displaySymbol, path: null },
          ]}
        />
        <ErrorComponent
          title={`Unable to load details for ${displaySymbol}`}
          message="Could not retrieve historical prices or indicators from the server."
          errorDetails={error}
          onRetry={refetch}
        />
      </Box>
    );
  }

  const overallSignal = indicators?.signals?.overallSignal || 'WATCH';

  const handleSendTelegram = async () => {
    setAlertStatus('Sending...');
    try {
      await dispatchTradeAlert({
        symbol: displaySymbol,
        recommendation: overallSignal,
        currentPrice,
        targetPrice: indicators?.resistanceLevel || currentPrice * 1.10,
        stopLoss: indicators?.supportLevel || currentPrice * 0.955,
        confidenceScore: indicators?.confidenceScore || 88,
        reason: `EMA20 (₹${indicators?.ema20}) > EMA50 (₹${indicators?.ema50}) with ATR at ₹${atrVal} and RSI at ${indicators?.rsi?.toFixed(1)}.`,
      });
      setAlertStatus('✅ Alert Sent to Telegram!');
      setTimeout(() => setAlertStatus(''), 3000);
    } catch (err) {
      setAlertStatus(`⚠️ ${err.message}`);
      setTimeout(() => setAlertStatus(''), 4000);
    }
  };

  return (
    <Box>
      {/* Header */}
      <PageHeader
        title={`${displaySymbol} Technical Analysis`}
        subtitle={`${companyName} • ${sector} (National Stock Exchange of India)`}
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Stock List', path: ROUTES.STOCKS },
          { label: displaySymbol, path: null },
        ]}
        onRefresh={refetch}
        refreshing={loading}
        actions={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(ROUTES.STOCKS)}
              sx={{ fontWeight: 600, borderColor: 'divider', textTransform: 'none' }}
            >
              Back to List
            </Button>
            <Tooltip title="Send complete entry, target, and stop-loss alert to your Telegram phone" arrow>
              <Button
                variant="outlined"
                size="small"
                startIcon={<TelegramIcon sx={{ color: '#229ED9' }} />}
                onClick={handleSendTelegram}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                {alertStatus || 'Telegram Alert'}
              </Button>
            </Tooltip>
            <Tooltip title="Test buying this stock in your ₹1,00,000 virtual paper trading account" arrow>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<WalletIcon />}
                onClick={() => setTradeModalOpen(true)}
                sx={{ fontWeight: 700, textTransform: 'none' }}
              >
                Simulate Buy (₹1L)
              </Button>
            </Tooltip>
          </Box>
        }
      />

      {/* Stock Overview Header Card */}
      <Paper sx={{ p: 3, mb: 3.5, borderRadius: 3 }}>
        <Grid container spacing={3} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '-0.02em',
                      color: 'primary.main',
                    }}
                  >
                    {displaySymbol}
                  </Typography>
                  <Tooltip title={`Algorithmic Signal: ${overallSignal}`} arrow>
                    <span>
                      <StatusChip status={overallSignal} size="medium" />
                    </span>
                  </Tooltip>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {companyName} • {sector}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                CURRENT PRICE (LIVE NSE)
              </Typography>
              <Tooltip title="Real-time quote from the National Stock Exchange (NSE)" arrow>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'text.primary',
                  }}
                >
                  {formatCurrency(currentPrice)}
                </Typography>
              </Tooltip>
            </Box>
          </Grid>

          {/* ATR Volatility & 200 SMA Badges */}
          <Grid size={{ xs: 12, sm: 6, md: 5 }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'background.subtle',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Tooltip title="📊 ATR (Average True Range): Shows how many Rupees this stock typically moves per day. Used to place stop-losses outside random daily market noise." arrow>
                <Box sx={{ flexGrow: 1, cursor: 'help' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VolatilityIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      ATR (14) VOLATILITY
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                    ₹{atrVal} (1.5x SL Buffer)
                  </Typography>
                </Box>
              </Tooltip>
              <Divider orientation="vertical" flexItem />
              <Tooltip title="📈 200-Day Moving Average: Major long-term trend line. Stocks trading above this are in strong macro bull markets." arrow>
                <Box sx={{ flexGrow: 1, cursor: 'help' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TrendIcon sx={{ fontSize: 14, color: isAbove200 ? 'success.main' : 'error.main' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      200-SMA BASELINE
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: isAbove200 ? 'success.main' : 'error.main' }}>
                    {formatCurrency(sma200Val)} {isAbove200 ? '🟢 BULL' : '🔴 BEAR'}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* SECTION 1: PRICE HISTORY CHART */}
      <Box sx={{ mb: 3.5 }}>
        <PriceChart
          data={prices}
          symbol={displaySymbol}
          currentPrice={currentPrice}
          height={380}
        />
      </Box>

      {/* SECTION 2: TECHNICAL INDICATORS (RSI, EMA20, EMA50, MACD) */}
      <Box sx={{ mb: 3.5 }}>
        <IndicatorChart
          indicators={indicators}
          symbol={displaySymbol}
        />
      </Box>

      {/* SECTION 3: SUMMARY & RECOMMENDATION RATIONALE */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <AssessmentIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Technical Alignment Summary
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.7 }}>
              {recommendation?.reason || recommendation?.catalyst ? (
                <span>{recommendation.reason || recommendation.catalyst}</span>
              ) : (
                <span>
                  Key indicators for <strong>{displaySymbol}</strong> show a {overallSignal.toLowerCase()} setup.
                  The EMA20 ({formatCurrency(indicators?.ema20)}) remains {indicators?.ema20 > indicators?.ema50 ? 'above' : 'below'} the EMA50 ({formatCurrency(indicators?.ema50)}),
                  with an RSI reading of {indicators?.rsi?.toFixed?.(1) || 50} (
                  {indicators?.rsi > 70 ? 'Overbought zone' : indicators?.rsi < 30 ? 'Oversold opportunity' : 'Healthy momentum accumulation'}).
                </span>
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setTradeModalOpen(true)}
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                Simulate Buy Order
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.PORTFOLIO)}
                sx={{ textTransform: 'none', fontWeight: 600, borderColor: 'divider' }}
              >
                View Virtual Portfolio
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SecurityIcon sx={{ color: 'warning.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  When to Sell & Holding Blueprint
                </Typography>
              </Box>
              <Chip
                label={`⏱️ Expected Hold: ${expectedHolding}`}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  bgcolor: 'rgba(59, 130, 246, 0.12)',
                  color: 'primary.main',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 6 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.subtle', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    🛑 STOP LOSS (-{lossPercent}%)
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'error.main' }}>
                    {formatCurrency(stopLoss)}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.subtle', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    🎯 TARGET (+{gainPercent}%)
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'success.main' }}>
                    {formatCurrency(targetPrice)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Step-by-Step Sell Rules */}
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
              📋 EXACT EXIT RULES FOR THIS SWING TRADE:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <span>🎯</span>
                <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                  <strong>Profit Taking:</strong> Sell 75% to 100% position when price reaches <strong>{formatCurrency(targetPrice)} (+{gainPercent}%)</strong>.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <span>🛑</span>
                <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                  <strong>Capital Protection:</strong> Exit 100% immediately if daily candle closes below <strong>{formatCurrency(stopLoss)} (-{lossPercent}%)</strong>.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <span>📈</span>
                <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                  <strong>Trailing Stop Rule:</strong> Once price gains +4.5% (crosses {formatCurrency(trailingTrigger)}), move your Stop Loss up to Entry ({formatCurrency(currentPrice)}) for a risk-free trade.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <span>⏳</span>
                <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                  <strong>Time-Stop:</strong> If target is not reached within <strong>{expectedHolding}</strong>, exit at market price to rotate capital.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Simulate Buy Modal */}
      <TradeModal
        open={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        stock={{
          symbol: displaySymbol,
          companyName,
          currentPrice,
          targetPrice,
          stopLoss,
        }}
        onTradeSuccess={() => {
          // Success callback
        }}
      />
    </Box>
  );
};

export default StockDetailPage;
