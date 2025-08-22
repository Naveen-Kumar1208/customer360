"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  Star,
  TrendingUp,
  Users,
  Target,
  Award,
  Building2,
  User,
  Calendar,
  Activity,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Phone,
  Mail,
  Clock
} from "lucide-react";

interface LeadScore {
  id: string;
  name: string;
  company: string;
  funnel: "TOFU" | "MOFU" | "BOFU";
  overallScore: number;
  fitScore: number;
  intentScore: number;
  behaviorScore: number;
  tier: "A" | "B" | "C" | "D";
  trend: "up" | "down" | "stable";
  lastUpdated: Date;
  potentialValue: number;
  conversionProbability: number;
  keyFactors: string[];
}

interface LeadScoringActionModalsProps {
  lead: LeadScore | null;
  modalType: 'view' | 'schedule' | null;
  onClose: () => void;
  onUpdate?: (updatedLead: LeadScore) => void;
  onSchedule?: (lead: LeadScore, scheduleData: any) => void;
}

export function LeadScoringActionModals({
  lead,
  modalType,
  onClose,
  onUpdate,
  onSchedule
}: LeadScoringActionModalsProps) {
  const [scheduleData, setScheduleData] = useState({
    meetingType: 'discovery',
    duration: '60',
    scheduledTime: '',
    attendees: '',
    agenda: '',
    location: 'virtual',
    notes: ''
  });

  // Store the active element when modal opens for focus restoration
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (modalType && lead) {
      // Store the currently focused element
      activeElementRef.current = document.activeElement as HTMLElement;
    }
  }, [modalType, lead]);

  const handleClose = () => {
    onClose();
    // Restore focus to the previously active element after a brief delay
    setTimeout(() => {
      if (activeElementRef.current) {
        activeElementRef.current.focus();
      } else {
        // Fallback: focus the body to ensure cursor works
        document.body.focus();
      }
    }, 100);
  };

  useEffect(() => {
    if (lead && modalType === 'schedule') {
      setScheduleData({
        meetingType: 'discovery',
        duration: '60',
        scheduledTime: '',
        attendees: `${lead.name}`,
        agenda: `Lead scoring follow-up meeting for ${lead.company}. Current score: ${lead.overallScore}. Tier: ${lead.tier}.`,
        location: 'virtual',
        notes: ''
      });
    }
  }, [lead, modalType]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'A': return 'bg-green-100 text-green-800 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'D': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFunnelColor = (funnel: string) => {
    switch (funnel) {
      case 'TOFU': return 'bg-blue-100 text-blue-800';
      case 'MOFU': return 'bg-purple-100 text-purple-800';
      case 'BOFU': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleScheduleSubmit = () => {
    if (lead && onSchedule) {
      onSchedule(lead, scheduleData);
    }
    handleClose();
  };

  if (!lead) return null;

  // View Lead Details Modal
  if (modalType === 'view') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Lead Scoring Details - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header with Lead Info */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-gray-600">{lead.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getFunnelColor(lead.funnel)}>
                    {lead.funnel}
                  </Badge>
                  <Badge className={`border ${getTierColor(lead.tier)}`}>
                    Tier {lead.tier}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getScoreColor(lead.overallScore)}`}>
                  {lead.overallScore}
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {getTrendIcon(lead.trend)}
                  <span className="text-sm text-gray-600">Overall Score</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Updated: {lead.lastUpdated.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Score Breakdown
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Company Fit Score</span>
                      <span className={`font-medium ${getScoreColor(lead.fitScore)}`}>
                        {lead.fitScore}%
                      </span>
                    </div>
                    <Progress value={lead.fitScore} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Intent Score</span>
                      <span className={`font-medium ${getScoreColor(lead.intentScore)}`}>
                        {lead.intentScore}%
                      </span>
                    </div>
                    <Progress value={lead.intentScore} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Behavior Score</span>
                      <span className={`font-medium ${getScoreColor(lead.behaviorScore)}`}>
                        {lead.behaviorScore}%
                      </span>
                    </div>
                    <Progress value={lead.behaviorScore} className="h-3" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Lead Metrics
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Value:</span>
                    <span className="font-medium text-green-600">₹{(lead.potentialValue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Probability:</span>
                    <span className="font-medium text-blue-600">{lead.conversionProbability}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funnel Stage:</span>
                    <Badge className={getFunnelColor(lead.funnel)} size="sm">
                      {lead.funnel}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority Tier:</span>
                    <Badge className={`border ${getTierColor(lead.tier)}`} size="sm">
                      Tier {lead.tier}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score Trend:</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(lead.trend)}
                      <span className="capitalize">{lead.trend}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Key Scoring Factors
                </h3>
                
                <div className="space-y-2">
                  {lead.keyFactors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scoring History & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Recent Score History
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Jan 16, 2024</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lead.overallScore}</span>
                        <ArrowUp className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Jan 10, 2024</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lead.overallScore - 5}</span>
                        <ArrowUp className="h-3 w-3 text-green-600" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Jan 5, 2024</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{lead.overallScore - 12}</span>
                        <Activity className="h-3 w-3 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Recommendations
                </h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <ul className="text-sm space-y-2 text-blue-800">
                    {lead.tier === 'A' && (
                      <>
                        <li>• Schedule immediate follow-up call</li>
                        <li>• Prepare personalized proposal</li>
                        <li>• Involve senior sales team member</li>
                      </>
                    )}
                    {lead.tier === 'B' && (
                      <>
                        <li>• Send targeted product demo</li>
                        <li>• Schedule discovery meeting</li>
                        <li>• Share relevant case studies</li>
                      </>
                    )}
                    {lead.tier === 'C' && (
                      <>
                        <li>• Add to nurturing campaign</li>
                        <li>• Send educational content</li>
                        <li>• Monitor engagement closely</li>
                      </>
                    )}
                    {lead.tier === 'D' && (
                      <>
                        <li>• Move to low-priority nurturing</li>
                        <li>• Quarterly check-in schedule</li>
                        <li>• Focus resources on higher tiers</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>Close</Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Adjust Score
              </Button>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Schedule Meeting Modal
  if (modalType === 'schedule') {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Follow-up - {lead.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Lead Info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded border">
              <User className="h-4 w-4" />
              <span>{lead.name} • {lead.company}</span>
              <Badge className={getFunnelColor(lead.funnel)}>
                {lead.funnel}
              </Badge>
              <Badge className={`border ${getTierColor(lead.tier)}`}>
                Tier {lead.tier}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <Star className="h-3 w-3 text-yellow-400" />
                <span className="font-medium">{lead.overallScore}</span>
              </div>
            </div>

            {/* Meeting Type */}
            <div>
              <Label>Meeting Type</Label>
              <Select 
                value={scheduleData.meetingType} 
                onValueChange={(value) => setScheduleData({...scheduleData, meetingType: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Discovery Call</SelectItem>
                  <SelectItem value="qualification">Lead Qualification</SelectItem>
                  <SelectItem value="demo">Product Demo</SelectItem>
                  <SelectItem value="follow-up">Score Review Follow-up</SelectItem>
                  <SelectItem value="nurturing">Nurturing Check-in</SelectItem>
                  <SelectItem value="proposal">Proposal Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schedule Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meeting-time">Meeting Time</Label>
                <Input
                  id="meeting-time"
                  type="datetime-local"
                  value={scheduleData.scheduledTime}
                  onChange={(e) => setScheduleData({...scheduleData, scheduledTime: e.target.value})}
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Select 
                  value={scheduleData.duration} 
                  onValueChange={(value) => setScheduleData({...scheduleData, duration: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>Meeting Location</Label>
              <Select 
                value={scheduleData.location} 
                onValueChange={(value) => setScheduleData({...scheduleData, location: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="virtual">Virtual Meeting (Zoom/Teams)</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="client-office">Client Office</SelectItem>
                  <SelectItem value="our-office">Our Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Attendees */}
            <div>
              <Label htmlFor="attendees">Expected Attendees</Label>
              <Input
                id="attendees"
                value={scheduleData.attendees}
                onChange={(e) => setScheduleData({...scheduleData, attendees: e.target.value})}
                placeholder="Names and roles of meeting attendees..."
              />
            </div>

            {/* Agenda */}
            <div>
              <Label htmlFor="agenda">Meeting Agenda</Label>
              <Textarea
                id="agenda"
                value={scheduleData.agenda}
                onChange={(e) => setScheduleData({...scheduleData, agenda: e.target.value})}
                placeholder="Key topics to cover, objectives, expected outcomes..."
                rows={3}
              />
            </div>

            {/* Lead Context */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <Target className="h-4 w-4" />
                <span className="font-medium">Lead Context</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Current Score: {lead.overallScore} (Tier {lead.tier})</div>
                <div>• Funnel Stage: {lead.funnel}</div>
                <div>• Potential Value: ₹{(lead.potentialValue / 100000).toFixed(1)}L</div>
                <div>• Conversion Probability: {lead.conversionProbability}%</div>
                <div>• Key Factors: {lead.keyFactors.slice(0, 2).join(', ')}</div>
              </div>
            </div>

            {/* Meeting Notes */}
            <div>
              <Label htmlFor="meeting-notes">Additional Notes</Label>
              <Textarea
                id="meeting-notes"
                value={scheduleData.notes}
                onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                placeholder="Special preparation notes, lead preferences, etc..."
                rows={2}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleScheduleSubmit} disabled={!scheduleData.scheduledTime}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}