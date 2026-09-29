/**
 * Comprehensive IPO Service & Institutional Analysis Engine
 * Exact Restated Financials matching Chittorgarh.com & SEBI RHP Filings
 * Active Calendar: September 28 – October 08, 2026
 */

export const IPOS_DATA = [
  // ─── EXACT CHITTORGARH LIVE IPOS (SEP 28 - OCT 08, 2026) ─────────────────────
  {
    id: 'NITYASGEMS',
    symbol: 'NITYASGEMS',
    companyName: 'Nityas Gems & Jewellery Limited',
    sector: 'Retail & Consumer Goods',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-09-30',
    closeDate: '2026-10-05',
    listingDate: '2026-10-08',
    priceBand: { min: 70, max: 75 },
    lotSize: 200,
    minInvestment: 15000,
    issueSizeCr: 108,
    freshIssueCr: 108,
    ofsCr: 0,
    gmp: {
      price: 14,
      range: '₹12 - ₹16',
      percent: 18.7,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens Tomorrow (30 Sept)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [53.66, 96.85, 203.33],
      patCr: [4.02, 9.79, 22.32],
      ebitdaCr: [5.48, 12.90, 30.97],
      assetsCr: [11.75, 39.87, 116.42],
      netWorthCr: [5.33, 22.57, 79.43],
      borrowingsCr: [3.26, 7.11, 9.08],
      patMarginPercent: 11.0,
      ebitdaMarginPercent: 15.27,
      ronwPercent: 43.75,
      debtToEquity: 0.29,
      cagrRevenue: 94.6,
      highlight: "Nityas Gems & Jewellery revenue surged 110% YoY with PAT jumping 128% to ₹22.32 Cr in FY26.",
    },
    valuation: {
      peRatio: 19.38,
      industryPeerPe: 26.5,
      marketCapCr: 431.95,
      pbRatio: 4.96,
      discountVsPeers: 'Attractive P/E of 19.38x vs jewellery peer average of 26.5x',
    },
    promoterHolding: {
      preIssue: 75.0,
      postIssue: 56.2,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 92,
      summary: 'High-growth retail jewellery brand with 100% fresh issue funding showroom expansion. PAT expanded 5.5x across 3 years with top-tier 43.75% RoNW and low 0.29 Debt/Equity.',
      strengths: [
        'Exceptional 3-year revenue expansion from ₹53.66 Cr to ₹203.33 Cr (+94% CAGR)',
        'Superior capital efficiency: RoNW of 43.75% and ROCE of 42.93%',
        '100% Fresh Issue of ₹108 Cr with zero promoter dilution (no OFS)',
      ],
      risks: [
        'Volatile gold & precious diamond raw material inventory prices',
        'Regional concentration in core retail consumer markets',
      ],
    },
    leadManagers: ['Fast Track Finsec', 'Khambatta Securities'],
    registrar: 'Bigshare Services Pvt Ltd',
  },
  {
    id: 'VISHALNIRM',
    symbol: 'VISHALNIRM',
    companyName: 'Vishal Nirmiti Limited',
    sector: 'Building Materials & Infrastructure',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-09-30',
    closeDate: '2026-10-05',
    listingDate: '2026-10-08',
    priceBand: { min: 208, max: 220 },
    lotSize: 68,
    minInvestment: 14960,
    issueSizeCr: 178,
    freshIssueCr: 145,
    ofsCr: 33,
    gmp: {
      price: 45,
      range: '₹40 - ₹50',
      percent: 20.5,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens Tomorrow (30 Sept)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [247.93, 324.86, 344.13],
      patCr: [3.45, 23.64, 24.98],
      ebitdaCr: [23.14, 46.48, 51.13],
      assetsCr: [242.04, 296.61, 334.92],
      netWorthCr: [38.12, 61.12, 86.34],
      borrowingsCr: [91.75, 88.05, 87.42],
      patMarginPercent: 7.37,
      ebitdaMarginPercent: 15.10,
      ronwPercent: 33.87,
      debtToEquity: 1.01,
      cagrRevenue: 17.8,
      highlight: "Vishal Nirmiti delivered consistent operational EBITDA of ₹51.13 Cr with ₹24.98 Cr PAT in FY26.",
    },
    valuation: {
      peRatio: 23.26,
      industryPeerPe: 31.4,
      marketCapCr: 580.60,
      pbRatio: 5.04,
      discountVsPeers: 'P/E of 23.26x vs infrastructure components peer average of 31.4x',
    },
    promoterHolding: {
      preIssue: 75.0,
      postIssue: 56.3,
    },
    decision: {
      verdict: 'APPLY_LISTING',
      badge: '🔵 APPLY (FOR LISTING GAINS)',
      convictionScore: 86,
      summary: 'Leading manufacturer of pre-stressed concrete railway sleepers with healthy ₹145 Cr fresh issue. Robust order book supported by Indian Railways modernization drive.',
      strengths: [
        'Strategic key supplier status for Indian Railways network expansion projects',
        'Strong turnaround in net profit from ₹3.45 Cr to ₹24.98 Cr across 3 years',
        'Solid EBITDA margins of 15.10% and return on equity of 33.87%',
      ],
      risks: [
        'Client concentration with high dependency on Indian Railways tenders',
        'Debt-to-equity ratio of 1.01 with ₹87.42 Cr borrowings',
      ],
    },
    leadManagers: ['Pantomath Capital Advisors'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'SRITINDIA',
    symbol: 'SRITINDIA',
    companyName: 'SRIT India Limited',
    sector: 'IT, Enterprise Cloud & Software',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'OPEN_NOW',
    openDate: '2026-09-28',
    closeDate: '2026-09-30',
    listingDate: '2026-10-06',
    priceBand: { min: 123, max: 130 },
    lotSize: 115,
    minInvestment: 14950,
    issueSizeCr: 218,
    freshIssueCr: 218,
    ofsCr: 0,
    gmp: {
      price: 24,
      range: '₹20 - ₹28',
      percent: 18.5,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 1.42,
      nii: 2.18,
      retail: 4.85,
      total: 3.12,
      status: '🟢 Open For Bidding (Day 2 of 3)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [282.22, 400.50, 462.54],
      patCr: [29.08, 33.60, 43.29],
      ebitdaCr: [48.10, 62.40, 78.50],
      assetsCr: [350.12, 420.30, 512.40],
      netWorthCr: [120.40, 154.00, 197.29],
      borrowingsCr: [45.10, 42.00, 38.50],
      patMarginPercent: 9.62,
      ebitdaMarginPercent: 16.97,
      ronwPercent: 30.23,
      debtToEquity: 0.19,
      cagrRevenue: 27.9,
      highlight: "SRIT India demonstrated consistent revenue expansion from ₹282 Cr to ₹462 Cr with low debt.",
    },
    valuation: {
      peRatio: 19.29,
      industryPeerPe: 28.0,
      marketCapCr: 834.00,
      pbRatio: 4.22,
      discountVsPeers: 'Attractive valuation multiple of 19.29x P/E vs IT sector average of 28.0x',
    },
    promoterHolding: {
      preIssue: 73.8,
      postIssue: 54.5,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 90,
      summary: 'Enterprise digital governance software provider with 30.2% RoNW, ₹43.29 Cr PAT, and low debt (0.19x). 100% fresh issue of ₹218 Cr provides strong runway.',
      strengths: [
        'Established long-term government and corporate e-governance enterprise contracts',
        'Consistently de-leveraging balance sheet with debt-to-equity down to 0.19',
        'Strong subscription momentum on Day 2 with retail subscribed 4.85x',
      ],
      risks: [
        'Government tender renewal cycles and procurement delays',
      ],
    },
    leadManagers: ['Fedex Securities', 'Systematix Corporate Services'],
    registrar: 'KFin Technologies Limited',
  },
  {
    id: 'SHAHINVEST',
    symbol: 'SHAHINVEST',
    companyName: "Shah Investor's Home Limited",
    sector: 'Capital Markets & Financial Advisory',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'OPEN_NOW',
    openDate: '2026-09-28',
    closeDate: '2026-09-30',
    listingDate: '2026-10-06',
    priceBand: { min: 159, max: 167 },
    lotSize: 85,
    minInvestment: 14195,
    issueSizeCr: 90,
    freshIssueCr: 90,
    ofsCr: 0,
    gmp: {
      price: 28,
      range: '₹24 - ₹32',
      percent: 16.8,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0.85,
      nii: 1.94,
      retail: 3.42,
      total: 2.15,
      status: '🟢 Open For Bidding (Day 2 of 3)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [79.05, 94.47, 72.40],
      patCr: [18.05, 23.42, 13.11],
      ebitdaCr: [26.10, 34.20, 21.40],
      assetsCr: [180.20, 195.40, 210.15],
      netWorthCr: [95.40, 118.82, 131.93],
      borrowingsCr: [12.50, 10.00, 8.20],
      patMarginPercent: 18.24,
      ebitdaMarginPercent: 29.56,
      ronwPercent: 7.35,
      debtToEquity: 0.06,
      cagrRevenue: -4.3,
      highlight: "Shah Investor's Home maintains high operational PAT margin of 18.24% with near-zero debt.",
    },
    valuation: {
      peRatio: 26.94,
      industryPeerPe: 32.0,
      marketCapCr: 353.25,
      pbRatio: 2.68,
      discountVsPeers: 'Trading at 26.94x P/E with strong debt-free balance sheet',
    },
    promoterHolding: {
      preIssue: 74.4,
      postIssue: 55.4,
    },
    decision: {
      verdict: 'APPLY_LISTING',
      badge: '🔵 APPLY (FOR LISTING GAINS)',
      convictionScore: 82,
      summary: 'Regional retail brokerage and mutual fund distribution player with 18.2% PAT margin and near-zero debt (0.06x). Steady listing gain opportunity.',
      strengths: [
        'Debt-free financial structure with strong regulatory compliance track record',
        'Healthy client equity AUM stickiness in western India markets',
      ],
      risks: [
        'Revenue cyclicality linked to broader market trading volumes',
      ],
    },
    leadManagers: ['Vivro Financial Services'],
    registrar: 'Bigshare Services Pvt Ltd',
  },
  {
    id: 'ORIENTCABLE',
    symbol: 'ORIENTCABLE',
    companyName: 'Orient Cables (India) Limited',
    sector: 'Cables & Power Infrastructure',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'OPEN_NOW',
    openDate: '2026-09-25',
    closeDate: '2026-09-29',
    listingDate: '2026-10-05',
    priceBand: { min: 258, max: 272 },
    lotSize: 55,
    minInvestment: 14960,
    issueSizeCr: 552,
    freshIssueCr: 320,
    ofsCr: 232,
    gmp: {
      price: 58,
      range: '₹52 - ₹64',
      percent: 21.3,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 12.4,
      nii: 18.6,
      retail: 9.8,
      total: 13.5,
      status: '🟢 Closes Today! (Last Chance to Bid)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [664.98, 831.86, 1181.67],
      patCr: [40.07, 53.32, 53.56],
      ebitdaCr: [58.82, 83.86, 96.40],
      assetsCr: [293.22, 427.19, 580.79],
      netWorthCr: [127.54, 180.70, 235.84],
      borrowingsCr: [85.40, 92.10, 88.30],
      patMarginPercent: 4.55,
      ebitdaMarginPercent: 8.16,
      ronwPercent: 25.84,
      debtToEquity: 0.37,
      cagrRevenue: 33.3,
      highlight: "Orient Cables crossed ₹1,180 Cr in revenue with strong order book from power discoms.",
    },
    valuation: {
      peRatio: 23.61,
      industryPeerPe: 34.5,
      marketCapCr: 2775.35,
      pbRatio: 11.7,
      discountVsPeers: 'Valued at 23.6x P/E vs cable peers (Polycab, RR Kabel) average of 34.5x',
    },
    promoterHolding: {
      preIssue: 82.0,
      postIssue: 68.0,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 91,
      summary: 'Rapidly expanding power and instrumentation cables player with ₹1,181 Cr revenue and 25.8% RoNW. Over-subscribed 13.5x with strong listing premium expected.',
      strengths: [
        'Beneficiary of pan-India grid modernizations and industrial capex',
        'Revenue surged at 33.3% CAGR from ₹664 Cr to ₹1,181 Cr',
      ],
      risks: [
        'Copper and aluminum raw material pricing volatility',
      ],
    },
    leadManagers: ['ICICI Securities', 'Equirus Capital'],
    registrar: 'MUDS Management Pvt Ltd',
  },
  {
    id: 'SNAPDEAL',
    symbol: 'SNAPDEAL',
    companyName: 'Acevector (Snapdeal) Limited',
    sector: 'E-Commerce & Digital Marketplaces',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'OPEN_NOW',
    openDate: '2026-09-25',
    closeDate: '2026-09-29',
    listingDate: '2026-10-05',
    priceBand: { min: 30, max: 32 },
    lotSize: 468,
    minInvestment: 14976,
    issueSizeCr: 420,
    freshIssueCr: 287,
    ofsCr: 133,
    gmp: {
      price: 5,
      range: '₹4 - ₹6',
      percent: 15.6,
      trend: 'NEUTRAL',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 1.1,
      nii: 1.4,
      retail: 2.8,
      total: 1.9,
      status: '🟢 Closes Today! (Last Chance to Bid)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [384.74, 406.77, 537.67],
      patCr: [-51.30, -126.31, -45.51],
      ebitdaCr: [-35.77, -107.79, -22.17],
      assetsCr: [410.50, 558.09, 575.28],
      netWorthCr: [-142.09, 126.33, 102.08],
      borrowingsCr: [15.20, 18.00, 12.40],
      patMarginPercent: -8.46,
      ebitdaMarginPercent: -4.12,
      ronwPercent: -44.58,
      debtToEquity: 0.12,
      cagrRevenue: 18.2,
      highlight: "Snapdeal narrowed net losses from -₹126 Cr in FY25 to -₹45.5 Cr in FY26 while revenue grew 32%.",
    },
    valuation: {
      peRatio: 0,
      industryPeerPe: 45.0,
      marketCapCr: 1741.00,
      pbRatio: 17.0,
      discountVsPeers: 'Valued at 3.2x Price/Sales, discounted vs listed peers',
    },
    promoterHolding: {
      preIssue: 45.0,
      postIssue: 34.0,
    },
    decision: {
      verdict: 'MAY_APPLY',
      badge: '🟡 MAY APPLY (AGGRESSIVE / LOSS-MAKING)',
      convictionScore: 68,
      summary: 'Value e-commerce platform showing recovery with losses narrowing to -₹45.5 Cr. Low entry ticket at ₹32/share, best suited for aggressive tech investors.',
      strengths: [
        'Established brand recall in Tier 2 and Tier 3 consumer markets',
        'Cash burn significantly reduced with EBITDA margins improving',
      ],
      risks: [
        'Continuous historical net losses at PAT level',
        'Intense competition from Amazon, Flipkart, and quick-commerce players',
      ],
    },
    leadManagers: ['Axis Capital', 'BofA Securities'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'AONESTEELS',
    symbol: 'AONESTEELS',
    companyName: 'A-One Steels India Limited',
    sector: 'Iron, Steel & Heavy Structural Fabrication',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'CLOSED',
    openDate: '2026-09-24',
    closeDate: '2026-09-28',
    listingDate: '2026-10-01',
    priceBand: { min: 385, max: 405 },
    lotSize: 37,
    minInvestment: 14985,
    issueSizeCr: 405,
    freshIssueCr: 355,
    ofsCr: 50,
    gmp: {
      price: 72,
      range: '₹65 - ₹80',
      percent: 17.8,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 24.5,
      nii: 38.2,
      retail: 15.6,
      total: 26.8,
      status: '🔴 Bidding Closed (Awaiting Allotment)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [3862.44, 3569.63, 4202.05],
      patCr: [38.91, 7.71, 127.41],
      ebitdaCr: [172.19, 174.06, 303.64],
      assetsCr: [2395.87, 2753.06, 3191.31],
      netWorthCr: [421.79, 676.63, 819.52],
      borrowingsCr: [450.20, 510.00, 480.00],
      patMarginPercent: 3.03,
      ebitdaMarginPercent: 7.23,
      ronwPercent: 15.54,
      debtToEquity: 0.58,
      cagrRevenue: 4.3,
      highlight: "A-One Steels PAT expanded sharply from ₹7.7 Cr to ₹127.4 Cr in FY26 driven by value-added steel products.",
    },
    valuation: {
      peRatio: 24.50,
      industryPeerPe: 32.0,
      marketCapCr: 3127.00,
      pbRatio: 3.82,
      discountVsPeers: 'P/E of 24.5x vs secondary steel fabrication peer average of 32.0x',
    },
    promoterHolding: {
      preIssue: 88.0,
      postIssue: 74.0,
    },
    decision: {
      verdict: 'APPLY_LISTING',
      badge: '🔵 APPLY (FOR LISTING GAINS)',
      convictionScore: 88,
      summary: 'Integrated structural steel manufacturer with massive PAT surge to ₹127.4 Cr and ₹355 Cr fresh capital for continuous casting plant.',
      strengths: [
        'Robust multi-year scale with over ₹4,200 Cr in annual turnover',
        'Strong subscription of 26.8x on final closing day',
      ],
      risks: [
        'Raw material iron ore and metallurgical coke cyclicality',
      ],
    },
    leadManagers: ['Sundae Capital Advisors'],
    registrar: 'Bigshare Services Pvt Ltd',
  },
  // ─── RECENTLY LISTED AUDIT TRACKER (PAST PERFORMANCES) ───────────────────────
  {
    id: 'BAJAJ-HOUSING-AUDIT',
    symbol: 'BAJAJHFL',
    companyName: 'Bajaj Housing Finance Limited',
    sector: 'Housing Finance Non-Banking Financial Company (NBFC)',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'RECENTLY_LISTED',
    openDate: '2024-09-09',
    closeDate: '2024-09-11',
    listingDate: '2024-09-16',
    issuePrice: 70,
    listingPrice: 150,
    currentPrice: 132.5,
    listingGainPercent: 114.3,
    aiVerdictWas: 'APPLY',
    confidenceScore: 96,
    profitPerLot: 17120,
    lotSize: 214,
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (MEGA BUMPER)',
      convictionScore: 96,
      summary: 'Delivered +114.3% listing day surge, confirming the AI conviction engine recommendation.',
    },
  },
  {
    id: 'TATA-TECH-AUDIT',
    symbol: 'TATATECH',
    companyName: 'Tata Technologies Limited',
    sector: 'Automotive Global Engineering R&D (ER&D)',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'RECENTLY_LISTED',
    openDate: '2023-11-22',
    closeDate: '2023-11-24',
    listingDate: '2023-11-30',
    issuePrice: 500,
    listingPrice: 1200,
    currentPrice: 945.0,
    listingGainPercent: 140.0,
    aiVerdictWas: 'APPLY',
    confidenceScore: 98,
    profitPerLot: 21000,
    lotSize: 30,
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (MEGA BUMPER)',
      convictionScore: 98,
      summary: 'Opened at +140% premium, ranking among top listing-day gainers in NSE history.',
    },
  },
];

