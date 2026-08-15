import {
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as BuyIcon,
  TrendingDown as SellIcon,
  Visibility as WatchIcon,
  CheckCircle as AllIcon,
} from '@mui/icons-material';
import { useRecommendations } from '../hooks/useRecommendations';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import RecommendationTable from '../components/recommendations/RecommendationTable';
import LoadingComponent from '../components/common/LoadingComponent';
import ErrorComponent from '../components/common/ErrorComponent';

export const RecommendationPage = () => {
  const {
    recommendations,
    filteredRecommendations,
    stats,
    loading,
    error,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    refetch,
  } = useRecommendations(false);

  return (
    <Box>
      <PageHeader
        title="Recommendations"
        subtitle="Algorithmic trade signals, confidence ratings, price targets, and stop-loss levels."
        breadcrumbs={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Recommendations', path: null },
        ]}
        onRefresh={refetch}
        refreshing={loading}
      />

      {/* Summary KPI Mini-Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Total Active Signals"
            value={stats.total}
            subtitle="Published coverage"
            accentColor="#3b82f6"
            icon={<AllIcon />}
            onClick={() => setFilterType('ALL')}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Buy Recommendations"
            value={stats.buy}
            subtitle="Bullish trade setups"
            accentColor="#10b981"
            icon={<BuyIcon />}
            onClick={() => setFilterType('BUY')}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Sell Recommendations"
            value={stats.sell}
            subtitle="Bearish exits / hedges"
            accentColor="#ef4444"
            icon={<SellIcon />}
            onClick={() => setFilterType('SELL')}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <StatCard
            title="Watchlist Setups"
            value={stats.watch}
            subtitle="Pending breakouts"
            accentColor="#f59e0b"
            icon={<WatchIcon />}
            onClick={() => setFilterType('WATCH')}
          />
        </Grid>
      </Grid>

      {/* Filter and Search Controls */}
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
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="Search stock, sector, or reason..."
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

          {/* Type Filter Tabs */}
          <Tabs
            value={filterType}
            onChange={(e, val) => setFilterType(val)}
            sx={{
              minHeight: 40,
              '& .MuiTab-root': {
                minHeight: 40,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.85rem',
              },
            }}
          >
            <Tab label={`All (${stats.total})`} value="ALL" />
            <Tab
              label={`Buy (${stats.buy})`}
              value="BUY"
              sx={{ color: filterType === 'BUY' ? 'success.main !important' : 'inherit' }}
            />
            <Tab
              label={`Sell (${stats.sell})`}
              value="SELL"
              sx={{ color: filterType === 'SELL' ? 'error.main !important' : 'inherit' }}
            />
            <Tab
              label={`Watch (${stats.watch})`}
              value="WATCH"
              sx={{ color: filterType === 'WATCH' ? 'warning.main !important' : 'inherit' }}
            />
          </Tabs>
        </Box>
      </Paper>

      {/* Main Recommendations Table */}
      {loading && !recommendations.length ? (
        <LoadingComponent mode="table" count={8} />
      ) : error && !recommendations.length ? (
        <ErrorComponent
          title="Failed to load recommendations"
          message="Could not retrieve the recommendation feed from the backend server."
          errorDetails={error}
          onRetry={refetch}
        />
      ) : (
        <RecommendationTable
          recommendations={filteredRecommendations}
          showPagination={true}
        />
      )}
    </Box>
  );
};

export default RecommendationPage;
