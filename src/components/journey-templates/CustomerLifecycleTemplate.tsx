"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  Clock,
  GitBranch,
  Target,
  Zap,
  ShoppingCart,
  Heart,
  RotateCcw,
  MapPin,
  Eye,
  ArrowDown,
  ArrowRight
} from "lucide-react";

interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay' | 'split' | 'segmentation';
  title: string;
  description: string;
  position: { x: number; y: number };
  config: any;
  connections: string[];
  category: string;
}

export const CustomerLifecycleJourneyTemplate: FlowNode[] = [
  // 1. Customer Entry Point
  {
    id: "entry-signup",
    type: 'trigger',
    title: 'Customer Signup',
    description: 'Website signup, Ad click, Social login, Purchase',
    position: { x: 50, y: 50 },
    config: { 
      events: ['website_signup', 'ad_click', 'social_login', 'purchase'],
      data_captured: ['name', 'email', 'location', 'product_interest']
    },
    connections: ['segmentation-main'],
    category: 'Entry'
  },

  // 2. Initial Segmentation
  {
    id: "segmentation-main",
    type: 'segmentation',
    title: 'Customer Segmentation',
    description: 'Segment by location, behavior, demographics, engagement',
    position: { x: 50, y: 200 },
    config: {
      criteria: [
        { type: 'location', values: ['city', 'region'] },
        { type: 'behavior', values: ['browsed', 'added_to_cart', 'purchased'] },
        { type: 'demographics', values: ['age', 'gender'] },
        { type: 'engagement', values: ['email_opened', 'clicked'] }
      ]
    },
    connections: ['welcome-email'],
    category: 'Segmentation'
  },

  // 3. Welcome Campaign
  {
    id: "welcome-email",
    type: 'action',
    title: 'Welcome Email',
    description: 'Send welcome email with offer/CTA',
    position: { x: 50, y: 350 },
    config: {
      channel: 'email',
      template: 'welcome_with_offer',
      subject: 'Welcome! Here\'s your special offer',
      offer_included: true
    },
    connections: ['delay-1day'],
    category: 'Welcome'
  },

  {
    id: "delay-1day",
    type: 'delay',
    title: 'Wait 1 Day',
    description: 'Wait 1 day before next step',
    position: { x: 50, y: 500 },
    config: { duration: 1, unit: 'days' },
    connections: ['product-intro-email'],
    category: 'Welcome'
  },

  {
    id: "product-intro-email",
    type: 'action',
    title: 'Product Introduction Email',
    description: 'Send product feature introduction',
    position: { x: 50, y: 650 },
    config: {
      channel: 'email',
      template: 'product_intro_features',
      subject: 'Discover our amazing features'
    },
    connections: ['delay-2days'],
    category: 'Welcome'
  },

  {
    id: "delay-2days",
    type: 'delay',
    title: 'Wait 2 Days',
    description: 'Wait 2 days for activity check',
    position: { x: 50, y: 800 },
    config: { duration: 2, unit: 'days' },
    connections: ['inactive-check'],
    category: 'Welcome'
  },

  {
    id: "inactive-check",
    type: 'condition',
    title: 'User Active?',
    description: 'Check if user has been active',
    position: { x: 50, y: 950 },
    config: {
      field: 'last_activity',
      operator: 'within_days',
      value: 2
    },
    connections: ['behavior-tracking', 'sms-reminder'],
    category: 'Welcome'
  },

  {
    id: "sms-reminder",
    type: 'action',
    title: 'SMS Reminder',
    description: 'Send SMS if inactive',
    position: { x: 300, y: 1100 },
    config: {
      channel: 'sms',
      message: 'Don\'t miss out! Complete your setup to get started.'
    },
    connections: ['behavior-tracking'],
    category: 'Welcome'
  },

  // 4. Behavior-Based Campaigns
  {
    id: "behavior-tracking",
    type: 'condition',
    title: 'Behavior Split',
    description: 'Split based on user behavior',
    position: { x: 50, y: 1250 },
    config: {
      conditions: [
        { type: 'added_to_cart_no_purchase', path: 'cart-abandonment' },
        { type: 'product_viewed_no_action', path: 'product-recommendations' },
        { type: 'purchased', path: 'conversion-flow' }
      ]
    },
    connections: ['cart-abandonment', 'product-recommendations', 'conversion-flow'],
    category: 'Behavior'
  },

  // Cart Abandonment Flow
  {
    id: "cart-abandonment",
    type: 'action',
    title: 'Cart Reminder Email',
    description: 'Reminder email after 2 hours',
    position: { x: -200, y: 1400 },
    config: {
      channel: 'email',
      delay: { duration: 2, unit: 'hours' },
      template: 'cart_reminder',
      subject: 'You left something in your cart!'
    },
    connections: ['cart-push-24h'],
    category: 'Behavior'
  },

  {
    id: "cart-push-24h",
    type: 'action',
    title: 'Push Notification',
    description: 'Push notification after 24 hours',
    position: { x: -200, y: 1550 },
    config: {
      channel: 'push',
      delay: { duration: 24, unit: 'hours' },
      message: 'Complete your purchase before it\'s gone!'
    },
    connections: ['discount-offer'],
    category: 'Behavior'
  },

  {
    id: "discount-offer",
    type: 'action',
    title: 'Discount Offer',
    description: 'Offer discount after 2 days',
    position: { x: -200, y: 1700 },
    config: {
      channel: 'email',
      delay: { duration: 2, unit: 'days' },
      template: 'discount_offer',
      discount: '10%',
      subject: 'Special 10% discount just for you!'
    },
    connections: ['conversion-flow'],
    category: 'Behavior'
  },

  // Product Recommendation Flow
  {
    id: "product-recommendations",
    type: 'action',
    title: 'Similar Products Email',
    description: 'Email with similar products',
    position: { x: 300, y: 1400 },
    config: {
      channel: 'email',
      template: 'similar_products',
      subject: 'You might also like these products'
    },
    connections: ['whatsapp-followup'],
    category: 'Behavior'
  },

  {
    id: "whatsapp-followup",
    type: 'action',
    title: 'WhatsApp Message',
    description: 'Triggered WhatsApp message (if consented)',
    position: { x: 300, y: 1550 },
    config: {
      channel: 'whatsapp',
      message: 'Hi! Saw you were interested in our products. Any questions?',
      consent_required: true
    },
    connections: ['conversion-flow'],
    category: 'Behavior'
  },

  // 5. Conversion Flow
  {
    id: "conversion-flow",
    type: 'action',
    title: 'Thank You Email',
    description: 'Thank you email + invoice',
    position: { x: 50, y: 1850 },
    config: {
      channel: 'email',
      template: 'thank_you_invoice',
      subject: 'Thank you for your purchase!',
      include_invoice: true
    },
    connections: ['feedback-delay'],
    category: 'Conversion'
  },

  {
    id: "feedback-delay",
    type: 'delay',
    title: 'Wait 2 Days',
    description: 'Wait before feedback request',
    position: { x: 50, y: 2000 },
    config: { duration: 2, unit: 'days' },
    connections: ['feedback-form'],
    category: 'Conversion'
  },

  {
    id: "feedback-form",
    type: 'action',
    title: 'Feedback Form',
    description: 'Send feedback form after 2 days',
    position: { x: 50, y: 2150 },
    config: {
      channel: 'email',
      template: 'feedback_request',
      subject: 'How was your experience?'
    },
    connections: ['crosssell-delay'],
    category: 'Conversion'
  },

  {
    id: "crosssell-delay",
    type: 'delay',
    title: 'Wait 7 Days',
    description: 'Wait before cross-sell',
    position: { x: 50, y: 2300 },
    config: { duration: 7, unit: 'days' },
    connections: ['crosssell-email'],
    category: 'Conversion'
  },

  {
    id: "crosssell-email",
    type: 'action',
    title: 'Cross-sell Email',
    description: 'Cross-sell email after 7 days',
    position: { x: 50, y: 2450 },
    config: {
      channel: 'email',
      template: 'crosssell_recommendations',
      subject: 'Complete your collection with these items'
    },
    connections: ['loyalty-check'],
    category: 'Conversion'
  },

  // 6. Loyalty Nurturing
  {
    id: "loyalty-check",
    type: 'condition',
    title: 'Loyalty Check',
    description: '2+ purchases in 30 days?',
    position: { x: 50, y: 2600 },
    config: {
      field: 'purchase_count_30_days',
      operator: 'greater_than_equal',
      value: 2
    },
    connections: ['loyalty-points', 'activity-monitor'],
    category: 'Loyalty'
  },

  {
    id: "loyalty-points",
    type: 'action',
    title: 'Loyalty Points',
    description: 'Send loyalty points/coupon',
    position: { x: -150, y: 2750 },
    config: {
      channel: 'email',
      template: 'loyalty_reward',
      points: 100,
      coupon: 'LOYAL10',
      subject: 'You\'ve earned loyalty rewards!'
    },
    connections: ['referral-invite'],
    category: 'Loyalty'
  },

  {
    id: "referral-invite",
    type: 'action',
    title: 'Referral Program',
    description: 'Invitation to referral program',
    position: { x: -150, y: 2900 },
    config: {
      channel: 'email',
      template: 'referral_invitation',
      subject: 'Invite friends and earn rewards!'
    },
    connections: ['activity-monitor'],
    category: 'Loyalty'
  },

  // 7. Re-engagement
  {
    id: "activity-monitor",
    type: 'condition',
    title: 'Activity Monitor',
    description: 'Inactive for 30+ days?',
    position: { x: 50, y: 3050 },
    config: {
      field: 'last_activity',
      operator: 'older_than_days',
      value: 30
    },
    connections: ['reengagement-email', 'journey-complete'],
    category: 'Re-engagement'
  },

  {
    id: "reengagement-email",
    type: 'action',
    title: 'Re-engagement Email',
    description: 'Reminder email for inactive users',
    position: { x: 250, y: 3200 },
    config: {
      channel: 'email',
      template: 'reengagement_reminder',
      subject: 'We miss you! Come back for exclusive offers'
    },
    connections: ['reengagement-push'],
    category: 'Re-engagement'
  },

  {
    id: "reengagement-push",
    type: 'action',
    title: 'Push with Incentive',
    description: 'Push notification with incentive',
    position: { x: 250, y: 3350 },
    config: {
      channel: 'push',
      message: 'Special offer just for you! 15% off your next purchase',
      incentive: '15% discount'
    },
    connections: ['reengagement-sms'],
    category: 'Re-engagement'
  },

  {
    id: "reengagement-sms",
    type: 'action',
    title: 'SMS Last Browse',
    description: 'SMS with last browsed product',
    position: { x: 250, y: 3500 },
    config: {
      channel: 'sms',
      message: 'Remember this product you loved? It\'s still available!',
      include_last_browsed: true
    },
    connections: ['journey-complete'],
    category: 'Re-engagement'
  },

  {
    id: "journey-complete",
    type: 'action',
    title: 'Journey Complete',
    description: 'End of journey or loop back',
    position: { x: 50, y: 3650 },
    config: {
      action: 'complete',
      loop_option: true
    },
    connections: [],
    category: 'Complete'
  }
];

