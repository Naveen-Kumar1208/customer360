// Projects Overview Stats
export const projectsStats = [
  {
    title: "Active Projects",
    value: "24",
    description: "Currently running",
    trend: { value: 12, isPositive: true },
    iconColor: "blue",
  },
  {
    title: "Completed Projects",
    value: "156",
    description: "Successfully finished",
    trend: { value: 8, isPositive: true },
    iconColor: "green",
  },
  {
    title: "Total Budget",
    value: "$2.4M",
    description: "Allocated budget",
    trend: { value: 15, isPositive: true },
    iconColor: "purple",
  },
  {
    title: "Team Members",
    value: "89",
    description: "Across all projects",
    trend: { value: 5, isPositive: true },
    iconColor: "orange",
  },
];

// CDP Projects List
export const projectsList = [
  {
    id: "CDP-001",
    name: "CDP360",
    description: "Comprehensive Customer Data Platform with advanced analytics and automation capabilities",
    status: "active",
    priority: "high",
    progress: 85,
    createdDate: "2023-12-15",
    lastUpdated: "2024-01-15",
    automationsCount: 12,
    segmentsCount: 8,
    activeCustomers: 45200,
    conversionRate: 3.4,
    category: "CDP",
    tags: ["Customer Data", "Analytics", "Automation", "Platform"]
  },
  {
    id: "BANK-001", 
    name: "Bank",
    description: "Complete banking services platform with loan management, credit cards, and insurance services",
    status: "active",
    priority: "high", 
    progress: 92,
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-14",
    automationsCount: 8,
    segmentsCount: 6,
    activeCustomers: 12800,
    conversionRate: 15.2,
    category: "Banking",
    tags: ["Banking", "Financial Services", "Loans", "Insurance"]
  },
  {
    id: "ECOM-001",
    name: "E-commerce",
    description: "Full-featured e-commerce platform with inventory, payments, and customer management",
    status: "active",
    priority: "medium",
    progress: 67,
    createdDate: "2023-11-20",
    lastUpdated: "2024-01-12",
    automationsCount: 15,
    segmentsCount: 12,
    activeCustomers: 78500,
    conversionRate: 2.8,
    category: "E-commerce",
    tags: ["Online Shopping", "Payments", "Inventory", "Customer Experience"]
  },
  {
    id: "UNIV-001",
    name: "Universities",
    description: "Comprehensive university management system with academic programs and student services",
    status: "active",
    priority: "high",
    progress: 78,
    createdDate: "2024-01-01",
    lastUpdated: "2024-01-15",
    automationsCount: 10,
    segmentsCount: 8,
    activeCustomers: 25400,
    conversionRate: 4.2,
    category: "Education",
    tags: ["Education", "Academic Programs", "Student Services", "University Management"]
  }
];

// Project Categories
export const projectCategories = [
  { name: "Analytics", count: 3, color: "blue" },
  { name: "Marketing", count: 2, color: "green" },
  { name: "Infrastructure", count: 2, color: "purple" },
  { name: "Development", count: 1, color: "orange" },
  { name: "Compliance", count: 1, color: "red" },
  { name: "AI/ML", count: 1, color: "indigo" },
  { name: "BI", count: 1, color: "pink" }
];

// Team Members
export const teamMembers = [
  {
    id: "TM-001",
    name: "Sarah Johnson",
    role: "Project Manager",
    email: "sarah.j@company.com",
    avatar: "/avatars/sarah.jpg",
    projectsCount: 3,
    activeProjects: ["PRJ-001"],
    department: "Product Management",
    skills: ["Project Management", "Agile", "Analytics"]
  },
  {
    id: "TM-002",
    name: "Mike Chen",
    role: "Senior Developer",
    email: "mike.c@company.com",
    avatar: "/avatars/mike.jpg",
    projectsCount: 2,
    activeProjects: ["PRJ-002", "PRJ-006"],
    department: "Engineering",
    skills: ["React", "Node.js", "Python", "AWS"]
  },
  {
    id: "TM-003",
    name: "Alex Rodriguez",
    role: "Data Engineer",
    email: "alex.r@company.com",
    avatar: "/avatars/alex.jpg",
    projectsCount: 2,
    activeProjects: ["PRJ-001"],
    department: "Data Engineering",
    skills: ["SQL", "Python", "ETL", "Data Warehousing"]
  },
  {
    id: "TM-004",
    name: "Emily Davis",
    role: "Lead Designer",
    email: "emily.d@company.com",
    avatar: "/avatars/emily.jpg",
    projectsCount: 1,
    activeProjects: ["PRJ-004"],
    department: "Design",
    skills: ["UI/UX", "Figma", "Mobile Design", "Prototyping"]
  },
  {
    id: "TM-005",
    name: "David Kim",
    role: "Security Specialist",
    email: "david.k@company.com",
    avatar: "/avatars/david.jpg",
    projectsCount: 1,
    activeProjects: ["PRJ-005"],
    department: "Security",
    skills: ["Security", "GDPR", "Compliance", "Risk Assessment"]
  }
];

