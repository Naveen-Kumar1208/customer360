// AI Campaign Data and Utilities

export interface MarketingMetrics {
  social: {
    impressions: number;
    reach: number;
    ctr: number;
    videoViewRate: number;
    cpc: number;
    cpm: number;
    cpl: number;
    cpa: number;
    roas: number;
    leads: number;
    signups: number;
    conversionRate: number;
  };
  seo: {
    organicTraffic: number;
    keywordRankings: number;
    bounceRate: number;
    backlinks: number;
    qualityScore: number;
    adRank: number;
    impressionShare: number;
    multiTouchAttribution: number;
    cltv: number;
    leadToCustomerRate: number;
  };
}

export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  industryFocus: string[];
  estimatedBudget: string;
  expectedDuration: string;
  primaryGoal: string;
  keyMetrics: string[];
  channels: string[];
  adCopyVariations: string[];
  targetingStrategy: string;
  bidStrategy: string;
  optimizationTips: string[];
}

export const campaignTemplates: CampaignTemplate[] = [
  {
    id: 'bfsi_acquisition',
    name: 'BFSI Customer Acquisition',
    description: 'Targeted campaign for acquiring new banking and financial services customers',
    category: 'Acquisition',
    industryFocus: ['Banking', 'Insurance', 'Investment'],
    estimatedBudget: '₹50,000 - ₹200,000',
    expectedDuration: '4-8 weeks',
    primaryGoal: 'Lead Generation',
    keyMetrics: ['CPL', 'Lead Quality Score', 'Conversion Rate', 'CLTV'],
    channels: ['Google Ads', 'LinkedIn', 'Facebook', 'Email'],
    adCopyVariations: [
      'Secure your financial future with our expert guidance',
      'Get personalized investment solutions tailored for you',
      'Join thousands who trusted us with their wealth'
    ],
    targetingStrategy: 'Income-based targeting, financial interests, competitor audiences',
    bidStrategy: 'Target CPA with automated bidding',
    optimizationTips: [
      'Use trust signals and certifications in ad copy',
      'Implement strong lead qualification forms',
      'Create dedicated landing pages for each product'
    ]
  },
  {
    id: 'retail_retention',
    name: 'Retail Customer Retention',
    description: 'Re-engage existing customers and increase repeat purchases',
    category: 'Retention',
    industryFocus: ['E-commerce', 'Retail', 'Fashion'],
    estimatedBudget: '₹30,000 - ₹100,000',
    expectedDuration: '2-6 weeks',
    primaryGoal: 'Customer Retention',
    keyMetrics: ['Retention Rate', 'Repeat Purchase Rate', 'CLTV', 'Engagement Rate'],
    channels: ['Email', 'SMS', 'Push Notifications', 'Facebook', 'Instagram'],
    adCopyVariations: [
      'We miss you! Come back for exclusive offers',
      'Your favorites are waiting - 20% off today',
      'Complete your look with personalized recommendations'
    ],
    targetingStrategy: 'Customer lists, lookalike audiences, behavioral targeting',
    bidStrategy: 'Maximize conversions with ROAS target',
    optimizationTips: [
      'Segment audiences by purchase history',
      'Use dynamic product ads for personalization',
      'Implement email automation sequences'
    ]
  },
  {
    id: 'saas_trial_conversion',
    name: 'SaaS Trial to Paid Conversion',
    description: 'Convert free trial users to paying customers',
    category: 'Conversion',
    industryFocus: ['SaaS', 'Technology', 'Software'],
    estimatedBudget: '₹25,000 - ₹75,000',
    expectedDuration: '3-5 weeks',
    primaryGoal: 'Drive Conversions',
    keyMetrics: ['Trial to Paid Rate', 'CPA', 'MRR Growth', 'Churn Rate'],
    channels: ['In-app', 'Email', 'LinkedIn', 'Content Marketing'],
    adCopyVariations: [
      'Upgrade now and unlock unlimited features',
      'Your trial expires soon - don\'t lose your data',
      'Join 10,000+ businesses growing with our platform'
    ],
    targetingStrategy: 'Trial user segments, feature usage data, engagement scores',
    bidStrategy: 'Target CPA with value-based optimization',
    optimizationTips: [
      'Create urgency around trial expiration',
      'Showcase premium features in campaigns',
      'Use customer success stories and case studies'
    ]
  },
  {
    id: 'b2b_lead_nurturing',
    name: 'B2B Lead Nurturing',
    description: 'Nurture leads through the sales funnel with educational content',
    category: 'Nurturing',
    industryFocus: ['B2B Services', 'Enterprise Software', 'Consulting'],
    estimatedBudget: '₹40,000 - ₹150,000',
    expectedDuration: '6-12 weeks',
    primaryGoal: 'Lead Generation',
    keyMetrics: ['MQL to SQL Rate', 'Sales Cycle Length', 'Pipeline Value', 'Engagement Score'],
    channels: ['LinkedIn', 'Email', 'Content Syndication', 'Webinars'],
    adCopyVariations: [
      'Download our comprehensive industry guide',
      'Register for exclusive executive briefing',
      'See how industry leaders solve this challenge'
    ],
    targetingStrategy: 'Job title targeting, company size, industry verticals',
    bidStrategy: 'Maximize clicks with manual CPC adjustments',
    optimizationTips: [
      'Create multi-touch nurture sequences',
      'Use progressive profiling in forms',
      'Align content with buyer journey stages'
    ]
  }
];

