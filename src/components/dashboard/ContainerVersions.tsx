"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Version {
  id: string;
  name: string;
  status: string;
  health: number;
  healthText: string;
}

interface ContainerVersionsProps {
  title: string;
  versions: Version[];
  className?: string;
}

export function ContainerVersions({ title, versions, className }: ContainerVersionsProps) {
  // Function to determine progress color based on value
  const getProgressColorClass = (value: number) => {
    if (value > 90) return "bg-green-500";
    if (value > 70) return "bg-[#e85b5e]";
    if (value > 50) return "bg-[#d65659]";
    return "bg-red-500";
  };

  // Function to determine badge style based on status
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "testing":
        return "bg-[#e85b5e]/10 text-[#e85b5e] hover:bg-[#e85b5e]/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="grid grid-cols-12 text-xs font-medium text-muted-foreground">
            <div className="col-span-3">Version</div>
            <div className="col-span-3">Environment</div>
            <div className="col-span-3 text-center">Health</div>
            <div className="col-span-3 text-right">Status</div>
          </div>
          {versions.map((version) => (
            <div
              key={version.id}
              className="grid grid-cols-12 items-center gap-1"
            >
              <div className="col-span-3">
                <p className="truncate text-sm font-medium">{version.id}</p>
              </div>
              <div className="col-span-3">
                <p className="truncate text-sm">{version.name}</p>
              </div>
              <div className="col-span-3 flex justify-center">
                <div className="w-full">
                  <Progress
                    value={version.health}
                    className={cn("h-2", getProgressColorClass(version.health))}
                  />
                </div>
              </div>
              <div className="col-span-3 flex justify-end">
                <Badge
                  variant="outline"
                  className={getBadgeClass(version.status)}
                >
                  {version.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}