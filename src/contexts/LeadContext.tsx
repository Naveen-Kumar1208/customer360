"use client";

import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react'
import { customersData } from '@/lib/data/projectsData';

// Lead types for different stages
export interface BaseLead {
  id: number;
  name: string;
  email: string;
  company: string;
  title: string;
  source: string;
  engagement_score?: number;
  status: string;
  last_activity: string;
  created_date: string;
  phone: string;
  industry: string;
  company_size: string;
  notes?: string;
  moved_date?: string;
  original_stage?: string;
}

export interface TofuLead extends BaseLead {
  content_downloaded: string;
}

export interface MofuLead extends BaseLead {
  lead_score: number;
  content_consumed: string;
  converting_time: number; // Time in hours
}

export interface BofuLead extends BaseLead {
  deal_value: number;
  lead_score: number;
  sales_stage: string;
  close_probability: number;
  content_consumed: string;
  converting_time: number; // Time in hours
}

export interface ColdLead extends BaseLead {
  value: number;
  stage: string;
  days_inactive: number;
  moved_date: string;
  original_stage: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  tier: string;
  registrationDate: string;
  lastLogin: string;
  totalSpent: number;
  orderCount: number;
  lifetimeValue: number;
  location: string;
  source: string;
  segment: string;
  tags: string[];
  // Lead origin tracking
  originalLeadId?: number;
  movedFromStage?: string;
  movedDate?: string;
  conversionNotes?: string;
}

export type Lead = TofuLead | MofuLead | BofuLead | ColdLead;

export interface LeadMovement {
  leadId: number;
  fromStage: string;
  toStage: string;
  notes: string;
  timestamp: string;
}

interface LeadContextType {
  leads: {
    tofu: TofuLead[];
    mofu: MofuLead[];
    bofu: BofuLead[];
    cold: ColdLead[];
  };
  customers: Customer[];
  moveLead: (leadId: number, fromStage: string, toStage: string, notes: string) => void;
  addCustomer: (customer: Customer) => void;
  recentMovements: LeadMovement[];
  resetToOriginalData: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

// Initial lead data
const initialTofuLeads: TofuLead[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Solutions",
    title: "Marketing Director",
    source: "Blog Download",
    engagement_score: 65,
    status: "new",
    last_activity: "Downloaded whitepaper",
    created_date: "2024-01-15",
    phone: "+1 (555) 123-4567",
    industry: "Technology",
    company_size: "51-200",
    content_downloaded: "Digital Marketing Guide"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@innovatestart.com",
    company: "InnovateStart",
    title: "Founder",
    source: "Webinar Registration",
    engagement_score: 72,
    status: "engaged",
    last_activity: "Attended webinar",
    created_date: "2024-01-14",
    phone: "+1 (555) 234-5678",
    industry: "Startup",
    company_size: "1-10",
    content_downloaded: "Startup Growth Playbook"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@globalcorp.com",
    company: "Global Corp",
    title: "VP Marketing",
    source: "Social Media",
    engagement_score: 58,
    status: "cold",
    last_activity: "Liked LinkedIn post",
    created_date: "2024-01-13",
    phone: "+1 (555) 345-6789",
    industry: "Manufacturing",
    company_size: "501-1000",
    content_downloaded: "Industry Report 2024"
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@fastgrowth.io",
    company: "FastGrowth.io",
    title: "Growth Manager",
    source: "Content Syndication",
    engagement_score: 80,
    status: "hot",
    last_activity: "Downloaded case study",
    created_date: "2024-01-12",
    phone: "+1 (555) 456-7890",
    industry: "SaaS",
    company_size: "11-50",
    content_downloaded: "SaaS Growth Case Study"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.t@retailpro.com",
    company: "RetailPro Inc",
    title: "Digital Marketing Lead",
    source: "SEO/Organic",
    engagement_score: 45,
    status: "new",
    last_activity: "Visited pricing page",
    created_date: "2024-01-11",
    phone: "+1 (555) 567-8901",
    industry: "Retail",
    company_size: "201-500",
    content_downloaded: "Retail Digital Transformation"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "j.wilson@consultpro.com",
    company: "ConsultPro",
    title: "Senior Consultant",
    source: "Referral",
    engagement_score: 68,
    status: "engaged",
    last_activity: "Scheduled demo",
    created_date: "2024-01-10",
    phone: "+1 (555) 678-9012",
    industry: "Consulting",
    company_size: "51-200",
    content_downloaded: "Consulting Best Practices"
  },
  {
    id: 7,
    name: "Amanda Foster",
    email: "a.foster@digitalmarket.co",
    company: "DigitalMarket Co",
    title: "CMO",
    source: "Blog Download",
    engagement_score: 62,
    status: "warm",
    last_activity: "Downloaded multiple resources",
    created_date: "2024-01-09",
    phone: "+1 (555) 789-0123",
    industry: "Marketing",
    company_size: "101-200",
    content_downloaded: "Complete Marketing Toolkit"
  },
  {
    id: 8,
    name: "Robert Zhang",
    email: "r.zhang@healthtech.io",
    company: "HealthTech Innovations",
    title: "Product Manager",
    source: "Webinar Registration",
    engagement_score: 55,
    status: "new",
    last_activity: "Registered for webinar",
    created_date: "2024-01-08",
    phone: "+1 (555) 890-1234",
    industry: "Healthcare",
    company_size: "51-200",
    content_downloaded: "Healthcare Innovation Guide"
  },
  {
    id: 9,
    name: "Sofia Patel",
    email: "s.patel@edutech.com",
    company: "EduTech Solutions",
    title: "Director of Technology",
    source: "SEO/Organic",
    engagement_score: 73,
    status: "hot",
    last_activity: "Viewed demo video",
    created_date: "2024-01-07",
    phone: "+1 (555) 901-2345",
    industry: "Education",
    company_size: "201-500",
    content_downloaded: "EdTech Implementation Guide"
  },
  {
    id: 10,
    name: "Alex Martinez",
    email: "alex.m@financeflow.net",
    company: "FinanceFlow Networks",
    title: "VP of Operations",
    source: "Content Syndication",
    engagement_score: 67,
    status: "engaged",
    last_activity: "Downloaded ROI calculator",
    created_date: "2024-01-06",
    phone: "+1 (555) 012-3456",
    industry: "Financial Services",
    company_size: "501-1000",
    content_downloaded: "Financial ROI Calculator"
  },
  {
    id: 11,
    name: "Jessica Brown",
    email: "j.brown@retailmax.com",
    company: "RetailMax Corporation",
    title: "Head of Digital Strategy",
    source: "Social Media",
    engagement_score: 59,
    status: "warm",
    last_activity: "Shared company post",
    created_date: "2024-01-05",
    phone: "+1 (555) 123-4567",
    industry: "Retail",
    company_size: "1001+",
    content_downloaded: "Digital Strategy Playbook"
  },
  {
    id: 12,
    name: "Daniel Lee",
    email: "d.lee@manufacturepro.org",
    company: "ManufacturePro",
    title: "Operations Director",
    source: "Referral",
    engagement_score: 48,
    status: "cold",
    last_activity: "Minimal engagement",
    created_date: "2024-01-04",
    phone: "+1 (555) 234-5678",
    industry: "Manufacturing",
    company_size: "201-500",
    content_downloaded: "Manufacturing Efficiency Guide"
  },
  {
    id: 13,
    name: "Maria Garcia",
    email: "m.garcia@legaltech.co",
    company: "LegalTech Solutions",
    title: "Chief Legal Officer",
    source: "Blog Download",
    engagement_score: 75,
    status: "hot",
    last_activity: "Downloaded compliance guide",
    created_date: "2024-01-03",
    phone: "+1 (555) 345-6789",
    industry: "Legal",
    company_size: "51-200",
    content_downloaded: "Legal Compliance Framework"
  },
  {
    id: 14,
    name: "Kevin O'Connor",
    email: "k.oconnor@proptech.io",
    company: "PropTech Innovations",
    title: "Real Estate Director",
    source: "Webinar Registration",
    engagement_score: 63,
    status: "engaged",
    last_activity: "Attended full webinar",
    created_date: "2024-01-02",
    phone: "+1 (555) 456-7890",
    industry: "Real Estate",
    company_size: "101-500",
    content_downloaded: "PropTech Market Analysis"
  },
  {
    id: 15,
    name: "Nicole Wang",
    email: "n.wang@traveltech.com",
    company: "TravelTech Corp",
    title: "VP of Marketing",
    source: "SEO/Organic",
    engagement_score: 52,
    status: "new",
    last_activity: "Browsed solution pages",
    created_date: "2024-01-01",
    phone: "+1 (555) 567-8901",
    industry: "Travel & Hospitality",
    company_size: "201-500",
    content_downloaded: "Travel Industry Report"
  }
];

