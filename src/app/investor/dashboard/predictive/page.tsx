"use client";

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar, Legend } from 'recharts';
import { ArrowLeft, Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Activity, Zap, Clock } from 'lucide-react';
import { ProtectedDashboardLayout } from "@/components/layouts/ProtectedDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const PredictiveIntelligencePage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3m');
  const [actionPlanOpen, setActionPlanOpen] = useState(false);
  const [opportunityOpen, setOpportunityOpen] = useState(false);
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // AI-powered predictive data
  const predictiveMetrics = {
    overallRiskScore: 23, // Low risk
    growthProbability: 87,
    interventionAlerts: 2,
    opportunitySignals: 4,
    modelAccuracy: 94.2
  };

  // Early warning signals
  const earlyWarnings = [
    {
      company: 'CloudScale Pro',
      signal: 'Customer Churn Risk',
      severity: 'High',
      probability: 78,
      impact: '$450K',
      timeline: '30 days',
      actionable: true,
      trend: 'increasing'
    },
    {
      company: 'SecureNet Labs',
      signal: 'Revenue Decline',
      severity: 'Critical',
      probability: 92,
      impact: '$1.2M',
      timeline: '14 days',
      actionable: true,
      trend: 'accelerating'
    }
  ];

  // Growth opportunities
  const growthOpportunities = [
    {
      company: 'AI Dynamics',
      opportunity: 'Market Expansion',
      confidence: 91,
      potential: '$2.8M',
      timeline: '6 months',
      investment: '$500K',
      roi: '460%'
    },
    {
      company: 'TechFlow Solutions',
      opportunity: 'Product Upsell',
      confidence: 83,
      potential: '$1.4M',
      timeline: '3 months',
      investment: '$200K',
      roi: '600%'
    },
    {
      company: 'DataVault Inc',
      opportunity: 'Strategic Partnership',
      confidence: 76,
      potential: '$950K',
      timeline: '4 months',
      investment: '$150K',
      roi: '533%'
    }
  ];

  // Predictive model performance
  const modelPerformance = [
    { month: 'Jan', accuracy: 89, predictions: 45, correct: 40 },
    { month: 'Feb', accuracy: 92, predictions: 52, correct: 48 },
    { month: 'Mar', accuracy: 94, predictions: 48, correct: 45 },
    { month: 'Apr', accuracy: 91, predictions: 58, correct: 53 },
    { month: 'May', accuracy: 95, predictions: 41, correct: 39 },
    { month: 'Jun', accuracy: 94, predictions: 49, correct: 46 }
  ];

  // Risk assessment trends
  const riskTrends = [
    { week: 'W1', market: 25, operational: 15, financial: 10, overall: 18 },
    { week: 'W2', market: 28, operational: 18, financial: 12, overall: 21 },
    { week: 'W3', market: 24, operational: 16, financial: 14, overall: 19 },
    { week: 'W4', market: 22, operational: 14, financial: 11, overall: 17 },
    { week: 'W5', market: 26, operational: 19, financial: 15, overall: 22 },
    { week: 'W6', market: 23, operational: 17, financial: 13, overall: 19 }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedDashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Back Navigation */}
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
                <Brain className="w-8 h-8 text-purple-600" />
                Predictive Intelligence Center
              </h1>
              <p className="text-gray-600 mt-2">AI-powered early warning system with automated anomaly detection and growth opportunity identification</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg font-medium">
                Model Details
              </button>
              <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium">
                Export Analysis
              </button>
            </div>
          </div>
        </div>

        {/* AI Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Model Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{predictiveMetrics.modelAccuracy}%</p>
                <p className="text-sm text-green-600 mt-1">+2.1% this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Risk Score</p>
                <p className="text-2xl font-bold text-red-600">{predictiveMetrics.overallRiskScore}</p>
                <p className="text-sm text-green-600 mt-1">Low Risk</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Growth Probability</p>
                <p className="text-2xl font-bold text-green-600">{predictiveMetrics.growthProbability}%</p>
                <p className="text-sm text-gray-500 mt-1">Next 6 months</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{predictiveMetrics.interventionAlerts}</p>
                <p className="text-sm text-red-600 mt-1">Require action</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Opportunities</p>
                <p className="text-2xl font-bold text-blue-600">{predictiveMetrics.opportunitySignals}</p>
                <p className="text-sm text-blue-600 mt-1">High confidence</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Early Warning Signals */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Early Warning Signals
            </CardTitle>
            <p className="text-sm text-gray-500">AI-detected risk patterns requiring immediate attention</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earlyWarnings.map((warning, index) => (
                <div key={index} className="p-6 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{warning.company}</h4>
                      <p className="text-red-700 font-medium">{warning.signal}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(warning.severity)}>{warning.severity}</Badge>
                      <p className="text-sm text-gray-600 mt-1">{warning.timeline} timeline</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">Probability</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${warning.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-red-600">{warning.probability}%</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Potential Impact</span>
                      <p className="font-semibold text-red-700">{warning.impact}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Trend</span>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-600 capitalize">{warning.trend}</span>
                      </div>
                    </div>
                    <div>
                      <Dialog open={actionPlanOpen} onOpenChange={setActionPlanOpen}>
                        <DialogTrigger asChild>
                          <button 
                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
                            onClick={() => setSelectedWarning(warning)}
                          >
                            Create Action Plan
                          </button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Opportunities */}
        <Card className="border-0 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              AI-Identified Growth Opportunities
            </CardTitle>
            <p className="text-sm text-gray-500">High-confidence investment and expansion opportunities</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {growthOpportunities.map((opportunity, index) => (
                <div key={index} className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 text-lg">{opportunity.company}</h4>
                    <p className="text-green-700 font-medium">{opportunity.opportunity}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Confidence Level</span>
                      <Badge className="bg-green-100 text-green-800">{opportunity.confidence}%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Revenue Potential</span>
                      <span className="font-semibold text-green-700">{opportunity.potential}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Investment Required</span>
                      <span className="font-semibold text-gray-900">{opportunity.investment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projected ROI</span>
                      <span className="font-semibold text-purple-600">{opportunity.roi}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Timeline</span>
                      <span className="font-medium text-gray-700">{opportunity.timeline}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <Dialog open={opportunityOpen} onOpenChange={setOpportunityOpen}>
                      <DialogTrigger asChild>
                        <button 
                          className="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                          onClick={() => setSelectedOpportunity(opportunity)}
                        >
                          Evaluate Opportunity
                        </button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Model Performance Tracking</CardTitle>
              <p className="text-sm text-gray-500">Prediction accuracy and reliability over time</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={modelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'accuracy' ? `${value}%` : value,
                      name === 'accuracy' ? 'Accuracy' : name === 'predictions' ? 'Total Predictions' : 'Correct Predictions'
                    ]}
                    contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }} />
                  <Bar dataKey="predictions" fill="#E5E7EB" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Risk Assessment Trends</CardTitle>
              <p className="text-sm text-gray-500">Multi-factor risk analysis over recent weeks</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="market" stackId="1" stroke="#EF4444" fill="#FEE2E2" />
                  <Area type="monotone" dataKey="operational" stackId="1" stroke="#F59E0B" fill="#FEF3C7" />
                  <Area type="monotone" dataKey="financial" stackId="1" stroke="#8B5CF6" fill="#EDE9FE" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Summary */}
        <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              AI-Generated Investment Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Risk Mitigation</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Critical Actions Needed</span>
                  <span className="font-semibold text-red-600">2 Companies</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Intervention Timeline</span>
                  <span className="font-semibold text-orange-600">14-30 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prevention Success Rate</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Growth Acceleration</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">High-Confidence Opportunities</span>
                  <span className="font-semibold text-green-600">4 Identified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Potential Value</span>
                  <span className="font-semibold text-purple-600">$5.15M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average ROI Projection</span>
                  <span className="font-semibold text-blue-600">531%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 border-b pb-2">Portfolio Health</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Risk Level</span>
                  <Badge className="bg-green-100 text-green-800">Low</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Confidence</span>
                  <Badge className="bg-blue-100 text-blue-800">High</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Review</span>
                  <span className="font-semibold text-gray-600">48 Hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Action Plan Modal */}
        <Dialog open={actionPlanOpen} onOpenChange={setActionPlanOpen}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Create Action Plan
              </DialogTitle>
              <DialogDescription>
                {selectedWarning && (
                  <>Create a comprehensive action plan for <strong>{selectedWarning.company}</strong> to address the <strong>{selectedWarning.signal}</strong> risk.</>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedWarning && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Risk Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-red-600">Signal:</span>
                      <p className="font-medium text-red-800">{selectedWarning.signal}</p>
                    </div>
                    <div>
                      <span className="text-red-600">Probability:</span>
                      <p className="font-medium text-red-800">{selectedWarning.probability}%</p>
                    </div>
                    <div>
                      <span className="text-red-600">Impact:</span>
                      <p className="font-medium text-red-800">{selectedWarning.impact}</p>
                    </div>
                    <div>
                      <span className="text-red-600">Timeline:</span>
                      <p className="font-medium text-red-800">{selectedWarning.timeline}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="action-title">Action Plan Title</Label>
                  <Input 
                    id="action-title" 
                    placeholder="e.g., Customer Retention Recovery Plan"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - Immediate Action</SelectItem>
                      <SelectItem value="high">High - Within 1 Week</SelectItem>
                      <SelectItem value="medium">Medium - Within 2 Weeks</SelectItem>
                      <SelectItem value="low">Low - Within 1 Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="assigned-to">Assign to Team</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO - Strategic Oversight</SelectItem>
                      <SelectItem value="cmo">CMO - Marketing & Growth</SelectItem>
                      <SelectItem value="cfo">CFO - Financial Analysis</SelectItem>
                      <SelectItem value="board">Board Member - Governance</SelectItem>
                      <SelectItem value="consultant">External Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="action-steps">Action Steps</Label>
                  <Textarea 
                    id="action-steps"
                    placeholder="1. Analyze customer churn patterns&#10;2. Interview departing customers&#10;3. Implement retention strategy&#10;4. Monitor progress weekly"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budget">Budget Allocation</Label>
                    <Input 
                      id="budget" 
                      placeholder="e.g., $50,000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Target Completion</Label>
                    <Input 
                      id="timeline" 
                      type="date"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="success-metrics">Success Metrics</Label>
                  <Textarea 
                    id="success-metrics"
                    placeholder="Define measurable outcomes (e.g., Reduce churn rate by 15%, Increase NPS by 20 points)"
                    rows={2}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setActionPlanOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Create Action Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Evaluate Opportunity Modal */}
        <Dialog open={opportunityOpen} onOpenChange={setOpportunityOpen}>
          <DialogContent className="sm:max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Evaluate Investment Opportunity
              </DialogTitle>
              <DialogDescription>
                {selectedOpportunity && (
                  <>Comprehensive evaluation of the <strong>{selectedOpportunity.opportunity}</strong> opportunity for <strong>{selectedOpportunity.company}</strong></>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedOpportunity && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Opportunity Summary</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-green-600">Confidence Level:</span>
                      <p className="font-medium text-green-800">{selectedOpportunity.confidence}%</p>
                    </div>
                    <div>
                      <span className="text-green-600">Potential Value:</span>
                      <p className="font-medium text-green-800">{selectedOpportunity.potential}</p>
                    </div>
                    <div>
                      <span className="text-green-600">Projected ROI:</span>
                      <p className="font-medium text-green-800">{selectedOpportunity.roi}</p>
                    </div>
                    <div>
                      <span className="text-green-600">Investment:</span>
                      <p className="font-medium text-green-800">{selectedOpportunity.investment}</p>
                    </div>
                    <div>
                      <span className="text-green-600">Timeline:</span>
                      <p className="font-medium text-green-800">{selectedOpportunity.timeline}</p>
                    </div>
                    <div>
                      <span className="text-green-600">Risk Level:</span>
                      <p className="font-medium text-green-800">Medium</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="eval-title">Evaluation Title</Label>
                  <Input 
                    id="eval-title" 
                    placeholder="e.g., Market Expansion Feasibility Assessment"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investment-stage">Investment Stage</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seed">Seed Round</SelectItem>
                        <SelectItem value="series-a">Series A</SelectItem>
                        <SelectItem value="series-b">Series B</SelectItem>
                        <SelectItem value="growth">Growth Capital</SelectItem>
                        <SelectItem value="bridge">Bridge Financing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="evaluation-type">Evaluation Type</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follow-on">Follow-on Investment</SelectItem>
                        <SelectItem value="strategic">Strategic Initiative</SelectItem>
                        <SelectItem value="expansion">Market Expansion</SelectItem>
                        <SelectItem value="acquisition">Acquisition Target</SelectItem>
                        <SelectItem value="partnership">Strategic Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="market-analysis">Market Analysis</Label>
                  <Textarea 
                    id="market-analysis"
                    placeholder="Analyze market size, competition, and growth potential..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="risk-assessment">Risk Assessment</Label>
                  <Textarea 
                    id="risk-assessment"
                    placeholder="Identify potential risks: market, execution, competitive, financial..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="investment-amount">Investment Amount</Label>
                    <Input 
                      id="investment-amount" 
                      placeholder="e.g., $500,000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="equity-stake">Equity Stake</Label>
                    <Input 
                      id="equity-stake" 
                      placeholder="e.g., 15%"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="valuation">Pre-money Valuation</Label>
                    <Input 
                      id="valuation" 
                      placeholder="e.g., $3.2M"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="due-diligence">Due Diligence Requirements</Label>
                  <Textarea 
                    id="due-diligence"
                    placeholder="Financial audit, legal review, technical assessment, market validation..."
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="recommendation">Investment Recommendation</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select recommendation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strong-buy">Strong Buy - Proceed Immediately</SelectItem>
                      <SelectItem value="buy">Buy - Recommend Investment</SelectItem>
                      <SelectItem value="hold">Hold - Monitor and Re-evaluate</SelectItem>
                      <SelectItem value="pass">Pass - Decline Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setOpportunityOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Complete Evaluation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedDashboardLayout>
  );
};

export default PredictiveIntelligencePage;