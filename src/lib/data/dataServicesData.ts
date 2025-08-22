// Data Services Container Stats
export const dataServicesContainers = [
  {
    title: "Upload Local Files",
    value: "245",
    description: "Files Uploaded",
    trend: { value: 12, isPositive: true },
    iconColor: "blue",
    action: "Upload",
  },
  {
    title: "Load from Cloud Storage",
    value: "128",
    description: "Cloud Sources",
    trend: { value: 8, isPositive: true },
    iconColor: "green",
    action: "Connect",
  },
  {
    title: "Query Data",
    value: "1,847",
    description: "Active Queries",
    trend: { value: 15, isPositive: true },
    iconColor: "purple",
    action: "Query",
  },
  {
    title: "Create User",
    value: "456",
    description: "User Profiles",
    trend: { value: 6, isPositive: true },
    iconColor: "orange",
    action: "Create",
  },
];

// Data Ingestion Volume Data
export const dataIngestionData = [
  {
    name: "Jan",
    Volume: 1800,
    ProcessedSuccessfully: 1750,
    Failed: 50,
  },
  {
    name: "Feb",
    Volume: 2200,
    ProcessedSuccessfully: 2150,
    Failed: 50,
  },
  {
    name: "Mar",
    Volume: 2100,
    ProcessedSuccessfully: 2040,
    Failed: 60,
  },
  {
    name: "Apr",
    Volume: 2800,
    ProcessedSuccessfully: 2720,
    Failed: 80,
  },
  {
    name: "May",
    Volume: 2600,
    ProcessedSuccessfully: 2530,
    Failed: 70,
  },
  {
    name: "Jun",
    Volume: 3200,
    ProcessedSuccessfully: 3120,
    Failed: 80,
  },
];

// Categories for Data Ingestion Chart
export const dataIngestionCategories = [
  {
    name: "Volume",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "ProcessedSuccessfully",
    color: "hsl(160, 60%, 45%)",
  },
  {
    name: "Failed",
    color: "hsl(0, 70%, 50%)",
  },
];

// Data Sources Status Data
export const dataSourcesData = [
  {
    name: "CRM",
    Active: 25,
    Inactive: 2,
  },
  {
    name: "E-commerce",
    Active: 18,
    Inactive: 1,
  },
  {
    name: "Social Media",
    Active: 12,
    Inactive: 3,
  },
  {
    name: "Analytics",
    Active: 15,
    Inactive: 1,
  },
  {
    name: "Email",
    Active: 8,
    Inactive: 0,
  },
  {
    name: "Mobile App",
    Active: 22,
    Inactive: 2,
  },
];

// Categories for Data Sources Chart
export const dataSourcesCategories = [
  {
    name: "Active",
    color: "hsl(160, 60%, 45%)",
  },
  {
    name: "Inactive",
    color: "hsl(0, 70%, 50%)",
  },
];

// Data Quality Metrics Data
export const dataQualityData = [
  {
    name: "Week 1",
    Completeness: 96.5,
    Accuracy: 98.2,
    Consistency: 94.8,
    Validity: 97.1,
  },
  {
    name: "Week 2",
    Completeness: 97.2,
    Accuracy: 98.5,
    Consistency: 95.2,
    Validity: 97.8,
  },
  {
    name: "Week 3",
    Completeness: 95.8,
    Accuracy: 97.9,
    Consistency: 94.1,
    Validity: 96.5,
  },
  {
    name: "Week 4",
    Completeness: 98.1,
    Accuracy: 98.8,
    Consistency: 96.5,
    Validity: 98.2,
  },
];

// Categories for Data Quality Chart
export const dataQualityCategories = [
  {
    name: "Completeness",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "Accuracy",
    color: "hsl(160, 60%, 45%)",
  },
  {
    name: "Consistency",
    color: "hsl(280, 65%, 60%)",
  },
  {
    name: "Validity",
    color: "hsl(30, 70%, 50%)",
  },
];

// API Performance Data
export const apiPerformanceData = [
  {
    name: "Authentication",
    ResponseTime: 25,
    ThroughputRPS: 850,
  },
  {
    name: "User Data",
    ResponseTime: 45,
    ThroughputRPS: 1200,
  },
  {
    name: "Analytics",
    ResponseTime: 120,
    ThroughputRPS: 650,
  },
  {
    name: "Reporting",
    ResponseTime: 95,
    ThroughputRPS: 420,
  },
  {
    name: "Export",
    ResponseTime: 180,
    ThroughputRPS: 180,
  },
  {
    name: "Sync",
    ResponseTime: 65,
    ThroughputRPS: 380,
  },
];

