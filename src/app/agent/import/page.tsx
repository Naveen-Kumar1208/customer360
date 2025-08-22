"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  Database,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  ArrowLeft,
  RefreshCw,
  Settings,
  Calendar,
  Target,
  UserPlus,
  Building2,
  Mail,
  Phone
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ImportSession {
  id: string;
  fileName: string;
  type: "leads" | "customers" | "contacts";
  status: "pending" | "processing" | "completed" | "failed";
  uploadedAt: Date;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  errors: string[];
}

const sampleImportSessions: ImportSession[] = [
  {
    id: "import-1",
    fileName: "leads_jan_2024.csv",
    type: "leads",
    status: "completed",
    uploadedAt: new Date("2024-01-15T10:30:00"),
    totalRecords: 250,
    processedRecords: 250,
    successfulRecords: 235,
    failedRecords: 15,
    errors: ["Invalid email format in row 23", "Missing required field 'company' in row 87"]
  },
  {
    id: "import-2",
    fileName: "customer_contacts.xlsx",
    type: "customers",
    status: "processing",
    uploadedAt: new Date("2024-01-16T14:20:00"),
    totalRecords: 150,
    processedRecords: 89,
    successfulRecords: 82,
    failedRecords: 7,
    errors: ["Duplicate phone number in row 45"]
  },
  {
    id: "import-3",
    fileName: "prospect_list.csv",
    type: "contacts",
    status: "failed",
    uploadedAt: new Date("2024-01-16T16:45:00"),
    totalRecords: 100,
    processedRecords: 25,
    successfulRecords: 0,
    failedRecords: 25,
    errors: ["File format not supported", "Corrupted data detected"]
  }
];

