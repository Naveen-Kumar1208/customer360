import type { 
  ApolloPersonData, 
  ApolloOrganizationData, 
  ApolloPersonSearchData, 
  ApolloOrganizationSearchData,
  ApolloSearchFilters,
  ApolloSearchResponse,
  ApolloEnrichmentResponse,
  ApolloApiError
} from '@/types/apollo';
import { APOLLO_CONFIG } from '@/lib/config/apollo';

export class ApolloApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || APOLLO_CONFIG.API_KEY;
    this.baseUrl = APOLLO_CONFIG.API_BASE_URL;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'POST', body?: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Api-Key': this.apiKey, // Apollo.io requires API key in header
    };

    const config: RequestInit = {
      method: 'POST', // Apollo.io uses POST for all endpoints
      headers,
    };

    // Send request body without API key (it's in header now)
    if (body) {
      config.body = JSON.stringify(body);
    } else {
      config.body = JSON.stringify({});
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || 'Unknown error' };
        }
        throw new Error(`Apollo API Error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      
      // Check for API-level errors
      if (data.error) {
        throw new Error(`Apollo API Error: ${data.error}`);
      }

      return data;
    } catch (error) {
      console.error('Apollo API request failed:', error);
      throw error;
    }
  }

  // Search for people/contacts
  async searchPeople(searchData: ApolloPersonSearchData, filters?: ApolloSearchFilters): Promise<ApolloPersonData[]> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.MIXED_PEOPLE_SEARCH;
    
    const requestBody: any = {
      page: filters?.page || 1,
      per_page: filters?.per_page || APOLLO_CONFIG.DEFAULT_LIMITS.PEOPLE_SEARCH,
    };

    // Add person-specific filters
    if (searchData.email) requestBody.email = searchData.email;
    if (searchData.title) requestBody.person_titles = [searchData.title];
    if (searchData.domain) requestBody.q_organization_domains_list = [searchData.domain];
    if (searchData.location) requestBody.person_locations = [searchData.location];
    if (searchData.industry) requestBody.organization_industries = [searchData.industry];
    if (searchData.keywords) requestBody.q_keywords = searchData.keywords;
    if (searchData.seniority) requestBody.person_seniorities = [searchData.seniority];

    // Add additional filters
    if (filters) {
      if (filters.person_titles?.length) requestBody.person_titles = filters.person_titles;
      if (filters.person_locations?.length) requestBody.person_locations = filters.person_locations;
      if (filters.person_seniorities?.length) requestBody.person_seniorities = filters.person_seniorities;
      if (filters.organization_locations?.length) requestBody.organization_locations = filters.organization_locations;
      if (filters.organization_ids?.length) requestBody.organization_ids = filters.organization_ids;
      if (filters.organization_num_employees_ranges?.length) requestBody.organization_num_employees_ranges = filters.organization_num_employees_ranges;
      if (filters.organization_industries?.length) requestBody.organization_industries = filters.organization_industries;
      if (filters.organization_keywords?.length) requestBody.organization_keywords = filters.organization_keywords;
      if (filters.q_keywords) requestBody.q_keywords = filters.q_keywords;
    }

    const response: any = await this.makeRequest(endpoint, 'POST', requestBody);
    
    return this.transformPersonResponse(response);
  }

  // Search for organizations/companies
  async searchOrganizations(searchData: ApolloOrganizationSearchData, filters?: ApolloSearchFilters): Promise<ApolloOrganizationData[]> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.ORGANIZATIONS_SEARCH;
    
    const requestBody: any = {
      page: filters?.page || 1,
      per_page: filters?.per_page || APOLLO_CONFIG.DEFAULT_LIMITS.ORGANIZATIONS_SEARCH,
    };

    // Add organization-specific filters
    if (searchData.name) requestBody.organization_names = [searchData.name];
    if (searchData.domain) requestBody.organization_domains = [searchData.domain];
    if (searchData.industry?.length) requestBody.organization_industries = searchData.industry;
    if (searchData.location?.length) requestBody.organization_locations = searchData.location;
    if (searchData.keywords?.length) requestBody.organization_keywords = searchData.keywords;

    // Employee count range
    if (searchData.employeeCount) {
      const ranges = [];
      if (searchData.employeeCount.min !== undefined && searchData.employeeCount.max !== undefined) {
        ranges.push(`${searchData.employeeCount.min},${searchData.employeeCount.max}`);
      }
      if (ranges.length) requestBody.organization_num_employees_ranges = ranges;
    }

    // Add additional filters
    if (filters) {
      if (filters.organization_locations?.length) requestBody.organization_locations = filters.organization_locations;
      if (filters.organization_ids?.length) requestBody.organization_ids = filters.organization_ids;
      if (filters.organization_num_employees_ranges?.length) requestBody.organization_num_employees_ranges = filters.organization_num_employees_ranges;
      if (filters.organization_industries?.length) requestBody.organization_industries = filters.organization_industries;
      if (filters.organization_keywords?.length) requestBody.organization_keywords = filters.organization_keywords;
    }

    const response: ApolloSearchResponse = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformOrganizationResponse(response);
  }

  async personMatch(personId: string): Promise<any> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.PEOPLE_MATCH;
    const requestBody = {
      id: personId,
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return response;
  }

  // Enrich person data - using mixed_people search for enrichment
  async enrichPerson(searchData: ApolloPersonSearchData): Promise<ApolloPersonData | null> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.MIXED_PEOPLE_SEARCH;
    
    const requestBody: any = {};

    // Build request based on available data
    if (searchData.email) {
      requestBody.email = searchData.email;
    }
    if (searchData.firstName && searchData.lastName && searchData.company) {
      requestBody.first_name = searchData.firstName;
      requestBody.last_name = searchData.lastName;
      requestBody.organization_name = searchData.company;
    }
    if (searchData.linkedinUrl) {
      requestBody.linkedin_url = searchData.linkedinUrl;
    }

    if (Object.keys(requestBody).length === 0) {
      throw new Error('Please provide either an email, LinkedIn URL, or first name + last name + company name for person enrichment');
    }

    const response: ApolloEnrichmentResponse = await this.makeRequest(endpoint, 'POST', requestBody);
    
    const people = this.transformPersonResponse(response);
    return people.length > 0 ? people[0] : null;
  }

  // Enrich organization data
  async enrichOrganization(searchData: ApolloOrganizationSearchData): Promise<ApolloOrganizationData | null> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.ORGANIZATIONS_ENRICH;
    
    const requestBody: any = {};

    if (searchData.domain) {
      requestBody.domain = searchData.domain;
    } else if (searchData.name) {
      requestBody.organization_name = searchData.name;
    } else {
      throw new Error('Please provide either a domain or organization name for enrichment');
    }

    const response: any = await this.makeRequest(endpoint, 'POST', requestBody);
    
    // Organizations enrich returns a single organization object in 'organization' field
    if (response.organization) {
      return this.transformSingleOrganizationResponse(response.organization);
    }
    
    return null;
  }

  // Bulk enrich organizations
  async bulkEnrichOrganizations(organizationIds: string[]): Promise<ApolloOrganizationData[]> {
    const endpoint = APOLLO_CONFIG.ENDPOINTS.ORGANIZATIONS_BULK_ENRICH;
    
    const requestBody = {
      organization_ids: organizationIds
    };

    try {
      const response = await this.makeRequest(endpoint, 'POST', requestBody);
      return this.transformOrganizationResponse(response);
    } catch (error) {
      console.error('Bulk organization enrichment failed:', error);
      throw error;
    }
  }

  // Get API usage statistics
  async getUsageStats(): Promise<any> {
    try {
      const endpoint = APOLLO_CONFIG.ENDPOINTS.USAGE;
      return await this.makeRequest(endpoint, 'POST', {});
    } catch (error) {
      console.error('Failed to get usage stats:', error);
      return null;
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.getUsageStats();
      return true;
    } catch (error) {
      console.error('Apollo API connection test failed:', error);
      return false;
    }
  }

  // Update API key
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  // Transform search response to person data
  private transformPersonResponse(response: any): ApolloPersonData[] {
    // Apollo.io mixed_people/search returns data in 'people' array primarily, with 'contacts' as backup
    const people = response.people || response.contacts || [];
    
    if (!Array.isArray(people)) {
      return [];
    }
    
    if (people.length === 0) {
      return [];
    }
    
    return people.map((person: any) => this.transformSinglePersonResponse(person));
  }

  // Transform single person response
  private transformSinglePersonResponse(person: any): ApolloPersonData {
    return {
      id: person.id || `apollo_person_${Date.now()}`,
      firstName: person.first_name || '',
      lastName: person.last_name || '',
      name: person.name || `${person.first_name || ''} ${person.last_name || ''}`.trim(),
      title: person.title || '',
      email: person.email || null,
      linkedinUrl: person.linkedin_url || null,
      twitterUrl: person.twitter_url || null,
      githubUrl: person.github_url || null,
      facebookUrl: person.facebook_url || null,
      phoneNumbers: person.phone_numbers || [],
      employment_history: person.employment_history || [],
      organization: person.organization ? this.transformSingleOrganizationResponse(person.organization) : null,
      confidence: person.confidence || 0,
      city: person.city || '',
      state: person.state || '',
      country: person.country || '',
      headline: person.headline || '',
      seniority: person.seniority || '',
      departments: person.departments || [],
      subdepartments: person.subdepartments || [],
      functions: person.functions || [],
      photo_url: person.photo_url || null,
      source: 'apollo' as const,
      enrichedAt: new Date()
    };
  }

  // Transform organization response
  private transformOrganizationResponse(response: any): ApolloOrganizationData[] {
    // Apollo.io organizations/search returns data in 'organizations' array
    const organizations = response.organizations || response.accounts || [];
    
    if (!Array.isArray(organizations)) {
      return [];
    }
    
    return organizations.map((org: any) => this.transformSingleOrganizationResponse(org));
  }

  // Transform single organization response
  private transformSingleOrganizationResponse(org: any): ApolloOrganizationData {
    return {
      id: org.id || `apollo_org_${Date.now()}`,
      name: org.name || '',
      website_url: org.website_url || '',
      blog_url: org.blog_url || null,
      angellist_url: org.angellist_url || null,
      linkedin_url: org.linkedin_url || null,
      twitter_url: org.twitter_url || null,
      facebook_url: org.facebook_url || null,
      primary_phone: org.primary_phone || null,
      languages: org.languages || [],
      alexa_ranking: org.alexa_ranking || null,
      phone: org.phone || null,
      linkedin_uid: org.linkedin_uid || null,
      founded_year: org.founded_year || null,
      publicly_traded_symbol: org.publicly_traded_symbol || null,
      publicly_traded_exchange: org.publicly_traded_exchange || null,
      logo_url: org.logo_url || null,
      crunchbase_url: org.crunchbase_url || null,
      primary_domain: org.primary_domain || '',
      sanitized_phone: org.sanitized_phone || null,
      industry: org.industry || '',
      keywords: org.keywords || [],
      estimated_num_employees: org.estimated_num_employees || 0,
      industries: org.industries || [],
      secondary_industries: org.secondary_industries || [],
      snippets_loaded: org.snippets_loaded || false,
      industry_tag_id: org.industry_tag_id || 0,
      industry_tag_hash: org.industry_tag_hash || {},
      retail_location_count: org.retail_location_count || 0,
      raw_address: org.raw_address || '',
      street_address: org.street_address || '',
      city: org.city || '',
      state: org.state || '',
      postal_code: org.postal_code || '',
      country: org.country || '',
      owned_by_organization_id: org.owned_by_organization_id || null,
      suborganizations: org.suborganizations || [],
      num_suborganizations: org.num_suborganizations || 0,
      seo_description: org.seo_description || '',
      short_description: org.short_description || '',
      annual_revenue_printed: org.annual_revenue_printed || '',
      annual_revenue_in_thousands_int: org.annual_revenue_in_thousands_int || null,
      technology_names: org.technology_names || [],
      current_technologies: org.current_technologies || [],
      account_id: org.account_id || null,
      account: org.account || null,
      departmental_head_count: org.departmental_head_count || {},
      // Enrichment-specific fields
      total_funding: org.total_funding || undefined,
      total_funding_printed: org.total_funding_printed || undefined,
      latest_funding_round_date: org.latest_funding_round_date || undefined,
      latest_funding_stage: org.latest_funding_stage || undefined,
      funding_events: org.funding_events || undefined,
      org_chart_root_people_ids: org.org_chart_root_people_ids || undefined,
      org_chart_sector: org.org_chart_sector || undefined,
      generic_org_insights: org.generic_org_insights || undefined,
      source: 'apollo' as const,
      confidence: org.confidence || 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

// Create a singleton instance
export const apolloApiService = new ApolloApiService();

// Export default service
export default apolloApiService;