import React from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { projectsList, projectServices } from "@/lib/data/projectsData";

import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  const params = [];
  for (const project of projectsList) {
    const services = projectServices[project.id] || [];
    for (const service of services) {
      params.push({
        projectId: project.id,
        serviceId: service.id,
      });
    }
  }
  return params;
}

interface ServiceDetailPageProps {
  params: {
    projectId: string;
    serviceId: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  return (
    <>
      <StaticExportLayout>
        <ServiceDetailClient projectId={params.projectId} serviceId={params.serviceId} />
      </StaticExportLayout>
    </>
  );
}