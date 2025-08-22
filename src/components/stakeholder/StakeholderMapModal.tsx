"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  UserPlus,
  Users,
  Building2,
  GitBranch,
  Star,
  Phone,
  Mail,
  X,
  Plus,
  Minus
} from "lucide-react";

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
  x?: number;
  y?: number;
}

interface StakeholderMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholders: Stakeholder[];
  onAddStakeholder: (stakeholder: Omit<Stakeholder, 'id'>) => void;
}

export function StakeholderMapModal({ 
  isOpen, 
  onClose, 
  stakeholders, 
  onAddStakeholder 
}: StakeholderMapModalProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [newStakeholder, setNewStakeholder] = useState({
    name: "",
    role: "",
    company: "",
    department: "",
    influence: "medium" as const,
    relationship: "neutral" as const,
    email: "",
    phone: "",
    lastContact: new Date(),
    connections: [] as string[]
  });

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'champion': return '🏆';
      case 'supporter': return '👍';
      case 'neutral': return '➖';
      case 'blocker': return '🚫';
      default: return '❓';
    }
  };

  const handleAddStakeholder = () => {
    if (newStakeholder.name && newStakeholder.role && newStakeholder.company) {
      onAddStakeholder(newStakeholder);
      setNewStakeholder({
        name: "",
        role: "",
        company: "",
        department: "",
        influence: "medium",
        relationship: "neutral",
        email: "",
        phone: "",
        lastContact: new Date(),
        connections: []
      });
      setShowAddForm(false);
    }
  };

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.2, 0.5));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Stakeholder Map
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Stakeholder
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" onClick={zoomOut}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
                <Button variant="outline" size="sm" onClick={zoomIn}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          {/* Map Container */}
          <div 
            className="w-full h-full overflow-auto bg-gray-50 border rounded-lg relative"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
          >
            <div className="w-full h-full min-h-[600px] relative p-8">
              {/* Company Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
                {Array.from(new Set(stakeholders.map(s => s.company))).map((company, companyIndex) => {
                  const companyStakeholders = stakeholders.filter(s => s.company === company);
                  return (
                    <div key={company} className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{company}</h3>
                        <Badge variant="outline">{companyStakeholders.length}</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {companyStakeholders.map((stakeholder, index) => (
                          <Card 
                            key={stakeholder.id} 
                            className={`cursor-pointer hover:shadow-md transition-all duration-200 ${getInfluenceColor(stakeholder.influence)}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                                      {stakeholder.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-sm">{stakeholder.name}</h4>
                                      <p className="text-xs text-gray-600">{stakeholder.role}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className="text-xs">
                                      {stakeholder.influence}
                                    </Badge>
                                    <span className="text-lg">{getRelationshipIcon(stakeholder.relationship)}</span>
                                  </div>
                                  
                                  <div className="text-xs text-gray-500 space-y-1">
                                    <div className="flex items-center gap-1">
                                      <Mail className="h-3 w-3" />
                                      <span className="truncate">{stakeholder.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <GitBranch className="h-3 w-3" />
                                      <span>{stakeholder.connections.length} connections</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-shrink-0 bg-gray-50 p-4 rounded-lg mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Influence:</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-red-500 bg-red-50 rounded"></div>
                  <span className="text-xs">High</span>
                  <div className="w-3 h-3 border-2 border-yellow-500 bg-yellow-50 rounded"></div>
                  <span className="text-xs">Medium</span>
                  <div className="w-3 h-3 border-2 border-green-500 bg-green-50 rounded"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Relationship:</span>
                <div className="flex items-center gap-2 text-sm">
                  <span>🏆 Champion</span>
                  <span>👍 Supporter</span>
                  <span>➖ Neutral</span>
                  <span>🚫 Blocker</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Stakeholder Form Modal */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Stakeholder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newStakeholder.name}
                    onChange={(e) => setNewStakeholder({...newStakeholder, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={newStakeholder.role}
                    onChange={(e) => setNewStakeholder({...newStakeholder, role: e.target.value})}
                    placeholder="VP of Sales"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={newStakeholder.company}
                    onChange={(e) => setNewStakeholder({...newStakeholder, company: e.target.value})}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={newStakeholder.department}
                    onChange={(e) => setNewStakeholder({...newStakeholder, department: e.target.value})}
                    placeholder="Sales"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="influence">Influence</Label>
                  <Select value={newStakeholder.influence} onValueChange={(value: any) => setNewStakeholder({...newStakeholder, influence: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select value={newStakeholder.relationship} onValueChange={(value: any) => setNewStakeholder({...newStakeholder, relationship: value})}>
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
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStakeholder.email}
                    onChange={(e) => setNewStakeholder({...newStakeholder, email: e.target.value})}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStakeholder.phone}
                    onChange={(e) => setNewStakeholder({...newStakeholder, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStakeholder}>
                  Add Stakeholder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}