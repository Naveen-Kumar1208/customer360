"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Users, Clock, Target } from 'lucide-react';
import { userJourneysData } from "@/lib/data/visitorsData";
import { BarChart } from "@/components/dashboard/BarChart";
import { AreaChart } from "@/components/dashboard/AreaChart";

export const UserJourneysTab: React.FC = () => {
  // Prepare chart data
  const segmentConversionData = userJourneysData.segments.map(segment => ({
    name: segment.name,
    users: segment.count,
    conversion: segment.conversion
  }));

  const touchpointEffectivenessData = userJourneysData.touchpoints.map(touchpoint => ({
    name: touchpoint.name,
    visits: touchpoint.visits,
    conversion: touchpoint.conversion,
    value: touchpoint.value === 'Very High' ? 90 : 
           touchpoint.value === 'High' ? 70 : 
           touchpoint.value === 'Medium' ? 50 : 30
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Segments */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Segments & Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userJourneysData.segments.map((segment) => (
                <div key={segment.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{segment.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {segment.count.toLocaleString()} users
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {segment.conversion}% conversion
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {segment.avgTimeToConvert}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {segment.paths.map((path, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {path.sequence.map((step, stepIdx) => (
                              <React.Fragment key={stepIdx}>
                                <span className="text-sm font-medium">{step}</span>
                                {stepIdx < path.sequence.length - 1 && (
                                  <ArrowRight className="w-3 h-3 text-gray-400" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          {path.conversionRate > 0 && (
                            <Badge className="bg-green-100 text-green-800">
                              {path.conversionRate}%
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {path.users} users took this path
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Segment Conversion Chart */}
        <BarChart
          title="User Segments Performance"
          data={segmentConversionData}
          categories={[
            { name: "users", color: "hsl(220, 70%, 50%)" },
            { name: "conversion", color: "hsl(120, 70%, 50%)" }
          ]}
        />

        {/* Touchpoint Effectiveness Chart */}
        <AreaChart
          title="Touchpoint Analysis"
          data={touchpointEffectivenessData}
          categories={[
            { name: "visits", color: "hsl(200, 70%, 50%)" },
            { name: "conversion", color: "hsl(340, 70%, 50%)" },
            { name: "value", color: "hsl(60, 70%, 50%)" }
          ]}
        />
      </div>

      {/* Touchpoint Analysis */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Touchpoint Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userJourneysData.touchpoints.map((touchpoint) => (
                <div key={touchpoint.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{touchpoint.name}</span>
                    <Badge 
                      className={`text-xs ${
                        touchpoint.value === 'Very High' ? 'bg-green-100 text-green-800' :
                        touchpoint.value === 'High' ? 'bg-blue-100 text-blue-800' :
                        touchpoint.value === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {touchpoint.value}
                    </Badge>
                  </div>
                  <Progress value={touchpoint.conversion} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{touchpoint.visits.toLocaleString()} visits</span>
                    <span>{touchpoint.conversion}% conv</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journey Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Journey Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">Most Successful Path</p>
                <p className="text-xs text-blue-700">Enterprise Page → Contact Sales → Demo</p>
                <p className="text-xs text-blue-600 mt-1">72.5% conversion rate</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm font-medium text-orange-900 mb-1">Highest Drop-off</p>
                <p className="text-xs text-orange-700">Pricing → Comparison → Exit</p>
                <p className="text-xs text-orange-600 mt-1">180 users lost</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">Quick Wins</p>
                <p className="text-xs text-green-700">Email campaigns driving 8.7% lead conversion</p>
                <p className="text-xs text-green-600 mt-1">5h 24m avg time to convert</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};