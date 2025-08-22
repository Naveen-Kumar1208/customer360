"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  MessageSquare,
  Smartphone,
  Target,
  Eye,
  Send,
  X,
  Zap,
  Users,
  ShoppingCart,
  Heart,
  RotateCcw,
  Clock,
  Gift,
  Star,
  AlertCircle,
  CheckCircle,
  Image,
  Link as LinkIcon,
  Phone,
  Plus
} from "lucide-react";

interface ChannelTemplate {
  id: string;
  name: string;
  subject?: string;
  content: string;
  category: string;
  description: string;
  features: string[];
  variables: string[];
  previewText?: string;
  estimatedLength?: number;
  mediaSupported?: boolean;
  linkSupported?: boolean;
}

interface ChannelTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: 'email' | 'sms' | 'whatsapp' | 'push';
  nodeCategory?: string;
  nodeTitle?: string;
  nodeDescription?: string;
  onTemplateSelect: (template: ChannelTemplate) => void;
}

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email': return Mail;
    case 'sms': return Smartphone;
    case 'whatsapp': return MessageSquare;
    case 'push': return Target;
    default: return Mail;
  }
};

const emailTemplates: ChannelTemplate[] = [
  {
    id: 'welcome-email-1',
    name: 'Welcome Email - Simple',
    subject: 'Welcome to {{company_name}}!',
    content: `Hi {{first_name}},

Welcome to {{company_name}}! We're excited to have you on board.

Here's what you can expect:
• Access to our exclusive products
• Personalized recommendations
• 24/7 customer support

Get started by exploring our featured products below.

Best regards,
The {{company_name}} Team`,
    category: 'Welcome',
    description: 'Simple welcome email for new customers',
    features: ['Personalized greeting', 'Company introduction', 'Clear next steps'],
    variables: ['first_name', 'company_name'],
    previewText: 'Welcome to our community! Here\'s what you can expect...'
  },
  {
    id: 'cart-abandonment-1',
    name: 'Cart Abandonment - Urgency',
    subject: 'Don\'t miss out! Items in your cart are waiting',
    content: `Hi {{first_name}},

You left some amazing items in your cart. Don't let them slip away!

{{cart_items}}

Complete your purchase now and enjoy:
• Free shipping on orders over $50
• 30-day money-back guarantee
• Expert customer support

[Complete Purchase Button]

Still browsing? We'll hold these items for you for 24 hours.

Happy shopping!
{{company_name}}`,
    category: 'Behavior',
    description: 'Urgency-driven cart abandonment email',
    features: ['Dynamic cart items', 'Urgency messaging', 'Clear CTA'],
    variables: ['first_name', 'cart_items', 'company_name'],
    previewText: 'Your cart items are waiting for you!'
  },
  {
    id: 'product-recommendation-1',
    name: 'Product Recommendations',
    subject: 'Perfect picks just for you, {{first_name}}',
    content: `Hi {{first_name}},

Based on your recent browsing, we think you'll love these products:

{{recommended_products}}

Why we chose these for you:
• Similar to items you've viewed
• Trending in your category
• Highly rated by customers like you

[Shop Now Button]

Not what you're looking for? Update your preferences here.

Best,
{{company_name}}`,
    category: 'Behavior',
    description: 'Personalized product recommendations',
    features: ['AI-powered recommendations', 'Personalization', 'Preference management'],
    variables: ['first_name', 'recommended_products', 'company_name'],
    previewText: 'Products we think you\'ll love...'
  },
  {
    id: 'loyalty-reward-1',
    name: 'Loyalty Rewards',
    subject: 'You\'ve earned {{points}} points! 🎉',
    content: `Congratulations {{first_name}}!

You've earned {{points}} loyalty points for your recent activities.

Your rewards status:
• Current points: {{total_points}}
• Tier: {{loyalty_tier}}
• Next reward: {{next_reward}}

Ready to redeem? Here are some great options:
{{redemption_options}}

[Redeem Points Button]

Thanks for being a loyal customer!
{{company_name}}`,
    category: 'Loyalty',
    description: 'Loyalty points notification and redemption',
    features: ['Points tracking', 'Tier status', 'Redemption options'],
    variables: ['first_name', 'points', 'total_points', 'loyalty_tier', 'next_reward', 'redemption_options', 'company_name'],
    previewText: 'You\'ve earned loyalty points!'
  },
  {
    id: 'reengagement-1',
    name: 'Re-engagement - We Miss You',
    subject: 'We miss you! Here\'s 15% off to welcome you back',
    content: `Hi {{first_name}},

It's been a while since we've seen you at {{company_name}}. We miss you!

Here's what's new since your last visit:
• {{new_features}}
• {{new_products}}
• {{improvements}}

As a welcome back gift, here's 15% off your next purchase:
Code: WELCOME15

[Shop Now Button]

This offer expires in 7 days, so don't wait too long!

We'd love to have you back,
{{company_name}}`,
    category: 'Re-engagement',
    description: 'Win-back email with discount incentive',
    features: ['Discount incentive', 'What\'s new section', 'Limited time offer'],
    variables: ['first_name', 'company_name', 'new_features', 'new_products', 'improvements'],
    previewText: 'We miss you! Here\'s 15% off to welcome you back'
  }
];

