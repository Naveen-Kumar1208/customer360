"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Target,
  BarChart3,
  Activity,
  Eye,
  MousePointer,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Sample analytics data
const journeyAnalytics = {
  id: "JB-001",
  name: "Welcome Onboarding Flow",
  status: "Running",
  startDate: "2024-01-15",
  overview: {
    totalEntries: 12450,
    activeUsers: 8920,
    completedJourney: 3240,
    completionRate: 26.0,
    avgTimeToComplete: "5.2 days",
    totalConversions: 578,
    conversionRate: 4.6,
    revenue: 289500
  },
  stepAnalytics: [
    {
      id: "step-1",
      name: "Welcome Email",
      type: "email",
      users: 12450,
      completed: 11820,
      conversionRate: 94.9,
      avgTimeSpent: "2m 15s",
      dropoffCount: 630,
      actions: {
        sent: 12450,
        delivered: 12320,
        opened: 8950,
        clicked: 3420
      }
    },
    {
      id: "step-2", 
      name: "Wait 2 Days",
      type: "delay",
      users: 11820,
      completed: 10150,
      conversionRate: 85.9,
      avgTimeSpent: "2 days",
      dropoffCount: 1670,
      actions: {}
    },
    {
      id: "step-3",
      name: "Product Tour SMS",
      type: "sms",
      users: 10150,
      completed: 8920,
      conversionRate: 87.9,
      avgTimeSpent: "45s",
      dropoffCount: 1230,
      actions: {
        sent: 10150,
        delivered: 9980,
        opened: 8920,
        clicked: 2340
      }
    },
    {
      id: "step-4",
      name: "Engagement Check",
      type: "condition",
      users: 8920,
      completed: 5680,
      conversionRate: 63.7,
      avgTimeSpent: "N/A",
      dropoffCount: 3240,
      actions: {}
    },
    {
      id: "step-5",
      name: "Follow-up Email",
      type: "email", 
      users: 5680,
      completed: 4520,
      conversionRate: 79.6,
      avgTimeSpent: "1m 45s",
      dropoffCount: 1160,
      actions: {
        sent: 5680,
        delivered: 5610,
        opened: 4100,
        clicked: 1890
      }
    }
  ],
  channelPerformance: {
    email: {
      sent: 18130,
      delivered: 17930,
      opened: 13050,
      clicked: 5310,
      deliveryRate: 98.9,
      openRate: 72.8,
      clickRate: 40.7
    },
    sms: {
      sent: 10150,
      delivered: 9980,
      opened: 8920,
      clicked: 2340,
      deliveryRate: 98.3,
      openRate: 89.4,
      clickRate: 26.2
    },
    whatsapp: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0
    }
  },
  timeAnalytics: {
    daily: [
      { date: "2024-01-15", entries: 420, conversions: 15 },
      { date: "2024-01-16", entries: 380, conversions: 18 },
      { date: "2024-01-17", entries: 450, conversions: 22 },
      { date: "2024-01-18", entries: 520, conversions: 28 },
      { date: "2024-01-19", entries: 490, conversions: 25 },
      { date: "2024-01-20", entries: 380, conversions: 19 },
      { date: "2024-01-21", entries: 290, conversions: 14 }
    ]
  },
  flowPerformance: [
    { step: "Welcome Email", completionRate: 95 },
    { step: "Wait 2 Days", completionRate: 86 },
    { step: "Product Tour SMS", completionRate: 88 },
    { step: "Conversion Check", completionRate: 72 },
    { step: "Follow-up Email", completionRate: 65 },
    { step: "Journey Complete", completionRate: 26 }
  ],
  channelPerformance: [
    {
      name: "Email",
      icon: "📧",
      sent: 8450,
      openRate: 72.6,
      clickRate: 18.3,
      conversionRate: 5.2
    },
    {
      name: "SMS",
      icon: "📱", 
      sent: 6150,
      openRate: 94.2,
      clickRate: 28.7,
      conversionRate: 8.1
    },
    {
      name: "WhatsApp",
      icon: "💬",
      sent: 2340,
      openRate: 89.5,
      clickRate: 34.2,
      conversionRate: 12.3
    },
    {
      name: "Push",
      icon: "🔔",
      sent: 4560,
      openRate: 45.8,
      clickRate: 12.4,
      conversionRate: 3.7
    }
  ],
  funnelData: [
    { stage: "Entered Journey", users: 12450, conversionRate: 100 },
    { stage: "Opened Welcome Email", users: 8950, conversionRate: 72 },
    { stage: "Clicked Email Link", users: 3420, conversionRate: 38 },
    { stage: "Visited Product Page", users: 2180, conversionRate: 64 },
    { stage: "Added to Cart", users: 980, conversionRate: 45 },
    { stage: "Completed Purchase", users: 578, conversionRate: 59 }
  ],
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email': return '📧';
    case 'sms': return '📱';
    case 'whatsapp': return '💬';
    default: return '📢';
  }
};

