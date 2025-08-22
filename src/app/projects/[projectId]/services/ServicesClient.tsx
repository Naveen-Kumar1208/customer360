"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { projectsList } from "@/lib/data/projectsData";

interface ServicesClientProps {
  params: {
    projectId: string;
  };
}

export default function ServicesClient({ params }: ServicesClientProps) {
  const router = useRouter();
  const project = projectsList.find(p => p.id === params.projectId);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/projects/${params.projectId}`)}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Project
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <Settings className="w-8 h-8 mr-3 text-blue-600" />
                Services
              </h1>
              <p className="text-muted-foreground">
                Manage services for {project.name}
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Services management functionality is coming soon. This will include service configuration,
              monitoring, and integration management.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}