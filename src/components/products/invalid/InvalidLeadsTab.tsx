"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  XCircle, 
  AlertTriangle, 
  Trash2, 
  CheckCircle, 
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  RefreshCw,
  Download
} from "lucide-react";
import { invalidLeadsData } from "@/lib/data/invalidLeadsData";

export function InvalidLeadsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  // Filter leads based on search term and filters
  const filteredLeads = useMemo(() => {
    return invalidLeadsData.filter(lead => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesReason = reasonFilter === "all" || lead.invalidReason === reasonFilter;
      
      return matchesSearch && matchesStatus && matchesReason;
    });
  }, [searchTerm, statusFilter, reasonFilter]);

  // Group leads by invalid reason for summary
  const leadsByReason = useMemo(() => {
    const grouped = invalidLeadsData.reduce((acc, lead) => {
      const reason = lead.invalidReason;
      if (!acc[reason]) {
        acc[reason] = [];
      }
      acc[reason].push(lead);
      return acc;
    }, {} as Record<string, typeof invalidLeadsData>);
    
    return grouped;
  }, []);

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "invalid": return "bg-red-100 text-red-800";
      case "flagged": return "bg-orange-100 text-orange-800";
      case "reviewing": return "bg-yellow-100 text-yellow-800";
      case "cleaned": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case "invalid_email": return <Mail className="h-4 w-4 text-red-500" />;
      case "duplicate": return <UserX className="h-4 w-4 text-orange-500" />;
      case "spam": return <XCircle className="h-4 w-4 text-red-500" />;
      case "incomplete_data": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-orange-600 bg-orange-50";
      case "low": return "text-yellow-600 bg-yellow-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(leadsByReason).map(([reason, leads]) => (
          <Card key={reason}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {reason.replace('_', ' ')}
              </CardTitle>
              {getReasonIcon(reason)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                {((leads.length / invalidLeadsData.length) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leads">Invalid Leads Database</TabsTrigger>
          <TabsTrigger value="analysis">Data Quality Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Invalid Leads Database
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredLeads.length} of {invalidLeadsData.length} invalid leads
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Validate
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="invalid">Invalid</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="cleaned">Cleaned</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={reasonFilter} onValueChange={setReasonFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reasons</SelectItem>
                    <SelectItem value="invalid_email">Invalid Email</SelectItem>
                    <SelectItem value="duplicate">Duplicate</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="incomplete_data">Incomplete Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {selectedLeads.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">
                      {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Mark Valid
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Re-validate
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Leads Table */}
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3">
                          <input
                            type="checkbox"
                            checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Reason</th>
                        <th className="text-left p-3 font-medium">Severity</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Detected</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="border-t hover:bg-gray-50">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead.id)}
                              onChange={() => handleSelectLead(lead.id)}
                              className="rounded"
                            />
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">{lead.email}</div>
                              {lead.phone && (
                                <div className="text-sm text-muted-foreground">{lead.phone}</div>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{lead.company}</div>
                              {lead.title && (
                                <div className="text-sm text-muted-foreground">{lead.title}</div>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center">
                              {getReasonIcon(lead.invalidReason)}
                              <span className="ml-2 text-sm capitalize">
                                {lead.invalidReason.replace('_', ' ')}
                              </span>
                            </div>
                            {lead.details && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {lead.details}
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <Badge className={getSeverityColor(lead.severity)}>
                              {lead.severity}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{lead.detectedDate}</div>
                            <div className="text-xs text-muted-foreground">{lead.source}</div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Lead Details: {lead.name}</DialogTitle>
                                    <DialogDescription>
                                      Complete information for this invalid lead
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Name</label>
                                        <p className="text-sm">{lead.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <p className="text-sm">{lead.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Company</label>
                                        <p className="text-sm">{lead.company}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Title</label>
                                        <p className="text-sm">{lead.title || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Invalid Reason</label>
                                        <p className="text-sm">{lead.invalidReason.replace('_', ' ')}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Severity</label>
                                        <Badge className={getSeverityColor(lead.severity)}>
                                          {lead.severity}
                                        </Badge>
                                      </div>
                                    </div>
                                    {lead.details && (
                                      <div>
                                        <label className="text-sm font-medium">Details</label>
                                        <p className="text-sm text-muted-foreground">{lead.details}</p>
                                      </div>
                                    )}
                                    {lead.notes && (
                                      <div>
                                        <label className="text-sm font-medium">Notes</label>
                                        <p className="text-sm text-muted-foreground">{lead.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredLeads.length === 0 && (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No invalid leads found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Quality Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Quality Score */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                    <div className="text-sm text-blue-800">Overall Data Quality</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                    <div className="text-sm text-green-800">Email Validation Rate</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4.2%</div>
                    <div className="text-sm text-orange-800">Invalid Lead Rate</div>
                  </div>
                </div>

                {/* Trend Analysis */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Quality Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Invalid Email Detection</span>
                      <span className="text-sm font-semibold text-red-600">↑ 12% this month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Duplicate Prevention</span>
                      <span className="text-sm font-semibold text-green-600">↓ 8% this month</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-sm">Data Completeness</span>
                      <span className="text-sm font-semibold text-blue-600">↑ 5% this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}