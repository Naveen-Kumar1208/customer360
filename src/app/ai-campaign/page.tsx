"use client";

import React from "react";

import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { AICampaignCreator } from "@/components/ai-campaign/AICampaignCreator";

export default function AICampaignPage() {
  return (
    <>
      <StaticExportLayout>
        <AICampaignCreator />
      </StaticExportLayout>
    </>
  );
}