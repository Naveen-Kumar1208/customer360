"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  Eye,
  Play,
  Users,
  Clock,
  Target,
  TrendingUp,
  Star,
  Download,
  Upload,
  GitBranch,
  Mail,
  MessageSquare,
  Bell,
  ShoppingCart,
  UserPlus,
  CreditCard,
  HeadphonesIcon,
  Briefcase,
  Heart,
  Zap,
  Shield,
  Smartphone
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Template categories
const templateCategories = [
  { id: "all", name: "All Templates", count: 24 },
  { id: "onboarding", name: "Onboarding", count: 8 },
  { id: "engagement", name: "Engagement", count: 6 },
  { id: "conversion", name: "Conversion", count: 4 },
  { id: "retention", name: "Retention", count: 3 },
  { id: "support", name: "Support", count: 2 },
  { id: "upsell", name: "Upsell/Cross-sell", count: 1 }
];

// Sample journey templates
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
    previewStages: [
      { name: "Welcome Email", type: "email", delay: "immediate" },
      { name: "Profile Setup Reminder", type: "push", delay: "1 day" },
      { name: "Product Recommendations", type: "email", delay: "3 days" },
      { name: "First Purchase Incentive", type: "sms", delay: "5 days" },
      { name: "Purchase Confirmation", type: "email", delay: "on purchase" }
    ],
    channels: ["Email", "SMS", "Push Notifications"],
    segments: ["New Customers", "Unverified Users"],
    automations: ["Behavioral Triggers", "Time-based Delays", "Conversion Tracking"],
    campaigns: ["Welcome Series", "Product Discovery", "First Purchase"]
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
    previewStages: [
      { name: "Trial Started", type: "email", delay: "immediate" },
      { name: "Feature Discovery", type: "in-app", delay: "2 days" },
      { name: "Usage Analytics", type: "email", delay: "5 days" },
      { name: "Upgrade Reminder", type: "push", delay: "10 days" },
      { name: "Last Chance Offer", type: "email", delay: "13 days" }
    ],
    channels: ["Email", "In-App Messages", "Push Notifications"],
    segments: ["Trial Users", "Feature Adopters", "High Intent"],
    automations: ["Usage Tracking", "Feature Engagement", "Conversion Funnels"],
    campaigns: ["Trial Activation", "Feature Education", "Upgrade Campaigns"]
  },
  {
    id: "JT-003",
    name: "Customer Support Resolution",
    description: "Guide customers through support interactions to resolution",
    category: "support",
    type: "system",
    rating: 4.6,
    usageCount: 445,
    estimatedDuration: "3 days",
    completionRate: 89.2,
    conversionRate: 76.8,
    tags: ["email", "sms", "chat"],
    industry: "Multi-Industry",
    complexity: "beginner",
    thumbnail: "/templates/support-resolution.png",
    previewStages: [
      { name: "Ticket Created", type: "email", delay: "immediate" },
      { name: "Status Update", type: "sms", delay: "1 hour" },
      { name: "Solution Provided", type: "email", delay: "4 hours" },
      { name: "Resolution Confirmation", type: "chat", delay: "1 day" },
      { name: "Feedback Request", type: "email", delay: "2 days" }
    ],
    channels: ["Email", "SMS", "Live Chat"],
    segments: ["Support Tickets", "Priority Customers"],
    automations: ["Ticket Routing", "SLA Monitoring", "Satisfaction Tracking"],
    campaigns: ["Support Communications", "Follow-up Surveys"]
  },
  {
    id: "JT-004", 
    name: "Abandoned Cart Recovery",
    description: "Re-engage customers who left items in their cart",
    category: "conversion",
    type: "system",
    rating: 4.7,
    usageCount: 1089,
    estimatedDuration: "72 hours",
    completionRate: 45.3,
    conversionRate: 18.9,
    tags: ["email", "sms", "push", "retargeting"],
    industry: "E-commerce",
    complexity: "beginner",
    thumbnail: "/templates/cart-recovery.png",
    previewStages: [
      { name: "Cart Reminder", type: "email", delay: "1 hour" },
      { name: "Product Showcase", type: "push", delay: "6 hours" },
      { name: "Discount Offer", type: "email", delay: "24 hours" },
      { name: "Final Notice", type: "sms", delay: "48 hours" },
      { name: "Alternative Products", type: "email", delay: "72 hours" }
    ],
    channels: ["Email", "SMS", "Push Notifications", "Web Retargeting"],
    segments: ["Cart Abandoners", "High-Value Carts", "Repeat Customers"],
    automations: ["Cart Tracking", "Inventory Monitoring", "Price Drop Alerts"],
    campaigns: ["Recovery Emails", "Incentive Offers", "Cross-sell Campaigns"]
  },
  {
    id: "JT-005",
    name: "Loyalty Program Onboarding",
    description: "Introduce customers to your loyalty program and drive engagement",
    category: "engagement",
    type: "system",
    rating: 4.5,
    usageCount: 723,
    estimatedDuration: "30 days",
    completionRate: 61.7,
    conversionRate: 42.1,
    tags: ["email", "app", "sms", "loyalty"],
    industry: "Retail",
    complexity: "intermediate",
    thumbnail: "/templates/loyalty-onboarding.png",
    previewStages: [
      { name: "Program Introduction", type: "email", delay: "immediate" },
      { name: "First Reward", type: "app", delay: "3 days" },
      { name: "Points Balance", type: "sms", delay: "1 week" },
      { name: "Tier Upgrade", type: "email", delay: "2 weeks" },
      { name: "Exclusive Offers", type: "app", delay: "1 month" }
    ],
    channels: ["Email", "Mobile App", "SMS"],
    segments: ["New Members", "Active Shoppers", "VIP Customers"],
    automations: ["Points Tracking", "Tier Management", "Reward Distribution"],
    campaigns: ["Welcome Series", "Engagement Campaigns", "Tier Promotions"]
  },
  {
    id: "JT-006",
    name: "Win-Back Campaign",
    description: "Re-engage inactive customers with personalized offers",
    category: "retention",
    type: "system",
    rating: 4.4,
    usageCount: 556,
    estimatedDuration: "21 days",
    completionRate: 38.9,
    conversionRate: 15.6,
    tags: ["email", "sms", "direct-mail"],
    industry: "Multi-Industry",
    complexity: "advanced",
    thumbnail: "/templates/win-back.png",
    previewStages: [
      { name: "We Miss You", type: "email", delay: "immediate" },
      { name: "Special Discount", type: "sms", delay: "3 days" },
      { name: "Product Updates", type: "email", delay: "1 week" },
      { name: "Personal Outreach", type: "direct-mail", delay: "2 weeks" },
      { name: "Final Offer", type: "email", delay: "3 weeks" }
    ],
    channels: ["Email", "SMS", "Direct Mail"],
    segments: ["Inactive Customers", "Lapsed Buyers", "High-Value Churned"],
    automations: ["Inactivity Detection", "Segmentation Rules", "Offer Optimization"],
    campaigns: ["Win-Back Series", "Reactivation Offers", "Feedback Collection"]
  }
];

// Custom templates created by user
const customTemplates = [
  {
    id: "CT-001",
    name: "Banking Loan Application",
    description: "Custom journey for loan application process",
    category: "conversion",
    type: "custom",
    rating: 0,
    usageCount: 23,
    estimatedDuration: "10 days",
    completionRate: 0,
    conversionRate: 0,
    tags: ["email", "sms", "banking"],
    industry: "Financial",
    complexity: "advanced",
    lastModified: "2024-01-10",
    author: "John Smith"
  },
  {
    id: "CT-002", 
    name: "Insurance Renewal Flow",
    description: "Custom renewal process for insurance customers",
    category: "retention",
    type: "custom",
    rating: 0,
    usageCount: 45,
    estimatedDuration: "45 days",
    completionRate: 0,
    conversionRate: 0,
    tags: ["email", "phone", "insurance"],
    industry: "Insurance",
    complexity: "intermediate",
    lastModified: "2024-01-08",
    author: "Sarah Johnson"
  }
];

export default function JourneyTemplatesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("system");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const getComplexityBadge = (complexity: string) => {
    const config = {
      beginner: { color: "bg-green-100 text-green-800", text: "Beginner" },
      intermediate: { color: "bg-yellow-100 text-yellow-800", text: "Intermediate" },
      advanced: { color: "bg-red-100 text-red-800", text: "Advanced" }
    };
    const complexityConfig = config[complexity] || config.beginner;
    return (
      <Badge className={complexityConfig.color}>
        {complexityConfig.text}
      </Badge>
    );
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'push notifications': case 'push': return Bell;
      case 'in-app messages': case 'in-app': case 'app': return Smartphone;
      case 'live chat': case 'chat': return MessageSquare;
      case 'web retargeting': return Target;
      case 'mobile app': return Smartphone;
      case 'direct mail': return Mail;
      case 'phone': return HeadphonesIcon;
      default: return Zap;
    }
  };

  const filteredTemplates = (templates) => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const useTemplate = (template) => {
    // Navigate to create journey with template pre-loaded
    router.push(`/journey-analytics/create?template=${template.id}`);
  };

  const editTemplate = (template) => {
    // Navigate to template editor
    router.push(`/journey-analytics/templates/edit?id=${template.id}`);
  };

  const duplicateTemplate = (template) => {
    // Create copy of template
    console.log("Duplicating template:", template.id);
  };

  const deleteTemplate = (template) => {
    // Delete custom template
    console.log("Deleting template:", template.id);
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/journey-analytics">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analytics
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Journey Templates</h1>
                <p className="text-muted-foreground">
                  Browse and customize pre-built journey templates or create your own
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Template
              </Button>
              <Button asChild>
                <Link href="/journey-analytics/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                    <p className="text-2xl font-bold">{journeyTemplates.length + customTemplates.length}</p>
                  </div>
                  <GitBranch className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">System Templates</p>
                    <p className="text-2xl font-bold">{journeyTemplates.length}</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Custom Templates</p>
                    <p className="text-2xl font-bold">{customTemplates.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">4.7</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {templateCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Template Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="system">System Templates</TabsTrigger>
              <TabsTrigger value="custom">My Templates</TabsTrigger>
            </TabsList>

            {/* System Templates */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates(journeyTemplates).map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">{template.industry}</div>
                          {getComplexityBadge(template.complexity)}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Template Metrics */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{template.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Used:</span>
                          <span className="font-medium">{template.usageCount.toLocaleString()}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{template.completionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Conversion:</span>
                          <span className="font-medium">{template.conversionRate}%</span>
                        </div>
                      </div>

                      {/* Channels */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Channels</div>
                        <div className="flex flex-wrap gap-1">
                          {template.channels.slice(0, 3).map((channel) => {
                            const IconComponent = getChannelIcon(channel);
                            return (
                              <div key={channel} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                <IconComponent className="h-3 w-3" />
                                <span>{channel}</span>
                              </div>
                            );
                          })}
                          {template.channels.length > 3 && (
                            <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                              +{template.channels.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Preview Stages */}
                      <div>
                        <div className="text-xs text-muted-foreground mb-2">Journey Preview</div>
                        <div className="space-y-1">
                          {template.previewStages.slice(0, 3).map((stage, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs">
                              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-medium">{index + 1}</span>
                              </div>
                              <span className="flex-1">{stage.name}</span>
                              <Badge variant="outline" className="text-xs">{stage.type}</Badge>
                            </div>
                          ))}
                          {template.previewStages.length > 3 && (
                            <div className="text-xs text-muted-foreground text-center pt-1">
                              +{template.previewStages.length - 3} more stages
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <Link href={`/journey-analytics/templates/use?template=${template.id}`}>
                            <Play className="h-4 w-4 mr-1" />
                            Use Template
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedTemplate(template)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => duplicateTemplate(template)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Custom Templates */}
            <TabsContent value="custom" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates(customTemplates).map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">{template.industry}</div>
                          {getComplexityBadge(template.complexity)}
                        </div>
                        <Badge variant="outline" className="text-xs">Custom</Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                      <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Template Info */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{template.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Used:</span>
                          <span className="font-medium">{template.usageCount}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Author:</span>
                          <span className="font-medium">{template.author}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Modified:</span>
                          <span className="font-medium">{template.lastModified}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <Link href={`/journey-analytics/templates/use?template=${template.id}`}>
                            <Play className="h-4 w-4 mr-1" />
                            Use Template
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => editTemplate(template)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => duplicateTemplate(template)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteTemplate(template)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Empty state for custom templates */}
                {customTemplates.length === 0 && (
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-6 text-center">
                      <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">No Custom Templates</h4>
                      <p className="text-gray-600 mb-4">Create your first custom journey template</p>
                      <Button asChild>
                        <Link href="/journey-analytics/create">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Template
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Template Detail Modal */}
          {selectedTemplate && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedTemplate.name}</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Detailed template information would go here */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Template Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Industry:</span>
                          <span>{selectedTemplate.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Complexity:</span>
                          <span>{selectedTemplate.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Duration:</span>
                          <span>{selectedTemplate.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Usage Count:</span>
                          <span>{selectedTemplate.usageCount}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <span>{selectedTemplate.rating}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Rate:</span>
                          <span>{selectedTemplate.completionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversion Rate:</span>
                          <span>{selectedTemplate.conversionRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={() => useTemplate(selectedTemplate)}>
                      <Play className="h-4 w-4 mr-2" />
                      Use This Template
                    </Button>
                    <Button variant="outline" onClick={() => duplicateTemplate(selectedTemplate)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </StaticExportLayout>
    </>
  );
}