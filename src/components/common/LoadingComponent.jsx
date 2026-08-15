import { Box, CircularProgress, Typography, Skeleton, Grid, Paper } from '@mui/material';

/**
 * Reusable Loading Component with multiple display modes
 * @param {'fullscreen' | 'card' | 'table' | 'chart' | 'inline'} mode
 * @param {string} message
 * @param {number} count - number of skeletons
 */
export const LoadingComponent = ({
  mode = 'inline',
  message = 'Loading data...',
  count = 4,
}) => {
  if (mode === 'fullscreen') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}
      >
        <CircularProgress size={44} thickness={4} color="primary" />
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
          {message}
        </Typography>
      </Box>
    );
  }

  if (mode === 'card') {
    return (
      <Grid container spacing={3}>
        {Array.from(new Array(count)).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="circular" width={36} height={36} />
              </Box>
              <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (mode === 'table') {
    return (
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="rectangular" width={200} height={36} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1.5 }} />
        </Box>
        {Array.from(new Array(count || 5)).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={52}
            sx={{ my: 1, borderRadius: 1 }}
          />
        ))}
      </Paper>
    );
  }

  if (mode === 'chart') {
    return (
      <Paper sx={{ p: 3, borderRadius: 3, height: 380, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="rectangular" width={150} height={32} sx={{ borderRadius: 2 }} />
        </Box>
        <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 2 }} />
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        gap: 2,
      }}
    >
      <CircularProgress size={28} thickness={4} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
