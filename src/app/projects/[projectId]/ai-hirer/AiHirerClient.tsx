"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { projectsList } from "@/lib/data/projectsData";

interface AiHirerClientProps {
  params: {
    projectId: string;
  };
}

export default function AiHirerClient({ params }: AiHirerClientProps) {
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
                <Bot className="w-8 h-8 mr-3 text-blue-600" />
                AI Hirer
              </h1>
              <p className="text-muted-foreground">
                AI-powered hiring and recruitment for {project.name}
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Hirer Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AI Hirer functionality is coming soon. This will include intelligent candidate screening,
              automated interview scheduling, and predictive hiring analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}