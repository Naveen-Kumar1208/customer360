"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Download,
  Plus,
  Star,
  StarOff
} from 'lucide-react';
import type { CompanyData } from '@/types/lusha';

interface CompanyProfileCardProps {
  company: CompanyData;
  onAddToCRM?: (company: CompanyData) => void;
  onExport?: (company: CompanyData) => void;
  onViewDetails?: (company: CompanyData) => void;
  className?: string;
  compact?: boolean;
}

export function CompanyProfileCard({ 
  company, 
  onAddToCRM, 
  onExport, 
  onViewDetails, 
  className,
  compact = false 
}: CompanyProfileCardProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getGrowthIcon = (growth?: number) => {
    if (!growth || growth === 0) return <Minus className="h-4 w-4 text-gray-500" />;
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getGrowthColor = (growth?: number) => {
    if (!growth || growth === 0) return 'text-gray-600';
    if (growth > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diff = now.getTime() - updated.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  const handleStarToggle = () => {
    setIsStarred(!isStarred);
  };

  const CompactView = () => (
    <Card className={`hover:shadow-md transition-all duration-200 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-8 h-8 rounded" />
              ) : (
                <Building2 className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{company.name}</p>
              <p className="text-xs text-gray-500 truncate">{company.industry}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                <span>{company.size} employees</span>
                <span>{company.location.city}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getConfidenceColor(company.confidence)}>
              {company.confidence}%
            </Badge>
            <Dialog open={showFullDetails} onOpenChange={setShowFullDetails}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Company Profile</DialogTitle>
                </DialogHeader>
                <FullCompanyDetails company={company} />
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-12 h-12 rounded-lg" />
                ) : (
                  <Building2 className="h-8 w-8 text-blue-600" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
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
                <p className="text-gray-600 font-medium">{company.industry}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`https://${company.domain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {company.domain}
                  </a>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {company.verified ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <Badge className={getConfidenceColor(company.confidence)}>
                {company.confidence}% confidence
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Employees</span>
              </div>
              <p className="text-lg font-bold text-blue-900">{company.employees.toLocaleString()}</p>
              {company.employeeGrowth && (
                <div className={`flex items-center justify-center space-x-1 text-xs ${getGrowthColor(company.employeeGrowth)}`}>
                  {getGrowthIcon(company.employeeGrowth)}
                  <span>{company.employeeGrowth > 0 ? '+' : ''}{company.employeeGrowth}%</span>
                </div>
              )}
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <p className="text-lg font-bold text-green-900">{company.revenue}</p>
              <p className="text-xs text-green-600">{company.type || 'Private'}</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Founded</span>
              </div>
              <p className="text-lg font-bold text-purple-900">{company.founded}</p>
              <p className="text-xs text-purple-600">{new Date().getFullYear() - company.founded} years</p>
            </div>
            
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-orange-600 mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-sm font-bold text-orange-900">{company.location.city}</p>
              <p className="text-xs text-orange-600">{company.location.country}</p>
            </div>
          </div>

          {/* Description */}
          {company.description && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">About</h4>
              <p className="text-sm text-gray-700">{company.description}</p>
            </div>
          )}

          {/* Technologies */}
          {company.technologies.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {company.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
              <div className="space-y-2">
                {company.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{company.email}</span>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{company.phone}</span>
                  </div>
                )}
                {company.location.address && (
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span>{company.location.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Social Profiles</h4>
              <div className="space-y-2">
                {company.socialProfiles.linkedin && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Linkedin className="h-4 w-4 text-gray-400" />
                    <a 
                      href={company.socialProfiles.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      LinkedIn
                    </a>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                )}
                {company.socialProfiles.twitter && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Twitter className="h-4 w-4 text-gray-400" />
                    <a 
                      href={company.socialProfiles.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      Twitter
                    </a>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      Website
                    </a>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <div className="flex items-center space-x-4">
              <span>Updated {formatTimeAgo(company.lastUpdated)}</span>
              <span>Business Model: {company.businessModel || 'Not specified'}</span>
            </div>
            <span>ID: {company.id}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Button
              onClick={() => onAddToCRM?.(company)}
              className="flex-1 min-w-[120px]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to CRM
            </Button>
            
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
            
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Find People
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.(company)}
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

const FullCompanyDetails = ({ company }: { company: CompanyData }) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {company.logo ? (
          <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg" />
        ) : (
          <Building2 className="h-10 w-10 text-blue-600" />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
        <p className="text-gray-600 font-medium text-lg">{company.industry}</p>
        <div className="flex items-center space-x-2 mt-2">
          <Globe className="h-4 w-4 text-gray-400" />
          <a 
            href={`https://${company.domain}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company.domain}
          </a>
          <ExternalLink className="h-3 w-3 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2 mt-2">
          {company.verified ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          <Badge className={
            company.confidence >= 90 ? 'bg-green-100 text-green-800' : 
            company.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }>
            {company.confidence}% Confidence
          </Badge>
        </div>
      </div>
    </div>

    {/* Comprehensive Company Information */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Company Metrics */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Company Metrics</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800 font-medium">Employees</p>
                <p className="text-xl font-bold text-blue-900">{company.employees.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            {company.employeeGrowth && (
              <div className={`flex items-center space-x-1 text-sm mt-1 ${getGrowthColor(company.employeeGrowth)}`}>
                {getGrowthIcon(company.employeeGrowth)}
                <span>{company.employeeGrowth > 0 ? '+' : ''}{company.employeeGrowth}% growth</span>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800 font-medium">Revenue</p>
                <p className="text-lg font-bold text-green-900">{company.revenue}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-1">{company.type} Company</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-800 font-medium">Founded</p>
                <p className="text-lg font-bold text-purple-900">{company.founded}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-600 mt-1">{new Date().getFullYear() - company.founded} years in business</p>
          </div>
        </div>
      </div>
      
      {/* Contact & Location */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Contact & Location</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Location</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span>{company.location.city}, {company.location.country}</span>
              </div>
              {company.location.address && (
                <p className="text-gray-600 ml-5">{company.location.address}</p>
              )}
            </div>
          </div>
          
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
            <div className="space-y-1 text-sm">
              {company.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span>{company.email}</span>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span>{company.phone}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="h-3 w-3 text-gray-400" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Technology & Social */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Technology & Social</h3>
        <div className="space-y-3">
          {company.technologies.length > 0 && (
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Technology Stack</h4>
              <div className="flex flex-wrap gap-1">
                {company.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Social Profiles</h4>
            <div className="space-y-1 text-sm">
              {company.socialProfiles.linkedin && (
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-3 w-3 text-gray-400" />
                  <a href={company.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
              {company.socialProfiles.twitter && (
                <div className="flex items-center space-x-2">
                  <Twitter className="h-3 w-3 text-gray-400" />
                  <a href={company.socialProfiles.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Twitter
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Description */}
    {company.description && (
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">About {company.name}</h3>
        <p className="text-gray-700">{company.description}</p>
      </div>
    )}

    {/* Metadata */}
    <div className="pt-4 border-t space-y-2">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Last Updated:</span>
          <span className="ml-2">{new Date(company.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div>
          <span className="text-gray-500">Business Model:</span>
          <span className="ml-2">{company.businessModel || 'Not specified'}</span>
        </div>
        <div>
          <span className="text-gray-500">Verification Status:</span>
          <span className="ml-2">{company.verified ? 'Verified' : 'Unverified'}</span>
        </div>
        <div>
          <span className="text-gray-500">Record ID:</span>
          <span className="ml-2 font-mono text-xs">{company.id}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CompanyProfileCard;