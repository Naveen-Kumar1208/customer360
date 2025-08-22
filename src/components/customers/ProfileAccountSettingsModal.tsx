"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Shield, 
  Bell,
  CreditCard,
  Key,
  CheckCircle,
  X,
  Save,
  AlertTriangle,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  Calendar,
  Archive,
  Trash2
} from 'lucide-react';

interface CustomerProfile {
  id: string;
  customer: any;
}

interface ProfileAccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CustomerProfile;
}

const communicationChannels = [
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'sms', label: 'SMS', icon: MessageCircle },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle }
];

const frequencies = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'never', label: 'Never' }
];

export const ProfileAccountSettingsModal: React.FC<ProfileAccountSettingsModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [activeTab, setActiveTab] = useState("preferences");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    // Communication Preferences
    preferredChannel: 'email',
    communicationFrequency: 'weekly',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    productUpdates: true,
    billingAlerts: true,
    
    // Privacy Settings
    dataSharing: false,
    analyticsTracking: true,
    profileVisibility: 'private',
    
    // Account Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginAlerts: true,
    
    // Billing Settings
    autoRenewal: true,
    invoiceEmail: profile.customer.email,
    paymentMethod: 'card',
    billingCycle: 'monthly'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSaving) {
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings Updated!</h3>
            <p className="text-sm text-gray-600 text-center">
              Account settings have been updated successfully.
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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <p className="text-gray-600">{profile.customer.fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSaving}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value="preferences" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Communication Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Preferred Communication Channel</Label>
                        <Select value={settings.preferredChannel} onValueChange={(value) => handleSettingChange('preferredChannel', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select channel..." />
                          </SelectTrigger>
                          <SelectContent>
                            {communicationChannels.map((channel) => {
                              const Icon = channel.icon;
                              return (
                                <SelectItem key={channel.value} value={channel.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {channel.label}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Communication Frequency</Label>
                        <Select value={settings.communicationFrequency} onValueChange={(value) => handleSettingChange('communicationFrequency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency..." />
                          </SelectTrigger>
                          <SelectContent>
                            {frequencies.map((freq) => (
                              <SelectItem key={freq.value} value={freq.value}>
                                {freq.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Preferences</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch 
                            checked={settings.emailNotifications} 
                            onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                          </div>
                          <Switch 
                            checked={settings.smsNotifications} 
                            onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Marketing Emails</Label>
                            <p className="text-sm text-gray-600">Receive promotional and marketing emails</p>
                          </div>
                          <Switch 
                            checked={settings.marketingEmails} 
                            onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Product Updates</Label>
                            <p className="text-sm text-gray-600">Get notified about new features and updates</p>
                          </div>
                          <Switch 
                            checked={settings.productUpdates} 
                            onCheckedChange={(checked) => handleSettingChange('productUpdates', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Billing Alerts</Label>
                            <p className="text-sm text-gray-600">Important billing and payment notifications</p>
                          </div>
                          <Switch 
                            checked={settings.billingAlerts} 
                            onCheckedChange={(checked) => handleSettingChange('billingAlerts', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Data Sharing</Label>
                          <p className="text-sm text-gray-600">Allow sharing of anonymized data for analytics</p>
                        </div>
                        <Switch 
                          checked={settings.dataSharing} 
                          onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Analytics Tracking</Label>
                          <p className="text-sm text-gray-600">Track usage for improving user experience</p>
                        </div>
                        <Switch 
                          checked={settings.analyticsTracking} 
                          onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Profile Visibility</Label>
                      <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to all users</SelectItem>
                          <SelectItem value="private">Private - Only visible to you</SelectItem>
                          <SelectItem value="team">Team - Visible to team members</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          checked={settings.twoFactorAuth} 
                          onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Login Alerts</Label>
                          <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                        </div>
                        <Switch 
                          checked={settings.loginAlerts} 
                          onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeout..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Key className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-medium text-yellow-800">Password Security</h4>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        It's recommended to change your password regularly for better security.
                      </p>
                      <Button variant="outline" size="sm">
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Billing Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Invoice Email</Label>
                        <Input
                          value={settings.invoiceEmail}
                          onChange={(e) => handleSettingChange('invoiceEmail', e.target.value)}
                          placeholder="Enter email for invoices..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Billing Cycle</Label>
                        <Select value={settings.billingCycle} onValueChange={(value) => handleSettingChange('billingCycle', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="annually">Annually</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto Renewal</Label>
                          <p className="text-sm text-gray-600">Automatically renew subscription</p>
                        </div>
                        <Switch 
                          checked={settings.autoRenewal} 
                          onCheckedChange={(checked) => handleSettingChange('autoRenewal', checked)}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Payment Method</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        **** **** **** 1234 (Expires 12/25)
                      </p>
                      <Button variant="outline" size="sm">
                        Update Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 border rounded-lg">
                        <h4 className="font-medium mb-2">Account Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Customer ID:</span>
                            <span className="ml-2 font-medium">{profile.customer.id}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Account Created:</span>
                            <span className="ml-2 font-medium">{profile.customer.acquisitionDate?.toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <Badge className="ml-2">{profile.customer.status.toUpperCase()}</Badge>
                          </div>
                          <div>
                            <span className="text-gray-600">Segment:</span>
                            <Badge variant="outline" className="ml-2">{profile.customer.segment}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Account Actions</h4>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>Export Account Data</Label>
                            <p className="text-sm text-gray-600">Download all your account data</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Archive className="w-4 h-4 mr-2" />
                            Export Data
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <h4 className="font-medium text-red-800">Danger Zone</h4>
                        </div>
                        <p className="text-sm text-red-700 mb-3">
                          These actions are permanent and cannot be undone.
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            <Archive className="w-4 h-4 mr-2" />
                            Deactivate Account
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={onClose} disabled={isSaving}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};