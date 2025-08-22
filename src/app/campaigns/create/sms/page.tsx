"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  Calendar, 
  Send, 
  Eye, 
  CheckCircle,
  AlertCircle,
  Plus,
  Settings,
  Shield,
  Clock,
  BarChart3,
  FileText,
  Smartphone,
  MapPin,
  Globe,
  DollarSign,
  Link as LinkIcon,
  Phone,
  Zap
} from 'lucide-react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SMSTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  length: number;
  variables: string[];
}

interface Campaign {
  name: string;
  provider: string;
  objective: string;
  audience: string;
  template: string;
  schedule: {
    type: 'immediate' | 'scheduled';
    date?: string;
    time?: string;
  };
  budget: {
    type: 'per_message' | 'daily' | 'total';
    amount: number;
  };
  settings: {
    deliveryReports: boolean;
    optOutHandling: boolean;
    duplicateFiltering: boolean;
    rateLimiting: boolean;
  };
}

const STEP_NAMES = [
  'Campaign Type',
  'SMS Provider Setup',
  'Campaign Objective', 
  'Message Template',
  'Audience Targeting',
  'Budget & Pricing',
  'Schedule & Settings',
  'Review & Launch'
];

export default function CreateSMSCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignType, setCampaignType] = useState<'inbound' | 'outbound'>('outbound');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [campaign, setCampaign] = useState<Campaign>({
    name: '',
    provider: '',
    objective: '',
    audience: '',
    template: '',
    schedule: { type: 'immediate' },
    budget: { type: 'per_message', amount: 0.08 },
    settings: {
      deliveryReports: true,
      optOutHandling: true,
      duplicateFiltering: true,
      rateLimiting: true
    }
  });

  // Mock data for SMS templates
  const smsTemplates: SMSTemplate[] = [
    {
      id: 'promo1',
      name: 'Limited Time Offer',
      type: 'Promotional',
      content: 'Hi {{name}}! Exclusive 25% off on your favorite products. Valid until {{date}}. Shop now: {{link}} Reply STOP to opt out.',
      length: 142,
      variables: ['name', 'date', 'link']
    },
    {
      id: 'reminder1',
      name: 'Payment Reminder',
      type: 'Transactional',
      content: 'Hello {{name}}, your payment of ${{amount}} is due on {{date}}. Pay now: {{link}} Questions? Call {{phone}}',
      length: 128,
      variables: ['name', 'amount', 'date', 'link', 'phone']
    },
    {
      id: 'welcome1',
      name: 'Welcome Message',
      type: 'Informational',
      content: 'Welcome to {{company}}, {{name}}! Your account is ready. Get started: {{link}} Need help? Reply HELP',
      length: 108,
      variables: ['company', 'name', 'link']
    },
    {
      id: 'otp1',
      name: 'OTP Verification',
      type: 'Transactional',
      content: 'Your verification code is {{code}}. Valid for 10 minutes. Do not share this code with anyone.',
      length: 95,
      variables: ['code']
    }
  ];

  const nextStep = () => {
    if (currentStep < STEP_NAMES.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Campaign created:', campaign);
    router.push('/engagement');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Campaign Type Selection</span>
              </CardTitle>
              <CardDescription>
                Choose between inbound and outbound SMS campaign strategies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Campaign Type</Label>
                <RadioGroup 
                  value={campaignType} 
                  onValueChange={(value: 'inbound' | 'outbound') => setCampaignType(value)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outbound" id="outbound" />
                      <Label htmlFor="outbound" className="cursor-pointer">Outbound Campaign</Label>
                    </div>
                    <Card className={`p-4 cursor-pointer transition-all ${
                      campaignType === 'outbound' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`} onClick={() => setCampaignType('outbound')}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium">Outbound SMS Marketing</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Broadcast SMS campaigns to your subscriber list or targeted customer segments
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>• Promotional text campaigns</div>
                          <div>• Mass announcements</div>
                          <div>• Event notifications</div>
                          <div>• Scheduled bulk messaging</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inbound" id="inbound" />
                      <Label htmlFor="inbound" className="cursor-pointer">Inbound Campaign</Label>
                    </div>
                    <Card className={`p-4 cursor-pointer transition-all ${
                      campaignType === 'inbound' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`} onClick={() => setCampaignType('inbound')}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium">Inbound SMS Marketing</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Automated SMS responses and flows triggered by customer actions or keywords
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>• Keyword auto-responses</div>
                          <div>• Two-way SMS conversations</div>
                          <div>• Behavioral trigger messages</div>
                          <div>• SMS chatbot workflows</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Campaign Type Features */}
              <div className="mt-8">
                <h4 className="font-medium mb-4">Feature Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-medium text-blue-600">Outbound Features</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Bulk SMS broadcasting</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Scheduled messaging</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Geo-targeting</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Contact list management</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-medium text-green-600">Inbound Features</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Keyword triggers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Auto-responses</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Conversation flows</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Smart routing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5" />
                <span>SMS Provider Setup</span>
              </CardTitle>
              <CardDescription>
                Configure your SMS provider and verify account credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="provider">Select SMS Provider</Label>
                <Select onValueChange={(value) => setCampaign(prev => ({ ...prev, provider: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your SMS provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Twilio</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="messagebird">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>MessageBird</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="plivo">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Plivo</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="nexmo">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Vonage (Nexmo)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {campaign.provider && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Provider Configuration</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input 
                        id="apiKey" 
                        type="password" 
                        placeholder="Enter your API key"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apiSecret">API Secret</Label>
                      <Input 
                        id="apiSecret" 
                        type="password" 
                        placeholder="Enter your API secret"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="senderId">Sender ID / Phone Number</Label>
                      <Input 
                        id="senderId" 
                        placeholder="+1234567890 or BRAND_NAME"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded border">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">Connection verified successfully</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Compliance Requirements</h4>
                </div>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Ensure sender ID is registered and approved</li>
                  <li>• Verify opt-in consent for all recipients</li>
                  <li>• Include opt-out instructions in promotional messages</li>
                  <li>• Comply with local SMS regulations (TCPA, GDPR, etc.)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Campaign Objective</span>
              </CardTitle>
              <CardDescription>
                Choose the primary goal for your SMS campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name"
                  value={campaign.name}
                  onChange={(e) => setCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-4">
                <Label>Campaign Objective</Label>
                <RadioGroup 
                  value={campaign.objective} 
                  onValueChange={(value) => setCampaign(prev => ({ ...prev, objective: value }))}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="promotional" id="promotional" />
                        <Label htmlFor="promotional" className="font-medium">Promotional</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Drive sales with offers, discounts, and product promotions
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transactional" id="transactional" />
                        <Label htmlFor="transactional" className="font-medium">Transactional</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Send order updates, payment reminders, and confirmations
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="informational" id="informational" />
                        <Label htmlFor="informational" className="font-medium">Informational</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Share updates, announcements, and helpful information
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="verification" id="verification" />
                        <Label htmlFor="verification" className="font-medium">Verification</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Send OTP codes and account verification messages
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {campaign.objective && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Expected Metrics</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-800">Delivery Rate</div>
                      <div className="text-blue-600">95-98%</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Open Rate</div>
                      <div className="text-blue-600">98%</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Click Rate</div>
                      <div className="text-blue-600">
                        {campaign.objective === 'promotional' ? '8-12%' : 
                         campaign.objective === 'transactional' ? '15-25%' : 
                         campaign.objective === 'verification' ? 'N/A' : '5-8%'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Message Template</span>
              </CardTitle>
              <CardDescription>
                Choose or create your SMS message template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="predefined" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="predefined">Predefined Templates</TabsTrigger>
                  <TabsTrigger value="custom">Create Custom</TabsTrigger>
                </TabsList>
                
                <TabsContent value="predefined" className="space-y-4">
                  <div className="grid gap-4">
                    {smsTemplates
                      .filter(template => 
                        !campaign.objective || 
                        template.type.toLowerCase() === campaign.objective ||
                        (campaign.objective === 'verification' && template.type === 'Transactional')
                      )
                      .map((template) => (
                      <div 
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          campaign.template === template.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setCampaign(prev => ({ ...prev, template: template.id }))}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{template.type}</Badge>
                            <Badge variant={template.length <= 160 ? 'default' : 'destructive'}>
                              {template.length}/160
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.content}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>Variables:</span>
                          {template.variables.map(variable => (
                            <code key={variable} className="bg-gray-100 px-1 rounded">
                              {variable}
                            </code>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customMessage">Message Content</Label>
                      <Textarea
                        id="customMessage"
                        placeholder="Enter your SMS message..."
                        className="mt-1 min-h-[120px]"
                        maxLength={320}
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>Use {`{{variable}}`} for personalization</span>
                        <span>0/160 (1 message)</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-medium mb-2">Available Variables</h4>
                      <div className="flex flex-wrap gap-2">
                        {['name', 'company', 'amount', 'date', 'link', 'phone', 'code'].map(variable => (
                          <button
                            key={variable}
                            className="px-2 py-1 bg-white border rounded text-sm hover:bg-blue-50"
                          >
                            {variable}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">SMS Best Practices</h4>
                </div>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Keep messages under 160 characters to avoid splitting</li>
                  <li>• Include clear call-to-action and contact information</li>
                  <li>• Always provide opt-out instructions for promotional messages</li>
                  <li>• Use personalization to increase engagement</li>
                  <li>• Test messages across different devices and carriers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Audience Targeting</span>
              </CardTitle>
              <CardDescription>
                Select your target audience and apply filters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Audience Selection</Label>
                <Select onValueChange={(value) => setCampaign(prev => ({ ...prev, audience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-customers">All Customers (45,230)</SelectItem>
                    <SelectItem value="active-customers">Active Customers (32,150)</SelectItem>
                    <SelectItem value="high-value">High-Value Customers (8,420)</SelectItem>
                    <SelectItem value="inactive">Inactive Customers (12,680)</SelectItem>
                    <SelectItem value="new-customers">New Customers (5,890)</SelectItem>
                    <SelectItem value="upload-data">📤 Upload Data</SelectItem>
                    <SelectItem value="custom">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {campaign.audience === 'custom' && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Custom Segment Filters</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Location</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Customer Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="trial">Trial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Age Range</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All ages" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-45">36-45</SelectItem>
                          <SelectItem value="46-55">46-55</SelectItem>
                          <SelectItem value="56+">56+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Last Purchase</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {campaign.audience === 'upload-data' && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Upload Audience Data</h4>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="space-y-2">
                        <FileText className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Upload CSV or Excel file</p>
                          <p className="text-xs text-gray-500">Drag and drop or click to select</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="font-medium">File Requirements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>CSV or Excel format (.csv, .xlsx)</li>
                        <li>Maximum file size: 10MB</li>
                        <li>Required column: phone</li>
                        <li>Optional columns: first_name, last_name, company, email</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Ensure you have consent to send SMS to all contacts in your upload
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-blue-900">Audience Insights</h4>
                  <Badge className="bg-blue-600">32,150 recipients</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-800">Avg. Open Rate</div>
                    <div className="text-blue-600">98.5%</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Avg. Click Rate</div>
                    <div className="text-blue-600">12.3%</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Opt-out Rate</div>
                    <div className="text-blue-600">0.8%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="exclusions">Exclude Unsubscribed</Label>
                  <Switch id="exclusions" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="duplicates">Remove Duplicates</Label>
                  <Switch id="duplicates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="timezone">Respect Time Zones</Label>
                  <Switch id="timezone" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Budget & Pricing</span>
              </CardTitle>
              <CardDescription>
                Set your budget and configure pricing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Budget Type</Label>
                <RadioGroup 
                  value={campaign.budget.type} 
                  onValueChange={(value) => setCampaign(prev => ({ 
                    ...prev, 
                    budget: { ...prev.budget, type: value as 'per_message' | 'daily' | 'total' }
                  }))}
                >
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="per_message" id="per_message" />
                        <Label htmlFor="per_message" className="font-medium">Per Message</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Pay for each SMS sent
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily" className="font-medium">Daily Budget</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Set maximum daily spending limit
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="total" id="total" />
                        <Label htmlFor="total" className="font-medium">Total Campaign Budget</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Set total budget for entire campaign
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label htmlFor="budgetAmount">
                  {campaign.budget.type === 'per_message' ? 'Cost Per Message' : 
                   campaign.budget.type === 'daily' ? 'Daily Budget' : 'Total Budget'}
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="budgetAmount"
                    type="number"
                    step="0.01"
                    value={campaign.budget.amount}
                    onChange={(e) => setCampaign(prev => ({ 
                      ...prev, 
                      budget: { ...prev.budget, amount: Number.parseFloat(e.target.value) || 0 }
                    }))}
                    className="pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-900">Cost Breakdown</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Messages to send:</span>
                    <span className="font-medium">32,150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per message:</span>
                    <span className="font-medium">${campaign.budget.amount.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provider fees:</span>
                    <span className="font-medium">$0.001/msg</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium text-green-800">
                    <span>Total estimated cost:</span>
                    <span>${(32150 * (campaign.budget.amount + 0.001)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Pricing by Destination</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>United States:</span>
                    <span>$0.0075/msg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Canada:</span>
                    <span>$0.0085/msg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>United Kingdom:</span>
                    <span>$0.0095/msg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>International:</span>
                    <span>$0.012-0.15/msg</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Schedule & Settings</span>
              </CardTitle>
              <CardDescription>
                Configure delivery schedule and campaign settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Delivery Schedule</Label>
                <RadioGroup 
                  value={campaign.schedule.type} 
                  onValueChange={(value) => setCampaign(prev => ({ 
                    ...prev, 
                    schedule: { ...prev.schedule, type: value as 'immediate' | 'scheduled' }
                  }))}
                >
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <Label htmlFor="immediate" className="font-medium">Send Immediately</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Send messages as soon as campaign is launched
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <Label htmlFor="scheduled" className="font-medium">Schedule for Later</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Choose specific date and time for delivery
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {campaign.schedule.type === 'scheduled' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduleDate">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      className="mt-1"
                      onChange={(e) => setCampaign(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule, date: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduleTime">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      className="mt-1"
                      onChange={(e) => setCampaign(prev => ({ 
                        ...prev, 
                        schedule: { ...prev.schedule, time: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">Campaign Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="deliveryReports">Enable Delivery Reports</Label>
                      <p className="text-sm text-gray-600">Track message delivery status</p>
                    </div>
                    <Switch 
                      id="deliveryReports" 
                      checked={campaign.settings.deliveryReports}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, deliveryReports: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="optOutHandling">Auto Opt-out Handling</Label>
                      <p className="text-sm text-gray-600">Automatically process STOP requests</p>
                    </div>
                    <Switch 
                      id="optOutHandling" 
                      checked={campaign.settings.optOutHandling}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, optOutHandling: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="duplicateFiltering">Duplicate Filtering</Label>
                      <p className="text-sm text-gray-600">Remove duplicate phone numbers</p>
                    </div>
                    <Switch 
                      id="duplicateFiltering" 
                      checked={campaign.settings.duplicateFiltering}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, duplicateFiltering: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="rateLimiting">Rate Limiting</Label>
                      <p className="text-sm text-gray-600">Control sending speed to avoid blocking</p>
                    </div>
                    <Switch 
                      id="rateLimiting" 
                      checked={campaign.settings.rateLimiting}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, rateLimiting: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Recommended Send Times</h4>
                </div>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Weekdays: 10:00 AM - 8:00 PM</div>
                  <div>Weekends: 12:00 PM - 6:00 PM</div>
                  <div>Avoid: Early morning (before 8 AM) and late night (after 9 PM)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Review & Launch</span>
              </CardTitle>
              <CardDescription>
                Review your campaign settings before launching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Campaign Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Campaign Name:</span>
                      <div className="font-medium">{campaign.name || 'Untitled Campaign'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">SMS Provider:</span>
                      <div className="font-medium capitalize">{campaign.provider || 'Not selected'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Objective:</span>
                      <div className="font-medium capitalize">{campaign.objective || 'Not selected'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Target Audience:</span>
                      <div className="font-medium">{campaign.audience || 'Not selected'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Schedule:</span>
                      <div className="font-medium">
                        {campaign.schedule.type === 'immediate' ? 'Send Immediately' : 
                         `${campaign.schedule.date} at ${campaign.schedule.time}`}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Estimated Cost:</span>
                      <div className="font-medium">${(32150 * (campaign.budget.amount + 0.001)).toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Message Preview</h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-2">SMS Preview:</div>
                    <div className="font-mono text-sm">
                      {smsTemplates.find(t => t.id === campaign.template)?.content || 
                       'No template selected'}
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <h4 className="font-medium text-green-900">Pre-Launch Checklist</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>SMS provider configured and verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Message template selected and compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Target audience defined</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Budget and pricing configured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Delivery schedule set</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900">Important Notes</h4>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Once launched, campaign settings cannot be modified</li>
                    <li>• Ensure all recipients have opted in to receive SMS</li>
                    <li>• Monitor delivery reports for any issues</li>
                    <li>• You can pause the campaign at any time</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <StaticExportLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Create SMS Campaign</h1>
              <p className="text-muted-foreground">
                Set up your SMS campaign with Twilio, MessageBird, and other providers
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {STEP_NAMES.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStep
                        ? 'bg-green-600 text-white'
                        : index === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < STEP_NAMES.length - 1 && (
                  <div
                    className={`h-0.5 w-8 ${
                      index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="min-w-[120px]"
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            {currentStep < STEP_NAMES.length - 1 ? (
              <Button
                onClick={nextStep}
                className="min-w-[120px]"
                disabled={
                  (currentStep === 0 && !campaignType) ||
                  (currentStep === 1 && !campaign.provider) ||
                  (currentStep === 2 && (!campaign.name || !campaign.objective)) ||
                  (currentStep === 3 && !campaign.template) ||
                  (currentStep === 4 && !campaign.audience)
                }
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Launch Campaign
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </StaticExportLayout>
  );
}