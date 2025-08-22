"use client";

import React from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  RefreshCw,
  AlertTriangle,
  TrendingDown,
  Users,
  Clock,
  Target,
  Activity,
  BarChart3,
  ArrowDown,
  ArrowUp,
  FileText,
  CreditCard,
  Home,
  Shield
} from "lucide-react";
import {
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";

const dropOffPoints = [
  {
    stage: "Product Browse",
    totalUsers: 100000,
    dropoffs: 35000,
    rate: 35,
    avgTimeSpent: "2m 15s",
    primaryReason: "Complex product comparison"
  },
  {
    stage: "Application Start",
    totalUsers: 65000,
    dropoffs: 18000,
    rate: 27.7,
    avgTimeSpent: "5m 30s",
    primaryReason: "Too many fields required"
  },
  {
    stage: "Personal Details",
    totalUsers: 47000,
    dropoffs: 12000,
    rate: 25.5,
    avgTimeSpent: "8m 45s",
    primaryReason: "Privacy concerns"
  },
  {
    stage: "Document Upload",
    totalUsers: 35000,
    dropoffs: 15000,
    rate: 42.9,
    avgTimeSpent: "12m 20s",
    primaryReason: "Technical difficulties"
  },
  {
    stage: "Verification",
    totalUsers: 20000,
    dropoffs: 3000,
    rate: 15,
    avgTimeSpent: "4m 10s",
    primaryReason: "Waiting time"
  },
  {
    stage: "Completion",
    totalUsers: 17000,
    dropoffs: 0,
    rate: 0,
    avgTimeSpent: "1m 30s",
    primaryReason: "N/A"
  }
];

const recoveryChannels = [
  { channel: "Email", attempts: 45000, recovered: 9000, rate: 20, avgTime: "2.5 days" },
  { channel: "SMS", attempts: 38000, recovered: 6840, rate: 18, avgTime: "1.8 days" },
  { channel: "WhatsApp", attempts: 52000, recovered: 13520, rate: 26, avgTime: "1.2 days" },
  { channel: "Phone Call", attempts: 15000, recovered: 5250, rate: 35, avgTime: "0.5 days" },
  { channel: "Push Notification", attempts: 28000, recovered: 4480, rate: 16, avgTime: "3.1 days" }
];

const productDropoffs = [
  { product: "Personal Loan", icon: FileText, dropoffs: 12500, recovered: 3750, trend: "up" },
  { product: "Credit Card", icon: CreditCard, dropoffs: 18200, recovered: 4550, trend: "down" },
  { product: "Home Loan", icon: Home, dropoffs: 8900, recovered: 3115, trend: "up" },
  { product: "Insurance", icon: Shield, dropoffs: 15400, recovered: 3080, trend: "stable" }
];

const hourlyPattern = [
  { hour: "00", dropoffs: 120 },
  { hour: "02", dropoffs: 85 },
  { hour: "04", dropoffs: 65 },
  { hour: "06", dropoffs: 95 },
  { hour: "08", dropoffs: 280 },
  { hour: "10", dropoffs: 420 },
  { hour: "12", dropoffs: 380 },
  { hour: "14", dropoffs: 350 },
  { hour: "16", dropoffs: 410 },
  { hour: "18", dropoffs: 520 },
  { hour: "20", dropoffs: 450 },
  { hour: "22", dropoffs: 280 }
];

export default function DropOffRecovery() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Drop-off Recovery Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Configure Recovery
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          High drop-off rate detected at Document Upload stage (42.9%). Immediate action recommended.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drop-offs</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">83%</span> of total traffic
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Recovery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.5 days</span> faster
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Recovered</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funnel" className="space-y-4">
        <TabsList>
          <TabsTrigger value="funnel">Drop-off Funnel</TabsTrigger>
          <TabsTrigger value="recovery">Recovery Channels</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Drop-off Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Funnel Drop-off Analysis</CardTitle>
              <CardDescription>Identify critical abandonment points in the customer journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={80}>
                  <FunnelChart>
                    <Tooltip />
                    <Funnel
                      dataKey="totalUsers"
                      data={dropOffPoints}
                      isAnimationActive
                    >
                      <LabelList position="center" fill="#fff" />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {dropOffPoints.map((point, index) => (
                    <div key={point.stage} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{point.stage}</h4>
                          <p className="text-sm text-muted-foreground">
                            {point.totalUsers.toLocaleString()} users • {point.avgTimeSpent} avg time
                          </p>
                        </div>
                        {point.dropoffs > 0 && (
                          <div className="text-right">
                            <Badge variant={point.rate > 30 ? "destructive" : "secondary"}>
                              {point.dropoffs.toLocaleString()} drop-offs
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{point.rate}% rate</p>
                          </div>
                        )}
                      </div>
                      {point.dropoffs > 0 && (
                        <>
                          <Progress value={point.rate} className="h-2 mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Primary reason: {point.primaryReason}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Channel Performance</CardTitle>
              <CardDescription>Effectiveness of different recovery channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recoveryChannels.map((channel) => (
                  <div key={channel.channel} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{channel.channel}</p>
                        <p className="text-sm text-muted-foreground">
                          {channel.attempts.toLocaleString()} attempts • {channel.avgTime} avg recovery
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{channel.recovered.toLocaleString()} recovered</p>
                        <Badge variant="outline" className={channel.rate > 25 ? "bg-green-50 text-green-700" : ""}>
                          {channel.rate}% success rate
                        </Badge>
                      </div>
                    </div>
                    <Progress value={channel.rate} max={40} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Recovery Recommendations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Phone calls show highest recovery rate (35%) - consider increasing outbound capacity</li>
                  <li>• WhatsApp messages have fastest recovery time (1.2 days) - prioritize for time-sensitive cases</li>
                  <li>• Email campaigns need optimization - current 20% rate is below target</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {productDropoffs.map((product) => (
              <Card key={product.product}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <product.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{product.product}</CardTitle>
                    </div>
                    {product.trend === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
                    {product.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Drop-offs</span>
                      <span className="font-medium">{product.dropoffs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Recovered</span>
                      <span className="font-medium">{product.recovered.toLocaleString()}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Recovery Rate</span>
                        <span>{((product.recovered / product.dropoffs) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={(product.recovered / product.dropoffs) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Drop-off Pattern Analysis</CardTitle>
              <CardDescription>Hourly distribution of drop-offs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hourlyPattern}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="dropoffs"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Peak Drop-off Hours</h4>
                  <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM (520 drop-offs/hour)</p>
                  <p className="text-xs text-muted-foreground mt-1">Consider increasing support during these hours</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Lowest Drop-off Hours</h4>
                  <p className="text-sm text-muted-foreground">4:00 AM - 6:00 AM (65 drop-offs/hour)</p>
                  <p className="text-xs text-muted-foreground mt-1">Optimal time for system maintenance</p>
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