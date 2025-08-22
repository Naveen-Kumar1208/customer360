"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  BarChart3,
  Eye,
  Clock,
  Star,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Bot,
  PieChart,
  Activity,
  Gauge,
  Rocket,
  ShoppingCart,
  CreditCard,
  Building2,
  Briefcase
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

// Types and Interfaces
interface Persona {
  id: string;
  name: string;
  description: string;
  category: 'BFSI' | 'Retail' | 'SaaS' | 'B2B';
  characteristics: string[];
  preferredChannels: string[];
  avgSpend: number;
  conversionRate: number;
  icon: React.ComponentType<any>;
  color: string;
  aiCompatibilityScore?: number;
  audienceSize?: number;
}

interface CampaignGoal {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  primaryMetrics: string[];
}

interface MetricPrediction {
  metric: string;
  predicted: number;
  confidence: number;
  benchmark: number;
  trend: 'up' | 'down' | 'stable';
}

interface ChannelRecommendation {
  channel: string;
  score: number;
  budgetAllocation: number;
  expectedCTR: number;
  expectedCPA: number;
  reasoning: string;
}

// Mock Data
const customerPersonas: Persona[] = [
  // BFSI Personas
  {
    id: 'value_seeker',
    name: 'Value Seeker',
    description: 'Price-sensitive, comparison-focused customer',
    category: 'BFSI',
    characteristics: ['Price-sensitive', 'Research-heavy', 'Comparison-focused', 'Deal-seeking'],
    preferredChannels: ['Email', 'Search Ads', 'Comparison Sites'],
    avgSpend: 15000,
    conversionRate: 3.2,
    icon: DollarSign,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'wealth_investor',
    name: 'Wealth Investor',
    description: 'High-value, wealth management focused',
    category: 'BFSI',
    characteristics: ['High-value', 'Investment-focused', 'Long-term planning', 'Premium services'],
    preferredChannels: ['LinkedIn', 'Webinars', 'Direct Mail'],
    avgSpend: 150000,
    conversionRate: 8.5,
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'cautious_customer',
    name: 'Cautious Customer',
    description: 'Conservative, prefers traditional channels',
    category: 'BFSI',
    characteristics: ['Risk-averse', 'Traditional', 'Trust-focused', 'Slow-decision'],
    preferredChannels: ['Branch visits', 'Phone calls', 'Print ads'],
    avgSpend: 45000,
    conversionRate: 5.8,
    icon: Building2,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'digital_adopter',
    name: 'Digital Adopter',
    description: 'Mobile-savvy, fintech adopter',
    category: 'BFSI',
    characteristics: ['Tech-savvy', 'Mobile-first', 'Quick decisions', 'App-focused'],
    preferredChannels: ['Mobile ads', 'Social media', 'In-app notifications'],
    avgSpend: 25000,
    conversionRate: 6.2,
    icon: Activity,
    color: 'bg-cyan-100 text-cyan-700 border-cyan-200'
  },
  // Retail Personas
  {
    id: 'bargain_hunter',
    name: 'Bargain Hunter',
    description: 'Discount-driven, cart abandoner',
    category: 'Retail',
    characteristics: ['Price-conscious', 'Coupon-seeker', 'Cart abandoner', 'Deal-hunter'],
    preferredChannels: ['Email', 'SMS', 'Push notifications', 'Coupon sites'],
    avgSpend: 2500,
    conversionRate: 2.1,
    icon: ShoppingCart,
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  {
    id: 'premium_buyer',
    name: 'Premium Buyer',
    description: 'Premium brand loyal, high AOV',
    category: 'Retail',
    characteristics: ['Premium buyer', 'Brand loyal', 'High AOV', 'Quality-focused'],
    preferredChannels: ['Influencer marketing', 'Premium publications', 'Exclusive events'],
    avgSpend: 15000,
    conversionRate: 12.3,
    icon: Star,
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'window_shopper',
    name: 'Window Shopper',
    description: 'High engagement, low conversion',
    category: 'Retail',
    characteristics: ['Browser', 'High engagement', 'Low conversion', 'Research-heavy'],
    preferredChannels: ['Social media', 'Content marketing', 'YouTube'],
    avgSpend: 1200,
    conversionRate: 1.8,
    icon: Eye,
    color: 'bg-pink-100 text-pink-700 border-pink-200'
  },
  {
    id: 'eco_conscious',
    name: 'Eco-Conscious Buyer',
    description: 'Sustainable, ethical brand preference',
    category: 'Retail',
    characteristics: ['Sustainability-focused', 'Ethical brands', 'Quality over quantity', 'Values-driven'],
    preferredChannels: ['Content marketing', 'Influencer partnerships', 'Social media'],
    avgSpend: 3500,
    conversionRate: 4.2,
    icon: Star,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  // SaaS Personas
  {
    id: 'freemium_user',
    name: 'Freemium User',
    description: 'Cost-sensitive solo user',
    category: 'SaaS',
    characteristics: ['Cost-sensitive', 'Solo user', 'Feature-light', 'Trial-heavy'],
    preferredChannels: ['Content marketing', 'YouTube', 'Free tools'],
    avgSpend: 500,
    conversionRate: 4.5,
    icon: Users,
    color: 'bg-teal-100 text-teal-700 border-teal-200'
  },
  {
    id: 'scaling_business',
    name: 'Scaling Business',
    description: 'Feature-heavy usage, upgrade potential',
    category: 'SaaS',
    characteristics: ['Growing team', 'Feature-heavy', 'ROI-focused', 'Scalability needs'],
    preferredChannels: ['Product demos', 'Case studies', 'LinkedIn'],
    avgSpend: 5000,
    conversionRate: 15.7,
    icon: Rocket,
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  },
  {
    id: 'enterprise_evaluator',
    name: 'Enterprise Evaluator',
    description: 'Decision-maker, compliance-focused',
    category: 'SaaS',
    characteristics: ['Enterprise-level', 'Compliance-focused', 'Security-aware', 'Multi-stakeholder'],
    preferredChannels: ['Enterprise demos', 'Whitepapers', 'Executive briefings'],
    avgSpend: 25000,
    conversionRate: 18.5,
    icon: Building2,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'churn_risk',
    name: 'At-Risk User',
    description: 'Declining engagement, churn risk',
    category: 'SaaS',
    characteristics: ['Declining usage', 'Support tickets', 'Engagement drop', 'Renewal risk'],
    preferredChannels: ['Customer success', 'Email', 'In-app messages'],
    avgSpend: 2400,
    conversionRate: 8.2,
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-700 border-red-200'
  },
  // B2B Personas
  {
    id: 'executive_buyer',
    name: 'Executive Buyer',
    description: 'ROI-focused executive decision maker',
    category: 'B2B',
    characteristics: ['Executive-level', 'ROI-focused', 'Strategic thinker', 'Decision maker'],
    preferredChannels: ['Executive briefings', 'Industry reports', 'Networking events'],
    avgSpend: 50000,
    conversionRate: 22.1,
    icon: Briefcase,
    color: 'bg-rose-100 text-rose-700 border-rose-200'
  },
  {
    id: 'marketing_manager',
    name: 'Marketing Manager',
    description: 'Feature-comparison focused mid-level marketer',
    category: 'B2B',
    characteristics: ['Feature-focused', 'Comparison-heavy', 'Demo-driven', 'Peer validation'],
    preferredChannels: ['Product demos', 'Case studies', 'LinkedIn', 'Webinars'],
    avgSpend: 15000,
    conversionRate: 12.4,
    icon: Target,
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  {
    id: 'procurement_lead',
    name: 'Procurement Lead',
    description: 'Budget-holder with approval workflows',
    category: 'B2B',
    characteristics: ['Budget-conscious', 'Process-driven', 'Approval workflows', 'Vendor evaluation'],
    preferredChannels: ['RFP responses', 'Vendor presentations', 'Email'],
    avgSpend: 35000,
    conversionRate: 16.8,
    icon: CreditCard,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  {
    id: 'content_consumer',
    name: 'Content Consumer',
    description: 'Long sales cycle, content-focused nurturing',
    category: 'B2B',
    characteristics: ['Content-heavy', 'Long cycle', 'Education-focused', 'Nurturing stage'],
    preferredChannels: ['Content marketing', 'Whitepapers', 'Webinars', 'Email sequences'],
    avgSpend: 8500,
    conversionRate: 6.3,
    icon: Eye,
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  }
];

const campaignGoals: CampaignGoal[] = [
  {
    id: 'awareness',
    name: 'Brand Awareness',
    description: 'Increase brand visibility and recognition',
    icon: Eye,
    primaryMetrics: ['Impressions', 'Reach', 'Brand Recall']
  },
  {
    id: 'leads',
    name: 'Lead Generation',
    description: 'Generate qualified leads for sales team',
    icon: Target,
    primaryMetrics: ['Leads', 'CPL', 'Lead Quality Score']
  },
  {
    id: 'conversion',
    name: 'Drive Conversions',
    description: 'Increase sales and revenue',
    icon: TrendingUp,
    primaryMetrics: ['Conversions', 'CPA', 'ROAS']
  },
  {
    id: 'retention',
    name: 'Customer Retention',
    description: 'Retain and engage existing customers',
    icon: Users,
    primaryMetrics: ['Retention Rate', 'CLV', 'Engagement']
  }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

// // Load campaigns from storage on component mount
// useEffect(() => {
//   const storedCampaigns = loadCampaignsFromStorage();
//   if (storedCampaigns.length > 0) {
//     // Update performance data for existing campaigns to simulate growth
//     const updatedCampaigns = storedCampaigns.map(campaign => ({
//       ...campaign,
//       performance: simulateCampaignGrowth(campaign),
//       daysRemaining: Math.max(0, campaign.daysRemaining - Math.floor((Date.now() - new Date(campaign.createdDate).getTime()) / (1000 * 60 * 60 * 24)))
//     }));
//     setCampaigns(updatedCampaigns);
//     saveCampaignsToStorage(updatedCampaigns);
//   } else {
//     // Initialize with default campaigns if none stored
//     setCampaigns(defaultCampaigns);
//     saveCampaignsToStorage(defaultCampaigns);
//   }
// }, []);

// Default Mock AI Campaigns Data
const defaultCampaigns = [
  {
    id: 'ai-001',
    name: 'AI-Optimized Lead Generation - BFSI Focus',
    description: 'Smart campaign targeting Value Seekers and Wealth Investors with predictive optimization',
    status: 'active',
    goal: 'Lead Generation',
    personas: ['Value Seeker', 'Wealth Investor'],
    budget: 125000,
    spent: 45600,
    duration: '45 days',
    daysRemaining: 23,
    performance: {
      impressions: 245680,
      clicks: 8940,
      conversions: 312,
      ctr: 3.64,
      conversionRate: 3.49,
      cpa: 146,
      roas: 4.2
    },
    aiScore: 94,
    lastOptimized: '2 hours ago',
    channels: ['Google Ads', 'LinkedIn', 'Email'],
    createdDate: '2024-01-15',
    createdBy: 'AI Assistant'
  },
  {
    id: 'ai-002',
    name: 'AI-Enhanced Brand Awareness - Retail Mix',
    description: 'Multi-persona campaign for Premium Buyers and Bargain Hunters with dynamic creative optimization',
    status: 'active',
    goal: 'Brand Awareness',
    personas: ['Premium Buyer', 'Bargain Hunter', 'Eco-Conscious Buyer'],
    budget: 85000,
    spent: 62400,
    duration: '30 days',
    daysRemaining: 8,
    performance: {
      impressions: 890450,
      clicks: 26720,
      conversions: 486,
      ctr: 3.00,
      conversionRate: 1.82,
      cpa: 128,
      roas: 3.8
    },
    aiScore: 89,
    lastOptimized: '5 hours ago',
    channels: ['Facebook', 'Instagram', 'Google Ads'],
    createdDate: '2024-01-20',
    createdBy: 'AI Assistant'
  },
  {
    id: 'ai-003',
    name: 'AI-Powered SaaS Conversion Campaign',
    description: 'Intelligent campaign targeting Freemium Users and Scaling Businesses with behavioral triggers',
    status: 'paused',
    goal: 'Drive Conversions',
    personas: ['Freemium User', 'Scaling Business'],
    budget: 65000,
    spent: 28900,
    duration: '60 days',
    daysRemaining: 42,
    performance: {
      impressions: 156780,
      clicks: 4720,
      conversions: 148,
      ctr: 3.01,
      conversionRate: 3.14,
      cpa: 195,
      roas: 5.1
    },
    aiScore: 87,
    lastOptimized: '1 day ago',
    channels: ['LinkedIn', 'Content Marketing', 'Email'],
    createdDate: '2024-01-10',
    createdBy: 'AI Assistant'
  },
  {
    id: 'ai-004',
    name: 'AI-Driven B2B Lead Nurturing',
    description: 'Executive-focused campaign with AI-generated content and optimal timing predictions',
    status: 'completed',
    goal: 'Customer Retention',
    personas: ['Executive Buyer', 'Marketing Manager'],
    budget: 95000,
    spent: 94200,
    duration: '90 days',
    daysRemaining: 0,
    performance: {
      impressions: 78950,
      clicks: 2840,
      conversions: 189,
      ctr: 3.60,
      conversionRate: 6.65,
      cpa: 498,
      roas: 6.8
    },
    aiScore: 96,
    lastOptimized: '3 days ago',
    channels: ['LinkedIn', 'Email', 'Webinars'],
    createdDate: '2023-12-15',
    createdBy: 'AI Assistant'
  },
  {
    id: 'ai-005',
    name: 'AI-Smart Retail Retention Campaign',
    description: 'Cross-persona campaign with predictive churn prevention and dynamic offers',
    status: 'draft',
    goal: 'Customer Retention',
    personas: ['Premium Buyer', 'Window Shopper'],
    budget: 45000,
    spent: 0,
    duration: '30 days',
    daysRemaining: 30,
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      conversionRate: 0,
      cpa: 0,
      roas: 0
    },
    aiScore: 0,
    lastOptimized: 'Never',
    channels: ['Email', 'SMS', 'Push Notifications'],
    createdDate: '2024-01-25',
    createdBy: 'AI Assistant'
  }
];

// Utility functions for localStorage
const loadCampaignsFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('aiCampaigns');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCampaignsToStorage = (campaigns: any[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('aiCampaigns', JSON.stringify(campaigns));
  } catch {
    // Handle storage errors silently
  }
};

const generateCampaignId = () => {
  return 'ai-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const generatePerformanceData = (budget: number, personas: string[], isNew = false, campaignAge = 0) => {
  if (isNew) {
    // New campaigns start with some initial data
    const initialImpressions = Math.floor(budget * 0.02); // Small initial impressions
    const initialCtr = 1.5 + (Math.random() * 1); // Lower initial CTR
    const initialClicks = Math.floor(initialImpressions * (initialCtr / 100));
    const initialConversions = Math.floor(initialClicks * 0.02); // Very low initial conversions
    
    return {
      impressions: initialImpressions,
      clicks: initialClicks,
      conversions: initialConversions,
      ctr: Math.round(initialCtr * 100) / 100,
      conversionRate: initialConversions > 0 ? Math.round((initialConversions / initialClicks) * 100 * 100) / 100 : 0,
      cpa: initialConversions > 0 ? Math.floor((budget * 0.1) / initialConversions) : 0,
      roas: initialConversions > 0 ? Math.round((initialConversions * 50 / (budget * 0.1)) * 100) / 100 : 0
    };
  }
  
  // Existing campaign logic
  const baseImpressions = Math.floor((budget * 0.1) + (Math.random() * budget * 0.05));
  const baseCtr = 2.5 + (Math.random() * 2);
  const baseConversion = 3 + (Math.random() * 2);
  const clicks = Math.floor(baseImpressions * (baseCtr / 100));
  const conversions = Math.floor(clicks * (baseConversion / 100));
  const cpa = conversions > 0 ? Math.floor(budget / conversions) : 0;
  const roas = cpa > 0 ? Math.round(((conversions * 100) / budget) * 100) / 100 : 0;
  
  return {
    impressions: baseImpressions,
    clicks,
    conversions,
    ctr: Math.round(baseCtr * 100) / 100,
    conversionRate: Math.round(baseConversion * 100) / 100,
    cpa,
    roas
  };
};

// Function to simulate campaign performance growth over time
const simulateCampaignGrowth = (campaign: any) => {
  const daysSinceCreated = Math.floor((Date.now() - new Date(campaign.createdDate).getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysSinceCreated > 0 && campaign.status === 'active') {
    // Simulate growth based on days since creation
    const growthFactor = Math.min(1 + (daysSinceCreated * 0.1), 3); // Max 3x growth
    const basePerformance = generatePerformanceData(campaign.budget, campaign.personas, true);
    
    return {
      ...campaign.performance,
      impressions: Math.floor(basePerformance.impressions * growthFactor),
      clicks: Math.floor(basePerformance.clicks * growthFactor),
      conversions: Math.floor(basePerformance.conversions * growthFactor * 0.8), // Slower conversion growth
      ctr: Math.min(basePerformance.ctr + (daysSinceCreated * 0.1), 5), // CTR improves over time
      roas: Math.min(basePerformance.roas + (daysSinceCreated * 0.2), 8) // ROAS improves over time
    };
  }
  
  return campaign.performance;
};

export const AICampaignCreator: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'creator' | 'details'>('list');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignName, setCampaignName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);
  const [aiInsightsVisible, setAiInsightsVisible] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<MetricPrediction[]>([]);
  const [channelRecommendations, setChannelRecommendations] = useState<ChannelRecommendation[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAiMessage, setCurrentAiMessage] = useState('');
  const [showingAiThinking, setShowingAiThinking] = useState(false);
  const [generatedAdCopy, setGeneratedAdCopy] = useState<string[]>([]);
  const [audienceInsights, setAudienceInsights] = useState<any>(null);

  const steps = [
    'Campaign Setup',
    'Persona Selection',
    'AI Optimization',
    'Review & Launch'
  ];

  // AI-powered persona compatibility scoring
  const calculatePersonaCompatibility = (persona: Persona, goal: string): number => {
    const goalPersonaMap = {
      'awareness': { 'BFSI': 75, 'Retail': 85, 'SaaS': 70, 'B2B': 65 },
      'leads': { 'BFSI': 90, 'Retail': 70, 'SaaS': 95, 'B2B': 88 },
      'conversion': { 'BFSI': 85, 'Retail': 95, 'SaaS': 80, 'B2B': 75 },
      'retention': { 'BFSI': 80, 'Retail': 75, 'SaaS': 85, 'B2B': 90 }
    };
    
    const baseScore = goalPersonaMap[goal]?.[persona.category] || 70;
    const conversionBonus = Math.min(persona.conversionRate * 2, 20);
    return Math.min(baseScore + conversionBonus, 100);
  };

  // AI typing animation
  const typeMessage = (message: string, callback?: () => void) => {
    setIsTyping(true);
    setCurrentAiMessage('');
    let i = 0;
    const typing = setInterval(() => {
      if (i < message.length) {
        setCurrentAiMessage(prev => prev + message.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
        if (callback) setTimeout(callback, 500);
      }
    }, 30);
  };

  // Generate AI suggestions with animation
  const generateAiSuggestions = () => {
    const suggestions = [
      "🎯 Based on your persona mix, I recommend increasing LinkedIn budget by 25%",
      "💡 Your selected personas show 34% higher weekend engagement - consider scheduling ads accordingly",
      "📊 Similar campaigns in your industry achieved 23% better ROI with video creatives",
      "🚀 Adding lookalike audiences could expand your reach by 45% with similar conversion rates",
      "⭐ I've detected high-value personas - premium ad placements could increase quality by 28%"
    ];
    
    setShowingAiThinking(true);
    setTimeout(() => {
      setShowingAiThinking(false);
      const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
      setAiSuggestions(randomSuggestions);
    }, 1500);
  };

  // Generate ad copy variations
  const generateAdCopy = () => {
    const templates = {
      'BFSI': [
        "🏦 Secure your financial future with expert guidance. Get personalized solutions today!",
        "💰 Join 50,000+ investors who trust us with their wealth. Start your journey now.",
        "🔒 Bank-level security meets personalized service. Your money, your rules."
      ],
      'Retail': [
        "🛍️ Discover your perfect style! Exclusive deals on premium brands - limited time only.",
        "✨ Trending now: Must-have items at unbeatable prices. Shop before they're gone!",
        "🎁 Surprise yourself with our curated collection. Free shipping on orders over ₹999."
      ],
      'SaaS': [
        "🚀 Scale your business with AI-powered tools. 14-day free trial, no credit card required.",
        "⚡ Boost productivity by 40% with our platform. Join 10,000+ growing companies.",
        "🎯 From startup to scale-up - one platform for all your needs. Try it free today!"
      ],
      'B2B': [
        "📈 Industry leaders choose us for enterprise solutions. Schedule your demo today.",
        "🏢 Transform your operations with proven ROI. See why Fortune 500 companies trust us.",
        "🤝 Partnership-driven growth. Let's scale your business together."
      ]
    };

    const selectedPersonaData = customerPersonas.filter(p => selectedPersonas.includes(p.id));
    const categories = [...new Set(selectedPersonaData.map(p => p.category))];
    
    let allCopy: string[] = [];
    categories.forEach(category => {
      allCopy = [...allCopy, ...(templates[category] || [])];
    });
    
    setGeneratedAdCopy(allCopy.slice(0, 4));
  };

  // Generate AI predictions
  const generatePredictions = () => {
    if (!selectedGoal || selectedPersonas.length === 0) return;

    setIsAnalyzing(true);
    setShowingAiThinking(true);
    
    // AI thinking animation
    typeMessage("Analyzing your persona selection and campaign goals...");
    
    setTimeout(() => {
      setShowingAiThinking(false);
      generateAiSuggestions();
      generateAdCopy();
      const selectedPersonaData = customerPersonas.filter(p => selectedPersonas.includes(p.id));
      const avgConversion = selectedPersonaData.reduce((acc, p) => acc + p.conversionRate, 0) / selectedPersonaData.length;
      
      const newPredictions: MetricPrediction[] = [
        {
          metric: 'Click-Through Rate',
          predicted: Math.round((avgConversion + Math.random() * 2) * 100) / 100,
          confidence: 85 + Math.floor(Math.random() * 10),
          benchmark: 2.4,
          trend: 'up'
        },
        {
          metric: 'Conversion Rate',
          predicted: Math.round(avgConversion * 100) / 100,
          confidence: 92 + Math.floor(Math.random() * 5),
          benchmark: 3.2,
          trend: avgConversion > 3.2 ? 'up' : 'down'
        },
        {
          metric: 'Cost Per Acquisition',
          predicted: Math.round((budget / (avgConversion * 100)) * 100) / 100,
          confidence: 78 + Math.floor(Math.random() * 15),
          benchmark: 45,
          trend: 'stable'
        },
        {
          metric: 'Return on Ad Spend',
          predicted: Math.round((avgConversion * 0.8 + Math.random() * 0.4) * 100) / 100,
          confidence: 88 + Math.floor(Math.random() * 8),
          benchmark: 3.2,
          trend: 'up'
        }
      ];

      setPredictions(newPredictions);

      // Generate channel recommendations
      const channels = ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Email Marketing', 'Content Marketing'];
      const newChannelRecs: ChannelRecommendation[] = channels.map((channel, index) => ({
        channel,
        score: 70 + Math.floor(Math.random() * 25),
        budgetAllocation: Math.floor(Math.random() * 30) + 10,
        expectedCTR: Math.round((1 + Math.random() * 3) * 100) / 100,
        expectedCPA: Math.round((20 + Math.random() * 40) * 100) / 100,
        reasoning: `Based on ${selectedPersonaData.length} selected personas, this channel shows high compatibility.`
      })).sort((a, b) => b.score - a.score);

      setChannelRecommendations(newChannelRecs);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    if (selectedGoal && selectedPersonas.length > 0 && budget > 0) {
      generatePredictions();
    }
  }, [selectedGoal, selectedPersonas, budget]);

  // Auto-generate campaign name
  useEffect(() => {
    if (selectedGoal && selectedPersonas.length > 0) {
      const goal = campaignGoals.find(g => g.id === selectedGoal);
      const personas = customerPersonas.filter(p => selectedPersonas.includes(p.id));
      const categories = [...new Set(personas.map(p => p.category))];
      
      const name = `AI-Optimized ${goal?.name} - ${categories.join(' & ')} Focus`;
      setCampaignName(name);
    }
  }, [selectedGoal, selectedPersonas]);

  // Function to launch campaign
  const launchCampaign = () => {
    const selectedPersonaData = customerPersonas.filter(p => selectedPersonas.includes(p.id));
    const selectedGoalData = campaignGoals.find(g => g.id === selectedGoal);
    
    const newCampaign = {
      id: generateCampaignId(),
      name: campaignName,
      description: `Smart campaign targeting ${selectedPersonaData.map(p => p.name).join(' and ')} with predictive optimization`,
      status: 'active',
      goal: selectedGoalData?.name || 'Lead Generation',
      personas: selectedPersonaData.map(p => p.name),
      budget: budget,
      spent: 0,
      duration: `${duration} days`,
      daysRemaining: duration,
      performance: generatePerformanceData(budget, selectedPersonas, true, 0),
      aiScore: Math.floor(85 + Math.random() * 10), // Random AI score between 85-95
      lastOptimized: 'Just created',
      channels: getRecommendedChannels(selectedPersonaData),
      createdDate: new Date().toISOString().split('T')[0],
      createdBy: 'AI Assistant'
    };
    
    const updatedCampaigns = [newCampaign, ...campaigns];
    setCampaigns(updatedCampaigns);
    saveCampaignsToStorage(updatedCampaigns);
    
    // Reset form
    resetForm();
    
    // Navigate back to list
    setCurrentView('list');
  };
  
  // Function to get recommended channels based on personas
  const getRecommendedChannels = (personas: any[]) => {
    const allChannels = personas.flatMap(p => p.preferredChannels);
    const uniqueChannels = [...new Set(allChannels)];
    return uniqueChannels.slice(0, 3); // Return top 3 channels
  };
  
  // Function to reset form
  const resetForm = () => {
    setCurrentStep(0);
    setCampaignName('');
    setSelectedGoal('');
    setSelectedPersonas([]);
    setBudget(0);
    setDuration(30);
    setPredictions([]);
    setChannelRecommendations([]);
    setAiSuggestions([]);
    setCurrentAiMessage('');
    setGeneratedAdCopy([]);
    setIsAnalyzing(false);
    setShowingAiThinking(false);
    setIsTyping(false);
  };

  const renderPersonaCard = (persona: Persona) => {
    const isSelected = selectedPersonas.includes(persona.id);
    const compatibilityScore = selectedGoal ? calculatePersonaCompatibility(persona, selectedGoal) : 0;
    const IconComponent = persona.icon;

    return (
      <Card 
        key={persona.id}
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:border-blue-300'
        }`}
        onClick={() => {
          if (isSelected) {
            setSelectedPersonas(prev => prev.filter(id => id !== persona.id));
          } else {
            setSelectedPersonas(prev => [...prev, persona.id]);
          }
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${persona.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{persona.name}</h3>
                <p className="text-xs text-muted-foreground">{persona.category}</p>
              </div>
            </div>
            {selectedGoal && (
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">
                  {compatibilityScore}%
                </span>
              </div>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">{persona.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Avg Spend:</span>
              <span className="font-medium">₹{persona.avgSpend.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Conversion:</span>
              <span className="font-medium">{persona.conversionRate}%</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {persona.characteristics.slice(0, 2).map((char, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {char}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const performanceData = [
    { name: 'Week 1', predicted: 2.1, benchmark: 1.8 },
    { name: 'Week 2', predicted: 3.2, benchmark: 2.1 },
    { name: 'Week 3', predicted: 4.1, benchmark: 2.4 },
    { name: 'Week 4', predicted: 4.8, benchmark: 2.6 },
  ];

  const channelAllocationData = channelRecommendations.slice(0, 5).map((channel, index) => ({
    name: channel.channel,
    value: channel.budgetAllocation,
    fill: COLORS[index % COLORS.length]
  }));

  const selectedCampaign = selectedCampaignId ? campaigns.find(c => c.id === selectedCampaignId) : null;

  // Campaign Details View
  if (currentView === 'details' && selectedCampaign) {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                onClick={() => setCurrentView('list')}
                variant="ghost"
                size="sm"
                className="mr-2"
              >
                ← Back to Campaigns
              </Button>
              <Bot className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold">Campaign Analytics</h1>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-muted-foreground">
              Detailed analytics and insights for {selectedCampaign.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Edit Campaign
            </Button>
          </div>
        </div>

        {/* Campaign Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="text-2xl font-bold capitalize text-blue-600">
                {selectedCampaign.status}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                AI Score: {selectedCampaign.aiScore}/100
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Budget</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                ₹{selectedCampaign.budget.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Spent: ₹{selectedCampaign.spent.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">ROAS</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {selectedCampaign.performance.roas > 0 ? `${selectedCampaign.performance.roas}x` : '--'}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                vs 3.2x benchmark
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">Timeline</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {selectedCampaign.daysRemaining}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                days remaining
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
          {/* Performance Charts */}
          <div className="xl:col-span-2 space-y-4 md:space-y-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedCampaign.performance.impressions.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Impressions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCampaign.performance.clicks.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Clicks</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedCampaign.performance.conversions}
                    </div>
                    <div className="text-sm text-muted-foreground">Conversions</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {selectedCampaign.performance.ctr}%
                    </div>
                    <div className="text-sm text-muted-foreground">CTR</div>
                  </div>
                </div>
                
                {/* Performance Chart */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: 'Day 1', impressions: 5000, clicks: 150, conversions: 8 },
                    { name: 'Day 7', impressions: 12000, clicks: 360, conversions: 18 },
                    { name: 'Day 14', impressions: 18000, clicks: 540, conversions: 28 },
                    { name: 'Day 21', impressions: 25000, clicks: 750, conversions: 42 },
                    { name: 'Day 28', impressions: 32000, clicks: 960, conversions: 56 },
                    { name: 'Today', impressions: selectedCampaign.performance.impressions, clicks: selectedCampaign.performance.clicks, conversions: selectedCampaign.performance.conversions }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="impressions" stroke="#3b82f6" strokeWidth={2} name="Impressions" />
                    <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#8b5cf6" strokeWidth={2} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCampaign.channels.map((channel, index) => {
                    const performance = {
                      impressions: Math.floor(selectedCampaign.performance.impressions / selectedCampaign.channels.length),
                      ctr: (2.5 + Math.random() * 2),
                      conversions: Math.floor(selectedCampaign.performance.conversions / selectedCampaign.channels.length),
                      cost: Math.floor(selectedCampaign.spent / selectedCampaign.channels.length)
                    };
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <div>
                            <div className="font-medium">{channel}</div>
                            <div className="text-sm text-muted-foreground">
                              {performance.impressions.toLocaleString()} impressions
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{performance.ctr.toFixed(1)}% CTR</div>
                          <div className="text-sm text-muted-foreground">
                            ₹{performance.cost.toLocaleString()} spent
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Performance Alert</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Campaign is performing 23% above benchmark. Consider increasing budget for similar campaigns.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Optimization</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Best performing time: 2-4 PM weekdays. Shift 15% more budget to these hours.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Audience Insight</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    {selectedCampaign.personas[0]} persona shows highest engagement. Create lookalike audiences.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Target Personas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Target Personas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedCampaign.personas.map((persona, index) => {
                  const personaData = customerPersonas.find(p => p.name === persona);
                  if (!personaData) return null;
                  const IconComponent = personaData.icon;
                  
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${personaData.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{persona}</div>
                        <div className="text-xs text-muted-foreground">
                          {personaData.category} • {personaData.conversionRate}% conversion
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {Math.round(selectedCampaign.performance.conversions / selectedCampaign.personas.length)}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Campaign Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Created:</span>
                    <span className="font-medium">{new Date(selectedCampaign.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span className="font-medium">{selectedCampaign.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Days Left:</span>
                    <span className="font-medium text-orange-600">{selectedCampaign.daysRemaining}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Optimized:</span>
                    <span className="font-medium text-blue-600">{selectedCampaign.lastOptimized}</span>
                  </div>
                </div>
                
                <Progress 
                  value={((Number.parseInt(selectedCampaign.duration) - selectedCampaign.daysRemaining) / Number.parseInt(selectedCampaign.duration)) * 100} 
                  className="mt-3" 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Campaign List View
  if (currentView === 'list') {
    return (
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold">AI Campaigns</h1>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-muted-foreground">
              Manage your intelligent, AI-powered marketing campaigns
            </p>
          </div>
          <Button 
            onClick={() => setCurrentView('creator')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            <Bot className="w-4 h-4 mr-2" />
            Create AI Campaign
          </Button>
        </div>

        {/* Campaign List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {campaigns.map((campaign) => {
            const statusColors = {
              active: 'bg-green-100 text-green-800 border-green-200',
              paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
              completed: 'bg-blue-100 text-blue-800 border-blue-200',
              draft: 'bg-gray-100 text-gray-800 border-gray-200'
            };

            return (
              <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={statusColors[campaign.status]}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                        {campaign.aiScore > 0 && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Brain className="w-3 h-3 mr-1" />
                            AI Score: {campaign.aiScore}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg font-semibold leading-tight">
                        {campaign.name}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {campaign.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Campaign Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Budget</div>
                      <div className="text-lg font-semibold text-blue-600">
                        ₹{campaign.budget.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Spent: ₹{campaign.spent.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Performance</div>
                      <div className="text-lg font-semibold text-green-600">
                        {campaign.performance.roas > 0 ? `${campaign.performance.roas}x` : '--'}
                      </div>
                      <div className="text-xs text-muted-foreground">ROAS</div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  {campaign.performance.impressions > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Impressions:</span>
                        <span className="font-medium">{campaign.performance.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Clicks:</span>
                        <span className="font-medium">{campaign.performance.clicks.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conversions:</span>
                        <span className="font-medium">{campaign.performance.conversions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>CTR:</span>
                        <span className="font-medium text-blue-600">{campaign.performance.ctr}%</span>
                      </div>
                    </div>
                  )}

                  {/* Personas */}
                  <div>
                    <div className="text-sm font-medium mb-2">Target Personas</div>
                    <div className="flex flex-wrap gap-1">
                      {campaign.personas.map((persona, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {persona}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Channels */}
                  <div>
                    <div className="text-sm font-medium mb-2">Channels</div>
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {campaign.daysRemaining > 0 ? `${campaign.daysRemaining} days left` : 'Completed'}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      Created {new Date(campaign.createdDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* AI Optimization Status */}
                  {campaign.lastOptimized && campaign.lastOptimized !== 'Never' && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      <Zap className="w-3 h-3" />
                      <span>Last AI optimization: {campaign.lastOptimized}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex pt-3 border-t">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedCampaignId(campaign.id);
                        setCurrentView('details');
                      }}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{campaigns.length}</div>
              <div className="text-sm text-muted-foreground">Total Campaigns</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{campaigns.filter(c => c.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(campaigns.filter(c => c.performance.roas > 0).reduce((sum, c) => sum + c.performance.roas, 0) / campaigns.filter(c => c.performance.roas > 0).length * 100) / 100 || 0}x
              </div>
              <div className="text-sm text-muted-foreground">Avg ROAS</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold">AI Campaign Creator</h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-muted-foreground">
            Create intelligent, data-driven marketing campaigns with AI-powered insights
          </p>
        </div>
        <Button 
          onClick={() => setCurrentView('list')}
          variant="outline"
        >
          ← Back to Campaigns
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 mx-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Campaign Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Enter campaign name..."
                  />
                  {campaignName && (
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <Sparkles className="w-3 h-3" />
                      AI-generated name suggestion
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Campaign Goal</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {campaignGoals.map((goal) => {
                      const IconComponent = goal.icon;
                      return (
                        <Card
                          key={goal.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedGoal === goal.id 
                              ? 'ring-2 ring-blue-500 bg-blue-50' 
                              : 'hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedGoal(goal.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-sm">{goal.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {goal.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (₹)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      placeholder="30"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Smart Persona Selection
                  <Badge variant="outline" className="ml-2">
                    <Brain className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customerPersonas.map(renderPersonaCard)}
                </div>
                
                {selectedPersonas.length > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">AI Insights</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Selected {selectedPersonas.length} personas with average compatibility score of{' '}
                      {Math.round(
                        selectedPersonas.reduce((acc, id) => {
                          const persona = customerPersonas.find(p => p.id === id);
                          return acc + (persona ? calculatePersonaCompatibility(persona, selectedGoal) : 0);
                        }, 0) / selectedPersonas.length
                      )}%
                      . This combination is predicted to deliver above-benchmark performance.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Campaign Optimization
                    {isAnalyzing && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                        <span className="text-xs">Analyzing...</span>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="predictions" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="predictions">Performance Predictions</TabsTrigger>
                      <TabsTrigger value="channels">Channel Mix</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="predictions" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {predictions.map((prediction, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">{prediction.metric}</span>
                                <Badge variant={prediction.trend === 'up' ? 'default' : 'secondary'}>
                                  {prediction.confidence}% confidence
                                </Badge>
                              </div>
                              <div className="text-2xl font-bold text-blue-600 mb-1">
                                {prediction.predicted}
                                {prediction.metric.includes('Rate') ? '%' : prediction.metric.includes('Cost') ? '₹' : 'x'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                vs benchmark: {prediction.benchmark}
                                {prediction.metric.includes('Rate') ? '%' : prediction.metric.includes('Cost') ? '₹' : 'x'}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {predictions.length > 0 && (
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-3">Predicted Performance Trend</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line 
                                  type="monotone" 
                                  dataKey="predicted" 
                                  stroke="#3b82f6" 
                                  strokeWidth={2}
                                  name="AI Predicted"
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="benchmark" 
                                  stroke="#94a3b8" 
                                  strokeDasharray="5 5"
                                  name="Industry Benchmark"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="channels" className="space-y-4">
                      <div className="space-y-3">
                        {channelRecommendations.map((channel, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{channel.channel}</span>
                                  <Badge variant="outline">Score: {channel.score}</Badge>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {channel.budgetAllocation}% budget
                                </span>
                              </div>
                              <Progress value={channel.score} className="mb-2" />
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>Expected CTR: {channel.expectedCTR}%</div>
                                <div>Expected CPA: ₹{channel.expectedCPA}</div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                {channel.reasoning}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {channelAllocationData.length > 0 && (
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-3">Recommended Budget Allocation</h4>
                            <ResponsiveContainer width="100%" height={200}>
                              <RechartsPieChart>
                                <Pie
                                  dataKey="value"
                                  data={channelAllocationData}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  label={({ name, value }) => `${name}: ${value}%`}
                                >
                                  {channelAllocationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </RechartsPieChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Review & Launch Campaign
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">AI Campaign Summary</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Campaign Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Name: {campaignName}</div>
                        <div>Goal: {campaignGoals.find(g => g.id === selectedGoal)?.name}</div>
                        <div>Budget: ₹{budget.toLocaleString()}</div>
                        <div>Duration: {duration} days</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">AI Predictions</h4>
                      <div className="space-y-1 text-sm">
                        {predictions.slice(0, 3).map((pred, index) => (
                          <div key={index}>
                            {pred.metric}: {pred.predicted}
                            {pred.metric.includes('Rate') ? '%' : pred.metric.includes('Cost') ? '₹' : 'x'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Selected Personas ({selectedPersonas.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPersonas.map(id => {
                        const persona = customerPersonas.find(p => p.id === id);
                        return persona ? (
                          <Badge key={id} className={persona.color}>
                            {persona.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={launchCampaign}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch AI-Optimized Campaign
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Assistant Sidebar */}
        <div className="space-y-4">
          {/* AI Chat Interface */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <div className="relative">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                AI Campaign Assistant
                <Badge variant="outline" className="ml-auto text-xs bg-blue-100 text-blue-700">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* AI Thinking Animation */}
              {showingAiThinking && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs text-blue-600">AI is analyzing...</span>
                </div>
              )}
              
              {/* AI Typing Message */}
              {currentAiMessage && (
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2">
                    <Bot className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-blue-800">
                      {currentAiMessage}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI Suggestions */}
              {aiSuggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">AI Recommendations</span>
                  </div>
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-2 bg-white rounded border border-blue-200 text-xs text-blue-700">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Performance Metrics */}
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-1 mb-1">
                    <Gauge className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Campaign Score</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">
                    {selectedPersonas.length > 0 && selectedGoal ? '94' : '0'}/100
                  </div>
                  <Progress 
                    value={selectedPersonas.length > 0 && selectedGoal ? 94 : 0} 
                    className="h-1 mt-2" 
                  />
                  <p className="text-xs text-blue-700 mt-1">
                    {selectedPersonas.length > 0 && selectedGoal 
                      ? 'Excellent setup! Ready for optimization.' 
                      : 'Complete setup to see AI analysis'}
                  </p>
                </div>
                
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-800">Predicted ROI</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {selectedPersonas.length > 0 ? '+287%' : '--'}
                  </div>
                  <p className="text-xs text-green-700">
                    {selectedPersonas.length > 0 
                      ? 'Above industry benchmark' 
                      : 'Select personas for prediction'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4" />
                Real-time Insights
              </CardTitle>
            </CardHeader>
            {aiInsightsVisible && (
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-800">Optimal Timing</span>
                  </div>
                  <div className="text-sm font-medium text-purple-600">
                    {selectedPersonas.length > 0 ? 'Tue-Thu, 2-4 PM' : 'Select personas'}
                  </div>
                  <p className="text-xs text-purple-700">
                    {selectedPersonas.length > 0 
                      ? 'Peak engagement for your audience' 
                      : 'Choose personas to see timing insights'}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Audience:</span>
                  <span className="font-medium">
                    {selectedPersonas.length > 0 
                      ? `${Math.floor(Math.random() * 50000) + 10000}` 
                      : '0'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Reach:</span>
                  <span className="font-medium">
                    {budget > 0 ? `${Math.floor(budget * 0.1)}` : '0'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>AI Confidence:</span>
                  <span className="font-medium text-green-600">
                    {selectedPersonas.length > 0 && selectedGoal ? '94%' : '0%'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentStep === 3) {
              launchCampaign();
            } else {
              setCurrentStep(Math.min(3, currentStep + 1));
            }
          }}
          disabled={
            (currentStep === 0 && (!selectedGoal || !budget)) ||
            (currentStep === 1 && selectedPersonas.length === 0)
          }
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === 3 ? 'Launch Campaign' : 'Next'}
        </Button>
      </div>
    </div>
  );
};