interface JourneyAnalyticsClientProps {
  params: {
    journeyId: string;
  };
}

export default function JourneyAnalyticsClient({ params }: JourneyAnalyticsClientProps) {
  const { journeyId } = params;
  const [selectedDateRange, setSelectedDateRange] = useState("7d");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/journey-builder">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Journey Analytics</h1>
              <p className="text-muted-foreground">
                {journeyAnalytics.name} - Performance insights and metrics
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              {journeyAnalytics.status}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{journeyAnalytics.overview.totalEntries.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{journeyAnalytics.overview.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{journeyAnalytics.overview.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{journeyAnalytics.overview.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.4%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="funnel">Funnel Analysis</TabsTrigger>
            <TabsTrigger value="channels">Channel Performance</TabsTrigger>
            <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Journey Flow Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyAnalytics.flowPerformance.map((step, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{step.step}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${step.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{step.completionRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeyAnalytics.channelPerformance.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{channel.icon}</span>
                          <div>
                            <span className="font-medium">{channel.name}</span>
                            <p className="text-xs text-muted-foreground">{channel.sent.toLocaleString()} sent</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{channel.openRate}%</div>
                          <p className="text-xs text-muted-foreground">Open Rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Funnel Analysis */}
          <TabsContent value="funnel" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Funnel</CardTitle>
                <p className="text-muted-foreground">
                  Track how customers progress through each stage of the journey
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {journeyAnalytics.funnelData.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{stage.stage}</h4>
                        <div className="text-right">
                          <span className="font-semibold">{stage.users.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-2">({stage.conversionRate}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-8">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-blue-400 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ width: `${(stage.users / journeyAnalytics.funnelData[0].users) * 100}%` }}
                        >
                          {stage.users.toLocaleString()}
                        </div>
                      </div>
                      {index < journeyAnalytics.funnelData.length - 1 && (
                        <div className="flex justify-center mt-2 mb-2">
                          <div className="text-muted-foreground text-sm">
                            ↓ {Math.round((journeyAnalytics.funnelData[index + 1].users / stage.users) * 100)}% continue
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Channel Performance */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {journeyAnalytics.channelPerformance.map((channel, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{channel.icon}</span>
                      <span>{channel.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 grid-cols-2">
                      <div>
                        <p className="text-2xl font-bold">{channel.sent.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Messages Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{channel.openRate}%</p>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{channel.clickRate}%</p>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{channel.conversionRate}%</p>
                        <p className="text-xs text-muted-foreground">Conversion Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cohort Analysis */}
          <TabsContent value="cohorts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cohort Retention Analysis</CardTitle>
                <p className="text-muted-foreground">
                  Track customer retention rates by entry month
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left">Cohort</th>
                        <th className="border border-gray-200 p-3 text-center">Size</th>
                        <th className="border border-gray-200 p-3 text-center">Day 1</th>
                        <th className="border border-gray-200 p-3 text-center">Day 7</th>
                        <th className="border border-gray-200 p-3 text-center">Day 30</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">Jan 2024</td>
                        <td className="border border-gray-200 p-3 text-center">1,250</td>
                        <td className="border border-gray-200 p-3 text-center bg-green-100">89%</td>
                        <td className="border border-gray-200 p-3 text-center bg-yellow-100">64%</td>
                        <td className="border border-gray-200 p-3 text-center bg-orange-100">41%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">Feb 2024</td>
                        <td className="border border-gray-200 p-3 text-center">1,480</td>
                        <td className="border border-gray-200 p-3 text-center bg-green-100">91%</td>
                        <td className="border border-gray-200 p-3 text-center bg-yellow-100">67%</td>
                        <td className="border border-gray-200 p-3 text-center bg-orange-100">44%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">Mar 2024</td>
                        <td className="border border-gray-200 p-3 text-center">1,320</td>
                        <td className="border border-gray-200 p-3 text-center bg-green-100">93%</td>
                        <td className="border border-gray-200 p-3 text-center bg-yellow-100">69%</td>
                        <td className="border border-gray-200 p-3 text-center bg-orange-100">47%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
}
