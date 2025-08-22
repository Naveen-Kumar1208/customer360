"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MapPin,
  Activity,
  Target,
  Plus,
  X,
  Filter,
  Eye,
  BarChart3,
  Globe,
  ShoppingBag,
  Mail,
  Calendar
} from "lucide-react";

interface SegmentRule {
  id: string;
  category: 'location' | 'behavior' | 'demographics' | 'engagement';
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
  value: string | number | string[];
  label: string;
}

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  rules: SegmentRule[];
  estimatedSize: number;
  isActive: boolean;
}

const segmentCategories = [
  {
    category: 'location',
    icon: MapPin,
    title: 'Location',
    color: 'bg-blue-500',
    fields: [
      { id: 'country', label: 'Country', type: 'string' },
      { id: 'city', label: 'City', type: 'string' },
      { id: 'region', label: 'Region/State', type: 'string' },
      { id: 'postal_code', label: 'Postal Code', type: 'string' },
      { id: 'timezone', label: 'Timezone', type: 'string' }
    ]
  },
  {
    category: 'behavior',
    icon: Activity,
    title: 'Behavior',
    color: 'bg-green-500',
    fields: [
      { id: 'page_views', label: 'Page Views (30 days)', type: 'number' },
      { id: 'session_count', label: 'Session Count (30 days)', type: 'number' },
      { id: 'avg_session_duration', label: 'Avg Session Duration (minutes)', type: 'number' },
      { id: 'last_activity_days', label: 'Days Since Last Activity', type: 'number' },
      { id: 'product_category_viewed', label: 'Product Category Viewed', type: 'string' },
      { id: 'cart_abandonment_count', label: 'Cart Abandonment Count', type: 'number' },
      { id: 'purchase_frequency', label: 'Purchase Frequency', type: 'string' }
    ]
  },
  {
    category: 'demographics',
    icon: Users,
    title: 'Demographics',
    color: 'bg-purple-500',
    fields: [
      { id: 'age', label: 'Age', type: 'number' },
      { id: 'gender', label: 'Gender', type: 'string' },
      { id: 'income_bracket', label: 'Income Bracket', type: 'string' },
      { id: 'education_level', label: 'Education Level', type: 'string' },
      { id: 'occupation', label: 'Occupation', type: 'string' },
      { id: 'marital_status', label: 'Marital Status', type: 'string' },
      { id: 'household_size', label: 'Household Size', type: 'number' }
    ]
  },
  {
    category: 'engagement',
    icon: Mail,
    title: 'Engagement',
    color: 'bg-orange-500',
    fields: [
      { id: 'email_opens_30d', label: 'Email Opens (30 days)', type: 'number' },
      { id: 'email_clicks_30d', label: 'Email Clicks (30 days)', type: 'number' },
      { id: 'email_engagement_score', label: 'Email Engagement Score', type: 'number' },
      { id: 'social_shares', label: 'Social Shares', type: 'number' },
      { id: 'referral_count', label: 'Referral Count', type: 'number' },
      { id: 'loyalty_program_member', label: 'Loyalty Program Member', type: 'boolean' },
      { id: 'feedback_given', label: 'Feedback Given', type: 'boolean' }
    ]
  }
];

const operators = [
  { value: 'equals', label: 'Equals', types: ['string', 'number', 'boolean'] },
  { value: 'not_equals', label: 'Not Equals', types: ['string', 'number', 'boolean'] },
  { value: 'contains', label: 'Contains', types: ['string'] },
  { value: 'greater_than', label: 'Greater Than', types: ['number'] },
  { value: 'less_than', label: 'Less Than', types: ['number'] },
  { value: 'between', label: 'Between', types: ['number'] },
  { value: 'in', label: 'In List', types: ['string'] },
  { value: 'not_in', label: 'Not In List', types: ['string'] }
];