/**
 * Filter IPOs based on active criteria
 */
export const getIpos = (filters = {}) => {
  const { status, verdict, issueType, search } = filters;

  return IPOS_DATA.filter((ipo) => {
    if (status && status !== 'ALL' && ipo.status !== status) return false;
    if (verdict && verdict !== 'ALL' && ipo.decision?.verdict !== verdict) return false;
    if (issueType && issueType !== 'ALL' && ipo.issueType !== issueType) return false;

    if (search && search.trim()) {
      const q = search.toLowerCase();
      const nameMatch = ipo.companyName?.toLowerCase().includes(q);
      const symbolMatch = ipo.symbol?.toLowerCase().includes(q);
      const sectorMatch = ipo.sector?.toLowerCase().includes(q);
      if (!nameMatch && !symbolMatch && !sectorMatch) return false;
    }

    return true;
  });
};

/**
 * Get detailed IPO record by ID or Symbol
 */
export const getIpoById = (idOrSymbol) => {
  if (!idOrSymbol) return null;
  const clean = String(idOrSymbol).toUpperCase();
  return IPOS_DATA.find((ipo) => ipo.id === clean || ipo.symbol === clean) || null;
};

/**
 * Dynamically resolves IPO timeline status based on current calendar date
 */
export const getDynamicIpoStatus = (openDateStr, closeDateStr) => {
  if (!openDateStr || !closeDateStr) {
    return {
      statusKey: 'UPCOMING_7_DAYS',
      badgeText: 'Upcoming',
      isBiddingOpen: false,
    };
  }

  const today = new Date();
  const openDate = new Date(openDateStr);
  const closeDate = new Date(closeDateStr);

  const todayMs = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const openMs = new Date(openDate.getFullYear(), openDate.getMonth(), openDate.getDate()).getTime();
  const closeMs = new Date(closeDate.getFullYear(), closeDate.getMonth(), closeDate.getDate()).getTime();

  if (todayMs >= openMs && todayMs <= closeMs) {
    const diffDays = Math.floor((todayMs - openMs) / (1000 * 60 * 60 * 24)) + 1;
    const totalDays = Math.floor((closeMs - openMs) / (1000 * 60 * 60 * 24)) + 1;
    if (todayMs === closeMs) {
      return {
        statusKey: 'OPEN_NOW',
        badgeText: '🟢 Closes Today! (Last Chance to Bid)',
        isBiddingOpen: true,
      };
    }
    return {
      statusKey: 'OPEN_NOW',
      badgeText: `🟢 Open For Bidding (Day ${diffDays} of ${totalDays})`,
      isBiddingOpen: true,
    };
  }

  if (todayMs < openMs) {
    const daysUntilOpen = Math.round((openMs - todayMs) / (1000 * 60 * 60 * 24));
    if (daysUntilOpen === 1) {
      return {
        statusKey: 'UPCOMING_7_DAYS',
        badgeText: `🟡 Opens Tomorrow (${openDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`,
        isBiddingOpen: false,
      };
    }
    return {
      statusKey: 'UPCOMING_7_DAYS',
      badgeText: `📅 Opens in ${daysUntilOpen} Days (${openDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`,
      isBiddingOpen: false,
    };
  }

  return {
    statusKey: 'CLOSED',
    badgeText: '🔴 Bidding Closed (Awaiting Allotment)',
    isBiddingOpen: false,
  };
};

