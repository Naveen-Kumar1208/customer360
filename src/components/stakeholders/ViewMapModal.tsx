"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Users, Building2, TrendingUp } from "lucide-react";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  department: string;
  influence: "high" | "medium" | "low";
  relationship: "champion" | "supporter" | "neutral" | "blocker";
  connections: string[];
}

interface ViewMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholders: Stakeholder[];
}

export default function ViewMapModal({
  isOpen,
  onClose,
  stakeholders
}: ViewMapModalProps) {
  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'champion': return 'bg-green-500';
      case 'supporter': return 'bg-blue-500';
      case 'neutral': return 'bg-gray-500';
      case 'blocker': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5" />
            <span>Stakeholder Relationship Map</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Relationship Type</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Champion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Supporter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span className="text-sm">Neutral</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">Blocker</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Influence Level</h4>
                <div className="space-y-1">
                  <Badge className="bg-red-100 text-red-800">High Influence</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">Medium Influence</Badge>
                  <Badge className="bg-green-100 text-green-800">Low Influence</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stakeholder Map */}
          <div className="relative bg-white border rounded-lg p-6 min-h-96">
            <div className="grid grid-cols-3 gap-8 h-full">
              {/* High Influence Column */}
              <div className="space-y-4">
                <h3 className="text-center font-semibold text-red-600 border-b border-red-200 pb-2">
                  High Influence
                </h3>
                {stakeholders
                  .filter(s => s.influence === 'high')
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="relative">
                      <div className={`p-3 border-2 rounded-lg ${getInfluenceColor(stakeholder.influence)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getRelationshipColor(stakeholder.relationship)}`}></div>
                          <h4 className="font-medium text-sm">{stakeholder.name}</h4>
                        </div>
                        <p className="text-xs text-gray-600">{stakeholder.role}</p>
                        <p className="text-xs text-gray-500">{stakeholder.department}</p>
                        <div className="mt-2 flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span className="text-xs">{stakeholder.connections.length} connections</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Medium Influence Column */}
              <div className="space-y-4">
                <h3 className="text-center font-semibold text-yellow-600 border-b border-yellow-200 pb-2">
                  Medium Influence
                </h3>
                {stakeholders
                  .filter(s => s.influence === 'medium')
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="relative">
                      <div className={`p-3 border-2 rounded-lg ${getInfluenceColor(stakeholder.influence)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getRelationshipColor(stakeholder.relationship)}`}></div>
                          <h4 className="font-medium text-sm">{stakeholder.name}</h4>
                        </div>
                        <p className="text-xs text-gray-600">{stakeholder.role}</p>
                        <p className="text-xs text-gray-500">{stakeholder.department}</p>
                        <div className="mt-2 flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span className="text-xs">{stakeholder.connections.length} connections</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Low Influence Column */}
              <div className="space-y-4">
                <h3 className="text-center font-semibold text-green-600 border-b border-green-200 pb-2">
                  Low Influence
                </h3>
                {stakeholders
                  .filter(s => s.influence === 'low')
                  .map((stakeholder) => (
                    <div key={stakeholder.id} className="relative">
                      <div className={`p-3 border-2 rounded-lg ${getInfluenceColor(stakeholder.influence)}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getRelationshipColor(stakeholder.relationship)}`}></div>
                          <h4 className="font-medium text-sm">{stakeholder.name}</h4>
                        </div>
                        <p className="text-xs text-gray-600">{stakeholder.role}</p>
                        <p className="text-xs text-gray-500">{stakeholder.department}</p>
                        <div className="mt-2 flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span className="text-xs">{stakeholder.connections.length} connections</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  {stakeholders.filter(s => s.relationship === 'champion').length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Champions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="text-lg font-bold text-blue-600">
                  {stakeholders.filter(s => s.relationship === 'supporter').length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Supporters</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <GitBranch className="h-4 w-4 text-gray-600" />
                <span className="text-lg font-bold text-gray-600">
                  {stakeholders.filter(s => s.relationship === 'neutral').length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Neutral</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Building2 className="h-4 w-4 text-red-600" />
                <span className="text-lg font-bold text-red-600">
                  {stakeholders.filter(s => s.relationship === 'blocker').length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Blockers</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}