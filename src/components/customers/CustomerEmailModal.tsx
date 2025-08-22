"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail, 
  User, 
  Building2, 
  Send,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Paperclip,
  Eye,
  Phone,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import type { Customer } from "@/types/customer";

interface CustomerEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer;
}

const emailTemplates = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to Our Service!',
    content: `Dear {customerName},

Welcome aboard! We're thrilled to have you join our community.

Here are some quick steps to get started:
- Complete your profile setup
- Explore our features
- Contact our support team if you need help

Best regards,
Customer Success Team`
  },
  {
    id: 'followup',
    name: 'Follow-up Email',
    subject: 'Following up on our conversation',
    content: `Hi {customerName},

I wanted to follow up on our recent conversation and see if you have any questions.

Please don't hesitate to reach out if there's anything I can help you with.

Best regards,
{senderName}`
  },
  {
    id: 'promotional',
    name: 'Promotional Email',
    subject: 'Special Offer Just for You!',
    content: `Dear {customerName},

We have an exclusive offer that we think you'll love!

As a valued customer, you're eligible for:
- 20% discount on premium features
- Priority support access
- Early access to new features

This offer is valid until {expiryDate}.

Best regards,
Marketing Team`
  },
  {
    id: 'support',
    name: 'Support Email',
    subject: 'We\'re here to help',
    content: `Hi {customerName},

I noticed you might need some assistance with your account.

Our support team is here to help you with:
- Technical issues
- Account questions
- Feature guidance

Feel free to reply to this email or schedule a call with us.

Best regards,
Support Team`
  },
  {
    id: 'feedback',
    name: 'Feedback Request',
    subject: 'We\'d love your feedback',
    content: `Dear {customerName},

Your opinion matters to us! We'd love to hear about your experience with our service.

Could you spare a few minutes to share your thoughts? Your feedback helps us improve and serve you better.

[Feedback Survey Link]

Thank you for your time!

Best regards,
Customer Experience Team`
  }
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'text-gray-600' },
  { value: 'normal', label: 'Normal', color: 'text-blue-600' },
  { value: 'high', label: 'High', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
];

export const CustomerEmailModal: React.FC<CustomerEmailModalProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [activeTab, setActiveTab] = useState("compose");
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailData, setEmailData] = useState({
    to: customer.email,
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    priority: 'normal'
  });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailData(prev => ({
        ...prev,
        subject: template.subject,
        content: template.content
          .replace('{customerName}', customer.fullName)
          .replace('{senderName}', 'Customer Success Team')
          .replace('{expiryDate}', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString())
      }));
    }
  };

  const validateEmail = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!emailData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.to)) {
      newErrors.to = 'Please enter a valid email address';
    }

    if (!emailData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!emailData.content.trim()) {
      newErrors.content = 'Email content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (!validateEmail()) {
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      setErrors({ submit: 'Failed to send email. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (field: keyof typeof emailData, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'prospect': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'churned': return 'bg-red-100 text-red-700 border-red-200';
      case 'vip': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option?.color || 'text-gray-600';
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Sent Successfully!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your email has been sent to {customer.fullName}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Send Email to {customer.fullName}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Customer Information</h3>
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">{customer.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{customer.company?.name || 'Individual'}</span>
                </div>
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="to">To *</Label>
                  <Input
                    id="to"
                    type="email"
                    value={emailData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className={errors.to ? 'border-red-500' : ''}
                    placeholder="recipient@example.com"
                  />
                  {errors.to && (
                    <p className="text-sm text-red-600 mt-1">{errors.to}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cc">CC</Label>
                  <Input
                    id="cc"
                    type="email"
                    value={emailData.cc}
                    onChange={(e) => handleInputChange('cc', e.target.value)}
                    placeholder="cc@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={emailData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className={option.color}>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={emailData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={errors.subject ? 'border-red-500' : ''}
                  placeholder="Enter email subject"
                />
                {errors.subject && (
                  <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="content">Message *</Label>
                <Textarea
                  id="content"
                  value={emailData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  className={`min-h-[300px] ${errors.content ? 'border-red-500' : ''}`}
                  placeholder="Enter your message here..."
                />
                {errors.content && (
                  <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-4">
              {emailTemplates.map((template) => (
                <Card key={template.id} className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`} onClick={() => handleTemplateSelect(template.id)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      {template.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-gray-900 mb-2">{template.subject}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {template.content.substring(0, 150)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Email Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <div className="space-y-2 border-b pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">To:</span>
                      <span className="text-sm">{emailData.to}</span>
                    </div>
                    {emailData.cc && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600">CC:</span>
                        <span className="text-sm">{emailData.cc}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Subject:</span>
                      <span className="text-sm font-medium">{emailData.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Priority:</span>
                      <span className={`text-sm font-medium ${getPriorityColor(emailData.priority)}`}>
                        {priorityOptions.find(p => p.value === emailData.priority)?.label}
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap text-sm text-gray-800">
                    {emailData.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Draft auto-saved</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSending || !emailData.subject || !emailData.content}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </>
              )}
            </Button>
          </div>
        </div>

          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {errors.submit}
              </p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};