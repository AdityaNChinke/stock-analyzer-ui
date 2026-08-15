# StockAnalyzer Pro - UI

A professional, high-performance financial stock analysis frontend built with **React**, **Material UI (MUI)**, **Axios**, **React Router**, and **Recharts**.

Connected seamlessly with the Spring Boot backend running on `http://localhost:8080/api`.

---

## 🚀 Features

- **Executive Dashboard (`/dashboard`)**:
  - Live Summary KPIs: Total Stocks, Buy Recommendations, Sell Recommendations, Watch Recommendations.
  - Active Signals, Top Movers, and Market Sentiment gauges.
  - Latest algorithmic recommendations preview.
- **Stock List & Screener (`/stocks`)**:
  - Filterable by sectors (Technology, Healthcare, Financials, Energy, etc.).
  - Instant search across symbol & company names.
  - 24h change, pricing, volume, and quick action links.
- **Deep Technical Analysis (`/stocks/:symbol`)**:
  - Interactive **Price History Chart** (1W, 1M, 3M, 6M, 1Y, ALL).
  - **RSI (14)** indicator with Overbought (70) and Oversold (30) reference thresholds.
  - **EMA 20 & EMA 50** moving average overlays.
  - **MACD (12, 26, 9)** oscillator with colored histogram momentum bars.
  - Key trading metrics: Support & Resistance levels, overall recommendation badge, stop loss & target setup.
- **Recommendations Hub (`/recommendations`)**:
  - Filter by signal type: All, Buy, Sell, Watch.
  - Confidence scoring gauge, target prices, stop-loss limits, and detailed algorithmic rationales.
- **Today's Hot Picks (`/recommendations/today`)**:
  - Daily spotlight trade setups with risk-reward ratios and trigger levels.
- **Performance & Alpha Audit (`/performance`)**:
  - Historical win rate, total closed trades, profit factor, and average win/loss.
  - Monthly strategy alpha vs S&P 500 benchmark chart.
  - Closed recommendation calls audit table.
- **Theme Support**:
  - Financial Terminal Dark Mode (default) & Crisp Light Mode toggle with persistent storage.
- **Resilient Backend Integration**:
  - Direct connection to `http://localhost:8080/api`.
  - Automatic graceful demo mock fallback when the backend is offline.
  - Live status indicator in the top navbar.

---

## 📁 Project Structure

```
stock-analyzer-ui/
├── .env                              # VITE_API_BASE_URL=http://localhost:8080/api
├── src/
│   ├── components/
│   │   ├── charts/                   # Recharts PriceChart & IndicatorChart
│   │   ├── common/                   # LoadingComponent, ErrorComponent, PageHeader, StatusChip, ConfidenceGauge
│   │   ├── dashboard/                # StatCard KPI component
│   │   └── recommendations/          # RecommendationTable component
│   ├── hooks/                        # Custom React hooks (useDashboard, useStocks, useStockDetails, useRecommendations)
│   ├── layouts/                      # MainLayout, Sidebar, TopNavbar
│   ├── pages/                        # Dashboard, StockListPage, StockDetailPage, RecommendationPage, TodayRecommendationsPage, PerformancePage, NotFoundPage
│   ├── services/                     # api.js, stockService.js, recommendationService.js, dashboardService.js, performanceService.js, mockData.js
│   ├── theme/                        # MUI theme configuration (Dark/Light mode financial palette)
│   ├── utils/                        # formatters.js, constants.js
│   ├── App.jsx                       # Router and Theme Provider configuration
│   ├── index.css                     # Global reset and typography
│   └── main.jsx                      # Application entry point
```

---

## 🛠️ Backend Endpoints Consumed

| Endpoint | Method | Description |
|---|---|---|
| `/dashboard/summary` | `GET` | Dashboard summary metrics and counts |
| `/stocks` | `GET` | All tracked stocks list |
| `/prices/{symbol}` | `GET` | Historical price records for symbol |
| `/indicators/{symbol}` | `GET` | RSI, EMA20, EMA50, MACD indicator calculations |
| `/recommendations` | `GET` | All published recommendations |
| `/recommendations/today`| `GET` | High-priority recommendations for today |
| `/performance` | `GET` | Historical win rate and performance metrics |

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Edit `.env` if your Spring Boot backend runs on a different port or host:
```properties
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
