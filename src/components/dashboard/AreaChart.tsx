"use client";

import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AreaChartProps {
  title: string;
  data: Array<{
    name: string;
    [key: string]: string | number;
  }>;
  categories: Array<{
    name: string;
    color: string;
  }>;
  className?: string;
}

export function AreaChart({
  title,
  data,
  categories,
  className,
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsAreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              {categories.map((category) => (
                <linearGradient
                  key={category.name}
                  id={`color-${category.name}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={category.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={category.color}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
                fontSize: 12,
              }}
            />
            {categories.map((category) => (
              <Area
                key={category.name}
                type="monotone"
                dataKey={category.name}
                stroke={category.color}
                fillOpacity={1}
                fill={`url(#color-${category.name})`}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
