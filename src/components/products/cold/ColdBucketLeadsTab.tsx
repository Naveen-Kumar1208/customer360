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
  Download, 
  Mail, 
  Phone, 
  RefreshCw,
  DollarSign,
  Calendar,
  AlertTriangle,
  Snowflake,
  TrendingDown,
  Clock,
  FileText,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadMovementModal } from "@/components/ui/lead-movement-modal";
import { coldBucketStats, reEngagementCampaigns } from '@/lib/data/coldBucketData';
import { useLeads } from "@/contexts/LeadContext";
import { SimpleTooltip } from "@/components/ui/tooltip";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'cold': return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'inactive': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getStageColor = (originalStage: string) => {
  switch (originalStage) {
    case 'TOFU': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'MOFU': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'BOFU': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getValueColor = (value: number) => {
  if (value >= 80000) return 'text-green-600 font-bold';
  if (value >= 50000) return 'text-blue-600 font-semibold';
  if (value >= 30000) return 'text-orange-600';
  return 'text-gray-600';
};

const getInactivityColor = (days: number) => {
  if (days >= 120) return 'text-red-600 font-bold';
  if (days >= 90) return 'text-orange-600 font-semibold';
  if (days >= 60) return 'text-yellow-600';
  return 'text-gray-600';
};

export const ColdBucketLeadsTab: React.FC = () => {
  const { leads, moveLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [valueFilter, setValueFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<{type: string, destination: string}>({type: '', destination: ''});

  const coldBucketLeads = leads.cold;
  const filteredLeads = coldBucketLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = stageFilter === 'all' || lead.original_stage === stageFilter;
    const matchesValue = valueFilter === 'all' || 
                        (valueFilter === 'high' && lead.value >= 50000) ||
                        (valueFilter === 'medium' && lead.value >= 30000 && lead.value < 50000) ||
                        (valueFilter === 'low' && lead.value < 30000);
    
    return matchesSearch && matchesStage && matchesValue;
  });

  const handleLeadAction = (lead: any, actionType: string, destination: string) => {
    setSelectedLead(lead);
    setSelectedAction({ type: actionType, destination });
    setModalOpen(true);
  };

  const handleModalSubmit = (notes: string) => {
    if (selectedLead && selectedAction.destination) {
      moveLead(selectedLead.id, 'Cold Bucket', selectedAction.destination, notes);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLead(null);
    setSelectedAction({type: '', destination: ''});
  };

  return (
    <div className="space-y-6">
      {/* Cold Bucket Metrics - Single Row */}
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Cold Leads */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shadow-md text-sm">
                <Snowflake className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-gray-800">Total Cold Leads</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">{coldBucketStats.totalLeads}</div>
            <div className="text-gray-500 text-xs mt-1">Inactive prospects</div>
            <div className="flex items-center justify-center text-red-500 text-xs font-semibold mt-2">
              <TrendingDown className="w-3 h-3 mr-1" />
              Requires attention
            </div>
          </div>

          {/* Total Value */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shadow-md text-sm">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-gray-800">Total Value</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">${(coldBucketStats.totalValue / 1000).toFixed(0)}k</div>
            <div className="text-gray-500 text-xs mt-1">Potential revenue</div>
            <div className="flex items-center justify-center text-orange-500 text-xs font-semibold mt-2">
              <AlertTriangle className="w-3 h-3 mr-1" />
              At risk
            </div>
          </div>

          {/* Average Value */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shadow-md text-sm">💰</div>
              <span className="font-semibold text-sm text-gray-800">Avg. Value</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">${coldBucketStats.avgValue.toLocaleString()}</div>
            <div className="text-gray-500 text-xs mt-1">Average deal size</div>
            <div className="flex items-center justify-center text-gray-500 text-xs font-semibold mt-2">
              <span className="mr-1">📊</span> Historical
            </div>
          </div>

          {/* Avg. Days Inactive */}
          <div className="text-center border-l border-gray-100 pl-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shadow-md text-sm">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm text-gray-800">Avg. Days Inactive</span>
            </div>
            <div className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">{coldBucketStats.avgDaysInactive}</div>
            <div className="text-gray-500 text-xs mt-1">Days since last activity</div>
            <div className="flex items-center justify-center text-red-500 text-xs font-semibold mt-2">
              <Calendar className="w-3 h-3 mr-1" />
              Long dormant
            </div>
          </div>
        </div>
      </div>

      {/* Re-engagement Campaigns */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 shadow-md">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span className="font-semibold text-lg text-gray-800">Re-engagement Campaigns</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reEngagementCampaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">{campaign.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{campaign.type}</span>
                <span className="font-semibold text-green-600">{campaign.success_rate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cold Bucket Database */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shadow-md text-xl">
              <Snowflake className="w-6 h-6" />
            </div>
            <span className="font-semibold text-lg text-gray-800">Cold Bucket Database</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Bulk Re-engage
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
          <Select value={stageFilter} onValueChange={setStageFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by original stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="TOFU">From TOFU</SelectItem>
              <SelectItem value="MOFU">From MOFU</SelectItem>
              <SelectItem value="BOFU">From BOFU</SelectItem>
            </SelectContent>
          </Select>
          <Select value={valueFilter} onValueChange={setValueFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Values</SelectItem>
              <SelectItem value="high">High ($50k+)</SelectItem>
              <SelectItem value="medium">Medium ($30k-$50k)</SelectItem>
              <SelectItem value="low">Low (Under $30k)</SelectItem>
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
                <th className="pb-3">Value</th>
                <th className="pb-3">Stage</th>
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
                      {lead.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                      <span className={`text-sm font-medium ${getValueColor(lead.value)}`}>
                        ${lead.value.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge className={getStageColor(lead.original_stage)}>
                      {lead.stage}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <div className="max-w-48">
                      <p className="text-sm text-gray-900 truncate" title={lead.notes}>
                        {lead.notes}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Moved: {lead.moved_date}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="p-2">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="p-2">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="p-2 bg-blue-50 border-blue-200 hover:bg-blue-100">
                            <RefreshCw className="w-4 h-4 text-blue-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleLeadAction(lead, 'reengage', 'Email Campaign')}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email Re-engagement
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleLeadAction(lead, 'schedule', 'Call Schedule')}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Call
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleLeadAction(lead, 'send', 'Resource Package')}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Send Resources
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleLeadAction(lead, 'move', 'Active Funnel')}
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Move Back to Funnel
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
            <Snowflake className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No cold leads found matching your criteria.</p>
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
    </div>
  );
};