"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CreateProjectModal } from "@/components/ui/create-project-modal";
import { useProjects } from "@/contexts/ProjectsContext";
import {
  FolderOpen,
  ArrowRight,
  Calendar,
  DollarSign,
  Users,
  Target,
  Plus,
} from "lucide-react";

export function ProjectsContent() {
  const router = useRouter();
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const { projects, addProject } = useProjects();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      in_progress: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      completed: { color: "bg-green-100 text-green-800 border-green-200" },
      planning: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      on_hold: { color: "bg-gray-100 text-gray-800 border-gray-200" }
    };
    
    const config = statusConfig[status] || statusConfig.planning;
    
    return (
      <Badge className={config.color}>
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

  const handleProjectSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const handleCreateProject = (projectData: any) => {
    console.log('Creating project:', projectData);
    
    // Generate a unique project ID based on category
    const categoryPrefix = projectData.category === 'Customer Data Platform' ? 'CDP' :
                          projectData.category === 'Banking & Finance' ? 'BANK' :
                          projectData.category === 'E-commerce' ? 'ECOM' :
                          projectData.category === 'FinTech' ? 'FINT' :
                          'PROJ';
    
    const projectId = `${categoryPrefix}-${String(projects.length + 1).padStart(3, '0')}`;
    
    // Create new project object
    const newProject = {
      id: projectId,
      name: projectData.name,
      description: projectData.description,
      status: "planning",
      priority: projectData.priority,
      progress: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      automationsCount: 0,
      segmentsCount: 0,
      activeCustomers: 0,
      conversionRate: 0,
      category: projectData.category,
      tags: projectData.tags,
      budget: projectData.budget,
      timeline: projectData.timeline,
      team: projectData.team,
      services: projectData.services,
      template: projectData.template
    };
    
    // Add new project to the context
    addProject(newProject);
    
    // Close modal
    setCreateProjectModalOpen(false);
    
    // Optionally redirect to the new project
    // router.push(`/projects/${projectId}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Select a Project</h1>
          <p className="text-muted-foreground">
            Choose a project to access its services and manage its resources
          </p>
        </div>
        <Button 
          onClick={() => setCreateProjectModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300"
            onClick={() => handleProjectSelect(project.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-blue-500" />
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {project.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {getStatusBadge(project.status)}
                  {getPriorityBadge(project.priority)}
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="font-medium text-xs">{project.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Customers:</span>
                    <span className="font-medium">{project.activeCustomers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium text-xs">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Conversion:</span>
                    <span className="font-medium">{project.conversionRate}%</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectSelect(project.id);
                  }}
                >
                  Access Project Services
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}