"use client";

import React, { useState, useEffect } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Search,
  Filter,
  Plus,
  Route,
  Users,
  Play,
  Pause,
  MoreHorizontal,
  BarChart3,
  Calendar,
  TrendingUp,
  ArrowRight,
  Eye,
  Trash2,
  X,
  CheckCircle,
  Clock,
  Activity,
  Target,
  Zap,
  GitBranch,
  Mail,
  Smartphone,
  MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

// Sample journey data
const journeys = [
  {
    id: "JB-001",
    name: "Welcome Onboarding Flow",
    status: "Running",
    createdBy: "Sarah Johnson",
    createdDate: "2024-01-15",
    targetSegment: "New Customers",
    totalUsers: 2450,
    activeUsers: 1820,
    completionRate: 74.3,
    conversionRate: 23.5,
    totalConversions: 578,
    lastModified: "2 hours ago",
    channels: ["email", "sms", "push"],
    description: "Multi-channel welcome series for new customer onboarding",
    canvasNodes: [
      {
        id: "start-1",
        type: 'trigger',
        title: 'Customer Signup',
        description: 'Triggers when a new customer signs up',
        position: { x: 50, y: 50 },
        config: { event: 'user_signup' },
        connections: ['email-1'],
        status: 'completed',
        completedAt: '2025-07-16 10:30:00',
        completedData: {
          users: 12450,
          conversionRate: 100,
          avgProcessingTime: '0.5s'
        }
      },
      {
        id: "email-1",
        type: 'action',
        title: 'Welcome Email',
        description: 'Send welcome email with account setup instructions',
        position: { x: 50, y: 200 },
        config: { 
          channel: 'email',
          template: 'welcome-email-template',
          subject: 'Welcome to our platform!',
          delay: 0
        },
        connections: ['sms-notification'],
        status: 'completed',
        completedAt: '2025-07-16 10:31:15',
        completedData: {
          users: 12450,
          sent: 12450,
          delivered: 12320,
          openRate: 72.8,
          avgProcessingTime: '1.2s'
        }
      },
      {
        id: "sms-notification",
        type: 'action',
        title: 'SMS Notification',
        description: 'Send SMS notification to users',
        position: { x: 50, y: 350 },
        config: { 
          channel: 'sms',
          template: 'notification-template'
        },
        connections: ['delay-1'],
        status: 'failed',
        failedAt: '2025-07-16 14:22:30',
        failureData: {
          reason: 'SMS Gateway timeout',
          errorCode: 'GATEWAY_TIMEOUT_500',
          affectedUsers: 342,
          lastAttempt: '2025-07-16 14:22:30',
          retryCount: 3
        }
      },
      {
        id: "delay-1",
        type: 'delay',
        title: 'Wait 2 Days',
        description: 'Wait 2 days before next step',
        position: { x: 50, y: 500 },
        config: { duration: 2, unit: 'days' },
        connections: ['condition-1'],
        status: 'pending',
        processingData: {
          usersInQueue: 10150,
          estimatedCompletion: '2025-07-18 10:31:15',
          remainingTime: '1 day 3 hours'
        }
      },
      {
        id: "condition-1",
        type: 'condition',
        title: 'Email Opened?',
        description: 'Check if welcome email was opened',
        position: { x: 50, y: 650 },
        config: { 
          field: 'email_opened',
          operator: 'equals',
          value: true
        },
        connections: ['sms-1', 'email-2'],
        status: 'pending'
      },
      {
        id: "sms-1",
        type: 'action',
        title: 'Follow-up SMS',
        description: 'Send SMS for users who opened email',
        position: { x: 300, y: 800 },
        config: { 
          channel: 'sms',
          template: 'followup-sms-template',
          message: 'Thanks for joining! Complete your profile to get started.'
        },
        connections: [],
        status: 'pending'
      },
      {
        id: "email-2",
        type: 'action',
        title: 'Re-engagement Email',
        description: 'Send different email for users who didn\'t open',
        position: { x: -200, y: 800 },
        config: { 
          channel: 'email',
          template: 'reengagement-email-template',
          subject: 'Don\'t miss out on getting started!'
        },
        connections: [],
        status: 'pending'
      }
    ]
  },
  {
    id: "JB-002", 
    name: "Cart Abandonment Recovery",
    status: "Running",
    createdBy: "Mike Chen",
    createdDate: "2024-01-08",
    targetSegment: "Cart Abandoners",
    totalUsers: 5670,
    activeUsers: 4320,
    completionRate: 45.2,
    conversionRate: 18.7,
    totalConversions: 1061,
    lastModified: "1 day ago",
    channels: ["email", "whatsapp"],
    description: "Automated recovery flow for abandoned shopping carts",
    canvasNodes: [
      {
        id: "cart-trigger",
        type: 'trigger',
        title: 'Cart Abandoned',
        description: 'Triggers when cart is abandoned for 1 hour',
        position: { x: 50, y: 50 },
        config: { event: 'cart_abandoned', delay: 3600 },
        connections: ['wait-24h'],
        status: 'completed',
        completedAt: '2025-07-16 09:00:00',
        completedData: {
          users: 5670,
          conversionRate: 100,
          avgProcessingTime: '0.2s'
        }
      },
      {
        id: "wait-24h",
        type: 'delay',
        title: 'Wait 24 Hours',
        description: 'Wait 24 hours before sending reminder',
        position: { x: 50, y: 200 },
        config: { duration: 24, unit: 'hours' },
        connections: ['recovery-email'],
        status: 'completed',
        completedAt: '2025-07-16 09:00:00',
        completedData: {
          users: 5670,
          conversionRate: 100,
          avgProcessingTime: '24h'
        }
      },
      {
        id: "recovery-email",
        type: 'action',
        title: 'Recovery Email',
        description: 'Send cart recovery email',
        position: { x: 50, y: 350 },
        config: { 
          channel: 'email',
          template: 'cart-recovery-template',
          subject: 'Complete your purchase!'
        },
        connections: ['whatsapp-followup'],
        status: 'running',
        processingData: {
          usersInQueue: 4320,
          estimatedCompletion: '2025-07-17 15:30:00',
          remainingTime: '6 hours'
        }
      },
      {
        id: "whatsapp-followup",
        type: 'action',
        title: 'WhatsApp Follow-up',
        description: 'Send WhatsApp message if email not opened',
        position: { x: 50, y: 500 },
        config: { 
          channel: 'whatsapp',
          template: 'cart-whatsapp-template'
        },
        connections: [],
        status: 'pending'
      }
    ]
  },
  {
    id: "JB-003",
    name: "VIP Customer Engagement",
    status: "Paused", 
    createdBy: "Emma Wilson",
    createdDate: "2024-01-03",
    targetSegment: "VIP Customers",
    totalUsers: 890,
    activeUsers: 0,
    completionRate: 89.1,
    conversionRate: 67.4,
    totalConversions: 600,
    lastModified: "3 days ago",
    channels: ["email", "sms", "whatsapp"],
    description: "Exclusive engagement flow for high-value customers",
    canvasNodes: [
      {
        id: "vip-trigger",
        type: 'trigger',
        title: 'VIP Status Achieved',
        description: 'Triggers when customer reaches VIP status',
        position: { x: 50, y: 50 },
        config: { event: 'vip_status_achieved' },
        connections: ['welcome-email'],
        status: 'completed',
        completedAt: '2025-07-14 10:00:00',
        completedData: {
          users: 890,
          conversionRate: 100,
          avgProcessingTime: '0.3s'
        }
      },
      {
        id: "welcome-email",
        type: 'action',
        title: 'VIP Welcome Email',
        description: 'Send exclusive VIP welcome email',
        position: { x: 50, y: 200 },
        config: { 
          channel: 'email',
          template: 'vip-welcome-template',
          subject: 'Welcome to VIP!'
        },
        connections: ['personal-call'],
        status: 'paused',
        pausedAt: '2025-07-14 14:00:00'
      },
      {
        id: "personal-call",
        type: 'action',
        title: 'Personal Call',
        description: 'Schedule personal call with VIP manager',
        position: { x: 50, y: 350 },
        config: { 
          channel: 'sms',
          template: 'vip-call-template'
        },
        connections: ['exclusive-offer'],
        status: 'paused',
        pausedAt: '2025-07-14 14:00:00'
      },
      {
        id: "exclusive-offer",
        type: 'action',
        title: 'Exclusive Offer',
        description: 'Send personalized WhatsApp offer',
        position: { x: 50, y: 500 },
        config: { 
          channel: 'whatsapp',
          template: 'vip-offer-template'
        },
        connections: [],
        status: 'paused',
        pausedAt: '2025-07-14 14:00:00'
      }
    ]
  },
  {
    id: "JB-004",
    name: "Re-engagement Campaign",
    status: "Draft",
    createdBy: "David Park",
    createdDate: "2024-01-12",
    targetSegment: "Inactive Users",
    totalUsers: 0,
    activeUsers: 0,
    completionRate: 0,
    conversionRate: 0,
    totalConversions: 0,
    lastModified: "5 days ago",
    channels: ["email", "push"],
    description: "Win-back campaign for inactive customers",
    canvasNodes: [
      {
        id: "inactive-trigger",
        type: 'trigger',
        title: 'User Inactive',
        description: 'Triggers when user inactive for 30 days',
        position: { x: 50, y: 50 },
        config: { event: 'user_inactive', duration: 30 },
        connections: ['winback-email'],
        status: 'pending'
      },
      {
        id: "winback-email",
        type: 'action',
        title: 'Win-back Email',
        description: 'Send re-engagement email',
        position: { x: 50, y: 200 },
        config: { 
          channel: 'email',
          template: 'winback-template',
          subject: 'We miss you!'
        },
        connections: ['push-reminder'],
        status: 'pending'
      },
      {
        id: "push-reminder",
        type: 'action',
        title: 'Push Reminder',
        description: 'Send push notification reminder',
        position: { x: 50, y: 350 },
        config: { 
          channel: 'push',
          template: 'push-winback-template'
        },
        connections: ['discount-offer'],
        status: 'pending'
      },
      {
        id: "discount-offer",
        type: 'action',
        title: 'Discount Offer',
        description: 'Send special discount offer',
        position: { x: 50, y: 500 },
        config: { 
          channel: 'email',
          template: 'discount-template'
        },
        connections: [],
        status: 'pending'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Running": return "bg-green-100 text-green-800";
    case "Paused": return "bg-yellow-100 text-yellow-800";
    case "Draft": return "bg-gray-100 text-gray-800";
    case "Completed": return "bg-[#e85b5e]/10 text-[#e85b5e]";
    case "Failed": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "email": return "📧";
    case "sms": return "📱";
    case "whatsapp": return "💬";
    case "push": return "🔔";
    default: return "📢";
  }
};

const getNodeIcon = (type: string) => {
  switch (type) {
    case 'trigger': return Zap;
    case 'action': return Target;
    case 'condition': return GitBranch;
    case 'delay': return Clock;
    case 'split': return GitBranch;
    default: return Target;
  }
};

const getNodeColor = (type: string) => {
  switch (type) {
    case 'trigger': return 'bg-[#e85b5e]';
    case 'action': return 'bg-green-500';
    case 'condition': return 'bg-purple-500';
    case 'delay': return 'bg-orange-500';
    case 'split': return 'bg-pink-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'pending': return Clock;
    case 'failed': return X;
    case 'running': return Play;
    case 'paused': return Pause;
    default: return Activity;
  }
};

const getNodeStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-green-500';
    case 'pending': return 'text-orange-500';
    case 'failed': return 'text-red-500';
    case 'running': return 'text-[#e85b5e]';
    case 'paused': return 'text-yellow-500';
    default: return 'text-gray-500';
  }
};

