import type { AgentKPIMetrics, PipelineStage, ActivityItem, TaskItem, Lead } from "@/types/agent";

export const agentKPIData: AgentKPIMetrics = {
  leadsToday: {
    value: 23,
    trend: 15.2,
    target: 25
  },
  applicationsSubmitted: {
    value: 8,
    trend: 12.5,
    period: 'daily'
  },
  conversionRate: {
    value: 34.5,
    trend: -2.1,
    target: 35.0
  },
  totalDisbursed: {
    value: 2450000,
    trend: 8.7,
    currency: 'INR'
  },
  pipelineValue: {
    value: 8900000,
    trend: 18.4,
    currency: 'INR'
  },
  responseRate: {
    value: 67.8,
    trend: 5.3,
    target: 70.0
  }
};

export const pipelineStages: PipelineStage[] = [
  {
    id: 'tofu',
    name: 'TOFU - Awareness',
    count: 145,
    value: 2900000,
    conversionRate: 45.2,
    averageDays: 3,
    color: '#3b82f6'
  },
  {
    id: 'mofu',
    name: 'MOFU - Consideration',
    count: 67,
    value: 3400000,
    conversionRate: 62.8,
    averageDays: 7,
    color: '#f59e0b'
  },
  {
    id: 'bofu',
    name: 'BOFU - Decision',
    count: 23,
    value: 2600000,
    conversionRate: 78.9,
    averageDays: 12,
    color: '#10b981'
  }
];

export const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'lead_created',
    title: 'New Lead Added',
    description: 'Raj Sharma from TechCorp expressed interest in business loan',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    leadId: 'lead_001',
    contactName: 'Raj Sharma'
  },
  {
    id: '2',
    type: 'application_submitted',
    title: 'Application Submitted',
    description: 'Complete application received for ₹25L business loan',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    leadId: 'lead_002',
    contactName: 'Priya Singh',
    amount: 2500000
  },
  {
    id: '3',
    type: 'call_scheduled',
    title: 'Call Scheduled',
    description: 'Follow-up call scheduled for loan terms discussion',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    leadId: 'lead_003',
    contactName: 'Amit Kumar'
  },
  {
    id: '4',
    type: 'email_sent',
    title: 'Email Campaign Sent',
    description: 'Monthly newsletter sent to 234 prospects',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: '5',
    type: 'deal_closed',
    title: 'Deal Closed - Won',
    description: 'Successfully closed ₹15L personal loan for Vikash Patel',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    leadId: 'lead_004',
    contactName: 'Vikash Patel',
    amount: 1500000
  }
];

export const todayTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Follow-up call with Raj Sharma',
    type: 'call',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    leadId: 'lead_001',
    contactName: 'Raj Sharma',
    completed: false,
    description: 'Discuss loan requirements and documentation needed'
  },
  {
    id: '2',
    title: 'Send loan proposal to Priya Singh',
    type: 'email',
    priority: 'high',
    dueDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
    leadId: 'lead_002',
    contactName: 'Priya Singh',
    completed: false,
    description: 'Customized business loan proposal with terms'
  },
  {
    id: '3',
    title: 'Document verification for Amit Kumar',
    type: 'document',
    priority: 'medium',
    dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
    leadId: 'lead_003',
    contactName: 'Amit Kumar',
    completed: false,
    description: 'Review and verify submitted KYC documents'
  },
  {
    id: '4',
    title: 'Site visit for collateral assessment',
    type: 'visit',
    priority: 'medium',
    dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
    leadId: 'lead_005',
    contactName: 'Sunita Devi',
    completed: false,
    description: 'Physical verification of property for secured loan'
  },
  {
    id: '5',
    title: 'Update CRM with meeting notes',
    type: 'follow_up',
    priority: 'low',
    dueDate: new Date(Date.now() - 30 * 60 * 1000),
    leadId: 'lead_006',
    contactName: 'Rohit Gupta',
    completed: true,
    description: 'Add meeting summary and next steps to CRM'
  }
];

export const sampleLeads: Lead[] = [
  {
    id: 'lead_001',
    name: 'Raj Sharma',
    company: 'TechCorp Solutions',
    email: 'raj.sharma@techcorp.com',
    phone: '+91 98765 43210',
    source: 'Website Form',
    stage: 'tofu',
    score: 75,
    value: 2500000,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
    tags: ['Business Loan', 'High Value', 'Tech Sector'],
    assignedAgent: 'agent_001',
    campaignLead: 'Digital Marketing Campaign',
    conversionRate: 15.2,
    costPerLead: 3200,
    keyFactors: ['Tech sector expertise', 'High credit score', 'Growing revenue', 'Quick decision maker']
  },
  {
    id: 'lead_002',
    name: 'Priya Singh',
    company: 'Fashion Trends Pvt Ltd',
    email: 'priya@fashiontrends.com',
    phone: '+91 87654 32109',
    source: 'LinkedIn',
    stage: 'mofu',
    score: 89,
    value: 1800000,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
    tags: ['Working Capital', 'Retail', 'Female Entrepreneur'],
    assignedAgent: 'agent_001',
    campaignLead: 'LinkedIn Outreach Campaign',
    conversionRate: 22.8,
    costPerLead: 1850,
    keyFactors: ['Female entrepreneur', 'Strong business plan', 'Retail experience', 'Government backing']
  },
  {
    id: 'lead_003',
    name: 'Amit Kumar',
    company: 'Kumar Enterprises',
    email: 'amit.kumar@kumarenterprises.in',
    phone: '+91 76543 21098',
    source: 'Referral',
    stage: 'bofu',
    score: 92,
    value: 3200000,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tags: ['Equipment Finance', 'Manufacturing', 'Existing Customer'],
    assignedAgent: 'agent_001',
    campaignLead: 'Referral Program',
    conversionRate: 35.4,
    costPerLead: 450,
    keyFactors: ['Existing customer', 'Manufacturing expertise', 'Excellent payment history', 'Equipment upgrade']
  }
];