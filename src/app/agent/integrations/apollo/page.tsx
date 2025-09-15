"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Target,
  Users,
  Building2,
  Mail,
  Phone,
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  Eye,
  Plus,
  Search,
  Download,
  Zap,
  BarChart3,
  AlertTriangle,
  Globe,
  Activity,
  Key,
  Filter,
  Loader2,
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  ArrowLeft,
  X
} from "lucide-react";

import { useApollo } from "@/hooks/useApollo";
import type { ApolloPersonSearchData, ApolloOrganizationSearchData, ApolloOrganizationData, ApolloPersonData } from "@/types/apollo";
import { APOLLO_CONFIG } from "@/lib/config/apollo";

// Function to convert Apollo data to Stakeholder format
const convertApolloPersonToStakeholder = (person: ApolloPersonData) => {
  
  return {
    id: `apollo_${person.id}`,
    name: person.name,
    role: person.title || 'Unknown Role',
    company: person.organization?.name || 'Unknown Company',
    department: person.departments?.[0] || 'Unknown',
    influence: person.seniority === 'c_suite' ? 'high' as const : 
               person.seniority === 'vp' || person.seniority === 'director' ? 'medium' as const : 'low' as const,
    relationship: 'neutral' as const,
    email: person.email || '',
    phone: person.phoneNumbers?.[0] || person.organization?.primary_phone?.number || '',
    lastContact: new Date(),
    connections: [],
    // Additional Apollo.io specific fields
    apolloData: {
      headline: person.headline,
      linkedinUrl: person.linkedinUrl,
      twitterUrl: person.twitterUrl,
      githubUrl: person.githubUrl,
      city: person.city,
      state: person.state,
      country: person.country,
      seniority: person.seniority,
      functions: person.functions,
      photoUrl: person.photo_url,
      confidence: person.confidence
    }
  };
};

const convertApolloOrgToCompany = (org: ApolloOrganizationData) => {
  // Determine company size based on employee count
  const getCompanySize = (empCount?: number) => {
    if (!empCount) return '';
    if (empCount <= 10) return 'Startup (1-10)';
    if (empCount <= 50) return 'Small (11-50)';
    if (empCount <= 200) return 'Medium (51-200)';
    if (empCount <= 1000) return 'Large (201-1000)';
    return 'Enterprise (1000+)';
  };

  // Determine timezone based on location
  const getTimezone = (city?: string, state?: string, country?: string) => {
    const location = `${city || ''} ${state || ''} ${country || ''}`.toLowerCase().trim();
    
    if (location.includes('california') || location.includes('san francisco') || location.includes('los angeles')) {
      return 'America/Los_Angeles';
    } else if (location.includes('new york') || location.includes('boston') || location.includes('washington')) {
      return 'America/New_York';
    } else if (location.includes('chicago') || location.includes('illinois')) {
      return 'America/Chicago';
    } else if (location.includes('denver') || location.includes('colorado')) {
      return 'America/Denver';
    } else if (location.includes('london') || location.includes('uk') || location.includes('united kingdom')) {
      return 'Europe/London';
    } else if (location.includes('berlin') || location.includes('germany')) {
      return 'Europe/Berlin';
    } else if (location.includes('tokyo') || location.includes('japan')) {
      return 'Asia/Tokyo';
    } else if (location.includes('shanghai') || location.includes('beijing') || location.includes('china')) {
      return 'Asia/Shanghai';
    } else if (location.includes('sydney') || location.includes('australia')) {
      return 'Australia/Sydney';
    }
    return 'America/New_York'; // Default
  };

  // Extract domain from website URL
  const extractDomain = (url?: string) => {
    if (!url) return '';
    return url.replace('https://', '').replace('http://', '').split('/')[0];
  };

  // Convert annual revenue to number
  const parseRevenue = (revenueStr?: string) => {
    if (!revenueStr) return undefined;
    
    // Extract numbers and handle different formats like "$50M - $100M"
    const match = revenueStr.match(/\$?(\d+(?:\.\d+)?)[MBK]?/i);
    if (match) {
      let value = parseFloat(match[1]);
      if (revenueStr.includes('M')) value *= 1000000;
      else if (revenueStr.includes('B')) value *= 1000000000;
      else if (revenueStr.includes('K')) value *= 1000;
      return Math.round(value);
    }
    return undefined;
  };

  return {
    // Primary company identification
    company_id: `apollo_${org.id}`,
    company_name: org.name,
    
    // Basic company info
    industry: org.industry || '',
    company_size: getCompanySize(org.estimated_num_employees),
    emp_nos: org.estimated_num_employees || 0,
    
    // Financial information
    annual_revenue: parseRevenue(org.annual_revenue_printed) || (org.annual_revenue_in_thousands_int ? org.annual_revenue_in_thousands_int * 1000 : undefined),
    annual_revenue_printed: org.annual_revenue_printed || '',
    
    // Contact information
    website: org.website_url || '',
    phone: org.primary_phone?.number || org.phone || '',
    email: `contact@${extractDomain(org.website_url) || org.primary_domain || 'company.com'}`,
    
    // Address information
    address: org.raw_address || org.street_address || '',
    street_address: org.street_address || '',
    city: org.city || '',
    state_name: org.state || '',
    postal_code: org.postal_code || '',
    country: org.country || '',
    timezone: getTimezone(org.city, org.state, org.country),
    
    // Company details
    founded_year: org.founded_year,
    logo_url: org.logo_url,
    description: org.short_description || org.seo_description || '',
    short_description: org.short_description || '',
    seo_description: org.seo_description || '',
    
    // Social media and external links
    linkedin_url: org.linkedin_url,
    twitter_url: org.twitter_url,
    facebook_url: org.facebook_url,
    blog_url: org.blog_url,
    crunchbase_url: org.crunchbase_url,
    angellist_url: org.angellist_url,
    
    // Business information
    publicly_traded_symbol: org.publicly_traded_symbol,
    publicly_traded_exchange: org.publicly_traded_exchange,
    
    // Funding information (if available)
    total_funding: org.total_funding,
    total_funding_printed: org.total_funding_printed,
    latest_funding_stage: org.latest_funding_stage,
    latest_funding_round_date: org.latest_funding_round_date,
    
    // Technology and keywords
    technology_names: org.technology_names || [],
    keywords: org.keywords || [],
    industries: org.industries || [],
    secondary_industries: org.secondary_industries || [],
    
    // Department breakdown
    departmental_head_count: org.departmental_head_count || {},
    
    // Other metrics
    alexa_ranking: org.alexa_ranking,
    retail_location_count: org.retail_location_count || 0,
    num_suborganizations: org.num_suborganizations || 0,
    
    // Metadata
    apollo_id: org.id,
    apollo_confidence: org.confidence || 0,
    source: 'apollo',
    created_at: new Date(),
    updated_at: new Date(),
    lastUpdated: new Date().toISOString(),
    
    // Legacy fields for backward compatibility
    id: `apollo_${org.id}`,
    name: org.name,
    employees: org.estimated_num_employees || 0,
    revenue: org.annual_revenue_printed || ''
  };
};

