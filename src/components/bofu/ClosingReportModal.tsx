"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  AlertCircle,
  Award,
  CheckCircle,
  Clock
} from "lucide-react";

interface ClosingReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (reportConfig: any) => void;
}

export function ClosingReportModal({ 
  isOpen, 
  onClose, 
  onGenerate 
}: ClosingReportModalProps) {
  const [reportConfig, setReportConfig] = useState({
    reportType: 'closing-summary',
    dateRange: 'current-quarter',
    startDate: '',
    endDate: '',
    includeMetrics: ['win-rate', 'deal-velocity', 'revenue-closed'],
    filterBy: '',
    groupBy: 'close-date',
    format: 'pdf',
    includeCharts: true,
    includeForecast: true,
    includeCompetitors: true,
    customTitle: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const reportTypes = [
    { value: 'closing-summary', label: 'Closing Summary Report', description: 'Overview of closed deals and pipeline closure rates' },
    { value: 'win-loss-analysis', label: 'Win/Loss Analysis', description: 'Detailed analysis of won and lost deals with insights' },
    { value: 'revenue-forecast', label: 'Revenue Forecast', description: 'Projected revenue based on current pipeline and trends' },
    { value: 'close-date-tracking', label: 'Close Date Tracking', description: 'Analysis of close date accuracy and deal velocity' },
    { value: 'competitor-analysis', label: 'Competitor Analysis', description: 'Win/loss rates against specific competitors' },
    { value: 'executive-dashboard', label: 'Executive Dashboard', description: 'High-level metrics for leadership team' }
  ];

  const dateRanges = [
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'current-quarter', label: 'Current Quarter' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'current-year', label: 'Current Year' },
    { value: 'last-12-months', label: 'Last 12 Months' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const availableMetrics = [
    { value: 'win-rate', label: 'Win Rate %', icon: <Target className="h-4 w-4" /> },
    { value: 'deal-velocity', label: 'Deal Velocity', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'revenue-closed', label: 'Revenue Closed', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'deals-closed', label: 'Deals Closed', icon: <CheckCircle className="h-4 w-4" /> },
    { value: 'avg-deal-size', label: 'Average Deal Size', icon: <BarChart3 className="h-4 w-4" /> },
    { value: 'time-to-close', label: 'Time to Close', icon: <Clock className="h-4 w-4" /> },
    { value: 'pipeline-conversion', label: 'Pipeline Conversion', icon: <Users className="h-4 w-4" /> },
    { value: 'forecast-accuracy', label: 'Forecast Accuracy', icon: <Award className="h-4 w-4" /> }
  ];

  const groupByOptions = [
    { value: 'close-date', label: 'Close Date' },
    { value: 'deal-size', label: 'Deal Size Range' },
    { value: 'industry', label: 'Industry' },
    { value: 'source', label: 'Lead Source' },
    { value: 'sales-rep', label: 'Sales Representative' },
    { value: 'competitors', label: 'Competitors Faced' },
    { value: 'deal-stage', label: 'Deal Stage' },
    { value: 'win-loss', label: 'Win/Loss Status' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!reportConfig.reportType) {
      newErrors.reportType = "Report type is required";
    }

    if (reportConfig.dateRange === 'custom' && (!reportConfig.startDate || !reportConfig.endDate)) {
      newErrors.dateRange = "Start and end dates are required for custom range";
    }

    if (reportConfig.includeMetrics.length === 0) {
      newErrors.metrics = "At least one metric must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMetricToggle = (metric: string) => {
    const updatedMetrics = reportConfig.includeMetrics.includes(metric)
      ? reportConfig.includeMetrics.filter(m => m !== metric)
      : [...reportConfig.includeMetrics, metric];
    
    setReportConfig({
      ...reportConfig,
      includeMetrics: updatedMetrics
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setReportConfig(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleGenerate = () => {
    if (validateForm()) {
      onGenerate(reportConfig);
      
      // Reset form
      setReportConfig({
        reportType: 'closing-summary',
        dateRange: 'current-quarter',
        startDate: '',
        endDate: '',
        includeMetrics: ['win-rate', 'deal-velocity', 'revenue-closed'],
        filterBy: '',
        groupBy: 'close-date',
        format: 'pdf',
        includeCharts: true,
        includeForecast: true,
        includeCompetitors: true,
        customTitle: '',
        notes: ''
      });
      setErrors({});
      onClose();
    }
  };

  const selectedReportType = reportTypes.find(t => t.value === reportConfig.reportType);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Closing Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Report Type</h3>
            </div>
            
            <div>
              <Label htmlFor="report-type">Report Type *</Label>
              <Select 
                value={reportConfig.reportType} 
                onValueChange={(value) => handleInputChange('reportType', value)}
              >
                <SelectTrigger className={errors.reportType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reportType && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.reportType}
                </p>
              )}
            </div>

            {selectedReportType && (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <div className="flex items-center gap-2 text-red-800 mb-1">
                  <PieChart className="h-4 w-4" />
                  <span className="font-medium">{selectedReportType.label}</span>
                </div>
                <p className="text-sm text-red-700">{selectedReportType.description}</p>
              </div>
            )}
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Calendar className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Date Range</h3>
            </div>
            
            <div>
              <Label htmlFor="date-range">Date Range</Label>
              <Select 
                value={reportConfig.dateRange} 
                onValueChange={(value) => handleInputChange('dateRange', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map(range => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {reportConfig.dateRange === 'custom' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={reportConfig.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className={errors.dateRange ? "border-red-500" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={reportConfig.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className={errors.dateRange ? "border-red-500" : ""}
                  />
                </div>
              </div>
            )}
            {errors.dateRange && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.dateRange}
              </p>
            )}
          </div>

          {/* Metrics Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <TrendingUp className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Metrics to Include</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {availableMetrics.map(metric => (
                <div 
                  key={metric.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    reportConfig.includeMetrics.includes(metric.value)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleMetricToggle(metric.value)}
                >
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.metrics && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.metrics}
              </p>
            )}
          </div>

          {/* Report Configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Filter className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Report Configuration</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="group-by">Group Data By</Label>
                <Select 
                  value={reportConfig.groupBy} 
                  onValueChange={(value) => handleInputChange('groupBy', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {groupByOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select 
                  value={reportConfig.format} 
                  onValueChange={(value) => handleInputChange('format', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-charts"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-charts" className="text-sm">Include Charts</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-forecast"
                  checked={reportConfig.includeForecast}
                  onChange={(e) => handleInputChange('includeForecast', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-forecast" className="text-sm">Revenue Forecast</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-competitors"
                  checked={reportConfig.includeCompetitors}
                  onChange={(e) => handleInputChange('includeCompetitors', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-competitors" className="text-sm">Competitor Analysis</Label>
              </div>
            </div>
          </div>

          {/* Customization */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <FileText className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Customization</h3>
            </div>
            
            <div>
              <Label htmlFor="custom-title">Custom Report Title</Label>
              <Input
                id="custom-title"
                value={reportConfig.customTitle}
                onChange={(e) => handleInputChange('customTitle', e.target.value)}
                placeholder="Leave blank for default title"
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Executive Summary Notes</Label>
              <Textarea
                id="notes"
                value={reportConfig.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Key insights, highlights, or context for the executive team..."
                rows={3}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Report Preview</span>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {selectedReportType?.label || 'No type selected'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Date Range: {reportConfig.dateRange.replace('-', ' ')}</div>
              <div>Format: {reportConfig.format.toUpperCase()}</div>
              <div>Metrics: {reportConfig.includeMetrics.length} selected</div>
              <div>Group By: {groupByOptions.find(o => o.value === reportConfig.groupBy)?.label}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} className="bg-red-600 hover:bg-red-700">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}