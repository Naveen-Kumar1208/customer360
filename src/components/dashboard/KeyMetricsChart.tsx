"use client";

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
  ReferenceLine,
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

interface KeyMetricsChartProps {
  conversionRate: MetricData;
  engagementRate: MetricData;
  retentionRate: MetricData;
  className?: string;
}

export function KeyMetricsChart({
  conversionRate,
  engagementRate,
  retentionRate,
  className
}: KeyMetricsChartProps) {
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const MetricChart = ({ 
    title, 
    data, 
    icon,
    color
  }: { 
    title: string; 
    data: MetricData; 
    icon: React.ReactNode;
    color: string;
  }) => {
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-card border border-border p-2 rounded-md shadow-sm text-xs">
            <p className="font-medium">{`${label}: ${payload[0].value.toFixed(1)}%`}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <Card className="h-full">
        <CardHeader className="pb-0 pt-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {icon}
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold">{formatPercent(data.current)}</span>
              <div className={cn(
                "flex items-center text-xs px-1.5 py-0.5 rounded",
                data.isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
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
        </CardHeader>
        <CardContent className="pt-3 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.history}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} 
                tick={{ fontSize: 10 }} 
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={data.previous} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      <MetricChart 
        title="Conversion Rate" 
        data={conversionRate} 
        icon={<MousePointerClick className="h-4 w-4 text-[#e85b5e]" />}
        color="#e85b5e"
      />
      <MetricChart 
        title="Engagement Rate" 
        data={engagementRate} 
        icon={<Activity className="h-4 w-4 text-[#c7494c]" />}
        color="#c7494c"
      />
      <MetricChart 
        title="Retention Rate" 
        data={retentionRate} 
        icon={<RefreshCw className="h-4 w-4 text-[#d65659]" />}
        color="#d65659"
      />
    </div>
  );
}