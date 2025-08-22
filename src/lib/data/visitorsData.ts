// Sample data for Visitors page

// Overview tab data
export const activeSampleUsers = [
  { id: 'u_28492', location: 'New York, US', timeOnSite: '4:32', currentPage: '/pricing', device: 'desktop', browser: 'Chrome', events: 28, lastEvent: 'Clicked "Enterprise Plan"' },
  { id: 'anon_47281', location: 'London, UK', timeOnSite: '1:15', currentPage: '/features', device: 'mobile', browser: 'Safari', events: 12, lastEvent: 'Scrolled to "Integrations"' },
  { id: 'u_59372', location: 'Tokyo, JP', timeOnSite: '8:47', currentPage: '/checkout', device: 'tablet', browser: 'Firefox', events: 45, lastEvent: 'Submitted payment info' },
  { id: 'anon_61043', location: 'Berlin, DE', timeOnSite: '0:42', currentPage: '/blog/new-features', device: 'mobile', browser: 'Chrome', events: 5, lastEvent: 'Viewed article' },
];

export const funnelData = {
  steps: [
    { name: 'Landing Page', users: 10000, dropOff: 20 },
    { name: 'Product View', users: 8000, dropOff: 25 },
    { name: 'Add to Cart', users: 6000, dropOff: 30 },
    { name: 'Checkout', users: 4200, dropOff: 20 },
    { name: 'Purchase', users: 3360, dropOff: 0 },
  ],
  conversionRate: 33.6,
  avgTimeToConvert: '45:22',
  compareLastPeriod: '+5.2%',
};

export const pagePerformanceData = [
  { path: '/home', views: 12500, engagementScore: 8.7, avgTimeOnPage: '2:45', exitRate: 15, scrollDepth: 85 },
  { path: '/features', views: 8750, engagementScore: 9.2, avgTimeOnPage: '4:12', exitRate: 12, scrollDepth: 92 },
  { path: '/pricing', views: 6200, engagementScore: 7.8, avgTimeOnPage: '3:30', exitRate: 18, scrollDepth: 65 },
  { path: '/blog', views: 4300, engagementScore: 6.5, avgTimeOnPage: '2:20', exitRate: 25, scrollDepth: 70 },
  { path: '/signup', views: 3100, engagementScore: 9.5, avgTimeOnPage: '1:50', exitRate: 8, scrollDepth: 100 },
];

export const trafficSourcesData = [
  { source: 'Organic Search', sessions: 8500, convRate: 4.2, engagementScore: 7.8, avgSessionDuration: '3:25' },
  { source: 'Direct', sessions: 6200, convRate: 5.7, engagementScore: 8.5, avgSessionDuration: '4:10' },
  { source: 'Social Media', sessions: 4800, convRate: 3.1, engagementScore: 6.2, avgSessionDuration: '2:15' },
  { source: 'Referral', sessions: 3200, convRate: 6.5, engagementScore: 8.2, avgSessionDuration: '3:45' },
  { source: 'Email', sessions: 2800, convRate: 7.8, engagementScore: 9.1, avgSessionDuration: '5:20' },
];

export const recentEvents = [
  { time: '10:45:28', user: 'u_28492', type: 'click', element: 'Enterprise Plan Button', page: '/pricing' },
  { time: '10:45:22', user: 'anon_47281', type: 'scroll', element: 'Integrations Section', page: '/features' },
  { time: '10:45:15', user: 'u_59372', type: 'form_submit', element: 'Payment Form', page: '/checkout' },
  { time: '10:45:08', user: 'anon_61043', type: 'page_view', element: 'Blog Article', page: '/blog/new-features' },
];

export const frictionPointsData = [
  { page: '/signup', issue: 'Form validation errors', severity: 'high', sessions: 245, impact: 'High drop-off after 3 attempts' },
  { page: '/pricing', issue: 'Rage clicks on Subscribe button', severity: 'medium', sessions: 132, impact: 'Users not seeing the CTA' },
  { page: '/checkout', issue: 'Payment processing slow', severity: 'high', sessions: 87, impact: 'Cart abandonment spike' },
];

export const systemAlertsData = [
  { time: '10:32 AM', type: 'error', message: 'JS errors on checkout page', impact: 'High', affectedUsers: 32 },
  { time: '09:45 AM', type: 'performance', message: 'Slow page load on product listings', impact: 'Medium', affectedUsers: 156 },
];

export const retentionData = [
  { day: 1, rate: 100, users: 3245 },
  { day: 3, rate: 72, users: 2336 },
  { day: 7, rate: 48, users: 1558 },
  { day: 14, rate: 36, users: 1168 },
  { day: 30, rate: 24, users: 779 },
];

