"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, MousePointer } from 'lucide-react';
import { eventsTabData } from "@/lib/data/visitorsData";
import { BarChart } from "@/components/dashboard/BarChart";
import { AreaChart } from "@/components/dashboard/AreaChart";

export const EventsTab: React.FC = () => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'very high': return 'bg-green-100 text-green-800';
      case 'high': return 'bg-[#e85b5e]/10 text-[#e85b5e]';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getErrorLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Prepare chart data
  const eventFrequencyData = eventsTabData.popularEvents.map(event => ({
    name: event.event,
    count: event.count,
    users: event.uniqueUsers
  }));

  const eventTimelineData = [
    { name: "00:00", events: 245, errors: 12 },
    { name: "04:00", events: 189, errors: 8 },
    { name: "08:00", events: 567, errors: 23 },
    { name: "12:00", events: 892, errors: 34 },
    { name: "16:00", events: 745, errors: 28 },
    { name: "20:00", events: 612, errors: 19 }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Recent Events Stream */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Real-time Event Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {eventsTabData.recentEvents.map((event, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <div className="w-1 h-12 bg-[#e85b5e] rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {event.event}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{event.userId}</span>
                      {event.element && (
                        <span className="text-gray-600"> on {event.element}</span>
                      )}
                      <span className="text-gray-500"> • {event.page}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Device: {event.device} • Session: {event.sessionId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Error Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventsTabData.errorEvents.map((error, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{error.error}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        First seen: {new Date(error.firstSeen).toLocaleString()}
                      </p>
                    </div>
                    <Badge className={getErrorLevelColor(error.impactLevel)}>
                      {error.impactLevel}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Occurrences</span>
                      <p className="font-medium">{error.occurrences}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Affected Users</span>
                      <p className="font-medium">{error.affectedUsers}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Timeline Chart */}
        <AreaChart
          title="Event Activity Timeline"
          data={eventTimelineData}
          categories={[
            { name: "events", color: "#e85b5e" },
            { name: "errors", color: "#c7494c" }
          ]}
        />

        {/* Event Frequency Chart */}
        <BarChart
          title="Event Frequency & User Impact"
          data={eventFrequencyData}
          categories={[
            { name: "count", color: "#e85b5e" },
            { name: "users", color: "#d65659" }
          ]}
        />
      </div>

      <div className="space-y-6">
        {/* Popular Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Popular Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventsTabData.popularEvents.map((event) => (
                <div key={event.event} className="p-3 bg-gray-50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{event.event}</span>
                    <Badge className={getImpactColor(event.conversionImpact)}>
                      {event.conversionImpact}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Count</span>
                      <p className="font-medium">{event.count.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Unique Users</span>
                      <p className="font-medium">{event.uniqueUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Conversion Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eventsTabData.conversionEvents.map((event) => (
                <div key={event.event} className="p-3 border border-green-200 bg-green-50 rounded">
                  <h4 className="font-medium text-sm mb-2">{event.event}</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Count</span>
                      <p className="font-semibold">{event.count.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Conv Rate</span>
                      <p className="font-semibold">{event.conversionRate}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>Avg time: {event.avgTimeToConvert}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};