"use client";

import React, { useState } from 'react';
import { ArrowLeft, Workflow, Database, Shield, Activity, Settings, CheckCircle, AlertTriangle, Clock, Users, TrendingUp, AlertCircle, Server, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProtectedDashboardLayout } from "@/components/layouts/ProtectedDashboardLayout";
import Link from "next/link";

export default function OperationsDashboardPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const operationsMetrics = {
    dataIntegrationHealth: 98.5,
    systemUptime: 99.97,
    securityCompliance: 100,
    activeConnectors: 47
  };

  const dataIntegrations = [
    {
      system: 'Salesforce CRM',
      status: 'active',
      health: 99,
      lastSync: '2 mins ago',
      company: 'TechFlow Solutions',
      version: 'Enterprise v58.0',
      dataVolume: '2.4M records',
      avgSyncTime: '45s',
      uptime: '99.8%',
      errors: 2,
      alerts: 0,
      apiCalls: '148,392/day',
      connector: 'Native API',
      description: 'Core CRM system handling customer data, opportunities, and sales pipeline management'
    },
    {
      system: 'HubSpot Marketing',
      status: 'active', 
      health: 97,
      lastSync: '5 mins ago',
      company: 'AI Dynamics',
      version: 'Professional v3.2',
      dataVolume: '890K contacts',
      avgSyncTime: '32s',
      uptime: '99.5%',
      errors: 5,
      alerts: 1,
      apiCalls: '89,247/day',
      connector: 'REST API v3',
      description: 'Marketing automation platform for lead nurturing, email campaigns, and customer journey tracking'
    },
    {
      system: 'Stripe Payments',
      status: 'active',
      health: 100,
      lastSync: '1 min ago',
      company: 'DataVault Inc',
      version: 'Standard v2023.1',
      dataVolume: '156K transactions',
      avgSyncTime: '28s',
      uptime: '100%',
      errors: 0,
      alerts: 0,
      apiCalls: '67,543/day',
      connector: 'Webhooks + API',
      description: 'Payment processing system for subscription billing, invoicing, and financial reporting'
    },
    {
      system: 'Zendesk Support',
      status: 'warning',
      health: 85,
      lastSync: '15 mins ago',
      company: 'CloudScale Pro',
      version: 'Professional v6.8',
      dataVolume: '45K tickets',
      avgSyncTime: '67s',
      uptime: '98.2%',
      errors: 12,
      alerts: 3,
      apiCalls: '23,891/day',
      connector: 'API v2',
      description: 'Customer support ticketing system for issue tracking, resolution, and customer satisfaction metrics'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedDashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/investor/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Workflow className="w-8 h-8 text-blue-600" />
                Portfolio Operations Center
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive operational oversight with automated data collection, governance tracking, and 24/7 system monitoring</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium">
                System Health
              </button>
              <button className="px-4 py-2 text-sm bg-green-50 text-green-600 hover:bg-green-100 rounded-lg font-medium">
                Export Logs
              </button>
            </div>
          </div>
        </div>

        {/* Operations Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Database className="w-8 h-8 text-blue-500" />
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Data Integration</p>
                <p className="text-2xl font-bold text-gray-900">{operationsMetrics.dataIntegrationHealth}%</p>
                <p className="text-sm text-green-600 mt-1">All systems operational</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-green-600">{operationsMetrics.systemUptime}%</p>
                <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Security Compliance</p>
                <p className="text-2xl font-bold text-purple-600">{operationsMetrics.securityCompliance}%</p>
                <p className="text-sm text-purple-600 mt-1">SOC 2 Certified</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Settings className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Connectors</p>
                <p className="text-2xl font-bold text-orange-600">{operationsMetrics.activeConnectors}</p>
                <p className="text-sm text-gray-500 mt-1">Real-time sync</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Integration Status */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Data Integration Status
            </CardTitle>
            <p className="text-sm text-gray-500">Real-time monitoring of all portfolio company data connections</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataIntegrations.map((integration, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{integration.system}</h4>
                      <p className="text-gray-600">{integration.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(integration.status)}>{integration.status}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{integration.lastSync}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Health Score</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${integration.health >= 95 ? 'bg-green-500' : integration.health >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${integration.health}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-semibold ${integration.health >= 95 ? 'text-green-600' : integration.health >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {integration.health}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        {integration.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="text-sm font-medium capitalize">{integration.status}</span>
                      </div>
                    </div>
                    <div>
                      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
                        <DialogTrigger asChild>
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                            onClick={() => setSelectedIntegration(integration)}
                          >
                            View Details
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[90vw] md:max-w-[900px] max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Database className="w-5 h-5 text-blue-600" />
                              Integration Details: {selectedIntegration?.system}
                            </DialogTitle>
                            <DialogDescription>
                              Comprehensive operational monitoring and performance analytics for {selectedIntegration?.company}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedIntegration && (
                            <div className="space-y-6">
                              {/* System Overview */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">Health Score</p>
                                  <p className={`text-2xl font-bold ${selectedIntegration.health >= 95 ? 'text-green-600' : selectedIntegration.health >= 85 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {selectedIntegration.health}%
                                  </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">Status</p>
                                  <Badge className={getStatusColor(selectedIntegration.status)}>
                                    {selectedIntegration.status}
                                  </Badge>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">Uptime</p>
                                  <p className="text-lg font-semibold text-green-600">{selectedIntegration.uptime}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                  <p className="text-sm text-gray-600">Last Sync</p>
                                  <p className="text-lg font-semibold text-blue-600">{selectedIntegration.lastSync}</p>
                                </div>
                              </div>

                              {/* Detailed Analytics */}
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="performance">Performance</TabsTrigger>
                                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="overview" className="space-y-4">
                                  <Card className="border-0 bg-gray-50">
                                    <CardContent className="p-6">
                                      <h4 className="font-semibold text-gray-900 mb-3">System Information</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Version</span>
                                            <span className="font-medium">{selectedIntegration.version}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Connector Type</span>
                                            <span className="font-medium">{selectedIntegration.connector}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Company</span>
                                            <span className="font-medium">{selectedIntegration.company}</span>
                                          </div>
                                        </div>
                                        <div className="space-y-3">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Data Volume</span>
                                            <span className="font-medium">{selectedIntegration.dataVolume}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">API Calls/Day</span>
                                            <span className="font-medium">{selectedIntegration.apiCalls}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Avg Sync Time</span>
                                            <span className="font-medium">{selectedIntegration.avgSyncTime}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-700">{selectedIntegration.description}</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </TabsContent>
                                
                                <TabsContent value="performance" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-0 bg-gray-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                          <TrendingUp className="w-4 h-4 text-green-500" />
                                          Performance Metrics
                                        </h4>
                                        <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <Server className="w-4 h-4 text-blue-500" />
                                              <span className="text-sm text-gray-600">System Uptime</span>
                                            </div>
                                            <span className="font-semibold text-green-600">{selectedIntegration.uptime}</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <Clock className="w-4 h-4 text-purple-500" />
                                              <span className="text-sm text-gray-600">Avg Response Time</span>
                                            </div>
                                            <span className="font-semibold text-blue-600">{selectedIntegration.avgSyncTime}</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <Zap className="w-4 h-4 text-yellow-500" />
                                              <span className="text-sm text-gray-600">Throughput</span>
                                            </div>
                                            <span className="font-semibold text-orange-600">{selectedIntegration.apiCalls}</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                              <Database className="w-4 h-4 text-indigo-500" />
                                              <span className="text-sm text-gray-600">Data Processing</span>
                                            </div>
                                            <span className="font-semibold text-indigo-600">{selectedIntegration.dataVolume}</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card className="border-0 bg-gray-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                          <Activity className="w-4 h-4 text-blue-500" />
                                          Health Indicators
                                        </h4>
                                        <div className="space-y-4">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Overall Health</span>
                                            <div className="flex items-center gap-2">
                                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div 
                                                  className={`h-2 rounded-full ${selectedIntegration.health >= 95 ? 'bg-green-500' : selectedIntegration.health >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                  style={{ width: `${selectedIntegration.health}%` }}
                                                ></div>
                                              </div>
                                              <span className="font-semibold text-gray-700">{selectedIntegration.health}%</span>
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Connection Status</span>
                                            <div className="flex items-center gap-2">
                                              <div className={`w-2 h-2 rounded-full ${selectedIntegration.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                              <span className="font-semibold capitalize">{selectedIntegration.status}</span>
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">Data Freshness</span>
                                            <span className="font-semibold text-blue-600">{selectedIntegration.lastSync}</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="monitoring" className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card className="border-0 bg-red-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                                          <AlertTriangle className="w-4 h-4 text-red-600" />
                                          Error Monitoring
                                        </h4>
                                        <div className="space-y-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-red-700">Total Errors (24h)</span>
                                            <Badge className="bg-red-100 text-red-800">{selectedIntegration.errors}</Badge>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-red-700">Critical Alerts</span>
                                            <Badge className="bg-red-100 text-red-800">{selectedIntegration.alerts}</Badge>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-red-700">Error Rate</span>
                                            <span className="font-semibold text-red-600">
                                              {((selectedIntegration.errors / 1000) * 100).toFixed(2)}%
                                            </span>
                                          </div>
                                          {selectedIntegration.errors > 0 && (
                                            <div className="mt-4 p-3 bg-red-100 rounded-lg">
                                              <p className="text-xs text-red-800">
                                                Recent errors: API rate limits (67%), timeout issues (23%), data validation (10%)
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card className="border-0 bg-blue-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                          <Users className="w-4 h-4 text-blue-600" />
                                          Usage Analytics
                                        </h4>
                                        <div className="space-y-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-blue-700">Active Users</span>
                                            <span className="font-semibold text-blue-600">
                                              {selectedIntegration.system.includes('Salesforce') ? '247' :
                                               selectedIntegration.system.includes('HubSpot') ? '89' :
                                               selectedIntegration.system.includes('Stripe') ? '34' : '156'}
                                            </span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-blue-700">Peak Usage Hours</span>
                                            <span className="font-semibold text-blue-600">9AM-5PM EST</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-blue-700">Data Sync Frequency</span>
                                            <span className="font-semibold text-blue-600">Real-time</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>
                                
                                <TabsContent value="maintenance" className="space-y-4">
                                  <div className="space-y-6">
                                    <Card className="border-0 bg-green-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4 text-green-600" />
                                          Recent Maintenance Activities
                                        </h4>
                                        <div className="space-y-3">
                                          <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <div>
                                              <p className="font-medium text-green-800">System Update Completed</p>
                                              <p className="text-sm text-green-600">Updated to {selectedIntegration.version} - 2 days ago</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div>
                                              <p className="font-medium text-blue-800">Security Patch Applied</p>
                                              <p className="text-sm text-blue-600">Enhanced data encryption protocols - 1 week ago</p>
                                            </div>
                                          </div>
                                          <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                            <div>
                                              <p className="font-medium text-purple-800">Performance Optimization</p>
                                              <p className="text-sm text-purple-600">Improved sync speed by 23% - 2 weeks ago</p>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>

                                    <Card className="border-0 bg-yellow-50">
                                      <CardContent className="p-6">
                                        <h4 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                                          <Clock className="w-4 h-4 text-yellow-600" />
                                          Scheduled Maintenance
                                        </h4>
                                        <div className="space-y-3">
                                          <div className="p-3 bg-yellow-100 rounded-lg">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <p className="font-medium text-yellow-800">Planned System Update</p>
                                                <p className="text-sm text-yellow-600">
                                                  Scheduled for next weekend (2-hour window)
                                                </p>
                                              </div>
                                              <Badge className="bg-yellow-200 text-yellow-800">Upcoming</Badge>
                                            </div>
                                          </div>
                                          <div className="p-3 bg-blue-100 rounded-lg">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <p className="font-medium text-blue-800">Database Optimization</p>
                                                <p className="text-sm text-blue-600">
                                                  Quarterly performance tuning scheduled
                                                </p>
                                              </div>
                                              <Badge className="bg-blue-200 text-blue-800">Monthly</Badge>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </div>
                          )}

                          <DialogFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>
                              Close
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline">
                                Export Report
                              </Button>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                Configure Settings
                              </Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MarTech & Operations Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                MarTech Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">CRM Systems</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">5/5 Connected</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Marketing Automation</span>
                  </div>
                  <span className="text-sm text-blue-600 font-medium">Real-time Sync</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Revenue Operations</span>
                  </div>
                  <span className="text-sm text-purple-600 font-medium">Optimized</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Enterprise Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SOC 2 Type II Compliance</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-600">Certified</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Data Encryption</span>
                  <span className="font-semibold text-gray-900">AES-256</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Access Controls</span>
                  <span className="font-semibold text-blue-600">Role-based</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Audit Logging</span>
                  <span className="font-semibold text-green-600">24/7 Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operations Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Operations Excellence Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">System Health</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Uptime</span>
                  <span className="font-semibold text-green-600">99.97%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Accuracy</span>
                  <span className="font-semibold text-blue-600">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Speed</span>
                  <span className="font-semibold text-purple-600">1.2s avg</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Automation</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Automated Reports</span>
                  <span className="font-semibold text-green-600">5 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Success</span>
                  <span className="font-semibold text-blue-600">99.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Manual Intervention</span>
                  <span className="font-semibold text-gray-600">0.2%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Compliance</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Governance Score</span>
                  <span className="font-semibold text-purple-600">95.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Events</span>
                  <span className="font-semibold text-orange-600">3 this week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Audit Readiness</span>
                  <Badge className="bg-green-100 text-green-800">Ready</Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Integration</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Connectors</span>
                  <span className="font-semibold text-blue-600">47/50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sync Health</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Freshness</span>
                  <span className="font-semibold text-gray-600">&lt; 5 min</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedDashboardLayout>
  );
}