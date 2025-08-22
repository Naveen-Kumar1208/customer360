"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Users,
  Filter,
  MapPin,
  Calendar,
  ShoppingCart,
  Mail,
  Activity,
  DollarSign,
  Smartphone,
  Eye,
  Save,
  RefreshCw
} from "lucide-react";

import Link from "next/link";

interface SegmentRule {
  id: string;
  field: string;
  operator: string;
  value: string;
  type: 'demographic' | 'behavioral' | 'transactional' | 'engagement';
}

interface Segment {
  name: string;
  description: string;
  rules: SegmentRule[];
  logic: 'AND' | 'OR';
  estimatedCount: number;
}

const ruleFields = {
  demographic: [
    { value: 'age', label: 'Age', operators: ['equals', 'greater_than', 'less_than', 'between'] },
    { value: 'gender', label: 'Gender', operators: ['equals', 'not_equals'] },
    { value: 'location_country', label: 'Country', operators: ['equals', 'not_equals', 'in', 'not_in'] },
    { value: 'location_city', label: 'City', operators: ['equals', 'not_equals', 'in', 'not_in'] },
    { value: 'signup_date', label: 'Signup Date', operators: ['after', 'before', 'between'] },
    { value: 'customer_type', label: 'Customer Type', operators: ['equals', 'not_equals'] }
  ],
  behavioral: [
    { value: 'page_views', label: 'Page Views', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'session_count', label: 'Session Count', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'time_on_site', label: 'Time on Site', operators: ['greater_than', 'less_than'] },
    { value: 'last_activity', label: 'Last Activity', operators: ['after', 'before'] },
    { value: 'device_type', label: 'Device Type', operators: ['equals', 'not_equals'] },
    { value: 'traffic_source', label: 'Traffic Source', operators: ['equals', 'not_equals', 'contains'] }
  ],
  transactional: [
    { value: 'total_orders', label: 'Total Orders', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'total_spent', label: 'Total Spent', operators: ['greater_than', 'less_than', 'between'] },
    { value: 'avg_order_value', label: 'Avg Order Value', operators: ['greater_than', 'less_than'] },
    { value: 'last_purchase', label: 'Last Purchase', operators: ['after', 'before'] },
    { value: 'product_category', label: 'Product Category', operators: ['equals', 'not_equals', 'in'] },
    { value: 'payment_method', label: 'Payment Method', operators: ['equals', 'not_equals'] }
  ],
  engagement: [
    { value: 'email_opens', label: 'Email Opens', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'email_clicks', label: 'Email Clicks', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'sms_opens', label: 'SMS Opens', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'push_opens', label: 'Push Opens', operators: ['greater_than', 'less_than', 'equals'] },
    { value: 'campaign_engagement', label: 'Campaign Engagement', operators: ['high', 'medium', 'low'] },
    { value: 'subscription_status', label: 'Subscription Status', operators: ['equals', 'not_equals'] }
  ]
};

const operators = {
  equals: 'Equals',
  not_equals: 'Not Equals',
  greater_than: 'Greater Than',
  less_than: 'Less Than',
  between: 'Between',
  in: 'In',
  not_in: 'Not In',
  contains: 'Contains',
  after: 'After',
  before: 'Before',
  high: 'High',
  medium: 'Medium',
  low: 'Low'
};

const categoryIcons = {
  demographic: MapPin,
  behavioral: Activity,
  transactional: ShoppingCart,
  engagement: Mail
};

const categoryColors = {
  demographic: 'bg-blue-100 text-blue-800',
  behavioral: 'bg-green-100 text-green-800',
  transactional: 'bg-purple-100 text-purple-800',
  engagement: 'bg-orange-100 text-orange-800'
};

