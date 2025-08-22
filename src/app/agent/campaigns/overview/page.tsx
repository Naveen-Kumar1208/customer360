"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Mail, 
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Plus
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "whatsapp";
  status: "active" | "paused" | "completed" | "draft";
  startDate: Date;
  endDate: Date;
  sent: number;
  opens: number;
  clicks: number;
  conversions: number;
  budget: number;
  spent: number;
}

const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Lead Nurturing Campaign",
    type: "email",
    status: "active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-31"),
    sent: 2500,
    opens: 1875,
    clicks: 375,
    conversions: 45,
    budget: 50000,
    spent: 32000
  },
  {
    id: "2",
    name: "Product Launch Announcement",
    type: "email",
    status: "completed",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-01-20"),
    sent: 1200,
    opens: 960,
    clicks: 240,
    conversions: 36,
    budget: 25000,
    spent: 25000
  },
  {
    id: "3",
    name: "SMS Follow-up Campaign",
    type: "sms",
    status: "paused",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-02-10"),
    sent: 800,
    opens: 720,
    clicks: 144,
    conversions: 12,
    budget: 15000,
    spent: 8000
  }
];

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <Users className="h-4 w-4" />;
      case 'whatsapp': return <Users className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const openRate = ((campaign.opens / campaign.sent) * 100).toFixed(1);
  const clickRate = ((campaign.clicks / campaign.sent) * 100).toFixed(1);
  const conversionRate = ((campaign.conversions / campaign.sent) * 100).toFixed(1);
  const budgetUsed = ((campaign.spent / campaign.budget) * 100).toFixed(0);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {getTypeIcon(campaign.type)}
                <span className="text-sm text-gray-600 capitalize">{campaign.type}</span>
              </div>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            {campaign.status === 'active' ? (
              <Button variant="ghost" size="sm">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Sent</p>
            <p className="text-lg font-semibold">{campaign.sent.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Open Rate</p>
            <p className="text-lg font-semibold text-green-600">{openRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Click Rate</p>
            <p className="text-lg font-semibold text-blue-600">{clickRate}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Conversions</p>
            <p className="text-lg font-semibold text-purple-600">{campaign.conversions}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-600">Budget: </span>
            <span className="font-medium">₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</span>
          </div>
          <div className="text-gray-600">
            {budgetUsed}% used
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CampaignOverview() {
  const totalSent = sampleCampaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalOpens = sampleCampaigns.reduce((sum, c) => sum + c.opens, 0);
  const totalClicks = sampleCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = sampleCampaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalSpent = sampleCampaigns.reduce((sum, c) => sum + c.spent, 0);

  const avgOpenRate = ((totalOpens / totalSent) * 100).toFixed(1);
  const avgClickRate = ((totalClicks / totalSent) * 100).toFixed(1);
  const avgConversionRate = ((totalConversions / totalSent) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Overview</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all your marketing campaigns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
                <p className="text-2xl font-bold text-green-600">{avgOpenRate}%</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
                <p className="text-2xl font-bold text-blue-600">{avgClickRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-purple-600">₹{totalSpent.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Active Campaigns</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">All</Button>
          <Button variant="outline" size="sm">Active</Button>
          <Button variant="outline" size="sm">Paused</Button>
          <Button variant="outline" size="sm">Completed</Button>
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sampleCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}