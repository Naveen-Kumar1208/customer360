"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MessageSquare, 
  BarChart3,
  Calendar,
  Users,
  TrendingUp,
  Activity,
  Clock,
  RefreshCw,
  Download,
  Eye,
  Search,
  Filter
} from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CampaignContact {
  phone: string;
  name?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'duplicate';
  messageId?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
  retryCount?: number;
}

interface WhatsAppCampaign {
  id: string;
  name: string;
  templateName: string;
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  totalContacts: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  duplicateCount: number;
  clickCount: number;
  ctr: number;
  estimatedCost: number;
  contacts: CampaignContact[];
}

// Mock data - In production, this would come from your database
const mockCampaigns: WhatsAppCampaign[] = [
  {
    id: 'camp_1732248934_abc123',
    name: 'Product Launch Campaign',
    templateName: 'hello_world',
    status: 'completed',
    createdAt: '2024-08-22T10:30:00Z',
    startedAt: '2024-08-22T10:31:00Z',
    completedAt: '2024-08-22T10:45:00Z',
    totalContacts: 150,
    sentCount: 142,
    deliveredCount: 138,
    readCount: 124,
    failedCount: 8,
    duplicateCount: 3,
    clickCount: 45,
    ctr: 32.6,
    estimatedCost: 7.10,
    contacts: [
      {
        phone: '919788288496',
        name: 'John Doe',
        status: 'read',
        messageId: 'msg_test_1732248934001',
        sentAt: '2024-08-22T10:31:15Z',
        deliveredAt: '2024-08-22T10:31:45Z',
        readAt: '2024-08-22T11:15:30Z'
      },
      {
        phone: '918144162853',
        name: 'Jane Smith',
        status: 'delivered',
        messageId: 'msg_test_1732248934002',
        sentAt: '2024-08-22T10:31:16Z',
        deliveredAt: '2024-08-22T10:32:10Z'
      },
      {
        phone: '917890123456',
        name: 'Bob Wilson',
        status: 'failed',
        errorMessage: 'Invalid phone number',
        retryCount: 3
      }
    ]
  },
  {
    id: 'camp_1732248834_def456',
    name: 'Customer Support Follow-up',
    templateName: 'sample_template', 
    status: 'completed',
    createdAt: '2024-08-21T14:20:00Z',
    startedAt: '2024-08-21T14:21:00Z',
    completedAt: '2024-08-21T14:35:00Z',
    totalContacts: 89,
    sentCount: 85,
    deliveredCount: 82,
    readCount: 76,
    failedCount: 4,
    duplicateCount: 2,
    clickCount: 23,
    ctr: 27.1,
    estimatedCost: 4.45,
    contacts: []
  },
  {
    id: 'camp_1732248734_ghi789',
    name: 'Weekly Newsletter',
    templateName: 'hello_world',
    status: 'running',
    createdAt: '2024-08-22T09:00:00Z',
    startedAt: '2024-08-22T09:01:00Z',
    totalContacts: 250,
    sentCount: 180,
    deliveredCount: 165,
    readCount: 98,
    failedCount: 15,
    duplicateCount: 5,
    clickCount: 12,
    ctr: 6.7,
    estimatedCost: 12.50,
    contacts: []
  }
];

