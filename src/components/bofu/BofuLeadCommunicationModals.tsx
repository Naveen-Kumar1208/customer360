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
  FileText,
  CheckCircle,
  Calendar,
  User,
  Clock,
  Target,
  Star,
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  AlertCircle,
  XCircle
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

interface BofuLeadCommunicationModalsProps {
  lead: BOFULead | null;
  modalType: 'call' | 'contract' | 'close' | null;
  onClose: () => void;
  onAction: (lead: BOFULead, action: string, data: any) => void;
}

export function BofuLeadCommunicationModals({
  lead,
  modalType,
  onClose,
  onAction
}: BofuLeadCommunicationModalsProps) {
  const [callData, setCallData] = useState({
    type: 'scheduled',
    purpose: 'closing',
    notes: '',
    scheduledTime: '',
    duration: '60'
  });
  
  const [contractData, setContractData] = useState({
    contractType: 'standard',
    dealValue: 0,
    paymentTerms: 'net-30',
    contractLength: '12-months',
    startDate: '',
    deliveryDate: '',
    specialTerms: '',
    notes: '',
    priority: 'high'
  });

  const [closeData, setCloseData] = useState({
    outcome: 'won',
    finalValue: 0,
    actualCloseDate: '',
    paymentTerms: 'net-30',
    contractLength: '12-months',
    winReason: '',
    lossReason: '',
    competitorWon: '',
    lessonsLearned: '',
    nextSteps: '',
    referralOpportunity: false,
    upsellPotential: false,
    customerSatisfaction: 5,
    salesRep: '',
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
        purpose: 'closing',
        notes: `Final closing call with ${lead.name} from ${lead.company}. Deal value: ₹${(lead.dealValue / 100000).toFixed(1)}L. Status: ${lead.status.replace('_', ' ')}.`,
        scheduledTime: '',
        duration: '60'
      });
    }
    if (lead && modalType === 'contract') {
      setContractData({
        contractType: 'standard',
        dealValue: lead.dealValue,
        paymentTerms: 'net-30',
        contractLength: '12-months',
        startDate: '',
        deliveryDate: '',
        specialTerms: `Contract for ${lead.company} - ${lead.interests.slice(0, 2).join(' and ')} solutions.`,
        notes: '',
        priority: 'high'
      });
    }
    if (lead && modalType === 'close') {
      setCloseData({
        outcome: 'won',
        finalValue: lead.dealValue,
        actualCloseDate: '',
        paymentTerms: 'net-30',
        contractLength: '12-months',
        winReason: '',
        lossReason: '',
        competitorWon: '',
        lessonsLearned: '',
        nextSteps: '',
        referralOpportunity: false,
        upsellPotential: false,
        customerSatisfaction: 5,
        salesRep: '',
        notes: ''
      });
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

  const handleCallAction = () => {
    if (lead) {
      onAction(lead, 'call', callData);
    }
    handleClose();
  };

  const handleContractAction = () => {
    if (lead) {
      onAction(lead, 'contract', contractData);
    }
    handleClose();
  };

  const handleCloseAction = () => {
    if (lead) {
      onAction(lead, 'close', closeData);
    }
    handleClose();
  };

  if (!lead) return null;

  // Call Modal
  if (modalType === 'call') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Call {lead.name} - BOFU
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
                  <SelectItem value="closing">Final Closing Call</SelectItem>
                  <SelectItem value="contract-review">Contract Review</SelectItem>
                  <SelectItem value="negotiation">Final Negotiation</SelectItem>
                  <SelectItem value="stakeholder-approval">Stakeholder Approval</SelectItem>
                  <SelectItem value="legal-clarification">Legal Clarification</SelectItem>
                  <SelectItem value="signature-coordination">Signature Coordination</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Deal Context */}
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">BOFU Deal Context</span>
              </div>
              <div className="text-sm text-red-700 space-y-1">
                <div>• Deal Value: ₹{(lead.dealValue / 100000).toFixed(1)}L ({lead.probability}% probability)</div>
                <div>• Status: {lead.status.replace('_', ' ')}</div>
                <div>• Close Date: {lead.closeDate.toLocaleDateString()}</div>
                <div>• Decision Makers: {lead.decisionMakers.slice(0, 2).join(', ')}</div>
                {lead.competitors.length > 0 && (
                  <div>• Competitors: {lead.competitors.join(', ')}</div>
                )}
              </div>
            </div>

            {/* Call Notes */}
            <div>
              <Label htmlFor="call-notes">Call Notes & Closing Strategy</Label>
              <Textarea
                id="call-notes"
                value={callData.notes}
                onChange={(e) => setCallData({...callData, notes: e.target.value})}
                placeholder="Closing strategy, final objections to address, contract terms to discuss..."
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCallAction} disabled={!lead.phone} className="bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                {callData.type === 'immediate' ? 'Start Call' : 'Schedule Call'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Contract Modal
  if (modalType === 'contract') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Management - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-red-50 p-3 rounded border border-red-200">
              <Building2 className="h-4 w-4" />
              <span>Contract for: {lead.name} at {lead.company}</span>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.replace('_', ' ')}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-blue-600" />
                <span className="font-medium text-blue-600">{lead.probability}% win rate</span>
              </div>
            </div>

            {/* Contract Type */}
            <div>
              <Label>Contract Type</Label>
              <Select 
                value={contractData.contractType} 
                onValueChange={(value) => setContractData({...contractData, contractType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Agreement</SelectItem>
                  <SelectItem value="enterprise">Enterprise Contract</SelectItem>
                  <SelectItem value="custom">Custom Contract</SelectItem>
                  <SelectItem value="pilot">Pilot Agreement</SelectItem>
                  <SelectItem value="msa">Master Service Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contract Value & Terms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contract-value">Contract Value (₹)</Label>
                <Input
                  id="contract-value"
                  type="number"
                  value={contractData.dealValue}
                  onChange={(e) => setContractData({...contractData, dealValue: Number.parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label>Payment Terms</Label>
                <Select 
                  value={contractData.paymentTerms} 
                  onValueChange={(value) => setContractData({...contractData, paymentTerms: value})}
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
            </div>

            {/* Contract Duration & Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contract Length</Label>
                <Select 
                  value={contractData.contractLength} 
                  onValueChange={(value) => setContractData({...contractData, contractLength: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-months">6 months</SelectItem>
                    <SelectItem value="12-months">12 months</SelectItem>
                    <SelectItem value="24-months">24 months</SelectItem>
                    <SelectItem value="36-months">36 months</SelectItem>
                    <SelectItem value="perpetual">Perpetual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority Level</Label>
                <Select 
                  value={contractData.priority} 
                  onValueChange={(value) => setContractData({...contractData, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Start & Delivery Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Contract Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={contractData.startDate}
                  onChange={(e) => setContractData({...contractData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="delivery-date">Expected Delivery</Label>
                <Input
                  id="delivery-date"
                  type="date"
                  value={contractData.deliveryDate}
                  onChange={(e) => setContractData({...contractData, deliveryDate: e.target.value})}
                />
              </div>
            </div>

            {/* Contract Preview */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Contract Summary</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Type: {contractData.contractType.replace('-', ' ')}</div>
                <div>• Value: ₹{(contractData.dealValue / 100000).toFixed(1)}L</div>
                <div>• Payment: {contractData.paymentTerms.replace('-', ' ')}</div>
                <div>• Duration: {contractData.contractLength.replace('-', ' ')}</div>
                <div>• Priority: {contractData.priority}</div>
              </div>
            </div>

            {/* Special Terms */}
            <div>
              <Label htmlFor="special-terms">Special Terms & Conditions</Label>
              <Textarea
                id="special-terms"
                value={contractData.specialTerms}
                onChange={(e) => setContractData({...contractData, specialTerms: e.target.value})}
                placeholder="Custom clauses, special conditions, warranty terms..."
                rows={3}
              />
            </div>

            {/* Contract Notes */}
            <div>
              <Label htmlFor="contract-notes">Contract Notes</Label>
              <Textarea
                id="contract-notes"
                value={contractData.notes}
                onChange={(e) => setContractData({...contractData, notes: e.target.value})}
                placeholder="Internal notes, legal requirements, approval needed..."
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleContractAction} className="bg-red-600 hover:bg-red-700">
                <FileText className="h-4 w-4 mr-2" />
                Prepare Contract
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Close Deal Modal
  if (modalType === 'close') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Close Deal - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Deal Outcome */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Target className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Deal Outcome</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    closeData.outcome === 'won' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCloseData({...closeData, outcome: 'won'})}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`h-6 w-6 ${closeData.outcome === 'won' ? 'text-green-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-semibold text-green-700">Deal Won</div>
                      <div className="text-sm text-gray-600">Successfully closed the deal</div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    closeData.outcome === 'lost' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setCloseData({...closeData, outcome: 'lost'})}
                >
                  <div className="flex items-center gap-3">
                    <XCircle className={`h-6 w-6 ${closeData.outcome === 'lost' ? 'text-red-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="font-semibold text-red-700">Deal Lost</div>
                      <div className="text-sm text-gray-600">Deal was not successful</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Deal Details</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="final-value">Final Deal Value (₹)</Label>
                  <Input
                    id="final-value"
                    type="number"
                    value={closeData.finalValue}
                    onChange={(e) => setCloseData({...closeData, finalValue: Number.parseInt(e.target.value) || 0})}
                    placeholder="250000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="close-date">Actual Close Date</Label>
                  <Input
                    id="close-date"
                    type="date"
                    value={closeData.actualCloseDate}
                    onChange={(e) => setCloseData({...closeData, actualCloseDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Win/Loss Specific Fields */}
            {closeData.outcome === 'won' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <h3 className="font-medium text-green-700">Won Deal Information</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="win-reason">Primary Win Reason</Label>
                    <Input
                      id="win-reason"
                      value={closeData.winReason}
                      onChange={(e) => setCloseData({...closeData, winReason: e.target.value})}
                      placeholder="Best product fit, competitive pricing..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-satisfaction">Customer Satisfaction (1-10)</Label>
                    <Input
                      id="customer-satisfaction"
                      type="number"
                      min="1"
                      max="10"
                      value={closeData.customerSatisfaction}
                      onChange={(e) => setCloseData({...closeData, customerSatisfaction: Number.parseInt(e.target.value) || 5})}
                      className="w-32"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="referral-opportunity"
                      checked={closeData.referralOpportunity}
                      onChange={(e) => setCloseData({...closeData, referralOpportunity: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="referral-opportunity" className="text-sm">Referral Opportunity</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="upsell-potential"
                      checked={closeData.upsellPotential}
                      onChange={(e) => setCloseData({...closeData, upsellPotential: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="upsell-potential" className="text-sm">Upsell Potential</Label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <h3 className="font-medium text-red-700">Lost Deal Information</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="loss-reason">Primary Loss Reason</Label>
                    <Input
                      id="loss-reason"
                      value={closeData.lossReason}
                      onChange={(e) => setCloseData({...closeData, lossReason: e.target.value})}
                      placeholder="Price too high, feature gaps..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="competitor-won">Competitor Who Won</Label>
                    <Input
                      id="competitor-won"
                      value={closeData.competitorWon}
                      onChange={(e) => setCloseData({...closeData, competitorWon: e.target.value})}
                      placeholder="CompetitorA, Internal solution..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Analysis & Next Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Analysis & Next Steps</h3>
              </div>
              
              <div>
                <Label htmlFor="lessons-learned">Lessons Learned</Label>
                <Textarea
                  id="lessons-learned"
                  value={closeData.lessonsLearned}
                  onChange={(e) => setCloseData({...closeData, lessonsLearned: e.target.value})}
                  placeholder="Key insights from this deal that can help with future opportunities..."
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="next-steps">Next Steps</Label>
                <Textarea
                  id="next-steps"
                  value={closeData.nextSteps}
                  onChange={(e) => setCloseData({...closeData, nextSteps: e.target.value})}
                  placeholder="Follow-up actions, future opportunities, or relationship maintenance..."
                  rows={2}
                />
              </div>
            </div>

            {/* Deal Summary */}
            <div className={`p-4 rounded-lg border ${
              closeData.outcome === 'won' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {closeData.outcome === 'won' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={`font-medium ${
                  closeData.outcome === 'won' ? 'text-green-800' : 'text-red-800'
                }`}>
                  Deal Summary
                </span>
              </div>
              <div className={`text-sm space-y-1 ${
                closeData.outcome === 'won' ? 'text-green-700' : 'text-red-700'
              }`}>
                <div>• Outcome: {closeData.outcome.toUpperCase()}</div>
                <div>• Final Value: ₹{(closeData.finalValue / 100000).toFixed(1)}L</div>
                <div>• Close Date: {closeData.actualCloseDate || 'Not set'}</div>
                {closeData.outcome === 'won' && closeData.winReason && (
                  <div>• Win Reason: {closeData.winReason}</div>
                )}
                {closeData.outcome === 'lost' && closeData.lossReason && (
                  <div>• Loss Reason: {closeData.lossReason}</div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleCloseAction} 
                className={closeData.outcome === 'won' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              >
                <Award className="h-4 w-4 mr-2" />
                Close Deal as {closeData.outcome === 'won' ? 'Won' : 'Lost'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}