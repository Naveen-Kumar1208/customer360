"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  UserCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  Users,
  Target,
  Mail,
  Phone,
  MessageCircle,
  ShoppingCart,
  CreditCard,
  FileText,
  Star,
  ThumbsUp,
  ThumbsDown,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleCustomers } from "@/lib/data/customerData";
import { ExportJourneysModal } from "@/components/journey/ExportJourneysModal";
import { JourneyAnalyticsModal } from "@/components/journey/JourneyAnalyticsModal";
import { JourneyFullViewModal } from "@/components/journey/JourneyFullViewModal";
import { JourneyUpdateStageModal } from "@/components/journey/JourneyUpdateStageModal";
import { JourneyTakeActionModal } from "@/components/journey/JourneyTakeActionModal";
import { JourneyContactModal } from "@/components/journey/JourneyContactModal";

interface JourneyStage {
  id: string;
  name: string;
  status: "completed" | "in_progress" | "pending";
  date: Date;
  description: string;
  touchpoints: string[];
  value?: number;
  duration?: number;
}

interface CustomerJourney {
  id: string;
  customer: any;
  currentStage: string;
  journeyScore: number;
  totalValue: number;
  timeInJourney: number;
  stages: JourneyStage[];
  milestones: {
    id: string;
    name: string;
    date: Date;
    type: "positive" | "negative" | "neutral";
    description: string;
  }[];
  nextBestAction: {
    action: string;
    priority: "high" | "medium" | "low";
    expectedOutcome: string;
  };
}

// Sample journey data
const customerJourneys: CustomerJourney[] = sampleCustomers.map((customer, index) => {
  const stages: JourneyStage[] = [
    {
      id: "awareness",
      name: "Awareness",
      status: "completed",
      date: new Date(Date.now() - (120 + index * 10) * 24 * 60 * 60 * 1000),
      description: "First discovered our brand through marketing channels",
      touchpoints: ["Google Search", "Social Media Ad", "Website Visit"],
      duration: 7
    },
    {
      id: "consideration",
      name: "Consideration",
      status: "completed",
      date: new Date(Date.now() - (90 + index * 8) * 24 * 60 * 60 * 1000),
      description: "Evaluated our solutions against competitors",
      touchpoints: ["Product Demo", "Sales Call", "Email Nurturing"],
      duration: 21
    },
    {
      id: "purchase",
      name: "Purchase",
      status: "completed",
      date: new Date(Date.now() - (60 + index * 5) * 24 * 60 * 60 * 1000),
      description: "Made first purchase decision",
      touchpoints: ["Sales Meeting", "Contract Signing", "Payment"],
      value: customer.totalValue * 0.6,
      duration: 14
    },
    {
      id: "onboarding",
      name: "Onboarding",
      status: "completed",
      date: new Date(Date.now() - (45 + index * 3) * 24 * 60 * 60 * 1000),
      description: "Completed product setup and training",
      touchpoints: ["Welcome Email", "Setup Call", "Training Session"],
      duration: 10
    },
    {
      id: "adoption",
      name: "Adoption",
      status: index < 3 ? "in_progress" : "completed",
      date: new Date(Date.now() - (30 + index * 2) * 24 * 60 * 60 * 1000),
      description: "Regular usage and feature exploration",
      touchpoints: ["Support Tickets", "Feature Usage", "Check-in Calls"],
      duration: 30
    },
    {
      id: "expansion",
      name: "Expansion",
      status: index < 2 ? "in_progress" : index < 4 ? "pending" : "completed",
      date: new Date(Date.now() - (10 + index) * 24 * 60 * 60 * 1000),
      description: "Upgrading or purchasing additional products",
      touchpoints: ["Upsell Meeting", "Product Consultation"],
      value: customer.totalValue * 0.4
    },
    {
      id: "advocacy",
      name: "Advocacy",
      status: index === 0 ? "completed" : index < 3 ? "pending" : "pending",
      date: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
      description: "Referring others and providing testimonials",
      touchpoints: ["Case Study", "Referral Program", "Reviews"]
    }
  ];

  return {
    id: customer.id,
    customer,
    currentStage: stages.find(s => s.status === "in_progress")?.id || "expansion",
    journeyScore: 65 + Math.random() * 35,
    totalValue: customer.totalValue,
    timeInJourney: 120 + index * 10,
    stages,
    milestones: [
      {
        id: "milestone1",
        name: "First Purchase",
        date: new Date(Date.now() - (60 + index * 5) * 24 * 60 * 60 * 1000),
        type: "positive",
        description: "Successfully completed first transaction"
      },
      {
        id: "milestone2",
        name: "Feature Adoption",
        date: new Date(Date.now() - (30 + index * 3) * 24 * 60 * 60 * 1000),
        type: "positive",
        description: "Started using advanced features regularly"
      },
      {
        id: "milestone3",
        name: "Support Escalation",
        date: new Date(Date.now() - (15 + index) * 24 * 60 * 60 * 1000),
        type: "negative",
        description: "Required technical support for integration issues"
      }
    ],
    nextBestAction: {
      action: index < 2 ? "Schedule expansion meeting" : index < 4 ? "Send satisfaction survey" : "Request testimonial",
      priority: index < 2 ? "high" : "medium",
      expectedOutcome: index < 2 ? "25% increase in account value" : index < 4 ? "Improved satisfaction score" : "New referral opportunities"
    }
  };
});

