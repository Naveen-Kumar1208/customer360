"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  Target, 
  Users, 
  Calendar,
  Plus,
  Search,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  User,
  Phone,
  Mail,
  Edit,
  Save,
  X,
  Zap,
  Activity,
  BarChart3,
  Layers,
  Globe,
  PieChart,
  LineChart,
  Award,
  Flag,
  FileText
} from 'lucide-react';

interface CompanyNeed {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'identified' | 'validated' | 'addressed';
  createdAt: string;
  raisedBy: string;
}

interface Referral {
  id: string;
  contactName: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  relationship: string;
  status: 'requested' | 'received' | 'connected';
  requestedAt: string;
}

interface FollowUp {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'call' | 'email' | 'meeting' | 'demo';
  status: 'pending' | 'completed' | 'overdue';
}

interface ICPCriteria {
  id: string;
  category: string;
  requirement: string;
  customerValue: string;
  alignment: 'strong' | 'moderate' | 'weak';
  weight: number;
}

interface ABMCampaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'event' | 'direct-mail';
  status: 'active' | 'paused' | 'completed' | 'draft';
  targetAccounts: number;
  engagedAccounts: number;
  conversionRate: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
}

interface ABMEngagement {
  id: string;
  touchpoint: string;
  type: 'email_open' | 'website_visit' | 'content_download' | 'event_attendance' | 'social_interaction';
  timestamp: string;
  score: number;
  channel: string;
}

interface AccountInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'engagement' | 'competitive';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  createdAt: string;
}

