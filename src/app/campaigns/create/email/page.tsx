"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
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
  Image,
  Palette,
  Globe,
  DollarSign,
  Link as LinkIcon,
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

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  preview: string;
  subject: string;
  features: string[];
}

interface Campaign {
  name: string;
  provider: string;
  objective: string;
  audience: string;
  template: string;
  subject: string;
  fromName: string;
  fromEmail: string;
  budget: {
    type: 'per_email' | 'daily' | 'total';
    amount: number;
  };
  schedule: {
    type: 'immediate' | 'scheduled';
    date?: string;
    time?: string;
  };
  settings: {
    trackOpens: boolean;
    trackClicks: boolean;
    autoResponder: boolean;
    unsubscribeLink: boolean;
    spamFilter: boolean;
  };
}

const STEP_NAMES = [
  'Campaign Type',
  'Email Provider Setup',
  'Campaign Objective', 
  'Email Template',
  'Audience Targeting',
  'Content & Design',
  'Budget & Pricing',
  'Schedule & Settings',
  'Review & Launch'
];

export default function CreateEmailCampaignPage() {
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
    subject: '',
    fromName: '',
    fromEmail: '',
    budget: { type: 'per_email', amount: 0.02 },
    schedule: { type: 'immediate' },
    settings: {
      trackOpens: true,
      trackClicks: true,
      autoResponder: false,
      unsubscribeLink: true,
      spamFilter: true
    }
  });

  // Mock data for email templates
  const emailTemplates: EmailTemplate[] = [
    {
      id: 'newsletter1',
      name: 'Modern Newsletter',
      category: 'Newsletter',
      description: 'Clean, professional newsletter template with hero section and multiple content blocks',
      preview: '/api/placeholder/400/300',
      subject: 'Your Weekly Update from {{company}}',
      features: ['Hero Section', 'Multi-column Layout', 'Social Links', 'Mobile Responsive']
    },
    {
      id: 'promo1',
      name: 'Product Promotion',
      category: 'Promotional',
      description: 'High-converting promotional template with product showcase and clear CTA',
      preview: '/api/placeholder/400/300',
      subject: 'Exclusive Offer: Save {{discount}}% on {{product}}',
      features: ['Product Gallery', 'Countdown Timer', 'Testimonials', 'Bold CTA']
    },
    {
      id: 'welcome1',
      name: 'Welcome Series',
      category: 'Welcome',
      description: 'Warm welcome template for new subscribers with onboarding elements',
      preview: '/api/placeholder/400/300',
      subject: 'Welcome to {{company}}, {{firstName}}!',
      features: ['Personal Welcome', 'Getting Started Guide', 'Support Links', 'Brand Introduction']
    },
    {
      id: 'event1',
      name: 'Event Invitation',
      category: 'Event',
      description: 'Professional event invitation with RSVP functionality and event details',
      preview: '/api/placeholder/400/300',
      subject: 'You\'re Invited: {{eventName}} on {{eventDate}}',
      features: ['Event Details', 'RSVP Button', 'Calendar Integration', 'Venue Map']
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
                Choose between inbound and outbound email campaign strategies
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
                          <h4 className="font-medium">Outbound Marketing</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Proactive campaigns sent to your subscriber list, prospects, or targeted segments
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>• Newsletter campaigns</div>
                          <div>• Promotional emails</div>
                          <div>• Product announcements</div>
                          <div>• Scheduled broadcast campaigns</div>
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
                          <Users className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium">Inbound Marketing</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          Triggered responses and automated flows based on user actions and behaviors
                        </p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>• Welcome email sequences</div>
                          <div>• Behavioral triggers</div>
                          <div>• Abandoned cart recovery</div>
                          <div>• Lead nurturing workflows</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Campaign Type Features Comparison */}
              <div className="mt-8">
                <h4 className="font-medium mb-4">Feature Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-medium text-blue-600">Outbound Features</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Mass email broadcasting</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Scheduled sending</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Segment targeting</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>A/B testing</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-medium text-green-600">Inbound Features</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Behavioral triggers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Automated workflows</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Dynamic content</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Lead scoring</span>
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
                <Mail className="h-5 w-5" />
                <span>Email Provider Setup</span>
              </CardTitle>
              <CardDescription>
                Configure your email service provider and verify account credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="provider">Select Email Provider</Label>
                <Select onValueChange={(value) => setCampaign(prev => ({ ...prev, provider: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your email provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mailchimp">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span>Mailchimp</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sendgrid">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>SendGrid</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mailgun">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span>Mailgun</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="amazonses">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span>Amazon SES</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="postmark">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Postmark</span>
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
                      <Label htmlFor="fromEmail">From Email Address</Label>
                      <Input 
                        id="fromEmail" 
                        type="email" 
                        placeholder="noreply@yourcompany.com"
                        className="mt-1"
                        value={campaign.fromEmail}
                        onChange={(e) => setCampaign(prev => ({ ...prev, fromEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input 
                        id="fromName" 
                        placeholder="Your Company Name"
                        className="mt-1"
                        value={campaign.fromName}
                        onChange={(e) => setCampaign(prev => ({ ...prev, fromName: e.target.value }))}
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
                  <h4 className="font-medium text-yellow-900">Email Deliverability Requirements</h4>
                </div>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Verify your domain and set up SPF, DKIM, and DMARC records</li>
                  <li>• Ensure your sending reputation is maintained</li>
                  <li>• Include unsubscribe links in all promotional emails</li>
                  <li>• Comply with CAN-SPAM, GDPR, and other email regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Campaign Objective</span>
              </CardTitle>
              <CardDescription>
                Define the purpose and goals of your email campaign
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
                        <RadioGroupItem value="newsletter" id="newsletter" />
                        <Label htmlFor="newsletter" className="font-medium">Newsletter</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Regular updates, news, and content for subscribers
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="promotional" id="promotional" />
                        <Label htmlFor="promotional" className="font-medium">Promotional</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Drive sales with product promotions and special offers
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="welcome" id="welcome" />
                        <Label htmlFor="welcome" className="font-medium">Welcome Series</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Onboard new subscribers and introduce your brand
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="event" id="event" />
                        <Label htmlFor="event" className="font-medium">Event Marketing</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Promote events, webinars, and special occasions
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {campaign.objective && (
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Expected Performance</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-800">Open Rate</div>
                      <div className="text-blue-600">
                        {campaign.objective === 'newsletter' ? '20-25%' : 
                         campaign.objective === 'promotional' ? '15-20%' : 
                         campaign.objective === 'welcome' ? '50-60%' : '25-30%'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Click Rate</div>
                      <div className="text-blue-600">
                        {campaign.objective === 'newsletter' ? '3-5%' : 
                         campaign.objective === 'promotional' ? '2-4%' : 
                         campaign.objective === 'welcome' ? '8-12%' : '4-6%'}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Conversion Rate</div>
                      <div className="text-blue-600">
                        {campaign.objective === 'newsletter' ? '1-2%' : 
                         campaign.objective === 'promotional' ? '2-5%' : 
                         campaign.objective === 'welcome' ? '5-8%' : '3-6%'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Email Template</span>
              </CardTitle>
              <CardDescription>
                Choose a professional template that matches your campaign objective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                {emailTemplates
                  .filter(template => 
                    !campaign.objective || 
                    template.category.toLowerCase() === campaign.objective ||
                    (campaign.objective === 'promotional' && template.category === 'Product Promotion')
                  )
                  .map((template) => (
                  <div 
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      campaign.template === template.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCampaign(prev => ({ ...prev, template: template.id, subject: template.subject }))}
                  >
                    <div className="flex space-x-4">
                      <div className="w-24 h-18 bg-gray-200 rounded border flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map(feature => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Plus className="h-4 w-4 text-gray-600" />
                  <h4 className="font-medium">Need a Custom Template?</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Our design team can create a custom template that perfectly matches your brand guidelines and campaign requirements.
                </p>
                <Button variant="outline" size="sm">
                  Request Custom Design
                </Button>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Template Features</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Fully responsive design works on all devices</li>
                  <li>• Optimized for high deliverability rates</li>
                  <li>• Built-in personalization and merge tag support</li>
                  <li>• Easy customization with drag-and-drop editor</li>
                  <li>• A/B testing compatible layouts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Audience Targeting</span>
              </CardTitle>
              <CardDescription>
                Define your target audience and apply segmentation filters
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
                    <SelectItem value="all-subscribers">All Subscribers (125,430)</SelectItem>
                    <SelectItem value="active-subscribers">Active Subscribers (89,250)</SelectItem>
                    <SelectItem value="new-subscribers">New Subscribers (12,580)</SelectItem>
                    <SelectItem value="engaged-users">Engaged Users (45,670)</SelectItem>
                    <SelectItem value="inactive-users">Re-engagement List (23,920)</SelectItem>
                    <SelectItem value="vip-customers">VIP Customers (8,430)</SelectItem>
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
                      <Label>Subscription Date</Label>
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
                    <div>
                      <Label>Engagement Level</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="highly-engaged">Highly Engaged</SelectItem>
                          <SelectItem value="moderately-engaged">Moderately Engaged</SelectItem>
                          <SelectItem value="low-engagement">Low Engagement</SelectItem>
                          <SelectItem value="never-opened">Never Opened</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Purchase History</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All customers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent-buyers">Recent Buyers</SelectItem>
                          <SelectItem value="repeat-customers">Repeat Customers</SelectItem>
                          <SelectItem value="high-value">High Value</SelectItem>
                          <SelectItem value="never-purchased">Never Purchased</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                          <SelectItem value="eu">European Union</SelectItem>
                          <SelectItem value="apac">Asia Pacific</SelectItem>
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
                        <li>Required column: email</li>
                        <li>Optional columns: first_name, last_name, company, phone</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="text-sm text-yellow-800">
                          Ensure you have permission to email all contacts in your upload
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-blue-900">Audience Insights</h4>
                  <Badge className="bg-blue-600">89,250 recipients</Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-blue-800">Avg. Open Rate</div>
                    <div className="text-blue-600">24.3%</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Avg. Click Rate</div>
                    <div className="text-blue-600">4.7%</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Unsubscribe Rate</div>
                    <div className="text-blue-600">0.3%</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-800">Best Send Time</div>
                    <div className="text-blue-600">Tue 10 AM</div>
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
                  <Label htmlFor="suppressions">Apply Suppression List</Label>
                  <Switch id="suppressions" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Content & Design</span>
              </CardTitle>
              <CardDescription>
                Customize your email content and design elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="subject">Email Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter compelling subject line"
                  value={campaign.subject}
                  onChange={(e) => setCampaign(prev => ({ ...prev, subject: e.target.value }))}
                />
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Character count: {campaign.subject.length}/50 (recommended)</span>
                    <span className={campaign.subject.length > 50 ? 'text-orange-600' : 'text-green-600'}>
                      {campaign.subject.length > 50 ? 'Too long' : 'Good length'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="preheader">Preheader Text</Label>
                <Input
                  id="preheader"
                  placeholder="Preview text that appears after subject line"
                />
                <p className="text-sm text-gray-600">
                  This text appears next to the subject line in email previews
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Template Customization</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <Input placeholder="#3B82F6" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Secondary Color</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-8 h-8 bg-gray-600 rounded border"></div>
                      <Input placeholder="#6B7280" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Header Logo</Label>
                    <div className="mt-1 border-2 border-dashed rounded-lg p-4 text-center">
                      <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload your logo</p>
                    </div>
                  </div>
                  <div>
                    <Label>Button Style</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose button style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="pill">Pill Shape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <h4 className="font-medium text-green-900">Email Design Features</h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                  <div>✓ Mobile-responsive design</div>
                  <div>✓ Dark mode support</div>
                  <div>✓ Accessibility optimized</div>
                  <div>✓ Cross-client compatibility</div>
                  <div>✓ Personalization ready</div>
                  <div>✓ A/B testing support</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Email Design
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Edit Content in Builder
                </Button>
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
                Set your budget and configure pricing options for the email campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Budget Type</Label>
                <RadioGroup 
                  value={campaign.budget.type} 
                  onValueChange={(value) => setCampaign(prev => ({ 
                    ...prev, 
                    budget: { ...prev.budget, type: value as 'per_email' | 'daily' | 'total' }
                  }))}
                >
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="per_email" id="per_email" />
                        <Label htmlFor="per_email" className="font-medium">Cost Per Email</Label>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-6">
                        Pay per email sent (recommended for targeted campaigns)
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
                  {campaign.budget.type === 'per_email' ? 'Cost Per Email' : 
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

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-blue-900">Cost Breakdown</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cost per email:</span>
                    <span className="font-medium">${campaign.budget.amount.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Provider fees:</span>
                    <span className="font-medium">$0.0002/email</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform fees:</span>
                    <span className="font-medium">$0.0001/email</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium text-green-800">
                    <span>Total estimated cost:</span>
                    <span>${(89250 * (campaign.budget.amount + 0.0003)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <h4 className="font-medium text-yellow-900">Budget Recommendations</h4>
                </div>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Industry average cost per email: $0.015 - $0.025</li>
                  <li>• Higher budgets typically yield better deliverability</li>
                  <li>• Consider A/B testing with different budget allocations</li>
                  <li>• Monitor cost per conversion to optimize ROI</li>
                </ul>
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
                Configure delivery schedule and email campaign settings
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
                        Send emails as soon as campaign is launched
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
                <h4 className="font-medium">Email Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="trackOpens">Track Email Opens</Label>
                      <p className="text-sm text-gray-600">Monitor when recipients open your emails</p>
                    </div>
                    <Switch 
                      id="trackOpens" 
                      checked={campaign.settings.trackOpens}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, trackOpens: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="trackClicks">Track Link Clicks</Label>
                      <p className="text-sm text-gray-600">Track clicks on links within your email</p>
                    </div>
                    <Switch 
                      id="trackClicks" 
                      checked={campaign.settings.trackClicks}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, trackClicks: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoResponder">Auto-responder</Label>
                      <p className="text-sm text-gray-600">Send automatic replies to responses</p>
                    </div>
                    <Switch 
                      id="autoResponder" 
                      checked={campaign.settings.autoResponder}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, autoResponder: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="unsubscribeLink">Include Unsubscribe Link</Label>
                      <p className="text-sm text-gray-600">Required for compliance</p>
                    </div>
                    <Switch 
                      id="unsubscribeLink" 
                      checked={campaign.settings.unsubscribeLink}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, unsubscribeLink: checked }
                      }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="spamFilter">Spam Filter Check</Label>
                      <p className="text-sm text-gray-600">Analyze content for spam triggers</p>
                    </div>
                    <Switch 
                      id="spamFilter" 
                      checked={campaign.settings.spamFilter}
                      onCheckedChange={(checked) => setCampaign(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, spamFilter: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Optimal Send Times</h4>
                </div>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>Tuesday - Thursday: 10:00 AM - 2:00 PM</div>
                  <div>Weekends: Lower open rates, consider avoiding</div>
                  <div>Monday mornings: High inbox competition</div>
                  <div>Friday afternoons: Lower engagement</div>
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
                Review your email campaign before sending
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
                      <span className="text-gray-600">Email Provider:</span>
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
                      <span className="text-gray-600">From:</span>
                      <div className="font-medium">{campaign.fromName || 'Not set'} &lt;{campaign.fromEmail || 'not-set'}&gt;</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Schedule:</span>
                      <div className="font-medium">
                        {campaign.schedule.type === 'immediate' ? 'Send Immediately' : 
                         `${campaign.schedule.date} at ${campaign.schedule.time}`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Email Preview</h4>
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="text-sm text-gray-600 mb-2">Subject: {campaign.subject || 'No subject'}</div>
                    <div className="text-sm text-gray-600 mb-2">From: {campaign.fromName || 'Company'} &lt;{campaign.fromEmail || 'email@company.com'}&gt;</div>
                    <div className="bg-white p-4 rounded border min-h-[200px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Mail className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>Email template preview</p>
                        <p className="text-xs">Content will be rendered here</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview on Desktop
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smartphone className="h-3 w-3 mr-1" />
                      Preview on Mobile
                    </Button>
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
                      <span>Email provider configured and verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Subject line optimized for opens</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Template selected and customized</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Target audience defined</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Delivery schedule configured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>Unsubscribe link included</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Expected Results</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-blue-800">Emails Sent</div>
                      <div className="text-blue-600">89,250</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Expected Opens</div>
                      <div className="text-blue-600">~21,700</div>
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Expected Clicks</div>
                      <div className="text-blue-600">~4,200</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-yellow-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900">Important Notes</h4>
                  </div>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Test sends will be sent to your email for final review</li>
                    <li>• Campaign can be paused or stopped after launching</li>
                    <li>• Real-time analytics will be available immediately</li>
                    <li>• Bounce and complaint handling is automated</li>
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
              <h1 className="text-2xl font-bold tracking-tight">Create Email Campaign</h1>
              <p className="text-muted-foreground">
                Set up your email campaign with Mailchimp, SendGrid, and other providers
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
                  (currentStep === 4 && !campaign.audience) ||
                  (currentStep === 5 && !campaign.budget.amount)
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