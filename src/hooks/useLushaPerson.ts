import { useState, useCallback } from 'react';
import type { PersonData, PersonSearchData } from '@/types/lusha';
import { lushaApiService } from '@/lib/services/lushaApi';

interface UseLushaPersonState {
  data: PersonData[];
  loading: boolean;
  error: string | null;
}

export const useLushaPerson = () => {
  const [state, setState] = useState<UseLushaPersonState>({
    data: [],
    loading: false,
    error: null
  });

  const enrichPerson = useCallback(async (searchData: PersonSearchData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.enrichPerson(searchData);
      setState(prev => ({ ...prev, data: results, loading: false }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enrich person data';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const bulkEnrichPersons = useCallback(async (searchDataArray: PersonSearchData[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.bulkEnrichPersons(searchDataArray);
      setState(prev => ({ ...prev, data: results, loading: false }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to bulk enrich person data';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const clearData = useCallback(() => {
    setState({ data: [], loading: false, error: null });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    enrichPerson,
    bulkEnrichPersons,
    clearData,
    clearError
  };
};

export default useLushaPerson;