export default function WhatsAppAnalyticsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>(mockCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<WhatsAppCampaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Load campaign details
  const loadCampaignDetails = async (campaignId: string) => {
    setIsLoading(true);
    try {
      // In production, this would fetch from your API
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setSelectedCampaign(campaign);
      }
    } catch (error) {
      console.error('Failed to load campaign details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh campaigns list
  const refreshCampaigns = async () => {
    setIsLoading(true);
    try {
      // In production, fetch updated data from API
      console.log('Refreshing campaigns...');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to refresh campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'secondary';
      case 'scheduled': return 'outline';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <StaticExportLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/engagement')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <BarChart3 className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">WhatsApp Campaign Analytics</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={refreshCampaigns}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaigns List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Campaigns ({filteredCampaigns.length})
                  </CardTitle>
                </div>
                
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="running">Running</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {filteredCampaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      onClick={() => loadCampaignDetails(campaign.id)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedCampaign?.id === campaign.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-sm truncate">{campaign.name}</h3>
                        <Badge variant={getStatusBadgeVariant(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Template:</span>
                          <span className="font-mono">{campaign.templateName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Contacts:</span>
                          <span>{campaign.totalContacts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Success Rate:</span>
                          <span className="text-green-600">
                            {campaign.totalContacts > 0 ? Math.round((campaign.sentCount / campaign.totalContacts) * 100) : 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Created:</span>
                          <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredCampaigns.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No campaigns found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Analytics */}
          <div className="lg:col-span-2">
            {selectedCampaign ? (
              <div className="space-y-6">
                {/* Campaign Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5" />
                          {selectedCampaign.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>ID: <code className="bg-gray-100 px-1 rounded">{selectedCampaign.id}</code></span>
                          <span>Template: <code className="bg-gray-100 px-1 rounded">{selectedCampaign.templateName}</code></span>
                          <Badge variant={getStatusBadgeVariant(selectedCampaign.status)}>
                            {selectedCampaign.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedCampaign.totalContacts}</div>
                      <div className="text-sm text-gray-600">Total Contacts</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedCampaign.sentCount}</div>
                      <div className="text-sm text-gray-600">Sent</div>
                      <div className="text-xs text-green-600">
                        {selectedCampaign.totalContacts > 0 ? Math.round((selectedCampaign.sentCount / selectedCampaign.totalContacts) * 100) : 0}%
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCampaign.deliveredCount}</div>
                      <div className="text-sm text-gray-600">Delivered</div>
                      <div className="text-xs text-purple-600">
                        {selectedCampaign.sentCount > 0 ? Math.round((selectedCampaign.deliveredCount / selectedCampaign.sentCount) * 100) : 0}%
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600">{selectedCampaign.readCount}</div>
                      <div className="text-sm text-gray-600">Read</div>
                      <div className="text-xs text-indigo-600">
                        {selectedCampaign.deliveredCount > 0 ? Math.round((selectedCampaign.readCount / selectedCampaign.deliveredCount) * 100) : 0}%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">Click-Through Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">{selectedCampaign.ctr}%</div>
                      <div className="text-sm text-gray-600">{selectedCampaign.clickCount} clicks</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-red-600" />
                        <span className="font-medium">Failed Messages</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">{selectedCampaign.failedCount}</div>
                      <div className="text-sm text-gray-600">
                        {selectedCampaign.totalContacts > 0 ? Math.round((selectedCampaign.failedCount / selectedCampaign.totalContacts) * 100) : 0}% failure rate
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Campaign Cost</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-600">${selectedCampaign.estimatedCost}</div>
                      <div className="text-sm text-gray-600">
                        ${(selectedCampaign.estimatedCost / Math.max(selectedCampaign.sentCount, 1)).toFixed(3)} per message
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Campaign Timeline & Contact Details */}
                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="contacts">Contact Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="timeline" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Campaign Timeline</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                              <div className="font-medium">Campaign Created</div>
                              <div className="text-sm text-gray-600">{new Date(selectedCampaign.createdAt).toLocaleString()}</div>
                            </div>
                          </div>
                          
                          {selectedCampaign.startedAt && (
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div>
                                <div className="font-medium">Campaign Started</div>
                                <div className="text-sm text-gray-600">{new Date(selectedCampaign.startedAt).toLocaleString()}</div>
                              </div>
                            </div>
                          )}
                          
                          {selectedCampaign.completedAt && (
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                              <div>
                                <div className="font-medium">Campaign Completed</div>
                                <div className="text-sm text-gray-600">{new Date(selectedCampaign.completedAt).toLocaleString()}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="contacts" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Details ({selectedCampaign.contacts.length} shown)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedCampaign.contacts.length > 0 ? (
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Sent At</TableHead>
                                  <TableHead>Delivered At</TableHead>
                                  <TableHead>Read At</TableHead>
                                  <TableHead>Error</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedCampaign.contacts.map((contact, index) => (
                                  <TableRow key={`${contact.phone}-${index}`}>
                                    <TableCell className="font-mono text-sm">{contact.phone}</TableCell>
                                    <TableCell>{contact.name || '-'}</TableCell>
                                    <TableCell>
                                      <Badge variant={
                                        contact.status === 'read' ? 'default' :
                                        contact.status === 'delivered' ? 'secondary' :
                                        contact.status === 'sent' ? 'outline' :
                                        contact.status === 'failed' ? 'destructive' :
                                        'secondary'
                                      }>
                                        {contact.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {contact.sentAt ? new Date(contact.sentAt).toLocaleTimeString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {contact.deliveredAt ? new Date(contact.deliveredAt).toLocaleTimeString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {contact.readAt ? new Date(contact.readAt).toLocaleTimeString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-sm text-red-600">
                                      {contact.errorMessage || '-'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No contact details available</p>
                            <p className="text-sm">Contact details are shown for recent campaigns</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a Campaign</h3>
                  <p>Choose a campaign from the list to view detailed analytics</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </StaticExportLayout>
  );
}