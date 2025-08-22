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
  AlertCircle
} from "lucide-react";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (reportConfig: any) => void;
}

export function GenerateReportModal({ 
  isOpen, 
  onClose, 
  onGenerate 
}: GenerateReportModalProps) {
  const [reportConfig, setReportConfig] = useState({
    reportType: 'pipeline',
    dateRange: 'last-30-days',
    startDate: '',
    endDate: '',
    includeMetrics: ['deal-value', 'win-rate', 'cycle-time'],
    filterBy: '',
    groupBy: 'status',
    format: 'pdf',
    includeCharts: true,
    includeSummary: true,
    customTitle: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const reportTypes = [
    { value: 'pipeline', label: 'Pipeline Report', description: 'Overview of all MOFU leads and deal progression' },
    { value: 'performance', label: 'Performance Report', description: 'Win rates, conversion metrics, and trends' },
    { value: 'forecast', label: 'Forecast Report', description: 'Revenue projections and pipeline analysis' },
    { value: 'activity', label: 'Activity Report', description: 'Lead interactions and engagement metrics' },
    { value: 'conversion', label: 'Conversion Report', description: 'Funnel analysis and conversion rates' },
    { value: 'custom', label: 'Custom Report', description: 'Build your own report with selected metrics' }
  ];

  const dateRanges = [
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-quarter', label: 'Last Quarter' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Date Range' }
  ];

  const availableMetrics = [
    { value: 'deal-value', label: 'Total Deal Value', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'win-rate', label: 'Win Rate %', icon: <Target className="h-4 w-4" /> },
    { value: 'cycle-time', label: 'Sales Cycle Time', icon: <Calendar className="h-4 w-4" /> },
    { value: 'lead-count', label: 'Lead Count', icon: <Users className="h-4 w-4" /> },
    { value: 'conversion-rate', label: 'Conversion Rate', icon: <TrendingUp className="h-4 w-4" /> },
    { value: 'avg-deal-size', label: 'Average Deal Size', icon: <BarChart3 className="h-4 w-4" /> }
  ];

  const groupByOptions = [
    { value: 'status', label: 'Lead Status' },
    { value: 'source', label: 'Lead Source' },
    { value: 'industry', label: 'Industry' },
    { value: 'company-size', label: 'Company Size' },
    { value: 'deal-value', label: 'Deal Value Range' },
    { value: 'probability', label: 'Win Probability' },
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' }
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
        reportType: 'pipeline',
        dateRange: 'last-30-days',
        startDate: '',
        endDate: '',
        includeMetrics: ['deal-value', 'win-rate', 'cycle-time'],
        filterBy: '',
        groupBy: 'status',
        format: 'pdf',
        includeCharts: true,
        includeSummary: true,
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
            Generate MOFU Report
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
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center gap-2 text-blue-800 mb-1">
                  <PieChart className="h-4 w-4" />
                  <span className="font-medium">{selectedReportType.label}</span>
                </div>
                <p className="text-sm text-blue-700">{selectedReportType.description}</p>
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
                      ? 'border-blue-500 bg-blue-50'
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
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-charts"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => handleInputChange('includeCharts', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-charts" className="text-sm">Include Charts & Visualizations</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-summary"
                  checked={reportConfig.includeSummary}
                  onChange={(e) => handleInputChange('includeSummary', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="include-summary" className="text-sm">Include Executive Summary</Label>
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
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={reportConfig.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional context or notes for the report..."
                rows={3}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Report Preview</span>
              <Badge variant="outline">
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
            <Button onClick={handleGenerate} className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}