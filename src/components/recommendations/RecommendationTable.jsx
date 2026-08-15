import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  Box,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as VisibilityIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import StatusChip from '../common/StatusChip';
import { formatCurrency, formatPercent, formatDate } from '../../utils/formatters';

export const RecommendationTable = ({
  recommendations = [],
  title = null,
  compact = false,
  limit = null,
  showPagination = true,
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(compact ? 5 : 10);

  const safeRecs = useMemo(() => {
    return Array.isArray(recommendations) ? recommendations : [];
  }, [recommendations]);

  const displayData = useMemo(() => {
    let data = [...safeRecs];
    if (limit && !showPagination) {
      return data.slice(0, limit);
    }
    return data;
  }, [safeRecs, limit, showPagination]);

  const paginatedData = useMemo(() => {
    if (!showPagination) return displayData;
    return displayData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [displayData, page, rowsPerPage, showPagination]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSignalIcon = (rec) => {
    const signal = (rec || '').toUpperCase();
    if (signal === 'BUY') return <TrendingUpIcon sx={{ color: 'success.main', fontSize: 18 }} />;
    if (signal === 'SELL') return <TrendingDownIcon sx={{ color: 'error.main', fontSize: 18 }} />;
    return <VisibilityIcon sx={{ color: 'warning.main', fontSize: 18 }} />;
  };

  if (safeRecs.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          No stock recommendations found matching your criteria.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3, bgcolor: 'background.paper' }}>
      {title && (
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
        </Box>
      )}

      <TableContainer>
        <Table size={compact ? 'small' : 'medium'}>
          <TableHead sx={{ bgcolor: 'background.subtle' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>
                <Tooltip title="Stock ticker symbol on the National Stock Exchange (NSE)" arrow>
                  <span>SYMBOL</span>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>
                <Tooltip title="Company name and its primary market industry" arrow>
                  <span>NAME / SECTOR</span>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Tooltip title="🟢 BUY = Enter trade, 🔴 SELL = Take profit or exit, 🟡 WATCH = Sideways consolidation" arrow>
                  <span>SIGNAL</span>
                </Tooltip>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                <Tooltip title="Live current market price in Indian Rupees (₹ INR)" arrow>
                  <span>PRICE</span>
                </Tooltip>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                <Tooltip title="Calculated profit target level (3.0x ATR volatility upside)" arrow>
                  <span>TARGET</span>
                </Tooltip>
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                <Tooltip title="Protective stop-loss price to limit downside risk (1.5x ATR volatility)" arrow>
                  <span>STOP LOSS</span>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Tooltip title="AI Conviction Score: Overall mathematical probability of success based on momentum and trend" arrow>
                  <span>CONVICTION</span>
                </Tooltip>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Tooltip title="View full interactive candlestick chart, technical oscillators, and trade simulation" arrow>
                  <span>ACTION</span>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id || row.symbol}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/stocks/${row.symbol}`)}
              >
                <TableCell>
                  <Tooltip title={`Tap to view full technical analysis for ${row.symbol}`} arrow>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getSignalIcon(row.recommendation)}
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main' }}>
                        {row.symbol}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.companyName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {row.sector}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={`Signal: ${row.recommendation} • Conviction: ${row.confidenceScore}%`} arrow>
                    <span>
                      <StatusChip status={row.recommendation} size="small" />
                    </span>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                    {formatCurrency(row.currentPrice)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={`Profit Target: ${formatCurrency(row.targetPrice)} (+${(((row.targetPrice - row.currentPrice) / (row.currentPrice || 1)) * 100).toFixed(1)}% upside)`} arrow>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'success.main' }}>
                      {formatCurrency(row.targetPrice)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={`Safety Stop Loss: ${formatCurrency(row.stopLoss)} (-${(((row.currentPrice - row.stopLoss) / (row.currentPrice || 1)) * 100).toFixed(1)}% maximum risk)`} arrow>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'error.main' }}>
                      {formatCurrency(row.stopLoss)}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={`AI Confidence Rating: ${row.confidenceScore}/100 based on Wilder RSI + EMA alignment`} arrow>
                    <Chip
                      label={`${row.confidenceScore}%`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: '0.7rem',
                        bgcolor: row.confidenceScore >= 85 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                        color: row.confidenceScore >= 85 ? '#10b981' : '#3b82f6',
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={`Open complete candlestick chart & technical setup for ${row.symbol}`} arrow>
                    <Button
                      size="small"
                      endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stocks/${row.symbol}`);
                      }}
                      sx={{ textTransform: 'none', fontWeight: 700, fontSize: '0.75rem' }}
                    >
                      Analyze
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={safeRecs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default RecommendationTable;
