import React from "react";
import { projectsList } from "@/lib/data/projectsData";

import TuitionClient from "./TuitionClient";

export async function generateStaticParams() {
  return projectsList.map((project) => ({
    projectId: project.id.toString(),
  }));
}

interface TuitionPageProps {
  params: {
    projectId: string;
  };
}

export default function TuitionPage({ params }: TuitionPageProps) {
  return (
    <>
      <TuitionClient params={params} />
    </>
  );
}