export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  industry: string;
  location: string;
  source: 'manual' | 'import' | 'lusha' | 'apollo' | 'linkedin' | 'referral';
  score: number;
  stage: 'prospect' | 'lead' | 'opportunity' | 'customer' | 'churned';
  tags: string[];
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  enrichmentData: {
    companySize?: string;
    revenue?: string;
    verified: boolean;
    lastEnriched?: Date;
  };
  activities: ContactActivity[];
  createdAt: Date;
  updatedAt: Date;
  assignedAgent: string;
}

export interface ContactActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal';
  title: string;
  description?: string;
  timestamp: Date;
  outcome?: string;
  nextAction?: string;
}

export interface ContactFilter {
  search?: string;
  stage?: string[];
  source?: string[];
  industry?: string[];
  scoreRange?: [number, number];
  location?: string[];
  tags?: string[];
  assignedAgent?: string[];
  dateRange?: {
    field: 'createdAt' | 'updatedAt' | 'lastActivity';
    start: Date;
    end: Date;
  };
}

export interface Stakeholder {
  id: string;
  contactId: string;
  type: 'internal' | 'external';
  role: 'decision_maker' | 'influencer' | 'user' | 'gatekeeper';
  influence: number; // 1-10 scale
  relationship: 'strong' | 'medium' | 'weak';
  notes?: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  status: 'active' | 'inactive' | 'blacklisted';
  rating: number;
  contracts: VendorContract[];
}

export interface VendorContract {
  id: string;
  title: string;
  value: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'expired' | 'terminated';
}