"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Send, 
  Users, 
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Filter
} from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'active';
  recipients: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  replyRate: number;
  createdAt: Date;
  scheduledAt?: Date;
  sentAt?: Date;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: string;
  usage: number;
  lastUsed: Date;
}

const sampleCampaigns: EmailCampaign[] = [
  {
    id: 'camp_001',
    name: 'Business Loan Promotion',
    subject: 'Unlock Growth with Our Business Loans - Up to ₹1Cr',
    status: 'sent',
    recipients: 1250,
    sentCount: 1250,
    openRate: 34.5,
    clickRate: 8.2,
    replyRate: 2.1,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'camp_002',
    name: 'Personal Loan Follow-up',
    subject: 'Complete Your Personal Loan Application',
    status: 'active',
    recipients: 680,
    sentCount: 680,
    openRate: 45.2,
    clickRate: 12.8,
    replyRate: 4.5,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'camp_003',
    name: 'Equipment Finance Special Offer',
    subject: 'Special Equipment Finance Rates - Limited Time',
    status: 'scheduled',
    recipients: 890,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    replyRate: 0,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'camp_004',
    name: 'Welcome Series - New Leads',
    subject: 'Welcome to [Company] - Your Financial Partner',
    status: 'draft',
    recipients: 0,
    sentCount: 0,
    openRate: 0,
    clickRate: 0,
    replyRate: 0,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

const sampleTemplates: EmailTemplate[] = [
  {
    id: 'temp_001',
    name: 'Welcome Email',
    subject: 'Welcome to [Company Name]',
    category: 'Onboarding',
    usage: 245,
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'temp_002',
    name: 'Loan Application Follow-up',
    subject: 'Your Loan Application Status',
    category: 'Follow-up',
    usage: 189,
    lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'temp_003',
    name: 'Document Request',
    subject: 'Documents Required for Your Application',
    category: 'Documentation',
    usage: 156,
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'temp_004',
    name: 'Loan Approval Notification',
    subject: 'Congratulations! Your Loan is Approved',
    category: 'Approval',
    usage: 98,
    lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

function CampaignCard({ campaign }: { campaign: EmailCampaign }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'sent': return <CheckCircle className="h-4 w-4" />;
      case 'active': return <TrendingUp className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{campaign.subject}</p>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(campaign.status)}>
                {getStatusIcon(campaign.status)}
                <span className="ml-1 capitalize">{campaign.status}</span>
              </Badge>
              <span className="text-sm text-gray-500">
                {campaign.recipients} recipients
              </span>
            </div>
          </div>
        </div>

        {campaign.status === 'sent' || campaign.status === 'active' ? (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{campaign.openRate}%</p>
              <p className="text-xs text-gray-500">Open Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{campaign.clickRate}%</p>
              <p className="text-xs text-gray-500">Click Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{campaign.replyRate}%</p>
              <p className="text-xs text-gray-500">Reply Rate</p>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              {campaign.status === 'scheduled' 
                ? `Scheduled for ${formatDate(campaign.scheduledAt!)}`
                : 'Campaign is in draft mode'
              }
            </p>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>Created: {formatDate(campaign.createdAt)}</span>
          {campaign.sentAt && (
            <span>Sent: {formatDate(campaign.sentAt)}</span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          {campaign.status === 'draft' && (
            <Button size="sm" className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function TemplateCard({ template }: { template: EmailTemplate }) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{template.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
          </div>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Used {template.usage} times</span>
          <span>Last used: {formatDate(template.lastUsed)}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            Use Template
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateCampaignDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Email Campaign</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Campaign Name</label>
            <Input placeholder="Enter campaign name" />
          </div>
          <div>
            <label className="text-sm font-medium">Subject Line</label>
            <Input placeholder="Enter email subject" />
          </div>
          <div>
            <label className="text-sm font-medium">Recipients</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient list" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_leads">All Leads</SelectItem>
                <SelectItem value="tofu_leads">TOFU Leads</SelectItem>
                <SelectItem value="mofu_leads">MOFU Leads</SelectItem>
                <SelectItem value="bofu_leads">BOFU Leads</SelectItem>
                <SelectItem value="customers">Existing Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Email Content</label>
            <Textarea 
              placeholder="Enter your email content here..."
              className="min-h-32"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Schedule Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EmailCampaigns() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "templates">("campaigns");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCampaigns = sampleCampaigns.filter(campaign => 
    statusFilter === "all" || campaign.status === statusFilter
  );

  const totalSent = sampleCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const avgOpenRate = sampleCampaigns
    .filter(c => c.sentCount > 0)
    .reduce((sum, c) => sum + c.openRate, 0) / sampleCampaigns.filter(c => c.sentCount > 0).length;
  const avgClickRate = sampleCampaigns
    .filter(c => c.sentCount > 0)
    .reduce((sum, c) => sum + c.clickRate, 0) / sampleCampaigns.filter(c => c.sentCount > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600 mt-1">Create and manage email marketing campaigns</p>
        </div>
        <CreateCampaignDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{sampleCampaigns.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                <p className="text-2xl font-bold text-green-600">{totalSent.toLocaleString()}</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold text-yellow-600">{avgOpenRate.toFixed(1)}%</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                <p className="text-2xl font-bold text-purple-600">{avgClickRate.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === "campaigns" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("campaigns")}
          >
            Campaigns
          </Button>
          <Button
            variant={activeTab === "templates" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("templates")}
          >
            Templates
          </Button>
        </div>

        {activeTab === "campaigns" && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Content */}
      {activeTab === "campaigns" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sampleTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}

      {filteredCampaigns.length === 0 && activeTab === "campaigns" && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">
              Create your first email campaign to start engaging with your leads.
            </p>
            <CreateCampaignDialog />
          </CardContent>
        </Card>
      )}
    </div>
  );
}