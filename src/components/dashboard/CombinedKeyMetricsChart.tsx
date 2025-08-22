"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, MousePointerClick, Activity, RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface MetricHistory {
  month: string;
  value: number;
}

interface MetricData {
  current: number;
  previous: number;
  trend: number;
  isPositive: boolean;
  history: MetricHistory[];
}

interface CombinedKeyMetricsChartProps {
  conversionRate: MetricData;
  engagementRate: MetricData;
  retentionRate: MetricData;
  className?: string;
}

// Format helper moved outside component
const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`;
};

// Custom tooltip component defined outside main component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-md shadow-sm">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div 
            key={`item-${index}`} 
            className="flex justify-between items-center gap-3 text-sm"
            style={{ color: entry.color }}
          >
            <span>{entry.name}:</span>
            <span className="font-medium">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const CombinedKeyMetricsChart = React.memo(function CombinedKeyMetricsChart({
  conversionRate,
  engagementRate,
  retentionRate,
  className
}: CombinedKeyMetricsChartProps) {
  // Memoize combined data to prevent recalculation
  const combinedData = useMemo(() => 
    conversionRate.history.map((item, index) => ({
      month: item.month,
      conversion: item.value,
      engagement: engagementRate.history[index].value,
      retention: retentionRate.history[index].value,
    })), [conversionRate.history, engagementRate.history, retentionRate.history]
  );

  // Metric indicator component
  const MetricIndicator = ({ 
    title, 
    data, 
    icon,
    color
  }: { 
    title: string; 
    data: MetricData; 
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="flex items-center gap-2">
      <div className={cn(
        "rounded-full p-1.5",
        color === "red" ? "bg-[#e85b5e]/10" : 
        color === "red-dark" ? "bg-[#c7494c]/10" : 
        "bg-[#d65659]/10"
      )}>
        {icon}
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-sm font-bold">{formatPercent(data.current)}</span>
        </div>
        <div className={cn(
          "flex items-center text-xs",
          data.isPositive ? "text-green-500" : "text-red-500"
        )}>
          {data.isPositive ? (
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-0.5" />
          )}
          <span>{data.trend.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );


  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle>Key Performance Metrics</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 mt-3 md:mt-0">
            <MetricIndicator 
              title="Conversion Rate" 
              data={conversionRate} 
              icon={<MousePointerClick className="h-4 w-4 text-[#e85b5e]" />}
              color="red"
            />
            <MetricIndicator 
              title="Engagement Rate" 
              data={engagementRate} 
              icon={<Activity className="h-4 w-4 text-[#c7494c]" />}
              color="red-dark"
            />
            <MetricIndicator 
              title="Retention Rate" 
              data={retentionRate} 
              icon={<RefreshCw className="h-4 w-4 text-[#d65659]" />}
              color="red-light"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={combinedData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={20}
                formatter={(value) => {
                  const formatted = value.charAt(0).toUpperCase() + value.slice(1);
                  return <span style={{fontSize: '12px'}}>{formatted}</span>;
                }}
              />
              <Line
                name="Conversion"
                type="monotone"
                dataKey="conversion"
                stroke="#e85b5e"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                name="Engagement"
                type="monotone"
                dataKey="engagement"
                stroke="#c7494c"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                name="Retention"
                type="monotone"
                dataKey="retention"
                stroke="#d65659"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
});