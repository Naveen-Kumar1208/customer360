"use client";

import React, { useState, useEffect } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Plus,
  Minus,
  Save,
  Play,
  GitBranch,
  Target,
  Clock,
  Users,
  Settings,
  ArrowRight,
  Trash2,
  Copy,
  Eye,
  Zap,
  Mail,
  Bell,
  Database,
  Filter,
  BarChart3,
  MessageSquare,
  Smartphone,
  Activity,
  Calendar,
  MapPin,
  UserCheck,
  ShoppingCart,
  CreditCard,
  HeadphonesIcon,
  Briefcase,
  Heart,
  Shield,
  Globe,
  TrendingUp,
  Layers,
  Workflow,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Palette,
  Code,
  Link2,
  Move
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  triggerType: "event" | "time" | "condition";
  triggerConfig: {
    event?: string;
    timeDelay?: number;
    timeUnit?: "minutes" | "hours" | "days";
    conditions?: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };
  actions: Array<{
    id: string;
    type: string;
    name: string;
    description: string;
    config: any;
  }>;
}

// Enhanced templates with segments, automation, and campaigns
const journeyTemplates = [
  {
    id: "template-1",
    name: "E-commerce Onboarding",
    description: "Welcome new customers and guide them through first purchase",
    stages: ["Registration", "Email Verification", "Profile Setup", "First Browse", "First Purchase"],
    segments: ["New Customers", "Unverified Users", "First-time Buyers"],
    automations: ["Welcome Email Sequence", "Profile Completion Reminder", "Purchase Incentive"],
    campaigns: ["Welcome Series", "Product Discovery", "First Purchase Incentive"]
  },
  {
    id: "template-2", 
    name: "SaaS Trial to Paid",
    description: "Convert trial users to paid subscribers",
    stages: ["Trial Signup", "Feature Discovery", "Value Realization", "Upgrade Prompt", "Conversion"],
    segments: ["Trial Users", "Feature Adopters", "High Intent Users"],
    automations: ["Feature Introduction Flow", "Usage Tracking", "Conversion Reminders"],
    campaigns: ["Trial Onboarding", "Feature Education", "Upgrade Campaign"]
  },
  {
    id: "template-3",
    name: "Customer Support",
    description: "Guide customers through support resolution",
    stages: ["Issue Reported", "Ticket Created", "Agent Assigned", "Resolution", "Feedback"],
    segments: ["Support Requesters", "Priority Customers", "Escalated Cases"],
    automations: ["Ticket Routing", "Status Updates", "Follow-up Sequence"],
    campaigns: ["Support Communication", "Resolution Follow-up", "Satisfaction Survey"]
  }
];

// Available customer segments
const customerSegments = [
  { id: "new-customers", name: "New Customers", description: "Users registered within last 30 days", count: 1250, criteria: "registration_date >= 30 days ago" },
  { id: "trial-users", name: "Trial Users", description: "Active trial subscription users", count: 450, criteria: "subscription_status = 'trial'" },
  { id: "premium-users", name: "Premium Users", description: "Paid subscription customers", count: 2100, criteria: "subscription_tier = 'premium'" },
  { id: "inactive-users", name: "Inactive Users", description: "No activity in last 30 days", count: 800, criteria: "last_activity < 30 days ago" },
  { id: "high-value", name: "High Value Customers", description: "Total purchase value > $1000", count: 320, criteria: "total_purchases > 1000" },
  { id: "cart-abandoners", name: "Cart Abandoners", description: "Items in cart but no purchase", count: 650, criteria: "cart_items > 0 AND last_purchase > 7 days" },
  { id: "mobile-users", name: "Mobile Users", description: "Primary device is mobile", count: 1800, criteria: "primary_device = 'mobile'" },
  { id: "email-subscribers", name: "Email Subscribers", description: "Opted in for email communications", count: 3200, criteria: "email_opt_in = true" }
];

// Available automation rules
const automationRules = [
  { id: "welcome-email", name: "Welcome Email Sequence", description: "Automated welcome email series for new users", trigger: "User Registration", actions: ["Send Welcome Email", "Schedule Follow-up"] },
  { id: "behavioral-triggers", name: "Behavioral Triggers", description: "React to user actions in real-time", trigger: "User Action", actions: ["Send Notification", "Update Segment"] },
  { id: "time-based-reminders", name: "Time-based Reminders", description: "Schedule messages based on time intervals", trigger: "Time Delay", actions: ["Send Reminder", "Escalate"] },
  { id: "conversion-tracking", name: "Conversion Tracking", description: "Track and optimize conversion events", trigger: "Goal Achievement", actions: ["Log Event", "Update Analytics"] },
  { id: "abandonment-recovery", name: "Abandonment Recovery", description: "Re-engage users who abandoned actions", trigger: "Inactivity Period", actions: ["Send Recovery Email", "Offer Incentive"] },
  { id: "personalization-engine", name: "Personalization Engine", description: "Deliver personalized content based on user data", trigger: "Content Request", actions: ["Personalize Content", "Recommend Products"] },
  { id: "lead-scoring", name: "Lead Scoring", description: "Automatically score leads based on behavior", trigger: "User Activity", actions: ["Update Score", "Assign Sales Rep"] },
  { id: "churn-prediction", name: "Churn Prediction", description: "Identify and prevent potential churn", trigger: "Risk Score Change", actions: ["Alert Team", "Launch Retention Campaign"] }
];

// Available campaign types
const campaignTypes = [
  { id: "email-campaign", name: "Email Campaign", description: "Multi-email sequence with personalization", channels: ["Email"], features: ["A/B Testing", "Personalization", "Analytics"] },
  { id: "sms-campaign", name: "SMS Campaign", description: "Text message sequence for mobile engagement", channels: ["SMS"], features: ["Short Links", "Delivery Tracking", "Opt-out Management"] },
  { id: "push-campaign", name: "Push Notification Campaign", description: "Mobile and web push notifications", channels: ["Push"], features: ["Rich Media", "Targeting", "Timing Optimization"] },
  { id: "multi-channel", name: "Multi-channel Campaign", description: "Coordinated messaging across all channels", channels: ["Email", "SMS", "Push", "In-app"], features: ["Channel Orchestration", "Unified Analytics", "Cross-channel Attribution"] },
  { id: "social-campaign", name: "Social Media Campaign", description: "Social media advertising and engagement", channels: ["Facebook", "Instagram", "Twitter", "LinkedIn"], features: ["Audience Targeting", "Creative Management", "Social Analytics"] },
  { id: "retargeting-campaign", name: "Retargeting Campaign", description: "Display ads for website visitors", channels: ["Display", "Video", "Native"], features: ["Pixel Tracking", "Dynamic Ads", "Conversion Tracking"] },
  { id: "content-campaign", name: "Content Marketing Campaign", description: "Educational and promotional content distribution", channels: ["Blog", "Email", "Social"], features: ["Content Calendar", "SEO Optimization", "Engagement Tracking"] },
  { id: "referral-campaign", name: "Referral Campaign", description: "Customer referral and advocacy programs", channels: ["Email", "In-app", "Social"], features: ["Referral Tracking", "Reward Management", "Viral Mechanics"] }
];

