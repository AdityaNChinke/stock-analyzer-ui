import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRecommendations, getTodayRecommendations } from '../services/recommendationService';
import { MOCK_RECOMMENDATIONS } from '../services/mockData';

export const useRecommendations = (isTodayOnly = false) => {
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecs = useCallback(async () => {
    setError(null);
    try {
      const data = isTodayOnly
        ? await getTodayRecommendations()
        : await getRecommendations();
      if (Array.isArray(data) && data.length > 0) {
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
        : 0;

    return { total, buy, sell, watch, avgConfidence };
  }, [recommendations]);

  // Filtered dataset
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter((rec) => {
      const symbolStr = (rec.symbol || rec.stock || '').toLowerCase();
      const companyStr = (rec.companyName || '').toLowerCase();
      const reasonStr = (rec.reason || '').toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchSearch =
        !query ||
        symbolStr.includes(query) ||
        companyStr.includes(query) ||
        reasonStr.includes(query);

      const matchType = filterType === 'ALL' || rec.recommendation === filterType;

      return matchSearch && matchType;
    });
  }, [recommendations, filterType, searchQuery]);

  return {
    recommendations,
    filteredRecommendations,
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
