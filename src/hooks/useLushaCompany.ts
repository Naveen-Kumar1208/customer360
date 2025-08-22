import { useState, useCallback } from 'react';
import type { CompanyData, CompanySearchData } from '@/types/lusha';
import { lushaApiService } from '@/lib/services/lushaApi';

interface UseLushaCompanyState {
  data: CompanyData[];
  loading: boolean;
  error: string | null;
}

export const useLushaCompany = () => {
  const [state, setState] = useState<UseLushaCompanyState>({
    data: [],
    loading: false,
    error: null
  });

  const searchCompany = useCallback(async (searchData: CompanySearchData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.searchCompany(searchData);
      setState(prev => ({ ...prev, data: results, loading: false }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search company data';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const bulkSearchCompanies = useCallback(async (searchDataArray: CompanySearchData[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const allResults: CompanyData[] = [];
      
      // Process companies in batches to avoid rate limiting
      for (const searchData of searchDataArray) {
        const results = await lushaApiService.searchCompany(searchData);
        allResults.push(...results);
        
        // Add a small delay to respect rate limits
        if (searchDataArray.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      setState(prev => ({ ...prev, data: allResults, loading: false }));
      return allResults;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to bulk search company data';
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
    searchCompany,
    bulkSearchCompanies,
    clearData,
    clearError
  };
};

export default useLushaCompany;