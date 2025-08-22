// Dashboard Stats
export const dashboardStats = [
  {
    title: "Total Visitors",
    value: "145k",
    description: "Monthly",
    trend: { value: 8, isPositive: true },
    iconColor: "blue",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    description: "Avg. per session",
    trend: { value: 5, isPositive: true },
    iconColor: "indigo",
  },
  {
    title: "Avg. Session",
    value: "2:15",
    description: "Duration (min:sec)",
    trend: { value: 7, isPositive: true },
    iconColor: "amber",
  },
  {
    title: "Bounce Rate",
    value: "42%",
    description: "Single-page visits",
    trend: { value: 3, isPositive: false },
    iconColor: "green",
  },
];

// Tag Firing Data for Area Chart
export const tagFiringData = [
  {
    name: "Jan",
    Events: 12000,
    Successful: 11800,
  },
  {
    name: "Feb",
    Events: 18000,
    Successful: 17600,
  },
  {
    name: "Mar",
    Events: 16000,
    Successful: 15600,
  },
  {
    name: "Apr",
    Events: 22000,
    Successful: 21300,
  },
  {
    name: "May",
    Events: 19000,
    Successful: 18400,
  },
  {
    name: "Jun",
    Events: 28000,
    Successful: 27000,
  },
  {
    name: "Jul",
    Events: 26000,
    Successful: 25200,
  },
  {
    name: "Aug",
    Events: 32000,
    Successful: 31100,
  },
  {
    name: "Sep",
    Events: 35000,
    Successful: 34000,
  },
  {
    name: "Oct",
    Events: 38000,
    Successful: 36800,
  },
  {
    name: "Nov",
    Events: 33000,
    Successful: 32000,
  },
  {
    name: "Dec",
    Events: 41000,
    Successful: 39800,
  },
];

// Categories for Tag Firing Chart
export const tagFiringCategories = [
  {
    name: "Events",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "Successful",
    color: "hsl(160, 60%, 45%)",
  },
];

// Geolocation Data for Bar Chart
export const geoLocationData = [
  {
    name: "US",
    Users: 14200,
  },
  {
    name: "UK",
    Users: 8900,
  },
  {
    name: "Germany",
    Users: 7600,
  },
  {
    name: "France",
    Users: 5800,
  },
  {
    name: "Japan",
    Users: 4700,
  },
  {
    name: "Canada",
    Users: 4200,
  },
  {
    name: "Other",
    Users: 9800,
  },
];

// Categories for Geolocation Chart
export const geoLocationCategories = [
  {
    name: "Users",
    color: "hsl(220, 70%, 50%)",
  },
];

// Container Versions Data
export const containerVersions = [
  {
    id: "v1.5.3",
    name: "Production",
    status: "Published",
    health: 98,
    healthText: "98%",
  },
  {
    id: "v1.5.2",
    name: "Staging",
    status: "Testing",
    health: 85,
    healthText: "85%",
  },
  {
    id: "v1.6.0-beta",
    name: "Development",
    status: "Draft",
    health: 65,
    healthText: "65%",
  },
  {
    id: "v1.4.9",
    name: "Archive",
    status: "Inactive",
    health: 100,
    healthText: "100%",
  },
];

// User Overview Data for Area Chart
export const userOverviewData = {
  daily: [
    { name: "Mon", Total: 3800, Returning: 2600, New: 1200 },
    { name: "Tue", Total: 4200, Returning: 2900, New: 1300 },
    { name: "Wed", Total: 4500, Returning: 3100, New: 1400 },
    { name: "Thu", Total: 5100, Returning: 3500, New: 1600 },
    { name: "Fri", Total: 5800, Returning: 3900, New: 1900 },
    { name: "Sat", Total: 4200, Returning: 2700, New: 1500 },
    { name: "Sun", Total: 3600, Returning: 2300, New: 1300 }
  ],
  weekly: [
    { name: "Week 1", Total: 12000, Returning: 7200, New: 4800 },
    { name: "Week 2", Total: 14500, Returning: 9800, New: 4700 },
    { name: "Week 3", Total: 16800, Returning: 11200, New: 5600 },
    { name: "Week 4", Total: 15300, Returning: 10700, New: 4600 }
  ],
  monthly: [
    { name: "Jan", Total: 48000, Returning: 28800, New: 19200 },
    { name: "Feb", Total: 52000, Returning: 31200, New: 20800 },
    { name: "Mar", Total: 59000, Returning: 35400, New: 23600 },
    { name: "Apr", Total: 61000, Returning: 36600, New: 24400 },
    { name: "May", Total: 65000, Returning: 39000, New: 26000 },
    { name: "Jun", Total: 72000, Returning: 43200, New: 28800 }
  ]
};

// Categories for User Overview Chart
export const userOverviewCategories = [
  {
    name: "Total",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "Returning",
    color: "hsl(160, 60%, 45%)",
  },
  {
    name: "New",
    color: "hsl(280, 65%, 60%)",
  },
];

