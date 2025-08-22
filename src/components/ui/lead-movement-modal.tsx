"use client";

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, CheckCircle, X, DollarSign } from 'lucide-react';

interface LeadMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  actionType: string;
  destination: string;
  sourceStage?: string;
  onSubmit: (data: {
    notes: string;
    leadType?: string;
    prospectValue?: number;
    reason?: string;
  }) => void;
}

export const LeadMovementModal: React.FC<LeadMovementModalProps> = ({
  isOpen,
  onClose,
  leadName,
  actionType,
  destination,
  sourceStage,
  onSubmit
}) => {
  const [notes, setNotes] = useState('');
  const [leadType, setLeadType] = useState('');
  const [prospectValue, setProspectValue] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Check if this is a qualification move (TOFU→MOFU or MOFU→BOFU)
  const isQualificationMove = (sourceStage === 'TOFU' && destination === 'MOFU') || 
                              (sourceStage === 'MOFU' && destination === 'BOFU');

  // Reset modal state
  const resetModal = () => {
    setNotes('');
    setLeadType('');
    setProspectValue('');
    setReason('');
    setError('');
    setIsSubmitting(false);
    setShowSuccess(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Handle close
  const handleClose = () => {
    resetModal();
    onClose();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!notes.trim()) {
      setError('Please provide notes for moving this lead');
      return;
    }
    
    if (notes.trim().length < 10) {
      setError('Please provide more detailed notes (at least 10 characters)');
      return;
    }

    // Additional validation for qualification moves
    if (isQualificationMove) {
      if (!leadType) {
        setError('Please select a lead type (MQL or SQL)');
        return;
      }
      
      if (!reason.trim()) {
        setError('Please provide a reason for this qualification');
        return;
      }
      
      if (prospectValue && (isNaN(Number(prospectValue)) || Number(prospectValue) < 0)) {
        setError('Please enter a valid prospect value');
        return;
      }
    }

    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const submissionData = {
        notes: notes.trim(),
        ...(isQualificationMove && {
          leadType,
          prospectValue: prospectValue ? Number(prospectValue) : undefined,
          reason: reason.trim()
        })
      };
      
      onSubmit(submissionData);
      setShowSuccess(true);
      
      // Auto-close after success animation
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, 2000);
      
    } catch (error) {
      setError('Failed to move lead. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting && !showSuccess) {
      handleClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting && !showSuccess) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting, showSuccess]);

  // Reset modal when it opens
  useEffect(() => {
    if (isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Ensure body scroll is restored
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto my-8 animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {showSuccess ? (
          // Success View
          <div className="flex flex-col items-center justify-center py-8 px-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
            <p className="text-sm text-gray-600 text-center">
              {leadName} has been {destination.toLowerCase() === 'customer' ? 'converted to a customer' : `moved to ${destination}`}
            </p>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        ) : (
          // Form View
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-6">
              <h2 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                {isQualificationMove ? 'Qualify & Move Lead' : 'Move Lead'}
              </h2>
              <p className="text-sm text-gray-600">
                You are about to {destination.toLowerCase() === 'customer' ? 'convert' : 'move'} <strong>{leadName}</strong> 
                {destination.toLowerCase() === 'customer' ? ' to a customer' : ` to ${destination}`}.
                {isQualificationMove ? ' Please provide qualification details below.' : 
                 ` Please provide ${destination.toLowerCase() === 'customer' ? 'conversion details' : 'a reason for this action'}.`}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Lead Type Selection for TOFU→MOFU and MOFU→BOFU */}
              {isQualificationMove && (
                <div className="space-y-5 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-blue-900 flex items-center">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-2">1</div>
                      Lead Qualification Type <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <RadioGroup 
                      value={leadType} 
                      onValueChange={(value) => {
                        setLeadType(value);
                        if (error) setError('');
                      }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                        <RadioGroupItem value="MQL" id="mql" disabled={isSubmitting} />
                        <div>
                          <Label htmlFor="mql" className="text-sm font-medium text-gray-900 cursor-pointer">
                            MQL (Marketing Qualified Lead)
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">Shows interest, meets basic criteria</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors">
                        <RadioGroupItem value="SQL" id="sql" disabled={isSubmitting} />
                        <div>
                          <Label htmlFor="sql" className="text-sm font-medium text-gray-900 cursor-pointer">
                            SQL (Sales Qualified Lead)
                          </Label>
                          <p className="text-xs text-gray-600 mt-1">Ready for sales engagement</p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prospectValue" className="text-sm font-semibold text-blue-900 flex items-center">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs mr-2">2</div>
                        <DollarSign className="w-4 h-4 mr-1" />
                        Prospect Value
                      </Label>
                      <Input
                        id="prospectValue"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="e.g., 50000"
                        value={prospectValue}
                        onChange={(e) => {
                          setProspectValue(e.target.value);
                          if (error) setError('');
                        }}
                        className="w-full"
                        disabled={isSubmitting}
                      />
                      <p className="text-xs text-blue-700">
                        Optional: Estimated deal value
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-sm font-semibold text-blue-900 flex items-center">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs mr-2">3</div>
                        Qualification Reason <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Why is this lead qualified? (e.g., 'Has budget and authority', 'Expressed strong interest')..."
                        value={reason}
                        onChange={(e) => {
                          setReason(e.target.value);
                          if (error) setError('');
                        }}
                        className="min-h-[100px] resize-none"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Section */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  {isQualificationMove ? 'Additional Notes' : destination.toLowerCase() === 'customer' ? 'Conversion Notes' : 'Movement Notes'} <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder={isQualificationMove 
                    ? "Any additional context, next steps, or important details..."
                    : destination.toLowerCase() === 'customer' 
                    ? "Describe the sale/conversion (e.g., 'Contract signed for enterprise package')..." 
                    : "Please explain why you are moving this lead..."}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value);
                    if (error) setError('');
                  }}
                  className={`min-h-[100px] resize-none ${error ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoFocus={!isQualificationMove}
                />
                <p className="text-xs text-gray-500">
                  Minimum 10 characters required
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !notes.trim() || (isQualificationMove && (!leadType || !reason.trim()))}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Moving...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};