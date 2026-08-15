import { useState, useEffect, useCallback, useMemo } from 'react';
import { getStocks } from '../services/stockService';

export const useStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');

  const fetchStocksList = useCallback(async () => {
    setError(null);
    try {
      const result = await getStocks();
      if (Array.isArray(result)) {
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
      // Sector filter
      if (selectedSector !== 'ALL' && stock.sector !== selectedSector) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const symbolMatch = stock.symbol?.toLowerCase().includes(query);
        const nameMatch = stock.companyName?.toLowerCase().includes(query);
        return symbolMatch || nameMatch;
      }

      return true;
    });
  }, [stocks, selectedSector, searchQuery]);

  return {
    stocks: filteredStocks,
    filteredStocks,
    allStocks: stocks,
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

export default useStocks;
