"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  User, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  Tag,
  Users
} from 'lucide-react';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ticketPriorities = [
  { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800', description: 'Non-urgent issues' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800', description: 'Standard priority' },
  { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-800', description: 'Important issues' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800', description: 'Critical issues requiring immediate attention' }
];

const ticketCategories = [
  { value: 'technical', label: 'Technical Support', description: 'Technical issues and bugs', icon: '🔧' },
  { value: 'billing', label: 'Billing & Payments', description: 'Billing inquiries and payment issues', icon: '💳' },
  { value: 'feature_request', label: 'Feature Request', description: 'New feature suggestions', icon: '💡' },
  { value: 'bug_report', label: 'Bug Report', description: 'Software bugs and issues', icon: '🐛' },
  { value: 'general', label: 'General Inquiry', description: 'General questions and support', icon: '❓' }
];

const supportAgents = [
  { value: 'auto', label: 'Auto-assign', description: 'Automatically assign to available agent' },
  { value: 'agent1', label: 'Agent 1 - Sarah Johnson', description: 'Technical Support Specialist' },
  { value: 'agent2', label: 'Agent 2 - Mike Chen', description: 'Billing Support Manager' },
  { value: 'agent3', label: 'Agent 3 - Lisa Rodriguez', description: 'Customer Success Agent' },
  { value: 'agent4', label: 'Agent 4 - David Kim', description: 'Senior Support Engineer' },
  { value: 'agent5', label: 'Agent 5 - Emily Watson', description: 'Product Support Specialist' }
];

const commonTags = [
  'urgent', 'api', 'billing', 'mobile', 'dashboard', 'integration', 'performance',
  'login', 'permissions', 'data-export', 'reporting', 'notifications', 'security'
];

