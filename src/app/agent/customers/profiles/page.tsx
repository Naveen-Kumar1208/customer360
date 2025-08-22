"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  UserCircle,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  Calendar,
  DollarSign,
  Activity,
  FileText,
  Settings,
  Download,
  Plus,
  Heart,
  ShoppingCart,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleCustomers } from "@/lib/data/customerData";
import { ExportProfilesModal } from "@/components/customers/ExportProfilesModal";
import { ImportCustomersModal } from "@/components/customers/ImportCustomersModal";
import { ProfileFullViewModal } from "@/components/customers/ProfileFullViewModal";
import { ProfileContactModal } from "@/components/customers/ProfileContactModal";
import { ProfileMessageModal } from "@/components/customers/ProfileMessageModal";
import { ProfileEditModal } from "@/components/customers/ProfileEditModal";
import { ProfileAccountSettingsModal } from "@/components/customers/ProfileAccountSettingsModal";

interface CustomerProfile {
  id: string;
  customer: any;
  healthScore: number;
  engagementLevel: number;
  satisfactionScore: number;
  recentActivities: {
    id: string;
    type: string;
    description: string;
    date: Date;
    value?: number;
  }[];
  preferences: {
    communicationChannel: string;
    frequency: string;
    topics: string[];
  };
  demographics: {
    age: number;
    gender: string;
    income: string;
    education: string;
    occupation: string;
  };
  behaviorMetrics: {
    avgOrderValue: number;
    purchaseFrequency: number;
    lastPurchase: Date;
    totalOrders: number;
    returnRate: number;
  };
}

// Enhanced customer profiles with detailed information
const customerProfiles: CustomerProfile[] = sampleCustomers.map((customer, index) => ({
  id: customer.id,
  customer,
  healthScore: 75 + Math.random() * 25,
  engagementLevel: 60 + Math.random() * 40,
  satisfactionScore: 70 + Math.random() * 30,
  recentActivities: [
    {
      id: `${customer.id}-1`,
      type: "purchase",
      description: "Purchased Premium Package",
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      value: 25000 + Math.random() * 75000
    },
    {
      id: `${customer.id}-2`,
      type: "support",
      description: "Contacted support about feature request",
      date: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: `${customer.id}-3`,
      type: "engagement",
      description: "Opened email campaign",
      date: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000)
    }
  ],
  preferences: {
    communicationChannel: ["email", "phone", "whatsapp"][Math.floor(Math.random() * 3)],
    frequency: ["weekly", "monthly", "quarterly"][Math.floor(Math.random() * 3)],
    topics: ["product_updates", "industry_news", "offers", "support"].slice(0, 2 + Math.floor(Math.random() * 3))
  },
  demographics: {
    age: 25 + Math.floor(Math.random() * 40),
    gender: ["Male", "Female"][Math.floor(Math.random() * 2)],
    income: ["₹5-10L", "₹10-20L", "₹20-50L", "₹50L+"][Math.floor(Math.random() * 4)],
    education: ["Graduate", "Post Graduate", "Professional", "PhD"][Math.floor(Math.random() * 4)],
    occupation: customer.company?.designation || "Professional"
  },
  behaviorMetrics: {
    avgOrderValue: 15000 + Math.random() * 85000,
    purchaseFrequency: 2 + Math.random() * 10,
    lastPurchase: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    totalOrders: 3 + Math.floor(Math.random() * 20),
    returnRate: Math.random() * 15,
    conversionTime: `${(15 + Math.random() * 45).toFixed(1)} days`
  }
}));

