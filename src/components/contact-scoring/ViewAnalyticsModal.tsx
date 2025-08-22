"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Star,
  Award,
  Target,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  LineChart,
  Activity
} from "lucide-react";

interface ContactScore {
  id: string;
  name: string;
  company: string;
  email: string;
  overallScore: number;
  demographicScore: number;
  behavioralScore: number;
  engagementScore: number;
  intentScore: number;
  tier: "A" | "B" | "C" | "D";
  lastUpdated: Date;
  potentialValue: number;
  conversionProbability: number;
  factors: {
    positive: string[];
    negative: string[];
  };
}

interface ViewAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: ContactScore[];
}

export function ViewAnalyticsModal({ isOpen, onClose, contacts }: ViewAnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const [viewType, setViewType] = useState("overview");

  // Analytics calculations
  const avgScore = contacts.reduce((sum, contact) => sum + contact.overallScore, 0) / contacts.length;
  const tierCounts = {
    A: contacts.filter(c => c.tier === 'A').length,
    B: contacts.filter(c => c.tier === 'B').length,
    C: contacts.filter(c => c.tier === 'C').length,
    D: contacts.filter(c => c.tier === 'D').length,
  };
  const totalPotentialValue = contacts.reduce((sum, contact) => sum + contact.potentialValue, 0);
  const avgConversionProb = contacts.reduce((sum, contact) => sum + contact.conversionProbability, 0) / contacts.length;

  // Score distribution
  const scoreRanges = {
    excellent: contacts.filter(c => c.overallScore >= 90).length,
    good: contacts.filter(c => c.overallScore >= 70 && c.overallScore < 90).length,
    average: contacts.filter(c => c.overallScore >= 50 && c.overallScore < 70).length,
    poor: contacts.filter(c => c.overallScore < 50).length,
  };

  // Top performing contacts
  const topContacts = [...contacts]
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 5);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Contact Scoring Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="trends">Trends</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                    <p className="text-2xl font-bold">{contacts.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>
                      {avgScore.toFixed(0)}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{(totalPotentialValue / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {avgConversionProb.toFixed(0)}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tier Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Tier Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTierColor('A')}>Tier A</Badge>
                      <span className="text-sm text-gray-600">High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(tierCounts.A / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{tierCounts.A}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTierColor('B')}>Tier B</Badge>
                      <span className="text-sm text-gray-600">Medium Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(tierCounts.B / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{tierCounts.B}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTierColor('C')}>Tier C</Badge>
                      <span className="text-sm text-gray-600">Low Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(tierCounts.C / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{tierCounts.C}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTierColor('D')}>Tier D</Badge>
                      <span className="text-sm text-gray-600">Low Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(tierCounts.D / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{tierCounts.D}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Score Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">Excellent (90-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(scoreRanges.excellent / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{scoreRanges.excellent}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm">Good (70-89)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(scoreRanges.good / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{scoreRanges.good}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="text-sm">Average (50-69)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(scoreRanges.average / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{scoreRanges.average}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm">Poor (0-49)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <Progress value={(scoreRanges.poor / contacts.length) * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">{scoreRanges.poor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Performing Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topContacts.map((contact, index) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getTierColor(contact.tier)}>{contact.tier}</Badge>
                      <div className={`text-lg font-bold ${getScoreColor(contact.overallScore)}`}>
                        {contact.overallScore}
                      </div>
                      <div className="text-sm text-gray-600">
                        ₹{(contact.potentialValue / 100000).toFixed(1)}L
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Positive Trend</span>
                  </div>
                  <p className="text-sm text-green-700">
                    {tierCounts.A} contacts in Tier A represent {((tierCounts.A / contacts.length) * 100).toFixed(0)}% 
                    of your pipeline with high conversion potential.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Opportunity</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {tierCounts.B + tierCounts.C} contacts could be improved to higher tiers 
                    with targeted engagement strategies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}