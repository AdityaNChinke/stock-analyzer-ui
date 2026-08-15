import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          primary: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#6d28d9',
          },
          background: {
            default: '#090d16',
            paper: '#111827',
            subtle: '#1f2937',
            elevated: '#1a2234',
          },
          text: {
            primary: '#f3f4f6',
            secondary: '#9ca3af',
            disabled: '#6b7280',
          },
          success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
            bg: 'rgba(16, 185, 129, 0.12)',
            border: 'rgba(16, 185, 129, 0.3)',
          },
          error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
            bg: 'rgba(239, 68, 68, 0.12)',
            border: 'rgba(239, 68, 68, 0.3)',
          },
          warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
            bg: 'rgba(245, 158, 11, 0.12)',
            border: 'rgba(245, 158, 11, 0.3)',
          },
          info: {
            main: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2',
            bg: 'rgba(6, 182, 212, 0.12)',
            border: 'rgba(6, 182, 212, 0.3)',
          },
          divider: 'rgba(255, 255, 255, 0.08)',
        }
      : {
          primary: {
            main: '#2563eb',
            light: '#3b82f6',
            dark: '#1d4ed8',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#7c3aed',
            light: '#8b5cf6',
            dark: '#6d28d9',
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff',
            subtle: '#f1f5f9',
            elevated: '#f8fafc',
          },
          text: {
            primary: '#0f172a',
            secondary: '#64748b',
            disabled: '#94a3b8',
          },
          success: {
            main: '#059669',
            light: '#10b981',
            dark: '#047857',
            bg: '#ecfdf5',
            border: 'rgba(5, 150, 105, 0.25)',
          },
          error: {
            main: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
            bg: '#fef2f2',
            border: 'rgba(220, 38, 38, 0.25)',
          },
          warning: {
            main: '#d97706',
            light: '#f59e0b',
            dark: '#b45309',
            bg: '#fffbeb',
            border: 'rgba(217, 119, 6, 0.25)',
          },
          info: {
            main: '#0284c7',
            light: '#0ea5e9',
            dark: '#0369a1',
            bg: '#f0f9ff',
            border: 'rgba(2, 132, 199, 0.25)',
          },
          divider: 'rgba(0, 0, 0, 0.08)',
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.625rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.375rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    subtitle1: {
      fontSize: '0.9375rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.8125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    mono: {
      fontFamily: '"JetBrains Mono", monospace',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#374151 #111827' : '#cbd5e1 #f8fafc',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#374151' : '#cbd5e1',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          borderRadius: 12,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
          fontSize: '0.875rem',
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'dark' ? '#0f172a' : '#f8fafc',
          color: mode === 'dark' ? '#94a3b8' : '#475569',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        },
      },
    },
  },
});

export const createAppTheme = (mode = 'dark') => {
  return createTheme(getDesignTokens(mode));
};
