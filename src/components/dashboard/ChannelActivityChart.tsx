"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

interface ChannelActivity {
  channel: string;
  [timeSlot: string]: string | number;
}

interface ChannelDistribution {
  channel: string;
  users: number;
}

interface ChannelActivityChartProps {
  activityData: ChannelActivity[];
  distributionData: ChannelDistribution[];
  className?: string;
}

export function ChannelActivityChart({
  activityData,
  distributionData,
  className,
}: ChannelActivityChartProps) {
  // Define colors for different channels
  const COLORS = [
    "hsl(220, 70%, 50%)", // Web App - blue
    "hsl(280, 65%, 60%)", // Mobile App - purple
    "hsl(160, 60%, 45%)", // Social Media - green
    "hsl(30, 70%, 50%)",  // Email - orange
  ];

  // For time-based activity chart
  const timeSlots = [
    "00:00-04:00",
    "04:00-08:00",
    "08:00-12:00",
    "12:00-16:00",
    "16:00-20:00",
    "20:00-24:00",
  ];

  // Transform data for the activity chart
  const transformedData = timeSlots.map((timeSlot) => {
    const dataPoint: { [key: string]: string | number } = {
      timeSlot,
    };

    activityData.forEach((item) => {
      dataPoint[item.channel] = item[timeSlot];
    });

    return dataPoint;
  });

  // Custom tooltip for the bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-md shadow-sm">
          <p className="font-medium mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div 
              key={`item-${index}`} 
              className="flex justify-between items-center gap-3 text-sm"
              style={{ color: entry.color }}
            >
              <span>{entry.name}:</span>
              <span className="font-medium">{entry.value.toLocaleString()} users</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for the pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-md shadow-sm">
          <div 
            className="flex justify-between items-center gap-3 text-sm"
            style={{ color: payload[0].payload.fill }}
          >
            <span>{payload[0].name}:</span>
            <span className="font-medium">{payload[0].value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Format y-axis ticks with K suffix for thousands
  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Channel Activity & Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Channel Distribution Pie Chart */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium mb-4">Channel Distribution</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="users"
                      nameKey="channel"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill="white" 
                            textAnchor={x > cx ? "start" : "end"} 
                            dominantBaseline="central"
                            fontSize={12}
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Channel Activity Bar Chart */}
          <div className="md:col-span-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-4">Activity by Time of Day</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={transformedData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    barGap={0}
                    barCategoryGap="15%"
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="timeSlot" 
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tickFormatter={formatYAxisTick}
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: "10px", fontSize: '12px' }}
                    />
                    {activityData.map((channel, index) => (
                      <Bar
                        key={channel.channel}
                        dataKey={channel.channel}
                        fill={COLORS[index % COLORS.length]}
                        stackId="a"
                        radius={[0, 0, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}