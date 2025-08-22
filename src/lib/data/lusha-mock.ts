import type {
  PersonData,
  CompanyData,
  ProspectData,
  UsageData,
  BulkEnrichmentJob,
  APIKeyInfo,
  CreditTransaction,
  LeadScore,
  EnrichmentTemplate,
  TeamUsage,
  LushaIntegrationSettings
} from '@/types/lusha';

export const mockPersonData: PersonData[] = [
  {
    id: 'person_001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: ['sarah.johnson@techcorp.com', 's.johnson@gmail.com'],
    phone: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    company: 'TechCorp Solutions',
    title: 'Chief Technology Officer',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson-cto',
    confidence: 95,
    lastUpdated: '2024-01-15T10:30:00Z',
    department: 'Engineering',
    seniority: 'C-Level',
    workEmail: 'sarah.johnson@techcorp.com',
    personalEmail: 's.johnson@gmail.com',
    directPhone: '+1 (555) 123-4567',
    mobilePhone: '+1 (555) 987-6543',
    verified: true,
    source: 'lusha',
    enrichedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 'person_002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: ['m.chen@innovatelab.io'],
    phone: ['+1 (555) 234-5678'],
    company: 'InnovateLab',
    title: 'VP of Product',
    linkedinUrl: 'https://linkedin.com/in/michaelchen-product',
    confidence: 88,
    lastUpdated: '2024-01-14T15:45:00Z',
    department: 'Product',
    seniority: 'VP Level',
    workEmail: 'm.chen@innovatelab.io',
    directPhone: '+1 (555) 234-5678',
    verified: true,
    source: 'lusha',
    enrichedAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    id: 'person_003',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: ['emily.rodriguez@growthco.com', 'emily.r.marketing@gmail.com'],
    phone: ['+1 (555) 345-6789'],
    company: 'GrowthCo Marketing',
    title: 'Director of Marketing',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez-growth',
    confidence: 92,
    lastUpdated: '2024-01-13T08:20:00Z',
    department: 'Marketing',
    seniority: 'Director',
    workEmail: 'emily.rodriguez@growthco.com',
    personalEmail: 'emily.r.marketing@gmail.com',
    directPhone: '+1 (555) 345-6789',
    verified: true,
    source: 'lusha',
    enrichedAt: new Date('2024-01-13T08:20:00Z')
  },
  {
    id: 'person_004',
    firstName: 'David',
    lastName: 'Thompson',
    email: ['d.thompson@financeplus.com'],
    phone: ['+1 (555) 456-7890', '+1 (555) 654-3210'],
    company: 'FinancePlus Corp',
    title: 'Senior Financial Analyst',
    confidence: 76,
    lastUpdated: '2024-01-12T12:15:00Z',
    department: 'Finance',
    seniority: 'Senior',
    workEmail: 'd.thompson@financeplus.com',
    directPhone: '+1 (555) 456-7890',
    mobilePhone: '+1 (555) 654-3210',
    verified: false,
    source: 'lusha',
    enrichedAt: new Date('2024-01-12T12:15:00Z')
  }
];

