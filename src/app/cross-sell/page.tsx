"use client";

import React from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Users,
  Target,
  Sparkles,
  BarChart3,
  PieChart,
  ArrowUpRight,
  Package,
  CreditCard,
  Home,
  Shield,
  Briefcase
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  Legend,
  Treemap
} from "recharts";

const productOpportunities = [
  {
    product: "Premium Credit Card",
    currentCustomers: 125000,
    eligibleCustomers: 450000,
    avgValue: 2500,
    conversionRate: 16,
    propensityScore: 8.5,
    icon: CreditCard,
    color: "#3b82f6"
  },
  {
    product: "Home Loan Top-up",
    currentCustomers: 85000,
    eligibleCustomers: 210000,
    avgValue: 150000,
    conversionRate: 12,
    propensityScore: 7.2,
    icon: Home,
    color: "#10b981"
  },
  {
    product: "Term Insurance",
    currentCustomers: 95000,
    eligibleCustomers: 580000,
    avgValue: 35000,
    conversionRate: 8,
    propensityScore: 6.8,
    icon: Shield,
    color: "#f59e0b"
  },
  {
    product: "Investment Advisory",
    currentCustomers: 45000,
    eligibleCustomers: 120000,
    avgValue: 250000,
    conversionRate: 22,
    propensityScore: 9.1,
    icon: Briefcase,
    color: "#8b5cf6"
  }
];

const crossSellPerformance = [
  { month: "Jan", opportunities: 12500, converted: 1875, revenue: 4.2 },
  { month: "Feb", opportunities: 14200, converted: 2272, revenue: 5.1 },
  { month: "Mar", opportunities: 15800, converted: 2685, revenue: 6.0 },
  { month: "Apr", opportunities: 17500, converted: 3150, revenue: 7.1 },
  { month: "May", opportunities: 19200, converted: 3648, revenue: 8.2 },
  { month: "Jun", opportunities: 21000, converted: 4200, revenue: 9.5 },
];

const customerSegments = [
  { name: "High Value", size: 15000, opportunity: 85, avgProducts: 4.2 },
  { name: "Growth", size: 45000, opportunity: 72, avgProducts: 2.8 },
  { name: "Emerging", size: 120000, opportunity: 58, avgProducts: 1.5 },
  { name: "New", size: 85000, opportunity: 45, avgProducts: 1.1 }
];

const recommendationEffectiveness = [
  { name: "AI Model", accuracy: 92, adoption: 78, revenue: 8.5 },
  { name: "Rule-based", accuracy: 68, adoption: 45, revenue: 4.2 },
  { name: "Manual", accuracy: 55, adoption: 32, revenue: 2.8 }
];

export default function CrossSellUpsell() {
  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cross-sell & Upsell Engine</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Configure AI Model
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.36M</div>
            <p className="text-xs text-muted-foreground">
              Eligible customers identified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.2%</span> vs manual targeting
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42.5M</div>
            <p className="text-xs text-muted-foreground">
              Last 6 months
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Products/Customer</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.6</span> increase YoY
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Product Opportunities</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="effectiveness">Model Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {productOpportunities.map((product) => (
              <Card key={product.product}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${product.color}20` }}>
                        <product.icon className="h-5 w-5" style={{ color: product.color }} />
                      </div>
                      <CardTitle className="text-lg">{product.product}</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Score: {product.propensityScore}/10
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Eligible Customers</p>
                        <p className="text-xl font-bold">{(product.eligibleCustomers / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Avg. Value</p>
                        <p className="text-xl font-bold">${(product.avgValue / 1000).toFixed(0)}K</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Market Penetration</span>
                        <span>{((product.currentCustomers / product.eligibleCustomers) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={(product.currentCustomers / product.eligibleCustomers) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Expected Conversion</p>
                        <p className="font-medium">{product.conversionRate}%</p>
                      </div>
                      <Button size="sm">
                        Launch Campaign
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-sell Performance Trends</CardTitle>
              <CardDescription>Monthly opportunities, conversions, and revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={crossSellPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="opportunities"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="Opportunities"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="converted"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    name="Converted"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                    name="Revenue ($M)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segment Analysis</CardTitle>
                <CardDescription>Cross-sell opportunities by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment) => (
                    <div key={segment.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{segment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(segment.size / 1000).toFixed(0)}K customers • {segment.avgProducts} products avg
                          </p>
                        </div>
                        <Badge variant="outline">{segment.opportunity}% opportunity</Badge>
                      </div>
                      <Progress value={segment.opportunity} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segment Potential</CardTitle>
                <CardDescription>Revenue opportunity by customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="10%" 
                    outerRadius="90%" 
                    data={customerSegments}
                  >
                    <RadialBar
                      dataKey="opportunity"
                      cornerRadius={10}
                      fill="#3b82f6"
                      label={{ position: 'insideStart', fill: '#fff' }}
                    />
                    <Legend />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="effectiveness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation Model Performance</CardTitle>
              <CardDescription>Comparing AI vs traditional approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={recommendationEffectiveness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
                    <Bar dataKey="adoption" fill="#10b981" name="Adoption %" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-3 gap-4">
                  {recommendationEffectiveness.map((model) => (
                    <div key={model.name} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-2xl font-bold mt-2">${model.revenue}M</p>
                      <p className="text-sm text-muted-foreground">Revenue Impact</p>
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