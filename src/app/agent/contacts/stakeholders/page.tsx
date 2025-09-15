"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StakeholderMapModal } from "@/components/stakeholder/StakeholderMapModal";
import { AddStakeholderModal } from "@/components/stakeholder/AddStakeholderModal";
import { StakeholderActionModals } from "@/components/stakeholder/StakeholderActionModals";
import { ScheduledMeetings } from "@/components/stakeholder/ScheduledMeetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Building2,
  Users,
  GitBranch,
  Phone,
  Mail,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  Star,
  ExternalLink,
  MapPin,
  Briefcase,
  User,
  Globe,
  Link2,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  company: string;
  department: string;
  influence: "high" | "medium" | "low";
  relationship: "champion" | "supporter" | "neutral" | "blocker";
  email: string;
  phone: string;
  lastContact: Date;
  connections: string[];
  apolloData?: {
    headline?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    githubUrl?: string;
    city?: string;
    state?: string;
    country?: string;
    seniority?: string;
    functions?: string[];
    photoUrl?: string;
    confidence?: number;
  };
}

interface Company {
  company_id: string;
  company_name: string;
  industry?: string;
  company_size?: string;
  emp_nos?: number;
  annual_revenue?: number;
  website?: string;
  address?: string;
  city?: string;
  state_name?: string;
  country?: string;
  timezone?: string;
  created_at: Date;
  updated_at: Date;
}

const sampleStakeholders: Stakeholder[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "TechCorp Industries",
    department: "Technology",
    influence: "high",
    relationship: "champion",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    lastContact: new Date("2024-01-15"),
    connections: ["John Smith", "Mike Chen"]
  },
  {
    id: "2", 
    name: "Robert Davis",
    role: "VP of Operations",
    company: "TechCorp Industries",
    department: "Operations",
    influence: "high",
    relationship: "supporter",
    email: "robert.davis@techcorp.com",
    phone: "+1 (555) 234-5678",
    lastContact: new Date("2024-01-12"),
    connections: ["Sarah Johnson"]
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Finance Director",
    company: "TechCorp Industries", 
    department: "Finance",
    influence: "medium",
    relationship: "neutral",
    email: "emily.chen@techcorp.com",
    phone: "+1 (555) 345-6789",
    lastContact: new Date("2024-01-10"),
    connections: ["Robert Davis"]
  }
];

