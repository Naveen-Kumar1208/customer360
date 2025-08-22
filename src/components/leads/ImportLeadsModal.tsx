"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Target,
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Users,
  X,
  FileSpreadsheet,
  Database,
  Workflow,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ImportLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: any[]) => void;
}

export function ImportLeadsModal({ isOpen, onClose, onImport }: ImportLeadsModalProps) {
  const router = useRouter();
  const [importMethod, setImportMethod] = useState("file");
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [importedCount, setImportedCount] = useState(0);
  const [mapping, setMapping] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    value: "",
    source: "",
    stage: ""
  });
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [importSettings, setImportSettings] = useState({
    skipDuplicates: true,
    autoAssignStage: "tofu",
    defaultSource: "import"
  });
  const [manualLeadData, setManualLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    value: "",
    source: "manual",
    stage: "tofu"
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileUploaded(true);
      // Simulate file parsing and preview
      setPreviewData([
        { name: "John Doe", company: "TechCorp", email: "john@techcorp.com", phone: "+1234567890", value: "50000" },
        { name: "Jane Smith", company: "InnovateInc", email: "jane@innovate.com", phone: "+1234567891", value: "75000" },
        { name: "Bob Johnson", company: "StartupXYZ", email: "bob@startup.com", phone: "+1234567892", value: "25000" }
      ]);
    }
  };

  const handleImport = () => {
    // Simulate import process
    const importedLeads = previewData.map((lead, index) => ({
      id: `import-${index + 1}`,
      name: lead[mapping.name] || lead.name,
      company: lead[mapping.company] || lead.company,
      email: lead[mapping.email] || lead.email,
      phone: lead[mapping.phone] || lead.phone,
      value: Number.parseInt(lead[mapping.value] || lead.value) || 0,
      source: importSettings.defaultSource,
      stage: importSettings.autoAssignStage,
      score: Math.floor(Math.random() * 50) + 50,
      tags: ["imported"],
      createdAt: new Date(),
      lastActivity: new Date()
    }));

    onImport(importedLeads);
    setImportedCount(importedLeads.length);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setFileUploaded(false);
    setFileName("");
    setPreviewData([]);
    setImportMethod("file");
    setShowSuccess(false);
    setShowManualEntry(false);
    setImportedCount(0);
    setMapping({
      name: "",
      company: "",
      email: "",
      phone: "",
      value: "",
      source: "",
      stage: ""
    });
    resetManualForm();
    onClose();
  };

  const handleUseAutomation = () => {
    handleClose();
    router.push("/automation");
  };

  const handleLeadGen = () => {
    handleClose();
    router.push("/agent/integrations/lusha");
  };

  const handleManualLeadSubmit = () => {
    if (!manualLeadData.name || !manualLeadData.email) return;
    
    const newLead = {
      id: `manual-${Date.now()}`,
      name: manualLeadData.name,
      company: manualLeadData.company,
      email: manualLeadData.email,
      phone: manualLeadData.phone,
      value: Number.parseInt(manualLeadData.value) || 0,
      source: manualLeadData.source,
      stage: manualLeadData.stage,
      score: Math.floor(Math.random() * 50) + 50,
      tags: ["manual"],
      createdAt: new Date(),
      lastActivity: new Date()
    };

    onImport([newLead]);
    setImportedCount(1);
    setShowSuccess(true);
    setShowManualEntry(false);
  };

  const resetManualForm = () => {
    setManualLeadData({
      name: "",
      company: "",
      email: "",
      phone: "",
      value: "",
      source: "manual",
      stage: "tofu"
    });
  };

  const availableColumns = previewData.length > 0 ? Object.keys(previewData[0]) : [];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Import Leads
          </DialogTitle>
        </DialogHeader>

        {showSuccess ? (
          /* Success State */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Import Successful!</h3>
              <p className="text-gray-600">
                Successfully imported {importedCount} leads to your database.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleUseAutomation}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Workflow className="h-4 w-4 mr-2" />
                Use Automation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        ) : showManualEntry ? (
          /* Manual Entry Form */
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Users className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Manual Lead Entry</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowManualEntry(false)}
                className="ml-auto"
              >
                ← Back to Import Methods
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manual-name">Name *</Label>
                <Input
                  id="manual-name"
                  value={manualLeadData.name}
                  onChange={(e) => setManualLeadData({...manualLeadData, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="manual-company">Company</Label>
                <Input
                  id="manual-company"
                  value={manualLeadData.company}
                  onChange={(e) => setManualLeadData({...manualLeadData, company: e.target.value})}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor="manual-email">Email *</Label>
                <Input
                  id="manual-email"
                  type="email"
                  value={manualLeadData.email}
                  onChange={(e) => setManualLeadData({...manualLeadData, email: e.target.value})}
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="manual-phone">Phone</Label>
                <Input
                  id="manual-phone"
                  value={manualLeadData.phone}
                  onChange={(e) => setManualLeadData({...manualLeadData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="manual-value">Deal Value</Label>
                <Input
                  id="manual-value"
                  type="number"
                  value={manualLeadData.value}
                  onChange={(e) => setManualLeadData({...manualLeadData, value: e.target.value})}
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="manual-stage">Stage</Label>
                <Select value={manualLeadData.stage} onValueChange={(value) => setManualLeadData({...manualLeadData, stage: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tofu">TOFU - Awareness</SelectItem>
                    <SelectItem value="mofu">MOFU - Consideration</SelectItem>
                    <SelectItem value="bofu">BOFU - Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowManualEntry(false)}>
                Cancel
              </Button>
              <Button variant="outline" onClick={resetManualForm}>
                Clear Form
              </Button>
              <Button 
                onClick={handleManualLeadSubmit}
                disabled={!manualLeadData.name || !manualLeadData.email}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Import Method Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Database className="h-4 w-4 text-gray-500" />
              <h3 className="font-medium">Import Method</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  importMethod === 'file' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setImportMethod('file')}
              >
                <FileSpreadsheet className="h-8 w-8 text-blue-600 mb-2" />
                <h4 className="font-medium">CSV/Excel File</h4>
                <p className="text-sm text-gray-600">Upload a spreadsheet file</p>
              </div>
              
              <div 
                className="p-4 rounded-lg border-2 cursor-pointer transition-colors border-gray-200 hover:border-gray-300"
                onClick={handleLeadGen}
              >
                <Database className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium">Lead Gen</h4>
                <p className="text-sm text-gray-600">Generate leads with Lusha</p>
              </div>
              
              <div 
                className="p-4 rounded-lg border-2 cursor-pointer transition-colors border-gray-200 hover:border-gray-300"
                onClick={() => setShowManualEntry(true)}
              >
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-medium">Manual Entry</h4>
                <p className="text-sm text-gray-600">Add leads one by one</p>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          {importMethod === 'file' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <Upload className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">File Upload</h3>
              </div>
              
              {!fileUploaded ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload your leads file</h4>
                    <p className="text-gray-600 mb-4">
                      Supports CSV, Excel (.xlsx, .xls) files up to 10MB
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Button asChild>
                          <span>
                            <FileText className="mr-2 h-4 w-4" />
                            Choose File
                          </span>
                        </Button>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">File uploaded successfully</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setFileUploaded(false);
                        setFileName("");
                        setPreviewData([]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    {fileName} • {previewData.length} leads detected
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Field Mapping */}
          {fileUploaded && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <FileText className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Field Mapping</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name Field</Label>
                  <Select value={mapping.name} onValueChange={(value) => setMapping({...mapping, name: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select name column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColumns.map(col => (
                        <SelectItem key={col} value={col}>{col}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Company Field</Label>
                  <Select value={mapping.company} onValueChange={(value) => setMapping({...mapping, company: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColumns.map(col => (
                        <SelectItem key={col} value={col}>{col}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Email Field</Label>
                  <Select value={mapping.email} onValueChange={(value) => setMapping({...mapping, email: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select email column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColumns.map(col => (
                        <SelectItem key={col} value={col}>{col}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Value Field</Label>
                  <Select value={mapping.value} onValueChange={(value) => setMapping({...mapping, value: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select value column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColumns.map(col => (
                        <SelectItem key={col} value={col}>{col}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Import Settings */}
          {fileUploaded && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Import Settings</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Default Stage</Label>
                  <Select value={importSettings.autoAssignStage} onValueChange={(value) => setImportSettings({...importSettings, autoAssignStage: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tofu">TOFU - Awareness</SelectItem>
                      <SelectItem value="mofu">MOFU - Consideration</SelectItem>
                      <SelectItem value="bofu">BOFU - Decision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Default Source</Label>
                  <Select value={importSettings.defaultSource} onValueChange={(value) => setImportSettings({...importSettings, defaultSource: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="crm">CRM</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="skip-duplicates"
                  checked={importSettings.skipDuplicates}
                  onChange={(e) => setImportSettings({...importSettings, skipDuplicates: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="skip-duplicates">Skip duplicate leads (based on email)</Label>
              </div>
            </div>
          )}

          {/* Preview */}
          {previewData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <CheckCircle className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium">Preview ({previewData.length} leads)</h3>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Email</th>
                        <th className="text-left p-3 font-medium">Value</th>
                        <th className="text-left p-3 font-medium">Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((lead, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{lead.name}</td>
                          <td className="p-3">{lead.company}</td>
                          <td className="p-3">{lead.email}</td>
                          <td className="p-3">₹{Number.parseInt(lead.value).toLocaleString()}</td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {importSettings.autoAssignStage.toUpperCase()}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!fileUploaded || previewData.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Target className="h-4 w-4 mr-2" />
              Import {previewData.length} Leads
            </Button>
          </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}