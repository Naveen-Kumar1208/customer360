"use client";

import type React from 'react';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, Clock, Activity, ExternalLink } from 'lucide-react';

interface OverviewTabProps {
  metrics: any;
  trafficSourcesData: any;
  visitorTrendData: any;
  contentPerformanceData: any[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  metrics,
  trafficSourcesData,
  visitorTrendData,
  contentPerformanceData
}) => {
  const trafficChartRef = useRef<any>(null);
  const visitorChartRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart) {
      initializeCharts();
    }

    // Cleanup function to destroy charts
    return () => {
      if (trafficChartRef.current) {
        trafficChartRef.current.destroy();
        trafficChartRef.current = null;
      }
      if (visitorChartRef.current) {
        visitorChartRef.current.destroy();
        visitorChartRef.current = null;
      }
    };
  }, []);

  const initializeCharts = () => {
    // Destroy existing charts first
    if (trafficChartRef.current) {
      trafficChartRef.current.destroy();
      trafficChartRef.current = null;
    }
    if (visitorChartRef.current) {
      visitorChartRef.current.destroy();
      visitorChartRef.current = null;
    }

    // Traffic Overview Chart
    const trafficCanvas = document.getElementById('traffic-overview-chart') as HTMLCanvasElement;
    if (trafficCanvas) {
      trafficChartRef.current = new window.Chart(trafficCanvas, {
        type: 'doughnut',
        data: {
          labels: trafficSourcesData.labels,
          datasets: [{
            data: trafficSourcesData.data,
            backgroundColor: [
              '#1459e8',
              '#3366ff',
              '#6366f1',
              '#8b5cf6', 
              '#a78bfa'
            ],
            borderWidth: 0,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15,
                font: { size: 12 }
              }
            }
          }
        }
      });
    }

    // Visitor Trend Chart
    const visitorCanvas = document.getElementById('visitor-trend-chart') as HTMLCanvasElement;
    if (visitorCanvas) {
      visitorChartRef.current = new window.Chart(visitorCanvas, {
        type: 'line',
        data: {
          labels: visitorTrendData.labels,
          datasets: [
            {
              label: 'Visitors',
              data: visitorTrendData.visitors,
              borderColor: '#1459e8',
              backgroundColor: 'rgba(20, 89, 232, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
            {
              label: 'Sessions',
              data: visitorTrendData.sessions,
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15,
                font: { size: 12 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold mt-1">{metrics.visitors.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {metrics.visitorsTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${metrics.visitorsTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(metrics.visitorsTrend)}%
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions</p>
                <p className="text-2xl font-bold mt-1">{metrics.sessions.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{metrics.sessionsTrend}%</span>
                </div>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Session Duration</p>
                <p className="text-2xl font-bold mt-1">{metrics.avgSessionDuration}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">{Math.abs(metrics.durationTrend)}%</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold mt-1">{metrics.bounceRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">{Math.abs(metrics.bounceRateTrend)}%</span>
                </div>
              </div>
              <ExternalLink className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <canvas id="traffic-overview-chart"></canvas>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <canvas id="visitor-trend-chart"></canvas>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="pb-3">Content Title</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3 text-right">Views</th>
                  <th className="pb-3 text-right">Avg. Time</th>
                  <th className="pb-3 text-right">Shares</th>
                  {contentPerformanceData.some(c => c.downloads > 0) && (
                    <th className="pb-3 text-right">Downloads</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {contentPerformanceData.map((content, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <p className="font-medium">{content.title}</p>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {content.type}
                      </span>
                    </td>
                    <td className="py-3 text-right">{content.views.toLocaleString()}</td>
                    <td className="py-3 text-right">{content.avgTime}</td>
                    <td className="py-3 text-right">{content.shares}</td>
                    {content.downloads > 0 && (
                      <td className="py-3 text-right">{content.downloads}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};