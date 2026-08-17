import { useState, useEffect, useCallback } from 'react';
import { getStockPrices, getStockIndicators, getStockBySymbol } from '../services/stockService';
import { getTodayRecommendations } from '../services/recommendationService';
import { getCachedMidcapBreakouts } from '../services/midcapBreakoutService';

export const useStockDetails = (symbol) => {
  const [stockInfo, setStockInfo] = useState(null);
  const [prices, setPrices] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!symbol) return;
    setError(null);
    try {
      const cleanSym = String(symbol).toUpperCase().replace('.NS', '');
      const [stockRes, pricesRes, indicatorsRes, todayRecs] = await Promise.all([
        getStockBySymbol(cleanSym),
        getStockPrices(cleanSym),
        getStockIndicators(cleanSym),
        getTodayRecommendations().catch(() => []),
      ]);

      setStockInfo(stockRes);
      if (Array.isArray(pricesRes) && pricesRes.length > 0) {
        setPrices(pricesRes);
      }
      if (indicatorsRes) {
        setIndicators(indicatorsRes);
      }

      // Check Largecap Top 5 or Midcap Breakouts
      const midcaps = getCachedMidcapBreakouts() || [];
      const foundMidcap = midcaps.find((m) => m.symbol.toUpperCase() === cleanSym);
      const foundToday = (todayRecs || []).find((r) => r.symbol.toUpperCase() === cleanSym);

      if (foundToday) {
        setRecommendation(foundToday);
      } else if (foundMidcap) {
        setRecommendation(foundMidcap);
      } else {
        setRecommendation(null);
      }
    } catch (err) {
      setError(err.message || `Failed to load details for ${symbol}`);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    stockInfo,
    prices,
    indicators,
    recommendation,
    loading,
    error,
    refetch: fetchDetails,
  };
};

export default useStockDetails;
