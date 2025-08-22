"use client";

import React from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Gem,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Crown,
  Star,
  BarChart3,
  PieChart,
  Calculator,
  FileText,
  Calendar,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";

const wealthSegments = [
  {
    segment: "Ultra HNI",
    minPortfolio: 10000000,
    customers: 145,
    totalAUM: 2400000000,
    avgPortfolio: 16500000,
    growthRate: 15.2,
    retentionRate: 98,
    advisorRatio: "1:8",
    color: "#8b5cf6"
  },
  {
    segment: "HNI",
    minPortfolio: 1000000,
    customers: 1250,
    totalAUM: 2800000000,
    avgPortfolio: 2240000,
    growthRate: 12.8,
    retentionRate: 94,
    advisorRatio: "1:25",
    color: "#3b82f6"
  },
  {
    segment: "Affluent",
    minPortfolio: 250000,
    customers: 8500,
    totalAUM: 3200000000,
    avgPortfolio: 376000,
    growthRate: 9.5,
    retentionRate: 87,
    advisorRatio: "1:85",
    color: "#10b981"
  },
  {
    segment: "Mass Affluent",
    minPortfolio: 50000,
    customers: 25000,
    totalAUM: 2100000000,
    avgPortfolio: 84000,
    growthRate: 6.2,
    retentionRate: 78,
    advisorRatio: "1:250",
    color: "#f59e0b"
  }
];

const topClients = [
  {
    name: "Alexandra Morgan",
    id: "WM001",
    aum: 45000000,
    segment: "Ultra HNI",
    advisor: "James Wilson",
    lastContact: "2024-01-15",
    riskProfile: "Moderate",
    performance: 18.5,
    avatar: "/placeholder-avatar.jpg"
  },
  {
    name: "Robert Chen",
    id: "WM002",
    aum: 32000000,
    segment: "Ultra HNI",
    advisor: "Sarah Parker",
    lastContact: "2024-01-12",
    riskProfile: "Aggressive",
    performance: 22.1,
    avatar: "/placeholder-avatar.jpg"
  },
  {
    name: "Maria Rodriguez",
    id: "WM003",
    aum: 18000000,
    segment: "Ultra HNI",
    advisor: "Michael Zhang",
    lastContact: "2024-01-18",
    riskProfile: "Conservative",
    performance: 12.8,
    avatar: "/placeholder-avatar.jpg"
  },
  {
    name: "David Thompson",
    id: "WM004",
    aum: 8500000,
    segment: "HNI",
    advisor: "Lisa Kumar",
    lastContact: "2024-01-14",
    riskProfile: "Moderate",
    performance: 16.3,
    avatar: "/placeholder-avatar.jpg"
  }
];

const portfolioAllocation = [
  { name: "Equities", value: 35, amount: 3640000000 },
  { name: "Fixed Income", value: 25, amount: 2600000000 },
  { name: "Real Estate", value: 15, amount: 1560000000 },
  { name: "Alternative Investments", value: 12, amount: 1248000000 },
  { name: "Cash & Equivalents", value: 8, amount: 832000000 },
  { name: "Others", value: 5, amount: 520000000 }
];

const monthlyGrowth = [
  { month: "Jul", aum: 9.8, clients: 180, revenue: 12.5 },
  { month: "Aug", aum: 10.2, clients: 195, revenue: 13.2 },
  { month: "Sep", aum: 10.6, clients: 210, revenue: 14.1 },
  { month: "Oct", aum: 10.9, clients: 225, revenue: 14.8 },
  { month: "Nov", aum: 11.3, clients: 240, revenue: 15.6 },
  { month: "Dec", aum: 11.8, clients: 255, revenue: 16.4 },
  { month: "Jan", aum: 12.2, clients: 270, revenue: 17.2 }
];

