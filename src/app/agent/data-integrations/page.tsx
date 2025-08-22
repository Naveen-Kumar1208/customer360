"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin,
  Zap,
  Users,
  Search,
  Download,
  Settings,
  ChevronRight,
  Database,
  Globe,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Mail,
  Phone,
  Building2,
  Target,
  Filter,
  RefreshCw,
  Plus,
  BarChart3,
  UserPlus,
  FileText,
  Calendar,
  Eye
} from "lucide-react";
import { LinkedInSalesNavigatorModal } from "@/components/integrations/LinkedInSalesNavigatorModal";

interface IntegrationTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  stats: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  features: string[];
  pricing: string;
  lastSync?: Date;
  color: string;
}

const integrationTools: IntegrationTool[] = [
  {
    id: 'linkedin-sales-navigator',
    name: 'LinkedIn Sales Navigator',
    description: 'Advanced lead prospecting and social selling with LinkedIn\'s premium database',
    icon: Linkedin,
    status: 'connected',
    stats: [
      { label: 'Leads Found', value: '2,847', trend: 'up' },
      { label: 'InMail Credits', value: '23/50', trend: 'stable' },
      { label: 'Saved Searches', value: '12', trend: 'up' },
      { label: 'Success Rate', value: '34%', trend: 'up' }
    ],
    features: [
      'Advanced lead search with 40+ filters',
      'InMail messaging capabilities',
      'Lead recommendations based on your ideal customer profile',
      'Real-time alerts for prospect activities',
      'TeamLink insights and warm introductions',
      'CRM integration and lead tracking'
    ],
    pricing: '$99.99/month per seat',
    lastSync: new Date(Date.now() - 15 * 60 * 1000),
    color: 'blue'
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'linkedin_search',
    title: 'New LinkedIn search completed',
    description: 'Found 234 potential leads in "SaaS CTOs" search',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    icon: Search,
    color: 'blue'
  },
  {
    id: '2',
    type: 'linkedin_inmail',
    title: 'LinkedIn InMail campaign sent',
    description: 'Sent personalized InMails to 25 high-priority prospects',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    icon: Mail,
    color: 'blue'
  },
  {
    id: '3',
    type: 'lead_export',
    title: 'Lead list exported to CRM',
    description: 'Exported "Q1 LinkedIn Prospects" list (89 contacts) to Salesforce',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    icon: Download,
    color: 'blue'
  },
  {
    id: '4',
    type: 'data_sync',
    title: 'LinkedIn data sync completed',
    description: 'Synchronized 847 LinkedIn contacts and updates',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: RefreshCw,
    color: 'blue'
  }
];

function IntegrationCard({ tool, onOpenModal }: { tool: IntegrationTool; onOpenModal: (toolId: string) => void }) {
  const Icon = tool.icon;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <AlertTriangle className="h-4 w-4" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default: return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group" onClick={() => onOpenModal(tool.id)}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg bg-${tool.color}-100 flex items-center justify-center`}>
              <Icon className={`h-6 w-6 text-${tool.color}-600`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 max-w-sm">{tool.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(tool.status)}>
              {getStatusIcon(tool.status)}
              <span className="ml-1 capitalize">{tool.status}</span>
            </Badge>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {tool.stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                {getTrendIcon(stat.trend)}
              </div>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
          <div className="space-y-1">
            {tool.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                <span className="text-xs text-gray-600">{feature}</span>
              </div>
            ))}
            {tool.features.length > 3 && (
              <p className="text-xs text-blue-600 mt-2">+{tool.features.length - 3} more features</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-gray-600">Pricing: </span>
            <span className="font-medium text-gray-900">{tool.pricing}</span>
          </div>
          {tool.lastSync && (
            <div className="text-xs text-gray-500">
              Last sync: {formatTimeAgo(tool.lastSync)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityFeed() {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-4 w-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DataIntegrations() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);

  const handleOpenModal = (toolId: string) => {
    setSelectedTool(toolId);
    switch (toolId) {
      case 'linkedin-sales-navigator':
        setShowLinkedInModal(true);
        break;
    }
  };

  // Calculate overall stats
  const totalConnectedTools = integrationTools.filter(tool => tool.status === 'connected').length;
  const totalContacts = integrationTools.reduce((sum, tool) => {
    const contactStat = tool.stats.find(stat => stat.label.includes('Found') || stat.label.includes('Enriched'));
    return sum + (contactStat ? Number.parseInt(contactStat.value.replace(/,/g, '')) : 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data & Integrations</h1>
          <p className="text-gray-600 mt-1">Manage your lead generation and data enrichment tools</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Tools</p>
                <p className="text-2xl font-bold text-blue-600">{totalConnectedTools}</p>
                <p className="text-xs text-gray-500">of {integrationTools.length} total</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-green-600">{totalContacts.toLocaleString()}</p>
                <p className="text-xs text-gray-500">enriched this month</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Quality</p>
                <p className="text-2xl font-bold text-purple-600">92%</p>
                <p className="text-xs text-gray-500">average accuracy</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Used</p>
                <p className="text-2xl font-bold text-orange-600">68%</p>
                <p className="text-xs text-gray-500">of monthly limit</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Integration Tools */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Integration Tools</h2>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {integrationTools.map((tool) => (
              <IntegrationCard 
                key={tool.id} 
                tool={tool} 
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <ActivityFeed />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Search LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Enrich Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Lists
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <LinkedInSalesNavigatorModal 
        isOpen={showLinkedInModal} 
        onClose={() => setShowLinkedInModal(false)} 
      />
    </div>
  );
}