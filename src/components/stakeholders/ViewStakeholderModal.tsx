"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Building2, Users, Calendar, Star } from "lucide-react";

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

interface ViewStakeholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholder: Stakeholder | null;
}

export default function ViewStakeholderModal({
  isOpen,
  onClose,
  stakeholder
}: ViewStakeholderModalProps) {
  if (!stakeholder) return null;

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

  const getInfluenceDescription = (influence: string) => {
    switch (influence) {
      case 'high': return 'Has significant decision-making authority and can strongly influence outcomes';
      case 'medium': return 'Has moderate influence and can impact decisions within their domain';
      case 'low': return 'Limited influence but may provide valuable insights or support';
      default: return '';
    }
  };

  const getRelationshipDescription = (relationship: string) => {
    switch (relationship) {
      case 'champion': return 'Actively advocates for your solution and helps drive adoption';
      case 'supporter': return 'Generally positive about your solution and willing to help';
      case 'neutral': return 'Neither strongly for nor against your solution';
      case 'blocker': return 'Opposes your solution or presents significant resistance';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Stakeholder Profile</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {stakeholder.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{stakeholder.name}</h2>
              <p className="text-lg text-gray-700 font-medium">{stakeholder.role}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{stakeholder.department} • {stakeholder.company}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">Key Contact</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{stakeholder.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{stakeholder.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Relationship Assessment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Relationship Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Influence Level</span>
                  <Badge className={getInfluenceColor(stakeholder.influence)}>
                    {stakeholder.influence} influence
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{getInfluenceDescription(stakeholder.influence)}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Relationship Type</span>
                  <Badge className={getRelationshipColor(stakeholder.relationship)}>
                    {stakeholder.relationship}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{getRelationshipDescription(stakeholder.relationship)}</p>
              </div>
            </div>
          </div>

          {/* Activity & Connections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Activity & Network</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Last Contact</p>
                  <p className="font-medium">{stakeholder.lastContact.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border rounded-lg">
                <Users className="h-8 w-8 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Network Connections</p>
                  <p className="font-medium">{stakeholder.connections.length} connections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connections List */}
          {stakeholder.connections.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Connected Stakeholders</h4>
              <div className="flex flex-wrap gap-2">
                {stakeholder.connections.map((connection, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {connection}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Strategy */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Recommended Engagement Strategy</h4>
            <p className="text-sm text-blue-800">
              {stakeholder.relationship === 'champion' && 'Leverage their advocacy to influence other stakeholders. Regular check-ins to maintain strong relationship.'}
              {stakeholder.relationship === 'supporter' && 'Continue nurturing the relationship. Provide them with materials to help advocate for your solution.'}
              {stakeholder.relationship === 'neutral' && 'Focus on understanding their concerns and demonstrating value. Schedule discovery calls to build rapport.'}
              {stakeholder.relationship === 'blocker' && 'Address their objections directly. Schedule one-on-one meetings to understand and mitigate their concerns.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}