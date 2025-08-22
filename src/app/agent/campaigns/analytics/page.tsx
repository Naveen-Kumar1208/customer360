"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Users,
  Target,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface CampaignAnalytics {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp' | 'push';
  status: 'active' | 'completed' | 'paused';
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  revenue: number;
  roi: number;
  cpl: number; // Cost per lead
  conversionRate: number;
  engagement: {
    impressions: number;
    clicks: number;
    opens: number;
    replies: number;
  };
}

const campaignData: CampaignAnalytics[] = [
  {
    id: 'camp_001',
    name: 'Business Loan Q4 Campaign',
    type: 'email',
    status: 'completed',
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    budget: 150000,
    spent: 145000,
    leads: 245,
    conversions: 23,
    revenue: 5750000,
    roi: 396.55,
    cpl: 591.84,
    conversionRate: 9.39,
    engagement: {
      impressions: 12500,
      clicks: 1875,
      opens: 4250,
      replies: 187
    }
  },
  {
    id: 'camp_002',
    name: 'Personal Loan WhatsApp Outreach',
    type: 'whatsapp',
    status: 'active',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    budget: 100000,
    spent: 67000,
    leads: 189,
    conversions: 31,
    revenue: 3720000,
    roi: 555.22,
    cpl: 354.50,
    conversionRate: 16.40,
    engagement: {
      impressions: 8500,
      clicks: 2125,
      opens: 7650,
      replies: 425
    }
  },
  {
    id: 'camp_003',
    name: 'Equipment Finance SMS Campaign',
    type: 'sms',
    status: 'completed',
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    budget: 75000,
    spent: 72000,
    leads: 156,
    conversions: 18,
    revenue: 2880000,
    roi: 400.00,
    cpl: 461.54,
    conversionRate: 11.54,
    engagement: {
      impressions: 15000,
      clicks: 950,
      opens: 12750,
      replies: 89
    }
  },
  {
    id: 'camp_004',
    name: 'Home Loan Push Notification',
    type: 'push',
    status: 'paused',
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    budget: 50000,
    spent: 25000,
    leads: 67,
    conversions: 8,
    revenue: 960000,
    roi: 384.00,
    cpl: 373.13,
    conversionRate: 11.94,
    engagement: {
      impressions: 25000,
      clicks: 1250,
      opens: 18750,
      replies: 45
    }
  }
];

const monthlyPerformance = [
  { month: 'Jan', revenue: 4200000, leads: 156, conversions: 18, roi: 285 },
  { month: 'Feb', revenue: 3800000, leads: 142, conversions: 21, roi: 312 },
  { month: 'Mar', revenue: 5100000, leads: 189, conversions: 28, roi: 365 },
  { month: 'Apr', revenue: 4750000, leads: 178, conversions: 25, roi: 334 },
  { month: 'May', revenue: 6200000, leads: 234, conversions: 35, roi: 421 },
  { month: 'Jun', revenue: 5800000, leads: 221, conversions: 32, roi: 398 }
];

const channelPerformance = [
  { name: 'Email', leads: 456, conversions: 52, revenue: 6240000, color: '#3b82f6' },
  { name: 'WhatsApp', leads: 389, conversions: 58, revenue: 6960000, color: '#10b981' },
  { name: 'SMS', leads: 234, conversions: 28, revenue: 3360000, color: '#f59e0b' },
  { name: 'Push', leads: 189, conversions: 22, revenue: 2640000, color: '#8b5cf6' }
];

