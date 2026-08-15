import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { normalizeConfidence } from '../../utils/formatters';

/**
 * Visual Confidence Gauge component with adaptive coloring
 */
export const ConfidenceGauge = ({
  score = 0,
  showLabel = true,
  size = 'medium',
  compact = false,
}) => {
  const value = normalizeConfidence(score);

  const getColor = (v) => {
    if (v >= 85) return '#10b981'; // High conviction (Emerald)
    if (v >= 70) return '#3b82f6'; // Strong (Blue)
    if (v >= 55) return '#f59e0b'; // Moderate (Amber)
    return '#ef4444'; // Weak (Red)
  };

  const getLabel = (v) => {
    if (v >= 90) return 'Very High';
    if (v >= 80) return 'High';
    if (v >= 65) return 'Moderate';
    return 'Low';
  };

  const color = getColor(value);

  if (compact) {
    return (
      <Tooltip title={`Confidence Score: ${value}% (${getLabel(value)})`} arrow>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              flexGrow: 1,
              height: 6,
              borderRadius: 3,
              bgcolor: 'background.subtle',
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
                borderRadius: 3,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color,
              minWidth: 32,
              textAlign: 'right',
            }}
          >
            {value}%
          </Typography>
        </Box>
      </Tooltip>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {showLabel && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
            {getLabel(value)} Conviction
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color,
            }}
          >
            {value}%
          </Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: size === 'small' ? 5 : 8,
          borderRadius: 4,
          bgcolor: 'background.subtle',
          '& .MuiLinearProgress-bar': {
            bgcolor: color,
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
};

export default ConfidenceGauge;
