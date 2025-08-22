import { type Contact, ContactActivity, type Stakeholder, type Vendor } from "@/types/contact";

export const sampleContacts: Contact[] = [
  {
    id: 'contact_001',
    firstName: 'Raj',
    lastName: 'Sharma',
    fullName: 'Raj Sharma',
    email: 'raj.sharma@techcorp.com',
    phone: '+91 98765 43210',
    company: 'TechCorp Solutions',
    designation: 'CEO',
    industry: 'Technology',
    location: 'Mumbai, Maharashtra',
    source: 'linkedin',
    score: 85,
    stage: 'opportunity',
    tags: ['High Value', 'Decision Maker', 'Tech Sector'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/rajsharma',
      twitter: '@rajsharma_ceo'
    },
    enrichmentData: {
      companySize: '100-500',
      revenue: '$5M-$10M',
      verified: true,
      lastEnriched: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    activities: [
      {
        id: 'activity_001',
        type: 'call',
        title: 'Initial Discovery Call',
        description: 'Discussed business loan requirements for expansion',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        outcome: 'Interested in ₹25L business loan',
        nextAction: 'Send proposal'
      },
      {
        id: 'activity_002',
        type: 'email',
        title: 'Sent Welcome Email',
        description: 'Introduction email with company brochure',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    assignedAgent: 'agent_001'
  },
  {
    id: 'contact_002',
    firstName: 'Priya',
    lastName: 'Singh',
    fullName: 'Priya Singh',
    email: 'priya@fashiontrends.com',
    phone: '+91 87654 32109',
    company: 'Fashion Trends Pvt Ltd',
    designation: 'Founder',
    industry: 'Retail',
    location: 'Delhi, Delhi',
    source: 'referral',
    score: 92,
    stage: 'lead',
    tags: ['Female Entrepreneur', 'Retail', 'Working Capital'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/priyasingh',
      facebook: 'https://facebook.com/fashiontrends'
    },
    enrichmentData: {
      companySize: '50-100',
      revenue: '$1M-$5M',
      verified: true,
      lastEnriched: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    activities: [
      {
        id: 'activity_003',
        type: 'meeting',
        title: 'Office Visit',
        description: 'Visited office to understand business operations',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        outcome: 'Strong potential for working capital loan',
        nextAction: 'Prepare detailed proposal'
      }
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    assignedAgent: 'agent_001'
  },
  {
    id: 'contact_003',
    firstName: 'Amit',
    lastName: 'Kumar',
    fullName: 'Amit Kumar',
    email: 'amit.kumar@kumarenterprises.in',
    phone: '+91 76543 21098',
    company: 'Kumar Enterprises',
    designation: 'Managing Director',
    industry: 'Manufacturing',
    location: 'Pune, Maharashtra',
    source: 'manual',
    score: 78,
    stage: 'customer',
    tags: ['Existing Customer', 'Manufacturing', 'Equipment Finance'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/amitkumar'
    },
    enrichmentData: {
      companySize: '200-1000',
      revenue: '$10M-$50M',
      verified: true,
      lastEnriched: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    activities: [
      {
        id: 'activity_004',
        type: 'deal',
        title: 'Equipment Loan Approved',
        description: 'Successfully disbursed ₹32L equipment financing',
        timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        outcome: 'Loan disbursed successfully'
      }
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    assignedAgent: 'agent_001'
  },
  {
    id: 'contact_004',
    firstName: 'Sunita',
    lastName: 'Devi',
    fullName: 'Sunita Devi',
    email: 'sunita@greenvegfarms.com',
    phone: '+91 65432 10987',
    company: 'Green Vegetable Farms',
    designation: 'Owner',
    industry: 'Agriculture',
    location: 'Patna, Bihar',
    source: 'apollo',
    score: 65,
    stage: 'prospect',
    tags: ['Agriculture', 'Rural', 'First Time Borrower'],
    socialProfiles: {},
    enrichmentData: {
      companySize: '10-50',
      revenue: '$100K-$1M',
      verified: false,
      lastEnriched: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    activities: [
      {
        id: 'activity_005',
        type: 'note',
        title: 'Initial Contact',
        description: 'Interested in agricultural loan for farm expansion',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    assignedAgent: 'agent_001'
  },
  {
    id: 'contact_005',
    firstName: 'Vikash',
    lastName: 'Patel',
    fullName: 'Vikash Patel',
    email: 'vikash.patel@medicalservices.com',
    phone: '+91 54321 09876',
    company: 'Advanced Medical Services',
    designation: 'Director',
    industry: 'Healthcare',
    location: 'Ahmedabad, Gujarat',
    source: 'lusha',
    score: 88,
    stage: 'customer',
    tags: ['Healthcare', 'Medical Equipment', 'Repeat Customer'],
    socialProfiles: {
      linkedin: 'https://linkedin.com/in/vikashpatel'
    },
    enrichmentData: {
      companySize: '100-200',
      revenue: '$2M-$10M',
      verified: true,
      lastEnriched: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    activities: [
      {
        id: 'activity_006',
        type: 'deal',
        title: 'Personal Loan Closed',
        description: 'Successfully closed ₹15L personal loan',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        outcome: 'Loan disbursed, customer satisfied'
      }
    ],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    assignedAgent: 'agent_001'
  }
];

export const sampleStakeholders: Stakeholder[] = [
  {
    id: 'stakeholder_001',
    contactId: 'contact_001',
    type: 'internal',
    role: 'decision_maker',
    influence: 9,
    relationship: 'strong',
    notes: 'Final decision maker for all financial decisions'
  },
  {
    id: 'stakeholder_002',
    contactId: 'contact_001',
    type: 'internal',
    role: 'influencer',
    influence: 7,
    relationship: 'medium',
    notes: 'CFO who influences financial decisions'
  },
  {
    id: 'stakeholder_003',
    contactId: 'contact_002',
    type: 'external',
    role: 'influencer',
    influence: 6,
    relationship: 'strong',
    notes: 'Business consultant who advises on financial matters'
  }
];

export const sampleVendors: Vendor[] = [
  {
    id: 'vendor_001',
    name: 'TechSoft Solutions',
    contactPerson: 'Rahul Verma',
    email: 'rahul@techsoft.com',
    phone: '+91 99887 76655',
    category: 'Technology Services',
    status: 'active',
    rating: 4.5,
    contracts: [
      {
        id: 'contract_001',
        title: 'CRM Software License',
        value: 500000,
        startDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: 'active'
      }
    ]
  },
  {
    id: 'vendor_002',
    name: 'DataFlow Analytics',
    contactPerson: 'Neha Gupta',
    email: 'neha@dataflow.in',
    phone: '+91 88776 65544',
    category: 'Data Services',
    status: 'active',
    rating: 4.2,
    contracts: [
      {
        id: 'contract_002',
        title: 'Lead Intelligence Platform',
        value: 750000,
        startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 185 * 24 * 60 * 60 * 1000),
        status: 'active'
      }
    ]
  },
  {
    id: 'vendor_003',
    name: 'CloudComm Services',
    contactPerson: 'Suresh Rao',
    email: 'suresh@cloudcomm.co.in',
    phone: '+91 77665 54433',
    category: 'Communication',
    status: 'inactive',
    rating: 3.8,
    contracts: [
      {
        id: 'contract_003',
        title: 'WhatsApp Business API',
        value: 200000,
        startDate: new Date(Date.now() - 545 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        status: 'expired'
      }
    ]
  }
];