function CustomerProfileCard({ profile, onOpenModal }: { profile: CustomerProfile; onOpenModal: (type: string, profile: CustomerProfile) => void }) {
  const { customer } = profile;
  
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ShoppingCart className="h-4 w-4 text-green-600" />;
      case 'support': return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'engagement': return <Activity className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const daysSinceLastPurchase = Math.floor((new Date().getTime() - profile.behaviorMetrics.lastPurchase.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{customer.fullName}</h3>
              <p className="text-gray-600">{customer.company?.designation} at {customer.company?.name}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  Customer ID: {customer.id}
                </Badge>
                <Badge className={
                  customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                  customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {customer.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onOpenModal('fullView', profile)}>
                <Eye className="mr-2 h-4 w-4" />
                View Full Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('edit', profile)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('export', profile)}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('settings', profile)}>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-5 w-5 text-red-500 mr-1" />
              <span className="text-sm font-medium text-gray-600">Health Score</span>
            </div>
            <p className={`text-2xl font-bold ${getHealthScoreColor(profile.healthScore)}`}>
              {Math.round(profile.healthScore)}
            </p>
            <Progress value={profile.healthScore} className="h-2 mt-2" />
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Activity className="h-5 w-5 text-blue-500 mr-1" />
              <span className="text-sm font-medium text-gray-600">Engagement</span>
            </div>
            <p className={`text-2xl font-bold ${getHealthScoreColor(profile.engagementLevel)}`}>
              {Math.round(profile.engagementLevel)}
            </p>
            <Progress value={profile.engagementLevel} className="h-2 mt-2" />
          </div>
          
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="text-sm font-medium text-gray-600">Satisfaction</span>
            </div>
            <p className={`text-2xl font-bold ${getHealthScoreColor(profile.satisfactionScore)}`}>
              {Math.round(profile.satisfactionScore)}
            </p>
            <Progress value={profile.satisfactionScore} className="h-2 mt-2" />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{customer.address.city}, {customer.address.state}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span>{customer.company?.name}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Demographics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span>{profile.demographics.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span>{profile.demographics.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Income:</span>
                <span>{profile.demographics.income}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Education:</span>
                <span>{profile.demographics.education}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Business Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Value</p>
              <p className="text-sm font-semibold text-green-600 truncate" title={formatCurrency(customer.totalValue)}>
                {formatCurrency(customer.totalValue)}
              </p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Avg Order Value</p>
              <p className="text-sm font-semibold text-blue-600 truncate" title={formatCurrency(profile.behaviorMetrics.avgOrderValue)}>
                {formatCurrency(profile.behaviorMetrics.avgOrderValue)}
              </p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Total Orders</p>
              <p className="text-sm font-semibold text-purple-600">{profile.behaviorMetrics.totalOrders}</p>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Last Purchase</p>
              <p className="text-sm font-semibold text-orange-600">{daysSinceLastPurchase}d ago</p>
            </div>
            <div className="text-center p-3 border rounded-lg col-span-2">
              <p className="text-xs text-gray-600 mb-1">Lead to Customer Conversion Time</p>
              <p className="text-sm font-semibold text-teal-600">{profile.behaviorMetrics.conversionTime}</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Recent Activities</h4>
          <div className="space-y-2">
            {profile.recentActivities.slice(0, 3).map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.date.toLocaleDateString()}</p>
                </div>
                {activity.value && (
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(activity.value)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Communication Preferences</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              Channel: {profile.preferences.communicationChannel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Frequency: {profile.preferences.frequency}
            </Badge>
            {profile.preferences.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="text-xs">
                {topic.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button className="flex-1" onClick={() => onOpenModal('fullView', profile)}>
            <Eye className="mr-2 h-4 w-4" />
            View Full Profile
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => onOpenModal('contact', profile)}>
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => onOpenModal('message', profile)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerProfiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedHealthScore, setSelectedHealthScore] = useState("all");
  
  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [modalState, setModalState] = useState<{
    type: 'fullView' | 'contact' | 'message' | 'edit' | 'settings' | 'export' | null;
    profile: CustomerProfile | null;
  }>({ type: null, profile: null });

  const handleOpenModal = (type: string, profile?: CustomerProfile) => {
    if (type === 'export') {
      setShowExportModal(true);
    } else if (type === 'import') {
      setShowImportModal(true);
    } else if (profile) {
      setModalState({ type: type as 'fullView' | 'contact' | 'message' | 'edit' | 'settings', profile });
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, profile: null });
  };

  const filteredProfiles = customerProfiles.filter(profile => {
    const matchesSearch = searchTerm === "" || 
      profile.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.customer.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSegment = selectedSegment === "all" || profile.customer.segment === selectedSegment;
    
    let matchesHealth = true;
    if (selectedHealthScore === "high") matchesHealth = profile.healthScore >= 80;
    else if (selectedHealthScore === "medium") matchesHealth = profile.healthScore >= 60 && profile.healthScore < 80;
    else if (selectedHealthScore === "low") matchesHealth = profile.healthScore < 60;

    return matchesSearch && matchesSegment && matchesHealth;
  });

  const avgHealthScore = customerProfiles.reduce((sum, p) => sum + p.healthScore, 0) / customerProfiles.length;
  const highHealthScoreCount = customerProfiles.filter(p => p.healthScore >= 80).length;
  const avgSatisfaction = customerProfiles.reduce((sum, p) => sum + p.satisfactionScore, 0) / customerProfiles.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Profiles</h1>
          <p className="text-gray-600 mt-1">Detailed 360° view of customer profiles and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleOpenModal('export')}>
            <Download className="mr-2 h-4 w-4" />
            Export Profiles
          </Button>
          <Button onClick={() => handleOpenModal('import')}>
            <Plus className="mr-2 h-4 w-4" />
            Import Customers
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Profiles</p>
                <p className="text-2xl font-bold">{customerProfiles.length}</p>
              </div>
              <UserCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Health Score</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(avgHealthScore)}</p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Healthy Customers</p>
                <p className="text-2xl font-bold text-purple-600">{highHealthScoreCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Satisfaction</p>
                <p className="text-2xl font-bold text-orange-600">{Math.round(avgSatisfaction)}%</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar - Full Width */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customer profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Segment Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">Segment:</span>
                <Button 
                  variant={selectedSegment === "all" ? "default" : "outline"}
                  onClick={() => setSelectedSegment("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button 
                  variant={selectedSegment === "premium" ? "default" : "outline"}
                  onClick={() => setSelectedSegment("premium")}
                  size="sm"
                >
                  Premium
                </Button>
                <Button 
                  variant={selectedSegment === "standard" ? "default" : "outline"}
                  onClick={() => setSelectedSegment("standard")}
                  size="sm"
                >
                  Standard
                </Button>
              </div>

              {/* Health Score Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center">Health:</span>
                <Button 
                  variant={selectedHealthScore === "all" ? "default" : "outline"}
                  onClick={() => setSelectedHealthScore("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button 
                  variant={selectedHealthScore === "high" ? "default" : "outline"}
                  onClick={() => setSelectedHealthScore("high")}
                  size="sm"
                >
                  High (80+)
                </Button>
                <Button 
                  variant={selectedHealthScore === "medium" ? "default" : "outline"}
                  onClick={() => setSelectedHealthScore("medium")}
                  size="sm"
                >
                  Medium
                </Button>
                <Button 
                  variant={selectedHealthScore === "low" ? "default" : "outline"}
                  onClick={() => setSelectedHealthScore("low")}
                  size="sm"
                >
                  Low
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProfiles.length} of {customerProfiles.length} customer profiles
        </p>
      </div>

      {/* Customer Profiles Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProfiles.map((profile) => (
          <CustomerProfileCard key={profile.id} profile={profile} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {/* Modals */}
      <ExportProfilesModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      
      <ImportCustomersModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
      />
      
      {modalState.type === 'fullView' && modalState.profile && (
        <ProfileFullViewModal
          isOpen={true}
          onClose={handleCloseModal}
          profile={modalState.profile}
        />
      )}
      
      {modalState.type === 'contact' && modalState.profile && (
        <ProfileContactModal
          isOpen={true}
          onClose={handleCloseModal}
          profile={modalState.profile}
        />
      )}
      
      {modalState.type === 'message' && modalState.profile && (
        <ProfileMessageModal
          isOpen={true}
          onClose={handleCloseModal}
          profile={modalState.profile}
        />
      )}
      
      {modalState.type === 'edit' && modalState.profile && (
        <ProfileEditModal
          isOpen={true}
          onClose={handleCloseModal}
          profile={modalState.profile}
        />
      )}
      
      {modalState.type === 'settings' && modalState.profile && (
        <ProfileAccountSettingsModal
          isOpen={true}
          onClose={handleCloseModal}
          profile={modalState.profile}
        />
      )}
    </div>
  );
}