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
    sectors,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedStocks = useMemo(() => {
    return filteredStocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredStocks, page, rowsPerPage]);

  return (
    <Box>
      <PageHeader
        title="Indian Equities Watchlist"
        subtitle="Explore all tracked Indian equities (NSE/BSE), real-time market valuations, and sector distributions."
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
            placeholder="Search by symbol or company name..."
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
            sx={{ maxWidth: { xs: '100%', md: 360 } }}
          />

          {/* Sector Filter Chips */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              py: 0.5,
              '::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {sectors.map((sec) => {
              const isSelected = selectedSector === sec;
              return (
                <Chip
                  key={sec}
                  label={sec === 'ALL' ? 'All Sectors' : sec}
                  clickable
                  color={isSelected ? 'primary' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                  onClick={() => setSelectedSector(sec)}
                  sx={{
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.75rem',
                    flexShrink: 0,
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Paper>

      {/* Main Stock Table */}
      {loading && !stocks.length ? (
        <LoadingComponent mode="table" count={8} />
      ) : error && !stocks.length ? (
        <ErrorComponent
          title="Failed to load stocks"
          message="Could not retrieve the stock list from the backend server."
          errorDetails={error}
          onRetry={refetch}
        />
      ) : (
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer sx={{ minHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 120 }}>Symbol</TableCell>
                  <TableCell sx={{ minWidth: 220 }}>Company Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Sector</TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>Price</TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>24h Change</TableCell>
                  <TableCell align="right" sx={{ minWidth: 120 }}>Volume</TableCell>
                  <TableCell align="center" sx={{ width: 100 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <Typography variant="body1" color="text.secondary">
                        No stocks found matching your criteria.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStocks.map((stock) => {
                    const isPositive = (stock.changePercent ?? 0) >= 0;
                    return (
                      <TableRow
                        key={stock.symbol}
                        hover
                        sx={{
                          cursor: 'pointer',
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
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
                            label={stock.sector || 'General'}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: '0.75rem',
                              borderColor: 'divider',
                              color: 'text.secondary',
                            }}
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

                        {/* 24h Change */}
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                            {isPositive ? (
                              <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                            ) : (
                              <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                            )}
                            <Typography
                              variant="body2"
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
                            {stock.volume || '—'}
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
            count={filteredStocks.length}
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