export const industryBenchmarks = {
  BFSI: {
    avgCTR: 2.8,
    avgConversionRate: 3.2,
    avgCPA: 45,
    avgCPL: 25,
    avgROAS: 3.4
  },
  Retail: {
    avgCTR: 3.1,
    avgConversionRate: 2.9,
    avgCPA: 32,
    avgCPL: 18,
    avgROAS: 4.2
  },
  SaaS: {
    avgCTR: 2.4,
    avgConversionRate: 4.1,
    avgCPA: 67,
    avgCPL: 34,
    avgROAS: 5.1
  },
  B2B: {
    avgCTR: 2.1,
    avgConversionRate: 3.8,
    avgCPA: 89,
    avgCPL: 52,
    avgROAS: 4.7
  }
};

export const channelPerformanceData = {
  'Google Ads': {
    avgCTR: 3.2,
    avgCPC: 2.5,
    avgConversionRate: 4.1,
    bestFor: ['Lead Generation', 'Conversions'],
    audienceReach: 'High',
    setupComplexity: 'Medium'
  },
  'Facebook Ads': {
    avgCTR: 2.8,
    avgCPC: 1.8,
    avgConversionRate: 3.4,
    bestFor: ['Brand Awareness', 'Engagement'],
    audienceReach: 'Very High',
    setupComplexity: 'Low'
  },
  'LinkedIn Ads': {
    avgCTR: 2.1,
    avgCPC: 5.2,
    avgConversionRate: 6.8,
    bestFor: ['B2B Lead Generation', 'Professional Services'],
    audienceReach: 'Medium',
    setupComplexity: 'Medium'
  },
  'Email Marketing': {
    avgCTR: 12.5,
    avgCPC: 0.1,
    avgConversionRate: 8.2,
    bestFor: ['Retention', 'Nurturing'],
    audienceReach: 'Targeted',
    setupComplexity: 'Low'
  },
  'Content Marketing': {
    avgCTR: 1.8,
    avgCPC: 0.5,
    avgConversionRate: 2.9,
    bestFor: ['Brand Building', 'Education'],
    audienceReach: 'Medium',
    setupComplexity: 'High'
  }
};

export const optimizationRecommendations = {
  budgetAllocation: [
    {
      condition: 'High-value personas selected',
      recommendation: 'Allocate 40% budget to LinkedIn and Google Ads for better quality leads',
      impact: '+25% lead quality'
    },
    {
      condition: 'Retail personas dominant',
      recommendation: 'Increase Facebook and Instagram allocation to 60% for visual engagement',
      impact: '+18% engagement rate'
    },
    {
      condition: 'B2B focus detected',
      recommendation: 'Invest 50% in content marketing and LinkedIn for long-term nurturing',
      impact: '+35% pipeline value'
    }
  ],
  timing: [
    {
      persona: 'Enterprise decision makers',
      optimal: 'Tuesday-Thursday, 9 AM - 11 AM',
      reasoning: 'Professional peak hours'
    },
    {
      persona: 'Retail consumers',
      optimal: 'Friday-Sunday, 7 PM - 9 PM',
      reasoning: 'Weekend shopping behavior'
    },
    {
      persona: 'SaaS users',
      optimal: 'Monday-Wednesday, 2 PM - 4 PM',
      reasoning: 'Work-day productivity hours'
    }
  ],
  creative: [
    {
      goal: 'Lead Generation',
      suggestions: [
        'Use clear value propositions in headlines',
        'Include trust signals like testimonials',
        'Create urgency with limited-time offers'
      ]
    },
    {
      goal: 'Brand Awareness',
      suggestions: [
        'Focus on emotional storytelling',
        'Use vibrant visuals and brand colors',
        'Include brand personality elements'
      ]
    },
    {
      goal: 'Conversions',
      suggestions: [
        'Highlight specific benefits and features',
        'Use action-oriented CTAs',
        'Show social proof and reviews'
      ]
    }
  ]
};

export const aiInsightGenerator = {
  generateCompatibilityInsight: (personas: any[], goal: string) => {
    const avgCompatibility = personas.reduce((sum, p) => sum + (p.compatibility || 70), 0) / personas.length;
    
    if (avgCompatibility >= 85) {
      return {
        type: 'success',
        message: 'Excellent persona-goal alignment! This combination is predicted to outperform benchmarks by 25-40%.',
        confidence: 92
      };
    } else if (avgCompatibility >= 70) {
      return {
        type: 'good',
        message: 'Good compatibility detected. Expected performance is 15-25% above industry average.',
        confidence: 78
      };
    } else {
      return {
        type: 'warning',
        message: 'Consider adjusting persona selection for better goal alignment and improved performance.',
        confidence: 65
      };
    }
  },
  
  generateBudgetInsight: (budget: number, personas: any[]) => {
    const avgSpend = personas.reduce((sum, p) => sum + (p.avgSpend || 10000), 0) / personas.length;
    const recommendedBudget = avgSpend * 0.1 * personas.length;
    
    if (budget >= recommendedBudget * 1.2) {
      return {
        type: 'success',
        message: `Budget is well-suited for selected personas. Consider premium channels for maximum impact.`,
        confidence: 88
      };
    } else if (budget >= recommendedBudget * 0.8) {
      return {
        type: 'good',
        message: 'Budget allocation is appropriate. Focus on high-ROI channels for optimal results.',
        confidence: 82
      };
    } else {
      return {
        type: 'warning',
        message: `Consider increasing budget to ₹${Math.round(recommendedBudget).toLocaleString()} for better reach and impact.`,
        confidence: 75
      };
    }
  },
  
  generatePerformancePrediction: (personas: any[], goal: string, budget: number) => {
    const basePerformance = {
      ctr: 2.5,
      conversionRate: 3.2,
      cpa: 45,
      roas: 3.4
    };
    
    const personaBoost = personas.reduce((sum, p) => sum + ((p.conversionRate || 3) / 3), 0) / personas.length;
    const budgetFactor = Math.min(budget / 50000, 2);
    
    return {
      ctr: Math.round((basePerformance.ctr * personaBoost * budgetFactor) * 100) / 100,
      conversionRate: Math.round((basePerformance.conversionRate * personaBoost) * 100) / 100,
      cpa: Math.round((basePerformance.cpa / (personaBoost * budgetFactor)) * 100) / 100,
      roas: Math.round((basePerformance.roas * personaBoost * Math.sqrt(budgetFactor)) * 100) / 100
    };
  }
};