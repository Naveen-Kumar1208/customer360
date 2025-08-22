"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Share2, MessageSquare, Download, Calendar, User } from 'lucide-react';

interface ContentTabProps {
  blogPerformanceData: any[];
  contentPerformanceData: any[];
}

export const ContentTab: React.FC<ContentTabProps> = ({ blogPerformanceData, contentPerformanceData }) => {
  const totalViews = blogPerformanceData.reduce((sum, b) => sum + b.views, 0);
  const totalShares = blogPerformanceData.reduce((sum, b) => sum + b.shares, 0);
  const totalComments = blogPerformanceData.reduce((sum, b) => sum + b.comments, 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Analytics': 'bg-blue-100 text-blue-800',
      'Product': 'bg-purple-100 text-purple-800',
      'Data Science': 'bg-green-100 text-green-800',
      'Marketing': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Content Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold mt-1">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Shares</p>
                <p className="text-2xl font-bold mt-1">{totalShares.toLocaleString()}</p>
              </div>
              <Share2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold mt-1">{totalComments}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPerformanceData.map((blog, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{blog.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.published).toLocaleDateString()}
                      </span>
                      <Badge className={getCategoryColor(blog.category)}>
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Views
                    </p>
                    <p className="font-medium">{blog.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Avg. Time
                    </p>
                    <p className="font-medium">{blog.avgTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Share2 className="w-3 h-3" /> Shares
                    </p>
                    <p className="font-medium">{blog.shares}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Comments
                    </p>
                    <p className="font-medium">{blog.comments}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Types Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Content Types Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Blog Post', 'Whitepaper', 'Video', 'Guide'].map((type) => {
              const typeContent = contentPerformanceData.filter(c => c.type === type);
              const typeViews = typeContent.reduce((sum, c) => sum + c.views, 0);
              const avgEngagement = typeContent.length > 0 
                ? typeContent.reduce((sum, c) => sum + (c.shares || 0), 0) / typeContent.length 
                : 0;

              return (
                <div key={type} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{type}</h4>
                    <span className="text-sm text-gray-500">{typeContent.length} items</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Views</span>
                      <span className="font-medium">{typeViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg. Engagement</span>
                      <span className="font-medium">{Math.round(avgEngagement)} shares</span>
                    </div>
                    {type === 'Whitepaper' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Downloads</span>
                        <span className="font-medium">
                          {typeContent.reduce((sum, c) => sum + (c.downloads || 0), 0)}
                        </span>
                      </div>
                    )}
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