const DealRelevancePage: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('TechCorp Inc');
  const [isAddingNeed, setIsAddingNeed] = useState(false);
  const [isEditingNeed, setIsEditingNeed] = useState(false);
  const [selectedNeedForEdit, setSelectedNeedForEdit] = useState<CompanyNeed | null>(null);
  const [isAddingReferral, setIsAddingReferral] = useState(false);
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);
  const [selectedCampaignForAnalytics, setSelectedCampaignForAnalytics] = useState<ABMCampaign | null>(null);
  const [selectedCampaignForEdit, setSelectedCampaignForEdit] = useState<ABMCampaign | null>(null);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isEditCampaignModalOpen, setIsEditCampaignModalOpen] = useState(false);
  const [selectedIcpForEdit, setSelectedIcpForEdit] = useState<ICPCriteria | null>(null);
  const [isAddingIcp, setIsAddingIcp] = useState(false);
  const [isEditingIcp, setIsEditingIcp] = useState(false);

  // Form states for modals
  const [needForm, setNeedForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    status: 'identified' as 'identified' | 'validated' | 'addressed',
    raisedBy: ''
  });

  const [editNeedForm, setEditNeedForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    status: 'identified' as 'identified' | 'validated' | 'addressed',
    raisedBy: ''
  });

  const [referralForm, setReferralForm] = useState({
    contactName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    relationship: '',
    status: 'requested' as 'requested' | 'received' | 'connected'
  });

  const [followUpForm, setFollowUpForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    type: 'call' as 'call' | 'email' | 'meeting' | 'demo',
    status: 'pending' as 'pending' | 'completed' | 'overdue'
  });

  const [campaignEditForm, setCampaignEditForm] = useState({
    name: '',
    type: 'email' as 'email' | 'social' | 'content' | 'event' | 'direct-mail',
    status: 'active' as 'active' | 'paused' | 'completed' | 'draft',
    targetAccounts: 0,
    budget: 0,
    startDate: '',
    endDate: ''
  });

  const [icpForm, setIcpForm] = useState({
    category: '',
    requirement: '',
    customerValue: '',
    alignment: 'moderate' as 'strong' | 'moderate' | 'weak',
    weight: 50
  });

  // Sample data
  const [companyNeeds, setCompanyNeeds] = useState<CompanyNeed[]>([
    {
      id: 'need-1',
      title: 'CRM Integration',
      description: 'Need to integrate existing CRM with new analytics platform',
      priority: 'high',
      status: 'identified',
      createdAt: '2024-01-10',
      raisedBy: 'John Smith (CTO)'
    },
    {
      id: 'need-2',
      title: 'Data Analytics Dashboard',
      description: 'Looking for comprehensive reporting and analytics capabilities',
      priority: 'medium',
      status: 'validated',
      createdAt: '2024-01-08',
      raisedBy: 'Sarah Johnson (VP Engineering)'
    },
    {
      id: 'need-3',
      title: 'Mobile Application',
      description: 'Want mobile access for field sales team',
      priority: 'low',
      status: 'addressed',
      createdAt: '2024-01-05',
      raisedBy: 'Direct Discovery'
    }
  ]);

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: 'ref-1',
      contactName: 'John Smith',
      company: 'TechCorp Inc',
      position: 'CTO',
      email: 'john.smith@techcorp.com',
      phone: '+1 555-0123',
      relationship: 'Former colleague',
      status: 'connected',
      requestedAt: '2024-01-12'
    },
    {
      id: 'ref-2',
      contactName: 'Sarah Johnson',
      company: 'Innovation Labs',
      position: 'VP Engineering',
      email: 'sarah.j@innovationlabs.com',
      phone: '+1 555-0234',
      relationship: 'Industry contact',
      status: 'requested',
      requestedAt: '2024-01-15'
    }
  ]);

  const [followUps, setFollowUps] = useState<FollowUp[]>([
    {
      id: 'fu-1',
      title: 'Demo Presentation',
      description: 'Present analytics dashboard demo to technical team',
      dueDate: '2024-01-20',
      priority: 'high',
      type: 'demo',
      status: 'pending'
    },
    {
      id: 'fu-2',
      title: 'Follow up on proposal',
      description: 'Check status of submitted proposal',
      dueDate: '2024-01-18',
      priority: 'medium',
      type: 'call',
      status: 'pending'
    },
    {
      id: 'fu-3',
      title: 'Send case study',
      description: 'Share relevant case study from similar company',
      dueDate: '2024-01-16',
      priority: 'low',
      type: 'email',
      status: 'completed'
    }
  ]);

  const [icpCriteria, setIcpCriteria] = useState<ICPCriteria[]>([
    {
      id: 'icp-1',
      category: 'Company Size',
      requirement: '100-1000 employees',
      customerValue: '500 employees',
      alignment: 'strong',
      weight: 90
    },
    {
      id: 'icp-2',
      category: 'Industry',
      requirement: 'Technology/Software',
      customerValue: 'SaaS Technology',
      alignment: 'strong',
      weight: 95
    },
    {
      id: 'icp-3',
      category: 'Budget Range',
      requirement: '$50K-$200K annually',
      customerValue: '$120K allocated',
      alignment: 'strong',
      weight: 85
    },
    {
      id: 'icp-4',
      category: 'Geographic Location',
      requirement: 'North America',
      customerValue: 'San Francisco, CA',
      alignment: 'strong',
      weight: 70
    },
    {
      id: 'icp-5',
      category: 'Growth Stage',
      requirement: 'Series A-C',
      customerValue: 'Series B',
      alignment: 'strong',
      weight: 80
    }
  ]);

  // ABM Data
  const [abmCampaigns, setAbmCampaigns] = useState<ABMCampaign[]>([
    {
      id: 'abm-1',
      name: 'Enterprise Tech Series',
      type: 'content',
      status: 'active',
      targetAccounts: 25,
      engagedAccounts: 18,
      conversionRate: 12.5,
      budget: 5000,
      spent: 3200,
      startDate: '2024-01-01',
      endDate: '2024-03-31'
    },
    {
      id: 'abm-2',
      name: 'C-Suite Email Campaign',
      type: 'email',
      status: 'active',
      targetAccounts: 50,
      engagedAccounts: 35,
      conversionRate: 8.3,
      budget: 4000,
      spent: 2850,
      startDate: '2024-01-15',
      endDate: '2024-02-28'
    },
    {
      id: 'abm-3',
      name: 'Industry Event Outreach',
      type: 'event',
      status: 'completed',
      targetAccounts: 15,
      engagedAccounts: 12,
      conversionRate: 20.0,
      budget: 6000,
      spent: 3900,
      startDate: '2023-12-01',
      endDate: '2024-01-15'
    }
  ]);

  const [abmEngagements, setAbmEngagements] = useState<ABMEngagement[]>([
    {
      id: 'eng-1',
      touchpoint: 'Downloaded whitepaper: "AI in Enterprise"',
      type: 'content_download',
      timestamp: '2024-01-15 14:30',
      score: 25,
      channel: 'Website'
    },
    {
      id: 'eng-2',
      touchpoint: 'Attended webinar: "Future of Tech"',
      type: 'event_attendance',
      timestamp: '2024-01-12 10:00',
      score: 40,
      channel: 'Virtual Event'
    },
    {
      id: 'eng-3',
      touchpoint: 'Opened campaign email 3 times',
      type: 'email_open',
      timestamp: '2024-01-10 09:15',
      score: 15,
      channel: 'Email'
    },
    {
      id: 'eng-4',
      touchpoint: 'Visited pricing page',
      type: 'website_visit',
      timestamp: '2024-01-08 16:45',
      score: 35,
      channel: 'Website'
    }
  ]);

  const [accountInsights, setAccountInsights] = useState<AccountInsight[]>([
    {
      id: 'insight-1',
      type: 'opportunity',
      title: 'Budget Allocation Increased',
      description: 'TechCorp has increased their technology budget by 40% for Q1 2024',
      priority: 'high',
      actionable: true,
      createdAt: '2024-01-14'
    },
    {
      id: 'insight-2',
      type: 'engagement',
      title: 'High Email Engagement',
      description: 'Key stakeholders showing 85% higher engagement rate than industry average',
      priority: 'medium',
      actionable: true,
      createdAt: '2024-01-12'
    },
    {
      id: 'insight-3',
      type: 'competitive',
      title: 'Competitor Evaluation',
      description: 'Account is actively evaluating competitor solutions - act quickly',
      priority: 'high',
      actionable: true,
      createdAt: '2024-01-10'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'connected':
      case 'addressed': return 'bg-green-100 text-green-800';
      case 'pending':
      case 'requested':
      case 'identified': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'validated': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlignmentColor = (alignment: string) => {
    switch (alignment) {
      case 'strong': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'weak': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const calculateOverallIcpScore = () => {
    const totalWeight = icpCriteria.reduce((sum, criteria) => sum + criteria.weight, 0);
    return Math.round(totalWeight / icpCriteria.length);
  };

  const calculateABMEngagementScore = () => {
    if (abmEngagements.length === 0) return 0;
    const totalScore = abmEngagements.reduce((sum, engagement) => sum + engagement.score, 0);
    // Calculate average score and scale to 100 (assuming max individual score could be around 50)
    const averageScore = totalScore / abmEngagements.length;
    // Scale the average to a percentage out of 100 (assuming max individual engagement score is 50)
    return Math.round((averageScore / 50) * 100);
  };

  const getActiveCampaigns = () => {
    return abmCampaigns.filter(campaign => campaign.status === 'active').length;
  };

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'text-green-600';
      case 'risk': return 'text-red-600';
      case 'engagement': return 'text-blue-600';
      case 'competitive': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'social': return Users;
      case 'content': return FileText;
      case 'event': return Calendar;
      case 'direct-mail': return Building2;
      default: return Target;
    }
  };

  const getAvailableReferrals = () => {
    return referrals.map(ref => ({
      value: `${ref.contactName} (${ref.position})`,
      label: `${ref.contactName} (${ref.position})`
    }));
  };

  // ABM Campaign handlers
  const handleViewAnalytics = (campaign: ABMCampaign) => {
    setSelectedCampaignForAnalytics(campaign);
    setIsAnalyticsModalOpen(true);
  };

  const handleEditCampaign = (campaign: ABMCampaign) => {
    setSelectedCampaignForEdit(campaign);
    setCampaignEditForm({
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      targetAccounts: campaign.targetAccounts,
      budget: campaign.budget,
      startDate: campaign.startDate,
      endDate: campaign.endDate
    });
    setIsEditCampaignModalOpen(true);
  };

  const handleUpdateCampaign = () => {
    if (selectedCampaignForEdit && campaignEditForm.name.trim()) {
      setAbmCampaigns(prev => prev.map(campaign => 
        campaign.id === selectedCampaignForEdit.id 
          ? {
              ...campaign,
              name: campaignEditForm.name,
              type: campaignEditForm.type,
              status: campaignEditForm.status,
              targetAccounts: campaignEditForm.targetAccounts,
              budget: campaignEditForm.budget,
              startDate: campaignEditForm.startDate,
              endDate: campaignEditForm.endDate
            }
          : campaign
      ));
      setIsEditCampaignModalOpen(false);
      setSelectedCampaignForEdit(null);
    }
  };

  // ICP handlers
  const handleAddIcp = () => {
    const category = icpForm.category.trim();
    const requirement = icpForm.requirement.trim();
    
    if (!category) {
      alert('Please enter a category for the ICP criteria');
      return;
    }
    
    if (!requirement) {
      alert('Please enter a requirement for the ICP criteria');
      return;
    }

    const newIcp: ICPCriteria = {
      id: `icp-${Date.now()}`,
      category: category,
      requirement: requirement,
      customerValue: icpForm.customerValue,
      alignment: icpForm.alignment,
      weight: icpForm.weight
    };
    
    setIcpCriteria(prev => [...prev, newIcp]);
    setIcpForm({ category: '', requirement: '', customerValue: '', alignment: 'moderate', weight: 50 });
    setIsAddingIcp(false);
  };

  const handleEditIcp = (icp: ICPCriteria) => {
    setSelectedIcpForEdit(icp);
    setIcpForm({
      category: icp.category,
      requirement: icp.requirement,
      customerValue: icp.customerValue,
      alignment: icp.alignment,
      weight: icp.weight
    });
    setIsEditingIcp(true);
  };

  const handleUpdateIcp = () => {
    if (selectedIcpForEdit && icpForm.category.trim() && icpForm.requirement.trim()) {
      setIcpCriteria(prev => prev.map(icp => 
        icp.id === selectedIcpForEdit.id 
          ? {
              ...icp,
              category: icpForm.category,
              requirement: icpForm.requirement,
              customerValue: icpForm.customerValue,
              alignment: icpForm.alignment,
              weight: icpForm.weight
            }
          : icp
      ));
      setIsEditingIcp(false);
      setSelectedIcpForEdit(null);
    }
  };

  // Form handlers
  const handleAddNeed = () => {
    const title = needForm.title.trim();
    const description = needForm.description.trim();
    
    if (!title) {
      alert('Please enter a title for the need');
      return;
    }
    
    if (!description) {
      alert('Please enter a description for the need');
      return;
    }

    const newNeed: CompanyNeed = {
      id: `need-${Date.now()}`,
      title: title,
      description: description,
      priority: needForm.priority,
      status: needForm.status,
      createdAt: new Date().toISOString().split('T')[0],
      raisedBy: needForm.raisedBy || 'Direct Discovery'
    };
    
    setCompanyNeeds(prev => [...prev, newNeed]);
    setNeedForm({ title: '', description: '', priority: 'medium', status: 'identified', raisedBy: '' });
    setIsAddingNeed(false);
  };

  const handleEditNeedClick = (need: CompanyNeed) => {
    setSelectedNeedForEdit(need);
    setEditNeedForm({
      title: need.title,
      description: need.description,
      priority: need.priority,
      status: need.status,
      raisedBy: need.raisedBy
    });
    setIsEditingNeed(true);
  };

  const handleSaveEditedNeed = () => {
    if (selectedNeedForEdit && editNeedForm.title.trim() && editNeedForm.description.trim()) {
      setCompanyNeeds(prev => 
        prev.map(need => 
          need.id === selectedNeedForEdit.id 
            ? {
                ...need,
                title: editNeedForm.title,
                description: editNeedForm.description,
                priority: editNeedForm.priority,
                status: editNeedForm.status,
                raisedBy: editNeedForm.raisedBy
              }
            : need
        )
      );
      setIsEditingNeed(false);
      setSelectedNeedForEdit(null);
      setEditNeedForm({ title: '', description: '', priority: 'medium', status: 'identified', raisedBy: '' });
    }
  };

  const handleAddReferral = () => {
    const contactName = referralForm.contactName.trim();
    const email = referralForm.email.trim();
    
    if (!contactName) {
      alert('Please enter a contact name');
      return;
    }
    
    if (!email) {
      alert('Please enter an email address');
      return;
    }

    const newReferral: Referral = {
      id: `ref-${Date.now()}`,
      contactName: contactName,
      company: referralForm.company || selectedCompany,
      position: referralForm.position,
      email: email,
      phone: referralForm.phone,
      relationship: referralForm.relationship,
      status: referralForm.status,
      requestedAt: new Date().toISOString().split('T')[0]
    };
    
    setReferrals(prev => [...prev, newReferral]);
    setReferralForm({ contactName: '', company: '', position: '', email: '', phone: '', relationship: '', status: 'requested' });
    setIsAddingReferral(false);
  };

  const handleAddFollowUp = () => {
    const title = followUpForm.title.trim();
    const dueDate = followUpForm.dueDate;
    
    if (!title) {
      alert('Please enter a title for the follow-up');
      return;
    }
    
    if (!dueDate) {
      alert('Please select a due date for the follow-up');
      return;
    }

    const newFollowUp: FollowUp = {
      id: `fu-${Date.now()}`,
      title: title,
      description: followUpForm.description,
      dueDate: dueDate,
      priority: followUpForm.priority,
      type: followUpForm.type,
      status: followUpForm.status
    };
    
    setFollowUps(prev => [...prev, newFollowUp]);
    setFollowUpForm({ title: '', description: '', dueDate: '', priority: 'medium', type: 'call', status: 'pending' });
    setIsAddingFollowUp(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Account Intelligence & ABM</h1>
            <p className="text-gray-600 mt-1">Deal relevance analysis with account-based marketing insights</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search companies..." 
                className="pl-10 w-80"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {selectedCompany}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{companyNeeds.length}</div>
                <div className="text-sm text-gray-600">Company Needs</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{referrals.length}</div>
                <div className="text-sm text-gray-600">Referrals</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{followUps.filter(f => f.status === 'pending').length}</div>
                <div className="text-sm text-gray-600">Pending Follow-ups</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{calculateOverallIcpScore()}%</div>
                <div className="text-sm text-gray-600">ICP Alignment</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{getActiveCampaigns()}</div>
                <div className="text-sm text-gray-600">Active ABM Campaigns</div>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-600">{calculateABMEngagementScore()}</div>
                <div className="text-sm text-gray-600">ABM Engagement Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="needs" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Needs
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="followups" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Follow Up
            </TabsTrigger>
            <TabsTrigger value="abm-campaigns" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              ABM Campaigns
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="icp" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              ICP
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Account Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accountInsights.map((insight) => (
                      <div key={insight.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-medium ${getInsightTypeColor(insight.type)}`}>
                                {insight.type.toUpperCase()}
                              </span>
                              <Badge className={getPriorityColor(insight.priority)}>
                                {insight.priority}
                              </Badge>
                            </div>
                            <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          </div>
                          {insight.actionable && (
                            <Button size="sm" variant="outline">
                              <Flag className="w-3 h-3 mr-1" />
                              Action
                            </Button>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {insight.createdAt}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent ABM Engagements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent ABM Engagements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {abmEngagements.map((engagement) => (
                      <div key={engagement.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Activity className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{engagement.touchpoint}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{engagement.channel}</span>
                            <span className="text-sm text-gray-500">{engagement.timestamp}</span>
                            <Badge variant="outline" className="text-xs">
                              +{engagement.score} pts
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Company Needs Tab */}
          <TabsContent value="needs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Company Needs Analysis</CardTitle>
                  <Button 
                    onClick={() => setIsAddingNeed(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Need
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyNeeds.map((need) => (
                    <div key={need.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{need.title}</h3>
                          <p className="text-gray-600 mt-1">{need.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(need.priority)}>
                            {need.priority}
                          </Badge>
                          <Badge className={getStatusColor(need.status)}>
                            {need.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex flex-col gap-1">
                          <span>Identified on {need.createdAt}</span>
                          <span className="text-xs text-gray-400">Raised by: {need.raisedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditNeedClick(need)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seeking Referrals Tab */}
          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Referral Network</CardTitle>
                  <Button 
                    onClick={() => setIsAddingReferral(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Referral
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <User className="w-8 h-8 text-gray-400" />
                            <div>
                              <h3 className="font-semibold">{referral.contactName}</h3>
                              <p className="text-gray-600">{referral.position} at {referral.company}</p>
                              <p className="text-sm text-gray-500">{referral.relationship}</p>
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(referral.status)}>
                          {referral.status}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {referral.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {referral.phone}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Requested on {referral.requestedAt}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Follow Up Tab */}
          <TabsContent value="followups">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Follow-up Activities</CardTitle>
                  <Button 
                    onClick={() => setIsAddingFollowUp(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Follow-up
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {followUps.map((followUp) => (
                    <div key={followUp.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <h3 className="font-semibold">{followUp.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-2">{followUp.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Due: {followUp.dueDate}</span>
                            <Badge variant="outline" className="capitalize">
                              {followUp.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(followUp.priority)}>
                            {followUp.priority}
                          </Badge>
                          <Badge className={getStatusColor(followUp.status)}>
                            {followUp.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {followUp.status === 'overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {followUp.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABM Campaigns Tab */}
          <TabsContent value="abm-campaigns">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  ABM Campaign Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {abmCampaigns.map((campaign) => {
                    const IconComponent = getCampaignTypeIcon(campaign.type);
                    const engagementRate = Math.round((campaign.engagedAccounts / campaign.targetAccounts) * 100);
                    const budgetUtilization = Math.round((campaign.spent / campaign.budget) * 100);
                    
                    return (
                      <div key={campaign.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{campaign.name}</h3>
                              <p className="text-gray-600 capitalize">{campaign.type.replace('-', ' ')} Campaign</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xl font-bold text-gray-900">{campaign.targetAccounts}</div>
                            <div className="text-xs text-gray-600">Target Accounts</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{campaign.engagedAccounts}</div>
                            <div className="text-xs text-gray-600">Engaged ({engagementRate}%)</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{campaign.conversionRate}%</div>
                            <div className="text-xs text-gray-600">Conversion Rate</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">${(campaign.spent / 1000).toFixed(0)}k</div>
                            <div className="text-xs text-gray-600">Spent ({budgetUtilization}%)</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewAnalytics(campaign)}
                            >
                              <BarChart3 className="w-3 h-3 mr-1" />
                              Analytics
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditCampaign(campaign)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Engagement Timeline */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Engagement Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {abmEngagements.map((engagement, index) => (
                        <div key={engagement.id} className="relative">
                          {index !== abmEngagements.length - 1 && (
                            <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200"></div>
                          )}
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Activity className="w-4 h-4 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{engagement.touchpoint}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {engagement.channel}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{engagement.timestamp}</span>
                                  </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                  +{engagement.score}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Engagement Summary */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Engagement Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <div className="text-3xl font-bold text-indigo-600">{calculateABMEngagementScore()}</div>
                        <div className="text-sm text-gray-600">Total Engagement Score</div>
                      </div>
                      
                      <div className="space-y-3">
                        {['Website', 'Email', 'Virtual Event', 'Content'].map((channel, index) => {
                          const channelScore = abmEngagements
                            .filter(e => e.channel === channel)
                            .reduce((sum, e) => sum + e.score, 0);
                          const totalRawScore = abmEngagements.reduce((sum, e) => sum + e.score, 0);
                          const percentage = totalRawScore > 0 ? Math.round((channelScore / totalRawScore) * 100) : 0;
                          
                          return (
                            <div key={channel} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{channel}</span>
                                <span className="font-medium">{channelScore} pts ({percentage}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    index === 0 ? 'bg-blue-500' :
                                    index === 1 ? 'bg-green-500' :
                                    index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ICP Alignment Tab */}
          <TabsContent value="icp">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    Ideal Customer Profile (ICP) Alignment
                    <Badge variant="outline" className="text-lg px-3 py-1 ml-4">
                      Overall Score: {calculateOverallIcpScore()}%
                    </Badge>
                  </CardTitle>
                  <Button 
                    onClick={() => setIsAddingIcp(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add ICP Criteria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {icpCriteria.map((criteria) => (
                    <div key={criteria.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{criteria.category}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${getAlignmentColor(criteria.alignment)}`}>
                            {criteria.alignment}
                          </span>
                          <Badge variant="outline">{criteria.weight}%</Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditIcp(criteria)}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-gray-600">Required</Label>
                          <p className="font-medium">{criteria.requirement}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">Customer Value</Label>
                          <p className="font-medium">{criteria.customerValue}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              criteria.alignment === 'strong' ? 'bg-green-500' :
                              criteria.alignment === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${criteria.weight}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add ICP Criteria Modal */}
        <Dialog open={isAddingIcp} onOpenChange={setIsAddingIcp}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add ICP Criteria
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="icpCategory">Category *</Label>
                <Input
                  id="icpCategory"
                  value={icpForm.category}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Company Size, Industry, Budget Range"
                />
              </div>
              
              <div>
                <Label htmlFor="icpRequirement">Requirement *</Label>
                <Textarea
                  id="icpRequirement"
                  value={icpForm.requirement}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, requirement: e.target.value }))}
                  placeholder="Describe what you're looking for in this category"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="icpCustomerValue">Customer Value</Label>
                <Textarea
                  id="icpCustomerValue"
                  value={icpForm.customerValue}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, customerValue: e.target.value }))}
                  placeholder="How does the current customer match this requirement"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icpAlignment">Alignment</Label>
                  <Select value={icpForm.alignment} onValueChange={(value: 'strong' | 'moderate' | 'weak') => 
                    setIcpForm(prev => ({ ...prev, alignment: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="weak">Weak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="icpWeight">Weight (%)</Label>
                  <Input
                    id="icpWeight"
                    type="number"
                    min="0"
                    max="100"
                    value={icpForm.weight}
                    onChange={(e) => setIcpForm(prev => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))}
                    placeholder="Importance weight"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingIcp(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIcp}>
                  <Save className="w-4 h-4 mr-2" />
                  Add Criteria
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit ICP Criteria Modal */}
        <Dialog open={isEditingIcp} onOpenChange={setIsEditingIcp}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit ICP Criteria: {selectedIcpForEdit?.category}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editIcpCategory">Category *</Label>
                <Input
                  id="editIcpCategory"
                  value={icpForm.category}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Company Size, Industry, Budget Range"
                />
              </div>
              
              <div>
                <Label htmlFor="editIcpRequirement">Requirement *</Label>
                <Textarea
                  id="editIcpRequirement"
                  value={icpForm.requirement}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, requirement: e.target.value }))}
                  placeholder="Describe what you're looking for in this category"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="editIcpCustomerValue">Customer Value</Label>
                <Textarea
                  id="editIcpCustomerValue"
                  value={icpForm.customerValue}
                  onChange={(e) => setIcpForm(prev => ({ ...prev, customerValue: e.target.value }))}
                  placeholder="How does the current customer match this requirement"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editIcpAlignment">Alignment</Label>
                  <Select value={icpForm.alignment} onValueChange={(value: 'strong' | 'moderate' | 'weak') => 
                    setIcpForm(prev => ({ ...prev, alignment: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="weak">Weak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="editIcpWeight">Weight (%)</Label>
                  <Input
                    id="editIcpWeight"
                    type="number"
                    min="0"
                    max="100"
                    value={icpForm.weight}
                    onChange={(e) => setIcpForm(prev => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))}
                    placeholder="Importance weight"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditingIcp(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateIcp}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ABM Campaign Analytics Modal */}
        <Dialog open={isAnalyticsModalOpen} onOpenChange={setIsAnalyticsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Campaign Analytics: {selectedCampaignForAnalytics?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedCampaignForAnalytics && (
              <div className="space-y-6">
                {/* Campaign Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round((selectedCampaignForAnalytics.engagedAccounts / selectedCampaignForAnalytics.targetAccounts) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Engagement Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedCampaignForAnalytics.conversionRate}%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      ${(selectedCampaignForAnalytics.spent / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      ${Math.round(selectedCampaignForAnalytics.spent / selectedCampaignForAnalytics.engagedAccounts)}
                    </div>
                    <div className="text-sm text-gray-600">Cost per Engagement</div>
                  </div>
                </div>

                {/* Performance Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="w-5 h-5" />
                      Performance Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Campaign Launch</span>
                        <span className="text-sm text-gray-500">{selectedCampaignForAnalytics.startDate}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">First Engagement</span>
                        <span className="text-sm text-gray-500">+2 days</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Peak Engagement</span>
                        <span className="text-sm text-gray-500">Week 2</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">First Conversion</span>
                        <span className="text-sm text-gray-500">+12 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Account Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>High Engagement</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-sm font-medium">{Math.round(selectedCampaignForAnalytics.engagedAccounts * 0.6)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Medium Engagement</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <span className="text-sm font-medium">{Math.round(selectedCampaignForAnalytics.engagedAccounts * 0.3)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Low Engagement</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                            <span className="text-sm font-medium">{Math.round(selectedCampaignForAnalytics.engagedAccounts * 0.1)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Channel Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { channel: 'Email', percentage: 45, color: 'bg-blue-500' },
                          { channel: 'Social Media', percentage: 25, color: 'bg-green-500' },
                          { channel: 'Content', percentage: 20, color: 'bg-purple-500' },
                          { channel: 'Direct', percentage: 10, color: 'bg-orange-500' }
                        ].map((item) => (
                          <div key={item.channel} className="flex justify-between items-center">
                            <span>{item.channel}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                              </div>
                              <span className="text-sm font-medium">{item.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Follow up with high-engagement accounts</p>
                          <p className="text-sm text-gray-600">12 accounts showing strong interest - schedule personalized demos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Re-engage low-activity accounts</p>
                          <p className="text-sm text-gray-600">8 accounts need additional touchpoints - consider alternative channels</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Scale successful tactics</p>
                          <p className="text-sm text-gray-600">Email content performing 40% above average - replicate for similar campaigns</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* ABM Campaign Edit Modal */}
        <Dialog open={isEditCampaignModalOpen} onOpenChange={setIsEditCampaignModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="w-5 h-5" />
                Edit Campaign: {selectedCampaignForEdit?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name *</Label>
                <Input
                  id="campaignName"
                  value={campaignEditForm.name}
                  onChange={(e) => setCampaignEditForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaignType">Campaign Type</Label>
                  <Select value={campaignEditForm.type} onValueChange={(value: 'email' | 'social' | 'content' | 'event' | 'direct-mail') => 
                    setCampaignEditForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="direct-mail">Direct Mail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="campaignStatus">Status</Label>
                  <Select value={campaignEditForm.status} onValueChange={(value: 'active' | 'paused' | 'completed' | 'draft') => 
                    setCampaignEditForm(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetAccounts">Target Accounts</Label>
                  <Input
                    id="targetAccounts"
                    type="number"
                    value={campaignEditForm.targetAccounts}
                    onChange={(e) => setCampaignEditForm(prev => ({ ...prev, targetAccounts: Number.parseInt(e.target.value) || 0 }))}
                    placeholder="Number of accounts"
                  />
                </div>
                
                <div>
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={campaignEditForm.budget}
                    onChange={(e) => setCampaignEditForm(prev => ({ ...prev, budget: Number.parseInt(e.target.value) || 0 }))}
                    placeholder="Campaign budget"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={campaignEditForm.startDate}
                    onChange={(e) => setCampaignEditForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={campaignEditForm.endDate}
                    onChange={(e) => setCampaignEditForm(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditCampaignModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCampaign}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Need Modal */}
        <Dialog open={isAddingNeed} onOpenChange={setIsAddingNeed}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Company Need</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="needTitle">Title *</Label>
                <Input
                  id="needTitle"
                  value={needForm.title}
                  onChange={(e) => setNeedForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter need title"
                />
              </div>
              <div>
                <Label htmlFor="needDescription">Description *</Label>
                <Textarea
                  id="needDescription"
                  value={needForm.description}
                  onChange={(e) => setNeedForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the company need"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="needRaisedBy">Raised By</Label>
                <Select value={needForm.raisedBy} onValueChange={(value) => 
                  setNeedForm(prev => ({ ...prev, raisedBy: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select who raised this need" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Direct Discovery">Direct Discovery</SelectItem>
                    {getAvailableReferrals().map((referral) => (
                      <SelectItem key={referral.value} value={referral.value}>
                        {referral.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="needPriority">Priority</Label>
                  <Select value={needForm.priority} onValueChange={(value: 'high' | 'medium' | 'low') => 
                    setNeedForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="needStatus">Status</Label>
                  <Select value={needForm.status} onValueChange={(value: 'identified' | 'validated' | 'addressed') => 
                    setNeedForm(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="identified">Identified</SelectItem>
                      <SelectItem value="validated">Validated</SelectItem>
                      <SelectItem value="addressed">Addressed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingNeed(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddNeed}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Need
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Need Modal */}
        <Dialog open={isEditingNeed} onOpenChange={setIsEditingNeed}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Company Need</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editNeedTitle">Title *</Label>
                <Input
                  id="editNeedTitle"
                  value={editNeedForm.title}
                  onChange={(e) => setEditNeedForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter need title"
                />
              </div>
              <div>
                <Label htmlFor="editNeedDescription">Description *</Label>
                <Textarea
                  id="editNeedDescription"
                  value={editNeedForm.description}
                  onChange={(e) => setEditNeedForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the company need"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="editNeedRaisedBy">Raised By</Label>
                <Select value={editNeedForm.raisedBy} onValueChange={(value) => 
                  setEditNeedForm(prev => ({ ...prev, raisedBy: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select who raised this need" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Direct Discovery">Direct Discovery</SelectItem>
                    {getAvailableReferrals().map((referral) => (
                      <SelectItem key={referral.value} value={referral.value}>
                        {referral.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editNeedPriority">Priority</Label>
                  <Select value={editNeedForm.priority} onValueChange={(value: 'high' | 'medium' | 'low') => 
                    setEditNeedForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editNeedStatus">Status</Label>
                  <Select value={editNeedForm.status} onValueChange={(value: 'identified' | 'validated' | 'addressed') => 
                    setEditNeedForm(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="identified">Identified</SelectItem>
                      <SelectItem value="validated">Validated</SelectItem>
                      <SelectItem value="addressed">Addressed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditingNeed(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEditedNeed}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Referral Modal */}
        <Dialog open={isAddingReferral} onOpenChange={setIsAddingReferral}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Referral Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={referralForm.contactName}
                    onChange={(e) => setReferralForm(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={referralForm.position}
                    onChange={(e) => setReferralForm(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Job title"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={referralForm.company}
                  onChange={(e) => setReferralForm(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={referralForm.email}
                    onChange={(e) => setReferralForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={referralForm.phone}
                    onChange={(e) => setReferralForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 555-0123"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={referralForm.relationship}
                  onChange={(e) => setReferralForm(prev => ({ ...prev, relationship: e.target.value }))}
                  placeholder="e.g., Former colleague, Industry contact"
                />
              </div>
              <div>
                <Label htmlFor="referralStatus">Status</Label>
                <Select value={referralForm.status} onValueChange={(value: 'requested' | 'received' | 'connected') => 
                  setReferralForm(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="requested">Requested</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingReferral(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReferral}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Referral
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Follow Up Modal */}
        <Dialog open={isAddingFollowUp} onOpenChange={setIsAddingFollowUp}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Follow-up Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="followUpTitle">Title *</Label>
                <Input
                  id="followUpTitle"
                  value={followUpForm.title}
                  onChange={(e) => setFollowUpForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Follow-up activity title"
                />
              </div>
              <div>
                <Label htmlFor="followUpDescription">Description</Label>
                <Textarea
                  id="followUpDescription"
                  value={followUpForm.description}
                  onChange={(e) => setFollowUpForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the follow-up activity"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={followUpForm.dueDate}
                    onChange={(e) => setFollowUpForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="followUpType">Type</Label>
                  <Select value={followUpForm.type} onValueChange={(value: 'call' | 'email' | 'meeting' | 'demo') => 
                    setFollowUpForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="followUpPriority">Priority</Label>
                  <Select value={followUpForm.priority} onValueChange={(value: 'high' | 'medium' | 'low') => 
                    setFollowUpForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="followUpStatus">Status</Label>
                  <Select value={followUpForm.status} onValueChange={(value: 'pending' | 'completed' | 'overdue') => 
                    setFollowUpForm(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddingFollowUp(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFollowUp}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Follow-up
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DealRelevancePage;