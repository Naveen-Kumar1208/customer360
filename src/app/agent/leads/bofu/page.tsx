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
  CheckCircle,
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
  DollarSign,
  AlertCircle,
  Award
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClosingReportModal } from "@/components/bofu/ClosingReportModal";
import { CloseDealModal } from "@/components/bofu/CloseDealModal";
import { BofuLeadActionModals } from "@/components/bofu/BofuLeadActionModals";
import { BofuLeadCommunicationModals } from "@/components/bofu/BofuLeadCommunicationModals";

interface BOFULead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: "contract_review" | "legal_approval" | "final_negotiation" | "ready_to_sign" | "closed_won" | "closed_lost";
  score: number;
  dealValue: number;
  probability: number;
  createdAt: Date;
  lastActivity: Date;
  closeDate: Date;
  nextAction: string;
  nextActionDate: Date;
  interests: string[];
  location: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  engagementLevel: number;
  decisionMakers: string[];
  competitors: string[];
  mofuToBofuConversionTime: string;
}

const sampleBOFULeads: BOFULead[] = [
  {
    id: "1",
    name: "Jennifer Martinez",
    company: "Global Industries Corp",
    email: "jennifer@globalindustries.com",
    phone: "+1 (555) 123-4567",
    source: "Direct Sales",
    status: "ready_to_sign",
    score: 95,
    dealValue: 350000,
    probability: 95,
    createdAt: new Date("2024-01-05"),
    lastActivity: new Date("2024-01-16"),
    closeDate: new Date("2024-01-20"),
    nextAction: "Contract signing meeting",
    nextActionDate: new Date("2024-01-18"),
    interests: ["Enterprise Solution", "Multi-year Contract", "Support Package"],
    location: "Los Angeles, CA",
    jobTitle: "Chief Operating Officer",
    companySize: "1000+",
    industry: "Manufacturing",
    engagementLevel: 98,
    decisionMakers: ["Jennifer Martinez (COO)", "Paul Johnson (CFO)", "Sarah Kim (CTO)"],
    competitors: ["CompetitorA", "CompetitorB"],
    mofuToBofuConversionTime: `${(15 + Math.random() * 20).toFixed(1)} days`
  },
  {
    id: "2",
    name: "Mark Thompson",
    company: "TechForward Solutions",
    email: "mark@techforward.com",
    phone: "+1 (555) 234-5678",
    source: "Partner Referral",
    status: "final_negotiation",
    score: 88,
    dealValue: 180000,
    probability: 85,
    createdAt: new Date("2024-01-08"),
    lastActivity: new Date("2024-01-15"),
    closeDate: new Date("2024-01-25"),
    nextAction: "Price negotiation call",
    nextActionDate: new Date("2024-01-17"),
    interests: ["Cost Optimization", "Implementation Support", "Training"],
    location: "Boston, MA",
    jobTitle: "IT Director",
    companySize: "500-1000",
    industry: "Technology",
    engagementLevel: 85,
    decisionMakers: ["Mark Thompson (IT Director)", "Lisa Chen (VP Operations)"],
    competitors: ["CompetitorC"],
    mofuToBofuConversionTime: `${(15 + Math.random() * 20).toFixed(1)} days`
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    company: "Future Dynamics Inc",
    email: "alex@futuredynamics.com",
    phone: "+1 (555) 345-6789",
    source: "Inbound Marketing",
    status: "contract_review",
    score: 82,
    dealValue: 275000,
    probability: 75,
    createdAt: new Date("2024-01-10"),
    lastActivity: new Date("2024-01-16"),
    closeDate: new Date("2024-01-30"),
    nextAction: "Legal team review",
    nextActionDate: new Date("2024-01-19"),
    interests: ["Custom Integration", "Data Migration", "Analytics"],
    location: "Miami, FL",
    jobTitle: "VP of Technology",
    companySize: "200-500",
    industry: "Financial Services",
    engagementLevel: 80,
    decisionMakers: ["Alex Rodriguez (VP Tech)", "Maria Santos (CEO)", "John Davis (CFO)"],
    competitors: ["CompetitorD", "CompetitorE"],
    mofuToBofuConversionTime: `${(15 + Math.random() * 20).toFixed(1)} days`
  }
];