// Project Activities/Timeline
export const projectActivities = [
  {
    id: "ACT-001",
    projectId: "PRJ-001",
    projectName: "Customer Journey Analytics",
    action: "Milestone Completed",
    description: "Data pipeline implementation finished",
    user: "Alex Rodriguez",
    timestamp: "2024-01-15 14:30:00",
    type: "milestone"
  },
  {
    id: "ACT-002",
    projectId: "PRJ-002",
    projectName: "Marketing Automation Platform",
    action: "Task Updated",
    description: "Email template engine development in progress",
    user: "Mike Chen",
    timestamp: "2024-01-15 11:20:00",
    type: "update"
  },
  {
    id: "ACT-003",
    projectId: "PRJ-004",
    projectName: "Mobile App Development",
    action: "Team Member Added",
    description: "New iOS developer joined the team",
    user: "Emily Davis",
    timestamp: "2024-01-15 09:45:00",
    type: "team"
  },
  {
    id: "ACT-004",
    projectId: "PRJ-005",
    projectName: "GDPR Compliance Initiative",
    action: "Risk Identified",
    description: "Data retention policy requires review",
    user: "David Kim",
    timestamp: "2024-01-14 16:15:00",
    type: "risk"
  },
  {
    id: "ACT-005",
    projectId: "PRJ-006",
    projectName: "AI-Powered Recommendations",
    action: "Budget Updated",
    description: "Additional ML infrastructure costs approved",
    user: "Lisa Zhang",
    timestamp: "2024-01-14 13:00:00",
    type: "budget"
  },
  {
    id: "ACT-006",
    projectId: "PRJ-001",
    projectName: "Customer Journey Analytics",
    action: "Review Scheduled",
    description: "Quarterly project review meeting set for next week",
    user: "Sarah Johnson",
    timestamp: "2024-01-14 10:30:00",
    type: "meeting"
  }
];

// Project Budget Overview
export const budgetOverview = {
  totalAllocated: 4310000,
  totalSpent: 2007000,
  totalRemaining: 2303000,
  utilizationRate: 46.6,
  byCategory: [
    { category: "Analytics", allocated: 1030000, spent: 505500 },
    { category: "Marketing", allocated: 680000, spent: 408000 },
    { category: "Infrastructure", allocated: 1070000, spent: 482500 },
    { category: "Development", allocated: 890000, spent: 133500 },
    { category: "Compliance", allocated: 280000, spent: 112000 },
    { category: "AI/ML", allocated: 560000, spent: 168000 },
    { category: "BI", allocated: 380000, spent: 365000 }
  ]
};

// Project Timeline Data
export const timelineData = [
  {
    month: "Jan 2024",
    planned: 8,
    completed: 6,
    inProgress: 12,
    started: 3
  },
  {
    month: "Feb 2024",
    planned: 6,
    completed: 4,
    inProgress: 14,
    started: 2
  },
  {
    month: "Mar 2024",
    planned: 4,
    completed: 8,
    inProgress: 10,
    started: 1
  },
  {
    month: "Apr 2024",
    planned: 3,
    completed: 5,
    inProgress: 8,
    started: 0
  },
  {
    month: "May 2024",
    planned: 2,
    completed: 3,
    inProgress: 7,
    started: 1
  },
  {
    month: "Jun 2024",
    planned: 1,
    completed: 2,
    inProgress: 6,
    started: 0
  }
];

// Resource Allocation
export const resourceAllocation = [
  { department: "Engineering", allocated: 45, available: 52, utilization: 86.5 },
  { department: "Design", allocated: 12, available: 15, utilization: 80.0 },
  { department: "Data Science", allocated: 8, available: 10, utilization: 80.0 },
  { department: "Product", allocated: 6, available: 8, utilization: 75.0 },
  { department: "Marketing", allocated: 4, available: 6, utilization: 66.7 },
  { department: "Security", allocated: 3, available: 4, utilization: 75.0 }
];

