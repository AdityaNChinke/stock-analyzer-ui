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
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const DRAWER_WIDTH = 250;

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <DashboardIcon />,
  },
  {
    label: 'Stock List',
    path: ROUTES.STOCKS,
    icon: <StocksIcon />,
  },
  {
    label: 'Recommendations',
    path: ROUTES.RECOMMENDATIONS,
    icon: <RecommendationsIcon />,
  },
  {
    label: "Today's Picks",
    path: ROUTES.TODAY_RECOMMENDATIONS,
    icon: <TodayIcon />,
    badge: 'TOP 5',
    badgeColor: 'success',
  },
  {
    label: 'Virtual Portfolio',
    path: ROUTES.PORTFOLIO,
    icon: <PerformanceIcon />,
    badge: '₹1L',
    badgeColor: 'primary',
  },
  {
    label: 'Performance',
    path: ROUTES.PERFORMANCE,
    icon: <DashboardIcon />,
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
            </ListItem>
          );
        })}
      </List>

      {/* Footer / System Status */}
      <Box sx={{ p: 2, m: 1.5, borderRadius: 2, bgcolor: 'background.subtle', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600, mb: 0.5 }}>
          Spring Boot API
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.7rem',
            color: 'text.primary',
            wordBreak: 'break-all',
            display: 'block',
          }}
        >
          localhost:8080/api
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Persistent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