export default function CreateSegmentPage() {
  const [segment, setSegment] = useState<Segment>({
    name: '',
    description: '',
    rules: [],
    logic: 'AND',
    estimatedCount: 0
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const addRule = (category: string) => {
    const newRule: SegmentRule = {
      id: `rule-${Date.now()}`,
      field: '',
      operator: '',
      value: '',
      type: category as any
    };
    setSegment(prev => ({
      ...prev,
      rules: [...prev.rules, newRule]
    }));
  };

  const updateRule = (ruleId: string, field: string, value: any) => {
    setSegment(prev => ({
      ...prev,
      rules: prev.rules.map(rule =>
        rule.id === ruleId ? { ...rule, [field]: value } : rule
      )
    }));
  };

  const removeRule = (ruleId: string) => {
    setSegment(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const calculateSegmentSize = () => {
    setIsCalculating(true);
    // Simulate API call
    setTimeout(() => {
      const estimatedCount = Math.floor(Math.random() * 50000) + 1000;
      setSegment(prev => ({ ...prev, estimatedCount }));
      setIsCalculating(false);
    }, 1500);
  };

  const getFieldsForType = (type: string) => {
    return ruleFields[type as keyof typeof ruleFields] || [];
  };

  const getOperatorsForField = (fieldValue: string, type: string) => {
    const fields = getFieldsForType(type);
    const field = fields.find(f => f.value === fieldValue);
    return field?.operators || [];
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/journey-builder/create">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Customer Segment</h1>
                <p className="text-muted-foreground">
                  Define rules to target specific customer groups
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Segment
              </Button>
              <Button>
                Use This Segment
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Segment Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Segment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="segmentName">Segment Name *</Label>
                    <Input
                      id="segmentName"
                      value={segment.name}
                      onChange={(e) => setSegment(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., High-Value Customers"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="segmentDescription">Description</Label>
                    <Input
                      id="segmentDescription"
                      value={segment.description}
                      onChange={(e) => setSegment(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe who this segment targets..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Logic Type</Label>
                    <Select 
                      value={segment.logic} 
                      onValueChange={(value) => setSegment(prev => ({ ...prev, logic: value as 'AND' | 'OR' }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND">AND - All conditions must be true</SelectItem>
                        <SelectItem value="OR">OR - Any condition can be true</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Rules Builder */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Segment Rules</CardTitle>
                    <div className="flex gap-2">
                      {Object.entries(categoryIcons).map(([category, Icon]) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          onClick={() => addRule(category)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {segment.rules.length === 0 ? (
                    <div className="text-center py-8">
                      <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Rules Defined</h3>
                      <p className="text-muted-foreground mb-4">
                        Add rules above to start building your customer segment
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {segment.rules.map((rule, index) => {
                        const Icon = categoryIcons[rule.type];
                        const fields = getFieldsForType(rule.type);
                        const operators = getOperatorsForField(rule.field, rule.type);
                        
                        return (
                          <div key={rule.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Badge className={categoryColors[rule.type]}>
                                  <Icon className="h-3 w-3 mr-1" />
                                  {rule.type}
                                </Badge>
                                {index > 0 && (
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {segment.logic}
                                  </span>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeRule(rule.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <Label>Field</Label>
                                <Select
                                  value={rule.field}
                                  onValueChange={(value) => updateRule(rule.id, 'field', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select field" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {fields.map((field) => (
                                      <SelectItem key={field.value} value={field.value}>
                                        {field.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label>Operator</Label>
                                <Select
                                  value={rule.operator}
                                  onValueChange={(value) => updateRule(rule.id, 'operator', value)}
                                  disabled={!rule.field}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select operator" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {operators.map((op) => (
                                      <SelectItem key={op} value={op}>
                                        {operators[op as keyof typeof operators]}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label>Value</Label>
                                <Input
                                  value={rule.value}
                                  onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                                  placeholder="Enter value"
                                  className="mt-1"
                                  disabled={!rule.operator}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="space-y-6">
              {/* Segment Size */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Segment Size</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {isCalculating ? (
                        <RefreshCw className="h-8 w-8 mx-auto animate-spin" />
                      ) : (
                        segment.estimatedCount.toLocaleString()
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Estimated customers
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={calculateSegmentSize}
                      disabled={segment.rules.length === 0 || isCalculating}
                      className="w-full"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isCalculating ? 'animate-spin' : ''}`} />
                      {isCalculating ? 'Calculating...' : 'Recalculate'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Segment Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Segment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Demographics</span>
                      <span>35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Behavior</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Transactions</span>
                      <span>22%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    High-Value Customers
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Recent Buyers
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Inactive Users
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Engaged
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </StaticExportLayout>
    </>
  );
}