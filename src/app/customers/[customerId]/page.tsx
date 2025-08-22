import React from "react";

import CustomerDetailClient from "./CustomerDetailClient";
import { customersData } from "@/lib/data/projectsData";

export async function generateStaticParams(): Promise<Array<{ customerId: string }>> {
  // Generate static params for all existing customers
  return customersData.map((customer) => ({
    customerId: customer.id
  }));
}

interface CustomerDetailPageProps {
  params: {
    customerId: string;
  };
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  return (
    <>
      <CustomerDetailClient params={params} />
    </>
  );
}