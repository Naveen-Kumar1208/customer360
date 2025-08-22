"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Upload, 
  MessageSquare, 
  Send,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Clock,
  BarChart3,
  Settings,
  TrendingUp,
  Target,
  Activity,
  Search
} from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Contact {
  phone: string;
  name?: string;
  email?: string;
  company?: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered' | 'read' | 'duplicate';
  errorMessage?: string;
  messageId?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  retryCount?: number;
}

interface CampaignSchedule {
  type: 'immediate' | 'scheduled';
  scheduledDate?: string;
  scheduledTime?: string;
  timezone?: string;
}

interface CampaignAnalytics {
  campaignId: string;
  totalContacts: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  duplicateCount: number;
  clickCount: number;
  ctr: number;
  startTime: string;
  endTime?: string;
  estimatedCost: number;
}

interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  language: string;
  status: string;
  content: string;
  buttons?: any[];
  header?: {
    type: string;
    content: string;
  };
}

// WhatsApp Campaign Analytics interfaces
interface CampaignContact {
  phone: string;
  name?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'duplicate';
  messageId?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
  retryCount?: number;
}

interface WhatsAppCampaign {
  id: string;
  name: string;
  templateName: string;
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  totalContacts: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  duplicateCount: number;
  clickCount: number;
  ctr: number;
  estimatedCost: number;
  contacts: CampaignContact[];
}

// Real campaign data is now fetched from API

export default function CreateWhatsAppCampaignPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // States
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [testMode, setTestMode] = useState(false);
  
  // Enhanced features
  const [campaignSchedule, setCampaignSchedule] = useState<CampaignSchedule>({
    type: 'immediate',
    timezone: 'Asia/Kolkata'
  });
  const [campaignAnalytics, setCampaignAnalytics] = useState<CampaignAnalytics | null>(null);
  const [templateVariables, setTemplateVariables] = useState<{[key: string]: string}>({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [campaignId, setCampaignId] = useState<string>('');
  
  // WhatsApp Analytics states
  const [whatsappCampaigns, setWhatsappCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [selectedWhatsAppCampaign, setSelectedWhatsAppCampaign] = useState<WhatsAppCampaign | null>(null);
  const [whatsappSearchTerm, setWhatsappSearchTerm] = useState('');
  const [whatsappStatusFilter, setWhatsappStatusFilter] = useState<string>('all');
  const [isWhatsappLoading, setIsWhatsappLoading] = useState(false);
  const [campaignsPagination, setCampaignsPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false
  });
  const [showTestingPanel, setShowTestingPanel] = useState(false);
  const [isSimulatingStatus, setIsSimulatingStatus] = useState(false);
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [webhookDebugInfo, setWebhookDebugInfo] = useState<any>(null);
  const [isLoadingWebhookInfo, setIsLoadingWebhookInfo] = useState(false);
  
  // Enhanced file upload handler with duplicate detection
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      alert('Please upload an Excel (.xlsx, .xls) or CSV file');
      return;
    }

    setIsUploadingFile(true);
    
    try {
      const processedContacts: Contact[] = [];
      const phoneSet = new Set<string>(); // For duplicate detection
      let duplicateCount = 0;
      
      if (file.name.endsWith('.csv')) {
        // Process CSV file
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length === 0) {
          throw new Error('Empty file');
        }
        
        // Get headers
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const phoneIndex = headers.findIndex(h => h.includes('phone') || h.includes('mobile') || h.includes('number'));
        const nameIndex = headers.findIndex(h => h.includes('name'));
        const emailIndex = headers.findIndex(h => h.includes('email'));
        const companyIndex = headers.findIndex(h => h.includes('company') || h.includes('organization'));
        
        if (phoneIndex === -1) {
          throw new Error('Phone number column not found. Please include a column with "phone", "mobile", or "number" in the header');
        }
        
        // Parse data rows with duplicate detection
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          if (values[phoneIndex]) {
            let phone = values[phoneIndex].replace(/\D/g, '');
            
            // Phone number validation and formatting
            if (phone.length < 10) {
              console.warn(`Invalid phone number at row ${i + 1}: ${phone} (too short)`);
              continue;
            }
            
            // Normalize phone number format
            phone = phone.length === 10 ? '91' + phone : phone;
            
            // Check for duplicates
            if (phoneSet.has(phone)) {
              duplicateCount++;
              // Still add but mark as duplicate
              processedContacts.push({
                phone,
                name: nameIndex !== -1 ? values[nameIndex] : undefined,
                email: emailIndex !== -1 ? values[emailIndex] : undefined,
                company: companyIndex !== -1 ? values[companyIndex] : undefined,
                status: 'duplicate'
              });
              continue;
            }
            
            phoneSet.add(phone);
            processedContacts.push({
              phone,
              name: nameIndex !== -1 ? values[nameIndex] : undefined,
              email: emailIndex !== -1 ? values[emailIndex] : undefined,
              company: companyIndex !== -1 ? values[companyIndex] : undefined,
              status: 'pending'
            });
          }
        }
      } else {
        // For Excel files, show message for now
        alert('Excel file processing will be available in the full version. Please use CSV format for now.');
        setIsUploadingFile(false);
        return;
      }
      
      if (processedContacts.length === 0) {
        throw new Error('No valid contacts found in the file');
      }
      
      if (processedContacts.length > 10000) {
        throw new Error('Too many contacts. Maximum 10,000 contacts per upload');
      }
      
      // Show duplicate detection results
      const uniqueContacts = processedContacts.filter(c => c.status !== 'duplicate').length;
      if (duplicateCount > 0) {
        alert(`File processed successfully!\nUnique contacts: ${uniqueContacts}\nDuplicates detected: ${duplicateCount}\nDuplicates will be skipped during sending.`);
      }
      
      setContacts(processedContacts);
    } catch (error) {
      console.error('Error processing file:', error);
      alert(error instanceof Error ? error.message : 'Error processing file. Please try again.');
    } finally {
      setIsUploadingFile(false);
    }
  };

  // Load approved templates from WhatsApp API
  const loadTemplates = useCallback(async () => {
    setIsLoadingTemplates(true);
    try {
      console.log('🔄 Loading WhatsApp templates from API...');
      const response = await fetch('/api/whatsapp/templates');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Templates loaded:', data);
      
      setTemplates(data.templates || []);
      
      if (data.source === 'mock_fallback') {
        console.warn('⚠️ Using fallback templates:', data.error);
      }
    } catch (error) {
      console.error('❌ Error loading templates:', error);
      
      // Fallback to mock templates if API fails
      const fallbackTemplates: WhatsAppTemplate[] = [
        {
          id: 'hello_world',
          name: 'hello_world',
          category: 'UTILITY',
          language: 'en_US',
          status: 'APPROVED',
          content: 'Hello World'
        }
      ];
      setTemplates(fallbackTemplates);
      alert('Failed to load templates from WhatsApp API. Using fallback templates.');
    } finally {
      setIsLoadingTemplates(false);
    }
  }, []);

  // Enhanced message sending with personalization, validation, scheduling, and rate limiting
  const sendMessages = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first');
      return;
    }
    
    if (contacts.length === 0) {
      alert('Please upload contacts first');
      return;
    }

    // Template validation - check if template is approved
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) {
      alert('Selected template not found. Please refresh templates and try again.');
      return;
    }
    
    if (template.status !== 'APPROVED') {
      const proceed = confirm(
        `Warning: Template "${template.name}" is ${template.status}, not APPROVED.\n` +
        'Sending may fail. Do you want to proceed anyway?'
      );
      if (!proceed) return;
    }

    // Check for scheduled campaigns
    if (campaignSchedule.type === 'scheduled' && campaignSchedule.scheduledDate && campaignSchedule.scheduledTime) {
      const scheduledDateTime = new Date(`${campaignSchedule.scheduledDate}T${campaignSchedule.scheduledTime}`);
      const now = new Date();
      
      if (scheduledDateTime <= now) {
        alert('Scheduled time must be in the future. Please update the schedule.');
        return;
      }
      
      const timeUntilSend = scheduledDateTime.getTime() - now.getTime();
      console.log(`Campaign scheduled for ${scheduledDateTime.toLocaleString()}. Waiting ${Math.round(timeUntilSend / 1000)} seconds...`);
      
      // Schedule the campaign
      setTimeout(() => {
        console.log('🕐 Scheduled campaign starting now...');
        executeCampaign();
      }, timeUntilSend);
      
      alert(`Campaign scheduled for ${scheduledDateTime.toLocaleString()}. It will start automatically.`);
      return;
    }

    // Execute immediately
    await executeCampaign();
  };

  // Enhanced campaign execution with rate limiting and exponential backoff
  const executeCampaign = async () => {
    setIsSending(true);
    setSendProgress(0);
    
    // Generate campaign ID for tracking
    const newCampaignId = 'camp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    setCampaignId(newCampaignId);

    // Create campaign record in database
    const uniqueContacts = contacts.filter(c => c.status !== 'duplicate');
    const campaignData = {
      id: newCampaignId,
      name: `Campaign ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      templateName: selectedTemplate,
      totalContacts: uniqueContacts.length,
      estimatedCost: uniqueContacts.length * 0.05,
      contacts: uniqueContacts
    };

    console.log('🚀 Creating campaign with data:', {
      campaignId: newCampaignId,
      totalContacts: campaignData.totalContacts,
      actualContactsCount: uniqueContacts.length,
      templateName: selectedTemplate
    });

    const campaignRecord = await createCampaignRecord(campaignData);
    if (campaignRecord) {
      console.log('✅ Campaign record created in database:', {
        id: campaignRecord.id,
        totalContacts: campaignRecord.totalContacts,
        contactsLength: campaignRecord.contacts?.length || 0
      });
      
      // Mark campaign as running
      await updateCampaignRecord(newCampaignId, {
        status: 'running'
      });
    }
    
    // Initialize analytics
    const analytics: CampaignAnalytics = {
      campaignId: newCampaignId,
      totalContacts: contacts.filter(c => c.status !== 'duplicate').length,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      duplicateCount: contacts.filter(c => c.status === 'duplicate').length,
      clickCount: 0,
      ctr: 0,
      startTime: new Date().toISOString(),
      estimatedCost: contacts.filter(c => c.status !== 'duplicate').length * 0.05 // Estimated $0.05 per message
    };
    setCampaignAnalytics(analytics);
    
    const updatedContacts = [...contacts];
    const contactsToSend = contacts.filter(c => c.status !== 'duplicate');
    
    console.log('🚀 Starting enhanced WhatsApp campaign:', {
      campaignId: newCampaignId,
      template: selectedTemplate,
      totalContacts: contacts.length,
      uniqueContacts: contactsToSend.length,
      duplicates: contacts.length - contactsToSend.length,
      scheduled: campaignSchedule.type === 'scheduled'
    });
    
    // Rate limiting variables
    let consecutiveFailures = 0;
    let currentDelay = 1000; // Start with 1 second delay
    const maxDelay = 60000; // Maximum 60 seconds
    const maxRetries = 3;
    
    for (let i = 0; i < contactsToSend.length; i++) {
      const contactIndex = contacts.findIndex(c => c.phone === contactsToSend[i].phone);
      const contact = contactsToSend[i];
      
      // Skip duplicates
      if (contact.status === 'duplicate') {
        continue;
      }
      
      let retryCount = 0;
      let messageSent = false;
      
      while (retryCount < maxRetries && !messageSent) {
        try {
          // Build WhatsApp message payload with personalization
          const messagePayload = buildPersonalizedWhatsAppMessage(selectedTemplate, contact);
          console.log(`📤 Sending message ${i + 1}/${contactsToSend.length} to ${contact.phone} (attempt ${retryCount + 1}):`, messagePayload);
          
          if (testMode) {
            // Test mode - simulate API responses with realistic scenarios
            await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
            
            const scenarios = [
              { success: true, probability: 0.7 }, // 70% success
              { success: false, error: 'Invalid phone number', probability: 0.1 }, // 10% invalid phone
              { success: false, error: 'Template not approved', probability: 0.05 }, // 5% template issue
              { success: false, error: 'Rate limit exceeded', probability: 0.1 }, // 10% rate limit
              { success: false, error: 'Network timeout', probability: 0.05 } // 5% network issues
            ];
            
            const random = Math.random();
            let cumulativeProbability = 0;
            let selectedScenario = scenarios[0];
            
            for (const scenario of scenarios) {
              cumulativeProbability += scenario.probability;
              if (random < cumulativeProbability) {
                selectedScenario = scenario;
                break;
              }
            }
            
            if (selectedScenario.success) {
              updatedContacts[contactIndex].status = 'sent';
              updatedContacts[contactIndex].messageId = 'msg_test_' + Date.now();
              updatedContacts[contactIndex].sentAt = new Date().toISOString();
              updatedContacts[contactIndex].retryCount = retryCount;
              analytics.sentCount++;
              consecutiveFailures = 0;
              messageSent = true;
              console.log(`✅ [TEST MODE] Message simulated as sent to ${contact.phone}`);
            } else {
              throw new Error(selectedScenario.error || 'Simulated failure');
            }
          } else {
            // Real API calls with phone number validation
            const phoneValidation = validatePhoneNumber(contact.phone);
            if (!phoneValidation.valid) {
              throw new Error(`Invalid phone number: ${phoneValidation.error}`);
            }
            
            const response = await fetch('/api/whatsapp/send-message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messagePayload,
                phone: contact.phone,
                campaignId: newCampaignId
              }),
            });

            if (response.status === 400) {
              // Phone number validation failed on server
              const error = await response.json();
              throw new Error(`Phone validation failed: ${error.message || 'Invalid phone number'}`);
            }

            if (response.ok) {
              const result = await response.json();
              const messageId = result.messageId || 'msg_' + Date.now();
              updatedContacts[contactIndex].status = 'sent';
              updatedContacts[contactIndex].messageId = messageId;
              updatedContacts[contactIndex].sentAt = new Date().toISOString();
              updatedContacts[contactIndex].retryCount = retryCount;
              analytics.sentCount++;
              consecutiveFailures = 0;
              messageSent = true;
              
              console.log(`✅ Message sent to ${contact.phone}:`, {
                phone: contact.phone,
                messageId,
                campaignId: newCampaignId,
                result
              });

              // Immediately update the campaign contact status in the database
              try {
                await fetch('/api/whatsapp/campaigns/update-contact-status', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    messageId,
                    phone: contact.phone,
                    status: 'sent',
                    timestamp: new Date().toISOString()
                  })
                });
              } catch (error) {
                console.error('❌ Error updating contact status in campaign:', error);
              }
            } else if (response.status === 429) {
              // Rate limit exceeded - implement exponential backoff
              consecutiveFailures++;
              throw new Error('Rate limit exceeded');
            } else {
              let error;
              try {
                error = await response.json();
              } catch {
                error = { message: `HTTP ${response.status}: ${response.statusText}` };
              }
              throw new Error(error.error || error.message || `HTTP ${response.status}`);
            }
          }
        } catch (error) {
          retryCount++;
          consecutiveFailures++;
          
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error(`❌ Attempt ${retryCount} failed for ${contact.phone}:`, errorMessage);
          
          // Check if we should retry
          if (retryCount < maxRetries && (errorMessage.includes('Rate limit') || errorMessage.includes('timeout') || errorMessage.includes('Network'))) {
            // Exponential backoff for retryable errors
            const backoffDelay = Math.min(currentDelay * Math.pow(2, consecutiveFailures), maxDelay);
            console.log(`⏳ Rate limit/network error. Backing off for ${backoffDelay}ms before retry ${retryCount + 1}...`);
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
          } else {
            // Non-retryable error or max retries reached
            updatedContacts[contactIndex].status = 'failed';
            updatedContacts[contactIndex].errorMessage = errorMessage;
            updatedContacts[contactIndex].retryCount = retryCount;
            analytics.failedCount++;
            messageSent = true; // Stop retrying
            console.error(`❌ Final failure for ${contact.phone} after ${retryCount} attempts:`, errorMessage);
          }
        }
      }
      
      // Update progress and UI
      setSendProgress(((i + 1) / contactsToSend.length) * 100);
      setContacts([...updatedContacts]);
      
      // Dynamic rate limiting based on success/failure rate
      if (consecutiveFailures === 0) {
        currentDelay = Math.max(1000, currentDelay * 0.9); // Reduce delay on success
      } else if (consecutiveFailures > 3) {
        currentDelay = Math.min(maxDelay, currentDelay * 1.5); // Increase delay on failures
      }
      
      // Wait between messages (adaptive rate limiting)
      if (i < contactsToSend.length - 1) {
        await new Promise(resolve => setTimeout(resolve, currentDelay));
      }
    }
    
    // Finalize analytics
    analytics.endTime = new Date().toISOString();
    setCampaignAnalytics(analytics);
    
    // Update campaign record in database with final results
    const finalContacts = updatedContacts.filter(c => c.status !== 'duplicate');
    await updateCampaignRecord(newCampaignId, {
      status: 'completed',
      metrics: {
        sentCount: analytics.sentCount,
        deliveredCount: analytics.deliveredCount,
        readCount: analytics.readCount,
        failedCount: analytics.failedCount,
        clickCount: analytics.clickCount
      },
      contacts: finalContacts
    });

    console.log('📊 Final campaign metrics:', {
      campaignId: newCampaignId,
      totalContactsProcessed: finalContacts.length,
      sent: analytics.sentCount,
      failed: analytics.failedCount,
      duplicates: analytics.duplicateCount
    });
    
    console.log('🎉 Campaign completed:', {
      campaignId: newCampaignId,
      sent: analytics.sentCount,
      failed: analytics.failedCount,
      duplicates: analytics.duplicateCount,
      totalProcessed: contactsToSend.length
    });
    
    setIsSending(false);
    setShowResults(true);
  };

  // Enhanced phone number validation
  const validatePhoneNumber = (phone: string): { valid: boolean; error?: string } => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check minimum length
    if (cleanPhone.length < 10) {
      return { valid: false, error: 'Phone number too short (minimum 10 digits)' };
    }
    
    // Check maximum length
    if (cleanPhone.length > 15) {
      return { valid: false, error: 'Phone number too long (maximum 15 digits)' };
    }
    
    // Check for valid country codes (basic validation)
    const validCountryCodes = ['91', '1', '44', '33', '49', '81', '86', '61']; // Add more as needed
    const hasValidCountryCode = validCountryCodes.some(code => cleanPhone.startsWith(code));
    
    if (cleanPhone.length > 10 && !hasValidCountryCode) {
      return { valid: false, error: 'Invalid country code' };
    }
    
    return { valid: true };
  };
  
  // Enhanced personalized message builder with variable replacement
  const buildPersonalizedWhatsAppMessage = (templateId: string, contact: Contact) => {
    const basePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: contact.phone,
    };
    
    // Find the template to get its language and structure
    const template = templates.find(t => t.id === templateId);
    const languageCode = template?.language || 'en_US';
    
    // Special handling for hello_world template (no parameters required)
    if (templateId === 'hello_world') {
      return {
        ...basePayload,
        type: 'template',
        template: {
          name: 'hello_world',
          language: { code: languageCode }
        }
      };
    }
    
    // Special handling for interview_reschedule_notification_22 template (4 parameters required)
    if (templateId === 'interview_reschedule_notification_22') {
      console.log('🔧 Building interview_reschedule_notification_22 with 4 parameters');
      const payload = {
        ...basePayload,
        type: 'template',
        template: {
          name: 'interview_reschedule_notification_22',
          language: { code: languageCode },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: 'Tuesday' // {{1}} - Original day
                },
                {
                  type: 'text', 
                  text: 'Monday' // {{2}} - New day to attend
                },
                {
                  type: 'text',
                  text: 'August 26, 2025 Tuesday' // {{3}} - New interview date
                },
                {
                  type: 'text',
                  text: '10:00 AM' // {{4}} - New interview time
                }
              ]
            }
          ]
        }
      };
      console.log('✅ Generated payload for interview template:', JSON.stringify(payload, null, 2));
      return payload;
    }
    
    // Extract and replace template variables for other templates
    const personalizedComponents = [];
    
    // Body component with personalization
    const bodyText = template?.content || '';
    const personalizedBody = bodyText ? replaceTemplateVariables(bodyText, contact) : '';
    
    if (personalizedBody && templateId !== 'hello_world') {
      personalizedComponents.push({
        type: 'body',
        parameters: extractParameters(personalizedBody, contact)
      });
    }
    
    // Header component if exists
    if (template?.header && template.header.content) {
      const personalizedHeader = replaceTemplateVariables(template.header.content, contact);
      personalizedComponents.push({
        type: 'header',
        parameters: extractParameters(personalizedHeader, contact)
      });
    }
    
    return {
      ...basePayload,
      type: 'template',
      template: {
        name: templateId,
        language: { code: languageCode },
        components: personalizedComponents.length > 0 ? personalizedComponents : undefined
      }
    };
  };
  
  // Replace template variables with contact data
  const replaceTemplateVariables = (text: string, contact: Contact): string => {
    if (!text) return '';
    
    let result = text;
    
    // Replace common variables
    const commonVariables: {[key: string]: string} = {
      '{{name}}': contact.name || 'Customer',
      '{{company}}': contact.company || 'your company',
      '{{email}}': contact.email || 'your email',
      '{{phone}}': contact.phone || ''
    };
    
    // Combine with custom template variables if any
    const allVariables = { ...commonVariables };
    if (templateVariables && typeof templateVariables === 'object') {
      Object.assign(allVariables, templateVariables);
    }
    
    for (const [variable, value] of Object.entries(allVariables)) {
      if (variable && value) {
        result = result.replace(new RegExp(variable.replace(/[{}]/g, '\\$&'), 'gi'), value);
      }
    }
    
    return result;
  };
  
  // Extract parameters from personalized text for WhatsApp API
  const extractParameters = (text: string, contact: Contact, templateId?: string) => {
    const parameters = [];
    
    // Handle specific templates with known parameter requirements
    if (templateId === 'interview_reschedule_notification_22') {
      // This template is already handled in buildPersonalizedWhatsAppMessage
      // This should not be reached
      return [
        { type: 'text', text: 'Tuesday' },
        { type: 'text', text: 'Monday' },
        { type: 'text', text: 'August 26, 2025 Tuesday' },
        { type: 'text', text: '10:00 AM' }
      ];
    }
    
    // For other templates, return contact name as primary parameter
    if (contact.name) {
      parameters.push({
        type: 'text',
        text: contact.name
      });
    }
    
    return parameters;
  };

  // Build WhatsApp message payload based on template (legacy method)
  const buildWhatsAppMessage = (templateId: string, contact: Contact) => {
    const basePayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: contact.phone,
    };
    
    // Find the template to get its language
    const template = templates.find(t => t.id === templateId);
    const languageCode = template?.language || 'en_US';
    
    switch (templateId) {
      case 'hello_world':
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: 'hello_world',
            language: { code: languageCode },
            components: []
          }
        };
        
      case 'sample_template':
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: 'sample_template',
            language: { code: languageCode },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: contact.name || 'Customer'
                  }
                ]
              }
            ]
          }
        };
        
      case 'test_template':
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: 'test_template',
            language: { code: languageCode },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: contact.name || 'Customer'
                  }
                ]
              }
            ]
          }
        };
        
      case 'simple_text':
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: 'simple_text',
            language: { code: languageCode },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: contact.name || 'Customer'
                  }
                ]
              }
            ]
          }
        };
        
      case 'interview_reschedule_notification_22':
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: 'interview_reschedule_notification_22',
            language: { code: languageCode },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: 'Saturday' // {{1}} - Original day
                  },
                  {
                    type: 'text', 
                    text: 'Friday' // {{2}} - New day to attend
                  },
                  {
                    type: 'text',
                    text: 'December 27, 2024 Friday' // {{3}} - New interview date
                  },
                  {
                    type: 'text',
                    text: '10:00 AM' // {{4}} - New interview time
                  }
                ]
              }
            ]
          }
        };
        
      default:
        // If template not recognized, try to send as template anyway
        console.warn(`Unknown template: ${templateId}, attempting to send as template`);
        return {
          ...basePayload,
          type: 'template',
          template: {
            name: templateId,
            language: { code: languageCode },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: contact.name || 'Customer'
                  }
                ]
              }
            ]
          }
        };
    }
  };

  // WhatsApp Analytics helper functions
  // Since API handles filtering, we use campaigns directly
  const filteredWhatsAppCampaigns = whatsappCampaigns;

  const loadWhatsAppAnalytics = async (searchTerm?: string, statusFilter?: string) => {
    setIsWhatsappLoading(true);
    try {
      console.log('📊 Loading WhatsApp campaigns from API...');
      
      // Build query parameters
      const params = new URLSearchParams({
        limit: campaignsPagination.limit.toString(),
        offset: '0', // Reset to first page on new search
      });
      
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchTerm && searchTerm.trim()) {
        params.append('search', searchTerm.trim());
      }

      const response = await fetch(`/api/whatsapp/campaigns?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Campaigns loaded from API:', data);
      
      if (data.success) {
        console.log('📊 Setting campaigns in state:', {
          campaignsCount: data.campaigns?.length || 0,
          campaigns: data.campaigns?.map((c: WhatsAppCampaign) => ({
            id: c.id,
            name: c.name,
            totalContacts: c.totalContacts,
            status: c.status
          })) || []
        });
        
        setWhatsappCampaigns(data.campaigns || []);
        setCampaignsPagination(data.pagination || {
          total: 0,
          limit: 50,
          offset: 0,
          hasMore: false
        });
        
        // Clear selected campaign if it's no longer in the list
        if (selectedWhatsAppCampaign && !data.campaigns.find((c: WhatsAppCampaign) => c.id === selectedWhatsAppCampaign.id)) {
          setSelectedWhatsAppCampaign(null);
        }
      } else {
        throw new Error(data.error || 'Failed to load campaigns');
      }
    } catch (error) {
      console.error('❌ Error loading WhatsApp analytics:', error);
      alert('Failed to load campaign analytics. Please try again.');
      
      // Fallback to empty state
      setWhatsappCampaigns([]);
      setCampaignsPagination({
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      });
    } finally {
      setIsWhatsappLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'secondary';
      case 'scheduled': return 'outline';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getContactStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'sent': return 'default';
      case 'delivered': return 'secondary';
      case 'read': return 'default';
      case 'failed': return 'destructive';
      case 'duplicate': return 'outline';
      default: return 'outline';
    }
  };

  // Handle search and filter changes with debouncing
  const handleSearchChange = (newSearchTerm: string) => {
    setWhatsappSearchTerm(newSearchTerm);
  };

  const handleStatusFilterChange = (newStatusFilter: string) => {
    setWhatsappStatusFilter(newStatusFilter);
    loadWhatsAppAnalytics(whatsappSearchTerm, newStatusFilter);
  };

  // Debounced search effect
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (whatsappSearchTerm !== undefined) {
        loadWhatsAppAnalytics(whatsappSearchTerm, whatsappStatusFilter);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [whatsappSearchTerm, whatsappStatusFilter]);

  // Create campaign in database when campaign starts
  const createCampaignRecord = async (campaignData: {
    id: string;
    name: string;
    templateName: string;
    totalContacts: number;
    estimatedCost: number;
    contacts: Contact[];
  }) => {
    try {
      console.log('💾 Creating campaign record in database...');
      
      const response = await fetch('/api/whatsapp/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: campaignData.id, // Pass the provided campaign ID
          name: campaignData.name,
          templateName: campaignData.templateName,
          totalContacts: campaignData.totalContacts,
          estimatedCost: campaignData.estimatedCost,
          contacts: campaignData.contacts.map(c => ({
            phone: c.phone,
            name: c.name,
            status: 'pending'
          }))
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Campaign record created:', result.campaign);
        return result.campaign;
      } else {
        console.error('❌ Failed to create campaign record:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating campaign record:', error);
      return null;
    }
  };

  // Update campaign status and metrics in database
  const updateCampaignRecord = async (campaignId: string, updates: {
    status?: string;
    metrics?: {
      sentCount?: number;
      deliveredCount?: number;
      readCount?: number;
      failedCount?: number;
      clickCount?: number;
    };
    contacts?: Contact[];
  }) => {
    try {
      console.log('📊 Updating campaign record in database...', { campaignId, updates });
      
      const response = await fetch('/api/whatsapp/campaigns', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          ...updates
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Campaign record updated:', result.campaign);
        
        // Refresh analytics data to show updated campaign
        loadWhatsAppAnalytics(whatsappSearchTerm, whatsappStatusFilter);
        
        return result.campaign;
      } else {
        console.error('❌ Failed to update campaign record:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('❌ Error updating campaign record:', error);
      return null;
    }
  };

  // Simulate delivery status for testing
  const simulateDeliveryStatus = async (messageId: string, phone: string, status: string) => {
    setIsSimulatingStatus(true);
    try {
      console.log('🧪 Simulating delivery status:', { messageId, phone, status });
      
      const response = await fetch('/api/whatsapp/simulate-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          phone,
          status
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Delivery status simulated:', result);
        
        // Refresh analytics to show the updated status
        setTimeout(() => {
          loadWhatsAppAnalytics(whatsappSearchTerm, whatsappStatusFilter);
        }, 1000);
        
        alert(`Successfully simulated ${status} status for ${phone}`);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to simulate delivery status');
      }
    } catch (error) {
      console.error('❌ Error simulating delivery status:', error);
      alert(`Failed to simulate delivery status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSimulatingStatus(false);
    }
  };

  // Load webhook configuration and debug information
  const loadWebhookDebugInfo = async () => {
    setIsLoadingWebhookInfo(true);
    try {
      const response = await fetch('/api/whatsapp/webhook-debug');
      if (response.ok) {
        const debugInfo = await response.json();
        setWebhookDebugInfo(debugInfo);
        console.log('🔧 Webhook debug info loaded:', debugInfo);
      } else {
        throw new Error('Failed to load webhook debug info');
      }
    } catch (error) {
      console.error('❌ Error loading webhook debug info:', error);
      alert('Failed to load webhook configuration information');
    } finally {
      setIsLoadingWebhookInfo(false);
    }
  };

  // Auto-refresh analytics every 30 seconds to show real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (whatsappCampaigns.length > 0) {
        loadWhatsAppAnalytics(whatsappSearchTerm, whatsappStatusFilter);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [whatsappCampaigns.length, whatsappSearchTerm, whatsappStatusFilter]);

  // Load WhatsApp analytics on component mount
  React.useEffect(() => {
    loadTemplates();
    loadWhatsAppAnalytics();
  }, []);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
  const sentCount = contacts.filter(c => c.status === 'sent').length;
  const failedCount = contacts.filter(c => c.status === 'failed').length;

  return (
    <StaticExportLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/engagement')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">WhatsApp Campaign</h1>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Create Campaign
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Create Campaign Tab */}
          <TabsContent value="create" className="mt-6">
            {/* Step 1: Upload Excel Contacts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Step 1: Upload Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <div>
                  <p className="text-lg font-medium mb-2">Upload Excel File with Contacts</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop or click to select your Excel/CSV file
                  </p>
                  <Button variant="outline" disabled={isUploadingFile}>
                    {isUploadingFile ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">File Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Excel (.xlsx, .xls) or CSV format</li>
                  <li>Required column: <strong>phone</strong> (with country code, e.g., 918144162853)</li>
                  <li>Optional columns: name, email, company</li>
                  <li>Maximum 10,000 contacts per file</li>
                </ul>
                <div className="mt-3">
                  <a 
                    href="/sample-contacts.csv" 
                    download="sample-contacts.csv"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download sample CSV template
                  </a>
                </div>
              </div>
              
              {contacts.length > 0 && (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      {contacts.length} contacts loaded successfully
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Select Template */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Step 2: Select Approved Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Available Templates</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadTemplates}
                  disabled={isLoadingTemplates}
                >
                  {isLoadingTemplates ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
              </div>
              
              {templates.length > 0 ? (
                <div className="grid gap-4">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        selectedTemplate === template.id 
                          ? 'ring-2 ring-blue-500 border-blue-200' 
                          : 'hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant={template.status === 'APPROVED' ? 'default' : 'secondary'}>
                              {template.status}
                            </Badge>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {template.header && (
                          <div className="mb-3 p-2 bg-gray-50 rounded">
                            <p className="font-medium text-sm">{template.header.content}</p>
                          </div>
                        )}
                        <p className="text-sm mb-3">{template.content}</p>
                        {template.buttons && (
                          <div className="flex flex-wrap gap-2">
                            {template.buttons.map((button, idx) => (
                              <Button key={`${template.id}-btn-${idx}`} variant="outline" size="sm" disabled>
                                {button.text}
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No approved templates found</p>
                  <p className="text-sm">Please create and approve templates first</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Send Messages */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Step 3: Send Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Debug Controls */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="testMode"
                    checked={testMode}
                    onChange={(e) => setTestMode(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="testMode" className="text-sm font-medium text-gray-700">
                    Test Mode (Simulate sending without real API calls)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="debugMode"
                    checked={debugMode}
                    onChange={(e) => setDebugMode(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="debugMode" className="text-sm font-medium text-gray-700">
                    Debug Mode (Show detailed logs)
                  </label>
                </div>
              </div>
              
              {debugMode && (
                <div className="p-4 bg-black text-green-400 rounded-lg font-mono text-xs overflow-auto max-h-64">
                  <p>🔧 Debug Info:</p>
                  <p>• Contacts loaded: {contacts.length}</p>
                  <p>• Selected template: {selectedTemplate || 'None'}</p>
                  <p>• Templates available: {templates.length}</p>
                  <p>• Test mode: {testMode ? 'ON' : 'OFF'}</p>
                  {selectedTemplate && contacts[0] && (
                    <div>
                      <p>• Sample payload:</p>
                      <pre className="text-xs mt-1 p-2 bg-gray-900 rounded">
                        {JSON.stringify(buildWhatsAppMessage(selectedTemplate, contacts[0]), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {selectedTemplateData && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-900 mb-2">Selected Template: {selectedTemplateData.name}</p>
                  <p className="text-sm text-blue-700">{selectedTemplateData.content}</p>
                </div>
              )}
              
              {/* Campaign Scheduling */}
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-indigo-900">Campaign Scheduling</h4>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowScheduleModal(true)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-indigo-700 font-medium">Type:</span>
                    <span className="ml-2 capitalize">{campaignSchedule.type}</span>
                  </div>
                  {campaignSchedule.type === 'scheduled' && (
                    <div>
                      <span className="text-indigo-700 font-medium">Scheduled:</span>
                      <span className="ml-2">
                        {campaignSchedule.scheduledDate} {campaignSchedule.scheduledTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Variables */}
              {templateVariables && Object.keys(templateVariables).length > 0 && (
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-purple-900">Template Variables</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    {Object.entries(templateVariables).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-purple-700 font-mono">{key}:</span>
                        <span className="text-purple-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to send to {contacts.filter(c => c.status !== 'duplicate').length} unique contacts</p>
                  <p className="text-sm text-gray-600">
                    Enhanced sending with personalization, validation, and smart rate limiting
                  </p>
                  {contacts.filter(c => c.status === 'duplicate').length > 0 && (
                    <p className="text-sm text-orange-600">
                      {contacts.filter(c => c.status === 'duplicate').length} duplicates will be skipped
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {campaignAnalytics && (
                    <Button 
                      variant="outline"
                      onClick={() => setShowAnalyticsModal(true)}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  )}
                  {contacts.length > 0 && (
                    <Button 
                      onClick={() => {
                        const firstContact = contacts.find(c => c.status !== 'duplicate');
                        if (firstContact) {
                          setContacts([firstContact]);
                          sendMessages();
                        }
                      }}
                      disabled={!selectedTemplate || isSending}
                      variant="outline"
                      className="border-orange-500 text-orange-600 hover:bg-orange-50"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Test Send (1st contact only)
                    </Button>
                  )}
                  <Button 
                    onClick={sendMessages}
                    disabled={!selectedTemplate || contacts.filter(c => c.status !== 'duplicate').length === 0 || isSending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        {testMode ? 'Simulating...' : campaignSchedule.type === 'scheduled' ? 'Scheduling...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {campaignSchedule.type === 'scheduled' ? 'Schedule Campaign' : (testMode ? 'Simulate Send All' : 'Send Messages')}
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {isSending && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {Math.round(sendProgress)}%</span>
                    <span>{Math.round((sendProgress / 100) * contacts.length)} / {contacts.length}</span>
                  </div>
                  <Progress value={sendProgress} className="w-full" />
                </div>
              )}
              
              {showResults && (
                <div className="space-y-4">
                  {/* Enhanced Results Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{sentCount}</p>
                      <p className="text-sm text-green-700">Sent Successfully</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                      <p className="text-sm text-red-700">Failed</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {contacts.filter(c => c.status === 'duplicate').length}
                      </p>
                      <p className="text-sm text-orange-700">Duplicates Skipped</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{contacts.length}</p>
                      <p className="text-sm text-gray-700">Total Contacts</p>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Success Rate</span>
                      </div>
                      <div className="text-xl font-bold text-blue-600">
                        {contacts.filter(c => c.status !== 'duplicate').length > 0 
                          ? Math.round((sentCount / contacts.filter(c => c.status !== 'duplicate').length) * 100)
                          : 0}%
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-purple-900">Retry Attempts</span>
                      </div>
                      <div className="text-xl font-bold text-purple-600">
                        {contacts.reduce((sum, c) => sum + (c.retryCount || 0), 0)}
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-indigo-600" />
                        <span className="font-medium text-indigo-900">Campaign ID</span>
                      </div>
                      <div className="text-sm font-mono text-indigo-600">
                        {campaignId ? campaignId.slice(-12) : 'N/A'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {campaignAnalytics && (
                      <Button 
                        variant="outline"
                        onClick={() => setShowAnalyticsModal(true)}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Full Analytics
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," + 
                          "CampaignId,Phone,Name,Status,MessageId,SentAt,RetryCount,ErrorMessage\n" +
                          contacts.map(c => `${campaignId || 'N/A'},${c.phone},${c.name || ''},${c.status},${c.messageId || ''},${c.sentAt || ''},${c.retryCount || 0},${(c.errorMessage || '').replace(/,/g, ';')}`).join('\n');
                        const link = document.createElement('a');
                        link.setAttribute('href', encodeURI(csvContent));
                        link.setAttribute('download', `campaign-${campaignId || Date.now()}-results.csv`);
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contacts Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Contact Preview</DialogTitle>
              <DialogDescription>
                Review your uploaded contacts before sending messages
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Showing {contacts.length} contacts ({contacts.filter(c => c.status === 'duplicate').length} duplicates)
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      "Phone,Name,Email,Company,Status,MessageId,SentAt,RetryCount\n" +
                      contacts.map(c => `${c.phone},${c.name || ''},${c.email || ''},${c.company || ''},${c.status},${c.messageId || ''},${c.sentAt || ''},${c.retryCount || 0}`).join('\n');
                    const link = document.createElement('a');
                    link.setAttribute('href', encodeURI(csvContent));
                    link.setAttribute('download', `campaign-${campaignId || 'preview'}-contacts.csv`);
                    link.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Phone</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.slice(0, 100).map((contact, index) => (
                      <TableRow key={`${contact.phone}-${index}`}>
                        <TableCell className="font-mono">{contact.phone}</TableCell>
                        <TableCell>{contact.name || '-'}</TableCell>
                        <TableCell>{contact.email || '-'}</TableCell>
                        <TableCell>{contact.company || '-'}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              contact.status === 'sent' ? 'default' : 
                              contact.status === 'delivered' ? 'default' :
                              contact.status === 'read' ? 'default' :
                              contact.status === 'failed' ? 'destructive' : 
                              contact.status === 'duplicate' ? 'secondary' :
                              'outline'
                            }
                          >
                            {contact.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {contact.messageId && (
                            <div className="text-green-600">ID: {contact.messageId.slice(-8)}</div>
                          )}
                          {contact.sentAt && (
                            <div className="text-blue-600">Sent: {new Date(contact.sentAt).toLocaleTimeString()}</div>
                          )}
                          {contact.retryCount && contact.retryCount > 0 && (
                            <div className="text-orange-600">Retries: {contact.retryCount}</div>
                          )}
                          {contact.errorMessage && (
                            <div className="text-red-600">Error: {contact.errorMessage}</div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {contacts.length > 100 && (
                <p className="text-sm text-gray-500 text-center">
                  Showing first 100 contacts. Total: {contacts.length}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Campaign Scheduling Dialog */}
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Campaign Scheduling
              </DialogTitle>
              <DialogDescription>
                Schedule your campaign for immediate or future delivery
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Delivery Type</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="immediate"
                      checked={campaignSchedule.type === 'immediate'}
                      onChange={(e) => setCampaignSchedule({...campaignSchedule, type: 'immediate'})}
                      className="rounded"
                    />
                    <span>Send Immediately</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="scheduleType"
                      value="scheduled"
                      checked={campaignSchedule.type === 'scheduled'}
                      onChange={(e) => setCampaignSchedule({...campaignSchedule, type: 'scheduled'})}
                      className="rounded"
                    />
                    <span>Schedule for Later</span>
                  </label>
                </div>
              </div>
              
              {campaignSchedule.type === 'scheduled' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduleDate">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      value={campaignSchedule.scheduledDate || ''}
                      onChange={(e) => setCampaignSchedule({...campaignSchedule, scheduledDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="scheduleTime">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      value={campaignSchedule.scheduledTime || ''}
                      onChange={(e) => setCampaignSchedule({...campaignSchedule, scheduledTime: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={campaignSchedule.timezone || 'Asia/Kolkata'}
                      onChange={(e) => setCampaignSchedule({...campaignSchedule, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowScheduleModal(false)}>
                  Save Settings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Campaign Analytics Dialog */}
        <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Campaign Analytics
              </DialogTitle>
              <DialogDescription>
                Real-time campaign performance metrics and insights
              </DialogDescription>
            </DialogHeader>
            
            {campaignAnalytics && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{campaignAnalytics.sentCount}</div>
                    <div className="text-sm text-green-700">Sent</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{campaignAnalytics.deliveredCount}</div>
                    <div className="text-sm text-blue-700">Delivered</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{campaignAnalytics.readCount}</div>
                    <div className="text-sm text-purple-700">Read</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{campaignAnalytics.failedCount}</div>
                    <div className="text-sm text-red-700">Failed</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Delivery Rate</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {campaignAnalytics.sentCount > 0 
                        ? Math.round((campaignAnalytics.deliveredCount / campaignAnalytics.sentCount) * 100) 
                        : 0}%
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">Read Rate</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {campaignAnalytics.deliveredCount > 0 
                        ? Math.round((campaignAnalytics.readCount / campaignAnalytics.deliveredCount) * 100) 
                        : 0}%
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-3">
                  <h4 className="font-medium">Campaign Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Campaign ID:</span>
                      <span className="ml-2 font-mono">{campaignAnalytics.campaignId}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Start Time:</span>
                      <span className="ml-2">{new Date(campaignAnalytics.startTime).toLocaleString()}</span>
                    </div>
                    {campaignAnalytics.endTime && (
                      <div>
                        <span className="text-gray-600">End Time:</span>
                        <span className="ml-2">{new Date(campaignAnalytics.endTime).toLocaleString()}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Total Contacts:</span>
                      <span className="ml-2">{campaignAnalytics.totalContacts}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duplicates:</span>
                      <span className="ml-2">{campaignAnalytics.duplicateCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Estimated Cost:</span>
                      <span className="ml-2">${campaignAnalytics.estimatedCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Export Options */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-600">Export campaign data</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const analyticsData = {
                          campaign: campaignAnalytics,
                          contacts: contacts.map(c => ({
                            phone: c.phone,
                            name: c.name,
                            status: c.status,
                            messageId: c.messageId,
                            sentAt: c.sentAt,
                            deliveredAt: c.deliveredAt,
                            readAt: c.readAt,
                            retryCount: c.retryCount,
                            errorMessage: c.errorMessage
                          }))
                        };
                        const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `campaign-${campaignAnalytics.campaignId}-analytics.json`;
                        a.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      JSON
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," + 
                          "CampaignId,Phone,Name,Status,MessageId,SentAt,DeliveredAt,ReadAt,RetryCount,ErrorMessage\n" +
                          contacts.map(c => `${campaignAnalytics.campaignId},${c.phone},${c.name || ''},${c.status},${c.messageId || ''},${c.sentAt || ''},${c.deliveredAt || ''},${c.readAt || ''},${c.retryCount || 0},${(c.errorMessage || '').replace(/,/g, ';')}`).join('\n');
                        const link = document.createElement('a');
                        link.setAttribute('href', encodeURI(csvContent));
                        link.setAttribute('download', `campaign-${campaignAnalytics.campaignId}-full-report.csv`);
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Enhanced Info Alert */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-medium mb-2">🚀 Enhanced WhatsApp Campaign Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium">✅ Core Features:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Template personalization with {'{{'}{'{'}variables{'}'}{'}'}</li>
                      <li>Duplicate contact detection & handling</li>
                      <li>Phone number validation with 400 errors</li>
                      <li>Template approval status validation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">⚡ Advanced Features:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Campaign scheduling for future delivery</li>
                      <li>Exponential backoff rate limiting</li>
                      <li>Automatic retry with smart delays</li>
                      <li>Real-time analytics & progress tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm text-green-700">
                <p className="font-medium mb-2">📊 Analytics & Tracking:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Webhook system for delivery reports</li>
                      <li>Conversation tracking for replies</li>
                      <li>CTR calculation for link campaigns</li>
                      <li>Export functionality with database logs</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Real-time status updates (sent → delivered → read)</li>
                      <li>Success rate & performance metrics</li>
                      <li>Campaign cost estimation</li>
                      <li>CSV/JSON export with full details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-gray-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-1">🔧 Technical Configuration</p>
                <div className="space-y-1">
                  <p><strong>Phone Number ID:</strong> 253011594562692</p>
                  <p><strong>Webhook Endpoint:</strong> /api/whatsapp/webhook</p>
                  <p><strong>Rate Limiting:</strong> Adaptive (1-60 seconds with exponential backoff)</p>
                  <p><strong>Max Retries:</strong> 3 attempts per contact</p>
                  <p><strong>Supported Formats:</strong> CSV, Excel (xlsx/xls)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              {/* Campaign List Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">WhatsApp Campaign Analytics</h2>
                  <p className="text-gray-600">View and analyze your sent WhatsApp campaigns</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => loadWhatsAppAnalytics(whatsappSearchTerm, whatsappStatusFilter)}
                    disabled={isWhatsappLoading}
                  >
                    {isWhatsappLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Refresh
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowTestingPanel(!showTestingPanel)}
                    className="border-orange-500 text-orange-600 hover:bg-orange-50"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Test Status Updates
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowWebhookConfig(!showWebhookConfig);
                      if (!showWebhookConfig && !webhookDebugInfo) {
                        loadWebhookDebugInfo();
                      }
                    }}
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Webhook Config
                  </Button>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Auto-refresh: 30s
                  </div>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search campaigns by name, template, or ID..."
                          value={whatsappSearchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <select
                        value={whatsappStatusFilter}
                        onChange={(e) => handleStatusFilterChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="running">Running</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testing Panel */}
              {showTestingPanel && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <Settings className="w-5 h-5" />
                      Status Update Testing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-900 mb-2">Why use this testing panel?</h4>
                        <p className="text-sm text-orange-700 mb-3">
                          WhatsApp webhook delivery reports may not arrive immediately or may not be configured properly. 
                          Use this panel to simulate delivery status changes and test the real-time analytics updates.
                        </p>
                        
                        {selectedWhatsAppCampaign && selectedWhatsAppCampaign.contacts.length > 0 && (
                          <div className="space-y-3">
                            <h5 className="font-medium text-orange-900">
                              Test contacts from: {selectedWhatsAppCampaign.name}
                            </h5>
                            <div className="grid gap-2">
                              {selectedWhatsAppCampaign.contacts.slice(0, 5).map((contact, index) => (
                                <div key={`${contact.phone}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                                  <div className="flex-1">
                                    <div className="font-mono text-sm">{contact.phone}</div>
                                    <div className="text-xs text-gray-600">
                                      {contact.name || 'No name'} • Current: {contact.status}
                                      {contact.messageId && <span> • ID: {contact.messageId.slice(-8)}</span>}
                                    </div>
                                  </div>
                                  <div className="flex gap-1">
                                    {contact.messageId && contact.status === 'sent' && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => simulateDeliveryStatus(contact.messageId!, contact.phone, 'delivered')}
                                        disabled={isSimulatingStatus}
                                      >
                                        → Delivered
                                      </Button>
                                    )}
                                    {contact.messageId && contact.status === 'delivered' && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => simulateDeliveryStatus(contact.messageId!, contact.phone, 'read')}
                                        disabled={isSimulatingStatus}
                                      >
                                        → Read
                                      </Button>
                                    )}
                                    {contact.messageId && contact.status === 'sent' && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                        onClick={() => simulateDeliveryStatus(contact.messageId!, contact.phone, 'read')}
                                        disabled={isSimulatingStatus}
                                      >
                                        → Read
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {isSimulatingStatus && (
                              <div className="flex items-center gap-2 text-orange-600">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Simulating status update...
                              </div>
                            )}
                          </div>
                        )}
                        
                        {!selectedWhatsAppCampaign && (
                          <div className="text-center py-4 text-orange-600">
                            Select a campaign from the list below to test status updates
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Webhook Configuration Panel */}
              {showWebhookConfig && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Activity className="w-5 h-5" />
                      WhatsApp Webhook Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingWebhookInfo ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                        <span className="ml-2 text-blue-600">Loading webhook information...</span>
                      </div>
                    ) : webhookDebugInfo ? (
                      <div className="space-y-6">
                        {/* Status Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-2">Overall Status</h4>
                            <div className={`text-lg font-bold ${
                              webhookDebugInfo.status?.overall === 'Active' ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {webhookDebugInfo.status?.overall || 'Unknown'}
                            </div>
                            <div className="text-sm text-gray-600">
                              Health: {webhookDebugInfo.status?.health || 'Unknown'}
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-2">Statistics</h4>
                            <div className="text-sm space-y-1">
                              <div>Received: {webhookDebugInfo.statistics?.totalReceived || 0}</div>
                              <div>Processed: {webhookDebugInfo.statistics?.totalProcessed || 0}</div>
                              <div>Success Rate: {webhookDebugInfo.statistics?.successRate || 0}%</div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-blue-200">
                            <h4 className="font-medium text-blue-900 mb-2">Last Activity</h4>
                            <div className="text-sm">
                              {webhookDebugInfo.status?.lastActivity === 'Never' ? (
                                <span className="text-orange-600">No webhooks received yet</span>
                              ) : (
                                <span className="text-green-600">
                                  {new Date(webhookDebugInfo.status?.lastActivity).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Configuration Details */}
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-3">Configuration Status</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Verify Token:</span>
                              <span className="ml-2">{webhookDebugInfo.webhookConfig?.verifyToken}</span>
                            </div>
                            <div>
                              <span className="font-medium">App Secret:</span>
                              <span className="ml-2">{webhookDebugInfo.webhookConfig?.appSecret}</span>
                            </div>
                            <div>
                              <span className="font-medium">Access Token:</span>
                              <span className="ml-2">{webhookDebugInfo.webhookConfig?.accessToken}</span>
                            </div>
                            <div>
                              <span className="font-medium">Phone Number ID:</span>
                              <span className="ml-2 font-mono text-xs">{webhookDebugInfo.webhookConfig?.phoneNumberId}</span>
                            </div>
                          </div>
                        </div>

                        {/* Setup Instructions */}
                        <div className="bg-white p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-3">Setup Instructions</h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-blue-700 mb-3">
                              📖 <strong>Complete setup guide:</strong> See <code>WHATSAPP_WEBHOOK_SETUP.md</code> in your project root
                            </p>
                            
                            <div className="bg-gray-50 p-3 rounded border">
                              <p className="font-medium text-gray-900 mb-2">Quick Setup:</p>
                              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                                <li>Go to Meta Developer Console → WhatsApp → Configuration</li>
                                <li>Set webhook URL: <code className="bg-gray-200 px-1 rounded">https://your-domain.com/api/whatsapp/webhook</code></li>
                                <li>Set verify token in environment variables</li>
                                <li>Subscribe to "messages" webhook field</li>
                                <li>Test with a campaign to see delivery reports</li>
                              </ol>
                            </div>
                            
                            {webhookDebugInfo.status?.overall !== 'Active' && (
                              <div className="bg-orange-50 border border-orange-200 p-3 rounded mt-3">
                                <p className="text-orange-800 font-medium">⚠️ Webhook Not Active</p>
                                <p className="text-orange-700 text-sm mt-1">
                                  Use the "Test Status Updates" panel above to simulate delivery reports while setting up webhooks.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Refresh Button */}
                        <div className="flex justify-center">
                          <Button
                            variant="outline"
                            onClick={loadWebhookDebugInfo}
                            disabled={isLoadingWebhookInfo}
                            className="border-blue-500 text-blue-600"
                          >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingWebhookInfo ? 'animate-spin' : ''}`} />
                            Refresh Status
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-blue-600">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>Failed to load webhook configuration</p>
                        <Button
                          variant="outline"
                          onClick={loadWebhookDebugInfo}
                          className="mt-2"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Campaign List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Campaign List ({filteredWhatsAppCampaigns.length} campaigns)</span>
                    {campaignsPagination.total > 0 && (
                      <span className="text-sm font-normal text-gray-600">
                        Total: {campaignsPagination.total} campaigns
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isWhatsappLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                      <span className="ml-2 text-gray-600">Loading campaigns...</span>
                    </div>
                  ) : filteredWhatsAppCampaigns.length > 0 ? (
                    <div className="space-y-4">
                      {filteredWhatsAppCampaigns.map((campaign) => (
                        <Card 
                          key={campaign.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedWhatsAppCampaign?.id === campaign.id 
                              ? 'ring-2 ring-blue-500 border-blue-200' 
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedWhatsAppCampaign(campaign)}
                        >
                          <CardContent className="pt-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                                  <Badge variant={getStatusBadgeVariant(campaign.status)}>
                                    {campaign.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                                  <div>
                                    <span className="font-medium">Template:</span>
                                    <p>{campaign.templateName}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Created:</span>
                                    <p>{new Date(campaign.createdAt).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Contacts:</span>
                                    <p>{campaign.totalContacts}</p>
                                  </div>
                                  <div>
                                    <span className="font-medium">Cost:</span>
                                    <p>${campaign.estimatedCost.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                  <div className="bg-green-100 p-2 rounded">
                                    <div className="font-bold text-green-800">{campaign.sentCount}</div>
                                    <div className="text-green-600">Sent</div>
                                  </div>
                                  <div className="bg-blue-100 p-2 rounded">
                                    <div className="font-bold text-blue-800">{campaign.deliveredCount}</div>
                                    <div className="text-blue-600">Delivered</div>
                                  </div>
                                  <div className="bg-purple-100 p-2 rounded">
                                    <div className="font-bold text-purple-800">{campaign.readCount}</div>
                                    <div className="text-purple-600">Read</div>
                                  </div>
                                  <div className="bg-red-100 p-2 rounded">
                                    <div className="font-bold text-red-800">{campaign.failedCount}</div>
                                    <div className="text-red-600">Failed</div>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  CTR: {campaign.ctr.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No campaigns found</p>
                      <p className="text-sm">Start by creating your first WhatsApp campaign</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Campaign Details */}
              {selectedWhatsAppCampaign && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Campaign Details: {selectedWhatsAppCampaign.name}</span>
                      <Badge variant={getStatusBadgeVariant(selectedWhatsAppCampaign.status)}>
                        {selectedWhatsAppCampaign.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Performance Overview */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-3xl font-bold text-green-600">{selectedWhatsAppCampaign.sentCount}</div>
                          <div className="text-sm text-green-700">Messages Sent</div>
                          <div className="text-xs text-green-600">
                            {selectedWhatsAppCampaign.totalContacts > 0 
                              ? Math.round((selectedWhatsAppCampaign.sentCount / selectedWhatsAppCampaign.totalContacts) * 100)
                              : 0}% of total
                          </div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-3xl font-bold text-blue-600">{selectedWhatsAppCampaign.deliveredCount}</div>
                          <div className="text-sm text-blue-700">Delivered</div>
                          <div className="text-xs text-blue-600">
                            {selectedWhatsAppCampaign.sentCount > 0 
                              ? Math.round((selectedWhatsAppCampaign.deliveredCount / selectedWhatsAppCampaign.sentCount) * 100)
                              : 0}% delivery rate
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-3xl font-bold text-purple-600">{selectedWhatsAppCampaign.readCount}</div>
                          <div className="text-sm text-purple-700">Read</div>
                          <div className="text-xs text-purple-600">
                            {selectedWhatsAppCampaign.deliveredCount > 0 
                              ? Math.round((selectedWhatsAppCampaign.readCount / selectedWhatsAppCampaign.deliveredCount) * 100)
                              : 0}% read rate
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="text-3xl font-bold text-orange-600">{selectedWhatsAppCampaign.clickCount}</div>
                          <div className="text-sm text-orange-700">Clicks</div>
                          <div className="text-xs text-orange-600">
                            {selectedWhatsAppCampaign.ctr.toFixed(1)}% CTR
                          </div>
                        </div>
                      </div>

                      {/* Campaign Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Campaign Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Campaign ID:</span>
                              <span className="font-mono text-gray-900">{selectedWhatsAppCampaign.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Template:</span>
                              <span className="text-gray-900">{selectedWhatsAppCampaign.templateName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Contacts:</span>
                              <span className="text-gray-900">{selectedWhatsAppCampaign.totalContacts}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duplicates:</span>
                              <span className="text-gray-900">{selectedWhatsAppCampaign.duplicateCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Estimated Cost:</span>
                              <span className="text-gray-900">${selectedWhatsAppCampaign.estimatedCost.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Timeline</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created:</span>
                              <span className="text-gray-900">{new Date(selectedWhatsAppCampaign.createdAt).toLocaleString()}</span>
                            </div>
                            {selectedWhatsAppCampaign.startedAt && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Started:</span>
                                <span className="text-gray-900">{new Date(selectedWhatsAppCampaign.startedAt).toLocaleString()}</span>
                              </div>
                            )}
                            {selectedWhatsAppCampaign.completedAt && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Completed:</span>
                                <span className="text-gray-900">{new Date(selectedWhatsAppCampaign.completedAt).toLocaleString()}</span>
                              </div>
                            )}
                            {selectedWhatsAppCampaign.startedAt && selectedWhatsAppCampaign.completedAt && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="text-gray-900">
                                  {Math.round((new Date(selectedWhatsAppCampaign.completedAt).getTime() - 
                                    new Date(selectedWhatsAppCampaign.startedAt).getTime()) / 60000)} minutes
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      {selectedWhatsAppCampaign.contacts.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">Contact Details</h4>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const csvContent = "data:text/csv;charset=utf-8," + 
                                  "CampaignId,Phone,Name,Status,MessageId,SentAt,DeliveredAt,ReadAt,ErrorMessage\n" +
                                  selectedWhatsAppCampaign.contacts.map(c => 
                                    `${selectedWhatsAppCampaign.id},${c.phone},${c.name || ''},${c.status},${c.messageId || ''},${c.sentAt || ''},${c.deliveredAt || ''},${c.readAt || ''},${(c.errorMessage || '').replace(/,/g, ';')}`
                                  ).join('\n');
                                const link = document.createElement('a');
                                link.setAttribute('href', encodeURI(csvContent));
                                link.setAttribute('download', `campaign-${selectedWhatsAppCampaign.id}-contacts.csv`);
                                link.click();
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Export Contacts
                            </Button>
                          </div>
                          
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Message ID</TableHead>
                                  <TableHead>Timeline</TableHead>
                                  <TableHead>Error</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {selectedWhatsAppCampaign.contacts.slice(0, 50).map((contact, index) => (
                                  <TableRow key={`${contact.phone}-${index}`}>
                                    <TableCell className="font-mono">{contact.phone}</TableCell>
                                    <TableCell>{contact.name || '-'}</TableCell>
                                    <TableCell>
                                      <Badge variant={getContactStatusBadgeVariant(contact.status)}>
                                        {contact.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                      {contact.messageId ? contact.messageId.slice(-8) : '-'}
                                    </TableCell>
                                    <TableCell className="text-xs">
                                      {contact.sentAt && (
                                        <div className="text-blue-600">
                                          Sent: {new Date(contact.sentAt).toLocaleTimeString()}
                                        </div>
                                      )}
                                      {contact.deliveredAt && (
                                        <div className="text-green-600">
                                          Delivered: {new Date(contact.deliveredAt).toLocaleTimeString()}
                                        </div>
                                      )}
                                      {contact.readAt && (
                                        <div className="text-purple-600">
                                          Read: {new Date(contact.readAt).toLocaleTimeString()}
                                        </div>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-xs text-red-600">
                                      {contact.errorMessage || '-'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          {selectedWhatsAppCampaign.contacts.length > 50 && (
                            <p className="text-sm text-gray-500 text-center">
                              Showing first 50 contacts. Total: {selectedWhatsAppCampaign.contacts.length}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-center gap-2 pt-4 border-t">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            const analyticsData = {
                              campaign: selectedWhatsAppCampaign,
                              generatedAt: new Date().toISOString()
                            };
                            const blob = new Blob([JSON.stringify(analyticsData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `campaign-${selectedWhatsAppCampaign.id}-analytics.json`;
                            a.click();
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export Analytics
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedWhatsAppCampaign(null)}
                        >
                          Close Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StaticExportLayout>
  );
}