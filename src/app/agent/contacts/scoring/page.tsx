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
  TrendingUp,
  Users,
  Star,
  BarChart3,
  Eye,
  Edit,
  RefreshCw,
  Settings,
  Target,
  Award,
  Calendar,
  MoreHorizontal,
  History
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewAnalyticsModal } from "@/components/contact-scoring/ViewAnalyticsModal";
import { ContactScoringActionModals } from "@/components/contact-scoring/ContactScoringActionModals";
import { ViewHistoryModal } from "@/components/contact-scoring/ViewHistoryModal";

interface ContactScore {
  id: string;
  name: string;
  company: string;
  email: string;
  overallScore: number;
  demographicScore: number;
  behavioralScore: number;
  engagementScore: number;
  intentScore: number;
  lastUpdated: Date;
  potentialValue: number;
  conversionProbability: number;
  factors: {
    positive: string[];
    negative: string[];
  };
}

const sampleContactScores: ContactScore[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechCorp Industries",
    email: "sarah.johnson@techcorp.com",
    overallScore: 92,
    demographicScore: 95,
    behavioralScore: 88,
    engagementScore: 94,
    intentScore: 90,
    lastUpdated: new Date("2024-01-15"),
    potentialValue: 250000,
    conversionProbability: 85,
    factors: {
      positive: ["High-value company", "Decision maker", "Active engagement", "Previous purchases"],
      negative: ["Long sales cycle"]
    }
  },
  {
    id: "2",
    name: "Robert Davis",
    company: "Innovation Labs",
    email: "robert.davis@innovationlabs.com",
    overallScore: 78,
    demographicScore: 82,
    behavioralScore: 75,
    engagementScore: 80,
    intentScore: 76,
    lastUpdated: new Date("2024-01-14"),
    potentialValue: 150000,
    conversionProbability: 68,
    factors: {
      positive: ["Growing company", "Budget available", "Recent website visits"],
      negative: ["Not primary decision maker", "Limited engagement"]
    }
  },
  {
    id: "3",
    name: "Emily Chen",
    company: "StartupXYZ",
    email: "emily.chen@startupxyz.com",
    overallScore: 65,
    demographicScore: 60,
    behavioralScore: 70,
    engagementScore: 68,
    intentScore: 62,
    lastUpdated: new Date("2024-01-13"),
    potentialValue: 75000,
    conversionProbability: 45,
    factors: {
      positive: ["High engagement", "Multiple touchpoints", "Active on social"],
      negative: ["Small company size", "Limited budget", "Junior role"]
    }
  }
];

