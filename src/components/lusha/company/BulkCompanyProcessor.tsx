"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  Upload,
  Download,
  Play,
  Pause,
  Square,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Loader2,
  FileText,
  Globe,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import type { BulkEnrichmentJob, CompanyData } from '@/types/lusha';
import { mockBulkJobs, mockCompanyData } from '@/lib/data/lusha-mock';

interface BulkCompanyProcessorProps {
  className?: string;
}

interface DomainInput {
  domains: string[];
  totalCount: number;
}

export function BulkCompanyProcessor({ className }: BulkCompanyProcessorProps) {
  const [domainInput, setDomainInput] = useState('');
  const [parsedDomains, setParsedDomains] = useState<DomainInput | null>(null);
  const [currentJob, setCurrentJob] = useState<BulkEnrichmentJob | null>(null);
  const [jobs, setJobs] = useState<BulkEnrichmentJob[]>(mockBulkJobs.filter(job => job.type === 'company'));
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDomainInput = (value: string) => {
    setDomainInput(value);
    
    if (value.trim()) {
      const domains = value
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          // Extract domain from URL or use as-is
          try {
            if (line.startsWith('http://') || line.startsWith('https://')) {
              return new URL(line).hostname;
            }
            return line;
          } catch {
            return line;
          }
        })
        .filter(domain => domain.includes('.')) // Basic domain validation
        .slice(0, 100); // Limit to 100 domains
      
      setParsedDomains({
        domains: domains,
        totalCount: domains.length
      });
    } else {
      setParsedDomains(null);
    }
  };

  const startBulkProcessing = () => {
    if (!parsedDomains) return;

    const newJob: BulkEnrichmentJob = {
      id: `bulk_company_${Date.now()}`,
      name: `Company Bulk Processing - ${parsedDomains.totalCount} domains`,
      type: 'company',
      status: 'processing',
      totalRecords: parsedDomains.totalCount,
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
        
        const newProcessed = Math.min(prev.processedRecords + Math.floor(Math.random() * 5) + 2, prev.totalRecords);
        const newSuccessful = Math.floor(newProcessed * 0.85); // 85% success rate for companies
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
          results: newProcessed >= prev.totalRecords ? mockCompanyData : undefined
        };

        if (newProcessed >= prev.totalRecords) {
          setIsProcessing(false);
          clearInterval(interval);
        }

        // Update jobs list
        setJobs(prevJobs => prevJobs.map(job => job.id === prev.id ? updated : job));

        return updated;
      });
    }, 1200); // Slightly slower than person enrichment
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
    console.log('Exporting company results for job:', job.id);
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

  const clearInput = () => {
    setDomainInput('');
    setParsedDomains(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5" />
            Bulk Company Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="domains">Company Domains (up to 100)</Label>
            <Textarea
              id="domains"
              placeholder={`Enter company domains, one per line:
techcorp.com
innovatelab.io
growthco.com
datatech.io
cloudsoft.com`}
              value={domainInput}
              onChange={(e) => handleDomainInput(e.target.value)}
              className="min-h-32 font-mono text-sm"
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <span>
                {parsedDomains ? `${parsedDomains.totalCount} valid domains found` : 'Enter domains to process'}
              </span>
              <span>100 domain limit</span>
            </div>
          </div>

          {parsedDomains && (
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Processing Preview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-blue-800">Sample Domains:</p>
                  <ul className="text-xs font-mono text-blue-700 mt-1">
                    {parsedDomains.domains.slice(0, 5).map((domain, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <Globe className="h-3 w-3" />
                        <span>{domain}</span>
                      </li>
                    ))}
                    {parsedDomains.domains.length > 5 && (
                      <li className="text-blue-600">... and {parsedDomains.domains.length - 5} more</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-blue-800">Estimated Output:</p>
                  <div className="text-xs text-blue-700 mt-1 space-y-1">
                    <div>• Company profiles</div>
                    <div>• Industry classification</div>
                    <div>• Employee counts</div>
                    <div>• Revenue estimates</div>
                    <div>• Technology stacks</div>
                    <div>• Contact information</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={startBulkProcessing}
              disabled={!parsedDomains || isProcessing || parsedDomains.totalCount === 0}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Processing ({parsedDomains?.totalCount || 0} domains)
            </Button>
            <Button variant="outline" onClick={clearInput}>
              Clear
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <p>💡 Pro Tips:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>Include both www and non-www domains for comprehensive coverage</li>
              <li>Processing time: ~2-3 seconds per domain</li>
              <li>Results include company size, industry, contact info, and technology stack</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Current Job Progress */}
      {currentJob && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                {getStatusIcon(currentJob.status)}
                <span className="ml-2">{currentJob.name}</span>
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
                    <span className="text-sm font-medium">Enriched</span>
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
                    {currentJob.results.slice(0, 2).map((company: CompanyData, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900">{company.name}</h4>
                            <p className="text-sm text-gray-500">{company.industry}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Globe className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{company.domain}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {company.location.city}, {company.location.country}
                              </span>
                            </div>
                            <div className="flex space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                {company.size}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {company.revenue}
                              </Badge>
                            </div>
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

      {/* Processing Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Processing History
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
                    <div className="text-xs text-gray-400 mt-1">
                      Started: {new Date(job.startedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <Badge className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                    {job.progress > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{job.progress}% complete</p>
                    )}
                  </div>
                  {job.status === 'completed' && (
                    <Button variant="outline" size="sm" onClick={() => exportResults(job)}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="text-center py-8">
                <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-500">No processing jobs yet</p>
                <p className="text-sm text-gray-400">Start a bulk company enrichment to see progress here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BulkCompanyProcessor;