export default function JourneyBuilderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [allJourneys, setAllJourneys] = useState(journeys);
  const [previewJourney, setPreviewJourney] = useState<any>(null);
  const [modalType, setModalType] = useState<'preview' | 'overview'>('preview');

  // Load saved journeys from localStorage on component mount and when page becomes visible
  useEffect(() => {
    const loadSavedJourneys = () => {
      try {
        const savedJourneys = localStorage.getItem('saved_journeys');
        if (savedJourneys) {
          const parsedJourneys = JSON.parse(savedJourneys);
          console.log('Loaded saved journeys:', parsedJourneys);
          
          // Filter out journeys with problematic IDs (timestamp-based) to prevent routing issues
          const validJourneys = parsedJourneys.filter((journey: any) => {
            const idPart = journey.id.replace('JB-', '');
            // Accept 3-digit IDs (100-999) and some common timestamp patterns we've added to generateStaticParams
            return (idPart.length === 3 && /^\d{3}$/.test(idPart)) || 
                   ['456427', '123456', '234567', '345678', '456789', '567890', '678901', '789012',
                    '890123', '901234', '012345', '111111', '222222', '333333', '444444', '555555',
                    '666666', '777777', '888888', '999999'].includes(idPart);
          });
          
          if (validJourneys.length !== parsedJourneys.length) {
            console.log('Filtered out invalid journey IDs, updating localStorage');
            localStorage.setItem('saved_journeys', JSON.stringify(validJourneys));
          }
          
          // Reset to original journeys first, then merge with valid saved ones
          setAllJourneys([...journeys, ...validJourneys]);
        } else {
          console.log('No saved journeys found, showing sample data only');
          // If no saved journeys, just show the original sample data
          setAllJourneys(journeys);
        }
      } catch (error) {
        console.error('Error loading saved journeys:', error);
        setAllJourneys(journeys);
      }
    };

    loadSavedJourneys();

    // Listen for focus events to reload when user returns to the page
    const handleFocus = () => {
      loadSavedJourneys();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        loadSavedJourneys();
      }
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  // Handler functions for journey actions
  const handlePreviewJourney = (journey: any) => {
    setPreviewJourney(journey);
    setModalType('preview');
  };

  const handleOverviewJourney = (journey: any) => {
    setPreviewJourney(journey);
    setModalType('overview');
  };

  const handleRestartJourney = (journeyId: string) => {
    setAllJourneys(prevJourneys => 
      prevJourneys.map(journey => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      )
    );
    
    // Update the preview journey if it's currently being viewed
    setPreviewJourney(prev => 
      prev && prev.id === journeyId 
        ? { ...prev, status: 'Running', lastModified: 'Just now' }
        : prev
    );
    
    // Update localStorage for saved journeys
    try {
      const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
      const updatedSavedJourneys = savedJourneys.map((journey: any) => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      );
      localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
    } catch (error) {
      console.error('Error updating journey status in localStorage:', error);
    }
  };

  const handleStopJourney = (journeyId: string) => {
    setAllJourneys(prevJourneys => 
      prevJourneys.map(journey => 
        journey.id === journeyId 
          ? { ...journey, status: 'Paused', lastModified: 'Just now' }
          : journey
      )
    );
    
    // Update the preview journey if it's currently being viewed
    setPreviewJourney(prev => 
      prev && prev.id === journeyId 
        ? { ...prev, status: 'Paused', lastModified: 'Just now' }
        : prev
    );
    
    // Update localStorage for saved journeys
    try {
      const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
      const updatedSavedJourneys = savedJourneys.map((journey: any) => 
        journey.id === journeyId 
          ? { ...journey, status: 'Paused', lastModified: 'Just now' }
          : journey
      );
      localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
    } catch (error) {
      console.error('Error updating journey status in localStorage:', error);
    }
  };

  const handleStartJourney = (journeyId: string) => {
    setAllJourneys(prevJourneys => 
      prevJourneys.map(journey => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      )
    );
    
    // Update the preview journey if it's currently being viewed
    setPreviewJourney(prev => 
      prev && prev.id === journeyId 
        ? { ...prev, status: 'Running', lastModified: 'Just now' }
        : prev
    );
    
    // Update localStorage for saved journeys
    try {
      const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
      const updatedSavedJourneys = savedJourneys.map((journey: any) => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      );
      localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
    } catch (error) {
      console.error('Error updating journey status in localStorage:', error);
    }
  };

  const handlePauseJourney = (journeyId: string) => {
    setAllJourneys(prevJourneys => 
      prevJourneys.map(journey => 
        journey.id === journeyId 
          ? { ...journey, status: 'Paused', lastModified: 'Just now' }
          : journey
      )
    );
    
    // Update localStorage for saved journeys
    try {
      const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
      const updatedSavedJourneys = savedJourneys.map((journey: any) => 
        journey.id === journeyId 
          ? { ...journey, status: 'Paused', lastModified: 'Just now' }
          : journey
      );
      localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
    } catch (error) {
      console.error('Error updating journey status in localStorage:', error);
    }
  };

  const handleResumeJourney = (journeyId: string) => {
    setAllJourneys(prevJourneys => 
      prevJourneys.map(journey => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      )
    );
    
    // Update localStorage for saved journeys
    try {
      const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
      const updatedSavedJourneys = savedJourneys.map((journey: any) => 
        journey.id === journeyId 
          ? { ...journey, status: 'Running', lastModified: 'Just now' }
          : journey
      );
      localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
    } catch (error) {
      console.error('Error updating journey status in localStorage:', error);
    }
  };

  const handleDeleteJourney = (journeyId: string, journeyName: string) => {
    if (window.confirm(`Are you sure you want to delete "${journeyName}"? This action cannot be undone.`)) {
      setAllJourneys(prevJourneys => 
        prevJourneys.filter(journey => journey.id !== journeyId)
      );
      
      // Remove from localStorage for saved journeys
      try {
        const savedJourneys = JSON.parse(localStorage.getItem('saved_journeys') || '[]');
        const updatedSavedJourneys = savedJourneys.filter((journey: any) => journey.id !== journeyId);
        localStorage.setItem('saved_journeys', JSON.stringify(updatedSavedJourneys));
      } catch (error) {
        console.error('Error deleting journey from localStorage:', error);
      }
    }
  };

  const filteredJourneys = allJourneys.filter(journey => {
    const matchesSearch = journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journey.targetSegment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "active" && journey.status === "Running") ||
                      (selectedTab === "paused" && journey.status === "Paused") ||
                      (selectedTab === "draft" && journey.status === "Draft");
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6 p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Journey Builder</h1>
              <p className="text-muted-foreground">
                Design, automate, and track customer engagement flows
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Link href="/journey-builder/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Journey
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Journeys</CardTitle>
                <Route className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allJourneys.length}</div>
                <p className="text-xs text-muted-foreground">
                  {allJourneys.filter(j => j.status === "Running").length} running, {allJourneys.filter(j => j.status === "Paused").length} paused
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allJourneys.reduce((sum, j) => sum + j.activeUsers, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Across all journeys</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allJourneys.length > 0 ? Math.round(allJourneys.reduce((sum, j) => sum + j.completionRate, 0) / allJourneys.length) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">+2.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allJourneys.reduce((sum, j) => sum + j.totalConversions, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Tabs */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search journeys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Running</TabsTrigger>
                <TabsTrigger value="paused">Paused</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Journey List */}
          <div className="space-y-4">
            {filteredJourneys.map((journey) => (
              <Card key={journey.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold">{journey.name}</h3>
                        <Badge className={getStatusColor(journey.status)}>
                          {journey.status}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {journey.channels.map((channel, index) => (
                            <span key={index} className="text-sm">
                              {getChannelIcon(channel)}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{journey.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Target:</span>
                          <div className="font-medium">{journey.targetSegment}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Steps:</span>
                          <div className="font-medium">{journey.nodes?.length || 0} nodes</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Users:</span>
                          <div className="font-medium">{journey.activeUsers.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completion:</span>
                          <div className="font-medium">{journey.completionRate}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conversion:</span>
                          <div className="font-medium">{journey.conversionRate}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created:</span>
                          <div className="font-medium">{journey.createdDate}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Created by {journey.createdBy}</span>
                        <span>•</span>
                        <span>Modified {journey.lastModified}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Link href={`/journey-builder/${journey.id}/analytics`}>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreviewJourney(journey)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOverviewJourney(journey)}>
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Overview
                          </DropdownMenuItem>
                          {journey.status === "Running" ? (
                            <DropdownMenuItem onClick={() => handlePauseJourney(journey.id)}>
                              <Pause className="h-4 w-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleResumeJourney(journey.id)}>
                              <Play className="h-4 w-4 mr-2" />
                              Resume
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDeleteJourney(journey.id, journey.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {filteredJourneys.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No journeys found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? "Try adjusting your search or filters"
                    : "Get started by creating your first customer journey"
                  }
                </p>
                <Link href="/journey-builder/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Journey
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Journey Preview/Overview Modal */}
        {previewJourney && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {modalType === 'preview' ? 'Journey Status' : 'Journey Overview'} - {previewJourney.name}
                </h2>
                <button
                  onClick={() => setPreviewJourney(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {modalType === 'preview' ? (
                /* Status Component from Analytics */
                <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Journey Canvas - Node Status</CardTitle>
                    <p className="text-muted-foreground">
                      Visual representation of your journey with real-time node status
                    </p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[500px] bg-gray-50 relative overflow-auto" style={{ zIndex: 1 }}>
                      {/* Grid Background */}
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                      
                      {/* Connection Lines */}
                      <svg 
                        className="absolute inset-0 pointer-events-none" 
                        width="100%" 
                        height="100%"
                        style={{ zIndex: 1 }}
                      >
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 10 3.5, 0 7"
                              fill="#e85b5e"
                            />
                          </marker>
                        </defs>
                        
                        {(previewJourney.canvasNodes || previewJourney.nodes) && (previewJourney.canvasNodes || previewJourney.nodes).length > 0 ? (previewJourney.canvasNodes || previewJourney.nodes).map((node: any) => {
                          return node.connections.map((connectionId: any) => {
                            const targetNode = (previewJourney.canvasNodes || previewJourney.nodes).find((n: any) => n.id === connectionId);
                            if (!targetNode) return null;
                            
                            const nodeWidth = 220;
                            const nodeHeight = 80;
                            
                            const startX = node.position.x + 200 + (nodeWidth / 2);
                            const startY = node.position.y + 50 + nodeHeight;
                            const endX = targetNode.position.x + 200 + (nodeWidth / 2);
                            const endY = targetNode.position.y + 50;
                            
                            return (
                              <g key={`${node.id}-${connectionId}`}>
                                <line
                                  x1={startX}
                                  y1={startY}
                                  x2={endX}
                                  y2={endY}
                                  stroke="#e85b5e"
                                  strokeWidth="2"
                                  markerEnd="url(#arrowhead)"
                                />
                              </g>
                            );
                          });
                        }) : null}
                      </svg>


                      {/* Rendered Nodes */}
                      {(previewJourney.canvasNodes || previewJourney.nodes) && (previewJourney.canvasNodes || previewJourney.nodes).length > 0 ? (previewJourney.canvasNodes || previewJourney.nodes).map((node: any) => {
                        const Icon = getNodeIcon(node.type);
                        const StatusIcon = getStatusIcon(node.status);
                        const nodeColor = getNodeColor(node.type);
                        const statusColor = getNodeStatusColor(node.status);
                        
                        // Create tooltip content based on status
                        const renderTooltipContent = () => {
                          // For new nodes without status, default to pending
                          const nodeStatus = node.status || 'pending';
                          
                          if (nodeStatus === 'completed' && node.completedData) {
                            return (
                              <div className="space-y-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <div className="font-semibold text-green-700">✅ Completed Successfully</div>
                                </div>
                                <div className="space-y-2 text-sm text-green-800">
                                  <div className="flex justify-between">
                                    <span className="text-green-600">Completed:</span>
                                    <span className="font-medium">{node.completedAt}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-green-600">Users:</span>
                                    <span className="font-medium">{node.completedData.users?.toLocaleString()}</span>
                                  </div>
                                  {node.completedData.conversionRate && (
                                    <div className="flex justify-between">
                                      <span className="text-green-600">Conversion Rate:</span>
                                      <span className="font-medium">{node.completedData.conversionRate}%</span>
                                    </div>
                                  )}
                                  {node.completedData.openRate && (
                                    <div className="flex justify-between">
                                      <span className="text-green-600">Open Rate:</span>
                                      <span className="font-medium">{node.completedData.openRate}%</span>
                                    </div>
                                  )}
                                  {node.completedData.avgProcessingTime && (
                                    <div className="flex justify-between">
                                      <span className="text-green-600">Avg Processing:</span>
                                      <span className="font-medium">{node.completedData.avgProcessingTime}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          
                          if (nodeStatus === 'failed' && node.failureData) {
                            return (
                              <div className="space-y-3 p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-lg border border-red-200">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <div className="font-semibold text-red-700">❌ Failed</div>
                                </div>
                                <div className="space-y-2 text-sm text-red-800">
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Failed:</span>
                                    <span className="font-medium">{node.failedAt}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Reason:</span>
                                    <span className="font-medium">{node.failureData.reason}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Error Code:</span>
                                    <span className="font-medium font-mono text-xs">{node.failureData.errorCode}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Affected Users:</span>
                                    <span className="font-medium">{node.failureData.affectedUsers}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Retry Count:</span>
                                    <span className="font-medium">{node.failureData.retryCount}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-red-600">Last Attempt:</span>
                                    <span className="font-medium">{node.failureData.lastAttempt}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          if (node.status === 'running' && node.processingData) {
                            return (
                              <div className="space-y-3 p-4 bg-gradient-to-br from-[#e85b5e]/10 to-[#c7494c]/10 rounded-lg border border-[#e85b5e]/30">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-[#e85b5e] rounded-full animate-pulse"></div>
                                  <div className="font-semibold text-[#e85b5e]">▶️ Running</div>
                                </div>
                                <div className="space-y-2 text-sm text-[#c7494c]">
                                  <div className="flex justify-between">
                                    <span className="text-[#e85b5e]">Users in Queue:</span>
                                    <span className="font-medium">{node.processingData.usersInQueue}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#e85b5e]">Est. Completion:</span>
                                    <span className="font-medium">{node.processingData.estimatedCompletion}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-[#e85b5e]">Remaining Time:</span>
                                    <span className="font-medium">{node.processingData.remainingTime}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          return (
                            <div className="space-y-3 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="font-semibold text-gray-700">⏳ Pending</div>
                              </div>
                              <div className="text-sm text-gray-600">
                                Waiting for previous step to complete
                              </div>
                            </div>
                          );
                        };
                        
                        return (
                          <div
                            key={node.id}
                            className="absolute p-4 rounded-lg shadow-md bg-white border-2 border-gray-200 max-w-xs"
                            style={{
                              left: node.position.x + 200,
                              top: node.position.y + 50,
                              zIndex: 10,
                              width: '220px'
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className={`p-1 rounded ${nodeColor}`}>
                                  <Icon className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-medium text-sm">{node.title}</span>
                              </div>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div className="cursor-pointer">
                                    <StatusIcon className={`h-5 w-5 ${statusColor} hover:scale-110 transition-transform`} />
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent 
                                  className="w-80 p-0 border-0 shadow-xl"
                                  side="top"
                                  sideOffset={10}
                                  style={{ zIndex: 9999 }}
                                >
                                  {renderTooltipContent()}
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{node.description}</p>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {node.type}
                              </Badge>
                              <span className={`text-xs font-medium ${statusColor}`}>
                                {node.status}
                              </span>
                            </div>
                            
                            {/* Node Action Buttons */}
                            {modalType === 'preview' && (
                              <div className="mt-2">
                                {node.status === 'failed' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      // Update this specific node's status to running
                                      const updatedNodes = (previewJourney.canvasNodes || previewJourney.nodes).map((n: any) => 
                                        n.id === node.id ? { ...n, status: 'running' } : n
                                      );
                                      setPreviewJourney(prev => ({
                                        ...prev,
                                        canvasNodes: updatedNodes
                                      }));
                                    }}
                                    className="border-[#e85b5e] text-[#e85b5e] hover:bg-red-50 w-full text-xs h-6"
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Restart
                                  </Button>
                                )}
                                {node.status === 'running' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      // Update this specific node's status to paused
                                      const updatedNodes = (previewJourney.canvasNodes || previewJourney.nodes).map((n: any) => 
                                        n.id === node.id ? { ...n, status: 'paused' } : n
                                      );
                                      setPreviewJourney(prev => ({
                                        ...prev,
                                        canvasNodes: updatedNodes
                                      }));
                                    }}
                                    className="border-red-300 text-red-600 hover:bg-red-50 w-full text-xs h-6"
                                  >
                                    <Pause className="h-3 w-3 mr-1" />
                                    Stop
                                  </Button>
                                )}
                                {node.status === 'paused' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      // Update this specific node's status to running
                                      const updatedNodes = (previewJourney.canvasNodes || previewJourney.nodes).map((n: any) => 
                                        n.id === node.id ? { ...n, status: 'running' } : n
                                      );
                                      setPreviewJourney(prev => ({
                                        ...prev,
                                        canvasNodes: updatedNodes
                                      }));
                                    }}
                                    className="border-green-300 text-green-600 hover:bg-green-50 w-full text-xs h-6"
                                  >
                                    <Play className="h-3 w-3 mr-1" />
                                    Start
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Route className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Canvas Data Available</h3>
                            <p className="text-muted-foreground">
                              This journey doesn't have canvas node data to display.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Status Summary */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Status Legend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Completed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4 text-[#e85b5e]" />
                          <span className="text-sm">Running</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Pause className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Paused</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Pending</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Failed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Journey Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Steps:</span>
                          <span className="text-sm font-medium">{previewJourney.canvasNodes?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Completed:</span>
                          <span className="text-sm font-medium text-green-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'completed').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Running:</span>
                          <span className="text-sm font-medium text-[#e85b5e]">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'running').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Paused:</span>
                          <span className="text-sm font-medium text-yellow-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'paused').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Pending:</span>
                          <span className="text-sm font-medium text-orange-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'pending').length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Failed:</span>
                          <span className="text-sm font-medium text-red-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'failed').length || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Journey Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <Badge className={getStatusColor(previewJourney.status)}>
                            {previewJourney.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Active Users:</span>
                          <span className="text-sm font-medium">{previewJourney.activeUsers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Completion Rate:</span>
                          <span className="text-sm font-medium">{previewJourney.completionRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              ) : (
                /* Journey Overview */
                <div className="space-y-6">
                  {/* High-level Journey Overview */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Journey Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge className={getStatusColor(previewJourney.status)}>
                          {previewJourney.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last modified {previewJourney.lastModified}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{previewJourney.activeUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                          of {previewJourney.totalUsers.toLocaleString()} total
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{previewJourney.completionRate}%</div>
                        <p className="text-xs text-green-600">
                          {Math.round(previewJourney.totalUsers * previewJourney.completionRate / 100).toLocaleString()} completed
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{previewJourney.conversionRate}%</div>
                        <p className="text-xs text-[#e85b5e]">
                          {previewJourney.totalConversions.toLocaleString()} conversions
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Journey Description & Channels */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Route className="w-5 h-5" />
                          Journey Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                          <p className="text-sm">{previewJourney.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Target Segment</h4>
                          <Badge variant="outline">{previewJourney.targetSegment}</Badge>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Created By</h4>
                          <p className="text-sm">{previewJourney.createdBy} on {previewJourney.createdDate}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Communication Channels
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Active Channels</h4>
                          <div className="flex gap-2">
                            {previewJourney.channels.map((channel: string, index: number) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                <span>{getChannelIcon(channel)}</span>
                                {channel.charAt(0).toUpperCase() + channel.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Journey Steps</h4>
                          <p className="text-2xl font-bold">{previewJourney.canvasNodes?.length || 0}</p>
                          <p className="text-xs text-muted-foreground">Total automation steps</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'completed').length || 0}
                          </div>
                          <div className="text-sm text-green-800">Completed Steps</div>
                        </div>
                        <div className="text-center p-4 bg-[#e85b5e]/10 rounded-lg">
                          <div className="text-2xl font-bold text-[#e85b5e]">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'running').length || 0}
                          </div>
                          <div className="text-sm text-[#c7494c]">Running Steps</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {previewJourney.canvasNodes?.filter((n: any) => n.status === 'failed').length || 0}
                          </div>
                          <div className="text-sm text-red-800">Failed Steps</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Journey Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              previewJourney.completionRate > 70 ? 'bg-green-500' :
                              previewJourney.completionRate > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium">Journey Health Score</span>
                          </div>
                          <Badge variant="outline" className={`${
                            previewJourney.completionRate > 70 ? 'border-green-500 text-green-700' :
                            previewJourney.completionRate > 40 ? 'border-yellow-500 text-yellow-700' : 'border-red-500 text-red-700'
                          }`}>
                            {previewJourney.completionRate > 70 ? 'Excellent' :
                             previewJourney.completionRate > 40 ? 'Good' : 'Needs Attention'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-[#e85b5e]" />
                            <span className="text-sm font-medium">User Engagement</span>
                          </div>
                          <span className="text-sm font-semibold">
                            {Math.round((previewJourney.activeUsers / previewJourney.totalUsers) * 100)}% active
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Target className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium">Conversion Performance</span>
                          </div>
                          <Badge variant="outline" className={`${
                            previewJourney.conversionRate > 20 ? 'border-green-500 text-green-700' :
                            previewJourney.conversionRate > 10 ? 'border-yellow-500 text-yellow-700' : 'border-red-500 text-red-700'
                          }`}>
                            {previewJourney.conversionRate > 20 ? 'Above Average' :
                             previewJourney.conversionRate > 10 ? 'Average' : 'Below Average'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <Button onClick={() => setPreviewJourney(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </StaticExportLayout>
    </>
  );
}