import { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from '@mui/material';
import {
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import StatusChip from '../common/StatusChip';
import ConfidenceGauge from '../common/ConfidenceGauge';
import { formatCurrency, formatDate } from '../../utils/formatters';

/**
 * Reusable Recommendation Table Component
 */
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

  const displayData = useMemo(() => {
    let data = [...recommendations];
    if (limit && !showPagination) {
      return data.slice(0, limit);
    }
    return data;
  }, [recommendations, limit, showPagination]);

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

  if (!recommendations || recommendations.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="body1" color="text.secondary">
          No recommendations available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {title && (
        <Box sx={{ p: 2.5, pb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {compact && (
            <Button
              size="small"
              onClick={() => navigate('/recommendations')}
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              View All Recommendations
            </Button>
          )}
        </Box>
      )}

      <TableContainer sx={{ maxHeight: compact ? 440 : 600 }}>
        <Table stickyHeader size={compact ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 140 }}>Stock</TableCell>
              <TableCell sx={{ minWidth: 110 }}>Action</TableCell>
              <TableCell sx={{ minWidth: 140 }}>Confidence</TableCell>
              <TableCell align="right" sx={{ minWidth: 100 }}>Current</TableCell>
              <TableCell align="right" sx={{ minWidth: 100 }}>Target</TableCell>
              <TableCell align="right" sx={{ minWidth: 100 }}>Stop Loss</TableCell>
              {!compact && <TableCell sx={{ minWidth: 260 }}>Analysis Reason</TableCell>}
              {!compact && <TableCell align="center" sx={{ minWidth: 110 }}>Date</TableCell>}
              <TableCell align="center" sx={{ width: 70 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((rec) => {
              const symbol = rec.symbol || rec.stock || 'UNKNOWN';
              const isBullish = rec.recommendation === 'BUY';
              const target = rec.targetPrice;
              const stop = rec.stopLoss;
              const current = rec.currentPrice;

              return (
                <TableRow
                  key={rec.id || symbol}
                  hover
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  onClick={() => navigate(`/stocks/${symbol}`)}
                >
                  {/* Stock Symbol & Company */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 800,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: 'primary.main',
                          }}
                        >
                          {symbol}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{ display: 'block', maxWidth: 130 }}
                        >
                          {rec.companyName || rec.sector || 'Stock'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Recommendation Status */}
                  <TableCell>
                    <StatusChip status={rec.recommendation} />
                  </TableCell>

                  {/* Confidence Score */}
                  <TableCell>
                    <ConfidenceGauge score={rec.confidenceScore} compact />
                  </TableCell>

                  {/* Current Price */}
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
                    >
                      {formatCurrency(current)}
                    </Typography>
                  </TableCell>

                  {/* Target Price */}
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 700,
                        color: isBullish ? 'success.main' : 'primary.main',
                      }}
                    >
                      {formatCurrency(target)}
                    </Typography>
                  </TableCell>

                  {/* Stop Loss */}
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                        color: 'error.main',
                      }}
                    >
                      {formatCurrency(stop)}
                    </Typography>
                  </TableCell>

                  {/* Rationale Reason */}
                  {!compact && (
                    <TableCell>
                      <Tooltip title={rec.reason} arrow placement="top-start">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {rec.reason || 'Technical indicator alignment.'}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                  )}

                  {/* Date */}
                  {!compact && (
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(rec.createdAt || rec.date)}
                      </Typography>
                    </TableCell>
                  )}

                  {/* View Action */}
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Tooltip title="View Stock Details">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/stocks/${symbol}`)}
                        sx={{ bgcolor: 'action.hover' }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination && displayData.length > 5 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: '1px solid', borderColor: 'divider' }}
        />
      )}
    </Paper>
  );
};

export default RecommendationTable;
