"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Zap,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  CreditCard,
  BarChart3,
  Users,
  Activity,
  Loader2
} from 'lucide-react';
import { useLushaUsage } from '@/hooks/useLushaUsage';

interface CreditUsageDashboardProps {
  className?: string;
}

export function CreditUsageDashboard({ className }: CreditUsageDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'team' | 'billing'>('overview');

  const {
    usage,
    loading,
    error,
    fetchUsage,
    getUsagePercentage,
    getRemainingDays,
    getDailyAverage,
    getProjectedUsage,
    isNearLimit,
    willExceedLimit,
    getUsageByType,
    formatCredits,
    formatPercentage,
    clearError
  } = useLushaUsage();
  // Early returns for loading and error states
  if (loading && !usage) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Loading usage data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">Failed to load usage data: {error}</span>
              <Button size="sm" variant="ghost" onClick={clearError}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No usage data available</h3>
          <p className="text-gray-600">Unable to fetch usage information from Lusha API.</p>
        </div>
      </div>
    );
  }

  const creditUsagePercentage = getUsagePercentage();
  const creditsRemaining = usage.remainingCredits;
  const isLowOnCredits = isNearLimit(80);
  const dailyAverage = getDailyAverage();
  const projectedUsage = getProjectedUsage();
  const remainingDays = getRemainingDays();

  const getBillingStatus = () => {
    if (remainingDays <= 7) {
      return { status: 'warning', message: `Renews in ${remainingDays} days`, color: 'text-yellow-600' };
    }
    return { status: 'active', message: `Renews in ${remainingDays} days`, color: 'text-green-600' };
  };

  const billingStatus = getBillingStatus();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Credit Usage Dashboard</h2>
          <p className="text-gray-600 mt-1">Monitor and manage your Lusha API credit consumption</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsage}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className={isLowOnCredits ? 'border-red-200 bg-red-50' : ''}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Remaining</p>
                <p className={`text-3xl font-bold ${isLowOnCredits ? 'text-red-600' : 'text-blue-600'}`}>
                  {creditsRemaining.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  of {usage.totalCredits.toLocaleString()} total
                </p>
              </div>
              <Zap className={`h-10 w-10 ${isLowOnCredits ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Usage</span>
                <span>{creditUsagePercentage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={creditUsagePercentage} 
                className={`h-2 ${isLowOnCredits ? '[&>div]:bg-red-500' : ''}`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Daily Usage</p>
                <p className="text-3xl font-bold text-green-600">{dailyAverage}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">
                    credits per day
                  </span>
                </div>
              </div>
              <Activity className="h-10 w-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">98%</p>
                <p className="text-xs text-gray-500">
                  API success rate
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Billing Cycle</p>
                <p className="text-lg font-bold text-gray-900">{billingStatus.message}</p>
                <p className={`text-xs ${billingStatus.color}`}>
                  {billingStatus.status === 'warning' ? 'Renewal Soon' : 'Active'}
                </p>
              </div>
              <Calendar className="h-10 w-10 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Banner */}
      {isLowOnCredits && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-red-800">Low Credit Warning</p>
                  <p className="text-sm text-red-700">
                    You've used {creditUsagePercentage.toFixed(1)}% of your monthly credits. Consider upgrading your plan.
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-6">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'transactions', label: 'Transactions', icon: <CreditCard className="h-4 w-4" /> },
              { id: 'team', label: 'Team Usage', icon: <Users className="h-4 w-4" /> },
              { id: 'billing', label: 'Billing', icon: <DollarSign className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Feature Usage Breakdown */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Usage by Feature</h3>
                <div className="space-y-4">
                  {[
                    { 
                      feature: 'Person Enrichment', 
                      usage: getUsageByType('person').used, 
                      percentage: getUsageByType('person').percentage 
                    },
                    { 
                      feature: 'Company Search', 
                      usage: getUsageByType('company').used, 
                      percentage: getUsageByType('company').percentage 
                    },
                    { 
                      feature: 'Prospecting', 
                      usage: getUsageByType('prospecting').used, 
                      percentage: getUsageByType('prospecting').percentage 
                    }
                  ].map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{feature.feature}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{feature.usage.toLocaleString()}</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(feature.percentage)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={feature.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Usage Chart Placeholder */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Daily Usage Trend</h3>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Usage chart visualization</p>
                    <p className="text-sm text-gray-400">Shows daily credit consumption over time</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Recent Transactions</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-3">
                {usage.dailyUsage.slice(-10).map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {day.type.charAt(0).toUpperCase() + day.type.slice(1)} API Usage
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(day.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">
                        -{day.usage}
                      </p>
                      <p className="text-sm text-gray-500">
                        credits used
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Team Usage Statistics</h3>
                <Button variant="outline" size="sm">
                  Manage Team
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">U</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Current User</p>
                        <p className="text-sm text-gray-500">Admin</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credits Used:</span>
                        <span className="font-medium">{usage.usedCredits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Activity:</span>
                        <span className="font-medium">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-1">Most Used Features:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Person Enrichment</Badge>
                        <Badge variant="outline" className="text-xs">Company Search</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Plan Type:</span>
                      <Badge className="bg-blue-100 text-blue-800">Professional</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly Credits:</span>
                      <span className="font-semibold">{usage.totalCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly Cost:</span>
                      <span className="font-semibold">$299/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Renewal Date:</span>
                      <span className="font-semibold">
                        {new Date(usage.billingCycle.renewalDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Cycle */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Billing Cycle</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cycle Start:</span>
                      <span className="font-semibold">
                        {new Date(usage.billingCycle.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Cycle End:</span>
                      <span className="font-semibold">
                        {new Date(usage.billingCycle.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Credits Allocated:</span>
                      <span className="font-semibold">{usage.totalCredits.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Credits Used:</span>
                      <span className="font-semibold">{usage.usedCredits.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Plan Options */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Available Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Starter', credits: 1000, price: 49, features: ['Basic enrichment', 'Email support'] },
                    { name: 'Professional', credits: 10000, price: 299, features: ['All features', 'Priority support', 'Bulk processing'], current: true },
                    { name: 'Enterprise', credits: 50000, price: 999, features: ['Unlimited features', 'Dedicated support', 'Custom integrations'] }
                  ].map((plan) => (
                    <Card key={plan.name} className={plan.current ? 'ring-2 ring-blue-500' : ''}>
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          {plan.current && (
                            <Badge className="bg-blue-100 text-blue-800 mb-2">Current Plan</Badge>
                          )}
                          <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                          <div>
                            <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                            <span className="text-gray-600">/month</span>
                          </div>
                          <p className="text-gray-600">{plan.credits.toLocaleString()} credits/month</p>
                          
                          <ul className="text-sm text-gray-600 space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          <Button
                            className="w-full"
                            variant={plan.current ? "outline" : "default"}
                            disabled={plan.current}
                          >
                            {plan.current ? 'Current Plan' : 'Upgrade'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CreditUsageDashboard;