"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Users, ShoppingCart, DollarSign, Zap, AlertCircle, TrendingUp, Snowflake, XCircle } from "lucide-react";


export default function FunnelPage() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const navigateToSection = (section: string) => {
    router.push(`/products/${section.toLowerCase()}`);
  };

  // Funnel data
  const funnelData = {
    tofu: {
      title: "Top of Funnel (ToFu)",
      description: "Awareness stage - Attracting potential customers",
      metrics: {
        visitors: 5500,
        impressions: 45270,
        engagement: "3.8%",
        avgConversionTime: "3.2 days"
      },
      channels: ["Social Media", "Content Marketing", "SEO", "Paid Ads"],
      color: "bg-blue-500",
      triggers: [
        { name: "First-time Visitor", type: "active", count: 847 },
        { name: "Content Engagement", type: "active", count: 542 },
        { name: "Social Media Click", type: "active", count: 329 },
        { name: "Blog Post Read", type: "active", count: 256 }
      ]
    },
    mofu: {
      title: "Middle of Funnel (MoFu)",
      description: "Consideration stage - Nurturing leads & building interest",
      metrics: {
        leads: 456,
        qualifiedLeads: 1842,
        conversionRate: "29.2%",
        avgConversionTime: "12.7 days"
      },
      channels: ["Email Campaigns", "Webinars", "Case Studies", "Product Demos"],
      color: "bg-purple-500",
      triggers: [
        { name: "Email Engagement", type: "active", count: 623 },
        { name: "Lead Scoring Alert", type: "active", count: 412 },
        { name: "Demo Request", type: "active", count: 278 },
        { name: "Download Whitepaper", type: "active", count: 189 }
      ]
    },
    bofu: {
      title: "Bottom of Funnel (BoFu)",
      description: "Decision stage - Converting leads to customers",
      metrics: {
        opportunities: 824,
        deals: 230,
        revenue: "$573,285",
        avgConversionTime: "18.4 days"
      },
      channels: ["Sales Calls", "Trials", "Consultations", "Special Offers"],
      color: "bg-green-500",
      triggers: [
        { name: "High-Intent Behavior", type: "active", count: 234 },
        { name: "Pricing Page Views", type: "active", count: 178 },
        { name: "Trial Started", type: "active", count: 142 },
        { name: "Sales Ready Lead", type: "active", count: 89 }
      ]
    },
    cold: {
      title: "Cold Bucket",
      description: "Inactive leads - Re-engagement and recovery",
      metrics: {
        coldLeads: 8500,
        totalValue: "$580k",
        avgDaysInactive: 95
      },
      channels: ["Re-engagement Campaigns", "Win-back Offers", "Executive Outreach", "Industry Updates"],
      color: "bg-gray-500",
      triggers: [
        { name: "Inactivity Alert", type: "active", count: 156 },
        { name: "Re-engagement Opportunity", type: "active", count: 89 },
        { name: "High-Value Dormant Lead", type: "active", count: 67 },
        { name: "Win-back Campaign", type: "active", count: 45 }
      ]
    },
    invalid: {
      title: "Invalid Leads",
      description: "Non-qualified leads - Data cleanup and validation",
      metrics: {
        invalidLeads: 2115,
        reasonsCount: 8,
        cleanupRate: "78%"
      },
      channels: ["Data Validation", "Spam Detection", "Email Verification", "Lead Scoring"],
      color: "bg-red-500",
      triggers: [
        { name: "Invalid Email Detected", type: "active", count: 89 },
        { name: "Duplicate Lead Alert", type: "active", count: 67 },
        { name: "Spam Pattern Match", type: "active", count: 45 },
        { name: "Data Quality Issue", type: "active", count: 32 }
      ]
    }
  };

  // Overall conversion metrics
  const overallConversionMetrics = {
    admin: {
      leadToCustomerTime: "34.3 days",
      averageVelocity: "2.9 days/stage",
      totalConversions: 376,
      conversionRate: "3.01%"
    },
    agent: {
      leadToCustomerTime: "28.7 days",
      averageVelocity: "3.2 days/stage", 
      totalConversions: 342,
      conversionRate: "3.42%"
    }
  };


  // Icons for each section
  const sectionIcons = {
    tofu: <Users className="h-6 w-6" />,
    mofu: <ShoppingCart className="h-6 w-6" />,
    bofu: <DollarSign className="h-6 w-6" />,
    cold: <Snowflake className="h-6 w-6" />,
    invalid: <XCircle className="h-6 w-6" />
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Funnel</h1>
            <p className="text-muted-foreground">
              Track and manage your sales funnel stages
            </p>
          </div>

          {/* Visual Funnel Representation */}
          <div className="relative pt-10 pb-20">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gray-200"></div>
            
            {/* ToFu Container */}
            <div className="relative mb-8">
              <div 
                className={`absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${funnelData.tofu.color} flex items-center justify-center text-white z-10`}
              >
                1
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => navigateToSection('tofu')}
              >
                <div className={`h-2 w-full ${funnelData.tofu.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    {sectionIcons.tofu}
                    <CardTitle className="ml-2">{funnelData.tofu.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('tofu');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'tofu' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{funnelData.tofu.description}</p>
                  
                  {expandedSection === 'tofu' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Visitors</p>
                          <p className="text-2xl font-semibold">{funnelData.tofu.metrics.visitors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Impressions</p>
                          <p className="text-2xl font-semibold">{funnelData.tofu.metrics.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Engagement Rate</p>
                          <p className="text-2xl font-semibold">{funnelData.tofu.metrics.engagement}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Time</p>
                          <p className="text-2xl font-semibold">{funnelData.tofu.metrics.avgConversionTime}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {funnelData.tofu.channels.map((channel) => (
                            <span key={channel} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-blue-100 p-1.5 rounded-lg mr-2">
                              <Zap className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Behavior Triggers</p>
                              <p className="text-xs text-gray-500">{funnelData.tofu.triggers.length} active triggers</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/triggers/create');
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Add Trigger
                          </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                          {funnelData.tofu.triggers.map((trigger, index) => (
                            <div key={trigger.name} className="group bg-gradient-to-r from-blue-50 to-blue-25 hover:from-blue-100 hover:to-blue-50 border border-blue-200/50 rounded-lg p-3 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-blue-900">{trigger.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="bg-white/50 text-blue-700 border-blue-300 text-xs font-semibold">
                                    {trigger.count} today
                                  </Badge>
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                </div>
                              </div>
                              <p className="text-xs text-blue-600 mt-1 opacity-75">
                                {index === 0 && "Captures new visitors landing on your site"}
                                {index === 1 && "Tracks user engagement with your content"}
                                {index === 2 && "Monitors social media referral traffic"}
                                {index === 3 && "Identifies users reading blog content"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSection('tofu');
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* MoFu Container */}
            <div className="relative mb-8">
              <div 
                className={`absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${funnelData.mofu.color} flex items-center justify-center text-white z-10`}
              >
                2
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => navigateToSection('mofu')}
              >
                <div className={`h-2 w-full ${funnelData.mofu.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    {sectionIcons.mofu}
                    <CardTitle className="ml-2">{funnelData.mofu.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('mofu');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'mofu' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{funnelData.mofu.description}</p>
                  
                  {expandedSection === 'mofu' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Leads</p>
                          <p className="text-2xl font-semibold">{funnelData.mofu.metrics.leads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Qualified Leads</p>
                          <p className="text-2xl font-semibold">{funnelData.mofu.metrics.qualifiedLeads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-2xl font-semibold">{funnelData.mofu.metrics.conversionRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Time</p>
                          <p className="text-2xl font-semibold">{funnelData.mofu.metrics.avgConversionTime}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {funnelData.mofu.channels.map((channel) => (
                            <span key={channel} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-purple-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-purple-100 p-1.5 rounded-lg mr-2">
                              <Zap className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Behavior Triggers</p>
                              <p className="text-xs text-gray-500">{funnelData.mofu.triggers.length} active triggers</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-purple-50 border-purple-200 text-purple-600 hover:text-purple-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/triggers/create');
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Add Trigger
                          </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                          {funnelData.mofu.triggers.map((trigger, index) => (
                            <div key={trigger.name} className="group bg-gradient-to-r from-purple-50 to-purple-25 hover:from-purple-100 hover:to-purple-50 border border-purple-200/50 rounded-lg p-3 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-purple-900">{trigger.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="bg-white/50 text-purple-700 border-purple-300 text-xs font-semibold">
                                    {trigger.count} today
                                  </Badge>
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                </div>
                              </div>
                              <p className="text-xs text-purple-600 mt-1 opacity-75">
                                {index === 0 && "Monitors email opens, clicks, and replies"}
                                {index === 1 && "Alerts when leads reach scoring thresholds"}
                                {index === 2 && "Triggers when prospects request demos"}
                                {index === 3 && "Tracks educational content downloads"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSection('mofu');
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* BoFu Container */}
            <div className="relative mb-8">
              <div 
                className={`absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${funnelData.bofu.color} flex items-center justify-center text-white z-10`}
              >
                3
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => navigateToSection('bofu')}
              >
                <div className={`h-2 w-full ${funnelData.bofu.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    {sectionIcons.bofu}
                    <CardTitle className="ml-2">{funnelData.bofu.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('bofu');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'bofu' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{funnelData.bofu.description}</p>
                  
                  {expandedSection === 'bofu' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Opportunities</p>
                          <p className="text-2xl font-semibold">{funnelData.bofu.metrics.opportunities.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Closed Deals</p>
                          <p className="text-2xl font-semibold">{funnelData.bofu.metrics.deals.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-semibold">{funnelData.bofu.metrics.revenue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Time</p>
                          <p className="text-2xl font-semibold">{funnelData.bofu.metrics.avgConversionTime}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {funnelData.bofu.channels.map((channel) => (
                            <span key={channel} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-green-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-green-100 p-1.5 rounded-lg mr-2">
                              <Zap className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Behavior Triggers</p>
                              <p className="text-xs text-gray-500">{funnelData.bofu.triggers.length} active triggers</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-green-50 border-green-200 text-green-600 hover:text-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/triggers/create');
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Add Trigger
                          </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                          {funnelData.bofu.triggers.map((trigger, index) => (
                            <div key={trigger.name} className="group bg-gradient-to-r from-green-50 to-green-25 hover:from-green-100 hover:to-green-50 border border-green-200/50 rounded-lg p-3 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-green-900">{trigger.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="bg-white/50 text-green-700 border-green-300 text-xs font-semibold">
                                    {trigger.count} today
                                  </Badge>
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                </div>
                              </div>
                              <p className="text-xs text-green-600 mt-1 opacity-75">
                                {index === 0 && "Detects high purchase intent signals"}
                                {index === 1 && "Tracks multiple pricing page visits"}
                                {index === 2 && "Monitors trial activation and usage"}
                                {index === 3 && "Identifies prospects ready for sales"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSection('bofu');
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Customer Card Container */}
            <div className="relative mb-8">
              <div 
                className="absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500 flex items-center justify-center text-white z-10"
              >
                <Users className="h-3 w-3" />
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => router.push('/customers')}
              >
                <div className="h-2 w-full bg-teal-500"></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-6 w-6" />
                    <CardTitle className="ml-2">Customer Cards</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('customers');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'customers' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Manage and view customer profiles and relationships</p>
                  
                  {expandedSection === 'customers' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Customers</p>
                          <p className="text-2xl font-semibold">376</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Accounts</p>
                          <p className="text-2xl font-semibold">342</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Retention Rate</p>
                          <p className="text-2xl font-semibold">91.2%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Customer Management</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Profile Management</span>
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Support Tickets</span>
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Customer Journey</span>
                          <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">Analytics</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full bg-teal-600 hover:bg-teal-700" 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push('/customers');
                          }}
                        >
                          View Customer Dashboard
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Cold Bucket Container */}
            <div className="relative mb-8">
              <div 
                className={`absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${funnelData.cold.color} flex items-center justify-center text-white z-10`}
              >
                4
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => navigateToSection('cold')}
              >
                <div className={`h-2 w-full ${funnelData.cold.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    {sectionIcons.cold}
                    <CardTitle className="ml-2">{funnelData.cold.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('cold');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'cold' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{funnelData.cold.description}</p>
                  
                  {expandedSection === 'cold' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Cold Leads</p>
                          <p className="text-2xl font-semibold">{funnelData.cold.metrics.coldLeads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Value</p>
                          <p className="text-2xl font-semibold">{funnelData.cold.metrics.totalValue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg. Days Inactive</p>
                          <p className="text-2xl font-semibold">{funnelData.cold.metrics.avgDaysInactive}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {funnelData.cold.channels.map((channel) => (
                            <span key={channel} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-1.5 rounded-lg mr-2">
                              <Zap className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Behavior Triggers</p>
                              <p className="text-xs text-gray-500">{funnelData.cold.triggers.length} active triggers</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/triggers/create');
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Add Trigger
                          </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                          {funnelData.cold.triggers.map((trigger, index) => (
                            <div key={trigger.name} className="group bg-gradient-to-r from-gray-50 to-gray-25 hover:from-gray-100 hover:to-gray-50 border border-gray-200/50 rounded-lg p-3 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-gray-900">{trigger.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="bg-white/50 text-gray-700 border-gray-300 text-xs font-semibold">
                                    {trigger.count} today
                                  </Badge>
                                  <AlertCircle className="w-3 h-3 text-orange-600" />
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1 opacity-75">
                                {index === 0 && "Identifies prospects that have gone inactive"}
                                {index === 1 && "Finds opportunities for re-engagement"}
                                {index === 2 && "Alerts for high-value dormant leads"}
                                {index === 3 && "Triggers win-back campaign opportunities"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSection('cold');
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Invalid Leads Container */}
            <div className="relative">
              <div 
                className={`absolute left-1/2 top-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${funnelData.invalid.color} flex items-center justify-center text-white z-10`}
              >
                5
              </div>
              <Card 
                className="relative w-full cursor-pointer transform transition-all hover:shadow-lg"
                onClick={() => navigateToSection('invalid')}
              >
                <div className={`h-2 w-full ${funnelData.invalid.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div className="flex items-center">
                    {sectionIcons.invalid}
                    <CardTitle className="ml-2">{funnelData.invalid.title}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection('invalid');
                    }}
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedSection === 'invalid' ? 'rotate-180' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{funnelData.invalid.description}</p>
                  
                  {expandedSection === 'invalid' && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Invalid Leads</p>
                          <p className="text-2xl font-semibold">{funnelData.invalid.metrics.invalidLeads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Types</p>
                          <p className="text-2xl font-semibold">{funnelData.invalid.metrics.reasonsCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cleanup Rate</p>
                          <p className="text-2xl font-semibold">{funnelData.invalid.metrics.cleanupRate}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Validation Tools</p>
                        <div className="flex flex-wrap gap-2">
                          {funnelData.invalid.channels.map((channel) => (
                            <span key={channel} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-red-100">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-red-100 p-1.5 rounded-lg mr-2">
                              <Zap className="w-4 h-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Validation Triggers</p>
                              <p className="text-xs text-gray-500">{funnelData.invalid.triggers.length} active triggers</p>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-white hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push('/triggers/create');
                            }}
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Add Trigger
                          </Button>
                        </div>
                        <div className="space-y-2 mb-4">
                          {funnelData.invalid.triggers.map((trigger, index) => (
                            <div key={trigger.name} className="group bg-gradient-to-r from-red-50 to-red-25 hover:from-red-100 hover:to-red-50 border border-red-200/50 rounded-lg p-3 transition-all duration-200 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-red-900">{trigger.name}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="bg-white/50 text-red-700 border-red-300 text-xs font-semibold">
                                    {trigger.count} today
                                  </Badge>
                                  <XCircle className="w-3 h-3 text-red-600" />
                                </div>
                              </div>
                              <p className="text-xs text-red-600 mt-1 opacity-75">
                                {index === 0 && "Identifies leads with invalid email addresses"}
                                {index === 1 && "Detects duplicate lead submissions"}
                                {index === 2 && "Catches spam or fake lead patterns"}
                                {index === 3 && "Flags data quality and completeness issues"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToSection('invalid');
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Summary Analytics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Funnel Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="text-lg font-medium">TOFU</h3>
                  <p className="text-3xl font-bold">{funnelData.tofu.metrics.visitors.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Visitors</p>
                  <p className="mt-2 text-sm">Engagement: {funnelData.tofu.metrics.engagement}</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                  <ShoppingCart className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="text-lg font-medium">MOFU</h3>
                  <p className="text-3xl font-bold">{funnelData.mofu.metrics.leads.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Leads</p>
                  <p className="mt-2 text-sm">Conversion: {funnelData.mofu.metrics.conversionRate}</p>
                  <p className="text-xs text-blue-600 mt-1">ToFu→MoFu: {funnelData.tofu.metrics.avgConversionTime}</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium">BOFU</h3>
                  <p className="text-3xl font-bold">{funnelData.bofu.metrics.deals.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Opportunities</p>
                  <p className="mt-2 text-sm">&nbsp;</p>
                  <p className="text-xs text-purple-600 mt-1">MoFu→BoFu: {funnelData.mofu.metrics.avgConversionTime}</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                  <Users className="h-8 w-8 text-teal-500 mb-2" />
                  <h3 className="text-lg font-medium">CUSTOMER</h3>
                  <p className="text-3xl font-bold">75</p>
                  <p className="text-sm text-muted-foreground">Deals Won</p>
                  <p className="mt-2 text-sm">&nbsp;</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Snowflake className="h-8 w-8 text-gray-500 mb-2" />
                  <h3 className="text-lg font-medium">Cold Bucket</h3>
                  <p className="text-3xl font-bold">{funnelData.cold.metrics.coldLeads.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Inactive Leads</p>
                  <p className="mt-2 text-sm">Value: {funnelData.cold.metrics.totalValue}</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                  <XCircle className="h-8 w-8 text-red-500 mb-2" />
                  <h3 className="text-lg font-medium">Invalid Leads</h3>
                  <p className="text-3xl font-bold">{funnelData.invalid.metrics.invalidLeads.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Invalid Leads</p>
                  <p className="mt-2 text-sm">Cleanup: 78</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Behavior Triggers Summary */}
          <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">Behavior Triggers Dashboard</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Real-time customer behavior monitoring across your funnel</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="bg-white"
                    onClick={() => router.push('/triggers/create')}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Create Trigger
                  </Button>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => router.push('/triggers')}
                  >
                    View All Triggers
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Triggers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {funnelData.tofu.triggers.length + funnelData.mofu.triggers.length + funnelData.bofu.triggers.length + funnelData.cold.triggers.length + funnelData.invalid.triggers.length}
                      </p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Activations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {funnelData.tofu.triggers.reduce((sum, t) => sum + t.count, 0) + 
                         funnelData.mofu.triggers.reduce((sum, t) => sum + t.count, 0) + 
                         funnelData.bofu.triggers.reduce((sum, t) => sum + t.count, 0) + 
                         funnelData.cold.triggers.reduce((sum, t) => sum + t.count, 0) + 
                         funnelData.invalid.triggers.reduce((sum, t) => sum + t.count, 0)}
                      </p>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Top Performer</p>
                      <p className="text-sm font-semibold text-gray-900">First-time Visitor</p>
                      <p className="text-xs text-gray-500">847 activations</p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">23.4%</p>
                      <p className="text-xs text-green-600">+5.2% from last week</p>
                    </div>
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Funnel Stage Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-900 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      TOFU Triggers
                    </h4>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">{funnelData.tofu.triggers.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {funnelData.tofu.triggers.map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-blue-900">{trigger.name}</span>
                        <Badge variant="secondary" className="bg-blue-200 text-blue-800">{trigger.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-purple-900 flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      MOFU Triggers
                    </h4>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">{funnelData.mofu.triggers.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {funnelData.mofu.triggers.map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-purple-900">{trigger.name}</span>
                        <Badge variant="secondary" className="bg-purple-200 text-purple-800">{trigger.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-green-900 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      BOFU Triggers
                    </h4>
                    <Badge variant="outline" className="text-green-700 border-green-300">{funnelData.bofu.triggers.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {funnelData.bofu.triggers.map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-green-900">{trigger.name}</span>
                        <Badge variant="secondary" className="bg-green-200 text-green-800">{trigger.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                      Cold Bucket Triggers
                    </h4>
                    <Badge variant="outline" className="text-gray-700 border-gray-300">{funnelData.cold.triggers.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {funnelData.cold.triggers.map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-900">{trigger.name}</span>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-800">{trigger.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-red-900 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      Invalid Lead Triggers
                    </h4>
                    <Badge variant="outline" className="text-red-700 border-red-300">{funnelData.invalid.triggers.length}</Badge>
                  </div>
                  <div className="space-y-3">
                    {funnelData.invalid.triggers.map((trigger) => (
                      <div key={trigger.name} className="flex items-center justify-between bg-red-50 p-3 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-red-900">{trigger.name}</span>
                        <Badge variant="secondary" className="bg-red-200 text-red-800">{trigger.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </StaticExportLayout>
    </>
  );
}