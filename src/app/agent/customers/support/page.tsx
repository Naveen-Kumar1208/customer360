"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MessageCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  TrendingUp,
  Users,
  Target,
  Plus,
  Send,
  Headphones,
  AlertCircle,
  RefreshCw,
  Download,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleCustomers } from "@/lib/data/customerData";
import { ExportTicketsModal } from "@/components/support/ExportTicketsModal";
import { CreateTicketModal } from "@/components/support/CreateTicketModal";
import { ViewTicketModal } from "@/components/support/ViewTicketModal";
import { UpdateTicketModal } from "@/components/support/UpdateTicketModal";
import { CallCustomerModal } from "@/components/support/CallCustomerModal";
import { SendEmailModal } from "@/components/support/SendEmailModal";
import { ReplyModal } from "@/components/support/ReplyModal";
import { ReopenTicketModal } from "@/components/support/ReopenTicketModal";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customer: any;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "pending_customer" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "technical" | "billing" | "feature_request" | "bug_report" | "general";
  assignedAgent: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  firstResponseTime?: number;
  resolutionTime?: number;
  satisfactionRating?: number;
  tags: string[];
  messages: {
    id: string;
    sender: "customer" | "agent";
    message: string;
    timestamp: Date;
  }[];
}

// Generate sample support tickets
const supportTickets: SupportTicket[] = sampleCustomers.slice(0, 8).map((customer, index) => {
  const createdAt = new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000 * Math.random() * 30);
  const updatedAt = new Date(createdAt.getTime() + Math.random() * 72 * 60 * 60 * 1000);
  
  const statuses = ["open", "in_progress", "pending_customer", "resolved", "closed"];
  const priorities = ["low", "medium", "high", "urgent"];
  const categories = ["technical", "billing", "feature_request", "bug_report", "general"];
  const subjects = [
    "Integration issue with API",
    "Billing discrepancy in last invoice",
    "Feature request: Advanced reporting",
    "Login problems after update",
    "Data export not working",
    "Performance issues on dashboard",
    "Mobile app crashes frequently",
    "User permissions not updating"
  ];

  const status = statuses[Math.floor(Math.random() * statuses.length)] as any;
  const resolvedAt = status === "resolved" || status === "closed" ? 
    new Date(updatedAt.getTime() + Math.random() * 24 * 60 * 60 * 1000) : undefined;

  return {
    id: `ticket-${index + 1}`,
    ticketNumber: `SUP-${String(1000 + index).padStart(4, '0')}`,
    customer,
    subject: subjects[index],
    description: `Customer is experiencing ${subjects[index].toLowerCase()}. Need immediate assistance to resolve this issue.`,
    status,
    priority: priorities[Math.floor(Math.random() * priorities.length)] as any,
    category: categories[Math.floor(Math.random() * categories.length)] as any,
    assignedAgent: `Agent ${Math.floor(Math.random() * 5) + 1}`,
    createdAt,
    updatedAt,
    resolvedAt,
    firstResponseTime: Math.random() * 24 * 60, // minutes
    resolutionTime: resolvedAt ? (resolvedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60) : undefined,
    satisfactionRating: status === "resolved" || status === "closed" ? 3 + Math.random() * 2 : undefined,
    tags: ["urgent", "api", "billing", "mobile", "dashboard"].slice(0, 2 + Math.floor(Math.random() * 3)),
    messages: [
      {
        id: "msg-1",
        sender: "customer",
        message: `I'm experiencing issues with ${subjects[index].toLowerCase()}. Can you please help?`,
        timestamp: createdAt
      },
      {
        id: "msg-2",
        sender: "agent",
        message: "Thank you for contacting support. I'm looking into this issue for you.",
        timestamp: new Date(createdAt.getTime() + 30 * 60 * 1000)
      }
    ]
  };
});

