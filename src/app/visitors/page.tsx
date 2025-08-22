"use client";

import { useState, useEffect } from 'react';
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  activeSampleUsers,
  funnelData,
  pagePerformanceData,
  trafficSourcesData,
  recentEvents,
  frictionPointsData,
  systemAlertsData,
  userJourneysData,
  conversionTabData,
  pagesTabData,
  eventsTabData
} from "@/lib/data/visitorsData";
import {
  socialMediaMetrics,
  keywordPerformanceData,
  topLandingPages
} from "@/lib/data/tofuData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserJourneysTab } from "@/components/visitors/UserJourneysTab";
import { ConversionTab } from "@/components/visitors/ConversionTab";
import { PagesTab } from "@/components/visitors/PagesTab";
import { EventsTab } from "@/components/visitors/EventsTab";


const VisitorsPage = () => {
  const [activeSessions, setActiveSessions] = useState(185);
  const [timeRange, setTimeRange] = useState('24h');
  const [timeFilter, setTimeFilter] = useState('Day');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Dynamic active sessions based on filter
  useEffect(() => {
    const getActiveSessionsForFilter = () => {
      switch(timeFilter) {
        case 'Day': return 45;
        case 'weekly': return 128;
        case 'monthly': return 185;
        default: return 185;
      }
    };
    
    setActiveSessions(getActiveSessionsForFilter());
  }, [timeFilter]);

  // Simulating active session count changing slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSessions(prev => {
        const baseValue = timeFilter === 'Day' ? 45 : timeFilter === 'weekly' ? 128 : 185;
        const change = Math.floor(Math.random() * 6) - 2;
        return Math.max(baseValue - 5, Math.min(baseValue + 5, prev + change));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [timeFilter]);

  const toggleExpandSection = (sectionKey: string) => {
    setExpandedSection(expandedSection === sectionKey ? null : sectionKey);
  };

  const formatNum = (num: number) => {
    return num >= 1000 ? `${(num/1000).toFixed(1)}k` : num.toString();
  };

  return (
    <StaticExportLayout>
      <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold ml-2">Visitor Analytics</h1>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-600">
                  Track visitor behavior and engagement metrics
                </p>
              </div>
              {activeTab === 'overview' && (
                <div className="flex items-center space-x-4">
                  <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day">Day</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center bg-green-100 rounded-md px-3 py-1.5">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm mr-2 text-green-800">Active Users:</span>
                    <span className="text-xl font-bold text-green-800">{activeSessions}</span>
                    <span className="ml-1 text-xs text-green-600">↑12%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b">
              <nav className="flex space-x-8">
                {['overview', 'user journeys', 'conversion', 'pages', 'events', 'social media', 'seo'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Dashboard Content */}
          {activeTab === 'overview' && (
            <OverviewContent 
              expandedSection={expandedSection}
              toggleExpandSection={toggleExpandSection}
              formatNum={formatNum}
              activeSessions={activeSessions}
              funnelData={funnelData}
              activeSampleUsers={activeSampleUsers}
              pagePerformanceData={pagePerformanceData}
              trafficSourcesData={trafficSourcesData}
              recentEvents={recentEvents}
              frictionPointsData={frictionPointsData}
              systemAlertsData={systemAlertsData}
              timeFilter={timeFilter}
            />
          )}
          
          {activeTab === 'user journeys' && (
            <div className="mt-6">
              <UserJourneysTab />
            </div>
          )}
          
          {activeTab === 'conversion' && (
            <div className="mt-6">
              <ConversionTab />
            </div>
          )}
          
          {activeTab === 'pages' && (
            <div className="mt-6">
              <PagesTab />
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="mt-6">
              <EventsTab />
            </div>
          )}
          
          {activeTab === 'social media' && (
            <SocialMediaTab socialMediaMetrics={socialMediaMetrics} />
          )}
          
          {activeTab === 'seo' && (
            <SEOTab 
              keywordPerformanceData={keywordPerformanceData}
              topLandingPages={topLandingPages}
            />
          )}
      </div>
    </StaticExportLayout>
  );
};

// Overview Tab Content
const OverviewContent = ({ 
  expandedSection, 
  toggleExpandSection, 
  formatNum, 
  activeSessions, 
  funnelData,
  activeSampleUsers,
  pagePerformanceData,
  trafficSourcesData,
  recentEvents,
  frictionPointsData,
  systemAlertsData,
  timeFilter
}: any) => {
  // Dynamic data based on time filter
  const getFilteredMetrics = () => {
    const baseMetrics = {
      totalVisitors: 10245,
      conversionRate: funnelData.conversionRate,
      avgSessionDuration: '6:12',
      bounceRate: 32
    };

    switch(timeFilter) {
      case 'Day':
        return {
          ...baseMetrics,
          totalVisitors: 1245,
          conversionRate: 2.8,
          avgSessionDuration: '4:32',
          bounceRate: 28,
          growth: '+12.4%',
          convGrowth: '+1.2%',
          durGrowth: '+0:45',
          bounceGrowth: '-2.3%'
        };
      case 'weekly':
        return {
          ...baseMetrics,
          totalVisitors: 8650,
          conversionRate: 3.2,
          avgSessionDuration: '5:48',
          bounceRate: 30,
          growth: '+8.7%',
          convGrowth: '+0.8%',
          durGrowth: '+1:12',
          bounceGrowth: '-1.8%'
        };
      case 'monthly':
        return {
          ...baseMetrics,
          growth: '+15.2%',
          convGrowth: '+2.1%',
          durGrowth: '+1:35',
          bounceGrowth: '-3.2%'
        };
      default:
        return {
          ...baseMetrics,
          growth: '+12.4%',
          convGrowth: '+1.2%',
          durGrowth: '+1:05',
          bounceGrowth: '+2.3%'
        };
    }
  };

  const filteredMetrics = getFilteredMetrics();

  // Dynamic Live Activity Data - synchronized with page performance
  const getLiveActivityData = () => {
    const getTopPagesForFilter = () => {
      switch(timeFilter) {
        case 'Day': return ['/home', '/features', '/pricing', '/blog'];
        case 'weekly': return ['/home', '/features', '/pricing', '/signup'];
        case 'monthly': return ['/home', '/features', '/pricing', '/checkout'];
        default: return ['/home', '/features', '/pricing', '/blog'];
      }
    };

    const topPages = getTopPagesForFilter();
    const baseUsers = [
      { id: 'u_28492', location: 'New York, US', device: 'desktop', browser: 'Chrome', lastEvent: 'Clicked "Enterprise Plan"' },
      { id: 'anon_47281', location: 'London, UK', device: 'mobile', browser: 'Safari', lastEvent: 'Scrolled to "Integrations"' },
      { id: 'u_59372', location: 'Tokyo, JP', device: 'tablet', browser: 'Firefox', lastEvent: 'Submitted payment info' },
      { id: 'anon_61043', location: 'Berlin, DE', device: 'mobile', browser: 'Chrome', lastEvent: 'Viewed article' }
    ];

    switch(timeFilter) {
      case 'Day':
        return baseUsers.map((user, index) => ({
          ...user,
          currentPage: topPages[index],
          timeOnSite: ['2:15', '0:45', '1:32', '0:28'][index],
          events: [15, 8, 12, 3][index]
        }));
      case 'weekly':
        return baseUsers.map((user, index) => ({
          ...user,
          currentPage: topPages[index],
          timeOnSite: ['3:42', '1:18', '5:25', '0:52'][index],
          events: [22, 12, 28, 7][index]
        }));
      case 'monthly':
        return baseUsers.map((user, index) => ({
          ...user,
          currentPage: topPages[index],
          timeOnSite: ['4:32', '1:15', '8:47', '0:42'][index],
          events: [28, 12, 45, 5][index]
        }));
      default:
        return baseUsers.map((user, index) => ({
          ...user,
          currentPage: topPages[index],
          timeOnSite: ['4:32', '1:15', '8:47', '0:42'][index],
          events: [28, 12, 45, 5][index]
        }));
    }
  };

  // Dynamic Page Performance Data
  const getPagePerformanceData = () => {
    const basePages = [
      { path: '/home', engagementScore: 8.7 },
      { path: '/features', engagementScore: 9.2 },
      { path: '/pricing', engagementScore: 7.8 },
      { path: '/blog', engagementScore: 6.5 },
      { path: '/signup', engagementScore: 9.5 }
    ];

    switch(timeFilter) {
      case 'Day':
        return basePages.map(page => ({
          ...page,
          views: {
            '/home': 1250,
            '/features': 875,
            '/pricing': 620,
            '/blog': 430,
            '/signup': 310
          }[page.path],
          avgTimeOnPage: {
            '/home': '1:45',
            '/features': '2:12',
            '/pricing': '2:30',
            '/blog': '1:20',
            '/signup': '1:10'
          }[page.path],
          exitRate: {
            '/home': 12,
            '/features': 8,
            '/pricing': 15,
            '/blog': 22,
            '/signup': 6
          }[page.path],
          scrollDepth: {
            '/home': 78,
            '/features': 85,
            '/pricing': 58,
            '/blog': 65,
            '/signup': 95
          }[page.path]
        }));
      case 'weekly':
        return basePages.map(page => ({
          ...page,
          views: {
            '/home': 8750,
            '/features': 6125,
            '/pricing': 4340,
            '/blog': 3010,
            '/signup': 2170
          }[page.path],
          avgTimeOnPage: {
            '/home': '2:15',
            '/features': '3:42',
            '/pricing': '3:00',
            '/blog': '1:50',
            '/signup': '1:30'
          }[page.path],
          exitRate: {
            '/home': 14,
            '/features': 10,
            '/pricing': 16,
            '/blog': 24,
            '/signup': 7
          }[page.path],
          scrollDepth: {
            '/home': 82,
            '/features': 88,
            '/pricing': 62,
            '/blog': 68,
            '/signup': 98
          }[page.path]
        }));
      case 'monthly':
        return basePages.map(page => ({
          ...page,
          views: {
            '/home': 12500,
            '/features': 8750,
            '/pricing': 6200,
            '/blog': 4300,
            '/signup': 3100
          }[page.path],
          avgTimeOnPage: {
            '/home': '2:45',
            '/features': '4:12',
            '/pricing': '3:30',
            '/blog': '2:20',
            '/signup': '1:50'
          }[page.path],
          exitRate: {
            '/home': 15,
            '/features': 12,
            '/pricing': 18,
            '/blog': 25,
            '/signup': 8
          }[page.path],
          scrollDepth: {
            '/home': 85,
            '/features': 92,
            '/pricing': 65,
            '/blog': 70,
            '/signup': 100
          }[page.path]
        }));
      default:
        return pagePerformanceData;
    }
  };

  // Dynamic Traffic Sources Data
  const getTrafficSourcesData = () => {
    const baseSources = [
      { source: 'Organic Search', convRate: 4.2, engagementScore: 7.8 },
      { source: 'Direct', convRate: 5.7, engagementScore: 8.5 },
      { source: 'Social Media', convRate: 3.1, engagementScore: 6.2 },
      { source: 'Referral', convRate: 6.5, engagementScore: 8.2 },
      { source: 'Email', convRate: 7.8, engagementScore: 9.1 }
    ];

    switch(timeFilter) {
      case 'Day':
        return baseSources.map(source => ({
          ...source,
          sessions: {
            'Organic Search': 850,
            'Direct': 620,
            'Social Media': 480,
            'Referral': 320,
            'Email': 280
          }[source.source],
          avgSessionDuration: {
            'Organic Search': '2:25',
            'Direct': '3:10',
            'Social Media': '1:15',
            'Referral': '2:45',
            'Email': '4:20'
          }[source.source]
        }));
      case 'weekly':
        return baseSources.map(source => ({
          ...source,
          sessions: {
            'Organic Search': 5950,
            'Direct': 4340,
            'Social Media': 3360,
            'Referral': 2240,
            'Email': 1960
          }[source.source],
          avgSessionDuration: {
            'Organic Search': '2:55',
            'Direct': '3:40',
            'Social Media': '1:45',
            'Referral': '3:15',
            'Email': '4:50'
          }[source.source]
        }));
      case 'monthly':
        return baseSources.map(source => ({
          ...source,
          sessions: {
            'Organic Search': 8500,
            'Direct': 6200,
            'Social Media': 4800,
            'Referral': 3200,
            'Email': 2800
          }[source.source],
          avgSessionDuration: {
            'Organic Search': '3:25',
            'Direct': '4:10',
            'Social Media': '2:15',
            'Referral': '3:45',
            'Email': '5:20'
          }[source.source]
        }));
      default:
        return trafficSourcesData;
    }
  };

  const dynamicLiveActivity = getLiveActivityData();
  const dynamicPagePerformance = getPagePerformanceData();
  const dynamicTrafficSources = getTrafficSourcesData();

  // Data validation and synchronization
  const validateDataSync = () => {
    const totalPageViews = dynamicPagePerformance.reduce((sum, page) => sum + page.views, 0);
    const totalTrafficSessions = dynamicTrafficSources.reduce((sum, source) => sum + source.sessions, 0);
    const activeUserCount = dynamicLiveActivity.length;
    
    // Ensure data relationships are logical
    console.log(`Filter: ${timeFilter}, Pages: ${totalPageViews}, Sessions: ${totalTrafficSessions}, Active: ${activeUserCount}`);
  };
  
  validateDataSync();

  return (
  <div className="mt-6">
    {/* Key Metrics with Vibrant Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 font-medium">Total Visitors</div>
              <div className="text-2xl font-bold mt-1 text-gray-800">{filteredMetrics.totalVisitors.toLocaleString()}</div>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {filteredMetrics.growth}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-[#17c8c8]/10 to-white">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-[#17c8c8] h-1.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Target: 8,000</span>
            <span className="font-medium">70% achieved</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 font-medium">Conversion Rate</div>
              <div className="text-2xl font-bold mt-1 text-gray-800">{filteredMetrics.conversionRate}%</div>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {filteredMetrics.convGrowth}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-white">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${filteredMetrics.conversionRate * 10}%` }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Target: 30%</span>
            <span className="font-medium">112% achieved</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 font-medium">Avg. Session Duration</div>
              <div className="text-2xl font-bold mt-1 text-gray-800">{filteredMetrics.avgSessionDuration}</div>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              {filteredMetrics.durGrowth}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-[#17c8c8]/10 to-white">
          <div className="flex text-xs space-x-1">
            <div className="px-2 py-1 rounded bg-[#17c8c8]/20 text-[#17c8c8]/90 flex-1 text-center">
              Mobile: 4:35
            </div>
            <div className="px-2 py-1 rounded bg-[#17c8c8]/15 text-[#17c8c8]/80 flex-1 text-center">
              Desktop: 7:48
            </div>
            <div className="px-2 py-1 rounded bg-purple-100 text-purple-700 flex-1 text-center">
              Tablet: 5:26
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 font-medium">Bounce Rate</div>
              <div className="text-2xl font-bold mt-1 text-gray-800">{filteredMetrics.bounceRate}%</div>
            </div>
            <div className={`flex items-center px-2 py-1 rounded text-xs font-medium ${
              filteredMetrics.bounceGrowth.startsWith('-') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={filteredMetrics.bounceGrowth.startsWith('-') ? "M19 14l-7 7m0 0l-7-7m7 7V3" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
              </svg>
              {filteredMetrics.bounceGrowth}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-white">
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${filteredMetrics.bounceRate}%` }}></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Target: ≤ 30%</span>
            <span className="font-medium text-amber-600">Action needed</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Journey Flow and Live Insights */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* User Journey Flow */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="font-semibold text-gray-800">User Journey Flow</h3>
          </div>
          <div className="flex items-center">
            <button className="px-2 py-1 mr-2 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors">
              Customize
            </button>
            <button 
              onClick={() => toggleExpandSection('journey')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {expandedSection === 'journey' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="p-5">
          <div className="h-72 flex items-center justify-center relative">
            {/* Enhanced Sankey-like flow visualization */}
            <svg width="100%" height="100%" className="max-w-3xl mx-auto">
              {/* Entry nodes */}
              <g>
                <rect x="50" y="30" width="120" height="60" rx="6" fill="#e3f2fd" stroke="#90caf9" />
                <text x="110" y="60" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1e40af">Homepage</text>
                <text x="110" y="80" textAnchor="middle" fontSize="10" fill="#666">5,240 users</text>
                
                <rect x="50" y="120" width="120" height="60" rx="6" fill="#e3f2fd" stroke="#90caf9" />
                <text x="110" y="150" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1e40af">Blog</text>
                <text x="110" y="170" textAnchor="middle" fontSize="10" fill="#666">2,180 users</text>
                
                <rect x="50" y="210" width="120" height="60" rx="6" fill="#e3f2fd" stroke="#90caf9" />
                <text x="110" y="240" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1e40af">Campaign Landing</text>
                <text x="110" y="260" textAnchor="middle" fontSize="10" fill="#666">2,580 users</text>
              </g>
              
              {/* Middle nodes */}
              <g>
                <rect x="250" y="70" width="120" height="60" rx="6" fill="#ede7f6" stroke="#b39ddb" />
                <text x="310" y="100" textAnchor="middle" fontSize="12" fontWeight="500" fill="#5e35b1">Product Pages</text>
                <text x="310" y="120" textAnchor="middle" fontSize="10" fill="#666">7,240 users</text>
                
                <rect x="250" y="170" width="120" height="60" rx="6" fill="#ede7f6" stroke="#b39ddb" />
                <text x="310" y="200" textAnchor="middle" fontSize="12" fontWeight="500" fill="#5e35b1">Pricing</text>
                <text x="310" y="220" textAnchor="middle" fontSize="10" fill="#666">2,580 users</text>
              </g>
              
              {/* End nodes */}
              <g>
                <rect x="450" y="100" width="120" height="60" rx="6" fill="#e8f5e9" stroke="#81c784" />
                <text x="510" y="130" textAnchor="middle" fontSize="12" fontWeight="500" fill="#2e7d32">Sign Up</text>
                <text x="510" y="150" textAnchor="middle" fontSize="10" fill="#666">3,360 users</text>
              </g>
              
              {/* Flow paths with animated gradients */}
              <defs>
                <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#90caf9', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#b39ddb', stopOpacity: 0.6 }} />
                </linearGradient>
                <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#b39ddb', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: '#81c784', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>
              
              {/* Flow connections */}
              <path d="M 170 60 Q 210 60 250 100" stroke="url(#flow1)" strokeWidth="20" fill="none" opacity="0.7" />
              <path d="M 170 150 Q 210 150 250 100" stroke="url(#flow1)" strokeWidth="15" fill="none" opacity="0.7" />
              <path d="M 170 240 Q 210 240 250 200" stroke="url(#flow1)" strokeWidth="12" fill="none" opacity="0.7" />
              <path d="M 370 100 Q 410 100 450 130" stroke="url(#flow2)" strokeWidth="18" fill="none" opacity="0.7" />
              <path d="M 370 200 Q 410 200 450 130" stroke="url(#flow2)" strokeWidth="10" fill="none" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Live Activity Feed */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <h3 className="font-semibold text-gray-800">Live Activity</h3>
            </div>
            <div className="text-xs text-gray-500">
              <div>{activeSessions} active</div>
              <div className="text-[10px] text-blue-600 mt-1">{timeFilter.toUpperCase()}</div>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-72 p-4 space-y-3">
          {dynamicLiveActivity.map((user) => (
            <div key={user.id} className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-800">{user.id}</span>
                </div>
                <span className="text-xs text-gray-500">{user.timeOnSite}</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="text-xs text-gray-500">
                  Cookie ID: {user.id.replace('u_', 'ck_').replace('anon_', 'ck_')}
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{user.device}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>{user.currentPage}</span>
                </div>
                <div className="pt-1 mt-1 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-[#17c8c8] font-medium">Last: {user.lastEvent}</span>
                    <div className="flex space-x-1">
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">click</span>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">scroll</span>
                      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">hover</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Performance Metrics and Traffic Sources */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Page Performance */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Page Performance</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{timeFilter.toUpperCase()}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {dynamicPagePerformance.map((page, index) => (
              <div key={index} className="hover:bg-gray-50 rounded-md p-3 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{page.path}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      page.engagementScore >= 8 ? 'bg-green-100 text-green-700' : 
                      page.engagementScore >= 6 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {page.engagementScore}/10
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 text-xs text-gray-600">
                  <div>
                    <span className="block text-gray-500">Views</span>
                    <span className="font-medium">{formatNum(page.views)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Avg. Time</span>
                    <span className="font-medium">{page.avgTimeOnPage}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Exit Rate</span>
                    <span className="font-medium">{page.exitRate}%</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Scroll</span>
                    <span className="font-medium">{page.scrollDepth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Traffic Sources</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{timeFilter.toUpperCase()}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {dynamicTrafficSources.map((source, index) => (
              <div key={index} className="hover:bg-gray-50 rounded-md p-3 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{source.source}</span>
                  <span className="text-sm font-semibold text-gray-700">{formatNum(source.sessions)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-gradient-to-r from-[#17c8c8] to-blue-500 h-2 rounded-full" 
                    style={{ width: `${(source.sessions / dynamicTrafficSources[0].sessions) * 100}%` }}></div>
                </div>
                <div className="grid grid-cols-3 text-xs text-gray-600">
                  <div>
                    <span className="block text-gray-500">Conv. Rate</span>
                    <span className="font-medium">{source.convRate}%</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Engagement</span>
                    <span className="font-medium">{source.engagementScore}/10</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Avg. Duration</span>
                    <span className="font-medium">{source.avgSessionDuration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// Social Media Tab Component
const SocialMediaTab = ({ socialMediaMetrics }) => {
  const campaignData = [
    { name: "Summer Sale 2024", platform: "Facebook", spend: 12500, revenue: 45200, roi: 261, clicks: 2840, conversions: 142 },
    { name: "Product Launch", platform: "Instagram", spend: 8700, revenue: 32100, roi: 269, clicks: 1950, conversions: 98 },
    { name: "Holiday Campaign", platform: "LinkedIn", spend: 15200, revenue: 52800, roi: 247, clicks: 3120, conversions: 186 },
    { name: "Brand Awareness", platform: "Twitter", spend: 6800, revenue: 18400, roi: 170, clicks: 1560, conversions: 74 }
  ];

  return (
    <div className="mt-6">
      <div className="space-y-6">
        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialMediaMetrics.platforms.map((platform, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{platform.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-medium">{platform.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-medium">{platform.engagement}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Posts</span>
                    <span className="font-medium">{platform.posts}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reach</span>
                    <span className="font-medium">{platform.reach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Clicks</span>
                    <span className="font-medium">{platform.clicks.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Spend Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Market Spend Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Total Spend</div>
                <div className="text-2xl font-bold text-blue-800">${campaignData.reduce((sum, c) => sum + c.spend, 0).toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Total Revenue</div>
                <div className="text-2xl font-bold text-green-800">${campaignData.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Average ROI</div>
                <div className="text-2xl font-bold text-purple-800">{Math.round(campaignData.reduce((sum, c) => sum + c.roi, 0) / campaignData.length)}%</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <div className="text-sm text-orange-600 font-medium">Total Conversions</div>
                <div className="text-2xl font-bold text-orange-800">{campaignData.reduce((sum, c) => sum + c.conversions, 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="pb-3">Campaign</th>
                    <th className="pb-3">Platform</th>
                    <th className="pb-3 text-right">Spend</th>
                    <th className="pb-3 text-right">Revenue</th>
                    <th className="pb-3 text-right">ROI</th>
                    <th className="pb-3 text-right">Clicks</th>
                    <th className="pb-3 text-right">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{campaign.name}</td>
                      <td className="py-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {campaign.platform}
                        </span>
                      </td>
                      <td className="py-3 text-right">${campaign.spend.toLocaleString()}</td>
                      <td className="py-3 text-right font-medium text-green-600">${campaign.revenue.toLocaleString()}</td>
                      <td className="py-3 text-right">
                        <span className={`font-medium ${
                          campaign.roi >= 250 ? 'text-green-600' : 
                          campaign.roi >= 200 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {campaign.roi}%
                        </span>
                      </td>
                      <td className="py-3 text-right">{campaign.clicks.toLocaleString()}</td>
                      <td className="py-3 text-right font-medium">{campaign.conversions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// SEO Tab Component
const SEOTab = ({ keywordPerformanceData, topLandingPages }) => (
  <div className="mt-6">
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3">Keyword</th>
                  <th className="pb-3 text-right">Impressions</th>
                  <th className="pb-3 text-right">Clicks</th>
                  <th className="pb-3 text-right">CTR</th>
                  <th className="pb-3 text-right">Avg. Position</th>
                </tr>
              </thead>
              <tbody>
                {keywordPerformanceData.map((keyword, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">{keyword.keyword}</td>
                    <td className="py-3 text-right">{keyword.impressions.toLocaleString()}</td>
                    <td className="py-3 text-right">{keyword.clicks.toLocaleString()}</td>
                    <td className="py-3 text-right">{keyword.ctr}%</td>
                    <td className="py-3 text-right">{keyword.avgPosition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Landing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topLandingPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div>
                  <p className="font-medium">{page.page}</p>
                  <p className="text-sm text-gray-500">{page.visits.toLocaleString()} visits</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-gray-600">Bounce: </span>
                    <span className="font-medium">{page.bounceRate}%</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Avg. Time: </span>
                    <span className="font-medium">{page.avgTime}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default VisitorsPage;