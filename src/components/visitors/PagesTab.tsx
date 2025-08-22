"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, FileText, Video, Wrench, Search, LogOut } from 'lucide-react';
import { pagesTabData } from "@/lib/data/visitorsData";
import { BarChart } from "@/components/dashboard/BarChart";
import { AreaChart } from "@/components/dashboard/AreaChart";

export const PagesTab: React.FC = () => {
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      case 'Tool': return <Wrench className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Prepare chart data
  const pageViewsData = pagesTabData.topPages.map(page => ({
    name: page.url.split('/').pop() || page.url,
    views: page.views,
    bounceRate: page.bounceRate
  }));

  const contentEngagementData = pagesTabData.contentPerformance.map(content => ({
    name: content.title.substring(0, 20) + '...',
    downloads: content.downloads || 0,
    leads: content.leads || 0,
    views: content.views || content.uses || 0
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Pages Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagesTabData.topPages.map((page) => (
                <div key={page.url} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-sm">{page.url}</span>
                    </div>
                    <Badge className="bg-[#e85b5e]/10 text-[#e85b5e]">
                      {page.conversionRate}% conv
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Page Views</span>
                      <p className="font-semibold text-sm">{page.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Bounce Rate</span>
                      <p className="font-semibold text-sm">{page.bounceRate}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg. Time</span>
                      <p className="font-semibold text-sm">{page.avgTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Content Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagesTabData.contentPerformance.map((content) => (
                <div key={content.title} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded">
                        {getContentIcon(content.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{content.title}</h4>
                        <span className="text-xs text-gray-500">{content.type}</span>
                      </div>
                    </div>
                    {content.conversionRate && (
                      <Badge className="bg-green-100 text-green-800">
                        {content.conversionRate}% conv
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    {content.downloads && (
                      <div>
                        <span className="text-gray-500">Downloads</span>
                        <p className="font-medium">{content.downloads.toLocaleString()}</p>
                      </div>
                    )}
                    {content.views && (
                      <div>
                        <span className="text-gray-500">Views</span>
                        <p className="font-medium">{content.views.toLocaleString()}</p>
                      </div>
                    )}
                    {content.uses && (
                      <div>
                        <span className="text-gray-500">Uses</span>
                        <p className="font-medium">{content.uses.toLocaleString()}</p>
                      </div>
                    )}
                    {content.leads && (
                      <div>
                        <span className="text-gray-500">Leads</span>
                        <p className="font-medium">{content.leads}</p>
                      </div>
                    )}
                    {content.avgWatchTime && (
                      <div>
                        <span className="text-gray-500">Avg Watch</span>
                        <p className="font-medium">{content.avgWatchTime}</p>
                      </div>
                    )}
                    {content.avgReadTime && (
                      <div>
                        <span className="text-gray-500">Avg Read</span>
                        <p className="font-medium">{content.avgReadTime}</p>
                      </div>
                    )}
                    {content.completionRate && (
                      <div>
                        <span className="text-gray-500">Completion</span>
                        <p className="font-medium">{content.completionRate}%</p>
                      </div>
                    )}
                    {content.shares && (
                      <div>
                        <span className="text-gray-500">Shares</span>
                        <p className="font-medium">{content.shares}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Views Chart */}
        <BarChart
          title="Page Views & Bounce Rate"
          data={pageViewsData}
          categories={[
            { name: "views", color: "#e85b5e" },
            { name: "bounceRate", color: "#c7494c" }
          ]}
        />

        {/* Content Engagement Chart */}
        <AreaChart
          title="Content Performance Metrics"
          data={contentEngagementData}
          categories={[
            { name: "views", color: "#e85b5e" },
            { name: "downloads", color: "#d65659" },
            { name: "leads", color: "#c7494c" }
          ]}
        />
      </div>

      <div className="space-y-6">
        {/* Exit Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Top Exit Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagesTabData.exitPages.map((page) => (
                <div key={page.url} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{page.url}</span>
                    <Badge variant="secondary" className="text-xs">
                      {page.exitRate}%
                    </Badge>
                  </div>
                  <Progress value={page.exitRate} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{page.exits.toLocaleString()} exits</span>
                    <span>Avg {page.previousVisits} pages before</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Queries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Search className="w-4 h-4" />
              Internal Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pagesTabData.searchQueries.map((query) => (
                <div key={query.term} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">{query.term}</p>
                    <p className="text-xs text-gray-500">{query.searches} searches</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{query.clickThrough}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Page Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded">
                <p className="text-sm font-medium text-green-900">High Performing</p>
                <p className="text-xs text-green-700 mt-1">Contact page: 12.5% conversion rate</p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded">
                <p className="text-sm font-medium text-orange-900">High Exit Rate</p>
                <p className="text-xs text-orange-700 mt-1">Blog pages showing 65% exit rate</p>
              </div>
              
              <div className="p-3 bg-[#e85b5e]/10 rounded">
                <p className="text-sm font-medium text-[#e85b5e]">Top Content</p>
                <p className="text-xs text-[#c7494c] mt-1">ROI Calculator driving 840 leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};