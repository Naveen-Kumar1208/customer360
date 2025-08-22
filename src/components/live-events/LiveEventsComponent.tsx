"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Play,
  Pause,
  Activity,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Mail,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Eye,
  MapPin,
  Clock,
  Zap,
  TrendingUp,
  Download,
  Share,
  Settings,
  RefreshCw
} from "lucide-react";

// Sample live events data
const liveEvents = [
  {
    id: "EVT-001",
    timestamp: "2024-01-15 14:32:15",
    customerName: "Sarah Johnson",
    customerId: "CUST-002",
    email: "sarah.johnson@email.com",
    eventType: "page_view",
    eventData: {
      page: "/products/analytics-platform",
      title: "Analytics Platform - Features",
      duration: 145,
      referrer: "Google Search"
    },
    device: "desktop",
    browser: "Chrome",
    location: "Los Angeles, CA",
    ip: "192.168.1.100",
    sessionId: "sess_abc123"
  },
  {
    id: "EVT-002",
    timestamp: "2024-01-15 14:31:42",
    customerName: "Mike Chen",
    customerId: "CUST-005",
    email: "mike.chen@company.com",
    eventType: "form_submission",
    eventData: {
      form: "Contact Sales",
      fields: ["name", "email", "company", "interest"],
      source: "Pricing Page"
    },
    device: "mobile",
    browser: "Safari",
    location: "Seattle, WA", 
    ip: "192.168.1.200",
    sessionId: "sess_def456"
  },
  {
    id: "EVT-003",
    timestamp: "2024-01-15 14:31:20",
    customerName: "Emily Davis",
    customerId: "CUST-004",
    email: "emily.davis@startup.io",
    eventType: "purchase",
    eventData: {
      product: "Premium Plan",
      amount: 299.00,
      currency: "USD",
      paymentMethod: "credit_card"
    },
    device: "desktop",
    browser: "Firefox",
    location: "Boston, MA",
    ip: "192.168.1.300",
    sessionId: "sess_ghi789"
  },
  {
    id: "EVT-004",
    timestamp: "2024-01-15 14:30:55",
    customerName: "Alex Thompson",
    customerId: "PROS-001",
    email: "alex.thompson@company.com",
    eventType: "email_open",
    eventData: {
      campaign: "Product Demo Invitation",
      subject: "See how our platform can transform your business",
      openCount: 2
    },
    device: "mobile",
    browser: "Gmail App",
    location: "New York, NY",
    ip: "192.168.1.400",
    sessionId: "sess_jkl012"
  },
  {
    id: "EVT-005", 
    timestamp: "2024-01-15 14:30:30",
    customerName: "David Wilson",
    customerId: "CUST-007",
    email: "david.wilson@enterprise.com",
    eventType: "video_play",
    eventData: {
      video: "Product Demo - Advanced Features",
      duration: 180,
      completion: 45
    },
    device: "desktop",
    browser: "Edge",
    location: "Chicago, IL",
    ip: "192.168.1.500",
    sessionId: "sess_mno345"
  }
];

const eventStats = {
  totalEvents: 15420,
  eventsLastHour: 234,
  activeUsers: 89,
  topEvents: [
    { type: "page_view", count: 8920, percentage: 57.8 },
    { type: "email_open", count: 2340, percentage: 15.2 },
    { type: "form_submission", count: 1560, percentage: 10.1 },
    { type: "purchase", count: 890, percentage: 5.8 },
    { type: "video_play", count: 1710, percentage: 11.1 }
  ]
};