const apolloStats = {
  totalContacts: 1523,
  accuracy: 94,
  monthlyQueries: 847,
  creditsRemaining: 2341
};

// Demo data for TechCorp Industries example
const demoCompanyData: ApolloOrganizationData = {
  id: "demo_techcorp_001",
  name: "TechCorp Industries",
  website_url: "https://techcorp.com",
  blog_url: null,
  angellist_url: null,
  linkedin_url: "https://linkedin.com/company/techcorp-industries",
  twitter_url: null,
  facebook_url: null,
  primary_phone: { number: "+1-555-0123", source: "website" },
  languages: ["English"],
  alexa_ranking: 15000,
  phone: "+1-555-0123",
  linkedin_uid: null,
  founded_year: 2015,
  publicly_traded_symbol: null,
  publicly_traded_exchange: null,
  logo_url: "https://logo.clearbit.com/techcorp.com",
  crunchbase_url: null,
  primary_domain: "techcorp.com",
  sanitized_phone: "+15550123",
  industry: "Technology",
  keywords: ["software", "AI", "automation"],
  estimated_num_employees: 1200,
  industries: ["Technology", "Software"],
  secondary_industries: ["Artificial Intelligence"],
  snippets_loaded: true,
  industry_tag_id: 1,
  industry_tag_hash: {},
  retail_location_count: 0,
  raw_address: "123 Tech Street, San Francisco, CA 94105",
  street_address: "123 Tech Street",
  city: "San Francisco",
  state: "California",
  postal_code: "94105",
  country: "United States",
  owned_by_organization_id: null,
  suborganizations: [],
  num_suborganizations: 0,
  seo_description: "Leading technology company specializing in AI automation",
  short_description: "TechCorp Industries is a leading technology company that develops cutting-edge AI and automation solutions for enterprises worldwide.",
  annual_revenue_printed: "$50M - $100M",
  annual_revenue_in_thousands_int: 75000,
  technology_names: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
  current_technologies: [],
  account_id: null,
  account: null,
  departmental_head_count: {
    "engineering": 450,
    "sales": 180,
    "marketing": 90,
    "operations": 120,
    "finance": 60,
    "hr": 45,
    "legal": 15
  },
  source: 'apollo' as const,
  confidence: 95,
  lastUpdated: new Date().toISOString()
};

const demoStakeholders: ApolloPersonData[] = [
  {
    id: "demo_person_001",
    firstName: "Sarah",
    lastName: "Johnson",
    name: "Sarah Johnson",
    title: "Chief Executive Officer",
    email: "sarah.johnson@techcorp.com",
    linkedinUrl: "https://linkedin.com/in/sarah-johnson-ceo",
    twitterUrl: null,
    githubUrl: null,
    facebookUrl: null,
    phoneNumbers: [],
    employment_history: [],
    organization: demoCompanyData,
    confidence: 98,
    city: "San Francisco",
    state: "California",
    country: "United States",
    headline: "CEO at TechCorp Industries | AI & Automation Expert",
    seniority: "c_suite",
    departments: ["executive"],
    subdepartments: [],
    functions: ["leadership"],
    photo_url: "https://randomuser.me/api/portraits/women/1.jpg",
    source: 'apollo' as const,
    enrichedAt: new Date()
  },
  {
    id: "demo_person_002",
    firstName: "Robert",
    lastName: "Davis",
    name: "Robert Davis",
    title: "Chief Technology Officer",
    email: "robert.davis@techcorp.com",
    linkedinUrl: "https://linkedin.com/in/robert-davis-cto",
    twitterUrl: null,
    githubUrl: "https://github.com/rdavis-techcorp",
    facebookUrl: null,
    phoneNumbers: [],
    employment_history: [],
    organization: demoCompanyData,
    confidence: 96,
    city: "San Francisco",
    state: "California",
    country: "United States",
    headline: "CTO at TechCorp Industries | Leading AI Innovation",
    seniority: "c_suite",
    departments: ["engineering"],
    subdepartments: [],
    functions: ["technology"],
    photo_url: "https://randomuser.me/api/portraits/men/2.jpg",
    source: 'apollo' as const,
    enrichedAt: new Date()
  },
  {
    id: "demo_person_003",
    firstName: "Emily",
    lastName: "Chen",
    name: "Emily Chen",
    title: "VP of Sales",
    email: "emily.chen@techcorp.com",
    linkedinUrl: "https://linkedin.com/in/emily-chen-sales",
    twitterUrl: null,
    githubUrl: null,
    facebookUrl: null,
    phoneNumbers: [],
    employment_history: [],
    organization: demoCompanyData,
    confidence: 94,
    city: "New York",
    state: "New York",
    country: "United States",
    headline: "VP Sales at TechCorp Industries | Enterprise Solutions Expert",
    seniority: "vp",
    departments: ["sales"],
    subdepartments: [],
    functions: ["sales"],
    photo_url: "https://randomuser.me/api/portraits/women/3.jpg",
    source: 'apollo' as const,
    enrichedAt: new Date()
  }
];