function BOFULeadCard({ 
  lead, 
  onDropdownAction,
  onCommunicationAction 
}: { 
  lead: BOFULead;
  onDropdownAction: (lead: BOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'contract' | 'won' | 'lost') => void;
  onCommunicationAction: (lead: BOFULead, action: 'call' | 'contract' | 'close') => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'contract_review': return 'bg-blue-100 text-blue-800';
      case 'legal_approval': return 'bg-yellow-100 text-yellow-800';
      case 'final_negotiation': return 'bg-orange-100 text-orange-800';
      case 'ready_to_sign': return 'bg-green-100 text-green-800';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready_to_sign': return <CheckCircle className="h-4 w-4" />;
      case 'closed_won': return <Award className="h-4 w-4" />;
      case 'closed_lost': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 85) return 'text-green-600';
    if (probability >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDaysUntil = (date: Date) => {
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 0) return `${Math.abs(diff)} days overdue`;
    return `in ${diff} days`;
  };

  const isUrgent = (date: Date) => {
    const diff = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 2;
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownAction = (action: 'view' | 'edit' | 'call' | 'email' | 'contract' | 'won' | 'lost') => {
    setDropdownOpen(false);
    setTimeout(() => {
      onDropdownAction(lead, action);
    }, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center text-white font-semibold">
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
              {getStatusIcon(lead.status)}
              <span className="ml-1">{lead.status.replace('_', ' ')}</span>
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
                <DropdownMenuItem onClick={() => handleDropdownAction('contract')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Contract
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('call')}>
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Call
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('won')}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Won
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDropdownAction('lost')}>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Mark as Lost
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Deal Information */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="grid grid-cols-2 gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
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
          </div>
          <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-xs text-gray-600">Close Date</p>
              <p className={`text-sm font-medium ${isUrgent(lead.closeDate) ? 'text-red-600' : 'text-gray-900'}`}>
                {formatDaysUntil(lead.closeDate)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">MoFu → BoFu</p>
              <p className="text-sm font-semibold text-purple-600">{lead.mofuToBofuConversionTime}</p>
            </div>
          </div>
        </div>

        {/* Engagement Level */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Engagement Level</span>
            <span className="font-medium text-green-600">{lead.engagementLevel}%</span>
          </div>
          <Progress value={lead.engagementLevel} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
          </div>

          {/* Next Action - Urgent */}
          <div className={`p-3 rounded-lg border ${isUrgent(lead.nextActionDate) ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isUrgent(lead.nextActionDate) ? 'text-red-900' : 'text-blue-900'}`}>
                  {lead.nextAction}
                </p>
                <p className={`text-xs ${isUrgent(lead.nextActionDate) ? 'text-red-700' : 'text-blue-700'}`}>
                  Due {formatDaysUntil(lead.nextActionDate)}
                  {isUrgent(lead.nextActionDate) && ' - URGENT'}
                </p>
              </div>
              <Calendar className={`h-4 w-4 ${isUrgent(lead.nextActionDate) ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
          </div>

          {/* Decision Makers */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">DECISION MAKERS</p>
            <div className="space-y-1">
              {lead.decisionMakers.slice(0, 2).map((dm, index) => (
                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">
                  {dm}
                </Badge>
              ))}
              {lead.decisionMakers.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{lead.decisionMakers.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Competitors */}
          {lead.competitors.length > 0 && (
            <div>
              <p className="text-xs font-medium text-red-600 mb-2">COMPETITORS</p>
              <div className="flex flex-wrap gap-1">
                {lead.competitors.map((competitor) => (
                  <Badge key={competitor} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                    {competitor}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-3 border-t">
            <Button 
              size="sm" 
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={() => onCommunicationAction(lead, 'call')}
            >
              <Phone className="mr-1 h-3 w-3" />
              Call Now
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'contract')}
            >
              <FileText className="mr-1 h-3 w-3" />
              Contract
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onCommunicationAction(lead, 'close')}
            >
              <CheckCircle className="mr-1 h-3 w-3" />
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BOFULeads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(sampleBOFULeads);
  const [leads, setLeads] = useState(sampleBOFULeads);
  const [isClosingReportModalOpen, setIsClosingReportModalOpen] = useState(false);
  const [isCloseDealModalOpen, setIsCloseDealModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<BOFULead | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'call' | 'email' | 'contract' | 'won' | 'lost' | null>(null);
  const [communicationModalType, setCommunicationModalType] = useState<'call' | 'contract' | 'close' | null>(null);

  const handleDropdownAction = (lead: BOFULead, action: 'view' | 'edit' | 'call' | 'email' | 'contract' | 'won' | 'lost') => {
    setSelectedLead(lead);
    setActionModalType(action);
  };

  const handleCommunicationAction = (lead: BOFULead, action: 'call' | 'contract' | 'close') => {
    setSelectedLead(lead);
    setCommunicationModalType(action);
  };

  const handleUpdateLead = (updatedLead: BOFULead) => {
    const updatedLeads = leads.map(l => 
      l.id === updatedLead.id ? updatedLead : l
    );
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
  };

  const handleGenerateClosingReport = (reportConfig: any) => {
    // In a real app, this would generate and download the closing report
    console.log('Generating BOFU closing report:', reportConfig);
  };

  const handleCloseDealSubmit = (dealData: any) => {
    // In a real app, this would close the deal and update the lead status
    console.log('Closing deal:', dealData);
    if (selectedLead) {
      const updatedLead = {
        ...selectedLead,
        status: dealData.outcome === 'won' ? 'closed_won' : 'closed_lost' as any,
        dealValue: dealData.finalValue,
        lastActivity: new Date()
      };
      handleUpdateLead(updatedLead);
    }
  };

  const handleCommunicationSubmit = (lead: BOFULead, action: string, data: any) => {
    // In a real app, this would integrate with communication systems
    console.log(`${action} action for BOFU lead:`, lead, data);
    
    let updatedStatus = lead.status;
    if (action === 'call') {
      updatedStatus = 'final_negotiation';
    } else if (action === 'contract') {
      updatedStatus = 'ready_to_sign';
    } else if (action === 'close') {
      updatedStatus = data.outcome === 'won' ? 'closed_won' : 'closed_lost';
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
  const readyToSign = leads.filter(l => l.status === 'ready_to_sign').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">BOFU Leads</h1>
          <p className="text-gray-600 mt-1">Bottom of Funnel - High-intent prospects ready to purchase</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsClosingReportModalOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Closing Report
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsCloseDealModalOpen(true)}>
            <Award className="mr-2 h-4 w-4" />
            Close Deal
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total BOFU Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
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
                <p className="text-sm font-medium text-gray-600">Ready to Sign</p>
                <p className="text-2xl font-bold text-orange-600">{readyToSign}</p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
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
                  placeholder="Search BOFU leads..."
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
              <Clock className="mr-2 h-4 w-4" />
              Filter by Close Date
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid - Updated to show only two cards per row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLeads.map((lead) => (
          <BOFULeadCard 
            key={lead.id} 
            lead={lead}
            onDropdownAction={handleDropdownAction}
            onCommunicationAction={handleCommunicationAction}
          />
        ))}
      </div>

      {/* Closing Report Modal */}
      <ClosingReportModal
        isOpen={isClosingReportModalOpen}
        onClose={() => setIsClosingReportModalOpen(false)}
        onGenerate={handleGenerateClosingReport}
      />

      {/* Close Deal Modal */}
      <CloseDealModal
        isOpen={isCloseDealModalOpen}
        onClose={() => setIsCloseDealModalOpen(false)}
        onCloseDeal={handleCloseDealSubmit}
      />

      {/* BOFU Lead Action Modals */}
      <BofuLeadActionModals
        lead={selectedLead}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateLead}
      />

      {/* BOFU Lead Communication Modals */}
      <BofuLeadCommunicationModals
        lead={selectedLead}
        modalType={communicationModalType}
        onClose={closeCommunicationModal}
        onAction={handleCommunicationSubmit}
      />
    </div>
  );
}