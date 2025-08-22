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
  MessageCircle, 
  Phone, 
  Mail,
  User, 
  Building2, 
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  X,
  Send,
  PlayCircle,
  PauseCircle,
  Target,
  AlertCircle,
  Star
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

interface JourneyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  journey: CustomerJourney;
}

const contactMethods = [
  {
    id: 'phone',
    name: 'Phone Call',
    description: 'Direct phone conversation',
    icon: Phone,
    immediate: true
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Send an email message',
    icon: Mail,
    immediate: true
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Send text message',
    icon: MessageCircle,
    immediate: true
  },
  {
    id: 'meeting',
    name: 'Schedule Meeting',
    description: 'Book a meeting or demo',
    icon: Calendar,
    immediate: false
  }
];

const callObjectives = [
  {
    id: 'journey_check',
    name: 'Journey Progress Check',
    description: 'Review current stage and next steps',
    questions: [
      'How are you finding your experience so far?',
      'Are there any blockers preventing you from moving forward?',
      'What additional support do you need?',
      'Do you have any questions about the next steps?'
    ]
  },
  {
    id: 'stage_transition',
    name: 'Stage Transition Support',
    description: 'Help customer move to the next stage',
    questions: [
      'What information do you need to make a decision?',
      'Would you like to see a demonstration?',
      'Can I connect you with a specialist?',
      'What timeline are you working with?'
    ]
  },
  {
    id: 'relationship_building',
    name: 'Relationship Building',
    description: 'Strengthen customer relationship',
    questions: [
      'How can we better support your goals?',
      'What has been working well for you?',
      'Are there other stakeholders we should involve?',
      'What are your priorities for the coming months?'
    ]
  },
  {
    id: 'issue_resolution',
    name: 'Issue Resolution',
    description: 'Address any concerns or problems',
    questions: [
      'What specific challenges are you facing?',
      'When did you first notice this issue?',
      'How is this impacting your objectives?',
      'What would an ideal solution look like?'
    ]
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

export const JourneyContactModal: React.FC<JourneyContactModalProps> = ({
  isOpen,
  onClose,
  journey
}) => {
  const [activeTab, setActiveTab] = useState("method");
  const [selectedMethod, setSelectedMethod] = useState('');
  const [contactDetails, setContactDetails] = useState({
    subject: '',
    message: '',
    scheduledDate: '',
    scheduledTime: '',
    objective: '',
    priority: 'medium',
    notes: '',
    duration: 30
  });
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { customer } = journey;
  const selectedObjective = callObjectives.find(obj => obj.id === contactDetails.objective);

  const handleInputChange = (field: string, value: string) => {
    setContactDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallStartTime(new Date());
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    if (callStartTime) {
      const actualDuration = Math.floor((new Date().getTime() - callStartTime.getTime()) / 60000);
      setContactDetails(prev => ({ ...prev, duration: actualDuration }));
    }
  };

  const formatCallDuration = () => {
    if (!callStartTime) return '00:00';
    const now = new Date();
    const diff = Math.floor((now.getTime() - callStartTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
      console.error('Contact submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRecommendedObjective = () => {
    switch (journey.currentStage) {
      case 'awareness': return 'relationship_building';
      case 'consideration': return 'stage_transition';
      case 'purchase': return 'stage_transition';
      case 'onboarding': return 'journey_check';
      case 'adoption': return 'journey_check';
      case 'expansion': return 'stage_transition';
      default: return 'relationship_building';
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Initiated!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your contact attempt has been logged and scheduled successfully.
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Contact Customer</h2>
              <p className="text-gray-600">{customer.fullName} - {journey.currentStage}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="method">Contact Method</TabsTrigger>
                <TabsTrigger value="objective">Objective</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="method" className="space-y-6">
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
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.address.city}, {customer.address.state}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Journey Stage:</span>
                          <Badge className="capitalize">{journey.currentStage}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Journey Score:</span>
                          <span className="font-medium">{Math.round(journey.journeyScore)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Days in Journey:</span>
                          <span className="font-medium">{journey.timeInJourney}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Value:</span>
                          <span className="font-medium">₹{journey.totalValue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Method Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Select Contact Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contactMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <div
                            key={method.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                              selectedMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedMethod(method.id)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="w-6 h-6 text-blue-600" />
                              <span className="font-medium">{method.name}</span>
                              {method.immediate && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Immediate</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Immediate Call Controls */}
                {selectedMethod === 'phone' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Call Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-green-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-green-600" />
                            <span className="font-medium">Quick Call</span>
                          </div>
                          {isCallActive && (
                            <div className="flex items-center gap-2 text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="font-mono text-sm">{formatCallDuration()}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-3">
                          {!isCallActive ? (
                            <Button onClick={handleStartCall} className="bg-green-600 hover:bg-green-700">
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Start Call
                            </Button>
                          ) : (
                            <Button onClick={handleEndCall} variant="destructive">
                              <PauseCircle className="w-4 h-4 mr-2" />
                              End Call
                            </Button>
                          )}
                          <Button variant="outline" onClick={() => window.open(`tel:${customer.phone}`)}>
                            <Phone className="w-4 h-4 mr-2" />
                            Dial {customer.phone}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="objective" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Contact Objective
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Select Contact Objective</Label>
                      {!contactDetails.objective && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange('objective', getRecommendedObjective())}
                        >
                          Use Recommended
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4">
                      {callObjectives.map((objective) => (
                        <div
                          key={objective.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                            contactDetails.objective === objective.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => handleInputChange('objective', objective.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{objective.name}</h4>
                            {contactDetails.objective === objective.id && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{objective.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Questions */}
                {selectedObjective && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Suggested Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-4 bg-yellow-50 rounded-lg border">
                        <h4 className="font-medium text-yellow-800 mb-3">{selectedObjective.name}</h4>
                        <ul className="space-y-2 text-sm text-yellow-700">
                          {selectedObjective.questions.map((question, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Contact Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(selectedMethod === 'email' || selectedMethod === 'meeting') && (
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactDetails.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Enter subject..."
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">Message/Notes</Label>
                      <Textarea
                        id="message"
                        value={contactDetails.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Enter your message or call notes..."
                        rows={6}
                      />
                    </div>

                    {selectedMethod === 'meeting' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border">
                        <div className="space-y-2">
                          <Label htmlFor="scheduledDate">Date</Label>
                          <Input
                            id="scheduledDate"
                            type="date"
                            value={contactDetails.scheduledDate}
                            onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="scheduledTime">Time</Label>
                          <Select value={contactDetails.scheduledTime} onValueChange={(value) => handleInputChange('scheduledTime', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time..." />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={contactDetails.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Contact Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Contact Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Customer:</span>
                            <span className="ml-2 font-medium">{customer.fullName}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Method:</span>
                            <span className="ml-2 font-medium capitalize">{selectedMethod || 'Not selected'}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Objective:</span>
                            <span className="ml-2 font-medium">
                              {selectedObjective?.name || 'Not selected'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Priority:</span>
                            <Badge className={
                              contactDetails.priority === 'high' ? 'bg-red-100 text-red-800' :
                              contactDetails.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {contactDetails.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {contactDetails.subject && (
                        <div>
                          <h4 className="font-medium mb-1">Subject:</h4>
                          <p className="text-sm text-gray-700">{contactDetails.subject}</p>
                        </div>
                      )}

                      {contactDetails.message && (
                        <div>
                          <h4 className="font-medium mb-1">Message/Notes:</h4>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{contactDetails.message}</p>
                        </div>
                      )}

                      {selectedMethod === 'meeting' && contactDetails.scheduledDate && (
                        <div>
                          <h4 className="font-medium mb-1">Scheduled:</h4>
                          <p className="text-sm text-gray-700">
                            {contactDetails.scheduledDate} at {contactDetails.scheduledTime}
                          </p>
                        </div>
                      )}
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
                disabled={isSubmitting || !selectedMethod || !contactDetails.objective}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {selectedMethod === 'meeting' ? 'Schedule Contact' : 'Contact Now'}
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