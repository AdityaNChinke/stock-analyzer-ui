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
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  AccountBalanceWallet as WalletIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { getPortfolio, buyStock } from '../../services/paperTradingService';
import { formatCurrency } from '../../utils/formatters';

export const TradeModal = ({
  open,
  onClose,
  stock = null,
  onTradeSuccess = () => {},
}) => {
  const [shares, setShares] = useState('5');
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
      setTargetPrice(stock.targetPrice ? String(stock.targetPrice) : String(Number((current * 1.10).toFixed(2))));
      setStopLoss(stock.stopLoss ? String(stock.stopLoss) : String(Number((current * 0.955).toFixed(2))));
      // Default to 5 shares or budget ~20k
      const defaultQty = Math.max(1, Math.floor(20000 / current));
      setShares(String(defaultQty || 5));
      setError('');
      setSuccessMsg('');
    }
  }, [open, stock]);

  if (!stock) return null;

  const currentPrice = stock.currentPrice || stock.price || 0;
  const numShares = parseInt(shares, 10) || 0;
  const totalCost = numShares * currentPrice;
  const canAfford = totalCost <= cashBalance && numShares > 0;
  const remainingCash = cashBalance - totalCost;

  const handleQtyChange = (e) => {
    const val = e.target.value;
    if (val === '') {
      setShares('');
    } else {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        setShares(String(parsed));
      }
    }
  };

  const adjustQty = (delta) => {
    const next = Math.max(1, (parseInt(shares, 10) || 0) + delta);
    setShares(String(next));
  };

  const setPresetQty = (qty) => {
    setShares(String(qty));
  };

  const setBudgetQty = (budgetAmount) => {
    if (currentPrice > 0) {
      const calculatedQty = Math.max(1, Math.floor(budgetAmount / currentPrice));
      setShares(String(calculatedQty));
    }
  };

  const handleBuy = () => {
    if (numShares <= 0) {
      setError('Please enter a valid quantity of at least 1 share.');
      return;
    }
    setError('');
    try {
      buyStock({
        symbol: stock.symbol,
        companyName: stock.companyName,
        shares: numShares,
        currentPrice,
        targetPrice: Number(targetPrice || currentPrice * 1.10),
        stopLoss: Number(stopLoss || currentPrice * 0.955),
        notes,
      });
      setSuccessMsg(`🎉 Successfully bought ${numShares} shares of ${stock.symbol}!`);
      setTimeout(() => {
        onTradeSuccess();
        onClose();
      }, 1000);
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

        {/* Stock Info & Available Virtual Cash */}
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
              Virtual Cash Balance
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'success.main' }}>
              {formatCurrency(cashBalance)}
            </Typography>
          </Box>
        </Box>

        {/* Live Execution Price */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            CURRENT MARKET PRICE (NSE LIVE)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
            {formatCurrency(currentPrice)}
          </Typography>
        </Box>

        {/* Quantity Input with Stepper (+ / -) */}
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
            NUMBER OF SHARES (QUANTITY)
          </Typography>
          <TextField
            fullWidth
            type="number"
            size="small"
            value={shares}
            onChange={handleQtyChange}
            placeholder="Enter shares (e.g. 2, 3, 10)..."
            inputProps={{ min: 1, step: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small" onClick={() => adjustQty(-1)} disabled={numShares <= 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => adjustQty(1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Quick Quantity Preset Chips */}
        <Box sx={{ mb: 2, display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {[1, 2, 3, 5, 10, 20, 50].map((qty) => (
            <Chip
              key={qty}
              label={`${qty} qty`}
              size="small"
              clickable
              onClick={() => setPresetQty(qty)}
              variant={numShares === qty ? 'filled' : 'outlined'}
              color={numShares === qty ? 'primary' : 'default'}
              sx={{ fontWeight: 700, fontSize: '0.72rem' }}
            />
          ))}
          <Chip
            label="₹20k Budget"
            size="small"
            clickable
            onClick={() => setBudgetQty(20000)}
            sx={{ fontWeight: 700, fontSize: '0.72rem', bgcolor: 'rgba(59, 130, 246, 0.12)', color: 'primary.main' }}
          />
        </Box>

        {/* Target & Stop Loss Inputs */}
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

        {/* Optional Trade Notes */}
        <TextField
          fullWidth
          label="Strategy Notes (Optional)"
          size="small"
          placeholder="e.g. 20 EMA bounce with MACD expansion"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{ mb: 1.5 }}
        />

        <Divider sx={{ my: 1.5 }} />

        {/* Total Cost & Remaining Cash */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Estimated Investment:
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', color: canAfford ? 'text.primary' : 'error.main' }}>
            {formatCurrency(totalCost)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Remaining Virtual Cash:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace', color: remainingCash >= 0 ? 'text.secondary' : 'error.main' }}>
            {formatCurrency(Math.max(0, remainingCash))}
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
          Confirm Buy ({numShares} {numShares === 1 ? 'Share' : 'Shares'})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradeModal;