const predefinedSegments: CustomerSegment[] = [
  {
    id: 'new-customers',
    name: 'New Customers',
    description: 'Customers who signed up in the last 30 days',
    rules: [
      {
        id: '1',
        category: 'behavior',
        field: 'days_since_signup',
        operator: 'less_than',
        value: 30,
        label: 'Days since signup is less than 30'
      }
    ],
    estimatedSize: 2450,
    isActive: true
  },
  {
    id: 'high-value',
    name: 'High Value Customers',
    description: 'Customers with total spend > $500',
    rules: [
      {
        id: '1',
        category: 'behavior',
        field: 'total_spent',
        operator: 'greater_than',
        value: 500,
        label: 'Total spent is greater than $500'
      }
    ],
    estimatedSize: 1230,
    isActive: true
  },
  {
    id: 'cart-abandoners',
    name: 'Cart Abandoners',
    description: 'Customers who abandoned cart in last 7 days',
    rules: [
      {
        id: '1',
        category: 'behavior',
        field: 'cart_abandonment_count',
        operator: 'greater_than',
        value: 0,
        label: 'Cart abandonment count is greater than 0'
      },
      {
        id: '2',
        category: 'behavior',
        field: 'last_activity_days',
        operator: 'less_than',
        value: 7,
        label: 'Last activity was less than 7 days ago'
      }
    ],
    estimatedSize: 890,
    isActive: true
  },
  {
    id: 'vip-customers',
    name: 'VIP Customers',
    description: 'High-value, highly engaged customers',
    rules: [
      {
        id: '1',
        category: 'behavior',
        field: 'total_spent',
        operator: 'greater_than',
        value: 1000,
        label: 'Total spent is greater than $1000'
      },
      {
        id: '2',
        category: 'engagement',
        field: 'email_engagement_score',
        operator: 'greater_than',
        value: 80,
        label: 'Email engagement score is greater than 80'
      }
    ],
    estimatedSize: 340,
    isActive: true
  }
];

interface SegmentationBuilderProps {
  onSegmentSelect?: (segment: CustomerSegment) => void;
  onSegmentPreview?: (segment: CustomerSegment) => void;
  selectedSegmentId?: string;
}

