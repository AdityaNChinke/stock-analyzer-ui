import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Paper,
  Slider,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Calculate as CalculatorIcon,
  MonetizationOn as ProfitIcon,
  ShieldOutlined as ShieldIcon,
} from '@mui/icons-material';
import { calculateIpoInvestment } from '../../services/ipoService';
import { formatCurrency } from '../../utils/formatters';

export const IpoCalculatorModal = ({ open, onClose, ipo }) => {
  const [lots, setLots] = useState(1);

  if (!ipo) return null;

  const maxRetailLots = useMemo(() => {
    const upperPrice = ipo.priceBand?.max || ipo.issuePrice || 100;
    const lotSize = ipo.lotSize || 1;
    const lotCost = upperPrice * lotSize;
    if (lotCost >= 100000) return 1; // SME limit
    return Math.max(1, Math.floor(200000 / lotCost)); // Retail limit ₹2 Lakhs
  }, [ipo]);

  const calculation = useMemo(() => {
    return calculateIpoInvestment(ipo, lots);
  }, [ipo, lots]);

  const isProfit = calculation.expectedProfit >= 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          bgcolor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalculatorIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            IPO Listing Profit Calculator
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* Company & Price Summary */}
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main' }}>
            {ipo.companyName} ({ipo.symbol})
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Price: <strong>₹{calculation.pricePerShare}</strong> • 1 Lot = <strong>{calculation.lotSize} Shares</strong> • Live GMP: <strong style={{ color: '#10b981' }}>+₹{ipo.gmp?.price || 0} ({ipo.gmp?.percent || 0}%)</strong>
          </Typography>
        </Box>

        {/* Lots Slider & Quick Buttons */}
        <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, bgcolor: 'background.subtle' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Number of Application Lots:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: 'monospace', color: 'primary.main' }}>
              {lots} {lots === 1 ? 'Lot' : 'Lots'} ({calculation.totalShares} Shares)
            </Typography>
          </Box>

          <Slider
            value={lots}
            min={1}
            max={maxRetailLots > 1 ? maxRetailLots : 5}
            step={1}
            marks
            onChange={(_, val) => setLots(val)}
            sx={{ mb: 1.5 }}
          />

          {/* Quick Select Buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant={lots === 1 ? 'contained' : 'outlined'}
              onClick={() => setLots(1)}
              sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
            >
              1 Lot (Min Bid)
            </Button>
            {maxRetailLots >= 2 && (
              <Button
                size="small"
                variant={lots === 2 ? 'contained' : 'outlined'}
                onClick={() => setLots(2)}
                sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
              >
                2 Lots
              </Button>
            )}
            {maxRetailLots >= 5 && (
              <Button
                size="small"
                variant={lots === 5 ? 'contained' : 'outlined'}
                onClick={() => setLots(5)}
                sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
              >
                5 Lots
              </Button>
            )}
            {maxRetailLots > 1 && (
              <Button
                size="small"
                variant={lots === maxRetailLots ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setLots(maxRetailLots)}
                sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
              >
                Max Retail ({maxRetailLots} Lots ≈ ₹2L)
              </Button>
            )}
          </Box>
        </Paper>

        {/* 💰 PROFIT OUTCOME SPOTLIGHT */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2.5,
            bgcolor: isProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1.5px solid ${isProfit ? '#10b981' : '#ef4444'}40`,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', letterSpacing: 1 }}>
            ESTIMATED LISTING DAY NET PROFIT
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontFamily: 'JetBrains Mono, monospace',
              color: isProfit ? 'success.main' : 'error.main',
              my: 1,
            }}
          >
            {isProfit ? '+' : ''}{formatCurrency(calculation.expectedProfit)}
          </Typography>
          <Chip
            icon={<ProfitIcon />}
            label={`+${calculation.profitPercent}% Estimated Listing Gain on Capital`}
            sx={{
              fontWeight: 800,
              bgcolor: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
            }}
          />
        </Paper>

        {/* Breakdown Grid */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', height: '100%' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                TOTAL CAPITAL REQUIRED
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5 }}>
                {formatCurrency(calculation.totalCapital)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Blocked via ASBA / UPI
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', height: '100%' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                ESTIMATED TOTAL VALUE
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5, color: 'primary.main' }}>
                {formatCurrency(calculation.totalCapital + calculation.expectedProfit)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                At Est. ₹{calculation.estimatedListingPrice} Listing
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" fullWidth sx={{ fontWeight: 700, textTransform: 'none' }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IpoCalculatorModal;
