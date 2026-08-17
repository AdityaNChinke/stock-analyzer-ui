import { useState, useMemo, useEffect } from 'react';
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
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Calculate as CalculatorIcon,
  MonetizationOn as ProfitIcon,
  Tune as TuneIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatters';

export const IpoCalculatorModal = ({ open, onClose, ipo }) => {
  const [lots, setLots] = useState(1);
  const [customGmp, setCustomGmp] = useState(ipo?.gmp?.price || 0);

  useEffect(() => {
    if (ipo) {
      setCustomGmp(ipo.gmp?.price || 0);
      setLots(1);
    }
  }, [ipo]);

  if (!ipo) return null;

  const upperPrice = ipo.priceBand?.max || ipo.issuePrice || 100;
  const lotSize = ipo.lotSize || 1;
  const lotCost = upperPrice * lotSize;

  const maxRetailLots = useMemo(() => {
    if (lotCost >= 100000) return 1; // SME limit
    return Math.max(1, Math.floor(200000 / lotCost)); // Retail limit ₹2 Lakhs
  }, [lotCost]);

  // Real-time calculation based on selected Lots and Custom/Live GMP
  const calculation = useMemo(() => {
    const totalShares = lots * lotSize;
    const totalInvestment = totalShares * upperPrice;
    const activeGmp = Number(customGmp) || 0;
    const expectedProfit = totalShares * activeGmp;
    const estimatedListingPrice = upperPrice + activeGmp;
    const profitPercent = upperPrice > 0 ? ((activeGmp / upperPrice) * 100).toFixed(1) : '0.0';

    return {
      pricePerShare: upperPrice,
      lotSize,
      lots,
      totalShares,
      totalInvestment,
      activeGmp,
      estimatedListingPrice,
      expectedProfit,
      profitPercent,
    };
  }, [lots, lotSize, upperPrice, customGmp]);

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
            IPO Listing Profit & GMP Calculator
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
            Price Band: <strong>₹{upperPrice}</strong> • 1 Lot = <strong>{lotSize} Shares</strong> • Chittorgarh Range: <strong style={{ color: '#10b981' }}>{ipo.gmp?.range || `₹${ipo.gmp?.price || 0}`}</strong>
          </Typography>
        </Box>

        {/* 🎛️ INTERACTIVE LIVE GMP ADJUSTER */}
        <Paper sx={{ p: 2, mb: 2.5, borderRadius: 2, bgcolor: 'background.subtle', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <TuneIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                Adjust Live GMP (₹ per Share):
              </Typography>
            </Box>
            <Chip
              label={`Listing @ ₹${calculation.estimatedListingPrice} (+${calculation.profitPercent}%)`}
              size="small"
              sx={{ fontWeight: 800, fontSize: '0.7rem', bgcolor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}
            />
          </Box>

          <Grid container spacing={1.5} alignItems="center">
            <Grid item size={{ xs: 7 }}>
              <Slider
                value={Number(customGmp) || 0}
                min={0}
                max={Math.max(100, (ipo.gmp?.price || 50) * 2.5)}
                step={1}
                onChange={(_, val) => setCustomGmp(val)}
                sx={{ color: '#10b981' }}
              />
            </Grid>
            <Grid item size={{ xs: 5 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={customGmp}
                onChange={(e) => setCustomGmp(Math.max(0, Number(e.target.value)))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{
                  '& input': { fontWeight: 800, fontFamily: 'monospace', textAlign: 'center' },
                }}
              />
            </Grid>
          </Grid>
        </Paper>

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

        {/* Investment Details Grid */}
        <Grid container spacing={1.5}>
          <Grid item size={{ xs: 6 }}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Total Capital Blocked (UPI)
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                {formatCurrency(calculation.totalInvestment)}
              </Typography>
            </Box>
          </Grid>
          <Grid item size={{ xs: 6 }}>
            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Projected Total Listing Value
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'success.main' }}>
                {formatCurrency(calculation.totalInvestment + calculation.expectedProfit)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} variant="contained" fullWidth sx={{ fontWeight: 700, textTransform: 'none', py: 1.2, borderRadius: 2 }}>
          Close Calculator
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IpoCalculatorModal;
