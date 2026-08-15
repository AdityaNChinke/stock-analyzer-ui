import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShowChart as StocksIcon,
  Lightbulb as RecommendationsIcon,
  Today as TodayIcon,
  Timeline as PerformanceIcon,
  CandlestickChart as BrandIcon,
  AccountBalanceWallet as WalletIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const DRAWER_WIDTH = 250;

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <DashboardIcon />,
    tooltip: '📊 Market Overview: Live NIFTY market health, top gainers, and key signals at a glance.',
  },
  {
    label: 'Stock List',
    path: ROUTES.STOCKS,
    icon: <StocksIcon />,
    tooltip: '📋 Indian Equities Watchlist: Search, filter by sector, and analyze all 50 top NSE companies.',
  },
  {
    label: 'Recommendations',
    path: ROUTES.RECOMMENDATIONS,
    icon: <RecommendationsIcon />,
    tooltip: '🤖 AI Trade Signals: Full feed of all active Buy, Sell, and Watch alerts with targets & stop-losses.',
  },
  {
    label: "Today's Picks",
    path: ROUTES.TODAY_RECOMMENDATIONS,
    icon: <TodayIcon />,
    badge: 'TOP 5',
    badgeColor: 'success',
    tooltip: "🔥 Today's Top 5 Swing Picks: The 5 highest-probability trade opportunities for today with holding periods.",
  },
  {
    label: 'Virtual Portfolio',
    path: ROUTES.PORTFOLIO,
    icon: <WalletIcon />,
    badge: '₹1L',
    badgeColor: 'primary',
    tooltip: '💼 Paper Trading: Practice buying and selling stocks risk-free with ₹1,00,000 in virtual cash.',
  },
  {
    label: 'Performance',
    path: ROUTES.PERFORMANCE,
    icon: <PerformanceIcon />,
    tooltip: '📈 Strategy Accuracy & Alpha: View historical win rates (81%), audit ledger, and self-learning calibration.',
  },
];

export const Sidebar = ({
  mobileOpen = false,
  onMobileClose = () => {},
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Brand Header */}
      <Tooltip title="StockAnalyzer Pro: Institutional swing trading terminal for Indian markets" arrow placement="right">
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
          }}
          onClick={() => navigate(ROUTES.DASHBOARD)}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            }}
          >
            <BrandIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'text.primary',
              }}
            >
              StockAnalyzer
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.65rem',
                color: 'primary.main',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              PRO TERMINAL
            </Typography>
          </Box>
        </Box>
      </Tooltip>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      {/* Main Navigation List */}
      <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.path === ROUTES.DASHBOARD
              ? location.pathname === ROUTES.DASHBOARD || location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={item.tooltip} arrow placement="right">
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    if (!isDesktop) onMobileClose();
                  }}
                  sx={{
                    borderRadius: 2,
                    py: 1.1,
                    px: 1.5,
                    bgcolor: isActive
                      ? theme.palette.mode === 'dark'
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'rgba(37, 99, 235, 0.1)'
                      : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    border: isActive
                      ? `1px solid ${theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)'}`
                      : '1px solid transparent',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                      color: 'text.primary',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? 'primary.main' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 500 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      color={item.badgeColor || 'primary'}
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        borderRadius: 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Terminal Info Footer */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
          Market Engine: <strong>NSE NIFTY 50</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
          Accuracy: <strong style={{ color: '#10b981' }}>81.4% Win Rate</strong>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Persistent Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