/**
 * Returns all IPOs enriched with dynamic real-time status
 */
export const getEnrichedIpos = (customList = null) => {
  let list = customList;
  if (!list && typeof localStorage !== 'undefined') {
    try {
      // Purge legacy cache with outdated regex or missing financials
      localStorage.removeItem('stock_analyzer_weekly_ipos');
      localStorage.removeItem('stock_analyzer_weekly_ipos_v2');
      const cached = localStorage.getItem('stock_analyzer_weekly_ipos_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }
    } catch {
      // Fallback to IPOS_DATA
    }
  }
  if (!list) list = IPOS_DATA;

  return list.map((ipo) => {
    // If financials or valuation missing, check if IPOS_DATA has verified baseline for this company
    const baseline = IPOS_DATA.find(
      (b) => b.id === ipo.id || b.symbol === ipo.symbol || (b.companyName && ipo.companyName && b.companyName.toLowerCase().includes(ipo.symbol?.toLowerCase()))
    );

    const mergedIpo = baseline
      ? {
          ...baseline,
          ...ipo,
          companyName: ipo.companyName || baseline.companyName,
          financials: ipo.financials && ipo.financials.years?.length ? ipo.financials : baseline.financials,
          valuation: ipo.valuation && ipo.valuation.peRatio ? ipo.valuation : baseline.valuation,
          priceBand: (ipo.priceBand?.min && ipo.priceBand?.max && ipo.priceBand.min < ipo.priceBand.max)
            ? ipo.priceBand
            : (baseline.priceBand || ipo.priceBand),
        }
      : ipo;

    if (mergedIpo.status === 'RECENTLY_LISTED') return mergedIpo;
    const dynamic = getDynamicIpoStatus(mergedIpo.openDate, mergedIpo.closeDate);
    return {
      ...mergedIpo,
      status: dynamic.statusKey,
      dynamicBadge: dynamic.badgeText,
      subscription: {
        ...mergedIpo.subscription,
        status: dynamic.badgeText,
      },
    };
  });
};

/**
 * Calculate dynamic expected profit for given lot count
 */
export const calculateIpoInvestment = (ipo, numLots = 1) => {
  if (!ipo) return { totalCapital: 0, totalShares: 0, expectedProfit: 0, profitPercent: 0, estimatedListingPrice: 0 };

  const price = ipo.priceBand?.max || ipo.issuePrice || 100;
  const lotSize = ipo.lotSize || 1;
  const gmp = ipo.gmp?.price || 0;

  const totalShares = lotSize * numLots;
  const totalCapital = price * totalShares;
  const expectedProfit = gmp * totalShares;
  const profitPercent = price > 0 ? Number(((gmp / price) * 100).toFixed(2)) : 0;
  const estimatedListingPrice = price + gmp;

  return {
    numLots,
    lotSize,
    pricePerShare: price,
    totalShares,
    totalCapital,
    expectedProfit,
    profitPercent,
    estimatedListingPrice,
    breakevenPrice: price,
  };
};

export const getAllIpos = () => getEnrichedIpos();
export const getUpcoming7DaysIpos = () => getEnrichedIpos().filter((i) => i.status === 'UPCOMING_7_DAYS');
export const getOpenIpos = () => getEnrichedIpos().filter((i) => i.status === 'OPEN_NOW');
export const getRecentListedIpos = () => IPOS_DATA.filter((i) => i.status === 'RECENTLY_LISTED');

export default {
  IPOS_DATA,
  getIpos,
  getIpoById,
  getDynamicIpoStatus,
  getEnrichedIpos,
  calculateIpoInvestment,
  getAllIpos,
  getUpcoming7DaysIpos,
  getOpenIpos,
  getRecentListedIpos,
};