// Traffic Overview Data
export const trafficOverviewData = [
  {
    name: "Jan",
    DirectTraffic: 25000,
    OrganicSearch: 42000,
    SocialMedia: 18000,
    EmailMarketing: 12000,
    Referral: 8000
  },
  {
    name: "Feb",
    DirectTraffic: 28000,
    OrganicSearch: 44000,
    SocialMedia: 20000,
    EmailMarketing: 15000,
    Referral: 9000
  },
  {
    name: "Mar",
    DirectTraffic: 32000,
    OrganicSearch: 48000,
    SocialMedia: 25000,
    EmailMarketing: 18000,
    Referral: 11000
  },
  {
    name: "Apr",
    DirectTraffic: 35000,
    OrganicSearch: 52000,
    SocialMedia: 28000,
    EmailMarketing: 20000,
    Referral: 13000
  },
  {
    name: "May",
    DirectTraffic: 38000,
    OrganicSearch: 55000,
    SocialMedia: 30000,
    EmailMarketing: 22000,
    Referral: 14000
  },
  {
    name: "Jun",
    DirectTraffic: 42000,
    OrganicSearch: 58000,
    SocialMedia: 32000,
    EmailMarketing: 25000,
    Referral: 15000
  }
];

// Traffic Overview Categories
export const trafficOverviewCategories = [
  {
    name: "OrganicSearch",
    color: "hsl(220, 70%, 50%)"
  },
  {
    name: "DirectTraffic",
    color: "hsl(160, 60%, 45%)"
  },
  {
    name: "SocialMedia",
    color: "hsl(280, 65%, 60%)"
  },
  {
    name: "EmailMarketing",
    color: "hsl(30, 70%, 50%)"
  },
  {
    name: "Referral",
    color: "hsl(340, 65%, 60%)"
  }
];

// Traffic Sources Data (for pie chart)
export const trafficSourcesData = [
  {
    name: "Organic Search",
    value: 42,
    color: "hsl(220, 70%, 50%)"
  },
  {
    name: "Direct Traffic",
    value: 28,
    color: "hsl(160, 60%, 45%)"
  },
  {
    name: "Social Media",
    value: 15,
    color: "hsl(280, 65%, 60%)"
  },
  {
    name: "Email Marketing",
    value: 10,
    color: "hsl(30, 70%, 50%)"
  },
  {
    name: "Referral",
    value: 5,
    color: "hsl(340, 65%, 60%)"
  }
];

// Recent Activity Log
export const recentActivityLog = [
  {
    id: "act-001",
    event: "Tag Update",
    description: "Google Analytics 4 configuration updated",
    timestamp: "12 minutes ago",
    status: "success",
  },
  {
    id: "act-002",
    event: "Container Published",
    description: "Version 1.5.3 deployed to production",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "act-003",
    event: "Consent Banner",
    description: "EU consent rates improved by 15%",
    timestamp: "3 hours ago",
    status: "success",
  },
  {
    id: "act-004",
    event: "Error Detected",
    description: "Facebook pixel failed on checkout page",
    timestamp: "5 hours ago",
    status: "error",
  },
  {
    id: "act-005",
    event: "Data Source",
    description: "New CRM data source connected",
    timestamp: "1 day ago",
    status: "success",
  },
];

// Key Metrics Data
export const keyMetricsData = {
  conversion: {
    current: 3.2,
    previous: 2.8,
    trend: 14.3, // percentage increase
    isPositive: true,
    history: [
      { month: 'Jan', value: 2.4 },
      { month: 'Feb', value: 2.6 },
      { month: 'Mar', value: 2.8 },
      { month: 'Apr', value: 2.7 },
      { month: 'May', value: 3.0 },
      { month: 'Jun', value: 3.2 }
    ]
  },
  engagement: {
    current: 58.7,
    previous: 52.3,
    trend: 12.2,
    isPositive: true,
    history: [
      { month: 'Jan', value: 48.2 },
      { month: 'Feb', value: 50.5 },
      { month: 'Mar', value: 52.3 },
      { month: 'Apr', value: 54.1 },
      { month: 'May', value: 56.4 },
      { month: 'Jun', value: 58.7 }
    ]
  },
  retention: {
    current: 42.5,
    previous: 45.1,
    trend: 5.8,
    isPositive: false,
    history: [
      { month: 'Jan', value: 45.1 },
      { month: 'Feb', value: 44.8 },
      { month: 'Mar', value: 44.2 },
      { month: 'Apr', value: 43.5 },
      { month: 'May', value: 43.0 },
      { month: 'Jun', value: 42.5 }
    ]
  }
};

// Channel Activity Data
export const channelActivityData = [
  {
    channel: "Web App",
    "00:00-04:00": 820,
    "04:00-08:00": 1290,
    "08:00-12:00": 3920,
    "12:00-16:00": 4570,
    "16:00-20:00": 3960,
    "20:00-24:00": 2340
  },
  {
    channel: "Mobile App",
    "00:00-04:00": 1320,
    "04:00-08:00": 1590,
    "08:00-12:00": 4200,
    "12:00-16:00": 4800,
    "16:00-20:00": 5670,
    "20:00-24:00": 3890
  },
  {
    channel: "Social Media",
    "00:00-04:00": 1540,
    "04:00-08:00": 920,
    "08:00-12:00": 2600,
    "12:00-16:00": 2800,
    "16:00-20:00": 3200,
    "20:00-24:00": 2700
  },
  {
    channel: "Email",
    "00:00-04:00": 420,
    "04:00-08:00": 890,
    "08:00-12:00": 2300,
    "12:00-16:00": 1950,
    "16:00-20:00": 1680,
    "20:00-24:00": 750
  }
];

// Channel Distribution Data
export const channelDistributionData = [
  { channel: "Web App", users: 35 },
  { channel: "Mobile App", users: 40 },
  { channel: "Social Media", users: 15 },
  { channel: "Email", users: 10 }
];

// Consent Performance Data
export const consentPerformanceData = [
  {
    category: "Accept All",
    percentage: 62,
  },
  {
    category: "Accept Selected",
    percentage: 23,
  },
  {
    category: "Reject All",
    percentage: 15,
  },
];