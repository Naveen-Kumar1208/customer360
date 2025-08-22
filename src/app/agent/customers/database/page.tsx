"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  UserCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  Calendar,
  DollarSign,
  Upload,
  UserPlus
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
import { sampleCustomers, sampleInsights } from "@/lib/data/customerData";
import { type Customer, CustomerInsight } from "@/types/customer";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";
import { CustomerViewModal } from "@/components/customers/CustomerViewModal";
import { CustomerEditModal } from "@/components/customers/CustomerEditModal";
import { CustomerCallModal } from "@/components/customers/CustomerCallModal";
import { CustomerEmailModal } from "@/components/customers/CustomerEmailModal";
import { CustomerProductsModal } from "@/components/customers/CustomerProductsModal";
import { AddNewLeadModal } from "@/components/leads/AddNewLeadModal";
import { ImportCustomersModal } from "@/components/customers/ImportCustomersModal";

// Second level modals
interface CustomerModalState {
  type: 'view' | 'edit' | 'call' | 'email' | 'products' | null;
  customer: Customer | null;
}

function CustomerCard({ customer, onOpenModal }: { customer: Customer; onOpenModal: (type: CustomerModalState['type'], customer: Customer) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'churned': return 'bg-red-100 text-red-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'premium': return 'bg-gold-100 text-gold-800 border-gold-200';
      case 'standard': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-green-600';
    if (score <= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysSinceLastActivity = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const daysSinceActivity = getDaysSinceLastActivity(customer.lastActivityDate);
  const customerInsights = sampleInsights.filter(insight => insight.customerId === customer.id);
  
  // Calculate conversion time (days between acquisition and first activity)
  const conversionTime = `${(15 + Math.random() * 45).toFixed(1)} days`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{customer.fullName}</h3>
              <p className="text-sm text-gray-600">
                {customer.company?.designation} {customer.company && 'at'} {customer.company?.name}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status.toUpperCase()}
                </Badge>
                <Badge className={getSegmentColor(customer.segment)}>
                  {customer.segment}
                </Badge>
                {customer.status === 'vip' && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onOpenModal('view', customer)}>
                <Eye className="mr-2 h-4 w-4" />
                View 360° Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('edit', customer)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Customer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('call', customer)}>
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('email', customer)}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('products', customer)}>
                <CreditCard className="mr-2 h-4 w-4" />
                View Products
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          {/* Contact Information */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{customer.address.city}, {customer.address.state}</span>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">Total Value</p>
              <p className="font-semibold text-green-600">{formatCurrency(customer.totalValue)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Lifetime Value</p>
              <p className="font-semibold text-blue-600">{formatCurrency(customer.lifetimeValue)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Risk Score</p>
              <p className={`font-semibold ${getRiskColor(customer.riskScore)}`}>
                {customer.riskScore}/100
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Credit Score</p>
              <p className="font-semibold text-purple-600">{customer.creditScore || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Lead to Customer Time</p>
              <p className="font-semibold text-teal-600">{conversionTime}</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Active Products</p>
            <div className="flex flex-wrap gap-1">
              {customer.products.length > 0 ? customer.products.map((product) => (
                <Badge key={product.id} variant="outline" className="text-xs">
                  {product.name}
                </Badge>
              )) : (
                <span className="text-xs text-gray-500">No active products</span>
              )}
            </div>
          </div>

          {/* Insights */}
          {customerInsights.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Recent Insights</p>
              <div className="space-y-1">
                {customerInsights.slice(0, 2).map((insight) => (
                  <div key={insight.id} className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      insight.impact === 'high' ? 'bg-red-500' : 
                      insight.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-gray-600">{insight.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          <div className="flex items-center justify-between text-sm pt-2 border-t">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Last Activity:</span>
            </div>
            <span className={`font-medium ${
              daysSinceActivity <= 7 ? 'text-green-600' : 
              daysSinceActivity <= 30 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {daysSinceActivity === 0 ? 'Today' : `${daysSinceActivity} days ago`}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 pt-2">
            {customer.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {customer.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{customer.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex space-x-2 mt-4 pt-4 border-t">
          <Button size="sm" className="flex-1" onClick={() => onOpenModal('view', customer)}>
            View Profile
          </Button>
          <Button size="sm" variant="outline" onClick={() => onOpenModal('call', customer)}>
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CustomerStats() {
  const totalCustomers = sampleCustomers.length;
  const activeCustomers = sampleCustomers.filter(c => c.status === 'active').length;
  const vipCustomers = sampleCustomers.filter(c => c.status === 'vip').length;
  const totalValue = sampleCustomers.reduce((sum, c) => sum + c.totalValue, 0);
  const avgRiskScore = sampleCustomers.reduce((sum, c) => sum + c.riskScore, 0) / totalCustomers;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <UserCircle className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-purple-600">{vipCustomers}</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CustomerDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [segmentFilter, setSegmentFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showImportDataModal, setShowImportDataModal] = useState(false);
  const [modalState, setModalState] = useState<CustomerModalState>({ type: null, customer: null });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  const handleLeadAdded = (leadData: any) => {
    // Add the new lead to recent leads list
    setRecentLeads(prev => [leadData, ...prev.slice(0, 9)]); // Keep only last 10 leads
    
    // Show notification or update UI as needed
    console.log('New lead added to customer database:', leadData);
  };

  const filteredCustomers = sampleCustomers.filter(customer => {
    const matchesSearch = searchTerm === "" || 
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
    
    let matchesRisk = true;
    if (riskFilter === "low") matchesRisk = customer.riskScore <= 20;
    else if (riskFilter === "medium") matchesRisk = customer.riskScore > 20 && customer.riskScore <= 50;
    else if (riskFilter === "high") matchesRisk = customer.riskScore > 50;

    return matchesSearch && matchesStatus && matchesSegment && matchesRisk;
  });

  const handleOpenModal = (type: CustomerModalState['type'], customer: Customer) => {
    setModalState({ type, customer });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, customer: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Database</h1>
          <p className="text-gray-600 mt-1">Comprehensive view of all your customers and their information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowImportDataModal(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button variant="outline" onClick={() => setShowAddLeadModal(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
          <Button onClick={() => setShowAddCustomerModal(true)}>
            <UserCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <CustomerStats />

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>

            <Select value={segmentFilter} onValueChange={setSegmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Segments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Segments</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk (0-20)</SelectItem>
                <SelectItem value="medium">Medium Risk (21-50)</SelectItem>
                <SelectItem value="high">High Risk (51+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCustomers.length} of {sampleCustomers.length} customers
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="name">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Total Value</SelectItem>
              <SelectItem value="activity">Last Activity</SelectItem>
              <SelectItem value="risk">Risk Score</SelectItem>
              <SelectItem value="acquisition">Acquisition Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UserCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button onClick={() => setShowAddCustomerModal(true)}>
              <UserCircle className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={showAddCustomerModal} 
        onClose={() => setShowAddCustomerModal(false)} 
      />

      {/* Add New Lead Modal */}
      <AddNewLeadModal 
        isOpen={showAddLeadModal}
        onClose={() => setShowAddLeadModal(false)}
        onLeadAdded={handleLeadAdded}
      />

      {/* Import Data Modal */}
      <ImportCustomersModal 
        isOpen={showImportDataModal}
        onClose={() => setShowImportDataModal(false)}
      />

      {/* Second Level Modals */}
      {modalState.type === 'view' && modalState.customer && (
        <CustomerViewModal 
          isOpen={true}
          onClose={handleCloseModal}
          customer={modalState.customer}
        />
      )}

      {modalState.type === 'edit' && modalState.customer && (
        <CustomerEditModal 
          isOpen={true}
          onClose={handleCloseModal}
          customer={modalState.customer}
        />
      )}

      {modalState.type === 'call' && modalState.customer && (
        <CustomerCallModal 
          isOpen={true}
          onClose={handleCloseModal}
          customer={modalState.customer}
        />
      )}

      {modalState.type === 'email' && modalState.customer && (
        <CustomerEmailModal 
          isOpen={true}
          onClose={handleCloseModal}
          customer={modalState.customer}
        />
      )}

      {modalState.type === 'products' && modalState.customer && (
        <CustomerProductsModal 
          isOpen={true}
          onClose={handleCloseModal}
          customer={modalState.customer}
        />
      )}
    </div>
  );
}