const initialMofuLeads: MofuLead[] = [
  {
    id: 101,
    name: "Rachel Martinez",
    email: "r.martinez@digitalcorp.com",
    company: "DigitalCorp Solutions",
    title: "VP Marketing",
    source: "Demo Request",
    engagement_score: 85,
    status: "sql",
    last_activity: "Attended product demo",
    created_date: "2024-01-10",
    phone: "+1 (555) 321-4567",
    industry: "Technology",
    company_size: "201-500",
    lead_score: 92,
    content_consumed: "Product Demo, Pricing Guide, ROI Calculator",
    converting_time: 72,
    notes: "Showed strong interest in enterprise features during demo"
  },
  {
    id: 102,
    name: "Thomas Anderson",
    email: "t.anderson@growthventures.com",
    company: "Growth Ventures",
    title: "Director of Sales",
    source: "Webinar Follow-up",
    engagement_score: 78,
    status: "mql",
    last_activity: "Downloaded case study",
    created_date: "2024-01-08",
    phone: "+1 (555) 432-5678",
    industry: "Consulting",
    company_size: "51-200",
    lead_score: 76,
    content_consumed: "Webinar Recording, Implementation Guide, Customer Stories",
    converting_time: 96,
    notes: "Engaged actively in Q&A session, evaluating multiple solutions"
  },
  {
    id: 103,
    name: "Jennifer Kim",
    email: "j.kim@enterprisetech.io",
    company: "EnterpriseTech.io",
    title: "Chief Technology Officer",
    source: "Content Download",
    engagement_score: 88,
    status: "sql",
    last_activity: "Requested pricing",
    created_date: "2024-01-05",
    phone: "+1 (555) 543-6789",
    industry: "SaaS",
    company_size: "101-500",
    lead_score: 89,
    content_consumed: "Technical Whitepaper, Security Overview, Integration Guide",
    converting_time: 48,
    notes: "Technical decision maker, focused on security and compliance"
  },
  {
    id: 104,
    name: "Mark Thompson",
    email: "m.thompson@scaleup.com",
    company: "ScaleUp Inc",
    title: "Head of Operations",
    source: "Trial Signup",
    engagement_score: 82,
    status: "opportunity",
    last_activity: "Started free trial",
    created_date: "2024-01-03",
    phone: "+1 (555) 654-7890",
    industry: "E-commerce",
    company_size: "11-50",
    lead_score: 84,
    content_consumed: "Free Trial, Setup Guide, Best Practices Guide",
    converting_time: 120,
    notes: "Active trial user, implementing core features successfully"
  },
  {
    id: 105,
    name: "Lisa Chang",
    email: "l.chang@innovatefirm.com",
    company: "InnovateFirm",
    title: "Marketing Manager",
    source: "Referral Program",
    engagement_score: 75,
    status: "mql",
    last_activity: "Scheduled consultation",
    created_date: "2024-01-01",
    phone: "+1 (555) 765-8901",
    industry: "Professional Services",
    company_size: "51-200",
    lead_score: 71,
    content_consumed: "Consultation Booking, Industry Report, Comparison Guide",
    converting_time: 168,
    notes: "Referred by existing customer, budget approved for Q2"
  },
  {
    id: 106,
    name: "Alex Rodriguez",
    email: "a.rodriguez@techsolutions.net",
    company: "TechSolutions Network",
    title: "Senior Developer",
    source: "API Documentation",
    engagement_score: 70,
    status: "mql",
    last_activity: "Downloaded API docs",
    created_date: "2023-12-28",
    phone: "+1 (555) 876-9012",
    industry: "Software Development",
    company_size: "11-50",
    lead_score: 68,
    content_consumed: "API Documentation, Developer Guide, SDK Download",
    converting_time: 144,
    notes: "Technical evaluator, building proof of concept integration"
  },
  {
    id: 107,
    name: "Sofia Patel",
    email: "s.patel@dataanalytics.co",
    company: "DataAnalytics Co",
    title: "Analytics Director",
    source: "Competitive Analysis",
    engagement_score: 86,
    status: "sql",
    last_activity: "Competitor comparison",
    created_date: "2023-12-25",
    phone: "+1 (555) 987-0123",
    industry: "Data & Analytics",
    company_size: "101-500",
    lead_score: 91,
    content_consumed: "Competitive Analysis, Feature Comparison, Migration Guide",
    converting_time: 24,
    notes: "Current competitor customer, migration timeline in 6 months"
  },
  {
    id: 108,
    name: "Benjamin Clark",
    email: "b.clark@mediahub.io",
    company: "MediaHub Digital",
    title: "Creative Director",
    source: "Demo Request",
    engagement_score: 79,
    status: "sql",
    last_activity: "Attended live demo",
    created_date: "2023-12-22",
    phone: "+1 (555) 098-1234",
    industry: "Media & Entertainment",
    company_size: "51-200",
    lead_score: 83,
    content_consumed: "Demo Recording, Creative Templates, Integration Guide",
    converting_time: 80,
    notes: "Impressed with creative capabilities, evaluating team adoption"
  },
  {
    id: 109,
    name: "Catherine Lee",
    email: "c.lee@nonprofitorg.org",
    company: "Global Nonprofit Alliance",
    title: "Program Director",
    source: "Nonprofit Program",
    engagement_score: 73,
    status: "mql",
    last_activity: "Applied for nonprofit discount",
    created_date: "2023-12-20",
    phone: "+1 (555) 109-2345",
    industry: "Non-profit",
    company_size: "201-500",
    lead_score: 75,
    content_consumed: "Nonprofit Case Studies, Discount Application, Success Stories",
    converting_time: 192,
    notes: "Mission-driven organization, budget constrained but committed"
  },
  {
    id: 110,
    name: "Ryan Mitchell",
    email: "r.mitchell@sportsfan.com",
    company: "SportsFan Media",
    title: "Head of Technology",
    source: "Content Download",
    engagement_score: 77,
    status: "sql",
    last_activity: "Downloaded technical specs",
    created_date: "2023-12-18",
    phone: "+1 (555) 210-3456",
    industry: "Sports & Entertainment",
    company_size: "101-200",
    lead_score: 80,
    content_consumed: "Technical Specifications, API Guide, Performance Benchmarks",
    converting_time: 56,
    notes: "Technical lead evaluating scalability for high-traffic events"
  },
  {
    id: 111,
    name: "Isabella Torres",
    email: "i.torres@fashionhouse.co",
    company: "Fashion House Collective",
    title: "Digital Marketing Director",
    source: "Webinar Follow-up",
    engagement_score: 81,
    status: "opportunity",
    last_activity: "Requested custom demo",
    created_date: "2023-12-15",
    phone: "+1 (555) 321-4567",
    industry: "Fashion & Retail",
    company_size: "51-200",
    lead_score: 85,
    content_consumed: "Custom Demo, Fashion Case Studies, ROI Calculator",
    converting_time: 88,
    notes: "Fashion industry specialist, looking for industry-specific features"
  },
  {
    id: 112,
    name: "Jonathan Wright",
    email: "j.wright@autotech.net",
    company: "AutoTech Innovations",
    title: "VP of Engineering",
    source: "Trial Signup",
    engagement_score: 74,
    status: "mql",
    last_activity: "Extended trial period",
    created_date: "2023-12-12",
    phone: "+1 (555) 432-5678",
    industry: "Automotive",
    company_size: "501-1000",
    lead_score: 78,
    content_consumed: "Trial Extension, Engineering Docs, Performance Reports",
    converting_time: 216,
    notes: "Engineering team needs more time for thorough evaluation"
  }
];

