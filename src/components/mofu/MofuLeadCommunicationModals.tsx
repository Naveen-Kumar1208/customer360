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
  FileText,
  Calendar,
  User,
  Clock,
  Target,
  Star,
  Building2,
  DollarSign,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface MOFULead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "evaluating" | "demo_requested" | "proposal_sent" | "negotiating" | "ready_to_close";
  score: number;
  dealValue: number;
  probability: number;
  createdAt: Date;
  lastActivity: Date;
  nextAction: string;
  nextActionDate: Date;
  interests: string[];
  location: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  engagementLevel: number;
}

interface MofuLeadCommunicationModalsProps {
  lead: MOFULead | null;
  modalType: 'call' | 'proposal' | 'schedule' | null;
  onClose: () => void;
  onAction: (lead: MOFULead, action: string, data: any) => void;
}

export function MofuLeadCommunicationModals({
  lead,
  modalType,
  onClose,
  onAction
}: MofuLeadCommunicationModalsProps) {
  const [callData, setCallData] = useState({
    type: 'scheduled',
    purpose: 'demo',
    notes: '',
    scheduledTime: '',
    duration: '60'
  });
  
  const [proposalData, setProposalData] = useState({
    proposalType: 'custom',
    dealValue: 0,
    paymentTerms: 'net-30',
    deliveryTimeline: '30-days',
    includeDiscount: false,
    discountPercentage: 0,
    validUntil: '',
    notes: '',
    template: 'standard'
  });

  const [scheduleData, setScheduleData] = useState({
    meetingType: 'demo',
    duration: '60',
    scheduledTime: '',
    attendees: '',
    agenda: '',
    location: 'virtual',
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
        type: 'scheduled',
        purpose: 'demo',
        notes: `Product demo call with ${lead.name} from ${lead.company} to showcase solutions for ${lead.interests.slice(0, 2).join(' and ')}.`,
        scheduledTime: '',
        duration: '60'
      });
    }
    if (lead && modalType === 'proposal') {
      setProposalData({
        proposalType: 'custom',
        dealValue: lead.dealValue,
        paymentTerms: 'net-30',
        deliveryTimeline: '30-days',
        includeDiscount: false,
        discountPercentage: 0,
        validUntil: '',
        notes: `Proposal for ${lead.company} - ${lead.interests.slice(0, 2).join(' and ')} solutions tailored for ${lead.industry} industry.`,
        template: 'standard'
      });
    }
    if (lead && modalType === 'schedule') {
      setScheduleData({
        meetingType: 'demo',
        duration: '60',
        scheduledTime: '',
        attendees: `${lead.name}, ${lead.jobTitle}`,
        agenda: `Product demonstration focused on ${lead.interests.slice(0, 2).join(' and ')} for ${lead.company}.`,
        location: 'virtual',
        notes: ''
      });
    }
  }, [lead, modalType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'evaluating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'demo_requested': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'proposal_sent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'negotiating': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready_to_close': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCallAction = () => {
    if (lead) {
      onAction(lead, 'call', callData);
    }
    handleClose();
  };

  const handleProposalAction = () => {
    if (lead) {
      onAction(lead, 'proposal', proposalData);
    }
    handleClose();
  };

  const handleScheduleAction = () => {
    if (lead) {
      onAction(lead, 'schedule', scheduleData);
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
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <DollarSign className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</span>
              </div>
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
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
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
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="proposal-discussion">Proposal Discussion</SelectItem>
                  <SelectItem value="technical-deep-dive">Technical Deep Dive</SelectItem>
                  <SelectItem value="stakeholder-meeting">Stakeholder Meeting</SelectItem>
                  <SelectItem value="negotiation">Contract Negotiation</SelectItem>
                  <SelectItem value="closing">Closing Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deal Context */}
            <div className="p-3 bg-purple-50 border border-purple-200 rounded">
              <div className="flex items-center gap-2 text-purple-800 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Deal Context</span>
              </div>
              <div className="text-sm text-purple-700 space-y-1">
                <div>• Deal Value: ₹{(lead.dealValue / 100000).toFixed(1)}L ({lead.probability}% probability)</div>
                <div>• Status: {lead.status.replace('_', ' ')}</div>
                <div>• Next Action: {lead.nextAction}</div>
                <div>• Interests: {lead.interests.slice(0, 3).join(', ')}</div>
              </div>
            </div>

            {/* Call Notes */}
            <div>
              <Label htmlFor="call-notes">Call Notes & Agenda</Label>
              <Textarea
                id="call-notes"
                value={callData.notes}
                onChange={(e) => setCallData({...callData, notes: e.target.value})}
                placeholder="Key discussion points, demo topics, questions to ask..."
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

  // Proposal Modal
  if (modalType === 'proposal') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Send Proposal - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <Building2 className="h-4 w-4" />
              <span>To: {lead.name} at {lead.company}</span>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="font-medium text-blue-600">{lead.probability}% win rate</span>
              </div>
            </div>

            {/* Proposal Template */}
            <div>
              <Label>Proposal Template</Label>
              <Select 
                value={proposalData.template} 
                onValueChange={(value) => setProposalData({...proposalData, template: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Proposal</SelectItem>
                  <SelectItem value="enterprise">Enterprise Package</SelectItem>
                  <SelectItem value="custom">Custom Solution</SelectItem>
                  <SelectItem value="pilot">Pilot Program</SelectItem>
                  <SelectItem value="partnership">Partnership Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Proposal Type & Deal Value */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Proposal Type</Label>
                <Select 
                  value={proposalData.proposalType} 
                  onValueChange={(value) => setProposalData({...proposalData, proposalType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Pricing</SelectItem>
                    <SelectItem value="custom">Custom Quote</SelectItem>
                    <SelectItem value="volume">Volume Discount</SelectItem>
                    <SelectItem value="enterprise">Enterprise Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deal-value">Deal Value (₹)</Label>
                <Input
                  id="deal-value"
                  type="number"
                  value={proposalData.dealValue}
                  onChange={(e) => setProposalData({...proposalData, dealValue: Number.parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            {/* Payment Terms & Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Payment Terms</Label>
                <Select 
                  value={proposalData.paymentTerms} 
                  onValueChange={(value) => setProposalData({...proposalData, paymentTerms: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net-15">Net 15 days</SelectItem>
                    <SelectItem value="net-30">Net 30 days</SelectItem>
                    <SelectItem value="net-60">Net 60 days</SelectItem>
                    <SelectItem value="advance-50">50% Advance</SelectItem>
                    <SelectItem value="milestone">Milestone Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Delivery Timeline</Label>
                <Select 
                  value={proposalData.deliveryTimeline} 
                  onValueChange={(value) => setProposalData({...proposalData, deliveryTimeline: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-days">15 days</SelectItem>
                    <SelectItem value="30-days">30 days</SelectItem>
                    <SelectItem value="45-days">45 days</SelectItem>
                    <SelectItem value="60-days">60 days</SelectItem>
                    <SelectItem value="90-days">90 days</SelectItem>
                    <SelectItem value="custom">Custom Timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Discount Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-discount"
                  checked={proposalData.includeDiscount}
                  onChange={(e) => setProposalData({...proposalData, includeDiscount: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-discount">Include Special Discount</Label>
              </div>
              
              {proposalData.includeDiscount && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount-percentage">Discount Percentage (%)</Label>
                    <Input
                      id="discount-percentage"
                      type="number"
                      min="0"
                      max="50"
                      value={proposalData.discountPercentage}
                      onChange={(e) => setProposalData({...proposalData, discountPercentage: Number.parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="valid-until">Valid Until</Label>
                    <Input
                      id="valid-until"
                      type="date"
                      value={proposalData.validUntil}
                      onChange={(e) => setProposalData({...proposalData, validUntil: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Proposal Preview */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Proposal Summary</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Deal Value: ₹{(proposalData.dealValue / 100000).toFixed(1)}L</div>
                <div>• Payment Terms: {proposalData.paymentTerms.replace('-', ' ')}</div>
                <div>• Delivery: {proposalData.deliveryTimeline.replace('-', ' ')}</div>
                {proposalData.includeDiscount && (
                  <div>• Discount: {proposalData.discountPercentage}% (₹{((proposalData.dealValue * proposalData.discountPercentage / 100) / 100000).toFixed(1)}L savings)</div>
                )}
                {proposalData.validUntil && (
                  <div>• Valid Until: {new Date(proposalData.validUntil).toLocaleDateString()}</div>
                )}
              </div>
            </div>

            {/* Proposal Notes */}
            <div>
              <Label htmlFor="proposal-notes">Proposal Notes & Custom Terms</Label>
              <Textarea
                id="proposal-notes"
                value={proposalData.notes}
                onChange={(e) => setProposalData({...proposalData, notes: e.target.value})}
                placeholder="Additional terms, special conditions, or custom requirements..."
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleProposalAction}>
                <FileText className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Schedule Modal
  if (modalType === 'schedule') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Meeting - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>{lead.name} • {lead.jobTitle} at {lead.company}</span>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="font-medium">{lead.score}</span>
              </div>
            </div>

            {/* Meeting Type */}
            <div>
              <Label>Meeting Type</Label>
              <Select 
                value={scheduleData.meetingType} 
                onValueChange={(value) => setScheduleData({...scheduleData, meetingType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="discovery">Discovery Meeting</SelectItem>
                  <SelectItem value="technical">Technical Discussion</SelectItem>
                  <SelectItem value="stakeholder">Stakeholder Meeting</SelectItem>
                  <SelectItem value="proposal-review">Proposal Review</SelectItem>
                  <SelectItem value="contract-discussion">Contract Discussion</SelectItem>
                  <SelectItem value="kickoff">Project Kickoff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schedule Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meeting-time">Meeting Time</Label>
                <Input
                  id="meeting-time"
                  type="datetime-local"
                  value={scheduleData.scheduledTime}
                  onChange={(e) => setScheduleData({...scheduleData, scheduledTime: e.target.value})}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Select 
                  value={scheduleData.duration} 
                  onValueChange={(value) => setScheduleData({...scheduleData, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>Meeting Location</Label>
              <Select 
                value={scheduleData.location} 
                onValueChange={(value) => setScheduleData({...scheduleData, location: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="virtual">Virtual Meeting (Zoom/Teams)</SelectItem>
                  <SelectItem value="client-office">Client Office</SelectItem>
                  <SelectItem value="our-office">Our Office</SelectItem>
                  <SelectItem value="neutral">Neutral Location</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attendees */}
            <div>
              <Label htmlFor="attendees">Expected Attendees</Label>
              <Input
                id="attendees"
                value={scheduleData.attendees}
                onChange={(e) => setScheduleData({...scheduleData, attendees: e.target.value})}
                placeholder="Names and roles of meeting attendees..."
              />
            </div>

            {/* Agenda */}
            <div>
              <Label htmlFor="agenda">Meeting Agenda</Label>
              <Textarea
                id="agenda"
                value={scheduleData.agenda}
                onChange={(e) => setScheduleData({...scheduleData, agenda: e.target.value})}
                placeholder="Key topics to cover, objectives, expected outcomes..."
                rows={3}
              />
            </div>

            {/* Meeting Context */}
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Meeting Context</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <div>• Current Status: {lead.status.replace('_', ' ')}</div>
                <div>• Deal Stage: ₹{(lead.dealValue / 100000).toFixed(1)}L at {lead.probability}% probability</div>
                <div>• Key Interests: {lead.interests.slice(0, 3).join(', ')}</div>
                <div>• Next Action: {lead.nextAction}</div>
              </div>
            </div>

            {/* Meeting Notes */}
            <div>
              <Label htmlFor="meeting-notes">Additional Notes</Label>
              <Textarea
                id="meeting-notes"
                value={scheduleData.notes}
                onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                placeholder="Special requirements, preparation notes, etc..."
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleScheduleAction} disabled={!scheduleData.scheduledTime}>
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