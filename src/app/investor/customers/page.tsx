"use client";

import React, { useState, useMemo } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, AreaChart, Area } from 'recharts';
import { projectsList } from "@/lib/data/projectsData";
import { useLeads } from "@/contexts/LeadContext";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

export default function InvestorCustomersPage() {
  const { customers } = useLeads();
  const [selectedProject, setSelectedProject] = useState('all');

  // Core SaaS Metrics
  const coreMetrics = useMemo(() => {
    let filteredCustomers = customers;
    
    if (selectedProject !== 'all') {
      const projectCustomerMap = {
        'CDP-001': customers.slice(0, Math.ceil(customers.length * 0.4)),
        'BANK-001': customers.slice(Math.ceil(customers.length * 0.4), Math.ceil(customers.length * 0.6)),
        'ECOM-001': customers.slice(Math.ceil(customers.length * 0.6), Math.ceil(customers.length * 0.8)),
        'UNIV-001': customers.slice(Math.ceil(customers.length * 0.8))
      };
      filteredCustomers = projectCustomerMap[selectedProject] || [];
    }

    const totalRevenue = filteredCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const activeCustomers = filteredCustomers.filter(c => c.status === 'active').length;
    const avgLTV = filteredCustomers.length > 0 ? filteredCustomers.reduce((sum, c) => sum + c.lifetimeValue, 0) / filteredCustomers.length : 0;
    const churnRate = filteredCustomers.length > 0 ? (filteredCustomers.filter(c => c.status === 'inactive').length / filteredCustomers.length * 100) : 0;
    
    const mrr = totalRevenue / 12;
    const arr = mrr * 12;
    const cac = 165;
    const ltv_cac = avgLTV / cac;
    
    return {
      mrr: mrr,
      arr: arr,
      activeCustomers: activeCustomers,
      churnRate: churnRate,
      ltv: avgLTV,
      cac: cac,
      ltv_cac: ltv_cac,
      nrr: 115,
      paybackMonths: 14
    };
  }, [customers, selectedProject]);

  // Simplified Revenue Growth Data
  const revenueGrowth = [
    { month: 'Jan', revenue: 145, target: 140 },
    { month: 'Feb', revenue: 162, target: 155 },
    { month: 'Mar', revenue: 171, target: 170 },
    { month: 'Apr', revenue: 185, target: 185 },
    { month: 'May', revenue: 198, target: 200 },
    { month: 'Jun', revenue: 215, target: 220 }
  ];

  // Customer Growth Trend
  const customerGrowth = [
    { month: 'Jan', customers: 1240 },
    { month: 'Feb', customers: 1368 },
    { month: 'Mar', customers: 1487 },
    { month: 'Apr', customers: 1623 },
    { month: 'May', customers: 1745 },
    { month: 'Jun', customers: 1876 }
  ];

  // Top Customer Acquisition Channels
  const topChannels = [
    { name: 'Organic Search', customers: 465, cac: 125, efficiency: 'Excellent' },
    { name: 'Referrals', customers: 321, cac: 65, efficiency: 'Outstanding' },
    { name: 'Content Marketing', customers: 298, cac: 145, efficiency: 'Good' },
    { name: 'Paid Ads', customers: 187, cac: 245, efficiency: 'Fair' }
  ];

  // Customer Segmentation Data
  const totalCustomerBase = Math.max(customers.length, 2850); // Ensure minimum base for meaningful segments
  const customerSegments = [
    { 
      segment: 'Champions', 
      count: Math.max(Math.floor(totalCustomerBase * 0.18), 512), 
      ltv: 4850,
      cac: 185,
      roi: 26.2,
      color: '#10B981',
      description: 'High-value customers with strong engagement and loyalty'
    },
    { 
      segment: 'Loyal Customers', 
      count: Math.max(Math.floor(totalCustomerBase * 0.28), 798), 
      ltv: 3420,
      cac: 205,
      roi: 16.7,
      color: '#3B82F6',
      description: 'Consistent customers with good retention rates'
    },
    { 
      segment: 'Potential Loyalists', 
      count: Math.max(Math.floor(totalCustomerBase * 0.25), 712), 
      ltv: 2680,
      cac: 225,
      roi: 11.9,
      color: '#8B5CF6',
      description: 'Growing customers with upside potential'
    },
    { 
      segment: 'New Customers', 
      count: Math.max(Math.floor(totalCustomerBase * 0.19), 541), 
      ltv: 1950,
      cac: 195,
      roi: 10.0,
      color: '#F59E0B',
      description: 'Recently acquired customers in onboarding phase'
    },
    { 
      segment: 'At Risk', 
      count: Math.max(Math.floor(totalCustomerBase * 0.10), 285), 
      ltv: 1280,
      cac: 245,
      roi: 5.2,
      color: '#EF4444',
      description: 'Customers showing signs of churn risk'
    }
  ];

  // Health Score Helper
  const getHealthStatus = (value, good, excellent) => {
    if (value >= excellent) return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
    if (value >= good) return { status: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle };
    return { status: 'Needs Attention', color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertCircle };
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  return (
    <StaticExportLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Simple Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Intelligence Analytics</h1>
            <p className="text-gray-500 mt-1">AI-driven customer metrics with predictive insights and benchmarking</p>
          </div>
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

        {/* Key Metrics Cards - Clean and Simple */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Monthly Recurring Revenue */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-10 h-10 text-blue-500" />
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  +18% MoM
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Recurring Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(coreMetrics.mrr)}</p>
                <p className="text-sm text-gray-500 mt-2">ARR: {formatCurrency(coreMetrics.arr)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Count */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-green-500" />
                <Badge variant="secondary" className="text-blue-700 bg-blue-50">
                  +12% Growth
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                <p className="text-3xl font-bold text-gray-900">{coreMetrics.activeCustomers.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Churn: {coreMetrics.churnRate.toFixed(1)}%</p>
              </div>
            </CardContent>
          </Card>

          {/* LTV:CAC Ratio */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-10 h-10 text-purple-500" />
                {(() => {
                  const health = getHealthStatus(coreMetrics.ltv_cac, 3, 5);
                  return (
                    <Badge variant="secondary" className={`${health.color.replace('text-', 'text-')} ${health.bg}`}>
                      {health.status}
                    </Badge>
                  );
                })()}
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">LTV:CAC Ratio</p>
                <p className="text-3xl font-bold text-gray-900">{coreMetrics.ltv_cac.toFixed(1)}:1</p>
                <p className="text-sm text-gray-500 mt-2">Payback: {coreMetrics.paybackMonths}mo</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Growth Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Revenue Performance</CardTitle>
            <p className="text-sm text-gray-500">Monthly recurring revenue vs target ($K)</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value) => [`$${value}K`, '']}
                  labelFormatter={(label) => `${label} 2024`}
                  contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#EBF4FF" 
                  strokeWidth={3}
                  name="Actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#94A3B8" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Target"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Growth */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Customer Growth</CardTitle>
              <p className="text-sm text-gray-500">Total active customers over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [value.toLocaleString(), 'Customers']}
                    contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Acquisition Channels */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Top Acquisition Channels</CardTitle>
              <p className="text-sm text-gray-500">Customer acquisition by channel</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topChannels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{channel.name}</span>
                        <Badge 
                          variant="secondary" 
                          className={
                            channel.efficiency === 'Outstanding' ? 'bg-green-50 text-green-700' :
                            channel.efficiency === 'Excellent' ? 'bg-blue-50 text-blue-700' :
                            channel.efficiency === 'Good' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-orange-50 text-orange-700'
                          }
                        >
                          {channel.efficiency}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{channel.customers} customers</span>
                        <span>CAC: ${channel.cac}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Segmentation */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Customer Segmentation
            </CardTitle>
            <p className="text-sm text-gray-500">Customer segments with LTV, CAC, and ROI analysis</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerSegments.map((segment, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      ></div>
                      <h3 className="font-semibold text-gray-900">{segment.segment}</h3>
                    </div>
                    <Badge variant="secondary" className={
                      segment.roi >= 20 ? 'bg-green-50 text-green-700' :
                      segment.roi >= 15 ? 'bg-blue-50 text-blue-700' :
                      segment.roi >= 10 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }>
                      {segment.roi >= 20 ? 'Excellent' :
                       segment.roi >= 15 ? 'Good' :
                       segment.roi >= 10 ? 'Fair' : 'Poor'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Customer Count</span>
                      <span className="font-semibold text-lg">{segment.count.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Segment LTV</span>
                      <span className="font-semibold text-green-600">{formatCurrency(segment.ltv)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CAC</span>
                      <span className="font-semibold text-red-600">{formatCurrency(segment.cac)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ROI</span>
                      <span className="font-semibold text-purple-600">{segment.roi.toFixed(1)}x</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">{segment.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Segmentation Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Segmentation Insights</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Total Revenue Impact:</span>
                  <span className="font-semibold ml-2">
                    {formatCurrency(customerSegments.reduce((sum, segment) => sum + (segment.ltv * segment.count), 0))}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Highest ROI Segment:</span>
                  <span className="font-semibold ml-2 text-green-600">
                    {customerSegments.reduce((prev, current) => (prev.roi > current.roi) ? prev : current).segment}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700">Growth Opportunity:</span>
                  <span className="font-semibold ml-2 text-purple-600">
                    Potential Loyalists
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Health Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              Business Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Revenue Growth</h3>
                <p className="text-sm text-gray-600 mt-1">+18% month-over-month</p>
                <p className="text-xs text-green-600 font-medium mt-1">Excellent</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Customer Retention</h3>
                <p className="text-sm text-gray-600 mt-1">NRR: {coreMetrics.nrr}%</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Healthy</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Unit Economics</h3>
                <p className="text-sm text-gray-600 mt-1">LTV:CAC {coreMetrics.ltv_cac.toFixed(1)}:1</p>
                <p className="text-xs text-purple-600 font-medium mt-1">Strong</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Efficiency</h3>
                <p className="text-sm text-gray-600 mt-1">Churn: {coreMetrics.churnRate.toFixed(1)}%</p>
                <p className="text-xs text-orange-600 font-medium mt-1">Monitor</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Investment Insights */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Key Investment Insights</CardTitle>
            <p className="text-sm text-gray-500">Critical metrics for investment decision making</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Revenue Quality</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Recurring Revenue</span>
                  <span className="font-semibold">{formatCurrency(coreMetrics.mrr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Run Rate</span>
                  <span className="font-semibold">{formatCurrency(coreMetrics.arr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Revenue Retention</span>
                  <span className="font-semibold text-blue-600">{coreMetrics.nrr}%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Growth Efficiency</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Acquisition Cost</span>
                  <span className="font-semibold">${coreMetrics.cac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Lifetime Value</span>
                  <span className="font-semibold">${coreMetrics.ltv.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payback Period</span>
                  <span className="font-semibold text-purple-600">{coreMetrics.paybackMonths} months</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaticExportLayout>
  );
}