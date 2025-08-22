"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  X,
  Calendar,
  DollarSign,
  Zap,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface JourneyAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stageAnalytics = [
  {
    stage: 'Awareness',
    customers: 245,
    avgDuration: 7,
    conversionRate: 85,
    dropoffRate: 15,
    trend: 'up'
  },
  {
    stage: 'Consideration', 
    customers: 208,
    avgDuration: 21,
    conversionRate: 78,
    dropoffRate: 22,
    trend: 'up'
  },
  {
    stage: 'Purchase',
    customers: 162,
    avgDuration: 14,
    conversionRate: 92,
    dropoffRate: 8,
    trend: 'stable'
  },
  {
    stage: 'Onboarding',
    customers: 149,
    avgDuration: 10,
    conversionRate: 88,
    dropoffRate: 12,
    trend: 'down'
  },
  {
    stage: 'Adoption',
    customers: 131,
    avgDuration: 30,
    conversionRate: 73,
    dropoffRate: 27,
    trend: 'up'
  },
  {
    stage: 'Expansion',
    customers: 96,
    avgDuration: 45,
    conversionRate: 65,
    dropoffRate: 35,
    trend: 'stable'
  },
  {
    stage: 'Advocacy',
    customers: 62,
    avgDuration: 60,
    conversionRate: 45,
    dropoffRate: 55,
    trend: 'up'
  }
];

const touchpointAnalytics = [
  { name: 'Website Visit', interactions: 1250, conversionRate: 12.5, satisfaction: 4.2 },
  { name: 'Email Campaign', interactions: 890, conversionRate: 18.3, satisfaction: 3.8 },
  { name: 'Sales Call', interactions: 456, conversionRate: 45.2, satisfaction: 4.6 },
  { name: 'Product Demo', interactions: 234, conversionRate: 67.8, satisfaction: 4.8 },
  { name: 'Support Ticket', interactions: 187, conversionRate: 8.9, satisfaction: 3.9 },
  { name: 'Training Session', interactions: 145, conversionRate: 78.9, satisfaction: 4.7 }
];

const cohortData = [
  { period: 'Jan 2024', customers: 45, avgScore: 78, value: 2150000, retention: 89 },
  { period: 'Feb 2024', customers: 52, avgScore: 82, value: 2680000, retention: 92 },
  { period: 'Mar 2024', customers: 38, avgScore: 75, value: 1950000, retention: 85 },
  { period: 'Apr 2024', customers: 61, avgScore: 84, value: 3100000, retention: 94 },
  { period: 'May 2024', customers: 47, avgScore: 79, value: 2380000, retention: 87 },
  { period: 'Jun 2024', customers: 55, avgScore: 86, value: 2750000, retention: 96 }
];