const initialBofuLeads: BofuLead[] = [
  {
    id: 201,
    name: "Kevin Foster",
    email: "k.foster@megacorp.com",
    company: "MegaCorp Enterprises",
    title: "Chief Revenue Officer",
    source: "Sales Call",
    engagement_score: 95,
    status: "closed_won",
    last_activity: "Contract signed",
    created_date: "2024-01-01",
    phone: "+1 (555) 111-2222",
    industry: "Enterprise Software",
    company_size: "1001+",
    deal_value: 145500,
    lead_score: 98,
    sales_stage: "Closed Won",
    close_probability: 100,
    content_consumed: "Proposal, Contract, Implementation Plan",
    converting_time: 168,
    notes: "Enterprise client, multi-year contract signed"
  },
  {
    id: 202,
    name: "Amanda Phillips",
    email: "a.phillips@fasttrack.io",
    company: "FastTrack Solutions",
    title: "VP of Operations",
    source: "Demo Follow-up",
    engagement_score: 92,
    status: "opportunity",
    last_activity: "Negotiating final terms",
    created_date: "2023-12-28",
    phone: "+1 (555) 222-3333",
    industry: "Logistics",
    company_size: "501-1000",
    deal_value: 89750,
    lead_score: 94,
    sales_stage: "Negotiation",
    close_probability: 85,
    content_consumed: "Proposal, ROI Analysis, Security Review",
    converting_time: 144,
    notes: "Strong interest, finalizing pricing and terms"
  },
  {
    id: 203,
    name: "Michael Zhang",
    email: "m.zhang@innovatetech.com",
    company: "InnovateTech Corp",
    title: "Director of Technology",
    source: "Proposal Submitted",
    engagement_score: 88,
    status: "proposal",
    last_activity: "Reviewing proposal",
    created_date: "2023-12-25",
    phone: "+1 (555) 333-4444",
    industry: "Technology",
    company_size: "201-500",
    deal_value: 67200,
    lead_score: 89,
    sales_stage: "Proposal Review",
    close_probability: 75,
    content_consumed: "Technical Proposal, Implementation Timeline, Support Plan",
    converting_time: 192,
    notes: "Technical team evaluating integration requirements"
  },
  {
    id: 204,
    name: "Sarah Williams",
    email: "s.williams@globalhealth.org",
    company: "Global Health Systems",
    title: "Chief Information Officer",
    source: "RFP Response",
    engagement_score: 86,
    status: "opportunity",
    last_activity: "Budget approval pending",
    created_date: "2023-12-20",
    phone: "+1 (555) 444-5555",
    industry: "Healthcare",
    company_size: "1001+",
    deal_value: 125000,
    lead_score: 87,
    sales_stage: "Budget Approval",
    close_probability: 70,
    content_consumed: "RFP Response, Compliance Documentation, Pilot Plan",
    converting_time: 240,
    notes: "Awaiting board approval for budget allocation"
  },
  {
    id: 205,
    name: "Robert Taylor",
    email: "r.taylor@financeplus.com",
    company: "FinancePlus Inc",
    title: "Head of Digital Transformation",
    source: "Executive Meeting",
    engagement_score: 90,
    status: "closed_won",
    last_activity: "Implementation started",
    created_date: "2023-12-15",
    phone: "+1 (555) 555-6666",
    industry: "Financial Services",
    company_size: "501-1000",
    deal_value: 98750,
    lead_score: 96,
    sales_stage: "Closed Won",
    close_probability: 100,
    content_consumed: "Executive Presentation, Contract, Onboarding Materials",
    converting_time: 120,
    notes: "Strategic partnership, implementation in progress"
  },
  {
    id: 206,
    name: "Jessica Martinez",
    email: "j.martinez@retailpro.net",
    company: "RetailPro Networks",
    title: "VP of Technology",
    source: "Trial Conversion",
    engagement_score: 84,
    status: "opportunity",
    last_activity: "Trial extended",
    created_date: "2023-12-10",
    phone: "+1 (555) 666-7777",
    industry: "Retail",
    company_size: "201-500",
    deal_value: 54000,
    lead_score: 82,
    sales_stage: "Trial Extension",
    close_probability: 65,
    content_consumed: "Trial Extension, Success Metrics, Pricing Options",
    converting_time: 288,
    notes: "Positive trial results, evaluating business case"
  },
  {
    id: 207,
    name: "Daniel Brown",
    email: "d.brown@manufacturemax.com",
    company: "ManufactureMax",
    title: "COO",
    source: "Referral",
    engagement_score: 87,
    status: "proposal",
    last_activity: "Internal stakeholder review",
    created_date: "2023-12-05",
    phone: "+1 (555) 777-8888",
    industry: "Manufacturing",
    company_size: "1001+",
    deal_value: 156000,
    lead_score: 91,
    sales_stage: "Stakeholder Review",
    close_probability: 80,
    content_consumed: "Proposal, Technical Specifications, ROI Calculator",
    converting_time: 216,
    notes: "Multiple stakeholders aligned, decision pending"
  },
  {
    id: 208,
    name: "Elizabeth Chen",
    email: "e.chen@insurancetech.co",
    company: "InsuranceTech Solutions",
    title: "Chief Digital Officer",
    source: "Sales Call",
    engagement_score: 93,
    status: "closed_won",
    last_activity: "Contract executed",
    created_date: "2023-12-01",
    phone: "+1 (555) 888-9999",
    industry: "Insurance",
    company_size: "501-1000",
    deal_value: 112300,
    lead_score: 97,
    sales_stage: "Closed Won",
    close_probability: 100,
    content_consumed: "Final Proposal, Contract, Implementation Roadmap",
    converting_time: 96,
    notes: "Digital transformation initiative, quick decision cycle"
  },
  {
    id: 209,
    name: "Christopher Davis",
    email: "c.davis@energysolutions.io",
    company: "Energy Solutions Corp",
    title: "VP of Operations",
    source: "Demo Follow-up",
    engagement_score: 85,
    status: "negotiation",
    last_activity: "Contract terms discussion",
    created_date: "2023-11-28",
    phone: "+1 (555) 999-0000",
    industry: "Energy",
    company_size: "1001+",
    deal_value: 187500,
    lead_score: 92,
    sales_stage: "Contract Negotiation",
    close_probability: 90,
    content_consumed: "Proposal, Legal Review, Implementation Plan",
    converting_time: 168,
    notes: "Large enterprise deal, minor contract adjustments needed"
  },
  {
    id: 210,
    name: "Victoria Johnson",
    email: "v.johnson@pharmtech.net",
    company: "PharmTech Research",
    title: "Head of IT",
    source: "RFP Response",
    engagement_score: 81,
    status: "opportunity",
    last_activity: "Technical evaluation",
    created_date: "2023-11-25",
    phone: "+1 (555) 000-1111",
    industry: "Pharmaceutical",
    company_size: "501-1000",
    deal_value: 94800,
    lead_score: 86,
    sales_stage: "Technical Review",
    close_probability: 75,
    content_consumed: "RFP Response, Technical Documentation, Compliance Guide",
    converting_time: 264,
    notes: "Compliance-focused evaluation, security requirements priority"
  },
  {
    id: 211,
    name: "Andrew Wilson",
    email: "a.wilson@constructpro.com",
    company: "ConstructPro Engineering",
    title: "Project Director",
    source: "Proposal Submitted",
    engagement_score: 79,
    status: "proposal",
    last_activity: "Proposal under review",
    created_date: "2023-11-20",
    phone: "+1 (555) 111-2222",
    industry: "Construction",
    company_size: "201-500",
    deal_value: 73600,
    lead_score: 83,
    sales_stage: "Proposal Review",
    close_probability: 70,
    content_consumed: "Technical Proposal, Project Timeline, Cost Analysis",
    converting_time: 312,
    notes: "Construction industry specialist, project-based implementation"
  },
  {
    id: 212,
    name: "Stephanie Moore",
    email: "s.moore@foodtech.co",
    company: "FoodTech Innovations",
    title: "Operations Manager",
    source: "Trial Conversion",
    engagement_score: 83,
    status: "opportunity",
    last_activity: "Budget planning session",
    created_date: "2023-11-15",
    phone: "+1 (555) 222-3333",
    industry: "Food & Beverage",
    company_size: "101-200",
    deal_value: 58900,
    lead_score: 80,
    sales_stage: "Budget Planning",
    close_probability: 68,
    content_consumed: "Trial Results, Budget Proposal, Implementation Guide",
    converting_time: 336,
    notes: "Successful trial completion, working on budget approval"
  }
];

