"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  FileImage,
  Database,
  Check,
  X
} from "lucide-react";

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

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendors: Vendor[];
}

export function ExportReportModal({ isOpen, onClose, vendors }: ExportReportModalProps) {
  const [exportFormat, setExportFormat] = useState("excel");
  const [dateRange, setDateRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [includeFields, setIncludeFields] = useState({
    basicInfo: true,
    contactInfo: true,
    contractDetails: true,
    performance: true,
    services: false,
    financials: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleFieldChange = (field: string, checked: boolean) => {
    setIncludeFields(prev => ({ ...prev, [field]: checked }));
  };

  const getFilteredVendors = () => {
    let filtered = vendors;

    if (statusFilter !== "all") {
      filtered = filtered.filter(vendor => vendor.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(vendor => vendor.category === categoryFilter);
    }

    return filtered;
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const filteredVendors = getFilteredVendors();
    console.log('Exporting vendors:', {
      format: exportFormat,
      dateRange,
      statusFilter,
      categoryFilter,
      includeFields,
      vendorCount: filteredVendors.length,
      vendors: filteredVendors
    });

    setIsExporting(false);
    onClose();
    
    // In a real app, this would trigger the actual export/download
    alert(`Export complete! Downloaded ${filteredVendors.length} vendor records in ${exportFormat.toUpperCase()} format.`);
  };

  const filteredCount = getFilteredVendors().length;
  const categories = Array.from(new Set(vendors.map(v => v.category)));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Vendor Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={exportFormat === "excel" ? "default" : "outline"}
                className="flex items-center gap-2 h-12"
                onClick={() => setExportFormat("excel")}
              >
                <FileSpreadsheet className="h-4 w-4" />
                Excel
              </Button>
              <Button
                variant={exportFormat === "csv" ? "default" : "outline"}
                className="flex items-center gap-2 h-12"
                onClick={() => setExportFormat("csv")}
              >
                <Database className="h-4 w-4" />
                CSV
              </Button>
              <Button
                variant={exportFormat === "pdf" ? "default" : "outline"}
                className="flex items-center gap-2 h-12"
                onClick={() => setExportFormat("pdf")}
              >
                <FileImage className="h-4 w-4" />
                PDF
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Filter className="h-4 w-4 text-gray-500" />
              <Label className="text-base font-medium">Filters</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="category-filter">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                  <SelectItem value="thisyear">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Include Fields */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Include in Export</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="basic-info"
                  checked={includeFields.basicInfo}
                  onCheckedChange={(checked) => handleFieldChange('basicInfo', checked as boolean)}
                />
                <Label htmlFor="basic-info" className="text-sm">Basic Information</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contact-info"
                  checked={includeFields.contactInfo}
                  onCheckedChange={(checked) => handleFieldChange('contactInfo', checked as boolean)}
                />
                <Label htmlFor="contact-info" className="text-sm">Contact Details</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contract-details"
                  checked={includeFields.contractDetails}
                  onCheckedChange={(checked) => handleFieldChange('contractDetails', checked as boolean)}
                />
                <Label htmlFor="contract-details" className="text-sm">Contract Details</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="performance"
                  checked={includeFields.performance}
                  onCheckedChange={(checked) => handleFieldChange('performance', checked as boolean)}
                />
                <Label htmlFor="performance" className="text-sm">Performance Metrics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="services"
                  checked={includeFields.services}
                  onCheckedChange={(checked) => handleFieldChange('services', checked as boolean)}
                />
                <Label htmlFor="services" className="text-sm">Services List</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="financials"
                  checked={includeFields.financials}
                  onCheckedChange={(checked) => handleFieldChange('financials', checked as boolean)}
                />
                <Label htmlFor="financials" className="text-sm">Financial Data</Label>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Export Summary</span>
              <Badge variant="outline">{filteredCount} vendors</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Format: {exportFormat.toUpperCase()}</div>
              <div>Status: {statusFilter === "all" ? "All" : statusFilter}</div>
              <div>Category: {categoryFilter === "all" ? "All" : categoryFilter}</div>
              <div>Fields: {Object.values(includeFields).filter(Boolean).length} selected</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting || filteredCount === 0}>
              {isExporting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}