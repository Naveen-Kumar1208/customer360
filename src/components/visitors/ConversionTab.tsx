"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Monitor, Smartphone, Tablet } from 'lucide-react';
import { conversionTabData } from "@/lib/data/visitorsData";
import { BarChart } from "@/components/dashboard/BarChart";
import { AreaChart } from "@/components/dashboard/AreaChart";

export const ConversionTab: React.FC = () => {
  // Prepare data for charts
  const conversionTrendData = [
    { name: "Week 1", leadConversion: 32, opportunityConversion: 24, customerConversion: 15 },
    { name: "Week 2", leadConversion: 35, opportunityConversion: 28, customerConversion: 18 },
    { name: "Week 3", leadConversion: 38, opportunityConversion: 31, customerConversion: 21 },
    { name: "Week 4", leadConversion: 42, opportunityConversion: 35, customerConversion: 24 },
  ];

  const sourceComparisonData = conversionTabData.conversionBySource.map(source => ({
    name: source.source,
    value: source.customerConversion
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Conversion Funnel */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion Funnel Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionTabData.funnelStages.map((stage, index) => (
                <div key={stage.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold">{stage.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {stage.count.toLocaleString()} users
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{stage.conversionRate}%</span>
                      {stage.change !== 0 && (
                        <Badge 
                          variant={stage.change > 0 ? "default" : "secondary"} 
                          className={`text-xs ${stage.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {stage.change > 0 ? '+' : ''}{stage.change}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress 
                    value={stage.conversionRate} 
                    className="h-8"
                  />
                  {index < conversionTabData.funnelStages.length - 1 && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
                      border-l-[20px] border-l-transparent
                      border-t-[15px] border-t-gray-200
                      border-r-[20px] border-r-transparent z-10">
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion by Source */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Conversion by Traffic Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="text-left pb-2">Source</th>
                    <th className="text-right pb-2">Lead Conv %</th>
                    <th className="text-right pb-2">Opportunity Conv %</th>
                    <th className="text-right pb-2">Customer Conv %</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionTabData.conversionBySource.map((source) => (
                    <tr key={source.source} className="border-b">
                      <td className="py-3 text-sm font-medium">{source.source}</td>
                      <td className="py-3 text-sm text-right">{source.leadConversion}%</td>
                      <td className="py-3 text-sm text-right">{source.opportunityConversion}%</td>
                      <td className="py-3 text-sm text-right font-semibold">{source.customerConversion}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Trends Chart */}
        <AreaChart
          title="Conversion Trends Over Time"
          data={conversionTrendData}
          categories={[
            { name: "leadConversion", color: "#e85b5e" },
            { name: "opportunityConversion", color: "#c7494c" },
            { name: "customerConversion", color: "#d65659" }
          ]}
        />

        {/* Source Comparison Chart */}
        <BarChart
          title="Customer Conversion by Source"
          data={sourceComparisonData}
          categories={[
            { name: "value", color: "#e85b5e" }
          ]}
        />
      </div>

      {/* Conversion Insights */}
      <div className="space-y-6">
        {/* Conversion by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Geographic Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversionTabData.conversionByCountry.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{country.country}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{country.conversionRate}%</span>
                        {country.changeVsPrevious !== 0 && (
                          <span className={`text-xs flex items-center ${
                            country.changeVsPrevious > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {country.changeVsPrevious > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(country.changeVsPrevious)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <Progress value={country.conversionRate * 20} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Conversion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Device Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Desktop</p>
                    <p className="text-xs text-gray-500">{conversionTabData.conversionByDevice.desktop.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <span className="text-lg font-semibold">{conversionTabData.conversionByDevice.desktop.conversionRate}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Mobile</p>
                    <p className="text-xs text-gray-500">{conversionTabData.conversionByDevice.mobile.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <span className="text-lg font-semibold">{conversionTabData.conversionByDevice.mobile.conversionRate}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <Tablet className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Tablet</p>
                    <p className="text-xs text-gray-500">{conversionTabData.conversionByDevice.tablet.visitors.toLocaleString()} visitors</p>
                  </div>
                </div>
                <span className="text-lg font-semibold">{conversionTabData.conversionByDevice.tablet.conversionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm font-medium text-green-900">Best Performing</p>
                <p className="text-xs text-green-700 mt-1">Email traffic: 72.6% customer conversion</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded">
                <p className="text-sm font-medium text-orange-900">Needs Attention</p>
                <p className="text-xs text-orange-700 mt-1">Mobile conversion lagging at 2.8%</p>
              </div>
              
              <div className="p-3 bg-[#e85b5e]/10 rounded">
                <p className="text-sm font-medium text-[#e85b5e]">Growth Opportunity</p>
                <p className="text-xs text-[#c7494c] mt-1">Japan showing +1.2% growth trend</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};