export default function SegmentationBuilder({ 
  onSegmentSelect, 
  onSegmentPreview, 
  selectedSegmentId 
}: SegmentationBuilderProps) {
  const [segments, setSegments] = useState<CustomerSegment[]>(predefinedSegments);
  const [isCreating, setIsCreating] = useState(false);
  const [previewSegment, setPreviewSegment] = useState<CustomerSegment | null>(null);
  const [newSegment, setNewSegment] = useState<CustomerSegment>({
    id: '',
    name: '',
    description: '',
    rules: [],
    estimatedSize: 0,
    isActive: true
  });

  const addRule = (category: string, field: string, fieldLabel: string) => {
    const newRule: SegmentRule = {
      id: `rule-${Date.now()}`,
      category: category as any,
      field,
      operator: 'equals',
      value: '',
      label: fieldLabel
    };
    setNewSegment(prev => ({
      ...prev,
      rules: [...prev.rules, newRule]
    }));
  };

  const updateRule = (ruleId: string, updates: Partial<SegmentRule>) => {
    setNewSegment(prev => ({
      ...prev,
      rules: prev.rules.map(rule => 
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }));
  };

  const removeRule = (ruleId: string) => {
    setNewSegment(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const saveSegment = () => {
    if (newSegment.name && newSegment.rules.length > 0) {
      const segmentToSave = {
        ...newSegment,
        id: `segment-${Date.now()}`,
        estimatedSize: Math.floor(Math.random() * 5000) + 100 // Simulate estimation
      };
      setSegments(prev => [...prev, segmentToSave]);
      setNewSegment({
        id: '',
        name: '',
        description: '',
        rules: [],
        estimatedSize: 0,
        isActive: true
      });
      setIsCreating(false);
    }
  };

  const getCategoryConfig = (category: string) => {
    return segmentCategories.find(cat => cat.category === category);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Customer Segmentation</span>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Create and manage customer segments based on location, behavior, demographics, and engagement
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create New Segment */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Segment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="segmentName">Segment Name *</Label>
                <Input
                  id="segmentName"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., High Value Customers"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="segmentDescription">Description</Label>
                <Input
                  id="segmentDescription"
                  value={newSegment.description}
                  onChange={(e) => setNewSegment(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this segment"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Segment Rules */}
            <div>
              <h4 className="font-medium mb-4">Segment Rules</h4>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {segmentCategories.map((category) => (
                  <Card key={category.category} className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`p-1 rounded ${category.color}`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <h5 className="font-medium">{category.title}</h5>
                    </div>
                    <div className="space-y-2">
                      {category.fields.map((field) => (
                        <Button
                          key={field.id}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto p-2"
                          onClick={() => addRule(category.category, field.id, field.label)}
                        >
                          <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-xs">{field.label}</span>
                        </Button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Active Rules */}
            {newSegment.rules.length > 0 && (
              <div>
                <h4 className="font-medium mb-4">Active Rules</h4>
                <div className="space-y-3">
                  {newSegment.rules.map((rule) => {
                    const categoryConfig = getCategoryConfig(rule.category);
                    const fieldConfig = categoryConfig?.fields.find(f => f.id === rule.field);
                    const availableOperators = operators.filter(op => 
                      op.types.includes(fieldConfig?.type || 'string')
                    );

                    return (
                      <Card key={rule.id} className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className={`p-1 rounded ${categoryConfig?.color}`}>
                              <categoryConfig.icon className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">{rule.label}</span>
                          </div>
                          
                          <Select
                            value={rule.operator}
                            onValueChange={(value) => updateRule(rule.id, { operator: value as any })}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {availableOperators.map((op) => (
                                <SelectItem key={op.value} value={op.value}>
                                  {op.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            value={rule.value as string}
                            onChange={(e) => updateRule(rule.id, { value: e.target.value })}
                            placeholder="Value"
                            className="w-32"
                          />

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeRule(rule.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={saveSegment} disabled={!newSegment.name || newSegment.rules.length === 0}>
                <Filter className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Segments */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment) => (
          <Card 
            key={segment.id} 
            className={`hover:shadow-md transition-all ${
              selectedSegmentId === segment.id 
                ? 'ring-2 ring-blue-500 border-blue-300 shadow-lg' 
                : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{segment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{segment.description}</p>
                </div>
                <Badge variant={segment.isActive ? "default" : "secondary"}>
                  {segment.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rules Summary */}
                <div>
                  <h5 className="font-medium text-sm mb-2">Rules ({segment.rules.length})</h5>
                  <div className="space-y-1">
                    {segment.rules.slice(0, 2).map((rule) => {
                      const categoryConfig = getCategoryConfig(rule.category);
                      return (
                        <div key={rule.id} className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${categoryConfig?.color}`}>
                            <categoryConfig.icon className="h-2 w-2 text-white" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {rule.label} {rule.operator.replace('_', ' ')} {rule.value}
                          </span>
                        </div>
                      );
                    })}
                    {segment.rules.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{segment.rules.length - 2} more rules
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Estimated Size:</span>
                  </div>
                  <span className="font-medium">{segment.estimatedSize.toLocaleString()}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setPreviewSegment(segment);
                      onSegmentPreview?.(segment);
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    variant={selectedSegmentId === segment.id ? "default" : "outline"} 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onSegmentSelect?.(segment)}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    {selectedSegmentId === segment.id ? "Selected" : "Use"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Section */}
      {previewSegment && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Segment Preview: {previewSegment.name}</span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setPreviewSegment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{previewSegment.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Segment Rules</h4>
                <div className="space-y-2">
                  {previewSegment.rules.map((rule, index) => (
                    <div key={rule.id} className="flex items-center space-x-2 text-sm">
                      <Badge variant="outline">{rule.category}</Badge>
                      <span>{rule.label}</span>
                      <Badge variant="secondary">{rule.operator}</Badge>
                      <span className="font-medium">{Array.isArray(rule.value) ? rule.value.join(', ') : rule.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{previewSegment.estimatedSize.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Estimated Size</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">{previewSegment.rules.length}</div>
                  <p className="text-xs text-muted-foreground">Rules Applied</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">{previewSegment.isActive ? 'Active' : 'Inactive'}</div>
                  <p className="text-xs text-muted-foreground">Status</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Segmentation Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{segments.length}</div>
              <p className="text-sm text-muted-foreground">Total Segments</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {segments.filter(s => s.isActive).length}
              </div>
              <p className="text-sm text-muted-foreground">Active Segments</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {segments.reduce((sum, s) => sum + s.estimatedSize, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(segments.reduce((sum, s) => sum + s.rules.length, 0) / segments.length)}
              </div>
              <p className="text-sm text-muted-foreground">Avg Rules per Segment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}