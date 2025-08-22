"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, Users } from 'lucide-react';

interface RetentionTabProps {
  retentionTabData: any;
}

export const RetentionTab: React.FC<RetentionTabProps> = ({ retentionTabData }) => {
  const getRetentionColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-green-400';
    if (value >= 40) return 'bg-yellow-400';
    if (value >= 20) return 'bg-orange-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Cohort Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Cohort Retention Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Cohort</th>
                  <th className="text-center py-2 px-2">Size</th>
                  <th className="text-center py-2 px-2">Week 1</th>
                  <th className="text-center py-2 px-2">Week 2</th>
                  <th className="text-center py-2 px-2">Week 3</th>
                  <th className="text-center py-2 px-2">Week 4</th>
                  <th className="text-center py-2 px-2">Week 5</th>
                  <th className="text-center py-2 px-2">Week 6</th>
                  <th className="text-center py-2 px-2">Week 7</th>
                  <th className="text-center py-2 px-2">Week 8</th>
                </tr>
              </thead>
              <tbody>
                {retentionTabData.cohortRetention.map((cohort) => (
                  <tr key={cohort.cohort} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">{cohort.cohort}</td>
                    <td className="text-center py-2 px-2">{cohort.size.toLocaleString()}</td>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => {
                      const value = cohort[`week${week}`];
                      return (
                        <td key={week} className="text-center py-2 px-2">
                          {value !== undefined ? (
                            <div className={`inline-block px-2 py-1 rounded text-white text-xs ${getRetentionColor(value)}`}>
                              {value}%
                            </div>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Segment Retention */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Retention by User Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-gray-600">
                    <th className="text-left py-2">Segment</th>
                    <th className="text-center py-2">Day 1</th>
                    <th className="text-center py-2">Day 3</th>
                    <th className="text-center py-2">Day 7</th>
                    <th className="text-center py-2">Day 14</th>
                    <th className="text-center py-2">Day 30</th>
                    <th className="text-center py-2">Day 60</th>
                    <th className="text-center py-2">Day 90</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionTabData.userSegmentRetention.map((segment) => (
                    <tr key={segment.segment} className="border-b hover:bg-gray-50">
                      <td className="py-3 font-medium">{segment.segment}</td>
                      <td className="text-center py-3">{segment.day1}%</td>
                      <td className="text-center py-3">{segment.day3}%</td>
                      <td className="text-center py-3">{segment.day7}%</td>
                      <td className="text-center py-3">{segment.day14}%</td>
                      <td className="text-center py-3">{segment.day30}%</td>
                      <td className="text-center py-3">{segment.day60}%</td>
                      <td className="text-center py-3">{segment.day90}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Churn Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              Monthly Churn Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {retentionTabData.churnRates.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{month.month}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-red-50 rounded">
                      <p className="text-xs text-gray-600">User Churn</p>
                      <p className="text-sm font-semibold text-red-600">{month.userChurn}%</p>
                    </div>
                    <div className="p-2 bg-orange-50 rounded">
                      <p className="text-xs text-gray-600">Revenue Churn</p>
                      <p className="text-sm font-semibold text-orange-600">{month.revenueChurn}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Retention by Source */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Retention by Traffic Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {retentionTabData.retentionBySource.map((source) => (
              <div key={source.source} className="text-center p-3 border rounded-lg">
                <h4 className="font-medium text-sm mb-3">{source.source}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">30 Day</p>
                    <p className="text-lg font-semibold">{source.day30}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">60 Day</p>
                    <p className="text-lg font-semibold">{source.day60}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">90 Day</p>
                    <p className="text-lg font-semibold">{source.day90}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};