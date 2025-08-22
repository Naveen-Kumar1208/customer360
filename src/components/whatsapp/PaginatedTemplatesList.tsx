'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  language: string;
  status: string;
  quality_rating?: string;
  content: string;
  header?: {
    type: string;
    content: string;
  };
  buttons?: any[];
  parameters?: string[];
}

interface PaginationInfo {
  currentPage: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextCursor: string | null;
  previousCursor: string | null;
  nextPage: number | null;
  previousPage: number | null;
}

interface TemplatesResponse {
  success: boolean;
  templates: WhatsAppTemplate[];
  source: string;
  pagination: PaginationInfo;
}

export default function PaginatedTemplatesList() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTemplates = async (page: number = 1, cursor: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `/api/whatsapp/templates?page=${page}&limit=10`;
      if (cursor) {
        url += `&after=${cursor}`;
      }
      
      console.log('🔄 Fetching templates:', url);
      
      const response = await fetch(url);
      const data: TemplatesResponse = await response.json();
      
      if (data.success) {
        setTemplates(data.templates);
        setPagination(data.pagination);
        setCurrentPage(page);
        console.log('✅ Templates loaded:', data.templates.length);
      } else {
        setError('Failed to fetch templates');
      }
    } catch (err) {
      console.error('❌ Error fetching templates:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    if (pagination?.hasNext && pagination.nextCursor) {
      fetchTemplates(pagination.nextPage || currentPage + 1, pagination.nextCursor);
    }
  };

  const goToPreviousPage = () => {
    if (pagination?.hasPrevious && pagination.previousCursor) {
      fetchTemplates(pagination.previousPage || currentPage - 1, pagination.previousCursor);
    }
  };

  const refreshTemplates = () => {
    fetchTemplates(1, '');
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityBadgeColor = (rating: string) => {
    switch (rating) {
      case 'GREEN':
        return 'bg-green-100 text-green-800';
      case 'YELLOW':
        return 'bg-yellow-100 text-yellow-800';
      case 'RED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={refreshTemplates} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">WhatsApp Templates</h1>
          <p className="text-gray-600">
            {pagination && `Showing ${templates.length} templates on page ${pagination.currentPage}`}
          </p>
        </div>
        <Button onClick={refreshTemplates} variant="outline" disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="py-8">
            <div className="flex items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              Loading templates...
            </div>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      {!loading && templates.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold truncate">
                      {template.name}
                    </CardTitle>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusBadgeColor(template.status)}>
                        {template.status}
                      </Badge>
                      {template.quality_rating && (
                        <Badge className={getQualityBadgeColor(template.quality_rating)}>
                          {template.quality_rating}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Category: {template.category}</span>
                      <span>Lang: {template.language}</span>
                    </div>
                    
                    {template.header && (
                      <div className="bg-blue-50 p-2 rounded text-sm">
                        <strong>Header:</strong> {template.header.content}
                      </div>
                    )}
                    
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      <strong>Body:</strong> {template.content}
                    </div>
                    
                    {template.buttons && template.buttons.length > 0 && (
                      <div className="text-sm text-blue-600">
                        {template.buttons.length} button(s)
                      </div>
                    )}
                    
                    {template.parameters && template.parameters.length > 0 && (
                      <div className="text-sm text-orange-600">
                        {template.parameters.length} parameter(s)
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination && (
            <div className="flex justify-between items-center py-4">
              <Button
                onClick={goToPreviousPage}
                disabled={!pagination.hasPrevious || loading}
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Page {pagination.currentPage}</span>
                <span>•</span>
                <span>{templates.length} templates</span>
              </div>

              <Button
                onClick={goToNextPage}
                disabled={!pagination.hasNext || loading}
                variant="outline"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && templates.length === 0 && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-gray-500">No templates found.</p>
              <Button onClick={refreshTemplates} className="mt-4" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}