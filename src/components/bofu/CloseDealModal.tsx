"use client";

import React, { useState } from "react";
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
  Award,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  FileText,
  User,
  Building2,
  AlertCircle,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";

interface CloseDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloseDeal: (dealData: any) => void;
}

export function CloseDealModal({ 
  isOpen, 
  onClose, 
  onCloseDeal 
}: CloseDealModalProps) {
  const [dealData, setDealData] = useState({
    outcome: 'won', // 'won' or 'lost'
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
    renewalDate: '',
    customerSatisfaction: 5,
    salesRep: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const winReasons = [
    'Best Product Fit',
    'Competitive Pricing',
    'Superior Features',
    'Strong Relationship',
    'Faster Implementation',
    'Better Support/Service',
    'Existing Partnership',
    'Technical Superiority',
    'Brand Trust',
    'Custom Solution',
    'Integration Capabilities',
    'Proven ROI'
  ];

  const lossReasons = [
    'Price Too High',
    'Feature Gaps',
    'Timing Issues',
    'Budget Constraints',
    'Competitor Won',
    'Internal Solution',
    'Project Cancelled',
    'Decision Delayed',
    'Not a Priority',
    'Technical Issues',
    'Support Concerns',
    'Implementation Complexity'
  ];

  const paymentTermsOptions = [
    'net-15',
    'net-30', 
    'net-60',
    'advance-50',
    'advance-100',
    'milestone',
    'monthly',
    'quarterly',
    'annual'
  ];

  const contractLengthOptions = [
    '6-months',
    '12-months',
    '24-months',
    '36-months',
    'month-to-month',
    'perpetual'
  ];

  const competitors = [
    'CompetitorA',
    'CompetitorB', 
    'CompetitorC',
    'CompetitorD',
    'CompetitorE',
    'Internal Solution',
    'No Decision',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!dealData.finalValue || dealData.finalValue <= 0) {
      newErrors.finalValue = "Final deal value is required";
    }

    if (!dealData.actualCloseDate) {
      newErrors.actualCloseDate = "Actual close date is required";
    }

    if (dealData.outcome === 'won') {
      if (!dealData.winReason) {
        newErrors.winReason = "Win reason is required for won deals";
      }
      if (!dealData.paymentTerms) {
        newErrors.paymentTerms = "Payment terms are required for won deals";
      }
      if (!dealData.contractLength) {
        newErrors.contractLength = "Contract length is required for won deals";
      }
    } else if (dealData.outcome === 'lost') {
      if (!dealData.lossReason) {
        newErrors.lossReason = "Loss reason is required for lost deals";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setDealData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCloseDeal(dealData);
      
      // Reset form
      setDealData({
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
        renewalDate: '',
        customerSatisfaction: 5,
        salesRep: '',
        notes: ''
      });
      setErrors({});
      onClose();
    }
  };

  const getRenewalDate = () => {
    if (!dealData.actualCloseDate || !dealData.contractLength) return '';
    
    const closeDate = new Date(dealData.actualCloseDate);
    const months = Number.parseInt(dealData.contractLength.split('-')[0]) || 12;
    closeDate.setMonth(closeDate.getMonth() + months);
    
    return closeDate.toISOString().split('T')[0];
  };

  React.useEffect(() => {
    if (dealData.outcome === 'won' && dealData.actualCloseDate && dealData.contractLength) {
      setDealData(prev => ({ ...prev, renewalDate: getRenewalDate() }));
    }
  }, [dealData.actualCloseDate, dealData.contractLength, dealData.outcome]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Close Deal
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
                  dealData.outcome === 'won' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('outcome', 'won')}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-6 w-6 ${dealData.outcome === 'won' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-semibold text-green-700">Deal Won</div>
                    <div className="text-sm text-gray-600">Successfully closed the deal</div>
                  </div>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  dealData.outcome === 'lost' 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleInputChange('outcome', 'lost')}
              >
                <div className="flex items-center gap-3">
                  <XCircle className={`h-6 w-6 ${dealData.outcome === 'lost' ? 'text-red-600' : 'text-gray-400'}`} />
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
                <Label htmlFor="final-value">Final Deal Value (₹) *</Label>
                <Input
                  id="final-value"
                  type="number"
                  value={dealData.finalValue}
                  onChange={(e) => handleInputChange('finalValue', Number.parseInt(e.target.value) || 0)}
                  placeholder="250000"
                  className={errors.finalValue ? "border-red-500" : ""}
                />
                {errors.finalValue && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.finalValue}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="close-date">Actual Close Date *</Label>
                <Input
                  id="close-date"
                  type="date"
                  value={dealData.actualCloseDate}
                  onChange={(e) => handleInputChange('actualCloseDate', e.target.value)}
                  className={errors.actualCloseDate ? "border-red-500" : ""}
                />
                {errors.actualCloseDate && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.actualCloseDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Won Deal Details */}
          {dealData.outcome === 'won' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h3 className="font-medium text-green-700">Won Deal Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="win-reason">Primary Win Reason *</Label>
                  <Select 
                    value={dealData.winReason} 
                    onValueChange={(value) => handleInputChange('winReason', value)}
                  >
                    <SelectTrigger className={errors.winReason ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select win reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {winReasons.map(reason => (
                        <SelectItem key={reason} value={reason.toLowerCase().replace(/\s+/g, '-')}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.winReason && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.winReason}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="payment-terms">Payment Terms *</Label>
                  <Select 
                    value={dealData.paymentTerms} 
                    onValueChange={(value) => handleInputChange('paymentTerms', value)}
                  >
                    <SelectTrigger className={errors.paymentTerms ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTermsOptions.map(term => (
                        <SelectItem key={term} value={term}>
                          {term.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.paymentTerms && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.paymentTerms}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contract-length">Contract Length *</Label>
                  <Select 
                    value={dealData.contractLength} 
                    onValueChange={(value) => handleInputChange('contractLength', value)}
                  >
                    <SelectTrigger className={errors.contractLength ? "border-red-500" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contractLengthOptions.map(length => (
                        <SelectItem key={length} value={length}>
                          {length.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.contractLength && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.contractLength}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="renewal-date">Renewal Date</Label>
                  <Input
                    id="renewal-date"
                    type="date"
                    value={dealData.renewalDate}
                    onChange={(e) => handleInputChange('renewalDate', e.target.value)}
                    className="bg-gray-50"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="referral-opportunity"
                    checked={dealData.referralOpportunity}
                    onChange={(e) => handleInputChange('referralOpportunity', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="referral-opportunity" className="text-sm">Referral Opportunity</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="upsell-potential"
                    checked={dealData.upsellPotential}
                    onChange={(e) => handleInputChange('upsellPotential', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="upsell-potential" className="text-sm">Upsell Potential</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="customer-satisfaction">Customer Satisfaction (1-10)</Label>
                <Input
                  id="customer-satisfaction"
                  type="number"
                  min="1"
                  max="10"
                  value={dealData.customerSatisfaction}
                  onChange={(e) => handleInputChange('customerSatisfaction', Number.parseInt(e.target.value) || 5)}
                  className="w-32"
                />
              </div>
            </div>
          )}

          {/* Lost Deal Details */}
          {dealData.outcome === 'lost' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <XCircle className="h-4 w-4 text-red-500" />
                <h3 className="font-medium text-red-700">Lost Deal Information</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loss-reason">Primary Loss Reason *</Label>
                  <Select 
                    value={dealData.lossReason} 
                    onValueChange={(value) => handleInputChange('lossReason', value)}
                  >
                    <SelectTrigger className={errors.lossReason ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select loss reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {lossReasons.map(reason => (
                        <SelectItem key={reason} value={reason.toLowerCase().replace(/\s+/g, '-')}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.lossReason && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.lossReason}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="competitor-won">Competitor Who Won</Label>
                  <Select 
                    value={dealData.competitorWon} 
                    onValueChange={(value) => handleInputChange('competitorWon', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select competitor" />
                    </SelectTrigger>
                    <SelectContent>
                      {competitors.map(competitor => (
                        <SelectItem key={competitor} value={competitor.toLowerCase().replace(/\s+/g, '-')}>
                          {competitor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                value={dealData.lessonsLearned}
                onChange={(e) => handleInputChange('lessonsLearned', e.target.value)}
                placeholder="Key insights from this deal that can help with future opportunities..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="next-steps">Next Steps</Label>
              <Textarea
                id="next-steps"
                value={dealData.nextSteps}
                onChange={(e) => handleInputChange('nextSteps', e.target.value)}
                placeholder="Follow-up actions, future opportunities, or relationship maintenance..."
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="sales-rep">Sales Representative</Label>
              <Input
                id="sales-rep"
                value={dealData.salesRep}
                onChange={(e) => handleInputChange('salesRep', e.target.value)}
                placeholder="Primary sales representative"
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={dealData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional context or important details..."
                rows={3}
              />
            </div>
          </div>

          {/* Deal Summary */}
          <div className={`p-4 rounded-lg border ${
            dealData.outcome === 'won' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {dealData.outcome === 'won' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <span className={`font-medium ${
                dealData.outcome === 'won' ? 'text-green-800' : 'text-red-800'
              }`}>
                Deal Summary
              </span>
            </div>
            <div className={`text-sm space-y-1 ${
              dealData.outcome === 'won' ? 'text-green-700' : 'text-red-700'
            }`}>
              <div>• Outcome: {dealData.outcome.toUpperCase()}</div>
              <div>• Final Value: ₹{(dealData.finalValue / 100000).toFixed(1)}L</div>
              <div>• Close Date: {dealData.actualCloseDate || 'Not set'}</div>
              {dealData.outcome === 'won' && dealData.winReason && (
                <div>• Win Reason: {dealData.winReason.replace('-', ' ')}</div>
              )}
              {dealData.outcome === 'lost' && dealData.lossReason && (
                <div>• Loss Reason: {dealData.lossReason.replace('-', ' ')}</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className={dealData.outcome === 'won' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              <Award className="h-4 w-4 mr-2" />
              Close Deal as {dealData.outcome === 'won' ? 'Won' : 'Lost'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}