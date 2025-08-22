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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  DollarSign,
  Calendar,
  User,
  FileText,
  AlertCircle,
  Plus,
  X
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  status: "active" | "inactive" | "pending";
  contractValue: number;
  contractEnd: Date;
  performance: number;
  services: string[];
}

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVendor: (vendor: Omit<Vendor, 'id'>) => void;
  existingVendors: Vendor[];
}

export function AddVendorModal({ 
  isOpen, 
  onClose, 
  onAddVendor,
  existingVendors 
}: AddVendorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    status: "pending" as const,
    contractValue: 0,
    contractEnd: "",
    performance: 85,
    services: [] as string[],
    notes: ""
  });

  const [serviceInput, setServiceInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    "Software Development",
    "Data Analytics",
    "Cloud Services",
    "Marketing & Advertising",
    "Consulting",
    "IT Support",
    "Security Services",
    "Design & Creative",
    "Financial Services",
    "Legal Services",
    "HR & Recruitment",
    "Logistics & Supply Chain"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vendor name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }

    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !formData.phone.match(/^[\+]?[\d\s\-\(\)]+$/)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.website && !formData.website.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
      newErrors.website = "Please enter a valid website URL";
    }

    if (formData.contractValue < 0) {
      newErrors.contractValue = "Contract value cannot be negative";
    }

    if (!formData.contractEnd) {
      newErrors.contractEnd = "Contract end date is required";
    } else {
      const endDate = new Date(formData.contractEnd);
      const today = new Date();
      if (endDate <= today) {
        newErrors.contractEnd = "Contract end date must be in the future";
      }
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

  const handleAddService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        services: [...prev.services, serviceInput.trim()] 
      }));
      setServiceInput("");
    }
  };

  const handleRemoveService = (service: string) => {
    setFormData(prev => ({ 
      ...prev, 
      services: prev.services.filter(s => s !== service) 
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddVendor({
        ...formData,
        contractEnd: new Date(formData.contractEnd),
      });
      
      // Reset form
      setFormData({
        name: "",
        category: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        location: "",
        status: "pending",
        contractValue: 0,
        contractEnd: "",
        performance: 85,
        services: [],
        notes: ""
      });
      setServiceInput("");
      setErrors({});
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Vendor
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Building2 className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vendor-name">Vendor Name *</Label>
                <Input
                  id="vendor-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="TechSolutions Inc"
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
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-person">Contact Person *</Label>
                <Input
                  id="contact-person"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="John Smith"
                  className={errors.contactPerson ? "border-red-500" : ""}
                />
                {errors.contactPerson && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.contactPerson}
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
                  placeholder="john@techsolutions.com"
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

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="www.techsolutions.com"
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.website}
                </p>
              )}
            </div>
          </div>

          {/* Contract Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <FileText className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Contract Details</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="inactive">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        Inactive
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="contract-value">Contract Value (₹)</Label>
                <Input
                  id="contract-value"
                  type="number"
                  value={formData.contractValue}
                  onChange={(e) => handleInputChange('contractValue', Number.parseInt(e.target.value) || 0)}
                  placeholder="250000"
                  className={errors.contractValue ? "border-red-500" : ""}
                />
                {errors.contractValue && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.contractValue}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="contract-end">Contract End Date *</Label>
                <Input
                  id="contract-end"
                  type="date"
                  value={formData.contractEnd}
                  onChange={(e) => handleInputChange('contractEnd', e.target.value)}
                  className={errors.contractEnd ? "border-red-500" : ""}
                />
                {errors.contractEnd && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.contractEnd}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="performance">Expected Performance (%)</Label>
              <Input
                id="performance"
                type="number"
                min="0"
                max="100"
                value={formData.performance}
                onChange={(e) => handleInputChange('performance', Number.parseInt(e.target.value) || 85)}
                placeholder="85"
              />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <User className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Services Offered</h3>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                placeholder="Add a service..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddService()}
              />
              <Button type="button" onClick={handleAddService} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {formData.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.services.map((service) => (
                  <Badge key={service} variant="outline" className="flex items-center gap-1">
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Preview</span>
              <Badge className={getStatusColor(formData.status)}>
                {formData.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Vendor: {formData.name || "Not specified"}</div>
              <div>Category: {formData.category || "Not specified"}</div>
              <div>Contact: {formData.contactPerson || "Not specified"}</div>
              <div>Services: {formData.services.length} added</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}