// Services for different project types
export const projectServices = {
  "CDP-001": [ // CDP360 Services
    {
      id: "CDP-SRV-001",
      name: "Build Startup Studio",
      description: "Complete startup development and incubation services",
      icon: "Rocket",
      color: "blue"
    },
    {
      id: "CDP-SRV-002",
      name: "Full Stack Development (MEAN, MERN, Java FSD)",
      description: "Comprehensive full-stack development services using modern frameworks",
      icon: "Code2",
      color: "green"
    },
    {
      id: "CDP-SRV-003",
      name: "Custom Software Development (Web, Mobile, Desktop)",
      description: "Tailored software solutions across all platforms",
      icon: "Laptop",
      color: "purple"
    },
    {
      id: "CDP-SRV-004",
      name: "Emerging Technologies Development",
      description: "Cutting-edge technology implementation and innovation",
      icon: "Zap",
      color: "orange"
    },
    {
      id: "CDP-SRV-005",
      name: "IT Support & Managed Services",
      description: "24/7 IT support and infrastructure management",
      icon: "Headphones",
      color: "red"
    },
    {
      id: "CDP-SRV-006",
      name: "Data & AI Services",
      description: "Advanced data analytics and artificial intelligence solutions",
      icon: "Brain",
      color: "indigo"
    },
    {
      id: "CDP-SRV-007",
      name: "IT Consulting & Staff Augmentation",
      description: "Expert IT consulting and skilled resource augmentation",
      icon: "Users",
      color: "pink"
    },
    {
      id: "CDP-SRV-008",
      name: "Enterprise Software Development (ERP, CRM, SCM)",
      description: "Large-scale enterprise software solutions",
      icon: "Building2",
      color: "cyan"
    },
    {
      id: "CDP-SRV-009",
      name: "Software Testing & QA Services",
      description: "Comprehensive testing and quality assurance services",
      icon: "CheckCircle",
      color: "emerald"
    },
    {
      id: "CDP-SRV-010",
      name: "DevOps & CI/CD Implementation",
      description: "Streamlined development operations and continuous deployment",
      icon: "GitBranch",
      color: "violet"
    },
    {
      id: "CDP-SRV-011",
      name: "Legacy System Modernization",
      description: "Transform and upgrade legacy systems to modern architecture",
      icon: "RefreshCw",
      color: "amber"
    },
    {
      id: "CDP-SRV-012",
      name: "SAP BTP NodeJs Transformation",
      description: "SAP Business Technology Platform development and transformation",
      icon: "Server",
      color: "lime"
    },
    {
      id: "CDP-SRV-013",
      name: "SAP BI Partner Solutions",
      description: "Business Intelligence solutions for SAP ecosystem",
      icon: "BarChart3",
      color: "rose"
    }
  ],
  "BANK-001": [ // Banking Services
    {
      id: "BANK-SRV-001",
      name: "Loan Management",
      description: "Complete loan origination, processing, and management system",
      icon: "DollarSign",
      color: "blue"
    },
    {
      id: "BANK-SRV-002",
      name: "Credit Card Services",
      description: "Credit card issuance, management, and transaction processing",
      icon: "CreditCard",
      color: "green"
    },
    {
      id: "BANK-SRV-003",
      name: "Insurance Services",
      description: "Life, health, and general insurance products and claims management",
      icon: "Shield",
      color: "purple"
    },
    {
      id: "BANK-SRV-004",
      name: "Savings & Deposits",
      description: "Savings accounts, fixed deposits, and recurring deposit management",
      icon: "PiggyBank",
      color: "orange"
    },
    {
      id: "BANK-SRV-005",
      name: "Investment Banking",
      description: "Wealth management, portfolio services, and investment advisory",
      icon: "TrendingUp",
      color: "red"
    },
    {
      id: "BANK-SRV-006",
      name: "Digital Banking",
      description: "Internet banking, mobile banking, and digital payment solutions",
      icon: "Smartphone",
      color: "indigo"
    },
    {
      id: "BANK-SRV-007",
      name: "Foreign Exchange",
      description: "Currency exchange, international transfers, and forex services",
      icon: "Globe",
      color: "pink"
    },
    {
      id: "BANK-SRV-008",
      name: "Business Banking",
      description: "Corporate accounts, business loans, and merchant services",
      icon: "Briefcase",
      color: "cyan"
    }
  ],
  "ECOM-001": [ // E-commerce Services
    {
      id: "ECOM-SRV-001",
      name: "Product Catalog Management",
      description: "Comprehensive product listing, categorization, and inventory management",
      icon: "Package",
      color: "blue"
    },
    {
      id: "ECOM-SRV-002",
      name: "Shopping Cart & Checkout",
      description: "Seamless cart management and secure checkout process",
      icon: "ShoppingCart",
      color: "green"
    },
    {
      id: "ECOM-SRV-003",
      name: "Payment Gateway Integration",
      description: "Multiple payment methods including cards, wallets, and UPI",
      icon: "CreditCard",
      color: "purple"
    },
    {
      id: "ECOM-SRV-004",
      name: "Order Management",
      description: "Order processing, tracking, and fulfillment services",
      icon: "Package2",
      color: "orange"
    },
    {
      id: "ECOM-SRV-005",
      name: "Customer Management",
      description: "Customer profiles, preferences, and loyalty programs",
      icon: "UserCheck",
      color: "red"
    },
    {
      id: "ECOM-SRV-006",
      name: "Marketing & Promotions",
      description: "Campaign management, discounts, and promotional tools",
      icon: "Megaphone",
      color: "indigo"
    },
    {
      id: "ECOM-SRV-007",
      name: "Analytics & Reporting",
      description: "Sales analytics, customer insights, and business intelligence",
      icon: "BarChart",
      color: "pink"
    },
    {
      id: "ECOM-SRV-008",
      name: "Logistics & Shipping",
      description: "Shipping integration, tracking, and delivery management",
      icon: "Truck",
      color: "cyan"
    },
    {
      id: "ECOM-SRV-009",
      name: "Reviews & Ratings",
      description: "Product reviews, ratings, and customer feedback management",
      icon: "Star",
      color: "emerald"
    },
    {
      id: "ECOM-SRV-010",
      name: "Mobile Commerce",
      description: "Mobile app development and responsive shopping experience",
      icon: "Smartphone",
      color: "violet"
    }
  ],
  "UNIV-001": [ // Universities Services
    {
      id: "UNIV-SRV-001",
      name: "Arts, Design & Architecture",
      description: "Creative arts programs including fine arts, graphic design, and architectural studies",
      icon: "Palette",
      color: "blue"
    },
    {
      id: "UNIV-SRV-002",
      name: "Business School",
      description: "Comprehensive business education including MBA, finance, and entrepreneurship programs",
      icon: "Briefcase",
      color: "green"
    },
    {
      id: "UNIV-SRV-003",
      name: "Engineering",
      description: "Advanced engineering programs covering all major engineering disciplines",
      icon: "Settings",
      color: "purple"
    },
    {
      id: "UNIV-SRV-004",
      name: "Law & Justice",
      description: "Legal studies and justice administration programs with practical training",
      icon: "Scale",
      color: "orange"
    },
    {
      id: "UNIV-SRV-005",
      name: "Medicine & Health",
      description: "Medical education and healthcare programs including nursing and allied health sciences",
      icon: "Heart",
      color: "red"
    },
    {
      id: "UNIV-SRV-006",
      name: "Science",
      description: "Natural and physical sciences programs with research opportunities",
      icon: "Atom",
      color: "indigo"
    }
  ]
};

