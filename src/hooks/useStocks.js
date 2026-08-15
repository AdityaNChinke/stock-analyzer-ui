import { useState, useEffect, useCallback, useMemo } from 'react';
import { getStocks } from '../services/stockService';
import { MOCK_STOCKS } from '../services/mockData';

export const useStocks = () => {
  const [stocks, setStocks] = useState(MOCK_STOCKS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');

  const fetchStocksList = useCallback(async () => {
    setError(null);
    try {
      const result = await getStocks();
      if (Array.isArray(result) && result.length > 0) {
        setStocks(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to load stocks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocksList();
  }, [fetchStocksList]);

  // Extract unique sectors
  const sectors = useMemo(() => {
    const set = new Set();
    stocks.forEach((s) => {
      if (s.sector) set.add(s.sector);
    });
    return ['ALL', ...Array.from(set)];
  }, [stocks]);

  // Filter stocks by search query and sector
  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchSearch =
        !searchQuery ||
        (stock.symbol && stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (stock.companyName && stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchSector = selectedSector === 'ALL' || stock.sector === selectedSector;

      return matchSearch && matchSector;
    });
  }, [stocks, searchQuery, selectedSector]);

  return {
    stocks,
    filteredStocks,
    sectors,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    refetch: fetchStocksList,
  };
};
