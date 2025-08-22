"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, MousePointerClick, DollarSign, TrendingUp } from 'lucide-react';

interface CampaignsTabProps {
  campaignData: any[];
}

export const CampaignsTab: React.FC<CampaignsTabProps> = ({ campaignData }) => {
  const totalImpressions = campaignData.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaignData.reduce((sum, c) => sum + c.clicks, 0);
  const totalSpend = campaignData.reduce((sum, c) => sum + c.spend, 0);
  const avgCTR = (totalClicks / totalImpressions * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Campaign Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Impressions</p>
                <p className="text-2xl font-bold mt-1">{totalImpressions.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold mt-1">{totalClicks.toLocaleString()}</p>
              </div>
              <MousePointerClick className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average CTR</p>
                <p className="text-2xl font-bold mt-1">{avgCTR}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold mt-1">${totalSpend.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignData.map((campaign, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge 
                        variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                        className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {campaign.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{campaign.channel}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Spend</p>
                    <p className="font-semibold">${campaign.spend.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Impressions</p>
                    <p className="font-medium">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clicks</p>
                    <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">CTR</p>
                    <p className="font-medium">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">CPC</p>
                    <p className="font-medium">${campaign.costPerClick}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Campaign Progress</span>
                    <span>{((campaign.clicks / campaign.impressions) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(campaign.clicks / campaign.impressions) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Social', 'Email', 'Paid Search', 'Display'].map((channel) => {
              const channelCampaigns = campaignData.filter(c => c.channel === channel);
              const channelImpressions = channelCampaigns.reduce((sum, c) => sum + c.impressions, 0);
              const channelClicks = channelCampaigns.reduce((sum, c) => sum + c.clicks, 0);
              const channelSpend = channelCampaigns.reduce((sum, c) => sum + c.spend, 0);
              const channelCTR = channelImpressions > 0 ? (channelClicks / channelImpressions * 100).toFixed(2) : '0';

              return (
                <div key={channel} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{channel}</p>
                    <p className="text-sm text-gray-500">{channelCampaigns.length} campaigns</p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Impressions</p>
                      <p className="font-medium">{channelImpressions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">CTR</p>
                      <p className="font-medium">{channelCTR}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Spend</p>
                      <p className="font-medium">${channelSpend.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};