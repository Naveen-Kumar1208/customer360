"use client";

import { useEffect, useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/products/tofu/OverviewTab";
import { CampaignsTab } from "@/components/products/tofu/CampaignsTab";
import { AudienceTab } from "@/components/products/tofu/AudienceTab";
import { ContentTab } from "@/components/products/tofu/ContentTab";
import { LeadsTab } from "@/components/products/tofu/LeadsTab";
import { FunnelNavigation } from "@/components/products/FunnelNavigation";
import {
  tofuMetrics,
  trafficSourcesData,
  visitorTrendData,
  contentPerformanceData,
  campaignData,
  audienceInsightsData,
  blogPerformanceData,
  channelPerformanceData
} from "@/lib/data/tofuData";

// Extend window for Chart.js
declare global {
  interface Window {
    Chart?: any;
  }
}

export default function TofuPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading after component mount
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StaticExportLayout>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Top of Funnel (TOFU)</h1>
                <p className="text-gray-600 mt-1">
                  Track awareness stage metrics and content performance
                </p>
              </div>
            </div>

            {/* Funnel Navigation */}
            <FunnelNavigation currentStage="tofu" />
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                  <TabsTrigger value="audience">Audience</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="leads">Leads</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <OverviewTab 
                    metrics={tofuMetrics}
                    trafficSourcesData={trafficSourcesData}
                    visitorTrendData={visitorTrendData}
                    contentPerformanceData={contentPerformanceData}
                  />
                </TabsContent>

                <TabsContent value="campaigns" className="mt-6">
                  <CampaignsTab campaignData={campaignData} />
                </TabsContent>

                <TabsContent value="audience" className="mt-6">
                  <AudienceTab audienceInsightsData={audienceInsightsData} />
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <ContentTab 
                    blogPerformanceData={blogPerformanceData}
                    contentPerformanceData={contentPerformanceData}
                  />
                </TabsContent>

                <TabsContent value="leads" className="mt-6">
                  <LeadsTab />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>

        {/* Chart.js Script */}
        <Script
          src="https://cdn.jsdelivr.net/npm/chart.js"
          strategy="afterInteractive"
        />
      </StaticExportLayout>
    </>
  );
}

