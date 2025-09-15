// Apollo.io API Configuration

export const APOLLO_CONFIG = {
  API_BASE_URL: 'https://api.apollo.io',
  API_KEY: 'CkMrfH_yEtIlyF3_uJIuqA',
  
  ENDPOINTS: {
    MIXED_PEOPLE_SEARCH: '/api/v1/mixed_people/search',
    CONTACTS_SEARCH: '/api/v1/contacts/search',
    ACCOUNTS_SEARCH: '/api/v1/accounts/search', 
    ORGANIZATIONS_SEARCH: '/api/v1/organizations/search',
    ORGANIZATIONS_ENRICH: '/api/v1/organizations/enrich',
    ORGANIZATIONS_BULK_ENRICH: '/api/v1/organizations/bulk_enrich',
    PEOPLE_MATCH: '/api/v1/people/match',
    USAGE: '/api/v1/usage'
  },
  
  DEFAULT_LIMITS: {
    PEOPLE_SEARCH: 25,
    ORGANIZATIONS_SEARCH: 25,
    MAX_PER_PAGE: 100
  },
  
  RATE_LIMITS: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 10000
  },
  
  TIMEOUT: 30000, // 30 seconds
  
  // Common organization size ranges
  ORGANIZATION_SIZES: {
    '1,10': '1-10',
    '11,50': '11-50', 
    '51,200': '51-200',
    '201,500': '201-500',
    '501,1000': '501-1000',
    '1001,5000': '1001-5000',
    '5001,10000': '5001-10000',
    '10001+': '10001+'
  },
  
  // Common seniority levels
  SENIORITIES: {
    'c_suite': 'C-Suite',
    'founder': 'Founder',
    'owner': 'Owner',
    'partner': 'Partner',
    'vp': 'VP',
    'head': 'Head',
    'director': 'Director',
    'manager': 'Manager',
    'senior': 'Senior',
    'entry': 'Entry Level',
    'intern': 'Intern',
    'training': 'Training',
    'unpaid': 'Unpaid'
  }
} as const;

export default APOLLO_CONFIG;