export const JourneyStageCategories = {
  'Entry': { color: 'bg-blue-500', icon: Users, description: 'Customer enters the system' },
  'Segmentation': { color: 'bg-purple-500', icon: GitBranch, description: 'Segment customers by criteria' },
  'Welcome': { color: 'bg-green-500', icon: Mail, description: 'Welcome and onboarding flow' },
  'Behavior': { color: 'bg-orange-500', icon: Eye, description: 'Behavior-based campaigns' },
  'Conversion': { color: 'bg-pink-500', icon: ShoppingCart, description: 'Post-purchase experience' },
  'Loyalty': { color: 'bg-indigo-500', icon: Heart, description: 'Loyalty and retention' },
  'Re-engagement': { color: 'bg-red-500', icon: RotateCcw, description: 'Win back inactive users' },
  'Complete': { color: 'bg-gray-500', icon: Target, description: 'Journey completion' }
};

export default function CustomerLifecycleTemplate() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="h-6 w-6" />
          <span>Complete Customer Lifecycle Journey</span>
        </CardTitle>
        <p className="text-muted-foreground">
          A comprehensive 7-stage customer journey from signup to loyalty and re-engagement
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(JourneyStageCategories).map(([category, config]) => (
            <Card key={category} className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`p-2 rounded ${config.color}`}>
                  <config.icon className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-medium">{category}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{config.description}</p>
              <Badge variant="outline" className="mt-2">
                {CustomerLifecycleJourneyTemplate.filter(node => node.category === category).length} steps
              </Badge>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 space-y-4">
          <h4 className="font-medium">Journey Highlights:</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>🔄 <strong>Automated triggers:</strong> Based on user behavior and time delays</li>
            <li>📊 <strong>Smart segmentation:</strong> Location, behavior, demographics, engagement</li>
            <li>💬 <strong>Multi-channel:</strong> Email, SMS, WhatsApp, Push notifications</li>
            <li>🎯 <strong>Personalized:</strong> Content based on user actions and preferences</li>
            <li>♻️ <strong>Re-engagement:</strong> Win back inactive customers automatically</li>
            <li>❤️ <strong>Loyalty building:</strong> Reward program and referral system</li>
          </ul>
        </div>
        
        <div className="mt-6 flex gap-2">
          <Button>
            <Target className="h-4 w-4 mr-2" />
            Use This Template
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}