function ImportHistoryCard({ session }: { session: ImportSession }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'pending': return <Upload className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'leads': return <Target className="h-4 w-4 text-blue-600" />;
      case 'customers': return <Users className="h-4 w-4 text-green-600" />;
      case 'contacts': return <UserPlus className="h-4 w-4 text-purple-600" />;
      default: return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  const progressPercentage = session.totalRecords > 0 ? 
    (session.processedRecords / session.totalRecords) * 100 : 0;

  const successRate = session.processedRecords > 0 ? 
    (session.successfulRecords / session.processedRecords) * 100 : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getTypeIcon(session.type)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{session.fileName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {session.type}
                </Badge>
                <Badge className={getStatusColor(session.status)}>
                  {getStatusIcon(session.status)}
                  <span className="ml-1 capitalize">{session.status}</span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {session.uploadedAt.toLocaleString()}
          </div>
        </div>

        {/* Progress Bar */}
        {(session.status === 'processing' || session.status === 'completed') && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">
                {session.processedRecords} / {session.totalRecords}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Total Records</p>
            <p className="text-lg font-semibold">{session.totalRecords}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600">Successful</p>
            <p className="text-lg font-semibold text-green-600">{session.successfulRecords}</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-gray-600">Failed</p>
            <p className="text-lg font-semibold text-red-600">{session.failedRecords}</p>
          </div>
        </div>

        {/* Success Rate */}
        {session.processedRecords > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Success Rate</span>
              <span className={`font-medium ${successRate >= 90 ? 'text-green-600' : successRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {successRate.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* Errors */}
        {session.errors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Errors ({session.errors.length})
            </h4>
            <div className="space-y-1">
              {session.errors.slice(0, 2).map((error, index) => (
                <p key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              ))}
              {session.errors.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{session.errors.length - 2} more errors
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="mr-1 h-3 w-3" />
            View Details
          </Button>
          {session.status === 'completed' && (
            <Button size="sm" variant="outline" className="flex-1">
              <Download className="mr-1 h-3 w-3" />
              Export Report
            </Button>
          )}
          {session.status === 'failed' && (
            <Button size="sm" variant="outline" className="flex-1">
              <RefreshCw className="mr-1 h-3 w-3" />
              Retry Import
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ImportData() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<"leads" | "customers" | "contacts">("leads");
  const [dragActive, setDragActive] = useState(false);

  // Template data for different import types
  const templateData = {
    leads: {
      headers: ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle', 'source', 'status', 'notes'],
      sampleData: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1234567890',
          company: 'Acme Corp',
          jobTitle: 'Marketing Manager',
          source: 'Website',
          status: 'new',
          notes: 'Interested in premium package'
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@business.com',
          phone: '+1234567891',
          company: 'Business Solutions Ltd',
          jobTitle: 'Director of Sales',
          source: 'LinkedIn',
          status: 'qualified',
          notes: 'Follow up next week'
        }
      ]
    },
    customers: {
      headers: ['firstName', 'lastName', 'email', 'phone', 'company', 'segment', 'status', 'joinDate', 'totalValue'],
      sampleData: [
        {
          firstName: 'Michael',
          lastName: 'Johnson',
          email: 'michael.johnson@enterprise.com',
          phone: '+1234567892',
          company: 'Enterprise Solutions',
          segment: 'premium',
          status: 'active',
          joinDate: '2024-01-15',
          totalValue: '50000'
        },
        {
          firstName: 'Sarah',
          lastName: 'Wilson',
          email: 'sarah.wilson@startup.com',
          phone: '+1234567893',
          company: 'Tech Startup',
          segment: 'standard',
          status: 'active',
          joinDate: '2024-01-20',
          totalValue: '25000'
        }
      ]
    },
    contacts: {
      headers: ['firstName', 'lastName', 'email', 'phone', 'company', 'department', 'role', 'tags', 'lastContact'],
      sampleData: [
        {
          firstName: 'David',
          lastName: 'Brown',
          email: 'david.brown@contact.com',
          phone: '+1234567894',
          company: 'Contact Solutions',
          department: 'IT',
          role: 'Decision Maker',
          tags: 'technical, urgent',
          lastContact: '2024-01-25'
        },
        {
          firstName: 'Lisa',
          lastName: 'Garcia',
          email: 'lisa.garcia@network.com',
          phone: '+1234567895',
          company: 'Network Partners',
          department: 'Marketing',
          role: 'Influencer',
          tags: 'marketing, follow-up',
          lastContact: '2024-01-22'
        }
      ]
    }
  };

  const handleDownloadTemplate = () => {
    const currentTemplate = templateData[importType];
    
    // Create CSV content
    const headers = currentTemplate.headers.join(',');
    const sampleRows = currentTemplate.sampleData.map(row => 
      currentTemplate.headers.map(header => row[header as keyof typeof row] || '').join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${sampleRows}`;
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${importType}_import_template.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const totalImports = sampleImportSessions.length;
  const completedImports = sampleImportSessions.filter(s => s.status === 'completed').length;
  const processingImports = sampleImportSessions.filter(s => s.status === 'processing').length;
  const totalRecordsImported = sampleImportSessions
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.successfulRecords, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Import Data</h1>
            <p className="text-gray-600 mt-1">Import leads, customers, and contacts from CSV/Excel files</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Import Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Imports</p>
                <p className="text-2xl font-bold">{totalImports}</p>
              </div>
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedImports}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">{processingImports}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Records Imported</p>
                <p className="text-2xl font-bold text-purple-600">{totalRecordsImported.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Import Type Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Select Import Type
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setImportType("leads")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  importType === "leads" 
                    ? "border-blue-500 bg-blue-50 text-blue-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Target className="h-4 w-4" />
                <span>Leads</span>
              </button>
              <button
                onClick={() => setImportType("customers")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  importType === "customers" 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </button>
              <button
                onClick={() => setImportType("contacts")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  importType === "contacts" 
                    ? "border-purple-500 bg-purple-50 text-purple-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span>Contacts</span>
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {selectedFile ? selectedFile.name : "Drop your file here"}
            </h3>
            <p className="text-gray-600 mb-4">
              or click to browse and upload CSV, Excel, or JSON files
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls,.json"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Choose File
              </Button>
            </label>
            
            {selectedFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              disabled={!selectedFile}
              className="px-8"
            >
              <Upload className="mr-2 h-4 w-4" />
              Start Import
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Import History</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Completed</Button>
            <Button variant="outline" size="sm">Processing</Button>
            <Button variant="outline" size="sm">Failed</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sampleImportSessions.map((session) => (
            <ImportHistoryCard key={session.id} session={session} />
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Import Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Supported Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CSV files (.csv)</li>
                <li>• Excel files (.xlsx, .xls)</li>
                <li>• JSON files (.json)</li>
                <li>• Maximum 10MB file size</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Required Fields ({importType})</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {templateData[importType].headers.slice(0, 4).map((field, index) => (
                  <li key={index}>• {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>
                ))}
                {templateData[importType].headers.length > 4 && (
                  <li>• +{templateData[importType].headers.length - 4} more fields</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Download template for {importType}</li>
                <li>• Validate data before upload</li>
                <li>• Import in smaller batches</li>
                <li>• Review error reports</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}