// Legacy CDP services for backward compatibility
export const cdpServices = projectServices["CDP-001"];

// Sample Automations Data
export const automationsData = [
  {
    id: "AUTO-001",
    name: "Welcome Series",
    description: "5-step onboarding email sequence for new customers",
    type: "Email Sequence",
    status: "active",
    trigger: "Customer Registration",
    steps: 5,
    customers: 1234,
    conversionRate: 23.4,
    createdDate: "2024-01-10",
    lastRun: "2024-01-15 14:30",
    category: "Onboarding"
  },
  {
    id: "AUTO-002",
    name: "Abandoned Cart Recovery",
    description: "Automated cart abandonment emails with personalized product reminders",
    type: "Behavioral Trigger",
    status: "active",
    trigger: "Cart Abandonment",
    steps: 3,
    customers: 892,
    conversionRate: 15.8,
    createdDate: "2024-01-05",
    lastRun: "2024-01-15 16:45",
    category: "Recovery"
  },
  {
    id: "AUTO-003",
    name: "Birthday Campaign",
    description: "Personalized birthday offers and loyalty point bonuses",
    type: "Date-based",
    status: "active",
    trigger: "Customer Birthday",
    steps: 2,
    customers: 3456,
    conversionRate: 31.2,
    createdDate: "2023-12-20",
    lastRun: "2024-01-15 09:00",
    category: "Loyalty"
  },
  {
    id: "AUTO-004",
    name: "Re-engagement Campaign",
    description: "Win-back inactive customers with special offers",
    type: "Lifecycle",
    status: "paused",
    trigger: "90 Days Inactive",
    steps: 4,
    customers: 567,
    conversionRate: 8.7,
    createdDate: "2024-01-01",
    lastRun: "2024-01-12 11:20",
    category: "Re-engagement"
  },
  {
    id: "AUTO-005",
    name: "Purchase Follow-up",
    description: "Post-purchase thank you, review request, and cross-sell recommendations",
    type: "Transactional",
    status: "active",
    trigger: "Purchase Completion",
    steps: 3,
    customers: 2789,
    conversionRate: 12.5,
    createdDate: "2023-12-15",
    lastRun: "2024-01-15 18:10",
    category: "Post-Purchase"
  }
];

