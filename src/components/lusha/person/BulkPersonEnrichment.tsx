"use client";

import type React from 'react';
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Play,
  Pause,
  Square,
  Users,
  Clock,
  Loader2
} from 'lucide-react';
import type { BulkEnrichmentJob, PersonData } from '@/types/lusha';
import { mockBulkJobs, mockPersonData } from '@/lib/data/lusha-mock';

interface BulkPersonEnrichmentProps {
  className?: string;
}

interface UploadedFile {
  file: File;
  preview: Array<{ [key: string]: string }>;
  totalRows: number;
}

export function BulkPersonEnrichment({ className }: BulkPersonEnrichmentProps) {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentJob, setCurrentJob] = useState<BulkEnrichmentJob | null>(null);
  const [jobs, setJobs] = useState<BulkEnrichmentJob[]>(mockBulkJobs.filter(job => job.type === 'person'));
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    // Simulate CSV parsing
    const mockPreview = [
      { firstName: 'John', lastName: 'Smith', company: 'TechCorp', email: 'john.smith@techcorp.com' },
      { firstName: 'Sarah', lastName: 'Johnson', company: 'InnovateLab', email: 'sarah.j@innovatelab.io' },
      { firstName: 'Mike', lastName: 'Chen', company: 'GrowthCo', email: 'mike.chen@growthco.com' },
      { firstName: 'Emily', lastName: 'Davis', company: 'DataTech', email: 'e.davis@datatech.com' },
      { firstName: 'David', lastName: 'Wilson', company: 'CloudSoft', email: 'david.w@cloudsoft.com' }
    ];

    setUploadedFile({
      file,
      preview: mockPreview,
      totalRows: 487
    });
  };

  const startEnrichment = () => {
    if (!uploadedFile) return;

    const newJob: BulkEnrichmentJob = {
      id: `bulk_${Date.now()}`,
      name: `Bulk Enrichment - ${uploadedFile.file.name}`,
      type: 'person',
      status: 'processing',
      totalRecords: uploadedFile.totalRows,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      startedAt: new Date().toISOString(),
      progress: 0
    };

    setCurrentJob(newJob);
    setJobs(prev => [newJob, ...prev]);
    setIsProcessing(true);

    // Simulate processing
    const interval = setInterval(() => {
      setCurrentJob(prev => {
        if (!prev) return null;
        
        const newProcessed = Math.min(prev.processedRecords + Math.floor(Math.random() * 10) + 5, prev.totalRecords);
        const newSuccessful = Math.floor(newProcessed * 0.92);
        const newFailed = newProcessed - newSuccessful;
        const progress = Math.floor((newProcessed / prev.totalRecords) * 100);

        const updated = {
          ...prev,
          processedRecords: newProcessed,
          successfulRecords: newSuccessful,
          failedRecords: newFailed,
          progress,
          status: newProcessed >= prev.totalRecords ? 'completed' as const : 'processing' as const,
          completedAt: newProcessed >= prev.totalRecords ? new Date().toISOString() : undefined,
          results: newProcessed >= prev.totalRecords ? mockPersonData.slice(0, 3) : undefined
        };

        if (newProcessed >= prev.totalRecords) {
          setIsProcessing(false);
          clearInterval(interval);
        }

        // Update jobs list
        setJobs(prevJobs => prevJobs.map(job => job.id === prev.id ? updated : job));

        return updated;
      });
    }, 1000);
  };

  const pauseJob = () => {
    if (currentJob) {
      setCurrentJob(prev => prev ? { ...prev, status: 'paused' } : null);
      setIsProcessing(false);
    }
  };

  const stopJob = () => {
    if (currentJob) {
      setCurrentJob(prev => prev ? { ...prev, status: 'failed' } : null);
      setIsProcessing(false);
    }
  };

  const exportResults = (job: BulkEnrichmentJob) => {
    // Simulate export
    console.log('Exporting results for job:', job.id);
  };

  const getStatusIcon = (status: BulkEnrichmentJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'paused':
        return <Pause className="h-5 w-5 text-yellow-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: BulkEnrichmentJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Bulk Person Enrichment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload CSV File
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your CSV file here, or click to browse
              </p>
              <Button
                onClick={() => document.getElementById('csv-upload')?.click()}
                variant="outline"
              >
                Choose File
              </Button>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <div className="mt-4 text-sm text-gray-500">
                <p>Required columns: firstName, lastName, company (optional: email, linkedinUrl)</p>
                <p>Maximum file size: 10MB | Maximum rows: 1000</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{uploadedFile.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {uploadedFile.totalRows} contacts • {(uploadedFile.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </Button>
              </div>

              {/* Preview */}
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Data Preview</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {Object.keys(uploadedFile.preview[0]).map((key) => (
                          <th key={key} className="text-left py-2 px-3 font-medium text-gray-900">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedFile.preview.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="py-2 px-3 text-gray-700">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Showing first 5 rows of {uploadedFile.totalRows} total contacts
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={startEnrichment}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Enrichment
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Template
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Job Progress */}
      {currentJob && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(currentJob.status)}
                <span className="ml-2">Processing: {currentJob.name}</span>
              </div>
              <Badge className={getStatusColor(currentJob.status)}>
                {currentJob.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {currentJob.processedRecords} / {currentJob.totalRecords}</span>
                <span>{currentJob.progress}%</span>
              </div>
              
              <Progress value={currentJob.progress} className="w-full" />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Success</span>
                  </div>
                  <p className="text-xl font-bold text-green-900">{currentJob.successfulRecords}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-red-600 mb-1">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Failed</span>
                  </div>
                  <p className="text-xl font-bold text-red-900">{currentJob.failedRecords}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Remaining</span>
                  </div>
                  <p className="text-xl font-bold text-blue-900">{currentJob.totalRecords - currentJob.processedRecords}</p>
                </div>
              </div>

              {currentJob.status === 'processing' && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={pauseJob}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm" onClick={stopJob}>
                    <Square className="mr-2 h-4 w-4" />
                    Stop
                  </Button>
                </div>
              )}

              {currentJob.status === 'completed' && currentJob.results && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Sample Results</h4>
                    <Button size="sm" onClick={() => exportResults(currentJob)}>
                      <Download className="mr-2 h-4 w-4" />
                      Export All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentJob.results.slice(0, 2).map((person: PersonData, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {person.firstName.charAt(0)}{person.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{person.firstName} {person.lastName}</p>
                            <p className="text-sm text-gray-500">{person.title}</p>
                            <p className="text-sm text-gray-400">{person.company}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Recent Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <p className="font-medium">{job.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{job.processedRecords} / {job.totalRecords} processed</span>
                      <span>Success: {job.successfulRecords}</span>
                      <span>Failed: {job.failedRecords}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                  {job.status === 'completed' && (
                    <Button variant="outline" size="sm" onClick={() => exportResults(job)}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BulkPersonEnrichment;