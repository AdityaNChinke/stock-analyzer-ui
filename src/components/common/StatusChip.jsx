import { Chip } from '@mui/material';
import {
  TrendingUp as BuyIcon,
  TrendingDown as SellIcon,
  Visibility as WatchIcon,
  PauseCircle as HoldIcon,
} from '@mui/icons-material';
import { RECOMMENDATION_COLORS } from '../../utils/constants';

/**
 * Reusable Status Chip for BUY / SELL / WATCH / HOLD recommendations
 */
export const StatusChip = ({ status = 'BUY', size = 'small', sx = {} }) => {
  const norm = String(status || 'WATCH').toUpperCase();
  const config = RECOMMENDATION_COLORS[norm] || RECOMMENDATION_COLORS.WATCH;

  let icon = <WatchIcon sx={{ fontSize: '14px !important' }} />;
  if (norm.includes('BUY')) {
    icon = <BuyIcon sx={{ fontSize: '14px !important' }} />;
  } else if (norm.includes('SELL')) {
    icon = <SellIcon sx={{ fontSize: '14px !important' }} />;
  } else if (norm.includes('HOLD')) {
    icon = <HoldIcon sx={{ fontSize: '14px !important' }} />;
  }

  return (
    <Chip
      size={size}
      icon={icon}
      label={norm}
      sx={{
        backgroundColor: config.bgDark || 'rgba(245, 158, 11, 0.12)',
        color: config.main,
        border: `1px solid ${config.border || 'transparent'}`,
        fontWeight: 700,
        fontSize: size === 'small' ? '0.75rem' : '0.85rem',
        letterSpacing: '0.04em',
        '& .MuiChip-icon': {
          color: 'inherit',
        },
        ...sx,
      }}
    />
  );
};

export default StatusChip;