export default function CreateJourneyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [showCustomSegmentModal, setShowCustomSegmentModal] = useState(false);
  const [customSegmentData, setCustomSegmentData] = useState({
    name: "",
    description: "",
    criteria: "",
    estimatedCount: 0
  });
  const [segments, setSegments] = useState(customerSegments);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [automations, setAutomations] = useState(automationRules);
  const [selectedAutomations, setSelectedAutomations] = useState<string[]>([]);
  const [showCustomAutomationModal, setShowCustomAutomationModal] = useState(false);
  const [customAutomationData, setCustomAutomationData] = useState({
    name: "",
    description: "",
    trigger: "User Action",
    actions: ["Send Notification"],
    priority: "normal",
    enabled: true
  });
  const [campaigns, setCampaigns] = useState(campaignTypes);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [showCustomCampaignModal, setShowCustomCampaignModal] = useState(false);
  const [customCampaignData, setCustomCampaignData] = useState({
    name: "",
    description: "",
    type: "Email Campaign",
    channels: ["Email"],
    features: ["A/B Testing"],
    budget: 0,
    objective: "conversion"
  });
  const [validationResults, setValidationResults] = useState({
    stagesValid: false,
    entryConditions: false,
    actionsConfigured: false,
    campaignsSelected: false
  });
  const [testingResults, setTestingResults] = useState({
    sampleDataTest: null,
    triggerValidation: null,
    configurationCheck: null,
    previewGenerated: null
  });
  const [journeyData, setJourneyData] = useState({
    name: "",
    description: "",
    category: "engagement",
    status: "draft",
    goalType: "conversion",
    targetMetric: "",
    estimatedDuration: ""
  });

  // Check if we're in edit mode and load data
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const isEdit = urlParams.get('edit') === 'true';
    
    if (isEdit) {
      const editData = sessionStorage.getItem('editJourneyData');
      if (editData) {
        try {
          const journey = JSON.parse(editData);
          
          // Load journey data
          if (journey.journeyData) {
            setJourneyData(journey.journeyData);
          }
          
          // Load stages
          if (journey.stages) {
            setStages(journey.stages);
          }
          
          // Load selected segments
          if (journey.selectedSegments) {
            setSelectedSegments(journey.selectedSegments);
          }
          
          // Load segments data
          if (journey.segments) {
            setSegments(journey.segments);
          }
          
          // Load selected automations
          if (journey.selectedAutomations) {
            setSelectedAutomations(journey.selectedAutomations);
          }
          
          // Load automations data
          if (journey.automations) {
            setAutomations(journey.automations);
          }
          
          // Load selected campaigns
          if (journey.selectedCampaigns) {
            setSelectedCampaigns(journey.selectedCampaigns);
          }
          
          // Load campaigns data
          if (journey.campaigns) {
            setCampaigns(journey.campaigns);
          }
          
          // Clear the session storage
          sessionStorage.removeItem('editJourneyData');
          
        } catch (error) {
          console.error('Error loading edit data:', error);
        }
      }
    }
  }, []);

  const [stages, setStages] = useState<JourneyStage[]>([
    {
      id: "stage-1",
      name: "Entry Point",
      description: "Journey starting condition",
      triggerType: "event",
      triggerConfig: {},
      actions: []
    }
  ]);

  const addStage = () => {
    const newStage: JourneyStage = {
      id: `stage-${Date.now()}`,
      name: `Stage ${stages.length + 1}`,
      description: "",
      triggerType: "event",
      triggerConfig: {},
      actions: []
    };
    setStages([...stages, newStage]);
  };

  const removeStage = (stageId: string) => {
    if (stages.length > 1) {
      setStages(stages.filter(stage => stage.id !== stageId));
    }
  };

  const updateStage = (stageId: string, updates: Partial<JourneyStage>) => {
    setStages(stages.map(stage => 
      stage.id === stageId ? { ...stage, ...updates } : stage
    ));
  };

  const getActionDisplayName = (type: string) => {
    const actionNames = {
      email: "Send Email",
      sms: "Send SMS",
      push: "Send Push Notification",
      webhook: "Trigger Webhook",
      database: "Update Database",
      delay: "Add Delay",
      condition: "Add Condition"
    };
    return actionNames[type] || "New Action";
  };

  const addActionToStage = (stageId: string) => {
    const defaultType = "email";
    const newAction = {
      id: `action-${Date.now()}`,
      type: defaultType,
      name: getActionDisplayName(defaultType),
      description: "Configure this action",
      config: {}
    };
    
    setStages(stages.map(stage => 
      stage.id === stageId 
        ? { ...stage, actions: [...(stage.actions || []), newAction] }
        : stage
    ));
  };

  const removeActionFromStage = (stageId: string, actionId: string) => {
    setStages(stages.map(stage => 
      stage.id === stageId 
        ? { ...stage, actions: (stage.actions || []).filter(action => action.id !== actionId) }
        : stage
    ));
  };

  const updateStageAction = (stageId: string, actionId: string, updates: any) => {
    setStages(stages.map(stage => 
      stage.id === stageId 
        ? { 
            ...stage, 
            actions: (stage.actions || []).map(action => 
              action.id === actionId ? { ...action, ...updates } : action
            ) 
          }
        : stage
    ));
  };

  const useTemplate = (template: any) => {
    const templateStages = template.stages.map((stageName: string, index: number) => ({
      id: `stage-${index + 1}`,
      name: stageName,
      description: `${stageName} stage description`,
      triggerType: index === 0 ? "event" : "condition",
      triggerConfig: {},
      actions: []
    }));
    
    setStages(templateStages);
    setJourneyData({
      ...journeyData,
      name: template.name,
      description: template.description
    });
  };

  const runValidation = () => {
    const newResults = {
      stagesValid: stages.length > 0 && stages.every(stage => stage.name && stage.triggerType),
      entryConditions: selectedSegments.length > 0,
      actionsConfigured: stages.some(stage => stage.actions && stage.actions.length > 0),
      campaignsSelected: selectedCampaigns.length > 0
    };
    setValidationResults(newResults);
    return newResults;
  };

  const runTests = (testType: string) => {
    const results = { ...testingResults };
    
    switch (testType) {
      case 'sample':
        results.sampleDataTest = {
          status: 'success',
          message: 'Successfully tested with 10 sample customers',
          details: `${Math.floor(Math.random() * 8) + 2} customers would enter the journey`
        };
        break;
      case 'triggers':
        results.triggerValidation = {
          status: stages.length > 0 ? 'success' : 'error',
          message: stages.length > 0 ? 'All triggers configured correctly' : 'No triggers configured',
          details: `${stages.length} stages with triggers validated`
        };
        break;
      case 'configuration':
        const validation = runValidation();
        const allValid = Object.values(validation).every(v => v);
        results.configurationCheck = {
          status: allValid ? 'success' : 'warning',
          message: allValid ? 'Configuration is complete' : 'Some configuration missing',
          details: `${Object.values(validation).filter(v => v).length}/4 checks passed`
        };
        break;
      case 'preview':
        results.previewGenerated = {
          status: 'success',
          message: 'Journey preview generated successfully',
          details: `Preview includes ${stages.length} stages, ${selectedSegments.length} segments, ${selectedAutomations.length} automations`
        };
        break;
    }
    
    setTestingResults(results);
  };

  const handleSave = (status: "draft" | "active") => {
    const journeyConfig = {
      ...journeyData,
      status,
      stages,
      selectedSegments,
      selectedAutomations,
      selectedCampaigns,
      createdAt: new Date().toISOString(),
      id: `journey-${Date.now()}`
    };
    
    console.log("Saving journey:", journeyConfig);
    
    if (status === "active") {
      // Add to journey overview (this would typically be done through an API)
      const journeyWithMetadata = {
        journeyData,
        stages,
        selectedSegments,
        selectedAutomations,
        selectedCampaigns,
        segments,
        automations,
        campaigns,
        activatedAt: new Date().toISOString(),
        status: 'active',
        id: `journey-${Date.now()}`
      };
      
      const savedJourneys = JSON.parse(localStorage.getItem('activatedJourneys') || '[]');
      savedJourneys.push(journeyWithMetadata);
      localStorage.setItem('activatedJourneys', JSON.stringify(savedJourneys));
      alert("Journey activated successfully! It will appear in the Journey Overview.");
    } else {
      alert("Journey saved as draft successfully!");
    }
    
    router.push("/journey-analytics");
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
                  Back to Journeys
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true' ? 'Edit Customer Journey' : 'Create Customer Journey'}
                </h1>
                <p className="text-muted-foreground">
                  {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true' 
                    ? 'Modify your existing customer journey configuration'
                    : 'Design automated customer journeys with multi-stage flows and triggers'
                  }
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
                Activate Journey
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic Setup</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="stages">Journey Stages</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="preview">Preview & Test</TabsTrigger>
            </TabsList>

            {/* Basic Setup Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Journey Information</CardTitle>
                    <CardDescription>Basic details about your customer journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="journey-name" className="block text-sm font-medium mb-2">Journey Name</label>
                      <Input
                        id="journey-name"
                        placeholder="e.g., Welcome Onboarding Flow"
                        value={journeyData.name}
                        onChange={(e) => setJourneyData({...journeyData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="journey-description" className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        id="journey-description"
                        placeholder="Describe the purpose and goals of this journey..."
                        rows={3}
                        value={journeyData.description}
                        onChange={(e) => setJourneyData({...journeyData, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="journey-category" className="block text-sm font-medium mb-2">Category</label>
                      <select
                        id="journey-category"
                        className="w-full px-3 py-2 border rounded-md"
                        value={journeyData.category}
                        onChange={(e) => setJourneyData({...journeyData, category: e.target.value})}
                      >
                        <option value="onboarding">Onboarding</option>
                        <option value="engagement">Engagement</option>
                        <option value="conversion">Conversion</option>
                        <option value="retention">Retention</option>
                        <option value="support">Support</option>
                        <option value="upsell">Upsell/Cross-sell</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="goal-type" className="block text-sm font-medium mb-2">Primary Goal</label>
                      <select
                        id="goal-type"
                        className="w-full px-3 py-2 border rounded-md"
                        value={journeyData.goalType}
                        onChange={(e) => setJourneyData({...journeyData, goalType: e.target.value})}
                      >
                        <option value="conversion">Increase Conversion</option>
                        <option value="engagement">Boost Engagement</option>
                        <option value="retention">Improve Retention</option>
                        <option value="satisfaction">Customer Satisfaction</option>
                        <option value="revenue">Generate Revenue</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="target-metric" className="block text-sm font-medium mb-2">Target Metric</label>
                      <Input
                        id="target-metric"
                        placeholder="e.g., 25% conversion rate"
                        value={journeyData.targetMetric}
                        onChange={(e) => setJourneyData({...journeyData, targetMetric: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium mb-2">Estimated Duration</label>
                      <Input
                        id="duration"
                        placeholder="e.g., 7 days"
                        value={journeyData.estimatedDuration}
                        onChange={(e) => setJourneyData({...journeyData, estimatedDuration: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Journey Templates</CardTitle>
                    <CardDescription>Start with a pre-built template or create from scratch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {journeyTemplates.map((template) => (
                        <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" 
                             onClick={() => useTemplate(template)}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                              <div className="flex gap-1 mt-2">
                                {template.stages.slice(0, 3).map((stage, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {stage}
                                  </Badge>
                                ))}
                                {template.stages.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{template.stages.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Use Template
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Segments Tab */}
            <TabsContent value="segments" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Target Segments</CardTitle>
                    <CardDescription>Select customer segments for this journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search segments..."
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                      
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {segments.length > 0 ? segments.map((segment) => {
                          const isSelected = selectedSegments.includes(segment.id);
                          const isCustom = segment.id.startsWith('custom-');
                          return (
                            <div 
                              key={segment.id} 
                              className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
                                isSelected 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input 
                                  type="checkbox" 
                                  className="rounded"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedSegments([...selectedSegments, segment.id]);
                                    } else {
                                      setSelectedSegments(selectedSegments.filter(id => id !== segment.id));
                                    }
                                  }}
                                />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{segment.name}</span>
                                    {isCustom && (
                                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                        Custom
                                      </Badge>
                                    )}
                                    {isSelected && (
                                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                        Selected
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{segment.description}</div>
                                  <div className="text-xs text-muted-foreground mt-1">{segment.criteria}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{segment.count.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">customers</div>
                                {isCustom && (
                                  <button 
                                    onClick={() => {
                                      setSegments(segments.filter(s => s.id !== segment.id));
                                      setSelectedSegments(selectedSegments.filter(id => id !== segment.id));
                                    }}
                                    className="text-red-500 hover:text-red-700 mt-1"
                                    title="Delete custom segment"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No segments available</p>
                            <p className="text-sm">Create a custom segment to get started</p>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowCustomSegmentModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Custom Segment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Segment Configuration</CardTitle>
                    <CardDescription>Configure targeting and entry conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Entry Trigger</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="immediate">Immediate Entry</option>
                        <option value="scheduled">Scheduled Entry</option>
                        <option value="event-based">Event-based Entry</option>
                        <option value="api-triggered">API Triggered</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Geographic Targeting</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="global">Global</option>
                        <option value="us">United States</option>
                        <option value="eu">European Union</option>
                        <option value="apac">Asia Pacific</option>
                        <option value="custom">Custom Regions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Device Targeting</label>
                      <div className="space-y-2">
                        {['Desktop', 'Mobile', 'Tablet', 'All Devices'].map((device) => (
                          <label key={device} className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked={device === 'All Devices'} className="rounded" />
                            <span className="text-sm">{device}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Frequency Cap</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="number" placeholder="Max entries" />
                        <select className="px-3 py-2 border rounded-md">
                          <option value="per-day">Per Day</option>
                          <option value="per-week">Per Week</option>
                          <option value="per-month">Per Month</option>
                          <option value="lifetime">Lifetime</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Selected Segments ({selectedSegments.length})</h4>
                      <div className="space-y-2 mb-4">
                        {selectedSegments.length > 0 ? (
                          selectedSegments.map(segmentId => {
                            const segment = segments.find(s => s.id === segmentId);
                            return segment ? (
                              <div key={segmentId} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                <span className="text-sm font-medium">{segment.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{segment.count.toLocaleString()}</span>
                                  <button 
                                    onClick={() => setSelectedSegments(selectedSegments.filter(id => id !== segmentId))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <div className="text-sm text-muted-foreground text-center py-2">
                            No segments selected
                          </div>
                        )}
                      </div>
                      
                      <h4 className="font-medium mb-3">Estimated Reach</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Eligible:</span>
                          <span className="font-medium">
                            {selectedSegments.reduce((total, segmentId) => {
                              const segment = segments.find(s => s.id === segmentId);
                              return total + (segment?.count || 0);
                            }, 0).toLocaleString()} customers
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Selected Segments:</span>
                          <span className="font-medium">{selectedSegments.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Estimated Daily Entries:</span>
                          <span className="font-medium">
                            ~{Math.round(selectedSegments.reduce((total, segmentId) => {
                              const segment = segments.find(s => s.id === segmentId);
                              return total + (segment?.count || 0);
                            }, 0) * 0.1)} customers
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            {/* Journey Stages Tab */}
            <TabsContent value="stages" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Journey Stages</CardTitle>
                      <CardDescription>Define the steps and triggers for your customer journey</CardDescription>
                    </div>
                    <Button onClick={addStage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Stage
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Journey Flow Visualization */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Journey Flow</h4>
                    <div className="flex items-center gap-2 overflow-x-auto pb-4">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-center">
                          <div className="text-center min-w-[120px]">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <div className="text-sm font-medium">{stage.name}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {stage.triggerType}
                            </Badge>
                          </div>
                          {index < stages.length - 1 && (
                            <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Configuration */}
                  <div className="space-y-6">
                    {stages.map((stage, index) => (
                      <Card key={stage.id} className="border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                              </div>
                              <div>
                                <Input
                                  value={stage.name}
                                  onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                                  className="font-medium"
                                  placeholder="Stage name"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4" />
                              </Button>
                              {stages.length > 1 && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => removeStage(stage.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                              value={stage.description}
                              onChange={(e) => updateStage(stage.id, { description: e.target.value })}
                              placeholder="Describe what happens in this stage..."
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Trigger Type</label>
                              <select
                                value={stage.triggerType}
                                onChange={(e) => updateStage(stage.id, { triggerType: e.target.value as any })}
                                className="w-full px-3 py-2 border rounded-md"
                              >
                                <option value="event">Event-based</option>
                                <option value="time">Time-based</option>
                                <option value="condition">Condition-based</option>
                              </select>
                            </div>
                            
                            {stage.triggerType === "event" && (
                              <div>
                                <label className="block text-sm font-medium mb-2">Event Type</label>
                                <select className="w-full px-3 py-2 border rounded-md">
                                  <option value="page_view">Page View</option>
                                  <option value="form_submit">Form Submission</option>
                                  <option value="email_open">Email Open</option>
                                  <option value="purchase">Purchase</option>
                                  <option value="login">User Login</option>
                                </select>
                              </div>
                            )}
                            
                            {stage.triggerType === "time" && (
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <label className="block text-sm font-medium mb-2">Delay</label>
                                  <Input
                                    type="number"
                                    placeholder="1"
                                    className="w-full"
                                  />
                                </div>
                                <div className="flex-1">
                                  <label className="block text-sm font-medium mb-2">Unit</label>
                                  <select className="w-full px-3 py-2 border rounded-md">
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="days">Days</option>
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Stage Actions */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium">Actions</label>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => addActionToStage(stage.id)}
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Action
                              </Button>
                            </div>
                            <div className="space-y-2">
                              {stage.actions && stage.actions.length > 0 ? (
                                stage.actions.map((action: any) => {
                                  const getActionIcon = (type: string) => {
                                    switch (type) {
                                      case 'email': return Mail;
                                      case 'sms': return MessageSquare;
                                      case 'push': return Bell;
                                      case 'webhook': return Zap;
                                      case 'database': return Database;
                                      case 'delay': return Clock;
                                      case 'condition': return GitBranch;
                                      default: return Activity;
                                    }
                                  };
                                  
                                  const ActionIcon = getActionIcon(action.type);
                                  
                                  return (
                                    <div key={action.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                      <ActionIcon className="h-4 w-4 text-blue-500" />
                                      <input
                                        type="text"
                                        value={action.name}
                                        onChange={(e) => updateStageAction(stage.id, action.id, { name: e.target.value })}
                                        className="flex-1 text-sm bg-transparent border-none outline-none font-medium"
                                        placeholder="Action name"
                                        title="Click to edit action name"
                                      />
                                      <select
                                        value={action.type}
                                        onChange={(e) => {
                                          const newType = e.target.value;
                                          updateStageAction(stage.id, action.id, { 
                                            type: newType,
                                            name: getActionDisplayName(newType)
                                          });
                                        }}
                                        className="text-xs border rounded px-2 py-1"
                                      >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="push">Push</option>
                                        <option value="webhook">Webhook</option>
                                        <option value="database">Database</option>
                                        <option value="delay">Delay</option>
                                        <option value="condition">Condition</option>
                                      </select>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => removeActionFromStage(stage.id, action.id)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="text-center py-4 text-sm text-muted-foreground">
                                  No actions configured. Click "Add Action" to get started.
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automation Rules Tab */}
            <TabsContent value="automation" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Automations</CardTitle>
                    <CardDescription>Select automation rules for this journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search automations..."
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                      
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {automations.length > 0 ? automations.map((rule) => {
                          const isSelected = selectedAutomations.includes(rule.id);
                          const isCustom = rule.id.startsWith('custom-');
                          return (
                            <div 
                              key={rule.id} 
                              className={`p-3 border rounded-lg transition-all ${
                                isSelected 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    className="rounded mt-1"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedAutomations([...selectedAutomations, rule.id]);
                                      } else {
                                        setSelectedAutomations(selectedAutomations.filter(id => id !== rule.id));
                                      }
                                    }}
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{rule.name}</span>
                                      {isCustom && (
                                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                          Custom
                                        </Badge>
                                      )}
                                      {isSelected && (
                                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                          Selected
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{rule.description}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Settings className="h-4 w-4 text-gray-400" />
                                  {isCustom && (
                                    <button 
                                      onClick={() => {
                                        setAutomations(automations.filter(a => a.id !== rule.id));
                                        setSelectedAutomations(selectedAutomations.filter(id => id !== rule.id));
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                      title="Delete custom automation"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Zap className="h-3 w-3" />
                                  <span>{rule.trigger}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Activity className="h-3 w-3" />
                                  <span>{rule.actions?.length || 0} actions</span>
                                </div>
                              </div>
                            </div>
                          );
                        }) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No automations available</p>
                            <p className="text-sm">Create a custom automation to get started</p>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowCustomAutomationModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Custom Automation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Automation Configuration</CardTitle>
                    <CardDescription>Configure selected automation rules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Execution Priority</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="high">High Priority</option>
                        <option value="normal">Normal Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Error Handling</label>
                      <div className="space-y-2">
                        {['Retry Failed Actions', 'Skip on Error', 'Escalate to Support', 'Log and Continue'].map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Rate Limiting</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="number" placeholder="Max per hour" />
                        <Input type="number" placeholder="Max per day" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Operating Hours</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="24/7">24/7 Operation</option>
                        <option value="business">Business Hours Only</option>
                        <option value="custom">Custom Schedule</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Selected Automations ({selectedAutomations.length})</h4>
                      <div className="space-y-2">
                        {selectedAutomations.length > 0 ? (
                          selectedAutomations.map(automationId => {
                            const automation = automations.find(a => a.id === automationId);
                            return automation ? (
                              <div key={automationId} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                <div>
                                  <span className="text-sm font-medium">{automation.name}</span>
                                  <div className="text-xs text-muted-foreground">{automation.trigger}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                  <button 
                                    onClick={() => setSelectedAutomations(selectedAutomations.filter(id => id !== automationId))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <div className="text-sm text-muted-foreground text-center py-2">
                            No automations selected
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Automation Flow Designer</CardTitle>
                  <CardDescription>Visual representation of automation logic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
                    {/* Simplified automation flow visualization */}
                    <div className="flex items-center gap-4 overflow-x-auto">
                      <div className="text-center min-w-[120px]">
                        <div className="w-16 h-16 bg-green-100 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Zap className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-sm font-medium">Trigger</div>
                        <div className="text-xs text-muted-foreground">User Registration</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <div className="text-center min-w-[120px]">
                        <div className="w-16 h-16 bg-blue-100 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-sm font-medium">Action</div>
                        <div className="text-xs text-muted-foreground">Send Welcome Email</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <div className="text-center min-w-[120px]">
                        <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="text-sm font-medium">Delay</div>
                        <div className="text-xs text-muted-foreground">Wait 24 hours</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <div className="text-center min-w-[120px]">
                        <div className="w-16 h-16 bg-purple-100 border-2 border-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <GitBranch className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-sm font-medium">Condition</div>
                        <div className="text-xs text-muted-foreground">Profile Complete?</div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-6">
                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">{selectedAutomations.length}</div>
                          <div className="text-muted-foreground">Active Rules</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">
                            {selectedAutomations.reduce((total, id) => {
                              const automation = automations.find(a => a.id === id);
                              return total + (automation?.actions?.length || 0);
                            }, 0)}
                          </div>
                          <div className="text-muted-foreground">Total Actions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-purple-600">
                            {selectedAutomations.filter(id => {
                              const automation = automations.find(a => a.id === id);
                              return automation?.priority === 'high';
                            }).length}
                          </div>
                          <div className="text-muted-foreground">High Priority</div>
                        </div>
                      </div>
                      <Button variant="outline">
                        <Move className="h-4 w-4 mr-2" />
                        Open Advanced Flow Designer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Types</CardTitle>
                    <CardDescription>Select campaigns to include in this journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search campaigns..."
                            className="pl-10"
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                      
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {campaigns.length > 0 ? campaigns.map((campaign) => {
                          const isSelected = selectedCampaigns.includes(campaign.id);
                          const isCustom = campaign.id.startsWith('custom-');
                          return (
                            <div 
                              key={campaign.id} 
                              className={`p-3 border rounded-lg transition-all ${
                                isSelected 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="checkbox" 
                                    className="rounded mt-1"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                                      } else {
                                        setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                                      }
                                    }}
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{campaign.name}</span>
                                      {isCustom && (
                                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                          Custom
                                        </Badge>
                                      )}
                                      {isSelected && (
                                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                                          Selected
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{campaign.description}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Settings className="h-4 w-4 text-gray-400" />
                                  {isCustom && (
                                    <button 
                                      onClick={() => {
                                        setCampaigns(campaigns.filter(c => c.id !== campaign.id));
                                        setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                      title="Delete custom campaign"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  <span>{campaign.channels.join(', ')}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {campaign.features.map((feature) => (
                                  <Badge key={feature} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          );
                        }) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No campaigns available</p>
                            <p className="text-sm">Create a custom campaign to get started</p>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowCustomCampaignModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Custom Campaign
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Configuration</CardTitle>
                    <CardDescription>Configure selected campaigns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Campaign Objective</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="awareness">Brand Awareness</option>
                        <option value="engagement">Engagement</option>
                        <option value="conversion">Conversion</option>
                        <option value="retention">Retention</option>
                        <option value="advocacy">Customer Advocacy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Allocation</label>
                      <Input type="number" placeholder="Campaign budget ($)" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Performance Goals</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Open Rate (%)</label>
                          <Input type="number" placeholder="25" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Click Rate (%)</label>
                          <Input type="number" placeholder="5" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Conversion Rate (%)</label>
                          <Input type="number" placeholder="2" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">ROI Target</label>
                          <Input type="number" placeholder="300" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">A/B Testing</label>
                      <div className="space-y-2">
                        {['Subject Line Testing', 'Content Variation', 'Send Time Optimization', 'Creative Testing'].map((test) => (
                          <label key={test} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Selected Campaigns ({selectedCampaigns.length})</h4>
                      <div className="space-y-2">
                        {selectedCampaigns.length > 0 ? (
                          selectedCampaigns.map(campaignId => {
                            const campaign = campaigns.find(c => c.id === campaignId);
                            return campaign ? (
                              <div key={campaignId} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                <div>
                                  <span className="text-sm font-medium">{campaign.name}</span>
                                  <div className="text-xs text-muted-foreground">{campaign.channels.join(', ')}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">Active</Badge>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                  <button 
                                    onClick={() => setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId))}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <div className="text-sm text-muted-foreground text-center py-2">
                            No campaigns selected
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Forecast</CardTitle>
                  <CardDescription>Projected performance based on selected campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {selectedSegments.reduce((total, segmentId) => {
                          const segment = segments.find(s => s.id === segmentId);
                          return total + (segment?.count || 0);
                        }, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Est. Reach</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        {Math.round(selectedSegments.reduce((total, segmentId) => {
                          const segment = segments.find(s => s.id === segmentId);
                          return total + (segment?.count || 0);
                        }, 0) * 0.2).toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Est. Conversions</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {selectedCampaigns.length > 0 ? Math.round(15 + (selectedCampaigns.length * 2)) : 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        $${Math.round(selectedSegments.reduce((total, segmentId) => {
                          const segment = segments.find(s => s.id === segmentId);
                          return total + (segment?.count || 0);
                        }, 0) * 0.2 * 50 / 1000)}K
                      </div>
                      <div className="text-sm text-muted-foreground">Est. Revenue</div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-3">Channel Distribution</h4>
                      <div className="space-y-2 text-sm">
                        {selectedCampaigns.length > 0 ? (
                          (() => {
                            const allChannels = selectedCampaigns.reduce((acc, campaignId) => {
                              const campaign = campaigns.find(c => c.id === campaignId);
                              if (campaign) {
                                campaign.channels.forEach(channel => {
                                  acc[channel] = (acc[channel] || 0) + 1;
                                });
                              }
                              return acc;
                            }, {});
                            
                            const totalReach = selectedSegments.reduce((total, segmentId) => {
                              const segment = segments.find(s => s.id === segmentId);
                              return total + (segment?.count || 0);
                            }, 0);
                            
                            return Object.entries(allChannels).map(([channel, count]) => (
                              <div key={channel} className="flex justify-between">
                                <span>{channel}:</span>
                                <span className="font-medium">
                                  {Math.round(totalReach * 0.7 * (count / Object.keys(allChannels).length)).toLocaleString()} recipients
                                </span>
                              </div>
                            ));
                          })()
                        ) : (
                          <div className="text-muted-foreground">No campaigns selected</div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-3">Timeline Forecast</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Week 1:</span>
                          <span className="font-medium">Launch & Initial Response</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Week 2-3:</span>
                          <span className="font-medium">Peak Engagement</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Week 4:</span>
                          <span className="font-medium">Optimization & Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="automation" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Entry Conditions</CardTitle>
                    <CardDescription>Define who enters this journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Customer Segment</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="all">All Customers</option>
                        <option value="new">New Customers</option>
                        <option value="trial">Trial Users</option>
                        <option value="premium">Premium Customers</option>
                        <option value="inactive">Inactive Users</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Geographic Location</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="any">Any Location</option>
                        <option value="us">United States</option>
                        <option value="eu">European Union</option>
                        <option value="apac">Asia Pacific</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Source Channel</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="any">Any Channel</option>
                        <option value="organic">Organic Search</option>
                        <option value="paid">Paid Advertising</option>
                        <option value="social">Social Media</option>
                        <option value="email">Email Campaign</option>
                        <option value="direct">Direct Traffic</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exit Conditions</CardTitle>
                    <CardDescription>When customers should leave this journey</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Goal Achieved</div>
                          <div className="text-sm text-muted-foreground">Customer completes the journey goal</div>
                        </div>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Unsubscribed</div>
                          <div className="text-sm text-muted-foreground">Customer opts out of communications</div>
                        </div>
                        <input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Time Limit</div>
                          <div className="text-sm text-muted-foreground">Maximum time in journey exceeded</div>
                        </div>
                        <input type="checkbox" />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">Inactive Period</div>
                          <div className="text-sm text-muted-foreground">No activity for extended period</div>
                        </div>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Timing & Frequency</CardTitle>
                    <CardDescription>Control when and how often the journey runs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Operating Hours</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="24/7">24/7 - Always Active</option>
                        <option value="business">Business Hours Only</option>
                        <option value="custom">Custom Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="user">User's Local Time</option>
                        <option value="utc">UTC</option>
                        <option value="pst">Pacific Time</option>
                        <option value="est">Eastern Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Enrollments per Customer</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="once">Once Only</option>
                        <option value="multiple">Allow Re-enrollment</option>
                        <option value="daily">Once per Day</option>
                        <option value="weekly">Once per Week</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Goals</CardTitle>
                    <CardDescription>Set targets to measure journey success</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Completion Rate Goal</label>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="85" className="flex-1" />
                        <span className="flex items-center text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Conversion Goal</label>
                      <div className="flex gap-2">
                        <Input type="number" placeholder="25" className="flex-1" />
                        <span className="flex items-center text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Revenue Target</label>
                      <div className="flex gap-2">
                        <span className="flex items-center text-muted-foreground">$</span>
                        <Input type="number" placeholder="50000" className="flex-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preview & Test Tab */}
            <TabsContent value="preview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Journey Summary</CardTitle>
                    <CardDescription>Review your journey configuration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Journey Name</div>
                        <div className="font-medium">{journeyData.name || "Untitled Journey"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Description</div>
                        <div className="font-medium">{journeyData.description || "No description"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <Badge variant="outline">{journeyData.category}</Badge>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Number of Stages</div>
                        <div className="font-medium">{stages.length} stages</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Estimated Duration</div>
                        <div className="font-medium">{journeyData.estimatedDuration || "Not specified"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Target Metric</div>
                        <div className="font-medium">{journeyData.targetMetric || "Not specified"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Testing & Validation</CardTitle>
                    <CardDescription>Test your journey before activation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => runTests('preview')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Customer Flow
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => runTests('sample')}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Test with Sample Data
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => runTests('triggers')}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Validate Triggers
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => runTests('configuration')}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Check Configuration
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Validation Results</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>All stages have valid triggers</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Entry conditions are defined</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Consider adding exit conditions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Actions are configured</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Journey Flow Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Journey Flow Preview</CardTitle>
                  <CardDescription>Visual representation of your customer journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4 overflow-x-auto">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-center">
                          <div className="text-center min-w-[140px]">
                            <div className="w-20 h-20 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{index + 1}</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium mb-1">{stage.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {stage.triggerType}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {stage.description.substring(0, 30)}...
                            </div>
                          </div>
                          {index < stages.length - 1 && (
                            <div className="flex flex-col items-center mx-4">
                              <ArrowRight className="h-5 w-5 text-blue-500" />
                              <div className="text-xs text-muted-foreground mt-1">auto</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Custom Segment Modal */}
          {showCustomSegmentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="max-w-md w-full mx-4">
                <CardHeader>
                  <CardTitle>Create Custom Segment</CardTitle>
                  <CardDescription>Define a new customer segment for your journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Segment Name</label>
                    <Input
                      value={customSegmentData.name}
                      onChange={(e) => setCustomSegmentData({...customSegmentData, name: e.target.value})}
                      placeholder="e.g., High-Value Mobile Users"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={customSegmentData.description}
                      onChange={(e) => setCustomSegmentData({...customSegmentData, description: e.target.value})}
                      placeholder="Describe this customer segment..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Criteria</label>
                    <Textarea
                      value={customSegmentData.criteria}
                      onChange={(e) => setCustomSegmentData({...customSegmentData, criteria: e.target.value})}
                      placeholder="e.g., total_purchases > 500 AND device = 'mobile'"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Estimated Count</label>
                    <Input
                      type="number"
                      value={customSegmentData.estimatedCount}
                      onChange={(e) => setCustomSegmentData({...customSegmentData, estimatedCount: Number.parseInt(e.target.value) || 0})}
                      placeholder="Estimated number of customers"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        if (customSegmentData.name && customSegmentData.description) {
                          const newSegment = {
                            id: `custom-${Date.now()}`,
                            name: customSegmentData.name,
                            description: customSegmentData.description,
                            count: customSegmentData.estimatedCount,
                            criteria: customSegmentData.criteria || "Custom criteria"
                          };
                          
                          // Add to segments list
                          setSegments([...segments, newSegment]);
                          
                          // Automatically select the new segment
                          setSelectedSegments([...selectedSegments, newSegment.id]);
                          
                          console.log("Creating custom segment:", newSegment);
                          setShowCustomSegmentModal(false);
                          setCustomSegmentData({ name: "", description: "", criteria: "", estimatedCount: 0 });
                          alert(`Custom segment "${customSegmentData.name}" created and added to your target segments!`);
                        } else {
                          alert("Please fill in segment name and description");
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Segment
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowCustomSegmentModal(false);
                        setCustomSegmentData({ name: "", description: "", criteria: "", estimatedCount: 0 });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Custom Automation Modal */}
          {showCustomAutomationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Create Custom Automation</CardTitle>
                  <CardDescription>Define a new automation rule for your journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Automation Name</label>
                    <Input
                      value={customAutomationData.name}
                      onChange={(e) => setCustomAutomationData({...customAutomationData, name: e.target.value})}
                      placeholder="e.g., Welcome Email Sequence"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={customAutomationData.description}
                      onChange={(e) => setCustomAutomationData({...customAutomationData, description: e.target.value})}
                      placeholder="Describe what this automation does..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Trigger Type</label>
                      <select
                        value={customAutomationData.trigger}
                        onChange={(e) => setCustomAutomationData({...customAutomationData, trigger: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="User Registration">User Registration</option>
                        <option value="User Action">User Action</option>
                        <option value="Time Delay">Time Delay</option>
                        <option value="Goal Achievement">Goal Achievement</option>
                        <option value="Inactivity Period">Inactivity Period</option>
                        <option value="Content Request">Content Request</option>
                        <option value="User Activity">User Activity</option>
                        <option value="Risk Score Change">Risk Score Change</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={customAutomationData.priority}
                        onChange={(e) => setCustomAutomationData({...customAutomationData, priority: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="high">High Priority</option>
                        <option value="normal">Normal Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Actions</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Send Notification', 'Update Segment', 'Send Email', 'Send SMS', 'Log Event', 'Update Analytics', 'Escalate', 'Offer Incentive'].map((action) => (
                        <label key={action} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={customAutomationData.actions.includes(action)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCustomAutomationData({
                                  ...customAutomationData,
                                  actions: [...customAutomationData.actions, action]
                                });
                              } else {
                                setCustomAutomationData({
                                  ...customAutomationData,
                                  actions: customAutomationData.actions.filter(a => a !== action)
                                });
                              }
                            }}
                            className="rounded" 
                          />
                          <span className="text-sm">{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>


                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      checked={customAutomationData.enabled}
                      onChange={(e) => setCustomAutomationData({...customAutomationData, enabled: e.target.checked})}
                      className="rounded"
                    />
                    <label className="text-sm font-medium">Enable automation immediately</label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        if (customAutomationData.name && customAutomationData.description && customAutomationData.actions.length > 0) {
                          const newAutomation = {
                            id: `custom-${Date.now()}`,
                            name: customAutomationData.name,
                            description: customAutomationData.description,
                            trigger: customAutomationData.trigger,
                            actions: customAutomationData.actions,
                            priority: customAutomationData.priority,
                            enabled: customAutomationData.enabled
                          };
                          
                          // Add to automations list
                          setAutomations([...automations, newAutomation]);
                          
                          // Automatically select the new automation
                          setSelectedAutomations([...selectedAutomations, newAutomation.id]);
                          
                          console.log("Creating custom automation:", newAutomation);
                          setShowCustomAutomationModal(false);
                          setCustomAutomationData({ 
                            name: "", 
                            description: "", 
                            trigger: "User Action", 
                            actions: ["Send Notification"], 
                            priority: "normal", 
                            enabled: true 
                          });
                          alert(`Custom automation "${customAutomationData.name}" created and added to your journey!`);
                        } else {
                          alert("Please fill in automation name, description, and select at least one action");
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Automation
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowCustomAutomationModal(false);
                        setCustomAutomationData({ 
                          name: "", 
                          description: "", 
                          trigger: "User Action", 
                          actions: ["Send Notification"], 
                          priority: "normal", 
                          enabled: true 
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Custom Campaign Modal */}
          {showCustomCampaignModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>Create Custom Campaign</CardTitle>
                  <CardDescription>Design a new marketing campaign for your journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Name</label>
                    <Input
                      value={customCampaignData.name}
                      onChange={(e) => setCustomCampaignData({...customCampaignData, name: e.target.value})}
                      placeholder="e.g., Welcome Email Series"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      value={customCampaignData.description}
                      onChange={(e) => setCustomCampaignData({...customCampaignData, description: e.target.value})}
                      placeholder="Describe this campaign's purpose and goals..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Type</label>
                    <select
                      value={customCampaignData.type}
                      onChange={(e) => setCustomCampaignData({...customCampaignData, type: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="email">Email Campaign</option>
                      <option value="sms">SMS Campaign</option>
                      <option value="push">Push Notification</option>
                      <option value="social">Social Media</option>
                      <option value="display">Display Advertising</option>
                      <option value="multi-channel">Multi-Channel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Channels</label>
                    <div className="space-y-2">
                      {['Email', 'SMS', 'Push Notifications', 'Social Media', 'Display Ads', 'In-App Messages'].map((channel) => (
                        <label key={channel} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={customCampaignData.channels.includes(channel)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCustomCampaignData({
                                  ...customCampaignData,
                                  channels: [...customCampaignData.channels, channel]
                                });
                              } else {
                                setCustomCampaignData({
                                  ...customCampaignData,
                                  channels: customCampaignData.channels.filter(c => c !== channel)
                                });
                              }
                            }}
                            className="rounded" 
                          />
                          <span className="text-sm">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget ($)</label>
                      <Input
                        type="number"
                        value={customCampaignData.budget}
                        onChange={(e) => setCustomCampaignData({...customCampaignData, budget: Number.parseInt(e.target.value) || 0})}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration (days)</label>
                      <Input
                        type="number"
                        value={customCampaignData.duration}
                        onChange={(e) => setCustomCampaignData({...customCampaignData, duration: Number.parseInt(e.target.value) || 0})}
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Target Goals</label>
                    <div className="space-y-2">
                      {['Increase Awareness', 'Drive Conversions', 'Boost Engagement', 'Generate Leads', 'Retain Customers', 'Upsell Products'].map((goal) => (
                        <label key={goal} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={customCampaignData.goals.includes(goal)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCustomCampaignData({
                                  ...customCampaignData,
                                  goals: [...customCampaignData.goals, goal]
                                });
                              } else {
                                setCustomCampaignData({
                                  ...customCampaignData,
                                  goals: customCampaignData.goals.filter(g => g !== goal)
                                });
                              }
                            }}
                            className="rounded" 
                          />
                          <span className="text-sm">{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Reach</label>
                      <Input
                        type="number"
                        value={customCampaignData.expectedReach}
                        onChange={(e) => setCustomCampaignData({...customCampaignData, expectedReach: Number.parseInt(e.target.value) || 0})}
                        placeholder="10000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Target CTR (%)</label>
                      <Input
                        type="number"
                        value={customCampaignData.targetCTR}
                        onChange={(e) => setCustomCampaignData({...customCampaignData, targetCTR: Number.parseFloat(e.target.value) || 0})}
                        placeholder="3.5"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      checked={customCampaignData.autoOptimize}
                      onChange={(e) => setCustomCampaignData({...customCampaignData, autoOptimize: e.target.checked})}
                      className="rounded"
                    />
                    <label className="text-sm font-medium">Enable auto-optimization based on performance</label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        if (customCampaignData.name && customCampaignData.description && customCampaignData.channels.length > 0) {
                          const newCampaign = {
                            id: `custom-${Date.now()}`,
                            name: customCampaignData.name,
                            description: customCampaignData.description,
                            type: customCampaignData.type,
                            channels: customCampaignData.channels,
                            budget: customCampaignData.budget,
                            duration: customCampaignData.duration,
                            goals: customCampaignData.goals,
                            expectedReach: customCampaignData.expectedReach,
                            targetCTR: customCampaignData.targetCTR,
                            autoOptimize: customCampaignData.autoOptimize,
                            status: 'active'
                          };
                          
                          // Add to campaigns list
                          setCampaigns([...campaigns, newCampaign]);
                          
                          // Automatically select the new campaign
                          setSelectedCampaigns([...selectedCampaigns, newCampaign.id]);
                          
                          console.log("Creating custom campaign:", newCampaign);
                          setShowCustomCampaignModal(false);
                          setCustomCampaignData({ 
                            name: "", 
                            description: "", 
                            type: "email", 
                            channels: ["Email"], 
                            budget: 0, 
                            duration: 0, 
                            goals: ["Drive Conversions"], 
                            expectedReach: 0, 
                            targetCTR: 0, 
                            autoOptimize: true 
                          });
                          alert(`Custom campaign "${customCampaignData.name}" created and added to your journey!`);
                        } else {
                          alert("Please fill in campaign name, description, and select at least one channel");
                        }
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setShowCustomCampaignModal(false);
                        setCustomCampaignData({ 
                          name: "", 
                          description: "", 
                          type: "email", 
                          channels: ["Email"], 
                          budget: 0, 
                          duration: 0, 
                          goals: ["Drive Conversions"], 
                          expectedReach: 0, 
                          targetCTR: 0, 
                          autoOptimize: true 
                        });
                      }}
                    >
                      Cancel
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