export const JourneyAnalyticsModal: React.FC<JourneyAnalyticsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <ArrowRight className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">Journey Analytics</h2>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="text-sm border rounded-md px-3 py-1"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <button
              onClick={onClose}
              className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stages">Stage Analysis</TabsTrigger>
                <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
                <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Journeys</p>
                          <p className="text-2xl font-bold">1,247</p>
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +12.5% vs last period
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg Journey Score</p>
                          <p className="text-2xl font-bold">82.3</p>
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +3.2 points
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Avg Time to Convert</p>
                          <p className="text-2xl font-bold">47d</p>
                          <p className="text-xs text-red-600 flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            +5 days
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                          <p className="text-2xl font-bold">68%</p>
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +2.8%
                          </p>
                        </div>
                        <Target className="h-8 w-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Journey Flow Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Journey Flow Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stageAnalytics.slice(0, 5).map((stage, index) => (
                        <div key={stage.stage} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-800">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{stage.stage}</h4>
                              <p className="text-sm text-gray-600">{stage.customers} customers</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{stage.conversionRate}% conversion</p>
                              <p className="text-xs text-gray-600">{stage.avgDuration}d avg duration</p>
                            </div>
                            {getTrendIcon(stage.trend)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stages" className="space-y-6">
                <div className="grid gap-6">
                  {stageAnalytics.map((stage) => (
                    <Card key={stage.stage}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">{stage.stage}</h3>
                            {getTrendIcon(stage.trend)}
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {stage.customers} customers
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-gray-600">Conversion Rate</p>
                            <p className="text-xl font-bold text-green-600">{stage.conversionRate}%</p>
                            <Progress value={stage.conversionRate} className="h-2 mt-2" />
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <p className="text-sm text-gray-600">Avg Duration</p>
                            <p className="text-xl font-bold text-purple-600">{stage.avgDuration}d</p>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-gray-600">Drop-off Rate</p>
                            <p className="text-xl font-bold text-red-600">{stage.dropoffRate}%</p>
                            <Progress value={stage.dropoffRate} className="h-2 mt-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="touchpoints" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Touchpoint Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {touchpointAnalytics.map((touchpoint) => (
                        <div key={touchpoint.name} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{touchpoint.name}</h4>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{touchpoint.satisfaction}/5</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Total Interactions</p>
                              <p className="text-lg font-semibold">{touchpoint.interactions.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Conversion Rate</p>
                              <p className="text-lg font-semibold text-green-600">{touchpoint.conversionRate}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Satisfaction Score</p>
                              <div className="flex items-center gap-2">
                                <p className="text-lg font-semibold">{touchpoint.satisfaction}/5</p>
                                {touchpoint.satisfaction >= 4.5 ? (
                                  <ThumbsUp className="w-4 h-4 text-green-600" />
                                ) : touchpoint.satisfaction >= 4.0 ? (
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <ThumbsDown className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cohorts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Cohort Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cohortData.map((cohort) => (
                        <div key={cohort.period} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{cohort.period}</h4>
                            <Badge variant="outline">{cohort.customers} customers</Badge>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-gray-600">Avg Score</p>
                              <p className="text-lg font-semibold text-blue-600">{cohort.avgScore}</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-gray-600">Total Value</p>
                              <p className="text-lg font-semibold text-green-600">{formatCurrency(cohort.value)}</p>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm text-gray-600">Retention Rate</p>
                              <p className="text-lg font-semibold text-purple-600">{cohort.retention}%</p>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded-lg">
                              <p className="text-sm text-gray-600">Avg Value</p>
                              <p className="text-lg font-semibold text-orange-600">{formatCurrency(cohort.value / cohort.customers)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Key Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <h4 className="font-medium text-green-800">Positive Trend</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          Overall journey completion rate has improved by 12.5% compared to the previous period, 
                          indicating better customer experience and engagement.
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <h4 className="font-medium text-blue-800">Optimization Opportunity</h4>
                        </div>
                        <p className="text-sm text-blue-700">
                          The Adoption stage shows the highest drop-off rate (27%). Focus on improving 
                          onboarding processes and user training to increase adoption success.
                        </p>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-5 h-5 text-purple-600" />
                          <h4 className="font-medium text-purple-800">High-Performance Touchpoint</h4>
                        </div>
                        <p className="text-sm text-purple-700">
                          Product Demo has the highest conversion rate (67.8%) and satisfaction score (4.8/5). 
                          Consider increasing demo opportunities for prospects.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3 p-3 border-l-4 border-orange-500 bg-orange-50">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-orange-600">1</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-800">Improve Adoption Stage</h5>
                          <p className="text-sm text-orange-700">
                            Implement personalized onboarding flows and increase check-in frequency during the first 30 days.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">2</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-blue-800">Optimize Email Campaigns</h5>
                          <p className="text-sm text-blue-700">
                            Email satisfaction is below average (3.8/5). A/B test subject lines and content to improve engagement.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">3</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-800">Scale Product Demos</h5>
                          <p className="text-sm text-green-700">
                            Increase demo capacity and consider automated demo options to capture more high-converting leads.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};