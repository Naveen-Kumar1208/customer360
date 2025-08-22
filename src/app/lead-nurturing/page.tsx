"use client";

import React from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  UserCheck,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  RefreshCw,
  Mail,
  MessageSquare,
  Phone
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const dropOffData = [
  { stage: "Landing Page", users: 10000, dropoff: 0 },
  { stage: "Product Selection", users: 7500, dropoff: 2500 },
  { stage: "Personal Details", users: 5200, dropoff: 2300 },
  { stage: "Document Upload", users: 3100, dropoff: 2100 },
  { stage: "Verification", users: 2400, dropoff: 700 },
  { stage: "Completion", users: 2200, dropoff: 200 },
];

const retargetingPerformance = [
  { campaign: "Loan Application Recovery", sent: 4500, engaged: 1800, converted: 450, roi: 320 },
  { campaign: "Insurance Quote Follow-up", sent: 3200, engaged: 1280, converted: 256, roi: 280 },
  { campaign: "Credit Card Abandonment", sent: 5800, engaged: 2320, converted: 580, roi: 420 },
  { campaign: "Investment Product Interest", sent: 2100, engaged: 945, converted: 189, roi: 380 },
];

const segmentPerformance = [
  { segment: "High Intent", recovery: 45, time: 2.5 },
  { segment: "Medium Intent", recovery: 28, time: 5.2 },
  { segment: "Low Intent", recovery: 12, time: 8.7 },
  { segment: "Re-engaged", recovery: 35, time: 3.8 },
];

const channelEffectiveness = [
  { channel: "Email", effectiveness: 72 },
  { channel: "SMS", effectiveness: 65 },
  { channel: "WhatsApp", effectiveness: 88 },
  { channel: "Push", effectiveness: 78 },
  { channel: "Call", effectiveness: 92 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function LeadNurturing() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Lead Nurturing & Retargeting</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drop-offs</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7,800</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">78%</span> of total visitors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Recovery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-1.3 days</span> improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345%</div>
            <p className="text-xs text-muted-foreground">
              Average across all campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dropoff" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dropoff">Drop-off Analysis</TabsTrigger>
          <TabsTrigger value="campaigns">Retargeting Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Segment Performance</TabsTrigger>
          <TabsTrigger value="channels">Channel Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="dropoff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Funnel Drop-off</CardTitle>
              <CardDescription>User journey stages and abandonment points</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={dropOffData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#3b82f6" name="Remaining Users" />
                  <Bar dataKey="dropoff" fill="#ef4444" name="Drop-offs" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {dropOffData.slice(1).map((stage, index) => (
                  <div key={stage.stage} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={stage.dropoff > 1000 ? "destructive" : "secondary"}>
                        {stage.dropoff > 1000 ? "High" : "Normal"}
                      </Badge>
                      <span className="text-sm font-medium">{stage.stage}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stage.dropoff.toLocaleString()} drop-offs ({((stage.dropoff / dropOffData[index].users) * 100).toFixed(1)}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Retargeting Campaigns</CardTitle>
              <CardDescription>Performance metrics for ongoing recovery campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retargetingPerformance.map((campaign) => (
                  <div key={campaign.campaign} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{campaign.campaign}</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {campaign.roi}% ROI
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engaged</p>
                        <p className="font-medium">{campaign.engaged.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Converted</p>
                        <p className="font-medium">{campaign.converted.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion Rate</p>
                        <p className="font-medium">{((campaign.converted / campaign.sent) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    <Progress value={(campaign.converted / campaign.sent) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recovery Rate by Segment</CardTitle>
                <CardDescription>Lead recovery performance across different intent levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={segmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="recovery" fill="#10b981" name="Recovery Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Recovery Time</CardTitle>
                <CardDescription>Days to convert after drop-off by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={segmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#f59e0b" strokeWidth={2} name="Days" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Effectiveness for Retargeting</CardTitle>
              <CardDescription>Success rate by communication channel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={channelEffectiveness}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="channel" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Effectiveness" dataKey="effectiveness" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {channelEffectiveness.map((channel, index) => (
                    <div key={channel.channel} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        <span className="font-medium">{channel.channel}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={channel.effectiveness} className="w-24 h-2" />
                        <span className="text-sm font-medium">{channel.effectiveness}%</span>
                      </div>
                    </div>
                  ))}
                </div>
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