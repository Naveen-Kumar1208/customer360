import React from "react";
import { projectsList } from "@/lib/data/projectsData";

import ServicesClient from "./ServicesClient";

export async function generateStaticParams() {
  return projectsList.map((project) => ({
    projectId: project.id.toString(),
  }));
}

interface ServicesPageProps {
  params: {
    projectId: string;
  };
}

export default function ServicesPage({ params }: ServicesPageProps) {
  return (
    <>
      <ServicesClient params={params} />
    </>
  );
}