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
  ArrowRight,
  User,
  Clock,
  CheckCircle,
  Target,
  Star,
  Building2
} from "lucide-react";

interface TOFULead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "new" | "contacted" | "interested" | "nurturing" | "qualified";
  score: number;
  createdAt: Date;
  lastActivity: Date;
  interests: string[];
  location: string;
  jobTitle: string;
  companySize: string;
  industry: string;
}

interface TofuLeadCommunicationModalsProps {
  lead: TOFULead | null;
  modalType: 'call' | 'email' | 'qualify' | null;
  onClose: () => void;
  onAction: (lead: TOFULead, action: string, data: any) => void;
}

export function TofuLeadCommunicationModals({
  lead,
  modalType,
  onClose,
  onAction
}: TofuLeadCommunicationModalsProps) {
  const [callData, setCallData] = useState({
    type: 'immediate',
    purpose: 'discovery',
    notes: '',
    scheduledTime: '',
    duration: '30'
  });
  
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    template: 'introduction',
    priority: 'normal',
    sendTime: 'now'
  });

  const [qualifyData, setQualifyData] = useState({
    budget: '',
    authority: '',
    need: '',
    timeline: '',
    score: 0,
    qualificationReason: '',
    nextSteps: '',
    notes: ''
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
        purpose: 'discovery',
        notes: `Discovery call with ${lead.name} from ${lead.company} to understand their ${lead.industry} needs.`,
        scheduledTime: '',
        duration: '30'
      });
    }
    if (lead && modalType === 'email') {
      setEmailData({
        subject: `Introduction - ${lead.company} & Our Solutions`,
        message: `Hi ${lead.name},\n\nI hope this email finds you well. I came across ${lead.company} and was impressed by your work in the ${lead.industry} industry.\n\nBased on your interests in ${lead.interests.slice(0, 2).join(', ')}, I believe we could help you achieve significant improvements in efficiency and results.\n\nWould you be open to a brief 15-minute call to explore how we can support ${lead.company}'s goals?\n\nBest regards,`,
        template: 'introduction',
        priority: 'normal',
        sendTime: 'now'
      });
    }
    if (lead && modalType === 'qualify') {
      setQualifyData({
        budget: '',
        authority: '',
        need: '',
        timeline: '',
        score: lead.score,
        qualificationReason: '',
        nextSteps: '',
        notes: `TOFU lead qualification for ${lead.name} from ${lead.company}.`
      });
    }
  }, [lead, modalType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interested': return 'bg-green-100 text-green-800 border-green-200';
      case 'nurturing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'qualified': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleQualifyAction = () => {
    if (lead) {
      onAction(lead, 'qualify', qualifyData);
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
              <span>{lead.name} • {lead.jobTitle} at {lead.company}</span>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <span className="ml-auto font-medium">{lead.phone}</span>
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
                      <Clock className="h-4 w-4" />
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
                  <SelectItem value="discovery">Discovery Call</SelectItem>
                  <SelectItem value="introduction">Introduction</SelectItem>
                  <SelectItem value="qualification">Lead Qualification</SelectItem>
                  <SelectItem value="demo">Initial Demo</SelectItem>
                  <SelectItem value="follow-up">Follow Up</SelectItem>
                  <SelectItem value="nurturing">Nurturing Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Interest-based talking points */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Talking Points Based on Interests</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {lead.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Call Notes */}
            <div>
              <Label htmlFor="call-notes">Call Notes & Agenda</Label>
              <Textarea
                id="call-notes"
                value={callData.notes}
                onChange={(e) => setCallData({...callData, notes: e.target.value})}
                placeholder="Key points to discuss, questions to ask, agenda items..."
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <div className="ml-auto flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{lead.company} • {lead.industry}</span>
              </div>
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
                      subject: `Introduction - ${lead.company} & Our Solutions`,
                      message: `Hi ${lead.name},\n\nI hope this email finds you well. I came across ${lead.company} and was impressed by your work in the ${lead.industry} industry.\n\nBased on your interests in ${lead.interests.slice(0, 2).join(', ')}, I believe we could help you achieve significant improvements.\n\nWould you be open to a brief 15-minute call?\n\nBest regards,`
                    }));
                  } else if (value === 'demo-invite') {
                    setEmailData(prev => ({
                      ...prev,
                      subject: `Exclusive Demo Invitation - ${lead.company}`,
                      message: `Hi ${lead.name},\n\nI'd like to invite you to an exclusive demo tailored specifically for ${lead.company}'s needs in ${lead.industry}.\n\nGiven your interests in ${lead.interests.slice(0, 2).join(' and ')}, I believe you'll find our solutions highly relevant.\n\nWhen would be a good time for a 30-minute demo?\n\nBest regards,`
                    }));
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="introduction">Introduction Email</SelectItem>
                  <SelectItem value="demo-invite">Demo Invitation</SelectItem>
                  <SelectItem value="content-share">Share Relevant Content</SelectItem>
                  <SelectItem value="nurturing">Nurturing Sequence</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personalization hints */}
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Personalization Data</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Company: {lead.company} ({lead.companySize} employees)</div>
                <div>• Industry: {lead.industry}</div>
                <div>• Interests: {lead.interests.join(', ')}</div>
                <div>• Source: {lead.source}</div>
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

  // Qualify Modal
  if (modalType === 'qualify') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Qualify Lead - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>{lead.name} • {lead.jobTitle} at {lead.company}</span>
              <Badge className={getStatusColor(lead.status)}>
                Current: {lead.status}
              </Badge>
              <div className="ml-auto flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="font-medium">{lead.score}</span>
              </div>
            </div>

            {/* BANT Qualification */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Target className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">BANT Qualification</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Select value={qualifyData.budget} onValueChange={(value) => setQualifyData({...qualifyData, budget: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-10k">Under ₹10L</SelectItem>
                      <SelectItem value="10k-50k">₹10L - ₹50L</SelectItem>
                      <SelectItem value="50k-100k">₹50L - ₹1Cr</SelectItem>
                      <SelectItem value="100k-500k">₹1Cr - ₹5Cr</SelectItem>
                      <SelectItem value="over-500k">Over ₹5Cr</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="authority">Authority</Label>
                  <Select value={qualifyData.authority} onValueChange={(value) => setQualifyData({...qualifyData, authority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Decision making authority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decision-maker">Decision Maker</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                      <SelectItem value="user">End User</SelectItem>
                      <SelectItem value="gatekeeper">Gatekeeper</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="need">Need Level</Label>
                  <Select value={qualifyData.need} onValueChange={(value) => setQualifyData({...qualifyData, need: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="How urgent is their need?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical - Immediate need</SelectItem>
                      <SelectItem value="important">Important - Within 3 months</SelectItem>
                      <SelectItem value="moderate">Moderate - Within 6 months</SelectItem>
                      <SelectItem value="low">Low - Future consideration</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select value={qualifyData.timeline} onValueChange={(value) => setQualifyData({...qualifyData, timeline: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Implementation timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (within 1 month)</SelectItem>
                      <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                      <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                      <SelectItem value="long">Long-term (6+ months)</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Lead Score Update */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Star className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Lead Score Update</h3>
              </div>
              
              <div>
                <Label htmlFor="score">Updated Score (1-100)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="score"
                    type="number"
                    min="1"
                    max="100"
                    value={qualifyData.score}
                    onChange={(e) => setQualifyData({...qualifyData, score: Number.parseInt(e.target.value) || 0})}
                    className="w-32"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Current: {lead.score}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span className={`text-sm font-medium ${
                      qualifyData.score > lead.score ? 'text-green-600' : 
                      qualifyData.score < lead.score ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      New: {qualifyData.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="qualification-reason">Qualification Reason</Label>
                <Select value={qualifyData.qualificationReason} onValueChange={(value) => setQualifyData({...qualifyData, qualificationReason: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Why is this lead qualified?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong-fit">Strong product-market fit</SelectItem>
                    <SelectItem value="budget-confirmed">Budget confirmed</SelectItem>
                    <SelectItem value="urgent-need">Urgent business need</SelectItem>
                    <SelectItem value="decision-maker">Direct access to decision maker</SelectItem>
                    <SelectItem value="competitive-threat">Competitive threat/opportunity</SelectItem>
                    <SelectItem value="referral">Strong referral/recommendation</SelectItem>
                    <SelectItem value="expansion">Existing customer expansion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="next-steps">Next Steps</Label>
                <Textarea
                  id="next-steps"
                  value={qualifyData.nextSteps}
                  onChange={(e) => setQualifyData({...qualifyData, nextSteps: e.target.value})}
                  placeholder="What are the immediate next steps for this qualified lead?"
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="qualification-notes">Qualification Notes</Label>
                <Textarea
                  id="qualification-notes"
                  value={qualifyData.notes}
                  onChange={(e) => setQualifyData({...qualifyData, notes: e.target.value})}
                  placeholder="Additional notes about the qualification process, pain points identified, objections, etc."
                  rows={3}
                />
              </div>
            </div>

            {/* Qualification Result Preview */}
            {qualifyData.budget && qualifyData.authority && qualifyData.need && qualifyData.timeline && (
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Qualification Summary</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• Budget: {qualifyData.budget.replace('-', ' - ').replace('k', 'L').replace('under ', 'Under ')}</div>
                  <div>• Authority: {qualifyData.authority.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  <div>• Need: {qualifyData.need.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  <div>• Timeline: {qualifyData.timeline.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                  <div>• Score Change: {lead.score} → {qualifyData.score}</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button 
                onClick={handleQualifyAction}
                disabled={!qualifyData.budget || !qualifyData.authority || !qualifyData.need || !qualifyData.timeline}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Qualify Lead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}