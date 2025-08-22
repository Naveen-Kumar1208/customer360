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
  AlertCircle,
  Plus,
  X
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

interface AddTofuLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<TOFULead, 'id' | 'createdAt' | 'lastActivity'>) => void;
  existingLeads: TOFULead[];
}

export function AddTofuLeadModal({ 
  isOpen, 
  onClose, 
  onAddLead,
  existingLeads 
}: AddTofuLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    status: "new" as const,
    score: 65,
    interests: [] as string[],
    location: "",
    jobTitle: "",
    companySize: "",
    industry: ""
  });

  const [interestInput, setInterestInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sources = [
    "Website Form",
    "LinkedIn Campaign",
    "Google Ads",
    "Facebook Ads",
    "Content Download",
    "Webinar Registration",
    "Trade Show",
    "Cold Email",
    "Referral",
    "Social Media",
    "SEO/Organic",
    "Direct Traffic"
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Consulting",
    "Real Estate",
    "Marketing",
    "Legal",
    "Non-profit",
    "Government",
    "Other"
  ];

  const companySizes = [
    "1-10",
    "11-50",
    "51-100",
    "101-500",
    "501-1000",
    "1000+"
  ];

  const commonInterests = [
    "Software Solutions",
    "Cloud Migration",
    "Automation",
    "Digital Transformation",
    "Business Intelligence",
    "Analytics",
    "Reporting",
    "Process Optimization",
    "Cost Reduction",
    "Productivity",
    "Security",
    "Compliance",
    "Integration",
    "Scalability"
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

    if (formData.phone && !formData.phone.match(/^[\+]?[\d\s\-\(\)]+$/)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.source) {
      newErrors.source = "Lead source is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
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
        score: Math.max(1, Math.min(100, formData.score)) // Ensure score is between 1-100
      });
      
      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        source: "",
        status: "new",
        score: 65,
        interests: [],
        location: "",
        jobTitle: "",
        companySize: "",
        industry: ""
      });
      setInterestInput("");
      setErrors({});
      onClose();
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New TOFU Lead
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
                  placeholder="John Doe"
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
                  placeholder="Marketing Director"
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
                  placeholder="TechCorp Inc"
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
                      <SelectItem key={industry} value={industry.toLowerCase()}>
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
                  placeholder="San Francisco, CA"
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
                  placeholder="john@techcorp.com"
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
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.phone}
                  </p>
                )}
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
                <Label htmlFor="status">Initial Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="nurturing">Nurturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="score">Lead Score (1-100)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="score"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.score}
                    onChange={(e) => handleInputChange('score', Number.parseInt(e.target.value) || 65)}
                    className="w-20"
                  />
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className={`font-medium ${getScoreColor(formData.score)}`}>
                      {formData.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Target className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Interests & Pain Points</h3>
            </div>
            
            {/* Quick Add Common Interests */}
            <div>
              <Label className="text-sm">Quick Add Common Interests</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonInterests.filter(interest => !formData.interests.includes(interest)).slice(0, 8).map((interest) => (
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
                placeholder="Add custom interest or pain point..."
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
                  {formData.status}
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
              <div>Industry: {formData.industry || "Not specified"}</div>
              <div>Source: {formData.source || "Not specified"}</div>
              <div>Interests: {formData.interests.length} added</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add TOFU Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}