const initialColdLeads: ColdLead[] = [
  {
    id: 301,
    name: "Mark Stevens",
    email: "m.stevens@dormanttech.com",
    company: "DormantTech Inc",
    title: "CTO",
    source: "Previous Demo",
    status: "cold",
    last_activity: "No response to follow-ups",
    created_date: "2023-10-15",
    phone: "+1 (555) 999-0001",
    industry: "Technology",
    company_size: "101-500",
    value: 75000,
    stage: "MOFU",
    days_inactive: 120,
    moved_date: "2023-11-01",
    original_stage: "MOFU",
    notes: "Lost interest after budget cuts, potential for Q2 re-engagement"
  },
  {
    id: 302,
    name: "Helen Rodriguez",
    email: "h.rodriguez@sleepystart.com",
    company: "SleepyStart Corp",
    title: "Marketing Director",
    source: "Webinar Series",
    status: "cold",
    last_activity: "Stopped opening emails",
    created_date: "2023-09-20",
    phone: "+1 (555) 888-0002",
    industry: "Startup",
    company_size: "1-10",
    value: 25000,
    stage: "TOFU",
    days_inactive: 95,
    moved_date: "2023-10-15",
    original_stage: "TOFU",
    notes: "Startup pivot changed priorities, maintain contact for future"
  },
  {
    id: 303,
    name: "Brian Thompson",
    email: "b.thompson@stagnantcorp.net",
    company: "Stagnant Corporation",
    title: "VP of Sales",
    source: "Trade Show",
    status: "inactive",
    last_activity: "Declined follow-up meeting",
    created_date: "2023-08-10",
    phone: "+1 (555) 777-0003",
    industry: "Manufacturing",
    company_size: "501-1000",
    value: 120000,
    stage: "BOFU",
    days_inactive: 150,
    moved_date: "2023-09-30",
    original_stage: "BOFU",
    notes: "Competitor chosen, maintain relationship for future opportunities"
  },
  {
    id: 304,
    name: "Linda Chen",
    email: "l.chen@quietretail.co",
    company: "Quiet Retail Solutions",
    title: "Operations Manager",
    source: "Content Download",
    status: "cold",
    last_activity: "No engagement for 3 months",
    created_date: "2023-07-25",
    phone: "+1 (555) 666-0004",
    industry: "Retail",
    company_size: "51-200",
    value: 45000,
    stage: "MOFU",
    days_inactive: 130,
    moved_date: "2023-09-15",
    original_stage: "MOFU",
    notes: "Seasonal business constraints, re-engage before next season"
  },
  {
    id: 305,
    name: "Carlos Martinez",
    email: "c.martinez@slowtech.io",
    company: "SlowTech Industries",
    title: "IT Director",
    source: "Referral",
    status: "cold",
    last_activity: "Project postponed indefinitely",
    created_date: "2023-06-30",
    phone: "+1 (555) 555-0005",
    industry: "Technology",
    company_size: "201-500",
    value: 85000,
    stage: "BOFU",
    days_inactive: 170,
    moved_date: "2023-08-20",
    original_stage: "BOFU",
    notes: "Budget frozen due to economic uncertainty, high value prospect"
  },
  {
    id: 306,
    name: "Patricia Johnson",
    email: "p.johnson@dormantheal.org",
    company: "Dormant Healthcare",
    title: "Chief Technology Officer",
    source: "Demo Request",
    status: "inactive",
    last_activity: "Team restructuring",
    created_date: "2023-05-15",
    phone: "+1 (555) 444-0006",
    industry: "Healthcare",
    company_size: "1001+",
    value: 200000,
    stage: "BOFU",
    days_inactive: 190,
    moved_date: "2023-07-10",
    original_stage: "BOFU",
    notes: "Leadership change affected decision timeline, monitor org changes"
  },
  {
    id: 307,
    name: "Timothy Wilson",
    email: "t.wilson@forgottenfinance.com",
    company: "Forgotten Finance",
    title: "Head of Digital",
    source: "Cold Outreach",
    status: "cold",
    last_activity: "Initial interest then silence",
    created_date: "2023-04-20",
    phone: "+1 (555) 333-0007",
    industry: "Financial Services",
    company_size: "101-500",
    value: 65000,
    stage: "TOFU",
    days_inactive: 210,
    moved_date: "2023-06-25",
    original_stage: "TOFU",
    notes: "Regulatory concerns mentioned, may need compliance-focused approach"
  },
  {
    id: 308,
    name: "Rebecca Davis",
    email: "r.davis@silentedu.edu",
    company: "Silent Education Systems",
    title: "Technology Coordinator",
    source: "Education Partnership",
    status: "cold",
    last_activity: "Grant application rejected",
    created_date: "2023-03-10",
    phone: "+1 (555) 222-0008",
    industry: "Education",
    company_size: "501-1000",
    value: 55000,
    stage: "MOFU",
    days_inactive: 240,
    moved_date: "2023-05-20",
    original_stage: "MOFU",
    notes: "Funding dependent, track grant cycles for re-engagement timing"
  },
  {
    id: 309,
    name: "Gregory Lee",
    email: "g.lee@pausedprop.com",
    company: "Paused Properties",
    title: "Development Manager",
    source: "Industry Event",
    status: "inactive",
    last_activity: "Market conditions cited",
    created_date: "2023-02-28",
    phone: "+1 (555) 111-0009",
    industry: "Real Estate",
    company_size: "51-200",
    value: 40000,
    stage: "TOFU",
    days_inactive: 250,
    moved_date: "2023-04-15",
    original_stage: "TOFU",
    notes: "Real estate market dependent, monitor market conditions"
  },
  {
    id: 310,
    name: "Sandra Brown",
    email: "s.brown@chilllogistics.net",
    company: "Chill Logistics",
    title: "Supply Chain Director",
    source: "LinkedIn Outreach",
    status: "cold",
    last_activity: "Vendor evaluation on hold",
    created_date: "2023-01-15",
    phone: "+1 (555) 000-0010",
    industry: "Logistics",
    company_size: "201-500",
    value: 90000,
    stage: "MOFU",
    days_inactive: 280,
    moved_date: "2023-03-10",
    original_stage: "MOFU",
    notes: "Supply chain disruptions affecting new vendor decisions"
  },
  {
    id: 311,
    name: "Douglas Miller",
    email: "d.miller@frozenman.com",
    company: "Frozen Manufacturing",
    title: "Plant Manager",
    source: "Trade Publication",
    status: "cold",
    last_activity: "Equipment upgrade delayed",
    created_date: "2022-12-20",
    phone: "+1 (555) 999-0011",
    industry: "Manufacturing",
    company_size: "101-500",
    value: 110000,
    stage: "BOFU",
    days_inactive: 320,
    moved_date: "2023-02-05",
    original_stage: "BOFU",
    notes: "Capital expenditure freeze, equipment-dependent implementation"
  },
  {
    id: 312,
    name: "Angela Garcia",
    email: "a.garcia@quietconsult.co",
    company: "Quiet Consulting Group",
    title: "Managing Partner",
    source: "Partnership Discussion",
    status: "inactive",
    last_activity: "Partnership terms disagreement",
    created_date: "2022-11-30",
    phone: "+1 (555) 888-0012",
    industry: "Consulting",
    company_size: "11-50",
    value: 35000,
    stage: "TOFU",
    days_inactive: 340,
    moved_date: "2023-01-20",
    original_stage: "TOFU",
    notes: "Partnership model mismatch, potential for direct client relationship"
  }
];

