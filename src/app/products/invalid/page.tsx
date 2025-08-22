"use client";

import { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FunnelNavigation } from "@/components/products/FunnelNavigation";
import { InvalidLeadsTab } from "@/components/products/invalid/InvalidLeadsTab";
import { 
  XCircle, 
  AlertTriangle, 
  Mail, 
  Users, 
  TrendingDown, 
  CheckCircle, 
  RefreshCw,
  Database,
  Shield,
  Zap
} from "lucide-react";


export default function InvalidLeadsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Invalid leads metrics
  const invalidMetrics = {
    totalInvalid: 24,
    invalidToday: 8,
    validationRate: 78,
    cleanupRate: 92,
    issueTypes: {
      invalidEmail: 12,
      duplicates: 7,
      spam: 3,
      incompleteData: 2
    }
  };

  const validationReasons = [
    {
      category: "Invalid Email",
      count: 12,
      percentage: 50,
      examples: ["invalid@format", "fake@domain", "bounced@email.com"],
      severity: "high",
      color: "bg-red-100 text-red-800"
    },
    {
      category: "Duplicate Entries",
      count: 7,
      percentage: 29,
      examples: ["Same email multiple times", "Identical contact info", "Repeated submissions"],
      severity: "medium",
      color: "bg-orange-100 text-orange-800"
    },
    {
      category: "Spam/Bot",
      count: 3,
      percentage: 13,
      examples: ["Random text inputs", "Bot patterns", "Suspicious behavior"],
      severity: "high",
      color: "bg-red-100 text-red-800"
    },
    {
      category: "Incomplete Data",
      count: 2,
      percentage: 8,
      examples: ["Missing required fields", "Partial information", "Invalid phone numbers"],
      severity: "low",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const validationTools = [
    {
      name: "Email Verification",
      description: "Real-time email validation and verification",
      status: "active",
      processed: 156,
      successRate: 94
    },
    {
      name: "Duplicate Detection",
      description: "Identifies and merges duplicate lead entries",
      status: "active",
      processed: 89,
      successRate: 96
    },
    {
      name: "Spam Protection",
      description: "AI-powered spam and bot detection",
      status: "active",
      processed: 67,
      successRate: 88
    },
    {
      name: "Data Enrichment",
      description: "Enriches and validates lead data quality",
      status: "active",
      processed: 45,
      successRate: 82
    }
  ];

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <XCircle className="h-8 w-8 text-red-500 mr-3" />
                Invalid Leads Management
              </h1>
              <p className="text-muted-foreground">
                Identify, validate, and clean up invalid lead data
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Run Validation
              </Button>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Clean Data
              </Button>
            </div>
          </div>

          {/* Funnel Navigation */}
          <FunnelNavigation currentStage="invalid" />

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invalid</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{invalidMetrics.totalInvalid}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">+{invalidMetrics.invalidToday}</span> today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Validation Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{invalidMetrics.validationRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2.1%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cleanup Rate</CardTitle>
                <RefreshCw className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{invalidMetrics.cleanupRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-blue-500">+1.2%</span> improvement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Issue Types</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Main categories tracked
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Validation Reasons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Invalid Lead Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {validationReasons.map((reason, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                        {reason.category}
                      </h3>
                      <Badge className={reason.color}>
                        {reason.count} leads
                      </Badge>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Percentage of invalid leads</span>
                        <span>{reason.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${reason.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Examples:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {reason.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Validation Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Data Validation Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {validationTools.map((tool, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {tool.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Processed Today</p>
                        <p className="text-lg font-semibold">{tool.processed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                        <p className="text-lg font-semibold text-green-600">{tool.successRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Leads Database</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Invalid Leads Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                          <XCircle className="h-4 w-4 text-red-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium">5 invalid emails detected</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium">3 duplicate leads found</p>
                            <p className="text-xs text-muted-foreground">15 minutes ago</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium">12 leads validated successfully</p>
                            <p className="text-xs text-muted-foreground">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Validation Trends</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Invalid Email Rate</span>
                          <span className="text-sm font-semibold text-red-600">8.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Duplicate Rate</span>
                          <span className="text-sm font-semibold text-orange-600">4.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Spam Detection Rate</span>
                          <span className="text-sm font-semibold text-red-600">2.3%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Quality Score</span>
                          <span className="text-sm font-semibold text-green-600">87%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Quick Actions</h3>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <Zap className="h-4 w-4 mr-2" />
                          Run Full Validation
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Clean Duplicate Entries
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Verify Email Addresses
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Database className="h-4 w-4 mr-2" />
                          Export Invalid List
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leads">
              <InvalidLeadsTab />
            </TabsContent>
          </Tabs>
        </div>
      </StaticExportLayout>
    </>
  );
}