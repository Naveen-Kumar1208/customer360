"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  Shield,
  MessageSquare,
  BarChart3,
  Settings
} from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TestReport {
  runId: string;
  startTime: string;
  endTime: string;
  totalDuration: number;
  overallSummary: {
    totalTests: number;
    totalPassed: number;
    totalFailed: number;
    overallPassRate: number;
    suiteCount: number;
  };
  suiteResults: Array<{
    suiteName: string;
    summary: {
      total: number;
      passed: number;
      failed: number;
      passRate: number;
    };
    results: Array<{
      testName: string;
      passed: boolean;
      error?: string;
      timestamp: string;
    }>;
    duration: number;
  }>;
  recommendations: string[];
}

type TestSuite = 'all' | 'functional' | 'webhook' | 'security' | 'analytics' | 'critical';

interface TestConfiguration {
  includeFunctional: boolean;
  includeWebhook: boolean;
  includeSecurity: boolean;
  includeAnalytics: boolean;
  verbose: boolean;
}

export default function WhatsAppTestDashboard() {
  const router = useRouter();
  
  // States
  const [isRunning, setIsRunning] = useState(false);
  const [testReport, setTestReport] = useState<TestReport | null>(null);
  const [selectedSuite, setSelectedSuite] = useState<TestSuite>('all');
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState<TestConfiguration>({
    includeFunctional: true,
    includeWebhook: true,
    includeSecurity: true,
    includeAnalytics: true,
    verbose: false
  });
  const [progress, setProgress] = useState(0);
  
  // Run tests
  const runTests = async (suite: TestSuite = selectedSuite) => {
    setIsRunning(true);
    setProgress(0);
    setTestReport(null);
    
    try {
      let url = '/api/test-whatsapp';
      let method = 'GET';
      let body = null;
      
      if (suite === 'all') {
        // Use POST with configuration
        method = 'POST';
        body = JSON.stringify(config);
        url += '?verbose=' + config.verbose;
      } else {
        url += `?suite=${suite}&verbose=${config.verbose}`;
      }
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 90));
      }, 500);
      
      const response = await fetch(url, {
        method,
        headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {},
        ...(body && { body })
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Test execution failed');
      }
      
      setTestReport(data.report);
      
    } catch (error) {
      console.error('Test execution failed:', error);
      alert(`Test execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };
  
  // Download report
  const downloadReport = async (format: 'json' | 'csv' = 'json') => {
    if (!testReport) return;
    
    try {
      let url = `/api/test-whatsapp?format=${format}`;
      if (selectedSuite !== 'all') {
        url += `&suite=${selectedSuite}`;
      }
      
      const response = await fetch(url);
      
      if (format === 'csv') {
        const csvData = await response.text();
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `whatsapp-test-report-${testReport.runId}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data.report, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `whatsapp-test-report-${testReport.runId}.json`;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download report');
    }
  };
  
  const getSuiteIcon = (suiteName: string) => {
    switch (suiteName.toLowerCase()) {
      case 'functional tests': return <MessageSquare className="w-4 h-4" />;
      case 'webhook tests': return <RefreshCw className="w-4 h-4" />;
      case 'security tests': return <Shield className="w-4 h-4" />;
      case 'analytics tests': return <BarChart3 className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };
  
  const getStatusIcon = (passRate: number) => {
    if (passRate === 100) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (passRate >= 70) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <XCircle className="w-4 h-4 text-red-600" />;
  };
  
  return (
    <StaticExportLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold">WhatsApp Test Dashboard</h1>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setSelectedSuite('functional'); runTests('functional'); }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold">Functional Tests</p>
                  <p className="text-xs text-gray-600">Campaign & messaging</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setSelectedSuite('security'); runTests('security'); }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-red-600" />
                <div>
                  <p className="font-semibold">Security Tests</p>
                  <p className="text-xs text-gray-600">Auth & permissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setSelectedSuite('analytics'); runTests('analytics'); }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-semibold">Analytics Tests</p>
                  <p className="text-xs text-gray-600">Reporting & metrics</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setSelectedSuite('critical'); runTests('critical'); }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="font-semibold">Critical Only</p>
                  <p className="text-xs text-gray-600">Essential tests</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Suite Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <select
                  value={selectedSuite}
                  onChange={(e) => setSelectedSuite(e.target.value as TestSuite)}
                  className="px-3 py-2 border rounded-md"
                  disabled={isRunning}
                >
                  <option value="all">All Tests</option>
                  <option value="functional">Functional Tests</option>
                  <option value="webhook">Webhook Tests</option>
                  <option value="security">Security Tests</option>
                  <option value="analytics">Analytics Tests</option>
                  <option value="critical">Critical Tests Only</option>
                </select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfig(true)}
                  disabled={isRunning}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                {testReport && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadReport('json')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      JSON
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadReport('csv')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                  </>
                )}
                
                <Button
                  onClick={() => runTests()}
                  disabled={isRunning}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Tests
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Running {selectedSuite === 'all' ? 'all test suites' : `${selectedSuite} tests`}...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Test Results */}
        {testReport && (
          <>
            {/* Summary */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Test Results Summary
                  <Badge variant="outline" className="ml-auto">
                    {testReport.runId}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{testReport.overallSummary.totalTests}</p>
                    <p className="text-sm text-gray-600">Total Tests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{testReport.overallSummary.totalPassed}</p>
                    <p className="text-sm text-gray-600">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{testReport.overallSummary.totalFailed}</p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{testReport.overallSummary.overallPassRate}%</p>
                    <p className="text-sm text-gray-600">Pass Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{(testReport.totalDuration / 1000).toFixed(1)}s</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
                
                <Progress value={testReport.overallSummary.overallPassRate} className="mb-4" />
                
                {testReport.recommendations.length > 0 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Recommendations:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {testReport.recommendations.map((rec, index) => (
                        <li key={index}>• {rec.replace(/^[🚨⚠️✅🔒📨📊⏱️💡]\s*/, '')}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Suite Results */}
            <div className="grid gap-4">
              {testReport.suiteResults.map((suite, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getSuiteIcon(suite.suiteName)}
                      {suite.suiteName}
                      <div className="ml-auto flex items-center gap-2">
                        {getStatusIcon(suite.summary.passRate)}
                        <Badge variant={suite.summary.passRate === 100 ? 'default' : suite.summary.passRate >= 70 ? 'secondary' : 'destructive'}>
                          {suite.summary.passed}/{suite.summary.total} ({suite.summary.passRate}%)
                        </Badge>
                        <Badge variant="outline">
                          {suite.duration}ms
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {suite.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className={result.passed ? 'text-gray-800' : 'text-red-800'}>
                              {result.testName}
                            </span>
                          </div>
                          {result.error && (
                            <span className="text-xs text-red-600 max-w-md truncate" title={result.error}>
                              {result.error}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
        
        {/* Configuration Dialog */}
        <Dialog open={showConfig} onOpenChange={setShowConfig}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Test Configuration</DialogTitle>
              <DialogDescription>
                Configure which test suites to run and execution options
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.includeFunctional}
                    onChange={(e) => setConfig({...config, includeFunctional: e.target.checked})}
                  />
                  <MessageSquare className="w-4 h-4" />
                  <span>Functional Tests</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.includeWebhook}
                    onChange={(e) => setConfig({...config, includeWebhook: e.target.checked})}
                  />
                  <RefreshCw className="w-4 h-4" />
                  <span>Webhook Tests</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.includeSecurity}
                    onChange={(e) => setConfig({...config, includeSecurity: e.target.checked})}
                  />
                  <Shield className="w-4 h-4" />
                  <span>Security Tests</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.includeAnalytics}
                    onChange={(e) => setConfig({...config, includeAnalytics: e.target.checked})}
                  />
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics Tests</span>
                </label>
              </div>
              
              <div className="border-t pt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.verbose}
                    onChange={(e) => setConfig({...config, verbose: e.target.checked})}
                  />
                  <span>Verbose output (show detailed errors)</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowConfig(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowConfig(false)}>
                  Save Configuration
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </StaticExportLayout>
  );
}