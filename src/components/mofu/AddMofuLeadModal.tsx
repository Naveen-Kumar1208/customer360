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
  UserPlus,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Star,
  Target,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  X
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

interface AddMofuLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<MOFULead, 'id' | 'createdAt' | 'lastActivity'>) => void;
  existingLeads: MOFULead[];
}

export function AddMofuLeadModal({ 
  isOpen, 
  onClose, 
  onAddLead,
  existingLeads 
}: AddMofuLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "evaluating" as const,
    score: 75,
    dealValue: 50000,
    probability: 50,
    nextAction: "",
    nextActionDate: "",
    interests: [] as string[],
    location: "",
    jobTitle: "",
    companySize: "",
    industry: "",
    engagementLevel: 60
  });

  const [interestInput, setInterestInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sources = [
    "TOFU Promotion",
    "Demo Request",
    "Referral",
    "Website Contact",
    "Sales Outreach",
    "Event Follow-up",
    "Partner Referral",
    "Content Download",
    "Webinar Attendee",
    "Trial User"
  ];

  const industries = [
    "Financial Services",
    "Technology",
    "Healthcare",
    "Manufacturing",
    "Retail",
    "Education",
    "Consulting",
    "Real Estate",
    "Marketing",
    "Legal",
    "Non-profit",
    "Government"
  ];

  const companySizes = [
    "50-100",
    "100-500",
    "500-1000",
    "1000-5000",
    "5000+"
  ];

  const statuses = [
    { value: "evaluating", label: "Evaluating" },
    { value: "demo_requested", label: "Demo Requested" },
    { value: "proposal_sent", label: "Proposal Sent" },
    { value: "negotiating", label: "Negotiating" },
    { value: "ready_to_close", label: "Ready to Close" }
  ];

  const commonInterests = [
    "Enterprise Software",
    "Integration",
    "Security",
    "Automation",
    "Workflow",
    "Productivity",
    "Process Optimization",
    "Cost Reduction",
    "Scalability",
    "Analytics",
    "Reporting",
    "Compliance"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.source) {
      newErrors.source = "Lead source is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    if (formData.dealValue < 0) {
      newErrors.dealValue = "Deal value cannot be negative";
    }

    if (!formData.nextAction.trim()) {
      newErrors.nextAction = "Next action is required";
    }

    if (!formData.nextActionDate) {
      newErrors.nextActionDate = "Next action date is required";
    }

    // Check for duplicate email
    if (formData.email && existingLeads.some(lead => lead.email === formData.email)) {
      newErrors.email = "A lead with this email already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddInterest = (interest?: string) => {
    const interestToAdd = interest || interestInput.trim();
    if (interestToAdd && !formData.interests.includes(interestToAdd)) {
      setFormData(prev => ({ 
        ...prev, 
        interests: [...prev.interests, interestToAdd] 
      }));
      if (!interest) {
        setInterestInput("");
      }
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({ 
      ...prev, 
      interests: prev.interests.filter(i => i !== interest) 
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddLead({
        ...formData,
        nextActionDate: new Date(formData.nextActionDate),
        score: Math.max(1, Math.min(100, formData.score)),
        probability: Math.max(0, Math.min(100, formData.probability)),
        engagementLevel: Math.max(0, Math.min(100, formData.engagementLevel))
      });
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        source: "",
        status: "evaluating",
        score: 75,
        dealValue: 50000,
        probability: 50,
        nextAction: "",
        nextActionDate: "",
        interests: [],
        location: "",
        jobTitle: "",
        companySize: "",
        industry: "",
        engagementLevel: 60
      });
      setInterestInput("");
      setErrors({});
      onClose();
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New MOFU Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <User className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lead-name">Full Name *</Label>
                <Input
                  id="lead-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="David Wilson"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="IT Director"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Building2 className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Company Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enterprise Solutions Co"
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.company}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.industry}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company-size">Company Size</Label>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map(size => (
                      <SelectItem key={size} value={size}>
                        {size} employees
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Chicago, IL"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Mail className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="david@enterprisesolutions.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Deal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Deal Information</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="deal-value">Deal Value (₹)</Label>
                <Input
                  id="deal-value"
                  type="number"
                  value={formData.dealValue}
                  onChange={(e) => handleInputChange('dealValue', Number.parseInt(e.target.value) || 0)}
                  placeholder="150000"
                  className={errors.dealValue ? "border-red-500" : ""}
                />
                {errors.dealValue && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.dealValue}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="probability">Win Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', Number.parseInt(e.target.value) || 0)}
                  placeholder="75"
                />
              </div>
              
              <div>
                <Label htmlFor="engagement-level">Engagement Level (%)</Label>
                <Input
                  id="engagement-level"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.engagementLevel}
                  onChange={(e) => handleInputChange('engagementLevel', Number.parseInt(e.target.value) || 0)}
                  placeholder="80"
                />
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Star className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Lead Details</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="source">Lead Source *</Label>
                <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
                  <SelectTrigger className={errors.source ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {sources.map(source => (
                      <SelectItem key={source} value={source.toLowerCase().replace(/\s+/g, '-')}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.source && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.source}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="score">Lead Score (1-100)</Label>
                <Input
                  id="score"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.score}
                  onChange={(e) => handleInputChange('score', Number.parseInt(e.target.value) || 75)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Next Action */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Target className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Next Action</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="next-action">Next Action *</Label>
                <Input
                  id="next-action"
                  value={formData.nextAction}
                  onChange={(e) => handleInputChange('nextAction', e.target.value)}
                  placeholder="Follow up on proposal"
                  className={errors.nextAction ? "border-red-500" : ""}
                />
                {errors.nextAction && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.nextAction}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="next-action-date">Next Action Date *</Label>
                <Input
                  id="next-action-date"
                  type="date"
                  value={formData.nextActionDate}
                  onChange={(e) => handleInputChange('nextActionDate', e.target.value)}
                  className={errors.nextActionDate ? "border-red-500" : ""}
                />
                {errors.nextActionDate && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.nextActionDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Target className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Interests & Requirements</h3>
            </div>
            
            {/* Quick Add Common Interests */}
            <div>
              <Label className="text-sm">Quick Add Common Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonInterests.filter(interest => !formData.interests.includes(interest)).slice(0, 6).map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddInterest(interest)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Custom Interest Input */}
            <div className="flex gap-2">
              <Input
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="Add custom interest or requirement..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
              />
              <Button type="button" onClick={() => handleAddInterest()} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {/* Selected Interests */}
            {formData.interests.length > 0 && (
              <div>
                <Label className="text-sm">Selected Interests</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="flex items-center gap-1">
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(interest)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Preview</span>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(formData.status)}>
                  {formData.status.replace('_', ' ')}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className={`text-sm font-medium ${getScoreColor(formData.score)}`}>
                    {formData.score}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Lead: {formData.name || "Not specified"}</div>
              <div>Company: {formData.company || "Not specified"}</div>
              <div>Deal Value: ₹{(formData.dealValue / 100000).toFixed(1)}L</div>
              <div>Win Probability: {formData.probability}%</div>
              <div>Industry: {formData.industry || "Not specified"}</div>
              <div>Source: {formData.source || "Not specified"}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add MOFU Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}