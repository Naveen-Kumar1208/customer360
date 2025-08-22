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
  Eye,
  Edit,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
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
  FileText,
  Award,
  Users
} from "lucide-react";

interface BOFULead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "contract_review" | "legal_approval" | "final_negotiation" | "ready_to_sign" | "closed_won" | "closed_lost";
  score: number;
  dealValue: number;
  probability: number;
  createdAt: Date;
  lastActivity: Date;
  closeDate: Date;
  nextAction: string;
  nextActionDate: Date;
  interests: string[];
  location: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  engagementLevel: number;
  decisionMakers: string[];
  competitors: string[];
}

interface BofuLeadActionModalsProps {
  lead: BOFULead | null;
  modalType: 'view' | 'edit' | 'call' | 'email' | 'contract' | 'won' | 'lost' | null;
  onClose: () => void;
  onUpdate: (updatedLead: BOFULead) => void;
  onRemove?: (leadId: string) => void;
}

export function BofuLeadActionModals({
  lead,
  modalType,
  onClose,
  onUpdate,
  onRemove
}: BofuLeadActionModalsProps) {
  const [editForm, setEditForm] = useState<BOFULead | null>(null);

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
  }, [lead, modalType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'contract_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'legal_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'final_negotiation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready_to_sign': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'closed_lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready_to_sign': return <CheckCircle className="h-4 w-4" />;
      case 'closed_won': return <Award className="h-4 w-4" />;
      case 'closed_lost': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 85) return 'text-green-600';
    if (probability >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditSubmit = () => {
    if (editForm) {
      onUpdate(editForm);
      handleClose();
    }
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
              BOFU Lead Profile - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600">{lead.jobTitle}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {getStatusIcon(lead.status)}
                    <span className="ml-1">{lead.status.replace('_', ' ')}</span>
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
                <div className="text-xs text-gray-500 mt-1">
                  Close: {lead.closeDate.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Deal Information */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Deal Value</span>
                </div>
                <div className="text-lg font-bold text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Win Probability</span>
                </div>
                <div className={`text-lg font-bold ${getProbabilityColor(lead.probability)}`}>
                  {lead.probability}%
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Engagement</span>
                </div>
                <div className={`text-lg font-bold ${getScoreColor(lead.engagementLevel)}`}>
                  {lead.engagementLevel}%
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Close Date</span>
                </div>
                <div className="text-sm font-bold text-orange-600">
                  {lead.closeDate.toLocaleDateString()}
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

            {/* Decision Makers */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Decision Makers
              </h3>
              <div className="flex flex-wrap gap-2">
                {lead.decisionMakers.map((dm, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {dm}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Competitors */}
            {lead.competitors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  Competitors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lead.competitors.map((competitor) => (
                    <Badge key={competitor} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {competitor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

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
                  <span>Expected Close:</span>
                  <span>{lead.closeDate.toLocaleDateString()}</span>
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
              Edit BOFU Lead - {lead.name}
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
                    <SelectItem value="contract_review">Contract Review</SelectItem>
                    <SelectItem value="legal_approval">Legal Approval</SelectItem>
                    <SelectItem value="final_negotiation">Final Negotiation</SelectItem>
                    <SelectItem value="ready_to_sign">Ready to Sign</SelectItem>
                    <SelectItem value="closed_won">Closed Won</SelectItem>
                    <SelectItem value="closed_lost">Closed Lost</SelectItem>
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
                <Label htmlFor="edit-closeDate">Expected Close Date</Label>
                <Input
                  id="edit-closeDate"
                  type="date"
                  value={editForm.closeDate.toISOString().split('T')[0]}
                  onChange={(e) => setEditForm({...editForm, closeDate: new Date(e.target.value)})}
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
              <Label htmlFor="edit-nextAction">Next Action</Label>
              <Input
                id="edit-nextAction"
                value={editForm.nextAction}
                onChange={(e) => setEditForm({...editForm, nextAction: e.target.value})}
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

  // Contract Modal (View Contract)
  if (modalType === 'contract') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Details - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Lead Info */}
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600">{lead.jobTitle}</p>
                <p className="text-sm text-gray-500">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(lead.status)}>
                    {getStatusIcon(lead.status)}
                    <span className="ml-1">{lead.status.replace('_', ' ')}</span>
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</div>
                <div className={`text-sm ${getProbabilityColor(lead.probability)}`}>
                  {lead.probability}% probability
                </div>
              </div>
            </div>

            {/* Contract Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b pb-2">Contract Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Type:</span>
                    <span className="font-medium">Enterprise Agreement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Value:</span>
                    <span className="font-medium text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-medium">Net 30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contract Length:</span>
                    <span className="font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{lead.closeDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b pb-2">Legal Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Legal Review:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Status:</span>
                    <Badge className="bg-blue-100 text-blue-800">Pending</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Signature Required:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority:</span>
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Contract Terms */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 border-b pb-2">Key Terms & Conditions</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• {lead.interests.join(', ')} solutions included</li>
                  <li>• Implementation support and training included</li>
                  <li>• 24/7 customer support for enterprise clients</li>
                  <li>• Data migration assistance provided</li>
                  <li>• Service level agreement (SLA) guaranteed</li>
                  <li>• Renewal option available at contract end</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>Close</Button>
              <Button variant="outline">Download Contract</Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <FileText className="h-4 w-4 mr-2" />
                Edit Contract
              </Button>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Schedule Call - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-red-50 p-3 rounded border border-red-200">
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

            {/* Call Details Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="call-purpose">Call Purpose</Label>
                <select id="call-purpose" className="w-full p-2 border rounded-md">
                  <option value="closing">Final Closing Call</option>
                  <option value="contract-review">Contract Review</option>
                  <option value="negotiation">Final Negotiation</option>
                  <option value="stakeholder">Stakeholder Meeting</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="call-date">Call Date & Time</Label>
                  <Input
                    id="call-date"
                    type="datetime-local"
                    defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                  />
                </div>
                <div>
                  <Label htmlFor="call-duration">Duration</Label>
                  <select id="call-duration" className="w-full p-2 border rounded-md">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="call-agenda">Call Agenda</Label>
                <Textarea
                  id="call-agenda"
                  placeholder="Key discussion points, contract terms to review, closing strategy..."
                  rows={3}
                  defaultValue={`Final closing discussion for ${lead.company} deal (₹${(lead.dealValue / 100000).toFixed(1)}L). Review contract terms, address final concerns, and coordinate signature process.`}
                />
              </div>

              {/* Deal Context */}
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-center gap-2 text-red-800 mb-2">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">Deal Context</span>
                </div>
                <div className="text-sm text-red-700 space-y-1">
                  <div>• Status: {lead.status.replace('_', ' ')}</div>
                  <div>• Close Date: {lead.closeDate.toLocaleDateString()}</div>
                  <div>• Decision Makers: {lead.decisionMakers.slice(0, 2).join(', ')}</div>
                  <div>• Next Action: {lead.nextAction}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Mark as Won Modal
  if (modalType === 'won') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Mark as Won - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Success Header */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Congratulations!</h3>
                  <p className="text-green-700">You're about to mark this deal as won.</p>
                </div>
              </div>
            </div>

            {/* Deal Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Deal Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Lead:</span>
                  <span className="ml-2 font-medium">{lead.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <span className="ml-2 font-medium">{lead.company}</span>
                </div>
                <div>
                  <span className="text-gray-600">Deal Value:</span>
                  <span className="ml-2 font-medium text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</span>
                </div>
                <div>
                  <span className="text-gray-600">Probability:</span>
                  <span className="ml-2 font-medium">{lead.probability}%</span>
                </div>
              </div>
            </div>

            {/* Win Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="final-value">Final Deal Value (₹)</Label>
                <Input
                  id="final-value"
                  type="number"
                  defaultValue={lead.dealValue}
                  placeholder="Final negotiated amount"
                />
              </div>

              <div>
                <Label htmlFor="close-date">Actual Close Date</Label>
                <Input
                  id="close-date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="win-reason">Primary Win Reason</Label>
                <select id="win-reason" className="w-full p-2 border rounded-md">
                  <option value="">Select win reason...</option>
                  <option value="best-product">Best Product Fit</option>
                  <option value="competitive-pricing">Competitive Pricing</option>
                  <option value="superior-features">Superior Features</option>
                  <option value="strong-relationship">Strong Relationship</option>
                  <option value="faster-implementation">Faster Implementation</option>
                  <option value="better-support">Better Support/Service</option>
                </select>
              </div>

              <div>
                <Label htmlFor="win-notes">Additional Notes</Label>
                <Textarea
                  id="win-notes"
                  placeholder="Key factors that led to winning this deal, lessons learned, next steps..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="referral-opportunity"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="referral-opportunity" className="text-sm">Referral Opportunity</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="upsell-potential"
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="upsell-potential" className="text-sm">Upsell Potential</Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  const updatedLead = {
                    ...lead,
                    status: 'closed_won' as any,
                    lastActivity: new Date()
                  };
                  onUpdate(updatedLead);
                  handleClose();
                }}
              >
                <Award className="h-4 w-4 mr-2" />
                Mark as Won
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Mark as Lost Modal
  if (modalType === 'lost') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Mark as Lost - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Loss Header */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Deal Lost</h3>
                  <p className="text-red-700">Please provide details about why this deal was lost.</p>
                </div>
              </div>
            </div>

            {/* Deal Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Deal Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Lead:</span>
                  <span className="ml-2 font-medium">{lead.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <span className="ml-2 font-medium">{lead.company}</span>
                </div>
                <div>
                  <span className="text-gray-600">Potential Value:</span>
                  <span className="ml-2 font-medium text-gray-600">₹{(lead.dealValue / 100000).toFixed(1)}L</span>
                </div>
                <div>
                  <span className="text-gray-600">Time in Pipeline:</span>
                  <span className="ml-2 font-medium">{Math.ceil((new Date().getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                </div>
              </div>
            </div>

            {/* Loss Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="loss-date">Actual Loss Date</Label>
                <Input
                  id="loss-date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="loss-reason">Primary Loss Reason</Label>
                <select id="loss-reason" className="w-full p-2 border rounded-md">
                  <option value="">Select loss reason...</option>
                  <option value="price-too-high">Price Too High</option>
                  <option value="feature-gaps">Feature Gaps</option>
                  <option value="timing-issues">Timing Issues</option>
                  <option value="budget-constraints">Budget Constraints</option>
                  <option value="competitor-won">Competitor Won</option>
                  <option value="internal-solution">Internal Solution</option>
                  <option value="project-cancelled">Project Cancelled</option>
                  <option value="decision-delayed">Decision Delayed</option>
                </select>
              </div>

              <div>
                <Label htmlFor="competitor">Competitor Who Won (if applicable)</Label>
                <select id="competitor" className="w-full p-2 border rounded-md">
                  <option value="">Select competitor...</option>
                  {lead.competitors.map((competitor) => (
                    <option key={competitor} value={competitor}>{competitor}</option>
                  ))}
                  <option value="internal">Internal Solution</option>
                  <option value="no-decision">No Decision Made</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="lessons-learned">Lessons Learned</Label>
                <Textarea
                  id="lessons-learned"
                  placeholder="What can we learn from this loss? What would we do differently next time?"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="future-opportunity">Future Opportunity</Label>
                <Textarea
                  id="future-opportunity"
                  placeholder="Any potential for future engagement? When might they reconsider?"
                  rows={2}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  const updatedLead = {
                    ...lead,
                    status: 'closed_lost' as any,
                    lastActivity: new Date()
                  };
                  onUpdate(updatedLead);
                  handleClose();
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Mark as Lost
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}