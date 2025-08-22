"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectCategories } from "@/lib/data/projectsData";
import { 
  BarChart3,
  Layers
} from "lucide-react";

export function ProjectCategories() {
  const getCategoryColor = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      red: "bg-red-100 text-red-800 border-red-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
      pink: "bg-pink-100 text-pink-800 border-pink-200"
    };
    return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCategoryIcon = (name: string) => {
    return <Layers className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          Project Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projectCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                {getCategoryIcon(category.name)}
                <div>
                  <p className="font-medium text-sm">{category.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {category.count} project{category.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <Badge className={getCategoryColor(category.color)}>
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}