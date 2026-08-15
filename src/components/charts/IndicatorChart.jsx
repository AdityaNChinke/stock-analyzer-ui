import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Chip,
  Grid,
  useTheme,
} from '@mui/material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export const IndicatorChart = ({
  indicators,
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  if (!indicators) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="body2" color="text.secondary">
          No indicator data available.
        </Typography>
      </Paper>
    );
  }

  const {
    rsi = 50,
    ema20 = 0,
    ema50 = 0,
    macd = { macd: 0, signal: 0, histogram: 0 },
    signals = {},
    history = [],
  } = indicators;

  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      {/* Indicator Summary KPI Badges */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* RSI Box */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.subtle',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                RSI (14)
              </Typography>
              <Chip
                size="small"
                label={signals.rsiSignal || (rsi > 70 ? 'OVERBOUGHT' : rsi < 30 ? 'OVERSOLD' : 'NEUTRAL')}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  bgcolor:
                    rsi > 70
                      ? 'rgba(239, 68, 68, 0.12)'
                      : rsi < 30
                      ? 'rgba(16, 185, 129, 0.12)'
                      : 'rgba(59, 130, 246, 0.12)',
                  color: rsi > 70 ? '#ef4444' : rsi < 30 ? '#10b981' : '#3b82f6',
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
              {rsi?.toFixed?.(1) ?? rsi}
            </Typography>
          </Box>
        </Grid>

        {/* EMA20 & EMA50 Box */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.subtle',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                EMA 20 / EMA 50
              </Typography>
              <Chip
                size="small"
                label={ema20 > ema50 ? 'BULLISH ALIGN' : 'BEARISH ALIGN'}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  bgcolor: ema20 > ema50 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  color: ema20 > ema50 ? '#10b981' : '#ef4444',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace', color: '#06b6d4' }}>
                {formatCurrency(ema20)}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, fontFamily: 'monospace', color: '#f59e0b' }}>
                {formatCurrency(ema50)}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* MACD Box */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.subtle',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                MACD (12, 26, 9)
              </Typography>
              <Chip
                size="small"
                label={macd.histogram >= 0 ? 'BULLISH MOMENTUM' : 'BEARISH MOMENTUM'}
                sx={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  bgcolor: macd.histogram >= 0 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  color: macd.histogram >= 0 ? '#10b981' : '#ef4444',
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontFamily: 'monospace',
                color: macd.histogram >= 0 ? 'success.main' : 'error.main',
              }}
            >
              {macd.macd?.toFixed?.(2) ?? macd.macd}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs for switching indicator charts */}
      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        sx={{
          mb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          '& .MuiTab-root': { fontWeight: 600, textTransform: 'none' },
        }}
      >
        <Tab label="RSI (Relative Strength)" />
        <Tab label="EMA 20 & 50 Trend" />
        <Tab label="MACD Oscillator" />
      </Tabs>

      {/* TAB 0: RSI CHART */}
      {activeTab === 0 && (
        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="displayDate" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickLine={false} />
              <YAxis domain={[0, 100]} ticks={[30, 50, 70]} tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} orientation="right" />
              <Tooltip
                contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider, borderRadius: 8 }}
                formatter={(val) => [Number(val).toFixed(2), 'RSI']}
              />
              <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Overbought (70)', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }} />
              <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="2 2" />
              <ReferenceLine y={30} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Oversold (30)', fill: '#10b981', fontSize: 10, position: 'insideBottomRight' }} />
              <Line type="monotone" dataKey="rsi" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* TAB 1: EMA 20 & EMA 50 OVERLAY */}
      {activeTab === 1 && (
        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="displayDate" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} orientation="right" tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider, borderRadius: 8 }}
                formatter={(val, name) => [formatCurrency(val), name]}
              />
              <Line type="monotone" name="Price" dataKey="price" stroke={isDark ? '#e2e8f0' : '#334155'} strokeWidth={1.5} dot={false} />
              <Line type="monotone" name="EMA 20" dataKey="ema20" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
              <Line type="monotone" name="EMA 50" dataKey="ema50" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* TAB 2: MACD CHART */}
      {activeTab === 2 && (
        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="displayDate" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} orientation="right" />
              <Tooltip
                contentStyle={{ backgroundColor: theme.palette.background.paper, borderColor: theme.palette.divider, borderRadius: 8 }}
              />
              <ReferenceLine y={0} stroke={theme.palette.text.secondary} />
              <Bar dataKey="histogram" name="MACD Histogram">
                {history.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.histogram >= 0 ? '#10b981' : '#ef4444'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};

export default IndicatorChart;
