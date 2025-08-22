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
  Edit,
  Phone,
  Mail,
  ArrowRight,
  User,
  Building2,
  Star,
  Calendar,
  MapPin,
  Clock,
  Target,
  Trash2,
  AlertCircle,
  DollarSign,
  TrendingUp,
  FileText
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

interface MofuLeadActionModalsProps {
  lead: MOFULead | null;
  modalType: 'view' | 'edit' | 'call' | 'email' | 'move' | null;
  onClose: () => void;
  onUpdate: (updatedLead: MOFULead) => void;
  onRemove?: (leadId: string) => void;
}

export function MofuLeadActionModals({
  lead,
  modalType,
  onClose,
  onUpdate,
  onRemove
}: MofuLeadActionModalsProps) {
  const [editForm, setEditForm] = useState<MOFULead | null>(null);
  const [callForm, setCallForm] = useState({
    purpose: 'discovery',
    notes: '',
    scheduledTime: '',
    duration: '30'
  });
  
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    template: 'proposal-follow-up',
    priority: 'normal'
  });

  const [moveForm, setMoveForm] = useState({
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
    if (lead && modalType === 'edit') {
      setEditForm({ ...lead });
    }
    if (lead && modalType === 'call') {
      setCallForm({
        purpose: 'discovery',
        notes: `Follow-up call with ${lead.name} from ${lead.company} regarding ${lead.nextAction}`,
        scheduledTime: '',
        duration: '30'
      });
    }
    if (lead && modalType === 'email') {
      setEmailForm({
        subject: `Follow-up: ${lead.nextAction}`,
        message: `Hi ${lead.name},\n\nI hope this email finds you well. I wanted to follow up on our recent discussion regarding ${lead.company}'s needs.\n\nGiven your interest in ${lead.interests.slice(0, 2).join(' and ')}, I believe we're well-positioned to help you achieve your goals.\n\nCould we schedule a call to discuss the next steps in your evaluation process?\n\nBest regards,`,
        template: 'proposal-follow-up',
        priority: 'normal'
      });
    }
    if (lead && modalType === 'move') {
      setMoveForm({
        reason: '',
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditSubmit = () => {
    if (editForm) {
      onUpdate(editForm);
      handleClose();
    }
  };

  const handleCallSubmit = () => {
    // In a real app, this would integrate with calling system
    console.log('Scheduling MOFU call:', callForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date(),
        status: 'demo_requested'
      });
    }
    handleClose();
  };

  const handleEmailSubmit = () => {
    // In a real app, this would integrate with email service
    console.log('Sending MOFU email:', emailForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date(),
        status: 'proposal_sent'
      });
    }
    handleClose();
  };

  const handleMoveSubmit = () => {
    // In a real app, this would move lead to BOFU stage
    console.log('Moving lead to BOFU:', moveForm);
    if (lead) {
      onUpdate({
        ...lead,
        status: 'ready_to_close',
        lastActivity: new Date()
      });
    }
    handleClose();
  };

  if (!lead) return null;

  // View Profile Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              MOFU Lead Profile - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600">{lead.jobTitle}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className={`font-medium ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</div>
                <div className={`text-sm ${getProbabilityColor(lead.probability)}`}>
                  {lead.probability}% probability
                </div>
              </div>
            </div>

            {/* Deal Information */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Deal Value</span>
                </div>
                <div className="text-lg font-bold text-blue-900">₹{(lead.dealValue / 100000).toFixed(1)}L</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Win Probability</span>
                </div>
                <div className={`text-lg font-bold ${getProbabilityColor(lead.probability)}`}>
                  {lead.probability}%
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Engagement</span>
                </div>
                <div className={`text-lg font-bold ${getScoreColor(lead.engagementLevel)}`}>
                  {lead.engagementLevel}%
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
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>{lead.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Company:</strong> {lead.company}</div>
                  <div><strong>Industry:</strong> {lead.industry}</div>
                  <div><strong>Size:</strong> {lead.companySize} employees</div>
                  <div><strong>Source:</strong> {lead.source}</div>
                </div>
              </div>
            </div>

            {/* Next Action */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Next Action
              </h3>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-900">{lead.nextAction}</p>
                    <p className="text-sm text-orange-700">
                      Due: {lead.nextActionDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Interests & Requirements
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Created:</span>
                  <span>{lead.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Activity:</span>
                  <span>{lead.lastActivity.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Next Action:</span>
                  <span>{lead.nextActionDate.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Edit Lead Modal
  if (modalType === 'edit' && editForm) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit MOFU Lead - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-jobTitle">Job Title</Label>
                <Input
                  id="edit-jobTitle"
                  value={editForm.jobTitle}
                  onChange={(e) => setEditForm({...editForm, jobTitle: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-company">Company</Label>
                <Input
                  id="edit-company"
                  value={editForm.company}
                  onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-industry">Industry</Label>
                <Input
                  id="edit-industry"
                  value={editForm.industry}
                  onChange={(e) => setEditForm({...editForm, industry: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editForm.status} onValueChange={(value: any) => setEditForm({...editForm, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="evaluating">Evaluating</SelectItem>
                    <SelectItem value="demo_requested">Demo Requested</SelectItem>
                    <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="ready_to_close">Ready to Close</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-score">Score (1-100)</Label>
                <Input
                  id="edit-score"
                  type="number"
                  min="1"
                  max="100"
                  value={editForm.score}
                  onChange={(e) => setEditForm({...editForm, score: Number.parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="edit-probability">Win Probability (%)</Label>
                <Input
                  id="edit-probability"
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.probability}
                  onChange={(e) => setEditForm({...editForm, probability: Number.parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-dealValue">Deal Value (₹)</Label>
                <Input
                  id="edit-dealValue"
                  type="number"
                  value={editForm.dealValue}
                  onChange={(e) => setEditForm({...editForm, dealValue: Number.parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="edit-engagementLevel">Engagement Level (%)</Label>
                <Input
                  id="edit-engagementLevel"
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.engagementLevel}
                  onChange={(e) => setEditForm({...editForm, engagementLevel: Number.parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-nextAction">Next Action</Label>
                <Input
                  id="edit-nextAction"
                  value={editForm.nextAction}
                  onChange={(e) => setEditForm({...editForm, nextAction: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-nextActionDate">Next Action Date</Label>
                <Input
                  id="edit-nextActionDate"
                  type="date"
                  value={editForm.nextActionDate.toISOString().split('T')[0]}
                  onChange={(e) => setEditForm({...editForm, nextActionDate: new Date(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
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
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto text-green-600 font-medium">
                ₹{(lead.dealValue / 100000).toFixed(1)}L deal
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="call-purpose">Call Purpose</Label>
                <Select value={callForm.purpose} onValueChange={(value) => setCallForm({...callForm, purpose: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovery">Discovery Call</SelectItem>
                    <SelectItem value="demo">Product Demo</SelectItem>
                    <SelectItem value="proposal">Proposal Discussion</SelectItem>
                    <SelectItem value="negotiation">Contract Negotiation</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="closing">Closing Call</SelectItem>
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
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="scheduled-time">Schedule For</Label>
              <Input
                id="scheduled-time"
                type="datetime-local"
                value={callForm.scheduledTime}
                onChange={(e) => setCallForm({...callForm, scheduledTime: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="call-notes">Call Notes & Agenda</Label>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto text-green-600 font-medium">
                ₹{(lead.dealValue / 100000).toFixed(1)}L deal
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-template">Email Template</Label>
                <Select value={emailForm.template} onValueChange={(value) => setEmailForm({...emailForm, template: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposal-follow-up">Proposal Follow-up</SelectItem>
                    <SelectItem value="demo-invite">Demo Invitation</SelectItem>
                    <SelectItem value="contract-discussion">Contract Discussion</SelectItem>
                    <SelectItem value="closing-sequence">Closing Sequence</SelectItem>
                    <SelectItem value="pricing-negotiation">Pricing Negotiation</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
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

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEmailSubmit}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Move to BOFU Modal
  if (modalType === 'move') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Move to BOFU - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Lead: {lead.name} ({lead.company})</span>
              <Badge className={getStatusColor(lead.status)}>
                Current: {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto text-green-600 font-medium">
                ₹{(lead.dealValue / 100000).toFixed(1)}L deal
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">Moving to BOFU Stage</span>
              </div>
              <p className="text-sm text-green-700">
                This lead will be moved to the Bottom of Funnel (BOFU) stage and marked as ready to close.
                They will receive final closing content and priority attention.
              </p>
            </div>

            <div>
              <Label htmlFor="move-reason">Reason for BOFU Advancement</Label>
              <Select value={moveForm.reason} onValueChange={(value) => setMoveForm({...moveForm, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposal-accepted">Proposal Accepted</SelectItem>
                  <SelectItem value="budget-approved">Budget Approved</SelectItem>
                  <SelectItem value="contract-ready">Ready for Contract</SelectItem>
                  <SelectItem value="decision-imminent">Decision Imminent</SelectItem>
                  <SelectItem value="timeline-confirmed">Timeline Confirmed</SelectItem>
                  <SelectItem value="stakeholders-aligned">All Stakeholders Aligned</SelectItem>
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
                placeholder="Any additional context for the BOFU advancement..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleMoveSubmit} disabled={!moveForm.reason}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to BOFU
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}