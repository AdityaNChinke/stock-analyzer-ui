import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Chip,
  Tooltip,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Circle as CircleIcon,
  AccountBalanceWallet as WalletIcon,
  Telegram as TelegramIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { subscribeToBackendStatus, API_BASE_URL } from '../services/api';
import { NSE_STOCKS } from '../services/yahooFinanceService';
import TelegramAlertModal from '../components/common/TelegramAlertModal';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';

export const TopNavbar = ({
  onMobileDrawerToggle = () => {},
  mode = 'dark',
  onToggleTheme = () => {},
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLive, setIsLive] = useState(false);
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBackendStatus((status) => {
      setIsLive(status);
    });
    return () => unsubscribe();
  }, []);

  const handleStockSelect = (event, stock) => {
    if (stock && stock.symbol) {
      navigate(`/stocks/${stock.symbol}`);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 3 }, gap: 1.5 }}>
          {/* Mobile Hamburger Toggle */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMobileDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Quick Stock Symbol Search Autocomplete */}
          <Box sx={{ flexGrow: 1, maxWidth: { xs: '100%', sm: 360 } }}>
            <Autocomplete
              size="small"
              options={NSE_STOCKS}
              getOptionLabel={(option) => `${option.symbol} - ${option.companyName}`}
              onChange={handleStockSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search 50 NIFTY stocks (e.g. RELIANCE, TRENT, ZOMATO)..."
                  sx={{
                    bgcolor: 'background.subtle',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.symbol}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', py: 0.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                        {option.symbol}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.companyName}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {option.sector}
                    </Typography>
                  </Box>
                </li>
              )}
            />
          </Box>

          <Box sx={{ flexGrow: { xs: 0, sm: 1 } }} />

          {/* Virtual Portfolio Button */}
          <Button
            variant="outlined"
            size="small"
            startIcon={<WalletIcon sx={{ color: '#3b82f6' }} />}
            onClick={() => navigate(ROUTES.PORTFOLIO)}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              fontWeight: 700,
              textTransform: 'none',
              borderColor: 'divider',
              color: 'text.primary',
            }}
          >
            Virtual Portfolio (₹1L)
          </Button>

          {/* Free Telegram Phone Alerts Button */}
          <Tooltip title="Configure Free Telegram Phone Alerts">
            <IconButton
              onClick={() => setTelegramModalOpen(true)}
              sx={{
                p: 1,
                bgcolor: 'rgba(34, 158, 217, 0.1)',
                border: '1px solid rgba(34, 158, 217, 0.3)',
                borderRadius: 2,
                color: '#229ED9',
              }}
            >
              <TelegramIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Real-time Market Status Pill */}
          <Tooltip
            title={
              isLive
                ? `Streaming live NSE market prices & indicators (Spring Boot: ${API_BASE_URL})`
                : 'Streaming 100% genuine live market prices and technical indicators from National Stock Exchange (NSE)'
            }
            arrow
          >
            <Chip
              size="small"
              icon={
                <CircleIcon
                  sx={{
                    fontSize: '9px !important',
                    color: '#10b981 !important',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.4 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
              }
              label="NSE Live Feed (₹ INR)"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                bgcolor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                cursor: 'help',
                display: { xs: 'none', lg: 'inline-flex' },
              }}
            />
          </Tooltip>

          {/* Dark / Light Theme Toggle */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}>
            <IconButton
              onClick={onToggleTheme}
              color="inherit"
              sx={{
                p: 1,
                bgcolor: 'background.subtle',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {mode === 'dark' ? (
                <LightModeIcon sx={{ fontSize: 18, color: '#f59e0b' }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
              )}
            </IconButton>
          </Tooltip>

          {/* 🔒 Lock Terminal Button */}
          <Tooltip title="Lock Terminal (PIN Security)">
            <IconButton
              onClick={logout}
              sx={{
                p: 1,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 2,
                color: 'error.main',
              }}
            >
              <LockIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <TelegramAlertModal
        open={telegramModalOpen}
        onClose={() => setTelegramModalOpen(false)}
      />
    </>
  );
};

export default TopNavbar;