// User Journeys tab data
export const userJourneysData = {
  segments: [
    {
      name: "New Visitors",
      count: 5240,
      conversion: 12.5,
      paths: [
        { sequence: ["Homepage", "Features", "Pricing", "Sign Up"], users: 320, conversionRate: 28.4 },
        { sequence: ["Blog", "Homepage", "Demo", "Sign Up"], users: 245, conversionRate: 22.8 },
        { sequence: ["Homepage", "Pricing", "Exit"], users: 875, conversionRate: 0 }
      ],
      avgTimeToConvert: "1d 5h"
    },
    {
      name: "Returning Visitors",
      count: 3850,
      conversion: 24.8,
      paths: [
        { sequence: ["Homepage", "Login", "Dashboard"], users: 1650, conversionRate: 42.5 },
        { sequence: ["Email Link", "Product", "Checkout"], users: 780, conversionRate: 65.2 },
        { sequence: ["Homepage", "Support", "Knowledge Base"], users: 520, conversionRate: 12.1 }
      ],
      avgTimeToConvert: "5h 24m"
    },
    {
      name: "High-Value Prospects",
      count: 1280,
      conversion: 38.5,
      paths: [
        { sequence: ["Enterprise Page", "Contact Sales", "Demo", "Proposal"], users: 320, conversionRate: 72.5 },
        { sequence: ["Pricing", "Enterprise", "Contact Form"], users: 245, conversionRate: 45.2 },
        { sequence: ["Pricing", "Comparison", "Exit"], users: 180, conversionRate: 0 }
      ],
      avgTimeToConvert: "3d 8h"
    }
  ],
  touchpoints: [
    { name: "Homepage", visits: 9560, conversion: 12.3, value: "High" },
    { name: "Features", visits: 6250, conversion: 8.7, value: "Medium" },
    { name: "Pricing", visits: 7820, conversion: 15.2, value: "Very High" },
    { name: "Blog", visits: 4230, conversion: 3.8, value: "Low" },
    { name: "Demo", visits: 2840, conversion: 28.3, value: "Very High" },
    { name: "Contact Form", visits: 980, conversion: 36.5, value: "High" }
  ]
};

// Conversion tab data
export const conversionTabData = {
  funnelStages: [
    { name: "Visitor", count: 12500, conversionRate: 48.5, previousRate: 45.2, change: 3.3 },
    { name: "Lead", count: 6060, conversionRate: 25.4, previousRate: 22.8, change: 2.6 },
    { name: "MQL", count: 1540, conversionRate: 65.8, previousRate: 62.1, change: 3.7 },
    { name: "SQL", count: 1012, conversionRate: 42.5, previousRate: 40.2, change: 2.3 },
    { name: "Opportunity", count: 430, conversionRate: 78.6, previousRate: 75.3, change: 3.3 },
    { name: "Customer", count: 338, conversionRate: 100, previousRate: 100, change: 0 }
  ],
  conversionBySource: [
    { source: "Organic Search", leadConversion: 2.4, opportunityConversion: 18.5, customerConversion: 65.2 },
    { source: "Paid Search", leadConversion: 4.5, opportunityConversion: 22.3, customerConversion: 58.7 },
    { source: "Social", leadConversion: 3.2, opportunityConversion: 12.8, customerConversion: 45.3 },
    { source: "Email", leadConversion: 8.7, opportunityConversion: 35.2, customerConversion: 72.6 },
    { source: "Direct", leadConversion: 5.3, opportunityConversion: 24.5, customerConversion: 62.1 }
  ],
  conversionByCountry: [
    { country: "United States", conversionRate: 4.8, changeVsPrevious: 0.5 },
    { country: "United Kingdom", conversionRate: 3.9, changeVsPrevious: 0.3 },
    { country: "Germany", conversionRate: 3.2, changeVsPrevious: -0.2 },
    { country: "France", conversionRate: 2.8, changeVsPrevious: 0.4 },
    { country: "Japan", conversionRate: 4.5, changeVsPrevious: 1.2 }
  ],
  conversionByDevice: {
    desktop: { visitors: 7250, conversionRate: 4.2 },
    mobile: { visitors: 3850, conversionRate: 2.8 },
    tablet: { visitors: 1400, conversionRate: 3.5 }
  }
};

