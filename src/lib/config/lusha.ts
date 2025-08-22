export const LUSHA_CONFIG = {
  // Use proxy endpoints instead of direct Lusha API
  API_BASE_URL: '/api/lusha',
  API_KEY: process.env.LUSHA_API_KEY || process.env.NEXT_PUBLIC_LUSHA_API_KEY || 'your-real-lusha-api-key-here',
  RATE_LIMIT: {
    REQUESTS_PER_SECOND: 50,
    BULK_REQUEST_DELAY: 100, // ms between bulk requests
  },
  DEFAULT_LIMITS: {
    PERSON_SEARCH: 100,
    COMPANY_SEARCH: 100,
    PROSPECT_SEARCH: 50,
  },
  ENDPOINTS: {
    PERSON: '/person',
    COMPANY: '/company',
    PROSPECT: '/prospect',
    USAGE: '/usage',
    BULK_PERSON: '/person', // Same as person endpoint for bulk
    PROSPECTING_CONTACT_SEARCH: '/prospecting/contact/search',
    PROSPECTING_COMPANY_SEARCH: '/prospecting/company/search',
    PROSPECTING_CONTACT_ENRICH: '/prospecting/contact/enrich',
    PROSPECTING_COMPANY_ENRICH: '/prospecting/company/enrich',
  }
} as const;

export type LushaConfig = typeof LUSHA_CONFIG;