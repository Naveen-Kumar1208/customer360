"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Calendar,
  Star,
  Target,
  Activity,
  Zap,
  Clock,
  Award,
  Users,
  Eye
} from "lucide-react";
import type { Customer } from "@/contexts/LeadContext";

interface CustomerAnalyticsProps {
  customer: Customer;
}

export const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ customer }) => {
  // Calculate analytics metrics
  const avgOrderValue = customer.orderCount > 0 ? customer.totalSpent / customer.orderCount : 0;
  const purchaseFrequency = customer.orderCount / 12; // orders per month (assuming 1 year)
  const customerScore = Math.min(100, Math.round((customer.totalSpent / 1000) + (customer.orderCount * 5) + (customer.lifetimeValue / 1000)));
  const retentionRate = Math.max(60, Math.min(95, 70 + (customer.orderCount * 2)));
  const engagementScore = Math.max(40, Math.min(100, 50 + (customer.totalSpent / 100)));

  // Generate mock time-series data
  const monthlySpending = [
    { month: 'Jan', amount: Math.round(customer.totalSpent * 0.08) },
    { month: 'Feb', amount: Math.round(customer.totalSpent * 0.12) },
    { month: 'Mar', amount: Math.round(customer.totalSpent * 0.15) },
    { month: 'Apr', amount: Math.round(customer.totalSpent * 0.09) },
    { month: 'May', amount: Math.round(customer.totalSpent * 0.18) },
    { month: 'Jun', amount: Math.round(customer.totalSpent * 0.14) },
    { month: 'Jul', amount: Math.round(customer.totalSpent * 0.11) },
    { month: 'Aug', amount: Math.round(customer.totalSpent * 0.13) }
  ];

  const maxAmount = Math.max(...monthlySpending.map(m => m.amount));

  // Risk and opportunity assessment
  const getRiskLevel = () => {
    const daysSinceLastLogin = Math.floor(Math.random() * 30) + 1;
    if (daysSinceLastLogin > 20) return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    if (daysSinceLastLogin > 10) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const riskLevel = getRiskLevel();

  // Predictions and insights
  const insights = [
    {
      type: 'opportunity',
      title: 'Upsell Opportunity',
      description: 'Customer shows high engagement and is likely to upgrade',
      confidence: 85,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      type: 'retention',
      title: 'Strong Retention Signal',
      description: 'Regular purchase pattern indicates high loyalty',
      confidence: 92,
      icon: Star,
      color: 'text-[#e85b5e]'
    },
    {
      type: 'cross-sell',
      title: 'Cross-sell Potential',
      description: 'Based on similar customer preferences',
      confidence: 76,
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Score</p>
                <p className="text-2xl font-bold">{customerScore}/100</p>
                <Progress value={customerScore} className="mt-2" />
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold">{retentionRate}%</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  Above average
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Score</p>
                <p className="text-2xl font-bold">{engagementScore}%</p>
                <Progress value={engagementScore} className="mt-2" />
              </div>
              <Activity className="h-8 w-8 text-[#e85b5e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Purchase Frequency</p>
                <p className="text-2xl font-bold">{purchaseFrequency.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">orders/month</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Spending Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlySpending.map((month, index) => (
                <div key={month.month} className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium text-muted-foreground">
                    {month.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-4 bg-red-200 rounded-full flex-1 mr-3">
                        <div 
                          className="h-4 bg-[#e85b5e] rounded-full transition-all duration-300"
                          style={{ width: `${(month.amount / maxAmount) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">${month.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-red-800">Total Spending Trend</div>
              <div className="text-xs text-[#e85b5e]">
                {customer.totalSpent > 50000 ? 'High value customer' : 'Growing spending pattern'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Customer Health Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Purchase Consistency</span>
                <span className="text-sm text-green-600">Excellent</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Engagement Level</span>
                <span className="text-sm text-[#e85b5e]">High</span>
              </div>
              <Progress value={engagementScore} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Support Satisfaction</span>
                <span className="text-sm text-green-600">Positive</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>

            <div className={`p-3 rounded-lg ${riskLevel.bg}`}>
              <div className={`text-sm font-medium ${riskLevel.color}`}>
                Churn Risk: {riskLevel.level}
              </div>
              <div className={`text-xs ${riskLevel.color}`}>
                Based on activity patterns and engagement metrics
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI-Powered Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 mt-1 ${insight.color}`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={insight.confidence} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavioral Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Behavioral Patterns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">Preferred Purchase Day</div>
                <div className="text-xs text-muted-foreground">Most active shopping day</div>
              </div>
              <Badge variant="outline">Tuesday</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">Peak Activity Hours</div>
                <div className="text-xs text-muted-foreground">Most engaged time period</div>
              </div>
              <Badge variant="outline">2-4 PM</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">Communication Preference</div>
                <div className="text-xs text-muted-foreground">Preferred contact method</div>
              </div>
              <Badge variant="outline">Email</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">Device Preference</div>
                <div className="text-xs text-muted-foreground">Primary shopping device</div>
              </div>
              <Badge variant="outline">Mobile</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Next Best Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Immediate Opportunity</span>
              </div>
              <p className="text-xs text-green-700">Send personalized product recommendation based on recent browsing</p>
            </div>
            
            <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-[#e85b5e]" />
                <span className="text-sm font-medium text-red-800">Loyalty Program</span>
              </div>
              <p className="text-xs text-red-700">Invite to premium tier based on spending history</p>
            </div>
            
            <div className="p-3 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Engagement</span>
              </div>
              <p className="text-xs text-purple-700">Schedule follow-up call to discuss account optimization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};