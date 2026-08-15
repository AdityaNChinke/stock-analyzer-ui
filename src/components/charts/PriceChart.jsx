import { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency, formatPercent, formatCompactNumber } from '../../utils/formatters';
import { TIMEFRAMES } from '../../utils/constants';

/**
 * Custom Tooltip for Stock Price Chart
 */
const CustomPriceTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        minWidth: 160,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        {data.date || label}
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">Close:</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
            {formatCurrency(data.close || data.price)}
          </Typography>
        </Box>
        {data.open !== undefined && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">Open:</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {formatCurrency(data.open)}
            </Typography>
          </Box>
        )}
        {data.high !== undefined && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">High:</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {formatCurrency(data.high)}
            </Typography>
          </Box>
        )}
        {data.low !== undefined && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography variant="caption" color="text.secondary">Low:</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {formatCurrency(data.low)}
            </Typography>
          </Box>
        )}
        {data.volume !== undefined && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, pt: 0.5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary">Volume:</Typography>
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              {formatCompactNumber(data.volume)}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export const PriceChart = ({
  data = [],
  symbol = 'STOCK',
  currentPrice = null,
  height = 360,
}) => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('1M');

  // Safely normalize data into an Array
  const safeData = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') {
      if (Array.isArray(data.history)) return data.history;
      if (Array.isArray(data.prices)) return data.prices;
      if (Array.isArray(data.data)) return data.data;
    }
    return [];
  }, [data]);

  // Filter data based on selected timeframe
  const filteredData = useMemo(() => {
    if (!safeData || safeData.length === 0) return [];
    switch (timeframe) {
      case '1W':
        return safeData.slice(-5);
      case '1M':
        return safeData.slice(-22);
      case '3M':
        return safeData.slice(-66);
      case '6M':
        return safeData.slice(-130);
      case '1Y':
        return safeData.slice(-250);
      default:
        return safeData;
    }
  }, [safeData, timeframe]);

  // Calculate return over the selected period
  const periodReturn = useMemo(() => {
    if (filteredData.length < 2) return 0;
    const first = filteredData[0].close || filteredData[0].price || 1;
    const last = filteredData[filteredData.length - 1].close || filteredData[filteredData.length - 1].price || 1;
    return ((last - first) / first) * 100;
  }, [filteredData]);

  const isPositive = periodReturn >= 0;
  const strokeColor = isPositive ? '#10b981' : '#ef4444';
  const gradientId = `priceGradient_${symbol}_${isPositive ? 'green' : 'red'}`;

  // Min and max bounds for YAxis
  const [minPrice, maxPrice] = useMemo(() => {
    if (!filteredData.length) return [0, 100];
    const prices = filteredData.map((d) => d.close || d.price || 0).filter(Boolean);
    if (!prices.length) return [0, 100];
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = (max - min) * 0.08 || 5;
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [filteredData]);

  if (!safeData || safeData.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, height }}>
        <Typography variant="body2" color="text.secondary">
          No historical price data available for {symbol}.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      {/* Header with Price, Return & Timeframe selector */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '-0.02em',
              }}
            >
              {formatCurrency(currentPrice || (filteredData[filteredData.length - 1]?.close ?? 0))}
            </Typography>
            <Chip
              size="small"
              label={formatPercent(periodReturn)}
              sx={{
                fontWeight: 700,
                fontFamily: 'JetBrains Mono, monospace',
                bgcolor: isPositive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                color: strokeColor,
                border: `1px solid ${strokeColor}33`,
              }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {symbol} • Price History & Volume
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={timeframe}
          exclusive
          size="small"
          onChange={(e, val) => val && setTimeframe(val)}
          sx={{
            bgcolor: 'background.subtle',
            p: 0.25,
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              border: 0,
              borderRadius: 1.5,
              px: 1.5,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'text.secondary',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            },
          }}
        >
          {TIMEFRAMES.map((tf) => (
            <ToggleButton key={tf.value} value={tf.value}>
              {tf.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Main Interactive Price Chart */}
      <Box sx={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}
              vertical={false}
            />

            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
              minTickGap={30}
            />

            <YAxis
              domain={[minPrice, maxPrice]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
              tickFormatter={(val) => `$${val}`}
              orientation="right"
            />

            <Tooltip content={<CustomPriceTooltip />} />

            <Area
              type="monotone"
              dataKey="close"
              stroke={strokeColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PriceChart;
