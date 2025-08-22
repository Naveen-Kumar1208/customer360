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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Send, 
  Clock, 
  User, 
  Building2, 
  Calendar,
  AlertTriangle,
  DollarSign,
  Shield,
  CreditCard,
  Briefcase,
  Smartphone,
  PhoneCall
} from 'lucide-react';

interface RenewalData {
  id: number;
  customerName: string;
  customerId: string;
  product: string;
  policyNumber?: string;
  accountNumber?: string;
  renewalDate: string;
  premium?: number;
  annualFee?: number;
  amount?: number;
  status: string;
  daysToRenewal: number;
  riskLevel: string;
  lastReminderSent: string;
  preferredChannel: string;
}

interface SendReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  renewalData: RenewalData;
  onSend: (reminderData: {
    channel: string;
    template: string;
    subject?: string;
    message: string;
    scheduledTime?: string;
    followUpScheduled: boolean;
    urgencyLevel: string;
  }) => void;
}

const communicationChannels = [
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    description: 'Professional email reminder with attachments',
    estimatedDelivery: '2-5 minutes'
  },
  {
    id: 'sms',
    name: 'SMS',
    icon: MessageSquare,
    description: 'Quick text message reminder',
    estimatedDelivery: '1-2 minutes'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: Smartphone,
    description: 'Rich media messaging with documents',
    estimatedDelivery: '1-3 minutes'
  },
  {
    id: 'phone',
    name: 'Phone Call',
    icon: PhoneCall,
    description: 'Personal call with script guidance',
    estimatedDelivery: 'Immediate'
  }
];

const reminderTemplates = {
  email: [
    {
      id: 'friendly_reminder',
      name: 'Friendly Reminder',
      subject: 'Your [product] renewal is coming up - [customerName]',
      content: 'Dear [customerName],\n\nI hope this message finds you well. This is a friendly reminder that your [product] is due for renewal on [renewalDate].\n\nPolicy/Account Details:\n• Product: [product]\n• Amount: $[amount]\n• Renewal Date: [renewalDate]\n\nTo ensure uninterrupted coverage/service, please complete your renewal at your earliest convenience. You can renew online through our customer portal or contact our team directly.\n\nIf you have any questions or need assistance, please don\'t hesitate to reach out to us.\n\nBest regards,\nCustomer Service Team'
    },
    {
      id: 'urgent_reminder',
      name: 'Urgent Reminder',
      subject: 'URGENT: [product] renewal required - [customerName]',
      content: 'Dear [customerName],\n\nThis is an urgent reminder that your [product] is [urgencyText] and requires immediate attention.\n\nIMPORTANT DETAILS:\n• Product: [product]\n• Amount: $[amount]\n• Renewal Date: [renewalDate]\n• Status: [status]\n\nImmediate action is required to avoid service interruption or coverage loss. Please complete your renewal today by:\n\n1. Visiting our online portal\n2. Calling our dedicated renewal line\n3. Visiting your nearest branch\n\nDon\'t let your coverage lapse - renew now!\n\nUrgent Support: 1-800-RENEW-NOW\nCustomer Service Team'
    },
    {
      id: 'overdue_notice',
      name: 'Overdue Notice',
      subject: 'OVERDUE: [product] renewal - Immediate action required',
      content: 'Dear [customerName],\n\nYour [product] renewal is now OVERDUE as of [renewalDate].\n\nOVERDUE DETAILS:\n• Product: [product]\n• Original Amount: $[amount]\n• Days Overdue: [daysOverdue]\n• Late Fee: May apply\n\nYour coverage/service may be suspended without immediate action. To restore your policy:\n\n1. Complete renewal payment immediately\n2. Contact our emergency renewal line\n3. Visit our nearest branch location\n\nACT NOW to avoid service interruption and potential penalties.\n\nEmergency Renewal: 1-800-URGENT-PAY\nCustomer Service Team'
    }
  ],
  sms: [
    {
      id: 'simple_reminder',
      name: 'Simple Reminder',
      content: 'Hi [customerName], your [product] renewal is due [renewalDate]. Amount: $[amount]. Renew online or call us. Reply STOP to opt out.'
    },
    {
      id: 'urgent_sms',
      name: 'Urgent SMS',
      content: 'URGENT: [customerName], your [product] is [urgencyText]! Amount: $[amount]. Renew NOW to avoid service interruption. Call 1-800-RENEW or visit our website.'
    }
  ],
  whatsapp: [
    {
      id: 'rich_reminder',
      name: 'Rich Media Reminder',
      content: 'Hello [customerName] 👋\n\nYour [product] renewal is coming up:\n📅 Due: [renewalDate]\n💰 Amount: $[amount]\n⏰ Days remaining: [daysRemaining]\n\nRenew now to continue enjoying our services without interruption!\n\n✅ Renew Online\n☎️ Call Us\n🏢 Visit Branch\n\nNeed help? Just reply to this message!'
    }
  ],
  phone: [
    {
      id: 'professional_script',
      name: 'Professional Script',
      content: 'Hello, may I speak with [customerName]? This is [Your Name] from [Company Name] regarding your [product] renewal.\n\nI\'m calling to remind you that your policy/account is due for renewal on [renewalDate]. The renewal amount is $[amount].\n\nKey points to cover:\n• Confirm customer details\n• Explain renewal importance\n• Offer payment options\n• Address any questions\n• Schedule follow-up if needed\n\nWould you like to complete the renewal now, or would you prefer to receive additional information?'
    }
  ]
};

