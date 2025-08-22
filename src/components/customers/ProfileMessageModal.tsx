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
  MessageCircle, 
  Send, 
  User, 
  Building2, 
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Paperclip,
  Smile,
  Star,
  X
} from 'lucide-react';

interface CustomerProfile {
  id: string;
  customer: any;
}

interface ProfileMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
}

const messageTemplates = [
  {
    id: 'welcome',
    name: 'Welcome Message',
    subject: 'Welcome to our platform!',
    content: `Hi {{firstName}},

Welcome to our platform! We're excited to have you as part of our community.

If you have any questions or need assistance getting started, please don't hesitate to reach out.

Best regards,
Customer Success Team`
  },
  {
    id: 'follow_up',
    name: 'Follow-up Message',
    subject: 'Following up on your recent interaction',
    content: `Hi {{firstName}},

I wanted to follow up on our recent conversation and see if you have any additional questions or if there's anything we can help you with.

Looking forward to hearing from you.

Best regards,
{{agentName}}`
  },
  {
    id: 'promotional',
    name: 'Promotional Offer',
    subject: 'Special offer just for you!',
    content: `Hi {{firstName}},

We have a special offer that we think you'll love! As one of our valued customers, you're eligible for an exclusive discount.

Use code SPECIAL20 for 20% off your next purchase.

Best regards,
Sales Team`
  },
  {
    id: 'support',
    name: 'Support Follow-up',
    subject: 'How was your support experience?',
    content: `Hi {{firstName}},

We hope your recent support issue was resolved to your satisfaction. We'd love to hear your feedback about the experience.

If you have any additional questions, please don't hesitate to reach out.

Best regards,
Support Team`
  }
];

const messagePriorities = [
  { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium Priority', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High Priority', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
];

export const ProfileMessageModal: React.FC<ProfileMessageModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState("compose");
  const [messageType, setMessageType] = useState('email');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('medium');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { customer } = profile;

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setContent(template.content.replace('{{firstName}}', customer.firstName).replace('{{agentName}}', 'Your Name'));
    }
  };

  const handleSendMessage = async () => {
    setIsSending(true);
    
    try {
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Message send failed:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSending) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your message has been sent successfully to {customer.fullName}.
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
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Send Message</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Recipient Information</h3>
                  <Badge className={
                    customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                    customer.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }>
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
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{customer.address.city}, {customer.address.state}</span>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="compose" className="space-y-4">
                  {/* Message Type Selection */}
                  <div className="space-y-3">
                    <Label>Message Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                          messageType === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setMessageType('email')}
                      >
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Email</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Send via email</p>
                      </div>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                          messageType === 'sms' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setMessageType('sms')}
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium">SMS</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Send via SMS</p>
                      </div>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                          messageType === 'whatsapp' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setMessageType('whatsapp')}
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium">WhatsApp</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Send via WhatsApp</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject Line (for email) */}
                  {messageType === 'email' && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject Line</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject..."
                      />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Message Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Type your message here..."
                      rows={8}
                    />
                  </div>

                  {/* Priority and Scheduling */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority..." />
                        </SelectTrigger>
                        <SelectContent>
                          {messagePriorities.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              <div className="flex items-center gap-2">
                                <Badge className={p.color}>{p.label}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scheduleDate">Schedule Date (Optional)</Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scheduleTime">Schedule Time</Label>
                      <Input
                        id="scheduleTime"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        disabled={!scheduleDate}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="space-y-4">
                  <div className="grid gap-4">
                    {messageTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                          selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          {selectedTemplate === template.id && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                        <p className="text-sm text-gray-500 line-clamp-3">
                          {template.content.split('\n')[0]}...
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Message Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">To:</span>
                            <span className="font-medium">{customer.fullName} ({customer.email})</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium capitalize">{messageType}</span>
                          </div>
                          {messageType === 'email' && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subject:</span>
                              <span className="font-medium">{subject || 'No subject'}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Priority:</span>
                            <Badge className={messagePriorities.find(p => p.value === priority)?.color}>
                              {messagePriorities.find(p => p.value === priority)?.label}
                            </Badge>
                          </div>
                          {scheduleDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Scheduled:</span>
                              <span className="font-medium">
                                {scheduleDate} {scheduleTime && `at ${scheduleTime}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Message Content:</h4>
                        <div className="whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border">
                          {content || 'No content entered'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} disabled={isSending}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={isSending || !content.trim() || (messageType === 'email' && !subject.trim())}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : scheduleDate ? (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Message
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};