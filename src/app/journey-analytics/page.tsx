"use client";

import React, { useState, useEffect } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Plus,
  GitBranch,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  ArrowRight,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  MapPin,
  Calendar,
  MousePointer,
  Smartphone,
  Monitor,
  Mail,
  ShoppingCart,
  DollarSign,
  Activity
} from "lucide-react";

import Link from "next/link";

// Sample journey data
const journeyTemplates = [
  {
    id: "JT-001",
    name: "Purchase Journey",
    description: "Complete customer journey from discovery to purchase",
    status: "active",
    totalCustomers: 12450,
    completionRate: 34.2,
    avgDuration: "5.2 days",
    conversionValue: 289500,
    stages: [
      { name: "Awareness", customers: 12450, dropoffRate: 15 },
      { name: "Interest", customers: 10582, dropoffRate: 25 },
      { name: "Consideration", customers: 7937, dropoffRate: 35 },
      { name: "Purchase Intent", customers: 5159, dropoffRate: 20 },
      { name: "Purchase", customers: 4127, dropoffRate: 0 }
    ]
  },
  {
    id: "JT-002", 
    name: "SaaS Onboarding Flow",
    description: "New user onboarding and activation journey",
    status: "active",
    totalCustomers: 8920,
    completionRate: 67.8,
    avgDuration: "3.1 days",
    conversionValue: 534000,
    stages: [
      { name: "Registration", customers: 8920, dropoffRate: 12 },
      { name: "Email Verification", customers: 7850, dropoffRate: 8 },
      { name: "Profile Setup", customers: 7222, dropoffRate: 18 },
      { name: "First Login", customers: 5922, dropoffRate: 15 },
      { name: "Feature Discovery", customers: 5034, dropoffRate: 10 },
      { name: "First Action", customers: 4530, dropoffRate: 25 },
      { name: "Activation", customers: 3398, dropoffRate: 0 }
    ]
  },
  {
    id: "JT-003",
    name: "Customer Support Journey",
    description: "Customer support interaction and resolution flow",
    status: "active", 
    totalCustomers: 3450,
    completionRate: 78.5,
    avgDuration: "2.3 hours",
    conversionValue: 0,
    stages: [
      { name: "Issue Identified", customers: 3450, dropoffRate: 5 },
      { name: "Contact Initiated", customers: 3278, dropoffRate: 12 },
      { name: "Agent Assigned", customers: 2884, dropoffRate: 8 },
      { name: "Issue Diagnosed", customers: 2653, dropoffRate: 15 },
      { name: "Solution Provided", customers: 2255, dropoffRate: 20 },
      { name: "Issue Resolved", customers: 1804, dropoffRate: 0 }
    ]
  }
];

const recentJourneyEvents = [
  {
    id: "JE-001",
    customerName: "Sarah Johnson",
    customerId: "CUST-002",
    journey: "Purchase Journey",
    currentStage: "Consideration",
    lastActivity: "2024-01-15 14:30",
    activityType: "Product Comparison",
    device: "desktop",
    location: "Los Angeles, CA"
  },
  {
    id: "JE-002", 
    customerName: "Mike Chen",
    customerId: "CUST-005",
    journey: "SaaS Onboarding Flow",
    currentStage: "Feature Discovery",
    lastActivity: "2024-01-15 13:45",
    activityType: "Tutorial Completion",
    device: "mobile",
    location: "Seattle, WA"
  },
  {
    id: "JE-003",
    customerName: "Emily Davis",
    customerId: "CUST-004",
    journey: "Customer Support Journey", 
    currentStage: "Solution Provided",
    lastActivity: "2024-01-15 12:20",
    activityType: "Support Chat",
    device: "desktop",
    location: "Boston, MA"
  }
];