const advisorPerformance = [
  { name: "James Wilson", clients: 12, aum: 180, satisfaction: 9.8, retention: 100 },
  { name: "Sarah Parker", clients: 15, aum: 165, satisfaction: 9.6, retention: 95 },
  { name: "Michael Zhang", clients: 18, aum: 145, satisfaction: 9.4, retention: 92 },
  { name: "Lisa Kumar", clients: 22, aum: 125, satisfaction: 9.2, retention: 88 },
  { name: "David Brown", clients: 28, aum: 98, satisfaction: 9.0, retention: 85 }
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

export default function WealthManagement() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Wealth Management Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10.5B</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.8%</span> YoY growth
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HNI Clients</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,395</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+85</span> new this quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Portfolio Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.4%</span> vs benchmark
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.4/10</div>
            <p className="text-xs text-muted-foreground">
              92% would recommend
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="segments">Client Segments</TabsTrigger>
          <TabsTrigger value="clients">Top Clients</TabsTrigger>
          <TabsTrigger value="advisors">Advisor Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation Overview</CardTitle>
                <CardDescription>Total AUM distribution across asset classes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={portfolioAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [
                      `$${(portfolioAllocation.find(p => p.name === name)?.amount / 1000000000).toFixed(1)}B`,
                      name
                    ]} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>AUM, client acquisition, and revenue growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="aum" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      name="AUM ($B)" 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="clients" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      name="New Clients" 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10b981" 
                      strokeWidth={2} 
                      name="Revenue ($M)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4">
            {wealthSegments.map((segment) => (
              <Card key={segment.segment}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${segment.color}20` }}>
                        <Gem className="h-5 w-5" style={{ color: segment.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{segment.segment}</CardTitle>
                        <CardDescription>
                          Min Portfolio: ${(segment.minPortfolio / 1000000).toFixed(1)}M
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {segment.retentionRate}% retention
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Clients</p>
                      <p className="text-xl font-bold">{segment.customers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total AUM</p>
                      <p className="text-xl font-bold">${(segment.totalAUM / 1000000000).toFixed(1)}B</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Portfolio</p>
                      <p className="text-xl font-bold">${(segment.avgPortfolio / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-xl font-bold text-green-600">{segment.growthRate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Advisor Ratio: {segment.advisorRatio}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={segment.retentionRate} className="w-24 h-2" />
                      <Button size="sm" variant="outline">
                        Segment Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Wealth Management Clients</CardTitle>
              <CardDescription>Highest value clients and their portfolio performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client) => (
                  <div key={client.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-lg">{client.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {client.id} • {client.segment}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${(client.aum / 1000000).toFixed(1)}M</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          +{client.performance}% return
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Advisor</p>
                        <p className="font-medium">{client.advisor}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Risk Profile</p>
                        <p className="font-medium">{client.riskProfile}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Contact</p>
                        <p className="font-medium">{new Date(client.lastContact).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Performance</p>
                        <p className="font-medium text-green-600">+{client.performance}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Progress value={client.performance} max={25} className="w-32 h-2" />
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm">
                          Portfolio Review
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advisors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relationship Manager Performance</CardTitle>
              <CardDescription>Key metrics for wealth management advisors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisorPerformance.map((advisor, index) => (
                  <div key={advisor.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-blue-600">
                            {advisor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{advisor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Senior Relationship Manager
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={index < 2 ? "bg-green-50 text-green-700" : ""}
                      >
                        {index < 2 ? "Top Performer" : "Performing Well"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Clients</p>
                        <p className="font-bold text-lg">{advisor.clients}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">AUM</p>
                        <p className="font-bold text-lg">${advisor.aum}M</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                        <p className="font-bold text-lg">{advisor.satisfaction}/10</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Retention</p>
                        <p className="font-bold text-lg">{advisor.retention}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="grid grid-cols-3 gap-4 w-96">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">AUM per Client</p>
                          <Progress value={(advisor.aum / advisor.clients / 10) * 100} max={100} className="h-2" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Satisfaction</p>
                          <Progress value={advisor.satisfaction * 10} className="h-2" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Retention</p>
                          <Progress value={advisor.retention} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Performance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
      </StaticExportLayout>
    </>
  );
}