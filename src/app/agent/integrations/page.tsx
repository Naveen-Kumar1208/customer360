"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Linkedin,
  Target,
  UserPlus,
  Users,
  ChevronRight,
  CheckCircle,
  Database,
  Globe,
  TrendingUp,
  BarChart3,
  Zap
} from "lucide-react";

const integrations = [
  {
    id: 'lusha',
    name: 'Lusha Integration',
    description: 'B2B contact enrichment and prospecting platform',
    icon: Users,
    status: 'connected',
    href: '/agent/integrations/lusha',
    stats: { contacts: '4,231', accuracy: '89%' },
    color: 'blue'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Sales Navigator',
    description: 'Advanced lead prospecting and social selling',
    icon: Linkedin,
    status: 'connected',
    href: '/agent/integrations/linkedin',
    stats: { leads: '2,847', credits: '23/50' },
    color: 'blue'
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    description: 'All-in-one sales intelligence platform',
    icon: Target,
    status: 'connected',
    href: '/agent/integrations/apollo',
    stats: { contacts: '1,523', accuracy: '94%' },
    color: 'purple'
  },
  {
    id: 'tools',
    name: 'Lead Building Tools',
    description: 'Comprehensive lead generation and list building suite',
    icon: UserPlus,
    status: 'connected',
    href: '/agent/integrations/tools',
    stats: { lists: '3', contacts: '2,773' },
    color: 'green'
  }
];

export default function IntegrationsOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-3 w-3" />;
      default: return <CheckCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data & Integrations</h1>
          <p className="text-gray-600 mt-1">Manage your lead generation and data enrichment tools</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Tools</p>
                <p className="text-2xl font-bold text-blue-600">{integrations.filter(i => i.status === 'connected').length}</p>
                <p className="text-xs text-gray-500">of {integrations.length} total</p>
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
                <p className="text-2xl font-bold text-green-600">11,374</p>
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
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
                <p className="text-xs text-gray-500">running processes</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Tools */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Available Integrations</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Link key={integration.id} href={integration.href}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg bg-${integration.color}-100 flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(integration.status)}>
                          {getStatusIcon(integration.status)}
                          <span className="ml-1 capitalize">{integration.status}</span>
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(integration.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-lg font-semibold text-gray-900">{value}</p>
                          <p className="text-xs text-gray-600 capitalize">{key}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}