function SupportTicketCard({ 
  ticket, 
  onViewTicket, 
  onUpdateTicket, 
  onCallCustomer, 
  onSendEmail, 
  onReplyTicket, 
  onReopenTicket 
}: { 
  ticket: SupportTicket;
  onViewTicket: (ticket: SupportTicket) => void;
  onUpdateTicket: (ticket: SupportTicket) => void;
  onCallCustomer: (ticket: SupportTicket) => void;
  onSendEmail: (ticket: SupportTicket) => void;
  onReplyTicket: (ticket: SupportTicket) => void;
  onReopenTicket: (ticket: SupportTicket) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending_customer': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in_progress': return <RefreshCw className="h-4 w-4" />;
      case 'pending_customer': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'billing': return <FileText className="h-4 w-4 text-green-600" />;
      case 'feature_request': return <Target className="h-4 w-4 text-purple-600" />;
      case 'bug_report': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${Math.floor(diff / (1000 * 60))}m ago`;
  };

  const formatResponseTime = (minutes?: number) => {
    if (!minutes) return 'N/A';
    if (minutes < 60) return `${Math.round(minutes)}m`;
    return `${Math.round(minutes / 60)}h`;
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${ticket.priority === 'urgent' ? 'border-l-4 border-l-red-500' : ''}`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900">{ticket.ticketNumber}</h3>
                <Badge className={`border ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{ticket.customer.fullName}</p>
              <p className="text-xs text-gray-500">{ticket.customer.company?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(ticket.status)}>
              {getStatusIcon(ticket.status)}
              <span className="ml-1">{ticket.status.replace('_', ' ')}</span>
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewTicket(ticket)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateTicket(ticket)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update Ticket
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCallCustomer(ticket)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Customer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSendEmail(ticket)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            {getCategoryIcon(ticket.category)}
            <h4 className="font-medium text-gray-900">{ticket.subject}</h4>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-gray-600">Response Time</p>
            <p className="text-sm font-semibold">{formatResponseTime(ticket.firstResponseTime)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Resolution Time</p>
            <p className="text-sm font-semibold">
              {ticket.resolutionTime ? `${Math.round(ticket.resolutionTime)}h` : 'Pending'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">Satisfaction</p>
            <p className="text-sm font-semibold">
              {ticket.satisfactionRating ? 
                `${ticket.satisfactionRating.toFixed(1)}/5` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Assignment & Timeline */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Assigned to:</span>
            <span className="font-medium">{ticket.assignedAgent}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-500">{timeAgo(ticket.updatedAt)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {ticket.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {ticket.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{ticket.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Latest Message Preview */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-blue-900">
              Latest from {ticket.messages[ticket.messages.length - 1]?.sender}:
            </p>
            <p className="text-xs text-blue-700">
              {timeAgo(ticket.messages[ticket.messages.length - 1]?.timestamp)}
            </p>
          </div>
          <p className="text-sm text-blue-800 line-clamp-2">
            {ticket.messages[ticket.messages.length - 1]?.message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1" onClick={() => onReplyTicket(ticket)}>
            <MessageCircle className="mr-1 h-3 w-3" />
            Reply
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onViewTicket(ticket)}>
            <Eye className="mr-1 h-3 w-3" />
            View
          </Button>
          {ticket.status === 'open' || ticket.status === 'in_progress' ? (
            <Button size="sm" variant="outline" className="flex-1">
              <CheckCircle className="mr-1 h-3 w-3" />
              Resolve
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="flex-1" onClick={() => onReopenTicket(ticket)}>
              <RefreshCw className="mr-1 h-3 w-3" />
              Reopen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerSupport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = searchTerm === "" || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === "all" || ticket.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalTickets = supportTickets.length;
  const openTickets = supportTickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;
  const urgentTickets = supportTickets.filter(t => t.priority === 'urgent').length;
  const avgSatisfaction = supportTickets
    .filter(t => t.satisfactionRating)
    .reduce((sum, t) => sum + (t.satisfactionRating || 0), 0) / 
    supportTickets.filter(t => t.satisfactionRating).length || 0;

  // Modal handlers
  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };

  const handleUpdateTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowUpdateModal(true);
  };

  const handleCallCustomer = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowCallModal(true);
  };

  const handleSendEmail = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowEmailModal(true);
  };

  const handleReplyTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowReplyModal(true);
  };

  const handleReopenTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowReopenModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          <p className="text-gray-600 mt-1">Manage customer support tickets and inquiries</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowExportModal(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export Tickets
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold">{totalTickets}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-orange-600">{openTickets}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Tickets</p>
                <p className="text-2xl font-bold text-red-600">{urgentTickets}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                <p className="text-2xl font-bold text-green-600">{avgSatisfaction.toFixed(1)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex space-x-1">
              <Button 
                variant={selectedStatus === "all" ? "default" : "outline"}
                onClick={() => setSelectedStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={selectedStatus === "open" ? "default" : "outline"}
                onClick={() => setSelectedStatus("open")}
                size="sm"
              >
                Open
              </Button>
              <Button 
                variant={selectedStatus === "in_progress" ? "default" : "outline"}
                onClick={() => setSelectedStatus("in_progress")}
                size="sm"
              >
                In Progress
              </Button>
            </div>

            <div className="flex space-x-1">
              <Button 
                variant={selectedPriority === "all" ? "default" : "outline"}
                onClick={() => setSelectedPriority("all")}
                size="sm"
              >
                All Priority
              </Button>
              <Button 
                variant={selectedPriority === "urgent" ? "default" : "outline"}
                onClick={() => setSelectedPriority("urgent")}
                size="sm"
              >
                Urgent
              </Button>
              <Button 
                variant={selectedPriority === "high" ? "default" : "outline"}
                onClick={() => setSelectedPriority("high")}
                size="sm"
              >
                High
              </Button>
            </div>

            <div className="flex space-x-1">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All Types
              </Button>
              <Button 
                variant={selectedCategory === "technical" ? "default" : "outline"}
                onClick={() => setSelectedCategory("technical")}
                size="sm"
              >
                Technical
              </Button>
              <Button 
                variant={selectedCategory === "billing" ? "default" : "outline"}
                onClick={() => setSelectedCategory("billing")}
                size="sm"
              >
                Billing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredTickets.length} of {supportTickets.length} support tickets
        </p>
      </div>

      {/* Support Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTickets.map((ticket) => (
          <SupportTicketCard 
            key={ticket.id} 
            ticket={ticket}
            onViewTicket={handleViewTicket}
            onUpdateTicket={handleUpdateTicket}
            onCallCustomer={handleCallCustomer}
            onSendEmail={handleSendEmail}
            onReplyTicket={handleReplyTicket}
            onReopenTicket={handleReopenTicket}
          />
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Headphones className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Ticket
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <ExportTicketsModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
      />
      <CreateTicketModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
      <ViewTicketModal 
        isOpen={showViewModal} 
        onClose={() => setShowViewModal(false)}
        ticket={selectedTicket}
      />
      <UpdateTicketModal 
        isOpen={showUpdateModal} 
        onClose={() => setShowUpdateModal(false)}
        ticket={selectedTicket}
      />
      <CallCustomerModal 
        isOpen={showCallModal} 
        onClose={() => setShowCallModal(false)}
        ticket={selectedTicket}
      />
      <SendEmailModal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)}
        ticket={selectedTicket}
      />
      <ReplyModal 
        isOpen={showReplyModal} 
        onClose={() => setShowReplyModal(false)}
        ticket={selectedTicket}
      />
      <ReopenTicketModal 
        isOpen={showReopenModal} 
        onClose={() => setShowReopenModal(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}