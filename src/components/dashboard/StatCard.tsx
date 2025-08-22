"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = React.memo(function StatCard({
  title,
  value,
  description,
  icon,
  iconColor,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {description}
              </span>
            </div>
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </p>
            )}
          </div>
          <div
            className={cn(
              "rounded-full p-2 flex items-center justify-center",
              `bg-${iconColor}/10`
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
