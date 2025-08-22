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
  AlertCircle
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

interface TofuLeadActionModalsProps {
  lead: TOFULead | null;
  modalType: 'view' | 'edit' | 'call' | 'email' | 'move' | null;
  onClose: () => void;
  onUpdate: (updatedLead: TOFULead) => void;
  onRemove?: (leadId: string) => void;
}

export function TofuLeadActionModals({
  lead,
  modalType,
  onClose,
  onUpdate,
  onRemove
}: TofuLeadActionModalsProps) {
  const [editForm, setEditForm] = useState<TOFULead | null>(null);
  const [callForm, setCallForm] = useState({
    purpose: 'discovery',
    notes: '',
    scheduledTime: '',
    duration: '30'
  });
  
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    template: 'introduction',
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
        notes: `Discovery call with ${lead.name} from ${lead.company}`,
        scheduledTime: '',
        duration: '30'
      });
    }
    if (lead && modalType === 'email') {
      setEmailForm({
        subject: `Introduction - ${lead.company}`,
        message: `Hi ${lead.name},\n\nI hope this email finds you well. I came across ${lead.company} and was impressed by your work in ${lead.industry}.\n\nI'd love to learn more about your current challenges and see if we can help. Would you be open to a brief 15-minute call?\n\nBest regards,`,
        template: 'introduction',
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
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interested': return 'bg-green-100 text-green-800 border-green-200';
      case 'nurturing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'qualified': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
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
    console.log('Scheduling call:', callForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date(),
        status: 'contacted'
      });
    }
    handleClose();
  };

  const handleEmailSubmit = () => {
    // In a real app, this would integrate with email service
    console.log('Sending email:', emailForm);
    if (lead) {
      onUpdate({
        ...lead,
        lastActivity: new Date(),
        status: 'contacted'
      });
    }
    handleClose();
  };

  const handleMoveSubmit = () => {
    // In a real app, this would move lead to MOFU stage
    console.log('Moving lead to MOFU:', moveForm);
    if (lead) {
      onUpdate({
        ...lead,
        status: 'qualified',
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Lead Profile - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600">{lead.jobTitle}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
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

            {/* Interests */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Interests
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Lead - {lead.name}
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="nurturing">Nurturing</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
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
                <Label htmlFor="edit-companySize">Company Size</Label>
                <Select value={editForm.companySize} onValueChange={(value) => setEditForm({...editForm, companySize: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-100">51-100</SelectItem>
                    <SelectItem value="101-500">101-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
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
                {lead.status}
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
                    <SelectItem value="discovery">Discovery Call</SelectItem>
                    <SelectItem value="qualification">Qualification</SelectItem>
                    <SelectItem value="demo">Product Demo</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="introduction">Introduction</SelectItem>
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
                {lead.status}
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
                    <SelectItem value="introduction">Introduction</SelectItem>
                    <SelectItem value="demo-invite">Demo Invitation</SelectItem>
                    <SelectItem value="follow-up">Follow Up</SelectItem>
                    <SelectItem value="nurturing">Nurturing Sequence</SelectItem>
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

  // Move to MOFU Modal
  if (modalType === 'move') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Move to MOFU - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Lead: {lead.name} ({lead.company})</span>
              <Badge className={getStatusColor(lead.status)}>
                Current: {lead.status}
              </Badge>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">Moving to MOFU Stage</span>
              </div>
              <p className="text-sm text-blue-700">
                This lead will be moved to the Middle of Funnel (MOFU) stage and marked as qualified.
                They will receive consideration-stage content and nurturing.
              </p>
            </div>

            <div>
              <Label htmlFor="move-reason">Reason for Qualification</Label>
              <Select value={moveForm.reason} onValueChange={(value) => setMoveForm({...moveForm, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="showed-interest">Showed Strong Interest</SelectItem>
                  <SelectItem value="budget-confirmed">Budget Confirmed</SelectItem>
                  <SelectItem value="decision-maker">Identified Decision Maker</SelectItem>
                  <SelectItem value="demo-requested">Demo Requested</SelectItem>
                  <SelectItem value="timeline-established">Timeline Established</SelectItem>
                  <SelectItem value="pain-points-identified">Pain Points Identified</SelectItem>
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
                placeholder="Any additional context for the qualification..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleMoveSubmit} disabled={!moveForm.reason}>
                <ArrowRight className="h-4 w-4 mr-2" />
                Move to MOFU
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}