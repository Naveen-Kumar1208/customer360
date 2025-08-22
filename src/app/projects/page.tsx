"use client";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { ProjectsContent } from "@/components/projects/ProjectsContent";


export default function ProjectsPage() {
  return (
    <>
      <StaticExportLayout>
        <ProjectsContent />
      </StaticExportLayout>
    </>
  );
}