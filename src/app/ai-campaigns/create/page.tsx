"use client";

import React, { useState } from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft,
  Sparkles,
  Brain,
  Target,
  Users,
  DollarSign,
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  Bell,
  Zap,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { useRouter } from "next/navigation";

const campaignTypes = [
  { id: "cross-sell", label: "Cross-sell", description: "Promote additional products to existing customers" },
  { id: "upsell", label: "Upsell", description: "Upgrade customers to premium offerings" },
  { id: "retention", label: "Retention", description: "Reduce churn and increase loyalty" },
  { id: "acquisition", label: "Acquisition", description: "Acquire new customers" },
  { id: "reactivation", label: "Reactivation", description: "Re-engage dormant customers" }
];

const aiModels = [
  { id: "propensity-v2", label: "Propensity Scoring v2.1", accuracy: 94, description: "Predict customer likelihood to purchase" },
  { id: "churn-v3", label: "Churn Prediction v3.0", accuracy: 89, description: "Identify customers at risk of leaving" },
  { id: "next-best-action", label: "Next Best Action v1.5", accuracy: 87, description: "Recommend optimal customer actions" },
  { id: "lookalike-v1", label: "Lookalike Modeling v1.8", accuracy: 82, description: "Find similar high-value customers" },
  { id: "sentiment-v2", label: "Sentiment Analysis v2.3", accuracy: 76, description: "Analyze customer sentiment and emotions" }
];

const channels = [
  { id: "email", label: "Email", icon: Mail, cost: 0.08, effectiveness: 72 },
  { id: "sms", label: "SMS", icon: MessageSquare, cost: 0.12, effectiveness: 68 },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare, cost: 0.15, effectiveness: 85 },
  { id: "push", label: "Push Notifications", icon: Bell, cost: 0.03, effectiveness: 78 },
  { id: "voice", label: "Voice Call", icon: Phone, cost: 1.25, effectiveness: 92 }
];

const targetAudiences = [
  { id: "high-value", label: "High Value Customers", count: 15420, description: "Customers with high lifetime value" },
  { id: "new-customers", label: "New Customers", count: 8750, description: "Customers acquired in last 90 days" },
  { id: "dormant", label: "Dormant Customers", count: 22100, description: "Customers with no activity in 180+ days" },
  { id: "frequent-users", label: "Frequent Users", count: 12350, description: "High engagement customers" },
  { id: "price-sensitive", label: "Price Sensitive", count: 18900, description: "Customers who respond to discounts" }
];

export default function CreateAICampaign() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    aiModel: "",
    targetAudience: "",
    channels: [],
    budget: "",
    startDate: "",
    endDate: "",
    objectives: {
      conversions: "",
      revenue: "",
      engagement: ""
    }
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChannelToggle = (channelId) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter(id => id !== channelId)
        : [...prev.channels, channelId]
    }));
  };

  const handleSubmit = () => {
    // Handle campaign creation
    console.log("Creating campaign:", formData);
    router.push("/ai-campaigns");
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex-1 space-y-6 p-8 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/ai-campaigns")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to AI Campaigns
              </Button>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Create AI Campaign</h2>
                <p className="text-muted-foreground">Set up an intelligent campaign with AI-powered optimization</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">AI-Powered Setup</span>
            </div>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Campaign Details</span>
                <span>AI Model Selection</span>
                <span>Audience & Channels</span>
                <span>Budget & Timeline</span>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Campaign Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Campaign Details</span>
                </CardTitle>
                <CardDescription>Define your campaign objectives and basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Smart Loan Upsell Q1"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign goals and strategy..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="conversions">Target Conversions</Label>
                    <Input
                      id="conversions"
                      placeholder="e.g., 500"
                      value={formData.objectives.conversions}
                      onChange={(e) => setFormData({
                        ...formData,
                        objectives: {...formData.objectives, conversions: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Target Revenue</Label>
                    <Input
                      id="revenue"
                      placeholder="e.g., $100,000"
                      value={formData.objectives.revenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        objectives: {...formData.objectives, revenue: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engagement">Target Engagement %</Label>
                    <Input
                      id="engagement"
                      placeholder="e.g., 25"
                      value={formData.objectives.engagement}
                      onChange={(e) => setFormData({
                        ...formData,
                        objectives: {...formData.objectives, engagement: e.target.value}
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: AI Model Selection */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Model Selection</span>
                </CardTitle>
                <CardDescription>Choose the AI model that best fits your campaign objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    AI models are automatically optimized based on your campaign type and historical performance data.
                  </AlertDescription>
                </Alert>
                
                <div className="grid gap-4">
                  {aiModels.map((model) => (
                    <div
                      key={model.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.aiModel === model.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData({...formData, aiModel: model.id})}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            formData.aiModel === model.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                          }`} />
                          <div>
                            <h4 className="font-medium">{model.label}</h4>
                            <p className="text-sm text-muted-foreground">{model.description}</p>
                          </div>
                        </div>
                        <Badge variant={model.accuracy > 85 ? "default" : "secondary"}>
                          {model.accuracy}% Accuracy
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Audience & Channels */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Target Audience</span>
                  </CardTitle>
                  <CardDescription>Select your target customer segment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {targetAudiences.map((audience) => (
                      <div
                        key={audience.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.targetAudience === audience.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setFormData({...formData, targetAudience: audience.id})}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.targetAudience === audience.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                            }`} />
                            <div>
                              <h4 className="font-medium">{audience.label}</h4>
                              <p className="text-sm text-muted-foreground">{audience.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline">{audience.count.toLocaleString()} customers</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Channels</CardTitle>
                  <CardDescription>Select channels for campaign delivery (multiple selection allowed)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {channels.map((channel) => (
                      <div key={channel.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Checkbox
                          id={channel.id}
                          checked={formData.channels.includes(channel.id)}
                          onCheckedChange={() => handleChannelToggle(channel.id)}
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <channel.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{channel.label}</h4>
                            <p className="text-sm text-muted-foreground">${channel.cost}/message</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={channel.effectiveness > 80 ? "bg-green-50 text-green-700" : 
                                      channel.effectiveness > 70 ? "bg-blue-50 text-blue-700" : 
                                      "bg-yellow-50 text-yellow-700"}
                          >
                            {channel.effectiveness}% effective
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Budget & Timeline */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Budget & Timeline</span>
                </CardTitle>
                <CardDescription>Set your campaign budget and schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Campaign Budget</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 25000"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Reach</Label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-lg font-semibold">
                        {formData.budget ? Math.round(Number.parseInt(formData.budget) / 0.5).toLocaleString() : "0"}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">customers</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>AI Optimization:</strong> Your campaign will be automatically optimized based on real-time performance data. 
                    Budget allocation across channels will be adjusted to maximize ROI.
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Campaign Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Campaign Type:</span>
                      <span className="ml-2 font-medium">{formData.type}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">AI Model:</span>
                      <span className="ml-2 font-medium">{formData.aiModel}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Channels:</span>
                      <span className="ml-2 font-medium">{formData.channels.length} selected</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="ml-2 font-medium">${formData.budget ? Number.parseInt(formData.budget).toLocaleString() : "0"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <div className="flex space-x-2">
              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Create AI Campaign</span>
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </StaticExportLayout>
    </>
  );
}