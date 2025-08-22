"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { dataServicesContainers } from "@/lib/data/dataServicesData";
import { 
  Upload, 
  Cloud, 
  Search, 
  UserPlus, 
  TrendingUp, 
  TrendingDown,
  Plus
} from "lucide-react";

export function ContainerCards() {
  const router = useRouter();
  
  const getActionIcon = (action: string) => {
    switch (action) {
      case "Upload":
        return <Upload className="h-5 w-5" />;
      case "Connect":
        return <Cloud className="h-5 w-5" />;
      case "Query":
        return <Search className="h-5 w-5" />;
      case "Create":
        return <UserPlus className="h-5 w-5" />;
      default:
        return <Plus className="h-5 w-5" />;
    }
  };

  const getActionRoute = (title: string) => {
    switch (title) {
      case "Upload Local Files":
        return "/data-services/upload";
      case "Load from Cloud Storage":
        return "/data-services/cloud-storage";
      case "Query Data":
        return "/data-services/query";
      case "Create User":
        return "/data-services/create-user";
      default:
        return "#";
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "Upload":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "Connect":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "Query":
        return "bg-purple-500 hover:bg-purple-600 text-white";
      case "Create":
        return "bg-orange-500 hover:bg-orange-600 text-white";
      default:
        return "bg-gray-500 hover:bg-gray-600 text-white";
    }
  };

  const getCardBorderColor = (action: string) => {
    switch (action) {
      case "Upload":
        return "border-l-4 border-l-blue-500";
      case "Connect":
        return "border-l-4 border-l-green-500";
      case "Query":
        return "border-l-4 border-l-purple-500";
      case "Create":
        return "border-l-4 border-l-orange-500";
      default:
        return "border-l-4 border-l-gray-500";
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {dataServicesContainers.map((container) => (
        <Card key={container.title} className={`${getCardBorderColor(container.action)} hover:shadow-lg transition-shadow`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {container.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{container.value}</p>
                  <div className={`flex items-center text-xs ${
                    container.trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {container.trend.isPositive ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {container.trend.value}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {container.description}
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Button 
                className={`w-full ${getActionColor(container.action)}`}
                size="sm"
                onClick={() => router.push(getActionRoute(container.title))}
              >
                {getActionIcon(container.action)}
                <span className="ml-2">{container.action}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}