// Sample Segments Data  
export const segmentsData = [
  {
    id: "SEG-001",
    name: "High-Value Customers",
    description: "Customers with lifetime value > $1000 and frequent purchases",
    customerCount: 2345,
    criteria: "LTV > $1000 AND Purchase Frequency > 5/year",
    growthRate: 12.3,
    status: "active",
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-15",
    category: "Value-based"
  },
  {
    id: "SEG-002", 
    name: "At-Risk Churners",
    description: "Active customers showing signs of decreased engagement",
    customerCount: 892,
    criteria: "Last Purchase > 60 days AND Email Engagement < 10%",
    growthRate: -5.7,
    status: "active",
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-14",
    category: "Risk-based"
  },
  {
    id: "SEG-003",
    name: "New Customer Cohort",
    description: "Customers who registered in the last 30 days",
    customerCount: 1567,
    criteria: "Registration Date > 30 days ago",
    growthRate: 28.9,
    status: "active", 
    createdDate: "2024-01-01",
    lastUpdated: "2024-01-15",
    category: "Lifecycle"
  },
  {
    id: "SEG-004",
    name: "Mobile App Users",
    description: "Customers who primarily interact via mobile application",
    customerCount: 4231,
    criteria: "Mobile App Sessions > 70% AND Last Mobile Login < 7 days",
    growthRate: 15.4,
    status: "active",
    createdDate: "2023-12-20",
    lastUpdated: "2024-01-13",
    category: "Channel-based"
  },
  {
    id: "SEG-005",
    name: "Geographic: West Coast",
    description: "Customers located in California, Oregon, and Washington",
    customerCount: 3456,
    criteria: "State IN ('CA', 'OR', 'WA')",
    growthRate: 8.2,
    status: "active",
    createdDate: "2023-12-15",
    lastUpdated: "2024-01-10",
    category: "Geographic"
  },
  {
    id: "SEG-006",
    name: "Premium Product Buyers",
    description: "Customers who have purchased premium-tier products",
    customerCount: 1876,
    criteria: "Product Category = 'Premium' AND Purchase Count >= 1",
    growthRate: 22.1,
    status: "draft",
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-15",
    category: "Product-based"
  }
];

// Customer Data for CDP
export const customersData = [
  {
    id: "CUST-001",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0123",
    status: "active",
    tier: "premium",
    registrationDate: "2023-08-15",
    lastLogin: "2024-01-15",
    totalSpent: 2450.00,
    orderCount: 12,
    lifetimeValue: 3200.00,
    location: "New York, NY",
    source: "Google Ads",
    segment: "High-Value Customers",
    tags: ["VIP", "Frequent Buyer", "Email Subscriber"]
  },
  {
    id: "CUST-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0234",
    status: "active",
    tier: "gold",
    registrationDate: "2023-11-20",
    lastLogin: "2024-01-14",
    totalSpent: 1250.00,
    orderCount: 8,
    lifetimeValue: 1800.00,
    location: "Los Angeles, CA",
    source: "Social Media",
    segment: "Regular Customers",
    tags: ["Mobile User", "Social Shopper"]
  },
  {
    id: "CUST-003",
    firstName: "Michael",
    lastName: "Davis",
    email: "michael.davis@email.com",
    phone: "+1-555-0345",
    status: "inactive",
    tier: "bronze",
    registrationDate: "2023-06-10",
    lastLogin: "2023-12-20",
    totalSpent: 450.00,
    orderCount: 3,
    lifetimeValue: 450.00,
    location: "Chicago, IL",
    source: "Direct",
    segment: "At-Risk Churners",
    tags: ["Inactive", "Price Sensitive"]
  },
  {
    id: "CUST-004",
    firstName: "Emily",
    lastName: "Wilson",
    email: "emily.wilson@email.com",
    phone: "+1-555-0456",
    status: "active",
    tier: "silver",
    registrationDate: "2024-01-05",
    lastLogin: "2024-01-15",
    totalSpent: 680.00,
    orderCount: 4,
    lifetimeValue: 850.00,
    location: "Seattle, WA",
    source: "Email Campaign",
    segment: "New Customer Cohort",
    tags: ["New Customer", "Tech Enthusiast"]
  },
  {
    id: "CUST-005",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    phone: "+1-555-0567",
    status: "active",
    tier: "premium",
    registrationDate: "2023-03-12",
    lastLogin: "2024-01-15",
    totalSpent: 3200.00,
    orderCount: 18,
    lifetimeValue: 4500.00,
    location: "Miami, FL",
    source: "Referral",
    segment: "High-Value Customers",
    tags: ["Loyal", "Referrer", "High Spender"]
  },
  {
    id: "CUST-006",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1-555-0678",
    status: "active",
    tier: "gold",
    registrationDate: "2023-09-25",
    lastLogin: "2024-01-13",
    totalSpent: 1580.00,
    orderCount: 9,
    lifetimeValue: 2100.00,
    location: "Boston, MA",
    source: "Google Search",
    segment: "Mobile App Users",
    tags: ["Mobile User", "Fashion Lover"]
  }
];

