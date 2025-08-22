export interface PersonData {
  id: string;
  firstName: string;
  lastName: string;
  email: string[];
  phone: string[];
  company: string;
  title: string;
  linkedinUrl?: string;
  confidence: number;
  lastUpdated: string;
  department?: string;
  seniority?: string;
  workEmail?: string;
  personalEmail?: string;
  directPhone?: string;
  mobilePhone?: string;
  verified: boolean;
  source: 'lusha';
  enrichedAt: Date;
}

export interface CompanyData {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  revenue: string;
  location: {
    city: string;
    state?: string;
    country: string;
    address?: string;
  };
  founded: number;
  employees: number;
  employeeGrowth?: number;
  technologies: string[];
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  description?: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  type?: 'Public' | 'Private' | 'Non-profit';
  businessModel?: string;
  verified: boolean;
  confidence: number;
  lastUpdated: string;
}

export interface ProspectData {
  id: string;
  person: PersonData;
  company: CompanyData;
  score: number;
  criteria: {
    titleMatch: boolean;
    industryMatch: boolean;
    locationMatch: boolean;
    seniorityMatch?: boolean;
    companySizeMatch?: boolean;
  };
  enrichmentDate: string;
  tags?: string[];
  notes?: string;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'converted';
}

export interface UsageData {
  totalCredits: number;
  usedCredits: number;
  dailyUsage: Array<{
    date: string;
    person: number;
    company: number;
    prospect: number;
    total: number;
  }>;
  monthlyUsage: Array<{
    month: string;
    person: number;
    company: number;
    prospect: number;
    total: number;
  }>;
  apiCallsToday: number;
  successRate: number;
  averageResponseTime: number;
  topFeatures: Array<{
    feature: string;
    usage: number;
    percentage: number;
  }>;
  remainingCredits: number;
  billingCycle: {
    startDate: string;
    endDate: string;
    renewalDate: string;
  };
}

export interface PersonSearchData {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  linkedinUrl?: string;
  domain?: string;
}

export interface CompanySearchData {
  name?: string;
  domain?: string;
  industry?: string;
  location?: string;
  size?: string;
  revenue?: string;
}

export interface ProspectingFilters {
  industries?: string[];
  locations?: string[];
  companySizes?: string[];
  revenues?: string[];
  jobTitles?: string[];
  seniorities?: string[];
  departments?: string[];
  technologies?: string[];
  keywords?: string[];
  excludeCompanies?: string[];
  excludeIndustries?: string[];
  limit?: number;
  offset?: number;
}

export interface BulkEnrichmentJob {
  id: string;
  name: string;
  type: 'person' | 'company' | 'prospect';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  startedAt: string;
  completedAt?: string;
  progress: number;
  estimatedCompletion?: string;
  results?: Array<PersonData | CompanyData | ProspectData>;
  errors?: Array<{
    row: number;
    error: string;
    data: any;
  }>;
}

export interface APIKeyInfo {
  id: string;
  name: string;
  key: string;
  masked: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  rateLimits: {
    daily: number;
    monthly: number;
    perSecond: number;
  };
  permissions: string[];
}

export interface CreditTransaction {
  id: string;
  type: 'used' | 'added' | 'refunded';
  amount: number;
  feature: 'person' | 'company' | 'prospect' | 'bulk';
  description: string;
  timestamp: string;
  remainingCredits: number;
}

export interface LeadScore {
  overall: number;
  factors: {
    titleRelevance: number;
    companySize: number;
    industry: number;
    seniority: number;
    contactability: number;
  };
  reasoning: string[];
  recommendation: 'high' | 'medium' | 'low';
}

export interface EnrichmentTemplate {
  id: string;
  name: string;
  description: string;
  type: 'person' | 'company' | 'prospect';
  fields: string[];
  filters: ProspectingFilters;
  isDefault: boolean;
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
}

export interface TeamUsage {
  userId: string;
  userName: string;
  email: string;
  role: string;
  creditsUsed: number;
  apiCalls: number;
  successRate: number;
  topFeatures: string[];
  lastActivity: string;
}

export interface LushaIntegrationSettings {
  apiKey: string;
  webhookUrl?: string;
  autoSync: boolean;
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  dataRetention: number; // days
  defaultFields: string[];
  notifications: {
    lowCredits: boolean;
    bulkJobComplete: boolean;
    errors: boolean;
  };
}