function ContactScoreCard({ 
  contact, 
  onAction,
  onViewHistory 
}: { 
  contact: ContactScore;
  onAction: (contact: ContactScore, action: 'view' | 'recalculate' | 'adjust' | 'campaign') => void;
  onViewHistory: (contact: ContactScore) => void;
}) {

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAction = (action: 'view' | 'recalculate' | 'adjust' | 'campaign') => {
    setDropdownOpen(false); // Close dropdown first
    setTimeout(() => {
      onAction(contact, action);
    }, 100); // Small delay to ensure dropdown closes properly
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.company}</p>
              <p className="text-sm text-gray-500">{contact.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`text-2xl font-bold ${getScoreColor(contact.overallScore)}`}>
              {Math.round(contact.overallScore)}
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
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('recalculate')}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recalculate Score
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('adjust')}>
                  <Edit className="mr-2 h-4 w-4" />
                  Adjust Factors
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction('campaign')}>
                  <Target className="mr-2 h-4 w-4" />
                  Create Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Demographic</span>
            <span className={`font-medium ${getScoreColor(contact.demographicScore)}`}>
              {Math.round(contact.demographicScore)}%
            </span>
          </div>
          <Progress value={contact.demographicScore} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Behavioral</span>
            <span className={`font-medium ${getScoreColor(contact.behavioralScore)}`}>
              {Math.round(contact.behavioralScore)}%
            </span>
          </div>
          <Progress value={contact.behavioralScore} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Engagement</span>
            <span className={`font-medium ${getScoreColor(contact.engagementScore)}`}>
              {Math.round(contact.engagementScore)}%
            </span>
          </div>
          <Progress value={contact.engagementScore} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Intent</span>
            <span className={`font-medium ${getScoreColor(contact.intentScore)}`}>
              {Math.round(contact.intentScore)}%
            </span>
          </div>
          <Progress value={contact.intentScore} className="h-2" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Potential Value</p>
            <p className="text-lg font-semibold text-green-600">₹{(contact.potentialValue / 100000).toFixed(1)}L</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Conversion Probability</p>
            <p className="text-lg font-semibold text-blue-600">{contact.conversionProbability}%</p>
          </div>
        </div>

        {/* Positive Factors */}
        <div className="mb-3">
          <p className="text-xs font-medium text-green-600 mb-2">POSITIVE FACTORS</p>
          <div className="flex flex-wrap gap-1">
            {contact.factors.positive.slice(0, 2).map((factor) => (
              <Badge key={factor} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                {factor}
              </Badge>
            ))}
            {contact.factors.positive.length > 2 && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                +{contact.factors.positive.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        {/* Negative Factors */}
        {contact.factors.negative.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-red-600 mb-2">RISK FACTORS</p>
            <div className="flex flex-wrap gap-1">
              {contact.factors.negative.slice(0, 2).map((factor) => (
                <Badge key={factor} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  {factor}
                </Badge>
              ))}
              {contact.factors.negative.length > 2 && (
                <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  +{contact.factors.negative.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {contact.lastUpdated.toLocaleDateString()}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={() => onViewHistory(contact)}
          >
            <History className="h-3 w-3 mr-1" />
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactScoring() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(sampleContactScores);
  const [contacts, setContacts] = useState(sampleContactScores);
  const [selectedScoreRange, setSelectedScoreRange] = useState<string>("all");
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactScore | null>(null);
  const [actionModalType, setActionModalType] = useState<'view' | 'recalculate' | 'adjust' | 'campaign' | null>(null);

  const handleContactAction = (contact: ContactScore, action: 'view' | 'recalculate' | 'adjust' | 'campaign') => {
    setSelectedContact(contact);
    setActionModalType(action);
  };

  const handleViewHistory = (contact: ContactScore) => {
    setSelectedContact(contact);
    setIsHistoryModalOpen(true);
  };

  const handleUpdateContact = (updatedContact: ContactScore) => {
    const updatedContacts = contacts.map(c => 
      c.id === updatedContact.id ? updatedContact : c
    );
    setContacts(updatedContacts);
    filterContacts(updatedContacts, searchTerm, selectedScoreRange);
  };

  const filterContacts = (contactsList: ContactScore[], search: string, scoreRange: string) => {
    let filtered = contactsList;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.company.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by score range
    if (scoreRange !== "all") {
      switch (scoreRange) {
        case "0-30":
          filtered = filtered.filter(contact => contact.overallScore >= 0 && contact.overallScore < 30);
          break;
        case "30-60":
          filtered = filtered.filter(contact => contact.overallScore >= 30 && contact.overallScore < 60);
          break;
        case "60-80":
          filtered = filtered.filter(contact => contact.overallScore >= 60 && contact.overallScore < 80);
          break;
        case "80-100":
          filtered = filtered.filter(contact => contact.overallScore >= 80 && contact.overallScore <= 100);
          break;
      }
    }

    setFilteredContacts(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterContacts(contacts, value, selectedScoreRange);
  };

  const handleScoreRangeChange = (range: string) => {
    setSelectedScoreRange(range);
    filterContacts(contacts, searchTerm, range);
  };

  const closeActionModal = () => {
    setSelectedContact(null);
    setActionModalType(null);
  };

  const avgScore = contacts.reduce((sum, contact) => sum + contact.overallScore, 0) / contacts.length;
  const totalPotentialValue = contacts.reduce((sum, contact) => sum + contact.potentialValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Scoring</h1>
          <p className="text-gray-600 mt-1">AI-powered lead scoring and contact prioritization</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsAnalyticsModalOpen(true)}>
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Scored</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Score (80+)</p>
                <p className="text-2xl font-bold text-green-600">{contacts.filter(c => c.overallScore >= 80).length}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(avgScore)}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-orange-600">₹{(totalPotentialValue / 100000).toFixed(1)}L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 self-center">Filter by Score:</span>
              <Button 
                variant={selectedScoreRange === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => handleScoreRangeChange("all")}
              >
                All Scores
              </Button>
              <Button 
                variant={selectedScoreRange === "0-30" ? "default" : "outline"}
                size="sm"
                onClick={() => handleScoreRangeChange("0-30")}
              >
                0-30
              </Button>
              <Button 
                variant={selectedScoreRange === "30-60" ? "default" : "outline"}
                size="sm"
                onClick={() => handleScoreRangeChange("30-60")}
              >
                30-60
              </Button>
              <Button 
                variant={selectedScoreRange === "60-80" ? "default" : "outline"}
                size="sm"
                onClick={() => handleScoreRangeChange("60-80")}
              >
                60-80
              </Button>
              <Button 
                variant={selectedScoreRange === "80-100" ? "default" : "outline"}
                size="sm"
                onClick={() => handleScoreRangeChange("80-100")}
              >
                80-100
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Scores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <ContactScoreCard 
            key={contact.id} 
            contact={contact}
            onAction={handleContactAction}
            onViewHistory={handleViewHistory}
          />
        ))}
      </div>

      {/* View Analytics Modal */}
      <ViewAnalyticsModal
        isOpen={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        contacts={contacts}
      />

      {/* Contact Action Modals */}
      <ContactScoringActionModals
        contact={selectedContact}
        modalType={actionModalType}
        onClose={closeActionModal}
        onUpdate={handleUpdateContact}
      />

      {/* View History Modal */}
      <ViewHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        contact={selectedContact}
      />
    </div>
  );
}