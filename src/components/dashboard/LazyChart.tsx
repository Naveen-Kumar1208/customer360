"use client";

import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Loading placeholder for charts
export function ChartSkeleton({ title }: { title?: string }) {
  return (
    <Card className="w-full">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-2 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// HOC for lazy loading charts
export function withLazyChart<T extends object>(
  Component: React.ComponentType<T>,
  fallbackTitle?: string
) {
  return React.memo(function LazyChartWrapper(props: T) {
    return (
      <Suspense fallback={<ChartSkeleton title={fallbackTitle} />}>
        <Component {...props} />
      </Suspense>
    );
  });
}