function MetricCard({ title, value, trend, icon: Icon, format = "number", color = "blue" }: {
  title: string;
  value: number;
  trend: number;
  icon: any;
  format?: "number" | "currency" | "percentage";
  color?: string;
}) {
  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        return `₹${val.toLocaleString()}`;
      case "percentage":
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositive = trend > 0;
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
            <div className={`flex items-center mt-1 text-sm ${trendColor}`}>
              <TrendIcon className="h-3 w-3 mr-1" />
              {Math.abs(trend)}% vs last period
            </div>
          </div>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignTable({ campaigns }: { campaigns: CampaignAnalytics[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'sms': return 'bg-yellow-100 text-yellow-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Campaign</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Status</th>
                <th className="text-right p-2">Budget</th>
                <th className="text-right p-2">Spent</th>
                <th className="text-right p-2">Leads</th>
                <th className="text-right p-2">Conversions</th>
                <th className="text-right p-2">Revenue</th>
                <th className="text-right p-2">ROI</th>
                <th className="text-right p-2">CPL</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">
                        {campaign.startDate.toLocaleDateString('en-IN')}
                        {campaign.endDate && ` - ${campaign.endDate.toLocaleDateString('en-IN')}`}
                      </p>
                    </div>
                  </td>
                  <td className="p-2">
                    <Badge className={getTypeColor(campaign.type)}>
                      {campaign.type.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="text-right p-2">{formatCurrency(campaign.budget)}</td>
                  <td className="text-right p-2">{formatCurrency(campaign.spent)}</td>
                  <td className="text-right p-2">{campaign.leads}</td>
                  <td className="text-right p-2">{campaign.conversions}</td>
                  <td className="text-right p-2">{formatCurrency(campaign.revenue)}</td>
                  <td className="text-right p-2 font-medium text-green-600">
                    {campaign.roi.toFixed(0)}%
                  </td>
                  <td className="text-right p-2">₹{campaign.cpl.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CampaignAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [channelFilter, setChannelFilter] = useState("all");

  // Calculate totals
  const totalBudget = campaignData.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaignData.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = campaignData.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = campaignData.reduce((sum, c) => sum + c.conversions, 0);
  const totalRevenue = campaignData.reduce((sum, c) => sum + c.revenue, 0);
  const avgROI = (totalRevenue / totalSpent) * 100;
  const avgCPL = totalSpent / totalLeads;
  const overallConversionRate = (totalConversions / totalLeads) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Analytics</h1>
          <p className="text-gray-600 mt-1">Track performance and ROI across all marketing campaigns</p>
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
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={totalRevenue}
          trend={18.4}
          icon={DollarSign}
          format="currency"
          color="green"
        />
        <MetricCard
          title="Total Leads"
          value={totalLeads}
          trend={12.8}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Conversion Rate"
          value={overallConversionRate}
          trend={5.2}
          icon={Target}
          format="percentage"
          color="purple"
        />
        <MetricCard
          title="Average ROI"
          value={avgROI}
          trend={23.1}
          icon={TrendingUp}
          format="percentage"
          color="yellow"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  formatter={(value: any) => [`₹${(value / 100000).toFixed(1)}L`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="revenue"
                >
                  {channelPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`₹${(value / 100000).toFixed(1)}L`, 'Revenue']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {channelPerformance.map((channel) => (
                <div key={channel.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: channel.color }}
                  ></div>
                  <div className="text-sm">
                    <p className="font-medium">{channel.name}</p>
                    <p className="text-gray-500">{channel.conversions} conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Lead to Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
              <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance Table */}
      <CampaignTable campaigns={campaignData} />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900">Personal Loan WhatsApp Outreach</p>
                <p className="text-sm text-gray-600">WhatsApp Campaign</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">ROI</p>
                  <p className="font-semibold text-green-600">555%</p>
                </div>
                <div>
                  <p className="text-gray-500">Conv. Rate</p>
                  <p className="font-semibold">16.4%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Average Cost Per Lead</p>
                <p className="text-2xl font-bold">₹{avgCPL.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget Utilization</p>
                <p className="text-lg font-semibold">{((totalSpent / totalBudget) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Month over Month</p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-lg font-semibold text-green-600">+18.4%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Best Performing Month</p>
                <p className="text-lg font-semibold">May 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}