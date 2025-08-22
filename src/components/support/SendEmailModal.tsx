"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  X, 
  Send,
  User,
  CheckCircle,
  AlertTriangle,
  Building2,
  Phone,
  Paperclip,
  Eye,
  FileText
} from 'lucide-react';

interface SendEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: any;
}

const emailTemplates = [
  {
    id: 'follow_up',
    name: 'Follow-up',
    subject: 'Following up on your support request',
    body: `Hi {customerName},

I wanted to follow up on your recent support request regarding "{ticketSubject}".

We're continuing to work on resolving this issue for you. I'll keep you updated on our progress and let you know as soon as we have a solution.

If you have any questions or additional information that might help us resolve this faster, please don't hesitate to reach out.

Best regards,
{agentName}`
  },
  {
    id: 'resolution',
    name: 'Issue Resolution',
    subject: 'Your support issue has been resolved',
    body: `Hi {customerName},

Great news! We've resolved the issue you reported in ticket {ticketNumber}.

{resolutionDetails}

Please test the solution and let us know if everything is working as expected. If you encounter any further issues, feel free to reply to this email or create a new support ticket.

Thank you for your patience while we worked on this.

Best regards,
{agentName}`
  },
  {
    id: 'info_request',
    name: 'Information Request',
    subject: 'Additional information needed for your support request',
    body: `Hi {customerName},

Thank you for contacting our support team regarding "{ticketSubject}".

To better assist you, we need some additional information:

• 
• 
• 

Once we receive this information, we'll be able to investigate and resolve your issue more quickly.

Best regards,
{agentName}`
  }
];

export const SendEmailModal: React.FC<SendEmailModalProps> = ({
  isOpen,
  onClose,
  ticket
}) => {
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailData, setEmailData] = useState({
    to: ticket?.customer?.email || '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal' as 'low' | 'normal' | 'high'
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailData(prev => ({
        ...prev,
        subject: template.subject.replace('{ticketSubject}', ticket.subject),
        body: template.body
          .replace('{customerName}', ticket.customer.firstName)
          .replace('{ticketSubject}', ticket.subject)
          .replace('{ticketNumber}', ticket.ticketNumber)
          .replace('{agentName}', ticket.assignedAgent)
          .replace('{resolutionDetails}', 'Please provide resolution details here.')
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEmailData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    setIsSending(true);
    
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Send failed:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSending) {
      onClose();
    }
  };

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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Sent!</h3>
            <p className="text-sm text-gray-600 text-center">
              Your email has been sent successfully to the customer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showPreview) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <div 
          className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Email Preview</h2>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="max-w-3xl mx-auto bg-white border rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Subject: {emailData.subject}</h3>
                    <Badge className={emailData.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                      {emailData.priority} Priority
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>To:</strong> {emailData.to}</p>
                    {emailData.cc && <p><strong>CC:</strong> {emailData.cc}</p>}
                    <p><strong>From:</strong> {ticket.assignedAgent} &lt;support@company.com&gt;</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900">
                    {emailData.body}
                  </div>
                </div>
                
                {attachments.length > 0 && (
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments ({attachments.length})</h4>
                    <div className="space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Paperclip className="w-4 h-4" />
                          <span>{file.name} ({Math.round(file.size / 1024)}KB)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Edit Email
            </Button>
            <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </Button>
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold">Send Email</h2>
              <p className="text-sm text-gray-600">{ticket.ticketNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {ticket.customer.firstName.charAt(0)}{ticket.customer.lastName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{ticket.customer.fullName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{ticket.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span>{ticket.customer.company?.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800 mb-1">
                      {ticket.priority}
                    </Badge>
                    <p className="text-xs text-gray-500">{ticket.subject}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Templates */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Email Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {emailTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`p-3 text-left border rounded-lg transition-all hover:border-blue-300 ${
                        selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{template.subject}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Email Composition */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Compose Email</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="to">To *</Label>
                    <Input
                      id="to"
                      value={emailData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      value={emailData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cc">CC</Label>
                    <Input
                      id="cc"
                      value={emailData.cc}
                      onChange={(e) => handleInputChange('cc', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bcc">BCC</Label>
                    <Input
                      id="bcc"
                      value={emailData.bcc}
                      onChange={(e) => handleInputChange('bcc', e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={emailData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="Email subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Message *</Label>
                  <Textarea
                    id="body"
                    value={emailData.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    placeholder="Type your message here..."
                    rows={12}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments</Label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="attachments"
                      multiple
                      onChange={handleFileAttachment}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('attachments')?.click()}
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Add Files
                    </Button>
                    {attachments.length > 0 && (
                      <span className="text-sm text-gray-600">{attachments.length} file(s) selected</span>
                    )}
                  </div>
                  
                  {attachments.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{file.name} ({Math.round(file.size / 1024)}KB)</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center gap-3 p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {emailData.to && emailData.subject && emailData.body ? (
              <span className="text-green-600">Ready to send</span>
            ) : (
              <span>Fill in required fields to send</span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={isSending}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={!emailData.to || !emailData.subject || !emailData.body}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSending || !emailData.to || !emailData.subject || !emailData.body}
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
      </div>
    </div>
  );
};