"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentQueries } from "@/lib/data/dataServicesData";
import { 
  Search,
  Clock,
  User,
  Database,
  CheckCircle,
  XCircle,
  PlayCircle,
  Save
} from "lucide-react";

export function RecentQueries() {
  const getQueryTypeColor = (type: string) => {
    const typeColors = {
      "Analytical": "text-blue-600 bg-blue-100",
      "Reporting": "text-green-600 bg-green-100",
      "Live": "text-purple-600 bg-purple-100",
      "ML Dataset": "text-orange-600 bg-orange-100",
      "Marketing": "text-pink-600 bg-pink-100"
    };
    return typeColors[type] || "text-gray-600 bg-gray-100";
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      running: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: PlayCircle },
      failed: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.failed;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-purple-500" />
          Recent Queries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQueries.map((query) => (
            <div key={query.queryId} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{query.queryName}</h4>
                    {query.saved && <Save className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getQueryTypeColor(query.queryType)}`}>
                      {query.queryType}
                    </span>
                    {getStatusBadge(query.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mt-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{query.executedBy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{query.executedAt}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    <span>Rows: {query.rowsReturned.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Time: {query.executionTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Query ID: <span className="font-mono">{query.queryId}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}