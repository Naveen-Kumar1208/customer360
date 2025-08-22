"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users,
  Target,
  DollarSign,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface AnalyticsData {
  period: string;
  leads: number;
  conversions: number;
  revenue: number;
  campaigns: number;
  customers: number;
  avgDealSize: number;
  conversionRate: number;
}

interface PerformanceMetric {
  title: string;
  value: number;
  trend: number;
  format: 'number' | 'currency' | 'percentage';
  icon: any;
}

const monthlyData: AnalyticsData[] = [
  {
    period: 'Jan',
    leads: 145,
    conversions: 23,
    revenue: 2800000,
    campaigns: 8,
    customers: 234,
    avgDealSize: 121739,
    conversionRate: 15.86
  },
  {
    period: 'Feb',
    leads: 167,
    conversions: 28,
    revenue: 3200000,
    campaigns: 10,
    customers: 251,
    avgDealSize: 114286,
    conversionRate: 16.77
  },
  {
    period: 'Mar',
    leads: 189,
    conversions: 35,
    revenue: 4100000,
    campaigns: 12,
    customers: 278,
    avgDealSize: 117143,
    conversionRate: 18.52
  },
  {
    period: 'Apr',
    leads: 156,
    conversions: 29,
    revenue: 3600000,
    campaigns: 9,
    customers: 289,
    avgDealSize: 124138,
    conversionRate: 18.59
  },
  {
    period: 'May',
    leads: 203,
    conversions: 42,
    revenue: 5100000,
    campaigns: 15,
    customers: 312,
    avgDealSize: 121429,
    conversionRate: 20.69
  },
  {
    period: 'Jun',
    leads: 234,
    conversions: 48,
    revenue: 6200000,
    campaigns: 18,
    customers: 345,
    avgDealSize: 129167,
    conversionRate: 20.51
  }
];

const channelData = [
  { name: 'Email', leads: 456, conversions: 89, revenue: 8900000, color: '#3b82f6' },
  { name: 'WhatsApp', leads: 389, conversions: 95, revenue: 9800000, color: '#10b981' },
  { name: 'SMS', leads: 267, conversions: 51, revenue: 5200000, color: '#f59e0b' },
  { name: 'Phone', leads: 345, conversions: 78, revenue: 7800000, color: '#8b5cf6' },
  { name: 'Website', leads: 234, conversions: 42, revenue: 4200000, color: '#ef4444' }
];

const productData = [
  { name: 'Personal Loan', applications: 145, approved: 89, revenue: 8900000 },
  { name: 'Business Loan', applications: 89, approved: 67, revenue: 12400000 },
  { name: 'Home Loan', applications: 67, approved: 45, revenue: 15600000 },
  { name: 'Car Loan', applications: 123, approved: 78, revenue: 6800000 },
  { name: 'Education Loan', applications: 56, approved: 34, revenue: 3400000 }
];

const teamPerformance = [
  { agent: 'Rajesh Kumar', leads: 89, conversions: 23, revenue: 2800000, conversionRate: 25.8 },
  { agent: 'Priya Sharma', leads: 76, conversions: 19, revenue: 2200000, conversionRate: 25.0 },
  { agent: 'Amit Patel', leads: 95, conversions: 18, revenue: 1900000, conversionRate: 18.9 },
  { agent: 'Sunita Singh', leads: 67, conversions: 15, revenue: 1700000, conversionRate: 22.4 }
];

function MetricCard({ metric }: { metric: PerformanceMetric }) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        return `₹${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const isPositive = metric.trend > 0;
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatValue(metric.value, metric.format)}
            </p>
            <div className={`flex items-center mt-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-3 w-3 mr-1" />
              {Math.abs(metric.trend)}% from last month
            </div>
          </div>
          <metric.icon className="h-8 w-8 text-blue-600" />
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
            <Tooltip 
              formatter={(value: any) => [`₹${(value / 100000).toFixed(1)}L`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#revenueGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function ConversionFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
            <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function ChannelPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {channelData.map((channel) => (
            <div key={channel.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: channel.color }}
                ></div>
                <div>
                  <p className="font-medium text-gray-900">{channel.name}</p>
                  <p className="text-sm text-gray-600">{channel.leads} leads</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  {channel.conversions} conversions
                </p>
                <p className="text-sm text-gray-600">
                  {((channel.conversions / channel.leads) * 100).toFixed(1)}% rate
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProductAnalysis() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Product Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Product</th>
                <th className="text-right p-3">Applications</th>
                <th className="text-right p-3">Approved</th>
                <th className="text-right p-3">Approval Rate</th>
                <th className="text-right p-3">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product) => {
                const approvalRate = (product.approved / product.applications) * 100;
                return (  
                  <tr key={product.name} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="text-right p-3">{product.applications}</td>
                    <td className="text-right p-3">{product.approved}</td>
                    <td className="text-right p-3">
                      <Badge 
                        className={
                          approvalRate >= 70 ? 'bg-green-100 text-green-800' :
                          approvalRate >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {approvalRate.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="text-right p-3 font-semibold text-green-600">
                      ₹{(product.revenue / 100000).toFixed(1)}L
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamPerformance.map((agent, index) => (
            <div key={agent.agent} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{agent.agent}</p>
                  <p className="text-sm text-gray-600">
                    {agent.leads} leads • {agent.conversions} conversions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  ₹{(agent.revenue / 100000).toFixed(1)}L
                </p>
                <p className="text-sm text-gray-600">
                  {agent.conversionRate}% rate
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");

  // Calculate key metrics
  const totalLeads = monthlyData.reduce((sum, m) => sum + m.leads, 0);
  const totalConversions = monthlyData.reduce((sum, m) => sum + m.conversions, 0);
  const totalRevenue = monthlyData.reduce((sum, m) => sum + m.revenue, 0);
  const avgConversionRate = (totalConversions / totalLeads) * 100;

  const performanceMetrics: PerformanceMetric[] = [
    {
      title: 'Total Revenue',
      value: totalRevenue,
      trend: 18.4,
      format: 'currency',
      icon: DollarSign
    },
    {
      title: 'Total Leads',
      value: totalLeads,
      trend: 12.8,
      format: 'number',
      icon: Users
    },
    {
      title: 'Conversions',
      value: totalConversions,
      trend: 22.5,
      format: 'number',
      icon: Target
    },
    {
      title: 'Conversion Rate',
      value: avgConversionRate,
      trend: 5.2,
      format: 'percentage',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <ConversionFunnel />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChannelPerformance />
        <ProductAnalysis />
      </div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TeamLeaderboard />
        
        {/* Additional Insights */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">Top Performer</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    WhatsApp channel showing highest conversion rate at 24.4%
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Best Product</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Home loans generating highest revenue per application
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Seasonal Trend</h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    May-June showing 20% higher conversion rates
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Team Achievement</h4>
                  </div>
                  <p className="text-sm text-purple-700">
                    Team exceeded quarterly target by 18.4%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Quick Actions</h4>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Detailed Report
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <Button variant="outline" size="sm" className="justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Revenue Report
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Lead Analysis
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Conversion Report
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Forecast Model
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}