import type { Customer, CustomerJourneyEvent, CustomerProduct, CustomerInsight } from "@/types/customer";

export const sampleCustomers: Customer[] = [
  {
    id: 'cust_001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    fullName: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 87654 32109',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'male',
    address: {
      street: '123, MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
      type: 'permanent'
    },
    company: {
      name: 'Tech Solutions Pvt Ltd',
      industry: 'Information Technology',
      size: '200-500',
      designation: 'Senior Software Engineer',
      workExperience: 8,
      monthlyIncome: 85000,
      website: 'https://techsolutions.com'
    },
    customerType: 'individual',
    status: 'active',
    segment: 'premium',
    acquisitionDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    lastActivityDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    totalValue: 2500000,
    lifetimeValue: 3200000,
    riskScore: 15,
    creditScore: 780,
    products: [],
    journey: [],
    preferences: {
      communicationChannel: 'email',
      language: 'english',
      bestTimeToContact: 'evening',
      marketingConsent: true,
      dataProcessingConsent: true,
      reminderPreference: true
    },
    documents: [],
    tags: ['High Value', 'Tech Professional', 'Regular Payer'],
    assignedAgent: 'agent_001',
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'cust_002',
    firstName: 'Priya',
    lastName: 'Sharma',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 87654 32109',
    dateOfBirth: new Date('1990-07-22'),
    gender: 'female',
    address: {
      street: '456, Sector 15',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      country: 'India',
      type: 'permanent'
    },
    company: {
      name: 'Marketing Dynamics',
      industry: 'Marketing & Advertising',
      size: '50-200',
      designation: 'Marketing Manager',
      workExperience: 6,
      monthlyIncome: 65000
    },
    customerType: 'individual',
    status: 'active',
    segment: 'standard',
    acquisitionDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    lastActivityDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    totalValue: 1800000,
    lifetimeValue: 2200000,
    riskScore: 25,
    creditScore: 720,
    products: [],
    journey: [],
    preferences: {
      communicationChannel: 'whatsapp',
      language: 'english',
      bestTimeToContact: 'afternoon',
      marketingConsent: true,
      dataProcessingConsent: true,
      reminderPreference: true
    },
    documents: [],
    tags: ['Female Professional', 'Marketing Sector', 'Potential Upsell'],
    assignedAgent: 'agent_001',
    createdAt: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'cust_003',
    firstName: 'Amit',
    lastName: 'Patel',
    fullName: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 76543 21098',
    dateOfBirth: new Date('1982-11-08'),
    gender: 'male',
    address: {
      street: '789, Commercial Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
      type: 'permanent'
    },
    company: {
      name: 'Patel Enterprises',
      industry: 'Manufacturing',
      size: '100-500',
      designation: 'Business Owner',
      workExperience: 15,
      monthlyIncome: 150000
    },
    customerType: 'business',
    status: 'vip',
    segment: 'premium',
    acquisitionDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    lastActivityDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    totalValue: 5200000,
    lifetimeValue: 6800000,
    riskScore: 10,
    creditScore: 820,
    products: [],
    journey: [],
    preferences: {
      communicationChannel: 'phone',
      language: 'hindi',
      bestTimeToContact: 'morning',
      marketingConsent: false,
      dataProcessingConsent: true,
      reminderPreference: true
    },
    documents: [],
    tags: ['VIP Customer', 'Business Owner', 'Long Term Client', 'High Value'],
    assignedAgent: 'agent_001',
    createdAt: new Date(Date.now() - 380 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'cust_004',
    firstName: 'Sunita',
    lastName: 'Singh',
    fullName: 'Sunita Singh',
    email: 'sunita.singh@email.com',
    phone: '+91 65432 10987',
    dateOfBirth: new Date('1988-05-12'),
    gender: 'female',
    address: {
      street: '321, Civil Lines',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India',
      type: 'permanent'
    },
    company: {
      name: 'Government Service',
      industry: 'Government',
      size: '1000+',
      designation: 'Assistant Manager',
      workExperience: 10,
      monthlyIncome: 55000
    },
    customerType: 'individual',
    status: 'active',
    segment: 'standard',
    acquisitionDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastActivityDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    totalValue: 1200000,
    lifetimeValue: 1500000,
    riskScore: 20,
    creditScore: 710,
    products: [],
    journey: [],
    preferences: {
      communicationChannel: 'sms',
      language: 'hindi',
      bestTimeToContact: 'evening',
      marketingConsent: true,
      dataProcessingConsent: true,
      reminderPreference: false
    },
    documents: [],
    tags: ['Government Employee', 'Stable Income', 'Conservative Investor'],
    assignedAgent: 'agent_001',
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  }
];

export const sampleProducts: CustomerProduct[] = [
  {
    id: 'prod_001',
    type: 'personal_loan',
    name: 'Personal Loan - Premium',
    status: 'active',
    amount: 2500000,
    disbursedAmount: 2500000,
    interestRate: 10.5,
    tenure: 60,
    startDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
    emi: 53494,
    outstandingAmount: 2156000,
    lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextPaymentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    paymentHistory: []
  },
  {
    id: 'prod_002',
    type: 'business_loan',
    name: 'Business Expansion Loan',
    status: 'active',
    amount: 5200000,
    disbursedAmount: 5200000,
    interestRate: 12.0,
    tenure: 84,
    startDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
    emi: 81250,
    outstandingAmount: 4680000,
    lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextPaymentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    paymentHistory: []
  },
  {
    id: 'prod_003',
    type: 'home_loan',
    name: 'Home Loan - Standard',
    status: 'active',
    amount: 1800000,
    disbursedAmount: 1800000,
    interestRate: 8.5,
    tenure: 240,
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    emi: 17654,
    outstandingAmount: 1750000,
    lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    nextPaymentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    paymentHistory: []
  }
];

export const sampleJourneyEvents: CustomerJourneyEvent[] = [
  {
    id: 'journey_001',
    type: 'touchpoint',
    category: 'website',
    title: 'Website Visit',
    description: 'Customer visited loan application page',
    timestamp: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    metadata: { source: 'google_ads', page: '/personal-loan' }
  },
  {
    id: 'journey_002',
    type: 'interaction',
    category: 'phone',
    title: 'Initial Consultation Call',
    description: 'Agent conducted loan consultation and eligibility check',
    timestamp: new Date(Date.now() - 190 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    agent: 'agent_001',
    metadata: { duration: 25, interest_shown: 'high' }
  },
  {
    id: 'journey_003',
    type: 'milestone',
    category: 'app',
    title: 'Application Submitted',
    description: 'Customer completed and submitted loan application',
    timestamp: new Date(Date.now() - 185 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    value: 2500000,
    metadata: { application_id: 'APP001', documents_uploaded: 8 }
  },
  {
    id: 'journey_004',
    type: 'interaction',
    category: 'email',
    title: 'Document Verification',
    description: 'Customer provided additional income documents',
    timestamp: new Date(Date.now() - 175 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    metadata: { documents: ['salary_slip', 'bank_statement'] }
  },
  {
    id: 'journey_005',
    type: 'milestone',
    category: 'branch',
    title: 'Loan Approved',
    description: 'Loan application approved after credit assessment',
    timestamp: new Date(Date.now() - 160 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    value: 2500000,
    agent: 'agent_001',
    metadata: { approval_amount: 2500000, interest_rate: 10.5 }
  },
  {
    id: 'journey_006',
    type: 'transaction',
    category: 'app',
    title: 'Loan Disbursement',
    description: 'Loan amount disbursed to customer account',
    timestamp: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    value: 2500000,
    metadata: { transaction_id: 'TXN001', disbursement_mode: 'NEFT' }
  },
  {
    id: 'journey_007',
    type: 'interaction',
    category: 'whatsapp',
    title: 'Payment Reminder',
    description: 'Monthly EMI payment reminder sent',
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    outcome: 'neutral',
    metadata: { emi_amount: 53494, due_date: '2024-01-05' }
  },
  {
    id: 'journey_008',
    type: 'transaction',
    category: 'app',
    title: 'EMI Payment',
    description: 'Monthly EMI payment completed successfully',
    timestamp: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    outcome: 'positive',
    value: 53494,
    metadata: { payment_mode: 'auto_debit', transaction_id: 'PAY001' }
  }
];

export const sampleInsights: CustomerInsight[] = [
  {
    id: 'insight_001',
    customerId: 'cust_001',
    type: 'opportunity',
    title: 'Credit Card Upsell Opportunity',
    description: 'Customer has excellent payment history and credit score. Strong candidate for premium credit card.',
    confidence: 87,
    impact: 'high',
    actionable: true,
    recommendedActions: [
      'Schedule call to discuss credit card benefits',
      'Send personalized credit card offer',
      'Invite to branch for detailed discussion'
    ],
    generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'insight_002',
    customerId: 'cust_002',
    type: 'behavior',
    title: 'Prefers Digital Channels',
    description: 'Customer primarily uses mobile app and WhatsApp for interactions. Rarely visits branch.',
    confidence: 94,
    impact: 'medium',
    actionable: true,
    recommendedActions: [
      'Focus on digital communication channels',
      'Offer app-exclusive features and benefits',
      'Send product updates via WhatsApp'
    ],
    generatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'insight_003',
    customerId: 'cust_003',
    type: 'preference',
    title: 'Values Personal Relationship',
    description: 'Customer prefers phone calls and personal meetings. High-touch service approach needed.',
    confidence: 91,
    impact: 'high',
    actionable: true,
    recommendedActions: [
      'Assign dedicated relationship manager',
      'Schedule regular check-in calls',
      'Prioritize face-to-face meetings'
    ],
    generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'insight_004',
    customerId: 'cust_004',
    type: 'risk',
    title: 'Slight Payment Delay Pattern',
    description: 'Customer has been making payments 2-3 days after due date in recent months.',
    confidence: 78,
    impact: 'medium',
    actionable: true,
    recommendedActions: [
      'Enable automatic payment reminders',
      'Offer EMI restructuring options',
      'Schedule financial counseling session'
    ],
    generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

// Assign products to customers
sampleCustomers[0].products = [sampleProducts[0]];
sampleCustomers[1].products = [sampleProducts[2]];
sampleCustomers[2].products = [sampleProducts[1]];

// Assign journey events to customers
sampleCustomers[0].journey = sampleJourneyEvents;