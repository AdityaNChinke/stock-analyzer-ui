import { useState, useEffect, useCallback } from 'react';
import { getStockPrices, getStockIndicators, getStockBySymbol } from '../services/stockService';

export const useStockDetails = (symbol) => {
  const [stockInfo, setStockInfo] = useState(null);
  const [prices, setPrices] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async () => {
    if (!symbol) return;
    setError(null);
    try {
      const [stockRes, pricesRes, indicatorsRes] = await Promise.all([
        getStockBySymbol(symbol),
        getStockPrices(symbol),
        getStockIndicators(symbol),
      ]);

      setStockInfo(stockRes);
      if (Array.isArray(pricesRes) && pricesRes.length > 0) {
        setPrices(pricesRes);
      }
      if (indicatorsRes) {
        setIndicators(indicatorsRes);
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
    loading,
    error,
    refetch: fetchDetails,
  };
};
