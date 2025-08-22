"use client";

import type React from 'react';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle,
  AlertCircle,
  X,
  FileSpreadsheet,
  Download,
  Eye,
  AlertTriangle,
  Plus
} from 'lucide-react';

interface ImportCustomersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const supportedFormats = [
  {
    id: 'csv',
    name: 'CSV File',
    description: 'Comma-separated values file (.csv)',
    icon: FileSpreadsheet,
    example: 'customers.csv'
  },
  {
    id: 'excel',
    name: 'Excel File',
    description: 'Microsoft Excel file (.xlsx, .xls)',
    icon: FileText,
    example: 'customers.xlsx'
  }
];

const requiredFields = [
  { name: 'firstName', required: true, description: 'Customer first name' },
  { name: 'lastName', required: true, description: 'Customer last name' },
  { name: 'primaryEmail', required: true, description: 'Primary email address (must be unique)' },
  { name: 'secondaryEmail', required: false, description: 'Secondary email address' },
  { name: 'primaryPhone', required: true, description: 'Primary phone number' },
  { name: 'secondaryPhone', required: false, description: 'Secondary phone number' },
  { name: 'socialLogin', required: false, description: 'Social login provider (Google, Facebook, LinkedIn, etc.)' },
  { name: 'status', required: false, description: 'Customer status (inactive, active, etc.)' },
  { name: 'segment', required: false, description: 'Customer segment (premium, standard, basic)' }
];

const sampleData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    primaryEmail: 'john.doe@company.com',
    secondaryEmail: 'john.personal@gmail.com',
    primaryPhone: '+1234567890',
    secondaryPhone: '+1234567899',
    socialLogin: 'Google',
    status: 'inactive',
    segment: 'premium'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    primaryEmail: 'jane.smith@business.com',
    secondaryEmail: '',
    primaryPhone: '+1234567891',
    secondaryPhone: '',
    socialLogin: 'LinkedIn',
    status: 'inactive',
    segment: 'standard'
  }
];

export const ImportCustomersModal: React.FC<ImportCustomersModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: number;
    duplicates: number;
    total: number;
  } | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValidationErrors([]);
      validateFile(file);
    }
  };

  const validateFile = (file: File) => {
    const errors: string[] = [];
    
    // Check file type
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (!allowedTypes.some(type => type.includes(fileExtension || ''))) {
      errors.push('Please upload a CSV or Excel file');
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      errors.push('File size must be less than 10MB');
    }
    
    setValidationErrors(errors);
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    try {
      // Simulate import process with progress
      for (let i = 0; i <= 100; i += 10) {
        setImportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Simulate results
      const results = {
        success: 145,
        errors: 3,
        duplicates: 12,
        total: 160
      };
      
      setImportResults(results);
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = requiredFields.map(field => field.name).join(',');
    const sampleRow = sampleData[0];
    const sampleRowData = requiredFields.map(field => sampleRow[field.name as keyof typeof sampleRow] || '').join(',');
    
    const csvContent = `${headers}\n${sampleRowData}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isImporting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (showSuccess && importResults) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Completed!</h3>
            <div className="text-sm text-gray-600 text-center space-y-1">
              <p><strong>{importResults.success}</strong> customers imported successfully</p>
              <p><strong>{importResults.duplicates}</strong> duplicates skipped</p>
              {importResults.errors > 0 && (
                <p className="text-red-600"><strong>{importResults.errors}</strong> errors encountered</p>
              )}
            </div>
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
            <Upload className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Import Customers</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isImporting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Customer File
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      {selectedFile ? (
                        <div className="space-y-2">
                          <FileSpreadsheet className="w-12 h-12 text-green-600 mx-auto" />
                          <h4 className="font-medium">{selectedFile.name}</h4>
                          <p className="text-sm text-gray-600">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Change File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <h4 className="font-medium">Drop your file here or click to browse</h4>
                          <p className="text-sm text-gray-600">
                            Supports CSV and Excel files up to 10MB
                          </p>
                          <Button onClick={() => fileInputRef.current?.click()}>
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>

                    {validationErrors.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <h4 className="font-medium text-red-800">Validation Errors</h4>
                        </div>
                        <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-4">
                      <h4 className="font-medium">Supported Formats</h4>
                      <div className="grid gap-3">
                        {supportedFormats.map((format) => {
                          const Icon = format.icon;
                          return (
                            <div key={format.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Icon className="w-6 h-6 text-blue-600" />
                              <div>
                                <h5 className="font-medium">{format.name}</h5>
                                <p className="text-sm text-gray-600">{format.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="template" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-blue-800">Import Template</h4>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Use our template to ensure your data is formatted correctly for import.
                      </p>
                      <Button onClick={handleDownloadTemplate} className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download CSV Template
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Required Fields</h4>
                      <div className="space-y-2">
                        {requiredFields.map((field) => (
                          <div key={field.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <span className="font-medium">{field.name}</span>
                              <p className="text-sm text-gray-600">{field.description}</p>
                            </div>
                            {field.required ? (
                              <Badge className="bg-red-100 text-red-800">Required</Badge>
                            ) : (
                              <Badge variant="outline">Optional</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Sample Data</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              {requiredFields.map((field) => (
                                <th key={field.name} className="border border-gray-300 px-3 py-2 text-left">
                                  {field.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sampleData.map((row, index) => (
                              <tr key={index}>
                                {requiredFields.map((field) => (
                                  <td key={field.name} className="border border-gray-300 px-3 py-2">
                                    {row[field.name as keyof typeof row] || ''}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Import Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedFile ? (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">File Information</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">File Name:</span>
                              <span className="ml-2 font-medium">{selectedFile.name}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">File Size:</span>
                              <span className="ml-2 font-medium">{(selectedFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Estimated Records:</span>
                              <span className="ml-2 font-medium">~160 customers</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Status:</span>
                              <span className="ml-2 font-medium text-green-600">Ready to Import</span>
                            </div>
                          </div>
                        </div>

                        {isImporting && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Import Progress</span>
                              <span className="text-sm text-gray-600">{importProgress}%</span>
                            </div>
                            <Progress value={importProgress} className="h-3" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Please upload a file to see the preview</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Import Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Skip Duplicates</h4>
                          <p className="text-sm text-gray-600">Skip customers with existing email addresses</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Update Existing</h4>
                          <p className="text-sm text-gray-600">Update existing customer information</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Send Notifications</h4>
                          <p className="text-sm text-gray-600">Send welcome emails to new customers</p>
                        </div>
                        <input type="checkbox" className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-2">
                {activeTab !== "upload" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["upload", "template", "preview", "settings"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== "settings" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["upload", "template", "preview", "settings"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} disabled={isImporting}>
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={isImporting || !selectedFile || validationErrors.length > 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isImporting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Importing...
                    </div>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Import Customers
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