const smsTemplates: ChannelTemplate[] = [
  {
    id: 'welcome-sms-1',
    name: 'Welcome SMS - Brief',
    content: 'Hi {{first_name}}! Welcome to {{company_name}}. Reply STOP to opt out.',
    category: 'Welcome',
    description: 'Short welcome SMS for new customers',
    features: ['Compliant opt-out', 'Personal greeting', 'Brand introduction'],
    variables: ['first_name', 'company_name'],
    estimatedLength: 65
  },
  {
    id: 'cart-abandonment-sms-1',
    name: 'Cart Reminder SMS',
    content: 'Hi {{first_name}}, you left {{item_count}} items in your cart. Complete your purchase: {{cart_link}} Reply STOP to opt out.',
    category: 'Behavior',
    description: 'Cart abandonment reminder via SMS',
    features: ['Item count', 'Direct link', 'Opt-out compliance'],
    variables: ['first_name', 'item_count', 'cart_link'],
    estimatedLength: 95
  },
  {
    id: 'flash-sale-sms-1',
    name: 'Flash Sale Alert',
    content: 'FLASH SALE! {{discount}}% off {{product_category}} for next 2 hours only! Shop now: {{sale_link}} Reply STOP to opt out.',
    category: 'Conversion',
    description: 'Urgent flash sale notification',
    features: ['Urgency messaging', 'Dynamic discount', 'Direct link'],
    variables: ['discount', 'product_category', 'sale_link'],
    estimatedLength: 85
  },
  {
    id: 'order-confirmation-sms-1',
    name: 'Order Confirmation',
    content: 'Order confirmed! {{order_number}} will arrive {{delivery_date}}. Track: {{tracking_link}} Reply STOP to opt out.',
    category: 'Conversion',
    description: 'Order confirmation and tracking',
    features: ['Order details', 'Delivery date', 'Tracking link'],
    variables: ['order_number', 'delivery_date', 'tracking_link'],
    estimatedLength: 80
  },
  {
    id: 'reengagement-sms-1',
    name: 'Re-engagement SMS',
    content: 'Miss you {{first_name}}! Here\'s 20% off: {{discount_code}} Expires in 48hrs. Shop: {{shop_link}} Reply STOP to opt out.',
    category: 'Re-engagement',
    description: 'Win-back SMS with time-limited offer',
    features: ['Personal touch', 'Discount code', 'Time pressure'],
    variables: ['first_name', 'discount_code', 'shop_link'],
    estimatedLength: 90
  }
];

