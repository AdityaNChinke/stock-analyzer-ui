import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  Alert,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  AccountBalanceWallet as WalletIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { getPortfolio, buyStock } from '../../services/paperTradingService';
import { formatCurrency } from '../../utils/formatters';

export const TradeModal = ({
  open,
  onClose,
  stock = null,
  onTradeSuccess = () => {},
}) => {
  const [shares, setShares] = useState(10);
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [cashBalance, setCashBalance] = useState(100000);

  useEffect(() => {
    if (open && stock) {
      const p = getPortfolio();
      setCashBalance(p.cashBalance);
      const current = stock.currentPrice || stock.price || 1000;
      setTargetPrice(stock.targetPrice || Number((current * 1.10).toFixed(2)));
      setStopLoss(stock.stopLoss || Number((current * 0.955).toFixed(2)));
      setShares(Math.max(1, Math.floor(20000 / current)));
      setError('');
      setSuccessMsg('');
    }
  }, [open, stock]);

  if (!stock) return null;

  const currentPrice = stock.currentPrice || stock.price || 0;
  const totalCost = Number(shares || 0) * currentPrice;
  const canAfford = totalCost <= cashBalance && totalCost > 0;

  const handleBuy = () => {
    setError('');
    try {
      buyStock({
        symbol: stock.symbol,
        companyName: stock.companyName,
        shares: Number(shares),
        currentPrice,
        targetPrice: Number(targetPrice),
        stopLoss: Number(stopLoss),
        notes,
      });
      setSuccessMsg(`Successfully simulated BUY of ${shares} shares of ${stock.symbol}!`);
      setTimeout(() => {
        onTradeSuccess();
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WalletIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Simulate Buy Order
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {successMsg ? (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        ) : null}

        {error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : null}

        {/* Stock & Available Balance */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1.5, bgcolor: 'background.subtle', borderRadius: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main' }}>
              {stock.symbol}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {stock.companyName}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              Available Cash
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
              {formatCurrency(cashBalance)}
            </Typography>
          </Box>
        </Box>

        {/* Live Execution Price */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            CURRENT MARKET PRICE
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
            {formatCurrency(currentPrice)}
          </Typography>
        </Box>

        {/* Quantity Input */}
        <TextField
          fullWidth
          label="Quantity (Shares)"
          type="number"
          size="small"
          value={shares}
          onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 0))}
          inputProps={{ min: 1 }}
          sx={{ mb: 2 }}
        />

        {/* Target & Stop Loss */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <TextField
            fullWidth
            label="Target Price (₹)"
            type="number"
            size="small"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
          <TextField
            fullWidth
            label="Stop Loss (₹)"
            type="number"
            size="small"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
          />
        </Box>

        {/* Optional Notes */}
        <TextField
          fullWidth
          label="Trade Strategy Notes"
          size="small"
          placeholder="e.g. 20 EMA pullback bounce setup"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 1.5 }} />

        {/* Total Cost Calculation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Typography variant="body2" color="text.secondary">
            Estimated Investment:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', color: canAfford ? 'text.primary' : 'error.main' }}>
            {formatCurrency(totalCost)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuy}
          disabled={!canAfford || !!successMsg}
          sx={{ fontWeight: 700, textTransform: 'none', px: 3 }}
        >
          Confirm Simulate Buy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradeModal;
