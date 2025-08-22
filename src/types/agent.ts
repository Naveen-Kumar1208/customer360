export interface AgentKPIMetrics {
  leadsToday: {
    value: number;
    trend: number;
    target?: number;
  };
  applicationsSubmitted: {
    value: number;
    trend: number;
    period: 'daily' | 'weekly' | 'monthly';
  };
  conversionRate: {
    value: number;
    trend: number;
    target: number;
  };
  totalDisbursed: {
    value: number;
    trend: number;
    currency: string;
  };
  pipelineValue: {
    value: number;
    trend: number;
    currency: string;
  };
  responseRate: {
    value: number;
    trend: number;
    target: number;
  };
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  value: number;
  conversionRate: number;
  averageDays: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'lead_created' | 'application_submitted' | 'call_scheduled' | 'email_sent' | 'meeting_completed' | 'deal_closed';
  title: string;
  description: string;
  timestamp: Date;
  leadId?: string;
  contactName?: string;
  amount?: number;
}

export interface TaskItem {
  id: string;
  title: string;
  type: 'call' | 'email' | 'visit' | 'document' | 'follow_up';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  leadId?: string;
  contactName?: string;
  completed: boolean;
  description?: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  stage: 'tofu' | 'mofu' | 'bofu';
  score: number;
  value: number;
  createdAt: Date;
  lastActivity: Date;
  tags: string[];
  assignedAgent: string;
  // Campaign Metrics
  campaignLead?: string;
  conversionRate?: number;
  costPerLead?: number;
  // Key Factors
  keyFactors?: string[];
}