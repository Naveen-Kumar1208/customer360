"use client";

import React, { useState } from "react";
import { StaticExportLayout } from "@/components/layouts/StaticExportLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cloudStorageConnections } from "@/lib/data/dataServicesData";
import { 
  Cloud, 
  Plus, 
  Settings, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Folder,
  Database,
  Link,
  ArrowLeft,
  Shield,
  Clock
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloudStoragePage() {
  const router = useRouter();
  const [provider, setProvider] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [region, setRegion] = useState("");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setBucketName("");
      setAccessKey("");
      setSecretKey("");
      setRegion("");
      setProvider("");
    }, 2000);
  };

  const getProviderIcon = (providerName: string) => {
    const colors = {
      "AWS S3": "text-orange-600",
      "Google Cloud Storage": "text-blue-600",
      "Azure Blob Storage": "text-blue-500",
      "Dropbox Business": "text-blue-400",
      "Box Enterprise": "text-blue-700"
    };
    return <Cloud className={`h-5 w-5 ${colors[providerName] || "text-gray-600"}`} />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        );
      case "syncing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <StaticExportLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push('/data-services')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Cloud Storage Connections</h1>
              <p className="text-muted-foreground">
                Connect and manage your cloud storage providers
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-500" />
                  Add New Connection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Provider</label>
                    <Select value={provider} onValueChange={setProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws-s3">AWS S3</SelectItem>
                        <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
                        <SelectItem value="azure">Azure Blob Storage</SelectItem>
                        <SelectItem value="dropbox">Dropbox Business</SelectItem>
                        <SelectItem value="box">Box Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Bucket/Container Name</label>
                    <Input
                      placeholder="e.g., my-data-bucket"
                      value={bucketName}
                      onChange={(e) => setBucketName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Region</label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                        <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                        <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Access Key / Client ID</label>
                    <Input
                      type="password"
                      placeholder="Enter access key"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Secret Key / Client Secret</label>
                    <Input
                      type="password"
                      placeholder="Enter secret key"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800 flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5" />
                      <span>Your credentials are encrypted and stored securely.</span>
                    </p>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!provider || !bucketName || !accessKey || !secretKey || connecting}
                    onClick={handleConnect}
                  >
                    {connecting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Link className="h-4 w-4 mr-2" />
                        Connect Storage
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-gray-500" />
                  Connection Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Sync Frequency</h4>
                    <Select defaultValue="15min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">File Type Filters</h4>
                    <div className="space-y-2">
                      {['CSV Files', 'JSON Files', 'Excel Files', 'Images', 'Documents'].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" defaultChecked />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Advanced Options</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Enable versioning</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Compress files before transfer</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Auto-retry failed syncs</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cloudStorageConnections.map((connection, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getProviderIcon(connection.provider)}
                        <div>
                          <h4 className="font-medium">{connection.provider}</h4>
                          <p className="text-sm text-muted-foreground">{connection.bucketName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(connection.status)}
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Region</p>
                        <p className="font-medium">{connection.region}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Files</p>
                        <p className="font-medium flex items-center gap-1">
                          <Folder className="h-3 w-3" />
                          {connection.filesCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Size</p>
                        <p className="font-medium flex items-center gap-1">
                          <Database className="h-3 w-3" />
                          {connection.totalSize}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Sync</p>
                        <p className="font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {connection.lastSync}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Sync: {connection.syncFrequency}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sync Now
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </StaticExportLayout>
    </>
  );
}