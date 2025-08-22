"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  Building2,
  Target,
  BarChart3,
  Settings,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { mockUsageData, mockPersonData, mockCompanyData, mockProspectData } from '@/lib/data/lusha-mock';

interface LushaDashboardProps {
  className?: string;
}

interface QuickStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

const quickStats: QuickStat[] = [
  {
    label: 'Credits Used Today',
    value: mockUsageData.apiCallsToday,
    change: '+12%',
    trend: 'up',
    icon: <Zap className="h-5 w-5" />,
    color: 'text-blue-600 bg-blue-100'
  },
  {
    label: 'Success Rate',
    value: `${mockUsageData.successRate}%`,
    change: '+2.1%',
    trend: 'up',
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-green-600 bg-green-100'
  },
  {
    label: 'Avg Response Time',
    value: `${mockUsageData.averageResponseTime}s`,
    change: '-0.3s',
    trend: 'down',
    icon: <Clock className="h-5 w-5" />,
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    label: 'Active Prospects',
    value: mockProspectData.length,
    change: '+5',
    trend: 'up',
    icon: <Users className="h-5 w-5" />,
    color: 'text-purple-600 bg-purple-100'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'person_enriched',
    description: 'Enriched contact: Sarah Johnson',
    time: '2 minutes ago',
    success: true
  },
  {
    id: 2,
    type: 'bulk_completed',
    description: 'Bulk job "Q1 Lead List" completed (462/500)',
    time: '1 hour ago',
    success: true
  },
  {
    id: 3,
    type: 'company_enriched',
    description: 'Updated company profile: TechCorp Solutions',
    time: '2 hours ago',
    success: true
  },
  {
    id: 4,
    type: 'prospect_scored',
    description: 'New high-value prospect identified',
    time: '3 hours ago',
    success: true
  },
  {
    id: 5,
    type: 'api_error',
    description: 'Rate limit exceeded - processing delayed',
    time: '4 hours ago',
    success: false
  }
];

export function LushaDashboard({ className }: LushaDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const creditUsagePercentage = (mockUsageData.usedCredits / mockUsageData.totalCredits) * 100;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lusha Integration</h1>
          <p className="text-gray-600 mt-1">Comprehensive B2B contact intelligence platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <Badge variant="outline" className={`ml-2 text-xs ${
                        stat.trend === 'up' ? 'text-green-600 border-green-200' : 
                        stat.trend === 'down' ? 'text-red-600 border-red-200' : 
                        'text-gray-600 border-gray-200'
                      }`}>
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>People</span>
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Companies</span>
          </TabsTrigger>
          <TabsTrigger value="prospects" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Prospects</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Credit Usage Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Credit Usage Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Credits Used</p>
                      <p className="text-2xl font-bold">
                        {mockUsageData.usedCredits.toLocaleString()} / {mockUsageData.totalCredits.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="text-xl font-semibold text-green-600">
                        {mockUsageData.remainingCredits.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${creditUsagePercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    {mockUsageData.topFeatures.map((feature, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs text-gray-600">{feature.feature}</p>
                        <p className="text-lg font-semibold">{feature.usage}</p>
                        <p className="text-xs text-gray-500">{feature.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`mt-1 w-2 h-2 rounded-full ${
                        activity.success ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <User className="h-6 w-6" />
                  <span>Enrich Person</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Building2 className="h-6 w-6" />
                  <span>Search Companies</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Target className="h-6 w-6" />
                  <span>Find Prospects</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>View Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Person Enrichment</h3>
                <p className="mt-1 text-sm text-gray-500">Person enrichment components will be loaded here</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  {mockPersonData.slice(0, 3).map((person) => (
                    <div key={person.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {person.firstName.charAt(0)}{person.lastName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{person.firstName} {person.lastName}</p>
                          <p className="text-sm text-gray-500">{person.title}</p>
                          <p className="text-sm text-gray-400">{person.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Company Intelligence</h3>
                <p className="mt-1 text-sm text-gray-500">Company intelligence components will be loaded here</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {mockCompanyData.slice(0, 2).map((company) => (
                    <div key={company.id} className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.industry}</p>
                          <p className="text-sm text-gray-400">{company.location.city}, {company.location.country}</p>
                          <div className="mt-2 flex space-x-2">
                            <Badge variant="outline" className="text-xs">{company.size} employees</Badge>
                            <Badge variant="outline" className="text-xs">{company.revenue}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prospects">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Target className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Prospect Research</h3>
                <p className="mt-1 text-sm text-gray-500">Prospecting components will be loaded here</p>
                <div className="mt-4 space-y-4 text-left">
                  {mockProspectData.map((prospect) => (
                    <div key={prospect.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold">
                              {prospect.person.firstName.charAt(0)}{prospect.person.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{prospect.person.firstName} {prospect.person.lastName}</p>
                            <p className="text-sm text-gray-500">{prospect.person.title} at {prospect.company.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-purple-100 text-purple-800">
                            Score: {prospect.score}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{prospect.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Usage Analytics</h3>
                <p className="mt-1 text-sm text-gray-500">Analytics components will be loaded here</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Daily Usage</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{mockUsageData.apiCallsToday}</p>
                    <p className="text-sm text-blue-600">API calls today</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Success Rate</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">{mockUsageData.successRate}%</p>
                    <p className="text-sm text-green-600">Average success</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-900">Response Time</h4>
                    <p className="text-2xl font-bold text-yellow-600 mt-2">{mockUsageData.averageResponseTime}s</p>
                    <p className="text-sm text-yellow-600">Average response</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default LushaDashboard;