export function LiveEventsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLive, setIsLive] = useState(true);
  const [activeTab, setActiveTab] = useState("events");
  const [eventFilter, setEventFilter] = useState("all");

  const getEventIcon = (eventType: string) => {
    const iconMap = {
      page_view: Globe,
      form_submission: MousePointer,
      purchase: ShoppingCart,
      email_open: Mail,
      video_play: Play,
      download: Download,
      click: MousePointer
    };
    return iconMap[eventType] || Activity;
  };

  const getEventBadge = (eventType: string) => {
    const badgeConfig = {
      page_view: { color: "bg-blue-100 text-blue-800", text: "Page View" },
      form_submission: { color: "bg-green-100 text-green-800", text: "Form Submit" },
      purchase: { color: "bg-purple-100 text-purple-800", text: "Purchase" },
      email_open: { color: "bg-orange-100 text-orange-800", text: "Email Open" },
      video_play: { color: "bg-pink-100 text-pink-800", text: "Video Play" },
      download: { color: "bg-cyan-100 text-cyan-800", text: "Download" }
    };
    const config = badgeConfig[eventType] || { color: "bg-gray-100 text-gray-800", text: eventType };
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const getDeviceIcon = (device: string) => {
    return device === 'mobile' ? Smartphone : Monitor;
  };

  const filteredEvents = liveEvents.filter(event => {
    const matchesSearch = event.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = eventFilter === 'all' || event.eventType === eventFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Events</h1>
          <p className="text-muted-foreground">
            Monitor real-time customer activities and interactions across all touchpoints
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className={isLive ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isLive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isLive ? "Live" : "Paused"}
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Today</p>
                <p className="text-2xl font-bold">{eventStats.totalEvents.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Last Hour</p>
                <p className="text-2xl font-bold">{eventStats.eventsLastHour}</p>
                <p className="text-xs text-orange-600 mt-1">+8% vs avg hour</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{eventStats.activeUsers}</p>
                <p className="text-xs text-purple-600 mt-1">Currently online</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Events/User</p>
                <p className="text-2xl font-bold">{(eventStats.totalEvents / eventStats.activeUsers).toFixed(1)}</p>
                <p className="text-xs text-cyan-600 mt-1">per active session</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Live Event Stream</TabsTrigger>
          <TabsTrigger value="analytics">Event Analytics</TabsTrigger>
          <TabsTrigger value="settings">Monitoring Settings</TabsTrigger>
        </TabsList>

        {/* Live Event Stream Tab */}
        <TabsContent value="events" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events by customer, email, or event type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Events</option>
              <option value="page_view">Page Views</option>
              <option value="form_submission">Form Submissions</option>
              <option value="purchase">Purchases</option>
              <option value="email_open">Email Opens</option>
              <option value="video_play">Video Plays</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>

          {/* Live Event Feed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live Event Stream
                  </CardTitle>
                  <CardDescription>
                    Real-time customer interactions as they happen
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEvents.map((event) => {
                  const EventIcon = getEventIcon(event.eventType);
                  const DeviceIcon = getDeviceIcon(event.device);
                  
                  return (
                    <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <EventIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{event.customerName}</span>
                          <Badge variant="outline" className="text-xs">{event.customerId}</Badge>
                          {getEventBadge(event.eventType)}
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-1">
                          {event.email}
                        </div>
                        
                        <div className="text-sm">
                          {event.eventType === 'page_view' && (
                            <span>Viewed <span className="font-medium">{event.eventData.page}</span> for {event.eventData.duration}s</span>
                          )}
                          {event.eventType === 'form_submission' && (
                            <span>Submitted <span className="font-medium">{event.eventData.form}</span> form</span>
                          )}
                          {event.eventType === 'purchase' && (
                            <span>Purchased <span className="font-medium">{event.eventData.product}</span> for ${event.eventData.amount}</span>
                          )}
                          {event.eventType === 'email_open' && (
                            <span>Opened email <span className="font-medium">"{event.eventData.subject}"</span></span>
                          )}
                          {event.eventType === 'video_play' && (
                            <span>Watched <span className="font-medium">{event.eventData.video}</span> ({event.eventData.completion}% complete)</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">
                          {event.timestamp}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <DeviceIcon className="h-3 w-3" />
                          <span>{event.device}</span>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Event Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Distribution</CardTitle>
                <CardDescription>Breakdown of event types in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventStats.topEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getEventBadge(event.type)}
                        <span className="text-sm">{event.count.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${event.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{event.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
                <CardDescription>Live performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Events per minute</span>
                    <span className="text-lg font-bold">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Unique users (1h)</span>
                    <span className="text-lg font-bold">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion rate</span>
                    <span className="text-lg font-bold text-green-600">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg session duration</span>
                    <span className="text-lg font-bold">4m 32s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Tracking Configuration</CardTitle>
              <CardDescription>Configure which events to track and monitor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Page View Tracking</div>
                    <div className="text-sm text-muted-foreground">Track page visits and time spent</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Form Submission Tracking</div>
                    <div className="text-sm text-muted-foreground">Monitor form interactions and completions</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Purchase Event Tracking</div>
                    <div className="text-sm text-muted-foreground">Track transactions and revenue events</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Email Engagement Tracking</div>
                    <div className="text-sm text-muted-foreground">Monitor email opens, clicks, and replies</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}