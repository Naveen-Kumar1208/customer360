"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Star,
  Award,
  Download,
  Filter,
  PieChart,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface ViewAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ViewAnalyticsModal({ 
  isOpen, 
  onClose 
}: ViewAnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [viewType, setViewType] = useState('overview');

  const analyticsData = {
    totalLeads: 247,
    averageScore: 67,
    tierALeads: 43,
    tierBLeads: 89,
    tierCLeads: 78,
    tierDLeads: 37,
    conversionRate: 23.4,
    pipelineValue: 8750000,
    topPerformingTier: 'A',
    scoringAccuracy: 87,
    trendsImprovement: 12.5
  };

  const funnelDistribution = [
    { stage: 'TOFU', count: 128, percentage: 52 },
    { stage: 'MOFU', count: 76, percentage: 31 },
    { stage: 'BOFU', count: 43, percentage: 17 }
  ];

  const scoreRanges = [
    { range: '90-100', count: 43, color: 'bg-green-500' },
    { range: '80-89', count: 58, color: 'bg-blue-500' },
    { range: '70-79', count: 71, color: 'bg-yellow-500' },
    { range: '60-69', count: 45, color: 'bg-orange-500' },
    { range: 'Below 60', count: 30, color: 'bg-red-500' }
  ];

  const topFactors = [
    { factor: 'Company Size Match', impact: 92, trend: 'up' },
    { factor: 'Budget Confirmed', impact: 89, trend: 'up' },
    { factor: 'Decision Maker Contact', impact: 85, trend: 'stable' },
    { factor: 'Product Fit Score', impact: 82, trend: 'up' },
    { factor: 'Engagement Level', impact: 78, trend: 'down' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Lead Scoring Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                    <SelectItem value="last-6-months">Last 6 months</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">View Type</label>
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="trends">Trends</SelectItem>
                    <SelectItem value="factors">Key Factors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Scored Leads</p>
                  <p className="text-2xl font-bold text-blue-900">{analyticsData.totalLeads}</p>
                  <p className="text-xs text-blue-600">+15% this month</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Average Score</p>
                  <p className="text-2xl font-bold text-green-900">{analyticsData.averageScore}</p>
                  <p className="text-xs text-green-600">+5.2% improvement</p>
                </div>
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-900">{analyticsData.conversionRate}%</p>
                  <p className="text-xs text-purple-600">+2.1% this month</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Pipeline Value</p>
                  <p className="text-2xl font-bold text-orange-900">₹{(analyticsData.pipelineValue / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-orange-600">+8.3% growth</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Tier Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Lead Tier Distribution</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Tier A (High Priority)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{analyticsData.tierALeads}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({((analyticsData.tierALeads / analyticsData.totalLeads) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-sm">Tier B (Medium Priority)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{analyticsData.tierBLeads}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({((analyticsData.tierBLeads / analyticsData.totalLeads) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-sm">Tier C (Low Priority)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{analyticsData.tierCLeads}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({((analyticsData.tierCLeads / analyticsData.totalLeads) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">Tier D (Deprioritize)</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{analyticsData.tierDLeads}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({((analyticsData.tierDLeads / analyticsData.totalLeads) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Funnel Stage Distribution</h3>
              </div>
              <div className="space-y-4">
                {funnelDistribution.map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <span className="text-sm text-gray-600">{stage.count} leads</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stage.stage === 'TOFU' ? 'bg-blue-500' :
                          stage.stage === 'MOFU' ? 'bg-purple-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Score Range Distribution</h3>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {scoreRanges.map((range) => (
                <div key={range.range} className="text-center">
                  <div className={`${range.color} text-white p-4 rounded-lg mb-2`}>
                    <div className="text-2xl font-bold">{range.count}</div>
                  </div>
                  <div className="text-sm text-gray-600">{range.range}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Scoring Factors */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Top Scoring Factors</h3>
            </div>
            <div className="space-y-3">
              {topFactors.map((factor, index) => (
                <div key={factor.factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      #{index + 1}
                    </div>
                    <span className="font-medium">{factor.factor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-semibold">{factor.impact}%</div>
                      <div className="text-xs text-gray-500">Impact Score</div>
                    </div>
                    {factor.trend === 'up' && <ArrowUp className="h-4 w-4 text-green-600" />}
                    {factor.trend === 'down' && <ArrowDown className="h-4 w-4 text-red-600" />}
                    {factor.trend === 'stable' && <Activity className="h-4 w-4 text-gray-600" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Model Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analyticsData.scoringAccuracy}%</div>
                <div className="text-sm text-gray-600">Scoring Accuracy</div>
                <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{analyticsData.trendsImprovement}%</div>
                <div className="text-sm text-gray-600">Month-over-Month Improvement</div>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Growing</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">94%</div>
                <div className="text-sm text-gray-600">Prediction Confidence</div>
                <Badge className="mt-2 bg-purple-100 text-purple-800">High</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}