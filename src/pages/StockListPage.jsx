import { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShowChart as ShowChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStocks } from '../hooks/useStocks';
import PageHeader from '../components/common/PageHeader';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';
import { formatCurrency, formatPercent } from '../utils/formatters';

export const StockListPage = () => {
  const navigate = useNavigate();
  const {
    stocks,
    filteredStocks,
    sectors = [],
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    refetch,
  } = useStocks();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const safeStocksList = useMemo(() => {
    const candidate = filteredStocks || stocks;
    return Array.isArray(candidate) ? candidate : [];
  }, [filteredStocks, stocks]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStocks = useMemo(() => {
    return safeStocksList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [safeStocksList, page, rowsPerPage]);

  return (
    <Box>
      <PageHeader
        title="Indian Equities Watchlist"
        subtitle="Explore all 50 tracked Indian equities (NSE), real-time market valuations, and sector distributions."
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Stock List', path: null },
        ]}
        onRefresh={refetch}
        refreshing={loading}
      />

      {/* Filter and Search Bar */}
      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
          }}
        >
          {/* Search Box */}
          <TextField
            size="small"
            placeholder="Search by symbol or company name (e.g. RELIANCE, TRENT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ flexGrow: 1, maxWidth: { md: 360 } }}
          />

          {/* Sector Filter Chips */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              py: 0.5,
              '::-webkit-scrollbar': { height: 4 },
              '::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 },
            }}
          >
            {(Array.isArray(sectors) ? sectors : ['ALL']).map((sec) => (
              <Chip
                key={sec}
                label={sec}
                clickable
                color={selectedSector === sec ? 'primary' : 'default'}
                variant={selectedSector === sec ? 'filled' : 'outlined'}
                onClick={() => {
                  setSelectedSector(sec);
                  setPage(0);
                }}
                sx={{
                  fontWeight: selectedSector === sec ? 700 : 500,
                  fontSize: '0.8rem',
                  flexShrink: 0,
                }}
              />
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Content Area */}
      {loading && safeStocksList.length === 0 ? (
        <LoadingComponent mode="table" />
      ) : error && safeStocksList.length === 0 ? (
        <ErrorComponent
          title="Failed to load stock list"
          errorDetails={error}
          onRetry={refetch}
        />
      ) : (
        <Paper sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'background.subtle' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>SYMBOL</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>COMPANY NAME</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>SECTOR</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>PRICE (₹)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>24H CHANGE</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>VOLUME</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        No stocks found matching your criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStocks.map((stock) => {
                    const isPositive = (stock.changePercent || 0) >= 0;
                    return (
                      <TableRow
                        key={stock.id || stock.symbol}
                        hover
                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
                        sx={{ cursor: 'pointer' }}
                      >
                        {/* Symbol */}
                        <TableCell>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 800,
                              fontFamily: 'JetBrains Mono, monospace',
                              color: 'primary.main',
                            }}
                          >
                            {stock.symbol}
                          </Typography>
                        </TableCell>

                        {/* Company Name */}
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {stock.companyName}
                          </Typography>
                        </TableCell>

                        {/* Sector */}
                        <TableCell>
                          <Chip
                            label={stock.sector || 'Equities'}
                            size="small"
                            sx={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              bgcolor: 'background.subtle',
                              borderColor: 'divider',
                            }}
                            variant="outlined"
                          />
                        </TableCell>

                        {/* Price */}
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}
                          >
                            {formatCurrency(stock.price)}
                          </Typography>
                        </TableCell>

                        {/* Change % */}
                        <TableCell align="right">
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              bgcolor: isPositive
                                ? 'rgba(16, 185, 129, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                            }}
                          >
                            {isPositive ? (
                              <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                            ) : (
                              <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontWeight: 700,
                                color: isPositive ? 'success.main' : 'error.main',
                              }}
                            >
                              {formatPercent(stock.changePercent)}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Volume */}
                        <TableCell align="right">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            {stock.volume || '2.5M'}
                          </Typography>
                        </TableCell>

                        {/* Action */}
                        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ShowChartIcon />}
                            onClick={() => navigate(`/stocks/${stock.symbol}`)}
                            sx={{
                              textTransform: 'none',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              borderRadius: 1.5,
                            }}
                          >
                            Analyze
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={safeStocksList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: '1px solid', borderColor: 'divider' }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default StockListPage;
