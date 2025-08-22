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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  RefreshCw,
  Edit,
  Target,
  User,
  Mail,
  Building2,
  Star,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Send
} from "lucide-react";

interface ContactScore {
  id: string;
  name: string;
  company: string;
  email: string;
  overallScore: number;
  demographicScore: number;
  behavioralScore: number;
  engagementScore: number;
  intentScore: number;
  lastUpdated: Date;
  potentialValue: number;
  conversionProbability: number;
  factors: {
    positive: string[];
    negative: string[];
  };
}

interface ContactScoringActionModalsProps {
  contact: ContactScore | null;
  modalType: 'view' | 'recalculate' | 'adjust' | 'campaign' | null;
  onClose: () => void;
  onUpdate: (updatedContact: ContactScore) => void;
}

export function ContactScoringActionModals({
  contact,
  modalType,
  onClose,
  onUpdate
}: ContactScoringActionModalsProps) {
  const [adjustForm, setAdjustForm] = useState({
    demographicWeight: 25,
    behavioralWeight: 25,
    engagementWeight: 25,
    intentWeight: 25,
    customFactors: [] as string[]
  });
  
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    type: 'email',
    message: '',
    priority: 'normal'
  });

  // Store the active element when modal opens for focus restoration
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (modalType && contact) {
      // Store the currently focused element
      activeElementRef.current = document.activeElement as HTMLElement;
    }
  }, [modalType, contact]);

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
    if (contact && modalType === 'adjust') {
      setAdjustForm({
        demographicWeight: 25,
        behavioralWeight: 25,
        engagementWeight: 25,
        intentWeight: 25,
        customFactors: []
      });
    }
    if (contact && modalType === 'campaign') {
      setCampaignForm({
        name: `Campaign for ${contact.name}`,
        type: 'email',
        message: `Hi ${contact.name},\n\nBased on your profile and engagement, I wanted to reach out with a personalized offer.\n\nBest regards,`,
        priority: 'normal'
      });
    }
  }, [contact, modalType]);


  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleRecalculateSubmit = () => {
    if (contact) {
      // Simulate recalculation with small random changes
      const updatedContact = {
        ...contact,
        overallScore: Math.min(100, contact.overallScore + (Math.random() * 10 - 5)),
        demographicScore: Math.min(100, contact.demographicScore + (Math.random() * 8 - 4)),
        behavioralScore: Math.min(100, contact.behavioralScore + (Math.random() * 8 - 4)),
        engagementScore: Math.min(100, contact.engagementScore + (Math.random() * 8 - 4)),
        intentScore: Math.min(100, contact.intentScore + (Math.random() * 8 - 4)),
        lastUpdated: new Date()
      };
      onUpdate(updatedContact);
    }
    handleClose();
  };

  const handleAdjustSubmit = () => {
    // In a real app, this would recalculate scores based on new weights
    console.log('Adjusting scoring factors:', adjustForm);
    handleClose();
  };

  const handleCampaignSubmit = () => {
    // In a real app, this would create a new campaign
    console.log('Creating campaign:', campaignForm);
    handleClose();
  };

  if (!contact) return null;

  // View Details Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Contact Details - {contact.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{contact.name}</h2>
                <p className="text-gray-600">{contact.company}</p>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-lg font-bold ${getScoreColor(contact.overallScore)}`}>
                    {Math.round(contact.overallScore)} Score
                  </span>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Score Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Demographic</span>
                    <span className={`font-medium ${getScoreColor(contact.demographicScore)}`}>
                      {Math.round(contact.demographicScore)}%
                    </span>
                  </div>
                  <Progress value={contact.demographicScore} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Behavioral</span>
                    <span className={`font-medium ${getScoreColor(contact.behavioralScore)}`}>
                      {Math.round(contact.behavioralScore)}%
                    </span>
                  </div>
                  <Progress value={contact.behavioralScore} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Engagement</span>
                    <span className={`font-medium ${getScoreColor(contact.engagementScore)}`}>
                      {Math.round(contact.engagementScore)}%
                    </span>
                  </div>
                  <Progress value={contact.engagementScore} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Intent</span>
                    <span className={`font-medium ${getScoreColor(contact.intentScore)}`}>
                      {Math.round(contact.intentScore)}%
                    </span>
                  </div>
                  <Progress value={contact.intentScore} className="h-2" />
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Potential Value</p>
                    <p className="text-xl font-bold text-green-800">₹{(contact.potentialValue / 100000).toFixed(1)}L</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Conversion Probability</p>
                    <p className="text-xl font-bold text-blue-800">{contact.conversionProbability}%</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Positive Factors */}
            <div className="space-y-3">
              <h3 className="font-medium text-green-600">Positive Factors</h3>
              <div className="flex flex-wrap gap-2">
                {contact.factors.positive.map((factor) => (
                  <Badge key={factor} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {factor}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Risk Factors */}
            {contact.factors.negative.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-red-600">Risk Factors</h3>
                <div className="flex flex-wrap gap-2">
                  {contact.factors.negative.map((factor) => (
                    <Badge key={factor} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Last updated {contact.lastUpdated.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Recalculate Score Modal
  if (modalType === 'recalculate') {
    return (
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-500" />
              Recalculate Score
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will recalculate the scoring for <strong>{contact.name}</strong> based on their latest data and interactions.
              The process may take a few moments to complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRecalculateSubmit} className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Recalculate Score
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Adjust Factors Modal
  if (modalType === 'adjust') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Adjust Scoring Factors - {contact.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Adjust the weighting of different scoring factors for this contact. 
                All weights must add up to 100%.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Demographic Weight (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={adjustForm.demographicWeight}
                    onChange={(e) => setAdjustForm({...adjustForm, demographicWeight: Number.parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label>Behavioral Weight (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={adjustForm.behavioralWeight}
                    onChange={(e) => setAdjustForm({...adjustForm, behavioralWeight: Number.parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Engagement Weight (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={adjustForm.engagementWeight}
                    onChange={(e) => setAdjustForm({...adjustForm, engagementWeight: Number.parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label>Intent Weight (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={adjustForm.intentWeight}
                    onChange={(e) => setAdjustForm({...adjustForm, intentWeight: Number.parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center justify-between text-sm">
                  <span>Total Weight:</span>
                  <span className={`font-medium ${
                    (adjustForm.demographicWeight + adjustForm.behavioralWeight + 
                     adjustForm.engagementWeight + adjustForm.intentWeight) === 100 
                    ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {adjustForm.demographicWeight + adjustForm.behavioralWeight + 
                     adjustForm.engagementWeight + adjustForm.intentWeight}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button 
                onClick={handleAdjustSubmit}
                disabled={(adjustForm.demographicWeight + adjustForm.behavioralWeight + 
                          adjustForm.engagementWeight + adjustForm.intentWeight) !== 100}
              >
                <Settings className="h-4 w-4 mr-2" />
                Apply Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Create Campaign Modal
  if (modalType === 'campaign') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Create Campaign - {contact.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Target: {contact.name} ({contact.company})</span>
              <span className={`text-sm font-medium ${getScoreColor(contact.overallScore)}`}>Score: {Math.round(contact.overallScore)}</span>
            </div>

            <div>
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select value={campaignForm.type} onValueChange={(value) => setCampaignForm({...campaignForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="phone">Phone Outreach</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="direct">Direct Mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="campaign-priority">Priority</Label>
                <Select value={campaignForm.priority} onValueChange={(value) => setCampaignForm({...campaignForm, priority: value})}>
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
              <Label htmlFor="campaign-message">Message Template</Label>
              <Textarea
                id="campaign-message"
                value={campaignForm.message}
                onChange={(e) => setCampaignForm({...campaignForm, message: e.target.value})}
                rows={6}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCampaignSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}