// Categories for API Performance Chart
export const apiPerformanceCategories = [
  {
    name: "ResponseTime",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "ThroughputRPS",
    color: "hsl(160, 60%, 45%)",
  },
];

// Data Processing Pipeline Data
export const dataProcessingData = [
  {
    name: "00:00",
    Ingestion: 450,
    Validation: 420,
    Transformation: 380,
    Storage: 375,
  },
  {
    name: "04:00",
    Ingestion: 380,
    Validation: 350,
    Transformation: 320,
    Storage: 315,
  },
  {
    name: "08:00",
    Ingestion: 850,
    Validation: 820,
    Transformation: 780,
    Storage: 770,
  },
  {
    name: "12:00",
    Ingestion: 1200,
    Validation: 1150,
    Transformation: 1100,
    Storage: 1085,
  },
  {
    name: "16:00",
    Ingestion: 950,
    Validation: 920,
    Transformation: 880,
    Storage: 870,
  },
  {
    name: "20:00",
    Ingestion: 680,
    Validation: 650,
    Transformation: 620,
    Storage: 610,
  },
];

// Categories for Data Processing Chart
export const dataProcessingCategories = [
  {
    name: "Ingestion",
    color: "hsl(220, 70%, 50%)",
  },
  {
    name: "Validation",
    color: "hsl(160, 60%, 45%)",
  },
  {
    name: "Transformation",
    color: "hsl(280, 65%, 60%)",
  },
  {
    name: "Storage",
    color: "hsl(30, 70%, 50%)",
  },
];

// Container Activity List
export const containerActivity = [
  {
    id: "container-001",
    title: "Customer Data Upload",
    type: "Upload Local Files",
    description: "Customer_Data_2024.csv uploaded successfully",
    viewed: 245,
    updated: "2 hours ago",
    status: "success",
  },
  {
    id: "container-002",
    title: "AWS S3 Connection",
    type: "Load from Cloud Storage",
    description: "Connected to S3 bucket for product images",
    viewed: 89,
    updated: "4 hours ago",
    status: "success",
  },
  {
    id: "container-003",
    title: "Sales Analytics Query",
    type: "Query Data",
    description: "Monthly sales performance query executed",
    viewed: 156,
    updated: "1 hour ago",
    status: "success",
  },
  {
    id: "container-004",
    title: "New Marketing User",
    type: "Create User",
    description: "Marketing team member profile created",
    viewed: 23,
    updated: "30 minutes ago",
    status: "success",
  },
  {
    id: "container-005",
    title: "Transaction Data Import",
    type: "Upload Local Files",
    description: "Transaction_History.json processing",
    viewed: 167,
    updated: "3 hours ago",
    status: "processing",
  },
  {
    id: "container-006",
    title: "Google Drive Integration",
    type: "Load from Cloud Storage",
    description: "Connected to Google Drive for document sync",
    viewed: 78,
    updated: "5 hours ago",
    status: "success",
  },
  {
    id: "container-007",
    title: "User Behavior Analysis",
    type: "Query Data",
    description: "Complex user journey analysis query",
    viewed: 234,
    updated: "45 minutes ago",
    status: "success",
  },
  {
    id: "container-008",
    title: "Admin User Setup",
    type: "Create User",
    description: "System administrator account created",
    viewed: 12,
    updated: "6 hours ago",
    status: "success",
  },
];

// Upload History Data
export const uploadHistory = [
  {
    fileName: "customer_segments_2024.csv",
    fileSize: "45.2 MB",
    uploadDate: "2024-01-15 09:30:00",
    uploadedBy: "john.doe@company.com",
    recordsProcessed: 125340,
    processingTime: "2m 34s",
    status: "completed"
  },
  {
    fileName: "product_catalog_update.json",
    fileSize: "12.8 MB",
    uploadDate: "2024-01-15 11:45:00",
    uploadedBy: "sarah.smith@company.com",
    recordsProcessed: 8945,
    processingTime: "45s",
    status: "completed"
  },
  {
    fileName: "transaction_data_jan.xlsx",
    fileSize: "128.5 MB",
    uploadDate: "2024-01-15 14:20:00",
    uploadedBy: "mike.johnson@company.com",
    recordsProcessed: 456789,
    processingTime: "5m 12s",
    status: "processing"
  },
  {
    fileName: "email_campaign_results.csv",
    fileSize: "23.4 MB",
    uploadDate: "2024-01-15 16:00:00",
    uploadedBy: "emily.brown@company.com",
    recordsProcessed: 67890,
    processingTime: "1m 23s",
    status: "completed"
  },
  {
    fileName: "social_media_analytics.json",
    fileSize: "8.7 MB",
    uploadDate: "2024-01-15 17:30:00",
    uploadedBy: "david.wilson@company.com",
    recordsProcessed: 0,
    processingTime: "-",
    status: "failed"
  }
];