export const mockCompanyData: CompanyData[] = [
  {
    id: 'company_001',
    name: 'TechCorp Solutions',
    domain: 'techcorp.com',
    industry: 'Software Development',
    size: '500-1000',
    revenue: '$50M-$100M',
    location: {
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      address: '123 Tech Street, San Francisco, CA 94105'
    },
    founded: 2015,
    employees: 750,
    employeeGrowth: 15,
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/company/techcorp-solutions',
      twitter: 'https://twitter.com/techcorpsol',
      facebook: 'https://facebook.com/techcorpsolutions'
    },
    description: 'Leading enterprise software solutions provider specializing in cloud-native applications.',
    logo: 'https://logo.clearbit.com/techcorp.com',
    website: 'https://techcorp.com',
    phone: '+1 (555) 123-0000',
    email: 'info@techcorp.com',
    type: 'Private',
    businessModel: 'B2B SaaS',
    verified: true,
    confidence: 95,
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: 'company_002',
    name: 'InnovateLab',
    domain: 'innovatelab.io',
    industry: 'Technology Consulting',
    size: '100-500',
    revenue: '$10M-$50M',
    location: {
      city: 'Austin',
      state: 'Texas',
      country: 'United States',
      address: '456 Innovation Drive, Austin, TX 78701'
    },
    founded: 2018,
    employees: 250,
    employeeGrowth: 25,
    technologies: ['Python', 'TensorFlow', 'Azure', 'PostgreSQL'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/company/innovatelab',
      twitter: 'https://twitter.com/innovatelab_io'
    },
    description: 'AI and machine learning consulting firm helping enterprises transform their operations.',
    logo: 'https://logo.clearbit.com/innovatelab.io',
    website: 'https://innovatelab.io',
    phone: '+1 (555) 234-0000',
    email: 'hello@innovatelab.io',
    type: 'Private',
    businessModel: 'Consulting',
    verified: true,
    confidence: 88,
    lastUpdated: '2024-01-14T15:45:00Z'
  },
  {
    id: 'company_003',
    name: 'GrowthCo Marketing',
    domain: 'growthco.com',
    industry: 'Marketing & Advertising',
    size: '50-200',
    revenue: '$5M-$10M',
    location: {
      city: 'New York',
      state: 'New York',
      country: 'United States',
      address: '789 Marketing Avenue, New York, NY 10001'
    },
    founded: 2020,
    employees: 125,
    employeeGrowth: 30,
    technologies: ['HubSpot', 'Salesforce', 'Google Analytics', 'Facebook Ads'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/company/growthco-marketing',
      twitter: 'https://twitter.com/growthco_mktg',
      instagram: 'https://instagram.com/growthco'
    },
    description: 'Full-service digital marketing agency specializing in growth hacking and performance marketing.',
    logo: 'https://logo.clearbit.com/growthco.com',
    website: 'https://growthco.com',
    phone: '+1 (555) 345-0000',
    email: 'contact@growthco.com',
    type: 'Private',
    businessModel: 'Agency',
    verified: true,
    confidence: 92,
    lastUpdated: '2024-01-13T08:20:00Z'
  }
];

export const mockProspectData: ProspectData[] = [
  {
    id: 'prospect_001',
    person: mockPersonData[0],
    company: mockCompanyData[0],
    score: 92,
    criteria: {
      titleMatch: true,
      industryMatch: true,
      locationMatch: false,
      seniorityMatch: true,
      companySizeMatch: true
    },
    enrichmentDate: '2024-01-15T10:30:00Z',
    tags: ['hot-lead', 'enterprise', 'tech-decision-maker'],
    notes: 'High-value prospect with budget authority for enterprise solutions.',
    status: 'new'
  },
  {
    id: 'prospect_002',
    person: mockPersonData[1],
    company: mockCompanyData[1],
    score: 78,
    criteria: {
      titleMatch: true,
      industryMatch: false,
      locationMatch: true,
      seniorityMatch: true,
      companySizeMatch: false
    },
    enrichmentDate: '2024-01-14T15:45:00Z',
    tags: ['product-focused', 'mid-market'],
    notes: 'Product leader at growing company, potential for partnership.',
    status: 'qualified'
  },
  {
    id: 'prospect_003',
    person: mockPersonData[2],
    company: mockCompanyData[2],
    score: 85,
    criteria: {
      titleMatch: true,
      industryMatch: true,
      locationMatch: true,
      seniorityMatch: true,
      companySizeMatch: true
    },
    enrichmentDate: '2024-01-13T08:20:00Z',
    tags: ['marketing-leader', 'growth-focused'],
    status: 'contacted'
  }
];