// Helper functions for localStorage
const getStoredLeads = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('cdp360-leads');
    const version = localStorage.getItem('cdp360-leads-version');
    
    // If version is not v2, clear old data and use fresh data
    if (version !== 'v2') {
      localStorage.removeItem('cdp360-leads');
      localStorage.setItem('cdp360-leads-version', 'v2');
      return null;
    }
    
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading leads from localStorage:', error);
    return null;
  }
};

const getStoredMovements = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('cdp360-movements');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading movements from localStorage:', error);
    return [];
  }
};

const getStoredCustomers = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('cdp360-customers');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading customers from localStorage:', error);
    return null;
  }
};

const saveLeadsToStorage = (leads: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cdp360-leads', JSON.stringify(leads));
  } catch (error) {
    console.error('Error saving leads to localStorage:', error);
  }
};

const saveMovementsToStorage = (movements: LeadMovement[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cdp360-movements', JSON.stringify(movements));
  } catch (error) {
    console.error('Error saving movements to localStorage:', error);
  }
};

const saveCustomersToStorage = (customers: Customer[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cdp360-customers', JSON.stringify(customers));
  } catch (error) {
    console.error('Error saving customers to localStorage:', error);
  }
};

// Convert existing customer data to our Customer interface
const initialCustomers: Customer[] = customersData.map(customer => ({
  ...customer,
  originalLeadId: undefined,
  movedFromStage: undefined,
  movedDate: undefined,
  conversionNotes: undefined,
}));

