"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  User, 
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Send,
  Zap,
  Star,
  TrendingUp,
  Users,
  FileText
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

interface JourneyTakeActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  journey: CustomerJourney;
}

const actionTypes = [
  {
    id: 'schedule_call',
    name: 'Schedule Call',
    description: 'Schedule a follow-up call with the customer',
    icon: Phone,
    category: 'communication'
  },
  {
    id: 'send_email',
    name: 'Send Email',
    description: 'Send a personalized email',
    icon: Mail,
    category: 'communication'
  },
  {
    id: 'send_message',
    name: 'Send Message',
    description: 'Send SMS or WhatsApp message',
    icon: MessageCircle,
    category: 'communication'
  },
  {
    id: 'schedule_demo',
    name: 'Schedule Demo',
    description: 'Book a product demonstration',
    icon: Calendar,
    category: 'engagement'
  },
  {
    id: 'create_task',
    name: 'Create Task',
    description: 'Create a follow-up task',
    icon: CheckCircle,
    category: 'workflow'
  },
  {
    id: 'send_proposal',
    name: 'Send Proposal',
    description: 'Send a customized proposal',
    icon: FileText,
    category: 'sales'
  }
];

const priorityLevels = [
  { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' }
];

const predefinedActions = [
  {
    stage: 'awareness',
    actions: [
      'Send welcome email with company overview',
      'Schedule introductory call',
      'Share relevant case studies',
      'Invite to upcoming webinar'
    ]
  },
  {
    stage: 'consideration',
    actions: [
      'Schedule product demonstration',
      'Send detailed pricing information',
      'Provide competitor comparison',
      'Connect with existing customers for references'
    ]
  },
  {
    stage: 'purchase',
    actions: [
      'Send customized proposal',
      'Schedule decision-maker meeting',
      'Offer limited-time discount',
      'Provide contract for review'
    ]
  },
  {
    stage: 'onboarding',
    actions: [
      'Schedule onboarding call',
      'Send setup instructions',
      'Assign dedicated success manager',
      'Provide training materials'
    ]
  },
  {
    stage: 'adoption',
    actions: [
      'Schedule usage review call',
      'Send feature adoption guide',
      'Offer additional training',
      'Check satisfaction survey'
    ]
  },
  {
    stage: 'expansion',
    actions: [
      'Present upgrade options',
      'Schedule expansion meeting',
      'Share advanced feature demos',
      'Provide ROI analysis'
    ]
  }
];

export const JourneyTakeActionModal: React.FC<JourneyTakeActionModalProps> = ({
  isOpen,
  onClose,
  journey
}) => {
  const [activeTab, setActiveTab] = useState("action");
  const [selectedActionType, setSelectedActionType] = useState('');
  const [actionDetails, setActionDetails] = useState({
    title: journey.nextBestAction.action,
    description: '',
    priority: journey.nextBestAction.priority,
    dueDate: '',
    assignedTo: '',
    notes: '',
    expectedOutcome: journey.nextBestAction.expectedOutcome
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentStageActions = predefinedActions.find(p => p.stage === journey.currentStage);

  const handleInputChange = (field: string, value: string) => {
    setActionDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePredefinedAction = (action: string) => {
    setActionDetails(prev => ({ ...prev, title: action }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Action submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Action Created!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your action has been created and assigned successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Take Action</h2>
              <p className="text-gray-600">{journey.customer.fullName} - {journey.currentStage}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="action">Action Details</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>

              <TabsContent value="action" className="space-y-6">
                {/* Customer Context */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current Stage:</span>
                        <p className="font-medium capitalize">{journey.currentStage}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Journey Score:</span>
                        <p className="font-medium">{Math.round(journey.journeyScore)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Days in Journey:</span>
                        <p className="font-medium">{journey.timeInJourney}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Value:</span>
                        <p className="font-medium">₹{journey.totalValue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Recommendation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Recommended Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-orange-900">{journey.nextBestAction.action}</h4>
                        <Badge className={
                          journey.nextBestAction.priority === 'high' ? 'bg-red-100 text-red-800' :
                          journey.nextBestAction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {journey.nextBestAction.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-orange-700">
                        Expected Outcome: {journey.nextBestAction.expectedOutcome}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Action Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Action Title *</Label>
                      <Input
                        id="title"
                        value={actionDetails.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter action title..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={actionDetails.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe the action in detail..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={actionDetails.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority..." />
                          </SelectTrigger>
                          <SelectContent>
                            {priorityLevels.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center gap-2">
                                  <Badge className={priority.color}>{priority.label}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={actionDetails.dueDate}
                          onChange={(e) => handleInputChange('dueDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select value={actionDetails.assignedTo} onValueChange={(value) => handleInputChange('assignedTo', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team member..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="me">Assign to me</SelectItem>
                          <SelectItem value="sales_team">Sales Team</SelectItem>
                          <SelectItem value="success_team">Customer Success Team</SelectItem>
                          <SelectItem value="support_team">Support Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedOutcome">Expected Outcome</Label>
                      <Textarea
                        id="expectedOutcome"
                        value={actionDetails.expectedOutcome}
                        onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
                        placeholder="What do you expect to achieve with this action?"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        value={actionDetails.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any additional notes or context..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suggestions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Stage-Specific Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentStageActions && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Recommended actions for {journey.currentStage} stage:
                        </h4>
                        <div className="space-y-2">
                          {currentStageActions.actions.map((action, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              onClick={() => handlePredefinedAction(action)}
                            >
                              <span className="text-sm">{action}</span>
                              <Button size="sm" variant="outline">
                                Use This
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Action Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {actionTypes.map((actionType) => {
                        const Icon = actionType.icon;
                        return (
                          <div
                            key={actionType.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                              selectedActionType === actionType.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedActionType(actionType.id)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="w-5 h-5 text-blue-600" />
                              <span className="font-medium">{actionType.name}</span>
                            </div>
                            <p className="text-sm text-gray-600">{actionType.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communication" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Customer Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{journey.customer.email}</span>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </Button>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{journey.customer.phone}</span>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Company:</span>
                          <span className="font-medium">{journey.customer.company?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Role:</span>
                          <span className="font-medium">{journey.customer.company?.designation}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Quick Communication Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="h-auto p-4 flex flex-col items-center gap-2">
                        <Phone className="w-6 h-6" />
                        <span>Schedule Call</span>
                      </Button>
                      <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                        <Mail className="w-6 h-6" />
                        <span>Send Email</span>
                      </Button>
                      <Button className="h-auto p-4 flex flex-col items-center gap-2" variant="outline">
                        <MessageCircle className="w-6 h-6" />
                        <span>Send Message</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !actionDetails.title.trim()}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Create Action
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};