export const SendReminderModal: React.FC<SendReminderModalProps> = ({
  isOpen,
  onClose,
  renewalData,
  onSend
}) => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [followUpScheduled, setFollowUpScheduled] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState('normal');

  const selectedChannelObj = communicationChannels.find(c => c.id === selectedChannel);
  const availableTemplates = selectedChannel ? reminderTemplates[selectedChannel as keyof typeof reminderTemplates] : [];

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    setSelectedTemplate('');
    setSubject('');
    setMessage('');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = availableTemplates.find(t => t.id === templateId);
    if (template) {
      const processedContent = processTemplate(template.content);
      const processedSubject = 'subject' in template ? processTemplate(template.subject) : '';
      
      setMessage(processedContent);
      if (processedSubject) setSubject(processedSubject);
    }
  };

  const processTemplate = (template: string) => {
    const amount = renewalData.premium || renewalData.annualFee || renewalData.amount || 0;
    const urgencyText = renewalData.daysToRenewal < 0 ? 
      `${Math.abs(renewalData.daysToRenewal)} days overdue` : 
      `due in ${renewalData.daysToRenewal} days`;
    
    return template
      .replace(/\[customerName\]/g, renewalData.customerName)
      .replace(/\[product\]/g, renewalData.product)
      .replace(/\[renewalDate\]/g, new Date(renewalData.renewalDate).toLocaleDateString())
      .replace(/\[amount\]/g, amount.toLocaleString())
      .replace(/\[urgencyText\]/g, urgencyText)
      .replace(/\[status\]/g, renewalData.status.replace('_', ' ').toUpperCase())
      .replace(/\[daysOverdue\]/g, Math.abs(renewalData.daysToRenewal).toString())
      .replace(/\[daysRemaining\]/g, Math.max(0, renewalData.daysToRenewal).toString());
  };

  const handleSend = () => {
    onSend({
      channel: selectedChannel,
      template: selectedTemplate,
      subject: selectedChannel === 'email' ? subject : undefined,
      message,
      scheduledTime: scheduledTime || undefined,
      followUpScheduled,
      urgencyLevel
    });

    // Reset form
    setSelectedChannel('');
    setSelectedTemplate('');
    setSubject('');
    setMessage('');
    setScheduledTime('');
    setFollowUpScheduled(false);
    setUrgencyLevel('normal');
  };

  const getProductIcon = (product: string) => {
    if (product.includes('Insurance')) return Shield;
    if (product.includes('Credit')) return CreditCard;
    if (product.includes('Deposit')) return Briefcase;
    return Building2;
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'reminder_sent': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const ProductIcon = getProductIcon(renewalData.product);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Send Renewal Reminder
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer & Renewal Information */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ProductIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{renewalData.customerName}</h3>
                  <p className="text-sm text-gray-600">{renewalData.customerId} • {renewalData.product}</p>
                  {(renewalData.policyNumber || renewalData.accountNumber) && (
                    <p className="text-xs text-gray-500">
                      {renewalData.policyNumber || renewalData.accountNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(renewalData.status)}>
                  {renewalData.status.replace('_', ' ')}
                </Badge>
                <Badge className={getRiskLevelColor(renewalData.riskLevel)}>
                  {renewalData.riskLevel} risk
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-gray-500">Renewal Date</p>
                  <p className="font-medium">{new Date(renewalData.renewalDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium">
                    ${(renewalData.premium || renewalData.annualFee || renewalData.amount || 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-gray-500">Days to Renewal</p>
                  <p className={`font-medium ${renewalData.daysToRenewal < 0 ? 'text-red-600' : 
                    renewalData.daysToRenewal < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {renewalData.daysToRenewal < 0 ? 
                      `${Math.abs(renewalData.daysToRenewal)} days overdue` : 
                      `${renewalData.daysToRenewal} days`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-gray-500">Preferred Channel</p>
                  <p className="font-medium">{renewalData.preferredChannel}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communication Channel Selection */}
          <div className="space-y-3">
            <Label>Communication Channel</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {communicationChannels.map((channel) => {
                const Icon = channel.icon;
                const isPreferred = channel.name === renewalData.preferredChannel;
                return (
                  <div
                    key={channel.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                      selectedChannel === channel.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    } ${isPreferred ? 'ring-2 ring-green-200' : ''}`}
                    onClick={() => handleChannelSelect(channel.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{channel.name}</span>
                      {isPreferred && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                          Preferred
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{channel.description}</p>
                    <p className="text-xs text-gray-500">⏱ {channel.estimatedDelivery}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Template Selection */}
          {selectedChannel && (
            <div className="space-y-3">
              <Label>Message Template</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {availableTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Message Composition */}
          {selectedChannel && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Subject Line (Email only) */}
                {selectedChannel === 'email' && (
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
                  <Label htmlFor="message">Message Content</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message..."
                    rows={selectedChannel === 'phone' ? 8 : 12}
                  />
                </div>
              </div>

              {/* Options Panel */}
              <div className="space-y-4">
                {/* Urgency Level */}
                <div className="space-y-2">
                  <Label>Urgency Level</Label>
                  <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Low Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="normal">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Normal Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          High Priority
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
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                {/* Follow-up Option */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followup"
                    checked={followUpScheduled}
                    onCheckedChange={setFollowUpScheduled}
                  />
                  <Label htmlFor="followup" className="text-sm">
                    Schedule automatic follow-up in 3 days
                  </Label>
                </div>

                {/* Channel Info */}
                {selectedChannelObj && (
                  <div className="p-3 bg-blue-50 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <selectedChannelObj.icon className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-sm text-blue-800">
                        {selectedChannelObj.name} Delivery
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Estimated delivery: {selectedChannelObj.estimatedDelivery}
                    </p>
                  </div>
                )}

                {/* Urgency Warning */}
                {renewalData.daysToRenewal < 0 && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-sm text-red-800">Overdue Alert</span>
                    </div>
                    <p className="text-sm text-red-700">
                      This renewal is {Math.abs(renewalData.daysToRenewal)} days overdue. 
                      Consider using high urgency level.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!selectedChannel || !message}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              {scheduledTime ? 'Schedule Reminder' : 'Send Reminder'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};