export default function ApolloIntegration() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [searchType, setSearchType] = useState<'people' | 'organizations'>('people');
  const [addingToStakeholder, setAddingToStakeholder] = useState<string | null>(null);
  
  // Search form state
  const [personSearch, setPersonSearch] = useState<ApolloPersonSearchData>({});
  const [orgSearch, setOrgSearch] = useState<ApolloOrganizationSearchData>({});
  const [enrichmentEmail, setEnrichmentEmail] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  
  // Stakeholder mapping state
  const [selectedCompany, setSelectedCompany] = useState<ApolloOrganizationData | null>(null);
  const [companyStakeholders, setCompanyStakeholders] = useState<{[key: string]: ApolloPersonData[]}>({});
  
  // Demo data state
  const [showDemoData, setShowDemoData] = useState(false);
  const [demoPeopleData, setDemoPeopleData] = useState<ApolloPersonData[]>([]);
  const [refreshIndicators, setRefreshIndicators] = useState(0);

  // Apollo hook
  const apollo = useApollo();

  // Debug function to inspect localStorage data
  const debugStorageData = React.useCallback(() => {
    try {
      const stakeholders = JSON.parse(localStorage.getItem('stakeholder_data') || '[]');
      const companies = JSON.parse(localStorage.getItem('company_data') || '[]');
      console.log('=== DEBUG STORAGE DATA ===');
      console.log('Stakeholders in storage:', stakeholders.map((s: any) => ({ 
        id: s.id, 
        name: s.name, 
        email: s.email,
        hasApolloData: !!s.apolloData,
        source: s.id?.startsWith('apollo_') ? 'apollo' : 'manual'
      })));
      console.log('Companies in storage:', companies.map((c: any) => ({ 
        id: c.id, 
        company_id: c.company_id,
        name: c.name, 
        company_name: c.company_name,
        source: c.source || (c.id?.startsWith('apollo_') ? 'apollo' : 'manual')
      })));
      console.log('=== END DEBUG ===');
    } catch (error) {
      console.error('Debug error:', error);
    }
  }, []);

  // Call debug on mount and when refresh changes
  React.useEffect(() => {
    debugStorageData();
  }, [debugStorageData, refreshIndicators]);

  // Helper function to check if a person is already added to stakeholder mapping
  const isPersonAlreadyAdded = React.useCallback((person: ApolloPersonData): boolean => {
    try {
      const existingStakeholders = JSON.parse(localStorage.getItem('stakeholder_data') || '[]');
      
      // Debug: show what we're checking against
      console.log('Checking person against existing stakeholders:', {
        personToCheck: { name: person.name, email: person.email, id: person.id },
        existingStakeholders: existingStakeholders.map((s: any) => ({
          id: s.id,
          name: s.name,
          email: s.email,
          hasApolloData: !!s.apolloData,
          isApolloId: s.id?.startsWith('apollo_')
        }))
      });
      
      // SIMPLIFIED MATCHING: Only use Apollo ID for exact matches
      // This eliminates false positives from name/email matching
      const apolloIdMatch = existingStakeholders.some((s: any) => 
        s.id === `apollo_${person.id}`
      );
      
      // Debug logging enabled for troubleshooting
      console.log('Person check (SIMPLIFIED):', {
        personName: person.name,
        personEmail: person.email,
        personId: person.id,
        expectedApolloId: `apollo_${person.id}`,
        apolloIdMatch,
        existingApolloIds: existingStakeholders
          .filter((s: any) => s.id?.startsWith('apollo_'))
          .map((s: any) => s.id),
        result: apolloIdMatch
      });
      
      // ONLY return true if exact Apollo ID match found
      return apolloIdMatch;
    } catch (error) {
      console.error('Error checking person:', error);
      return false;
    }
  }, [refreshIndicators]);

  // Helper function to check if an organization is already added
  const isOrganizationAlreadyAdded = React.useCallback((organization: ApolloOrganizationData): boolean => {
    try {
      const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
      
      // SIMPLIFIED MATCHING: Only use Apollo ID for exact matches
      const apolloIdMatch = existingCompanies.some((c: any) => 
        c.id === `apollo_${organization.id}` || c.company_id === `apollo_${organization.id}`
      );
      
      console.log('Organization check (SIMPLIFIED):', {
        organizationName: organization.name,
        organizationId: organization.id,
        expectedApolloIds: [`apollo_${organization.id}`],
        apolloIdMatch,
        existingApolloIds: existingCompanies
          .filter((c: any) => c.id?.startsWith('apollo_') || c.company_id?.startsWith('apollo_'))
          .map((c: any) => ({ id: c.id, company_id: c.company_id })),
        result: apolloIdMatch
      });
      
      // ONLY return true if exact Apollo ID match found
      return apolloIdMatch;
    } catch (error) {
      console.error('Error checking organization:', error);
      return false;
    }
  }, [refreshIndicators]);

  // Function to load demo data
  const loadDemoData = () => {
    setShowDemoData(true);
    setDemoPeopleData(demoStakeholders);
    setSelectedCompany(null);
    setCompanyStakeholders({});
  };

  // Function to clear demo data
  const clearDemoData = () => {
    setShowDemoData(false);
    setDemoPeopleData([]);
    setSelectedCompany(null);
    setCompanyStakeholders({});
  };

  // Get the data to display (either real Apollo data or demo data)
  const displayPeopleData = showDemoData ? demoPeopleData : apollo.peopleData;

  // Check for saved API key on component mount and set default
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apollo_api_key');
    const defaultApiKey = 'CkMrfH_yEtIlyF3_uJIuqA';
    
    // Always use the new API key to ensure everyone gets the updated key
    setApiKey(defaultApiKey);
    setIsApiKeySet(true);
    apollo.setApiKey(defaultApiKey);
    localStorage.setItem('apollo_api_key', defaultApiKey);
  }, [apollo]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('apollo_api_key', apiKey.trim());
      apollo.setApiKey(apiKey.trim());
      setIsApiKeySet(true);
    }
  };

  const handleSearch = async () => {
    if (!isApiKeySet) {
      alert('Please configure your Apollo.io API key first');
      return;
    }

    try {
      if (searchType === 'people') {
        await apollo.searchPeople(personSearch);
      } else {
        await apollo.searchOrganizations(orgSearch);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleEnrichment = async () => {
    if (!isApiKeySet) {
      alert('Please configure your Apollo.io API key first');
      return;
    }

    if (!enrichmentEmail) {
      alert('Please enter an email address to enrich');
      return;
    }

    try {
      await apollo.enrichPerson({ email: enrichmentEmail });
    } catch (error) {
      console.error('Enrichment failed:', error);
    }
  };

  const handleOrganizationEnrichment = async () => {
    if (!isApiKeySet) {
      alert('Please configure your Apollo.io API key first');
      return;
    }

    if (!orgSearch.domain && !orgSearch.name) {
      alert('Please enter either a company domain or organization name');
      return;
    }

    try {
      await apollo.enrichOrganization(orgSearch);
    } catch (error) {
      console.error('Organization enrichment failed:', error);
    }
  };

  const handlePersonClick = async (person: any) => {
    if (!isApiKeySet) {
      alert('Please configure your Apollo.io API key first');
      return;
    }

    try {
      const result = await apollo.personMatch(person.id);
      setSelectedPerson(result.person);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to match person:', error);
    }
  };

  const handleOrganizationClick = (org: any) => {
    setSelectedOrganization(org);
    setIsOrgModalOpen(true);
  };

  const addToStakeholderMapping = async (person?: ApolloPersonData, organization?: ApolloOrganizationData) => {
    try {
      if (person) {
        // Set loading state
        setAddingToStakeholder(person.id);
        
        try {
          // Use the person match API to get complete profile data
          const enrichedResult = await apollo.personMatch(person.id);
          const enrichedPerson = enrichedResult.person;
          
          // Get existing stakeholder data from localStorage
          const existingStakeholders = JSON.parse(localStorage.getItem('stakeholder_data') || '[]');
          const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
          
          if (enrichedPerson && enrichedPerson.organization) {
            let enrichedOrganization = enrichedPerson.organization;
            
            // Always try to get the most complete organization data
            try {
              console.log('Enriching organization data for:', enrichedPerson.organization.name);
              
              // First try with domain if available
              if (enrichedPerson.organization.primary_domain) {
                const domainEnrichResult = await apollo.enrichOrganization({ 
                  domain: enrichedPerson.organization.primary_domain 
                });
                if (domainEnrichResult) {
                  enrichedOrganization = { 
                    ...enrichedPerson.organization, 
                    ...domainEnrichResult,
                    // Preserve key identification fields
                    id: enrichedPerson.organization.id,
                    name: enrichedPerson.organization.name
                  };
                  console.log('Successfully enriched organization via domain');
                }
              }
              
              // If domain enrichment didn't work or no domain available, try with name
              if (!enrichedOrganization.annual_revenue_printed && enrichedPerson.organization.name) {
                const nameEnrichResult = await apollo.enrichOrganization({ 
                  name: enrichedPerson.organization.name 
                });
                if (nameEnrichResult) {
                  enrichedOrganization = { 
                    ...enrichedOrganization, 
                    ...nameEnrichResult,
                    // Preserve key identification fields
                    id: enrichedPerson.organization.id,
                    name: enrichedPerson.organization.name
                  };
                  console.log('Successfully enriched organization via name');
                }
              }
              
            } catch (orgError) {
              console.log('Could not enrich organization data, using person organization data:', orgError);
              // Use the organization data that came with the person
              enrichedOrganization = enrichedPerson.organization;
            }
            
            // Convert enriched Apollo person and organization data
            const stakeholder = convertApolloPersonToStakeholder({
              ...enrichedPerson,
              organization: enrichedOrganization
            });
            const company = convertApolloOrgToCompany(enrichedOrganization);
            
            console.log('Converting to company data:', {
              original: enrichedOrganization.name,
              converted: company
            });
            
            // Check if company already exists (check multiple possible name fields)
            const existingCompanyIndex = existingCompanies.findIndex((c: any) => 
              c.name === company.name || 
              c.company_name === company.company_name ||
              c.name?.toLowerCase() === company.name?.toLowerCase() ||
              c.company_name?.toLowerCase() === company.company_name?.toLowerCase()
            );
            
            if (existingCompanyIndex === -1) {
              existingCompanies.push(company);
              console.log('Added new company:', company.name);
            } else {
              // Update existing company with more complete data
              existingCompanies[existingCompanyIndex] = {
                ...existingCompanies[existingCompanyIndex],
                ...company
              };
              console.log('Updated existing company:', company.name);
            }
            
            // Check if stakeholder already exists
            const existingStakeholderIndex = existingStakeholders.findIndex((s: any) => 
              (s.email && stakeholder.email && s.email === stakeholder.email) || 
              s.name === stakeholder.name
            );
            
            if (existingStakeholderIndex === -1) {
              existingStakeholders.push(stakeholder);
              console.log('Added new stakeholder:', stakeholder.name);
            } else {
              // Update existing stakeholder with complete data
              existingStakeholders[existingStakeholderIndex] = {
                ...existingStakeholders[existingStakeholderIndex],
                ...stakeholder
              };
              console.log('Updated existing stakeholder:', stakeholder.name);
            }
            
            // Save updated data
            localStorage.setItem('stakeholder_data', JSON.stringify(existingStakeholders));
            localStorage.setItem('company_data', JSON.stringify(existingCompanies));
            
            // Show success message with company details
            const companyInfo = company.industry ? ` from ${company.industry}` : '';
            alert(`${enrichedPerson.name} and ${company.company_name}${companyInfo} have been added to stakeholder mapping with complete details!`);
            
            // Clear loading state
            setAddingToStakeholder(null);
            
            // Trigger a custom event to notify other components
            window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
            
            // Refresh the indicators in this component
            setRefreshIndicators(prev => prev + 1);
          } else {
            throw new Error('Failed to get complete person data');
          }
          
        } catch (enrichError) {
          console.error('Error enriching person data:', enrichError);
          // Clear loading state
          setAddingToStakeholder(null);
          
          // Fallback to using the original person data if enrichment fails
          const existingStakeholders = JSON.parse(localStorage.getItem('stakeholder_data') || '[]');
          const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
          
          if (person.organization) {
            const stakeholder = convertApolloPersonToStakeholder(person);
            const company = convertApolloOrgToCompany(person.organization);
            
            const existingCompanyIndex = existingCompanies.findIndex((c: any) => 
              c.name === company.name || c.company_name === company.company_name
            );
            if (existingCompanyIndex === -1) {
              existingCompanies.push(company);
            } else {
              existingCompanies[existingCompanyIndex] = {
                ...existingCompanies[existingCompanyIndex],
                ...company
              };
            }
            
            const existingStakeholderIndex = existingStakeholders.findIndex((s: any) => 
              (s.email && stakeholder.email && s.email === stakeholder.email) || 
              s.name === stakeholder.name
            );
            if (existingStakeholderIndex === -1) {
              existingStakeholders.push(stakeholder);
            } else {
              existingStakeholders[existingStakeholderIndex] = {
                ...existingStakeholders[existingStakeholderIndex],
                ...stakeholder
              };
            }
            
            localStorage.setItem('stakeholder_data', JSON.stringify(existingStakeholders));
            localStorage.setItem('company_data', JSON.stringify(existingCompanies));
            
            alert(`${person.name} has been added to stakeholder mapping (with available data)!`);
            window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
            setRefreshIndicators(prev => prev + 1);
          }
        }
        
      } else if (organization) {
        // When adding organization only, try to enrich it first
        try {
          let enrichedOrganization = organization;
          
          // Try to get complete organization data
          if (organization.primary_domain || organization.website_url) {
            const domain = organization.primary_domain || 
                          organization.website_url?.replace('https://', '').replace('http://', '').split('/')[0];
            if (domain) {
              const domainEnrichResult = await apollo.enrichOrganization({ domain });
              if (domainEnrichResult) {
                enrichedOrganization = { 
                  ...organization, 
                  ...domainEnrichResult,
                  id: organization.id,
                  name: organization.name
                };
              }
            }
          }
          
          const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
          const company = convertApolloOrgToCompany(enrichedOrganization);
          
          // Check if company already exists
          const existingCompanyIndex = existingCompanies.findIndex((c: any) => 
            c.name === company.name || c.company_name === company.company_name
          );
          if (existingCompanyIndex === -1) {
            existingCompanies.push(company);
            localStorage.setItem('company_data', JSON.stringify(existingCompanies));
            const industryInfo = company.industry ? ` (${company.industry})` : '';
            alert(`${company.company_name}${industryInfo} has been added to stakeholder mapping with complete details!`);
            window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
            setRefreshIndicators(prev => prev + 1);
          } else {
            // Update existing company with enriched data
            existingCompanies[existingCompanyIndex] = {
              ...existingCompanies[existingCompanyIndex],
              ...company
            };
            localStorage.setItem('company_data', JSON.stringify(existingCompanies));
            alert(`${company.company_name} has been updated with enriched data!`);
            window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
            setRefreshIndicators(prev => prev + 1);
          }
        } catch (orgError) {
          console.error('Error enriching organization:', orgError);
          // Fallback to basic organization data
          const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
          const company = convertApolloOrgToCompany(organization);
          
          const existingCompanyIndex = existingCompanies.findIndex((c: any) => 
            c.name === company.name || c.company_name === company.company_name
          );
          if (existingCompanyIndex === -1) {
            existingCompanies.push(company);
            localStorage.setItem('company_data', JSON.stringify(existingCompanies));
            alert(`${organization.name} has been added to stakeholder mapping!`);
            window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
            setRefreshIndicators(prev => prev + 1);
          } else {
            alert(`${organization.name} already exists in stakeholder mapping!`);
          }
        }
      }
      
    } catch (error) {
      console.error('Error adding to stakeholder mapping:', error);
      setAddingToStakeholder(null);
      alert('Error adding to stakeholder mapping. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Apollo.io Integration</h1>
            <p className="text-gray-600 mt-1">All-in-one sales intelligence platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="enrichment" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Enrichment</span>
          </TabsTrigger>
          <TabsTrigger value="sequences" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Sequences</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="stakeholder" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Stakeholders</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                    <p className="text-2xl font-bold text-purple-600">{apolloStats.totalContacts.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">enriched contacts</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Data Accuracy</p>
                    <p className="text-2xl font-bold text-green-600">{apolloStats.accuracy}%</p>
                    <p className="text-xs text-gray-500">verified accuracy</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Queries</p>
                    <p className="text-2xl font-bold text-blue-600">{apolloStats.monthlyQueries}</p>
                    <p className="text-xs text-gray-500">this month</p>
                  </div>
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
                    <p className="text-2xl font-bold text-orange-600">{apolloStats.creditsRemaining.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">available credits</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          {!isApiKeySet && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please configure your Apollo.io API key in the Settings tab first.
              </AlertDescription>
            </Alert>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Apollo.io Search
                <Select value={searchType} onValueChange={(value: 'people' | 'organizations') => setSearchType(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Search type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="people">People & Contacts</SelectItem>
                    <SelectItem value="organizations">Organizations</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {searchType === 'people' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="john@company.com"
                      value={personSearch.email || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input 
                      id="title" 
                      placeholder="CEO, VP, Director, Manager, etc."
                      value={personSearch.title || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyDomain">Company Domain</Label>
                    <Input 
                      id="companyDomain" 
                      placeholder="apollo.io, google.com, etc."
                      value={personSearch.domain || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, domain: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="San Francisco, CA"
                      value={personSearch.location || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      placeholder="Technology, Healthcare, Finance, etc."
                      value={personSearch.industry || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, industry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input 
                      id="keywords" 
                      placeholder="sales, marketing, AI, etc."
                      value={personSearch.keywords || ''}
                      onChange={(e) => setPersonSearch(prev => ({ ...prev, keywords: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="seniority">Seniority</Label>
                    <Select
                      onValueChange={(value) => setPersonSearch(prev => ({ ...prev, seniority: value }))}
                      value={personSearch.seniority || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select seniority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="founder">Founder</SelectItem>
                        <SelectItem value="c_suite">C-Suite</SelectItem>
                        <SelectItem value="partner">Partner</SelectItem>
                        <SelectItem value="vp">VP</SelectItem>
                        <SelectItem value="head">Head</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="entry">Entry</SelectItem>
                        <SelectItem value="intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgName">Organization Name</Label>
                    <Input 
                      id="orgName" 
                      placeholder="Acme Corporation"
                      value={orgSearch.name || ''}
                      onChange={(e) => setOrgSearch(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="orgDomain">Domain</Label>
                    <Input 
                      id="orgDomain" 
                      placeholder="acme.com"
                      value={orgSearch.domain || ''}
                      onChange={(e) => setOrgSearch(prev => ({ ...prev, domain: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minEmployees">Min Employees</Label>
                    <Input 
                      id="minEmployees" 
                      type="number"
                      placeholder="10"
                      value={orgSearch.employeeCount?.min || ''}
                      onChange={(e) => setOrgSearch(prev => ({ 
                        ...prev, 
                        employeeCount: { 
                          ...prev.employeeCount, 
                          min: e.target.value ? parseInt(e.target.value) : undefined 
                        } 
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxEmployees">Max Employees</Label>
                    <Input 
                      id="maxEmployees" 
                      type="number"
                      placeholder="1000"
                      value={orgSearch.employeeCount?.max || ''}
                      onChange={(e) => setOrgSearch(prev => ({ 
                        ...prev, 
                        employeeCount: { 
                          ...prev.employeeCount, 
                          max: e.target.value ? parseInt(e.target.value) : undefined 
                        } 
                      }))}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSearch} 
                  disabled={apollo.loading || !isApiKeySet}
                  className="flex items-center space-x-2"
                >
                  {apollo.loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>
                    {apollo.loading 
                      ? 'Searching...' 
                      : `Search ${searchType === 'people' ? 'People' : 'Organizations'}`}
                  </span>
                </Button>
                <Button variant="outline" onClick={() => {
                  setPersonSearch({});
                  setOrgSearch({});
                  apollo.clearData();
                }}>
                  Clear
                </Button>
              </div>

              {apollo.error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{apollo.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Search Results */}
          {apollo.searchPerformed && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Search Results ({searchType === 'people' ? apollo.peopleData.length : apollo.organizationData.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {searchType === 'people' ? (
                  apollo.peopleData.length > 0 ? (
                    <div className="space-y-4">
                      {apollo.peopleData.map((person, index) => {
                        const isAlreadyAdded = isPersonAlreadyAdded(person);
                        return (
                          <div 
                            key={person.id || index} 
                            className={`p-4 border rounded-lg transition-shadow cursor-pointer ${
                              isAlreadyAdded 
                                ? 'border-green-300 bg-green-50/50 hover:shadow-sm' 
                                : 'border-gray-200 hover:shadow-sm'
                            }`} 
                            onClick={() => handlePersonClick(person)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 relative">
                                    {person.photo_url ? (
                                      <img 
                                        src={`https://wsrv.nl/?url=${person.photo_url}`} 
                                        alt={person.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                      />
                                    ) : null}
                                    <div className={`${person.photo_url ? 'hidden' : ''} text-gray-400 text-lg font-semibold`}>
                                      {person.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                    {isAlreadyAdded && (
                                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                      {person.name}
                                      {isAlreadyAdded && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                          Added to Stakeholders
                                        </Badge>
                                      )}
                                      {person.linkedinUrl && (
                                        <a 
                                          href={person.linkedinUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </a>
                                      )}
                                    </h4>
                                    <p className="text-gray-600 flex items-center gap-1">
                                      <Briefcase className="h-4 w-4" />
                                      {person.title}
                                    </p>
                                    {person.organization && (
                                      <p className="text-gray-600 flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        {person.organization.name}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  {person.email && (
                                    <div className="flex items-center space-x-1">
                                      <Mail className="h-4 w-4 text-blue-600" />
                                      <span>{person.email}</span>
                                    </div>
                                  )}
                                  {person.organization?.primary_phone?.number && (
                                    <div className="flex items-center space-x-1">
                                      <Phone className="h-4 w-4 text-green-600" />
                                      <span>{person.organization.primary_phone.number}</span>
                                    </div>
                                  )}
                                  {(person.city || person.state || person.country) && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-4 w-4 text-gray-600" />
                                      <span>
                                        {[person.city, person.state, person.country].filter(Boolean).join(', ')}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-green-600">
                                  Apollo Data
                                </Badge>
                                {isAlreadyAdded ? (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    disabled
                                    className="bg-green-50 border-green-300 text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Already Added
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    disabled={addingToStakeholder === person.id}
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      await addToStakeholderMapping(person);
                                    }}
                                  >
                                    {addingToStakeholder === person.id ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                        Enriching...
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add to Stakeholder
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No people found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        The search returned no contacts. This might be due to:
                      </p>
                      <ul className="mt-2 text-sm text-gray-500 list-disc text-left max-w-md mx-auto">
                        <li>API key limitations or permissions</li>
                        <li>Very specific search criteria</li>
                        <li>No contacts matching the filters</li>
                      </ul>
                      <p className="mt-2 text-sm text-gray-500">
                        Try different search criteria such as job titles, company names, or locations.
                      </p>
                    </div>
                  )
                ) : (
                  apollo.organizationData.length > 0 ? (
                    <div className="space-y-4">
                      {apollo.organizationData.map((org, index) => {
                        const isOrgAlreadyAdded = isOrganizationAlreadyAdded(org);
                        return (
                          <div 
                            key={org.id || index} 
                            className={`p-4 border rounded-lg transition-shadow cursor-pointer ${
                              isOrgAlreadyAdded 
                                ? 'border-green-300 bg-green-50/50 hover:shadow-sm' 
                                : 'border-gray-200 hover:shadow-sm'
                            }`} 
                            onClick={() => handleOrganizationClick(org)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center space-x-3">
                                  <div className="relative">
                                    {org.logo_url && (
                                      <img 
                                        src={`https://wsrv.nl/?url=${org.logo_url}`} 
                                        alt={org.name}
                                        className="w-12 h-12 rounded object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                        }}
                                      />
                                    )}
                                    {isOrgAlreadyAdded && (
                                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                      {org.name}
                                      {isOrgAlreadyAdded && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                          Added to Companies
                                        </Badge>
                                      )}
                                      {org.website_url && (
                                        <a 
                                          href={org.website_url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </a>
                                      )}
                                    </h4>
                                    <p className="text-gray-600">{org.industry}</p>
                                    {org.short_description && (
                                      <p className="text-sm text-gray-700">{org.short_description}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    <span>{org.estimated_num_employees.toLocaleString()} employees</span>
                                  </div>
                                  {org.founded_year && (
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4 text-green-600" />
                                      <span>Founded {org.founded_year}</span>
                                    </div>
                                  )}
                                  {(org.city || org.state || org.country) && (
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="h-4 w-4 text-gray-600" />
                                      <span>
                                        {[org.city, org.state, org.country].filter(Boolean).join(', ')}
                                      </span>
                                    </div>
                                  )}
                                  {org.annual_revenue_printed && (
                                    <div className="flex items-center space-x-1">
                                      <TrendingUp className="h-4 w-4 text-purple-600" />
                                      <span>{org.annual_revenue_printed}</span>
                                    </div>
                                  )}
                                </div>
                                {org.technology_names && org.technology_names.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <span className="text-sm text-gray-600">Technologies:</span>
                                    {org.technology_names.slice(0, 5).map((tech, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                    {org.technology_names.length > 5 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{org.technology_names.length - 5} more
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-green-600">
                                  {org.confidence}% match
                                </Badge>
                                {isOrgAlreadyAdded ? (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    disabled
                                    className="bg-green-50 border-green-300 text-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Already Added
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      await addToStakeholderMapping(undefined, org);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add to Stakeholder
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No organizations found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search criteria and search again.
                      </p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Enrichment Tab */}
        <TabsContent value="enrichment" className="space-y-6">
          {!isApiKeySet && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please configure your Apollo.io API key in the Settings tab first.
              </AlertDescription>
            </Alert>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Organization Enrichment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="enrichDomain">Company Domain</Label>
                  <Input 
                    id="enrichDomain" 
                    type="text" 
                    placeholder="e.g., apollo.io, google.com"
                    value={orgSearch.domain || ''}
                    onChange={(e) => setOrgSearch(prev => ({ ...prev, domain: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="enrichOrgName">Organization Name</Label>
                  <Input 
                    id="enrichOrgName" 
                    type="text" 
                    placeholder="e.g., Apollo.io, Google Inc"
                    value={orgSearch.name || ''}
                    onChange={(e) => setOrgSearch(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={handleOrganizationEnrichment} 
                  disabled={apollo.loading || !isApiKeySet || (!orgSearch.domain && !orgSearch.name)}
                  className="flex items-center space-x-2"
                >
                  {apollo.loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Building2 className="h-4 w-4" />
                  )}
                  <span>
                    {apollo.loading ? 'Enriching...' : 'Enrich Organization'}
                  </span>
                </Button>
                <Button variant="outline" onClick={() => {
                  setOrgSearch({});
                  apollo.clearData();
                }}>
                  Clear
                </Button>
              </div>

              {apollo.error && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{apollo.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Enrichment Results */}
          {apollo.searchPerformed && (
            <Card>
              <CardHeader>
                <CardTitle>Enrichment Results</CardTitle>
              </CardHeader>
              <CardContent>
                {apollo.organizationData.length > 0 ? (
                  <div className="space-y-6">
                    {apollo.organizationData.map((org, index) => (
                      <div key={org.id || index} className="p-6 border rounded-lg bg-gradient-to-br from-white to-gray-50">
                        {/* Organization Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            {org.logo_url && (
                              <img 
                                src={`https://wsrv.nl/?url=${org.logo_url}`} 
                                alt={org.name}
                                className="w-16 h-16 rounded-lg object-cover shadow-sm"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            )}
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                {org.name}
                                {org.website_url && (
                                  <a 
                                    href={org.website_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <ExternalLink className="h-5 w-5" />
                                  </a>
                                )}
                              </h3>
                              <p className="text-lg text-gray-600 font-medium">{org.industry}</p>
                              {org.short_description && (
                                <p className="text-sm text-gray-700 mt-2 max-w-2xl">{org.short_description}</p>
                              )}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            Enriched Data
                          </Badge>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <p className="text-lg font-semibold text-gray-900">{org.estimated_num_employees.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">Employees</p>
                          </div>
                          {org.founded_year && (
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                              <p className="text-lg font-semibold text-gray-900">{org.founded_year}</p>
                              <p className="text-xs text-gray-600">Founded</p>
                            </div>
                          )}
                          {org.annual_revenue_printed && (
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                              <p className="text-lg font-semibold text-gray-900">{org.annual_revenue_printed}</p>
                              <p className="text-xs text-gray-600">Revenue</p>
                            </div>
                          )}
                          {org.total_funding_printed && (
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                              <Zap className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                              <p className="text-lg font-semibold text-gray-900">{org.total_funding_printed}</p>
                              <p className="text-xs text-gray-600">Total Funding</p>
                            </div>
                          )}
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-wrap gap-4 text-sm mb-6">
                          {(org.city || org.state || org.country) && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-gray-600" />
                              <span>{[org.city, org.state, org.country].filter(Boolean).join(', ')}</span>
                            </div>
                          )}
                          {org.primary_phone?.number && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4 text-green-600" />
                              <span>{org.primary_phone.number}</span>
                            </div>
                          )}
                          {org.alexa_ranking && (
                            <div className="flex items-center space-x-1">
                              <Globe className="h-4 w-4 text-blue-600" />
                              <span>Alexa Rank: {org.alexa_ranking.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {/* Latest Funding Round */}
                        {org.latest_funding_stage && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-2">Latest Funding</h4>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">{org.latest_funding_stage}</span>
                                  {org.latest_funding_round_date && (
                                    <span className="text-gray-600 ml-2">
                                      ({new Date(org.latest_funding_round_date).getFullYear()})
                                    </span>
                                  )}
                                </div>
                                {org.total_funding_printed && (
                                  <Badge variant="secondary">{org.total_funding_printed} Total</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Department Head Count */}
                        {org.departmental_head_count && Object.keys(org.departmental_head_count).length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Department Breakdown</h4>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                              {Object.entries(org.departmental_head_count)
                                .filter(([_, count]) => count > 0)
                                .sort(([,a], [,b]) => b - a)
                                .slice(0, 10)
                                .map(([dept, count]) => (
                                <div key={dept} className="text-center p-2 bg-gray-100 rounded">
                                  <p className="text-sm font-semibold">{count}</p>
                                  <p className="text-xs text-gray-600 capitalize">{dept.replace('_', ' ')}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {org.technology_names && org.technology_names.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {org.technology_names.slice(0, 12).map((tech, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {org.technology_names.length > 12 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{org.technology_names.length - 12} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>
                          {isOrganizationAlreadyAdded(org) ? (
                            <Button 
                              size="sm"
                              variant="outline"
                              disabled
                              className="bg-green-50 border-green-300 text-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Already Added
                            </Button>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={async () => await addToStakeholderMapping(undefined, org)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add to Stakeholder
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No organization enriched yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a company domain or name above to get detailed organization insights.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Sequences Tab */}
        <TabsContent value="sequences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Sequences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No sequences yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create your first email sequence to start automated outreach.
                </p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Sequence
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apollo.io Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics Dashboard</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Track your Apollo.io usage, success rates, and performance metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stakeholder Mapping Tab */}
        <TabsContent value="stakeholder" className="space-y-6">
          {!isApiKeySet && !showDemoData && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please set your Apollo.io API key in the Settings tab to start mapping stakeholders, or try the demo data below.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Demo Data Controls */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h3 className="font-semibold text-gray-900">Demo Mode</h3>
              <p className="text-sm text-gray-600">
                {showDemoData ? 'Showing demo data for TechCorp Industries' : 'Load sample data to see how stakeholder mapping works'}
              </p>
            </div>
            <div className="flex space-x-2">
              {!showDemoData ? (
                <Button onClick={loadDemoData} variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Load TechCorp Demo
                </Button>
              ) : (
                <Button onClick={clearDemoData} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear Demo Data
                </Button>
              )}
            </div>
          </div>
          
          {(isApiKeySet || showDemoData) && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Stakeholder Mapping</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {!selectedCompany ? 'Select a company to view its stakeholders' : `Viewing stakeholders for ${selectedCompany.name}`}
                    </p>
                  </div>
                  {selectedCompany && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedCompany(null);
                        setCompanyStakeholders({});
                      }}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Companies
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedCompany ? (
                  // Stakeholder Groups by Company Cards
                  <div>
                    {displayPeopleData.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Group people by company */}
                        {Object.entries(
                          displayPeopleData.reduce((acc, person) => {
                            const company = person.organization;
                            if (company) {
                              if (!acc[company.id]) {
                                acc[company.id] = {
                                  company: company,
                                  stakeholders: []
                                };
                              }
                              acc[company.id].stakeholders.push(person);
                            }
                            return acc;
                          }, {} as {[key: string]: {company: ApolloOrganizationData, stakeholders: ApolloPersonData[]}})
                        ).map(([companyId, { company, stakeholders }]) => (
                          <Card 
                            key={companyId} 
                            className="cursor-pointer group hover:shadow-lg transition-all duration-200 hover:border-purple-300"
                            onClick={() => {
                              setSelectedCompany(company);
                              setCompanyStakeholders({
                                [companyId]: stakeholders
                              });
                            }}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                                  {company.logo_url ? (
                                    <img 
                                      src={company.logo_url} 
                                      alt={company.name}
                                      className="w-16 h-16 rounded-lg object-contain"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                      }}
                                    />
                                  ) : null}
                                  <div className={`${company.logo_url ? 'hidden' : ''} text-purple-600 text-xl font-bold`}>
                                    {company.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
                                    {company.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 truncate">{company.industry}</p>
                                  <div className="mt-3 space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-purple-600 font-medium">
                                      <Users className="h-5 w-5" />
                                      <span>{stakeholders.length} stakeholder{stakeholders.length !== 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                      <Building2 className="h-4 w-4" />
                                      <span>{company.estimated_num_employees.toLocaleString()} employees</span>
                                    </div>
                                    {(company.city || company.state || company.country) && (
                                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <MapPin className="h-4 w-4" />
                                        <span className="truncate">{[company.city, company.state, company.country].filter(Boolean).join(', ')}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Stakeholder Preview */}
                              <div className="mt-4">
                                <div className="flex items-center space-x-2 mb-3">
                                  <Target className="h-4 w-4 text-purple-600" />
                                  <span className="text-sm font-medium text-gray-700">Key Stakeholders:</span>
                                </div>
                                <div className="flex -space-x-2 overflow-hidden">
                                  {stakeholders.slice(0, 5).map((person, idx) => (
                                    <div key={idx} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center flex-shrink-0">
                                      {person.photo_url ? (
                                        <img 
                                          src={person.photo_url} 
                                          alt={person.name}
                                          className="w-8 h-8 rounded-full object-cover"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                          }}
                                        />
                                      ) : null}
                                      <div className={`${person.photo_url ? 'hidden' : ''} text-gray-500 text-xs font-semibold`}>
                                        {person.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                      </div>
                                    </div>
                                  ))}
                                  {stakeholders.length > 5 && (
                                    <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-purple-600">
                                      +{stakeholders.length - 5}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="text-green-600">
                                    Apollo Data
                                  </Badge>
                                  <div className="text-right text-xs text-gray-400 flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View all stakeholders
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : !showDemoData && apollo.organizationData.length > 0 ? (
                      <div className="text-center py-12">
                        <Target className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No stakeholders found yet</h3>
                        <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                          Search for people in the Search tab to see stakeholder groups by company here.
                        </p>
                        <Button 
                          className="mt-4" 
                          onClick={() => setActiveTab('search')}
                        >
                          <Search className="h-4 w-4 mr-2" />
                          Search People
                        </Button>
                      </div>
                    ) : !showDemoData ? (
                      <div className="text-center py-12">
                        <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Search for organizations in the Enrichment tab first, or use the demo data above to see stakeholder mapping.
                        </p>
                        <div className="flex justify-center space-x-2 mt-4">
                          <Button onClick={() => setActiveTab('enrichment')}>
                            <Search className="h-4 w-4 mr-2" />
                            Search Companies
                          </Button>
                          <Button onClick={loadDemoData} variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Try Demo
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  // Stakeholder List View - Only show after company selection
                  <div>
                    {/* Selected Company Header with Back Navigation */}
                    <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            {selectedCompany.logo_url ? (
                              <img 
                                src={selectedCompany.logo_url} 
                                alt={selectedCompany.name}
                                className="w-16 h-16 rounded-lg object-contain"
                              />
                            ) : (
                              <div className="text-purple-600 text-xl font-bold">
                                {selectedCompany.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                            <p className="text-gray-600 font-medium">{selectedCompany.industry}</p>
                            <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                              <span className="flex items-center space-x-2">
                                <Building2 className="h-4 w-4" />
                                <span>{selectedCompany.estimated_num_employees.toLocaleString()} employees</span>
                              </span>
                              {(selectedCompany.city || selectedCompany.state || selectedCompany.country) && (
                                <span className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{[selectedCompany.city, selectedCompany.state, selectedCompany.country].filter(Boolean).join(', ')}</span>
                                </span>
                              )}
                              {selectedCompany.website_url && (
                                <span className="flex items-center space-x-2">
                                  <Globe className="h-4 w-4" />
                                  <a 
                                    href={selectedCompany.website_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    Website
                                  </a>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stakeholder List */}
                    {companyStakeholders[selectedCompany.id] && companyStakeholders[selectedCompany.id].length > 0 ? (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900 flex items-center">
                            <Users className="h-6 w-6 mr-2 text-purple-600" />
                            Stakeholders ({companyStakeholders[selectedCompany.id].length})
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-purple-600">
                              Found via Apollo.io
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export List
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {companyStakeholders[selectedCompany.id].map((person) => (
                            <Card key={person.id} className="hover:shadow-lg transition-all duration-200 hover:border-purple-300 bg-gradient-to-br from-white to-purple-50/20">
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                                    {person.photo_url ? (
                                      <img 
                                        src={person.photo_url} 
                                        alt={person.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                      />
                                    ) : null}
                                    <div className={`${person.photo_url ? 'hidden' : ''} text-purple-600 text-lg font-bold`}>
                                      {person.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate text-base">{person.name}</h4>
                                    <p className="text-sm text-gray-600 truncate font-medium">{person.title}</p>
                                    {person.seniority && (
                                      <Badge variant="secondary" className="mt-2 text-xs bg-purple-100 text-purple-700">
                                        {person.seniority.charAt(0).toUpperCase() + person.seniority.slice(1)}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="space-y-3 text-sm text-gray-600 mb-4">
                                  {person.email && (
                                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                                      <Mail className="h-4 w-4 text-blue-600" />
                                      <span className="truncate font-medium">{person.email}</span>
                                    </div>
                                  )}
                                  {(person.city || person.state || person.country) && (
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4 text-gray-500" />
                                      <span className="truncate">{[person.city, person.state, person.country].filter(Boolean).join(', ')}</span>
                                    </div>
                                  )}
                                  {person.linkedinUrl && (
                                    <div className="flex items-center space-x-2">
                                      <ExternalLink className="h-4 w-4 text-blue-500" />
                                      <a 
                                        href={person.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 truncate hover:underline font-medium"
                                      >
                                        LinkedIn Profile
                                      </a>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="pt-4 border-t border-purple-100">
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-green-600 border-green-300">
                                      {person.confidence ? `${person.confidence}% match` : 'Apollo Data'}
                                    </Badge>
                                    <Button size="sm" variant="default" className="bg-purple-600 hover:bg-purple-700 text-white">
                                      <Plus className="h-4 w-4 mr-1" />
                                      Connect
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Stakeholders</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Loading stakeholders for {selectedCompany.name}...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">Apollo.io API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter your Apollo.io API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your API key will be stored locally in your browser for this session.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                {isApiKeySet && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setApiKey('');
                      setIsApiKeySet(false);
                      localStorage.removeItem('apollo_api_key');
                    }}
                  >
                    Clear API Key
                  </Button>
                )}
              </div>
              {isApiKeySet && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Apollo.io API key has been configured successfully. You can now use search and enrichment features.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Debug Tools:</h4>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={debugStorageData}
                  >
                    Debug Storage Data
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem('stakeholder_data');
                      localStorage.removeItem('company_data');
                      setRefreshIndicators(prev => prev + 1);
                      alert('Apollo data cleared from localStorage');
                    }}
                  >
                    Clear Apollo Data
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Use these tools to debug issues with visual indicators.
                </p>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">How to get your Apollo.io API key:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                  <li>Sign in to your Apollo.io account</li>
                  <li>Go to Settings → Integrations → API</li>
                  <li>Click "Create New Key" if you don't have one</li>
                  <li>Copy the API key and paste it above</li>
                </ol>
                <p className="text-sm text-gray-500 mt-2">
                  Need an Apollo.io account? <a href="https://apollo.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sign up here</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isModalOpen && selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedPerson.name}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Title:</strong> {selectedPerson.title}</p>
              <p><strong>Email:</strong> {selectedPerson.email}</p>
              <p><strong>LinkedIn:</strong> <a href={selectedPerson.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedPerson.linkedinUrl}</a></p>
              <p><strong>Company:</strong> {selectedPerson.organization?.name}</p>
              <p><strong>Location:</strong> {[selectedPerson.city, selectedPerson.state, selectedPerson.country].filter(Boolean).join(', ')}</p>
              <p><strong>Headline:</strong> {selectedPerson.headline}</p>
            </div>
          </div>
        </div>
      )}

      {isOrgModalOpen && selectedOrganization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedOrganization.name}</h2>
              <button onClick={() => setIsOrgModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Website:</strong> <a href={selectedOrganization.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{selectedOrganization.website_url}</a></p>
              <p><strong>Industry:</strong> {selectedOrganization.industry}</p>
              <p><strong>Employees:</strong> {selectedOrganization.estimated_num_employees}</p>
              <p><strong>Location:</strong> {[selectedOrganization.city, selectedOrganization.state, selectedOrganization.country].filter(Boolean).join(', ')}</p>
              <p><strong>Description:</strong> {selectedOrganization.short_description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}