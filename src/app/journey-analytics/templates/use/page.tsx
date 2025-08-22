"use client";

import React, { useState, useEffect, Suspense } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Play,
  Settings,
  Users,
  Clock,
  Target,
  TrendingUp,
  Star,
  GitBranch,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Search,
  Zap,
  BarChart3,
  Activity,
  Calendar,
  Database,
  Globe,
  MapPin,
  UserCheck,
  ShoppingCart,
  CreditCard,
  HeadphonesIcon
} from "lucide-react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Extended template data with more comprehensive details
const journeyTemplates = [
  {
    id: "JT-001",
    name: "E-commerce Welcome Journey",
    description: "Welcome new customers and guide them through their first purchase",
    category: "onboarding",
    type: "system",
    rating: 4.8,
    usageCount: 1247,
    estimatedDuration: "7 days",
    completionRate: 68.5,
    conversionRate: 23.2,
    tags: ["email", "sms", "push", "ecommerce"],
    industry: "Retail",
    complexity: "beginner",
    thumbnail: "/templates/ecommerce-welcome.png",
    detailedStages: [
      {
        id: "stage-1",
        name: "Welcome Email",
        description: "Send personalized welcome email with account setup instructions",
        triggerType: "event",
        triggerEvent: "user_registration",
        delay: "immediate",
        channels: ["email"],
        segment: "New Customers",
        automation: "Send welcome email template with personalization tokens",
        campaign: "Welcome Series - Email 1"
      },
      {
        id: "stage-2", 
        name: "Profile Setup Reminder",
        description: "Remind users to complete their profile setup",
        triggerType: "condition",
        triggerEvent: "profile_incomplete",
        delay: "1 day",
        channels: ["push", "email"],
        segment: "Incomplete Profiles",
        automation: "Check profile completion status and send reminder",
        campaign: "Profile Completion Campaign"
      },
      {
        id: "stage-3",
        name: "Product Recommendations",
        description: "Share personalized product recommendations based on browsing behavior",
        triggerType: "time",
        triggerEvent: "browsing_behavior_analysis",
        delay: "3 days",
        channels: ["email", "push"],
        segment: "Active Browsers",
        automation: "AI-powered product recommendation engine",
        campaign: "Product Discovery Series"
      },
      {
        id: "stage-4",
        name: "First Purchase Incentive",
        description: "Offer discount code to encourage first purchase",
        triggerType: "condition",
        triggerEvent: "no_purchase_after_3_days",
        delay: "5 days",
        channels: ["sms", "email"],
        segment: "Non-purchasers",
        automation: "Generate personalized discount code and send",
        campaign: "First Purchase Incentive"
      },
      {
        id: "stage-5",
        name: "Purchase Confirmation",
        description: "Confirm purchase and provide order details",
        triggerType: "event",
        triggerEvent: "purchase_completed",
        delay: "immediate",
        channels: ["email", "sms"],
        segment: "New Purchasers",
        automation: "Send order confirmation with tracking information",
        campaign: "Post-Purchase Communication"
      }
    ],
    channels: ["Email", "SMS", "Push Notifications"],
    segments: [
      { name: "New Customers", criteria: "registration_date <= 7 days", count: 1200 },
      { name: "Incomplete Profiles", criteria: "profile_completion < 50%", count: 800 },
      { name: "Active Browsers", criteria: "page_views >= 3 in last 24h", count: 2500 },
      { name: "Non-purchasers", criteria: "purchase_count = 0", count: 1500 }
    ],
    automations: [
      { name: "Behavioral Triggers", description: "React to user actions in real-time" },
      { name: "Time-based Delays", description: "Schedule messages at optimal times" },
      { name: "Conversion Tracking", description: "Monitor journey effectiveness" }
    ],
    campaigns: [
      { name: "Welcome Series", type: "Email", messages: 3 },
      { name: "Product Discovery", type: "Multi-channel", messages: 5 },
      { name: "First Purchase", type: "Conversion", messages: 2 }
    ],
    customizationOptions: {
      segments: true,
      timing: true,
      content: true,
      channels: true,
      triggers: true
    }
  },
  {
    id: "JT-002",
    name: "SaaS Trial to Paid Conversion",
    description: "Convert trial users to paid subscribers with strategic touchpoints",
    category: "conversion",
    type: "system",
    rating: 4.9,
    usageCount: 892,
    estimatedDuration: "14 days",
    completionRate: 72.3,
    conversionRate: 34.7,
    tags: ["email", "in-app", "push", "saas"],
    industry: "Software",
    complexity: "intermediate",
    thumbnail: "/templates/saas-trial.png",
    detailedStages: [
      {
        id: "stage-1",
        name: "Trial Started",
        description: "Welcome trial users and introduce key features",
        triggerType: "event",
        triggerEvent: "trial_started",
        delay: "immediate",
        channels: ["email", "in-app"],
        segment: "Trial Users",
        automation: "Send welcome email and trigger in-app onboarding",
        campaign: "Trial Activation Series"
      },
      {
        id: "stage-2",
        name: "Feature Discovery",
        description: "Guide users through key feature exploration",
        triggerType: "time",
        triggerEvent: "trial_day_2",
        delay: "2 days",
        channels: ["in-app", "email"],
        segment: "New Trial Users",
        automation: "Progressive feature introduction with tooltips",
        campaign: "Feature Education Campaign"
      },
      {
        id: "stage-3",
        name: "Usage Analytics",
        description: "Share personalized usage insights and value metrics",
        triggerType: "condition",
        triggerEvent: "minimum_usage_achieved",
        delay: "5 days",
        channels: ["email"],
        segment: "Active Trial Users",
        automation: "Generate usage report and value proposition",
        campaign: "Value Demonstration Series"
      },
      {
        id: "stage-4",
        name: "Upgrade Reminder",
        description: "Remind users about trial expiration and upgrade benefits",
        triggerType: "time",
        triggerEvent: "trial_ending_soon",
        delay: "10 days",
        channels: ["push", "email", "in-app"],
        segment: "Active Trial Users",
        automation: "Send upgrade reminders with personalized pricing",
        campaign: "Conversion Campaign"
      },
      {
        id: "stage-5",
        name: "Last Chance Offer",
        description: "Final upgrade incentive before trial expires",
        triggerType: "time",
        triggerEvent: "trial_expires_tomorrow",
        delay: "13 days",
        channels: ["email", "sms"],
        segment: "Non-converted Trials",
        automation: "Send limited-time discount offer",
        campaign: "Last Chance Conversion"
      }
    ],
    channels: ["Email", "In-App Messages", "Push Notifications", "SMS"],
    segments: [
      { name: "Trial Users", criteria: "subscription_status = 'trial'", count: 500 },
      { name: "Feature Adopters", criteria: "features_used >= 3", count: 300 },
      { name: "High Intent", criteria: "engagement_score > 70", count: 150 }
    ],
    automations: [
      { name: "Usage Tracking", description: "Monitor feature adoption and engagement" },
      { name: "Feature Engagement", description: "Track which features drive conversion" },
      { name: "Conversion Funnels", description: "Optimize trial-to-paid conversion paths" }
    ],
    campaigns: [
      { name: "Trial Activation", type: "Onboarding", messages: 4 },
      { name: "Feature Education", type: "Educational", messages: 6 },
      { name: "Upgrade Campaigns", type: "Conversion", messages: 3 }
    ],
    customizationOptions: {
      segments: true,
      timing: true,
      content: true,
      channels: true,
      triggers: true
    }
  }
];

function UseTemplatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [customizations, setCustomizations] = useState({
    journeyName: "",
    description: "",
    targetSegments: [],
    channels: [],
    timing: {},
    goals: {}
  });
  const [showCustomization, setShowCustomization] = useState(false);

  useEffect(() => {
    if (templateId) {
      const template = journeyTemplates.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setCustomizations({
          journeyName: `${template.name} - Custom`,
          description: template.description,
          targetSegments: template.segments.map(s => s.name),
          channels: template.channels,
          timing: {},
          goals: {}
        });
      }
    } else {
      setSelectedTemplate(journeyTemplates[0]);
    }
  }, [templateId]);

  const getChannelIcon = (channel) => {
    switch (channel.toLowerCase()) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'push notifications': case 'push': return Bell;
      case 'in-app messages': case 'in-app': return Smartphone;
      default: return Zap;
    }
  };

  const getTriggerIcon = (triggerType) => {
    switch (triggerType) {
      case 'event': return Activity;
      case 'time': return Clock;
      case 'condition': return Filter;
      default: return Zap;
    }
  };

  const handleUseTemplate = () => {
    if (showCustomization) {
      console.log("Creating journey with customizations:", { template: selectedTemplate, customizations });
      router.push(`/journey-analytics/create?template=${selectedTemplate.id}&customized=true`);
    } else {
      setShowCustomization(true);
    }
  };

  const handleUseAsIs = () => {
    console.log("Using template as-is:", selectedTemplate);
    router.push(`/journey-analytics/create?template=${selectedTemplate.id}&preset=true`);
  };

  if (!selectedTemplate) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/journey-analytics/templates">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Use Journey Template</h1>
                <p className="text-muted-foreground">
                  Customize and deploy the "{selectedTemplate.name}" template
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleUseAsIs}>
                <Play className="h-4 w-4 mr-2" />
                Use As-Is
              </Button>
              <Button onClick={handleUseTemplate}>
                <Settings className="h-4 w-4 mr-2" />
                {showCustomization ? 'Create Journey' : 'Customize'}
              </Button>
            </div>
          </div>

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Template Selection</CardTitle>
                  <CardDescription>Choose a different template or continue with current selection</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedTemplate.industry}</Badge>
                  <Badge className="bg-green-100 text-green-800">{selectedTemplate.complexity}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedTemplate.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 overflow-x-auto">
                  {journeyTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`min-w-[200px] p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate.id === template.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{template.category}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">{template.estimatedDuration}</Badge>
                        <span className="text-xs text-muted-foreground">{template.usageCount} uses</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Template Details */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stages">Journey Stages</TabsTrigger>
                  <TabsTrigger value="segments">Segments</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Overview</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{selectedTemplate.estimatedDuration}</div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{selectedTemplate.completionRate}%</div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{selectedTemplate.conversionRate}%</div>
                          <div className="text-sm text-muted-foreground">Conversion Rate</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">{selectedTemplate.usageCount}</div>
                          <div className="text-sm text-muted-foreground">Times Used</div>
                        </div>
                      </div>

                      {/* Channels */}
                      <div>
                        <h4 className="font-medium mb-3">Communication Channels</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.channels.map((channel) => {
                            const IconComponent = getChannelIcon(channel);
                            return (
                              <div key={channel} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm">{channel}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <h4 className="font-medium mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Journey Stages Tab */}
                <TabsContent value="stages" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Journey Stages ({selectedTemplate.detailedStages?.length || 0})</CardTitle>
                      <CardDescription>Detailed breakdown of each stage in the customer journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Visual Flow */}
                        <div className="p-4 bg-gray-50 rounded-lg overflow-x-auto">
                          <div className="flex items-center gap-2">
                            {selectedTemplate.detailedStages?.map((stage, index) => (
                              <div key={stage.id} className="flex items-center">
                                <div className="text-center min-w-[120px]">
                                  <div className="w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                                  </div>
                                  <div className="text-xs font-medium">{stage.name}</div>
                                  <Badge variant="outline" className="text-xs mt-1">{stage.delay}</Badge>
                                </div>
                                {index < selectedTemplate.detailedStages.length - 1 && (
                                  <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Detailed Stages */}
                        <div className="space-y-4">
                          {selectedTemplate.detailedStages?.map((stage, index) => {
                            const TriggerIcon = getTriggerIcon(stage.triggerType);
                            return (
                              <Card key={stage.id} className="border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                      <div>
                                        <h4 className="font-medium">{stage.name}</h4>
                                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                          <div className="text-muted-foreground mb-1">Trigger</div>
                                          <div className="flex items-center gap-1">
                                            <TriggerIcon className="h-3 w-3" />
                                            <span className="capitalize">{stage.triggerType}</span>
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground mb-1">Timing</div>
                                          <span>{stage.delay}</span>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground mb-1">Channels</div>
                                          <div className="flex gap-1">
                                            {stage.channels.map((channel) => {
                                              const ChannelIcon = getChannelIcon(channel);
                                              return <ChannelIcon key={channel} className="h-3 w-3" />;
                                            })}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground mb-1">Segment</div>
                                          <Badge variant="outline" className="text-xs">{stage.segment}</Badge>
                                        </div>
                                      </div>

                                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <div className="text-muted-foreground mb-1">Automation</div>
                                          <div className="text-sm">{stage.automation}</div>
                                        </div>
                                        <div>
                                          <div className="text-muted-foreground mb-1">Campaign</div>
                                          <div className="text-sm">{stage.campaign}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Segments Tab */}
                <TabsContent value="segments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Target Segments</CardTitle>
                      <CardDescription>Customer segments that will be enrolled in this journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedTemplate.segments?.map((segment) => (
                          <div key={segment.name} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-blue-500" />
                              <div>
                                <div className="font-medium">{segment.name}</div>
                                <div className="text-sm text-muted-foreground">{segment.criteria}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{segment.count?.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">customers</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Automation Tab */}
                <TabsContent value="automation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automation Rules</CardTitle>
                      <CardDescription>Automated behaviors and triggers configured in this template</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedTemplate.automations?.map((automation, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                            <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                              <div className="font-medium">{automation.name}</div>
                              <div className="text-sm text-muted-foreground">{automation.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Campaigns Tab */}
                <TabsContent value="campaigns" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Components</CardTitle>
                      <CardDescription>Marketing campaigns included in this journey template</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedTemplate.campaigns?.map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <Target className="h-5 w-5 text-green-500" />
                              <div>
                                <div className="font-medium">{campaign.name}</div>
                                <div className="text-sm text-muted-foreground">Type: {campaign.type}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{campaign.messages}</div>
                              <div className="text-sm text-muted-foreground">messages</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Template Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedTemplate.name}</CardTitle>
                  <CardDescription>{selectedTemplate.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <span>{selectedTemplate.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Complexity:</span>
                      <span className="capitalize">{selectedTemplate.complexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedTemplate.estimatedDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedTemplate.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" onClick={handleUseTemplate}>
                    <Settings className="h-4 w-4 mr-2" />
                    {showCustomization ? 'Create Journey' : 'Customize Template'}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleUseAsIs}>
                    <Play className="h-4 w-4 mr-2" />
                    Use Template As-Is
                  </Button>
                  <Button variant="outline" className="w-full">
                    <GitBranch className="h-4 w-4 mr-2" />
                    Preview Journey Flow
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expected Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completion Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${selectedTemplate.completionRate}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTemplate.completionRate}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{width: `${selectedTemplate.conversionRate}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTemplate.conversionRate}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">User Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{width: `${selectedTemplate.rating * 20}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTemplate.rating}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Customization Panel */}
          {showCustomization && (
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle>Customize Template</CardTitle>
                <CardDescription>Modify the template to fit your specific needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Journey Name</label>
                    <Input
                      value={customizations.journeyName}
                      onChange={(e) => setCustomizations({...customizations, journeyName: e.target.value})}
                      placeholder="Enter custom journey name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option value="all">All Customers</option>
                      <option value="new">New Customers</option>
                      <option value="existing">Existing Customers</option>
                      <option value="high-value">High-Value Customers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={customizations.description}
                    onChange={(e) => setCustomizations({...customizations, description: e.target.value})}
                    placeholder="Describe your customized journey"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Communication Channels</label>
                    <div className="space-y-2">
                      {['Email', 'SMS', 'Push Notifications', 'In-App Messages'].map((channel) => (
                        <label key={channel} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked={selectedTemplate.channels.includes(channel)}
                            className="rounded"
                          />
                          <span className="text-sm">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Journey Goals</label>
                    <div className="space-y-2">
                      {['Increase Conversion', 'Improve Engagement', 'Reduce Churn', 'Drive Revenue'].map((goal) => (
                        <label key={goal} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={handleUseTemplate} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Create Customized Journey
                  </Button>
                  <Button variant="outline" onClick={() => setShowCustomization(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </StaticExportLayout>
    </>
  );
}

export default function UseTemplatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UseTemplatePageContent />
    </Suspense>
  );
}