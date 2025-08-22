"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectsList } from "@/lib/data/projectsData";
import { 
  FolderOpen,
  Calendar,
  DollarSign,
  Users,
  Filter,
  Plus,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pause
} from "lucide-react";

export function ProjectsList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_progress: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock },
      completed: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      planning: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Calendar },
      on_hold: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: Pause }
    };
    
    const config = statusConfig[status] || statusConfig.planning;
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800 border-red-200" },
      medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      low: { color: "bg-green-100 text-green-800 border-green-200" }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    
    return (
      <Badge className={config.color}>
        {priority}
      </Badge>
    );
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredProjects = projectsList.filter(project => {
    const statusMatch = statusFilter === "all" || project.status === statusFilter;
    const priorityMatch = priorityFilter === "all" || project.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-blue-500" />
            Projects ({filteredProjects.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Project
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{project.name}</h4>
                    {getStatusBadge(project.status)}
                    {getPriorityBadge(project.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress 
                    value={project.progress} 
                    className="h-2"
                    style={{
                      "--progress-background": getProgressColor(project.progress)
                    } as React.CSSProperties}
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Due:</span>
                    <span className="font-medium">{project.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">${(project.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Team:</span>
                    <span className="font-medium">{project.teamSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="font-medium text-xs">{project.manager}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    Budget Used: ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K 
                    ({Math.round((project.spent / project.budget) * 100)}%)
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
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