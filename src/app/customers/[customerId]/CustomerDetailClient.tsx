"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeads } from "@/contexts/LeadContext";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Star,
  Activity,
  BarChart3,
  MessageSquare,
  Edit,
  Download,
  Share2,
  Award,
  Clock,
  Target,
  Users,
  Globe
} from "lucide-react";
import Link from "next/link";
import { CustomerAnalytics } from "@/components/customers/CustomerAnalytics";
import { CustomerJourney } from "@/components/customers/CustomerJourney";
import { CustomerContact } from "@/components/customers/CustomerContact";

interface CustomerDetailClientProps {
  params: {
    customerId: string;
  };
}

function CustomerDetailContent({ params }: CustomerDetailClientProps) {
  const searchParams = useSearchParams();
  const customerId = params.customerId;
  const { customers } = useLeads();
  const [activeTab, setActiveTab] = useState("profile");
  
  const customer = customers.find(c => c.id === customerId);

  // Set active tab from URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['profile', 'analytics', 'journey', 'contact'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  if (!customer) {
    return (
      <StaticExportLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h1>
            <p className="text-gray-600 mb-4">The customer you're looking for doesn't exist.</p>
            <Link href="/customers">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Customers
              </Button>
            </Link>
          </div>
        </div>
      </StaticExportLayout>
    );
  }

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTierColor = (tier: string) => {
    const colors = {
      premium: 'bg-purple-100 text-purple-800',
      gold: 'bg-yellow-100 text-yellow-800',
      silver: 'bg-gray-100 text-gray-800',
      bronze: 'bg-orange-100 text-orange-800'
    };
    return colors[tier] || colors.bronze;
  };

  return (
    <StaticExportLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/customers">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Customers
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {customer.firstName} {customer.lastName}
              </h1>
              <p className="text-muted-foreground">Customer ID: {customer.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Customer Overview Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-[#e85b5e] to-[#c7494c] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {customer.firstName[0]}{customer.lastName[0]}
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl font-semibold">{customer.firstName} {customer.lastName}</h2>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status.toUpperCase()}
                  </Badge>
                  <Badge className={getTierColor(customer.tier)}>
                    {customer.tier.toUpperCase()}
                  </Badge>
                  {customer.originalLeadId && (
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      <Award className="w-3 h-3 mr-1" />
                      Converted Lead
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Joined {customer.registrationDate}</span>
                  </div>
                </div>

                {/* Lead Conversion Info */}
                {customer.originalLeadId && (
                  <div className="mt-4 p-3 bg-red-50 rounded-lg border">
                    <div className="text-sm font-medium text-red-800 mb-1">Lead Conversion History</div>
                    <div className="text-sm text-[#e85b5e]">
                      <div>Converted from: <strong>{customer.movedFromStage}</strong> stage</div>
                      <div>Conversion Date: <strong>{customer.movedDate}</strong></div>
                      {customer.conversionNotes && (
                        <div className="mt-1">Notes: "{customer.conversionNotes}"</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${customer.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    All time purchases
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lifetime Value</p>
                  <p className="text-2xl font-bold">${customer.lifetimeValue.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    <Star className="w-3 h-3 inline mr-1" />
                    Predicted LTV
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{customer.orderCount}</p>
                  <p className="text-xs text-[#e85b5e] mt-1">
                    <ShoppingCart className="w-3 h-3 inline mr-1" />
                    Completed orders
                  </p>
                </div>
                <ShoppingCart className="h-8 w-8 text-[#e85b5e]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                  <p className="text-2xl font-bold">
                    ${customer.orderCount > 0 ? Math.round(customer.totalSpent / customer.orderCount).toLocaleString() : '0'}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    <BarChart3 className="w-3 h-3 inline mr-1" />
                    Per transaction
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="journey">Customer Journey</TabsTrigger>
            <TabsTrigger value="contact">Contact History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-sm">{customer.firstName} {customer.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-sm">{customer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-sm">{customer.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-sm">{customer.location}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Since</label>
                    <p className="text-sm">{customer.registrationDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-sm">{customer.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Account Status</label>
                    <p className="text-sm">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status.toUpperCase()}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Tier</label>
                    <p className="text-sm">
                      <Badge className={getTierColor(customer.tier)}>
                        {customer.tier.toUpperCase()}
                      </Badge>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Segmentation & Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer Segment</label>
                    <p className="text-sm">
                      <Badge variant="outline">{customer.segment}</Badge>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Source</label>
                    <p className="text-sm">{customer.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {customer.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Purchase Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Spent</label>
                    <p className="text-sm font-semibold">${customer.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Lifetime Value</label>
                    <p className="text-sm font-semibold">${customer.lifetimeValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Orders</label>
                    <p className="text-sm font-semibold">{customer.orderCount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Average Order Value</label>
                    <p className="text-sm font-semibold">
                      ${customer.orderCount > 0 ? Math.round(customer.totalSpent / customer.orderCount).toLocaleString() : '0'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <CustomerAnalytics customer={customer} />
          </TabsContent>
          
          <TabsContent value="journey">
            <CustomerJourney customer={customer} />
          </TabsContent>
          
          <TabsContent value="contact">
            <CustomerContact customer={customer} />
          </TabsContent>
        </Tabs>
      </div>
    </StaticExportLayout>
  );
}

export default function CustomerDetailClient({ params }: CustomerDetailClientProps) {
  return (
    <Suspense fallback={
      <StaticExportLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p>Loading customer details...</p>
          </div>
        </div>
      </StaticExportLayout>
    }>
      <CustomerDetailContent params={params} />
    </Suspense>
  );
}