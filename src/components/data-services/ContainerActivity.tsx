"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { containerActivity } from "@/lib/data/dataServicesData";
import { 
  Upload, 
  Cloud, 
  Search, 
  UserPlus, 
  Eye, 
  Clock, 
  Activity,
  Loader2
} from "lucide-react";

export function ContainerActivity() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Upload Local Files":
        return <Upload className="h-4 w-4" />;
      case "Load from Cloud Storage":
        return <Cloud className="h-4 w-4" />;
      case "Query Data":
        return <Search className="h-4 w-4" />;
      case "Create User":
        return <UserPlus className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Upload Local Files":
        return "text-blue-600 bg-blue-100";
      case "Load from Cloud Storage":
        return "text-green-600 bg-green-100";
      case "Query Data":
        return "text-purple-600 bg-purple-100";
      case "Create User":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Loader2 className="h-3 w-3 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          Container Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {containerActivity.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1 rounded ${getTypeColor(activity.type)}`}>
                      {getTypeIcon(activity.type)}
                    </div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <Badge className={getStatusColor(activity.status)}>
                      {getStatusIcon(activity.status)}
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                    {activity.type}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm border-t pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Viewed:</span>
                    <span className="font-medium text-foreground">{activity.viewed}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Updated:</span>
                    <span className="font-medium text-foreground">{activity.updated}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}