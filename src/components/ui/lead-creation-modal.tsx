"use client";

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building, Briefcase, MapPin, Globe, Plus, X } from 'lucide-react';

interface LeadCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: any) => void;
  stage: 'TOFU' | 'MOFU';
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  industry: string;
  location: string;
  website: string;
  source: string;
  notes: string;
  interests: string[];
  leadScore: number;
  budget: string;
  timeline: string;
}

const initialFormData: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  title: '',
  industry: '',
  location: '',
  website: '',
  source: '',
  notes: '',
  interests: [],
  leadScore: 0,
  budget: '',
  timeline: '',
};

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 
  'Education', 'Real Estate', 'Consulting', 'Media', 'Other'
];

const sources = [
  'Website Form', 'Social Media', 'Email Campaign', 'Referral', 
  'Cold Outreach', 'Trade Show', 'Webinar', 'Content Download', 'Other'
];

const interestOptions = [
  'Product Demo', 'Pricing Information', 'Case Studies', 'Technical Documentation',
  'Implementation Support', 'Training', 'Integration', 'Custom Solutions'
];

const budgetRanges = [
  'Under $10k', '$10k - $50k', '$50k - $100k', '$100k - $500k', '$500k+'
];

const timelines = [
  'Immediate (0-30 days)', 'Short-term (1-3 months)', 'Medium-term (3-6 months)', 
  'Long-term (6+ months)', 'Not defined'
];

export function LeadCreationModal({ isOpen, onClose, onSubmit, stage }: LeadCreationModalProps) {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [newInterest, setNewInterest] = useState('');

  const handleInputChange = (field: keyof LeadFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSelectInterest = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in required fields: Name, Email, and Company');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const leadData = {
      ...formData,
      id: `${stage.toLowerCase()}-${Date.now()}`,
      stage: stage,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
    };

    onSubmit(leadData);
    setFormData(initialFormData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setNewInterest('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Create New {stage} Lead
          </DialogTitle>
          <DialogDescription>
            Add a new lead to the {stage === 'TOFU' ? 'Top of Funnel (Awareness)' : 'Middle of Funnel (Engagement)'} stage.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Company *
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Acme Corporation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                Job Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Marketing Manager"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="New York, NY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Company Website
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://company.com"
              />
            </div>
          </div>

          {/* Lead Source */}
          <div className="space-y-2">
            <Label htmlFor="source">Lead Source</Label>
            <Select value={formData.source} onValueChange={(value) => handleInputChange('source', value)}>
              <SelectTrigger>
                <SelectValue placeholder="How did you find this lead?" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* MOFU Specific Fields */}
          {stage === 'MOFU' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Decision Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="leadScore">Lead Score (0-100)</Label>
                <Input
                  id="leadScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.leadScore}
                  onChange={(e) => handleInputChange('leadScore', Number.parseInt(e.target.value) || 0)}
                  placeholder="75"
                />
              </div>
            </div>
          )}

          {/* Interests */}
          <div className="space-y-3">
            <Label>Areas of Interest</Label>
            
            {/* Quick Select Interests */}
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Button
                  key={interest}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectInterest(interest)}
                  disabled={formData.interests.includes(interest)}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {interest}
                </Button>
              ))}
            </div>

            {/* Custom Interest Input */}
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add custom interest..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              />
              <Button type="button" onClick={handleAddInterest} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Selected Interests */}
            {formData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-500" 
                      onClick={() => handleRemoveInterest(interest)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional information about this lead..."
              rows={3}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create {stage} Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}