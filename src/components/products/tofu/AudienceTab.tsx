"use client";

import type React from 'react';
import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Monitor, Smartphone, Tablet } from 'lucide-react';

interface AudienceTabProps {
  audienceInsightsData: any;
}

export const AudienceTab: React.FC<AudienceTabProps> = ({ audienceInsightsData }) => {
  const ageChartRef = useRef<any>(null);
  const genderChartRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Chart) {
      initializeCharts();
    }
    
    // Cleanup function to destroy charts when component unmounts
    return () => {
      if (ageChartRef.current) {
        ageChartRef.current.destroy();
      }
      if (genderChartRef.current) {
        genderChartRef.current.destroy();
      }
    };
  }, []);

  const initializeCharts = () => {
    // Age Distribution Chart
    const ageCanvas = document.getElementById('age-distribution-chart') as HTMLCanvasElement;
    if (ageCanvas) {
      // Destroy existing chart if it exists
      if (ageChartRef.current) {
        ageChartRef.current.destroy();
      }
      
      ageChartRef.current = new window.Chart(ageCanvas, {
        type: 'bar',
        data: {
          labels: audienceInsightsData.demographics.age.map(a => a.range),
          datasets: [{
            label: 'Age Distribution',
            data: audienceInsightsData.demographics.age.map(a => a.percentage),
            backgroundColor: '#1459e8',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (value) => value + '%' }
            }
          }
        }
      });
    }

    // Gender Distribution Chart
    const genderCanvas = document.getElementById('gender-distribution-chart') as HTMLCanvasElement;
    if (genderCanvas) {
      // Destroy existing chart if it exists
      if (genderChartRef.current) {
        genderChartRef.current.destroy();
      }
      
      genderChartRef.current = new window.Chart(genderCanvas, {
        type: 'pie',
        data: {
          labels: audienceInsightsData.demographics.gender.map(g => g.type),
          datasets: [{
            data: audienceInsightsData.demographics.gender.map(g => g.percentage),
            backgroundColor: ['#1459e8', '#8b5cf6', '#ec4899']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                font: { size: 12 }
              }
            }
          }
        }
      });
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Desktop': return <Monitor className="w-5 h-5" />;
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <canvas id="age-distribution-chart"></canvas>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <canvas id="gender-distribution-chart"></canvas>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Audience Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audienceInsightsData.interests.map((interest, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{interest.category}</span>
                  <span className="text-sm text-gray-600">{interest.score}%</span>
                </div>
                <Progress value={interest.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Device Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audienceInsightsData.devices.map((device, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <p className="font-medium">{device.type}</p>
                      <p className="text-sm text-gray-500">Avg. Time: {device.avgTime}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Usage</span>
                    <span className="font-medium">{device.percentage}%</span>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audience Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Audience Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Primary Age Group</h4>
              <p className="text-2xl font-bold text-blue-800">25-34</p>
              <p className="text-sm text-blue-700 mt-1">35% of audience</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Top Interest</h4>
              <p className="text-2xl font-bold text-purple-800">Technology</p>
              <p className="text-sm text-purple-700 mt-1">85% interest score</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Primary Device</h4>
              <p className="text-2xl font-bold text-green-800">Desktop</p>
              <p className="text-sm text-green-700 mt-1">52% of traffic</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};