"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Database, 
  Calendar,
  Filter,
  CheckCircle,
  X,
  FileSpreadsheet,
  FileDown,
  Settings,
  MapPin,
  Activity
} from 'lucide-react';

interface ExportJourneysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exportFormats = [
  {
    id: 'csv',
    name: 'CSV',
    description: 'Comma-separated values for Excel/Sheets',
    icon: FileSpreadsheet,
    recommended: true
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Formatted journey report with visualizations',
    icon: FileText,
    recommended: false
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'Machine-readable journey data',
    icon: Database,
    recommended: false
  }
];

const exportFields = [
  { id: 'basic', name: 'Basic Information', description: 'Customer name, ID, company', selected: true },
  { id: 'stages', name: 'Journey Stages', description: 'All stages with status and dates', selected: true },
  { id: 'touchpoints', name: 'Touchpoints', description: 'Customer interaction points', selected: true },
  { id: 'milestones', name: 'Key Milestones', description: 'Important journey events', selected: true },
  { id: 'metrics', name: 'Journey Metrics', description: 'Score, value, duration', selected: true },
  { id: 'actions', name: 'Next Best Actions', description: 'Recommended actions and outcomes', selected: false },
  { id: 'timeline', name: 'Timeline Data', description: 'Detailed chronological events', selected: false }
];

const journeyStages = [
  { value: 'all', label: 'All Stages' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'consideration', label: 'Consideration' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'adoption', label: 'Adoption' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'advocacy', label: 'Advocacy' }
];

export const ExportJourneysModal: React.FC<ExportJourneysModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("format");
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [fields, setFields] = useState(exportFields);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [filters, setFilters] = useState({
    stage: 'all',
    priority: 'all',
    scoreRange: 'all'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFieldToggle = (fieldId: string) => {
    setFields(fields.map(field => 
      field.id === fieldId ? { ...field, selected: !field.selected } : field
    ));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isExporting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Completed!</h3>
            <p className="text-sm text-gray-600 text-center">
              Customer journeys have been exported successfully. Check your downloads folder.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Export Customer Journeys</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="format">Format</TabsTrigger>
                <TabsTrigger value="fields">Data Fields</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="format" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileDown className="w-5 h-5" />
                      Export Format
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <div
                            key={format.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                              selectedFormat === format.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedFormat(format.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon className="w-6 h-6 text-blue-600" />
                                <div>
                                  <h4 className="font-medium">{format.name}</h4>
                                  <p className="text-sm text-gray-600">{format.description}</p>
                                </div>
                              </div>
                              {format.recommended && (
                                <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fields" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Select Data Fields to Export
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {fields.map((field) => (
                        <div
                          key={field.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                            field.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                          onClick={() => handleFieldToggle(field.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{field.name}</h4>
                              <p className="text-sm text-gray-600">{field.description}</p>
                            </div>
                            {field.selected && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="filters" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Export Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stage">Journey Stage</Label>
                        <select
                          id="stage"
                          value={filters.stage}
                          onChange={(e) => setFilters({...filters, stage: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {journeyStages.map((stage) => (
                            <option key={stage.value} value={stage.value}>{stage.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="priority">Next Action Priority</Label>
                        <select
                          id="priority"
                          value={filters.priority}
                          onChange={(e) => setFilters({...filters, priority: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="all">All Priorities</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="scoreRange">Journey Score Range</Label>
                      <select
                        id="scoreRange"
                        value={filters.scoreRange}
                        onChange={(e) => setFilters({...filters, scoreRange: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="all">All Scores</option>
                        <option value="high">High (80+)</option>
                        <option value="medium">Medium (60-79)</option>
                        <option value="low">Low (0-59)</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={dateRange.startDate}
                          onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={dateRange.endDate}
                          onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Export Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Export Summary</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Format:</span>
                            <span className="ml-2 font-medium">{selectedFormat.toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Data Fields:</span>
                            <span className="ml-2 font-medium">{fields.filter(f => f.selected).length} selected</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Estimated records:</span>
                            <span className="ml-2 font-medium">~85 journeys</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Estimated size:</span>
                            <span className="ml-2 font-medium">~3.2 MB</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Selected Data Fields:</h4>
                        <div className="flex flex-wrap gap-2">
                          {fields.filter(f => f.selected).map(field => (
                            <Badge key={field.id} variant="outline">
                              {field.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Applied Filters:</h4>
                        <div className="flex flex-wrap gap-2">
                          {filters.stage !== 'all' && (
                            <Badge variant="outline" className="bg-blue-50">
                              <MapPin className="w-3 h-3 mr-1" />
                              Stage: {journeyStages.find(s => s.value === filters.stage)?.label}
                            </Badge>
                          )}
                          {filters.priority !== 'all' && (
                            <Badge variant="outline" className="bg-orange-50">
                              Priority: {filters.priority}
                            </Badge>
                          )}
                          {filters.scoreRange !== 'all' && (
                            <Badge variant="outline" className="bg-green-50">
                              <Activity className="w-3 h-3 mr-1" />
                              Score: {filters.scoreRange}
                            </Badge>
                          )}
                          {dateRange.startDate && (
                            <Badge variant="outline" className="bg-purple-50">
                              <Calendar className="w-3 h-3 mr-1" />
                              From: {dateRange.startDate}
                            </Badge>
                          )}
                          {dateRange.endDate && (
                            <Badge variant="outline" className="bg-purple-50">
                              <Calendar className="w-3 h-3 mr-1" />
                              To: {dateRange.endDate}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-2">
                {activeTab !== "format" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["format", "fields", "filters", "preview"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== "preview" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["format", "fields", "filters", "preview"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} disabled={isExporting}>
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting || fields.filter(f => f.selected).length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isExporting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Exporting...
                    </div>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export Journeys
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};