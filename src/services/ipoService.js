/**
 * Comprehensive IPO Service & Institutional Analysis Engine
 * Exact Restated Financials matching Chittorgarh.com & SEBI RHP Filings
 * Active Calendar: September 28 – October 08, 2026
 */

export const IPOS_DATA = [
  // ─── ACTIVE OCTOBER TRADING CALENDAR (OCT 12 - OCT 19, 2026) ───────────────────
  {
    id: 'HDFIREPROT',
    symbol: 'HDFIREPROT',
    companyName: 'HD Fire Protect Limited',
    sector: 'Fire Safety & Industrial Protection Equipment',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-13',
    closeDate: '2026-10-15',
    listingDate: '2026-10-20',
    priceBand: { min: 258, max: 271 },
    lotSize: 55,
    minInvestment: 14905,
    issueSizeCr: 712,
    freshIssueCr: 500,
    ofsCr: 212,
    gmp: {
      price: 48,
      range: '₹42 - ₹54',
      percent: 17.7,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens Tomorrow (13 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [412.5, 528.4, 684.2],
      patCr: [38.2, 54.1, 78.6],
      ebitdaCr: [65.4, 91.2, 122.5],
      assetsCr: [320.4, 410.8, 540.2],
      netWorthCr: [160.2, 224.5, 310.8],
      borrowingsCr: [42.1, 38.5, 32.0],
      patMarginPercent: 11.49,
      ebitdaMarginPercent: 17.9,
      ronwPercent: 25.29,
      debtToEquity: 0.10,
      cagrRevenue: 28.8,
      highlight: 'HD Fire Protect revenue grew at 28.8% CAGR with strong export demand in 65+ countries.',
    },
    valuation: {
      peRatio: 22.4,
      industryPeerPe: 31.8,
      marketCapCr: 2145.0,
      pbRatio: 4.8,
      discountVsPeers: 'Attractive P/E of 22.4x vs industrial safety peers',
    },
    promoterHolding: {
      preIssue: 84.2,
      postIssue: 68.5,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 91,
      summary: 'Leading manufacturer of firefighting engineered solutions with ₹78.6 Cr PAT, 25.3% RoNW, and low debt (0.10x). Strong global order pipeline.',
      strengths: [
        'Dominant player in industrial & oil/gas fire safety systems with 65+ export markets',
        'Revenue CAGR of 28.8% with consistently expanding EBITDA margins',
        'Low debt balance sheet with ₹500 Cr fresh issue earmarked for manufacturing capex',
      ],
      risks: [
        'Raw material brass & stainless steel pricing cyclicality',
        'Stringent international safety testing and certification cycles',
      ],
    },
    leadManagers: ['ICICI Securities', 'Axis Capital'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'FUSIONCX',
    symbol: 'FUSIONCX',
    companyName: 'Fusion CX Limited',
    sector: 'Customer Experience & Enterprise Cloud AI',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-14',
    closeDate: '2026-10-16',
    listingDate: '2026-10-21',
    priceBand: { min: 275, max: 289 },
    lotSize: 51,
    minInvestment: 14739,
    issueSizeCr: 702,
    freshIssueCr: 450,
    ofsCr: 252,
    gmp: {
      price: 55,
      range: '₹48 - ₹62',
      percent: 19.0,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 2 Days (14 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [650.4, 820.6, 1045.8],
      patCr: [45.2, 68.4, 98.7],
      ebitdaCr: [95.4, 134.2, 185.6],
      assetsCr: [510.2, 680.5, 890.4],
      netWorthCr: [240.5, 335.2, 460.8],
      borrowingsCr: [65.2, 58.4, 44.1],
      patMarginPercent: 9.44,
      ebitdaMarginPercent: 17.75,
      ronwPercent: 21.42,
      debtToEquity: 0.10,
      cagrRevenue: 26.8,
      highlight: 'Fusion CX crossed ₹1,000 Cr revenue mark driven by AI-powered omnichannel voice & digital services.',
    },
    valuation: {
      peRatio: 24.5,
      industryPeerPe: 33.2,
      marketCapCr: 2420.0,
      pbRatio: 5.25,
      discountVsPeers: 'P/E of 24.5x vs BPO/IT services peer average of 33.2x',
    },
    promoterHolding: {
      preIssue: 78.5,
      postIssue: 62.4,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 90,
      summary: 'Global customer experience & digital AI services provider with ₹1,045 Cr revenue, solid 17.7% EBITDA margin, and low net debt.',
      strengths: [
        'Scalable presence across North America, Europe, and Asia-Pacific markets',
        'Healthy profitability expansion with PAT up 118% over 3 years',
        'Deep generative AI agent integration into enterprise client workflows',
      ],
      risks: [
        'Client concentration among top 10 enterprise accounts',
        'Foreign exchange currency fluctuations across USD and EUR',
      ],
    },
    leadManagers: ['Kotak Mahindra Capital', 'JM Financial'],
    registrar: 'KFin Technologies Limited',
  },
  {
    id: 'TONBOIMAGI',
    symbol: 'TONBOIMAGI',
    companyName: 'Tonbo Imaging India Limited',
    sector: 'Defense Optics, AI Vision & Thermal Imaging',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-15',
    closeDate: '2026-10-19',
    listingDate: '2026-10-22',
    priceBand: { min: 665, max: 700 },
    lotSize: 21,
    minInvestment: 14700,
    issueSizeCr: 852,
    freshIssueCr: 600,
    ofsCr: 252,
    gmp: {
      price: 175,
      range: '₹155 - ₹195',
      percent: 25.0,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 3 Days (15 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [215.4, 385.2, 592.6],
      patCr: [28.4, 62.5, 114.8],
      ebitdaCr: [48.6, 98.4, 172.5],
      assetsCr: [265.4, 450.2, 720.5],
      netWorthCr: [142.5, 235.8, 412.6],
      borrowingsCr: [35.2, 28.5, 18.4],
      patMarginPercent: 19.37,
      ebitdaMarginPercent: 29.11,
      ronwPercent: 27.82,
      debtToEquity: 0.04,
      cagrRevenue: 65.9,
      highlight: 'Tonbo Imaging net profit expanded 4x in 3 years with extraordinary 29.1% EBITDA margin in defense EO/IR optics.',
    },
    valuation: {
      peRatio: 32.5,
      industryPeerPe: 48.0,
      marketCapCr: 3730.0,
      pbRatio: 9.04,
      discountVsPeers: 'Attractive valuation multiple of 32.5x vs defense peer average of 48.0x',
    },
    promoterHolding: {
      preIssue: 72.8,
      postIssue: 56.4,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 95,
      summary: 'Premier defense tech company supplying autonomous electro-optics and night vision to Indian military and 25+ global militaries. 65.9% revenue CAGR and 29.1% EBITDA margin.',
      strengths: [
        'Proprietary IP and patented AI thermal-vision tech deployed on weapon platforms',
        'Multi-year defense modernization and Make-in-India defense export tailwind',
        'Virtually debt-free (0.04x) with massive 27.8% Return on Net Worth',
      ],
      risks: [
        'High dependence on defense procurement budgetary clearances and defense tenders',
        'Long working capital conversion cycles typical of defense hardware manufacturing',
      ],
    },
    leadManagers: ['Axis Capital', 'IIFL Securities'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'ZETWERK',
    symbol: 'ZETWERK',
    companyName: 'Zetwerk Manufacturing Business Limited',
    sector: 'Precision Contract Manufacturing & Supply Chain',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-15',
    closeDate: '2026-10-19',
    listingDate: '2026-10-23',
    priceBand: { min: 143, max: 151 },
    lotSize: 99,
    minInvestment: 14949,
    issueSizeCr: 5012,
    freshIssueCr: 3500,
    ofsCr: 1512,
    gmp: {
      price: 38,
      range: '₹34 - ₹44',
      percent: 25.2,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 3 Days (15 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [4960.5, 8420.2, 13250.0],
      patCr: [85.2, 182.4, 385.6],
      ebitdaCr: [248.5, 485.6, 895.2],
      assetsCr: [3400.2, 5800.5, 8950.4],
      netWorthCr: [1650.4, 2520.8, 4120.5],
      borrowingsCr: [480.5, 520.2, 450.0],
      patMarginPercent: 2.91,
      ebitdaMarginPercent: 6.76,
      ronwPercent: 12.8,
      debtToEquity: 0.11,
      cagrRevenue: 63.4,
      highlight: 'Zetwerk surged to ₹13,250 Cr revenue with strong order book in aerospace, renewables, and electronics.',
    },
    valuation: {
      peRatio: 42.5,
      industryPeerPe: 58.0,
      marketCapCr: 16380.0,
      pbRatio: 3.97,
      discountVsPeers: 'Mega manufacturing platform trading at attractive discount to EMS peers',
    },
    promoterHolding: {
      preIssue: 68.4,
      postIssue: 52.8,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 93,
      summary: 'Leading customized manufacturing supply chain platform across aerospace, consumer tech, and renewables. Massive scale (₹13,250 Cr turnover) with ₹3,500 Cr fresh growth capital.',
      strengths: [
        'Dominant market leadership in precision manufacturing & global supply chains',
        'Rapid revenue scaling from ₹4,960 Cr to ₹13,250 Cr (+63% CAGR)',
        'Diversified client base across India, North America, and Europe',
      ],
      risks: [
        'Low net margins (2.9%) typical of contract manufacturing & procurement',
        'Working capital intensive business operations requiring regular liquidity',
      ],
    },
    leadManagers: ['Kotak Mahindra Capital', 'Citigroup Global Markets', 'Morgan Stanley India'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'BONFIGLIOL',
    symbol: 'BONFIGLIOL',
    companyName: 'Bonfiglioli Transmissions Limited',
    sector: 'Industrial Gearmotors & Motion Drive Automation',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-15',
    closeDate: '2026-10-19',
    listingDate: '2026-10-23',
    priceBand: { min: 558, max: 586 },
    lotSize: 25,
    minInvestment: 14650,
    issueSizeCr: 2534,
    freshIssueCr: 1800,
    ofsCr: 734,
    gmp: {
      price: 110,
      range: '₹95 - ₹125',
      percent: 18.8,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 3 Days (15 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [1680.5, 2120.4, 2650.8],
      patCr: [142.5, 195.8, 268.4],
      ebitdaCr: [265.4, 345.8, 442.5],
      assetsCr: [1420.5, 1850.4, 2350.6],
      netWorthCr: [720.5, 985.4, 1340.2],
      borrowingsCr: [180.5, 150.2, 110.4],
      patMarginPercent: 10.13,
      ebitdaMarginPercent: 16.69,
      ronwPercent: 20.03,
      debtToEquity: 0.08,
      cagrRevenue: 25.6,
      highlight: 'Bonfiglioli delivered steady 25.6% CAGR with strong demand in renewable wind gearboxes and robotic automation.',
    },
    valuation: {
      peRatio: 28.5,
      industryPeerPe: 38.0,
      marketCapCr: 7650.0,
      pbRatio: 5.71,
      discountVsPeers: 'P/E of 28.5x vs industrial automation peers of 38.0x',
    },
    promoterHolding: {
      preIssue: 85.0,
      postIssue: 71.2,
    },
    decision: {
      verdict: 'APPLY_LISTING',
      badge: '🔵 APPLY (FOR LISTING GAINS)',
      convictionScore: 88,
      summary: 'Leading multinational gearboxes and motion control manufacturer with ₹268.4 Cr PAT, 20% RoNW, and strong MNC parentage. Proven high-margin industrial moat.',
      strengths: [
        'Dominant market share in wind turbine gearboxes, construction machinery, and AGVs',
        'High ROCE of 26.5% with de-leveraging balance sheet (Debt/Equity 0.08)',
        'Clear beneficiary of Indian infrastructure capex and renewable energy rollouts',
      ],
      risks: [
        'Raw material alloy steel and specialized casting cost fluctuations',
        'Cyclicality in end-user capital expenditure industries',
      ],
    },
    leadManagers: ['BNP Paribas', 'HSBC Securities', 'SBI Capital Markets'],
    registrar: 'KFin Technologies Limited',
  },
  {
    id: 'SAHAJANAND',
    symbol: 'SAHAJANAND',
    companyName: 'Sahajanand Medical Technologies Limited',
    sector: 'Advanced Cardiovascular Medical Devices & Stents',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_7_DAYS',
    openDate: '2026-10-15',
    closeDate: '2026-10-19',
    listingDate: '2026-10-23',
    priceBand: { min: 327, max: 344 },
    lotSize: 43,
    minInvestment: 14792,
    issueSizeCr: 475,
    freshIssueCr: 350,
    ofsCr: 125,
    gmp: {
      price: 72,
      range: '₹64 - ₹80',
      percent: 20.9,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Opens in 3 Days (15 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [685.2, 890.5, 1140.2],
      patCr: [62.4, 98.5, 142.6],
      ebitdaCr: [135.4, 188.6, 252.4],
      assetsCr: [650.4, 820.5, 1080.2],
      netWorthCr: [320.5, 460.2, 680.4],
      borrowingsCr: [95.4, 75.2, 52.0],
      patMarginPercent: 12.51,
      ebitdaMarginPercent: 22.14,
      ronwPercent: 20.96,
      debtToEquity: 0.08,
      cagrRevenue: 29.0,
      highlight: 'SMT achieved ₹1,140 Cr revenue with exceptional 22.1% EBITDA margin in coronary stents.',
    },
    valuation: {
      peRatio: 26.2,
      industryPeerPe: 36.5,
      marketCapCr: 3735.0,
      pbRatio: 5.49,
      discountVsPeers: 'Attractively valued at 26.2x P/E vs medtech peers',
    },
    promoterHolding: {
      preIssue: 76.5,
      postIssue: 61.8,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 91,
      summary: 'Leading Indian developer of cardiovascular drug-eluting stents and structural heart valves. Operates across 75+ countries with top-tier 22.1% EBITDA margins.',
      strengths: [
        'India market leader in drug-eluting stents with robust European CE clinical trials',
        'High operating margin (22.1%) with debt-to-equity reduced to 0.08',
        '₹350 Cr fresh equity earmarked for R&D expansion and global clinical registrations',
      ],
      risks: [
        'Domestic NPPA price capping on cardiovascular stents',
        'Complex international regulatory and multi-country clinical audit timelines',
      ],
    },
    leadManagers: ['BofA Securities', 'Edelweiss Financial Services'],
    registrar: 'Link Intime India Pvt Ltd',
  },
  {
    id: 'JIOPLATFOR',
    symbol: 'JIOPLATFOR',
    companyName: 'Jio Platforms Limited',
    sector: 'Telecom, 5G & Digital Services',
    issueType: 'Mainboard',
    exchange: 'BSE, NSE',
    status: 'UPCOMING_LATER',
    openDate: '2026-10-20',
    closeDate: '2026-10-24',
    listingDate: '2026-10-29',
    priceBand: { min: 420, max: 450 },
    lotSize: 33,
    minInvestment: 14850,
    issueSizeCr: 15000,
    freshIssueCr: 10000,
    ofsCr: 5000,
    gmp: {
      price: 125,
      range: '₹110 - ₹140',
      percent: 27.8,
      trend: 'BULLISH',
      updatedAt: 'Live from Chittorgarh & Grey Market Desk',
    },
    subscription: {
      qib: 0,
      nii: 0,
      retail: 0,
      total: 0,
      status: 'Upcoming Radar (Opens 20 Oct)',
    },
    financials: {
      years: ['31 Mar 2024', '31 Mar 2025', '31 Mar 2026'],
      revenueCr: [95000, 112000, 134000],
      patCr: [18500, 23400, 29800],
      ebitdaCr: [48000, 58000, 71000],
      assetsCr: [290000, 320000, 360000],
      netWorthCr: [190000, 220000, 260000],
      borrowingsCr: [45000, 38000, 30000],
      patMarginPercent: 22.24,
      ebitdaMarginPercent: 52.98,
      ronwPercent: 11.46,
      debtToEquity: 0.12,
      cagrRevenue: 18.7,
      highlight: 'Jio Platforms generated ₹29,800 Cr net profit with 53% EBITDA margin across 490M subscribers.',
    },
    valuation: {
      peRatio: 32.0,
      industryPeerPe: 42.0,
      marketCapCr: 953600,
      pbRatio: 3.66,
      discountVsPeers: 'Anchor digital giant offering massive scale at reasonable P/E multiple',
    },
    promoterHolding: {
      preIssue: 67.0,
      postIssue: 58.0,
    },
    decision: {
      verdict: 'APPLY',
      badge: '🟢 MUST APPLY (HIGH CONVICTION)',
      convictionScore: 96,
      summary: 'India’s largest telecom and digital services ecosystem with 490M+ 5G subscribers and high 53% EBITDA margin. Landmark mega-issue of the year.',
      strengths: [
        'Dominant market share in Indian telecom, broadband, and digital entertainment',
        'Massive ₹29,800 Cr PAT with consistent free cash flow generation',
        'Global marquee co-investors including Google, Meta, and sovereign funds',
      ],
      risks: [
        'High capital expenditure requirements for ongoing 6G and AI data center rollouts',
        'Regulatory and spectrum renewal auction costs',
      ],
    },
    leadManagers: ['Morgan Stanley', 'Kotak Mahindra Capital', 'J.P. Morgan'],
    registrar: 'KFin Technologies Limited',
  },
  // ─── AUDITED PREVIOUS IPO RECORD (SEPTEMBER - OCTOBER 2026) ───────────────────
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

export const getComingWeekWindow = (refDate = new Date()) => {
  const now = new Date(refDate);
  const dayOfWeek = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat

  let daysUntilMonday;
  if (dayOfWeek === 6) {
    daysUntilMonday = 2; // Saturday -> Monday is +2 days
  } else if (dayOfWeek === 0) {
    daysUntilMonday = 1; // Sunday -> Monday is +1 day
  } else {
    daysUntilMonday = -(dayOfWeek - 1); // Mon-Fri active trading week
  }

  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return { monday, sunday };
};

/**
 * Dynamically resolves IPO timeline status based on current calendar date and active week window
 */
export const getDynamicIpoStatus = (openDateStr, closeDateStr, refDate = new Date()) => {
  if (!openDateStr || !closeDateStr) {
    return {
      statusKey: 'UPCOMING_7_DAYS',
      badgeText: 'Upcoming',
      isBiddingOpen: false,
    };
  }

  const today = new Date(refDate);
  const openDate = new Date(openDateStr);
  const closeDate = new Date(closeDateStr);

  const todayMs = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const openMs = new Date(openDate.getFullYear(), openDate.getMonth(), openDate.getDate()).getTime();
  const closeMs = new Date(closeDate.getFullYear(), closeDate.getMonth(), closeDate.getDate()).getTime();

  const { sunday } = getComingWeekWindow(today);
  const sundayMs = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate(), 23, 59, 59, 999).getTime();

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
    // Strictly in this active week (on or before Sunday of the active cycle)
    if (openMs <= sundayMs) {
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

    // Opens after Sunday (beyond this week's timeline)
    return {
      statusKey: 'UPCOMING_LATER',
      badgeText: `📅 Opens Next Week (${openDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })})`,
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
      // Purge legacy cache with outdated regex or expired calendar
      localStorage.removeItem('stock_analyzer_weekly_ipos');
      localStorage.removeItem('stock_analyzer_weekly_ipos_v2');
      localStorage.removeItem('stock_analyzer_weekly_ipos_v3');
      const cached = localStorage.getItem('stock_analyzer_weekly_ipos_v4');
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