export const mockUsageData: UsageData = {
  totalCredits: 10000,
  usedCredits: 6750,
  remainingCredits: 3250,
  apiCallsToday: 145,
  successRate: 91.5,
  averageResponseTime: 1.2,
  dailyUsage: [
    { date: '2024-01-08', person: 45, company: 20, prospect: 15, total: 80 },
    { date: '2024-01-09', person: 52, company: 18, prospect: 22, total: 92 },
    { date: '2024-01-10', person: 38, company: 25, prospect: 18, total: 81 },
    { date: '2024-01-11', person: 61, company: 15, prospect: 28, total: 104 },
    { date: '2024-01-12', person: 44, company: 30, prospect: 20, total: 94 },
    { date: '2024-01-13', person: 55, company: 22, prospect: 25, total: 102 },
    { date: '2024-01-14', person: 48, company: 28, prospect: 19, total: 95 },
    { date: '2024-01-15', person: 41, company: 16, prospect: 12, total: 69 }
  ],
  monthlyUsage: [
    { month: '2023-10', person: 1200, company: 450, prospect: 380, total: 2030 },
    { month: '2023-11', person: 1150, company: 520, prospect: 420, total: 2090 },
    { month: '2023-12', person: 1300, company: 480, prospect: 350, total: 2130 },
    { month: '2024-01', person: 890, company: 340, prospect: 280, total: 1510 }
  ],
  topFeatures: [
    { feature: 'Person Enrichment', usage: 3840, percentage: 56.9 },
    { feature: 'Company Intelligence', usage: 1620, percentage: 24.0 },
    { feature: 'Prospecting', usage: 945, percentage: 14.0 },
    { feature: 'Bulk Processing', usage: 345, percentage: 5.1 }
  ],
  billingCycle: {
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    renewalDate: '2024-02-01'
  }
};

export const mockBulkJobs: BulkEnrichmentJob[] = [
  {
    id: 'bulk_001',
    name: 'Q1 Lead List Enrichment',
    type: 'person',
    status: 'completed',
    totalRecords: 500,
    processedRecords: 500,
    successfulRecords: 462,
    failedRecords: 38,
    startedAt: '2024-01-15T09:00:00Z',
    completedAt: '2024-01-15T10:45:00Z',
    progress: 100,
    results: mockPersonData.slice(0, 2),
    errors: [
      { row: 23, error: 'Invalid email format', data: { email: 'invalid-email' } },
      { row: 156, error: 'Company not found', data: { company: 'Unknown Corp' } }
    ]
  },
  {
    id: 'bulk_002',
    name: 'Company Database Update',
    type: 'company',
    status: 'processing',
    totalRecords: 250,
    processedRecords: 180,
    successfulRecords: 165,
    failedRecords: 15,
    startedAt: '2024-01-15T11:30:00Z',
    progress: 72,
    estimatedCompletion: '2024-01-15T12:15:00Z'
  },
  {
    id: 'bulk_003',
    name: 'Prospect Research - Tech Sector',
    type: 'prospect',
    status: 'pending',
    totalRecords: 1000,
    processedRecords: 0,
    successfulRecords: 0,
    failedRecords: 0,
    startedAt: '2024-01-15T14:00:00Z',
    progress: 0
  }
];

export const mockAPIKeys: APIKeyInfo[] = [
  {
    id: 'key_001',
    name: 'Production API Key',
    key: 'lsk_live_1234567890abcdef',
    masked: 'lsk_live_••••••••••••cdef',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastUsed: '2024-01-15T10:30:00Z',
    usageCount: 6750,
    rateLimits: {
      daily: 1000,
      monthly: 10000,
      perSecond: 10
    },
    permissions: ['person:read', 'company:read', 'prospect:read', 'bulk:write']
  },
  {
    id: 'key_002',
    name: 'Development API Key',
    key: 'lsk_test_abcdef1234567890',
    masked: 'lsk_test_••••••••••••7890',
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z',
    lastUsed: '2024-01-14T16:20:00Z',
    usageCount: 245,
    rateLimits: {
      daily: 100,
      monthly: 1000,
      perSecond: 5
    },
    permissions: ['person:read', 'company:read']
  }
];

export const mockCreditTransactions: CreditTransaction[] = [
  {
    id: 'txn_001',
    type: 'used',
    amount: -25,
    feature: 'person',
    description: 'Person enrichment batch (25 contacts)',
    timestamp: '2024-01-15T10:30:00Z',
    remainingCredits: 3250
  },
  {
    id: 'txn_002',
    type: 'used',
    amount: -45,
    feature: 'bulk',
    description: 'Bulk person enrichment job',
    timestamp: '2024-01-15T09:15:00Z',
    remainingCredits: 3275
  },
  {
    id: 'txn_003',
    type: 'added',
    amount: 5000,
    feature: 'person',
    description: 'Monthly credit renewal',
    timestamp: '2024-01-01T00:00:00Z',
    remainingCredits: 8250
  }
];

