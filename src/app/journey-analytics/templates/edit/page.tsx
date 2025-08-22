"use client";

import React, { useState, useEffect, Suspense } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Save,
  Play,
  Eye,
  Plus,
  Trash2,
  Copy,
  Edit,
  Move,
  Settings,
  Clock,
  Users,
  Target,
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
  Monitor,
  Phone,
  Zap,
  GitBranch,
  BarChart3,
  Filter,
  Database
} from "lucide-react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  type: "trigger" | "action" | "condition" | "delay";
  position: { x: number; y: number };
  triggerType?: "event" | "time" | "condition";
  actionType?: "email" | "sms" | "push" | "webhook" | "update_segment";
  config: any;
  connections: string[];
}

function EditTemplatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('id');

  const [templateData, setTemplateData] = useState({
    id: templateId || 'JT-001',
    name: "E-commerce Welcome Journey",
    description: "Welcome new customers and guide them through their first purchase",
    category: "onboarding",
    industry: "Retail",
    complexity: "beginner",
    estimatedDuration: "7 days",
    tags: ["email", "sms", "push", "ecommerce"],
    isActive: true,
    version: "1.2"
  });

  const [stages, setStages] = useState<JourneyStage[]>([
    {
      id: "start",
      name: "Journey Start",
      description: "New customer signs up",
      type: "trigger",
      position: { x: 100, y: 100 },
      triggerType: "event",
      config: {
        event: "user_signup",
        conditions: []
      },
      connections: ["welcome-email"]
    },
    {
      id: "welcome-email",
      name: "Welcome Email",
      description: "Send welcome email to new customers",
      type: "action",
      position: { x: 300, y: 100 },
      actionType: "email",
      config: {
        template: "welcome-template",
        subject: "Welcome to our store!",
        delay: 0
      },
      connections: ["delay-1"]
    }
  ]);

  const handleSave = () => {
    console.log("Saving template:", { templateData, stages });
    alert("Template saved successfully!");
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/journey-analytics/templates">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Template</h1>
                <p className="text-muted-foreground">
                  Customize the "{templateData.name}" template
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Template Configuration */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="stages">Journey Stages</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Information</CardTitle>
                      <CardDescription>Basic details about this journey template</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Template Name</Label>
                          <Input
                            id="name"
                            value={templateData.name}
                            onChange={(e) => setTemplateData({...templateData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={templateData.category} onValueChange={(value) => setTemplateData({...templateData, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="onboarding">Onboarding</SelectItem>
                              <SelectItem value="engagement">Engagement</SelectItem>
                              <SelectItem value="conversion">Conversion</SelectItem>
                              <SelectItem value="retention">Retention</SelectItem>
                              <SelectItem value="support">Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={templateData.description}
                          onChange={(e) => setTemplateData({...templateData, description: e.target.value})}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="industry">Industry</Label>
                          <Select value={templateData.industry} onValueChange={(value) => setTemplateData({...templateData, industry: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Retail">Retail</SelectItem>
                              <SelectItem value="Software">Software</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Financial">Financial</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="complexity">Complexity</Label>
                          <Select value={templateData.complexity} onValueChange={(value) => setTemplateData({...templateData, complexity: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            value={templateData.estimatedDuration}
                            onChange={(e) => setTemplateData({...templateData, estimatedDuration: e.target.value})}
                            placeholder="e.g., 7 days"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Journey Stages Tab */}
                <TabsContent value="stages" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Journey Stages</CardTitle>
                      <CardDescription>Configure the steps in your customer journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {stages.map((stage, index) => (
                          <div key={stage.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                                </div>
                                <div>
                                  <div className="font-medium">{stage.name}</div>
                                  <div className="text-sm text-muted-foreground">{stage.description}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{stage.type}</Badge>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Stage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Automation Tab */}
                <TabsContent value="automation" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automation Rules</CardTitle>
                      <CardDescription>Configure automated behaviors and triggers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center py-8 text-muted-foreground">
                          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Automation configuration will be available in the next update.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Settings</CardTitle>
                      <CardDescription>Configure template behavior and permissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Active Template</div>
                          <div className="text-sm text-muted-foreground">Enable this template for use</div>
                        </div>
                        <Switch checked={templateData.isActive} onCheckedChange={(checked) => setTemplateData({...templateData, isActive: checked})} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Template Tags</Label>
                        <div className="flex flex-wrap gap-2">
                          {templateData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                              <button className="ml-1 text-xs">×</button>
                            </Badge>
                          ))}
                          <Button variant="outline" size="sm">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Tag
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Template Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Template Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Version</span>
                    <span className="text-sm font-medium">{templateData.version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Modified</span>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Test Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
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

export default function EditTemplatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditTemplatePageContent />
    </Suspense>
  );
}