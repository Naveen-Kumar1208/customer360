import { useState, useCallback } from 'react';
import type { PersonData, CompanyData, ProspectData, ProspectingFilters } from '@/types/lusha';
import { lushaApiService } from '@/lib/services/lushaApi';

interface UseLushaProspectingState {
  contactResults: PersonData[];
  companyResults: CompanyData[];
  combinedResults: ProspectData[];
  loading: boolean;
  error: string | null;
}

export const useLushaProspecting = () => {
  const [state, setState] = useState<UseLushaProspectingState>({
    contactResults: [],
    companyResults: [],
    combinedResults: [],
    loading: false,
    error: null
  });

  // Search for contacts using prospecting filters
  const searchContacts = useCallback(async (filters: ProspectingFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.prospectingContactSearch(filters);
      setState(prev => ({ 
        ...prev, 
        contactResults: results, 
        loading: false 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search contacts';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  // Search for companies using prospecting filters
  const searchCompanies = useCallback(async (filters: ProspectingFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.prospectingCompanySearch(filters);
      setState(prev => ({ 
        ...prev, 
        companyResults: results, 
        loading: false 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search companies';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  // Combined search (legacy method for backward compatibility)
  const searchProspects = useCallback(async (filters: ProspectingFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.searchProspects(filters);
      setState(prev => ({ 
        ...prev, 
        combinedResults: results, 
        loading: false 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search prospects';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  // Enhanced search that gets both contacts and companies
  const searchAll = useCallback(async (filters: ProspectingFilters) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Search both contacts and companies in parallel
      const [contacts, companies] = await Promise.all([
        lushaApiService.prospectingContactSearch(filters),
        lushaApiService.prospectingCompanySearch(filters)
      ]);

      // Combine results into ProspectData format
      const combinedResults: ProspectData[] = contacts.map((contact, index) => {
        const matchingCompany = companies.find(company => 
          company.name.toLowerCase() === contact.company.toLowerCase() ||
          company.domain.toLowerCase().includes(contact.company.toLowerCase())
        ) || companies[index % companies.length] || {
          id: `default_company_${index}`,
          name: contact.company || 'Unknown Company',
          domain: '',
          industry: '',
          size: '',
          revenue: '',
          location: { city: '', country: '' },
          founded: 0,
          employees: 0,
          technologies: [],
          socialProfiles: {},
          verified: false,
          confidence: 0,
          lastUpdated: new Date().toISOString()
        };

        return {
          id: `prospect_${Date.now()}_${index}`,
          person: contact,
          company: matchingCompany,
          score: Math.floor(Math.random() * 100), // Placeholder scoring
          criteria: {
            titleMatch: filters.jobTitles?.some(title => 
              contact.title.toLowerCase().includes(title.toLowerCase())) || false,
            industryMatch: filters.industries?.some(industry => 
              matchingCompany.industry.toLowerCase().includes(industry.toLowerCase())) || false,
            locationMatch: filters.locations?.some(location => 
              matchingCompany.location.city.toLowerCase().includes(location.toLowerCase()) ||
              matchingCompany.location.country.toLowerCase().includes(location.toLowerCase())) || false,
            seniorityMatch: filters.seniorities?.some(seniority => 
              contact.seniority?.toLowerCase().includes(seniority.toLowerCase())) || false,
            companySizeMatch: filters.companySizes?.some(size => 
              matchingCompany.size === size) || false
          },
          enrichmentDate: new Date().toISOString(),
          tags: [],
          notes: '',
          status: 'new' as const
        };
      });

      setState(prev => ({ 
        ...prev, 
        contactResults: contacts,
        companyResults: companies,
        combinedResults: combinedResults,
        loading: false 
      }));
      
      return { contacts, companies, prospects: combinedResults };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search prospects';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  // Enrich contacts with additional data
  const enrichContacts = useCallback(async (contactIds: string[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.prospectingContactEnrich(contactIds);
      setState(prev => ({ 
        ...prev, 
        contactResults: results, 
        loading: false 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enrich contacts';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  // Enrich companies with additional data
  const enrichCompanies = useCallback(async (companyIds: string[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const results = await lushaApiService.prospectingCompanyEnrich(companyIds);
      setState(prev => ({ 
        ...prev, 
        companyResults: results, 
        loading: false 
      }));
      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to enrich companies';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        loading: false 
      }));
      throw error;
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      contactResults: [],
      companyResults: [],
      combinedResults: [],
      loading: false,
      error: null
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    searchContacts,
    searchCompanies,
    searchProspects,
    searchAll,
    enrichContacts,
    enrichCompanies,
    clearResults,
    clearError
  };
};

export default useLushaProspecting;