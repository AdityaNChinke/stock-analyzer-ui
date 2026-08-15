import { Component } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
            bgcolor: '#090d16',
            color: '#f3f4f6',
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: 550,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: '#111827',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <Typography variant="h5" color="error.main" sx={{ fontWeight: 700, mb: 1 }}>
              Application Render Issue
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              A UI component encountered an unexpected error:
            </Typography>
            <Box
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                textAlign: 'left',
                overflowX: 'auto',
                color: '#f87171',
              }}
            >
              {this.state.error?.message || String(this.state.error)}
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={this.handleReset}
              sx={{ fontWeight: 700 }}
            >
              Reload Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
