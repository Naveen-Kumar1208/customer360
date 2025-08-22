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
  UserPlus,
  Building2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ContactImportSession {
  id: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
  uploadedAt: Date;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  duplicateRecords: number;
  errors: string[];
}

const sampleContactImportSessions: ContactImportSession[] = [
  {
    id: "contact-import-1",
    fileName: "business_contacts_2024.csv",
    status: "completed",
    uploadedAt: new Date("2024-01-15T10:30:00"),
    totalRecords: 350,
    processedRecords: 350,
    successfulRecords: 320,
    failedRecords: 15,
    duplicateRecords: 15,
    errors: ["Invalid email format in row 23", "Missing required field 'company' in row 87", "Duplicate contact found in row 145"]
  },
  {
    id: "contact-import-2",
    fileName: "linkedin_connections.xlsx",
    status: "processing",
    uploadedAt: new Date("2024-01-16T14:20:00"),
    totalRecords: 200,
    processedRecords: 125,
    successfulRecords: 115,
    failedRecords: 5,
    duplicateRecords: 5,
    errors: ["Duplicate phone number in row 45"]
  },
  {
    id: "contact-import-3",
    fileName: "event_attendees.csv",
    status: "failed",
    uploadedAt: new Date("2024-01-16T16:45:00"),
    totalRecords: 150,
    processedRecords: 30,
    successfulRecords: 0,
    failedRecords: 30,
    duplicateRecords: 0,
    errors: ["File format not supported", "Corrupted data detected", "Missing header row"]
  }
];

function ContactImportHistoryCard({ session }: { session: ContactImportSession }) {
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

  const progressPercentage = session.totalRecords > 0 ? 
    (session.processedRecords / session.totalRecords) * 100 : 0;

  const successRate = session.processedRecords > 0 ? 
    (session.successfulRecords / session.processedRecords) * 100 : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{session.fileName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  Contacts
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
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-lg font-semibold">{session.totalRecords}</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-gray-600">Success</p>
            <p className="text-lg font-semibold text-green-600">{session.successfulRecords}</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-gray-600">Failed</p>
            <p className="text-lg font-semibold text-red-600">{session.failedRecords}</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-gray-600">Duplicates</p>
            <p className="text-lg font-semibold text-yellow-600">{session.duplicateRecords}</p>
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
              Issues ({session.errors.length})
            </h4>
            <div className="space-y-1">
              {session.errors.slice(0, 2).map((error, index) => (
                <p key={index} className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </p>
              ))}
              {session.errors.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{session.errors.length - 2} more issues
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

export default function ImportContacts() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [importSettings, setImportSettings] = useState({
    skipDuplicates: true,
    validateEmails: true,
    autoAssignTags: false,
    defaultSource: "Import"
  });

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

  const totalImports = sampleContactImportSessions.length;
  const completedImports = sampleContactImportSessions.filter(s => s.status === 'completed').length;
  const processingImports = sampleContactImportSessions.filter(s => s.status === 'processing').length;
  const totalContactsImported = sampleContactImportSessions
    .filter(s => s.status === 'completed')
    .reduce((sum, s) => sum + s.successfulRecords, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contacts
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Import Contacts</h1>
            <p className="text-gray-600 mt-1">Bulk import contacts from CSV, Excel, or vCard files</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
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
                <p className="text-sm font-medium text-gray-600">Contacts Added</p>
                <p className="text-2xl font-bold text-purple-600">{totalContactsImported.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Contact File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
              {selectedFile ? selectedFile.name : "Drop your contact file here"}
            </h3>
            <p className="text-gray-600 mb-4">
              Support for CSV, Excel (.xlsx, .xls), and vCard (.vcf) files up to 10MB
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls,.vcf"
              className="hidden"
              id="contact-file-upload"
            />
            <label htmlFor="contact-file-upload">
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

          {/* Import Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Import Options</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={importSettings.skipDuplicates}
                    onChange={(e) => setImportSettings(prev => ({...prev, skipDuplicates: e.target.checked}))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Skip duplicate contacts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={importSettings.validateEmails}
                    onChange={(e) => setImportSettings(prev => ({...prev, validateEmails: e.target.checked}))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Validate email addresses</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={importSettings.autoAssignTags}
                    onChange={(e) => setImportSettings(prev => ({...prev, autoAssignTags: e.target.checked}))}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Auto-assign import tags</span>
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Default Values</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Source
                  </label>
                  <Input
                    value={importSettings.defaultSource}
                    onChange={(e) => setImportSettings(prev => ({...prev, defaultSource: e.target.value}))}
                    placeholder="Import"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              disabled={!selectedFile}
              className="px-8"
            >
              <Upload className="mr-2 h-4 w-4" />
              Start Contact Import
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
          {sampleContactImportSessions.map((session) => (
            <ContactImportHistoryCard key={session.id} session={session} />
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Contact Import Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Required Fields</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• First Name</li>
                <li>• Last Name (or Full Name)</li>
                <li>• Email Address</li>
                <li>• Phone Number (recommended)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Optional Fields</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Company Name</li>
                <li>• Job Title</li>
                <li>• Address</li>
                <li>• LinkedIn Profile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">File Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CSV files (.csv)</li>
                <li>• Excel files (.xlsx, .xls)</li>
                <li>• vCard files (.vcf)</li>
                <li>• Maximum 10MB file size</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}