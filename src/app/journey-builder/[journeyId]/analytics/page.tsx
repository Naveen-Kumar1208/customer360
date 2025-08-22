import React from "react";

import JourneyAnalyticsClient from "./JourneyAnalyticsClient";

export async function generateStaticParams(): Promise<Array<{ journeyId: string }>> {
  // Include sample journeys
  const sampleJourneys = [
    { journeyId: 'JB-001' },
    { journeyId: 'JB-002' },
    { journeyId: 'JB-003' },
    { journeyId: 'JB-004' },
    { journeyId: 'JB-746' }
  ];
  
  // Generate potential dynamic journey IDs (100-999 range)
  const dynamicJourneys = [];
  for (let i = 100; i <= 999; i++) { // Generate all IDs from 100-999
    dynamicJourneys.push({ journeyId: `JB-${i}` });
  }
  
  // Add some common timestamp-based patterns that might exist in localStorage
  const timestampPatterns = [
    '456427', '123456', '234567', '345678', '456789', '567890', '678901', '789012',
    '890123', '901234', '012345', '111111', '222222', '333333', '444444', '555555',
    '666666', '777777', '888888', '999999'
  ];
  
  const timestampJourneys = timestampPatterns.map(pattern => ({ journeyId: `JB-${pattern}` }));
  
  return [...sampleJourneys, ...dynamicJourneys, ...timestampJourneys];
}

interface JourneyAnalyticsPageProps {
  params: {
    journeyId: string;
  };
}

export default function JourneyAnalyticsPage({ params }: JourneyAnalyticsPageProps) {
  return (
    <>
      <JourneyAnalyticsClient params={params} />
    </>
  );
}