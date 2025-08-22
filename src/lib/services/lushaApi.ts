import type { PersonData, CompanyData, ProspectData, PersonSearchData, CompanySearchData, ProspectingFilters } from '@/types/lusha';
import { LUSHA_CONFIG } from '@/lib/config/lusha';

export class LushaApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || LUSHA_CONFIG.API_KEY;
    this.baseUrl = LUSHA_CONFIG.API_BASE_URL;
  }

  private async makeRequest(endpoint: string, method: 'GET' | 'POST' = 'POST', body?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && method === 'POST') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Lusha API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lusha API request failed:', error);
      throw error;
    }
  }

  // Person API - Enrich person data
  async enrichPerson(searchData: PersonSearchData): Promise<PersonData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PERSON;
    
    const requestBody: any = {
      contacts: []
    };

    // Build the request based on available search criteria
    if (searchData.email) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        email: searchData.email
      });
    } else if (searchData.linkedinUrl) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        linkedinUrl: searchData.linkedinUrl
      });
    } else if (searchData.name && searchData.domain) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        fullName: searchData.name,
        companies: [{
          domain: searchData.domain,
          isCurrent: true
        }]
      });
    } else if (searchData.name && searchData.company) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        fullName: searchData.name,
        companies: [{
          name: searchData.company,
          isCurrent: true
        }]
      });
    } else if (searchData.firstName && searchData.lastName && searchData.domain) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        fullName: `${searchData.firstName} ${searchData.lastName}`,
        companies: [{
          domain: searchData.domain,
          isCurrent: true
        }]
      });
    } else if (searchData.firstName && searchData.lastName && searchData.company) {
      requestBody.contacts.push({
        contactId: `search_${Date.now()}`,
        fullName: `${searchData.firstName} ${searchData.lastName}`,
        companies: [{
          name: searchData.company,
          isCurrent: true
        }]
      });
    }

    // Validate that we have at least one contact
    if (requestBody.contacts.length === 0) {
      throw new Error('Invalid search criteria. Please provide: 1) Email, 2) LinkedIn URL, or 3) Full name + company name/domain');
    }

    // Add metadata for filtering if needed
    requestBody.metadata = {
      refreshJobInfo: true
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    
    // Transform the response to match our PersonData interface
    return this.transformPersonResponse(response);
  }

  // Bulk Person Enrichment
  async bulkEnrichPersons(searchDataArray: PersonSearchData[]): Promise<PersonData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PERSON;
    
    const requestBody = {
      contacts: searchDataArray.map((searchData, index) => {
        if (searchData.email) {
          return { 
            contactId: `bulk_search_${Date.now()}_${index}`,
            email: searchData.email 
          };
        } else if (searchData.linkedinUrl) {
          return { 
            contactId: `bulk_search_${Date.now()}_${index}`,
            linkedinUrl: searchData.linkedinUrl 
          };
        } else if (searchData.name && searchData.domain) {
          return {
            contactId: `bulk_search_${Date.now()}_${index}`,
            fullName: searchData.name,
            companies: [{
              domain: searchData.domain,
              isCurrent: true
            }]
          };
        } else if (searchData.firstName && searchData.lastName && searchData.domain) {
          return {
            contactId: `bulk_search_${Date.now()}_${index}`,
            fullName: `${searchData.firstName} ${searchData.lastName}`,
            companies: [{
              domain: searchData.domain,
              isCurrent: true
            }]
          };
        } else if (searchData.firstName && searchData.lastName && searchData.company) {
          return {
            contactId: `bulk_search_${Date.now()}_${index}`,
            fullName: `${searchData.firstName} ${searchData.lastName}`,
            companies: [{
              name: searchData.company,
              isCurrent: true
            }]
          };
        }
        return {};
      }).filter(item => Object.keys(item).length > 0),
      metadata: {
        refreshJobInfo: true
      }
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformPersonResponse(response);
  }

  // Company API - Search for company data
  async searchCompany(searchData: CompanySearchData): Promise<CompanyData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.COMPANY;
    
    const requestBody: any = {
      companies: []
    };

    if (searchData.domain) {
      requestBody.companies.push({
        id: `search_${Date.now()}`,
        domain: searchData.domain
      });
    } else if (searchData.name) {
      requestBody.companies.push({
        id: `search_${Date.now()}`,
        companyName: searchData.name
      });
    }

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformCompanyResponse(response);
  }

  // Prospecting Contact Search - Search for contacts based on filters
  async prospectingContactSearch(filters: ProspectingFilters): Promise<PersonData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PROSPECTING_CONTACT_SEARCH;
    
    const requestBody = {
      filters: {
        ...(filters.industries && filters.industries.length > 0 && { industries: filters.industries }),
        ...(filters.locations && filters.locations.length > 0 && { locations: filters.locations }),
        ...(filters.companySizes && filters.companySizes.length > 0 && { companySizes: filters.companySizes }),
        ...(filters.revenues && filters.revenues.length > 0 && { revenues: filters.revenues }),
        ...(filters.jobTitles && filters.jobTitles.length > 0 && { jobTitles: filters.jobTitles }),
        ...(filters.seniorities && filters.seniorities.length > 0 && { seniorities: filters.seniorities }),
        ...(filters.departments && filters.departments.length > 0 && { departments: filters.departments }),
        ...(filters.technologies && filters.technologies.length > 0 && { technologies: filters.technologies }),
        ...(filters.keywords && filters.keywords.length > 0 && { keywords: filters.keywords }),
        ...(filters.excludeCompanies && filters.excludeCompanies.length > 0 && { excludeCompanies: filters.excludeCompanies }),
        ...(filters.excludeIndustries && filters.excludeIndustries.length > 0 && { excludeIndustries: filters.excludeIndustries })
      },
      limit: filters.limit || LUSHA_CONFIG.DEFAULT_LIMITS.PROSPECT_SEARCH,
      offset: filters.offset || 0
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformPersonResponse(response);
  }

  // Prospecting Company Search - Search for companies based on filters
  async prospectingCompanySearch(filters: ProspectingFilters): Promise<CompanyData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PROSPECTING_COMPANY_SEARCH;
    
    const requestBody = {
      filters: {
        ...(filters.industries && filters.industries.length > 0 && { industries: filters.industries }),
        ...(filters.locations && filters.locations.length > 0 && { locations: filters.locations }),
        ...(filters.companySizes && filters.companySizes.length > 0 && { companySizes: filters.companySizes }),
        ...(filters.revenues && filters.revenues.length > 0 && { revenues: filters.revenues }),
        ...(filters.technologies && filters.technologies.length > 0 && { technologies: filters.technologies }),
        ...(filters.keywords && filters.keywords.length > 0 && { keywords: filters.keywords }),
        ...(filters.excludeCompanies && filters.excludeCompanies.length > 0 && { excludeCompanies: filters.excludeCompanies }),
        ...(filters.excludeIndustries && filters.excludeIndustries.length > 0 && { excludeIndustries: filters.excludeIndustries })
      },
      limit: filters.limit || LUSHA_CONFIG.DEFAULT_LIMITS.PROSPECT_SEARCH,
      offset: filters.offset || 0
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformCompanyResponse(response);
  }

  // Prospecting Contact Enrich - Enrich contact data with additional information
  async prospectingContactEnrich(contactIds: string[]): Promise<PersonData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PROSPECTING_CONTACT_ENRICH;
    
    const requestBody = {
      contactIds: contactIds,
      metadata: {
        refreshJobInfo: true,
        includePersonalData: true,
        includeCompanyData: true
      }
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformPersonResponse(response);
  }

  // Prospecting Company Enrich - Enrich company data with additional information
  async prospectingCompanyEnrich(companyIds: string[]): Promise<CompanyData[]> {
    const endpoint = LUSHA_CONFIG.ENDPOINTS.PROSPECTING_COMPANY_ENRICH;
    
    const requestBody = {
      companyIds: companyIds,
      metadata: {
        includeFinancialData: true,
        includeTechnologyStack: true,
        includeContactList: false
      }
    };

    const response = await this.makeRequest(endpoint, 'POST', requestBody);
    return this.transformCompanyResponse(response);
  }

  // Legacy method - now uses prospecting contact search
  async searchProspects(filters: ProspectingFilters): Promise<ProspectData[]> {
    const contacts = await this.prospectingContactSearch(filters);
    const companies = await this.prospectingCompanySearch(filters);
    
    // Transform to ProspectData format by combining contact and company data
    return contacts.map((contact, index) => {
      const matchingCompany = companies.find(company => 
        company.name.toLowerCase() === contact.company.toLowerCase() ||
        company.domain.toLowerCase().includes(contact.company.toLowerCase())
      ) || companies[index % companies.length];

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
  }

  // Transform Lusha Person API response to our PersonData interface
  private transformPersonResponse(response: any): PersonData[] {
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((person: any, index: number) => ({
      id: `lusha_person_${Date.now()}_${index}`,
      firstName: person.firstName || '',
      lastName: person.lastName || '',
      email: person.email ? [person.email] : [],
      phone: person.phoneNumbers || [],
      company: person.companyName || '',
      title: person.jobTitle || '',
      linkedinUrl: person.linkedinUrl,
      confidence: person.confidence || 0,
      lastUpdated: new Date().toISOString(),
      department: person.department,
      seniority: person.seniority,
      workEmail: person.businessEmail,
      personalEmail: person.personalEmail,
      directPhone: person.directPhone,
      mobilePhone: person.mobilePhone,
      verified: person.verified || false,
      source: 'lusha' as const,
      enrichedAt: new Date()
    }));
  }

  // Transform Lusha Company API response to our CompanyData interface
  private transformCompanyResponse(response: any): CompanyData[] {
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((company: any, index: number) => ({
      id: `lusha_company_${Date.now()}_${index}`,
      name: company.name || '',
      domain: company.domain || '',
      industry: company.industry || '',
      size: company.employeeRange || '',
      revenue: company.revenueRange || '',
      location: {
        city: company.city || '',
        state: company.state,
        country: company.country || '',
        address: company.address
      },
      founded: company.foundedYear || 0,
      employees: company.employeeCount || 0,
      employeeGrowth: company.employeeGrowth,
      technologies: company.technologies || [],
      socialProfiles: {
        linkedin: company.linkedinUrl,
        twitter: company.twitterUrl,
        facebook: company.facebookUrl
      },
      description: company.description,
      logo: company.logoUrl,
      website: company.website,
      phone: company.phone,
      email: company.email,
      type: company.companyType,
      businessModel: company.businessModel,
      verified: company.verified || false,
      confidence: company.confidence || 0,
      lastUpdated: new Date().toISOString()
    }));
  }

  // Transform Lusha Prospect API response to our ProspectData interface
  private transformProspectResponse(response: any): ProspectData[] {
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((prospect: any, index: number) => {
      const personData: PersonData = {
        id: `lusha_prospect_person_${Date.now()}_${index}`,
        firstName: prospect.person?.firstName || '',
        lastName: prospect.person?.lastName || '',
        email: prospect.person?.email ? [prospect.person.email] : [],
        phone: prospect.person?.phoneNumbers || [],
        company: prospect.company?.name || '',
        title: prospect.person?.jobTitle || '',
        linkedinUrl: prospect.person?.linkedinUrl,
        confidence: prospect.person?.confidence || 0,
        lastUpdated: new Date().toISOString(),
        department: prospect.person?.department,
        seniority: prospect.person?.seniority,
        workEmail: prospect.person?.businessEmail,
        personalEmail: prospect.person?.personalEmail,
        directPhone: prospect.person?.directPhone,
        mobilePhone: prospect.person?.mobilePhone,
        verified: prospect.person?.verified || false,
        source: 'lusha' as const,
        enrichedAt: new Date()
      };

      const companyData: CompanyData = {
        id: `lusha_prospect_company_${Date.now()}_${index}`,
        name: prospect.company?.name || '',
        domain: prospect.company?.domain || '',
        industry: prospect.company?.industry || '',
        size: prospect.company?.employeeRange || '',
        revenue: prospect.company?.revenueRange || '',
        location: {
          city: prospect.company?.city || '',
          state: prospect.company?.state,
          country: prospect.company?.country || '',
          address: prospect.company?.address
        },
        founded: prospect.company?.foundedYear || 0,
        employees: prospect.company?.employeeCount || 0,
        employeeGrowth: prospect.company?.employeeGrowth,
        technologies: prospect.company?.technologies || [],
        socialProfiles: {
          linkedin: prospect.company?.linkedinUrl,
          twitter: prospect.company?.twitterUrl,
          facebook: prospect.company?.facebookUrl
        },
        description: prospect.company?.description,
        logo: prospect.company?.logoUrl,
        website: prospect.company?.website,
        phone: prospect.company?.phone,
        email: prospect.company?.email,
        type: prospect.company?.companyType,
        businessModel: prospect.company?.businessModel,
        verified: prospect.company?.verified || false,
        confidence: prospect.company?.confidence || 0,
        lastUpdated: new Date().toISOString()
      };

      return {
        id: `lusha_prospect_${Date.now()}_${index}`,
        person: personData,
        company: companyData,
        score: prospect.score || 0,
        criteria: {
          titleMatch: prospect.criteria?.titleMatch || false,
          industryMatch: prospect.criteria?.industryMatch || false,
          locationMatch: prospect.criteria?.locationMatch || false,
          seniorityMatch: prospect.criteria?.seniorityMatch || false,
          companySizeMatch: prospect.criteria?.companySizeMatch || false
        },
        enrichmentDate: new Date().toISOString(),
        tags: prospect.tags || [],
        notes: prospect.notes,
        status: 'new' as const
      };
    });
  }

  // Helper method to test API connection
  async testConnection(): Promise<boolean> {
    try {
      const testData: PersonSearchData = {
        email: 'test@example.com'
      };
      await this.enrichPerson(testData);
      return true;
    } catch (error) {
      console.error('Lusha API connection test failed:', error);
      return false;
    }
  }

  // Get API usage statistics (if available)
  async getUsageStats(): Promise<any> {
    try {
      const endpoint = LUSHA_CONFIG.ENDPOINTS.USAGE;
      return await this.makeRequest(endpoint, 'GET');
    } catch (error) {
      console.error('Failed to get usage stats:', error);
      return null;
    }
  }
}

// Create a singleton instance
export const lushaApiService = new LushaApiService();

// Export default service
export default lushaApiService;