"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StakeholderMapModal } from "@/components/stakeholder/StakeholderMapModal";
import { AddStakeholderModal } from "@/components/stakeholder/AddStakeholderModal";
import { StakeholderActionModals } from "@/components/stakeholder/StakeholderActionModals";
import { ScheduledMeetings } from "@/components/stakeholder/ScheduledMeetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Building2,
  Users,
  GitBranch,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const sampleStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "TechCorp Industries",
    department: "Technology",
    influence: "high",
    relationship: "champion",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    lastContact: new Date("2024-01-15"),
    connections: ["John Smith", "Mike Chen"]
  },
  {
    id: "2", 
    name: "Robert Davis",
    role: "VP of Operations",
    company: "TechCorp Industries",
    department: "Operations",
    influence: "high",
    relationship: "supporter",
    email: "robert.davis@techcorp.com",
    phone: "+1 (555) 234-5678",
    lastContact: new Date("2024-01-12"),
    connections: ["Sarah Johnson"]
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Finance Director",
    company: "TechCorp Industries", 
    department: "Finance",
    influence: "medium",
    relationship: "neutral",
    email: "emily.chen@techcorp.com",
    phone: "+1 (555) 345-6789",
    lastContact: new Date("2024-01-10"),
    connections: ["Robert Davis"]
  }
];

function StakeholderCard({ 
  stakeholder, 
  onAction 
}: { 
  stakeholder: Stakeholder;
  onAction: (stakeholder: Stakeholder, action: 'view' | 'edit' | 'call' | 'email' | 'remove') => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const handleAction = (action: 'view' | 'edit' | 'call' | 'email' | 'remove') => {
    setDropdownOpen(false); // Close dropdown first
    setTimeout(() => {
      onAction(stakeholder, action);
    }, 100); // Small delay to ensure dropdown closes properly
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {stakeholder.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{stakeholder.name}</h3>
              <p className="text-sm text-gray-600">{stakeholder.role}</p>
              <p className="text-sm text-gray-500">{stakeholder.department} • {stakeholder.company}</p>
            </div>
          </div>
          
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction('view')}>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('edit')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('call')}>
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('email')}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => handleAction('remove')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge className={getInfluenceColor(stakeholder.influence)}>
                {stakeholder.influence} influence
              </Badge>
              <Badge className={getRelationshipColor(stakeholder.relationship)}>
                {stakeholder.relationship}
              </Badge>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>Key Contact</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{stakeholder.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{stakeholder.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Last Contact: {stakeholder.lastContact.toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <GitBranch className="h-4 w-4" />
              <span>{stakeholder.connections.length} connections</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StakeholderMapping() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStakeholders, setFilteredStakeholders] = useState(sampleStakeholders);
  const [stakeholders, setStakeholders] = useState(sampleStakeholders);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'call' | 'email' | 'remove' | null>(null);
  const [activeTab, setActiveTab] = useState("stakeholders");

  const handleAddStakeholder = (newStakeholder: Omit<Stakeholder, 'id'>) => {
    const stakeholderWithId = {
      ...newStakeholder,
      id: (stakeholders.length + 1).toString()
    };
    setStakeholders([...stakeholders, stakeholderWithId]);
    setFilteredStakeholders([...stakeholders, stakeholderWithId]);
  };

  const handleStakeholderAction = (stakeholder: Stakeholder, action: 'view' | 'edit' | 'call' | 'email' | 'remove') => {
    setSelectedStakeholder(stakeholder);
    setActionModalType(action);
  };

  const handleUpdateStakeholder = (updatedStakeholder: Stakeholder) => {
    const updatedStakeholders = stakeholders.map(s => 
      s.id === updatedStakeholder.id ? updatedStakeholder : s
    );
    setStakeholders(updatedStakeholders);
    setFilteredStakeholders(updatedStakeholders);
  };

  const handleRemoveStakeholder = (stakeholderId: string) => {
    const updatedStakeholders = stakeholders.filter(s => s.id !== stakeholderId);
    setStakeholders(updatedStakeholders);
    setFilteredStakeholders(updatedStakeholders);
  };

  const closeActionModal = () => {
    setSelectedStakeholder(null);
    setActionModalType(null);
  };

  const handleEditMeeting = (meeting: any) => {
    console.log('Edit meeting:', meeting);
    // In a real app, this would open an edit meeting modal
  };

  const handleCancelMeeting = (meetingId: string) => {
    console.log('Cancel meeting:', meetingId);
    // In a real app, this would cancel the meeting
  };

  const handleJoinMeeting = (meeting: any) => {
    console.log('Join meeting:', meeting);
    // In a real app, this would open the meeting link or dial the number
    if (meeting.type === 'video') {
      // Open video conference link
      window.open('https://meet.google.com/abc-defg-hij', '_blank');
    } else if (meeting.type === 'phone') {
      // Initiate phone call or show phone number
      window.open(`tel:${stakeholders.find(s => s.name === meeting.stakeholder)?.phone}`, '_self');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stakeholder Management</h1>
          <p className="text-gray-600 mt-1">Map stakeholders and manage scheduled meetings</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Stakeholder
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="meetings">Scheduled Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="stakeholders" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search stakeholders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Influence
                </Button>
                <Button variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Filter by Company
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Stakeholders</p>
                    <p className="text-2xl font-bold">{stakeholders.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Champions</p>
                    <p className="text-2xl font-bold text-green-600">
                      {stakeholders.filter(s => s.relationship === 'champion').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Influence</p>
                    <p className="text-2xl font-bold text-red-600">
                      {stakeholders.filter(s => s.influence === 'high').length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Companies</p>
                    <p className="text-2xl font-bold">
                      {new Set(stakeholders.map(s => s.company)).size}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stakeholder Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStakeholders.map((stakeholder) => (
              <StakeholderCard 
                key={stakeholder.id} 
                stakeholder={stakeholder} 
                onAction={handleStakeholderAction}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <ScheduledMeetings
            onEditMeeting={handleEditMeeting}
            onCancelMeeting={handleCancelMeeting}
            onJoinMeeting={handleJoinMeeting}
          />
        </TabsContent>
      </Tabs>

      {/* Stakeholder Map Modal */}
      <StakeholderMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        stakeholders={stakeholders}
        onAddStakeholder={handleAddStakeholder}
      />

      {/* Add Stakeholder Modal */}
      <AddStakeholderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStakeholder={handleAddStakeholder}
        existingStakeholders={stakeholders}
      />

      {/* Stakeholder Action Modals */}
      <StakeholderActionModals
        stakeholder={selectedStakeholder}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateStakeholder}
        onRemove={handleRemoveStakeholder}
      />
    </div>
  );
}