"use client";

import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { dataSchemaHealth } from "@/lib/data/dataServicesData";
import { Database, Clock, Hash } from "lucide-react";

export function DataSchemaHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (health: number) => {
    if (health >= 95) return "bg-green-500";
    if (health >= 85) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-500" />
          Data Schema Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSchemaHealth.map((schema) => (
            <div key={schema.schema} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{schema.schema}</h4>
                <Badge className={getStatusColor(schema.status)}>
                  {schema.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Health Score</span>
                  <span>{schema.health}%</span>
                </div>
                <Progress 
                  value={schema.health} 
                  className="h-2"
                  style={{
                    "--progress-background": getProgressColor(schema.health)
                  } as React.CSSProperties}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Records:</span>
                  <span className="font-medium">{schema.recordCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="font-medium">{schema.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}