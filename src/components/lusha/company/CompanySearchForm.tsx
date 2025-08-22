"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Search, 
  Filter, 
  X, 
  Globe, 
  MapPin, 
  Users, 
  DollarSign,
  Loader2,
  ChevronDown
} from 'lucide-react';
import type { CompanySearchData, CompanyData } from '@/types/lusha';
import { mockCompanyData } from '@/lib/data/lusha-mock';

interface CompanySearchFormProps {
  onSearch?: (data: CompanySearchData) => void;
  loading?: boolean;
  className?: string;
}

interface SearchFilters {
  industries: string[];
  locations: string[];
  companySizes: string[];
  revenues: string[];
}

const industryOptions = [
  'Software Development',
  'Technology Consulting',
  'Financial Services',
  'Healthcare',
  'Manufacturing',
  'Retail & E-commerce',
  'Marketing & Advertising',
  'Education',
  'Real Estate',
  'Non-profit'
];

const locationOptions = [
  'San Francisco, CA',
  'New York, NY',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
  'Chicago, IL',
  'Los Angeles, CA',
  'Denver, CO',
  'Atlanta, GA',
  'Remote'
];

const companySizeOptions = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5000+'
];

const revenueOptions = [
  'Under $1M',
  '$1M-$10M',
  '$10M-$50M',
  '$50M-$100M',
  '$100M-$500M',
  '$500M-$1B',
  '$1B+'
];

export function CompanySearchForm({ onSearch, loading = false, className }: CompanySearchFormProps) {
  const [searchData, setSearchData] = useState<CompanySearchData>({
    name: '',
    domain: '',
    industry: '',
    location: '',
    size: '',
    revenue: ''
  });
  
  const [filters, setFilters] = useState<SearchFilters>({
    industries: [],
    locations: [],
    companySizes: [],
    revenues: []
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<CompanyData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (field: keyof CompanySearchData, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
    
    // Show suggestions for company name
    if (field === 'name' && value.length > 2) {
      const mockSuggestions = [
        'TechCorp Solutions',
        'InnovateLab',
        'GrowthCo Marketing',
        'DataTech Systems',
        'CloudSoft Inc'
      ].filter(name => name.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addFilter = (type: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: [...prev[type], value]
    }));
  };

  const removeFilter = (type: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      industries: [],
      locations: [],
      companySizes: [],
      revenues: []
    });
    setSearchData({
      name: '',
      domain: '',
      industry: '',
      location: '',
      size: '',
      revenue: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockCompanyData.filter(company => {
        const matchesName = !searchData.name || 
          company.name.toLowerCase().includes(searchData.name.toLowerCase());
        const matchesDomain = !searchData.domain || 
          company.domain.toLowerCase().includes(searchData.domain.toLowerCase());
        const matchesIndustry = !searchData.industry || 
          company.industry === searchData.industry ||
          filters.industries.length === 0 || 
          filters.industries.includes(company.industry);
        
        return matchesName && matchesDomain && matchesIndustry;
      });
      
      setSearchResults(results);
      setShowResults(true);
      setIsLoading(false);
      
      if (onSearch) {
        onSearch({ ...searchData, ...filters });
      }
    }, 1500);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchData(prev => ({ ...prev, name: suggestion }));
    setShowSuggestions(false);
  };

  const totalFilters = Object.values(filters).flat().length + 
    Object.values(searchData).filter(Boolean).length;

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Company Intelligence Search
            </div>
            {totalFilters > 0 && (
              <Badge variant="outline" className="ml-2">
                {totalFilters} filter{totalFilters !== 1 ? 's' : ''} applied
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g., TechCorp Solutions"
                  value={searchData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="domain">Company Domain</Label>
                <Input
                  id="domain"
                  placeholder="e.g., techcorp.com"
                  value={searchData.domain || ''}
                  onChange={(e) => handleInputChange('domain', e.target.value)}
                />
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </Button>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Industry</Label>
                    <Select
                      value={searchData.industry || ''}
                      onValueChange={(value) => handleInputChange('industry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryOptions.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Select
                      value={searchData.location || ''}
                      onValueChange={(value) => handleInputChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationOptions.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company Size</Label>
                    <Select
                      value={searchData.size || ''}
                      onValueChange={(value) => handleInputChange('size', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizeOptions.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} employees
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Revenue Range</Label>
                    <Select
                      value={searchData.revenue || ''}
                      onValueChange={(value) => handleInputChange('revenue', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        {revenueOptions.map((revenue) => (
                          <SelectItem key={revenue} value={revenue}>
                            {revenue}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Applied Filters */}
            {totalFilters > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-gray-600">Applied Filters:</span>
                
                {Object.entries(searchData).map(([key, value]) => 
                  value && (
                    <Badge key={key} variant="outline" className="flex items-center space-x-1">
                      <span>{key}: {value}</span>
                      <button
                        type="button"
                        onClick={() => handleInputChange(key as keyof CompanySearchData, '')}
                        className="ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                )}
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Search Button */}
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={isLoading || loading}
                className="flex-1"
              >
                {isLoading || loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Companies
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={clearAllFilters}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Search Results ({searchResults.length} companies found)</span>
              <div className="flex space-x-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="name">Company Name</SelectItem>
                    <SelectItem value="size">Company Size</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  Export Results
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((company) => (
                <div key={company.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{company.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{company.industry}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Globe className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{company.domain}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {company.location.city}, {company.location.country}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {company.size}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {company.revenue}
                          </Badge>
                        </div>
                        <Badge className={
                          company.confidence >= 90 ? 'bg-green-100 text-green-800' :
                          company.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {company.confidence}%
                        </Badge>
                      </div>
                      
                      <Button size="sm" className="w-full mt-3">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CompanySearchForm;