const whatsappTemplates: ChannelTemplate[] = [
  {
    id: 'welcome-whatsapp-1',
    name: 'Welcome WhatsApp - Interactive',
    content: `Hi {{first_name}}! 👋

Welcome to {{company_name}}! We're excited to have you here.

What would you like to explore first?
• 🛍️ Browse Products
• 📞 Talk to Support
• 🎁 View Offers

Just reply with your choice!`,
    category: 'Welcome',
    description: 'Interactive welcome message with options',
    features: ['Interactive buttons', 'Emoji support', 'Multiple options'],
    variables: ['first_name', 'company_name'],
    mediaSupported: true,
    linkSupported: true
  },
  {
    id: 'cart-abandonment-whatsapp-1',
    name: 'Cart Abandonment - Rich Media',
    content: `Hi {{first_name}}! 🛒

You left some great items in your cart:
{{cart_items_with_images}}

Complete your purchase and get:
✅ Free shipping
✅ 30-day returns
✅ Expert support

[Complete Purchase Button]

Need help? Just reply to this message!`,
    category: 'Behavior',
    description: 'Rich media cart abandonment message',
    features: ['Product images', 'Rich formatting', 'Interactive CTA'],
    variables: ['first_name', 'cart_items_with_images'],
    mediaSupported: true,
    linkSupported: true
  },
  {
    id: 'order-update-whatsapp-1',
    name: 'Order Update - Status',
    content: `Hi {{first_name}}! 📦

Great news! Your order {{order_number}} is on its way.

📍 Current status: {{order_status}}
🚚 Expected delivery: {{delivery_date}}
📱 Track your order: {{tracking_link}}

Questions? Just reply here - we're happy to help!`,
    category: 'Conversion',
    description: 'Order status update with tracking',
    features: ['Status updates', 'Tracking integration', 'Support chat'],
    variables: ['first_name', 'order_number', 'order_status', 'delivery_date', 'tracking_link'],
    mediaSupported: true,
    linkSupported: true
  },
  {
    id: 'loyalty-whatsapp-1',
    name: 'Loyalty Milestone',
    content: `🎉 Congratulations {{first_name}}!

You've reached {{loyalty_tier}} status! 

Your exclusive benefits:
⭐ {{points}} points earned
🎁 {{tier_benefits}}
🏆 Next milestone: {{next_tier}}

Ready to redeem your points?
[View Rewards Button]

Thanks for being amazing! 💙`,
    category: 'Loyalty',
    description: 'Loyalty tier achievement celebration',
    features: ['Milestone celebration', 'Tier benefits', 'Rewards access'],
    variables: ['first_name', 'loyalty_tier', 'points', 'tier_benefits', 'next_tier'],
    mediaSupported: true,
    linkSupported: true
  },
  {
    id: 'reengagement-whatsapp-1',
    name: 'Re-engagement - Personal',
    content: `Hi {{first_name}}! 👋

We noticed you haven't visited us in a while. 

Here's what's new:
🆕 {{new_products}}
🔥 {{trending_items}}
💰 Special offers just for you

Want to see what's trending? 
[Browse Now Button]

Or just reply HI and let's chat! 😊`,
    category: 'Re-engagement',
    description: 'Personal re-engagement with updates',
    features: ['Personal touch', 'What\'s new', 'Chat invitation'],
    variables: ['first_name', 'new_products', 'trending_items'],
    mediaSupported: true,
    linkSupported: true
  }
];

const pushTemplates: ChannelTemplate[] = [
  {
    id: 'welcome-push-1',
    name: 'Welcome Push - Simple',
    content: 'Welcome to {{company_name}}! Explore our featured products.',
    category: 'Welcome',
    description: 'Simple welcome push notification',
    features: ['Brand introduction', 'Clear CTA', 'Immediate action'],
    variables: ['company_name'],
    estimatedLength: 50
  },
  {
    id: 'cart-abandonment-push-1',
    name: 'Cart Abandonment - Urgent',
    content: 'Don\'t lose your items! {{item_count}} products waiting in your cart.',
    category: 'Behavior',
    description: 'Urgent cart abandonment push',
    features: ['Item count', 'Urgency', 'Action trigger'],
    variables: ['item_count'],
    estimatedLength: 60
  },
  {
    id: 'flash-sale-push-1',
    name: 'Flash Sale - Time Limited',
    content: '⚡ FLASH SALE! {{discount}}% off ends in {{time_left}}. Shop now!',
    category: 'Conversion',
    description: 'Time-sensitive flash sale notification',
    features: ['Urgency emoji', 'Dynamic discount', 'Time pressure'],
    variables: ['discount', 'time_left'],
    estimatedLength: 55
  },
  {
    id: 'back-in-stock-push-1',
    name: 'Back in Stock',
    content: '🔔 {{product_name}} is back in stock! Get it before it\'s gone.',
    category: 'Behavior',
    description: 'Product back in stock alert',
    features: ['Product specific', 'Availability alert', 'Scarcity'],
    variables: ['product_name'],
    estimatedLength: 55
  },
  {
    id: 'loyalty-push-1',
    name: 'Loyalty Points Earned',
    content: '🎉 You earned {{points}} points! {{total_points}} total. Redeem now!',
    category: 'Loyalty',
    description: 'Loyalty points achievement notification',
    features: ['Points earned', 'Total points', 'Redeem CTA'],
    variables: ['points', 'total_points'],
    estimatedLength: 50
  }
];

