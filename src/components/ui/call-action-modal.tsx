"use client";

import type React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  PauseCircle
} from 'lucide-react';

interface CallActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  leadPhone: string;
  leadCompany: string;
  leadStage: string;
  onCall: (callData: {
    type: string;
    scheduledTime?: string;
    notes: string;
    objective: string;
    duration?: number;
    outcome?: string;
  }) => void;
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
    id: 'discovery',
    name: 'Discovery Call',
    description: 'Learn about their needs and challenges',
    questions: [
      'What are your current challenges with [relevant area]?',
      'What solutions are you currently using?',
      'What would success look like for your team?',
      'What\'s your timeline for making a decision?'
    ]
  },
  {
    id: 'demo',
    name: 'Product Demo',
    description: 'Showcase product features and benefits',
    questions: [
      'Which features would be most valuable to your team?',
      'How would this integrate with your current workflow?',
      'What questions do you have about implementation?',
      'Would you like to see any specific use cases?'
    ]
  },
  {
    id: 'qualification',
    name: 'Lead Qualification',
    description: 'Qualify lead readiness and budget',
    questions: [
      'What\'s your budget range for this type of solution?',
      'Who else would be involved in the decision process?',
      'What\'s your expected timeline for implementation?',
      'What are your key success metrics?'
    ]
  },
  {
    id: 'closing',
    name: 'Closing Call',
    description: 'Address final objections and close the deal',
    questions: [
      'Do you have any remaining concerns or questions?',
      'Are there any final approvals needed on your end?',
      'When would you like to get started?',
      'What would make this a definitive yes for you?'
    ]
  },
  {
    id: 'relationship',
    name: 'Relationship Building',
    description: 'Build rapport and trust with the lead',
    questions: [
      'How has your experience been with similar solutions?',
      'What\'s most important to you in a vendor relationship?',
      'How can we best support your team\'s success?',
      'What concerns do you have about working with us?'
    ]
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
];

export const CallActionModal: React.FC<CallActionModalProps> = ({
  isOpen,
  onClose,
  leadName,
  leadPhone,
  leadCompany,
  leadStage,
  onCall
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

    onCall({
      type: callType,
      scheduledTime: scheduledDateTime,
      notes,
      objective,
      duration: callType === 'immediate' ? duration : undefined,
      outcome: callOutcome || undefined
    });

    // Reset form
    setCallType('');
    setScheduledDate('');
    setScheduledTime('');
    setObjective('');
    setNotes('');
    setDuration(30);
    setIsCallActive(false);
    setCallStartTime(null);
    setCallOutcome('');
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

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'tofu': return 'bg-green-100 text-green-700 border-green-200';
      case 'mofu': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'bofu': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRecommendedObjective = () => {
    switch (leadStage.toLowerCase()) {
      case 'tofu': return 'discovery';
      case 'mofu': return 'demo';
      case 'bofu': return 'closing';
      default: return 'discovery';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-600" />
            Call Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Information */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Lead Information</h3>
              <Badge className={getStageColor(leadStage)}>
                {leadStage.toUpperCase()}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{leadName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{leadPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{leadCompany}</span>
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
                <Button variant="outline" onClick={() => window.open(`tel:${leadPhone}`)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Dial {leadPhone}
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
      </DialogContent>
    </Dialog>
  );
};