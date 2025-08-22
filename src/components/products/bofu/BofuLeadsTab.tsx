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
  DollarSign,
  Calendar,
  Trophy,
  ChevronDown,
  Snowflake,
  UserCheck,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadMovementModal } from "@/components/ui/lead-movement-modal";
import { EmailActionModal } from "@/components/ui/email-action-modal";
import { CallActionModal } from "@/components/ui/call-action-modal";
import { useLeads } from "@/contexts/LeadContext";
import { SimpleTooltip } from "@/components/ui/tooltip";


const getStatusColor = (status: string) => {
  switch (status) {
    case 'closed_won': return 'bg-green-100 text-green-700 border-green-200';
    case 'opportunity': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'proposal': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'negotiation': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'closed_lost': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getEngagementColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-blue-600';
  if (score >= 70) return 'text-orange-600';
  return 'text-gray-600';
};

const getCloseProabilityColor = (probability: number) => {
  if (probability >= 80) return 'text-green-600 font-bold';
  if (probability >= 60) return 'text-blue-600 font-semibold';
  if (probability >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const BofuLeadsTab: React.FC = () => {
  const { leads, moveLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<{type: string, destination: string}>({type: '', destination: ''});
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedLeadForAction, setSelectedLeadForAction] = useState<any>(null);

  const bofuLeads = leads.bofu;
  const filteredLeads = bofuLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalLeads = bofuLeads.length;
  const closedWon = bofuLeads.filter(lead => lead.status === 'closed_won').length;
  const opportunities = bofuLeads.filter(lead => lead.status === 'opportunity').length;
  const totalDealValue = bofuLeads.reduce((sum, lead) => sum + lead.deal_value, 0);
  const avgDealValue = Math.round(totalDealValue / totalLeads);

  const handleLeadAction = (lead: any, actionType: string, destination: string) => {
    setSelectedLead(lead);
    setSelectedAction({ type: actionType, destination });
    setModalOpen(true);
  };

  const handleModalSubmit = (notes: string) => {
    if (selectedLead && selectedAction.destination) {
      moveLead(selectedLead.id, 'BOFU', selectedAction.destination, notes);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLead(null);
    setSelectedAction({type: '', destination: ''});
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
      {/* Lead Metrics - Single Row */}
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total BOFU Leads */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-sm">🎯</div>
              <span className="font-semibold text-sm text-gray-800">Total BOFU Leads</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{totalLeads}</div>
            <div className="text-gray-500 text-xs mt-1">Ready-to-buy prospects</div>
            <div className="flex items-center justify-center text-green-500 text-xs font-semibold mt-2">
              <span className="mr-1">↑</span> 22.7% vs previous
            </div>
          </div>

          {/* Closed Won */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-sm">🏆</div>
              <span className="font-semibold text-sm text-gray-800">Closed Won</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{closedWon}</div>
            <div className="text-gray-500 text-xs mt-1">Successfully closed deals</div>
            <div className="flex items-center justify-center text-green-500 text-xs font-semibold mt-2">
              <span className="mr-1">↑</span> 35.8% vs previous
            </div>
          </div>

          {/* Active Opportunities */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-sm">💰</div>
              <span className="font-semibold text-sm text-gray-800">Active Opportunities</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{opportunities}</div>
            <div className="text-gray-500 text-xs mt-1">Deals in progress</div>
            <div className="flex items-center justify-center text-green-500 text-xs font-semibold mt-2">
              <span className="mr-1">↑</span> 18.4% vs previous
            </div>
          </div>

          {/* Avg. Deal Value */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-sm">💎</div>
              <span className="font-semibold text-sm text-gray-800">Avg. Deal Value</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">${avgDealValue.toLocaleString()}</div>
            <div className="text-gray-500 text-xs mt-1">Average deal size</div>
            <div className="flex items-center justify-center text-green-500 text-xs font-semibold mt-2">
              <span className="mr-1">↑</span> 12.3% vs previous
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="col-span-12 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 transform hover:-translate-y-1 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md text-xl">🚀</div>
            <span className="font-semibold text-lg text-gray-800">BOFU Lead Database</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
        
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
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="closed_won">Closed Won</SelectItem>
              <SelectItem value="opportunity">Opportunity</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="closed_lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Sales Call">Sales Call</SelectItem>
              <SelectItem value="Demo Follow-up">Demo Follow-up</SelectItem>
              <SelectItem value="Proposal Submitted">Proposal Submitted</SelectItem>
              <SelectItem value="RFP Response">RFP Response</SelectItem>
              <SelectItem value="Executive Meeting">Executive Meeting</SelectItem>
              <SelectItem value="Trial Conversion">Trial Conversion</SelectItem>
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
                <th className="pb-3">Deal Value</th>
                <th className="pb-3">Close Probability</th>
                <th className="pb-3">Converting Time</th>
                <th className="pb-3">Sales Stage</th>
                <th className="pb-3">Last Activity</th>
                <th className="pb-3">Notes</th>
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
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray-900">
                        ${lead.deal_value.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getCloseProabilityColor(lead.close_probability)}`}>
                        {lead.close_probability}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium text-orange-600">{lead.converting_time || 0}h</p>
                      <p className="text-xs text-gray-500">{Math.floor((lead.converting_time || 0) / 24)}d {(lead.converting_time || 0) % 24}h</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.sales_stage}</p>
                      <div className="text-xs text-blue-600 mt-1 max-w-48 truncate" title={lead.content_consumed}>
                        {lead.content_consumed}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm text-gray-900">{lead.last_activity}</p>
                      <p className="text-xs text-gray-500">{lead.created_date}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="max-w-64">
                      <p className="text-sm text-gray-700 break-words">
                        {lead.notes}
                      </p>
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
                            onClick={() => handleLeadAction(lead, 'move', 'Customer')}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Move to Customer
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
      </div>

      {/* Lead Movement Modal */}
      <LeadMovementModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        leadName={selectedLead?.name || ''}
        actionType={selectedAction.type}
        destination={selectedAction.destination}
        onSubmit={handleModalSubmit}
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
          leadStage="BOFU"
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
          leadStage="BOFU"
          onCall={handleCallComplete}
        />
      )}
    </div>
  );
};