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
  Zap, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Bell,
  TrendingUp,
  Target,
  Users,
  ArrowUp,
  ArrowDown,
  BarChart3,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
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
  Legend
} from "recharts";

const engagementData = [
  { month: "Jan", email: 65, sms: 45, push: 78, whatsapp: 52, web: 89 },
  { month: "Feb", email: 68, sms: 48, push: 82, whatsapp: 58, web: 92 },
  { month: "Mar", email: 72, sms: 52, push: 85, whatsapp: 62, web: 94 },
  { month: "Apr", email: 78, sms: 58, push: 88, whatsapp: 68, web: 96 },
  { month: "May", email: 82, sms: 62, push: 90, whatsapp: 72, web: 97 },
  { month: "Jun", email: 85, sms: 65, push: 92, whatsapp: 75, web: 98 },
];

const channelPerformance = [
  { channel: "Email", engagement: 85, conversion: 12, color: "#3b82f6" },
  { channel: "WhatsApp", engagement: 75, conversion: 18, color: "#10b981" },
  { channel: "SMS", engagement: 65, conversion: 8, color: "#f59e0b" },
  { channel: "Push", engagement: 92, conversion: 15, color: "#8b5cf6" },
  { channel: "Web", engagement: 98, conversion: 22, color: "#ef4444" },
];

const productRecommendations = [
  { product: "Premium Credit Card", targeted: 15420, converted: 2468, rate: 16 },
  { product: "Home Loan Top-up", targeted: 8750, converted: 1312, rate: 15 },
  { product: "Mutual Fund SIP", targeted: 22100, converted: 5525, rate: 25 },
  { product: "Term Insurance", targeted: 18500, converted: 2405, rate: 13 },
  { product: "Personal Loan", targeted: 12300, converted: 2214, rate: 18 },
];

const activeChannels = [
  { icon: Mail, name: "Email", status: "active", messages: "2.3M", engagement: "85%" },
  { icon: MessageSquare, name: "WhatsApp", status: "active", messages: "1.8M", engagement: "75%" },
  { icon: Smartphone, name: "SMS", status: "active", messages: "1.2M", engagement: "65%" },
  { icon: Bell, name: "Push", status: "active", messages: "3.1M", engagement: "92%" },
  { icon: Globe, name: "Web", status: "active", messages: "4.5M", engagement: "98%" },
];

export default function PersonalizationHub() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Personalization Hub</h2>
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
            <Zap className="mr-2 h-4 w-4" />
            Configure Channels
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Channels</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              All channels operational
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.9M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from baseline
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="channels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="channels">Channel Performance</TabsTrigger>
          <TabsTrigger value="recommendations">Product Recommendations</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Channels</CardTitle>
                <CardDescription>Real-time channel status and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChannels.map((channel) => (
                    <div key={channel.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <channel.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{channel.name}</p>
                          <p className="text-xs text-muted-foreground">{channel.messages} messages</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {channel.engagement}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Engagement vs Conversion by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={channelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#3b82f6" name="Engagement %" />
                    <Bar dataKey="conversion" fill="#10b981" name="Conversion %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Recommendation Performance</CardTitle>
              <CardDescription>AI-powered cross-sell and upsell recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productRecommendations.map((product) => (
                  <div key={product.product} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{product.product}</p>
                      <Badge variant="outline">{product.rate}% conversion</Badge>
                    </div>
                    <Progress value={product.rate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Targeted: {product.targeted.toLocaleString()}</span>
                      <span>Converted: {product.converted.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Channel Engagement Trends</CardTitle>
              <CardDescription>6-month engagement rate comparison across channels</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="web" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="push" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="email" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="sms" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
      </StaticExportLayout>
    </>
  );
}