"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  FileText,
  Phone,
  Mail,
  Trash2,
  Building2,
  Globe,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Send,
  User,
  Contract
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

interface VendorActionModalsProps {
  vendor: Vendor | null;
  modalType: 'view' | 'edit' | 'contract' | 'contact' | 'email' | 'remove' | null;
  onClose: () => void;
  onUpdate: (updatedVendor: Vendor) => void;
  onRemove: (vendorId: string) => void;
}

export function VendorActionModals({
  vendor,
  modalType,
  onClose,
  onUpdate,
  onRemove
}: VendorActionModalsProps) {
  const [editForm, setEditForm] = useState<Vendor | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });

  // Store the active element when modal opens for focus restoration
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (modalType && vendor) {
      // Store the currently focused element
      activeElementRef.current = document.activeElement as HTMLElement;
    }
  }, [modalType, vendor]);

  const handleClose = () => {
    onClose();
    // Restore focus to the previously active element after a brief delay
    setTimeout(() => {
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      } else {
        // Fallback: focus the body to ensure cursor works
        document.body.focus();
      }
    }, 100);
  };

  useEffect(() => {
    if (vendor && modalType === 'edit') {
      setEditForm({ ...vendor });
    }
    if (vendor && modalType === 'contact') {
      setContactForm({
        subject: `Follow up with ${vendor.name}`,
        message: `Hi ${vendor.contactPerson},\n\nI wanted to follow up regarding our business partnership.\n\nBest regards,`,
        priority: 'normal'
      });
    }
    if (vendor && modalType === 'email') {
      setEmailForm({
        subject: `Partnership Update - ${vendor.name}`,
        message: `Dear ${vendor.contactPerson},\n\nI hope this email finds you well. I wanted to reach out regarding our ongoing partnership.\n\nBest regards,`,
        priority: 'normal'
      });
    }
  }, [vendor, modalType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleEditSubmit = () => {
    if (editForm) {
      onUpdate(editForm);
      handleClose();
    }
  };

  const handleContactSubmit = () => {
    // In a real app, this would integrate with communication system
    console.log('Contacting vendor:', contactForm);
    handleClose();
  };

  const handleEmailSubmit = () => {
    // In a real app, this would integrate with email service
    console.log('Sending email:', emailForm);
    handleClose();
  };

  const handleRemove = () => {
    if (vendor) {
      onRemove(vendor.id);
      handleClose();
    }
  };

  if (!vendor) return null;

  // View Details Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Vendor Details - {vendor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {vendor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <p className="text-gray-600">{vendor.category}</p>
                <p className="text-sm text-gray-500">Contact: {vendor.contactPerson}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getStatusColor(vendor.status)}>
                    {vendor.status}
                  </Badge>
                  <span className={`text-sm font-medium ${getPerformanceColor(vendor.performance)}`}>
                    {vendor.performance}% Performance
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>{vendor.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span>{vendor.phone || 'No phone provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3 text-gray-400" />
                    <span>{vendor.website || 'No website provided'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span>{vendor.location || 'No location provided'}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Contract Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Contract Value:</strong> ₹{(vendor.contractValue / 100000).toFixed(1)}L</div>
                  <div><strong>Contract Ends:</strong> {vendor.contractEnd.toLocaleDateString()}</div>
                  <div><strong>Status:</strong> {vendor.status}</div>
                  <div><strong>Performance:</strong> {vendor.performance}%</div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Star className="h-4 w-4" />
                Services Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {vendor.services.map((service) => (
                  <Badge key={service} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Edit Vendor Modal
  if (modalType === 'edit' && editForm) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Vendor Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Vendor Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contact">Contact Person</Label>
                <Input
                  id="edit-contact"
                  value={editForm.contactPerson}
                  onChange={(e) => setEditForm({...editForm, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-website">Website</Label>
              <Input
                id="edit-website"
                value={editForm.website}
                onChange={(e) => setEditForm({...editForm, website: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={editForm.status} onValueChange={(value: any) => setEditForm({...editForm, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-contract-value">Contract Value</Label>
                <Input
                  id="edit-contract-value"
                  type="number"
                  value={editForm.contractValue}
                  onChange={(e) => setEditForm({...editForm, contractValue: Number.parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="edit-performance">Performance (%)</Label>
                <Input
                  id="edit-performance"
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.performance}
                  onChange={(e) => setEditForm({...editForm, performance: Number.parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // View Contract Modal
  if (modalType === 'contract') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Details - {vendor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Contract Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Vendor:</strong> {vendor.name}</div>
                <div><strong>Category:</strong> {vendor.category}</div>
                <div><strong>Contract Value:</strong> ₹{(vendor.contractValue / 100000).toFixed(1)}L</div>
                <div><strong>Start Date:</strong> 01/01/2024</div>
                <div><strong>End Date:</strong> {vendor.contractEnd.toLocaleDateString()}</div>
                <div><strong>Status:</strong> {vendor.status}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Services Covered</h4>
              <div className="flex flex-wrap gap-2">
                {vendor.services.map((service) => (
                  <Badge key={service} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Overall Performance</span>
                  <span className={`font-bold ${getPerformanceColor(vendor.performance)}`}>
                    {vendor.performance}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Contract Status</span>
                  <Badge className={getStatusColor(vendor.status)}>
                    {vendor.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Close</Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Download Contract
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Contact Vendor Modal
  if (modalType === 'contact') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact {vendor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <User className="h-4 w-4" />
              <span>Contacting: {vendor.contactPerson}</span>
            </div>

            <div>
              <Label htmlFor="contact-subject">Subject</Label>
              <Input
                id="contact-subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="contact-priority">Priority</Label>
              <Select value={contactForm.priority} onValueChange={(value) => setContactForm({...contactForm, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleContactSubmit}>
                <Phone className="h-4 w-4 mr-2" />
                Contact Vendor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Send Email Modal
  if (modalType === 'email') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email to {vendor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <Mail className="h-4 w-4" />
              <span>To: {vendor.email}</span>
            </div>

            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="email-priority">Priority</Label>
              <Select value={emailForm.priority} onValueChange={(value) => setEmailForm({...emailForm, priority: value})}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email-message">Message</Label>
              <Textarea
                id="email-message"
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                rows={8}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleEmailSubmit}>
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Remove Confirmation Modal
  if (modalType === 'remove') {
    return (
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Remove Vendor
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{vendor.name}</strong> from your vendor list? 
              This action cannot be undone and will permanently delete all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemove} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Vendor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
}