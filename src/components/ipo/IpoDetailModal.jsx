import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as ApplyIcon,
  Cancel as AvoidIcon,
  Warning as MayApplyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as BankIcon,
  Assessment as AssessmentIcon,
  Calculate as CalculatorIcon,
  Send as TelegramIcon,
  Event as EventIcon,
  Shield as ShieldIcon,
  BarChart as ChartIcon,
  Info as HelpIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export const IpoDetailModal = ({ open, onClose, ipo, onOpenCalculator, onSendTelegram }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!ipo) return null;

  const isApply = ipo.decision?.verdict === 'APPLY' || ipo.decision?.verdict === 'APPLY_LISTING';
  const isAvoid = ipo.decision?.verdict === 'AVOID';
  const isMayApply = ipo.decision?.verdict === 'MAY_APPLY';

  const verdictColor = isApply ? '#10b981' : isAvoid ? '#ef4444' : '#f59e0b';
  const verdictBg = isApply ? 'rgba(16, 185, 129, 0.12)' : isAvoid ? 'rgba(239, 68, 68, 0.12)' : 'rgba(245, 158, 11, 0.12)';

  const upperPrice = ipo.priceBand?.max || ipo.issuePrice || 0;
  const lowerPrice = ipo.priceBand?.min || ipo.issuePrice || 0;
  const gmpPrice = ipo.gmp?.price || 0;
  const estimatedListingPrice = upperPrice + gmpPrice;
  const gmpPercent = ipo.gmp?.percent || (upperPrice > 0 ? ((gmpPrice / upperPrice) * 100).toFixed(1) : 0);

  // Financials Chart Data
  const financialChartData = (ipo.financials?.years || []).map((year, idx) => ({
    year,
    Revenue: ipo.financials?.revenueCr?.[idx] || 0,
    NetProfit: ipo.financials?.patCr?.[idx] || 0,
  }));

  const freshPercent = ipo.issueSizeCr > 0 ? Math.round(((ipo.freshIssueCr || 0) / ipo.issueSizeCr) * 100) : 0;
  const ofsPercent = 100 - freshPercent;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
          bgcolor: 'background.paper',
          maxHeight: '90vh',
        },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1.5 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', color: 'primary.main' }}>
              {ipo.companyName}
            </Typography>
            <Chip
              label={ipo.issueType || 'Mainboard'}
              size="small"
              sx={{ fontWeight: 700, fontSize: '0.7rem', bgcolor: 'background.subtle' }}
            />
            <Chip
              label={ipo.sector}
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Exchange: <strong>{ipo.exchange || 'NSE / BSE'}</strong> • Symbol: <strong>{ipo.symbol}</strong>
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* 🏆 TOP DECISION BANNER */}
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 2.5,
            bgcolor: verdictBg,
            border: `1.5px solid ${verdictColor}40`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isApply ? (
              <ApplyIcon sx={{ color: verdictColor, fontSize: 36 }} />
            ) : isAvoid ? (
              <AvoidIcon sx={{ color: verdictColor, fontSize: 36 }} />
            ) : (
              <MayApplyIcon sx={{ color: verdictColor, fontSize: 36 }} />
            )}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: verdictColor }}>
                  {ipo.decision?.badge || `VERDICT: ${ipo.decision?.verdict}`}
                </Typography>
                <Chip
                  label={`${ipo.decision?.convictionScore || 85}% AI Conviction`}
                  size="small"
                  sx={{ fontWeight: 800, fontSize: '0.7rem', bgcolor: `${verdictColor}20`, color: verdictColor }}
                />
              </Box>
              <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 500, color: 'text.secondary', maxWidth: 620 }}>
                {ipo.decision?.summary}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<CalculatorIcon />}
            onClick={() => onOpenCalculator?.(ipo)}
            sx={{
              bgcolor: verdictColor,
              color: '#ffffff',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: verdictColor, opacity: 0.9 },
            }}
          >
            Calculate Profit
          </Button>
        </Paper>

        {/* 📑 NAVIGATION TABS */}
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab label="1. Issue & GMP Profit" icon={<TrendingUpIcon />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
          <Tab label="2. 3-Year Financials" icon={<ChartIcon />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
          <Tab label="3. Valuation & Peers" icon={<BankIcon />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
          <Tab label="4. Strengths & Red Flags" icon={<ShieldIcon />} iconPosition="start" sx={{ textTransform: 'none', fontWeight: 700 }} />
        </Tabs>

        {/* TAB 1: ISSUE DETAILS & GREY MARKET PREMIUM (GMP) */}
        {activeTab === 0 && (
          <Box>
            {/* Key Metrics Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* Price Band */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Official bidding price range per equity share set by the company" arrow>
                  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', height: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      PRICE BAND
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5 }}>
                      ₹{lowerPrice} – ₹{upperPrice}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Per Share (₹)
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              {/* Lot Size & Min Capital */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Minimum number of shares you must bid for in 1 application lot" arrow>
                  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', height: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      1 LOT SIZE
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5, color: 'primary.main' }}>
                      {ipo.lotSize} Shares
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                      Min: {formatCurrency(ipo.minInvestment || upperPrice * ipo.lotSize)}
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              {/* Grey Market Premium (GMP) */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Grey Market Premium: Unofficial pre-market premium indicating expected listing day profit per share" arrow>
                  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', height: '100%', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      GREY MARKET (GMP)
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5, color: gmpPrice > 0 ? 'success.main' : 'error.main' }}>
                      +₹{gmpPrice} ({gmpPercent}%)
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ipo.gmp?.updatedAt || 'Live Market Rate'}
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              {/* Estimated Listing Day Price */}
              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Projected opening price on NSE/BSE based on Upper Price + Current GMP" arrow>
                  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: 'background.subtle', textAlign: 'center', height: '100%', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      EST. LISTING PRICE
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', mt: 0.5, color: '#3b82f6' }}>
                      {formatCurrency(estimatedListingPrice)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main' }}>
                      +₹{(gmpPrice * (ipo.lotSize || 1)).toLocaleString()} / Lot
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>
            </Grid>

            {/* Key Dates Timeline */}
            <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EventIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  Official IPO Calendar & Timeline
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    1. BIDDING OPENS
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                    {ipo.openDate}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    2. BIDDING CLOSES
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'error.main' }}>
                    {ipo.closeDate}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    3. ALLOTMENT FINALIZED
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                    {ipo.allotmentDate}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    4. LISTING ON NSE/BSE
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'success.main' }}>
                    {ipo.listingDate}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Fresh Issue vs OFS Structure */}
            <Paper sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  Issue Size: ₹{ipo.issueSizeCr?.toLocaleString()} Crores
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Fresh Issue: <strong>{freshPercent}%</strong> • OFS: <strong>{ofsPercent}%</strong>
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={freshPercent}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(239, 68, 68, 0.2)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#10b981', borderRadius: 5 },
                  mb: 1.5,
                }}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Tooltip title="Fresh Issue: New capital that goes directly into the company for business expansion, factories, or debt repayment" arrow>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
                      <Typography variant="caption">
                        <strong>Fresh Capital (Company Growth):</strong> ₹{ipo.freshIssueCr?.toLocaleString() || 0} Cr
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Tooltip title="Offer for Sale (OFS): Existing promoters/investors selling their shares. Zero money goes into the company." arrow>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444' }} />
                      <Typography variant="caption">
                        <strong>Offer for Sale (Promoter Exit):</strong> ₹{ipo.ofsCr?.toLocaleString() || 0} Cr
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {/* TAB 2: 3-YEAR RESTATED CONSOLIDATED FINANCIALS (CHITTORGARH VERIFIED) */}
        {activeTab === 1 && (
          <Box>
            {/* Highlight Banner from Chittorgarh */}
            {ipo.financials?.highlight && (
              <Paper
                sx={{
                  p: 2,
                  mb: 2.5,
                  borderRadius: 2,
                  bgcolor: 'background.subtle',
                  borderLeft: '4px solid',
                  borderColor: (ipo.financials?.patCr?.[ipo.financials.patCr.length - 1] || 0) >= 0 ? '#10b981' : '#ef4444',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                  COMPANY FINANCIALS (RESTATED CONSOLIDATED SUMMARY)
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.6 }}>
                  {ipo.financials.highlight}
                </Typography>
              </Paper>
            )}

            {/* Official Restated Financials Table (Amount in ₹ Crore) */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
              Company Financials (Restated Consolidated) — Amount in ₹ Crore
            </Typography>

            <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: 'background.subtle' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800 }}>Period Ended</TableCell>
                    {(ipo.financials?.years || []).slice().reverse().map((yr) => (
                      <TableCell key={yr} align="right" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                        {yr}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Total Income */}
                  <TableRow hover>
                    <TableCell sx={{ fontWeight: 700 }}>Total Income</TableCell>
                    {(ipo.financials?.revenueCr || []).slice().reverse().map((val, idx) => (
                      <TableCell key={idx} align="right" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main' }}>
                        ₹{val.toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* Profit After Tax (PAT) */}
                  <TableRow hover sx={{ bgcolor: (ipo.financials?.patCr?.[ipo.financials.patCr.length - 1] || 0) < 0 ? 'rgba(239, 68, 68, 0.04)' : 'rgba(16, 185, 129, 0.04)' }}>
                    <TableCell sx={{ fontWeight: 800 }}>Profit After Tax (PAT)</TableCell>
                    {(ipo.financials?.patCr || []).slice().reverse().map((val, idx) => (
                      <TableCell
                        key={idx}
                        align="right"
                        sx={{
                          fontWeight: 900,
                          fontFamily: 'monospace',
                          color: val >= 0 ? 'success.main' : 'error.main',
                        }}
                      >
                        {val >= 0 ? '' : '-'}₹{Math.abs(val).toLocaleString()}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* EBITDA */}
                  {ipo.financials?.ebitdaCr && (
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: 700 }}>EBITDA</TableCell>
                      {ipo.financials.ebitdaCr.slice().reverse().map((val, idx) => (
                        <TableCell key={idx} align="right" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                          ₹{val.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}

                  {/* Net Worth */}
                  {ipo.financials?.netWorthCr && (
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: 700 }}>Net Worth</TableCell>
                      {ipo.financials.netWorthCr.slice().reverse().map((val, idx) => (
                        <TableCell key={idx} align="right" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                          ₹{val.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}

                  {/* Total Borrowings */}
                  {ipo.financials?.borrowingsCr && (
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: 700 }}>Total Borrowing</TableCell>
                      {ipo.financials.borrowingsCr.slice().reverse().map((val, idx) => (
                        <TableCell key={idx} align="right" sx={{ fontWeight: 700, fontFamily: 'monospace', color: 'error.main' }}>
                          ₹{val.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>

            {/* Financials Recharts Bar Chart */}
            <Box sx={{ width: '100%', height: 210, mb: 2.5 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialChartData}>
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: 8, color: '#f8fafc' }}
                    formatter={(value) => [`₹${value.toLocaleString()} Cr`, '']}
                  />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Income (₹ Cr)" />
                  <Bar dataKey="NetProfit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit After Tax (PAT ₹ Cr)" />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Financial Ratio Cards */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Profit After Tax (PAT) Margin: Net profit as a percentage of total income" arrow>
                  <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'background.subtle', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      PAT MARGIN
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: ipo.financials?.patMarginPercent >= 0 ? 'success.main' : 'error.main' }}>
                      {ipo.financials?.patMarginPercent || 0}%
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Return on Net Worth (RoNW): Return on shareholders' equity" arrow>
                  <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'background.subtle', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      RETURN ON EQUITY (RoNW)
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: ipo.financials?.ronwPercent >= 15 ? 'success.main' : 'text.primary' }}>
                      {ipo.financials?.ronwPercent || 0}%
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="3-Year Revenue Compound Annual Growth Rate" arrow>
                  <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'background.subtle', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      REVENUE CAGR
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main' }}>
                      +{ipo.financials?.cagrRevenue || 0}%
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Tooltip title="Debt-to-Equity Ratio: Borrowings divided by Net Worth" arrow>
                  <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: 'background.subtle', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      DEBT TO EQUITY
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 800, fontFamily: 'monospace', color: (ipo.financials?.debtToEquity || 0) <= 0.8 ? 'success.main' : 'error.main' }}>
                      {ipo.financials?.debtToEquity ?? 'N/A'}x
                    </Typography>
                  </Paper>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* TAB 3: VALUATION & PEER COMPARISON */}
        {activeTab === 2 && (
          <Box>
            <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, bgcolor: 'background.subtle', border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                P/E Valuation Multiplier vs Industry Peers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {ipo.valuation?.discountVsPeers || 'Valuation comparison based on trailing twelve months earnings.'}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      {ipo.companyName} P/E
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main', my: 0.5 }}>
                      {ipo.valuation?.peRatio ? `${ipo.valuation.peRatio}x` : 'Loss Making'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Price to Earnings
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                      Industry Peer Average P/E
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'text.secondary', my: 0.5 }}>
                      {ipo.valuation?.industryPeerPe ? `${ipo.valuation.industryPeerPe}x` : 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Benchmark Peer Group
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Promoter Holding Status */}
            <Paper sx={{ p: 2.5, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                Promoter Skin-in-the-Game (Holding)
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    PRE-ISSUE PROMOTER HOLDING
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
                    {ipo.promoterHolding?.preIssue || 0}%
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    POST-ISSUE PROMOTER HOLDING
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: 'monospace', color: 'primary.main' }}>
                    {ipo.promoterHolding?.postIssue || 0}%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        )}

        {/* TAB 4: STRENGTHS & RED FLAGS CHECKLIST */}
        {activeTab === 3 && (
          <Box>
            <Grid container spacing={3}>
              {/* Strengths (Pros) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2.5, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <ApplyIcon sx={{ color: '#10b981' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#10b981' }}>
                      Key Strengths & Competitive Moats
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {(ipo.decision?.strengths || []).map((pro, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 800 }}>
                          ✓
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                          {pro}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Risks (Cons) */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper sx={{ p: 2.5, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.3)', height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <AvoidIcon sx={{ color: '#ef4444' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#ef4444' }}>
                      Key Red Flags & Risks
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {(ipo.decision?.risks || []).map((risk, idx) => (
                      <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 800 }}>
                          ⚠
                        </Typography>
                        <Typography variant="caption" sx={{ lineHeight: 1.6, color: 'text.secondary' }}>
                          {risk}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          startIcon={<TelegramIcon sx={{ color: '#229ED9' }} />}
          onClick={() => onSendTelegram?.(ipo)}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Send IPO Verdict to Telegram
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={onClose} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<CalculatorIcon />}
            onClick={() => onOpenCalculator?.(ipo)}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            Calculate Listing Profit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default IpoDetailModal;
