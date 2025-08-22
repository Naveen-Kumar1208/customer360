"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  History,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Download,
  RefreshCw,
  Star,
  User,
  Building2
} from "lucide-react";

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
  tier: "A" | "B" | "C" | "D";
  lastUpdated: Date;
  potentialValue: number;
  conversionProbability: number;
  factors: {
    positive: string[];
    negative: string[];
  };
}

interface ScoreHistoryEntry {
  id: string;
  date: Date;
  overallScore: number;
  demographicScore: number;
  behavioralScore: number;
  engagementScore: number;
  intentScore: number;
  tier: "A" | "B" | "C" | "D";
  changeReason: string;
  changedBy: string;
  scoreChange: number;
}

interface ViewHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactScore | null;
}

export function ViewHistoryModal({ isOpen, onClose, contact }: ViewHistoryModalProps) {
  const [timeRange, setTimeRange] = useState("30d");
  const [filterType, setFilterType] = useState("all");

  // Sample history data - in a real app this would come from an API
  const sampleHistory: ScoreHistoryEntry[] = [
    {
      id: "1",
      date: new Date("2024-01-15"),
      overallScore: 92,
      demographicScore: 95,
      behavioralScore: 88,
      engagementScore: 94,
      intentScore: 90,
      tier: "A",
      changeReason: "Increased engagement with product demos",
      changedBy: "System Auto-Update",
      scoreChange: 3
    },
    {
      id: "2",
      date: new Date("2024-01-10"),
      overallScore: 89,
      demographicScore: 95,
      behavioralScore: 85,
      engagementScore: 90,
      intentScore: 87,
      tier: "A",
      changeReason: "Manual adjustment by sales team",
      changedBy: "John Smith",
      scoreChange: -2
    },
    {
      id: "3",
      date: new Date("2024-01-05"),
      overallScore: 91,
      demographicScore: 95,
      behavioralScore: 88,
      engagementScore: 92,
      intentScore: 89,
      tier: "A",
      changeReason: "New company funding increased potential value",
      changedBy: "System Auto-Update",
      scoreChange: 5
    },
    {
      id: "4",
      date: new Date("2024-01-01"),
      overallScore: 86,
      demographicScore: 92,
      behavioralScore: 82,
      engagementScore: 88,
      intentScore: 85,
      tier: "B",
      changeReason: "Initial scoring calculation",
      changedBy: "System",
      scoreChange: 0
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getScoreChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Scoring History - {contact.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Summary */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                {contact.company}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getTierColor(contact.tier)}>
                Tier {contact.tier}
              </Badge>
              <span className={`text-lg font-bold ${getScoreColor(contact.overallScore)}`}>
                {contact.overallScore}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-gray-500" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Changes</SelectItem>
                    <SelectItem value="increases">Score Increases</SelectItem>
                    <SelectItem value="decreases">Score Decreases</SelectItem>
                    <SelectItem value="tier-changes">Tier Changes</SelectItem>
                    <SelectItem value="manual">Manual Updates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* History Timeline */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Score History</h3>
            <div className="space-y-3">
              {sampleHistory.map((entry, index) => (
                <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    {index < sampleHistory.length - 1 && (
                      <div className="w-px h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {entry.date.toLocaleDateString()}
                        </span>
                        <Badge className={getTierColor(entry.tier)}>
                          Tier {entry.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getScoreChangeIcon(entry.scoreChange)}
                        <span className={`text-sm font-medium ${getScoreChangeColor(entry.scoreChange)}`}>
                          {entry.scoreChange > 0 ? '+' : ''}{entry.scoreChange}
                        </span>
                        <span className={`text-lg font-bold ${getScoreColor(entry.overallScore)}`}>
                          {entry.overallScore}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {entry.changeReason}
                    </p>

                    {/* Score breakdown */}
                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div className="text-center">
                        <div className="text-gray-500">Demographic</div>
                        <div className={`font-medium ${getScoreColor(entry.demographicScore)}`}>
                          {entry.demographicScore}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Behavioral</div>
                        <div className={`font-medium ${getScoreColor(entry.behavioralScore)}`}>
                          {entry.behavioralScore}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Engagement</div>
                        <div className={`font-medium ${getScoreColor(entry.engagementScore)}`}>
                          {entry.engagementScore}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-500">Intent</div>
                        <div className={`font-medium ${getScoreColor(entry.intentScore)}`}>
                          {entry.intentScore}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>Changed by {entry.changedBy}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{entry.date.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Changes</div>
              <div className="text-lg font-semibold">{sampleHistory.length}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Score Trend</div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-lg font-semibold">+6</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Days Tracked</div>
              <div className="text-lg font-semibold">15</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}