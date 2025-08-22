"use client";

import React, { useState, useMemo } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, AreaChart, Area } from 'recharts';
import { projectsList } from "@/lib/data/projectsData";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Eye,
  UserCheck,
  CreditCard,
  Clock,
  Zap,
  ArrowRight,
  ArrowDown,
  AlertCircle,
  CheckCircle,
  BarChart3
} from "lucide-react";

export default function InvestorFunnelAnalyticsPage() {
  const [selectedProject, setSelectedProject] = useState('all');
  const [timeRange, setTimeRange] = useState('6m');

  // Funnel Summary Data
  const funnelSummary = useMemo(() => {
    return {
      totalVisitors: 24680,
      leads: 2468,
      qualifiedLeads: 741,
      opportunities: 185,
      customers: 52,
      overallConversionRate: 0.21,
      totalRevenue: 156000,
      avgDealSize: 3000
    };
  }, [selectedProject]);

  // TOFU (Top of Funnel) Analytics
  const tofuAnalytics = {
    visitors: 24680,
    leads: 2468,
    conversionRate: 10.0,
    cac: 75,
    timeToConvert: 2.5,
    channels: [
      { name: 'Organic Search', visitors: 9872, leads: 1235, cac: 45, roi: 4.2 },
      { name: 'Paid Social', visitors: 6804, leads: 612, cac: 125, roi: 2.8 },
      { name: 'Content Marketing', visitors: 4938, leads: 444, cac: 65, roi: 3.6 },
      { name: 'Email Marketing', visitors: 2066, leads: 177, cac: 55, roi: 4.8 }
    ],
    monthlyTrend: [
      { month: 'Jan', visitors: 3890, leads: 389, conversion: 10.0 },
      { month: 'Feb', visitors: 4120, leads: 453, conversion: 11.0 },
      { month: 'Mar', visitors: 4350, leads: 435, conversion: 10.0 },
      { month: 'Apr', visitors: 4180, leads: 460, conversion: 11.0 },
      { month: 'May', visitors: 4070, leads: 366, conversion: 9.0 },
      { month: 'Jun', visitors: 4070, leads: 365, conversion: 9.0 }
    ]
  };

  // MOFU (Middle of Funnel) Analytics
  const mofuAnalytics = {
    leads: 2468,
    qualifiedLeads: 741,
    conversionRate: 30.0,
    cac: 185,
    timeToConvert: 14.5,
    leadSources: [
      { source: 'Website Forms', leads: 987, qualified: 346, rate: 35.1 },
      { source: 'Demo Requests', leads: 642, qualified: 231, rate: 36.0 },
      { source: 'Content Downloads', leads: 493, qualified: 118, rate: 23.9 },
      { source: 'Webinar Signups', leads: 346, qualified: 46, rate: 13.3 }
    ],
    nurturingPerformance: [
      { stage: 'Lead Created', count: 2468, retention: 100 },
      { stage: 'Email Engaged', count: 1975, retention: 80 },
      { stage: 'Content Consumed', count: 1482, retention: 60 },
      { stage: 'Demo Scheduled', count: 988, retention: 40 },
      { stage: 'Qualified', count: 741, retention: 30 }
    ],
    monthlyTrend: [
      { month: 'Jan', leads: 389, qualified: 117, conversion: 30.1 },
      { month: 'Feb', leads: 453, qualified: 136, conversion: 30.0 },
      { month: 'Mar', leads: 435, qualified: 131, conversion: 30.1 },
      { month: 'Apr', leads: 460, qualified: 138, conversion: 30.0 },
      { month: 'May', leads: 366, qualified: 110, conversion: 30.1 },
      { month: 'Jun', leads: 365, qualified: 109, conversion: 29.9 }
    ]
  };

  // BOFU (Bottom of Funnel) Analytics
  const bofuAnalytics = {
    qualifiedLeads: 741,
    opportunities: 185,
    customers: 52,
    conversionRate: 25.0,
    cac: 450,
    timeToConvert: 35.5,
    avgDealSize: 3000,
    salesCycleStages: [
      { stage: 'Qualified Lead', count: 741, retention: 100, avgTime: 0 },
      { stage: 'Initial Meeting', count: 519, retention: 70, avgTime: 7 },
      { stage: 'Proposal Sent', count: 296, retention: 40, avgTime: 21 },
      { stage: 'Negotiation', count: 185, retention: 25, avgTime: 35 },
      { stage: 'Closed Won', count: 52, retention: 7, avgTime: 45 }
    ],
    dealSizeDistribution: [
      { range: '$1K-$2K', deals: 18, revenue: 27000 },
      { range: '$2K-$5K', deals: 21, revenue: 73500 },
      { range: '$5K-$10K', deals: 9, revenue: 67500 },
      { range: '$10K+', deals: 4, revenue: 48000 }
    ],
    monthlyTrend: [
      { month: 'Jan', qualified: 117, opportunities: 29, customers: 8, revenue: 24000 },
      { month: 'Feb', qualified: 136, opportunities: 34, customers: 9, revenue: 27000 },
      { month: 'Mar', qualified: 131, opportunities: 33, customers: 8, revenue: 24000 },
      { month: 'Apr', qualified: 138, opportunities: 35, customers: 10, revenue: 30000 },
      { month: 'May', qualified: 110, opportunities: 28, customers: 8, revenue: 24000 },
      { month: 'Jun', qualified: 109, opportunities: 26, customers: 9, revenue: 27000 }
    ]
  };

  // Overall Funnel Data for visualization
  const overallFunnel = [
    { stage: 'Visitors', count: funnelSummary.totalVisitors, percentage: 100, fill: '#3B82F6' },
    { stage: 'Leads', count: funnelSummary.leads, percentage: (funnelSummary.leads / funnelSummary.totalVisitors * 100).toFixed(1), fill: '#10B981' },
    { stage: 'Qualified', count: funnelSummary.qualifiedLeads, percentage: (funnelSummary.qualifiedLeads / funnelSummary.totalVisitors * 100).toFixed(1), fill: '#8B5CF6' },
    { stage: 'Opportunities', count: funnelSummary.opportunities, percentage: (funnelSummary.opportunities / funnelSummary.totalVisitors * 100).toFixed(1), fill: '#F59E0B' },
    { stage: 'Customers', count: funnelSummary.customers, percentage: (funnelSummary.customers / funnelSummary.totalVisitors * 100).toFixed(1), fill: '#EF4444' }
  ];

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <StaticExportLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Revenue Operations Intelligence</h1>
            <p className="text-gray-500 mt-1">End-to-end funnel optimization with predictive analytics and automated insights</p>
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

        {/* Funnel Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 text-blue-500" />
                <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                  TOFU
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{funnelSummary.totalVisitors.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Conversion: 10.0%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <UserCheck className="w-8 h-8 text-green-500" />
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  MOFU
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Qualified Leads</p>
                <p className="text-2xl font-bold text-gray-900">{funnelSummary.qualifiedLeads.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Conversion: 30.0%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="w-8 h-8 text-purple-500" />
                <Badge variant="secondary" className="text-purple-700 bg-purple-50">
                  BOFU
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">New Customers</p>
                <p className="text-2xl font-bold text-gray-900">{funnelSummary.customers}</p>
                <p className="text-sm text-gray-500 mt-1">Conversion: 25.0%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-orange-500" />
                <Badge variant="secondary" className="text-orange-700 bg-orange-50">
                  Revenue
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(funnelSummary.totalRevenue)}</p>
                <p className="text-sm text-gray-500 mt-1">Avg Deal: {formatCurrency(funnelSummary.avgDealSize)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Visualization */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Overall Funnel Performance
            </CardTitle>
            <p className="text-sm text-gray-500">Complete customer acquisition funnel overview</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Funnel Visualization */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Funnel Stages</h3>
                <div className="space-y-1">
                  {overallFunnel.map((stage, index) => {
                    const widthPercentage = Math.max((stage.count / funnelSummary.totalVisitors) * 100, 5);
                    return (
                      <div key={index}>
                        {/* Funnel Stage */}
                        <div className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                            <span className="text-sm text-gray-600">{stage.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                            <div 
                              className="h-8 rounded-full flex items-center justify-between px-3 text-white text-sm font-medium transition-all duration-300"
                              style={{ 
                                width: `${widthPercentage}%`, 
                                backgroundColor: stage.fill,
                                minWidth: '120px'
                              }}
                            >
                              <span>{stage.count.toLocaleString()}</span>
                              {index > 0 && (
                                <span className="text-xs opacity-80">
                                  -{((overallFunnel[index-1].count - stage.count) / overallFunnel[index-1].count * 100).toFixed(1)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow between stages */}
                        {index < overallFunnel.length - 1 && (
                          <div className="flex justify-center py-3">
                            <div className="flex flex-col items-center">
                              <ArrowDown className="w-5 h-5 text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">
                                {((overallFunnel[index+1].count / stage.count) * 100).toFixed(1)}% convert
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Conversion Flow */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Conversion Flow</h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Visitors to Leads', from: funnelSummary.totalVisitors, to: funnelSummary.leads, rate: 10.0 },
                    { stage: 'Leads to Qualified', from: funnelSummary.leads, to: funnelSummary.qualifiedLeads, rate: 30.0 },
                    { stage: 'Qualified to Opportunities', from: funnelSummary.qualifiedLeads, to: funnelSummary.opportunities, rate: 25.0 },
                    { stage: 'Opportunities to Customers', from: funnelSummary.opportunities, to: funnelSummary.customers, rate: 28.1 }
                  ].map((conversion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{conversion.stage}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="text-xs text-gray-600">
                          {conversion.from.toLocaleString()} → {conversion.to.toLocaleString()}
                        </div>
                      </div>
                      <Badge variant="secondary" className={`${conversion.rate >= 25 ? 'bg-green-50 text-green-700' : conversion.rate >= 15 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                        {conversion.rate.toFixed(1)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="tofu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tofu">TOFU Analytics</TabsTrigger>
            <TabsTrigger value="mofu">MOFU Analytics</TabsTrigger>
            <TabsTrigger value="bofu">BOFU Analytics</TabsTrigger>
          </TabsList>

          {/* TOFU Analytics */}
          <TabsContent value="tofu" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Eye className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
                    <p className="text-2xl font-bold text-gray-900">{tofuAnalytics.visitors.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Leads Generated</p>
                    <p className="text-2xl font-bold text-gray-900">{tofuAnalytics.leads.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{tofuAnalytics.conversionRate}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">CAC (TOFU)</p>
                    <p className="text-2xl font-bold text-gray-900">${tofuAnalytics.cac}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>TOFU Performance Trend</CardTitle>
                  <p className="text-sm text-gray-500">Monthly visitor to lead conversion</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={tofuAnalytics.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="visitors" stroke="#3B82F6" fill="#EBF4FF" />
                      <Area type="monotone" dataKey="leads" stroke="#10B981" fill="#D1FAE5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <p className="text-sm text-gray-500">Lead generation by channel</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tofuAnalytics.channels.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{channel.name}</span>
                            <Badge variant="secondary" className={`${channel.roi >= 4 ? 'bg-green-50 text-green-700' : channel.roi >= 3 ? 'bg-yellow-50 text-yellow-700' : 'bg-orange-50 text-orange-700'}`}>
                              ROI: {channel.roi}x
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{channel.leads} leads from {channel.visitors.toLocaleString()} visitors</span>
                            <span>CAC: ${channel.cac}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MOFU Analytics */}
          <TabsContent value="mofu" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{mofuAnalytics.leads.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Qualified Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{mofuAnalytics.qualifiedLeads.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Qualification Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{mofuAnalytics.conversionRate}%</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg Time to Qualify</p>
                    <p className="text-2xl font-bold text-gray-900">{mofuAnalytics.timeToConvert}d</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Lead Nurturing Performance</CardTitle>
                  <p className="text-sm text-gray-500">Lead progression through stages</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mofuAnalytics.nurturingPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="stage" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Lead Source Performance</CardTitle>
                  <p className="text-sm text-gray-500">Qualification rates by source</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mofuAnalytics.leadSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{source.source}</span>
                            <Badge variant="secondary" className={`${source.rate >= 30 ? 'bg-green-50 text-green-700' : source.rate >= 20 ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>
                              {source.rate.toFixed(1)}%
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            {source.qualified} qualified from {source.leads} leads
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* BOFU Analytics */}
          <TabsContent value="bofu" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Opportunities</p>
                    <p className="text-2xl font-bold text-gray-900">{bofuAnalytics.opportunities}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Customers Won</p>
                    <p className="text-2xl font-bold text-gray-900">{bofuAnalytics.customers}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avg Deal Size</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(bofuAnalytics.avgDealSize)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Sales Cycle</p>
                    <p className="text-2xl font-bold text-gray-900">{bofuAnalytics.timeToConvert}d</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Sales Pipeline</CardTitle>
                  <p className="text-sm text-gray-500">Progression through sales stages</p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bofuAnalytics.salesCycleStages}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="stage" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Deal Size Distribution</CardTitle>
                  <p className="text-sm text-gray-500">Revenue by deal size range</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bofuAnalytics.dealSizeDistribution.map((deal, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{deal.range}</span>
                            <span className="font-semibold text-green-600">{formatCurrency(deal.revenue)}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {deal.deals} deals
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Investment Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              Funnel Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Acquisition Efficiency</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Conversion Rate</span>
                  <span className="font-semibold">{funnelSummary.overallConversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Blended CAC</span>
                  <span className="font-semibold">$285</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Sales Cycle</span>
                  <span className="font-semibold">52 days</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Revenue Performance</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue Generated</span>
                  <span className="font-semibold">{formatCurrency(funnelSummary.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Deal Size</span>
                  <span className="font-semibold">{formatCurrency(funnelSummary.avgDealSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue per Visitor</span>
                  <span className="font-semibold">${(funnelSummary.totalRevenue / funnelSummary.totalVisitors).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Growth Indicators</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funnel Health</span>
                  <Badge className="bg-green-100 text-green-800">Strong</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Optimization Potential</span>
                  <Badge className="bg-blue-100 text-blue-800">High</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Readiness</span>
                  <Badge className="bg-purple-100 text-purple-800">Ready</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaticExportLayout>
  );
}