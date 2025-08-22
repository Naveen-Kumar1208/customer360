"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  UserPlus,
  Phone,
  Mail,
  Eye,
  Edit,
  ArrowRight,
  Calendar,
  Building2,
  MapPin,
  Star,
  MoreHorizontal,
  TrendingUp,
  Users,
  Target,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddTofuLeadModal } from "@/components/tofu/AddTofuLeadModal";
import { TofuLeadActionModals } from "@/components/tofu/TofuLeadActionModals";
import { TofuLeadCommunicationModals } from "@/components/tofu/TofuLeadCommunicationModals";

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

const sampleTOFULeads: TOFULead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechStart Inc",
    email: "sarah@techstart.com",
    phone: "+1 (555) 123-4567",
    source: "Website Form",
    status: "interested",
    score: 75,
    createdAt: new Date("2024-01-15"),
    lastActivity: new Date("2024-01-16"),
    interests: ["Software Solutions", "Cloud Migration", "Automation"],
    location: "San Francisco, CA",
    jobTitle: "CTO",
    companySize: "50-100",
    industry: "Technology"
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "Growth Dynamics",
    email: "michael@growthdynamics.com",
    phone: "+1 (555) 234-5678",
    source: "LinkedIn Campaign",
    status: "new",
    score: 68,
    createdAt: new Date("2024-01-14"),
    lastActivity: new Date("2024-01-14"),
    interests: ["Business Intelligence", "Analytics", "Reporting"],
    location: "New York, NY",
    jobTitle: "VP of Operations",
    companySize: "100-500",
    industry: "Consulting"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "InnovateCorp",
    email: "emily@innovatecorp.com",
    phone: "+1 (555) 345-6789",
    source: "Google Ads",
    status: "nurturing",
    score: 82,
    createdAt: new Date("2024-01-12"),
    lastActivity: new Date("2024-01-15"),
    interests: ["Digital Transformation", "Process Optimization"],
    location: "Austin, TX",
    jobTitle: "Director of Strategy",
    companySize: "200-500",
    industry: "Manufacturing"
  }
];

function TOFULeadCard({ 
  lead, 
  onDropdownAction,
  onCommunicationAction 
}: { 
  lead: TOFULead;
  onDropdownAction: (lead: TOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'move') => void;
  onCommunicationAction: (lead: TOFULead, action: 'call' | 'email' | 'qualify') => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'nurturing': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'website form': return '🌐';
      case 'linkedin campaign': return '💼';
      case 'google ads': return '📱';
      default: return '📧';
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownAction = (action: 'view' | 'edit' | 'call' | 'email' | 'move') => {
    setDropdownOpen(false);
    setTimeout(() => {
      onDropdownAction(lead, action);
    }, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
              <p className="text-sm text-gray-600">{lead.jobTitle}</p>
              <p className="text-sm text-gray-500">{lead.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(lead.status)}>
              {lead.status}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                {lead.score}
              </span>
            </div>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDropdownAction('view')}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('edit')}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Lead
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('call')}>
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Call
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('email')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('move')}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Move to MOFU
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Building2 className="h-4 w-4" />
              <span>{lead.industry} • {lead.companySize} employees</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{lead.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-600">
              <span className="text-lg">{getSourceIcon(lead.source)}</span>
              <span>{lead.source}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{Math.floor((new Date().getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-medium text-gray-600 mb-2">INTERESTS</p>
            <div className="flex flex-wrap gap-1">
              {lead.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {lead.interests.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{lead.interests.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex space-x-2 pt-3 border-t">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'call')}
            >
              <Phone className="mr-1 h-3 w-3" />
              Call
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'email')}
            >
              <Mail className="mr-1 h-3 w-3" />
              Email
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'qualify')}
            >
              <ArrowRight className="mr-1 h-3 w-3" />
              Qualify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TOFULeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(sampleTOFULeads);
  const [leads, setLeads] = useState(sampleTOFULeads);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<TOFULead | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'call' | 'email' | 'move' | null>(null);
  const [communicationModalType, setCommunicationModalType] = useState<'call' | 'email' | 'qualify' | null>(null);

  const handleDropdownAction = (lead: TOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'move') => {
    setSelectedLead(lead);
    setActionModalType(action);
  };

  const handleCommunicationAction = (lead: TOFULead, action: 'call' | 'email' | 'qualify') => {
    setSelectedLead(lead);
    setCommunicationModalType(action);
  };

  const handleUpdateLead = (updatedLead: TOFULead) => {
    const updatedLeads = leads.map(l => 
      l.id === updatedLead.id ? updatedLead : l
    );
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
  };

  const handleAddLead = (newLead: Omit<TOFULead, 'id' | 'createdAt' | 'lastActivity'>) => {
    const leadWithId = {
      ...newLead,
      id: `tofu-${leads.length + 1}`,
      createdAt: new Date(),
      lastActivity: new Date()
    };
    setLeads([...leads, leadWithId]);
    setFilteredLeads([...leads, leadWithId]);
  };

  const handleCommunicationSubmit = (lead: TOFULead, action: string, data: any) => {
    // In a real app, this would integrate with communication systems
    console.log(`${action} action for TOFU lead:`, lead, data);
    
    let updatedStatus = lead.status;
    if (action === 'call' || action === 'email') {
      updatedStatus = 'contacted';
    } else if (action === 'qualify') {
      updatedStatus = 'qualified';
    }
    
    handleUpdateLead({
      ...lead,
      status: updatedStatus,
      score: action === 'qualify' ? data.score : lead.score,
      lastActivity: new Date()
    });
  };

  const closeActionModal = () => {
    setSelectedLead(null);
    setActionModalType(null);
  };

  const closeCommunicationModal = () => {
    setSelectedLead(null);
    setCommunicationModalType(null);
  };

  const totalLeads = leads.length;
  const interestedLeads = leads.filter(l => l.status === 'interested').length;
  const avgScore = leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length;
  const newLeadsToday = leads.filter(l => {
    const today = new Date();
    const leadDate = l.createdAt;
    return leadDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">TOFU Leads</h1>
          <p className="text-gray-600 mt-1">Top of Funnel - New prospects showing initial interest</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total TOFU Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Interested</p>
                <p className="text-2xl font-bold text-green-600">{interestedLeads}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-purple-600">{avgScore.toFixed(0)}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Today</p>
                <p className="text-2xl font-bold text-orange-600">{newLeadsToday}</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search TOFU leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Filter by Source
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid - Updated to show only two cards per row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <TOFULeadCard 
            key={lead.id} 
            lead={lead}
            onDropdownAction={handleDropdownAction}
            onCommunicationAction={handleCommunicationAction}
          />
        ))}
      </div>

      {/* Add TOFU Lead Modal */}
      <AddTofuLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLead={handleAddLead}
        existingLeads={leads}
      />

      {/* TOFU Lead Action Modals */}
      <TofuLeadActionModals
        lead={selectedLead}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateLead}
      />

      {/* TOFU Lead Communication Modals */}
      <TofuLeadCommunicationModals
        lead={selectedLead}
        modalType={communicationModalType}
        onClose={closeCommunicationModal}
        onAction={handleCommunicationSubmit}
      />
    </div>
  );
}