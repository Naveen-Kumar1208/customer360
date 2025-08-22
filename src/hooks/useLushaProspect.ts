import { useState, useCallback } from 'react';
import type { ProspectData, ProspectingFilters } from '@/types/lusha';
import { lushaApiService } from '@/lib/services/lushaApi';

interface UseLushaProspectState {
  data: ProspectData[];
  loading: boolean;
  error: string | null;
  totalResults?: number;
  hasMore?: boolean;
}

export const useLushaProspect = () => {
  const [state, setState] = useState<UseLushaProspectState>({
    data: [],
    loading: false,
    error: null,
    totalResults: 0,
    hasMore: false
  });

  const searchProspects = useCallback(async (filters: ProspectingFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.searchProspects(filters);
      setState(prev => ({ 
        ...prev, 
        data: results, 
        loading: false,
        totalResults: results.length,
        hasMore: results.length >= 50 // Assuming 50 is the default limit
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search prospect data';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const loadMoreProspects = useCallback(async (filters: ProspectingFilters, offset = 0) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Note: This would need to be implemented in the API service with pagination support
      const results = await lushaApiService.searchProspects(filters);
      setState(prev => ({ 
        ...prev, 
        data: offset === 0 ? results : [...prev.data, ...results],
        loading: false,
        hasMore: results.length >= 50
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load more prospects';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const addProspectToResults = useCallback((prospect: ProspectData) => {
    setState(prev => ({
      ...prev,
      data: [prospect, ...prev.data]
    }));
  }, []);

  const updateProspectStatus = useCallback((prospectId: string, status: ProspectData['status']) => {
    setState(prev => ({
      ...prev,
      data: prev.data.map(prospect => 
        prospect.id === prospectId 
          ? { ...prospect, status }
          : prospect
      )
    }));
  }, []);

  const removeProspect = useCallback((prospectId: string) => {
    setState(prev => ({
      ...prev,
      data: prev.data.filter(prospect => prospect.id !== prospectId),
      totalResults: prev.totalResults ? prev.totalResults - 1 : 0
    }));
  }, []);

  const clearData = useCallback(() => {
    setState({ 
      data: [], 
      loading: false, 
      error: null,
      totalResults: 0,
      hasMore: false
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const getProspectsByStatus = useCallback((status: ProspectData['status']) => {
    return state.data.filter(prospect => prospect.status === status);
  }, [state.data]);

  const getHighScoreProspects = useCallback((minScore = 80) => {
    return state.data.filter(prospect => prospect.score >= minScore);
  }, [state.data]);

  return {
    ...state,
    searchProspects,
    loadMoreProspects,
    addProspectToResults,
    updateProspectStatus,
    removeProspect,
    clearData,
    clearError,
    getProspectsByStatus,
    getHighScoreProspects
  };
};

export default useLushaProspect;