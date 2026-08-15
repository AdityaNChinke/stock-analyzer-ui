import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRecommendations, getTodayRecommendations } from '../services/recommendationService';

export const useRecommendations = (isTodayOnly = false) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecs = useCallback(async () => {
    setError(null);
    try {
      const data = isTodayOnly
        ? await getTodayRecommendations()
        : await getRecommendations();
      if (Array.isArray(data)) {
        setRecommendations(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  }, [isTodayOnly]);

  useEffect(() => {
    fetchRecs();
  }, [fetchRecs]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = recommendations.length;
    const buy = recommendations.filter((r) => r.recommendation === 'BUY').length;
    const sell = recommendations.filter((r) => r.recommendation === 'SELL').length;
    const watch = recommendations.filter((r) => r.recommendation === 'WATCH').length;
    const avgConfidence =
      total > 0
        ? Math.round(recommendations.reduce((sum, r) => sum + (r.confidenceScore || 0), 0) / total)
        : 82;

    return { total, buy, sell, watch, avgConfidence };
  }, [recommendations]);

  // Filtered and searched recommendations
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((rec) => {
      // Type filter
      if (filterType !== 'ALL' && rec.recommendation !== filterType) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const symbolMatch = rec.symbol?.toLowerCase().includes(query);
        const nameMatch = rec.companyName?.toLowerCase().includes(query);
        const sectorMatch = rec.sector?.toLowerCase().includes(query);
        return symbolMatch || nameMatch || sectorMatch;
      }

      return true;
    });
  }, [recommendations, filterType, searchQuery]);

  return {
    recommendations: filteredRecommendations,
    filteredRecommendations,
    allRecommendations: recommendations,
    stats,
    loading,
    error,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    refetch: fetchRecs,
  };
};

export default useRecommendations;
