import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

/**
 * Reusable Error Component with retry functionality and optional collapsible debug details
 */
export const ErrorComponent = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while fetching data from the backend.',
  errorDetails = null,
  onRetry = null,
  fullPage = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'error.border',
        bgcolor: 'error.bg',
        ...(fullPage && {
          minHeight: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <ErrorIcon color="error" sx={{ fontSize: 28 }} />
        <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 600 }}>
        {message}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        {onRetry && (
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Retry Connection
          </Button>
        )}

        {errorDetails && (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<CodeIcon />}
            endIcon={
              <ExpandMoreIcon
                sx={{
                  transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              />
            }
            onClick={() => setShowDetails(!showDetails)}
            sx={{ textTransform: 'none', borderColor: 'divider' }}
          >
            {showDetails ? 'Hide Error Details' : 'View Error Details'}
          </Button>
        )}
      </Box>

      {errorDetails && (
        <Collapse in={showDetails} sx={{ mt: 2, width: '100%' }}>
          <Alert severity="error" variant="outlined" sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
            {typeof errorDetails === 'string' ? errorDetails : JSON.stringify(errorDetails, null, 2)}
          </Alert>
        </Collapse>
      )}
    </Paper>
  );
};

export default ErrorComponent;
