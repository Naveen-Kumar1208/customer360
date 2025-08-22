export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address: CustomerAddress;
  company?: CustomerCompany;
  customerType: 'individual' | 'business';
  status: 'prospect' | 'active' | 'inactive' | 'churned' | 'vip';
  segment: 'premium' | 'standard' | 'basic';
  acquisitionDate: Date;
  lastActivityDate: Date;
  totalValue: number;
  lifetimeValue: number;
  riskScore: number;
  creditScore?: number;
  products: CustomerProduct[];
  journey: CustomerJourneyEvent[];
  preferences: CustomerPreferences;
  documents: CustomerDocument[];
  tags: string[];
  assignedAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  type: 'permanent' | 'current' | 'office';
}

export interface CustomerCompany {
  name: string;
  industry: string;
  size: string;
  designation: string;
  workExperience: number;
  monthlyIncome: number;
  website?: string;
}

export interface CustomerProduct {
  id: string;
  type: 'personal_loan' | 'business_loan' | 'home_loan' | 'car_loan' | 'education_loan' | 'credit_card';
  name: string;
  status: 'active' | 'closed' | 'defaulted' | 'pending' | 'rejected';
  amount: number;
  disbursedAmount?: number;
  interestRate: number;
  tenure: number;
  startDate: Date;
  endDate?: Date;
  emi: number;
  outstandingAmount: number;
  lastPaymentDate?: Date;
  nextPaymentDate?: Date;
  paymentHistory: PaymentHistory[];
}

export interface PaymentHistory {
  id: string;
  date: Date;
  amount: number;
  type: 'emi' | 'prepayment' | 'late_fee' | 'processing_fee';
  status: 'paid' | 'pending' | 'failed' | 'overdue';
  mode: 'online' | 'cheque' | 'cash' | 'auto_debit';
}

export interface CustomerJourneyEvent {
  id: string;
  type: 'touchpoint' | 'interaction' | 'transaction' | 'milestone' | 'issue';
  category: 'website' | 'email' | 'phone' | 'branch' | 'app' | 'sms' | 'whatsapp';
  title: string;
  description: string;
  timestamp: Date;
  outcome?: 'positive' | 'negative' | 'neutral';
  value?: number;
  metadata?: { [key: string]: any };
  agent?: string;
}

export interface CustomerPreferences {
  communicationChannel: 'email' | 'sms' | 'whatsapp' | 'phone' | 'all';
  language: 'english' | 'hindi' | 'regional';
  bestTimeToContact: 'morning' | 'afternoon' | 'evening';
  marketingConsent: boolean;
  dataProcessingConsent: boolean;
  reminderPreference: boolean;
}

export interface CustomerDocument {
  id: string;
  type: 'aadhar' | 'pan' | 'passport' | 'driving_license' | 'income_proof' | 'bank_statement' | 'other';
  name: string;
  url: string;
  verified: boolean;
  uploadedAt: Date;
  verifiedAt?: Date;
  expiryDate?: Date;
}

export interface CustomerInsight {
  id: string;
  customerId: string;
  type: 'behavior' | 'preference' | 'risk' | 'opportunity' | 'churn_risk';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  recommendedActions: string[];
  generatedAt: Date;
}

export interface CustomerSupport {
  id: string;
  customerId: string;
  type: 'complaint' | 'query' | 'request' | 'feedback';
  category: 'product' | 'service' | 'billing' | 'technical' | 'other';
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedAgent: string;
  createdAt: Date;
  resolvedAt?: Date;
  satisfactionRating?: number;
  resolution?: string;
}