"use client";

import React, { useState, useMemo } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { projectsList } from "@/lib/data/projectsData";
import {
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Activity,
  Mail,
  MessageSquare,
  Globe,
  Calendar,
  Award
} from "lucide-react";

export default function InvestorCampaignsPage() {
  const [selectedProject, setSelectedProject] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');

  // Campaign List Data
  const campaignsList = [
    {
      id: 'CAM-001',
      name: 'Q4 Customer Acquisition Drive',
      status: 'active',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      segment: 'High-Value Prospects',
      customerCount: 12450,
      targetAudience: 25000,
      channel: 'Multi-Channel',
      budget: 125000,
      spent: 87500,
      revenue: 342000,
      conversions: 1245,
      project: 'CDP-001'
    },
    {
      id: 'CAM-002', 
      name: 'Premium Upsell Campaign',
      status: 'active',
      startDate: '2024-11-15',
      endDate: '2024-12-15',
      segment: 'Existing Premium',
      customerCount: 3200,
      targetAudience: 8500,
      channel: 'Email + In-App',
      budget: 45000,
      spent: 28900,
      revenue: 156000,
      conversions: 520,
      project: 'BANK-001'
    },
    {
      id: 'CAM-003',
      name: 'Holiday Retention Boost',
      status: 'completed',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      segment: 'At-Risk Customers',
      customerCount: 8900,
      targetAudience: 15000,
      channel: 'SMS + Push',
      budget: 65000,
      spent: 63200,
      revenue: 198000,
      conversions: 890,
      project: 'ECOM-001'
    },
    {
      id: 'CAM-004',
      name: 'New User Onboarding',
      status: 'active',
      startDate: '2024-10-15',
      endDate: '2025-01-15',
      segment: 'New Signups',
      customerCount: 5600,
      targetAudience: 12000,
      channel: 'Email Series',
      budget: 35000,
      spent: 22100,
      revenue: 89000,
      conversions: 672,
      project: 'UNIV-001'
    },
    {
      id: 'CAM-005',
      name: 'Enterprise Expansion',
      status: 'planning',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      segment: 'Enterprise Leads',
      customerCount: 450,
      targetAudience: 1200,
      channel: 'Direct Sales',
      budget: 180000,
      spent: 0,
      revenue: 0,
      conversions: 0,
      project: 'CDP-001'
    }
  ];

  // Filter campaigns based on selected project
  const filteredCampaigns = useMemo(() => {
    if (selectedProject === 'all') return campaignsList;
    return campaignsList.filter(campaign => campaign.project === selectedProject);
  }, [selectedProject]);

  // Campaign Performance Metrics
  const performanceMetrics = useMemo(() => {
    const campaigns = filteredCampaigns;
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalReach = campaigns.reduce((sum, c) => sum + c.customerCount, 0);
    
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalBudget,
      totalSpent,
      budgetUtilization: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
      totalRevenue,
      roi: totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0,
      totalConversions,
      avgConversionRate: totalReach > 0 ? (totalConversions / totalReach) * 100 : 0,
      revenuePerCampaign: campaigns.length > 0 ? totalRevenue / campaigns.length : 0,
      cac: totalConversions > 0 ? totalSpent / totalConversions : 0
    };
  }, [filteredCampaigns]);

  // Monthly Campaign Performance Trend
  const campaignTrend = [
    { month: 'Jul', spend: 45000, revenue: 125000, conversions: 420, roi: 177 },
    { month: 'Aug', spend: 52000, revenue: 148000, conversions: 485, roi: 184 },
    { month: 'Sep', spend: 48000, revenue: 156000, conversions: 520, roi: 225 },
    { month: 'Oct', spend: 67000, revenue: 189000, conversions: 645, roi: 182 },
    { month: 'Nov', spend: 79000, revenue: 234000, conversions: 756, roi: 196 },
    { month: 'Dec', spend: 85000, revenue: 285000, conversions: 892, roi: 235 }
  ];

  // Channel Performance Data
  const channelPerformance = [
    { channel: 'Email Marketing', spend: 35000, revenue: 145000, conversions: 1250, roi: 314 },
    { channel: 'Paid Social', spend: 48000, revenue: 156000, conversions: 890, roi: 225 },
    { channel: 'Direct Sales', spend: 65000, revenue: 285000, conversions: 145, roi: 338 },
    { channel: 'Content Marketing', spend: 25000, revenue: 89000, conversions: 420, roi: 256 },
    { channel: 'SMS/Push', spend: 18000, revenue: 67000, conversions: 380, roi: 272 }
  ];

  // Customer Segment Performance
  const segmentPerformance = [
    { segment: 'High-Value Prospects', campaigns: 3, spend: 95000, revenue: 456000, customers: 12450 },
    { segment: 'Existing Premium', campaigns: 2, spend: 48000, revenue: 234000, customers: 3200 },
    { segment: 'At-Risk Customers', campaigns: 2, spend: 67000, revenue: 198000, customers: 8900 },
    { segment: 'New Signups', campaigns: 1, spend: 22000, revenue: 89000, customers: 5600 },
    { segment: 'Enterprise Leads', campaigns: 1, spend: 45000, revenue: 285000, customers: 450 }
  ];

  // Campaign ROI Distribution
  const roiDistribution = [
    { range: '0-100%', campaigns: 1, color: '#EF4444' },
    { range: '100-200%', campaigns: 2, color: '#F59E0B' },
    { range: '200-300%', campaigns: 3, color: '#10B981' },
    { range: '300%+', campaigns: 2, color: '#059669' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      completed: { color: "bg-blue-100 text-blue-800", text: "Completed" },
      planning: { color: "bg-yellow-100 text-yellow-800", text: "Planning" },
      paused: { color: "bg-gray-100 text-gray-800", text: "Paused" }
    };
    const config = statusConfig[status] || statusConfig.planning;
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <StaticExportLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MarTech Performance Intelligence</h1>
            <p className="text-gray-500 mt-1">Data-driven campaign optimization with predictive insights and automated reporting</p>
          </div>
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectsList.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-blue-500" />
                <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                  {performanceMetrics.activeCampaigns} Active
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics.totalCampaigns}</p>
                <p className="text-sm text-gray-500 mt-1">Across all projects</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-500" />
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  {formatPercentage(performanceMetrics.roi)} ROI
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(performanceMetrics.totalRevenue)}</p>
                <p className="text-sm text-gray-500 mt-1">From {formatCurrency(performanceMetrics.totalSpent)} spend</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-purple-500" />
                <Badge variant="secondary" className="text-purple-700 bg-purple-50">
                  {formatPercentage(performanceMetrics.avgConversionRate)} CVR
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">{performanceMetrics.totalConversions.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">CAC: {formatCurrency(performanceMetrics.cac)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-orange-500" />
                <Badge variant="secondary" className="text-orange-700 bg-orange-50">
                  {formatPercentage(performanceMetrics.budgetUtilization)} Used
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(performanceMetrics.totalBudget)}</p>
                <p className="text-sm text-gray-500 mt-1">Avg per campaign: {formatCurrency(performanceMetrics.revenuePerCampaign)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Campaign List & Performance
            </CardTitle>
            <p className="text-sm text-gray-500">Detailed campaign metrics with ROI and customer engagement</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr className="text-left">
                    <th className="p-4 font-medium text-gray-900">Campaign</th>
                    <th className="p-4 font-medium text-gray-900">Timeline</th>
                    <th className="p-4 font-medium text-gray-900">Segment</th>
                    <th className="p-4 font-medium text-gray-900">Reach/Conversions</th>
                    <th className="p-4 font-medium text-gray-900">Budget/Spend</th>
                    <th className="p-4 font-medium text-gray-900">Revenue</th>
                    <th className="p-4 font-medium text-gray-900">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => {
                    const roi = campaign.spent > 0 ? ((campaign.revenue - campaign.spent) / campaign.spent) * 100 : 0;
                    const conversionRate = campaign.customerCount > 0 ? (campaign.conversions / campaign.customerCount) * 100 : 0;
                    
                    return (
                      <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-gray-900">{campaign.name}</div>
                            <div className="text-sm text-gray-600">{campaign.id}</div>
                            <div className="mt-1">{getStatusBadge(campaign.status)}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1 mb-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="text-gray-600">
                              to {new Date(campaign.endDate).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {Math.ceil((new Date(campaign.endDate) - new Date(campaign.startDate)) / (1000 * 60 * 60 * 24))} days
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <Badge variant="outline" className="mb-1">{campaign.segment}</Badge>
                            <div className="text-sm text-gray-600">{campaign.channel}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="font-medium">{campaign.customerCount.toLocaleString()} reached</div>
                            <div className="text-green-600">{campaign.conversions.toLocaleString()} conversions</div>
                            <div className="text-xs text-gray-500">{conversionRate.toFixed(1)}% conversion rate</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="font-medium">{formatCurrency(campaign.budget)} budget</div>
                            <div className="text-orange-600">{formatCurrency(campaign.spent)} spent</div>
                            <div className="text-xs text-gray-500">
                              {campaign.budget > 0 ? ((campaign.spent / campaign.budget) * 100).toFixed(1) : 0}% utilization
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-green-600">{formatCurrency(campaign.revenue)}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary" className={
                            roi >= 200 ? 'bg-green-50 text-green-700' :
                            roi >= 100 ? 'bg-blue-50 text-blue-700' :
                            roi >= 0 ? 'bg-yellow-50 text-yellow-700' :
                            'bg-red-50 text-red-700'
                          }>
                            {roi.toFixed(0)}%
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Campaign Trend */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Campaign Performance Trend</CardTitle>
              <p className="text-sm text-gray-500">Monthly spend, revenue, and ROI progression</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={campaignTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'roi' ? `${value}%` : formatCurrency(value),
                      name === 'spend' ? 'Spend' : name === 'revenue' ? 'Revenue' : 'ROI'
                    ]}
                    contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#D1FAE5" name="revenue" />
                  <Area type="monotone" dataKey="spend" stroke="#EF4444" fill="#FEE2E2" name="spend" />
                  <Line type="monotone" dataKey="roi" stroke="#8B5CF6" strokeWidth={3} name="roi" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <p className="text-sm text-gray-500">ROI and conversion metrics by channel</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelPerformance.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{channel.channel}</span>
                        <Badge variant="secondary" className={
                          channel.roi >= 300 ? 'bg-green-50 text-green-700' :
                          channel.roi >= 200 ? 'bg-blue-50 text-blue-700' :
                          'bg-yellow-50 text-yellow-700'
                        }>
                          {channel.roi}% ROI
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>Spend: {formatCurrency(channel.spend)}</div>
                        <div>Revenue: {formatCurrency(channel.revenue)}</div>
                        <div>Conversions: {channel.conversions}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Segment Performance & ROI Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Segment Performance */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Customer Segment Performance</CardTitle>
              <p className="text-sm text-gray-500">Campaign effectiveness by customer segment</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentPerformance.map((segment, index) => {
                  const roi = segment.spend > 0 ? ((segment.revenue - segment.spend) / segment.spend) * 100 : 0;
                  const revenuePerCustomer = segment.customers > 0 ? segment.revenue / segment.customers : 0;
                  
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                        <Badge variant="outline">{segment.campaigns} campaigns</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Total Customers</div>
                          <div className="font-semibold">{segment.customers.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Revenue/Customer</div>
                          <div className="font-semibold text-green-600">{formatCurrency(revenuePerCustomer)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Spend</div>
                          <div className="font-semibold text-red-600">{formatCurrency(segment.spend)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Segment ROI</div>
                          <div className="font-semibold text-purple-600">{roi.toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Investor Insights & Market Intelligence */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Investor Insights & Market Intelligence</CardTitle>
              <p className="text-sm text-gray-500">Strategic metrics for investment decision-making</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Key Investment Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Financial Efficiency
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-gray-700">Revenue Multiplier</span>
                        <span className="font-bold text-green-700">{(performanceMetrics.totalRevenue / Math.max(performanceMetrics.totalSpent, 1)).toFixed(1)}x</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-gray-700">Capital Efficiency</span>
                        <span className="font-bold text-blue-700">{formatCurrency(performanceMetrics.totalRevenue / Math.max(filteredCampaigns.length, 1))}/campaign</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm text-gray-700">Payback Period</span>
                        <span className="font-bold text-purple-700">
                          {performanceMetrics.totalRevenue > 0 ? Math.ceil((performanceMetrics.totalSpent / (performanceMetrics.totalRevenue / 6)) * 30) : 0} days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      Growth Indicators
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="text-sm text-gray-700">Market Penetration</span>
                        <span className="font-bold text-orange-700">
                          {((performanceMetrics.totalConversions / Math.max(filteredCampaigns.reduce((sum, c) => sum + c.targetAudience, 0), 1)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
                        <span className="text-sm text-gray-700">Customer Velocity</span>
                        <span className="font-bold text-teal-700">{Math.ceil(performanceMetrics.totalConversions / 6)} customers/month</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                        <span className="text-sm text-gray-700">Scalability Score</span>
                        <Badge className={
                          performanceMetrics.roi >= 200 ? 'bg-green-100 text-green-800' :
                          performanceMetrics.roi >= 150 ? 'bg-blue-100 text-blue-800' :
                          performanceMetrics.roi >= 100 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {performanceMetrics.roi >= 200 ? 'Excellent' :
                           performanceMetrics.roi >= 150 ? 'Strong' :
                           performanceMetrics.roi >= 100 ? 'Moderate' : 'Needs Attention'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Position & Competitive Advantage */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-600" />
                    Market Position & Investment Thesis
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-sm">Revenue Quality</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Predictable, scalable revenue streams</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Quality Score:</span>
                        <Badge variant="secondary" className="bg-green-50 text-green-700">
                          {performanceMetrics.avgConversionRate >= 8 ? 'High' : performanceMetrics.avgConversionRate >= 5 ? 'Medium' : 'Low'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">Market Traction</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Customer acquisition momentum</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Traction Level:</span>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                          {performanceMetrics.totalConversions >= 2000 ? 'Strong' : performanceMetrics.totalConversions >= 1000 ? 'Growing' : 'Early'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-sm">Execution Excellence</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">Operational efficiency & scale</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Efficiency:</span>
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700">
                          {performanceMetrics.budgetUtilization <= 80 && performanceMetrics.roi >= 150 ? 'Excellent' : 
                           performanceMetrics.budgetUtilization <= 90 && performanceMetrics.roi >= 100 ? 'Good' : 'Improving'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment Signals */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-600" />
                    Investment Decision Signals
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Follow-on Investment Readiness</span>
                        <Badge className={
                          performanceMetrics.roi >= 200 && performanceMetrics.totalConversions >= 1500 ? 'bg-green-100 text-green-800' :
                          performanceMetrics.roi >= 150 && performanceMetrics.totalConversions >= 1000 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {performanceMetrics.roi >= 200 && performanceMetrics.totalConversions >= 1500 ? 'Ready' :
                           performanceMetrics.roi >= 150 && performanceMetrics.totalConversions >= 1000 ? 'Monitor' : 'Not Ready'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Exit Potential</span>
                        <Badge className={
                          performanceMetrics.totalRevenue >= 800000 ? 'bg-green-100 text-green-800' :
                          performanceMetrics.totalRevenue >= 500000 ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }>
                          {performanceMetrics.totalRevenue >= 800000 ? 'High' :
                           performanceMetrics.totalRevenue >= 500000 ? 'Medium' : 'Early'}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Risk Assessment</span>
                        <Badge className={
                          performanceMetrics.roi >= 150 && performanceMetrics.budgetUtilization <= 85 ? 'bg-green-100 text-green-800' :
                          performanceMetrics.roi >= 100 && performanceMetrics.budgetUtilization <= 95 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {performanceMetrics.roi >= 150 && performanceMetrics.budgetUtilization <= 85 ? 'Low Risk' :
                           performanceMetrics.roi >= 100 && performanceMetrics.budgetUtilization <= 95 ? 'Medium Risk' : 'High Risk'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">Strategic Value</span>
                        <Badge className="bg-purple-100 text-purple-800">
                          {performanceMetrics.totalCampaigns >= 4 ? 'Portfolio Core' : 'Growth Asset'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Campaign Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Financial Performance</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Campaign Investment</span>
                  <span className="font-semibold">{formatCurrency(performanceMetrics.totalSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Generated</span>
                  <span className="font-semibold">{formatCurrency(performanceMetrics.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Profit</span>
                  <span className="font-semibold text-green-600">{formatCurrency(performanceMetrics.totalRevenue - performanceMetrics.totalSpent)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Efficiency Metrics</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Portfolio ROI</span>
                  <span className="font-semibold text-blue-600">{formatPercentage(performanceMetrics.roi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Acquisition Cost</span>
                  <span className="font-semibold">{formatCurrency(performanceMetrics.cac)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold text-purple-600">{formatPercentage(performanceMetrics.avgConversionRate)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Growth Indicators</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Campaign Effectiveness</span>
                  <Badge className="bg-green-100 text-green-800">Strong</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget Optimization</span>
                  <Badge className="bg-blue-100 text-blue-800">Efficient</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Position</span>
                  <Badge className="bg-purple-100 text-purple-800">Competitive</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaticExportLayout>
  );
}