// Sample customers for selection
const sampleCustomers = [
  { id: '1', name: 'John Doe', email: 'john.doe@company.com', company: 'Tech Corp' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@business.com', company: 'Business Inc' },
  { id: '3', name: 'Mike Johnson', email: 'mike.j@startup.io', company: 'Startup.io' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.w@enterprise.com', company: 'Enterprise Ltd' },
  { id: '5', name: 'David Brown', email: 'david.b@solutions.net', company: 'Solutions Net' }
];

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer: '',
    subject: '',
    description: '',
    category: '',
    priority: 'medium',
    assignedAgent: 'auto',
    tags: [] as string[],
    dueDate: '',
    customerEmail: '',
    customerPhone: '',
    customerCompany: ''
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCustomerSelect = (customerId: string) => {
    const customer = sampleCustomers.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customer: customerId,
        customerEmail: customer.email,
        customerCompany: customer.company
      }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer && !formData.customerEmail) {
      newErrors.customer = 'Customer selection or email is required';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';

    // Email validation if provided
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Valid email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsCreating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Ticket creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isCreating) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Created!</h3>
            <p className="text-sm text-gray-600 text-center">
              Support ticket has been created successfully and assigned to the appropriate agent.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedCustomer = sampleCustomers.find(c => c.id === formData.customer);
  const selectedCategory = ticketCategories.find(c => c.value === formData.category);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Create Support Ticket</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isCreating}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Ticket Details</TabsTrigger>
                <TabsTrigger value="customer">Customer Info</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Ticket Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of the issue..."
                        className={errors.subject ? 'border-red-500' : ''}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Detailed description of the issue, steps to reproduce, expected behavior..."
                        rows={6}
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select category..." />
                          </SelectTrigger>
                          <SelectContent>
                            {ticketCategories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                <div className="flex items-center gap-2">
                                  <span>{category.icon}</span>
                                  <div>
                                    <div className="font-medium">{category.label}</div>
                                    <div className="text-xs text-gray-500">{category.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority *</Label>
                        <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority..." />
                          </SelectTrigger>
                          <SelectContent>
                            {ticketPriorities.map((priority) => (
                              <SelectItem key={priority.value} value={priority.value}>
                                <div className="flex items-center gap-2">
                                  <Badge className={priority.color}>{priority.label}</Badge>
                                  <span className="text-xs text-gray-500">{priority.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {selectedCategory && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{selectedCategory.icon}</span>
                          <h4 className="font-medium text-blue-800">{selectedCategory.label}</h4>
                        </div>
                        <p className="text-sm text-blue-700">{selectedCategory.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">Select Existing Customer</Label>
                      <Select value={formData.customer} onValueChange={handleCustomerSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer..." />
                        </SelectTrigger>
                        <SelectContent>
                          {sampleCustomers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id}>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-xs text-gray-500">{customer.email} • {customer.company}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-center py-2 text-gray-500">
                      <span className="bg-white px-2">OR</span>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Enter Customer Details Manually</h4>
                      
                      <div className="space-y-2">
                        <Label htmlFor="customerEmail">Customer Email *</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={formData.customerEmail}
                          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                          placeholder="customer@company.com"
                          className={errors.customerEmail ? 'border-red-500' : ''}
                        />
                        {errors.customerEmail && (
                          <p className="text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" />
                            {errors.customerEmail}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerPhone">Phone Number</Label>
                          <Input
                            id="customerPhone"
                            value={formData.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customerCompany">Company</Label>
                          <Input
                            id="customerCompany"
                            value={formData.customerCompany}
                            onChange={(e) => handleInputChange('customerCompany', e.target.value)}
                            placeholder="Company name"
                          />
                        </div>
                      </div>
                    </div>

                    {selectedCustomer && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800">{selectedCustomer.name}</h4>
                            <p className="text-sm text-green-700">{selectedCustomer.email}</p>
                            <p className="text-xs text-green-600">{selectedCustomer.company}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.customer && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.customer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Assignment & Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="assignedAgent">Assign to Agent</Label>
                      <Select value={formData.assignedAgent} onValueChange={(value) => handleInputChange('assignedAgent', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select agent..." />
                        </SelectTrigger>
                        <SelectContent>
                          {supportAgents.map((agent) => (
                            <SelectItem key={agent.value} value={agent.value}>
                              <div>
                                <div className="font-medium">{agent.label}</div>
                                <div className="text-xs text-gray-500">{agent.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date (Optional)</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <Button onClick={handleAddTag} variant="outline">
                          <Tag className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                      
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-sm">
                              {tag}
                              <button
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-2 hover:text-red-600"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="mt-3">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Common Tags:</h5>
                        <div className="flex flex-wrap gap-2">
                          {commonTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Review Ticket Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm text-gray-600">Subject:</span>
                          <p className="font-medium">{formData.subject || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Category:</span>
                          <p className="font-medium">
                            {selectedCategory ? `${selectedCategory.icon} ${selectedCategory.label}` : 'Not selected'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Priority:</span>
                          <Badge className={ticketPriorities.find(p => p.value === formData.priority)?.color}>
                            {ticketPriorities.find(p => p.value === formData.priority)?.label}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Assigned to:</span>
                          <p className="font-medium">
                            {supportAgents.find(a => a.value === formData.assignedAgent)?.label}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Customer:</span>
                        <p className="font-medium">
                          {selectedCustomer ? 
                            `${selectedCustomer.name} (${selectedCustomer.email})` : 
                            formData.customerEmail || 'Not specified'
                          }
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-600">Description:</span>
                        <div className="mt-1 p-3 bg-white border rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{formData.description || 'No description provided'}</p>
                        </div>
                      </div>

                      {formData.tags.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">Tags:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.dueDate && (
                        <div>
                          <span className="text-sm text-gray-600">Due Date:</span>
                          <p className="font-medium">{formData.dueDate}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose} disabled={isCreating}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="bg-green-600 hover:bg-green-700"
              >
                {isCreating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Ticket
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};