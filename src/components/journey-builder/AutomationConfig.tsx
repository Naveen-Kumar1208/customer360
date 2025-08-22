"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Zap,
  GitBranch,
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  Target,
  Plus,
  Settings,
  Calendar,
  Timer,
  Activity,
  MousePointer,
  ShoppingCart,
  Eye
} from "lucide-react";

interface AutomationTrigger {
  id: string;
  type: 'event' | 'time' | 'behavior' | 'attribute';
  name: string;
  description: string;
  conditions: AutomationCondition[];
  enabled: boolean;
}

interface AutomationCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'within_days' | 'older_than_days';
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'date';
}

interface WaitCondition {
  id: string;
  type: 'fixed_time' | 'relative_time' | 'event_based' | 'conditional';
  duration?: number;
  unit?: 'minutes' | 'hours' | 'days' | 'weeks';
  waitFor?: string;
  conditions?: AutomationCondition[];
  maxWait?: number;
  maxWaitUnit?: 'hours' | 'days' | 'weeks';
}

const triggerTypes = [
  {
    type: 'event',
    icon: Zap,
    title: 'Event Trigger',
    description: 'Trigger based on customer actions',
    examples: ['User signup', 'Purchase made', 'Email opened', 'Page visited', 'Cart abandoned']
  },
  {
    type: 'time',
    icon: Clock,
    title: 'Time Trigger',
    description: 'Trigger at specific times',
    examples: ['Daily at 9 AM', 'Weekly on Monday', 'Monthly on 1st', 'Custom schedule']
  },
  {
    type: 'behavior',
    icon: Activity,
    title: 'Behavior Trigger',
    description: 'Trigger based on behavior patterns',
    examples: ['Inactive for 7 days', 'High engagement', 'Low engagement', 'Multiple purchases']
  },
  {
    type: 'attribute',
    icon: Users,
    title: 'Attribute Trigger',
    description: 'Trigger based on customer attributes',
    examples: ['Location change', 'Segment change', 'Profile update', 'Preference change']
  }
];

const waitTypes = [
  {
    type: 'fixed_time',
    icon: Timer,
    title: 'Fixed Time',
    description: 'Wait for a specific duration',
    examples: ['Wait 1 hour', 'Wait 2 days', 'Wait 1 week']
  },
  {
    type: 'relative_time',
    icon: Calendar,
    title: 'Relative Time',
    description: 'Wait until a specific time',
    examples: ['Wait until 9 AM', 'Wait until Monday', 'Wait until end of month']
  },
  {
    type: 'event_based',
    icon: MousePointer,
    title: 'Event Based',
    description: 'Wait for customer action',
    examples: ['Until email opened', 'Until purchase made', 'Until page visited']
  },
  {
    type: 'conditional',
    icon: GitBranch,
    title: 'Conditional Wait',
    description: 'Wait based on conditions',
    examples: ['Until condition met', 'While condition true', 'If/else logic']
  }
];

const behaviorEvents = [
  { id: 'signup', name: 'User Signup', category: 'Registration' },
  { id: 'login', name: 'User Login', category: 'Authentication' },
  { id: 'profile_update', name: 'Profile Update', category: 'Profile' },
  { id: 'email_opened', name: 'Email Opened', category: 'Email' },
  { id: 'email_clicked', name: 'Email Clicked', category: 'Email' },
  { id: 'page_visited', name: 'Page Visited', category: 'Website' },
  { id: 'product_viewed', name: 'Product Viewed', category: 'Commerce' },
  { id: 'cart_added', name: 'Added to Cart', category: 'Commerce' },
  { id: 'cart_abandoned', name: 'Cart Abandoned', category: 'Commerce' },
  { id: 'purchase_made', name: 'Purchase Made', category: 'Commerce' },
  { id: 'support_ticket', name: 'Support Ticket', category: 'Support' },
  { id: 'feedback_given', name: 'Feedback Given', category: 'Engagement' },
];

