"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Video,
  FileText,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  Eye,
  Download,
  Share2,
  MoreHorizontal,
  Edit,
  Trash2,
  Archive
} from "lucide-react";
import type { Customer } from "@/contexts/LeadContext";

interface CustomerContactProps {
  customer: Customer;
}

interface ContactRecord {
  id: string;
  type: 'email' | 'phone' | 'meeting' | 'chat' | 'sms' | 'note';
  direction: 'inbound' | 'outbound';
  subject?: string;
  content: string;
  status: 'sent' | 'delivered' | 'opened' | 'responded' | 'scheduled' | 'completed' | 'pending';
  timestamp: string;
  duration?: string;
  attachments?: string[];
  agent: string;
  priority: 'low' | 'medium' | 'high';
  sentiment?: 'positive' | 'neutral' | 'negative';
  tags: string[];
}

export const CustomerContact: React.FC<CustomerContactProps> = ({ customer }) => {

  // Generate mock contact history
  const generateContactHistory = (): ContactRecord[] => {
    const contacts: ContactRecord[] = [
      {
        id: '1',
        type: 'email',
        direction: 'outbound',
        subject: 'Welcome to Our Platform!',
        content: 'Thank you for joining our platform. We\'re excited to have you on board and want to ensure you get the most out of our services.',
        status: 'opened',
        timestamp: customer.registrationDate,
        agent: 'Sarah Johnson',
        priority: 'medium',
        sentiment: 'positive',
        tags: ['welcome', 'onboarding']
      },
      {
        id: '2',
        type: 'phone',
        direction: 'outbound',
        subject: 'Onboarding Call',
        content: 'Initial onboarding call to introduce platform features and answer any questions. Customer expressed interest in premium features.',
        status: 'completed',
        timestamp: new Date(new Date(customer.registrationDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: '30 minutes',
        agent: 'Michael Chen',
        priority: 'high',
        sentiment: 'positive',
        tags: ['onboarding', 'sales']
      },
      {
        id: '3',
        type: 'email',
        direction: 'inbound',
        subject: 'Question about billing',
        content: 'Hi, I have a question about my billing cycle and would like to understand the pricing structure better.',
        status: 'responded',
        timestamp: new Date(new Date(customer.registrationDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        agent: 'Support Team',
        priority: 'medium',
        sentiment: 'neutral',
        tags: ['billing', 'support']
      },
      {
        id: '4',
        type: 'chat',
        direction: 'inbound',
        subject: 'Live Chat Session',
        content: 'Customer initiated chat session asking about advanced features and integration options. Provided detailed walkthrough.',
        status: 'completed',
        timestamp: new Date(new Date(customer.registrationDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: '15 minutes',
        agent: 'Emma Rodriguez',
        priority: 'medium',
        sentiment: 'positive',
        tags: ['features', 'integration']
      },
      {
        id: '5',
        type: 'meeting',
        direction: 'outbound',
        subject: 'Product Demo & Strategy Session',
        content: 'Comprehensive product demonstration and strategic discussion about customer\'s business goals and how our platform can help achieve them.',
        status: 'completed',
        timestamp: new Date(new Date(customer.registrationDate).getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        duration: '45 minutes',
        agent: 'David Park',
        priority: 'high',
        sentiment: 'positive',
        tags: ['demo', 'strategy', 'upsell']
      }
    ];

    // Add conversion note if customer was converted from lead
    if (customer.originalLeadId) {
      contacts.push({
        id: '6',
        type: 'note',
        direction: 'outbound',
        subject: 'Lead Conversion',
        content: customer.conversionNotes || 'Successfully converted from lead to paying customer. All onboarding requirements met.',
        status: 'completed',
        timestamp: customer.movedDate || customer.registrationDate,
        agent: 'System',
        priority: 'high',
        sentiment: 'positive',
        tags: ['conversion', 'milestone']
      });
    }

    return contacts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const contactHistory = generateContactHistory();


  // Get contact stats
  const contactStats = {
    total: contactHistory.length,
    emails: contactHistory.filter(c => c.type === 'email').length,
    calls: contactHistory.filter(c => c.type === 'phone').length,
    meetings: contactHistory.filter(c => c.type === 'meeting').length,
    chats: contactHistory.filter(c => c.type === 'chat').length,
    lastContact: contactHistory[0]?.timestamp || 'Never'
  };

  // Communication preferences
  const communicationPrefs = {
    preferredChannel: 'Email',
    preferredTime: '2-4 PM',
    timezone: 'EST',
    frequency: 'Weekly',
    optedIn: true,
    languages: ['English']
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'meeting': return Video;
      case 'chat': return MessageSquare;
      case 'sms': return MessageSquare;
      case 'note': return FileText;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'opened': return 'bg-red-100 text-red-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Overview Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{contactStats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-[#e85b5e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Emails</p>
                <p className="text-2xl font-bold">{contactStats.emails}</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calls</p>
                <p className="text-2xl font-bold">{contactStats.calls}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Meetings</p>
                <p className="text-2xl font-bold">{contactStats.meetings}</p>
              </div>
              <Video className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Contact</p>
                <p className="text-lg font-bold">{contactStats.lastContact}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Contact History</TabsTrigger>
          <TabsTrigger value="preferences">Communication Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">

          {/* Contact History Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Contact Timeline ({contactHistory.length} records)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactHistory.map((contact, index) => {
                  const IconComponent = getContactIcon(contact.type);
                  return (
                    <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Icon and Timeline */}
                        <div className="relative">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-[#e85b5e]" />
                          </div>
                          {index < contactHistory.length - 1 && (
                            <div className="absolute top-10 left-5 w-0.5 h-8 bg-gray-200"></div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-medium">{contact.subject || `${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)} Contact`}</h4>
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                              <Badge variant="outline" className={getPriorityColor(contact.priority)}>
                                {contact.priority}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <ArrowRight className={`w-3 h-3 ${contact.direction === 'inbound' ? 'rotate-180' : ''}`} />
                                <span className="text-xs text-muted-foreground">
                                  {contact.direction === 'inbound' ? 'Inbound' : 'Outbound'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{contact.timestamp}</span>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{contact.content}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {contact.agent}
                              </div>
                              {contact.duration && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {contact.duration}
                                </div>
                              )}
                              {contact.sentiment && (
                                <div className={`flex items-center gap-1 ${getSentimentColor(contact.sentiment)}`}>
                                  <Star className="w-3 h-3" />
                                  {contact.sentiment}
                                </div>
                              )}
                            </div>

                            <div className="flex gap-1">
                              {contact.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Preferred Channel</label>
                  <p className="text-sm font-semibold">{communicationPrefs.preferredChannel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Preferred Time</label>
                  <p className="text-sm font-semibold">{communicationPrefs.preferredTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Timezone</label>
                  <p className="text-sm font-semibold">{communicationPrefs.timezone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Frequency</label>
                  <p className="text-sm font-semibold">{communicationPrefs.frequency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Marketing Opt-in</label>
                  <Badge className={communicationPrefs.optedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {communicationPrefs.optedIn ? 'Opted In' : 'Opted Out'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm font-semibold">{customer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-sm font-semibold">{customer.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm font-semibold">{customer.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Languages</label>
                  <div className="flex gap-1 mt-1">
                    {communicationPrefs.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};