// Cloud Storage Connections
export const cloudStorageConnections = [
  {
    provider: "AWS S3",
    bucketName: "customer-data-prod",
    region: "us-east-1",
    status: "connected",
    lastSync: "5 minutes ago",
    filesCount: 2456,
    totalSize: "1.2 TB",
    syncFrequency: "Every 15 minutes"
  },
  {
    provider: "Google Cloud Storage",
    bucketName: "analytics-reports",
    region: "us-central1",
    status: "connected",
    lastSync: "1 hour ago",
    filesCount: 892,
    totalSize: "456 GB",
    syncFrequency: "Hourly"
  },
  {
    provider: "Azure Blob Storage",
    bucketName: "backup-archive",
    region: "eastus",
    status: "disconnected",
    lastSync: "3 days ago",
    filesCount: 12450,
    totalSize: "2.8 TB",
    syncFrequency: "Daily"
  },
  {
    provider: "Dropbox Business",
    bucketName: "marketing-assets",
    region: "global",
    status: "connected",
    lastSync: "30 minutes ago",
    filesCount: 345,
    totalSize: "78 GB",
    syncFrequency: "Real-time"
  },
  {
    provider: "Box Enterprise",
    bucketName: "legal-documents",
    region: "global",
    status: "syncing",
    lastSync: "In progress",
    filesCount: 1567,
    totalSize: "234 GB",
    syncFrequency: "Every 6 hours"
  }
];

// Recent Queries
export const recentQueries = [
  {
    queryId: "QRY-001",
    queryName: "Customer Lifetime Value Analysis",
    queryType: "Analytical",
    executedBy: "lisa.anderson@company.com",
    executionTime: "3.2s",
    rowsReturned: 45678,
    executedAt: "2024-01-15 10:30:00",
    status: "completed",
    saved: true
  },
  {
    queryId: "QRY-002",
    queryName: "Monthly Revenue by Product Category",
    queryType: "Reporting",
    executedBy: "robert.taylor@company.com",
    executionTime: "1.8s",
    rowsReturned: 124,
    executedAt: "2024-01-15 11:15:00",
    status: "completed",
    saved: true
  },
  {
    queryId: "QRY-003",
    queryName: "Real-time User Activity",
    queryType: "Live",
    executedBy: "jennifer.davis@company.com",
    executionTime: "0.5s",
    rowsReturned: 2345,
    executedAt: "2024-01-15 12:00:00",
    status: "running",
    saved: false
  },
  {
    queryId: "QRY-004",
    queryName: "Churn Prediction Model Data",
    queryType: "ML Dataset",
    executedBy: "alex.martinez@company.com",
    executionTime: "45.6s",
    rowsReturned: 892345,
    executedAt: "2024-01-15 13:45:00",
    status: "completed",
    saved: true
  },
  {
    queryId: "QRY-005",
    queryName: "Campaign Performance Metrics",
    queryType: "Marketing",
    executedBy: "sophia.white@company.com",
    executionTime: "2.1s",
    rowsReturned: 5678,
    executedAt: "2024-01-15 14:30:00",
    status: "failed",
    saved: false
  }
];

// User Profiles Created
export const userProfiles = [
  {
    userId: "USR-001",
    userName: "Marketing Manager",
    email: "marketing.manager@company.com",
    role: "Marketing Admin",
    department: "Marketing",
    createdBy: "admin@company.com",
    createdAt: "2024-01-15 09:00:00",
    permissions: ["Read", "Write", "Execute", "Delete"],
    status: "active",
    lastLogin: "2024-01-15 17:30:00"
  },
  {
    userId: "USR-002",
    userName: "Data Analyst",
    email: "data.analyst@company.com",
    role: "Analyst",
    department: "Analytics",
    createdBy: "admin@company.com",
    createdAt: "2024-01-14 14:30:00",
    permissions: ["Read", "Execute"],
    status: "active",
    lastLogin: "2024-01-15 16:45:00"
  },
  {
    userId: "USR-003",
    userName: "Sales Director",
    email: "sales.director@company.com",
    role: "Sales Admin",
    department: "Sales",
    createdBy: "admin@company.com",
    createdAt: "2024-01-13 11:00:00",
    permissions: ["Read", "Write", "Execute"],
    status: "active",
    lastLogin: "2024-01-15 12:00:00"
  },
  {
    userId: "USR-004",
    userName: "Customer Support Lead",
    email: "support.lead@company.com",
    role: "Support Manager",
    department: "Customer Service",
    createdBy: "hr.admin@company.com",
    createdAt: "2024-01-12 10:15:00",
    permissions: ["Read", "Write"],
    status: "pending",
    lastLogin: "-"
  },
  {
    userId: "USR-005",
    userName: "Product Manager",
    email: "product.manager@company.com",
    role: "Product Admin",
    department: "Product",
    createdBy: "cto@company.com",
    createdAt: "2024-01-11 15:45:00",
    permissions: ["Read", "Write", "Execute"],
    status: "inactive",
    lastLogin: "2024-01-10 18:00:00"
  }
];