const segmentationCriteria = [
  {
    category: 'Location',
    fields: [
      { id: 'country', name: 'Country', type: 'string' },
      { id: 'city', name: 'City', type: 'string' },
      { id: 'region', name: 'Region', type: 'string' },
      { id: 'timezone', name: 'Timezone', type: 'string' }
    ]
  },
  {
    category: 'Behavior',
    fields: [
      { id: 'last_purchase_days', name: 'Days Since Last Purchase', type: 'number' },
      { id: 'total_purchases', name: 'Total Purchases', type: 'number' },
      { id: 'total_spent', name: 'Total Amount Spent', type: 'number' },
      { id: 'email_engagement', name: 'Email Engagement Score', type: 'number' },
      { id: 'website_sessions', name: 'Website Sessions', type: 'number' }
    ]
  },
  {
    category: 'Demographics',
    fields: [
      { id: 'age', name: 'Age', type: 'number' },
      { id: 'gender', name: 'Gender', type: 'string' },
      { id: 'income_bracket', name: 'Income Bracket', type: 'string' },
      { id: 'education', name: 'Education Level', type: 'string' }
    ]
  },
  {
    category: 'Engagement',
    fields: [
      { id: 'email_opens_30d', name: 'Email Opens (30 days)', type: 'number' },
      { id: 'email_clicks_30d', name: 'Email Clicks (30 days)', type: 'number' },
      { id: 'app_sessions_30d', name: 'App Sessions (30 days)', type: 'number' },
      { id: 'last_activity_days', name: 'Days Since Last Activity', type: 'number' }
    ]
  }
];

