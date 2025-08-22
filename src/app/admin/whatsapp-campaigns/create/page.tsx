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
  RefreshCw
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

interface Contact {
  phone: string;
  name?: string;
  email?: string;
  company?: string;
  status: 'pending' | 'sent' | 'failed';
  errorMessage?: string;
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
  
  // File upload handler (client-side processing)
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
        
        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          if (values[phoneIndex]) {
            const phone = values[phoneIndex].replace(/\D/g, '');
            if (phone.length >= 10) {
              processedContacts.push({
                phone: phone.length === 10 ? '91' + phone : phone,
                name: nameIndex !== -1 ? values[nameIndex] : undefined,
                email: emailIndex !== -1 ? values[emailIndex] : undefined,
                company: companyIndex !== -1 ? values[companyIndex] : undefined,
                status: 'pending'
              });
            }
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

  // Send messages to all contacts (with actual WhatsApp API integration)
  const sendMessages = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first');
      return;
    }
    
    if (contacts.length === 0) {
      alert('Please upload contacts first');
      return;
    }

    setIsSending(true);
    setSendProgress(0);
    
    const updatedContacts = [...contacts];
    console.log('Starting WhatsApp campaign with:', {
      template: selectedTemplate,
      contactCount: contacts.length,
      sampleContact: contacts[0]
    });
    
    for (let i = 0; i < contacts.length; i++) {
      try {
        const contact = contacts[i];
        
        // Build WhatsApp message payload
        const messagePayload = buildWhatsAppMessage(selectedTemplate, contact);
        console.log(`Sending message ${i + 1}/${contacts.length} to ${contact.phone}:`, messagePayload);
        
        if (testMode) {
          // Test mode - simulate API responses
          await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
          const shouldSucceed = Math.random() > 0.2; // 80% success rate in test mode
          
          if (shouldSucceed) {
            updatedContacts[i].status = 'sent';
            console.log(`✅ [TEST MODE] Message simulated as sent to ${contact.phone}`);
          } else {
            updatedContacts[i].status = 'failed';
            updatedContacts[i].errorMessage = 'Test mode failure simulation';
            console.log(`❌ [TEST MODE] Message simulated as failed to ${contact.phone}`);
          }
        } else {
          // Real API calls via backend proxy
          try {
            const response = await fetch('/api/whatsapp/send-message', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messagePayload,
                phone: contact.phone
              }),
            });

            if (response.ok) {
              const result = await response.json();
              updatedContacts[i].status = 'sent';
              console.log(`✅ Message sent to ${contact.phone}:`, result);
            } else {
              let error;
              try {
                error = await response.json();
              } catch {
                error = { message: `HTTP ${response.status}: ${response.statusText}` };
              }
              updatedContacts[i].status = 'failed';
              updatedContacts[i].errorMessage = error.error || error.message || `HTTP ${response.status}`;
              console.error(`❌ Failed to send to ${contact.phone}:`, error);
            }
          } catch (networkError) {
            updatedContacts[i].status = 'failed';
            updatedContacts[i].errorMessage = 'Network error connecting to backend API';
            console.error(`❌ Network error for ${contact.phone}:`, networkError);
          }
        }
      } catch (error) {
        updatedContacts[i].status = 'failed';
        updatedContacts[i].errorMessage = error instanceof Error ? error.message : 'Network error';
        console.error(`❌ Network error sending to ${contacts[i].phone}:`, error);
      }
      
      setSendProgress(((i + 1) / contacts.length) * 100);
      setContacts([...updatedContacts]);
      
      // Rate limiting - wait between requests (WhatsApp has rate limits)
      if (i < contacts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second between messages
      }
    }
    
    const sentCount = updatedContacts.filter(c => c.status === 'sent').length;
    const failedCount = updatedContacts.filter(c => c.status === 'failed').length;
    
    console.log(`Campaign completed: ${sentCount} sent, ${failedCount} failed`);
    setIsSending(false);
    setShowResults(true);
  };
  
  // Build WhatsApp message payload based on template
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
            language: { code: languageCode }
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

  // Load templates on component mount
  React.useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
  const sentCount = contacts.filter(c => c.status === 'sent').length;
  const failedCount = contacts.filter(c => c.status === 'failed').length;

  return (
    <StaticExportLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold">Admin WhatsApp Campaign</h1>
          </div>
        </div>

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
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ready to send to {contacts.length} contacts</p>
                  <p className="text-sm text-gray-600">
                    Each message will be sent individually with proper rate limiting
                  </p>
                </div>
                <div className="flex gap-2">
                  {contacts.length > 0 && (
                    <Button 
                      onClick={() => {
                        const firstContact = contacts[0];
                        setContacts([firstContact]);
                        sendMessages();
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
                    disabled={!selectedTemplate || contacts.length === 0 || isSending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        {testMode ? 'Simulating...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {testMode ? 'Simulate Send All' : 'Send Messages'}
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
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{sentCount}</p>
                    <p className="text-sm text-green-700">Sent Successfully</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                    <p className="text-sm text-red-700">Failed</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-2xl font-bold text-gray-600">{contacts.length}</p>
                    <p className="text-sm text-gray-700">Total Contacts</p>
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
                  Showing {contacts.length} contacts
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const csvContent = "data:text/csv;charset=utf-8," + 
                      "Phone,Name,Email,Company,Status\n" +
                      contacts.map(c => `${c.phone},${c.name || ''},${c.email || ''},${c.company || ''},${c.status}`).join('\n');
                    const link = document.createElement('a');
                    link.setAttribute('href', encodeURI(csvContent));
                    link.setAttribute('download', 'contacts.csv');
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
                              contact.status === 'failed' ? 'destructive' : 
                              'secondary'
                            }
                          >
                            {contact.status}
                          </Badge>
                          {contact.errorMessage && (
                            <p className="text-xs text-red-600 mt-1">{contact.errorMessage}</p>
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

        {/* Info Alert */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-1">WhatsApp API Configuration</p>
              <p>Phone Number ID: 253011594562692</p>
              <p>Messages are sent using approved templates only</p>
              <p>Rate limiting is automatically applied to prevent blocking</p>
            </div>
          </div>
        </div>
      </div>
    </StaticExportLayout>
  );
}