// Pages tab data
export const pagesTabData = {
  topPages: [
    { url: "/home", views: 12500, bounceRate: 35, avgTime: "2:45", conversionRate: 2.8 },
    { url: "/pricing", views: 8750, bounceRate: 28, avgTime: "3:12", conversionRate: 4.5 },
    { url: "/features", views: 6250, bounceRate: 32, avgTime: "4:05", conversionRate: 3.2 },
    { url: "/blog/top-trends", views: 4500, bounceRate: 65, avgTime: "1:42", conversionRate: 0.8 },
    { url: "/contact", views: 3250, bounceRate: 25, avgTime: "2:10", conversionRate: 12.5 }
  ],
  contentPerformance: [
    { title: "2023 Industry Report", type: "PDF", downloads: 1250, leads: 320, conversionRate: 25.6 },
    { title: "Product Demo Video", type: "Video", views: 4500, avgWatchTime: "4:25", completionRate: 68 },
    { title: "Ultimate Guide", type: "Blog", views: 8250, avgReadTime: "5:10", shares: 245 },
    { title: "Case Study: Enterprise", type: "PDF", downloads: 950, leads: 210, conversionRate: 22.1 },
    { title: "ROI Calculator", type: "Tool", uses: 3200, leads: 840, conversionRate: 26.2 }
  ],
  exitPages: [
    { url: "/pricing", exits: 2450, exitRate: 28, previousVisits: 2.3 },
    { url: "/blog", exits: 2850, exitRate: 65, previousVisits: 1.2 },
    { url: "/contact", exits: 1250, exitRate: 38, previousVisits: 3.5 },
    { url: "/about", exits: 950, exitRate: 42, previousVisits: 1.8 },
    { url: "/features", exits: 1850, exitRate: 30, previousVisits: 2.1 }
  ],
  searchQueries: [
    { term: "pricing", searches: 845, clickThrough: 92 },
    { term: "features", searches: 720, clickThrough: 88 },
    { term: "support", searches: 650, clickThrough: 75 },
    { term: "login", searches: 1250, clickThrough: 95 },
    { term: "enterprise", searches: 320, clickThrough: 82 }
  ]
};

// Events tab data
export const eventsTabData = {
  recentEvents: [
    { timestamp: "2023-05-20T10:45:28", sessionId: "sess_28492", userId: "u_28492", event: "click", element: "Enterprise Plan Button", page: "/pricing", device: "desktop" },
    { timestamp: "2023-05-20T10:45:22", sessionId: "sess_47281", userId: "anon_47281", event: "scroll", element: "Integrations Section", page: "/features", device: "mobile" },
    { timestamp: "2023-05-20T10:45:15", sessionId: "sess_59372", userId: "u_59372", event: "form_submit", element: "Payment Form", page: "/checkout", device: "tablet" },
    { timestamp: "2023-05-20T10:45:08", sessionId: "sess_61043", userId: "anon_61043", event: "page_view", element: null, page: "/blog/new-features", device: "mobile" },
    { timestamp: "2023-05-20T10:44:52", sessionId: "sess_73921", userId: "u_73921", event: "video_play", element: "Product Demo", page: "/features", device: "desktop" }
  ],
  popularEvents: [
    { event: "page_view", count: 25840, uniqueUsers: 12450, conversionImpact: "medium" },
    { event: "click_cta", count: 8250, uniqueUsers: 6320, conversionImpact: "high" },
    { event: "form_start", count: 4580, uniqueUsers: 3840, conversionImpact: "high" },
    { event: "form_submit", count: 2340, uniqueUsers: 2340, conversionImpact: "very high" },
    { event: "video_play", count: 3850, uniqueUsers: 2950, conversionImpact: "medium" }
  ],
  errorEvents: [
    { error: "Payment Processing Failed", occurrences: 245, affectedUsers: 245, impactLevel: "high", firstSeen: "2023-05-18T14:25:10" },
    { error: "Form Validation Error", occurrences: 890, affectedUsers: 720, impactLevel: "medium", firstSeen: "2023-05-17T09:12:35" },
    { error: "API Timeout", occurrences: 120, affectedUsers: 120, impactLevel: "high", firstSeen: "2023-05-19T16:42:08" },
    { error: "Resource Not Found", occurrences: 78, affectedUsers: 78, impactLevel: "low", firstSeen: "2023-05-20T08:15:23" }
  ],
  conversionEvents: [
    { event: "sign_up_complete", count: 1250, conversionRate: 2.8, avgTimeToConvert: "1d 4h" },
    { event: "free_trial_start", count: 850, conversionRate: 1.9, avgTimeToConvert: "5h 25m" },
    { event: "demo_request", count: 450, conversionRate: 1.0, avgTimeToConvert: "3h 15m" },
    { event: "purchase_complete", count: 380, conversionRate: 0.8, avgTimeToConvert: "3d 7h" }
  ]
};