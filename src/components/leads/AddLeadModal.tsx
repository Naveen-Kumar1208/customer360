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
  Globe,
  MapPin,
  DollarSign,
  Star,
  Tag,
  AlertCircle,
  Plus,
  X,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  location?: string;
  value: number;
  source: string;
  stage: string;
  score: number;
  tags: string[];
  notes?: string;
  createdAt: Date;
  lastActivity: Date;
}

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastActivity'>) => void;
  existingLeads: Lead[];
}

export function AddLeadModal({ 
  isOpen, 
  onClose, 
  onAddLead,
  existingLeads 
}: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    website: "",
    location: "",
    value: 0,
    source: "",
    stage: "tofu",
    score: 75,
    tags: [] as string[],
    notes: "",
    facebook: "",
    instagram: "",
    linkedin: ""
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sources = [
    "Website",
    "LinkedIn",
    "Cold Email",
    "Referral",
    "Event",
    "Social Media",
    "Advertisement",
    "Webinar",
    "Content Marketing",
    "Direct Mail",
    "Phone Call",
    "Partner"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Lead name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (formData.primaryEmail && !formData.primaryEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.primaryEmail = "Please enter a valid primary email address";
    }

    if (formData.secondaryEmail && !formData.secondaryEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.secondaryEmail = "Please enter a valid secondary email address";
    }

    if (formData.primaryPhone && !formData.primaryPhone.match(/^[\+]?[\d\s\-\(\)]+$/)) {
      newErrors.primaryPhone = "Please enter a valid primary phone number";
    }

    if (formData.secondaryPhone && !formData.secondaryPhone.match(/^[\+]?[\d\s\-\(\)]+$/)) {
      newErrors.secondaryPhone = "Please enter a valid secondary phone number";
    }

    if (formData.website && !formData.website.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
      newErrors.website = "Please enter a valid website URL";
    }

    if (formData.value < 0) {
      newErrors.value = "Lead value cannot be negative";
    }

    if (!formData.source) {
      newErrors.source = "Lead source is required";
    }

    // Check for duplicate primary email
    if (formData.primaryEmail && existingLeads.some(lead => lead.email === formData.primaryEmail)) {
      newErrors.primaryEmail = "A lead with this primary email already exists";
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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()] 
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tag) 
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
        primaryEmail: "",
        secondaryEmail: "",
        primaryPhone: "",
        secondaryPhone: "",
        website: "",
        location: "",
        value: 0,
        source: "",
        stage: "tofu",
        score: 75,
        tags: [],
        notes: "",
        facebook: "",
        instagram: "",
        linkedin: ""
      });
      setTagInput("");
      setErrors({});
      onClose();
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'tofu': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mofu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bofu': return 'bg-green-100 text-green-800 border-green-200';
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
            Add New Lead
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
                <Label htmlFor="lead-name">Lead Name *</Label>
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
                <Label htmlFor="company">Company *</Label>
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
                <Label htmlFor="primaryEmail">Primary Email Address</Label>
                <Input
                  id="primaryEmail"
                  type="email"
                  value={formData.primaryEmail}
                  onChange={(e) => handleInputChange('primaryEmail', e.target.value)}
                  placeholder="john@techcorp.com"
                  className={errors.primaryEmail ? "border-red-500" : ""}
                />
                {errors.primaryEmail && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.primaryEmail}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="secondaryEmail">Secondary Email Address</Label>
                <Input
                  id="secondaryEmail"
                  type="email"
                  value={formData.secondaryEmail}
                  onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                  placeholder="john.personal@gmail.com"
                  className={errors.secondaryEmail ? "border-red-500" : ""}
                />
                {errors.secondaryEmail && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.secondaryEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="primaryPhone">Primary Phone Number</Label>
                <Input
                  id="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.primaryPhone ? "border-red-500" : ""}
                />
                {errors.primaryPhone && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.primaryPhone}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="secondaryPhone">Secondary Phone Number</Label>
                <Input
                  id="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                  placeholder="+1 (555) 987-6543"
                  className={errors.secondaryPhone ? "border-red-500" : ""}
                />
                {errors.secondaryPhone && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.secondaryPhone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.techcorp.com"
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.website}
                  </p>
                )}
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

            {/* Social Media Profiles */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <Globe className="h-4 w-4 text-gray-500" />
                Social Media Profiles
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange('facebook', e.target.value)}
                      placeholder="Facebook profile URL"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="Instagram profile URL"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="LinkedIn profile URL"
                      className="pl-9"
                    />
                  </div>
                </div>
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
                <Label htmlFor="value">Lead Value (₹)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', Number.parseInt(e.target.value) || 0)}
                  placeholder="50000"
                  className={errors.value ? "border-red-500" : ""}
                />
                {errors.value && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.value}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="source">Source *</Label>
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
                <Label htmlFor="stage">Initial Stage</Label>
                <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tofu">TOFU - Awareness</SelectItem>
                    <SelectItem value="mofu">MOFU - Consideration</SelectItem>
                    <SelectItem value="bofu">BOFU - Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  onChange={(e) => handleInputChange('score', Number.parseInt(e.target.value) || 75)}
                  className="w-32"
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

          {/* Tags */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Tag className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Tags</h3>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Building2 className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Notes</h3>
            </div>
            
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional information about this lead..."
                rows={3}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Preview</span>
              <div className="flex items-center gap-2">
                <Badge className={getStageColor(formData.stage)}>
                  {formData.stage.toUpperCase()}
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
              <div>Value: {formData.value ? `₹${formData.value.toLocaleString()}` : "₹0"}</div>
              <div>Source: {formData.source || "Not specified"}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}