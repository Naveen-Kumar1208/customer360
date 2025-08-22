"use client";

import React from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { LiveEventsComponent } from "@/components/live-events/LiveEventsComponent";

export default function AdminLiveEventsPage() {
  return (
    <StaticExportLayout>
      <LiveEventsComponent />
    </StaticExportLayout>
  );
}