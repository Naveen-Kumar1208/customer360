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
  Target, 
  TrendingUp,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Star,
  Eye,
  MoreHorizontal
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleLeads } from "@/lib/data/agentData";
import type { Lead } from "@/types/agent";
import { ImportLeadsModal } from "@/components/leads/ImportLeadsModal";
import { AddLeadModal } from "@/components/leads/AddLeadModal";
import { LeadActionModals } from "@/components/leads/LeadActionModals";
import { LeadCommunicationModals } from "@/components/leads/LeadCommunicationModals";

function LeadCard({ 
  lead, 
  onDropdownAction,
  onCommunicationAction 
}: { 
  lead: Lead;
  onDropdownAction: (lead: Lead, action: 'view' | 'call' | 'email' | 'move') => void;
  onCommunicationAction: (lead: Lead, action: 'call' | 'email' | 'meet') => void;
}) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'tofu': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'mofu': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'bofu': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageName = (stage: string) => {
    switch (stage) {
      case 'tofu': return 'TOFU - Awareness';
      case 'mofu': return 'MOFU - Consideration';
      case 'bofu': return 'BOFU - Decision';
      default: return stage.toUpperCase();
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownAction = (action: 'view' | 'call' | 'email' | 'move') => {
    setDropdownOpen(false);
    setTimeout(() => {
      onDropdownAction(lead, action);
    }, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {lead.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.company}</p>
              </div>
            </div>
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
                View Details
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
                Move to Next Stage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge className={getStageColor(lead.stage)}>
              {getStageName(lead.stage)}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{lead.score}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Value: {formatCurrency(lead.value)}</span>
            <span>Source: {lead.source}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Created: {getTimeAgo(lead.createdAt)}</span>
            <span>Last Activity: {getTimeAgo(lead.lastActivity)}</span>
          </div>
        </div>

        {/* Campaign Metrics */}
        {(lead.campaignLead || lead.conversionRate || lead.costPerLead) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-blue-800 mb-2">CAMPAIGN METRICS</p>
            <div className="space-y-2">
              {lead.campaignLead && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Campaign Lead:</span>
                  <span className="text-sm font-medium text-blue-700">{lead.campaignLead}</span>
                </div>
              )}
              {lead.conversionRate && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conversion Rate:</span>
                  <span className="text-sm font-semibold text-green-600">{lead.conversionRate}%</span>
                </div>
              )}
              {lead.costPerLead && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cost per Lead:</span>
                  <span className="text-sm font-semibold text-orange-600">₹{lead.costPerLead.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Factors */}
        {lead.keyFactors && lead.keyFactors.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-600 mb-2">KEY FACTORS</p>
            <div className="flex flex-wrap gap-1">
              {lead.keyFactors.slice(0, 3).map((factor) => (
                <Badge key={factor} variant="outline" className="text-xs">
                  {factor}
                </Badge>
              ))}
              {lead.keyFactors.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{lead.keyFactors.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onCommunicationAction(lead, 'call')}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onCommunicationAction(lead, 'email')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onCommunicationAction(lead, 'meet')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Meet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StageColumn({ 
  stage, 
  title, 
  leads, 
  color 
}: { 
  stage: string; 
  title: string; 
  leads: Lead[]; 
  color: string; 
}) {
  const stageLeads = leads.filter(lead => lead.stage === stage);
  const totalValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
  
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <Badge variant="secondary">{stageLeads.length}</Badge>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        Total Value: {formatCurrency(totalValue)}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {stageLeads.map((lead) => (
          <div key={lead.id} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 text-sm">{lead.name}</h4>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium">{lead.score}</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-2">{lead.company}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatCurrency(lead.value)}</span>
              <span>{lead.source}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {lead.tags.slice(0, 1).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadProspecting() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"kanban" | "grid">("grid");
  const [leads, setLeads] = useState(sampleLeads);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'call' | 'email' | 'move' | null>(null);
  const [communicationModalType, setCommunicationModalType] = useState<'call' | 'email' | 'meet' | null>(null);

  const handleDropdownAction = (lead: Lead, action: 'view' | 'call' | 'email' | 'move') => {
    setSelectedLead(lead);
    setActionModalType(action);
  };

  const handleCommunicationAction = (lead: Lead, action: 'call' | 'email' | 'meet') => {
    setSelectedLead(lead);
    setCommunicationModalType(action);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    const updatedLeads = leads.map(l => 
      l.id === updatedLead.id ? updatedLead : l
    );
    setLeads(updatedLeads);
  };

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'lastActivity'>) => {
    const leadWithId = {
      ...newLead,
      id: `lead-${leads.length + 1}`,
      createdAt: new Date(),
      lastActivity: new Date()
    };
    setLeads([...leads, leadWithId]);
  };

  const handleImportLeads = (importedLeads: any[]) => {
    setLeads([...leads, ...importedLeads]);
  };

  const handleCommunicationSubmit = (lead: Lead, action: string, data: any) => {
    // In a real app, this would integrate with communication systems
    console.log(`${action} action for lead:`, lead, data);
    handleUpdateLead({
      ...lead,
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

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === "" || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const sources = [...new Set(leads.map(l => l.source))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Prospecting</h1>
          <p className="text-gray-600 mt-1">Manage your sales pipeline and track lead progression</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
            <Target className="mr-2 h-4 w-4" />
            Import Leads
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map(source => (
                    <SelectItem key={source} value={source} className="capitalize">
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("kanban")}
              >
                Kanban View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{filteredLeads.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOFU Leads</p>
                <p className="text-2xl font-bold text-blue-600">
                  {filteredLeads.filter(l => l.stage === 'tofu').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">MOFU Leads</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {filteredLeads.filter(l => l.stage === 'mofu').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-600"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">BOFU Leads</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredLeads.filter(l => l.stage === 'bofu').length}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {viewMode === "kanban" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StageColumn
            stage="tofu"
            title="TOFU - Awareness"
            leads={filteredLeads}
            color="bg-blue-600"
          />
          <StageColumn
            stage="mofu"
            title="MOFU - Consideration"
            leads={filteredLeads}
            color="bg-yellow-600"
          />
          <StageColumn
            stage="bofu"
            title="BOFU - Decision"
            leads={filteredLeads}
            color="bg-green-600"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard 
              key={lead.id} 
              lead={lead}
              onDropdownAction={handleDropdownAction}
              onCommunicationAction={handleCommunicationAction}
            />
          ))}
        </div>
      )}

      {filteredLeads.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or import new leads to get started.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Import Leads Modal */}
      <ImportLeadsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportLeads}
      />

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLead={handleAddLead}
        existingLeads={leads}
      />

      {/* Lead Action Modals */}
      <LeadActionModals
        lead={selectedLead}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateLead}
      />

      {/* Lead Communication Modals */}
      <LeadCommunicationModals
        lead={selectedLead}
        modalType={communicationModalType}
        onClose={closeCommunicationModal}
        onAction={handleCommunicationSubmit}
      />
    </div>
  );
}