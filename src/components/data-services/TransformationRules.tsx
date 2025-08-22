"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { transformationRules } from "@/lib/data/dataServicesData";
import { Settings, CheckCircle, XCircle, Percent } from "lucide-react";

export function TransformationRules() {
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return "text-green-600";
    if (rate >= 95) return "text-yellow-600";
    return "text-red-600";
  };

  const getSuccessRateBadge = (rate: number) => {
    if (rate >= 98) return "bg-green-100 text-green-800 border-green-200";
    if (rate >= 95) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-500" />
          Data Transformation Rules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transformationRules.map((rule, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{rule.rule}</h4>
                <Badge className={getSuccessRateBadge(rule.successRate)}>
                  <Percent className="h-3 w-3 mr-1" />
                  {rule.successRate}%
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Success Rate</span>
                  <span className={getSuccessRateColor(rule.successRate)}>
                    {rule.successRate}%
                  </span>
                </div>
                <Progress 
                  value={rule.successRate} 
                  className="h-2"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex flex-col items-center p-2 bg-blue-50 rounded">
                  <span className="text-blue-600 font-semibold">{rule.applied.toLocaleString()}</span>
                  <span className="text-blue-500 text-xs">Applied</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-green-50 rounded">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-green-600 font-semibold">{rule.success.toLocaleString()}</span>
                  </div>
                  <span className="text-green-500 text-xs">Success</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-1">
                    <XCircle className="h-3 w-3 text-red-600" />
                    <span className="text-red-600 font-semibold">{rule.failed.toLocaleString()}</span>
                  </div>
                  <span className="text-red-500 text-xs">Failed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}