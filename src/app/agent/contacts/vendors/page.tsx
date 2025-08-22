"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExportReportModal } from "@/components/vendor/ExportReportModal";
import { AddVendorModal } from "@/components/vendor/AddVendorModal";
import { VendorActionModals } from "@/components/vendor/VendorActionModals";
import { 
  Search, 
  Filter, 
  Building2,
  UserPlus,
  Phone,
  Mail,
  Globe,
  MapPin,
  Eye,
  Edit,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  status: "active" | "inactive" | "pending";
  contractValue: number;
  contractEnd: Date;
  performance: number;
  services: string[];
}

const sampleVendors: Vendor[] = [
  {
    id: "1",
    name: "TechSolutions Inc",
    category: "Software Development",
    contactPerson: "John Smith",
    email: "john@techsolutions.com",
    phone: "+1 (555) 123-4567",
    website: "www.techsolutions.com",
    location: "San Francisco, CA",
    status: "active",
    contractValue: 250000,
    contractEnd: new Date("2024-12-31"),
    performance: 92,
    services: ["Web Development", "Mobile Apps", "Consulting"]
  },
  {
    id: "2",
    name: "DataFlow Systems",
    category: "Data Analytics",
    contactPerson: "Sarah Johnson",
    email: "sarah@dataflow.com",
    phone: "+1 (555) 234-5678",
    website: "www.dataflow.com",
    location: "New York, NY",
    status: "active",
    contractValue: 180000,
    contractEnd: new Date("2024-08-15"),
    performance: 88,
    services: ["Data Analysis", "BI Tools", "Reporting"]
  },
  {
    id: "3",
    name: "CloudConnect Pro",
    category: "Cloud Services",
    contactPerson: "Mike Chen",
    email: "mike@cloudconnect.com",
    phone: "+1 (555) 345-6789",
    website: "www.cloudconnect.com",
    location: "Seattle, WA",
    status: "pending",
    contractValue: 150000,
    contractEnd: new Date("2024-06-30"),
    performance: 85,
    services: ["Cloud Migration", "Infrastructure", "Support"]
  }
];

function VendorCard({ 
  vendor, 
  onAction 
}: { 
  vendor: Vendor;
  onAction: (vendor: Vendor, action: 'view' | 'edit' | 'contract' | 'contact' | 'email' | 'remove') => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAction = (action: 'view' | 'edit' | 'contract' | 'contact' | 'email' | 'remove') => {
    setDropdownOpen(false); // Close dropdown first
    setTimeout(() => {
      onAction(vendor, action);
    }, 100); // Small delay to ensure dropdown closes properly
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Building2 className="h-4 w-4" />;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {vendor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-gray-600">{vendor.category}</p>
              <p className="text-sm text-gray-500">Contact: {vendor.contactPerson}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(vendor.status)}>
              {getStatusIcon(vendor.status)}
              <span className="ml-1 capitalize">{vendor.status}</span>
            </Badge>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction('view')}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('edit')}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Vendor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('contract')}>
                  <FileText className="mr-2 h-4 w-4" />
                  View Contract
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('contact')}>
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Vendor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('email')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => handleAction('remove')}>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Remove Vendor
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{vendor.phone}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4" />
              <span>{vendor.website}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{vendor.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium">₹{(vendor.contractValue / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Ends {vendor.contractEnd.toLocaleDateString()}</span>
              </div>
            </div>
            <div className={`text-sm font-medium ${getPerformanceColor(vendor.performance)}`}>
              {vendor.performance}% Performance
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-wrap gap-1">
              {vendor.services.slice(0, 3).map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {vendor.services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{vendor.services.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState(sampleVendors);
  const [vendors, setVendors] = useState(sampleVendors);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'contract' | 'contact' | 'email' | 'remove' | null>(null);

  const handleVendorAction = (vendor: Vendor, action: 'view' | 'edit' | 'contract' | 'contact' | 'email' | 'remove') => {
    setSelectedVendor(vendor);
    setActionModalType(action);
  };

  const handleUpdateVendor = (updatedVendor: Vendor) => {
    const updatedVendors = vendors.map(v => 
      v.id === updatedVendor.id ? updatedVendor : v
    );
    setVendors(updatedVendors);
    setFilteredVendors(updatedVendors);
  };

  const handleRemoveVendor = (vendorId: string) => {
    const updatedVendors = vendors.filter(v => v.id !== vendorId);
    setVendors(updatedVendors);
    setFilteredVendors(updatedVendors);
  };

  const handleAddVendor = (newVendor: Omit<Vendor, 'id'>) => {
    const vendorWithId = {
      ...newVendor,
      id: (vendors.length + 1).toString()
    };
    setVendors([...vendors, vendorWithId]);
    setFilteredVendors([...vendors, vendorWithId]);
  };

  const closeActionModal = () => {
    setSelectedVendor(null);
    setActionModalType(null);
  };

  const totalContractValue = vendors.reduce((sum, vendor) => sum + vendor.contractValue, 0);
  const activeVendors = vendors.filter(v => v.status === 'active').length;
  const avgPerformance = vendors.reduce((sum, vendor) => sum + vendor.performance, 0) / vendors.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <p className="text-gray-600 mt-1">Manage relationships with your business partners and vendors</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsExportModalOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">{activeVendors}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contract Value</p>
                <p className="text-2xl font-bold text-purple-600">₹{(totalContractValue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                <p className="text-2xl font-bold text-orange-600">{avgPerformance.toFixed(0)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Filter by Category
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <VendorCard 
            key={vendor.id} 
            vendor={vendor} 
            onAction={handleVendorAction}
          />
        ))}
      </div>

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        vendors={vendors}
      />

      {/* Add Vendor Modal */}
      <AddVendorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVendor={handleAddVendor}
        existingVendors={vendors}
      />

      {/* Vendor Action Modals */}
      <VendorActionModals
        vendor={selectedVendor}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateVendor}
        onRemove={handleRemoveVendor}
      />
    </div>
  );
}