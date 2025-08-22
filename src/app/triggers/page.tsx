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
  Zap,
  Play,
  Pause,
  Edit,
  Eye,
  Trash2,
  Clock,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle,
  Globe,
  Mail,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Calendar,
  Timer,
  BarChart3
} from "lucide-react";

import Link from "next/link";

// Sample behavioral triggers data
const behavioralTriggers = [
  {
    id: "BT-001",
    name: "High-Intent Product View",
    description: "Trigger when user views pricing page multiple times",
    status: "active",
    triggerType: "behavioral",
    eventType: "page_view",
    conditions: [
      { field: "page_url", operator: "contains", value: "/pricing" },
      { field: "session_count", operator: ">=", value: "3" },
      { field: "time_on_page", operator: ">=", value: "30" }
    ],
    actions: [
      { type: "send_email", template: "pricing_interest", delay: "immediate" },
      { type: "assign_to_sales", team: "enterprise", delay: "1 hour" },
      { type: "add_to_segment", segment: "high_intent_prospects", delay: "immediate" }
    ],
    performance: {
      triggered: 1250,
      completed: 890,
      conversionRate: 24.5,
      revenue: 145000
    },
    lastTriggered: "2024-01-15 14:30",
    createdDate: "2024-01-10"
  },
  {
    id: "BT-002",
    name: "Cart Abandonment Recovery",
    description: "Trigger when items added to cart but not purchased within 2 hours",
    status: "active",
    triggerType: "temporal",
    eventType: "cart_abandonment",
    conditions: [
      { field: "event_type", operator: "equals", value: "add_to_cart" },
      { field: "time_since_event", operator: ">=", value: "2 hours" },
      { field: "purchase_completed", operator: "equals", value: "false" }
    ],
    actions: [
      { type: "send_email", template: "cart_reminder", delay: "2 hours" },
      { type: "send_push_notification", message: "Complete your purchase", delay: "4 hours" },
      { type: "apply_discount", discount: "10%", delay: "24 hours" }
    ],
    performance: {
      triggered: 2340,
      completed: 1560,
      conversionRate: 15.8,
      revenue: 89500
    },
    lastTriggered: "2024-01-15 14:25",
    createdDate: "2024-01-08"
  },
  {
    id: "BT-003",
    name: "Engagement Drop Alert",
    description: "Trigger when customer engagement drops significantly",
    status: "active",
    triggerType: "behavioral",
    eventType: "engagement_decline",
    conditions: [
      { field: "email_open_rate", operator: "<=", value: "20%" },
      { field: "last_login", operator: ">=", value: "7 days" },
      { field: "customer_tier", operator: "equals", value: "premium" }
    ],
    actions: [
      { type: "assign_to_success", team: "customer_success", delay: "immediate" },
      { type: "send_email", template: "re_engagement", delay: "24 hours" },
      { type: "schedule_call", priority: "high", delay: "48 hours" }
    ],
    performance: {
      triggered: 180,
      completed: 145,
      conversionRate: 60.0,
      revenue: 0
    },
    lastTriggered: "2024-01-15 12:15",
    createdDate: "2024-01-05"
  },
  {
    id: "BT-004",
    name: "Feature Interest Tracking",
    description: "Trigger when user explores specific feature documentation",
    status: "active",
    triggerType: "behavioral",
    eventType: "feature_exploration",
    conditions: [
      { field: "page_category", operator: "equals", value: "feature_docs" },
      { field: "pages_viewed", operator: ">=", value: "5" },
      { field: "time_spent", operator: ">=", value: "300" }
    ],
    actions: [
      { type: "send_email", template: "feature_demo_offer", delay: "1 hour" },
      { type: "add_to_segment", segment: "feature_interested", delay: "immediate" },
      { type: "trigger_automation", workflow: "feature_nurture", delay: "24 hours" }
    ],
    performance: {
      triggered: 890,
      completed: 623,
      conversionRate: 28.7,
      revenue: 67800
    },
    lastTriggered: "2024-01-15 13:45",
    createdDate: "2024-01-12"
  }
];

const triggerStats = {
  totalTriggers: behavioralTriggers.length,
  activeTriggers: behavioralTriggers.filter(t => t.status === 'active').length,
  totalTriggered: behavioralTriggers.reduce((sum, t) => sum + t.performance.triggered, 0),
  avgConversionRate: behavioralTriggers.reduce((sum, t) => sum + t.performance.conversionRate, 0) / behavioralTriggers.length,
  totalRevenue: behavioralTriggers.reduce((sum, t) => sum + t.performance.revenue, 0)
};

export default function TriggersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("triggers");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active", icon: CheckCircle },
      paused: { color: "bg-yellow-100 text-yellow-800", text: "Paused", icon: Pause },
      draft: { color: "bg-gray-100 text-gray-800", text: "Draft", icon: Clock }
    };
    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getTriggerTypeBadge = (type: string) => {
    const typeConfig = {
      behavioral: { color: "bg-blue-100 text-blue-800", text: "Behavioral" },
      temporal: { color: "bg-purple-100 text-purple-800", text: "Time-based" },
      conditional: { color: "bg-orange-100 text-orange-800", text: "Conditional" }
    };
    const config = typeConfig[type] || typeConfig.behavioral;
    return (
      <Badge variant="outline" className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getEventIcon = (eventType: string) => {
    const iconMap = {
      page_view: Globe,
      cart_abandonment: ShoppingCart,
      engagement_decline: TrendingDown,
      feature_exploration: Eye,
      form_submission: MousePointer,
      purchase: DollarSign
    };
    return iconMap[eventType] || Activity;
  };

  const filteredTriggers = behavioralTriggers.filter(trigger => {
    const matchesSearch = trigger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trigger.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || trigger.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Behavioral Triggers</h1>
              <p className="text-muted-foreground">
                Create and manage automated responses to customer behavior patterns
              </p>
            </div>
            <Button asChild>
              <Link href="/triggers/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Trigger
              </Link>
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Triggers</p>
                    <p className="text-2xl font-bold">{triggerStats.totalTriggers}</p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Triggers</p>
                    <p className="text-2xl font-bold">{triggerStats.activeTriggers}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Triggered</p>
                    <p className="text-2xl font-bold">{triggerStats.totalTriggered.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Conversion</p>
                    <p className="text-2xl font-bold">{triggerStats.avgConversionRate.toFixed(1)}%</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${(triggerStats.totalRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="triggers">Active Triggers</TabsTrigger>
              <TabsTrigger value="templates">Trigger Templates</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            {/* Active Triggers Tab */}
            <TabsContent value="triggers" className="space-y-6">
              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search triggers by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                </select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>

              {/* Triggers List */}
              <div className="grid gap-6">
                {filteredTriggers.map((trigger) => {
                  const EventIcon = getEventIcon(trigger.eventType);
                  
                  return (
                    <Card key={trigger.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <EventIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {trigger.name}
                                {getStatusBadge(trigger.status)}
                                {getTriggerTypeBadge(trigger.triggerType)}
                              </CardTitle>
                              <CardDescription>{trigger.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              {trigger.status === 'active' ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">{trigger.performance.triggered.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Triggered</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">{trigger.performance.completed.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Completed</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">{trigger.performance.conversionRate}%</div>
                            <div className="text-sm text-muted-foreground">Conversion</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">
                              ${(trigger.performance.revenue / 1000).toFixed(0)}K
                            </div>
                            <div className="text-sm text-muted-foreground">Revenue</div>
                          </div>
                        </div>

                        {/* Trigger Conditions */}
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Trigger Conditions</h4>
                          <div className="grid gap-2">
                            {trigger.conditions.map((condition, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                                <Badge variant="secondary" className="text-xs">{condition.field}</Badge>
                                <span className="text-muted-foreground">{condition.operator}</span>
                                <span className="font-medium">{condition.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Automated Actions</h4>
                          <div className="grid gap-2">
                            {trigger.actions.map((action, index) => (
                              <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                    {index + 1}
                                  </div>
                                  <span>{action.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                                  {action.template && <Badge variant="outline" className="text-xs">{action.template}</Badge>}
                                  {action.segment && <Badge variant="outline" className="text-xs">{action.segment}</Badge>}
                                </div>
                                <span className="text-muted-foreground">{action.delay}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Created: {trigger.createdDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Last triggered: {trigger.lastTriggered}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            View Analytics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Trigger Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-blue-500" />
                      Cart Abandonment
                    </CardTitle>
                    <CardDescription>
                      Recover lost sales from abandoned shopping carts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>• Email reminder sequence</div>
                      <div>• Progressive discount offers</div>
                      <div>• Push notifications</div>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-500" />
                      High Intent Signals
                    </CardTitle>
                    <CardDescription>
                      Identify and engage high-intent prospects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>• Pricing page visits</div>
                      <div>• Feature comparison views</div>
                      <div>• Demo requests</div>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Churn Prevention
                    </CardTitle>
                    <CardDescription>
                      Prevent customer churn with early warning signals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>• Engagement decline detection</div>
                      <div>• Usage pattern changes</div>
                      <div>• Support ticket increases</div>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Performance Comparison</CardTitle>
                    <CardDescription>Conversion rates by trigger type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {behavioralTriggers.map((trigger, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">{trigger.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${trigger.performance.conversionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{trigger.performance.conversionRate}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Attribution</CardTitle>
                    <CardDescription>Revenue generated by each trigger</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {behavioralTriggers
                        .sort((a, b) => b.performance.revenue - a.performance.revenue)
                        .map((trigger, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{trigger.name}</span>
                          <div className="text-right">
                            <div className="font-medium">${(trigger.performance.revenue / 1000).toFixed(0)}K</div>
                            <div className="text-xs text-muted-foreground">
                              {((trigger.performance.revenue / triggerStats.totalRevenue) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </StaticExportLayout>
    </>
  );
}