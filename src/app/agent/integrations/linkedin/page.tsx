"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Settings,
  Eye,
  Plus,
  Search,
  Download,
  Zap,
  Target,
  BarChart3,
  AlertTriangle
} from "lucide-react";
import { LinkedInSalesNavigatorModal } from "@/components/integrations/LinkedInSalesNavigatorModal";

const recentLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'VP of Engineering',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    connections: '2nd degree',
    mutualConnections: 12,
    profileUrl: '#',
    matched: true,
    score: 92
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Director of Product',
    company: 'InnovateLabs',
    location: 'New York, NY',
    connections: '3rd degree',
    mutualConnections: 8,
    profileUrl: '#',
    matched: true,
    score: 88
  },
  {
    id: '3',
    name: 'Jennifer Lee',
    title: 'Chief Marketing Officer',
    company: 'GrowthCo',
    location: 'Austin, TX',
    connections: '2nd degree',
    mutualConnections: 15,
    profileUrl: '#',
    matched: true,
    score: 85
  }
];

const savedSearches = [
  { id: '1', name: 'SaaS CTOs', results: 1847, lastRun: '2 hours ago', alerts: true },
  { id: '2', name: 'Marketing Directors - Enterprise', results: 932, lastRun: '1 day ago', alerts: true },
  { id: '3', name: 'VP Engineering - Series B', results: 445, lastRun: '3 days ago', alerts: false }
];

export default function LinkedInSalesNavigator() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Linkedin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">LinkedIn Sales Navigator</h1>
            <p className="text-gray-600 mt-1">Advanced lead prospecting and social selling</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Open Navigator
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leads Found</p>
                <p className="text-2xl font-bold text-blue-600">2,847</p>
                <p className="text-xs text-gray-500">this month</p>
              </div>
              <Search className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">InMail Credits</p>
                <p className="text-2xl font-bold text-green-600">23/50</p>
                <p className="text-xs text-gray-500">remaining</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-purple-600">34%</p>
                <p className="text-xs text-gray-500">+5% vs last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saved Searches</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
                <p className="text-xs text-gray-500">active alerts</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Leads
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowModal(true)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.title}</p>
                        <p className="text-sm text-gray-500">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        {lead.score}% match
                      </Badge>
                      <Button size="sm">
                        <Mail className="w-3 h-3 mr-1" />
                        InMail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Sync</span>
                  <span className="text-sm font-medium">5 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Quality</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Searches */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedSearches.map((search) => (
                  <div key={search.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{search.name}</h4>
                      {search.alerts && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Alerts
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{search.results} results • {search.lastRun}</p>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      <Search className="w-3 h-3 mr-1" />
                      Run Search
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowModal(true)}>
                  <Search className="mr-2 h-4 w-4" />
                  New Search
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowModal(true)}>
                  <Mail className="mr-2 h-4 w-4" />
                  InMail Templates
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowModal(true)}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Leads
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Integration Modal */}
      <LinkedInSalesNavigatorModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}