export const LeadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with stored data or default data
  const [leads, setLeads] = useState(() => {
    const storedLeads = getStoredLeads();
    if (storedLeads) {
      // Ensure all leads have converting_time field
      return {
        tofu: storedLeads.tofu,
        mofu: storedLeads.mofu.map((lead: MofuLead) => ({
          ...lead,
          converting_time: lead.converting_time || Math.floor(Math.random() * 120) + 48
        })),
        bofu: storedLeads.bofu.map((lead: BofuLead) => ({
          ...lead,
          converting_time: lead.converting_time || Math.floor(Math.random() * 200) + 96
        })),
        cold: storedLeads.cold,
      };
    }
    return {
      tofu: initialTofuLeads,
      mofu: initialMofuLeads,
      bofu: initialBofuLeads,
      cold: initialColdLeads,
    };
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const storedCustomers = getStoredCustomers();
    return storedCustomers || initialCustomers;
  });

  const [recentMovements, setRecentMovements] = useState<LeadMovement[]>(() => {
    return getStoredMovements();
  });

  const moveLead = (leadId: number, fromStage: string, toStage: string, notes: string) => {
    const timestamp = new Date().toISOString();
    
    setLeads(prevLeads => {
      const newLeads = { ...prevLeads };
      let leadToMove: Lead | null = null;

      // Find and remove lead from source stage
      switch (fromStage.toLowerCase()) {
        case 'tofu':
          const tofuIndex = newLeads.tofu.findIndex(lead => lead.id === leadId);
          if (tofuIndex !== -1) {
            leadToMove = newLeads.tofu[tofuIndex];
            newLeads.tofu = newLeads.tofu.filter(lead => lead.id !== leadId);
          }
          break;
        case 'mofu':
          const mofuIndex = newLeads.mofu.findIndex(lead => lead.id === leadId);
          if (mofuIndex !== -1) {
            leadToMove = newLeads.mofu[mofuIndex];
            newLeads.mofu = newLeads.mofu.filter(lead => lead.id !== leadId);
          }
          break;
        case 'bofu':
          const bofuIndex = newLeads.bofu.findIndex(lead => lead.id === leadId);
          if (bofuIndex !== -1) {
            leadToMove = newLeads.bofu[bofuIndex];
            newLeads.bofu = newLeads.bofu.filter(lead => lead.id !== leadId);
          }
          break;
        case 'cold bucket':
        case 'cold':
          const coldIndex = newLeads.cold.findIndex(lead => lead.id === leadId);
          if (coldIndex !== -1) {
            leadToMove = newLeads.cold[coldIndex];
            newLeads.cold = newLeads.cold.filter(lead => lead.id !== leadId);
          }
          break;
      }

      if (leadToMove) {
        // Transform lead for destination stage
        const transformedLead = transformLeadForStage(leadToMove, toStage, notes, fromStage);
        
        // Add lead to destination stage
        switch (toStage.toLowerCase()) {
          case 'mofu':
            newLeads.mofu = [transformedLead as MofuLead, ...newLeads.mofu];
            break;
          case 'bofu':
            newLeads.bofu = [transformedLead as BofuLead, ...newLeads.bofu];
            break;
          case 'cold bucket':
          case 'cold':
            newLeads.cold = [transformedLead as ColdLead, ...newLeads.cold];
            break;
          case 'customer':
            // Convert lead to customer
            if (leadToMove) {
              const newCustomer = convertLeadToCustomer(leadToMove, fromStage, notes);
              setCustomers(prevCustomers => {
                // Check if customer with same email or lead ID already exists to prevent duplicates
                const existingCustomer = prevCustomers.find(c => 
                  c.email === newCustomer.email || c.originalLeadId === newCustomer.originalLeadId
                );
                if (existingCustomer) {
                  console.warn('Customer already exists:', { email: newCustomer.email, leadId: newCustomer.originalLeadId });
                  return prevCustomers; // Don't add duplicate
                }
                const updatedCustomers = [newCustomer, ...prevCustomers];
                saveCustomersToStorage(updatedCustomers);
                return updatedCustomers;
              });
            }
            break;
          case 'active funnel':
            // Determine which active stage to move back to based on original stage
            const originalStage = (leadToMove as ColdLead).original_stage || 'TOFU';
            switch (originalStage.toLowerCase()) {
              case 'tofu':
                newLeads.tofu = [transformedLead as TofuLead, ...newLeads.tofu];
                break;
              case 'mofu':
                newLeads.mofu = [transformedLead as MofuLead, ...newLeads.mofu];
                break;
              case 'bofu':
                newLeads.bofu = [transformedLead as BofuLead, ...newLeads.bofu];
                break;
            }
            break;
        }
      }

      // Save to localStorage after updating state
      saveLeadsToStorage(newLeads);
      return newLeads;
    });

    // Record the movement
    const movement: LeadMovement = {
      leadId,
      fromStage,
      toStage,
      notes,
      timestamp,
    };

    setRecentMovements(prev => {
      const newMovements = [movement, ...prev.slice(0, 9)]; // Keep last 10 movements
      saveMovementsToStorage(newMovements);
      return newMovements;
    });
  };

  const resetToOriginalData = () => {
    const originalData = {
      tofu: initialTofuLeads,
      mofu: initialMofuLeads,
      bofu: initialBofuLeads,
      cold: initialColdLeads,
    };
    
    setLeads(originalData);
    setCustomers(initialCustomers);
    setRecentMovements([]);
    
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cdp360-leads');
      localStorage.removeItem('cdp360-movements');
      localStorage.removeItem('cdp360-customers');
    }
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prevCustomers => {
      const newCustomers = [...prevCustomers, customer];
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cdp360-customers', JSON.stringify(newCustomers));
      }
      return newCustomers;
    });
  };

  const value: LeadContextType = {
    leads,
    customers,
    moveLead,
    addCustomer,
    recentMovements,
    resetToOriginalData,
  };

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
};

