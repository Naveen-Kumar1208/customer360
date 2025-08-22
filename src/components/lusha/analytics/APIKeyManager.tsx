"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  RefreshCw,
  Settings,
  Shield,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Zap
} from 'lucide-react';
import type { APIKeyInfo } from '@/types/lusha';
import { mockAPIKeys } from '@/lib/data/lusha-mock';

interface APIKeyManagerProps {
  className?: string;
}

export function APIKeyManager({ className }: APIKeyManagerProps) {
  const [apiKeys, setApiKeys] = useState<APIKeyInfo[]>(mockAPIKeys);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKeyInfo | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success toast (would integrate with your toast system)
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const testConnection = async (keyId: string) => {
    setIsTestingConnection(true);
    
    // Simulate API test
    setTimeout(() => {
      setConnectionStatus(Math.random() > 0.2 ? 'success' : 'error');
      setIsTestingConnection(false);
    }, 2000);
  };

  const regenerateKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? {
            ...key,
            key: `lsk_live_${Math.random().toString(36).substring(2, 18)}`,
            masked: `lsk_live_••••••••••••${Math.random().toString(36).substring(2, 6)}`,
          }
        : key
    ));
  };

  const deleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
  };

  const createNewKey = () => {
    if (!newKeyName) return;

    const newKey: APIKeyInfo = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `lsk_live_${Math.random().toString(36).substring(2, 18)}`,
      masked: `lsk_live_••••••••••••${Math.random().toString(36).substring(2, 6)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      usageCount: 0,
      rateLimits: {
        daily: 1000,
        monthly: 10000,
        perSecond: 10
      },
      permissions: newKeyPermissions.length > 0 ? newKeyPermissions : ['person:read', 'company:read']
    };

    setApiKeys(prev => [newKey, ...prev]);
    setNewKeyName('');
    setNewKeyPermissions([]);
    setShowNewKeyDialog(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'expired':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Key Management</h2>
          <p className="text-gray-600 mt-1">Manage your Lusha API keys and access controls</p>
        </div>
        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
            </DialogHeader>
            <CreateKeyForm 
              keyName={newKeyName}
              setKeyName={setNewKeyName}
              permissions={newKeyPermissions}
              setPermissions={setNewKeyPermissions}
              onCreate={createNewKey}
              onCancel={() => setShowNewKeyDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Connection Status */}
      {connectionStatus && (
        <Alert className={connectionStatus === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          <div className="flex items-center">
            {connectionStatus === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={`ml-2 ${connectionStatus === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {connectionStatus === 'success' 
                ? 'API connection test successful!' 
                : 'API connection test failed. Please check your key configuration.'}
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    {/* Key Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(apiKey.status)}
                          <Badge className={getStatusColor(apiKey.status)}>
                            {apiKey.status.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">Created {formatDate(apiKey.createdAt)}</span>
                          {apiKey.lastUsed && (
                            <>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">Last used {formatDate(apiKey.lastUsed)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testConnection(apiKey.id)}
                          disabled={isTestingConnection}
                        >
                          {isTestingConnection ? (
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Activity className="mr-2 h-4 w-4" />
                          )}
                          Test
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedKey(selectedKey?.id === apiKey.id ? null : apiKey)}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                      </div>
                    </div>

                    {/* Key Value */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          value={visibleKeys.has(apiKey.id) ? apiKey.key : apiKey.masked}
                          readOnly
                          className="font-mono text-sm flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">Usage Count</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {apiKey.usageCount.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Daily Limit</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900 mt-1">
                          {apiKey.rateLimits.daily.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-600">Rate Limit</span>
                        </div>
                        <p className="text-lg font-bold text-purple-900 mt-1">
                          {apiKey.rateLimits.perSecond}/sec
                        </p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Permissions</span>
                        </div>
                        <p className="text-lg font-bold text-green-900 mt-1">
                          {apiKey.permissions.length}
                        </p>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Permissions</Label>
                      <div className="flex flex-wrap gap-2">
                        {apiKey.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Configuration */}
              {selectedKey?.id === apiKey.id && (
                <div className="mt-6 pt-6 border-t">
                  <KeyConfiguration
                    apiKey={apiKey}
                    onRegenerate={() => regenerateKey(apiKey.id)}
                    onDelete={() => deleteKey(apiKey.id)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {apiKeys.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
            <p className="text-gray-600 mb-6">
              Create your first API key to start using the Lusha API.
            </p>
            <Button onClick={() => setShowNewKeyDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface CreateKeyFormProps {
  keyName: string;
  setKeyName: (name: string) => void;
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
  onCreate: () => void;
  onCancel: () => void;
}

function CreateKeyForm({ 
  keyName, 
  setKeyName, 
  permissions, 
  setPermissions, 
  onCreate, 
  onCancel 
}: CreateKeyFormProps) {
  const availablePermissions = [
    { id: 'person:read', label: 'Person Enrichment - Read', description: 'Access person enrichment data' },
    { id: 'person:write', label: 'Person Enrichment - Write', description: 'Create and update person data' },
    { id: 'company:read', label: 'Company Intelligence - Read', description: 'Access company intelligence data' },
    { id: 'company:write', label: 'Company Intelligence - Write', description: 'Create and update company data' },
    { id: 'prospect:read', label: 'Prospecting - Read', description: 'Access prospecting data' },
    { id: 'prospect:write', label: 'Prospecting - Write', description: 'Create prospecting campaigns' },
    { id: 'bulk:read', label: 'Bulk Operations - Read', description: 'Access bulk operation results' },
    { id: 'bulk:write', label: 'Bulk Operations - Write', description: 'Create bulk processing jobs' }
  ];

  const togglePermission = (permissionId: string) => {
    setPermissions(
      permissions.includes(permissionId)
        ? permissions.filter(p => p !== permissionId)
        : [...permissions, permissionId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="keyName">API Key Name</Label>
        <Input
          id="keyName"
          placeholder="e.g., Production API Key"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Permissions</Label>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {availablePermissions.map((permission) => (
            <div key={permission.id} className="flex items-start space-x-3">
              <Switch
                checked={permissions.includes(permission.id)}
                onCheckedChange={() => togglePermission(permission.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{permission.label}</p>
                <p className="text-xs text-gray-500">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button onClick={onCreate} disabled={!keyName} className="flex-1">
          Create API Key
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}

interface KeyConfigurationProps {
  apiKey: APIKeyInfo;
  onRegenerate: () => void;
  onDelete: () => void;
}

function KeyConfiguration({ apiKey, onRegenerate, onDelete }: KeyConfigurationProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Key Configuration</h4>
      
      {/* Rate Limits */}
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-3">Rate Limits</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Requests per second</Label>
            <Input value={apiKey.rateLimits.perSecond} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Daily limit</Label>
            <Input value={apiKey.rateLimits.daily} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Monthly limit</Label>
            <Input value={apiKey.rateLimits.monthly} readOnly />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-t pt-6">
        <h5 className="text-sm font-medium text-red-700 mb-3">Danger Zone</h5>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onRegenerate}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Regenerate Key
          </Button>
          
          {!showDeleteConfirm ? (
            <Button variant="outline" onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Key
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="destructive" onClick={onDelete}>
                Confirm Delete
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        {showDeleteConfirm && (
          <Alert className="mt-3 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              This action cannot be undone. This will permanently delete the API key and revoke all access.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default APIKeyManager;