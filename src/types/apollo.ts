// Apollo.io API Types

export interface ApolloPersonSearchData {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedinUrl?: string;
  title?: string;
  company?: string;
  domain?: string;
  location?: string;
  industry?: string;
  companySize?: string;
  keywords?: string;
  seniority?: string;
}

export interface ApolloOrganizationSearchData {
  name?: string;
  domain?: string;
  industry?: string[];
  location?: string[];
  employeeCount?: {
    min?: number;
    max?: number;
  };
  revenue?: {
    min?: number;
    max?: number;
  };
  founded?: {
    min?: number;
    max?: number;
  };
  keywords?: string[];
}

export interface ApolloPersonData {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  title: string;
  email: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
  facebookUrl: string | null;
  phoneNumbers: {
    raw_number: string;
    sanitized_number: string;
    type: string;
    position: number;
    status: string;
  }[];
  employment_history: {
    organization_id: string;
    organization_name: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    current: boolean;
    grade: string;
    kind: string;
    raw_address: string;
  }[];
  organization: ApolloOrganizationData | null;
  confidence: number;
  city: string;
  state: string;
  country: string;
  headline: string;
  seniority: string;
  departments: string[];
  subdepartments: string[];
  functions: string[];
  photo_url: string | null;
  source: 'apollo';
  enrichedAt: Date;
}

export interface ApolloOrganizationData {
  id: string;
  name: string;
  website_url: string;
  blog_url: string | null;
  angellist_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
  primary_phone: {
    number: string;
    source: string;
  } | null;
  languages: string[];
  alexa_ranking: number | null;
  phone: string | null;
  linkedin_uid: string | null;
  founded_year: number | null;
  publicly_traded_symbol: string | null;
  publicly_traded_exchange: string | null;
  logo_url: string | null;
  crunchbase_url: string | null;
  primary_domain: string;
  sanitized_phone: string | null;
  industry: string;
  keywords: string[];
  estimated_num_employees: number;
  industries: string[];
  secondary_industries: string[];
  snippets_loaded: boolean;
  industry_tag_id: number;
  industry_tag_hash: {[key: string]: any};
  retail_location_count: number;
  raw_address: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  owned_by_organization_id: string | null;
  suborganizations: any[];
  num_suborganizations: number;
  seo_description: string;
  short_description: string;
  annual_revenue_printed: string;
  annual_revenue_in_thousands_int: number | null;
  technology_names: string[];
  current_technologies: {
    uid: string;
    name: string;
    category: string;
  }[];
  account_id: string | null;
  account: any | null;
  departmental_head_count: {[key: string]: number};
  // Enrichment-specific fields
  total_funding?: number;
  total_funding_printed?: string;
  latest_funding_round_date?: string;
  latest_funding_stage?: string;
  funding_events?: {
    id: string;
    date: string;
    news_url: string | null;
    type: string;
    investors: string;
    amount: string;
    currency: string;
  }[];
  org_chart_root_people_ids?: string[];
  org_chart_sector?: string;
  generic_org_insights?: any;
  source: 'apollo';
  confidence: number;
  lastUpdated: string;
}

export interface ApolloSearchFilters {
  person_titles?: string[];
  person_locations?: string[];
  person_seniorities?: string[];
  organization_locations?: string[];
  organization_ids?: string[];
  organization_num_employees_ranges?: string[];
  organization_industries?: string[];
  organization_keywords?: string[];
  q_keywords?: string;
  page?: number;
  per_page?: number;
}

export interface ApolloEnrichmentResponse {
  person?: ApolloPersonData;
  organization?: ApolloOrganizationData;
}

export interface ApolloSearchResponse {
  breadcrumbs: any[];
  partial_results_only: boolean;
  disable_eu_prospecting: boolean;
  partial_results_limit: number;
  pagination: {
    page: number;
    per_page: number;
    total_entries: number;
    total_pages: number;
  };
  contacts: ApolloPersonData[];
  people: ApolloPersonData[];
  organizations: ApolloOrganizationData[];
}

export interface ApolloApiError {
  error: string;
  message: string;
  error_code?: string;
}