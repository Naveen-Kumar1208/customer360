import { useState, useCallback } from 'react';
import type { 
  ApolloPersonData, 
  ApolloOrganizationData, 
  ApolloPersonSearchData, 
  ApolloOrganizationSearchData,
  ApolloSearchFilters
} from '@/types/apollo';
import { apolloApiService } from '@/lib/services/apolloApi';

interface UseApolloState {
  peopleData: ApolloPersonData[];
  organizationData: ApolloOrganizationData[];
  loading: boolean;
  error: string | null;
  searchPerformed: boolean;
}

export const useApollo = () => {
  const [state, setState] = useState<UseApolloState>({
    peopleData: [],
    organizationData: [],
    loading: false,
    error: null,
    searchPerformed: false
  });

  const searchPeople = useCallback(async (searchData: ApolloPersonSearchData, filters?: ApolloSearchFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null, searchPerformed: false }));
    
    try {
      const results = await apolloApiService.searchPeople(searchData, filters);
      setState(prev => ({ 
        ...prev, 
        peopleData: results, 
        loading: false, 
        searchPerformed: true 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search people';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
        searchPerformed: true 
      }));
      throw error;
    }
  }, []);

  const searchOrganizations = useCallback(async (searchData: ApolloOrganizationSearchData, filters?: ApolloSearchFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null, searchPerformed: false }));
    
    try {
      const results = await apolloApiService.searchOrganizations(searchData, filters);
      setState(prev => ({ 
        ...prev, 
        organizationData: results, 
        loading: false, 
        searchPerformed: true 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search organizations';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
        searchPerformed: true 
      }));
      throw error;
    }
  }, []);

  const enrichPerson = useCallback(async (searchData: ApolloPersonSearchData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apolloApiService.enrichPerson(searchData);
      if (result) {
        setState(prev => ({ 
          ...prev, 
          peopleData: [result], 
          loading: false, 
          searchPerformed: true 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          peopleData: [], 
          loading: false, 
          searchPerformed: true 
        }));
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enrich person';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
        searchPerformed: true 
      }));
      throw error;
    }
  }, []);

  const enrichOrganization = useCallback(async (searchData: ApolloOrganizationSearchData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apolloApiService.enrichOrganization(searchData);
      if (result) {
        setState(prev => ({ 
          ...prev, 
          organizationData: [result], 
          loading: false, 
          searchPerformed: true 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          organizationData: [], 
          loading: false, 
          searchPerformed: true 
        }));
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enrich organization';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
        searchPerformed: true 
      }));
      throw error;
    }
  }, []);

  const bulkEnrichOrganizations = useCallback(async (organizationIds: string[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await apolloApiService.bulkEnrichOrganizations(organizationIds);
      setState(prev => ({ 
        ...prev, 
        organizationData: results, 
        loading: false, 
        searchPerformed: true 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to bulk enrich organizations';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
        searchPerformed: true 
      }));
      throw error;
    }
  }, []);

  const clearData = useCallback(() => {
    setState({
      peopleData: [],
      organizationData: [],
      loading: false,
      error: null,
      searchPerformed: false
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const setApiKey = useCallback((apiKey: string) => {
    apolloApiService.setApiKey(apiKey);
  }, []);

  const testConnection = useCallback(async () => {
    try {
      const isConnected = await apolloApiService.testConnection();
      return isConnected;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }, []);

  const personMatch = useCallback(async (personId: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apolloApiService.personMatch(personId);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
      }));
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to match person';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false, 
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    searchPeople,
    searchOrganizations,
    enrichPerson,
    enrichOrganization,
    bulkEnrichOrganizations,
    clearData,
    clearError,
    setApiKey,
    testConnection,
    personMatch
  };
};

export default useApollo;