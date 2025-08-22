"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";

interface Activity {
  id: string;
  event: string;
  description: string;
  timestamp: string;
  status: string;
}

interface ActivityLogProps {
  title: string;
  activities: Activity[];
  className?: string;
}

// Define helper functions outside component
const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CircleCheck className="h-4 w-4 text-green-500" />;
    case "error":
      return <CircleX className="h-4 w-4 text-red-500" />;
    case "warning":
      return <CircleX className="h-4 w-4 text-amber-500" />;
    default:
      return null;
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-500/10 text-green-500";
    case "error":
      return "bg-red-500/10 text-red-500";
    case "warning":
      return "bg-amber-500/10 text-amber-500";
    default:
      return "";
  }
};

export const ActivityLog = React.memo(function ActivityLog({ title, activities, className }: ActivityLogProps) {

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div className={cn("rounded-full p-1", getStatusClass(activity.status))}>
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});