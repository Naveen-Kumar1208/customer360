"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star,
  StarOff,
  Mail,
  Phone,
  Building2,
  MapPin,
  Linkedin,
  Globe,
  CheckCircle,
  XCircle,
  Users,
  MoreHorizontal
} from 'lucide-react';
import type { ProspectData, LeadScore } from '@/types/lusha';
import { mockProspectData, mockLeadScores } from '@/lib/data/lusha-mock';

interface ProspectResultsGridProps {
  prospects?: ProspectData[];
  onExport?: (selectedProspects: ProspectData[]) => void;
  onViewDetails?: (prospect: ProspectData) => void;
  className?: string;
}

type SortField = 'name' | 'company' | 'title' | 'score' | 'location' | 'enrichmentDate';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  search: string;
  industry: string;
  location: string;
  scoreRange: string;
  status: string;
}

export function ProspectResultsGrid({ 
  prospects = mockProspectData, 
  onExport, 
  onViewDetails, 
  className 
}: ProspectResultsGridProps) {
  const [selectedProspects, setSelectedProspects] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [starredProspects, setStarredProspects] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industry: '',
    location: '',
    scoreRange: '',
    status: ''
  });

  // Enhanced prospect data with lead scores
  const enhancedProspects = useMemo(() => {
    return prospects.map((prospect, index) => ({
      ...prospect,
      leadScore: mockLeadScores[index] || mockLeadScores[0]
    }));
  }, [prospects]);

  // Filter and sort prospects
  const filteredAndSortedProspects = useMemo(() => {
    const filtered = enhancedProspects.filter(prospect => {
      const matchesSearch = !filters.search || 
        prospect.person.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        prospect.person.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
        prospect.company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        prospect.person.title.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesIndustry = !filters.industry || prospect.company.industry === filters.industry;
      const matchesLocation = !filters.location || 
        prospect.company.location.city.includes(filters.location) ||
        prospect.company.location.country.includes(filters.location);
      
      const matchesScoreRange = !filters.scoreRange || (() => {
        const score = prospect.score;
        switch (filters.scoreRange) {
          case 'high': return score >= 80;
          case 'medium': return score >= 50 && score < 80;
          case 'low': return score < 50;
          default: return true;
        }
      })();
      
      const matchesStatus = !filters.status || prospect.status === filters.status;
      
      return matchesSearch && matchesIndustry && matchesLocation && matchesScoreRange && matchesStatus;
    });

    // Sort prospects
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'name':
          aValue = `${a.person.firstName} ${a.person.lastName}`;
          bValue = `${b.person.firstName} ${b.person.lastName}`;
          break;
        case 'company':
          aValue = a.company.name;
          bValue = b.company.name;
          break;
        case 'title':
          aValue = a.person.title;
          bValue = b.person.title;
          break;
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'location':
          aValue = a.company.location.city;
          bValue = b.company.location.city;
          break;
        case 'enrichmentDate':
          aValue = new Date(a.enrichmentDate);
          bValue = new Date(b.enrichmentDate);
          break;
        default:
          return 0;
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [enhancedProspects, filters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProspects.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProspects = filteredAndSortedProspects.slice(startIndex, startIndex + pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleSelectProspect = (prospectId: string) => {
    setSelectedProspects(prev => 
      prev.includes(prospectId) 
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProspects.length === paginatedProspects.length) {
      setSelectedProspects([]);
    } else {
      setSelectedProspects(paginatedProspects.map(p => p.id));
    }
  };

  const toggleStar = (prospectId: string) => {
    setStarredProspects(prev =>
      prev.includes(prospectId)
        ? prev.filter(id => id !== prospectId)
        : [...prev, prospectId]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExportSelected = () => {
    const selected = filteredAndSortedProspects.filter(p => selectedProspects.includes(p.id));
    onExport?.(selected);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Prospect Results ({filteredAndSortedProspects.length})
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
              {selectedProspects.length > 0 && (
                <Button size="sm" onClick={handleExportSelected}>
                  <Download className="mr-2 h-4 w-4" />
                  Export ({selectedProspects.length})
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div>
              <Input
                placeholder="Search prospects..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full"
              />
            </div>
            <div>
              <Select value={filters.industry} onValueChange={(value) => setFilters(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  <SelectItem value="Software Development">Software</SelectItem>
                  <SelectItem value="Technology Consulting">Tech Consulting</SelectItem>
                  <SelectItem value="Marketing & Advertising">Marketing</SelectItem>
                  <SelectItem value="Financial Services">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Austin">Austin</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.scoreRange} onValueChange={(value) => setFilters(prev => ({ ...prev, scoreRange: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Score Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Scores</SelectItem>
                  <SelectItem value="high">High (80+)</SelectItem>
                  <SelectItem value="medium">Medium (50-79)</SelectItem>
                  <SelectItem value="low">Low (&lt;50)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="unqualified">Unqualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Mode Toggle and Sort */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={selectedProspects.length === paginatedProspects.length && paginatedProspects.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-gray-600">
                {selectedProspects.length > 0 && `${selectedProspects.length} selected`}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('score')}
                className="flex items-center space-x-1"
              >
                <span>Score</span>
                {getSortIcon('score')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('name')}
                className="flex items-center space-x-1"
              >
                <span>Name</span>
                {getSortIcon('name')}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('company')}
                className="flex items-center space-x-1"
              >
                <span>Company</span>
                {getSortIcon('company')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardContent className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProspects.map((prospect) => (
                <ProspectCard
                  key={prospect.id}
                  prospect={prospect}
                  leadScore={prospect.leadScore}
                  isSelected={selectedProspects.includes(prospect.id)}
                  isStarred={starredProspects.includes(prospect.id)}
                  onSelect={() => handleSelectProspect(prospect.id)}
                  onStar={() => toggleStar(prospect.id)}
                  onViewDetails={() => onViewDetails?.(prospect)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {paginatedProspects.map((prospect) => (
                <ProspectListItem
                  key={prospect.id}
                  prospect={prospect}
                  leadScore={prospect.leadScore}
                  isSelected={selectedProspects.includes(prospect.id)}
                  isStarred={starredProspects.includes(prospect.id)}
                  onSelect={() => handleSelectProspect(prospect.id)}
                  onStar={() => toggleStar(prospect.id)}
                  onViewDetails={() => onViewDetails?.(prospect)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredAndSortedProspects.length)} of {filteredAndSortedProspects.length} prospects
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProspectCardProps {
  prospect: ProspectData & { leadScore: LeadScore };
  isSelected: boolean;
  isStarred: boolean;
  onSelect: () => void;
  onStar: () => void;
  onViewDetails: () => void;
}

function ProspectCard({ prospect, isSelected, isStarred, onSelect, onStar, onViewDetails }: ProspectCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
          <Button variant="ghost" size="sm" onClick={onStar} className="p-1">
            {isStarred ? (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
        <Badge className={getScoreColor(prospect.score)}>
          Score: {prospect.score}
        </Badge>
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 font-semibold">
            {prospect.person.firstName.charAt(0)}{prospect.person.lastName.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">
            {prospect.person.firstName} {prospect.person.lastName}
          </h3>
          <p className="text-sm text-gray-600">{prospect.person.title}</p>
          <p className="text-sm text-gray-500">{prospect.company.name}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <Building2 className="h-3 w-3 text-gray-400" />
          <span>{prospect.company.industry}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span>{prospect.company.location.city}, {prospect.company.location.country}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-3 w-3 text-gray-400" />
          <span>{prospect.company.size} employees</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-1">
          {prospect.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Badge variant="outline" className={`text-xs capitalize ${
          prospect.status === 'new' ? 'border-blue-200 text-blue-700' :
          prospect.status === 'contacted' ? 'border-green-200 text-green-700' :
          prospect.status === 'qualified' ? 'border-purple-200 text-purple-700' :
          'border-gray-200 text-gray-700'
        }`}>
          {prospect.status}
        </Badge>
      </div>

      <div className="flex space-x-2 mt-4">
        <Button size="sm" className="flex-1">
          Contact
        </Button>
        <Button size="sm" variant="outline" onClick={onViewDetails}>
          <Eye className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

interface ProspectListItemProps {
  prospect: ProspectData & { leadScore: LeadScore };
  isSelected: boolean;
  isStarred: boolean;
  onSelect: () => void;
  onStar: () => void;
  onViewDetails: () => void;
}

function ProspectListItem({ prospect, isSelected, isStarred, onSelect, onStar, onViewDetails }: ProspectListItemProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className={`border rounded-lg p-4 hover:shadow-sm transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
          <Button variant="ghost" size="sm" onClick={onStar} className="p-1">
            {isStarred ? (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-400" />
            )}
          </Button>
          
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-sm">
              {prospect.person.firstName.charAt(0)}{prospect.person.lastName.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  {prospect.person.firstName} {prospect.person.lastName}
                </h3>
                <p className="text-sm text-gray-600">{prospect.person.title}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">{prospect.company.name}</p>
                <p className="text-sm text-gray-500">{prospect.company.industry}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">
                  {prospect.company.location.city}, {prospect.company.location.country}
                </p>
                <p className="text-sm text-gray-500">{prospect.company.size} employees</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {prospect.tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Badge className={getScoreColor(prospect.score)}>
            {prospect.score}
          </Badge>
          
          <Badge variant="outline" className={`text-xs capitalize ${
            prospect.status === 'new' ? 'border-blue-200 text-blue-700' :
            prospect.status === 'contacted' ? 'border-green-200 text-green-700' :
            prospect.status === 'qualified' ? 'border-purple-200 text-purple-700' :
            'border-gray-200 text-gray-700'
          }`}>
            {prospect.status}
          </Badge>
          
          <div className="flex space-x-1">
            <Button size="sm">Contact</Button>
            <Button size="sm" variant="outline" onClick={onViewDetails}>
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProspectResultsGrid;