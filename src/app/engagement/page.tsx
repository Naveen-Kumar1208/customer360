"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Calendar, Filter, BarChart2, Target, Clock, Mail, MessageSquare, Send, Smartphone, ChevronRight, Users, Loader2 } from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Custom icon components
type IconProps = { size: number };
const UserPlus = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const ShoppingCart = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const ShoppingBag = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// Bell, HelpCircle, PlusIcon
const Bell = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
const HelpCircle = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);
const PlusIcon = ({ size }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// 1. PersonalizedInsights Component
const PersonalizedInsights = () => {
  const insights = [
    {
      text: 'Thursday sends perform 24% better than Mondays',
      trend: 'up',
      value: 24
    },
    {
      text: 'Emails sent between 2-4PM generate 15% more clicks',
      trend: 'up',
      value: 15
    },
    {
      text: 'Automations outperform one-time campaigns by 18% for conversion goals',
      trend: 'up',
      value: 18
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">✨ Insights</h2>
        <button className="text-purple-600 text-sm font-medium hover:underline">Refresh</button>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-center bg-green-50 rounded-md p-4">
            <span className="bg-green-200 text-green-700 rounded-full p-1 mr-3 flex items-center justify-center">
              {insight.trend === 'up' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            </span>
            <div className="flex-1">
              <div className="text-sm text-gray-800 font-medium">{insight.text}</div>
              <span className={`text-xs font-bold ${insight.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {insight.trend === 'up' ? '+' : '-'}{insight.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ... (Paste all other subcomponents and EngagementDashboard here, as in the user message) ...

// (The rest of the code is omitted here for brevity, but in the actual edit, paste the entire EngagementDashboard code and all subcomponents from the user message.)

const TAB_OVERVIEW = 'Overview';
const TAB_CAMPAIGN = 'Campaign';
const TAB_DEMOGRAPHICS = 'Demographics';
const TAB_PERFORMANCE = 'Performance';

const statusFilters = [
  { label: 'All', count: 24 },
  { label: 'Active', count: 18 },
  { label: 'Scheduled', count: 3 },
  { label: 'Completed', count: 42 },
  { label: 'Drafts', count: 7, highlight: true },
];

const statCards = [
  {
    label: 'Campaigns',
    value: '24',
    icon: <Calendar size={24} />, 
    change: '+8.5%',
    changeType: 'up',
    changeColor: 'text-green-600',
  },
  {
    label: 'Emails Sent',
    value: '148,325',
    icon: <Mail size={24} />, 
    change: '+12.3%',
    changeType: 'up',
    changeColor: 'text-green-600',
  },
  {
    label: 'Open Rate',
    value: '72.4%',
    icon: <BarChart2 size={24} />, 
    change: '+5.2%',
    changeType: 'up',
    changeColor: 'text-green-600',
  },
  {
    label: 'Click Rate',
    value: '38.7%',
    icon: <BarChart2 size={24} />, 
    change: '-2.1%',
    changeType: 'down',
    changeColor: 'text-red-600',
  },
  {
    label: 'Click-to-Open',
    value: '53.5%',
    icon: <Target size={24} />, 
    change: '-1.7%',
    changeType: 'down',
    changeColor: 'text-red-600',
  },
  {
    label: 'Bounces',
    value: '862',
    icon: <Clock size={24} />, 
    change: '+0.8%',
    changeType: 'up',
    changeColor: 'text-red-600',
  },
];

const campaignPerformanceData = [
  { name: 'Jan', Sent: 4200, Opens: 3100, Clicks: 1200 },
  { name: 'Feb', Sent: 3700, Opens: 2500, Clicks: 900 },
  { name: 'Mar', Sent: 4800, Opens: 3300, Clicks: 1500 },
  { name: 'Apr', Sent: 4300, Opens: 2700, Clicks: 1300 },
  { name: 'May', Sent: 6100, Opens: 4200, Clicks: 2100 },
  { name: 'Jun', Sent: 5700, Opens: 3900, Clicks: 1800 },
];

// Mock data for Daily Engagement Rate
const dailyEngagementData = [
  { day: 'Mon', engagement: 64 },
  { day: 'Tue', engagement: 72 },
  { day: 'Wed', engagement: 63 },
  { day: 'Thu', engagement: 78 },
  { day: 'Fri', engagement: 81 },
  { day: 'Sat', engagement: 55 },
  { day: 'Sun', engagement: 48 },
];

// Mock data for Channel Performance
const channelPerformanceData = [
  { metric: 'Delivery Rate', Email: 98.2, WhatsApp: 99.7, SMS: 99.5 },
  { metric: 'Engagement Rate', Email: 72.1, WhatsApp: 95.2, SMS: 97.8 },
  { metric: 'Response Rate', Email: 6.2, WhatsApp: 8.1, SMS: 3.5 },
];

const channelSummary = [
  { label: 'Email', value: '65%', icon: <Mail size={24} />, color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-100' },
  { label: 'WhatsApp', value: '25%', icon: <MessageSquare size={24} />, color: 'bg-green-50 text-green-700', border: 'border-green-100' },
  { label: 'SMS', value: '10%', icon: <Send size={24} />, color: 'bg-orange-50 text-orange-700', border: 'border-orange-100' },
];

// Mock data for Comparative Analysis
const comparativeData = [
  { metric: 'Open Rate', Campaigns: 70, Automations: 76 },
  { metric: 'Click Rate', Campaigns: 42, Automations: 39 },
  { metric: 'Conversion', Campaigns: 9, Automations: 17 },
  { metric: 'ROI', Campaigns: 3, Automations: 5 },
];

// Mock data for Campaign Goals
const campaignGoal = {
  percent: 42,
  target: 5000,
  current: 2100,
  funnel: [
    { label: 'Sent', value: 148325, percent: 100, drop: 27.5, continue: 72.5, color: 'bg-purple-400' },
    { label: 'Opened', value: 107467, percent: 72.5, drop: 70.1, continue: 29.9, color: 'bg-purple-400' },
    { label: 'Clicked', value: 32085, percent: 29.9, drop: 93.5, continue: 6.5, color: 'bg-pink-400' },
    { label: 'Converted', value: 2100, percent: 6.5, drop: null, continue: null, color: 'bg-pink-400' },
  ],
  costPerConversion: 11.90,
  roi: 352,
  revenue: 132500,
};

const recentCampaigns = [
  { name: 'Summer Sale Promotion', type: 'Campaign', status: 'Active', sent: 24683, open: 68.5, click: 42.3, date: '5/10/2025' },
  { name: 'Weekly Newsletter', type: 'Recurring', status: 'Active', sent: 42156, open: 75.2, click: 38.9, date: '5/15/2025' },
  { name: 'Product Launch', type: 'Campaign', status: 'Scheduled', sent: 0, open: 0, click: 0, date: '5/20/2025' },
  { name: 'Customer Feedback Survey', type: 'Automation', status: 'Active', sent: 15387, open: 62.7, click: 35.1, date: '5/5/2025' },
];

// Mock data for Engagement Tab
const engagementCards = [
  { label: 'Average Open Rate', value: '72.4%', change: '+5.2%', changeType: 'up' },
  { label: 'Average Click Rate', value: '38.7%', change: '-2.1%', changeType: 'down' },
  { label: 'Interaction Time', value: '1:42', unit: 'minutes' },
  { label: 'Forwarding Rate', value: '3.8%', change: '+0.7%', changeType: 'up' },
];

const timeOfDayData = [
  { time: '6am-9am', open: 32, click: 14 },
  { time: '9am-12pm', open: 54, click: 22 },
  { time: '12pm-3pm', open: 74, click: 31 },
  { time: '3pm-6pm', open: 82, click: 51 },
  { time: '6pm-9pm', open: 64, click: 33 },
  { time: '9pm-12am', open: 58, click: 27 },
  { time: '12am-6am', open: 24, click: 11 },
];

const deviceData = [
  { name: 'Mobile', value: 64, color: '#6366F1' },
  { name: 'Desktop', value: 28, color: '#4ADE80' },
  { name: 'Tablet', value: 8, color: '#FB923C' },
];

const contentTypeData = [
  { type: 'Promotional', open: 68, click: 54, conversion: 29 },
  { type: 'Newsletter', open: 82, click: 61, conversion: 19 },
  { type: 'Educational', open: 91, click: 67, conversion: 14 },
  { type: 'Product Updates', open: 77, click: 52, conversion: 21 },
  { type: 'Events', open: 73, click: 59, conversion: 17 },
];

const contentLengthData = [
  { length: 'Short (<300 chars)', open: 75, click: 40, read: 20 },
  { length: 'Medium (300-600)', open: 72, click: 45, read: 28 },
  { length: 'Long (600-1200)', open: 65, click: 38, read: 42 },
  { length: 'Very Long (1200+)', open: 55, click: 30, read: 58 },
];

// Mock data for Demographics Tab
const demographicsCards = [
  { label: 'Total Subscribers', value: '5,600', change: '+7.7%', changeType: 'up' },
  { label: 'Average Age', value: '36.4', unit: 'years' },
  { label: 'Top Location', value: 'US', percent: '42%' },
  { label: 'Unsubscribe Rate', value: '3.2%', change: '+0.4%', changeType: 'down' },
];

const ageDistributionData = [
  { age: '18-24', value: 15 },
  { age: '25-34', value: 32 },
  { age: '35-44', value: 28 },
  { age: '45-54', value: 16 },
  { age: '55-64', value: 8 },
  { age: '65+', value: 2 },
];

const genderData = [
  { name: 'Male', value: 43, color: '#6366F1' },
  { name: 'Female', value: 54, color: '#4ADE80' },
  { name: 'Non-binary', value: 3, color: '#FB923C' },
];

// Mock data for Location Distribution and Audience Interests
const locationData = [
  { location: 'United States', value: 50 },
  { location: 'India', value: 22 },
  { location: 'United Kingdom', value: 10 },
  { location: 'Canada', value: 7 },
  { location: 'Australia', value: 5 },
  { location: 'Germany', value: 4 },
  { location: 'Other', value: 15 },
];

const interestData = [
  { interest: 'Technology', value: 68 },
  { interest: 'Business', value: 54 },
  { interest: 'Marketing', value: 47 },
  { interest: 'Design', value: 39 },
  { interest: 'Finance', value: 32 },
  { interest: 'Education', value: 27 },
  { interest: 'Entertainment', value: 22 },
];

// Mock data for Subscriber Growth
const subscriberGrowthData = [
  { month: 'Jan', subscribers: 4200, unsubscribes: 3900 },
  { month: 'Feb', subscribers: 4400, unsubscribes: 4600 },
  { month: 'Mar', subscribers: 4600, unsubscribes: 4800 },
  { month: 'Apr', subscribers: 4800, unsubscribes: 5100 },
  { month: 'May', subscribers: 5200, unsubscribes: 4600 },
  { month: 'Jun', subscribers: 5600, unsubscribes: 6000 },
];

// Mock data for Performance Tab
const performanceCards = [
  { label: 'Average ROI', value: '452%', change: '+23%', changeType: 'up' },
  { label: 'Conversion Rate', value: '2.8%', change: '+0.3%', changeType: 'up' },
  { label: 'Cost Per Conversion', value: '$6.42', change: '-$0.82', changeType: 'down' },
  { label: 'Revenue Attributed', value: '$76.4k', change: '+12.8%', changeType: 'up' },
];

const roiTable = [
  { campaign: 'Product Launch', cost: 4200, revenue: 28500, roi: 578 },
  { campaign: 'Summer Sale', cost: 3800, revenue: 21400, roi: 463 },
  { campaign: 'Weekly Newsletter', cost: 1200, revenue: 5800, roi: 383 },
  { campaign: 'Customer Feedback', cost: 950, revenue: 3200, roi: 237 },
  { campaign: 'Webinar Promo', cost: 2800, revenue: 18500, roi: 561 },
];

// Mock data for Conversion Funnel and Performance by Segment
const funnelData = [
  { stage: 'Email Sent', value: 150000 },
  { stage: 'Email Opened', value: 120000 },
  { stage: 'Link Clicked', value: 42000 },
  { stage: 'Page Visited', value: 25000 },
  { stage: 'Added to Cart', value: 8500 },
  { stage: 'Purchased', value: 3200 },
];

const segmentData = [
  { segment: 'New', open: 82, click: 48, conversion: 12 },
  { segment: 'Engaged (3mo)', open: 75, click: 52, conversion: 18 },
  { segment: 'Inactive (6mo+)', open: 29, click: 12, conversion: 3 },
];

// Mock data for A/B Test Results
const abTestResults = [
  {
    element: 'Subject Line',
    variantA: 'Product Launch: 25% Off Today Only',
    variantB: 'Introducing Our New Product Line Today',
    aPerf: 68.5,
    bPerf: 72.3,
    improvement: 5.5,
  },
  {
    element: 'CTA Button Color',
    variantA: 'Blue',
    variantB: 'Green',
    aPerf: 42.3,
    bPerf: 38.7,
    improvement: -8.5,
  },
  {
    element: 'Email Length',
    variantA: 'Short (300 words)',
    variantB: 'Long (800 words)',
    aPerf: 43.8,
    bPerf: 39.2,
    improvement: -10.5,
  },
  {
    element: 'Sender Name',
    variantA: 'Company Name',
    variantB: 'Individual Person',
    aPerf: 65.2,
    bPerf: 73.4,
    improvement: 12.6,
  },
];


const EngagementDashboard = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(TAB_OVERVIEW);
  const [selectedStatus, setSelectedStatus] = useState('Drafts');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const campaignTypes = [
    {
      id: 'email',
      title: 'Email Campaign',
      description: 'Reach customers via email with rich content and tracking',
      icon: <Mail className="w-8 h-8" />,
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      iconColor: 'text-indigo-600',
      route: '/campaigns/create/email'
    },
    {
      id: 'sms',
      title: 'SMS Campaign',
      description: 'Send targeted text messages for instant engagement',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'bg-amber-50 hover:bg-amber-100 border-amber-200',
      iconColor: 'text-amber-600',
      route: '/campaigns/create/sms'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Campaign',
      description: 'Connect with customers on their favorite messaging app',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      iconColor: 'text-green-600',
      route: '/campaigns/create/whatsapp'
    },
  ];

  const handleCampaignTypeSelect = async (route: string) => {
    setIsNavigating(true);
    setSelectedRoute(route);
    
    // Small delay to show loading state
    setTimeout(() => {
      setIsModalOpen(false);
      router.push(route);
      // Reset loading state after navigation
      setTimeout(() => {
        setIsNavigating(false);
        setSelectedRoute(null);
      }, 500);
    }, 100);
  };

  return (
    <div className="p-6 relative">
      {/* Global loading overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3 shadow-lg">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm text-gray-600">Loading campaign creator...</p>
          </div>
        </div>
      )}
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Campaigns Performance</h1>
          <p className="text-sm text-gray-500 mt-1">View and analyze your email campaign performance</p>
        </div>
        <div className="flex gap-2 items-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md text-sm">
                + Create Campaign
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">Choose Campaign Type</DialogTitle>
                <DialogDescription className="text-base">
                  Select the type of campaign you want to create
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {campaignTypes.map((type) => {
                  const isLoadingThis = isNavigating && selectedRoute === type.route;
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all duration-200 border-2 ${type.color} hover:shadow-lg hover:scale-105 group ${isLoadingThis ? 'opacity-50' : ''} ${isNavigating && !isLoadingThis ? 'opacity-30 pointer-events-none' : ''}`}
                      onClick={() => !isNavigating && handleCampaignTypeSelect(type.route)}
                    >
                      <CardHeader className="text-center">
                        <div className={`mx-auto p-4 rounded-full ${type.color} ${type.iconColor} group-hover:scale-110 transition-transform duration-200 relative`}>
                          {isLoadingThis ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                          ) : (
                            type.icon
                          )}
                        </div>
                        <CardTitle className="mt-4 text-lg">{type.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 text-center">
                          {isLoadingThis ? 'Loading...' : type.description}
                        </p>
                      </CardContent>
                      <CardFooter className="justify-center">
                        {isLoadingThis ? (
                          <div className="w-5 h-5" /> // Empty space to maintain layout
                        ) : (
                          <ChevronRight className={`w-5 h-5 ${type.iconColor} group-hover:translate-x-1 transition-transform duration-200`} />
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm ml-2">Last 30 days</button>
          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm">Custom</button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200 mb-4">
        <button
          className={`pb-2 font-medium ${selectedTab === TAB_OVERVIEW ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
          onClick={() => setSelectedTab(TAB_OVERVIEW)}
        >
          Overview
        </button>
        <button
          className={`pb-2 font-medium ${selectedTab === TAB_CAMPAIGN ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
          onClick={() => setSelectedTab(TAB_CAMPAIGN)}
        >
          Campaign
        </button>
        <button
          className={`pb-2 font-medium ${selectedTab === TAB_DEMOGRAPHICS ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
          onClick={() => setSelectedTab(TAB_DEMOGRAPHICS)}
        >
          Demographics
        </button>
        <button
          className={`pb-2 font-medium ${selectedTab === TAB_PERFORMANCE ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}
          onClick={() => setSelectedTab(TAB_PERFORMANCE)}
        >
          Performance
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === TAB_OVERVIEW && (
        <div>
          {/* Status Filters */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs font-medium text-gray-600 px-2 py-1">Status:</span>
            {statusFilters.map((filter) => (
              <button
                key={filter.label}
                className={`px-3 py-1 rounded-md text-xs font-medium border ${selectedStatus === filter.label || filter.highlight ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-gray-700 border-gray-200'} ${filter.highlight ? 'font-bold' : ''}`}
                onClick={() => setSelectedStatus(filter.label)}
              >
                {filter.label} <span className="ml-1">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statCards.map((card, idx) => (
              <div key={card.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">{card.label}</span>
                  <span>{card.icon}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  <span className={card.changeColor}>{card.change}</span>
                  {card.changeType === 'up' ? <ArrowUpRight size={14} className="text-green-600" /> : <ArrowDownRight size={14} className="text-red-600" />}
                </div>
              </div>
            ))}
          </div>

          {/* Campaign Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Campaign Performance</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={campaignPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Sent" fill="#6366F1" name="Sent" />
                <Bar dataKey="Opens" fill="#60A5FA" name="Opens" />
                <Bar dataKey="Clicks" fill="#6EE7B7" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Sent</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded mr-1 inline-block"></span>Opens</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-300 rounded mr-1 inline-block"></span>Clicks</div>
            </div>
          </div>

          {/* Daily Engagement Rate Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily Engagement Rate</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={dailyEngagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="engagement" stroke="#a78bfa" strokeWidth={3} dot={{ r: 6, stroke: '#a78bfa', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex justify-center mt-2 text-sm text-purple-500 font-medium">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" className="inline-block" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="6" fill="#a78bfa" /></svg>
                Engagement %
              </span>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">✨ Insights</h2>
              <button className="text-purple-600 text-sm font-medium hover:underline">Refresh</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center bg-green-50 rounded-md p-4">
                <span className="bg-green-200 text-green-700 rounded-full p-1 mr-3 flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </span>
                <div className="flex-1">
                  <div className="text-sm text-gray-800 font-medium">Thursday sends perform 24% better than Mondays</div>
                  <div className="text-green-600 text-sm font-bold">+24%</div>
                </div>
              </div>
              <div className="flex items-center bg-green-50 rounded-md p-4">
                <span className="bg-green-200 text-green-700 rounded-full p-1 mr-3 flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </span>
                <div className="flex-1">
                  <div className="text-sm text-gray-800 font-medium">Emails sent between 2-4PM generate 15% more clicks</div>
                  <div className="text-green-600 text-sm font-bold">+15%</div>
                </div>
              </div>
              <div className="flex items-center bg-green-50 rounded-md p-4">
                <span className="bg-green-200 text-green-700 rounded-full p-1 mr-3 flex items-center justify-center">
                  <ArrowUpRight size={18} />
                </span>
                <div className="flex-1">
                  <div className="text-sm text-gray-800 font-medium">Automations outperform one-time campaigns by 18% for conversion goals</div>
                  <div className="text-green-600 text-sm font-bold">+18%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Channel Performance</h2>
            <div className="flex gap-8 border-b border-gray-200 mb-4">
              <button className="pb-2 font-medium text-indigo-600 border-b-2 border-indigo-600">All Channels</button>
              <button className="pb-2 font-medium text-gray-500 hover:text-indigo-600">Email</button>
              <button className="pb-2 font-medium text-gray-500 hover:text-indigo-600">WhatsApp</button>
              <button className="pb-2 font-medium text-gray-500 hover:text-indigo-600">SMS</button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={channelPerformanceData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={({ active, payload, label }) => active && payload ? (
                  <div className="bg-white rounded shadow p-2 text-xs">
                    <div className="font-semibold mb-1">{label}</div>
                    <div className="text-indigo-600">Email : {payload[0]?.value}</div>
                    <div className="text-green-600">WhatsApp : {payload[1]?.value}</div>
                    <div className="text-orange-600">SMS : {payload[2]?.value}</div>
                  </div>
                ) : null} />
                <Bar dataKey="Email" fill="#6366F1" name="Email" />
                <Bar dataKey="WhatsApp" fill="#4ADE80" name="WhatsApp" />
                <Bar dataKey="SMS" fill="#FB923C" name="SMS" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Email</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>WhatsApp</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>SMS</div>
            </div>
            <div className="flex gap-4 mt-6">
              {channelSummary.map((c) => (
                <div key={c.label} className={`flex-1 flex items-center gap-3 rounded-lg border p-4 ${c.color} ${c.border}`}>
                  <span>{c.icon}</span>
                  <span className="font-medium text-lg">{c.label}</span>
                  <span className="ml-auto font-bold text-2xl">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comparative Analysis */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Comparative Analysis</h2>
              <select className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700">
                <option>Campaigns vs Automations</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={comparativeData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Campaigns" fill="#6366F1" name="Campaigns" />
                <Bar dataKey="Automations" fill="#4ADE80" name="Automations" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-8 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Campaigns</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Automations</div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mt-6">
              <div className="font-semibold text-gray-700 mb-1 text-sm">Key Insight</div>
              <div className="text-xs text-gray-600">Automations show 51% higher conversion rates than one-time campaigns, suggesting that triggered messages based on user behavior are more effective for driving actions.</div>
            </div>
          </div>

          {/* Campaign Goals */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Donut Chart */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/3">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" stroke="#E5E7EB" strokeWidth="12" fill="none" />
                  <circle cx="60" cy="60" r="54" stroke="#EC4899" strokeWidth="12" fill="none" strokeDasharray={339.292} strokeDashoffset={339.292 * (1 - campaignGoal.percent / 100)} strokeLinecap="round" />
                  <text x="60" y="58" textAnchor="middle" fontSize="2em" fontWeight="bold" fill="#111827">{campaignGoal.percent}%</text>
                  <text x="60" y="76" textAnchor="middle" fontSize="1em" fill="#6B7280">of target</text>
                </svg>
                <div className="mt-2 text-xs text-gray-500">Target: <span className="font-semibold text-gray-700">{campaignGoal.target.toLocaleString()}</span></div>
                <div className="text-xs text-gray-500">Current: <span className="font-semibold text-gray-700">{campaignGoal.current.toLocaleString()}</span></div>
              </div>
              {/* Conversion Funnel */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">Conversion Funnel</h3>
                  <select className="border border-gray-200 rounded-md px-2 py-1 text-sm text-gray-700">
                    <option>Conversion</option>
                  </select>
                </div>
                <div className="space-y-2">
                  {campaignGoal.funnel.map((step, idx) => (
                    <div key={step.label} className="mb-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 font-medium">{step.label}</span>
                        <span className="text-xs text-gray-500 font-semibold">{step.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full mt-1 mb-1 relative">
                        <div className={`${step.color} h-3 rounded-full`} style={{ width: `${step.percent}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        {step.drop !== null ? <span>Drop: {step.drop}%</span> : <span></span>}
                        {step.continue !== null ? <span>{step.continue}% continue</span> : <span></span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-8 mt-4 text-xs">
                  <div>Cost per conversion<br /><span className="font-bold text-gray-800 text-base">${campaignGoal.costPerConversion.toFixed(2)}</span></div>
                  <div>Total ROI<br /><span className="font-bold text-green-600 text-base">+{campaignGoal.roi}%</span></div>
                  <div>Revenue attributed<br /><span className="font-bold text-gray-800 text-base">${campaignGoal.revenue.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Campaigns</h2>
              <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b">
                    <th className="py-2 px-2 text-left font-semibold">CAMPAIGN</th>
                    <th className="py-2 px-2 text-left font-semibold">TYPE</th>
                    <th className="py-2 px-2 text-left font-semibold">STATUS</th>
                    <th className="py-2 px-2 text-right font-semibold">SENT</th>
                    <th className="py-2 px-2 text-right font-semibold">OPEN RATE</th>
                    <th className="py-2 px-2 text-right font-semibold">CLICK RATE</th>
                    <th className="py-2 px-2 text-right font-semibold">DATE</th>
                    <th className="py-2 px-2 text-right font-semibold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((c, idx) => (
                    <tr key={c.name} className="border-b last:border-0">
                      <td className="py-2 px-2 font-medium text-gray-900">{c.name}</td>
                      <td className="py-2 px-2 text-gray-700">{c.type}</td>
                      <td className="py-2 px-2">
                        {c.status === 'Active' && <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Active</span>}
                        {c.status === 'Scheduled' && <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>Scheduled</span>}
                      </td>
                      <td className="py-2 px-2 text-right text-gray-900">{c.sent.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-2 bg-green-400 rounded-full" style={{ width: `${c.open}%` }}></div>
                          </div>
                          <span className="text-gray-700 font-medium">{c.open}%</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-2 bg-indigo-400 rounded-full" style={{ width: `${c.click}%` }}></div>
                          </div>
                          <span className="text-gray-700 font-medium">{c.click}%</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right text-gray-700">{c.date}</td>
                      <td className="py-2 px-2 text-right">
                        <a href="#" className="text-indigo-600 hover:underline font-medium">Edit</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {selectedTab === TAB_CAMPAIGN && (
        <div>
          {/* 1. Card container (4 cards in a single row) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {engagementCards.map((card, idx) => (
              <div key={card.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-500 font-medium">{card.label}</span>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                  {card.unit && <span className="text-xs text-gray-500 mb-1">{card.unit}</span>}
                </div>
                {card.change && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className={card.changeType === 'up' ? 'text-green-600' : 'text-red-600'}>{card.changeType === 'down' ? '↓ ' : '↑ '}{card.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 2. Two-column row: Engagement by Time of Day & Device Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Engagement by Time of Day */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Engagement by Time of Day</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={timeOfDayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={({ active, payload, label }) => active && payload ? (
                    <div className="bg-white rounded shadow p-2 text-xs">
                      <div className="font-semibold mb-1">{label}</div>
                      <div className="text-indigo-600">Open Rate % : {payload[0]?.value}</div>
                      <div className="text-green-600">Click Rate % : {payload[1]?.value}</div>
                    </div>
                  ) : null} />
                  <Bar dataKey="open" fill="#6366F1" name="Open Rate %" />
                  <Bar dataKey="click" fill="#4ADE80" name="Click Rate %" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-6 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Open Rate %</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Click Rate %</div>
              </div>
              <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
                <span className="font-semibold">Pro Tip:</span> Sending emails between 3–6pm shows the highest engagement, with an 82% open rate and 51% click rate.
              </div>
            </div>
            {/* Device Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Device Breakdown</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={false}>
                    {deviceData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Mobile: 64%</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Desktop: 28%</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>Tablet: 8%</div>
              </div>
              <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
                <span className="font-semibold">Insight:</span> Mobile opens represent 64% of all engagement. Optimize your templates for mobile-first experiences.
              </div>
            </div>
          </div>

          {/* Content Type Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Type Performance</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={contentTypeData} layout="vertical" barGap={8} margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="type" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="open" fill="#6366F1" name="Open Rate %" barSize={10} />
                <Bar dataKey="click" fill="#4ADE80" name="Click Rate %" barSize={10} />
                <Bar dataKey="conversion" fill="#FB923C" name="Conversion Rate %" barSize={10} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-8 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Open Rate %</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Click Rate %</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>Conversion Rate %</div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="bg-indigo-50 rounded-md p-3 flex-1 text-xs text-indigo-900">
                <span className="font-semibold">Highest Open Rate</span><br />Educational content has the highest open rate at 81%
              </div>
              <div className="bg-green-50 rounded-md p-3 flex-1 text-xs text-green-900">
                <span className="font-semibold">Highest Conversion</span><br />Product Updates drive the best conversion rate at 21%
              </div>
            </div>
          </div>

          {/* Engagement by Content Length */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Engagement by Content Length</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={contentLengthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="length" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => active && payload ? (
                  <div className="bg-white rounded shadow p-2 text-xs">
                    <div className="font-semibold mb-1">{label}</div>
                    <div className="text-indigo-600">Open Rate % : {payload[0]?.value}</div>
                    <div className="text-green-600">Click Rate % : {payload[1]?.value}</div>
                    <div className="text-orange-600">Avg Read Time (sec) : {payload[2]?.value}</div>
                  </div>
                ) : null} />
                <Line type="monotone" dataKey="open" stroke="#6366F1" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#6366F1', strokeWidth: 2 }} name="Open Rate %" />
                <Line type="monotone" dataKey="click" stroke="#4ADE80" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#4ADE80', strokeWidth: 2 }} name="Click Rate %" />
                <Line type="monotone" dataKey="read" stroke="#FB923C" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#FB923C', strokeWidth: 2 }} name="Avg Read Time (sec)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-8 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Open Rate %</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Click Rate %</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>Avg Read Time (sec)</div>
            </div>
            <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
              <span className="font-semibold">Optimization Tip:</span> Medium-length emails (300–600 chars) achieve the best balance between engagement and read time, with 72% opens and 45% clicks.
            </div>
          </div>
        </div>
      )}
      {selectedTab === TAB_DEMOGRAPHICS && (
        <div>
          {/* 1. Card container (4 cards in a single row) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {demographicsCards.map((card, idx) => (
              <div key={card.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-500 font-medium">{card.label}</span>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                  {card.unit && <span className="text-xs text-gray-500 mb-1">{card.unit}</span>}
                  {card.percent && <span className="text-xs text-gray-500 mb-1">{card.percent}</span>}
                </div>
                {card.change && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className={card.changeType === 'up' ? 'text-green-600' : 'text-red-600'}>{card.change}</span>
                    {card.changeType === 'up' ? <ArrowUpRight size={14} className="text-green-600" /> : <ArrowDownRight size={14} className="text-red-600" />}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 2. Two-column row: Age Distribution & Gender Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Age Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Age Distribution</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={ageDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
              <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
                <span className="font-semibold">Key Segment:</span> The 25–34 age group represents your largest audience segment at 32%, followed closely by 35–44 at 28%.
              </div>
            </div>
            {/* Gender Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Gender Distribution</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={false}>
                    {genderData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Male: 43%</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Female: 54%</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>Non-binary: 3%</div>
              </div>
            </div>
          </div>

          {/* Location Distribution & Audience Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Location Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Distribution</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Audience Interests */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Audience Interests</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={interestData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="interest" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4ADE80" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
              <div className="bg-green-50 rounded-md p-3 mt-4 text-xs text-green-900">
                <span className="font-semibold">Content Strategy:</span> Focus on technology (68%) and business (54%) topics to align with your audience's primary interests.
              </div>
            </div>
          </div>

          {/* Subscriber Growth */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Subscriber Growth</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={subscriberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="subscribers" fill="#6366F1" name="Total Subscribers" barSize={40} />
                <Bar yAxisId="right" dataKey="unsubscribes" fill="#F87171" name="Unsubscribes" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-8 mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1"><span className="w-4 h-4 bg-indigo-500 rounded mr-1 inline-block"></span>Total Subscribers</div>
              <div className="flex items-center gap-1"><span className="w-4 h-4 bg-red-400 rounded mr-1 inline-block"></span>Unsubscribes</div>
            </div>
            <div className="bg-indigo-50 rounded-md p-3 mt-4 text-sm text-indigo-900">
              <span className="font-semibold">Growth Insight:</span> Your subscriber base has grown by 33% since January, with a consistent month-over-month growth rate of 5–8%.
            </div>
          </div>
        </div>
      )}
      {selectedTab === TAB_PERFORMANCE && (
        <div>
          {/* 1. Card container (4 cards in a single row) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {performanceCards.map((card, idx) => (
              <div key={card.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
                <span className="text-sm text-gray-500 font-medium">{card.label}</span>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                </div>
                {card.change && (
                  <div className="flex items-center gap-1 text-xs">
                    <span className={card.changeType === 'up' ? 'text-green-600' : 'text-red-600'}>{card.changeType === 'down' ? '↓ ' : '↑ '}{card.change}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 2. Campaign ROI Analysis Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Campaign ROI Analysis</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b">
                    <th className="py-2 px-2 text-left font-semibold">CAMPAIGN</th>
                    <th className="py-2 px-2 text-right font-semibold">COST</th>
                    <th className="py-2 px-2 text-right font-semibold">REVENUE</th>
                    <th className="py-2 px-2 text-right font-semibold">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {roiTable.map((row, idx) => (
                    <tr key={row.campaign} className="border-b last:border-0">
                      <td className="py-2 px-2 font-medium text-gray-900">{row.campaign}</td>
                      <td className="py-2 px-2 text-right text-gray-900">${row.cost.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-gray-900">${row.revenue.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-2 bg-green-400 rounded-full" style={{ width: `${Math.min(row.roi, 100)}%` }}></div>
                          </div>
                          <span className="text-green-600 font-bold">{row.roi}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conversion Funnel & Performance by Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Conversion Funnel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Conversion Funnel</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 20, left: 100, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
              <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
                <span className="font-semibold">Funnel Analysis:</span> The biggest drop-off occurs between Link Clicked (28%) and Added to Cart (5.6%). Consider optimizing product pages to improve this conversion.
              </div>
            </div>
            {/* Performance by Segment */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Performance by Segment</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={segmentData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="segment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="open" fill="#6366F1" name="Open Rate %" barSize={20} />
                  <Bar dataKey="click" fill="#4ADE80" name="Click Rate %" barSize={20} />
                  <Bar dataKey="conversion" fill="#FB923C" name="Conversion %" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-8 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-indigo-500 rounded mr-1 inline-block"></span>Open Rate %</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded mr-1 inline-block"></span>Click Rate %</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded mr-1 inline-block"></span>Conversion %</div>
              </div>
              <div className="bg-indigo-50 rounded-md p-3 mt-4 text-xs text-indigo-900">
                <span className="font-semibold">Segment Insight:</span> New subscribers show the highest open rates (82%), while engaged 3-month subscribers have the best conversion rate (18%).
              </div>
            </div>
          </div>

          {/* A/B Test Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">A/B Test Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b">
                    <th className="py-2 px-2 text-left font-semibold">TEST ELEMENT</th>
                    <th className="py-2 px-2 text-left font-semibold">VARIANT A</th>
                    <th className="py-2 px-2 text-left font-semibold">VARIANT B</th>
                    <th className="py-2 px-2 text-right font-semibold">A PERFORMANCE</th>
                    <th className="py-2 px-2 text-right font-semibold">B PERFORMANCE</th>
                    <th className="py-2 px-2 text-right font-semibold">IMPROVEMENT</th>
                  </tr>
                </thead>
                <tbody>
                  {abTestResults.map((row, idx) => (
                    <tr key={row.element} className="border-b last:border-0">
                      <td className="py-2 px-2 font-medium text-gray-900">{row.element}</td>
                      <td className="py-2 px-2 text-gray-700">{row.variantA}</td>
                      <td className="py-2 px-2 text-gray-700">{row.variantB}</td>
                      <td className="py-2 px-2 text-right text-gray-900">{row.aPerf}%</td>
                      <td className="py-2 px-2 text-right text-gray-900">{row.bPerf}%</td>
                      <td className="py-2 px-2 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.improvement > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {row.improvement > 0 ? '+' : ''}{row.improvement}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-indigo-50 rounded-md p-3 mt-4 text-sm text-indigo-900">
              <span className="font-semibold">Test Insight:</span> Using individual sender names instead of company names provides the biggest improvement (+12.6%) in open rates.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EngagementPage() {
  return (
    <StaticExportLayout>
      <EngagementDashboard />
    </StaticExportLayout>
  );
} 