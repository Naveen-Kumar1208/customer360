"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  ExternalLink,
  Users,
  TrendingUp,
  FileDown,
  Globe,
  ChevronDown,
  ArrowRight,
  Snowflake,
  XCircle,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadMovementModal } from "@/components/ui/lead-movement-modal";
import { LeadCreationModal } from "@/components/ui/lead-creation-modal";
import { EmailActionModal } from "@/components/ui/email-action-modal";
import { CallActionModal } from "@/components/ui/call-action-modal";
import { useLeads } from "@/contexts/LeadContext";
import { SimpleTooltip } from "@/components/ui/tooltip";


const getStatusColor = (status: string) => {
  switch (status) {
    case 'hot': return 'bg-red-100 text-red-700 border-red-200';
    case 'warm': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'engaged': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'new': return 'bg-green-100 text-green-700 border-green-200';
    case 'cold': return 'bg-gray-100 text-gray-700 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getEngagementColor = (score: number) => {
  if (score >= 80) return 'text-red-600';
  if (score >= 60) return 'text-orange-600';
  if (score >= 40) return 'text-blue-600';
  return 'text-gray-600';
};

export const LeadsTab: React.FC = () => {
  const { leads, moveLead, addLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<{type: string, destination: string}>({type: '', destination: ''});
  const [createLeadModalOpen, setCreateLeadModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedLeadForAction, setSelectedLeadForAction] = useState<any>(null);

  const tofuLeads = leads.tofu;
  const filteredLeads = tofuLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalLeads = tofuLeads.length;
  const hotLeads = tofuLeads.filter(lead => lead.status === 'hot').length;
  const avgEngagement = Math.round(tofuLeads.reduce((sum, lead) => sum + lead.engagement_score, 0) / totalLeads);
  const newThisWeek = tofuLeads.filter(lead => new Date(lead.created_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

  const handleLeadAction = (lead: any, actionType: string, destination: string) => {
    setSelectedLead(lead);
    setSelectedAction({ type: actionType, destination });
    setModalOpen(true);
  };

  const handleModalSubmit = (data: {
    notes: string;
    leadType?: string;
    prospectValue?: number;
    reason?: string;
  }) => {
    if (selectedLead && selectedAction.destination) {
      moveLead(selectedLead.id, 'TOFU', selectedAction.destination, data.notes, data);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLead(null);
    setSelectedAction({type: '', destination: ''});
  };

  const handleCreateLead = (leadData: any) => {
    addLead('TOFU', leadData);
  };

  const handleEmailAction = (lead: any) => {
    setSelectedLeadForAction(lead);
    setEmailModalOpen(true);
  };

  const handleCallAction = (lead: any) => {
    setSelectedLeadForAction(lead);
    setCallModalOpen(true);
  };

  const handleEmailSend = (emailData: any) => {
    console.log('Email sent:', emailData, 'to lead:', selectedLeadForAction);
    // Here you would typically integrate with your email service
    setEmailModalOpen(false);
    setSelectedLeadForAction(null);
  };

  const handleCallComplete = (callData: any) => {
    console.log('Call completed:', callData, 'for lead:', selectedLeadForAction);
    // Here you would typically log the call in your CRM
    setCallModalOpen(false);
    setSelectedLeadForAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Lead Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total TOFU Leads</p>
                <p className="text-2xl font-bold mt-1">{totalLeads}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold mt-1">{hotLeads}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">+8.3%</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Engagement</p>
                <p className="text-2xl font-bold mt-1">{avgEngagement}%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+5.2%</span>
                </div>
              </div>
              <Globe className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Week</p>
                <p className="text-2xl font-bold mt-1">{newThisWeek}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+25%</span>
                </div>
              </div>
              <FileDown className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>TOFU Lead Database</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCreateLeadModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="w-4 h-4 mr-2" />
                Email Campaign
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leads by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="engaged">Engaged</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Blog Download">Blog Download</SelectItem>
                <SelectItem value="Webinar Registration">Webinar</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Content Syndication">Content Syndication</SelectItem>
                <SelectItem value="SEO/Organic">SEO/Organic</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3">Lead</th>
                  <th className="pb-3">Source</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Engagement</th>
                  <th className="pb-3">Last Activity</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                        <p className="text-sm text-blue-600">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {lead.source}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{lead.content_downloaded}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getEngagementColor(lead.engagement_score)}`}>
                          {lead.engagement_score}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="text-sm text-gray-900">{lead.last_activity}</p>
                        <p className="text-xs text-gray-500">{lead.created_date}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="p-2 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleEmailAction(lead)}
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="p-2 hover:bg-green-50 hover:border-green-300"
                          onClick={() => handleCallAction(lead)}
                          title="Make Call"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="p-2">
                              <ExternalLink className="w-4 h-4" />
                              <ChevronDown className="w-3 h-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleLeadAction(lead, 'move', 'MOFU')}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Move to MOFU
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleLeadAction(lead, 'move', 'BOFU')}
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              Move to BOFU
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleLeadAction(lead, 'move', 'Cold Bucket')}
                            >
                              <Snowflake className="w-4 h-4 mr-2" />
                              Move to Cold Bucket
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleLeadAction(lead, 'move', 'Invalid Leads')}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Move to Invalid Leads
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No leads found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lead Movement Modal */}
      <LeadMovementModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        leadName={selectedLead?.name || ''}
        actionType={selectedAction.type}
        destination={selectedAction.destination}
        sourceStage="TOFU"
        onSubmit={handleModalSubmit}
      />

      {/* Lead Creation Modal */}
      <LeadCreationModal
        isOpen={createLeadModalOpen}
        onClose={() => setCreateLeadModalOpen(false)}
        onSubmit={handleCreateLead}
        stage="TOFU"
      />

      {/* Email Action Modal */}
      {selectedLeadForAction && (
        <EmailActionModal
          isOpen={emailModalOpen}
          onClose={() => {
            setEmailModalOpen(false);
            setSelectedLeadForAction(null);
          }}
          leadName={selectedLeadForAction.name}
          leadEmail={selectedLeadForAction.email}
          leadCompany={selectedLeadForAction.company}
          leadStage="TOFU"
          onSend={handleEmailSend}
        />
      )}

      {/* Call Action Modal */}
      {selectedLeadForAction && (
        <CallActionModal
          isOpen={callModalOpen}
          onClose={() => {
            setCallModalOpen(false);
            setSelectedLeadForAction(null);
          }}
          leadName={selectedLeadForAction.name}
          leadPhone={selectedLeadForAction.phone}
          leadCompany={selectedLeadForAction.company}
          leadStage="TOFU"
          onCall={handleCallComplete}
        />
      )}
    </div>
  );
};