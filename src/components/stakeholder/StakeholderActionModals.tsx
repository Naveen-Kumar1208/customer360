"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarScheduler } from "./CalendarScheduler";
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
  Trash2,
  User,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Star,
  GitBranch,
  Send,
  AlertCircle,
  Check
} from "lucide-react";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  department: string;
  influence: "high" | "medium" | "low";
  relationship: "champion" | "supporter" | "neutral" | "blocker";
  email: string;
  phone: string;
  lastContact: Date;
  connections: string[];
}

interface StakeholderActionModalsProps {
  stakeholder: Stakeholder | null;
  modalType: 'view' | 'edit' | 'call' | 'email' | 'remove' | null;
  onClose: () => void;
  onUpdate: (updatedStakeholder: Stakeholder) => void;
  onRemove: (stakeholderId: string) => void;
}

export function StakeholderActionModals({
  stakeholder,
  modalType,
  onClose,
  onUpdate,
  onRemove
}: StakeholderActionModalsProps) {
  const [editForm, setEditForm] = useState<Stakeholder | null>(null);
  const [callForm, setCallForm] = useState({
    date: '',
    time: '',
    duration: '30',
    notes: '',
    location: 'phone'
  });
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  
  // Store the active element when modal opens for focus restoration
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (modalType && stakeholder) {
      // Store the currently focused element
      activeElementRef.current = document.activeElement as HTMLElement;
    }
  }, [modalType, stakeholder]);

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
    if (stakeholder && modalType === 'edit') {
      setEditForm({ ...stakeholder });
    }
    if (stakeholder && modalType === 'call') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCallForm({
        date: tomorrow.toISOString().split('T')[0],
        time: '09:00',
        duration: '30',
        notes: '',
        location: 'phone'
      });
    }
    if (stakeholder && modalType === 'email') {
      setEmailForm({
        subject: `Follow up - ${stakeholder.name}`,
        message: `Hi ${stakeholder.name.split(' ')[0]},\n\nI hope this email finds you well. I wanted to follow up on our previous conversation.\n\nBest regards,`,
        priority: 'normal'
      });
    }
  }, [stakeholder, modalType]);

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'champion': return 'bg-green-100 text-green-800 border-green-200';
      case 'supporter': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'blocker': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEditSubmit = () => {
    if (editForm) {
      onUpdate(editForm);
      handleClose();
    }
  };

  const handleScheduleCall = (meetingData: any) => {
    // In a real app, this would integrate with calendar/CRM
    console.log('Scheduling call with enhanced data:', meetingData);
    
    // Create calendar event
    const calendarEvent = {
      title: meetingData.title,
      date: meetingData.date,
      time: meetingData.time,
      duration: Number.parseInt(meetingData.duration),
      type: meetingData.type,
      stakeholder: meetingData.stakeholder,
      agenda: meetingData.agenda,
      reminder: Number.parseInt(meetingData.reminder),
      recurring: meetingData.recurring,
      location: meetingData.location || (meetingData.type === 'phone' ? stakeholder?.phone : '')
    };

    // Here you would typically:
    // 1. Send to calendar API (Google Calendar, Outlook, etc.)
    // 2. Create CRM activity record
    // 3. Send calendar invite to stakeholder
    // 4. Set up reminder notifications
    
    console.log('Calendar event created:', calendarEvent);
    handleClose();
  };

  const handleSendEmail = () => {
    // In a real app, this would integrate with email service
    console.log('Sending email:', emailForm);
    handleClose();
  };

  const handleRemove = () => {
    if (stakeholder) {
      onRemove(stakeholder.id);
      handleClose();
    }
  };

  if (!stakeholder) return null;

  // View Profile Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Stakeholder Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {stakeholder.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{stakeholder.name}</h2>
                <p className="text-gray-600">{stakeholder.role}</p>
                <p className="text-sm text-gray-500">{stakeholder.department} • {stakeholder.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getInfluenceColor(stakeholder.influence)}>
                    {stakeholder.influence} influence
                  </Badge>
                  <Badge className={getRelationshipColor(stakeholder.relationship)}>
                    {stakeholder.relationship}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>{stakeholder.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{stakeholder.phone || 'No phone provided'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Organization
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Company:</strong> {stakeholder.company}</div>
                  <div><strong>Department:</strong> {stakeholder.department}</div>
                  <div><strong>Role:</strong> {stakeholder.role}</div>
                </div>
              </div>
            </div>

            {/* Relationship & Activity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Relationship Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Influence:</strong> {stakeholder.influence}</div>
                  <div><strong>Relationship:</strong> {stakeholder.relationship}</div>
                  <div><strong>Last Contact:</strong> {stakeholder.lastContact.toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Network
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Connections:</strong> {stakeholder.connections.length}</div>
                  {stakeholder.connections.length > 0 && (
                    <div className="text-xs text-gray-500">
                      Connected to: {stakeholder.connections.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Edit Details Modal
  if (modalType === 'edit' && editForm) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Stakeholder Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Job Title</Label>
                <Input
                  id="edit-role"
                  value={editForm.role}
                  onChange={(e) => setEditForm({...editForm, role: e.target.value})}
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
                <Label htmlFor="edit-department">Department</Label>
                <Input
                  id="edit-department"
                  value={editForm.department}
                  onChange={(e) => setEditForm({...editForm, department: e.target.value})}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-influence">Influence Level</Label>
                <Select value={editForm.influence} onValueChange={(value: any) => setEditForm({...editForm, influence: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-relationship">Relationship</Label>
                <Select value={editForm.relationship} onValueChange={(value: any) => setEditForm({...editForm, relationship: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="champion">Champion</SelectItem>
                    <SelectItem value="supporter">Supporter</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="blocker">Blocker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Schedule Call with {stakeholder.name}
            </DialogTitle>
          </DialogHeader>

          <CalendarScheduler
            stakeholderName={stakeholder.name}
            onSchedule={handleScheduleCall}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Send Email Modal
  if (modalType === 'email') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email to {stakeholder.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <Mail className="h-4 w-4" />
              <span>To: {stakeholder.email}</span>
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
              <Label htmlFor="email-priority">Priority</Label>
              <Select value={emailForm.priority} onValueChange={(value) => setEmailForm({...emailForm, priority: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
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
              <Button onClick={handleSendEmail}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Remove Confirmation Modal
  if (modalType === 'remove') {
    return (
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Remove Stakeholder
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{stakeholder.name}</strong> from your stakeholder list? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
}