export default function JourneyAnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [activatedJourneys, setActivatedJourneys] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showJourneyModal, setShowJourneyModal] = useState(false);

  // Load activated journeys from localStorage
  useEffect(() => {
    const loadActivatedJourneys = () => {
      const savedJourneys = localStorage.getItem('activatedJourneys');
      if (savedJourneys) {
        try {
          const parsed = JSON.parse(savedJourneys);
          setActivatedJourneys(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error('Error parsing activated journeys:', error);
          setActivatedJourneys([]);
        }
      }
    };

    // Load on mount
    loadActivatedJourneys();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'activatedJourneys') {
        loadActivatedJourneys();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events to refresh when user returns to tab
    const handleFocus = () => {
      loadActivatedJourneys();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      draft: { color: "bg-gray-100 text-gray-800", text: "Draft" },
      paused: { color: "bg-yellow-100 text-yellow-800", text: "Paused" }
    };
    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getDeviceIcon = (device: string) => {
    return device === 'mobile' ? Smartphone : Monitor;
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Journey Analytics</h1>
              <p className="text-muted-foreground">
                Map and analyze customer journeys across all touchpoints and channels
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => {
                  const savedJourneys = localStorage.getItem('activatedJourneys');
                  if (savedJourneys) {
                    try {
                      const parsed = JSON.parse(savedJourneys);
                      setActivatedJourneys(Array.isArray(parsed) ? parsed : []);
                    } catch (error) {
                      console.error('Error parsing activated journeys:', error);
                      setActivatedJourneys([]);
                    }
                  }
                }}
              >
                <Activity className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button asChild>
                <Link href="/journey-analytics/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Journey
                </Link>
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Journeys</p>
                    <p className="text-2xl font-bold">
                      {journeyTemplates.filter(j => j.status === 'active').length + activatedJourneys.filter(j => j.status !== 'paused').length}
                    </p>
                  </div>
                  <GitBranch className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">
                      {(journeyTemplates.reduce((sum, j) => sum + j.totalCustomers, 0) + 
                        activatedJourneys.reduce((sum, j) => {
                          return sum + (j.selectedSegments?.reduce((segSum, segmentId) => {
                            const segment = j.segments?.find(s => s.id === segmentId);
                            return segSum + (segment?.count || 0);
                          }, 0) || 0);
                        }, 0)).toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Completion Rate</p>
                    <p className="text-2xl font-bold">
                      {(journeyTemplates.reduce((sum, j) => sum + j.completionRate, 0) / journeyTemplates.length).toFixed(1)}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      ${(journeyTemplates.reduce((sum, j) => sum + j.conversionValue, 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Paused Journeys</p>
                    <p className="text-2xl font-bold">
                      {activatedJourneys.filter(j => j.status === 'paused').length}
                    </p>
                  </div>
                  <Pause className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Journey Overview</TabsTrigger>
              <TabsTrigger value="templates">Journey Templates</TabsTrigger>
              <TabsTrigger value="realtime">Real-time Tracking</TabsTrigger>
            </TabsList>

            {/* Journey Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6">
                {/* No Activated Journeys Message */}
                {activatedJourneys.length === 0 && (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="p-8 text-center">
                      <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Active Custom Journeys</h3>
                      <p className="text-gray-600 mb-4">
                        Create and activate a custom journey to see it appear here
                      </p>
                      <Button asChild>
                        <Link href="/journey-analytics/create">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Journey
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {/* Activated Journeys */}
                {activatedJourneys.length > 0 && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-green-500" />
                        Active Custom Journeys ({activatedJourneys.length})
                      </h3>
                      <div className="grid gap-4">
                        {activatedJourneys.map((journey, index) => (
                          <Card key={`activated-${index}`} className="border-l-4 border-l-green-500">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="flex items-center gap-2">
                                    <GitBranch className="h-5 w-5 text-green-500" />
                                    {journey.journeyData?.name || "Custom Journey"}
                                  </CardTitle>
                                  <CardDescription>{journey.journeyData?.description || "Custom created journey"}</CardDescription>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge className={journey.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                                      {journey.status === 'paused' ? 'Paused' : 'Active'}
                                    </Badge>
                                    <Badge variant="outline">Custom</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Activated: {new Date(journey.activatedAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedJourney(journey);
                                      setShowJourneyModal(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      // Navigate to edit with journey data pre-loaded
                                      sessionStorage.setItem('editJourneyData', JSON.stringify(journey));
                                      window.location.href = '/journey-analytics/create?edit=true';
                                    }}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                  {journey.status === 'paused' ? (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to start the journey "${journey.journeyData?.name || 'Custom Journey'}"?`)) {
                                          // Update journey status to active
                                          const updatedJourneys = activatedJourneys.map((j, i) => 
                                            i === index ? { ...j, status: 'active', startedAt: new Date().toISOString() } : j
                                          );
                                          setActivatedJourneys(updatedJourneys);
                                          localStorage.setItem('activatedJourneys', JSON.stringify(updatedJourneys));
                                          alert('Journey started successfully!');
                                        }
                                      }}
                                    >
                                      <Play className="h-4 w-4 mr-1" />
                                      Start
                                    </Button>
                                  ) : (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to pause the journey "${journey.journeyData?.name || 'Custom Journey'}"?`)) {
                                          // Update journey status to paused
                                          const updatedJourneys = activatedJourneys.map((j, i) => 
                                            i === index ? { ...j, status: 'paused', pausedAt: new Date().toISOString() } : j
                                          );
                                          setActivatedJourneys(updatedJourneys);
                                          localStorage.setItem('activatedJourneys', JSON.stringify(updatedJourneys));
                                          alert('Journey paused successfully!');
                                        }
                                      }}
                                    >
                                      <Pause className="h-4 w-4 mr-1" />
                                      Pause
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {/* Journey Summary */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                  <div className="text-lg font-bold text-green-600">
                                    {journey.selectedSegments?.reduce((total, segmentId) => {
                                      const segment = journey.segments?.find(s => s.id === segmentId);
                                      return total + (segment?.count || 0);
                                    }, 0)?.toLocaleString() || '0'}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Target Audience</div>
                                </div>
                                <div className="text-center p-3 bg-blue-50 rounded-lg">
                                  <div className="text-lg font-bold text-blue-600">{journey.stages?.length || 0}</div>
                                  <div className="text-sm text-muted-foreground">Journey Stages</div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded-lg">
                                  <div className="text-lg font-bold text-purple-600">{journey.selectedCampaigns?.length || 0}</div>
                                  <div className="text-sm text-muted-foreground">Active Campaigns</div>
                                </div>
                                <div className="text-center p-3 bg-orange-50 rounded-lg">
                                  <div className="text-lg font-bold text-orange-600">{journey.selectedAutomations?.length || 0}</div>
                                  <div className="text-sm text-muted-foreground">Automations</div>
                                </div>
                              </div>

                              {/* Journey Stages Preview */}
                              <div>
                                <h4 className="font-medium mb-3">Journey Stages</h4>
                                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                  {journey.stages?.slice(0, 5).map((stage, stageIndex) => (
                                    <div key={stageIndex} className="flex items-center">
                                      <div className="text-center min-w-[100px]">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                                          <span className="text-sm font-bold text-green-600">{stageIndex + 1}</span>
                                        </div>
                                        <div className="text-xs font-medium">{stage.name}</div>
                                      </div>
                                      {stageIndex < Math.min(journey.stages.length - 1, 4) && (
                                        <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                                      )}
                                    </div>
                                  ))}
                                  {journey.stages?.length > 5 && (
                                    <div className="text-xs text-muted-foreground ml-2">
                                      +{journey.stages.length - 5} more
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div className="border-t pt-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-blue-500" />
                        Template-Based Journeys
                      </h3>
                    </div>
                  </>
                )}
                
                {/* Default Template Journeys */}
                {journeyTemplates.map((journey) => (
                  <Card key={journey.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <GitBranch className="h-5 w-5 text-blue-500" />
                            {journey.name}
                          </CardTitle>
                          <CardDescription>{journey.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(journey.status)}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              alert(`Viewing details for ${journey.name}\n\nFeatures:\n• Journey flow visualization\n• Performance metrics\n• Customer segments\n• Real-time analytics`);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Journey Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{journey.totalCustomers.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total Customers</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{journey.completionRate}%</div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{journey.avgDuration}</div>
                          <div className="text-sm text-muted-foreground">Avg Duration</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">
                            ${(journey.conversionValue / 1000).toFixed(0)}K
                          </div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                        </div>
                      </div>

                      {/* Journey Flow Visualization */}
                      <div>
                        <h4 className="font-medium mb-3">Journey Flow</h4>
                        <div className="flex items-center gap-2 overflow-x-auto pb-4">
                          {journey.stages.map((stage, index) => (
                            <div key={index} className="flex items-center">
                              <div className="text-center min-w-[120px]">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                  <div className="text-center">
                                    <div className="text-lg font-bold text-blue-600">
                                      {stage.customers.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">{stage.name}</div>
                                {stage.dropoffRate > 0 && (
                                  <div className="text-xs text-red-500 mt-1">
                                    -{stage.dropoffRate}% dropoff
                                  </div>
                                )}
                              </div>
                              {index < journey.stages.length - 1 && (
                                <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Journey Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search journey templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {journeyTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">{template.description}</CardDescription>
                        </div>
                        {getStatusBadge(template.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Customers:</span>
                          <span className="font-medium">{template.totalCustomers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Completion:</span>
                          <span className="font-medium">{template.completionRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Stages:</span>
                          <span className="font-medium">{template.stages.length}</span>
                        </div>
                        <div className="pt-3 border-t">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <Link href={`/journey-analytics/templates/use?template=${template.id}`}>
                                <Play className="h-4 w-4 mr-1" />
                                Use Template
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Real-time Tracking Tab */}
            <TabsContent value="realtime" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Journey Activity</CardTitle>
                  <CardDescription>
                    Real-time customer movements through journey stages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJourneyEvents.map((event) => {
                      const DeviceIcon = getDeviceIcon(event.device);
                      return (
                        <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Activity className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{event.customerName}</span>
                              <Badge variant="outline" className="text-xs">{event.customerId}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">{event.journey}</span> → {event.currentStage}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {event.activityType} • {event.lastActivity}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <DeviceIcon className="h-3 w-3" />
                              {event.device}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedCustomer(event);
                              setShowCustomerModal(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Detail Modal */}
        {showCustomerModal && selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customer Journey Details</CardTitle>
                    <CardDescription>
                      Real-time tracking for {selectedCustomer.customerName}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCustomerModal(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedCustomer.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer ID:</span>
                        <span className="font-medium">{selectedCustomer.customerId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{selectedCustomer.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Device:</span>
                        <span className="font-medium capitalize">{selectedCustomer.device}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Journey Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Journey:</span>
                        <span className="font-medium">{selectedCustomer.journey}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Stage:</span>
                        <Badge variant="outline">{selectedCustomer.currentStage}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Activity:</span>
                        <span className="font-medium">{selectedCustomer.lastActivity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activity Type:</span>
                        <span className="font-medium">{selectedCustomer.activityType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Progress */}
                <div>
                  <h4 className="font-medium mb-3">Journey Progress</h4>
                  <div className="space-y-3">
                    {[
                      { stage: 'Started', status: 'completed', time: '2 hours ago' },
                      { stage: selectedCustomer.currentStage, status: 'current', time: 'Now' },
                      { stage: 'Next Action', status: 'pending', time: 'Upcoming' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium">{item.stage}</div>
                          <div className="text-sm text-muted-foreground">{item.time}</div>
                        </div>
                        <Badge variant={item.status === 'completed' ? 'default' : 'outline'}>
                          {item.status === 'completed' ? 'Complete' : 
                           item.status === 'current' ? 'In Progress' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h4 className="font-medium mb-3">Recent Activities</h4>
                  <div className="space-y-2">
                    {[
                      { action: 'Clicked email link', time: '15 minutes ago', type: 'Email' },
                      { action: 'Viewed product page', time: '1 hour ago', type: 'Website' },
                      { action: 'Opened email campaign', time: '2 hours ago', type: 'Email' },
                      { action: 'Signed up for newsletter', time: '3 hours ago', type: 'Form' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Track More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Journey Detail Modal */}
        {showJourneyModal && selectedJourney && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Journey Details</CardTitle>
                    <CardDescription>
                      Complete details for "{selectedJourney.journeyData?.name || 'Custom Journey'}"
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowJourneyModal(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Journey Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Journey Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedJourney.journeyData?.name || 'Custom Journey'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Description:</span>
                        <span className="font-medium">{selectedJourney.journeyData?.description || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{selectedJourney.journeyData?.category || 'Custom'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge className={selectedJourney.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {selectedJourney.status || 'Active'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Activated:</span>
                        <span className="font-medium">{new Date(selectedJourney.activatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Target Audience:</span>
                        <span className="font-medium">
                          {selectedJourney.selectedSegments?.reduce((total, segmentId) => {
                            const segment = selectedJourney.segments?.find(s => s.id === segmentId);
                            return total + (segment?.count || 0);
                          }, 0)?.toLocaleString() || '0'} customers
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Journey Stages:</span>
                        <span className="font-medium">{selectedJourney.stages?.length || 0} stages</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Campaigns:</span>
                        <span className="font-medium">{selectedJourney.selectedCampaigns?.length || 0} campaigns</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Automations:</span>
                        <span className="font-medium">{selectedJourney.selectedAutomations?.length || 0} rules</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Stages */}
                <div>
                  <h4 className="font-medium mb-3">Journey Stages</h4>
                  <div className="grid gap-3">
                    {selectedJourney.stages?.map((stage, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{stage.name}</div>
                          <div className="text-sm text-muted-foreground">{stage.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{stage.triggerType}</Badge>
                          <div className="text-xs text-muted-foreground">{stage.actions?.length || 0} actions</div>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-4 text-muted-foreground">
                        No stages configured
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Segments */}
                <div>
                  <h4 className="font-medium mb-3">Target Segments</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedJourney.selectedSegments?.map((segmentId) => {
                      const segment = selectedJourney.segments?.find(s => s.id === segmentId);
                      return segment ? (
                        <div key={segmentId} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{segment.name}</div>
                            <div className="text-sm text-muted-foreground">{segment.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{segment.count?.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">customers</div>
                          </div>
                        </div>
                      ) : null;
                    }) || (
                      <div className="text-center py-4 text-muted-foreground col-span-2">
                        No segments selected
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      sessionStorage.setItem('editJourneyData', JSON.stringify(selectedJourney));
                      window.location.href = '/journey-analytics/create?edit=true';
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Journey
                  </Button>
                  {selectedJourney.status === 'paused' ? (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        if (confirm(`Are you sure you want to start the journey "${selectedJourney.journeyData?.name || 'Custom Journey'}"?`)) {
                          const updatedJourneys = activatedJourneys.map((j) => 
                            j.id === selectedJourney.id ? { ...j, status: 'active', startedAt: new Date().toISOString() } : j
                          );
                          setActivatedJourneys(updatedJourneys);
                          localStorage.setItem('activatedJourneys', JSON.stringify(updatedJourneys));
                          setSelectedJourney({ ...selectedJourney, status: 'active' }); // Update modal state
                          alert('Journey started successfully!');
                        }
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Journey
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        if (confirm(`Are you sure you want to pause the journey "${selectedJourney.journeyData?.name || 'Custom Journey'}"?`)) {
                          const updatedJourneys = activatedJourneys.map((j) => 
                            j.id === selectedJourney.id ? { ...j, status: 'paused', pausedAt: new Date().toISOString() } : j
                          );
                          setActivatedJourneys(updatedJourneys);
                          localStorage.setItem('activatedJourneys', JSON.stringify(updatedJourneys));
                          setSelectedJourney({ ...selectedJourney, status: 'paused' }); // Update modal state
                          alert('Journey paused successfully!');
                        }
                      }}
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Journey
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => {
                      alert('Analytics feature will be available in the next update!');
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </StaticExportLayout>
    </>
  );
}