function StakeholderCard({ 
  stakeholder, 
  onAction 
}: { 
  stakeholder: Stakeholder;
  onAction: (stakeholder: Stakeholder, action: 'view' | 'edit' | 'call' | 'email' | 'remove') => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'champion': return 'bg-green-100 text-green-800';
      case 'supporter': return 'bg-blue-100 text-blue-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      case 'blocker': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAction = (action: 'view' | 'edit' | 'call' | 'email' | 'remove') => {
    setDropdownOpen(false); // Close dropdown first
    setTimeout(() => {
      onAction(stakeholder, action);
    }, 100); // Small delay to ensure dropdown closes properly
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {stakeholder.apolloData?.photoUrl ? (
                <img 
                  src={stakeholder.apolloData.photoUrl} 
                  alt={stakeholder.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`${stakeholder.apolloData?.photoUrl ? 'hidden' : ''} w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}>
                {stakeholder.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{stakeholder.name}</h3>
              <p className="text-sm text-gray-600">{stakeholder.role}</p>
              <p className="text-sm text-gray-500">{stakeholder.department} • {stakeholder.company}</p>
              {stakeholder.apolloData?.headline && (
                <p className="text-xs text-gray-600 mt-1 italic">{stakeholder.apolloData.headline}</p>
              )}
            </div>
          </div>
          
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction('view')}>
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('edit')}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('call')}>
                <Phone className="mr-2 h-4 w-4" />
                Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('email')}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => handleAction('remove')}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Badges Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge className={getInfluenceColor(stakeholder.influence)}>
              {stakeholder.influence} influence
            </Badge>
            <Badge className={getRelationshipColor(stakeholder.relationship)}>
              {stakeholder.relationship}
            </Badge>
            {stakeholder.apolloData?.seniority && (
              <Badge variant="outline" className="text-blue-600">
                {stakeholder.apolloData.seniority.replace('_', ' ')}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {stakeholder.id.startsWith('apollo_') && (
              <Badge variant="outline" className="text-purple-600 text-xs">
                Apollo.io
              </Badge>
            )}
            {stakeholder.apolloData?.confidence && (
              <Badge variant="outline" className="text-green-600 text-xs">
                {stakeholder.apolloData.confidence}% match
              </Badge>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-2 mb-3">
          {stakeholder.email && stakeholder.email.trim() !== '' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-blue-600" />
              <a href={`mailto:${stakeholder.email}`} className="hover:underline">
                {stakeholder.email}
              </a>
            </div>
          )}
          
          {stakeholder.phone && stakeholder.phone.trim() !== '' && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-green-600" />
              <a href={`tel:${stakeholder.phone}`} className="hover:underline">
                {stakeholder.phone}
              </a>
            </div>
          )}
          
          {/* Location */}
          {(stakeholder.apolloData?.city || stakeholder.apolloData?.state || stakeholder.apolloData?.country) && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-600" />
              <span>
                {[stakeholder.apolloData.city, stakeholder.apolloData.state, stakeholder.apolloData.country]
                  .filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Social Media Links */}
        {(stakeholder.apolloData?.linkedinUrl || stakeholder.apolloData?.twitterUrl || stakeholder.apolloData?.githubUrl) && (
          <div className="space-y-1 mb-3">
            <p className="text-xs font-medium text-gray-700">Social Profiles:</p>
            <div className="flex space-x-2">
              {stakeholder.apolloData.linkedinUrl && (
                <a 
                  href={stakeholder.apolloData.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:underline"
                >
                  <Link2 className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
              )}
              {stakeholder.apolloData.twitterUrl && (
                <a 
                  href={stakeholder.apolloData.twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-blue-400 hover:underline"
                >
                  <Link2 className="h-3 w-3" />
                  <span>Twitter</span>
                </a>
              )}
              {stakeholder.apolloData.githubUrl && (
                <a 
                  href={stakeholder.apolloData.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-gray-700 hover:underline"
                >
                  <Link2 className="h-3 w-3" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Functions */}
        {stakeholder.apolloData?.functions && stakeholder.apolloData.functions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-gray-700 mb-1">Functions:</p>
            <div className="flex flex-wrap gap-1">
              {stakeholder.apolloData.functions.slice(0, 3).map((func, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {func}
                </Badge>
              ))}
              {stakeholder.apolloData.functions.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{stakeholder.apolloData.functions.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
          <div className="text-gray-600">
            Last Contact: {new Date(stakeholder.lastContact).toLocaleDateString()}
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <GitBranch className="h-4 w-4" />
            <span>{stakeholder.connections.length} connections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function StakeholderMapping() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stakeholders, setStakeholders] = useState(sampleStakeholders);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'edit' | 'call' | 'email' | 'remove' | null>(null);
  const [activeTab, setActiveTab] = useState("stakeholders");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [apolloStakeholders, setApolloStakeholders] = useState<Stakeholder[]>([]);
  const [apolloCompanies, setApolloCompanies] = useState<any[]>([]);
  
  // Company form state
  const [newCompany, setNewCompany] = useState<Omit<Company, 'company_id' | 'created_at' | 'updated_at'>>({
    company_name: '',
    industry: '',
    company_size: '',
    emp_nos: undefined,
    annual_revenue: undefined,
    website: '',
    address: '',
    city: '',
    state_name: '',
    country: '',
    timezone: ''
  });
  
  // Initially hide specific stakeholders (Sarah Johnson, Robert Davis, Emily Chen)
  const hiddenStakeholderNames = ["Sarah Johnson", "Robert Davis", "Emily Chen"];
  
  // Load Apollo data from localStorage
  const loadApolloData = () => {
    try {
      const storedStakeholders = JSON.parse(localStorage.getItem('stakeholder_data') || '[]');
      const storedCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
      setApolloStakeholders(storedStakeholders);
      setApolloCompanies(storedCompanies);
      return { stakeholders: storedStakeholders, companies: storedCompanies };
    } catch (error) {
      console.error('Error loading Apollo data:', error);
      return { stakeholders: [], companies: [] };
    }
  };

  // Combine sample and Apollo stakeholders - memoized to prevent infinite re-renders
  const getAllStakeholders = React.useMemo(() => {
    return [...stakeholders, ...apolloStakeholders];
  }, [stakeholders, apolloStakeholders]);

  const [filteredStakeholders, setFilteredStakeholders] = useState(
    sampleStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name))
  );

  // Listen for Apollo data updates
  useEffect(() => {
    const handleStakeholderUpdate = () => {
      const { stakeholders: newStakeholders, companies: newCompanies } = loadApolloData();
      setApolloStakeholders(newStakeholders);
      setApolloCompanies(newCompanies);
      
      // Update filtered stakeholders
      const allStakeholders = [...stakeholders, ...newStakeholders];
      if (selectedCompany) {
        setFilteredStakeholders(allStakeholders.filter(s => s.company === selectedCompany));
      } else {
        setFilteredStakeholders(allStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name)));
      }
    };

    // Load initial data
    handleStakeholderUpdate();

    // Listen for updates
    window.addEventListener('stakeholderDataUpdated', handleStakeholderUpdate);
    
    return () => {
      window.removeEventListener('stakeholderDataUpdated', handleStakeholderUpdate);
    };
  }, [stakeholders, selectedCompany]);

  const handleAddStakeholder = (newStakeholder: Omit<Stakeholder, 'id'>) => {
    const stakeholderWithId = {
      ...newStakeholder,
      id: (stakeholders.length + 1).toString()
    };
    const updatedStakeholders = [...stakeholders, stakeholderWithId];
    setStakeholders(updatedStakeholders);
    
    // Update filtered stakeholders based on current selection
    if (selectedCompany) {
      setFilteredStakeholders(updatedStakeholders.filter(s => s.company === selectedCompany));
    } else {
      setFilteredStakeholders(updatedStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name)));
    }
  };

  const handleStakeholderAction = (stakeholder: Stakeholder, action: 'view' | 'edit' | 'call' | 'email' | 'remove') => {
    setSelectedStakeholder(stakeholder);
    setActionModalType(action);
  };

  const handleUpdateStakeholder = (updatedStakeholder: Stakeholder) => {
    const updatedStakeholders = stakeholders.map(s => 
      s.id === updatedStakeholder.id ? updatedStakeholder : s
    );
    setStakeholders(updatedStakeholders);
    
    // Update filtered stakeholders based on current selection
    if (selectedCompany) {
      setFilteredStakeholders(updatedStakeholders.filter(s => s.company === selectedCompany));
    } else {
      setFilteredStakeholders(updatedStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name)));
    }
  };

  const handleRemoveStakeholder = (stakeholderId: string) => {
    const updatedStakeholders = stakeholders.filter(s => s.id !== stakeholderId);
    setStakeholders(updatedStakeholders);
    
    // Update filtered stakeholders based on current selection
    if (selectedCompany) {
      setFilteredStakeholders(updatedStakeholders.filter(s => s.company === selectedCompany));
    } else {
      setFilteredStakeholders(updatedStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name)));
    }
  };

  const closeActionModal = () => {
    setSelectedStakeholder(null);
    setActionModalType(null);
  };

  const handleEditMeeting = (meeting: any) => {
    console.log('Edit meeting:', meeting);
    // In a real app, this would open an edit meeting modal
  };

  const handleCancelMeeting = (meetingId: string) => {
    console.log('Cancel meeting:', meetingId);
    // In a real app, this would cancel the meeting
  };

  const handleJoinMeeting = (meeting: any) => {
    console.log('Join meeting:', meeting);
    // In a real app, this would open the meeting link or dial the number
    if (meeting.type === 'video') {
      // Open video conference link
      window.open('https://meet.google.com/abc-defg-hij', '_blank');
    } else if (meeting.type === 'phone') {
      // Initiate phone call or show phone number
      window.open(`tel:${stakeholders.find(s => s.name === meeting.stakeholder)?.phone}`, '_self');
    }
  };

  const handleCompanySelect = (company: string) => {
    if (selectedCompany === company) {
      // Deselect company - show all stakeholders except the initially hidden ones
      setSelectedCompany(null);
      setFilteredStakeholders(getAllStakeholders.filter(s => !hiddenStakeholderNames.includes(s.name)));
    } else {
      // Select company - show all stakeholders from that company (including initially hidden ones)
      setSelectedCompany(company);
      const companyStakeholders = getAllStakeholders.filter(s => s.company === company);
      setFilteredStakeholders(companyStakeholders);
    }
  };

  const handleAddCompany = (companyData: Omit<Company, 'company_id' | 'created_at' | 'updated_at'>) => {
    const company: Company = {
      ...companyData,
      company_id: crypto.randomUUID(),
      created_at: new Date(),
      updated_at: new Date()
    };

    // Add to Apollo companies array (for local storage)
    const existingCompanies = JSON.parse(localStorage.getItem('company_data') || '[]');
    const updatedCompanies = [...existingCompanies, {
      id: company.company_id,
      name: company.company_name,
      industry: company.industry,
      address: company.address ? `${company.address}, ${company.city}, ${company.state_name}, ${company.country}`.trim() : '',
      phone: '',
      email: `contact@${company.website?.replace('https://', '').replace('http://', '') || 'company.com'}`,
      employees: company.emp_nos,
      revenue: company.annual_revenue,
      website: company.website
    }];
    
    localStorage.setItem('company_data', JSON.stringify(updatedCompanies));
    setApolloCompanies(updatedCompanies);
    
    // Trigger update event
    window.dispatchEvent(new CustomEvent('stakeholderDataUpdated'));
    
    // Reset form and close modal
    setNewCompany({
      company_name: '',
      industry: '',
      company_size: '',
      emp_nos: undefined,
      annual_revenue: undefined,
      website: '',
      address: '',
      city: '',
      state_name: '',
      country: '',
      timezone: ''
    });
    setIsAddCompanyModalOpen(false);
    
    alert(`${company.company_name} has been added successfully!`);
  };

  const resetCompanyForm = () => {
    setNewCompany({
      company_name: '',
      industry: '',
      company_size: '',
      emp_nos: undefined,
      annual_revenue: undefined,
      website: '',
      address: '',
      city: '',
      state_name: '',
      country: '',
      timezone: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stakeholder Management</h1>
          <p className="text-gray-600 mt-1">Map stakeholders and manage scheduled meetings</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Stakeholder
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="meetings">Scheduled Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="stakeholders" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search stakeholders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter by Influence
                </Button>
                <Button variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  Filter by Company
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Stakeholders</p>
                    <p className="text-2xl font-bold">{getAllStakeholders.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Champions</p>
                    <p className="text-2xl font-bold text-green-600">
                      {getAllStakeholders.filter(s => s.relationship === 'champion').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Influence</p>
                    <p className="text-2xl font-bold text-red-600">
                      {getAllStakeholders.filter(s => s.influence === 'high').length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Companies</p>
                    <p className="text-2xl font-bold">
                      {new Set(getAllStakeholders.map(s => s.company)).size}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Companies</h2>
              <Button onClick={() => setIsAddCompanyModalOpen(true)} className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Add Company</span>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Get unique companies from all stakeholders */}
              {Array.from(new Set(getAllStakeholders.map(s => s.company))).map((companyName) => {
                const companyStakeholders = getAllStakeholders.filter(s => s.company === companyName);
                const apolloCompany = apolloCompanies.find(c => {
                  // More comprehensive company matching
                  const normalizeCompanyName = (name: string) => 
                    name?.toLowerCase().replace(/[^a-z0-9]/g, '').trim() || '';
                  
                  const targetName = normalizeCompanyName(companyName);
                  
                  return targetName && (
                    normalizeCompanyName(c.name) === targetName ||
                    normalizeCompanyName(c.company_name) === targetName ||
                    c.name === companyName || 
                    c.company_name === companyName ||
                    c.name?.toLowerCase() === companyName.toLowerCase() ||
                    c.company_name?.toLowerCase() === companyName.toLowerCase()
                  );
                });
                
                // Debug logging to see what we have
                if (companyName.includes('Apollo') || companyName.includes('TechCorp')) {
                  console.log('Company lookup for:', companyName);
                  console.log('Available companies:', apolloCompanies.map(c => ({ name: c.name, company_name: c.company_name, company_size: c.company_size })));
                  console.log('Found apolloCompany:', apolloCompany);
                }
                
                return (
                  <Card 
                    key={companyName}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedCompany === companyName 
                        ? 'border-2 border-blue-500 bg-blue-100/50 shadow-lg' 
                        : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`} 
                    onClick={() => handleCompanySelect(companyName)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Building2 className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{companyName}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedCompany === companyName 
                              ? 'Selected - Showing stakeholders below' 
                              : 'Click to view stakeholders'
                            }
                          </p>
                          {apolloCompany && apolloCompany.industry && (
                            <p className="text-xs text-gray-500 mt-1">
                              {apolloCompany.industry}
                            </p>
                          )}
                        </div>
                        {apolloCompany && (
                          <Badge variant="outline" className="text-purple-600 text-xs">
                            Apollo.io
                          </Badge>
                        )}
                      </div>

                      {/* Company Details Grid */}
                      {apolloCompany && (
                        <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-900">Company Information</h4>
                            {apolloCompany.source === 'apollo' && (
                              <Badge variant="outline" className="text-purple-600 text-xs border-purple-300">
                                Apollo Enriched
                              </Badge>
                            )}
                          </div>
                          
                          {/* Key Metrics Row */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            {apolloCompany.company_size && (
                              <div className="bg-white p-2 rounded border">
                                <span className="text-gray-500 text-xs">Company Size:</span>
                                <div className="font-medium text-gray-800 text-sm">{apolloCompany.company_size}</div>
                              </div>
                            )}
                            
                            {apolloCompany.emp_nos && (
                              <div className="bg-white p-2 rounded border">
                                <span className="text-gray-500 text-xs">Employees:</span>
                                <div className="font-medium text-gray-800 text-sm">{apolloCompany.emp_nos.toLocaleString()}</div>
                              </div>
                            )}
                          </div>

                          {/* Financial Information */}
                          <div className="grid grid-cols-1 gap-2 mb-3">
                            {(apolloCompany.annual_revenue || apolloCompany.annual_revenue_printed) && (
                              <div className="bg-white p-2 rounded border">
                                <span className="text-gray-500 text-xs">Annual Revenue:</span>
                                <div className="font-medium text-gray-800 text-sm">
                                  {apolloCompany.annual_revenue_printed || 
                                   (apolloCompany.annual_revenue ? `$${(apolloCompany.annual_revenue / 1000000).toFixed(1)}M` : 'N/A')}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Contact & Web Presence */}
                          <div className="space-y-2 mb-3">
                            {apolloCompany.website && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Globe className="h-3 w-3 text-blue-600" />
                                <a 
                                  href={apolloCompany.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {apolloCompany.website.replace('https://', '').replace('http://', '')}
                                </a>
                              </div>
                            )}

                            {apolloCompany.phone && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Phone className="h-3 w-3 text-green-600" />
                                <span className="font-medium text-gray-800">{apolloCompany.phone}</span>
                              </div>
                            )}

                            {apolloCompany.email && (
                              <div className="flex items-center space-x-2 text-xs">
                                <Mail className="h-3 w-3 text-red-600" />
                                <span className="font-medium text-gray-800">{apolloCompany.email}</span>
                              </div>
                            )}
                          </div>

                          {/* Location Information */}
                          {(apolloCompany.city || apolloCompany.state_name || apolloCompany.country) && (
                            <div className="mb-2 flex items-center space-x-1 text-xs text-gray-600">
                              <MapPin className="h-3 w-3 text-red-500" />
                              <span className="font-medium">
                                {[apolloCompany.city, apolloCompany.state_name, apolloCompany.country]
                                  .filter(Boolean).join(', ')}
                              </span>
                            </div>
                          )}
                          
                          {apolloCompany.address && apolloCompany.address !== [apolloCompany.city, apolloCompany.state_name, apolloCompany.country].filter(Boolean).join(', ') && (
                            <div className="mb-2 text-xs text-gray-600">
                              <span className="text-gray-500">Address:</span>
                              <span className="ml-1 font-medium">{apolloCompany.address}</span>
                            </div>
                          )}

                          {/* Business Details */}
                          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                            {apolloCompany.founded_year && (
                              <div>
                                <span className="text-gray-500">Founded:</span>
                                <div className="font-medium text-gray-800">{apolloCompany.founded_year}</div>
                              </div>
                            )}
                            
                            {apolloCompany.timezone && (
                              <div>
                                <span className="text-gray-500">Timezone:</span>
                                <div className="font-medium text-gray-800">{apolloCompany.timezone}</div>
                              </div>
                            )}
                          </div>

                          {/* Technology Stack */}
                          {apolloCompany.technology_names && apolloCompany.technology_names.length > 0 && (
                            <div className="mb-3">
                              <span className="text-gray-500 text-xs">Technologies:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {apolloCompany.technology_names.slice(0, 4).map((tech: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {apolloCompany.technology_names.length > 4 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{apolloCompany.technology_names.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Additional Company Info */}
                          {apolloCompany.description && (
                            <div className="mt-3 pt-2 border-t border-gray-200">
                              <span className="text-gray-500 text-xs">Description:</span>
                              <p className="text-xs text-gray-700 mt-1 line-clamp-2">{apolloCompany.description}</p>
                            </div>
                          )}

                          {/* Social Media Links */}
                          {(apolloCompany.linkedin_url || apolloCompany.twitter_url || apolloCompany.crunchbase_url) && (
                            <div className="mt-3 pt-2 border-t border-gray-200">
                              <span className="text-gray-500 text-xs">Links:</span>
                              <div className="flex space-x-3 mt-1">
                                {apolloCompany.linkedin_url && (
                                  <a 
                                    href={apolloCompany.linkedin_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-xs"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    LinkedIn
                                  </a>
                                )}
                                {apolloCompany.twitter_url && (
                                  <a 
                                    href={apolloCompany.twitter_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline text-xs"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Twitter
                                  </a>
                                )}
                                {apolloCompany.crunchbase_url && (
                                  <a 
                                    href={apolloCompany.crunchbase_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:underline text-xs"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Crunchbase
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Stakeholder Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStakeholders.map((stakeholder) => (
              <StakeholderCard 
                key={stakeholder.id} 
                stakeholder={stakeholder} 
                onAction={handleStakeholderAction}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <ScheduledMeetings
            onEditMeeting={handleEditMeeting}
            onCancelMeeting={handleCancelMeeting}
            onJoinMeeting={handleJoinMeeting}
          />
        </TabsContent>
      </Tabs>

      {/* Stakeholder Map Modal */}
      <StakeholderMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        stakeholders={stakeholders}
        onAddStakeholder={handleAddStakeholder}
      />

      {/* Add Stakeholder Modal */}
      <AddStakeholderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStakeholder={handleAddStakeholder}
        existingStakeholders={stakeholders}
      />

      {/* Stakeholder Action Modals */}
      <StakeholderActionModals
        stakeholder={selectedStakeholder}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateStakeholder}
        onRemove={handleRemoveStakeholder}
      />

      {/* Add Company Modal */}
      <Dialog open={isAddCompanyModalOpen} onOpenChange={setIsAddCompanyModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Add New Company</span>
            </DialogTitle>
            <DialogDescription>
              Enter the company details to add a new organization to your stakeholder mapping.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Company Name */}
            <div className="md:col-span-2">
              <label htmlFor="company_name" className="text-sm font-medium text-gray-700 mb-1 block">
                Company Name *
              </label>
              <Input
                id="company_name"
                value={newCompany.company_name}
                onChange={(e) => setNewCompany({...newCompany, company_name: e.target.value})}
                placeholder="Enter company name"
                className="w-full"
                required
              />
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="industry" className="text-sm font-medium text-gray-700 mb-1 block">
                Industry
              </label>
              <Input
                id="industry"
                value={newCompany.industry || ''}
                onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                placeholder="e.g., Technology, Healthcare"
                className="w-full"
              />
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="company_size" className="text-sm font-medium text-gray-700 mb-1 block">
                Company Size
              </label>
              <Select value={newCompany.company_size || ''} onValueChange={(value) => setNewCompany({...newCompany, company_size: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Startup (1-10)">Startup (1-10)</SelectItem>
                  <SelectItem value="Small (11-50)">Small (11-50)</SelectItem>
                  <SelectItem value="Medium (51-200)">Medium (51-200)</SelectItem>
                  <SelectItem value="Large (201-1000)">Large (201-1000)</SelectItem>
                  <SelectItem value="Enterprise (1000+)">Enterprise (1000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Employee Numbers */}
            <div>
              <label htmlFor="emp_nos" className="text-sm font-medium text-gray-700 mb-1 block">
                Number of Employees
              </label>
              <Input
                id="emp_nos"
                type="number"
                value={newCompany.emp_nos || ''}
                onChange={(e) => setNewCompany({...newCompany, emp_nos: e.target.value ? parseInt(e.target.value) : undefined})}
                placeholder="e.g., 500"
                className="w-full"
                min="1"
              />
            </div>

            {/* Annual Revenue */}
            <div>
              <label htmlFor="annual_revenue" className="text-sm font-medium text-gray-700 mb-1 block">
                Annual Revenue ($)
              </label>
              <Input
                id="annual_revenue"
                type="number"
                value={newCompany.annual_revenue || ''}
                onChange={(e) => setNewCompany({...newCompany, annual_revenue: e.target.value ? parseInt(e.target.value) : undefined})}
                placeholder="e.g., 10000000"
                className="w-full"
                min="0"
              />
            </div>

            {/* Website */}
            <div className="md:col-span-2">
              <label htmlFor="website" className="text-sm font-medium text-gray-700 mb-1 block">
                Website
              </label>
              <Input
                id="website"
                type="url"
                value={newCompany.website || ''}
                onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                placeholder="https://www.company.com"
                className="w-full"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1 block">
                Street Address
              </label>
              <Input
                id="address"
                value={newCompany.address || ''}
                onChange={(e) => setNewCompany({...newCompany, address: e.target.value})}
                placeholder="123 Business Street"
                className="w-full"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1 block">
                City
              </label>
              <Input
                id="city"
                value={newCompany.city || ''}
                onChange={(e) => setNewCompany({...newCompany, city: e.target.value})}
                placeholder="San Francisco"
                className="w-full"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state_name" className="text-sm font-medium text-gray-700 mb-1 block">
                State/Province
              </label>
              <Input
                id="state_name"
                value={newCompany.state_name || ''}
                onChange={(e) => setNewCompany({...newCompany, state_name: e.target.value})}
                placeholder="California"
                className="w-full"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="text-sm font-medium text-gray-700 mb-1 block">
                Country
              </label>
              <Input
                id="country"
                value={newCompany.country || ''}
                onChange={(e) => setNewCompany({...newCompany, country: e.target.value})}
                placeholder="United States"
                className="w-full"
              />
            </div>

            {/* Timezone */}
            <div>
              <label htmlFor="timezone" className="text-sm font-medium text-gray-700 mb-1 block">
                Timezone
              </label>
              <Select value={newCompany.timezone || ''} onValueChange={(value) => setNewCompany({...newCompany, timezone: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern (UTC-5)</SelectItem>
                  <SelectItem value="America/Chicago">Central (UTC-6)</SelectItem>
                  <SelectItem value="America/Denver">Mountain (UTC-7)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific (UTC-8)</SelectItem>
                  <SelectItem value="Europe/London">GMT (UTC+0)</SelectItem>
                  <SelectItem value="Europe/Berlin">CET (UTC+1)</SelectItem>
                  <SelectItem value="Asia/Tokyo">JST (UTC+9)</SelectItem>
                  <SelectItem value="Asia/Shanghai">CST (UTC+8)</SelectItem>
                  <SelectItem value="Australia/Sydney">AEDT (UTC+11)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                resetCompanyForm();
                setIsAddCompanyModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleAddCompany(newCompany)}
              disabled={!newCompany.company_name.trim()}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Company</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}