"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { uploadHistory } from "@/lib/data/dataServicesData";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Loader2,
  User,
  Clock,
  HardDrive
} from "lucide-react";

export function UploadHistory() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const color = {
      csv: "text-green-600",
      json: "text-blue-600",
      xlsx: "text-orange-600",
      xml: "text-purple-600"
    }[extension || ''] || "text-gray-600";
    
    return <FileText className={`h-5 w-5 ${color}`} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDrive className="h-5 w-5 text-blue-500" />
          Upload History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {uploadHistory.map((upload, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getFileIcon(upload.fileName)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{upload.fileName}</h4>
                      <Badge className={getStatusColor(upload.status)}>
                        {getStatusIcon(upload.status)}
                        <span className="ml-1">{upload.status}</span>
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-4">
                        <span>Size: {upload.fileSize}</span>
                        <span>•</span>
                        <span>Records: {upload.recordsProcessed.toLocaleString()}</span>
                        <span>•</span>
                        <span>Time: {upload.processingTime}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{upload.uploadedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{upload.uploadDate}</span>
                        </div>
                      </div>
                    </div>
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