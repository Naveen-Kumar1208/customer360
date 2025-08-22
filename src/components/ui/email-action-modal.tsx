"use client";

import type React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Send, 
  Clock, 
  User, 
  Building2, 
  Tag,
  Paperclip,
  Palette,
  X
} from 'lucide-react';

interface EmailActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  leadEmail: string;
  leadCompany: string;
  leadStage: string;
  onSend: (emailData: {
    template: string;
    subject: string;
    message: string;
    scheduledTime?: string;
    priority: string;
  }) => void;
}

const emailTemplates = [
  {
    id: 'welcome',
    name: 'Welcome & Introduction',
    subject: 'Welcome to our community, {{leadName}}!',
    content: `Hi {{leadName}},

Thank you for your interest in our solutions. I wanted to personally reach out and introduce myself as your dedicated account representative.

I've noticed you downloaded our {{contentType}} and wanted to see if you have any questions or if there's anything specific you'd like to learn more about.

Would you be available for a brief 15-minute call this week to discuss how we can help {{leadCompany}} achieve its goals?

Best regards,
[Your Name]`
  },
  {
    id: 'follow_up',
    name: 'Follow-up & Next Steps',
    subject: 'Following up on your interest - {{leadCompany}}',
    content: `Hi {{leadName}},

I hope this email finds you well. I wanted to follow up on your recent activity and see if you'd like to explore how our solution can benefit {{leadCompany}}.

Based on your engagement, I believe we could help you:
• Increase operational efficiency
• Reduce costs by 20-30%
• Improve customer satisfaction

Would you be interested in a personalized demo tailored to {{leadCompany}}'s specific needs?

Looking forward to hearing from you!

Best regards,
[Your Name]`
  },
  {
    id: 'demo_invite',
    name: 'Demo Invitation',
    subject: 'Exclusive demo invitation for {{leadCompany}}',
    content: `Hi {{leadName}},

I'd love to show you exactly how companies like {{leadCompany}} are using our platform to drive real results.

I have a few time slots available this week for a personalized 30-minute demo:
• Tuesday 2:00 PM - 3:00 PM
• Wednesday 10:00 AM - 11:00 AM  
• Thursday 3:00 PM - 4:00 PM

During the demo, I'll show you:
✓ Features most relevant to your industry
✓ Real customer success stories
✓ ROI calculations specific to your use case

Click here to book a time that works best for you: [Calendar Link]

Best regards,
[Your Name]`
  },
  {
    id: 'value_proposition',
    name: 'Value Proposition',
    subject: 'How {{leadCompany}} can save 25% on operational costs',
    content: `Hi {{leadName}},

Companies in your industry typically see a 25% reduction in operational costs within the first 6 months of implementing our solution.

Here's what makes us different:
🚀 Quick implementation (2-4 weeks)
📊 Real-time analytics and reporting
🔧 Seamless integrations with existing tools
💡 Dedicated success manager

I'd love to show you a case study of a similar company that achieved remarkable results.

Are you available for a quick 15-minute call this week?

Best regards,
[Your Name]`
  },
  {
    id: 'custom',
    name: 'Custom Message',
    subject: '',
    content: ''
  }
];

export const EmailActionModal: React.FC<EmailActionModalProps> = ({
  isOpen,
  onClose,
  leadName,
  leadEmail,
  leadCompany,
  leadStage,
  onSend
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [priority, setPriority] = useState('normal');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      const processedSubject = template.subject
        .replace(/{{leadName}}/g, leadName)
        .replace(/{{leadCompany}}/g, leadCompany);
      const processedContent = template.content
        .replace(/{{leadName}}/g, leadName)
        .replace(/{{leadCompany}}/g, leadCompany)
        .replace(/{{contentType}}/g, getContentTypeByStage(leadStage));
      
      setSubject(processedSubject);
      setMessage(processedContent);
    }
  };

  const getContentTypeByStage = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'tofu': return 'whitepaper';
      case 'mofu': return 'case study';
      case 'bofu': return 'proposal';
      default: return 'resource';
    }
  };

  const handleSend = () => {
    onSend({
      template: selectedTemplate,
      subject,
      message,
      scheduledTime: scheduledTime || undefined,
      priority
    });
    
    // Reset form
    setSelectedTemplate('');
    setSubject('');
    setMessage('');
    setScheduledTime('');
    setPriority('normal');
    setAttachments([]);
  };

  const addAttachment = (filename: string) => {
    setAttachments([...attachments, filename]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'tofu': return 'bg-green-100 text-green-700 border-green-200';
      case 'mofu': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'bofu': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Send Email to Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Information */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Lead Information</h3>
              <Badge className={getStageColor(leadStage)}>
                {leadStage.toUpperCase()}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{leadName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{leadEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{leadCompany}</span>
              </div>
            </div>
          </div>

          {/* Email Template Selection */}
          <div className="space-y-3">
            <Label htmlFor="template">Email Template</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an email template..." />
              </SelectTrigger>
              <SelectContent>
                {emailTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      {template.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="text-sm"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Email Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your email message..."
                  rows={12}
                  className="text-sm"
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {attachments.map((attachment, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Paperclip className="w-3 h-3" />
                      {attachment}
                      <button
                        onClick={() => removeAttachment(index)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAttachment('Product_Brochure.pdf')}
                  >
                    <Paperclip className="w-4 h-4 mr-1" />
                    Add Brochure
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAttachment('Case_Study.pdf')}
                  >
                    <Paperclip className="w-4 h-4 mr-1" />
                    Add Case Study
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAttachment('Pricing_Guide.pdf')}
                  >
                    <Paperclip className="w-4 h-4 mr-1" />
                    Add Pricing
                  </Button>
                </div>
              </div>
            </div>

            {/* Email Options */}
            <div className="space-y-4">
              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-red-500" />
                        High Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="normal">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-500" />
                        Normal Priority
                      </div>
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-500" />
                        Low Priority
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Scheduled Send */}
              <div className="space-y-2">
                <Label htmlFor="scheduled">Schedule Send (Optional)</Label>
                <Input
                  id="scheduled"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Priority Display */}
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium text-sm">Current Priority</span>
                </div>
                <Badge className={getPriorityColor(priority)}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </Badge>
              </div>

              {/* Scheduled Time Display */}
              {scheduledTime && (
                <div className="p-3 border rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm text-blue-800">Scheduled</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {new Date(scheduledTime).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!subject || !message}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {scheduledTime ? 'Schedule Email' : 'Send Email'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};