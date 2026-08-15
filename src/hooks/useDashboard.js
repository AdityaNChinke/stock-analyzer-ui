import { useState, useEffect, useCallback } from 'react';
import { getDashboardSummary } from '../services/dashboardService';
import { MOCK_DASHBOARD_SUMMARY } from '../services/mockData';

export const useDashboard = () => {
  const [data, setData] = useState(MOCK_DASHBOARD_SUMMARY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setError(null);
    try {
      const result = await getDashboardSummary();
      if (result) setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard summary');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    data,
    loading,
    error,
    refetch: fetchSummary,
  };
};