// Helper function to convert lead to customer
const convertLeadToCustomer = (lead: Lead, fromStage: string, notes: string): Customer => {
  const today = new Date().toISOString().split('T')[0];
  const dealValue = (lead as any).deal_value || (lead as any).value || Math.floor(Math.random() * 50000) + 25000;
  
  // Generate unique customer ID based on existing pattern
  const timestamp = Date.now().toString().slice(-3); // Last 3 digits of timestamp
  const leadId = lead.id.toString().padStart(3, '0');
  const customerId = `CUST-${leadId}${timestamp}`;
  
  return {
    id: customerId,
    firstName: lead.name.split(' ')[0] || 'Customer',
    lastName: lead.name.split(' ').slice(1).join(' ') || lead.name,
    email: lead.email,
    phone: lead.phone,
    status: 'active',
    tier: dealValue > 100000 ? 'premium' : dealValue > 50000 ? 'gold' : dealValue > 25000 ? 'silver' : 'bronze',
    registrationDate: today,
    lastLogin: today,
    totalSpent: Math.round(dealValue * 0.3), // Initial spending, rounded to whole numbers
    orderCount: 1,
    lifetimeValue: Math.round(dealValue), // Rounded to whole numbers
    location: `${lead.company_size} company`,
    source: lead.source,
    segment: dealValue > 75000 ? 'High-Value Customers' : 'Regular Customers',
    tags: ['New Customer', 'Converted Lead', lead.industry],
    // Lead origin tracking
    originalLeadId: lead.id,
    movedFromStage: fromStage,
    movedDate: today,
    conversionNotes: notes,
  };
};

