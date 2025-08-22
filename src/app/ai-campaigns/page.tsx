"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Zap,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BarChart3,
  Settings,
  Play,
  Pause,
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  Bell
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";

const aiCampaigns = [
  {
    id: 1,
    name: "Smart Loan Upsell",
    type: "Cross-sell",
    status: "active",
    aiModel: "Propensity Scoring v2.1",
    audience: 15420,
    budget: 25000,
    spent: 8750,
    conversions: 462,
    revenue: 1240000,
    roi: 425,
    startDate: "2024-01-01",
    channels: ["Email", "WhatsApp", "Push"],
    performance: {
      openRate: 68,
      clickRate: 24,
      conversionRate: 3.0
    }
  },
  {
    id: 2,
    name: "Insurance Renewal AI",
    type: "Retention",
    status: "active",
    aiModel: "Churn Prediction v3.0",
    audience: 8750,
    budget: 15000,
    spent: 12300,
    conversions: 7875,
    revenue: 945000,
    roi: 768,
    startDate: "2023-12-15",
    channels: ["SMS", "Email", "Call"],
    performance: {
      openRate: 85,
      clickRate: 42,
      conversionRate: 90.0
    }
  },
  {
    id: 3,
    name: "Premium Card Acquisition",
    type: "Acquisition",
    status: "paused",
    aiModel: "Lookalike Modeling v1.8",
    audience: 22100,
    budget: 40000,
    spent: 22400,
    conversions: 1326,
    revenue: 795600,
    roi: 355,
    startDate: "2024-01-10",
    channels: ["Web", "Social", "Email"],
    performance: {
      openRate: 45,
      clickRate: 18,
      conversionRate: 6.0
    }
  }
];

const aiInsights = [
  {
    insight: "Best Send Time",
    value: "6:30 PM",
    improvement: "+23% engagement",
    confidence: 94
  },
  {
    insight: "Optimal Channel",
    value: "WhatsApp",
    improvement: "+31% conversion",
    confidence: 89
  },
  {
    insight: "Message Personalization",
    value: "Product Benefits",
    improvement: "+18% click-through",
    confidence: 92
  },
  {
    insight: "Audience Segment",
    value: "High Value Customers",
    improvement: "+45% ROI",
    confidence: 96
  }
];

const performanceMetrics = [
  { month: "Aug", campaigns: 8, conversions: 1240, revenue: 2.1 },
  { month: "Sep", campaigns: 12, conversions: 1890, revenue: 3.2 },
  { month: "Oct", campaigns: 15, conversions: 2450, revenue: 4.1 },
  { month: "Nov", campaigns: 18, conversions: 3120, revenue: 5.3 },
  { month: "Dec", campaigns: 22, conversions: 3890, revenue: 6.8 },
  { month: "Jan", campaigns: 25, conversions: 4650, revenue: 8.2 }
];

const channelOptimization = [
  { channel: "Email", effectiveness: 72, volume: 45000, cost: 0.08 },
  { channel: "SMS", effectiveness: 68, volume: 32000, cost: 0.12 },
  { channel: "WhatsApp", effectiveness: 85, volume: 28000, cost: 0.15 },
  { channel: "Push", effectiveness: 78, volume: 55000, cost: 0.03 },
  { channel: "Voice", effectiveness: 92, volume: 8500, cost: 1.25 }
];

const aiModelPerformance = [
  { model: "Propensity Scoring", accuracy: 94, adoption: 85, impact: 425 },
  { model: "Churn Prediction", accuracy: 89, adoption: 92, impact: 768 },
  { model: "Next Best Action", accuracy: 87, adoption: 78, impact: 345 },
  { model: "Lookalike Modeling", accuracy: 82, adoption: 71, impact: 285 },
  { model: "Sentiment Analysis", accuracy: 76, adoption: 65, impact: 156 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AICampaigns() {
  const router = useRouter();
  
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Campaign Optimization</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Model Settings
          </Button>
          <Button onClick={() => router.push('/ai-campaigns/create')}>
            <Sparkles className="mr-2 h-4 w-4" />
            Create AI Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active AI Campaigns</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI-Driven ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">485%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+125%</span> vs manual campaigns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.2M</div>
            <p className="text-xs text-muted-foreground">
              AI-generated revenue this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              Average across all models
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Channel Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="space-y-4">
            {aiCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>
                        {campaign.aiModel} • Started {new Date(campaign.startDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <Badge variant="outline">{campaign.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Audience</p>
                      <p className="font-medium">{campaign.audience.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Spent</p>
                      <p className="font-medium">${campaign.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="font-medium">{campaign.conversions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">${(campaign.revenue / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="font-medium text-green-600">{campaign.roi}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Open Rate</span>
                        <span>{campaign.performance.openRate}%</span>
                      </div>
                      <Progress value={campaign.performance.openRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Click Rate</span>
                        <span>{campaign.performance.clickRate}%</span>
                      </div>
                      <Progress value={campaign.performance.clickRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>{campaign.performance.conversionRate}%</span>
                      </div>
                      <Progress value={campaign.performance.conversionRate} max={10} className="h-2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Channels:</span>
                      {campaign.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Analytics
                      </Button>
                      <Button size="sm" variant={campaign.status === 'active' ? 'outline' : 'default'}>
                        {campaign.status === 'active' ? (
                          <>
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>Machine learning recommendations for campaign optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.insight} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{insight.insight}</p>
                        <p className="text-sm text-muted-foreground">{insight.value}</p>
                        <p className="text-sm text-green-600">{insight.improvement}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{insight.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Accuracy and impact metrics across AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={aiModelPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="model" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name="Accuracy" 
                      dataKey="accuracy" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3} 
                    />
                    <Radar 
                      name="Adoption" 
                      dataKey="adoption" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3} 
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Campaign Performance Trends</CardTitle>
              <CardDescription>Monthly growth in AI-driven campaigns and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="campaigns" fill="#3b82f6" name="Active Campaigns" />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    name="Conversions" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    name="Revenue ($M)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Channel Optimization</CardTitle>
              <CardDescription>Real-time channel performance and cost optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelOptimization.map((channel) => (
                  <div key={channel.channel} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {channel.channel === 'Email' && <Mail className="h-4 w-4 text-blue-600" />}
                          {channel.channel === 'SMS' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {channel.channel === 'WhatsApp' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          {channel.channel === 'Push' && <Bell className="h-4 w-4 text-blue-600" />}
                          {channel.channel === 'Voice' && <Phone className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{channel.channel}</h4>
                          <p className="text-sm text-muted-foreground">
                            {channel.volume.toLocaleString()} messages • ${channel.cost}/message
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={channel.effectiveness > 80 ? "bg-green-50 text-green-700" : 
                                  channel.effectiveness > 70 ? "bg-blue-50 text-blue-700" : 
                                  "bg-yellow-50 text-yellow-700"}
                      >
                        {channel.effectiveness}% effective
                      </Badge>
                    </div>
                    <Progress value={channel.effectiveness} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">AI Recommendations</h4>
                </div>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Increase WhatsApp allocation by 15% for highest effectiveness</li>
                  <li>• Reduce SMS volume by 10% and reallocate to Voice for better ROI</li>
                  <li>• Schedule Email campaigns during AI-identified peak engagement hours</li>
                  <li>• A/B test personalized Push notifications to improve 78% effectiveness</li>
                </ul>
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