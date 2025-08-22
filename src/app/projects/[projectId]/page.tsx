import React from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";

import ProjectDetailClient from "./ProjectDetailClient";
import { projectsList } from "@/lib/data/projectsData";

// For static export with dynamic project creation, we need to pre-generate possible project IDs
export async function generateStaticParams() {
  const staticProjects = projectsList.map((project) => ({
    projectId: project.id,
  }));

  // Generate a comprehensive list of potential project IDs for static export
  const categories = ['CDP', 'BANK', 'ECOM', 'FINT', 'PROJ'];
  const potentialProjects = [];
  
  categories.forEach(category => {
    // Generate up to 10 IDs per category (should cover most use cases)
    for (let i = 1; i <= 10; i++) {
      potentialProjects.push({
        projectId: `${category}-${String(i).padStart(3, '0')}`
      });
    }
  });

  return [...staticProjects, ...potentialProjects];
}

interface ProjectDetailPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <>
      <StaticExportLayout>
        <ProjectDetailClient projectId={params.projectId} />
      </StaticExportLayout>
    </>
  );
}