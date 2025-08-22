"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Tag,
  DollarSign,
  Star,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus
} from "lucide-react";
import { type Customer, useLeads } from "@/contexts/LeadContext";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  source: string;
  segment: string;
  tier: 'bronze' | 'silver' | 'gold' | 'premium';
  status: 'active' | 'inactive';
  tags: string[];
  totalSpent: number;
  orderCount: number;
  lifetimeValue: number;
  registrationDate: string;
  lastLogin: string;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { customers, addCustomer } = useLeads();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTag, setCurrentTag] = useState("");

  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    source: 'Direct',
    segment: 'Standard',
    tier: 'bronze',
    status: 'active',
    tags: [],
    totalSpent: 0,
    orderCount: 0,
    lifetimeValue: 0,
    registrationDate: new Date().toISOString().split('T')[0],
    lastLogin: new Date().toISOString().split('T')[0]
  });

  const sourceOptions = [
    'Direct', 'Website', 'Social Media', 'Email Campaign', 
    'Referral', 'Search Engine', 'Advertisement', 'Event', 'Other'
  ];

  const segmentOptions = [
    'Standard', 'Premium', 'Enterprise', 'VIP', 'New', 'Returning', 'At Risk'
  ];

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        source: 'Direct',
        segment: 'Standard',
        tier: 'bronze',
        status: 'active',
        tags: [],
        totalSpent: 0,
        orderCount: 0,
        lifetimeValue: 0,
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      setShowSuccess(false);
      setActiveTab("basic");
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic Information Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (customers.some(c => c.email.toLowerCase() === formData.email.toLowerCase())) {
      newErrors.email = 'A customer with this email already exists';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Business Logic Validation
    if (formData.totalSpent < 0) {
      newErrors.totalSpent = 'Total spent cannot be negative';
    }
    if (formData.orderCount < 0) {
      newErrors.orderCount = 'Order count cannot be negative';
    }
    if (formData.lifetimeValue < 0) {
      newErrors.lifetimeValue = 'Lifetime value cannot be negative';
    }
    if (formData.orderCount > 0 && formData.totalSpent === 0) {
      newErrors.totalSpent = 'Total spent should be greater than 0 if order count > 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create new customer object
      const newCustomer: Customer = {
        id: `CUST-${Date.now()}`,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        status: formData.status,
        tier: formData.tier,
        registrationDate: formData.registrationDate,
        lastLogin: formData.lastLogin,
        totalSpent: formData.totalSpent,
        orderCount: formData.orderCount,
        lifetimeValue: formData.lifetimeValue || (formData.totalSpent * 1.5), // Auto-calculate if not provided
        location: formData.location.trim(),
        source: formData.source,
        segment: formData.segment,
        tags: formData.tags
      };

      // Add customer to context
      addCustomer(newCustomer);

      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error creating customer:', error);
      setErrors({ submit: 'Failed to create customer. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      handleClose();
    }
  };

  if (!isOpen) return null;

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#e85b5e]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Add New Customer</h2>
              <p className="text-sm text-muted-foreground">Create a new customer profile</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#e85b5e] focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {showSuccess ? (
          // Success View
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Created Successfully!</h3>
            <p className="text-sm text-gray-600 text-center">
              {formData.firstName} {formData.lastName} has been added to your customer database.
            </p>
          </div>
        ) : (
          // Form View
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="business">Business Details</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences & Tags</TabsTrigger>
                </TabsList>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <TabsContent value="basic" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
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
                            className={errors.firstName ? 'border-red-500' : ''}
                            placeholder="Enter first name"
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={errors.lastName ? 'border-red-500' : ''}
                            placeholder="Enter last name"
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="customer@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                            placeholder="City, State, Country"
                          />
                        </div>
                        {errors.location && (
                          <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="business" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Business & Financial Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="source">Customer Source</Label>
                          <select
                            id="source"
                            value={formData.source}
                            onChange={(e) => handleInputChange('source', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {sourceOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="segment">Customer Segment</Label>
                          <select
                            id="segment"
                            value={formData.segment}
                            onChange={(e) => handleInputChange('segment', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {segmentOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="tier">Customer Tier</Label>
                          <select
                            id="tier"
                            value={formData.tier}
                            onChange={(e) => handleInputChange('tier', e.target.value as any)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                            <option value="premium">Premium</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="status">Account Status</Label>
                          <select
                            id="status"
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value as any)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="totalSpent">Total Spent ($)</Label>
                          <Input
                            id="totalSpent"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.totalSpent}
                            onChange={(e) => handleInputChange('totalSpent', Number.parseFloat(e.target.value) || 0)}
                            className={errors.totalSpent ? 'border-red-500' : ''}
                            placeholder="0.00"
                          />
                          {errors.totalSpent && (
                            <p className="text-sm text-red-600 mt-1">{errors.totalSpent}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="orderCount">Order Count</Label>
                          <Input
                            id="orderCount"
                            type="number"
                            min="0"
                            value={formData.orderCount}
                            onChange={(e) => handleInputChange('orderCount', Number.parseInt(e.target.value) || 0)}
                            className={errors.orderCount ? 'border-red-500' : ''}
                            placeholder="0"
                          />
                          {errors.orderCount && (
                            <p className="text-sm text-red-600 mt-1">{errors.orderCount}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="lifetimeValue">Lifetime Value ($)</Label>
                          <Input
                            id="lifetimeValue"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.lifetimeValue}
                            onChange={(e) => handleInputChange('lifetimeValue', Number.parseFloat(e.target.value) || 0)}
                            className={errors.lifetimeValue ? 'border-red-500' : ''}
                            placeholder="Auto-calculated if empty"
                          />
                          {errors.lifetimeValue && (
                            <p className="text-sm text-red-600 mt-1">{errors.lifetimeValue}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="registrationDate">Registration Date</Label>
                          <Input
                            id="registrationDate"
                            type="date"
                            value={formData.registrationDate}
                            onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastLogin">Last Login</Label>
                          <Input
                            id="lastLogin"
                            type="date"
                            value={formData.lastLogin}
                            onChange={(e) => handleInputChange('lastLogin', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5" />
                        Tags & Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="tags">Customer Tags</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            id="currentTag"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            placeholder="Enter a tag"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          />
                          <Button type="button" onClick={addTag} variant="outline" size="icon">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add tags to categorize and organize customers
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Form Actions */}
                <div className="flex justify-between pt-6 border-t">
                  <div className="flex gap-2">
                    {activeTab !== "basic" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const tabs = ["basic", "business", "preferences"];
                          const currentIndex = tabs.indexOf(activeTab);
                          if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                        }}
                      >
                        Previous
                      </Button>
                    )}
                    {activeTab !== "preferences" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const tabs = ["basic", "business", "preferences"];
                          const currentIndex = tabs.indexOf(activeTab);
                          if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
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
                      disabled={isSubmitting}
                      className="bg-[#e85b5e] hover:bg-[#c7494c]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating Customer...
                        </div>
                      ) : (
                        'Create Customer'
                      )}
                    </Button>
                  </div>
                </div>

                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.submit}
                    </p>
                  </div>
                )}
              </form>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};