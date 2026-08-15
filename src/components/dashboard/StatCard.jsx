import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';

/**
 * Reusable Dashboard KPI Stat Card
 */
export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  accentColor = '#3b82f6',
  badgeText = null,
  badgeType = 'positive',
  onClick = null,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 12px 24px -4px rgba(0, 0, 0, 0.4), 0 0 1px 1px rgba(255, 255, 255, 0.1)'
                  : '0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
              borderColor: accentColor,
            }
          : {},
        borderTop: `3px solid ${accentColor}`,
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mt: 0.5,
                mb: 0.5,
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '-0.03em',
                color: 'text.primary',
              }}
            >
              {value ?? '—'}
            </Typography>
          </Box>

          <Avatar
            variant="rounded"
            sx={{
              bgcolor: `${accentColor}18`,
              color: accentColor,
              width: 44,
              height: 44,
              borderRadius: 2.5,
              border: `1px solid ${accentColor}33`,
            }}
          >
            {icon}
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {subtitle}
            </Typography>
          )}

          {badgeText && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.7rem',
                fontWeight: 700,
                bgcolor:
                  badgeType === 'positive'
                    ? 'rgba(16, 185, 129, 0.12)'
                    : badgeType === 'negative'
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(245, 158, 11, 0.12)',
                color:
                  badgeType === 'positive'
                    ? '#10b981'
                    : badgeType === 'negative'
                    ? '#ef4444'
                    : '#f59e0b',
              }}
            >
              {badgeText}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
