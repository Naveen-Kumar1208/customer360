"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Linkedin, 
  Globe, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Plus,
  ExternalLink,
  Calendar,
  MessageSquare,
  Star,
  StarOff
} from 'lucide-react';
import type { PersonData } from '@/types/lusha';

interface PersonResultCardProps {
  person: PersonData;
  onAddToCRM?: (person: PersonData) => void;
  onExport?: (person: PersonData) => void;
  onViewDetails?: (person: PersonData) => void;
  className?: string;
  compact?: boolean;
}

export function PersonResultCard({ 
  person, 
  onAddToCRM, 
  onExport, 
  onViewDetails, 
  className,
  compact = false 
}: PersonResultCardProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getSeniorityColor = (seniority?: string) => {
    if (!seniority) return 'bg-gray-100 text-gray-800';
    if (seniority.includes('C-Level')) return 'bg-purple-100 text-purple-800';
    if (seniority.includes('VP')) return 'bg-blue-100 text-blue-800';
    if (seniority.includes('Director')) return 'bg-green-100 text-green-800';
    if (seniority.includes('Manager')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
  };

  const CompactView = () => (
    <Card className={`hover:shadow-md transition-all duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {person.firstName.charAt(0)}{person.lastName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {person.firstName} {person.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{person.title}</p>
              <p className="text-xs text-gray-400 truncate">{person.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getConfidenceColor(person.confidence)}>
              {person.confidence}%
            </Badge>
            <Dialog open={showFullDetails} onOpenChange={setShowFullDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Contact Details</DialogTitle>
                </DialogHeader>
                <FullPersonDetails person={person} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FullView = () => (
    <Card className={`hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {person.firstName.charAt(0)}{person.lastName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {person.firstName} {person.lastName}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleStarToggle}
                    className="p-1"
                  >
                    {isStarred ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    ) : (
                      <StarOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-gray-600 font-medium">{person.title}</p>
                <p className="text-gray-500">{person.company}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {person.verified ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <Badge className={getConfidenceColor(person.confidence)}>
                {person.confidence}% confidence
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              
              {person.email.map((email, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{email}</span>
                  <Badge variant="outline" className="text-xs">
                    {index === 0 ? 'Work' : 'Personal'}
                  </Badge>
                </div>
              ))}
              
              {person.phone.map((phone, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span>{phone}</span>
                  <Badge variant="outline" className="text-xs">
                    {index === 0 ? 'Direct' : 'Mobile'}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Professional Details</h4>
              
              <div className="flex items-center space-x-2 text-sm">
                <Building2 className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{person.company}</span>
              </div>
              
              {person.department && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">Department:</span>
                  <span>{person.department}</span>
                </div>
              )}
              
              {person.seniority && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Seniority:</span>
                  <Badge className={getSeniorityColor(person.seniority)}>
                    {person.seniority}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center space-x-4">
              <span>Enriched {formatTimeAgo(person.enrichedAt)}</span>
              <span>Source: {person.source}</span>
            </div>
            <span>ID: {person.id}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              onClick={() => onAddToCRM?.(person)}
              className="flex-1 min-w-[120px]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to CRM
            </Button>
            
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Email
            </Button>
            
            <Button variant="outline" size="sm">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            
            {person.linkedinUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={person.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.(person)}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return compact ? <CompactView /> : <FullView />;
}

const FullPersonDetails = ({ person }: { person: PersonData }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
        {person.firstName.charAt(0)}{person.lastName.charAt(0)}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {person.firstName} {person.lastName}
        </h2>
        <p className="text-gray-600 font-medium text-lg">{person.title}</p>
        <p className="text-gray-500">{person.company}</p>
        <div className="flex items-center space-x-2 mt-2">
          {person.verified ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <Badge className={
            person.confidence >= 90 ? 'bg-green-100 text-green-800' : 
            person.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }>
            {person.confidence}% Confidence
          </Badge>
        </div>
      </div>
    </div>

    {/* Detailed Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Contact Information</h3>
        
        <div className="space-y-3">
          {person.email.map((email, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="flex-1">{email}</span>
              <Badge variant="outline" className="text-xs">
                {email.includes(person.company.toLowerCase().replace(/\s+/g, '')) ? 'Work' : 'Personal'}
              </Badge>
            </div>
          ))}
          
          {person.phone.map((phone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="flex-1">{phone}</span>
              <Badge variant="outline" className="text-xs">
                {index === 0 ? 'Primary' : 'Secondary'}
              </Badge>
            </div>
          ))}
          
          {person.linkedinUrl && (
            <div className="flex items-center space-x-3">
              <Linkedin className="h-4 w-4 text-gray-400" />
              <a 
                href={person.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-blue-600 hover:underline"
              >
                LinkedIn Profile
              </a>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Professional Details</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Building2 className="h-4 w-4 text-gray-400" />
            <div>
              <p className="font-medium">{person.company}</p>
              <p className="text-sm text-gray-500">Company</p>
            </div>
          </div>
          
          {person.department && (
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4" /> {/* Spacer */}
              <div>
                <p className="font-medium">{person.department}</p>
                <p className="text-sm text-gray-500">Department</p>
              </div>
            </div>
          )}
          
          {person.seniority && (
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4" /> {/* Spacer */}
              <div>
                <Badge className={
                  person.seniority.includes('C-Level') ? 'bg-purple-100 text-purple-800' :
                  person.seniority.includes('VP') ? 'bg-blue-100 text-blue-800' :
                  person.seniority.includes('Director') ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {person.seniority}
                </Badge>
                <p className="text-sm text-gray-500 mt-1">Seniority Level</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Metadata */}
    <div className="pt-4 border-t space-y-2">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Last Updated:</span>
          <span className="ml-2">{new Date(person.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="text-gray-500">Source:</span>
          <span className="ml-2 capitalize">{person.source}</span>
        </div>
        <div>
          <span className="text-gray-500">Verification Status:</span>
          <span className="ml-2">{person.verified ? 'Verified' : 'Unverified'}</span>
        </div>
        <div>
          <span className="text-gray-500">Record ID:</span>
          <span className="ml-2 font-mono text-xs">{person.id}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PersonResultCard;