"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Activity, AlertCircle } from 'lucide-react';

interface OverviewTabProps {
  activeSessions: number;
  timeRange: string;
  setTimeRange: (value: string) => void;
  expandedSection: string | null;
  setExpandedSection: (value: string | null) => void;
  activeSampleUsers: any[];
  funnelData: any;
  pagePerformanceData: any[];
  trafficSourcesData: any[];
  recentEvents: any[];
  frictionPointsData: any[];
  systemAlertsData: any[];
  retentionData: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  activeSessions,
  timeRange,
  setTimeRange,
  expandedSection,
  setExpandedSection,
  activeSampleUsers,
  funnelData,
  pagePerformanceData,
  trafficSourcesData,
  recentEvents,
  frictionPointsData,
  systemAlertsData,
  retentionData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Real-time Activity */}
      <div className="lg:col-span-2 space-y-6">
        {/* Active Sessions Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Active Sessions</CardTitle>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">{activeSessions}</span>
              <span className="text-sm text-green-600">+12% vs last hour</span>
            </div>
            
            <div className="space-y-3">
              {activeSampleUsers.map((user) => (
                <div 
                  key={user.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedSection(expandedSection === user.id ? null : user.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div>
                        <span className="font-medium text-sm">{user.id}</span>
                        <span className="text-xs text-gray-500 ml-2">{user.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{user.timeOnSite}</span>
                      <span>{user.device}</span>
                      <Badge variant="secondary" className="text-xs">{user.events} events</Badge>
                    </div>
                  </div>
                  
                  {expandedSection === user.id && (
                    <div className="mt-3 pt-3 border-t space-y-1 text-sm">
                      <div>Current Page: <span className="font-medium">{user.currentPage}</span></div>
                      <div>Browser: <span className="font-medium">{user.browser}</span></div>
                      <div>Last Event: <span className="font-medium">{user.lastEvent}</span></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.steps.map((step, index) => (
                <div key={step.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="text-sm text-gray-500">{step.users.toLocaleString()} users</span>
                  </div>
                  <div className="relative">
                    <Progress value={step.users / funnelData.steps[0].users * 100} className="h-8" />
                    {step.dropOff > 0 && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-red-600 font-medium mr-2">
                        -{step.dropOff}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="text-2xl font-bold">{funnelData.conversionRate}%</div>
                  <div className="text-xs text-gray-500">Overall Conversion</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{funnelData.avgTimeToConvert}</div>
                  <div className="text-xs text-gray-500">Avg. Time to Convert</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">{funnelData.compareLastPeriod}</div>
                  <div className="text-xs text-gray-500">vs. Last Period</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Page Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Page Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagePerformanceData.map((page) => (
                <div key={page.path} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{page.path}</span>
                    <Badge className={`
                      ${page.engagementScore >= 9 ? 'bg-green-100 text-green-800' : ''}
                      ${page.engagementScore >= 7 && page.engagementScore < 9 ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${page.engagementScore < 7 ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {page.engagementScore}/10
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Views</span>
                      <p className="font-medium">{page.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg. Time</span>
                      <p className="font-medium">{page.avgTimeOnPage}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Exit Rate</span>
                      <p className="font-medium">{page.exitRate}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Scroll Depth</span>
                      <p className="font-medium">{page.scrollDepth}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Insights & Alerts */}
      <div className="space-y-6">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trafficSourcesData.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-gray-500">{source.sessions.toLocaleString()}</span>
                  </div>
                  <Progress value={source.sessions / trafficSourcesData[0].sessions * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Conv: {source.convRate}%</span>
                    <span>Engagement: {source.engagementScore}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Events Stream */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Event Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentEvents.map((event, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="text-gray-400 font-mono">{event.time}</span>
                  <div className="flex-1">
                    <span className="font-medium">{event.user}</span>
                    <span className="text-gray-500"> {event.type} </span>
                    <span className="text-[#e85b5e]">{event.element}</span>
                    <span className="text-gray-500"> on {event.page}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Friction Points */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Friction Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {frictionPointsData.map((point, idx) => (
                <div key={idx} className="p-2 rounded border border-orange-200 bg-orange-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{point.issue}</p>
                      <p className="text-xs text-gray-600 mt-1">{point.page}</p>
                    </div>
                    <Badge variant={point.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {point.sessions} sessions
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{point.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemAlertsData.map((alert, idx) => (
                <div key={idx} className={`p-2 rounded text-xs ${
                  alert.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{alert.message}</span>
                    <span className="text-gray-500">{alert.time}</span>
                  </div>
                  <span className="text-gray-600">{alert.affectedUsers} users affected</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};