"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AuthGuard } from "@/app/authGuard";
import { StatCard } from "@/components/dashboard/StatCard";
import { AreaChart } from "@/components/dashboard/AreaChart";
import { BarChart } from "@/components/dashboard/BarChart";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { ConsentPerformance } from "@/components/dashboard/ConsentPerformance";
import { UserOverviewChart } from "@/components/dashboard/UserOverviewChart";
import { TrafficSourcesChart } from "@/components/dashboard/TrafficSourcesChart";
import { CombinedKeyMetricsChart } from "@/components/dashboard/CombinedKeyMetricsChart";
import { ChannelDistributionChart } from "@/components/dashboard/ChannelDistributionChart";
import { ChannelTimelineChart } from "@/components/dashboard/ChannelTimelineChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  dashboardStats,
  tagFiringData,
  tagFiringCategories,
  geoLocationData,
  geoLocationCategories,
  userOverviewData,
  userOverviewCategories,
  recentActivityLog,
  consentPerformanceData,
  trafficOverviewData,
  trafficOverviewCategories,
  trafficSourcesData,
  keyMetricsData,
  channelActivityData,
  channelDistributionData,
} from "@/lib/data/tagDashboardData";
import {
  Users,
  Percent,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "@/app/authContext";

// Move static data outside component to prevent recreation
const iconComponents = {
  users: Users,
  percent: Percent,
  clock: Clock,
  bounce: ArrowUpRight
};

const iconColors = {
  users: "text-blue-500",
  percent: "text-indigo-500",
  clock: "text-amber-500",
  bounce: "text-green-500"
};

const iconKeys = ['users', 'percent', 'clock', 'bounce'] as const;

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState('Day');
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Redirect based on user role
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'agent') {
        router.replace('/agent/dashboard');
        return;
      } else if (user.role === 'investor') {
        router.replace('/investor/dashboard');
        return;
      }
      // Organization/admin users stay on main dashboard
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);



  // Dynamic Dashboard Stats
  const getDynamicStats = () => {
    const baseStats = [
      { title: "Total Visitors", iconColor: "blue" },
      { title: "Conversion Rate", iconColor: "indigo" },
      { title: "Avg. Session", iconColor: "amber" },
      { title: "Bounce Rate", iconColor: "green" }
    ];

    switch(timeFilter) {
      case 'Day':
        return baseStats.map((stat, index) => ({
          ...stat,
          value: ['4.2k', '2.1%', '1:45', '38%'][index],
          description: ['Today', 'Avg. per session', 'Duration (min:sec)', 'Single-page visits'][index],
          trend: { value: [12, 3, 8, 5][index], isPositive: [true, true, true, false][index] }
        }));
      case 'Weekly':
        return baseStats.map((stat, index) => ({
          ...stat,
          value: ['28.5k', '2.8%', '2:05', '40%'][index],
          description: ['This week', 'Avg. per session', 'Duration (min:sec)', 'Single-page visits'][index],
          trend: { value: [10, 4, 6, 3][index], isPositive: [true, true, true, false][index] }
        }));
      case 'Monthly':
        return baseStats.map((stat, index) => ({
          ...stat,
          value: ['145k', '3.2%', '2:15', '42%'][index],
          description: ['Monthly', 'Avg. per session', 'Duration (min:sec)', 'Single-page visits'][index],
          trend: { value: [8, 5, 7, 3][index], isPositive: [true, true, true, false][index] }
        }));
      default:
        return dashboardStats;
    }
  };

  // Dynamic Traffic Overview Data - Ensure all values are non-zero
  const getDynamicTrafficData = () => {
    switch(timeFilter) {
      case 'Day':
        return [
          { name: "00:00", DirectTraffic: 850, OrganicSearch: 1420, SocialMedia: 680, EmailMarketing: 420, Referral: 280 },
          { name: "04:00", DirectTraffic: 1200, OrganicSearch: 1880, SocialMedia: 920, EmailMarketing: 580, Referral: 380 },
          { name: "08:00", DirectTraffic: 1850, OrganicSearch: 2850, SocialMedia: 1420, EmailMarketing: 920, Referral: 620 },
          { name: "12:00", DirectTraffic: 2200, OrganicSearch: 3200, SocialMedia: 1680, EmailMarketing: 1080, Referral: 720 },
          { name: "16:00", DirectTraffic: 2050, OrganicSearch: 2950, SocialMedia: 1520, EmailMarketing: 980, Referral: 680 },
          { name: "20:00", DirectTraffic: 1680, OrganicSearch: 2420, SocialMedia: 1220, EmailMarketing: 780, Referral: 520 }
        ];
      case 'Weekly':
        return [
          { name: "Mon", DirectTraffic: 8500, OrganicSearch: 14200, SocialMedia: 6800, EmailMarketing: 4200, Referral: 2800 },
          { name: "Tue", DirectTraffic: 9200, OrganicSearch: 15600, SocialMedia: 7500, EmailMarketing: 4800, Referral: 3200 },
          { name: "Wed", DirectTraffic: 10800, OrganicSearch: 17200, SocialMedia: 8200, EmailMarketing: 5200, Referral: 3500 },
          { name: "Thu", DirectTraffic: 11500, OrganicSearch: 18800, SocialMedia: 9200, EmailMarketing: 5800, Referral: 3900 },
          { name: "Fri", DirectTraffic: 12200, OrganicSearch: 19500, SocialMedia: 9800, EmailMarketing: 6200, Referral: 4200 },
          { name: "Sat", DirectTraffic: 9800, OrganicSearch: 16200, SocialMedia: 8500, EmailMarketing: 5500, Referral: 3700 },
          { name: "Sun", DirectTraffic: 8200, OrganicSearch: 13800, SocialMedia: 7200, EmailMarketing: 4600, Referral: 3100 }
        ];
      case 'Monthly':
        return trafficOverviewData.map(item => ({
          ...item,
          DirectTraffic: Math.max(item.DirectTraffic, 1000),
          OrganicSearch: Math.max(item.OrganicSearch, 1000),
          SocialMedia: Math.max(item.SocialMedia, 1000),
          EmailMarketing: Math.max(item.EmailMarketing, 1000),
          Referral: Math.max(item.Referral, 1000)
        }));
      default:
        return trafficOverviewData;
    }
  };

  // Dynamic Traffic Sources Data
  const getDynamicTrafficSources = () => {
    switch(timeFilter) {
      case 'Day':
        return [
          { name: "Organic Search", value: 38, color: "hsl(220, 70%, 50%)" },
          { name: "Direct Traffic", value: 32, color: "hsl(160, 60%, 45%)" },
          { name: "Social Media", value: 18, color: "hsl(280, 65%, 60%)" },
          { name: "Email Marketing", value: 8, color: "hsl(30, 70%, 50%)" },
          { name: "Referral", value: 4, color: "hsl(340, 65%, 60%)" }
        ];
      case 'Weekly':
        return [
          { name: "Organic Search", value: 40, color: "hsl(220, 70%, 50%)" },
          { name: "Direct Traffic", value: 30, color: "hsl(160, 60%, 45%)" },
          { name: "Social Media", value: 16, color: "hsl(280, 65%, 60%)" },
          { name: "Email Marketing", value: 9, color: "hsl(30, 70%, 50%)" },
          { name: "Referral", value: 5, color: "hsl(340, 65%, 60%)" }
        ];
      case 'Monthly':
        return trafficSourcesData;
      default:
        return trafficSourcesData;
    }
  };

  // Dynamic User Overview Data - Return specific data based on filter
  const getDynamicUserData = () => {
    switch(timeFilter) {
      case 'Day':
        return userOverviewData.daily;
      case 'Weekly':
        return userOverviewData.weekly;
      case 'Monthly':
        return userOverviewData.monthly;
      default:
        return userOverviewData.monthly;
    }
  };

  // Dynamic Geolocation Data - Ensure minimum values
  const getDynamicGeoData = () => {
    switch(timeFilter) {
      case 'Day':
        return geoLocationData.map(item => ({ ...item, Users: Math.max(Math.round(item.Users * 0.035), 50) }));
      case 'Weekly':
        return geoLocationData.map(item => ({ ...item, Users: Math.max(Math.round(item.Users * 0.25), 200) }));
      case 'Monthly':
        return geoLocationData.map(item => ({ ...item, Users: Math.max(item.Users, 500) }));
      default:
        return geoLocationData;
    }
  };

  // Dynamic Key Metrics - Fix: Update history data as well
  const getDynamicKeyMetrics = () => {
    switch(timeFilter) {
      case 'Day':
        return {
          conversion: { 
            current: 2.1, 
            previous: 1.9, 
            trend: 10.5, 
            isPositive: true,
            history: [
              { month: 'Hour 1', value: 1.8 },
              { month: 'Hour 2', value: 1.9 },
              { month: 'Hour 3', value: 2.0 },
              { month: 'Hour 4', value: 2.0 },
              { month: 'Hour 5', value: 2.1 },
              { month: 'Hour 6', value: 2.1 }
            ]
          },
          engagement: { 
            current: 52.3, 
            previous: 48.7, 
            trend: 7.4, 
            isPositive: true,
            history: [
              { month: 'Hour 1', value: 48.2 },
              { month: 'Hour 2', value: 49.1 },
              { month: 'Hour 3', value: 50.5 },
              { month: 'Hour 4', value: 51.2 },
              { month: 'Hour 5', value: 51.8 },
              { month: 'Hour 6', value: 52.3 }
            ]
          },
          retention: { 
            current: 44.2, 
            previous: 46.1, 
            trend: 4.1, 
            isPositive: false,
            history: [
              { month: 'Hour 1', value: 46.1 },
              { month: 'Hour 2', value: 45.8 },
              { month: 'Hour 3', value: 45.2 },
              { month: 'Hour 4', value: 44.8 },
              { month: 'Hour 5', value: 44.5 },
              { month: 'Hour 6', value: 44.2 }
            ]
          }
        };
      case 'Weekly':
        return {
          conversion: { 
            current: 2.8, 
            previous: 2.5, 
            trend: 12.0, 
            isPositive: true,
            history: [
              { month: 'Week 1', value: 2.3 },
              { month: 'Week 2', value: 2.5 },
              { month: 'Week 3', value: 2.6 },
              { month: 'Week 4', value: 2.7 },
              { month: 'Week 5', value: 2.8 },
              { month: 'Week 6', value: 2.8 }
            ]
          },
          engagement: { 
            current: 55.5, 
            previous: 51.2, 
            trend: 8.4, 
            isPositive: true,
            history: [
              { month: 'Week 1', value: 50.2 },
              { month: 'Week 2', value: 51.5 },
              { month: 'Week 3', value: 52.8 },
              { month: 'Week 4', value: 54.1 },
              { month: 'Week 5', value: 54.8 },
              { month: 'Week 6', value: 55.5 }
            ]
          },
          retention: { 
            current: 43.1, 
            previous: 44.8, 
            trend: 3.8, 
            isPositive: false,
            history: [
              { month: 'Week 1', value: 44.8 },
              { month: 'Week 2', value: 44.2 },
              { month: 'Week 3', value: 43.8 },
              { month: 'Week 4', value: 43.5 },
              { month: 'Week 5', value: 43.3 },
              { month: 'Week 6', value: 43.1 }
            ]
          }
        };
      case 'Monthly':
        return keyMetricsData;
      default:
        return keyMetricsData;
    }
  };

  // Dynamic Channel Data - Make truly dynamic with different distributions
  const getDynamicChannelData = () => {
    switch(timeFilter) {
      case 'Day':
        return [
          { channel: "Web App", users: 28 },
          { channel: "Mobile App", users: 45 },
          { channel: "Social Media", users: 18 },
          { channel: "Email", users: 9 }
        ];
      case 'Weekly':
        return [
          { channel: "Web App", users: 32 },
          { channel: "Mobile App", users: 42 },
          { channel: "Social Media", users: 16 },
          { channel: "Email", users: 10 }
        ];
      case 'Monthly':
        return [
          { channel: "Web App", users: 35 },
          { channel: "Mobile App", users: 40 },
          { channel: "Social Media", users: 15 },
          { channel: "Email", users: 10 }
        ];
      default:
        return channelDistributionData;
    }
  };

  // Dynamic Channel Activity Data - Fix: Ensure consistent time slot structure
  const getDynamicChannelActivity = () => {
    switch(timeFilter) {
      case 'Day':
        return [
          { channel: "Web App", "00:00-04:00": 280, "04:00-08:00": 450, "08:00-12:00": 1320, "12:00-16:00": 1540, "16:00-20:00": 1340, "20:00-24:00": 790 },
          { channel: "Mobile App", "00:00-04:00": 450, "04:00-08:00": 550, "08:00-12:00": 1420, "12:00-16:00": 1620, "16:00-20:00": 1920, "20:00-24:00": 1320 },
          { channel: "Social Media", "00:00-04:00": 520, "04:00-08:00": 320, "08:00-12:00": 880, "12:00-16:00": 950, "16:00-20:00": 1080, "20:00-24:00": 910 },
          { channel: "Email", "00:00-04:00": 140, "04:00-08:00": 300, "08:00-12:00": 780, "12:00-16:00": 660, "16:00-20:00": 570, "20:00-24:00": 250 }
        ];
      case 'Weekly':
        return [
          { channel: "Web App", "00:00-04:00": 6200, "04:00-08:00": 7100, "08:00-12:00": 8400, "12:00-16:00": 8900, "16:00-20:00": 9200, "20:00-24:00": 7800 },
          { channel: "Mobile App", "00:00-04:00": 7800, "04:00-08:00": 8600, "08:00-12:00": 9400, "12:00-16:00": 10200, "16:00-20:00": 11500, "20:00-24:00": 10800 },
          { channel: "Social Media", "00:00-04:00": 4200, "04:00-08:00": 3800, "08:00-12:00": 5200, "12:00-16:00": 5800, "16:00-20:00": 6400, "20:00-24:00": 7200 },
          { channel: "Email", "00:00-04:00": 2800, "04:00-08:00": 3200, "08:00-12:00": 3600, "12:00-16:00": 3900, "16:00-20:00": 4200, "20:00-24:00": 3500 }
        ];
      case 'Monthly':
        return channelActivityData;
      default:
        return channelActivityData;
    }
  };

  // Dynamic Activity Log
  const getDynamicActivityLog = () => {
    const dayActivities = [
      { id: "act-day-001", event: "Real-time Event", description: "New user session started from mobile", timestamp: "2 minutes ago", status: "success" },
      { id: "act-day-002", event: "Conversion", description: "Purchase completed on checkout page", timestamp: "8 minutes ago", status: "success" },
      { id: "act-day-003", event: "Page View", description: "High traffic on pricing page detected", timestamp: "15 minutes ago", status: "success" },
      { id: "act-day-004", event: "Alert", description: "Session duration below average", timestamp: "32 minutes ago", status: "warning" },
      { id: "act-day-005", event: "Update", description: "Analytics configuration updated", timestamp: "1 hour ago", status: "success" }
    ];

    const weeklyActivities = [
      { id: "act-week-001", event: "Weekly Report", description: "Traffic increased by 12% this week", timestamp: "1 day ago", status: "success" },
      { id: "act-week-002", event: "Campaign Update", description: "Social media campaign performance improved", timestamp: "2 days ago", status: "success" },
      { id: "act-week-003", event: "Integration", description: "New analytics tool connected successfully", timestamp: "3 days ago", status: "success" },
      { id: "act-week-004", event: "Maintenance", description: "Server maintenance completed", timestamp: "4 days ago", status: "success" },
      { id: "act-week-005", event: "Security", description: "Security scan completed successfully", timestamp: "6 days ago", status: "success" }
    ];

    switch(timeFilter) {
      case 'Day': return dayActivities;
      case 'Weekly': return weeklyActivities;
      case 'Monthly': return recentActivityLog;
      default: return recentActivityLog;
    }
  };

  // Dynamic Consent Data
  const getDynamicConsentData = () => {
    switch(timeFilter) {
      case 'Day':
        return [{ category: "Accept All", percentage: 58 }, { category: "Accept Selected", percentage: 26 }, { category: "Reject All", percentage: 16 }];
      case 'Weekly':
        return [{ category: "Accept All", percentage: 60 }, { category: "Accept Selected", percentage: 24 }, { category: "Reject All", percentage: 16 }];
      case 'Monthly':
        return consentPerformanceData;
      default:
        return consentPerformanceData;
    }
  };

  const dynamicStats = getDynamicStats();
  const dynamicTrafficData = getDynamicTrafficData();
  const dynamicTrafficSources = getDynamicTrafficSources();
  const dynamicUserData = getDynamicUserData();
  const dynamicGeoData = getDynamicGeoData();
  const dynamicKeyMetrics = getDynamicKeyMetrics();
  const dynamicChannelData = getDynamicChannelData();
  const dynamicChannelActivity = getDynamicChannelActivity();
  const dynamicActivityLog = getDynamicActivityLog();
  const dynamicConsentData = getDynamicConsentData();

  // Show loading if redirecting
  if (!isLoading && isAuthenticated && user && (user.role === 'agent' || user.role === 'investor')) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f6f8fb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }
  
  return (
    <AuthGuard>
      <DashboardLayout>
      {/* Show loading while initializing */}
      {(isMounted && isLoading) ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Track your Site Here!</h1>
              <p className="text-muted-foreground">
                Overview of your website performance and visitor analytics
              </p>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Day">Day</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {dynamicStats.map((stat, index) => {
              const iconKey = iconKeys[index];
              const IconComponent = iconComponents[iconKey];
              return (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  description={stat.description}
                  icon={<IconComponent className={`h-5 w-5 ${iconColors[iconKey]}`} />}
                  iconColor={stat.iconColor}
                  trend={stat.trend}
                />
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AreaChart
              title={`Traffic Overview - ${timeFilter}`}
              data={dynamicTrafficData}
              categories={trafficOverviewCategories}
            />
            <TrafficSourcesChart
              title={`Traffic Sources - ${timeFilter}`}
              data={dynamicTrafficSources}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <UserOverviewChart
              title={`Users Overview - ${timeFilter}`}
              data={dynamicUserData}
              categories={userOverviewCategories}
            />
            <BarChart
              title={`Visitors by Geolocation - ${timeFilter}`}
              data={dynamicGeoData}
              categories={geoLocationCategories}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Key Performance Metrics - {timeFilter}</h3>
              </div>
              <CombinedKeyMetricsChart
                conversionRate={dynamicKeyMetrics.conversion}
                engagementRate={dynamicKeyMetrics.engagement}
                retentionRate={dynamicKeyMetrics.retention}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Channel Distribution - {timeFilter}</h3>
              </div>
              <ChannelDistributionChart
                data={dynamicChannelData}
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Channel Activity Timeline - {timeFilter}</h3>
              </div>
              <ChannelTimelineChart
                data={dynamicChannelActivity}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ActivityLog title={`Recent Activity - ${timeFilter}`} activities={dynamicActivityLog} />
            <ConsentPerformance title={`Consent Banner Performance - ${timeFilter}`} data={dynamicConsentData} />
          </div>
        </div>
      )}
      </DashboardLayout>
    </AuthGuard>
  );
}