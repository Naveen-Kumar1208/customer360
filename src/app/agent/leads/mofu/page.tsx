"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Clock,
  FileText,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddMofuLeadModal } from "@/components/mofu/AddMofuLeadModal";
import { GenerateReportModal } from "@/components/mofu/GenerateReportModal";
import { MofuLeadActionModals } from "@/components/mofu/MofuLeadActionModals";
import { MofuLeadCommunicationModals } from "@/components/mofu/MofuLeadCommunicationModals";

interface MOFULead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "evaluating" | "demo_requested" | "proposal_sent" | "negotiating" | "ready_to_close";
  score: number;
  dealValue: number;
  probability: number;
  createdAt: Date;
  lastActivity: Date;
  nextAction: string;
  nextActionDate: Date;
  interests: string[];
  location: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  engagementLevel: number;
  tofuToMofuConversionTime: string;
}

const sampleMOFULeads: MOFULead[] = [
  {
    id: "1",
    name: "David Wilson",
    company: "Enterprise Solutions Co",
    email: "david@enterprisesolutions.com",
    phone: "+1 (555) 123-4567",
    source: "Referral",
    status: "proposal_sent",
    score: 85,
    dealValue: 150000,
    probability: 75,
    createdAt: new Date("2024-01-10"),
    lastActivity: new Date("2024-01-16"),
    nextAction: "Follow up on proposal",
    nextActionDate: new Date("2024-01-18"),
    interests: ["Enterprise Software", "Integration", "Security"],
    location: "Chicago, IL",
    jobTitle: "IT Director",
    companySize: "500-1000",
    industry: "Financial Services",
    engagementLevel: 80,
    tofuToMofuConversionTime: `${(8 + Math.random() * 12).toFixed(1)} days`
  },
  {
    id: "2",
    name: "Lisa Thompson",
    company: "Growth Tech Ltd",
    email: "lisa@growthtech.com",
    phone: "+1 (555) 234-5678",
    source: "Website Demo",
    status: "demo_requested",
    score: 78,
    dealValue: 95000,
    probability: 60,
    createdAt: new Date("2024-01-12"),
    lastActivity: new Date("2024-01-15"),
    nextAction: "Schedule product demo",
    nextActionDate: new Date("2024-01-17"),
    interests: ["Automation", "Workflow", "Productivity"],
    location: "Denver, CO",
    jobTitle: "Operations Manager",
    companySize: "100-500",
    industry: "Technology",
    engagementLevel: 70,
    tofuToMofuConversionTime: `${(8 + Math.random() * 12).toFixed(1)} days`
  },
  {
    id: "3",
    name: "Robert Kumar",
    company: "Manufacturing Plus",
    email: "robert@manufacturingplus.com",
    phone: "+1 (555) 345-6789",
    source: "LinkedIn",
    status: "negotiating",
    score: 92,
    dealValue: 225000,
    probability: 85,
    createdAt: new Date("2024-01-08"),
    lastActivity: new Date("2024-01-16"),
    nextAction: "Contract review meeting",
    nextActionDate: new Date("2024-01-19"),
    interests: ["Process Optimization", "Cost Reduction", "Scalability"],
    location: "Detroit, MI",
    jobTitle: "VP of Operations",
    companySize: "1000+",
    industry: "Manufacturing",
    engagementLevel: 95,
    tofuToMofuConversionTime: `${(8 + Math.random() * 12).toFixed(1)} days`
  }
];

