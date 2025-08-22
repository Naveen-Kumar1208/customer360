"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, MousePointerClick, Activity, RefreshCw } from "lucide-react";

interface MetricData {
  current: number;
  previous: number;
  trend: number;
  isPositive: boolean;
}

interface KeyMetricsProps {
  conversionRate: MetricData;
  engagementRate: MetricData;
  retentionRate: MetricData;
  className?: string;
}

export function KeyMetrics({
  conversionRate,
  engagementRate,
  retentionRate,
  className
}: KeyMetricsProps) {
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const MetricCard = ({ 
    title, 
    data, 
    icon 
  }: { 
    title: string; 
    data: MetricData; 
    icon: React.ReactNode 
  }) => {
    return (
      <div className="rounded-lg border bg-card p-5 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {icon}
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold">{formatPercent(data.current)}</p>
              <div className="flex items-center text-xs">
                <span className="text-muted-foreground mr-1">vs {formatPercent(data.previous)}</span>
                <div className={cn(
                  "flex items-center",
                  data.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {data.isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{data.trend.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(
            "rounded-full p-2",
            data.isPositive ? "bg-green-500/10" : "bg-red-500/10"
          )}>
            {data.isPositive ? (
              <ArrowUpRight className={cn("h-4 w-4 text-green-500")} />
            ) : (
              <ArrowDownRight className={cn("h-4 w-4 text-red-500")} />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>Key Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-4">
          <MetricCard 
            title="Conversion Rate" 
            data={conversionRate} 
            icon={<MousePointerClick className="h-4 w-4 text-[#e85b5e]" />}
          />
          <MetricCard 
            title="Engagement Rate" 
            data={engagementRate} 
            icon={<Activity className="h-4 w-4 text-[#c7494c]" />}
          />
          <MetricCard 
            title="Retention Rate" 
            data={retentionRate} 
            icon={<RefreshCw className="h-4 w-4 text-[#d65659]" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}