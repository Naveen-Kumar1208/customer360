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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Plus,
  Users,
  Target,
  UserCircle
} from 'lucide-react';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const importTypes = [
  {
    id: 'leads',
    name: 'Leads',
    description: 'Import prospect and lead data',
    icon: Target,
    fields: ['FirstName', 'LastName', 'Email', 'Phone', 'Company', 'Designation', 'LeadSource', 'FunnelStage', 'PotentialValue']
  },
  {
    id: 'customers',
    name: 'Customers',
    description: 'Import customer data and profiles',
    icon: UserCircle,
    fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'status', 'segment', 'totalValue']
  },
  {
    id: 'contacts',
    name: 'Contacts',
    description: 'Import contact database',
    icon: Users,
    fields: ['firstName', 'lastName', 'email', 'phone', 'company', 'designation', 'contactType']
  }
];

const supportedFormats = [
  {
    id: 'csv',
    name: 'CSV File',
    description: 'Comma-separated values file (.csv)',
    icon: FileSpreadsheet,
    example: 'data.csv'
  },
  {
    id: 'excel',
    name: 'Excel File',
    description: 'Microsoft Excel file (.xlsx, .xls)',
    icon: FileText,
    example: 'data.xlsx'
  }
];

const sampleData = {
  leads: [
    {
      FirstName: 'John',
      LastName: 'Doe',
      Email: 'john.doe@company.com',
      Phone: '+1234567890',
      Company: 'TechCorp',
      Designation: 'CTO',
      LeadSource: 'LinkedIn',
      FunnelStage: 'MOFU',
      PotentialValue: '500000'
    },
    {
      FirstName: 'Jane',
      LastName: 'Smith',
      Email: 'jane.smith@business.com',
      Phone: '+1234567891',
      Company: 'InnovateCorp',
      Designation: 'CEO',
      LeadSource: 'Website',
      FunnelStage: 'TOFU',
      PotentialValue: '750000'
    }
  ],
  customers: [
    {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael@enterprise.com',
      phone: '+1234567892',
      company: 'Enterprise Solutions',
      status: 'active',
      segment: 'premium',
      totalValue: '1200000'
    },
    {
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah@growth.com',
      phone: '+1234567893',
      company: 'Growth Dynamics',
      status: 'active',
      segment: 'standard',
      totalValue: '600000'
    }
  ],
  contacts: [
    {
      firstName: 'David',
      lastName: 'Brown',
      email: 'david@startup.com',
      phone: '+1234567894',
      company: 'StartupXYZ',
      designation: 'Product Manager',
      contactType: 'prospect'
    },
    {
      firstName: 'Lisa',
      lastName: 'Davis',
      email: 'lisa@consulting.com',
      phone: '+1234567895',
      company: 'Consulting Group',
      designation: 'Director',
      contactType: 'partner'
    }
  ]
};

export const ImportDataModal: React.FC<ImportDataModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("type");
  const [selectedType, setSelectedType] = useState<string>('');
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

  const selectedTypeData = importTypes.find(type => type.id === selectedType);

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setActiveTab("upload");
  };

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
    if (!selectedFile || !selectedType) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    try {
      // Simulate import process with progress
      for (let i = 0; i <= 100; i += 10) {
        setImportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Simulate results based on type
      const results = {
        success: Math.floor(Math.random() * 50) + 100,
        errors: Math.floor(Math.random() * 5) + 1,
        duplicates: Math.floor(Math.random() * 15) + 5,
        total: 0
      };
      results.total = results.success + results.errors + results.duplicates;
      
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
    if (!selectedTypeData) return;

    // Create CSV template based on selected type
    const headers = selectedTypeData.fields.join(',');
    const sampleRows = sampleData[selectedType as keyof typeof sampleData];
    const sampleRowData = sampleRows.map(row => 
      selectedTypeData.fields.map(field => row[field as keyof typeof row] || '').join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${sampleRowData}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}_import_template.csv`;
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
              <p><strong>{importResults.success}</strong> records imported successfully</p>
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
            <Upload className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Import Data</h2>
            {selectedTypeData && (
              <Badge className="ml-2" variant="outline">
                {selectedTypeData.name}
              </Badge>
            )}
          </div>
          <button
            onClick={onClose}
            disabled={isImporting}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="type">Data Type</TabsTrigger>
                <TabsTrigger value="upload" disabled={!selectedType}>Upload</TabsTrigger>
                <TabsTrigger value="template" disabled={!selectedType}>Template</TabsTrigger>
                <TabsTrigger value="preview" disabled={!selectedFile}>Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="type" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Select Data Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {importTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <div 
                            key={type.id} 
                            className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                              selectedType === type.id ? 'border-blue-500 bg-blue-50' : ''
                            }`}
                            onClick={() => handleTypeSelect(type.id)}
                          >
                            <Icon className="w-8 h-8 text-blue-600" />
                            <div className="flex-1">
                              <h4 className="font-medium">{type.name}</h4>
                              <p className="text-sm text-gray-600">{type.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {type.fields.slice(0, 4).map((field) => (
                                  <Badge key={field} variant="outline" className="text-xs">
                                    {field}
                                  </Badge>
                                ))}
                                {type.fields.length > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{type.fields.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {selectedType === type.id && (
                              <CheckCircle className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload {selectedTypeData?.name} File
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
                      Download {selectedTypeData?.name} Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium text-blue-800">Import Template</h4>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Use our template to ensure your {selectedTypeData?.name.toLowerCase()} data is formatted correctly for import.
                      </p>
                      <Button onClick={handleDownloadTemplate} className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download {selectedTypeData?.name} Template
                      </Button>
                    </div>

                    {selectedTypeData && (
                      <div className="space-y-4">
                        <h4 className="font-medium">Required Fields for {selectedTypeData.name}</h4>
                        <div className="grid gap-2">
                          {selectedTypeData.fields.map((field) => (
                            <div key={field} className="flex items-center justify-between p-3 border rounded-lg">
                              <span className="font-medium">{field}</span>
                              <Badge variant="outline">Required</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                              <span className="text-gray-600">Data Type:</span>
                              <span className="ml-2 font-medium">{selectedTypeData?.name}</span>
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
            </Tabs>

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex gap-2">
                {activeTab !== "type" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["type", "upload", "template", "preview"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeTab !== "preview" && selectedType && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["type", "upload", "template", "preview"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) {
                        let nextTab = tabs[currentIndex + 1];
                        if (nextTab === "preview" && !selectedFile) {
                          nextTab = "template";
                        }
                        setActiveTab(nextTab);
                      }
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
                  disabled={isImporting || !selectedFile || !selectedType || validationErrors.length > 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isImporting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Importing...
                    </div>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Import {selectedTypeData?.name || 'Data'}
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