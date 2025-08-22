"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserPlus, 
  X,
  Building2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Target,
  Calendar,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

interface AddNewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded?: (leadData: any) => void;
}

interface LeadFormData {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
  company: string;
  designation: string;
  leadSource: string;
  funnelStage: string;
  potentialValue: string;
  notes: string;
  priority: string;
  assignedTo: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

const leadSources = [
  'Website',
  'LinkedIn',
  'Cold Email',
  'Referral',
  'Social Media',
  'Conference',
  'Webinar',
  'Google Ads',
  'Other'
];

const funnelStages = [
  { value: 'TOFU', label: 'TOFU (Top of Funnel)' },
  { value: 'MOFU', label: 'MOFU (Middle of Funnel)' },
  { value: 'BOFU', label: 'BOFU (Bottom of Funnel)' }
];

const priorities = [
  { value: 'high', label: 'High Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'low', label: 'Low Priority' }
];

const assignedUsers = [
  'Self Assign',
  'John Smith',
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Wilson'
];

export const AddNewLeadModal: React.FC<AddNewLeadModalProps> = ({
  isOpen,
  onClose,
  onLeadAdded
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    primaryEmail: '',
    secondaryEmail: '',
    primaryPhone: '',
    secondaryPhone: '',
    company: '',
    designation: '',
    leadSource: '',
    funnelStage: '',
    potentialValue: '',
    notes: '',
    priority: '',
    assignedTo: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.primaryEmail.trim()) newErrors.primaryEmail = 'Primary email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryEmail)) {
      newErrors.primaryEmail = 'Please enter a valid primary email address';
    }
    if (formData.secondaryEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.secondaryEmail)) {
      newErrors.secondaryEmail = 'Please enter a valid secondary email address';
    }
    if (!formData.primaryPhone.trim()) newErrors.primaryPhone = 'Primary phone number is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.leadSource) newErrors.leadSource = 'Lead source is required';
    if (!formData.funnelStage) newErrors.funnelStage = 'Funnel stage is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create lead/contact object with proper Contact interface structure
      const newLeadData = {
        id: `contact_${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.primaryEmail,
        phone: formData.primaryPhone,
        secondaryEmail: formData.secondaryEmail,
        secondaryPhone: formData.secondaryPhone,
        company: formData.company,
        designation: formData.designation || 'Unknown',
        industry: 'Technology', // Default value, could be made dynamic later
        location: 'Mumbai, Maharashtra', // Default value, could be made dynamic later
        source: (() => {
          const sourceMap: Record<string, 'manual' | 'import' | 'lusha' | 'apollo' | 'linkedin' | 'referral'> = {
            'website': 'manual',
            'linkedin': 'linkedin', 
            'cold email': 'manual',
            'referral': 'referral',
            'social media': 'manual',
            'conference': 'manual',
            'webinar': 'manual',
            'google ads': 'manual',
            'other': 'manual'
          };
          return sourceMap[formData.leadSource?.toLowerCase() || ''] || 'manual';
        })(),
        score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100 for new leads
        stage: (() => {
          switch(formData.funnelStage) {
            case 'TOFU': return 'prospect';
            case 'MOFU': return 'lead';
            case 'BOFU': return 'opportunity';
            default: return 'prospect';
          }
        })(),
        tags: [
          formData.priority, 
          formData.funnelStage, 
          'New Lead',
          ...(formData.potentialValue && Number.parseInt(formData.potentialValue) > 500000 ? ['High Value'] : [])
        ].filter(Boolean),
        socialProfiles: {
          linkedin: formData.linkedin,
          twitter: '',
          facebook: formData.facebook,
          instagram: formData.instagram
        },
        enrichmentData: {
          companySize: 'Unknown',
          revenue: 'Unknown',
          verified: false,
          lastEnriched: new Date()
        },
        activities: [
          {
            id: `activity_${Date.now()}`,
            type: 'note' as const,
            title: 'Lead Created',
            description: `New lead created via form. ${formData.notes ? `Notes: ${formData.notes}` : ''}`,
            timestamp: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedAgent: formData.assignedTo || 'agent_001',
        // Additional lead-specific fields for compatibility
        leadSource: formData.leadSource,
        funnelStage: formData.funnelStage,
        potentialValue: formData.potentialValue ? Number.parseInt(formData.potentialValue) : 0,
        priority: formData.priority
      };

      // Call the callback if provided
      if (onLeadAdded) {
        onLeadAdded(newLeadData);
      }
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          primaryEmail: '',
          secondaryEmail: '',
          primaryPhone: '',
          secondaryPhone: '',
          company: '',
          designation: '',
          leadSource: '',
          funnelStage: '',
          potentialValue: '',
          notes: '',
          priority: '',
          assignedTo: '',
          facebook: '',
          instagram: '',
          linkedin: ''
        });
      }, 2000);
      
    } catch (error) {
      console.error('Failed to create lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lead Created Successfully!</h3>
            <p className="text-sm text-gray-600 text-center">
              The new lead has been added to your pipeline and assigned to the selected team member.
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
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Add New Lead</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryEmail">Primary Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="primaryEmail"
                        type="email"
                        value={formData.primaryEmail}
                        onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                        placeholder="Enter primary email address"
                        className={`pl-10 ${errors.primaryEmail ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.primaryEmail && (
                      <p className="text-sm text-red-600 mt-1">{errors.primaryEmail}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="secondaryEmail">Secondary Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="secondaryEmail"
                        type="email"
                        value={formData.secondaryEmail}
                        onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                        placeholder="Enter secondary email address"
                        className={`pl-10 ${errors.secondaryEmail ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.secondaryEmail && (
                      <p className="text-sm text-red-600 mt-1">{errors.secondaryEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryPhone">Primary Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="primaryPhone"
                        value={formData.primaryPhone}
                        onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                        placeholder="Enter primary phone number"
                        className={`pl-10 ${errors.primaryPhone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.primaryPhone && (
                      <p className="text-sm text-red-600 mt-1">{errors.primaryPhone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="secondaryPhone">Secondary Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="secondaryPhone"
                        value={formData.secondaryPhone}
                        onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                        placeholder="Enter secondary phone number"
                        className={`pl-10 ${errors.secondaryPhone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.secondaryPhone && (
                      <p className="text-sm text-red-600 mt-1">{errors.secondaryPhone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter company name"
                      className={errors.company ? 'border-red-500' : ''}
                    />
                    {errors.company && (
                      <p className="text-sm text-red-600 mt-1">{errors.company}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Enter job title"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Social Media Profiles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook Profile</Label>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) => handleInputChange('facebook', e.target.value)}
                        placeholder="Facebook profile URL"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram Profile</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="Instagram profile URL"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="LinkedIn profile URL"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lead Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Lead Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leadSource">Lead Source *</Label>
                    <Select value={formData.leadSource} onValueChange={(value) => handleInputChange('leadSource', value)}>
                      <SelectTrigger className={errors.leadSource ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadSources.map((source) => (
                          <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.leadSource && (
                      <p className="text-sm text-red-600 mt-1">{errors.leadSource}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="funnelStage">Funnel Stage *</Label>
                    <Select value={formData.funnelStage} onValueChange={(value) => handleInputChange('funnelStage', value)}>
                      <SelectTrigger className={errors.funnelStage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select funnel stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {funnelStages.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.funnelStage && (
                      <p className="text-sm text-red-600 mt-1">{errors.funnelStage}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger className={errors.priority ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="text-sm text-red-600 mt-1">{errors.priority}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="potentialValue">Potential Value (₹)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="potentialValue"
                        type="number"
                        value={formData.potentialValue}
                        onChange={(e) => handleInputChange('potentialValue', e.target.value)}
                        placeholder="Enter potential value"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange('assignedTo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignedUsers.map((user) => (
                        <SelectItem key={user} value={user}>{user}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Add any additional notes about this lead..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Lead...
                  </div>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Lead
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};