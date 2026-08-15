import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const DRAWER_WIDTH = 250;

export const MainLayout = ({ mode, onToggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {/* Top Navbar */}
        <TopNavbar
          onMobileDrawerToggle={handleDrawerToggle}
          mode={mode}
          onToggleTheme={onToggleTheme}
        />

        {/* Page Container */}
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            py: { xs: 2.5, sm: 3.5 },
            px: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