export default function AutomationConfig() {
  const [selectedTab, setSelectedTab] = useState('triggers');
  const [triggers, setTriggers] = useState<AutomationTrigger[]>([
    {
      id: 'trigger-1',
      type: 'event',
      name: 'Customer Signup',
      description: 'Triggers when a new customer signs up',
      conditions: [
        { id: 'c1', field: 'event_type', operator: 'equals', value: 'user_signup', type: 'string' },
        { id: 'c2', field: 'email_verified', operator: 'equals', value: true, type: 'boolean' }
      ],
      enabled: true
    },
    {
      id: 'trigger-2',
      type: 'behavior',
      name: 'Cart Abandonment',
      description: 'Triggers when customer abandons cart',
      conditions: [
        { id: 'c3', field: 'cart_value', operator: 'greater_than', value: 50, type: 'number' },
        { id: 'c4', field: 'time_since_cart', operator: 'greater_than', value: 120, type: 'number' }
      ],
      enabled: true
    },
    {
      id: 'trigger-3',
      type: 'time',
      name: 'Weekly Engagement',
      description: 'Triggers weekly for active users',
      conditions: [
        { id: 'c5', field: 'last_login', operator: 'within_days', value: 7, type: 'number' }
      ],
      enabled: false
    }
  ]);
  const [waitConditions, setWaitConditions] = useState<WaitCondition[]>([
    {
      id: 'wait-1',
      type: 'fixed_time',
      duration: 1,
      unit: 'days'
    },
    {
      id: 'wait-2',
      type: 'event_based',
      waitFor: 'email_opened',
      maxWait: 7,
      maxWaitUnit: 'days'
    },
    {
      id: 'wait-3',
      type: 'conditional',
      conditions: [
        { id: 'wc1', field: 'engagement_score', operator: 'greater_than', value: 70, type: 'number' }
      ]
    }
  ]);

  const addTrigger = (type: string) => {
    const triggerType = triggerTypes.find(t => t.type === type);
    const newTrigger: AutomationTrigger = {
      id: `trigger-${Date.now()}`,
      type: type as any,
      name: triggerType?.title || 'New Trigger',
      description: triggerType?.description || '',
      conditions: [],
      enabled: true
    };
    setTriggers([...triggers, newTrigger]);
  };

  const addWaitCondition = (type: string) => {
    const waitType = waitTypes.find(w => w.type === type);
    const newWait: WaitCondition = {
      id: `wait-${Date.now()}`,
      type: type as any,
      duration: 1,
      unit: 'hours'
    };
    setWaitConditions([...waitConditions, newWait]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Journey Automation Configuration</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Configure automation triggers, wait conditions, and customer segmentation rules
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="triggers">Triggers</TabsTrigger>
              <TabsTrigger value="conditions">Wait Conditions</TabsTrigger>
              <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
              <TabsTrigger value="events">Event Library</TabsTrigger>
            </TabsList>

            {/* Triggers Tab */}
            <TabsContent value="triggers" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {triggerTypes.map((triggerType) => (
                  <Card 
                    key={triggerType.type} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addTrigger(triggerType.type)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <triggerType.icon className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">{triggerType.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{triggerType.description}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Trigger
                    </Button>
                  </Card>
                ))}
              </div>

              {triggers.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Configured Triggers</h4>
                  {triggers.map((trigger) => (
                    <Card key={trigger.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{trigger.type}</Badge>
                          <span className="font-medium">{trigger.name}</span>
                        </div>
                        <Badge variant={trigger.enabled ? "default" : "secondary"}>
                          {trigger.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{trigger.description}</p>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Wait Conditions Tab */}
            <TabsContent value="conditions" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {waitTypes.map((waitType) => (
                  <Card 
                    key={waitType.type} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addWaitCondition(waitType.type)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <waitType.icon className="h-5 w-5 text-orange-600" />
                      <h4 className="font-medium">{waitType.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{waitType.description}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Wait
                    </Button>
                  </Card>
                ))}
              </div>

              {waitConditions.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Configured Wait Conditions</h4>
                  {waitConditions.map((wait) => (
                    <Card key={wait.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{wait.type}</Badge>
                        {wait.duration && (
                          <span className="text-sm text-muted-foreground">
                            {wait.duration} {wait.unit}
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Segmentation Tab */}
            <TabsContent value="segmentation" className="space-y-6">
              {/* Active Segmentation Rules */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Segmentation Rules</CardTitle>
                  <p className="text-muted-foreground">
                    Currently configured customer segmentation rules for this journey
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-green-800">New Customer Segment</h4>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      <p className="text-sm text-green-700 mb-3">
                        Customers who signed up in the last 30 days
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 1:</span>
                          <Badge variant="outline" className="mr-2">signup_date</Badge>
                          <span className="text-muted-foreground mr-2">within last</span>
                          <Badge variant="secondary">30 days</Badge>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 2:</span>
                          <Badge variant="outline" className="mr-2">total_purchases</Badge>
                          <span className="text-muted-foreground mr-2">equals</span>
                          <Badge variant="secondary">0</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-800">High-Value Prospects</h4>
                        <Badge className="bg-blue-600">Active</Badge>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Customers who browsed premium products but haven't purchased
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 1:</span>
                          <Badge variant="outline" className="mr-2">viewed_products</Badge>
                          <span className="text-muted-foreground mr-2">contains</span>
                          <Badge variant="secondary">premium</Badge>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 2:</span>
                          <Badge variant="outline" className="mr-2">cart_value</Badge>
                          <span className="text-muted-foreground mr-2">greater than</span>
                          <Badge variant="secondary">$100</Badge>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 3:</span>
                          <Badge variant="outline" className="mr-2">purchase_made</Badge>
                          <span className="text-muted-foreground mr-2">equals</span>
                          <Badge variant="secondary">false</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-orange-800">Re-engagement Targets</h4>
                        <Badge className="bg-orange-600">Active</Badge>
                      </div>
                      <p className="text-sm text-orange-700 mb-3">
                        Previously active customers who haven't engaged recently
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 1:</span>
                          <Badge variant="outline" className="mr-2">last_activity</Badge>
                          <span className="text-muted-foreground mr-2">older than</span>
                          <Badge variant="secondary">30 days</Badge>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="font-medium mr-2">Rule 2:</span>
                          <Badge variant="outline" className="mr-2">total_purchases</Badge>
                          <span className="text-muted-foreground mr-2">greater than</span>
                          <Badge variant="secondary">1</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                {segmentationCriteria.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-lg">Available {category.category} Fields</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.fields.slice(0, 4).map((field) => (
                          <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <span className="font-medium text-sm">{field.name}</span>
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {field.type}
                              </Badge>
                            </div>
                            <Button size="sm" variant="outline">
                              <Plus className="h-3 w-3 mr-1" />
                              Add Rule
                            </Button>
                          </div>
                        ))}
                        {category.fields.length > 4 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{category.fields.length - 4} more fields available
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Event Library Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Available Events</h3>
                  <p className="text-muted-foreground">
                    Pre-defined events you can use as triggers in your customer journeys
                  </p>
                </div>

                {['Registration', 'Email', 'Website', 'Commerce', 'Support', 'Engagement'].map((category) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category} Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {behaviorEvents
                          .filter(event => event.category === category)
                          .map((event) => (
                            <div key={event.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{event.name}</span>
                                <Button size="sm" variant="outline">
                                  <Target className="h-3 w-3 mr-1" />
                                  Use
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{triggers.length}</div>
              <p className="text-sm text-muted-foreground">Active Triggers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{waitConditions.length}</div>
              <p className="text-sm text-muted-foreground">Wait Conditions</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{behaviorEvents.length}</div>
              <p className="text-sm text-muted-foreground">Available Events</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}