"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Save,
  Calendar,
  MapPin,
  Activity,
  Target,
  DollarSign
} from 'lucide-react';

interface CustomerJourney {
  id: string;
  customer: any;
  currentStage: string;
  journeyScore: number;
  totalValue: number;
  timeInJourney: number;
  stages: any[];
  milestones: any[];
  nextBestAction: any;
}

interface JourneyUpdateStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  journey: CustomerJourney;
}

const journeyStages = [
  { value: 'awareness', label: 'Awareness', description: 'Customer first discovers the brand' },
  { value: 'consideration', label: 'Consideration', description: 'Evaluating solutions and options' },
  { value: 'purchase', label: 'Purchase', description: 'Making the purchase decision' },
  { value: 'onboarding', label: 'Onboarding', description: 'Getting started with the product/service' },
  { value: 'adoption', label: 'Adoption', description: 'Regular usage and feature exploration' },
  { value: 'expansion', label: 'Expansion', description: 'Upgrading or purchasing additional products' },
  { value: 'advocacy', label: 'Advocacy', description: 'Referring others and providing testimonials' }
];

const stageStatuses = [
  { value: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
];

const actionPriorities = [
  { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' }
];

export const JourneyUpdateStageModal: React.FC<JourneyUpdateStageModalProps> = ({
  isOpen,
  onClose,
  journey
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    currentStage: journey.currentStage,
    stageStatus: journey.stages.find(s => s.id === journey.currentStage)?.status || 'in_progress',
    stageNotes: '',
    nextAction: journey.nextBestAction.action,
    actionPriority: journey.nextBestAction.priority,
    expectedOutcome: journey.nextBestAction.expectedOutcome,
    targetDate: '',
    touchpoints: [] as string[],
    newTouchpoint: '',
    stageValue: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStageData = journeyStages.find(s => s.value === formData.currentStage);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTouchpoint = () => {
    if (formData.newTouchpoint.trim()) {
      setFormData(prev => ({
        ...prev,
        touchpoints: [...prev.touchpoints, prev.newTouchpoint.trim()],
        newTouchpoint: ''
      }));
    }
  };

  const handleRemoveTouchpoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      touchpoints: prev.touchpoints.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentStage) newErrors.currentStage = 'Stage is required';
    if (!formData.stageStatus) newErrors.stageStatus = 'Status is required';
    if (!formData.nextAction.trim()) newErrors.nextAction = 'Next action is required';
    if (!formData.actionPriority) newErrors.actionPriority = 'Priority is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSaving) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stage Updated!</h3>
            <p className="text-sm text-gray-600 text-center">
              Customer journey stage has been updated successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {journey.customer.firstName.charAt(0)}{journey.customer.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Update Journey Stage</h2>
              <p className="text-gray-600">{journey.customer.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Current Journey Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Current Journey Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Stage:</span>
                    <p className="font-medium">{journey.currentStage}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Journey Score:</span>
                    <p className="font-medium">{Math.round(journey.journeyScore)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Time in Journey:</span>
                    <p className="font-medium">{journey.timeInJourney} days</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Value:</span>
                    <p className="font-medium">₹{journey.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stage Update Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Update Stage Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentStage">Journey Stage *</Label>
                    <Select value={formData.currentStage} onValueChange={(value) => handleInputChange('currentStage', value)}>
                      <SelectTrigger className={errors.currentStage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select stage..." />
                      </SelectTrigger>
                      <SelectContent>
                        {journeyStages.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>
                            <div>
                              <div className="font-medium">{stage.label}</div>
                              <div className="text-xs text-gray-500">{stage.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.currentStage && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.currentStage}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stageStatus">Stage Status *</Label>
                    <Select value={formData.stageStatus} onValueChange={(value) => handleInputChange('stageStatus', value)}>
                      <SelectTrigger className={errors.stageStatus ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select status..." />
                      </SelectTrigger>
                      <SelectContent>
                        {stageStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center gap-2">
                              <Badge className={status.color}>{status.label}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.stageStatus && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.stageStatus}
                      </p>
                    )}
                  </div>
                </div>

                {currentStageData && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">{currentStageData.label}</h4>
                    <p className="text-sm text-blue-700">{currentStageData.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetDate">Target Completion Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => handleInputChange('targetDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stageValue">Stage Value (₹)</Label>
                    <Input
                      id="stageValue"
                      type="number"
                      value={formData.stageValue}
                      onChange={(e) => handleInputChange('stageValue', e.target.value)}
                      placeholder="Enter value if applicable"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stageNotes">Stage Notes</Label>
                  <Textarea
                    id="stageNotes"
                    value={formData.stageNotes}
                    onChange={(e) => handleInputChange('stageNotes', e.target.value)}
                    placeholder="Add notes about this stage update..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Touchpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Stage Touchpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={formData.newTouchpoint}
                    onChange={(e) => handleInputChange('newTouchpoint', e.target.value)}
                    placeholder="Add a touchpoint (e.g., Email Campaign, Sales Call)"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTouchpoint()}
                  />
                  <Button onClick={handleAddTouchpoint} variant="outline">
                    Add
                  </Button>
                </div>

                {formData.touchpoints.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.touchpoints.map((touchpoint, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {touchpoint}
                        <button
                          onClick={() => handleRemoveTouchpoint(index)}
                          className="ml-2 hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Best Action */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Next Best Action
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nextAction">Action Description *</Label>
                  <Input
                    id="nextAction"
                    value={formData.nextAction}
                    onChange={(e) => handleInputChange('nextAction', e.target.value)}
                    placeholder="Describe the next best action..."
                    className={errors.nextAction ? 'border-red-500' : ''}
                  />
                  {errors.nextAction && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.nextAction}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actionPriority">Priority *</Label>
                  <Select value={formData.actionPriority} onValueChange={(value) => handleInputChange('actionPriority', value)}>
                    <SelectTrigger className={errors.actionPriority ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select priority..." />
                    </SelectTrigger>
                    <SelectContent>
                      {actionPriorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={priority.color}>{priority.label}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.actionPriority && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.actionPriority}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedOutcome">Expected Outcome</Label>
                  <Textarea
                    id="expectedOutcome"
                    value={formData.expectedOutcome}
                    onChange={(e) => handleInputChange('expectedOutcome', e.target.value)}
                    placeholder="Describe the expected outcome of this action..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Stage
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};