"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Activity,
  Heart,
  Star,
  TrendingUp,
  ShoppingCart,
  MessageCircle,
  FileText,
  X,
  CreditCard,
  Clock,
  Target,
  AlertTriangle
} from 'lucide-react';

interface CustomerProfile {
  id: string;
  customer: any;
  healthScore: number;
  engagementLevel: number;
  satisfactionScore: number;
  recentActivities: {
    id: string;
    type: string;
    description: string;
    date: Date;
    value?: number;
  }[];
  preferences: {
    communicationChannel: string;
    frequency: string;
    topics: string[];
  };
  demographics: {
    age: number;
    gender: string;
    income: string;
    education: string;
    occupation: string;
  };
  behaviorMetrics: {
    avgOrderValue: number;
    purchaseFrequency: number;
    lastPurchase: Date;
    totalOrders: number;
    returnRate: number;
  };
}

interface ProfileFullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
}

export const ProfileFullViewModal: React.FC<ProfileFullViewModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { customer } = profile;

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ShoppingCart className="h-4 w-4 text-green-600" />;
      case 'support': return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'engagement': return <Activity className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const daysSinceLastPurchase = Math.floor((new Date().getTime() - profile.behaviorMetrics.lastPurchase.getTime()) / (1000 * 60 * 60 * 24));

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customer.fullName}</h2>
              <p className="text-gray-600">{customer.company?.designation} at {customer.company?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {customer.id}
                </Badge>
                <Badge className={
                  customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                  customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Health Metrics */}
                <div className="grid grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Health Score</span>
                        </div>
                        <span className={`text-2xl font-bold ${getHealthScoreColor(profile.healthScore)}`}>
                          {Math.round(profile.healthScore)}
                        </span>
                      </div>
                      <Progress value={profile.healthScore} className="h-3" />
                      <p className="text-sm text-gray-600 mt-2">
                        {profile.healthScore >= 80 ? 'Excellent health' : 
                         profile.healthScore >= 60 ? 'Good health' : 'Needs attention'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Engagement</span>
                        </div>
                        <span className={`text-2xl font-bold ${getHealthScoreColor(profile.engagementLevel)}`}>
                          {Math.round(profile.engagementLevel)}
                        </span>
                      </div>
                      <Progress value={profile.engagementLevel} className="h-3" />
                      <p className="text-sm text-gray-600 mt-2">
                        {profile.engagementLevel >= 80 ? 'Highly engaged' : 
                         profile.engagementLevel >= 60 ? 'Moderately engaged' : 'Low engagement'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium">Satisfaction</span>
                        </div>
                        <span className={`text-2xl font-bold ${getHealthScoreColor(profile.satisfactionScore)}`}>
                          {Math.round(profile.satisfactionScore)}
                        </span>
                      </div>
                      <Progress value={profile.satisfactionScore} className="h-3" />
                      <p className="text-sm text-gray-600 mt-2">
                        {profile.satisfactionScore >= 80 ? 'Very satisfied' : 
                         profile.satisfactionScore >= 60 ? 'Satisfied' : 'Dissatisfied'}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact and Business Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{customer.address.street}, {customer.address.city}, {customer.address.state}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span>{customer.company?.name}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Business Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(customer.totalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lifetime Value:</span>
                        <span className="font-semibold text-blue-600">{formatCurrency(customer.lifetimeValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Order Value:</span>
                        <span className="font-semibold text-purple-600">{formatCurrency(profile.behaviorMetrics.avgOrderValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders:</span>
                        <span className="font-semibold">{profile.behaviorMetrics.totalOrders}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="demographics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Demographic Information
                    </CardTitle>
                    <CardDescription>
                      Customer demographic and profile details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Personal Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-medium">{profile.demographics.age} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Gender:</span>
                            <span className="font-medium">{profile.demographics.gender}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Education:</span>
                            <span className="font-medium">{profile.demographics.education}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Professional Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Occupation:</span>
                            <span className="font-medium">{profile.demographics.occupation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Income Range:</span>
                            <span className="font-medium">{profile.demographics.income}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Company:</span>
                            <span className="font-medium">{customer.company?.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Account Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Customer Since:</span>
                            <span className="font-medium">{customer.acquisitionDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Segment:</span>
                            <Badge className="bg-blue-100 text-blue-800">{customer.segment}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge className={
                              customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                              customer.status === 'active' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {customer.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Purchase Behavior
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold text-green-600">{profile.behaviorMetrics.totalOrders}</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Return Rate</p>
                          <p className="text-2xl font-bold text-blue-600">{profile.behaviorMetrics.returnRate.toFixed(1)}%</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Order Value:</span>
                          <span className="font-semibold">{formatCurrency(profile.behaviorMetrics.avgOrderValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Purchase Frequency:</span>
                          <span className="font-semibold">{profile.behaviorMetrics.purchaseFrequency.toFixed(1)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Purchase:</span>
                          <span className="font-semibold">{daysSinceLastPurchase} days ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Engagement Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Email Engagement</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Platform Usage</span>
                            <span className="text-sm font-medium">72%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Support Interactions</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>
                      Customer interactions and activities over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profile.recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.description}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">
                                {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                          </div>
                          {activity.value && (
                            <div className="text-right">
                              <span className="font-semibold text-green-600">
                                {formatCurrency(activity.value)}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Communication Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Preferred Channel</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          {profile.preferences.communicationChannel}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Frequency</h4>
                        <Badge className="bg-green-100 text-green-800">
                          {profile.preferences.frequency}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Topics of Interest</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.preferences.topics.map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Customer Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">High Value Customer</span>
                        </div>
                        <p className="text-sm text-green-700">
                          This customer is in the top 20% of customers by lifetime value.
                        </p>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Engaged Customer</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Shows consistent engagement across multiple channels.
                        </p>
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Attention Needed</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Recent decrease in purchase frequency detected.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Upsell Opportunity</h4>
                        <p className="text-sm text-gray-600">
                          Consider premium service based on usage patterns.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Re-engagement Campaign</h4>
                        <p className="text-sm text-gray-600">
                          Send personalized offers to increase activity.
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Loyalty Program</h4>
                        <p className="text-sm text-gray-600">
                          Invite to VIP program based on high engagement.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};