// Dataset Information for CDP
export const datasetsData = [
  {
    id: "DS-001",
    name: "Customer Profiles",
    description: "Comprehensive customer demographic and behavioral data",
    type: "Customer Data",
    source: "CRM Integration",
    recordCount: 125430,
    lastUpdated: "2024-01-15 10:30",
    status: "active",
    size: "2.4 GB",
    quality: 95,
    schema: {
      fields: ["customer_id", "first_name", "last_name", "email", "phone", "registration_date", "tier", "location"],
      totalFields: 24
    },
    tags: ["PII", "Core Data", "Real-time"]
  },
  {
    id: "DS-002",
    name: "Transaction History",
    description: "Complete transaction and purchase history across all channels",
    type: "Transactional Data",
    source: "E-commerce Platform",
    recordCount: 543210,
    lastUpdated: "2024-01-15 12:15",
    status: "active",
    size: "8.7 GB",
    quality: 98,
    schema: {
      fields: ["transaction_id", "customer_id", "product_id", "amount", "date", "channel", "payment_method"],
      totalFields: 15
    },
    tags: ["Financial", "High Volume", "Real-time"]
  },
  {
    id: "DS-003",
    name: "Website Interactions",
    description: "User behavior and interaction data from website analytics",
    type: "Behavioral Data",
    source: "Google Analytics",
    recordCount: 2341567,
    lastUpdated: "2024-01-15 11:45",
    status: "active",
    size: "15.2 GB",
    quality: 87,
    schema: {
      fields: ["session_id", "user_id", "page_url", "timestamp", "duration", "device", "browser"],
      totalFields: 18
    },
    tags: ["Behavioral", "Analytics", "High Volume"]
  },
  {
    id: "DS-004",
    name: "Email Campaign Data",
    description: "Email marketing campaign performance and engagement metrics",
    type: "Marketing Data",
    source: "Mailchimp",
    recordCount: 89765,
    lastUpdated: "2024-01-15 09:20",
    status: "active",
    size: "0.8 GB",
    quality: 92,
    schema: {
      fields: ["campaign_id", "customer_id", "email", "sent_date", "opened", "clicked", "converted"],
      totalFields: 12
    },
    tags: ["Marketing", "Engagement", "Campaign"]
  },
  {
    id: "DS-005",
    name: "Product Catalog",
    description: "Complete product information including categories, pricing, and inventory",
    type: "Product Data",
    source: "PIM System",
    recordCount: 15670,
    lastUpdated: "2024-01-15 08:00",
    status: "active",
    size: "1.2 GB",
    quality: 94,
    schema: {
      fields: ["product_id", "name", "category", "price", "inventory", "description", "images"],
      totalFields: 22
    },
    tags: ["Product", "Inventory", "Catalog"]
  },
  {
    id: "DS-006",
    name: "Social Media Mentions",
    description: "Social media engagement and sentiment data across platforms",
    type: "Social Data",
    source: "Social Listening Tool",
    recordCount: 45230,
    lastUpdated: "2024-01-15 14:10",
    status: "processing",
    size: "0.3 GB",
    quality: 78,
    schema: {
      fields: ["mention_id", "platform", "user", "content", "sentiment", "engagement", "timestamp"],
      totalFields: 10
    },
    tags: ["Social", "Sentiment", "External"]
  }
];