// Helper function to transform lead data for different stages
const transformLeadForStage = (lead: Lead, toStage: string, notes: string, fromStage: string): Lead => {
  const baseTransform = {
    ...lead,
    notes,
    moved_date: new Date().toISOString().split('T')[0],
    last_activity: `Moved from ${fromStage}`,
  };

  switch (toStage.toLowerCase()) {
    case 'mofu':
      return {
        ...baseTransform,
        lead_score: (lead as any).lead_score || Math.floor(Math.random() * 30) + 70,
        content_consumed: (lead as any).content_consumed || (lead as TofuLead).content_downloaded || "Various materials",
        converting_time: (lead as any).converting_time || Math.floor(Math.random() * 120) + 48,
        status: 'mql',
      } as MofuLead;

    case 'bofu':
      return {
        ...baseTransform,
        deal_value: (lead as any).deal_value || Math.floor(Math.random() * 100000) + 50000,
        lead_score: (lead as any).lead_score || Math.floor(Math.random() * 20) + 80,
        sales_stage: 'Qualification',
        close_probability: Math.floor(Math.random() * 40) + 60,
        content_consumed: (lead as any).content_consumed || "Demo, Proposal",
        converting_time: (lead as any).converting_time || Math.floor(Math.random() * 200) + 96,
        status: 'opportunity',
      } as BofuLead;

    case 'cold bucket':
    case 'cold':
      return {
        ...baseTransform,
        value: (lead as any).deal_value || (lead as any).value || Math.floor(Math.random() * 80000) + 20000,
        stage: fromStage.toUpperCase(),
        days_inactive: 0,
        original_stage: fromStage.toUpperCase(),
        status: 'cold',
      } as ColdLead;

    case 'active funnel':
      // Transform back from cold to original stage
      const originalStage = (lead as ColdLead).original_stage || 'TOFU';
      switch (originalStage.toLowerCase()) {
        case 'tofu':
          return {
            ...baseTransform,
            content_downloaded: (lead as any).content_downloaded || "Re-engagement material",
            status: 'engaged',
          } as TofuLead;
        case 'mofu':
          return {
            ...baseTransform,
            lead_score: (lead as any).lead_score || 75,
            content_consumed: (lead as any).content_consumed || "Re-engagement content",
            converting_time: (lead as any).converting_time || Math.floor(Math.random() * 120) + 48,
            status: 'mql',
          } as MofuLead;
        case 'bofu':
          return {
            ...baseTransform,
            deal_value: (lead as ColdLead).value,
            lead_score: 80,
            sales_stage: 'Re-engagement',
            close_probability: 50,
            content_consumed: "Re-engagement materials",
            converting_time: (lead as any).converting_time || Math.floor(Math.random() * 200) + 96,
            status: 'opportunity',
          } as BofuLead;
      }
      break;

    default:
      return baseTransform;
  }

  return baseTransform;
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};