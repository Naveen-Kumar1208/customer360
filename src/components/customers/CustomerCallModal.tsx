"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Target,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  Mail,
  MapPin,
  X
} from 'lucide-react';
import type { Customer } from "@/types/customer";

interface CustomerCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

const callTypes = [
  {
    id: 'immediate',
    name: 'Call Now',
    description: 'Start an immediate call',
    icon: Phone
  },
  {
    id: 'scheduled',
    name: 'Schedule Call',
    description: 'Schedule a call for later',
    icon: Calendar
  },
  {
    id: 'follow_up',
    name: 'Follow-up Call',
    description: 'Follow up on previous interaction',
    icon: Target
  }
];

const callObjectives = [
  {
    id: 'onboarding',
    name: 'Customer Onboarding',
    description: 'Help customer get started with services',
    questions: [
      'How has your experience been so far?',
      'Do you need help setting up any features?',
      'What are your main goals with our service?',
      'Is there anything you\'re struggling with?'
    ]
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'Provide support and resolve issues',
    questions: [
      'What specific issue can I help you with?',
      'When did you first notice this problem?',
      'Have you tried any troubleshooting steps?',
      'How is this impacting your workflow?'
    ]
  },
  {
    id: 'upsell',
    name: 'Cross-sell/Upsell',
    description: 'Introduce additional products or services',
    questions: [
      'How are you finding our current service?',
      'What additional features would be valuable?',
      'Are there any gaps in your current setup?',
      'Would you be interested in learning about our premium features?'
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback Collection',
    description: 'Gather customer feedback and insights',
    questions: [
      'How would you rate your overall experience?',
      'What do you like most about our service?',
      'What areas do you think we could improve?',
      'Would you recommend us to others?'
    ]
  },
  {
    id: 'retention',
    name: 'Customer Retention',
    description: 'Address concerns and improve satisfaction',
    questions: [
      'Is there anything that\'s been concerning you?',
      'How can we better serve your needs?',
      'Are you satisfied with the value you\'re getting?',
      'What would make you more likely to continue with us?'
    ]
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

export const CustomerCallModal: React.FC<CustomerCallModalProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [callType, setCallType] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [objective, setObjective] = useState('');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStartTime, setCallStartTime] = useState<Date | null>(null);
  const [callOutcome, setCallOutcome] = useState('');

  const selectedObjective = callObjectives.find(obj => obj.id === objective);

  const handleStartCall = () => {
    setIsCallActive(true);
    setCallStartTime(new Date());
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    if (callStartTime) {
      const actualDuration = Math.floor((new Date().getTime() - callStartTime.getTime()) / 60000);
      setDuration(actualDuration);
    }
  };

  const handleCall = () => {
    const scheduledDateTime = scheduledDate && scheduledTime 
      ? `${scheduledDate}T${convertTo24Hour(scheduledTime)}:00` 
      : undefined;

    // Here you would typically make an API call to save the call information
    console.log({
      customerId: customer.id,
      type: callType,
      scheduledTime: scheduledDateTime,
      notes,
      objective,
      duration: callType === 'immediate' ? duration : undefined,
      outcome: callOutcome || undefined
    });

    // Reset form and close
    setCallType('');
    setScheduledDate('');
    setScheduledTime('');
    setObjective('');
    setNotes('');
    setDuration(30);
    setIsCallActive(false);
    setCallStartTime(null);
    setCallOutcome('');
    onClose();
  };

  const convertTo24Hour = (time12: string) => {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = String(Number.parseInt(hours, 10) + 12);
    }
    return `${hours}:${minutes}`;
  };

  const formatCallDuration = () => {
    if (!callStartTime) return '00:00';
    const now = new Date();
    const diff = Math.floor((now.getTime() - callStartTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'prospect': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'churned': return 'bg-red-100 text-red-700 border-red-200';
      case 'vip': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRecommendedObjective = () => {
    switch (customer.status.toLowerCase()) {
      case 'prospect': return 'onboarding';
      case 'active': return 'feedback';
      case 'inactive': return 'retention';
      case 'churned': return 'retention';
      case 'vip': return 'upsell';
      default: return 'support';
    }
  };

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
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Call Customer</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Customer Information</h3>
              <Badge className={getStatusColor(customer.status)}>
                {customer.status.toUpperCase()}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{customer.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{customer.company?.name || 'Individual'}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{customer.address.city}, {customer.address.state}</span>
              </div>
            </div>
          </div>

          {/* Call Type Selection */}
          <div className="space-y-3">
            <Label>Call Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {callTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                      callType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setCallType(type.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scheduled Call Options */}
          {callType === 'scheduled' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select value={scheduledTime} onValueChange={setScheduledTime}>
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

          {/* Immediate Call Controls */}
          {callType === 'immediate' && (
            <div className="p-4 bg-green-50 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Call Controls</span>
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
          )}

          {/* Call Objective */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Call Objective</Label>
              {!objective && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setObjective(getRecommendedObjective())}
                >
                  Use Recommended
                </Button>
              )}
            </div>
            <Select value={objective} onValueChange={setObjective}>
              <SelectTrigger>
                <SelectValue placeholder="Select call objective..." />
              </SelectTrigger>
              <SelectContent>
                {callObjectives.map((obj) => (
                  <SelectItem key={obj.id} value={obj.id}>
                    <div>
                      <div className="font-medium">{obj.name}</div>
                      <div className="text-xs text-gray-500">{obj.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Suggested Questions */}
          {selectedObjective && (
            <div className="p-4 bg-yellow-50 rounded-lg border">
              <h4 className="font-medium text-yellow-800 mb-2">Suggested Questions</h4>
              <ul className="space-y-1 text-sm text-yellow-700">
                {selectedObjective.questions.map((question, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Call Notes & Agenda</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter call notes, agenda items, or key points to discuss..."
              rows={6}
            />
          </div>

          {/* Call Outcome (for completed calls) */}
          {(callType === 'immediate' && !isCallActive && callStartTime) && (
            <div className="space-y-2">
              <Label htmlFor="outcome">Call Outcome</Label>
              <Select value={callOutcome} onValueChange={setCallOutcome}>
                <SelectTrigger>
                  <SelectValue placeholder="Select call outcome..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="connected">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Connected & Productive
                    </div>
                  </SelectItem>
                  <SelectItem value="voicemail">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      Left Voicemail
                    </div>
                  </SelectItem>
                  <SelectItem value="no_answer">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      No Answer
                    </div>
                  </SelectItem>
                  <SelectItem value="busy">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      Line Busy
                    </div>
                  </SelectItem>
                  <SelectItem value="callback">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      Requested Callback
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleCall}
              disabled={!callType || !objective || (callType === 'scheduled' && (!scheduledDate || !scheduledTime))}
              className="bg-green-600 hover:bg-green-700"
            >
              {callType === 'immediate' ? (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  {isCallActive ? 'Save Call Log' : 'Start Call'}
                </>
              ) : callType === 'scheduled' ? (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Log Follow-up
                </>
              )}
            </Button>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};