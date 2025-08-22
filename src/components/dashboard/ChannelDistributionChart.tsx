"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChannelDistribution {
  channel: string;
  users: number;
}

interface ChannelDistributionChartProps {
  data: ChannelDistribution[];
  className?: string;
}

export function ChannelDistributionChart({
  data,
  className,
}: ChannelDistributionChartProps) {
  // Define colors for different channels
  const COLORS = [
    "hsl(220, 70%, 50%)", // Web App - blue
    "hsl(280, 65%, 60%)", // Mobile App - purple
    "hsl(160, 60%, 45%)", // Social Media - green
    "hsl(30, 70%, 50%)",  // Email - orange
  ];

  // Create a custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-md shadow-sm">
          <div className="flex flex-col gap-1">
            <div className="font-medium" style={{ color: payload[0].color }}>
              {payload[0].name}
            </div>
            <div className="flex justify-between gap-4">
              <span>Percentage:</span>
              <span className="font-medium">{payload[0].value}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Create custom rendering for the labels inside pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Create custom legend that includes percentage
  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <div className="text-sm">
              <span>{entry.value} </span>
              <span className="text-muted-foreground">({data[index].users}%)</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Channel Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="users"
                nameKey="channel"
                labelLine={false}
                label={renderCustomizedLabel}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={<CustomLegend />}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}