function MOFULeadCard({ 
  lead, 
  onDropdownAction,
  onCommunicationAction 
}: { 
  lead: MOFULead;
  onDropdownAction: (lead: MOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'move') => void;
  onCommunicationAction: (lead: MOFULead, action: 'call' | 'proposal' | 'schedule') => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'evaluating': return 'bg-blue-100 text-blue-800';
      case 'demo_requested': return 'bg-yellow-100 text-yellow-800';
      case 'proposal_sent': return 'bg-purple-100 text-purple-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      case 'ready_to_close': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDaysUntil = (date: Date) => {
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 0) return `${Math.abs(diff)} days overdue`;
    return `in ${diff} days`;
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
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
              {lead.status.replace('_', ' ')}
            </Badge>
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
                  <FileText className="mr-2 h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('move')}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Move to BOFU
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Deal Information */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-gray-600">Deal Value</p>
            <p className="text-lg font-semibold text-green-600">₹{(lead.dealValue / 100000).toFixed(1)}L</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Win Probability</p>
            <p className={`text-lg font-semibold ${getProbabilityColor(lead.probability)}`}>
              {lead.probability}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">ToFu → MoFu</p>
            <p className="text-sm font-semibold text-blue-600">{lead.tofuToMofuConversionTime}</p>
          </div>
        </div>

        {/* Engagement Level */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Engagement Level</span>
            <span className={`font-medium ${getScoreColor(lead.engagementLevel)}`}>
              {lead.engagementLevel}%
            </span>
          </div>
          <Progress value={lead.engagementLevel} className="h-2" />
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

          {/* Next Action */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">{lead.nextAction}</p>
                <p className="text-xs text-blue-700">
                  Due {formatDaysUntil(lead.nextActionDate)}
                </p>
              </div>
              <Calendar className="h-4 w-4 text-blue-600" />
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
              onClick={() => onCommunicationAction(lead, 'proposal')}
            >
              <FileText className="mr-1 h-3 w-3" />
              Proposal
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'schedule')}
            >
              <Calendar className="mr-1 h-3 w-3" />
              Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MOFULeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(sampleMOFULeads);
  const [leads, setLeads] = useState(sampleMOFULeads);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<MOFULead | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'call' | 'email' | 'move' | null>(null);
  const [communicationModalType, setCommunicationModalType] = useState<'call' | 'proposal' | 'schedule' | null>(null);

  const handleDropdownAction = (lead: MOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'move') => {
    setSelectedLead(lead);
    setActionModalType(action);
  };

  const handleCommunicationAction = (lead: MOFULead, action: 'call' | 'proposal' | 'schedule') => {
    setSelectedLead(lead);
    setCommunicationModalType(action);
  };

  const handleUpdateLead = (updatedLead: MOFULead) => {
    const updatedLeads = leads.map(l => 
      l.id === updatedLead.id ? updatedLead : l
    );
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
  };

  const handleAddLead = (newLead: Omit<MOFULead, 'id' | 'createdAt' | 'lastActivity' | 'tofuToMofuConversionTime'>) => {
    const leadWithId = {
      ...newLead,
      id: `mofu-${leads.length + 1}`,
      createdAt: new Date(),
      lastActivity: new Date(),
      tofuToMofuConversionTime: `${(8 + Math.random() * 12).toFixed(1)} days`
    };
    setLeads([...leads, leadWithId]);
    setFilteredLeads([...leads, leadWithId]);
  };

  const handleGenerateReport = (reportConfig: any) => {
    // In a real app, this would generate and download the report
    console.log('Generating MOFU report:', reportConfig);
  };

  const handleCommunicationSubmit = (lead: MOFULead, action: string, data: any) => {
    // In a real app, this would integrate with communication systems
    console.log(`${action} action for MOFU lead:`, lead, data);
    
    let updatedStatus = lead.status;
    if (action === 'call') {
      updatedStatus = 'demo_requested';
    } else if (action === 'proposal') {
      updatedStatus = 'proposal_sent';
    } else if (action === 'schedule') {
      updatedStatus = 'demo_requested';
    }
    
    handleUpdateLead({
      ...lead,
      status: updatedStatus,
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
  const totalDealValue = leads.reduce((sum, lead) => sum + lead.dealValue, 0);
  const avgProbability = leads.reduce((sum, lead) => sum + lead.probability, 0) / leads.length;
  const readyToClose = leads.filter(l => l.status === 'ready_to_close' || l.status === 'negotiating').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">MOFU Leads</h1>
          <p className="text-gray-600 mt-1">Middle of Funnel - Prospects actively evaluating solutions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsReportModalOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
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
                <p className="text-sm font-medium text-gray-600">Total MOFU Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-green-600">₹{(totalDealValue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Win Rate</p>
                <p className="text-2xl font-bold text-blue-600">{avgProbability.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Close Ready</p>
                <p className="text-2xl font-bold text-orange-600">{readyToClose}</p>
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
                  placeholder="Search MOFU leads..."
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
              <DollarSign className="mr-2 h-4 w-4" />
              Filter by Value
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid - Updated to show only two cards per row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <MOFULeadCard 
            key={lead.id} 
            lead={lead}
            onDropdownAction={handleDropdownAction}
            onCommunicationAction={handleCommunicationAction}
          />
        ))}
      </div>

      {/* Add MOFU Lead Modal */}
      <AddMofuLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLead={handleAddLead}
        existingLeads={leads}
      />

      {/* Generate Report Modal */}
      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onGenerate={handleGenerateReport}
      />

      {/* MOFU Lead Action Modals */}
      <MofuLeadActionModals
        lead={selectedLead}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateLead}
      />

      {/* MOFU Lead Communication Modals */}
      <MofuLeadCommunicationModals
        lead={selectedLead}
        modalType={communicationModalType}
        onClose={closeCommunicationModal}
        onAction={handleCommunicationSubmit}
      />
    </div>
  );
}