const getTemplatesForChannel = (channel: string): ChannelTemplate[] => {
  switch (channel) {
    case 'email': return emailTemplates;
    case 'sms': return smsTemplates;
    case 'whatsapp': return whatsappTemplates;
    case 'push': return pushTemplates;
    default: return [];
  }
};

const getChannelColor = (channel: string): string => {
  switch (channel) {
    case 'email': return 'bg-blue-500';
    case 'sms': return 'bg-green-500';
    case 'whatsapp': return 'bg-emerald-500';
    case 'push': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

const filterTemplatesByCategory = (templates: ChannelTemplate[], category?: string): ChannelTemplate[] => {
  if (!category) return templates;
  
  const categoryMap: { [key: string]: string[] } = {
    'Entry': ['Welcome'],
    'Segmentation': ['Welcome', 'Behavior'],
    'Welcome': ['Welcome'],
    'Behavior': ['Behavior'],
    'Conversion': ['Conversion'],
    'Loyalty': ['Loyalty'],
    'Re-engagement': ['Re-engagement'],
    'Complete': ['Conversion']
  };
  
  const matchingCategories = categoryMap[category] || [];
  return templates.filter(template => matchingCategories.includes(template.category));
};

export default function ChannelTemplateModal({
  isOpen,
  onClose,
  channel,
  nodeCategory,
  nodeTitle,
  nodeDescription,
  onTemplateSelect
}: ChannelTemplateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<ChannelTemplate | null>(null);
  const [customTemplate, setCustomTemplate] = useState({
    subject: '',
    content: '',
    name: ''
  });
  const [activeTab, setActiveTab] = useState('templates');

  const ChannelIcon = getChannelIcon(channel);
  const templates = getTemplatesForChannel(channel);
  const relevantTemplates = filterTemplatesByCategory(templates, nodeCategory);
  const channelColor = getChannelColor(channel);

  const handleTemplateSelect = (template: ChannelTemplate) => {
    setSelectedTemplate(template);
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate);
      onClose();
    }
  };

  const handleCreateCustom = () => {
    if (customTemplate.name && customTemplate.content) {
      const newTemplate: ChannelTemplate = {
        id: `custom-${Date.now()}`,
        name: customTemplate.name,
        content: customTemplate.content,
        subject: customTemplate.subject || undefined,
        category: nodeCategory || 'Custom',
        description: 'Custom template created by user',
        features: ['Custom content'],
        variables: []
      };
      onTemplateSelect(newTemplate);
      onClose();
    }
  };

  const handleVariableClick = (variable: string, field: 'content' | 'subject' = 'content') => {
    // Add the variable to the specified field at the cursor position
    const elementId = field === 'content' ? 'custom-content' : 'custom-subject';
    const element = document.getElementById(elementId) as HTMLTextAreaElement | HTMLInputElement;
    
    if (element) {
      const start = element.selectionStart || 0;
      const end = element.selectionEnd || 0;
      const currentValue = field === 'content' ? customTemplate.content : customTemplate.subject;
      const newValue = currentValue.substring(0, start) + variable + currentValue.substring(end);
      
      setCustomTemplate(prev => ({ 
        ...prev, 
        [field]: newValue 
      }));
      
      // Set cursor position after the inserted variable
      setTimeout(() => {
        element.focus();
        element.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className={`p-2 rounded ${channelColor}`}>
              <ChannelIcon className="h-5 w-5 text-white" />
            </div>
            <span>Choose {channel.charAt(0).toUpperCase() + channel.slice(1)} Template</span>
          </DialogTitle>
          <DialogDescription>
            {nodeCategory ? (
              `For ${nodeCategory} node: "${nodeTitle}"`
            ) : (
              "Select a template for your message"
            )}
          </DialogDescription>
          {nodeCategory && (
            <div className="mt-2">
              <Badge variant="outline">{nodeCategory}</Badge>
            </div>
          )}
        </DialogHeader>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">
                Pre-built Templates ({relevantTemplates.length > 0 ? relevantTemplates.length : templates.length})
              </TabsTrigger>
              <TabsTrigger value="custom">Create Custom</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {(relevantTemplates.length > 0 ? relevantTemplates : templates).map((template) => (
                  <Card 
                    key={template.id} 
                    className={`cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? 'ring-2 ring-blue-500 border-blue-300' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground">{template.category}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      {template.subject && (
                        <div className="mb-3">
                          <Label className="text-xs text-muted-foreground">Subject</Label>
                          <p className="text-sm font-medium">{template.subject}</p>
                        </div>
                      )}
                      
                      <div className="mb-3">
                        <Label className="text-xs text-muted-foreground">Content Preview</Label>
                        <div className="text-sm bg-gray-50 p-2 rounded border max-h-20 overflow-hidden">
                          {template.content.substring(0, 150)}...
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="inline-flex items-center rounded-md border-transparent bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Variables: {template.variables.length}</span>
                        {template.estimatedLength && (
                          <span>~{template.estimatedLength} chars</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-name">Template Name</Label>
                  <Input
                    id="custom-name"
                    value={customTemplate.name}
                    onChange={(e) => setCustomTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>

                {channel === 'email' && (
                  <div>
                    <Label htmlFor="custom-subject">Subject Line</Label>
                    <Input
                      id="custom-subject"
                      value={customTemplate.subject}
                      onChange={(e) => setCustomTemplate(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter email subject"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="custom-content">Content</Label>
                  <Textarea
                    id="custom-content"
                    value={customTemplate.content}
                    onChange={(e) => setCustomTemplate(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={`Enter your ${channel} message content...`}
                    rows={10}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Available Variables</h4>
                  <p className="text-sm text-blue-800 mb-3">Click any variable to add it to your content or subject line</p>
                  
                  <div className="space-y-3">
                    {/* Customer Information */}
                    <div>
                      <h5 className="text-xs font-medium text-blue-700 mb-2">Customer Info</h5>
                      <div className="flex flex-wrap gap-2">
                        {['{{first_name}}', '{{last_name}}', '{{full_name}}', '{{email}}', '{{phone}}'].map((variable) => (
                          <div key={variable} className="flex items-center gap-1">
                            <span 
                              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground bg-background cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors"
                              onClick={() => handleVariableClick(variable, 'content')}
                              title={`Click to add ${variable} to your content`}
                            >
                              {variable}
                            </span>
                            {channel === 'email' && (
                              <button
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                                onClick={() => handleVariableClick(variable, 'subject')}
                                title="Add to subject line"
                              >
                                +subj
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h5 className="text-xs font-medium text-blue-700 mb-2">Company Info</h5>
                      <div className="flex flex-wrap gap-2">
                        {['{{company_name}}', '{{company_website}}', '{{support_email}}', '{{support_phone}}'].map((variable) => (
                          <div key={variable} className="flex items-center gap-1">
                            <span 
                              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground bg-background cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors"
                              onClick={() => handleVariableClick(variable, 'content')}
                              title={`Click to add ${variable} to your content`}
                            >
                              {variable}
                            </span>
                            {channel === 'email' && (
                              <button
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                                onClick={() => handleVariableClick(variable, 'subject')}
                                title="Add to subject line"
                              >
                                +subj
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Content */}
                    <div>
                      <h5 className="text-xs font-medium text-blue-700 mb-2">Dynamic Content</h5>
                      <div className="flex flex-wrap gap-2">
                        {['{{product_name}}', '{{order_number}}', '{{total_amount}}', '{{discount_code}}', '{{cart_items}}'].map((variable) => (
                          <div key={variable} className="flex items-center gap-1">
                            <span 
                              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold text-foreground bg-background cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors"
                              onClick={() => handleVariableClick(variable, 'content')}
                              title={`Click to add ${variable} to your content`}
                            >
                              {variable}
                            </span>
                            {channel === 'email' && (
                              <button
                                className="text-xs text-blue-600 hover:text-blue-800 underline"
                                onClick={() => handleVariableClick(variable, 'subject')}
                                title="Add to subject line"
                              >
                                +subj
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          <div className="flex space-x-2">
            {activeTab === 'templates' && selectedTemplate && (
              <Button onClick={handleUseTemplate}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Use Template
              </Button>
            )}
            
            {activeTab === 'custom' && (
              <Button 
                onClick={handleCreateCustom}
                disabled={!customTemplate.name || !customTemplate.content}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}