export const mockLeadScores: LeadScore[] = [
  {
    overall: 92,
    factors: {
      titleRelevance: 95,
      companySize: 88,
      industry: 90,
      seniority: 100,
      contactability: 85
    },
    reasoning: [
      'CTO title indicates technical decision-making authority',
      'Company size (500-1000) fits target market',
      'Software development industry aligns with product',
      'C-level seniority provides budget authority',
      'Multiple verified contact methods available'
    ],
    recommendation: 'high'
  },
  {
    overall: 78,
    factors: {
      titleRelevance: 85,
      companySize: 75,
      industry: 70,
      seniority: 90,
      contactability: 70
    },
    reasoning: [
      'VP Product role relevant for product discussions',
      'Mid-size company (100-500) may have budget constraints',
      'Consulting industry somewhat aligned',
      'VP-level authority for product decisions',
      'Single contact method verified'
    ],
    recommendation: 'medium'
  }
];

export const mockTemplates: EnrichmentTemplate[] = [
  {
    id: 'template_001',
    name: 'C-Level Technology Leaders',
    description: 'Target CTOs, CIOs, and VP Engineering at technology companies',
    type: 'prospect',
    fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'title', 'linkedinUrl'],
    filters: {
      jobTitles: ['CTO', 'Chief Technology Officer', 'CIO', 'VP Engineering'],
      industries: ['Software Development', 'Technology', 'SaaS'],
      companySizes: ['100-500', '500-1000', '1000+'],
      seniorities: ['C-Level', 'VP Level']
    },
    isDefault: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastUsed: '2024-01-15T10:30:00Z',
    usageCount: 45
  },
  {
    id: 'template_002',
    name: 'Marketing Directors - SaaS',
    description: 'Marketing decision makers at SaaS companies',
    type: 'prospect',
    fields: ['firstName', 'lastName', 'email', 'company', 'title', 'department'],
    filters: {
      jobTitles: ['Marketing Director', 'VP Marketing', 'CMO'],
      industries: ['SaaS', 'Software', 'Technology'],
      departments: ['Marketing'],
      seniorities: ['Director', 'VP Level', 'C-Level']
    },
    isDefault: false,
    createdAt: '2024-01-05T00:00:00Z',
    lastUsed: '2024-01-13T08:20:00Z',
    usageCount: 28
  }
];

export const mockTeamUsage: TeamUsage[] = [
  {
    userId: 'user_001',
    userName: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Sales Manager',
    creditsUsed: 2450,
    apiCalls: 1840,
    successRate: 94.2,
    topFeatures: ['Person Enrichment', 'Company Intelligence'],
    lastActivity: '2024-01-15T10:30:00Z'
  },
  {
    userId: 'user_002',
    userName: 'Lisa Chen',
    email: 'lisa.chen@company.com',
    role: 'Marketing Manager',
    creditsUsed: 1890,
    apiCalls: 1420,
    successRate: 89.1,
    topFeatures: ['Prospecting', 'Bulk Processing'],
    lastActivity: '2024-01-15T09:15:00Z'
  },
  {
    userId: 'user_003',
    userName: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Business Development',
    creditsUsed: 2410,
    apiCalls: 1950,
    successRate: 91.8,
    topFeatures: ['Person Enrichment', 'Prospecting'],
    lastActivity: '2024-01-14T16:45:00Z'
  }
];

export const mockIntegrationSettings: LushaIntegrationSettings = {
  apiKey: 'lsk_live_1234567890abcdef',
  webhookUrl: 'https://your-app.com/webhook/lusha',
  autoSync: true,
  syncFrequency: 'daily',
  dataRetention: 90,
  defaultFields: ['firstName', 'lastName', 'email', 'phone', 'company', 'title'],
  notifications: {
    lowCredits: true,
    bulkJobComplete: true,
    errors: true
  }
};