// Prospects Data with Lead Scoring
export const prospectsData = [
  {
    id: "PROS-001",
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@company.com",
    phone: "+1-555-1001",
    company: "TechCorp Inc",
    title: "Marketing Director",
    status: "hot",
    leadScore: 85,
    source: "LinkedIn Ads",
    firstContact: "2024-01-10",
    lastActivity: "2024-01-15",
    engagementLevel: "high",
    behaviors: {
      websiteVisits: 12,
      pageViews: 45,
      emailOpens: 8,
      emailClicks: 5,
      formSubmissions: 2,
      contentDownloads: 3
    },
    interests: ["Marketing Automation", "Analytics", "Customer Data"],
    stage: "evaluation",
    tags: ["Enterprise", "High Intent", "Decision Maker"]
  },
  {
    id: "PROS-002",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@startup.io",
    phone: "+1-555-1002",
    company: "StartupIO",
    title: "CEO",
    status: "warm",
    leadScore: 72,
    source: "Google Ads",
    firstContact: "2024-01-08",
    lastActivity: "2024-01-14",
    engagementLevel: "medium",
    behaviors: {
      websiteVisits: 8,
      pageViews: 28,
      emailOpens: 6,
      emailClicks: 3,
      formSubmissions: 1,
      contentDownloads: 2
    },
    interests: ["Customer Segmentation", "Automation"],
    stage: "awareness",
    tags: ["Startup", "Budget Conscious", "Quick Decision"]
  },
  {
    id: "PROS-003",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@enterprise.com",
    phone: "+1-555-1003",
    company: "Enterprise Solutions",
    title: "VP of Operations",
    status: "cold",
    leadScore: 45,
    source: "Referral",
    firstContact: "2024-01-05",
    lastActivity: "2024-01-12",
    engagementLevel: "low",
    behaviors: {
      websiteVisits: 3,
      pageViews: 8,
      emailOpens: 2,
      emailClicks: 0,
      formSubmissions: 0,
      contentDownloads: 1
    },
    interests: ["Data Analytics"],
    stage: "research",
    tags: ["Enterprise", "Slow Decision", "Committee Purchase"]
  },
  {
    id: "PROS-004",
    firstName: "Sophie",
    lastName: "Chen",
    email: "sophie.chen@ecommerce.com",
    phone: "+1-555-1004",
    company: "E-commerce Plus",
    title: "Growth Manager",
    status: "hot",
    leadScore: 91,
    source: "Webinar",
    firstContact: "2024-01-12",
    lastActivity: "2024-01-15",
    engagementLevel: "high",
    behaviors: {
      websiteVisits: 15,
      pageViews: 67,
      emailOpens: 10,
      emailClicks: 8,
      formSubmissions: 3,
      contentDownloads: 5
    },
    interests: ["E-commerce Analytics", "Customer Journey", "Personalization"],
    stage: "consideration",
    tags: ["E-commerce", "High Engagement", "Ready to Buy"]
  }
];

// Customer Behavior & Interaction Data
export const customerBehaviorData = [
  {
    customerId: "CUST-001",
    customerName: "John Smith",
    recentActivities: [
      {
        id: "ACT-001",
        type: "page_view",
        page: "/products/analytics-platform",
        timestamp: "2024-01-15 14:30:25",
        duration: 180,
        device: "desktop",
        browser: "Chrome"
      },
      {
        id: "ACT-002",
        type: "email_open",
        campaign: "Weekly Newsletter",
        timestamp: "2024-01-15 09:15:00",
        device: "mobile",
        location: "New York, NY"
      },
      {
        id: "ACT-003",
        type: "purchase",
        product: "Premium Analytics Plan",
        amount: 299.00,
        timestamp: "2024-01-14 16:45:00",
        paymentMethod: "credit_card"
      }
    ],
    sessionData: {
      totalSessions: 45,
      avgSessionDuration: 245,
      bounceRate: 25,
      pagesPerSession: 4.2,
      lastSession: "2024-01-15 14:30:00"
    },
    engagementMetrics: {
      emailEngagement: 78,
      websiteEngagement: 85,
      socialEngagement: 42,
      overallScore: 72
    }
  },
  {
    customerId: "CUST-002",
    customerName: "Sarah Johnson",
    recentActivities: [
      {
        id: "ACT-004",
        type: "page_view",
        page: "/features/automation",
        timestamp: "2024-01-15 11:20:15",
        duration: 320,
        device: "mobile",
        browser: "Safari"
      },
      {
        id: "ACT-005",
        type: "form_submission",
        form: "Contact Sales",
        timestamp: "2024-01-15 11:22:00",
        formData: { interest: "Enterprise Plan" }
      }
    ],
    sessionData: {
      totalSessions: 32,
      avgSessionDuration: 198,
      bounceRate: 35,
      pagesPerSession: 3.8,
      lastSession: "2024-01-15 11:20:00"
    },
    engagementMetrics: {
      emailEngagement: 65,
      websiteEngagement: 72,
      socialEngagement: 58,
      overallScore: 68
    }
  }
];

