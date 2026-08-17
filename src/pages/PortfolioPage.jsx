import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  TableBody,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Sell as SellIcon,
  Refresh as RefreshIcon,
  RestartAlt as ResetIcon,
  CheckCircle as WinIcon,
  Cancel as LossIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getPortfolio, sellStock, resetPortfolio, computePortfolioSummary } from '../services/paperTradingService';
import { getLiveIndianStocks } from '../services/yahooFinanceService';
import TradeModal from '../components/portfolio/TradeModal';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

export const PortfolioPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(() => computePortfolioSummary(getPortfolio()));
  const [loading, setLoading] = useState(false);
  const [tradeModalStock, setTradeModalStock] = useState(null);

  const refreshLiveMetrics = useCallback(async () => {
    setLoading(true);
    try {
      const liveStocks = await getLiveIndianStocks();
      const priceMap = {};
      (liveStocks || []).forEach((s) => {
        priceMap[s.symbol] = s.price;
      });
      const current = getPortfolio();
      setSummary(computePortfolioSummary(current, priceMap));
    } catch {
      setSummary(computePortfolioSummary(getPortfolio()));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLiveMetrics();
    const handleUpdate = () => refreshLiveMetrics();
    window.addEventListener('portfolio-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-updated', handleUpdate);
  }, [refreshLiveMetrics]);

  const handleSell = (positionId, currentPrice) => {
    try {
      sellStock(positionId, currentPrice);
      refreshLiveMetrics();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset virtual portfolio balance back to initial ₹1,00,000 cash?')) {
      resetPortfolio();
      refreshLiveMetrics();
    }
  };

  const isPositivePnl = summary.unrealizedPnl >= 0;

  return (
    <Box>
      <PageHeader
        title="Virtual Trading Portfolio"
        subtitle="Practice swing trading strategies with ₹1,00,000 simulated cash and track real-time P&L."
        breadcrumbs={[
          { label: 'Dashboard', path: ROUTES.DASHBOARD },
          { label: 'Paper Portfolio', path: null },
        ]}
        onRefresh={refreshLiveMetrics}
        refreshing={loading}
        actions={
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() =>
                setTradeModalStock({
                  symbol: 'TRENT',
                  companyName: 'Trent Limited (Zudio)',
                  currentPrice: 2978.00,
                  targetPrice: 3275.00,
                  stopLoss: 2844.00,
                })
              }
              sx={{ textTransform: 'none', fontWeight: 800, bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}
            >
              ➕ Quick Buy Stock
            </Button>
            <Tooltip title="Reset your paper trading balance back to the starting amount of ₹1,00,000 cash" arrow>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<ResetIcon />}
                onClick={handleReset}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Reset to ₹1L
              </Button>
            </Tooltip>
            <Tooltip title="View today's top 5 highest-probability swing trading trade setups" arrow>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<TrendingUpIcon />}
                onClick={() => navigate(ROUTES.TODAY_RECOMMENDATIONS)}
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                Find New Setups
              </Button>
            </Tooltip>
          </Box>
        }
      />

      <TradeModal
        open={!!tradeModalStock}
        onClose={() => setTradeModalStock(null)}
        stock={tradeModalStock}
        onTradeSuccess={refreshLiveMetrics}
      />

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Portfolio Value"
            value={formatCurrency(summary.totalPortfolioValue)}
            subtitle="Cash + Open Holdings"
            icon={<WalletIcon />}
            accentColor="#3b82f6"
            badgeText={summary.totalPortfolioValue >= 100000 ? '+PROFIT' : '-DRAWDOWN'}
            badgeType={summary.totalPortfolioValue >= 100000 ? 'positive' : 'negative'}
            tooltip="💰 Total Net Worth: Combined value of your available cash plus all open stock holdings at current live market prices."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Unrealized P&L"
            value={formatCurrency(summary.unrealizedPnl)}
            subtitle={`${summary.unrealizedPnlPercent >= 0 ? '+' : ''}${summary.unrealizedPnlPercent.toFixed(2)}% on open positions`}
            icon={isPositivePnl ? <TrendingUpIcon /> : <TrendingDownIcon />}
            accentColor={isPositivePnl ? '#10b981' : '#ef4444'}
            badgeText={isPositivePnl ? 'Green' : 'Red'}
            badgeType={isPositivePnl ? 'positive' : 'negative'}
            tooltip="📈 Live Unrealized Profit/Loss: Profit or loss on your currently open stocks if you were to sell them at current live prices right now."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Available Virtual Cash"
            value={formatCurrency(summary.cashBalance)}
            subtitle="Ready for new swing orders"
            icon={<WalletIcon />}
            accentColor="#f59e0b"
            badgeText="Liquid"
            badgeType="neutral"
            tooltip="💵 Liquid Cash: Virtual funds ready to buy new stock positions without risking real money."
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Strategy Win Rate"
            value={`${summary.winRate}%`}
            subtitle={`${summary.closedTradesCount} closed trades total`}
            icon={<WinIcon />}
            accentColor="#8b5cf6"
            badgeText={`₹${summary.totalRealizedPnl.toFixed(0)} Realized`}
            badgeType={summary.totalRealizedPnl >= 0 ? 'positive' : 'negative'}
            tooltip="🎯 Historical Win Rate: The percentage of your past closed swing trades that finished in a profit."
          />
        </Grid>
      </Grid>

      {/* OPEN POSITIONS TABLE */}
      <Paper sx={{ p: 3, mb: 3.5, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Active Open Positions ({summary.openPositionsCount})
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Live prices update automatically with market ticks
          </Typography>
        </Box>

        {summary.positions.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              No active open positions. Click below to simulate your first swing trade!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate(ROUTES.TODAY_RECOMMENDATIONS)}
              sx={{ textTransform: 'none', fontWeight: 700 }}
            >
              Browse Top 5 Swing Picks
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>STOCK</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>QTY</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>BUY PRICE</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>CURRENT PRICE</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>TARGET / STOP</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>P&L (₹ / %)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summary.positions.map((pos) => {
                  const isGreen = pos.pnl >= 0;
                  return (
                    <TableRow key={pos.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="subtitle2"
                            onClick={() => navigate(`/stocks/${pos.symbol}`)}
                            sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main', cursor: 'pointer' }}
                          >
                            {pos.symbol}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({pos.companyName})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {pos.shares}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                        {formatCurrency(pos.buyPrice)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {formatCurrency(pos.currentPrice)}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ fontSize: '0.75rem' }}>
                          <span style={{ color: '#10b981', fontWeight: 700 }}>🎯 {formatCurrency(pos.targetPrice)}</span>
                          <br />
                          <span style={{ color: '#ef4444', fontWeight: 700 }}>🛑 {formatCurrency(pos.stopLoss)}</span>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${isGreen ? '+' : ''}${formatCurrency(pos.pnl)} (${isGreen ? '+' : ''}${pos.pnlPercent.toFixed(2)}%)`}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontFamily: 'monospace',
                            bgcolor: isGreen ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: isGreen ? '#10b981' : '#ef4444',
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<SellIcon />}
                          onClick={() => handleSell(pos.id, pos.currentPrice)}
                          sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem', py: 0.5 }}
                        >
                          Sell / Close
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* CLOSED TRADES HISTORY */}
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Closed Trades History & Strategy Ledger
        </Typography>

        {summary.tradeHistory.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No closed trades yet. When you exit an open position, its performance will be recorded here.
          </Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>STOCK</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>QTY</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>ENTRY</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>EXIT</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>DURATION</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>REALIZED P&L</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>OUTCOME</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summary.tradeHistory.map((trade) => {
                  const isWin = trade.realizedPnl >= 0;
                  return (
                    <TableRow key={trade.id} hover>
                      <TableCell sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {trade.symbol}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                        {trade.shares}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                        {formatCurrency(trade.buyPrice)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {formatCurrency(trade.sellPrice)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary' }}>
                        {trade.durationDays} Days
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 800,
                            color: isWin ? 'success.main' : 'error.main',
                          }}
                        >
                          {isWin ? '+' : ''}{formatCurrency(trade.realizedPnl)} ({isWin ? '+' : ''}{trade.realizedPnlPercent}%)
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={isWin ? <WinIcon sx={{ fontSize: '13px !important' }} /> : <LossIcon sx={{ fontSize: '13px !important' }} />}
                          label={trade.outcome}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            bgcolor: isWin ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: isWin ? '#10b981' : '#ef4444',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default PortfolioPage;
