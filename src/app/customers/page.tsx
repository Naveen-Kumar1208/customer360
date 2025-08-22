"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { useLeads } from "@/contexts/LeadContext";
import { CustomerAnalytics } from "@/components/customers/CustomerAnalytics";
import { CustomerJourney } from "@/components/customers/CustomerJourney";
import { CustomerContact } from "@/components/customers/CustomerContact";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Activity,
  ShoppingCart,
  Plus,
  BarChart3,
  Target,
  Globe,
  Award,
  Upload
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";

export default function CustomersPage() {
  const { customers } = useLeads();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // cards or table
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalType, setModalType] = useState(""); // profile, analytics, journey, contact
  const [customerFeedback, setCustomerFeedback] = useState({});

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      inactive: { color: "bg-gray-100 text-gray-800", text: "Inactive" }
    };
    const config = statusConfig[status] || statusConfig.active;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getTierBadge = (tier: string) => {
    const tierConfig = {
      premium: { color: "bg-purple-100 text-purple-800", text: "Premium" },
      gold: { color: "bg-yellow-100 text-yellow-800", text: "Gold" },
      silver: { color: "bg-gray-100 text-gray-800", text: "Silver" },
      bronze: { color: "bg-orange-100 text-orange-800", text: "Bronze" }
    };
    const config = tierConfig[tier] || tierConfig.bronze;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const filteredCustomers = customers.filter(customer =>
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLTV = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);
  const avgLTV = totalLTV / customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const premiumCustomers = customers.filter(c => c.tier === 'premium').length;
  const convertedLeads = customers.filter(c => c.originalLeadId).length;

  // Modal functions
  const openModal = (customer, type) => {
    setSelectedCustomer(customer);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setModalType("");
  };

  // Emoji feedback functions
  const getCustomerSentiment = (customer) => {
    const score = Math.min(100, Math.round((customer.totalSpent / 1000) + (customer.orderCount * 5)));
    if (score >= 80) return { emoji: "😊", feedback: "Happy - High value customer with excellent engagement" };
    if (score >= 60) return { emoji: "😐", feedback: "Neutral - Moderate engagement, potential for growth" };
    if (score >= 40) return { emoji: "😕", feedback: "Concerned - Low engagement, needs attention" };
    return { emoji: "😠", feedback: "Angry - Poor experience or churning risk" };
  };

  // Navigation functions (kept for compatibility)
  const navigateToCustomer = (customerId: string, tab?: string) => {
    const url = `/customers/${customerId}${tab ? `?tab=${tab}` : ''}`;
    router.push(url);
  };

  // Render modal content based on type
  const renderModalContent = () => {
    if (!selectedCustomer) return null;

    switch (modalType) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {selectedCustomer.firstName[0]}{selectedCustomer.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedCustomer.firstName} {selectedCustomer.lastName}</h3>
                <p className="text-gray-600">{selectedCustomer.email}</p>
                <div className="flex gap-2 mt-2">
                  {getStatusBadge(selectedCustomer.status)}
                  {getTierBadge(selectedCustomer.tier)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Contact Information</h4>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {selectedCustomer.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {selectedCustomer.location}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Key Metrics</h4>
                <div className="text-sm space-y-1">
                  <div>Total Spent: <span className="font-semibold">${selectedCustomer.totalSpent.toLocaleString()}</span></div>
                  <div>Orders: <span className="font-semibold">{selectedCustomer.orderCount}</span></div>
                  <div>LTV: <span className="font-semibold">${selectedCustomer.lifetimeValue.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Customer Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCustomer.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return <CustomerAnalytics customer={selectedCustomer} />;
      
      case 'journey':
        return <CustomerJourney customer={selectedCustomer} />;
      
      case 'contact':
        return <CustomerContact customer={selectedCustomer} />;
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!selectedCustomer) return "";
    const name = `${selectedCustomer.firstName} ${selectedCustomer.lastName}`;
    switch (modalType) {
      case 'profile': return `${name} - Profile`;
      case 'analytics': return `${name} - Analytics`;
      case 'journey': return `${name} - Customer Journey`;
      case 'contact': return `${name} - Contact History`;
      default: return name;
    }
  };

  return (
    <StaticExportLayout>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customer 360° View</h1>
              <p className="text-muted-foreground">
                Complete customer profiles with behavioral insights and engagement analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowAddCustomerModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
              <Button variant="outline" onClick={() => router.push('/data-services/upload')}>
                <Upload className="h-4 w-4 mr-2" />
                Import Customers
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                    <p className="text-2xl font-bold">{customers.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">All registered users</p>
                  </div>
                  <Users className="h-8 w-8 text-[#e85b5e]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                    <p className="text-2xl font-bold">{activeCustomers}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {((activeCustomers / customers.length) * 100).toFixed(1)}% active rate
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Premium Customers</p>
                    <p className="text-2xl font-bold">{premiumCustomers}</p>
                    <p className="text-xs text-purple-600 mt-1">
                      {((premiumCustomers / customers.length) * 100).toFixed(1)}% premium
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Lifetime Value</p>
                    <p className="text-2xl font-bold">${avgLTV.toFixed(0)}</p>
                    <p className="text-xs text-orange-600 mt-1">
                      ${totalLTV.toLocaleString()} total LTV
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Converted Leads</p>
                    <p className="text-2xl font-bold">{convertedLeads}</p>
                    <p className="text-xs text-[#e85b5e] mt-1">
                      {customers.length > 0 ? ((convertedLeads / customers.length) * 100).toFixed(1) : 0}% from leads
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-[#e85b5e]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'cards' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
          </div>

          {/* Customer List */}
          {viewMode === 'cards' ? (
            <div className="grid gap-6">
              {filteredCustomers.map((customer) => (
                <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Customer Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div 
                            className="w-16 h-16 bg-gradient-to-br from-[#e85b5e] to-[#c7494c] rounded-full flex items-center justify-center text-white text-xl font-bold cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => navigateToCustomer(customer.id)}
                            title="View customer details"
                          >
                            {customer.firstName[0]}{customer.lastName[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 
                                className="text-xl font-semibold cursor-pointer hover:text-[#e85b5e] transition-colors"
                                onClick={() => navigateToCustomer(customer.id)}
                                title="View customer details"
                              >
                                {customer.firstName} {customer.lastName}
                              </h3>
                              {getStatusBadge(customer.status)}
                              {getTierBadge(customer.tier)}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {customer.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {customer.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {customer.location}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Customer Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                          <div className="text-center p-4 bg-red-50 rounded-lg border">
                            <div className="text-2xl font-bold text-[#e85b5e]">${customer.totalSpent.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Spent</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg border">
                            <div className="text-2xl font-bold text-green-600">${customer.lifetimeValue.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Lifetime Value</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg border">
                            <div className="text-2xl font-bold text-purple-600">{customer.orderCount}</div>
                            <div className="text-sm text-muted-foreground">Total Orders</div>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg border">
                            <div className="text-2xl font-bold text-orange-600">
                              ${customer.orderCount > 0 ? Math.round(customer.totalSpent / customer.orderCount).toLocaleString() : '0'}
                            </div>
                            <div className="text-sm text-muted-foreground">Avg Order Value</div>
                          </div>
                          <div className="text-center p-4 bg-teal-50 rounded-lg border">
                            <div className="text-2xl font-bold text-teal-600">
                              {(15 + Math.random() * 45).toFixed(1)}d
                            </div>
                            <div className="text-sm text-muted-foreground">Conversion Time</div>
                          </div>
                        </div>

                        {/* Customer Journey & Behavior Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm font-medium mb-1">Customer Journey</div>
                            <div className="text-sm text-muted-foreground">
                              <div>Source: <span className="font-medium">{customer.source}</span></div>
                              <div>Registered: <span className="font-medium">{customer.registrationDate}</span></div>
                              <div>Last Login: <span className="font-medium">{customer.lastLogin}</span></div>
                              {customer.originalLeadId && (
                                <div className="mt-2 p-2 bg-red-50 rounded border">
                                  <div className="text-xs font-medium text-red-800">Lead Conversion</div>
                                  <div className="text-xs text-[#e85b5e]">
                                    From: {customer.movedFromStage} • {customer.movedDate}
                                  </div>
                                  {customer.conversionNotes && (
                                    <div className="text-xs text-[#e85b5e] mt-1">
                                      "{customer.conversionNotes}"
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Segmentation</div>
                            <div className="text-sm">
                              <Badge variant="outline" className="mb-1">{customer.segment}</Badge>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Engagement Tags</div>
                            <div className="flex flex-wrap gap-1">
                              {customer.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {customer.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{customer.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions with Emoji Feedback */}
                        <div className="flex gap-2 items-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal(customer, 'profile')}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal(customer, 'analytics')}
                          >
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal(customer, 'journey')}
                          >
                            <Activity className="h-4 w-4 mr-1" />
                            Journey
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openModal(customer, 'contact')}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          
                          {/* Emoji Feedback */}
                          <SimpleTooltip content={getCustomerSentiment(customer).feedback}>
                            <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">
                              {getCustomerSentiment(customer).emoji}
                            </span>
                          </SimpleTooltip>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Table View */
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-gray-50">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Contact</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Tier</th>
                        <th className="p-4 font-medium">Total Spent</th>
                        <th className="p-4 font-medium">LTV</th>
                        <th className="p-4 font-medium">Orders</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr key={customer.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-10 h-10 bg-gradient-to-br from-[#e85b5e] to-[#c7494c] rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => navigateToCustomer(customer.id)}
                                title="View customer details"
                              >
                                {customer.firstName[0]}{customer.lastName[0]}
                              </div>
                              <div>
                                <div 
                                  className="font-medium cursor-pointer hover:text-[#e85b5e] transition-colors"
                                  onClick={() => navigateToCustomer(customer.id)}
                                  title="View customer details"
                                >
                                  {customer.firstName} {customer.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground">{customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <div className="text-sm">{customer.email}</div>
                              <div className="text-sm text-muted-foreground">{customer.phone}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(customer.status)}
                          </td>
                          <td className="p-4">
                            {getTierBadge(customer.tier)}
                          </td>
                          <td className="p-4">
                            <div className="font-medium">${customer.totalSpent.toLocaleString()}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">${customer.lifetimeValue.toLocaleString()}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">{customer.orderCount}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1 items-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openModal(customer, 'profile')}
                                title="View Profile"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openModal(customer, 'analytics')}
                                title="Analytics"
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openModal(customer, 'journey')}
                                title="Journey"
                              >
                                <Activity className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => openModal(customer, 'contact')}
                                title="Contact"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              
                              {/* Emoji Feedback */}
                              <SimpleTooltip content={getCustomerSentiment(customer).feedback}>
                                <span className="text-lg cursor-pointer hover:scale-110 transition-transform ml-2">
                                  {getCustomerSentiment(customer).emoji}
                                </span>
                              </SimpleTooltip>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Add Customer Modal */}
          <AddCustomerModal
            isOpen={showAddCustomerModal}
            onClose={() => setShowAddCustomerModal(false)}
          />

          {/* Customer Detail Modals */}
          <Dialog open={!!selectedCustomer && !!modalType} onOpenChange={closeModal}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{getModalTitle()}</DialogTitle>
                <DialogDescription>
                  {modalType === 'profile' && 'Complete customer profile and personal information'}
                  {modalType === 'analytics' && 'Customer behavior analytics and performance metrics'}
                  {modalType === 'journey' && 'Customer journey timeline and touchpoints'}
                  {modalType === 'contact' && 'Communication history and contact preferences'}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                {renderModalContent()}
              </div>
            </DialogContent>
          </Dialog>
        </div>
    </StaticExportLayout>
  );
}