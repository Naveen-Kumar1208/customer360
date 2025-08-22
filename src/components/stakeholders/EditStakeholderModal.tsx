"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Building2, Mail, Phone, Save, X } from "lucide-react";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  department: string;
  influence: "high" | "medium" | "low";
  relationship: "champion" | "supporter" | "neutral" | "blocker";
  email: string;
  phone: string;
  lastContact: Date;
  connections: string[];
}

interface EditStakeholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholder: Stakeholder | null;
  onUpdate: (stakeholder: Stakeholder) => void;
}

export default function EditStakeholderModal({
  isOpen,
  onClose,
  stakeholder,
  onUpdate
}: EditStakeholderModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    department: "",
    email: "",
    phone: "",
    influence: "medium" as "high" | "medium" | "low",
    relationship: "neutral" as "champion" | "supporter" | "neutral" | "blocker",
    notes: ""
  });

  useEffect(() => {
    if (stakeholder) {
      setFormData({
        name: stakeholder.name,
        role: stakeholder.role,
        company: stakeholder.company,
        department: stakeholder.department,
        email: stakeholder.email,
        phone: stakeholder.phone,
        influence: stakeholder.influence,
        relationship: stakeholder.relationship,
        notes: ""
      });
    }
  }, [stakeholder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stakeholder) return;

    const updatedStakeholder = {
      ...stakeholder,
      ...formData
    };

    onUpdate(updatedStakeholder);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'champion': return 'bg-green-100 text-green-800';
      case 'supporter': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'blocker': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!stakeholder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5" />
            <span>Edit Stakeholder</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Stakeholder Info */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {stakeholder.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{stakeholder.name}</h3>
              <p className="text-sm text-gray-600">{stakeholder.role} • {stakeholder.company}</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Job Title *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g., Chief Technology Officer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Company name"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  placeholder="e.g., Technology, Sales, Finance"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@company.com"
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Relationship & Influence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Relationship Assessment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="influence">Influence Level</Label>
                <Select value={formData.influence} onValueChange={(value) => handleInputChange("influence", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Influence</SelectItem>
                    <SelectItem value="medium">Medium Influence</SelectItem>
                    <SelectItem value="low">Low Influence</SelectItem>
                  </SelectContent>
                </Select>
                <Badge className={getInfluenceColor(formData.influence)}>
                  {formData.influence} influence
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship Type</Label>
                <Select value={formData.relationship} onValueChange={(value) => handleInputChange("relationship", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="champion">Champion</SelectItem>
                    <SelectItem value="supporter">Supporter</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="blocker">Blocker</SelectItem>
                  </SelectContent>
                </Select>
                <Badge className={getRelationshipColor(formData.relationship)}>
                  {formData.relationship}
                </Badge>
              </div>
            </div>
          </div>

          {/* Update Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Update Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add notes about this update..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Stakeholder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}