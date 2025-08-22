"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  User,
  Building2,
  MapPin,
  Phone,
  Mail,
  Eye,
  BarChart3,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import type { ProspectData, LeadScore } from '@/types/lusha';

interface LeadScoringCardProps {
  prospect: ProspectData;
  leadScore: LeadScore;
  onContact?: (prospect: ProspectData) => void;
  onViewDetails?: (prospect: ProspectData) => void;
  className?: string;
  detailed?: boolean;
}

export function LeadScoringCard({ 
  prospect, 
  leadScore, 
  onContact, 
  onViewDetails, 
  className,
  detailed = false 
}: LeadScoringCardProps) {
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'high':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <TrendingUp className="h-4 w-4" />,
          label: 'High Priority',
          description: 'Excellent fit - pursue immediately'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Minus className="h-4 w-4" />,
          label: 'Medium Priority',
          description: 'Good potential - worth pursuing'
        };
      case 'low':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <TrendingDown className="h-4 w-4" />,
          label: 'Low Priority',
          description: 'Limited fit - consider alternatives'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <Minus className="h-4 w-4" />,
          label: 'Unscored',
          description: 'No score available'
        };
    }
  };

  const getFactorIcon = (factor: string) => {
    switch (factor.toLowerCase()) {
      case 'titlerelevance':
        return <User className="h-4 w-4" />;
      case 'companysize':
        return <Building2 className="h-4 w-4" />;
      case 'industry':
        return <BarChart3 className="h-4 w-4" />;
      case 'seniority':
        return <Star className="h-4 w-4" />;
      case 'contactability':
        return <Phone className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getFactorLabel = (factor: string) => {
    switch (factor.toLowerCase()) {
      case 'titlerelevance':
        return 'Title Relevance';
      case 'companysize':
        return 'Company Size';
      case 'industry':
        return 'Industry Match';
      case 'seniority':
        return 'Seniority Level';
      case 'contactability':
        return 'Contactability';
      default:
        return factor;
    }
  };

  const recommendationConfig = getRecommendationConfig(leadScore.recommendation);

  if (!detailed) {
    return (
      <Card className={`hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">
                  {prospect.person.firstName.charAt(0)}{prospect.person.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {prospect.person.firstName} {prospect.person.lastName}
                </p>
                <p className="text-xs text-gray-500">{prospect.person.title}</p>
              </div>
            </div>
            
            <Badge className={`${getScoreColor(leadScore.overall)} bg-opacity-10`}>
              {leadScore.overall}
            </Badge>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Lead Quality</span>
              <span className={getScoreColor(leadScore.overall)}>{leadScore.overall}/100</span>
            </div>
            <Progress value={leadScore.overall} className="h-2" />
          </div>

          <Badge className={`${recommendationConfig.color} mb-3 w-full justify-center`}>
            <div className="flex items-center space-x-1">
              {recommendationConfig.icon}
              <span>{recommendationConfig.label}</span>
            </div>
          </Badge>

          <div className="flex space-x-2">
            <Button size="sm" className="flex-1" onClick={() => onContact?.(prospect)}>
              Contact
            </Button>
            <Dialog open={showScoreBreakdown} onOpenChange={setShowScoreBreakdown}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Lead Score Breakdown</DialogTitle>
                </DialogHeader>
                <DetailedScoreView prospect={prospect} leadScore={leadScore} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Lead Quality Analysis
          </div>
          <Badge className={`${getScoreColor(leadScore.overall)} bg-opacity-10 text-lg px-3 py-1`}>
            {leadScore.overall}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prospect Overview */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-lg">
              {prospect.person.firstName.charAt(0)}{prospect.person.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {prospect.person.firstName} {prospect.person.lastName}
            </h3>
            <p className="text-gray-600">{prospect.person.title}</p>
            <p className="text-gray-500">{prospect.company.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-sm text-gray-500">
                {prospect.company.location.city}, {prospect.company.location.country}
              </span>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Overall Lead Quality</h4>
            <span className={`text-2xl font-bold ${getScoreColor(leadScore.overall)}`}>
              {leadScore.overall}/100
            </span>
          </div>
          <Progress value={leadScore.overall} className="h-3" />
          
          <Badge className={`${recommendationConfig.color} w-full justify-center py-2`}>
            <div className="flex items-center space-x-2">
              {recommendationConfig.icon}
              <span className="font-medium">{recommendationConfig.label}</span>
              <span className="text-xs">• {recommendationConfig.description}</span>
            </div>
          </Badge>
        </div>

        {/* Score Factors */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Score Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(leadScore.factors).map(([factor, score]) => (
              <div key={factor} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFactorIcon(factor)}
                    <span className="text-sm font-medium text-gray-700">
                      {getFactorLabel(factor)}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                    {score}/100
                  </span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* AI Reasoning */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            AI Analysis
          </h4>
          <div className="bg-blue-50 rounded-lg p-4">
            <ul className="space-y-2">
              {leadScore.reasoning.map((reason, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Matching Criteria */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Matching Criteria</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(prospect.criteria).map(([criterion, matches]) => (
              <div
                key={criterion}
                className={`p-3 rounded-lg border ${
                  matches 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {matches ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    matches ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {criterion.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </div>
                <span className={`text-xs ${
                  matches ? 'text-green-600' : 'text-red-600'
                }`}>
                  {matches ? 'Match' : 'No Match'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Recommended Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {leadScore.recommendation === 'high' && (
              <>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Priority Outreach</span>
                  </div>
                  <p className="text-xs text-green-700">Schedule a call within 24 hours</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Personalized Email</span>
                  </div>
                  <p className="text-xs text-blue-700">Send tailored message highlighting value prop</p>
                </div>
              </>
            )}
            {leadScore.recommendation === 'medium' && (
              <>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Email Sequence</span>
                  </div>
                  <p className="text-xs text-yellow-700">Add to nurturing campaign</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Info className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Research More</span>
                  </div>
                  <p className="text-xs text-purple-700">Gather additional qualifying information</p>
                </div>
              </>
            )}
            {leadScore.recommendation === 'low' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Low Priority</span>
                </div>
                <p className="text-xs text-red-700">Consider for long-term nurturing or skip</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4 border-t">
          <Button onClick={() => onContact?.(prospect)} className="flex-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            Start Conversation
          </Button>
          <Button variant="outline" onClick={() => onViewDetails?.(prospect)}>
            <Eye className="mr-2 h-4 w-4" />
            View Full Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailedScoreView({ prospect, leadScore }: { prospect: ProspectData; leadScore: LeadScore }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFactorIcon = (factor: string) => {
    switch (factor.toLowerCase()) {
      case 'titlerelevance':
        return <User className="h-4 w-4" />;
      case 'companysize':
        return <Building2 className="h-4 w-4" />;
      case 'industry':
        return <BarChart3 className="h-4 w-4" />;
      case 'seniority':
        return <Star className="h-4 w-4" />;
      case 'contactability':
        return <Phone className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className={`text-6xl font-bold ${getScoreColor(leadScore.overall)} mb-2`}>
          {leadScore.overall}
        </div>
        <p className="text-gray-600">Overall Lead Quality Score</p>
        <Badge className={`mt-2 ${
          leadScore.recommendation === 'high' ? 'bg-green-100 text-green-800' :
          leadScore.recommendation === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {leadScore.recommendation.toUpperCase()} PRIORITY
        </Badge>
      </div>

      {/* Score Factors */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Score Factors</h3>
        {Object.entries(leadScore.factors).map(([factor, score]) => (
          <div key={factor} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getFactorIcon(factor)}
                <span className="font-medium text-gray-700">
                  {factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <span className={`font-semibold ${getScoreColor(score)}`}>
                {score}/100
              </span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
        ))}
      </div>

      {/* AI Reasoning */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">AI Analysis</h3>
        <div className="bg-blue-50 rounded-lg p-4">
          <ul className="space-y-2">
            {leadScore.reasoning.map((reason, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeadScoringCard;