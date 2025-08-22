"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Plus,
  Minus,
  Save,
  Play,
  Zap,
  Target,
  Clock,
  Users,
  Settings,
  ArrowRight,
  Trash2,
  Copy,
  Eye,
  Mail,
  Bell,
  Database,
  Filter,
  BarChart3,
  Globe,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Calendar,
  Timer,
  Activity,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface TriggerCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  dataType: "string" | "number" | "boolean" | "date";
}

interface TriggerAction {
  id: string;
  type: string;
  config: {
    template?: string;
    subject?: string;
    message?: string;
    delay?: string;
    segment?: string;
    webhook?: string;
    [key: string]: any;
  };
}

const triggerTemplates = [
  {
    id: "template-1",
    name: "Cart Abandonment",
    description: "Recover lost sales from abandoned shopping carts",
    category: "e-commerce",
    eventType: "cart_abandonment",
    conditions: [
      { field: "event_type", operator: "equals", value: "add_to_cart" },
      { field: "time_since_event", operator: ">=", value: "2 hours" },
      { field: "purchase_completed", operator: "equals", value: "false" }
    ],
    actions: [
      { type: "send_email", config: { template: "cart_reminder", delay: "2 hours" } },
      { type: "apply_discount", config: { discount: "10%", delay: "24 hours" } }
    ]
  },
  {
    id: "template-2",
    name: "High Intent Signals",
    description: "Identify and engage high-intent prospects",
    category: "lead-generation",
    eventType: "page_view",
    conditions: [
      { field: "page_url", operator: "contains", value: "/pricing" },
      { field: "session_count", operator: ">=", value: "3" },
      { field: "time_on_page", operator: ">=", value: "30" }
    ],
    actions: [
      { type: "send_email", config: { template: "pricing_interest", delay: "immediate" } },
      { type: "assign_to_sales", config: { team: "enterprise", delay: "1 hour" } }
    ]
  },
  {
    id: "template-3",
    name: "Engagement Drop Alert",
    description: "Prevent customer churn with early warning signals",
    category: "retention",
    eventType: "engagement_decline",
    conditions: [
      { field: "email_open_rate", operator: "<=", value: "20%" },
      { field: "last_login", operator: ">=", value: "7 days" },
      { field: "customer_tier", operator: "equals", value: "premium" }
    ],
    actions: [
      { type: "assign_to_success", config: { team: "customer_success", delay: "immediate" } },
      { type: "send_email", config: { template: "re_engagement", delay: "24 hours" } }
    ]
  }
];

const eventTypes = [
  { value: "page_view", label: "Page View", icon: Globe },
  { value: "form_submission", label: "Form Submission", icon: MousePointer },
  { value: "cart_abandonment", label: "Cart Abandonment", icon: ShoppingCart },
  { value: "purchase", label: "Purchase", icon: DollarSign },
  { value: "email_open", label: "Email Open", icon: Mail },
  { value: "engagement_decline", label: "Engagement Decline", icon: AlertTriangle },
  { value: "feature_exploration", label: "Feature Exploration", icon: Eye },
  { value: "login", label: "User Login", icon: Users },
  { value: "download", label: "File Download", icon: Database }
];

const actionTypes = [
  { value: "send_email", label: "Send Email", icon: Mail, category: "communication" },
  { value: "send_sms", label: "Send SMS", icon: Bell, category: "communication" },
  { value: "assign_to_sales", label: "Assign to Sales", icon: Users, category: "sales" },
  { value: "assign_to_success", label: "Assign to Success", icon: Target, category: "support" },
  { value: "add_to_segment", label: "Add to Segment", icon: Database, category: "data" },
  { value: "apply_discount", label: "Apply Discount", icon: DollarSign, category: "marketing" },
  { value: "trigger_automation", label: "Trigger Automation", icon: Zap, category: "automation" },
  { value: "update_profile", label: "Update Profile", icon: Settings, category: "data" },
  { value: "webhook", label: "Call Webhook", icon: Activity, category: "integration" }
];

export default function CreateTriggerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [triggerData, setTriggerData] = useState({
    name: "",
    description: "",
    eventType: "page_view",
    triggerType: "behavioral",
    status: "draft",
    priority: "medium"
  });

  const [conditions, setConditions] = useState<TriggerCondition[]>([
    {
      id: "condition-1",
      field: "",
      operator: "equals",
      value: "",
      dataType: "string"
    }
  ]);

  const [actions, setActions] = useState<TriggerAction[]>([
    {
      id: "action-1",
      type: "send_email",
      config: {}
    }
  ]);

  const addCondition = () => {
    const newCondition: TriggerCondition = {
      id: `condition-${Date.now()}`,
      field: "",
      operator: "equals",
      value: "",
      dataType: "string"
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (conditionId: string) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(condition => condition.id !== conditionId));
    }
  };

  const updateCondition = (conditionId: string, updates: Partial<TriggerCondition>) => {
    setConditions(conditions.map(condition => 
      condition.id === conditionId ? { ...condition, ...updates } : condition
    ));
  };

  const addAction = () => {
    const newAction: TriggerAction = {
      id: `action-${Date.now()}`,
      type: "send_email",
      config: {}
    };
    setActions([...actions, newAction]);
  };

  const removeAction = (actionId: string) => {
    if (actions.length > 1) {
      setActions(actions.filter(action => action.id !== actionId));
    }
  };

  const updateAction = (actionId: string, updates: Partial<TriggerAction>) => {
    setActions(actions.map(action => 
      action.id === actionId ? { ...action, ...updates } : action
    ));
  };

  const useTemplate = (template: any) => {
    setTriggerData({
      ...triggerData,
      name: template.name,
      description: template.description,
      eventType: template.eventType
    });

    const templateConditions = template.conditions.map((cond: any, index: number) => ({
      id: `condition-${index + 1}`,
      field: cond.field,
      operator: cond.operator,
      value: cond.value,
      dataType: "string" as const
    }));

    const templateActions = template.actions.map((action: any, index: number) => ({
      id: `action-${index + 1}`,
      type: action.type,
      config: action.config
    }));

    setConditions(templateConditions);
    setActions(templateActions);
  };

  const handleSave = (status: "draft" | "active") => {
    console.log("Saving trigger:", { ...triggerData, status, conditions, actions });
    router.push("/triggers");
  };

  const getEventIcon = (eventType: string) => {
    const event = eventTypes.find(e => e.value === eventType);
    return event ? event.icon : Activity;
  };

  const getActionIcon = (actionType: string) => {
    const action = actionTypes.find(a => a.value === actionType);
    return action ? action.icon : Zap;
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/triggers">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Triggers
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Behavioral Trigger</h1>
                <p className="text-muted-foreground">
                  Set up automated responses to customer behavior patterns and events
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSave("draft")}>
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button onClick={() => handleSave("active")}>
                <Play className="h-4 w-4 mr-2" />
                Activate Trigger
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Setup</TabsTrigger>
              <TabsTrigger value="conditions">Trigger Conditions</TabsTrigger>
              <TabsTrigger value="actions">Actions & Responses</TabsTrigger>
              <TabsTrigger value="preview">Preview & Test</TabsTrigger>
            </TabsList>

            {/* Basic Setup Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Information</CardTitle>
                    <CardDescription>Basic details about your behavioral trigger</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="trigger-name" className="block text-sm font-medium mb-2">Trigger Name</label>
                      <Input
                        id="trigger-name"
                        placeholder="e.g., High-Intent Product View"
                        value={triggerData.name}
                        onChange={(e) => setTriggerData({...triggerData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="trigger-description" className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        id="trigger-description"
                        placeholder="Describe when this trigger should fire and what it accomplishes..."
                        rows={3}
                        value={triggerData.description}
                        onChange={(e) => setTriggerData({...triggerData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="event-type" className="block text-sm font-medium mb-2">Primary Event Type</label>
                      <select
                        id="event-type"
                        className="w-full px-3 py-2 border rounded-md"
                        value={triggerData.eventType}
                        onChange={(e) => setTriggerData({...triggerData, eventType: e.target.value})}
                      >
                        {eventTypes.map((event) => (
                          <option key={event.value} value={event.value}>
                            {event.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="trigger-type" className="block text-sm font-medium mb-2">Trigger Type</label>
                      <select
                        id="trigger-type"
                        className="w-full px-3 py-2 border rounded-md"
                        value={triggerData.triggerType}
                        onChange={(e) => setTriggerData({...triggerData, triggerType: e.target.value})}
                      >
                        <option value="behavioral">Behavioral</option>
                        <option value="temporal">Time-based</option>
                        <option value="conditional">Conditional</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-2">Priority Level</label>
                      <select
                        id="priority"
                        className="w-full px-3 py-2 border rounded-md"
                        value={triggerData.priority}
                        onChange={(e) => setTriggerData({...triggerData, priority: e.target.value})}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                        <option value="critical">Critical Priority</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Templates</CardTitle>
                    <CardDescription>Start with a pre-built template or create from scratch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {triggerTemplates.map((template) => {
                        const EventIcon = getEventIcon(template.eventType);
                        return (
                          <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" 
                               onClick={() => useTemplate(template)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <EventIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{template.name}</h4>
                                  <p className="text-sm text-muted-foreground">{template.description}</p>
                                  <div className="flex gap-1 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {template.category}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {template.conditions.length} conditions
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {template.actions.length} actions
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Use Template
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trigger Conditions Tab */}
            <TabsContent value="conditions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Trigger Conditions</CardTitle>
                      <CardDescription>Define when this trigger should fire based on customer behavior</CardDescription>
                    </div>
                    <Button onClick={addCondition}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conditions.map((condition, index) => (
                      <Card key={condition.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                              </div>
                              <span className="font-medium">Condition {index + 1}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              {conditions.length > 1 && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeCondition(condition.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Field</label>
                              <select
                                value={condition.field}
                                onChange={(e) => updateCondition(condition.id, { field: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                              >
                                <option value="">Select field...</option>
                                <option value="page_url">Page URL</option>
                                <option value="session_count">Session Count</option>
                                <option value="time_on_page">Time on Page</option>
                                <option value="email_open_rate">Email Open Rate</option>
                                <option value="last_login">Last Login</option>
                                <option value="customer_tier">Customer Tier</option>
                                <option value="purchase_amount">Purchase Amount</option>
                                <option value="event_count">Event Count</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Operator</label>
                              <select
                                value={condition.operator}
                                onChange={(e) => updateCondition(condition.id, { operator: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md"
                              >
                                <option value="equals">Equals</option>
                                <option value="not_equals">Not Equals</option>
                                <option value="contains">Contains</option>
                                <option value="not_contains">Not Contains</option>
                                <option value="greater_than">Greater Than</option>
                                <option value="less_than">Less Than</option>
                                <option value="greater_or_equal">Greater or Equal</option>
                                <option value="less_or_equal">Less or Equal</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Value</label>
                              <Input
                                value={condition.value}
                                onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                                placeholder="Enter value..."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Data Type</label>
                              <select
                                value={condition.dataType}
                                onChange={(e) => updateCondition(condition.id, { dataType: e.target.value as any })}
                                className="w-full px-3 py-2 border rounded-md"
                              >
                                <option value="string">Text</option>
                                <option value="number">Number</option>
                                <option value="boolean">Boolean</option>
                                <option value="date">Date</option>
                              </select>
                            </div>
                          </div>

                          {index < conditions.length - 1 && (
                            <div className="mt-4 text-center">
                              <Badge variant="outline" className="bg-gray-100">AND</Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Condition Logic Preview */}
                  <Card className="mt-6 bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-lg">Condition Logic Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <span className="font-medium">Trigger will fire when:</span>
                        <div className="mt-2 space-y-1">
                          {conditions.map((condition, index) => (
                            <div key={condition.id} className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                {index > 0 ? "AND" : "IF"}
                              </span>
                              <span className="font-medium">{condition.field || "field"}</span>
                              <span className="text-muted-foreground">{condition.operator || "operator"}</span>
                              <span className="font-medium">"{condition.value || "value"}"</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Actions & Responses Tab */}
            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Automated Actions</CardTitle>
                      <CardDescription>Define what happens when the trigger conditions are met</CardDescription>
                    </div>
                    <Button onClick={addAction}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Action
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {actions.map((action, index) => {
                      const ActionIcon = getActionIcon(action.type);
                      const actionTypeInfo = actionTypes.find(a => a.value === action.type);
                      
                      return (
                        <Card key={action.id} className="border-l-4 border-l-green-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <ActionIcon className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                  <span className="font-medium">Action {index + 1}</span>
                                  {actionTypeInfo && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      {actionTypeInfo.category}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Copy className="h-4 w-4" />
                                </Button>
                                {actions.length > 1 && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => removeAction(action.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">Action Type</label>
                                <select
                                  value={action.type}
                                  onChange={(e) => updateAction(action.id, { type: e.target.value, config: {} })}
                                  className="w-full px-3 py-2 border rounded-md"
                                >
                                  {actionTypes.map((actionType) => (
                                    <option key={actionType.value} value={actionType.value}>
                                      {actionType.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2">Delay</label>
                                <select
                                  value={action.config.delay || "immediate"}
                                  onChange={(e) => updateAction(action.id, { 
                                    config: { ...action.config, delay: e.target.value }
                                  })}
                                  className="w-full px-3 py-2 border rounded-md"
                                >
                                  <option value="immediate">Immediate</option>
                                  <option value="5 minutes">5 Minutes</option>
                                  <option value="1 hour">1 Hour</option>
                                  <option value="24 hours">24 Hours</option>
                                  <option value="3 days">3 Days</option>
                                  <option value="1 week">1 Week</option>
                                </select>
                              </div>
                            </div>

                            {/* Action-specific configuration */}
                            {action.type === "send_email" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Email Template</label>
                                  <select
                                    value={action.config.template || ""}
                                    onChange={(e) => updateAction(action.id, { 
                                      config: { ...action.config, template: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-md"
                                  >
                                    <option value="">Select template...</option>
                                    <option value="welcome">Welcome Email</option>
                                    <option value="cart_reminder">Cart Reminder</option>
                                    <option value="pricing_interest">Pricing Interest</option>
                                    <option value="re_engagement">Re-engagement</option>
                                    <option value="feature_demo">Feature Demo</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Subject Line</label>
                                  <Input
                                    value={action.config.subject || ""}
                                    onChange={(e) => updateAction(action.id, { 
                                      config: { ...action.config, subject: e.target.value }
                                    })}
                                    placeholder="Email subject..."
                                  />
                                </div>
                              </div>
                            )}

                            {action.type === "add_to_segment" && (
                              <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Target Segment</label>
                                <select
                                  value={action.config.segment || ""}
                                  onChange={(e) => updateAction(action.id, { 
                                    config: { ...action.config, segment: e.target.value }
                                  })}
                                  className="w-full px-3 py-2 border rounded-md"
                                >
                                  <option value="">Select segment...</option>
                                  <option value="high_intent_prospects">High Intent Prospects</option>
                                  <option value="cart_abandoners">Cart Abandoners</option>
                                  <option value="feature_interested">Feature Interested</option>
                                  <option value="at_risk_customers">At Risk Customers</option>
                                  <option value="vip_customers">VIP Customers</option>
                                </select>
                              </div>
                            )}

                            {action.type === "assign_to_sales" && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Sales Team</label>
                                  <select
                                    value={action.config.team || ""}
                                    onChange={(e) => updateAction(action.id, { 
                                      config: { ...action.config, team: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-md"
                                  >
                                    <option value="">Select team...</option>
                                    <option value="enterprise">Enterprise Sales</option>
                                    <option value="smb">SMB Sales</option>
                                    <option value="inside_sales">Inside Sales</option>
                                    <option value="customer_success">Customer Success</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Priority</label>
                                  <select
                                    value={action.config.priority || "medium"}
                                    onChange={(e) => updateAction(action.id, { 
                                      config: { ...action.config, priority: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border rounded-md"
                                  >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {action.type === "webhook" && (
                              <div className="mt-4">
                                <label className="block text-sm font-medium mb-2">Webhook URL</label>
                                <Input
                                  value={action.config.webhook || ""}
                                  onChange={(e) => updateAction(action.id, { 
                                    config: { ...action.config, webhook: e.target.value }
                                  })}
                                  placeholder="https://your-webhook-url.com/endpoint"
                                />
                              </div>
                            )}

                            {index < actions.length - 1 && (
                              <div className="mt-4 text-center">
                                <ArrowRight className="h-4 w-4 text-gray-400 mx-auto" />
                                <span className="text-xs text-muted-foreground">THEN</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preview & Test Tab */}
            <TabsContent value="preview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Trigger Summary</CardTitle>
                    <CardDescription>Review your trigger configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Trigger Name</div>
                        <div className="font-medium">{triggerData.name || "Untitled Trigger"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Description</div>
                        <div className="font-medium">{triggerData.description || "No description"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Event Type</div>
                        <Badge variant="outline">{triggerData.eventType}</Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Priority</div>
                        <Badge variant="outline">{triggerData.priority}</Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Conditions</div>
                        <div className="font-medium">{conditions.length} condition(s)</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Actions</div>
                        <div className="font-medium">{actions.length} action(s)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Testing & Validation</CardTitle>
                    <CardDescription>Test your trigger before activation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Trigger Flow
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Test with Sample Data
                      </Button>
                      <Button className="w-full" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Validate Conditions
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Check Configuration
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Validation Results</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>All conditions are properly configured</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Actions have valid configurations</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Event type is supported</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span>Consider adding exit conditions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Trigger Flow Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Trigger Flow Preview</CardTitle>
                  <CardDescription>Visual representation of your behavioral trigger</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <div className="font-medium">{triggerData.name || "Behavioral Trigger"}</div>
                      <Badge variant="outline" className="mt-1">{triggerData.eventType}</Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Conditions */}
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Filter className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h4 className="font-medium mb-2">Conditions</h4>
                        <div className="text-sm text-muted-foreground">
                          {conditions.length} condition(s) must be met
                        </div>
                        <div className="mt-2 space-y-1">
                          {conditions.slice(0, 2).map((condition, index) => (
                            <div key={index} className="text-xs bg-white p-2 rounded border">
                              {condition.field || "field"} {condition.operator || "="} {condition.value || "value"}
                            </div>
                          ))}
                          {conditions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{conditions.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-gray-400" />
                      </div>

                      {/* Actions */}
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Actions</h4>
                        <div className="text-sm text-muted-foreground">
                          {actions.length} action(s) will execute
                        </div>
                        <div className="mt-2 space-y-1">
                          {actions.slice(0, 2).map((action, index) => {
                            const actionInfo = actionTypes.find(a => a.value === action.type);
                            return (
                              <div key={index} className="text-xs bg-white p-2 rounded border">
                                {actionInfo?.label || action.type}
                              </div>
                            );
                          })}
                          {actions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{actions.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StaticExportLayout>
    </>
  );
}