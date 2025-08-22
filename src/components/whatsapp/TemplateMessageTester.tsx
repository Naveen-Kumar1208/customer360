'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Send, Check, X, RefreshCw } from 'lucide-react';

interface WhatsAppTemplate {
  name: string;
  status: string;
  category: string;
  language: string;
  components?: any[];
}

interface ParameterInfo {
  header: number;
  body: number;
  total: number;
}

export default function TemplateMessageTester() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [phone, setPhone] = useState('919940804585');
  const [parameters, setParameters] = useState<string[]>(['']);
  const [parameterInfo, setParameterInfo] = useState<ParameterInfo | null>(null);
  const [templateDetails, setTemplateDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  // Validate template when selection changes
  useEffect(() => {
    if (selectedTemplate) {
      validateTemplate();
    }
  }, [selectedTemplate]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/whatsapp/templates?limit=50');
      const data = await response.json();
      
      if (data.success && data.templates) {
        setTemplates(data.templates.filter((t: any) => t.status === 'APPROVED'));
      }
    } catch (err) {
      setError('Failed to load templates');
    }
    setLoading(false);
  };

  const validateTemplate = async () => {
    if (!selectedTemplate) return;
    
    setValidating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/whatsapp/validate-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          templateName: selectedTemplate,
          parameters: parameters.filter(p => p.trim() !== '')
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setParameterInfo(data.parameterInfo.required);
        setTemplateDetails(data.template);
        
        // Adjust parameters array to match required count
        const required = data.parameterInfo.required.total;
        const newParams = Array(required).fill('').map((_, i) => 
          parameters[i] || `Parameter ${i + 1}`
        );
        setParameters(newParams);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to validate template');
    }
    
    setValidating(false);
  };

  const updateParameter = (index: number, value: string) => {
    const newParams = [...parameters];
    newParams[index] = value;
    setParameters(newParams);
  };

  const testMessage = async () => {
    if (!selectedTemplate || !phone) {
      setError('Template and phone number are required');
      return;
    }
    
    setSending(true);
    setError(null);
    setResult(null);
    
    try {
      // First build the message payload
      const buildResponse = await fetch('/api/whatsapp/build-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          templateName: selectedTemplate,
          parameters: parameters.filter(p => p.trim() !== '')
        })
      });
      
      const buildData = await buildResponse.json();
      
      if (!buildData.success) {
        setError(buildData.error);
        return;
      }
      
      console.log('📤 Sending message with payload:', buildData.payload);
      
      // Send the message
      const sendResponse = await fetch('/api/whatsapp/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData.payload)
      });
      
      const sendData = await sendResponse.json();
      setResult(sendData);
      
      if (!sendData.success) {
        setError(sendData.error);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
    
    setSending(false);
  };

  const renderTemplatePreview = () => {
    if (!templateDetails) return null;
    
    const headerComponent = templateDetails.components?.find((c: any) => c.type === 'HEADER');
    const bodyComponent = templateDetails.components?.find((c: any) => c.type === 'BODY');
    const footerComponent = templateDetails.components?.find((c: any) => c.type === 'FOOTER');
    
    let paramIndex = 0;
    
    // Replace parameters in preview
    const replaceParams = (text: string) => {
      if (!text) return '';
      return text.replace(/\{\{(\d+)\}\}/g, (match, num) => {
        const param = parameters[paramIndex] || `[Param ${paramIndex + 1}]`;
        paramIndex++;
        return `**${param}**`;
      });
    };
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Message Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {headerComponent && (
            <div className="bg-blue-50 p-2 rounded text-sm">
              <strong>Header:</strong> {replaceParams(headerComponent.text)}
            </div>
          )}
          {bodyComponent && (
            <div className="bg-gray-50 p-2 rounded text-sm">
              <strong>Body:</strong> {replaceParams(bodyComponent.text)}
            </div>
          )}
          {footerComponent && (
            <div className="bg-gray-100 p-2 rounded text-sm text-gray-600">
              <strong>Footer:</strong> {footerComponent.text}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Template Message Tester</CardTitle>
          <p className="text-sm text-gray-600">
            Test sending WhatsApp template messages with proper parameter handling
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template">Select Template</Label>
            <div className="flex gap-2">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.name} value={template.name}>
                      {template.name} ({template.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={loadTemplates} variant="outline" size="sm">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="919940804585"
            />
          </div>

          {/* Template Info */}
          {templateDetails && parameterInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Template Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Name:</span>
                    <span className="font-mono">{templateDetails.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge className="text-xs">{templateDetails.status}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Language:</span>
                    <span>{templateDetails.language}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Parameters:</span>
                    <span>{parameterInfo.total} required</span>
                  </div>
                </CardContent>
              </Card>

              {renderTemplatePreview()}
            </div>
          )}

          {/* Parameters Input */}
          {parameterInfo && parameterInfo.total > 0 && (
            <div className="space-y-2">
              <Label>Template Parameters ({parameterInfo.total} required)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {parameters.map((param, index) => (
                  <Input
                    key={index}
                    value={param}
                    onChange={(e) => updateParameter(index, e.target.value)}
                    placeholder={`Parameter ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={testMessage}
              disabled={!selectedTemplate || !phone || sending || validating}
            >
              {sending ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send Message
            </Button>
            
            <Button
              onClick={validateTemplate}
              variant="outline"
              disabled={!selectedTemplate || validating}
            >
              {validating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Validate Template
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-800 rounded">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  {result.success ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  Send Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={JSON.stringify(result, null, 2)}
                  readOnly
                  className="font-mono text-xs"
                  rows={8}
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}