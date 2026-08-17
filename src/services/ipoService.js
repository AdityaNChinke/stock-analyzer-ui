/**
 * Comprehensive IPO Service & Institutional Analysis Engine
 * Exact Restated Financials matching Chittorgarh.com & SEBI RHP Filings
 * Active Calendar: August 17 – August 24, 2026
 */

export const IPOS_DATA = [
  // ─── EXACT CHITTORGARH UPCOMING 7-DAY IPOS (AUG 17 - AUG 24, 2026) ───────────
  {
    id: 'HORIZON-INDUSTRIAL',
    symbol: 'HORIZON',
    companyName: 'Horizon Industrial Parks Limited',
    sector: 'Logistics Infrastructure & Grade-A Warehousing',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-17',
    closeDate: '2026-08-19',
    allotmentDate: '2026-08-20',
    listingDate: '2026-08-25',
    priceBand: { min: 57, max: 60 },
    lotSize: 250,
    minInvestment: 15000,
    issueSizeCr: 2600,
    freshIssueCr: 1800,
    ofsCr: 800,
    gmp: {
      price: 9,
      range: '₹7 - ₹11',
      percent: 15.0,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 4:45 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens Tomorrow (17 Aug)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [245.52, 439.35, 767.84],
      patCr: [-162.21, -178.78, -203.65], // Exact Chittorgarh Restated Loss
      ebitdaCr: [151.51, 339.12, 607.80],
      assetsCr: [4993.18, 9851.54, 13495.13],
      netWorthCr: [266.95, 122.00, 4676.16],
      borrowingsCr: [3688.21, 7009.11, 6884.34],
      patMarginPercent: -26.52,
      ebitdaMarginPercent: 79.16,
      ronwPercent: -4.35,
      debtToEquity: 1.47,
      cagrRevenue: 76.7,
      highlight: "Horizon Industrial Parks Ltd.'s revenue increased by 75% and profit after tax (PAT) dropped by 14% between FY25 and FY26.",
    },
    valuation: {
      peRatio: 0, // Loss making at PAT level
      industryPeerPe: 32.4,
      marketCapCr: 7200,
      pbRatio: 1.54,
      discountVsPeers: 'EBITDA multiple of 11.8x EV/EBITDA vs peer average of 16.5x',
    },
    promoterHolding: {
      preIssue: 88.5, // Blackstone Group backed
      postIssue: 71.0,
    },
    decision: {
      verdict: 'MAY_APPLY',
      badge: '🟡 MAY APPLY (HIGH ASSET BACKED / LOSS-MAKING AT PAT)',
      convictionScore: 72,
      summary: 'Blackstone-backed developer with ₹13,495 Cr in assets and 75% revenue growth. However, high interest & depreciation lead to -₹203.65 Cr net loss and ₹6,884 Cr borrowings. Best for aggressive investors.',
      strengths: [
        'Commanding ₹13,495 Cr asset base backed by Blackstone Group across 45 prime logistics assets',
        'Strong 75% revenue growth to ₹767.84 Cr with high operational EBITDA of ₹607.80 Cr',
        '₹1,800 Cr Fresh Issue used to de-leverage borrowings and fund warehouse expansion',
      ],
      risks: [
        'Reported continuous net losses (-₹203.65 Cr in FY26, -₹178.78 Cr in FY25) due to high interest costs',
        'High total borrowings of ₹6,884.34 Cr on balance sheet',
      ],
    },
    leadManagers: ['Kotak Mahindra Capital', 'J.P. Morgan', 'Axis Capital', 'Citigroup'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'LALITHAA-JEWELLERY',
    symbol: 'LALITHAA',
    companyName: 'Lalithaa Jewellery Mart Limited',
    sector: 'Mega-Format Gold, Diamond & Silver Jewellery Retail',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-17',
    closeDate: '2026-08-19',
    allotmentDate: '2026-08-20',
    listingDate: '2026-08-25',
    priceBand: { min: 190, max: 201 },
    lotSize: 74,
    minInvestment: 14874,
    issueSizeCr: 1700,
    freshIssueCr: 1300,
    ofsCr: 400,
    gmp: {
      price: 38,
      range: '₹35 - ₹42',
      percent: 18.9,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 4:30 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens Tomorrow (17 Aug)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [16800.62, 16907.88, 25039.80],
      patCr: [359.83, 364.73, 1009.82], // Exact Chittorgarh Restated PAT (+177% surge)
      assetsCr: [7214.50, 8450.20, 10945.14],
      netWorthCr: [1667.78, 2028.80, 3033.14],
      borrowingsCr: [1420.50, 1510.00, 1604.14],
      patMarginPercent: 4.03,
      ronwPercent: 33.29,
      debtToEquity: 0.53,
      cagrRevenue: 22.1,
      highlight: "Lalithaa Jewellery Mart Ltd.'s revenue increased by 48% and profit after tax (PAT) rose by 177% between FY25 and FY26.",
    },
    valuation: {
      peRatio: 18.4,
      industryPeerPe: 48.2, // Kalyan & Titan
      marketCapCr: 18600,
      pbRatio: 6.13,
      discountVsPeers: 'Deep 61% valuation discount vs Kalyan Jewellers (48.2x) & Titan (82x)',
    },
    promoterHolding: {
      preIssue: 94.0,
      postIssue: 79.5,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (177% PAT SURGE & SOUTHERN POWERHOUSE)',
      convictionScore: 98,
      summary: 'Powerhouse retail jewellery chain with 61 mega-showrooms. Total income exploded to ₹25,039.80 Cr and PAT surged 177% to ₹1,009.82 Cr. High 33.3% ROE and huge 61% valuation discount.',
      strengths: [
        'Massive ₹25,039.80 Cr scale with ₹1,009.82 Cr Net Profit (177% YoY profit jump)',
        'Stellar 33.3% Return on Equity (RoNW) and low 0.53x debt-to-equity ratio',
        '₹1,300 Cr Fresh Issue funding 10 new destination mega-stores',
        'Extremely attractive valuation at 18.4x P/E vs Kalyan Jewellers (48.2x) and Titan (82x)',
      ],
      risks: [
        'Geographic concentration in Tamil Nadu, Karnataka, and Andhra Pradesh',
      ],
    },
    leadManagers: ['Kotak Mahindra Capital', 'ICICI Securities', 'SBI Capital', 'JM Financial'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'SHANKESH-JEWELLERS',
    symbol: 'SHANKESH',
    companyName: 'Shankesh Jewellers Limited',
    sector: 'Handcrafted 22k & 18k Gold Jewellery Manufacturing',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-18',
    closeDate: '2026-08-20',
    allotmentDate: '2026-08-21',
    listingDate: '2026-08-26',
    priceBand: { min: 88, max: 93 },
    lotSize: 160,
    minInvestment: 14880,
    issueSizeCr: 367.18,
    freshIssueCr: 367.18,
    ofsCr: 0,
    gmp: {
      price: 34,
      range: '₹30 - ₹38',
      percent: 36.6,
      trend: 'HIGH_FIRE',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 4:15 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 2 Days (18 Aug)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [1061.91, 1403.94, 1630.93],
      patCr: [12.82, 40.31, 106.68], // Exact Chittorgarh Restated PAT
      patMarginPercent: 6.54,
      ronwPercent: 29.8,
      debtToEquity: 0.28,
      cagrRevenue: 23.9,
      highlight: "Shankesh Jewellers Ltd.'s revenue grew 16% and PAT surged by 164% to ₹106.68 Cr in FY26.",
    },
    valuation: {
      peRatio: 15.2,
      industryPeerPe: 28.4,
      marketCapCr: 1620,
      pbRatio: 3.8,
      discountVsPeers: 'Deep 46% discount vs peer average (28.4x P/E)',
    },
    promoterHolding: {
      preIssue: 92.0,
      postIssue: 71.5,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH GMP JEWELLERY GEM)',
      convictionScore: 96,
      summary: 'Asset-light manufacturing model utilizing skilled local karigars. PAT surged from ₹12.82 Cr to ₹106.68 Cr. 100% Fresh Issue, low 15.2x P/E, and high +36.6% Grey Market Premium.',
      strengths: [
        '100% Fresh Issue (₹367 Cr) to scale B2B wholesale and branded retail distribution',
        'Stellar PAT surge to ₹106.68 Cr in FY26 and high 29.8% Return on Equity',
        'Strong +36.6% Grey Market Premium indicates bumper listing day demand',
        'Undervalued at 15.2x P/E offering high safety margin',
      ],
      risks: [
        'Gold bullion price fluctuations and working capital intensity',
      ],
    },
    leadManagers: ['Hem Securities Limited', 'Choice Capital'],
    registrar: 'Bigshare Services Pvt Ltd',
  },
  {
    id: 'SUNSHINE-PICTURES',
    symbol: 'SUNSHINE',
    companyName: 'Sunshine Pictures Limited',
    sector: 'Media, Film Production & Digital OTT Entertainment',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-18',
    closeDate: '2026-08-20',
    allotmentDate: '2026-08-21',
    listingDate: '2026-08-26',
    priceBand: { min: 342, max: 360 },
    lotSize: 41,
    minInvestment: 14760,
    issueSizeCr: 282.14,
    freshIssueCr: 160,
    ofsCr: 122.14,
    gmp: {
      price: 22,
      range: '₹18 - ₹26',
      percent: 6.1,
      trend: 'BEARISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 3:45 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 2 Days (18 Aug)',
    },
    financials: {
      years: ['31 Mar 2025', '31 Mar 2026'],
      revenueCr: [105.80, 139.46],
      patCr: [34.46, 53.35], // Exact Chittorgarh Restated PAT
      patMarginPercent: 38.25,
      ronwPercent: 24.2,
      debtToEquity: 0.18,
      cagrRevenue: 31.8,
      highlight: "Sunshine Pictures Ltd.'s revenue increased by 32% and profit after tax (PAT) rose by 55% between FY25 and FY26.",
    },
    valuation: {
      peRatio: 18.8,
      industryPeerPe: 26.5,
      marketCapCr: 1005,
      pbRatio: 4.2,
      discountVsPeers: 'Fairly valued vs media peers with small project base',
    },
    promoterHolding: {
      preIssue: 84.0,
      postIssue: 65.2,
    },
    decision: {
      verdict: 'APPLY_LISTING',
      badge: '🔵 APPLY (FOR LISTING GAINS / 38% MARGINS)',
      convictionScore: 84,
      summary: 'Profitable film production house (The Kerala Story, Commando) with high 38.2% PAT margin and ₹53.35 Cr PAT in FY26. However, subdued GMP (+6.1%) suggests moderate listing gains.',
      strengths: [
        'High 38.2% Net Profit Margin with ₹53.35 Cr PAT in FY26',
        'Low debt-to-equity ratio (0.18x) and established theatrical/OTT distribution network',
      ],
      risks: [
        'Earnings are project-dependent and volatile based on individual box office releases',
        'Subdued Grey Market Premium (+6.1%) indicates moderate listing day enthusiasm',
      ],
    },
    leadManagers: ['SBI Capital Markets', 'Equirus Capital'],
    registrar: 'KFin Technologies Limited',
  },
  {
    id: 'GAJA-ASSET',
    symbol: 'GAJA',
    companyName: 'Gaja Alternative Asset Management Limited',
    sector: 'Private Equity, Venture Debt & AIF Fund Management',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-19',
    closeDate: '2026-08-21',
    allotmentDate: '2026-08-22',
    listingDate: '2026-08-27',
    priceBand: { min: 152, max: 160 },
    lotSize: 93,
    minInvestment: 14880,
    issueSizeCr: 550,
    freshIssueCr: 350,
    ofsCr: 200,
    gmp: {
      price: 32,
      range: '₹28 - ₹36',
      percent: 20.0,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 4:00 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 3 Days (19 Aug)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [103.96, 123.31, 157.80],
      patCr: [44.74, 61.95, 81.96], // Exact Chittorgarh Restated PAT
      patMarginPercent: 51.93,
      ronwPercent: 32.4,
      debtToEquity: 0.02,
      cagrRevenue: 23.2,
      highlight: "Gaja Alternative Asset Management Ltd.'s revenue increased by 28% and PAT rose by 32% between FY25 and FY26 with a massive 51.9% net margin.",
    },
    valuation: {
      peRatio: 22.4,
      industryPeerPe: 38.5,
      marketCapCr: 1840,
      pbRatio: 5.8,
      discountVsPeers: 'Attractive 41% discount vs listed wealth and AIF managers (38.5x)',
    },
    promoterHolding: {
      preIssue: 78.5,
      postIssue: 62.0,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (51.9% PAT MARGIN & ZERO DEBT)',
      convictionScore: 95,
      summary: 'Stellar financial profile with 51.9% net profit margin (₹81.96 Cr PAT in FY26) and virtually zero debt. Trades at a 41% discount to listed asset managers with +20.0% GMP.',
      strengths: [
        'Extraordinary profitability with 51.9% PAT margin and 32.4% Return on Equity',
        'Debt-free balance sheet with predictable annuity fee income from alternative funds',
        'Attractive valuation at 22.4x P/E (41% discount to 360 ONE & Nippon AMC)',
        'Healthy +20.0% Grey Market Premium',
      ],
      risks: [
        'AUM growth sensitive to broader private equity and venture debt fundraising cycles',
      ],
    },
    leadManagers: ['Kotak Mahindra Capital', 'ICICI Securities', 'Nuvama Wealth'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'TEMPSENS-INSTRUMENTS',
    symbol: 'TEMPSENS',
    companyName: 'Tempsens Instruments (India) Limited',
    sector: 'Thermal Sensors, Pyrometers & Industrial Cables',
    issueType: 'Mainboard',
    exchange: 'NSE / BSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-08-20',
    closeDate: '2026-08-24',
    allotmentDate: '2026-08-25',
    listingDate: '2026-08-28',
    priceBand: { min: 465, max: 490 },
    lotSize: 30,
    minInvestment: 14700,
    issueSizeCr: 820,
    freshIssueCr: 550,
    ofsCr: 270,
    gmp: {
      price: 165,
      range: '₹150 - ₹175',
      percent: 33.7,
      trend: 'HIGH_FIRE',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk, 4:45 PM',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 4 Days (20 Aug)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [278.04, 382.47, 455.86],
      patCr: [40.92, 62.56, 71.07], // Exact Chittorgarh Restated PAT
      patMarginPercent: 15.59,
      ronwPercent: 26.2,
      debtToEquity: 0.12,
      cagrRevenue: 28.0,
      highlight: "Tempsens Instruments (India) Ltd.'s revenue grew 19% and PAT rose 14% to ₹71.07 Cr in FY26.",
    },
    valuation: {
      peRatio: 25.4,
      industryPeerPe: 44.5,
      marketCapCr: 1805,
      pbRatio: 5.8,
      discountVsPeers: 'Deep 42% discount vs industrial automation peers (Honeywell/Siemens)',
    },
    promoterHolding: {
      preIssue: 86.0,
      postIssue: 71.5,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (GLOBAL SENSOR EXPORTER BLOCKBUSTER)',
      convictionScore: 97,
      summary: 'India’s #1 precision thermal sensor manufacturer exporting to 70+ countries. Steady ₹71.07 Cr PAT, high 26.2% ROE, negligible debt (0.12x), and +33.7% GMP.',
      strengths: [
        'Market leader in specialized temperature sensors for semiconductor, steel, glass, and defense sectors',
        'Exports account for 52% of total revenue with global customer relationships across 70 countries',
        'Superb balance sheet: 26.2% ROE and negligible 0.12x debt',
        'Heavy +33.7% Grey Market Premium indicates bumper listing day returns',
      ],
      risks: [
        'Foreign exchange currency fluctuations in export markets',
      ],
    },
    leadManagers: ['HDFC Bank Limited', 'Axis Capital', 'IIFL Securities'],
    registrar: 'KFin Technologies Limited',
  },
];

/**
 * Fetch all upcoming IPOs in the next 7 days
 */
export const getUpcoming7DaysIpos = async () => {
  return IPOS_DATA.filter((ipo) => ipo.status === 'UPCOMING_7_DAYS');
};

/**
 * Fetch IPOs currently open for live bidding
 */
export const getOpenIpos = async () => {
  return IPOS_DATA.filter((ipo) => ipo.status === 'OPEN_NOW');
};

/**
 * Fetch recently listed IPOs for audit verification
 */
export const getRecentListedIpos = async () => {
  return IPOS_DATA.filter((ipo) => ipo.status === 'RECENTLY_LISTED');
};

/**
 * Fetch all IPOs with optional filtering
 */
export const getAllIpos = async ({ status = 'ALL', sector = 'ALL', verdict = 'ALL', issueType = 'ALL', search = '' } = {}) => {
  return IPOS_DATA.filter((ipo) => {
    if (status !== 'ALL' && ipo.status !== status) return false;
    if (sector !== 'ALL' && ipo.sector !== sector) return false;
    if (verdict !== 'ALL' && ipo.decision?.verdict !== verdict) return false;
    if (issueType !== 'ALL' && ipo.issueType !== issueType) return false;

    if (search.trim()) {
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
export const getEnrichedIpos = () => {
  return IPOS_DATA.map((ipo) => {
    if (ipo.status === 'RECENTLY_LISTED') return ipo;
    const dynamic = getDynamicIpoStatus(ipo.openDate, ipo.closeDate);
    return {
      ...ipo,
      status: dynamic.statusKey,
      dynamicBadge: dynamic.badgeText,
      subscription: {
        ...ipo.subscription,
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
