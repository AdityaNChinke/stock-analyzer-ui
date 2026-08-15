import { Box, Typography, Button, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Refresh as RefreshIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';

/**
 * Standardized Page Header Component
 */
export const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  onRefresh,
  refreshing = false,
  actions = null,
}) => {
  return (
    <Box sx={{ mb: 3.5 }}>
      {breadcrumbs.length > 0 && (
        <Breadcrumbs
          separator={<ChevronRightIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
          sx={{ mb: 1 }}
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            if (isLast || !crumb.path) {
              return (
                <Typography key={idx} variant="caption" color="text.primary" sx={{ fontWeight: 600 }}>
                  {crumb.label}
                </Typography>
              );
            }
            return (
              <MuiLink
                key={idx}
                component={RouterLink}
                to={crumb.path}
                underline="hover"
                variant="caption"
                color="text.secondary"
              >
                {crumb.label}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'text.primary',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {onRefresh && (
            <Button
              variant="outlined"
              size="small"
              startIcon={
                <RefreshIcon
                  sx={{
                    animation: refreshing ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />
              }
              onClick={onRefresh}
              disabled={refreshing}
              sx={{
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
              }}
            >
              Refresh
            </Button>
          )}
          {actions}
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;
