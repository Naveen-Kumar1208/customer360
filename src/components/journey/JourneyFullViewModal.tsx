"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Eye,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  X,
  MapPin,
  Activity,
  Star,
  TrendingUp,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Building2,
  Target,
  ThumbsUp,
  ThumbsDown,
  FileText,
  DollarSign
} from 'lucide-react';

interface CustomerJourney {
  id: string;
  customer: any;
  currentStage: string;
  journeyScore: number;
  totalValue: number;
  timeInJourney: number;
  stages: any[];
  milestones: any[];
  nextBestAction: any;
}

interface JourneyFullViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  journey: CustomerJourney;
}

export const JourneyFullViewModal: React.FC<JourneyFullViewModalProps> = ({
  isOpen,
  onClose,
  journey
}) => {
  const [activeTab, setActiveTab] = useState("timeline");
  const { customer, stages, milestones } = journey;

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentStageIndex = stages.findIndex(s => s.status === "in_progress");
  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{customer.fullName}</h2>
              <p className="text-gray-600">{customer.company?.designation} at {customer.company?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {journey.timeInJourney} days in journey
                </Badge>
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  {journey.currentStage}
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="stages">Stages</TabsTrigger>
                <TabsTrigger value="touchpoints">Touchpoints</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-6">
                {/* Journey Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Journey Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                      <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>

                    {/* Timeline View */}
                    <div className="space-y-6">
                      {stages.map((stage, index) => (
                        <div key={stage.id} className="relative flex items-start gap-4">
                          {/* Timeline Line */}
                          {index < stages.length - 1 && (
                            <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                          )}
                          
                          {/* Stage Icon */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                            {getStageIcon(stage.status)}
                          </div>
                          
                          {/* Stage Content */}
                          <div className="flex-1 bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{stage.name}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className={
                                  stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  stage.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }>
                                  {stage.status.replace('_', ' ')}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                  {stage.date.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{stage.description}</p>
                            
                            {/* Touchpoints */}
                            <div className="flex flex-wrap gap-2 mb-2">
                              {stage.touchpoints.map((touchpoint: string) => (
                                <Badge key={touchpoint} variant="outline" className="text-xs">
                                  {touchpoint}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Stage Metrics */}
                            <div className="flex items-center gap-4 text-sm">
                              {stage.duration && (
                                <span className="text-gray-600">
                                  Duration: {stage.duration} days
                                </span>
                              )}
                              {stage.value && (
                                <span className="font-semibold text-green-600">
                                  Value: {formatCurrency(stage.value)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stages" className="space-y-4">
                <div className="grid gap-4">
                  {stages.map((stage, index) => (
                    <Card key={stage.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{stage.name}</h3>
                              <p className="text-sm text-gray-600">{stage.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStageIcon(stage.status)}
                            <Badge className={
                              stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                              stage.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {stage.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Calendar className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">Start Date</p>
                            <p className="text-sm font-medium">{stage.date.toLocaleDateString()}</p>
                          </div>
                          {stage.duration && (
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <Clock className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                              <p className="text-xs text-gray-600">Duration</p>
                              <p className="text-sm font-medium text-purple-600">{stage.duration} days</p>
                            </div>
                          )}
                          {stage.value && (
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <DollarSign className="w-5 h-5 text-green-500 mx-auto mb-1" />
                              <p className="text-xs text-gray-600">Value Generated</p>
                              <p className="text-sm font-medium text-green-600">{formatCurrency(stage.value)}</p>
                            </div>
                          )}
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                            <p className="text-xs text-gray-600">Touchpoints</p>
                            <p className="text-sm font-medium text-blue-600">{stage.touchpoints.length}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="touchpoints" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Customer Touchpoints
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stages.map((stage) => (
                        <div key={stage.id} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-900 mb-2">{stage.name}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {stage.touchpoints.map((touchpoint: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <MessageCircle className="w-4 h-4 text-blue-600" />
                                <span className="text-sm">{touchpoint}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Key Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones.map((milestone) => (
                        <div key={milestone.id} className={`p-4 rounded-lg border-l-4 ${
                          milestone.type === 'positive' ? 'border-green-500 bg-green-50' :
                          milestone.type === 'negative' ? 'border-red-500 bg-red-50' :
                          'border-blue-500 bg-blue-50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getMilestoneIcon(milestone.type)}
                              <h4 className="font-medium">{milestone.name}</h4>
                            </div>
                            <span className="text-sm text-gray-500">
                              {milestone.date.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.company?.name}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Customer Since:</span>
                          <span className="font-medium">{customer.acquisitionDate?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge>{customer.status.toUpperCase()}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Segment:</span>
                          <Badge variant="outline">{customer.segment}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Journey Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Journey Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Journey Score</p>
                        <p className={`text-2xl font-bold ${getHealthScoreColor(journey.journeyScore)}`}>
                          {Math.round(journey.journeyScore)}
                        </p>
                        <Progress value={journey.journeyScore} className="h-2 mt-2" />
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Total Value</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(journey.totalValue)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Time in Journey</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {journey.timeInJourney}d
                        </p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {Math.round(progressPercentage)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Best Action */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Next Best Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-900">{journey.nextBestAction.action}</h4>
                        <Badge className={
                          journey.nextBestAction.priority === 'high' ? 'bg-red-100 text-red-800' :
                          journey.nextBestAction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {journey.nextBestAction.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Expected Outcome: {journey.nextBestAction.expectedOutcome}
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Target className="w-4 h-4 mr-2" />
                        Take Action
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Export Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};