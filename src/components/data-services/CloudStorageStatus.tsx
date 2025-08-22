"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cloudStorageConnections } from "@/lib/data/dataServicesData";
import { 
  Cloud, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Database,
  Clock,
  Folder
} from "lucide-react";

export function CloudStorageStatus() {
  const getProviderIcon = (provider: string) => {
    const baseClass = "h-5 w-5";
    const providerColors = {
      "AWS S3": "text-orange-600",
      "Google Cloud Storage": "text-blue-600",
      "Azure Blob Storage": "text-blue-500",
      "Dropbox Business": "text-blue-400",
      "Box Enterprise": "text-blue-700"
    };
    
    return <Cloud className={`${baseClass} ${providerColors[provider] || "text-gray-600"}`} />;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      connected: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      disconnected: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
      syncing: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: RefreshCw }
    };
    
    const config = statusConfig[status] || statusConfig.disconnected;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className={`h-3 w-3 mr-1 ${status === 'syncing' ? 'animate-spin' : ''}`} />
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-green-500" />
          Cloud Storage Connections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cloudStorageConnections.map((connection, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getProviderIcon(connection.provider)}
                  <div>
                    <h4 className="font-medium">{connection.provider}</h4>
                    <p className="text-sm text-muted-foreground">{connection.bucketName}</p>
                  </div>
                </div>
                {getStatusBadge(connection.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Database className="h-4 w-4" />
                    <span>Region:</span>
                    <span className="font-medium text-foreground">{connection.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last Sync:</span>
                    <span className="font-medium text-foreground">{connection.lastSync}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Folder className="h-4 w-4" />
                    <span>Files:</span>
                    <span className="font-medium text-foreground">{connection.filesCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Database className="h-4 w-4" />
                    <span>Size:</span>
                    <span className="font-medium text-foreground">{connection.totalSize}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Sync Frequency: <span className="font-medium">{connection.syncFrequency}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}