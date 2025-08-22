"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowRight,
  User,
  ShoppingCart,
  Mail,
  Phone,
  Globe,
  Search,
  Eye,
  CreditCard,
  Package,
  Star,
  MessageSquare,
  Activity,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";
import type { Customer } from "@/contexts/LeadContext";

interface CustomerJourneyProps {
  customer: Customer;
}

export const CustomerJourney: React.FC<CustomerJourneyProps> = ({ customer }) => {
  // Generate journey timeline based on customer data
  const generateJourneySteps = () => {
    const steps = [];
    
    // Initial touchpoint
    steps.push({
      id: 1,
      title: "First Discovery",
      description: `Discovered through ${customer.source}`,
      date: new Date(new Date(customer.registrationDate).getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: "discovery",
      icon: Search,
      status: "completed"
    });

    // If converted from lead, add lead journey
    if (customer.originalLeadId) {
      steps.push({
        id: 2,
        title: "Lead Nurturing",
        description: `Progressed through ${customer.movedFromStage} stage`,
        date: new Date(new Date(customer.movedDate).getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "nurturing",
        icon: TrendingUp,
        status: "completed"
      });

      steps.push({
        id: 3,
        title: "Lead Conversion",
        description: customer.conversionNotes || "Converted to customer",
        date: customer.movedDate,
        type: "conversion",
        icon: Award,
        status: "completed"
      });
    }

    // Registration
    steps.push({
      id: 4,
      title: "Account Registration",
      description: "Created customer account",
      date: customer.registrationDate,
      type: "registration",
      icon: User,
      status: "completed"
    });

    // First purchase
    if (customer.orderCount > 0) {
      steps.push({
        id: 5,
        title: "First Purchase",
        description: `First order completed - ${customer.tier} tier customer`,
        date: new Date(new Date(customer.registrationDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "purchase",
        icon: ShoppingCart,
        status: "completed"
      });
    }

    // Subsequent activities
    if (customer.orderCount > 1) {
      steps.push({
        id: 6,
        title: "Repeat Purchase",
        description: `Completed ${customer.orderCount - 1} additional orders`,
        date: new Date(new Date(customer.registrationDate).getTime() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "repeat",
        icon: Package,
        status: "completed"
      });
    }

    // Recent activity
    steps.push({
      id: 7,
      title: "Recent Activity",
      description: `Last active: ${customer.lastLogin}`,
      date: customer.lastLogin,
      type: "activity",
      icon: Activity,
      status: customer.status === 'active' ? "completed" : "pending"
    });

    // Future opportunity
    steps.push({
      id: 8,
      title: "Next Opportunity",
      description: "Potential upsell or cross-sell opportunity",
      date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: "future",
      icon: Zap,
      status: "upcoming"
    });

    return steps;
  };

  const journeySteps = generateJourneySteps();

  // Touchpoint analysis
  const touchpoints = [
    {
      channel: "Website",
      interactions: Math.floor(Math.random() * 25) + 15,
      lastActivity: "2 days ago",
      performance: "high",
      color: "bg-red-100 text-red-800"
    },
    {
      channel: "Email",
      interactions: Math.floor(Math.random() * 15) + 8,
      lastActivity: "1 week ago",
      performance: "medium",
      color: "bg-green-100 text-green-800"
    },
    {
      channel: "Phone",
      interactions: Math.floor(Math.random() * 5) + 2,
      lastActivity: "3 weeks ago",
      performance: "low",
      color: "bg-purple-100 text-purple-800"
    },
    {
      channel: "Social Media",
      interactions: Math.floor(Math.random() * 10) + 5,
      lastActivity: "5 days ago",
      performance: "medium",
      color: "bg-orange-100 text-orange-800"
    }
  ];

  // Customer lifecycle stage
  const getLifecycleStage = () => {
    if (customer.orderCount === 0) return { stage: "Prospect", color: "bg-yellow-100 text-yellow-800" };
    if (customer.orderCount === 1) return { stage: "New Customer", color: "bg-red-100 text-red-800" };
    if (customer.orderCount < 5) return { stage: "Growing Customer", color: "bg-green-100 text-green-800" };
    if (customer.totalSpent > 50000) return { stage: "VIP Customer", color: "bg-purple-100 text-purple-800" };
    return { stage: "Loyal Customer", color: "bg-indigo-100 text-indigo-800" };
  };

  const lifecycleStage = getLifecycleStage();

  const getStepIcon = (step) => {
    const IconComponent = step.icon;
    return <IconComponent className="w-4 h-4" />;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'upcoming': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Journey Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Since</p>
                <p className="text-2xl font-bold">{customer.registrationDate}</p>
                <p className="text-xs text-[#e85b5e] mt-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {Math.floor((new Date().getTime() - new Date(customer.registrationDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
              <Calendar className="h-8 w-8 text-[#e85b5e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Lifecycle Stage</p>
                <Badge className={lifecycleStage.color}>
                  {lifecycleStage.stage}
                </Badge>
                <p className="text-xs text-green-600 mt-2">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  Progressing well
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Journey Completion</p>
                <p className="text-2xl font-bold">
                  {Math.round((journeySteps.filter(s => s.status === 'completed').length / journeySteps.length) * 100)}%
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  {journeySteps.filter(s => s.status === 'completed').length} steps completed
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journey Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Customer Journey Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {journeySteps.map((step, index) => (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${getStepColor(step.status)}`}>
                    {getStepIcon(step)}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                      <span className="text-xs text-gray-500">{step.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {step.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Touchpoint Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Channel Touchpoints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {touchpoints.map((touchpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={touchpoint.color}>
                    {touchpoint.channel}
                  </Badge>
                  <div>
                    <div className="text-sm font-medium">{touchpoint.interactions} interactions</div>
                    <div className="text-xs text-gray-500">Last: {touchpoint.lastActivity}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium capitalize">{touchpoint.performance}</div>
                  <div className="text-xs text-gray-500">Performance</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Communication History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-[#e85b5e]" />
                <span className="text-sm font-medium">Welcome Email</span>
                <Badge variant="outline" className="text-xs">Opened</Badge>
              </div>
              <p className="text-xs text-gray-600">Sent on registration day</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Onboarding Call</span>
                <Badge variant="outline" className="text-xs">Completed</Badge>
              </div>
              <p className="text-xs text-gray-600">30-minute introduction call</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Product Updates</span>
                <Badge variant="outline" className="text-xs">Subscribed</Badge>
              </div>
              <p className="text-xs text-gray-600">Monthly newsletter recipient</p>
            </div>

            {customer.originalLeadId && (
              <div className="p-3 border rounded-lg bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-[#e85b5e]" />
                  <span className="text-sm font-medium">Conversion Call</span>
                  <Badge variant="outline" className="text-xs bg-red-100">Lead Conversion</Badge>
                </div>
                <p className="text-xs text-[#e85b5e]">
                  {customer.conversionNotes || "Successful conversion from lead to customer"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Next Steps and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-800">Engagement Opportunity</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Customer shows high engagement. Consider offering premium features or loyalty program.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Schedule Call
              </Button>
            </div>
            
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-[#e85b5e]" />
                <h4 className="font-medium text-red-800">Cross-sell Opportunity</h4>
              </div>
              <p className="text-sm text-red-700 mb-3">
                Based on purchase history, customer may be interested in complementary products.
              </p>
              <Button size="sm" variant="outline" className="border-[#e85b5e] text-[#e85b5e]">
                Send Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};