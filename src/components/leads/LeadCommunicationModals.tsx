"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  Calendar,
  User,
  Clock,
  MapPin,
  Video,
  Users,
  Link,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  location?: string;
  value: number;
  source: string;
  stage: string;
  score: number;
  tags: string[];
  notes?: string;
  createdAt: Date;
  lastActivity: Date;
}

interface LeadCommunicationModalsProps {
  lead: Lead | null;
  modalType: 'call' | 'email' | 'meet' | null;
  onClose: () => void;
  onAction: (lead: Lead, action: string, data: any) => void;
}

export function LeadCommunicationModals({
  lead,
  modalType,
  onClose,
  onAction
}: LeadCommunicationModalsProps) {
  const [callData, setCallData] = useState({
    type: 'immediate',
    purpose: 'follow-up',
    notes: '',
    scheduledTime: '',
    duration: '30'
  });
  
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    template: 'custom',
    priority: 'normal',
    sendTime: 'now'
  });

  const [meetData, setMeetData] = useState({
    title: '',
    type: 'video',
    duration: '30',
    scheduledTime: '',
    location: '',
    agenda: '',
    inviteOthers: false,
    additionalAttendees: ''
  });

  // Store the active element when modal opens for focus restoration
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (modalType && lead) {
      // Store the currently focused element
      activeElementRef.current = document.activeElement as HTMLElement;
    }
  }, [modalType, lead]);

  const handleClose = () => {
    onClose();
    // Restore focus to the previously active element after a brief delay
    setTimeout(() => {
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      } else {
        // Fallback: focus the body to ensure cursor works
        document.body.focus();
      }
    }, 100);
  };

  useEffect(() => {
    if (lead && modalType === 'call') {
      setCallData({
        type: 'immediate',
        purpose: 'follow-up',
        notes: `Call with ${lead.name} from ${lead.company}`,
        scheduledTime: '',
        duration: '30'
      });
    }
    if (lead && modalType === 'email') {
      setEmailData({
        subject: `Following up - ${lead.company}`,
        message: `Hi ${lead.name},\n\nI hope this email finds you well. I wanted to follow up on our previous conversation about ${lead.company}.\n\nWould you be available for a quick call this week to discuss how we can help you achieve your goals?\n\nBest regards,`,
        template: 'custom',
        priority: 'normal',
        sendTime: 'now'
      });
    }
    if (lead && modalType === 'meet') {
      setMeetData({
        title: `Meeting with ${lead.name} - ${lead.company}`,
        type: 'video',
        duration: '30',
        scheduledTime: '',
        location: '',
        agenda: `Discussion about ${lead.company} requirements and potential solutions.`,
        inviteOthers: false,
        additionalAttendees: ''
      });
    }
  }, [lead, modalType]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'tofu': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mofu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bofu': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageName = (stage: string) => {
    switch (stage) {
      case 'tofu': return 'TOFU - Awareness';
      case 'mofu': return 'MOFU - Consideration';
      case 'bofu': return 'BOFU - Decision';
      default: return stage.toUpperCase();
    }
  };

  const handleCallAction = () => {
    if (lead) {
      onAction(lead, 'call', callData);
    }
    handleClose();
  };

  const handleEmailAction = () => {
    if (lead) {
      onAction(lead, 'email', emailData);
    }
    handleClose();
  };

  const handleMeetAction = () => {
    if (lead) {
      onAction(lead, 'meet', meetData);
    }
    handleClose();
  };

  if (!lead) return null;

  // Call Modal
  if (modalType === 'call') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>{lead.name} ({lead.company})</span>
              <Badge className={getStageColor(lead.stage)}>
                {getStageName(lead.stage)}
              </Badge>
              <span className="ml-auto font-medium">{lead.phone || 'No phone number'}</span>
            </div>

            {/* Call Type */}
            <div>
              <Label>Call Type</Label>
              <Select value={callData.type} onValueChange={(value) => setCallData({...callData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </div>
                  </SelectItem>
                  <SelectItem value="scheduled">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Call
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scheduled Time (if scheduling) */}
            {callData.type === 'scheduled' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduled-time">Schedule For</Label>
                  <Input
                    id="scheduled-time"
                    type="datetime-local"
                    value={callData.scheduledTime}
                    onChange={(e) => setCallData({...callData, scheduledTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Select value={callData.duration} onValueChange={(value) => setCallData({...callData, duration: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Call Purpose */}
            <div>
              <Label>Call Purpose</Label>
              <Select value={callData.purpose} onValueChange={(value) => setCallData({...callData, purpose: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="discovery">Discovery Call</SelectItem>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closing">Closing Call</SelectItem>
                  <SelectItem value="check-in">Check-in</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Call Notes */}
            <div>
              <Label htmlFor="call-notes">Call Notes</Label>
              <Textarea
                id="call-notes"
                value={callData.notes}
                onChange={(e) => setCallData({...callData, notes: e.target.value})}
                placeholder="Add any notes about the call purpose, agenda, or key points to discuss..."
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCallAction} disabled={!lead.phone}>
                <Phone className="h-4 w-4 mr-2" />
                {callData.type === 'immediate' ? 'Start Call' : 'Schedule Call'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Email Modal
  if (modalType === 'email') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <Mail className="h-4 w-4" />
              <span>To: {lead.email}</span>
              <Badge className={getStageColor(lead.stage)}>
                {getStageName(lead.stage)}
              </Badge>
            </div>

            {/* Email Template */}
            <div>
              <Label>Email Template</Label>
              <Select 
                value={emailData.template} 
                onValueChange={(value) => {
                  setEmailData({...emailData, template: value});
                  // Update message based on template
                  if (value === 'introduction') {
                    setEmailData(prev => ({
                      ...prev,
                      subject: `Introduction - ${lead.company}`,
                      message: `Hi ${lead.name},\n\nI hope this email finds you well. My name is [Your Name] and I work with companies like ${lead.company} to help them [your value proposition].\n\nI'd love to learn more about your challenges and see if we can help. Would you be open to a brief 15-minute call?\n\nBest regards,`
                    }));
                  } else if (value === 'follow-up') {
                    setEmailData(prev => ({
                      ...prev,
                      subject: `Following up - ${lead.company}`,
                      message: `Hi ${lead.name},\n\nI wanted to follow up on our previous conversation about ${lead.company}.\n\nDo you have any questions about what we discussed? I'm here to help with any additional information you might need.\n\nBest regards,`
                    }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="demo-invite">Demo Invitation</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="thank-you">Thank You</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject and Priority */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={emailData.priority} onValueChange={(value) => setEmailData({...emailData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailData.message}
                onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                rows={8}
              />
            </div>

            {/* Send Time */}
            <div>
              <Label>Send Time</Label>
              <Select value={emailData.sendTime} onValueChange={(value) => setEmailData({...emailData, sendTime: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Send Now</SelectItem>
                  <SelectItem value="schedule">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEmailAction} disabled={!lead.email}>
                <Mail className="h-4 w-4 mr-2" />
                {emailData.sendTime === 'now' ? 'Send Email' : 'Schedule Email'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Meet Modal
  if (modalType === 'meet') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Meeting with {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>{lead.name} ({lead.company})</span>
              <Badge className={getStageColor(lead.stage)}>
                {getStageName(lead.stage)}
              </Badge>
            </div>

            {/* Meeting Title */}
            <div>
              <Label htmlFor="meeting-title">Meeting Title</Label>
              <Input
                id="meeting-title"
                value={meetData.title}
                onChange={(e) => setMeetData({...meetData, title: e.target.value})}
              />
            </div>

            {/* Meeting Type and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Meeting Type</Label>
                <Select value={meetData.type} onValueChange={(value) => setMeetData({...meetData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video Call
                      </div>
                    </SelectItem>
                    <SelectItem value="phone">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Call
                      </div>
                    </SelectItem>
                    <SelectItem value="in-person">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        In Person
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Duration</Label>
                <Select value={meetData.duration} onValueChange={(value) => setMeetData({...meetData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scheduled Time */}
            <div>
              <Label htmlFor="scheduled-time">Schedule For</Label>
              <Input
                id="scheduled-time"
                type="datetime-local"
                value={meetData.scheduledTime}
                onChange={(e) => setMeetData({...meetData, scheduledTime: e.target.value})}
              />
            </div>

            {/* Location (for in-person or additional info) */}
            {meetData.type === 'in-person' && (
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={meetData.location}
                  onChange={(e) => setMeetData({...meetData, location: e.target.value})}
                  placeholder="Meeting location or address"
                />
              </div>
            )}

            {/* Agenda */}
            <div>
              <Label htmlFor="agenda">Meeting Agenda</Label>
              <Textarea
                id="agenda"
                value={meetData.agenda}
                onChange={(e) => setMeetData({...meetData, agenda: e.target.value})}
                rows={3}
                placeholder="Outline what will be discussed in the meeting..."
              />
            </div>

            {/* Additional Attendees */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="invite-others"
                  checked={meetData.inviteOthers}
                  onChange={(e) => setMeetData({...meetData, inviteOthers: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="invite-others">Invite additional attendees</Label>
              </div>
              
              {meetData.inviteOthers && (
                <div>
                  <Label htmlFor="additional-attendees">Additional Attendees (email addresses)</Label>
                  <Textarea
                    id="additional-attendees"
                    value={meetData.additionalAttendees}
                    onChange={(e) => setMeetData({...meetData, additionalAttendees: e.target.value})}
                    placeholder="Enter email addresses separated by commas"
                    rows={2}
                  />
                </div>
              )}
            </div>

            {/* Meeting Link Preview */}
            {meetData.type === 'video' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 text-blue-800">
                  <Link className="h-4 w-4" />
                  <span className="text-sm font-medium">Video meeting link will be generated automatically</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button 
                onClick={handleMeetAction} 
                disabled={!meetData.scheduledTime || !meetData.title}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}