function JourneyTimelineCard({ journey, onOpenModal }: { journey: CustomerJourney; onOpenModal: (type: string, journey: CustomerJourney) => void }) {
  const { customer, stages, milestones } = journey;

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const currentStageIndex = stages.findIndex(s => s.status === "in_progress");
  const progressPercentage = ((currentStageIndex + 1) / stages.length) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{customer.fullName}</h3>
              <p className="text-sm text-gray-600">{customer.company?.name}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {journey.timeInJourney} days in journey
                </Badge>
                <Badge className="text-xs bg-blue-100 text-blue-800">
                  {journey.currentStage}
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
              <DropdownMenuItem onClick={() => onOpenModal('fullView', journey)}>
                <Eye className="mr-2 h-4 w-4" />
                View Full Journey
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('updateStage', journey)}>
                <Edit className="mr-2 h-4 w-4" />
                Update Stage
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal('export', journey)}>
                <Download className="mr-2 h-4 w-4" />
                Export Journey
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Journey Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Journey Progress</span>
            <span className="text-sm font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Journey Stages Timeline */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Journey Stages</h4>
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStageIcon(stage.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-900">{stage.name}</h5>
                    <span className="text-xs text-gray-500">
                      {stage.date.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{stage.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {stage.touchpoints.slice(0, 2).map((touchpoint) => (
                      <Badge key={touchpoint} variant="outline" className="text-xs">
                        {touchpoint}
                      </Badge>
                    ))}
                    {stage.touchpoints.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{stage.touchpoints.length - 2} more
                      </Badge>
                    )}
                  </div>
                  {stage.value && (
                    <p className="text-xs font-semibold text-green-600 mt-1">
                      Value: {formatCurrency(stage.value)}
                    </p>
                  )}
                </div>
                {index < stages.length - 1 && (
                  <div className="flex-shrink-0 ml-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Milestones */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Milestones</h4>
          <div className="space-y-2">
            {milestones.slice(0, 3).map((milestone) => (
              <div key={milestone.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                {getMilestoneIcon(milestone.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{milestone.name}</p>
                  <p className="text-xs text-gray-600">{milestone.description}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {milestone.date.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Journey Score</p>
            <p className="text-lg font-semibold text-blue-600">{Math.round(journey.journeyScore)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Total Value</p>
            <p className="text-lg font-semibold text-green-600">{formatCurrency(journey.totalValue)}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">Time in Journey</p>
            <p className="text-lg font-semibold text-purple-600">{journey.timeInJourney}d</p>
          </div>
        </div>

        {/* Next Best Action */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-blue-900">Next Best Action</h4>
            <Badge className={
              journey.nextBestAction.priority === 'high' ? 'bg-red-100 text-red-800' :
              journey.nextBestAction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }>
              {journey.nextBestAction.priority} priority
            </Badge>
          </div>
          <p className="text-sm font-medium text-blue-900 mb-1">{journey.nextBestAction.action}</p>
          <p className="text-xs text-blue-700">Expected: {journey.nextBestAction.expectedOutcome}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1" onClick={() => onOpenModal('takeAction', journey)}>
            <Target className="mr-1 h-3 w-3" />
            Take Action
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onOpenModal('fullView', journey)}>
            <Eye className="mr-1 h-3 w-3" />
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onOpenModal('contact', journey)}>
            <MessageCircle className="mr-1 h-3 w-3" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerJourney() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  
  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [modalState, setModalState] = useState<{
    type: 'fullView' | 'updateStage' | 'takeAction' | 'contact' | 'export' | null;
    journey: CustomerJourney | null;
  }>({ type: null, journey: null });

  const handleOpenModal = (type: string, journey?: CustomerJourney) => {
    if (type === 'exportJourneys') {
      setShowExportModal(true);
    } else if (type === 'analytics') {
      setShowAnalyticsModal(true);
    } else if (journey) {
      setModalState({ type: type as 'fullView' | 'updateStage' | 'takeAction' | 'contact' | 'export', journey });
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, journey: null });
  };

  const filteredJourneys = customerJourneys.filter(journey => {
    const matchesSearch = searchTerm === "" || 
      journey.customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journey.customer.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = selectedStage === "all" || journey.currentStage === selectedStage;
    const matchesPriority = selectedPriority === "all" || journey.nextBestAction.priority === selectedPriority;

    return matchesSearch && matchesStage && matchesPriority;
  });

  const avgJourneyScore = customerJourneys.reduce((sum, j) => sum + j.journeyScore, 0) / customerJourneys.length;
  const avgTimeInJourney = customerJourneys.reduce((sum, j) => sum + j.timeInJourney, 0) / customerJourneys.length;
  const highPriorityActions = customerJourneys.filter(j => j.nextBestAction.priority === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Journey</h1>
          <p className="text-gray-600 mt-1">Track and optimize customer journeys throughout their lifecycle</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleOpenModal('exportJourneys')}>
            <Download className="mr-2 h-4 w-4" />
            Export Journeys
          </Button>
          <Button onClick={() => handleOpenModal('analytics')}>
            <Activity className="mr-2 h-4 w-4" />
            Journey Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Journeys</p>
                <p className="text-2xl font-bold">{customerJourneys.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Journey Score</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(avgJourneyScore)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Time in Journey</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(avgTimeInJourney)}d</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority Actions</p>
                <p className="text-2xl font-bold text-orange-600">{highPriorityActions}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customer journeys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant={selectedStage === "all" ? "default" : "outline"}
                onClick={() => setSelectedStage("all")}
                size="sm"
              >
                All Stages
              </Button>
              <Button 
                variant={selectedStage === "adoption" ? "default" : "outline"}
                onClick={() => setSelectedStage("adoption")}
                size="sm"
              >
                Adoption
              </Button>
              <Button 
                variant={selectedStage === "expansion" ? "default" : "outline"}
                onClick={() => setSelectedStage("expansion")}
                size="sm"
              >
                Expansion
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant={selectedPriority === "all" ? "default" : "outline"}
                onClick={() => setSelectedPriority("all")}
                size="sm"
              >
                All Priority
              </Button>
              <Button 
                variant={selectedPriority === "high" ? "default" : "outline"}
                onClick={() => setSelectedPriority("high")}
                size="sm"
              >
                High
              </Button>
              <Button 
                variant={selectedPriority === "medium" ? "default" : "outline"}
                onClick={() => setSelectedPriority("medium")}
                size="sm"
              >
                Medium
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredJourneys.length} of {customerJourneys.length} customer journeys
        </p>
      </div>

      {/* Customer Journeys Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredJourneys.map((journey) => (
          <JourneyTimelineCard key={journey.id} journey={journey} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {/* Modals */}
      <ExportJourneysModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
      
      <JourneyAnalyticsModal
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
      />
      
      {modalState.type === 'fullView' && modalState.journey && (
        <JourneyFullViewModal
          isOpen={true}
          onClose={handleCloseModal}
          journey={modalState.journey}
        />
      )}
      
      {modalState.type === 'updateStage' && modalState.journey && (
        <JourneyUpdateStageModal
          isOpen={true}
          onClose={handleCloseModal}
          journey={modalState.journey}
        />
      )}
      
      {modalState.type === 'takeAction' && modalState.journey && (
        <JourneyTakeActionModal
          isOpen={true}
          onClose={handleCloseModal}
          journey={modalState.journey}
        />
      )}
      
      {modalState.type === 'contact' && modalState.journey && (
        <JourneyContactModal
          isOpen={true}
          onClose={handleCloseModal}
          journey={modalState.journey}
        />
      )}
    </div>
  );
}