// Enhanced Behavioral Segments
export const behavioralSegments = [
  {
    id: "BSEG-001",
    name: "High-Intent Prospects",
    description: "Prospects showing strong buying signals through behavior patterns",
    customerCount: 1250,
    criteria: "Lead Score > 80 AND Page Views > 30 AND Form Submissions > 1",
    behaviorTriggers: ["pricing_page_visit", "demo_request", "comparison_page_view"],
    growthRate: 15.2,
    status: "active",
    conversionRate: 34.5,
    avgDealSize: 2450.00,
    category: "Intent-based"
  },
  {
    id: "BSEG-002",
    name: "Engaged Email Subscribers",
    description: "Users with high email engagement but low website activity",
    customerCount: 3420,
    criteria: "Email Open Rate > 50% AND Email Click Rate > 10% AND Website Sessions < 5",
    behaviorTriggers: ["email_open", "email_click", "link_click"],
    growthRate: 8.7,
    status: "active",
    conversionRate: 12.3,
    avgDealSize: 890.00,
    category: "Engagement-based"
  },
  {
    id: "BSEG-003",
    name: "Feature Explorers",
    description: "Users who actively explore product features and documentation",
    customerCount: 2150,
    criteria: "Feature Page Views > 10 AND Documentation Views > 5 AND Session Duration > 300s",
    behaviorTriggers: ["feature_page_view", "documentation_view", "tutorial_completion"],
    growthRate: 22.1,
    status: "active",
    conversionRate: 28.7,
    avgDealSize: 1850.00,
    category: "Product-interest"
  },
  {
    id: "BSEG-004",
    name: "At-Risk Churners",
    description: "Existing customers showing declining engagement patterns",
    customerCount: 892,
    criteria: "Last Login > 14 days AND Email Engagement < 20% AND Support Tickets > 2",
    behaviorTriggers: ["login_decline", "engagement_drop", "support_increase"],
    growthRate: -12.5,
    status: "active",
    conversionRate: 0,
    avgDealSize: 0,
    category: "Retention"
  }
];

// Behavioral Automation Workflows
export const behavioralAutomations = [
  {
    id: "BAUTO-001",
    name: "High-Intent Lead Nurturing",
    description: "Automated sequence for prospects showing strong buying signals",
    type: "Behavioral Trigger",
    status: "active",
    triggers: ["lead_score_increase", "pricing_page_visit", "demo_request"],
    conditions: "Lead Score > 75 AND Engagement Level = 'high'",
    steps: [
      { step: 1, action: "Send personalized demo invite", delay: "immediate" },
      { step: 2, action: "Assign to senior sales rep", delay: "1 hour" },
      { step: 3, action: "Schedule follow-up call", delay: "24 hours" },
      { step: 4, action: "Send case study", delay: "3 days" }
    ],
    performance: {
      triggered: 450,
      completed: 312,
      converted: 98,
      conversionRate: 31.4
    },
    category: "Lead Nurturing"
  },
  {
    id: "BAUTO-002",
    name: "Feature Engagement Boost",
    description: "Re-engage users who viewed features but didn't take action",
    type: "Behavioral Trigger",
    status: "active",
    triggers: ["feature_page_view", "no_action_24h"],
    conditions: "Feature Views > 3 AND No Form Submission",
    steps: [
      { step: 1, action: "Send feature benefit email", delay: "24 hours" },
      { step: 2, action: "Offer free trial extension", delay: "48 hours" },
      { step: 3, action: "Schedule product walkthrough", delay: "5 days" }
    ],
    performance: {
      triggered: 1250,
      completed: 890,
      converted: 234,
      conversionRate: 26.3
    },
    category: "Engagement"
  },
  {
    id: "BAUTO-003",
    name: "Churn Prevention Sequence",
    description: "Identify and re-engage customers at risk of churning",
    type: "Behavioral Trigger",
    status: "active",
    triggers: ["engagement_decline", "login_decrease", "support_ticket_increase"],
    conditions: "Last Login > 7 days AND Engagement Score < 30",
    steps: [
      { step: 1, action: "Send check-in email", delay: "immediate" },
      { step: 2, action: "Offer customer success consultation", delay: "24 hours" },
      { step: 3, action: "Provide additional training resources", delay: "3 days" },
      { step: 4, action: "Executive outreach", delay: "7 days" }
    ],
    performance: {
      triggered: 180,
      completed: 145,
      converted: 87,
      conversionRate: 60.0
    },
    category: "Retention"
  }
];