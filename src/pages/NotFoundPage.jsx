import { Paper, Typography, Button } from '@mui/material';
import { Dashboard as DashboardIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 3,
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          fontFamily: 'monospace',
          color: 'primary.main',
          fontSize: '5rem',
          letterSpacing: '-0.05em',
        }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 460, mb: 3 }}>
        The requested stock analysis page or trading endpoint does not exist. Please return to the overview dashboard.
      </Typography>
      <Button
        variant="contained"
        startIcon={<DashboardIcon />}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        sx={{ fontWeight: 700 }}
      >
        Return to Dashboard
      </Button>
    </Paper>
  );
};

export default NotFoundPage;