// Data Processing Stats
export const dataProcessingStats = {
  today: {
    filesProcessed: 1234,
    recordsIngested: 4567890,
    failedRecords: 234,
    avgProcessingTime: "2.3s",
    dataVolume: "3.4 TB"
  },
  week: {
    filesProcessed: 8945,
    recordsIngested: 34567890,
    failedRecords: 1890,
    avgProcessingTime: "2.1s",
    dataVolume: "24.5 TB"
  },
  month: {
    filesProcessed: 45678,
    recordsIngested: 234567890,
    failedRecords: 12340,
    avgProcessingTime: "2.5s",
    dataVolume: "156.8 TB"
  }
};

// Storage Usage by Type
export const storageUsageByType = [
  { type: "Customer Data", size: 45.2, percentage: 28 },
  { type: "Transaction Records", size: 78.5, percentage: 35 },
  { type: "Product Catalog", size: 12.3, percentage: 8 },
  { type: "Analytics Results", size: 34.7, percentage: 15 },
  { type: "User Logs", size: 23.8, percentage: 10 },
  { type: "Backups", size: 8.9, percentage: 4 }
];

// API Usage Statistics
export const apiUsageStats = [
  {
    endpoint: "/api/v1/upload",
    method: "POST",
    callsToday: 4567,
    avgResponseTime: "234ms",
    successRate: 98.5,
    errorRate: 1.5
  },
  {
    endpoint: "/api/v1/query",
    method: "GET",
    callsToday: 12890,
    avgResponseTime: "89ms",
    successRate: 99.2,
    errorRate: 0.8
  },
  {
    endpoint: "/api/v1/users",
    method: "POST",
    callsToday: 234,
    avgResponseTime: "156ms",
    successRate: 97.8,
    errorRate: 2.2
  },
  {
    endpoint: "/api/v1/sync",
    method: "PUT",
    callsToday: 890,
    avgResponseTime: "567ms",
    successRate: 95.4,
    errorRate: 4.6
  },
  {
    endpoint: "/api/v1/export",
    method: "GET",
    callsToday: 567,
    avgResponseTime: "1234ms",
    successRate: 94.2,
    errorRate: 5.8
  }
];

// Data Quality Metrics by Source
export const dataQualityBySource = [
  {
    source: "CRM System",
    completeness: 98.5,
    accuracy: 97.2,
    consistency: 96.8,
    timeliness: 99.1,
    uniqueness: 98.9,
    overallScore: 98.1
  },
  {
    source: "E-commerce Platform",
    completeness: 97.8,
    accuracy: 98.5,
    consistency: 97.1,
    timeliness: 98.7,
    uniqueness: 99.2,
    overallScore: 98.3
  },
  {
    source: "Mobile App",
    completeness: 95.4,
    accuracy: 96.8,
    consistency: 94.2,
    timeliness: 97.5,
    uniqueness: 97.8,
    overallScore: 96.3
  },
  {
    source: "Social Media",
    completeness: 92.3,
    accuracy: 94.5,
    consistency: 91.8,
    timeliness: 95.2,
    uniqueness: 93.6,
    overallScore: 93.5
  },
  {
    source: "Email Marketing",
    completeness: 99.1,
    accuracy: 98.7,
    consistency: 98.9,
    timeliness: 99.5,
    uniqueness: 99.8,
    overallScore: 99.2
  }
];

// Data Transformation Rules
export const transformationRules = [
  {
    rule: "Email Normalization",
    applied: 45230,
    success: 44980,
    failed: 250,
    successRate: 99.4
  },
  {
    rule: "Phone Format Standardization",
    applied: 38920,
    success: 37850,
    failed: 1070,
    successRate: 97.2
  },
  {
    rule: "Address Geocoding",
    applied: 28340,
    success: 26890,
    failed: 1450,
    successRate: 94.9
  },
  {
    rule: "Currency Conversion",
    applied: 15670,
    success: 15670,
    failed: 0,
    successRate: 100
  },
  {
    rule: "Date Standardization",
    applied: 52180,
    success: 51920,
    failed: 260,
    successRate: 99.5
  }
];