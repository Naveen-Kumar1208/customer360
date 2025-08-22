"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  Eye,
  Phone,
  Mail,
  ArrowRight,
  User,
  Building2,
  Star,
  Calendar,
  MapPin,
  Globe,
  DollarSign,
  Tag,
  TrendingUp,
  CheckCircle,
  Clock,
  Target
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

interface LeadActionModalsProps {
  lead: Lead | null;
  modalType: 'view' | 'call' | 'email' | 'move' | null;
  onClose: () => void;
  onUpdate: (updatedLead: Lead) => void;
}

export function LeadActionModals({
  lead,
  modalType,
  onClose,
  onUpdate
}: LeadActionModalsProps) {
  const [callForm, setCallForm] = useState({
    purpose: 'follow-up',
    notes: '',
    duration: '30',
    scheduledFor: '',
    priority: 'normal'
  });
  
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    template: 'custom',
    priority: 'normal',
    scheduleFor: ''
  });

  const [moveForm, setMoveForm] = useState({
    newStage: '',
    reason: '',
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
      setCallForm({
        purpose: 'follow-up',
        notes: `Follow up call with ${lead.name} from ${lead.company}`,
        duration: '30',
        scheduledFor: '',
        priority: 'normal'
      });
    }
    if (lead && modalType === 'email') {
      setEmailForm({
        subject: `Follow up - ${lead.company}`,
        message: `Hi ${lead.name},\n\nI wanted to follow up on our conversation about ${lead.company}.\n\nBest regards,`,
        template: 'custom',
        priority: 'normal',
        scheduleFor: ''
      });
    }
    if (lead && modalType === 'move') {
      setMoveForm({
        newStage: lead.stage === 'tofu' ? 'mofu' : lead.stage === 'mofu' ? 'bofu' : 'tofu',
        reason: '',
        notes: ''
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const handleCallSubmit = () => {
    // In a real app, this would integrate with calling system
    console.log('Scheduling call:', callForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date()
      });
    }
    handleClose();
  };

  const handleEmailSubmit = () => {
    // In a real app, this would integrate with email service
    console.log('Sending/scheduling email:', emailForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date()
      });
    }
    handleClose();
  };

  const handleMoveSubmit = () => {
    if (lead) {
      onUpdate({
        ...lead,
        stage: moveForm.newStage,
        lastActivity: new Date()
      });
    }
    handleClose();
  };

  if (!lead) return null;

  // View Details Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Lead Details - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {lead.company}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStageColor(lead.stage)}>
                    {getStageName(lead.stage)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className={`font-medium ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>{lead.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{lead.phone || 'No phone provided'}</span>
                  </div>
                  {lead.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span>{lead.website}</span>
                    </div>
                  )}
                  {lead.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{lead.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Lead Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Value:</strong> {formatCurrency(lead.value)}</div>
                  <div><strong>Source:</strong> {lead.source}</div>
                  <div><strong>Score:</strong> {lead.score}/100</div>
                  <div><strong>Stage:</strong> {getStageName(lead.stage)}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {lead.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Created:</span>
                  <span>{lead.createdAt.toLocaleDateString()} ({getTimeAgo(lead.createdAt)})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Activity:</span>
                  <span>{lead.lastActivity.toLocaleDateString()} ({getTimeAgo(lead.lastActivity)})</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {lead.notes && (
              <div className="space-y-3">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {lead.notes}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Schedule Call Modal
  if (modalType === 'call') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Schedule Call - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Calling: {lead.name} ({lead.company})</span>
              <Badge className={getStageColor(lead.stage)}>
                {getStageName(lead.stage)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-purpose">Call Purpose</Label>
                <Select value={callForm.purpose} onValueChange={(value) => setCallForm({...callForm, purpose: value})}>
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
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="call-duration">Duration (minutes)</Label>
                <Select value={callForm.duration} onValueChange={(value) => setCallForm({...callForm, duration: value})}>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduled-for">Schedule For</Label>
                <Input
                  id="scheduled-for"
                  type="datetime-local"
                  value={callForm.scheduledFor}
                  onChange={(e) => setCallForm({...callForm, scheduledFor: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="call-priority">Priority</Label>
                <Select value={callForm.priority} onValueChange={(value) => setCallForm({...callForm, priority: value})}>
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

            <div>
              <Label htmlFor="call-notes">Call Notes</Label>
              <Textarea
                id="call-notes"
                value={callForm.notes}
                onChange={(e) => setCallForm({...callForm, notes: e.target.value})}
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCallSubmit}>
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Send Email Modal
  if (modalType === 'email') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <Mail className="h-4 w-4" />
              <span>To: {lead.email}</span>
              <Badge className={getStageColor(lead.stage)}>
                {getStageName(lead.stage)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-template">Email Template</Label>
                <Select value={emailForm.template} onValueChange={(value) => setEmailForm({...emailForm, template: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="introduction">Introduction</SelectItem>
                    <SelectItem value="demo-invite">Demo Invitation</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="thank-you">Thank You</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="email-priority">Priority</Label>
                <Select value={emailForm.priority} onValueChange={(value) => setEmailForm({...emailForm, priority: value})}>
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

            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                rows={8}
              />
            </div>

            <div>
              <Label htmlFor="schedule-for">Schedule For (optional)</Label>
              <Input
                id="schedule-for"
                type="datetime-local"
                value={emailForm.scheduleFor}
                onChange={(e) => setEmailForm({...emailForm, scheduleFor: e.target.value})}
              />
              <p className="text-sm text-gray-500 mt-1">Leave empty to send immediately</p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEmailSubmit}>
                <Mail className="h-4 w-4 mr-2" />
                {emailForm.scheduleFor ? 'Schedule Email' : 'Send Email'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Move to Next Stage Modal
  if (modalType === 'move') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Move Lead - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Lead: {lead.name} ({lead.company})</span>
              <Badge className={getStageColor(lead.stage)}>
                Current: {getStageName(lead.stage)}
              </Badge>
            </div>

            <div>
              <Label htmlFor="new-stage">Move to Stage</Label>
              <Select value={moveForm.newStage} onValueChange={(value) => setMoveForm({...moveForm, newStage: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tofu" disabled={lead.stage === 'tofu'}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      TOFU - Awareness
                    </div>
                  </SelectItem>
                  <SelectItem value="mofu" disabled={lead.stage === 'mofu'}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                      MOFU - Consideration
                    </div>
                  </SelectItem>
                  <SelectItem value="bofu" disabled={lead.stage === 'bofu'}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                      BOFU - Decision
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="move-reason">Reason for Move</Label>
              <Select value={moveForm.reason} onValueChange={(value) => setMoveForm({...moveForm, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interest-shown">Showed Interest</SelectItem>
                  <SelectItem value="demo-completed">Demo Completed</SelectItem>
                  <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
                  <SelectItem value="budget-confirmed">Budget Confirmed</SelectItem>
                  <SelectItem value="decision-maker-engaged">Decision Maker Engaged</SelectItem>
                  <SelectItem value="timeline-established">Timeline Established</SelectItem>
                  <SelectItem value="competition-identified">Competition Identified</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="move-notes">Additional Notes</Label>
              <Textarea
                id="move-notes"
                value={moveForm.notes}
                onChange={(e) => setMoveForm({...moveForm, notes: e.target.value})}
                placeholder="Any additional context for this stage change..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleMoveSubmit} disabled={!moveForm.newStage}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Move Lead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}