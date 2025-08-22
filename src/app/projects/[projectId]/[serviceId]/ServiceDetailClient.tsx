"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  projectsList, 
  projectServices, 
  prospectsData,
  customerBehaviorData,
  behavioralAutomations,
  behavioralSegments
} from "@/lib/data/projectsData";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Settings,
  FileText,
  Phone,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Database,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  MapPin,
  DollarSign,
  Activity,
  Workflow,
  MousePointer,
  Timer,
  Smartphone,
  Monitor,
  Star,
  UserPlus,
  TrendingDown,
  ExternalLink,
  Building,
  Flame
} from "lucide-react";

interface ServiceDetailClientProps {
  projectId: string;
  serviceId: string;
}

export default function ServiceDetailClient({ projectId, serviceId }: ServiceDetailClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  const project = projectsList.find(p => p.id === projectId);
  const services = projectServices[projectId] || [];
  const service = services.find(s => s.id === serviceId);

  if (!project || !service) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold text-muted-foreground">Service Not Found</h1>
        <Button 
          className="mt-4"
          onClick={() => router.push(`/projects/${projectId}`)}
        >
          Back to Project
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      hot: { color: "bg-red-100 text-red-800 border-red-200", text: "Hot", icon: Flame },
      warm: { color: "bg-orange-100 text-orange-800 border-orange-200", text: "Warm", icon: TrendingUp },
      cold: { color: "bg-blue-100 text-blue-800 border-blue-200", text: "Cold", icon: TrendingDown },
      active: { color: "bg-green-100 text-green-800 border-green-200", text: "Active", icon: CheckCircle },
      inactive: { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Inactive", icon: AlertCircle },
      paused: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Paused", icon: Pause }
    };
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getEngagementBadge = (level: string) => {
    const engagementConfig = {
      high: { color: "bg-green-100 text-green-800", text: "High Engagement" },
      medium: { color: "bg-yellow-100 text-yellow-800", text: "Medium Engagement" },
      low: { color: "bg-red-100 text-red-800", text: "Low Engagement" }
    };
    const config = engagementConfig[level] || engagementConfig.medium;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getActivityIcon = (type: string) => {
    const iconMap = {
      page_view: Globe,
      email_open: Mail,
      email_click: MousePointer,
      form_submission: FileText,
      purchase: DollarSign,
      download: Download
    };
    return iconMap[type] || Activity;
  };

  const filteredProspects = prospectsData.filter(prospect =>
    prospect.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBehaviorData = customerBehaviorData.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAutomations = behavioralAutomations.filter(automation =>
    automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    automation.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSegments = behavioralSegments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/projects/${projectId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {project.name}
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Behavior Analytics</h1>
          <p className="text-muted-foreground">
            Track prospects, analyze customer behavior, and automate engagement workflows
          </p>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Prospects</p>
                <p className="text-2xl font-bold">{prospectsData.length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hot Leads</p>
                <p className="text-2xl font-bold">{prospectsData.filter(p => p.status === 'hot').length}</p>
              </div>
              <Flame className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Automations</p>
                <p className="text-2xl font-bold">{behavioralAutomations.filter(a => a.status === 'active').length}</p>
              </div>
              <Workflow className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Behavioral Segments</p>
                <p className="text-2xl font-bold">{behavioralSegments.length}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="behavior">Customer Behavior</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Behavioral Segments Overview</CardTitle>
                <CardDescription>
                  Customer segments based on behavior patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralSegments.slice(0, 3).map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{segment.name}</div>
                      <div className="text-sm text-muted-foreground">{segment.customerCount.toLocaleString()} customers</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{segment.conversionRate}%</div>
                      <div className="text-xs text-muted-foreground">conversion</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Automations</CardTitle>
                <CardDescription>
                  Highest converting behavioral workflows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {behavioralAutomations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{automation.name}</div>
                      <div className="text-sm text-muted-foreground">{automation.performance.triggered} triggered</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{automation.performance.conversionRate}%</div>
                      <div className="text-xs text-muted-foreground">conversion</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prospects Tab */}
        <TabsContent value="prospects" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Lead Management</h2>
              <p className="text-muted-foreground">
                Track prospects with behavioral lead scoring and engagement analytics
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Prospect
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prospects..."
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

          <div className="grid gap-4">
            {filteredProspects.map((prospect) => (
              <Card key={prospect.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold">{prospect.firstName} {prospect.lastName}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-3 w-3" />
                            {prospect.title} at {prospect.company}
                          </div>
                        </div>
                        {getStatusBadge(prospect.status)}
                        {getEngagementBadge(prospect.engagementLevel)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Lead Score:</span>
                          <p className={`font-bold text-lg ${getLeadScoreColor(prospect.leadScore)}`}>
                            {prospect.leadScore}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Website Visits:</span>
                          <p className="font-medium">{prospect.behaviors.websiteVisits}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Page Views:</span>
                          <p className="font-medium">{prospect.behaviors.pageViews}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email Engagement:</span>
                          <p className="font-medium">{prospect.behaviors.emailOpens} opens, {prospect.behaviors.emailClicks} clicks</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Last Activity: {prospect.lastActivity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>Source: {prospect.source}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>Stage: {prospect.stage}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {prospect.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Customer Behavior Tab */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Customer Behavior Analytics</h2>
              <p className="text-muted-foreground">
                Track customer interactions, engagement patterns, and behavioral insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
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

          <div className="grid gap-6">
            {filteredBehaviorData.map((customer) => (
              <Card key={customer.customerId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{customer.customerName}</CardTitle>
                      <CardDescription>Customer ID: {customer.customerId}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-2" />
                        View Journey
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Engagement Metrics */}
                  <div>
                    <h4 className="font-medium mb-3">Engagement Score</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Mail className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-sm text-muted-foreground">Email</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Progress value={customer.engagementMetrics.emailEngagement} className="h-2 w-16 mr-2" />
                          <span className="text-sm font-medium">{customer.engagementMetrics.emailEngagement}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Globe className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-muted-foreground">Website</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Progress value={customer.engagementMetrics.websiteEngagement} className="h-2 w-16 mr-2" />
                          <span className="text-sm font-medium">{customer.engagementMetrics.websiteEngagement}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="h-4 w-4 text-purple-500 mr-2" />
                          <span className="text-sm text-muted-foreground">Social</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Progress value={customer.engagementMetrics.socialEngagement} className="h-2 w-16 mr-2" />
                          <span className="text-sm font-medium">{customer.engagementMetrics.socialEngagement}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Star className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm text-muted-foreground">Overall</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <Progress value={customer.engagementMetrics.overallScore} className="h-2 w-16 mr-2" />
                          <span className="text-sm font-medium">{customer.engagementMetrics.overallScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session Data */}
                  <div>
                    <h4 className="font-medium mb-3">Session Analytics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-lg">{customer.sessionData.totalSessions}</div>
                        <div className="text-muted-foreground">Total Sessions</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-lg">{customer.sessionData.avgSessionDuration}s</div>
                        <div className="text-muted-foreground">Avg Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-lg">{customer.sessionData.bounceRate}%</div>
                        <div className="text-muted-foreground">Bounce Rate</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-lg">{customer.sessionData.pagesPerSession}</div>
                        <div className="text-muted-foreground">Pages/Session</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Activities</h4>
                    <div className="space-y-3">
                      {customer.recentActivities.map((activity) => {
                        const Icon = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <div className="font-medium">
                                {activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {activity.page || activity.campaign || activity.product || activity.form}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{activity.timestamp}</div>
                              {activity.device && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {activity.device === 'mobile' ? (
                                    <Smartphone className="h-3 w-3" />
                                  ) : (
                                    <Monitor className="h-3 w-3" />
                                  )}
                                  {activity.device}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Automations Tab */}
        <TabsContent value="automations" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Behavioral Automations</h2>
              <p className="text-muted-foreground">
                Automated workflows triggered by customer behavior patterns
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search automations..."
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

          <div className="grid gap-4">
            {filteredAutomations.map((automation) => (
              <Card key={automation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Workflow className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold">{automation.name}</h3>
                        {getStatusBadge(automation.status)}
                        <Badge variant="outline">{automation.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{automation.description}</p>
                      
                      {/* Triggers & Conditions */}
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Behavioral Triggers:</div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {automation.triggers.map((trigger, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {trigger.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Conditions: </span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs">{automation.conditions}</code>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-2">Workflow Steps:</div>
                        <div className="space-y-2">
                          {automation.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm p-2 bg-gray-50 rounded">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                                {step.step}
                              </div>
                              <div className="flex-1">{step.action}</div>
                              <div className="text-muted-foreground">{step.delay}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Triggered:</span>
                          <p className="font-medium">{automation.performance.triggered.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completed:</span>
                          <p className="font-medium">{automation.performance.completed.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Converted:</span>
                          <p className="font-medium">{automation.performance.converted.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conversion Rate:</span>
                          <p className="font-medium text-green-600">{automation.performance.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        {automation.status === "active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}