// TOFU (Top of Funnel) Product Page Data

export const tofuMetrics = {
  visitors: 23456,
  visitorsTrend: 18.4,
  sessions: 45678,
  sessionsTrend: 23.6,
  avgSessionDuration: '00:02:45',
  durationTrend: -5.2,
  bounceRate: 45.3,
  bounceRateTrend: -3.8
};

export const trafficSourcesData = {
  labels: ['Direct', 'Google', 'Social', 'Referral', 'Email'],
  data: [35, 28, 20, 12, 5]
};

export const visitorTrendData = {
  labels: ['May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12', 'May 13', 'May 14'],
  visitors: [35, 42, 52, 48, 58, 64, 56, 72, 80, 78],
  sessions: [42, 48, 58, 52, 64, 72, 62, 78, 88, 85]
};

export const contentPerformanceData = [
  {
    title: "Ultimate Guide to Product Management",
    type: "Blog Post",
    views: 5234,
    avgTime: "00:03:45",
    scrollDepth: 78,
    shares: 234,
    downloads: 0
  },
  {
    title: "2024 Industry Report",
    type: "Whitepaper",
    views: 3456,
    avgTime: "00:05:30",
    scrollDepth: 0,
    shares: 145,
    downloads: 892
  },
  {
    title: "Product Demo Video",
    type: "Video",
    views: 8765,
    avgTime: "00:02:15",
    scrollDepth: 0,
    shares: 567,
    downloads: 0,
    completionRate: 65
  },
  {
    title: "Beginner's Guide to Analytics",
    type: "Guide",
    views: 4567,
    avgTime: "00:04:20",
    scrollDepth: 82,
    shares: 189,
    downloads: 0
  }
];

export const channelPerformanceData = {
  channels: ['Organic Search', 'Social Media', 'Email', 'Direct', 'Paid Search'],
  visitors: [8456, 6234, 4567, 3456, 1234],
  engagement: [75, 68, 82, 65, 58],
  conversion: [2.3, 1.8, 3.2, 2.8, 4.5]
};

export const topLandingPages = [
  { page: '/blog/guide-analytics', visits: 4567, bounceRate: 35, avgTime: '00:03:45' },
  { page: '/resources/industry-report', visits: 3456, bounceRate: 42, avgTime: '00:02:30' },
  { page: '/product/features', visits: 2345, bounceRate: 28, avgTime: '00:04:15' },
  { page: '/about', visits: 1890, bounceRate: 52, avgTime: '00:01:45' },
  { page: '/blog/product-updates', visits: 1567, bounceRate: 38, avgTime: '00:02:55' }
];

export const campaignData = [
  {
    name: "Summer Awareness 2024",
    status: "Active",
    channel: "Social",
    impressions: 234567,
    clicks: 12345,
    ctr: 5.3,
    spend: 2456,
    costPerClick: 0.20
  },
  {
    name: "Q2 Content Push",
    status: "Active",
    channel: "Email",
    impressions: 56789,
    clicks: 4567,
    ctr: 8.0,
    spend: 890,
    costPerClick: 0.19
  },
  {
    name: "Blog Promotion",
    status: "Completed",
    channel: "Paid Search",
    impressions: 123456,
    clicks: 3456,
    ctr: 2.8,
    spend: 1234,
    costPerClick: 0.36
  },
  {
    name: "Brand Awareness",
    status: "Active",
    channel: "Display",
    impressions: 345678,
    clicks: 2345,
    ctr: 0.7,
    spend: 567,
    costPerClick: 0.24
  }
];

export const audienceInsightsData = {
  demographics: {
    age: [
      { range: '18-24', percentage: 15 },
      { range: '25-34', percentage: 35 },
      { range: '35-44', percentage: 28 },
      { range: '45-54', percentage: 15 },
      { range: '55+', percentage: 7 }
    ],
    gender: [
      { type: 'Male', percentage: 58 },
      { type: 'Female', percentage: 40 },
      { type: 'Other', percentage: 2 }
    ]
  },
  interests: [
    { category: 'Technology', score: 85 },
    { category: 'Business', score: 72 },
    { category: 'Marketing', score: 68 },
    { category: 'Finance', score: 45 },
    { category: 'Education', score: 38 }
  ],
  devices: [
    { type: 'Desktop', percentage: 52, avgTime: '00:03:45' },
    { type: 'Mobile', percentage: 38, avgTime: '00:01:55' },
    { type: 'Tablet', percentage: 10, avgTime: '00:02:30' }
  ]
};

export const socialMediaMetrics = {
  platforms: [
    {
      name: 'Facebook',
      followers: 45678,
      engagement: 4.5,
      posts: 234,
      reach: 234567,
      clicks: 12345
    },
    {
      name: 'Twitter',
      followers: 23456,
      engagement: 3.2,
      posts: 567,
      reach: 123456,
      clicks: 8765
    },
    {
      name: 'LinkedIn',
      followers: 34567,
      engagement: 5.8,
      posts: 145,
      reach: 156789,
      clicks: 9876
    },
    {
      name: 'Instagram',
      followers: 56789,
      engagement: 6.2,
      posts: 389,
      reach: 345678,
      clicks: 15678
    }
  ]
};

export const blogPerformanceData = [
  {
    title: "10 Tips for Better Analytics",
    author: "John Doe",
    published: "2024-05-01",
    views: 8765,
    avgTime: "00:04:30",
    shares: 456,
    comments: 89,
    category: "Analytics"
  },
  {
    title: "The Future of Product Management",
    author: "Jane Smith",
    published: "2024-04-28",
    views: 6543,
    avgTime: "00:03:45",
    shares: 345,
    comments: 67,
    category: "Product"
  },
  {
    title: "Getting Started with Data Science",
    author: "Mike Johnson",
    published: "2024-04-25",
    views: 5432,
    avgTime: "00:05:15",
    shares: 234,
    comments: 45,
    category: "Data Science"
  },
  {
    title: "Marketing Trends 2024",
    author: "Sarah Williams",
    published: "2024-04-20",
    views: 4321,
    avgTime: "00:03:20",
    shares: 189,
    comments: 34,
    category: "Marketing"
  }
];

export const keywordPerformanceData = [
  { keyword: 'analytics platform', impressions: 45678, clicks: 2345, ctr: 5.1, avgPosition: 3.2 },
  { keyword: 'data visualization', impressions: 34567, clicks: 1890, ctr: 5.5, avgPosition: 2.8 },
  { keyword: 'business intelligence', impressions: 23456, clicks: 1234, ctr: 5.3, avgPosition: 4.1 },
  { keyword: 'dashboard software', impressions: 19876, clicks: 987, ctr: 5.0, avgPosition: 3.5 },
  { keyword: 'reporting tools', impressions: 15678, clicks: 765, ctr: 4.9, avgPosition: 3.8 }
];