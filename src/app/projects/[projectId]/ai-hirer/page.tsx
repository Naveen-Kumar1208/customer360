import React from "react";
import { projectsList } from "@/lib/data/projectsData";

import AiHirerClient from "./AiHirerClient";

export async function generateStaticParams() {
  return projectsList.map((project) => ({
    projectId: project.id.toString(),
  }));
}

interface AiHirerPageProps {
  params: {
    projectId: string;
  };
}

export default function AiHirerPage({ params }: AiHirerPageProps) {
  return (
    <>
      <AiHirerClient params={params} />
    </>
  );
}