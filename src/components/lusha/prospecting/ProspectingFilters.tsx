"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target,
  Filter,
  Search,
  X,
  Plus,
  Save,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Briefcase,
  MapPin,
  Building2,
  DollarSign,
  Users,
  Zap,
  BookOpen
} from 'lucide-react';
import type { ProspectingFilters as ProspectingFiltersType, EnrichmentTemplate } from '@/types/lusha';
import { mockTemplates } from '@/lib/data/lusha-mock';

interface ProspectingFiltersProps {
  onSearch?: (filters: ProspectingFiltersType) => void;
  className?: string;
}

interface FilterSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

const jobTitleOptions = [
  'CEO', 'CTO', 'CIO', 'CFO', 'CMO',
  'VP Engineering', 'VP Sales', 'VP Marketing', 'VP Product',
  'Director of Engineering', 'Director of Sales', 'Director of Marketing',
  'Head of Product', 'Head of Growth', 'Head of Operations',
  'Software Engineer', 'Product Manager', 'Sales Manager',
  'Marketing Manager', 'Business Development Manager'
];

const industryOptions = [
  'Software Development', 'Technology Consulting', 'Financial Services',
  'Healthcare', 'Manufacturing', 'Retail & E-commerce',
  'Marketing & Advertising', 'Education', 'Real Estate',
  'SaaS', 'Fintech', 'Healthtech', 'Edtech'
];

const locationOptions = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Chicago, IL', 'Los Angeles, CA', 'Remote'
];

const companySizeOptions = [
  '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'
];

const revenueOptions = [
  'Under $1M', '$1M-$10M', '$10M-$50M', '$50M-$100M', 
  '$100M-$500M', '$500M-$1B', '$1B+'
];

const seniorityOptions = [
  'C-Level', 'VP Level', 'Director', 'Manager', 'Senior', 'Mid-Level', 'Entry Level'
];

const departmentOptions = [
  'Engineering', 'Sales', 'Marketing', 'Product', 'Operations',
  'Finance', 'Human Resources', 'Customer Success', 'Business Development'
];

const technologyOptions = [
  'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
  'Salesforce', 'HubSpot', 'Slack', 'Microsoft Office', 'Zoom'
];

export function ProspectingFilters({ onSearch, className }: ProspectingFiltersProps) {
  const [filters, setFilters] = useState<ProspectingFiltersType>({
    industries: [],
    locations: [],
    companySizes: [],
    revenues: [],
    jobTitles: [],
    seniorities: [],
    departments: [],
    technologies: [],
    keywords: [],
    excludeCompanies: [],
    excludeIndustries: []
  });

  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'jobTitles', title: 'Job Titles & Roles', icon: <Briefcase className="h-4 w-4" />, isOpen: true },
    { id: 'industries', title: 'Industries', icon: <Building2 className="h-4 w-4" />, isOpen: true },
    { id: 'locations', title: 'Locations', icon: <MapPin className="h-4 w-4" />, isOpen: false },
    { id: 'companySizes', title: 'Company Sizes', icon: <Users className="h-4 w-4" />, isOpen: false },
    { id: 'revenues', title: 'Revenue Ranges', icon: <DollarSign className="h-4 w-4" />, isOpen: false },
    { id: 'seniorities', title: 'Seniority Levels', icon: <Target className="h-4 w-4" />, isOpen: false },
    { id: 'departments', title: 'Departments', icon: <Building2 className="h-4 w-4" />, isOpen: false },
    { id: 'technologies', title: 'Technologies', icon: <Zap className="h-4 w-4" />, isOpen: false }
  ]);

  const [savedTemplates] = useState<EnrichmentTemplate[]>(mockTemplates.filter(t => t.type === 'prospect'));
  const [templateName, setTemplateName] = useState('');
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [excludeCompanyInput, setExcludeCompanyInput] = useState('');
  const [estimatedResults, setEstimatedResults] = useState(0);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isOpen: !section.isOpen }
        : section
    ));
  };

  const addFilter = (type: keyof ProspectingFiltersType, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[type] as string[] || [];
      if (!currentFilters.includes(value)) {
        const updated = { ...prev, [type]: [...currentFilters, value] };
        updateEstimatedResults(updated);
        return updated;
      }
      return prev;
    });
  };

  const removeFilter = (type: keyof ProspectingFiltersType, value: string) => {
    setFilters(prev => {
      const updated = { ...prev, [type]: (prev[type] as string[])?.filter(item => item !== value) || [] };
      updateEstimatedResults(updated);
      return updated;
    });
  };

  const updateEstimatedResults = (currentFilters: ProspectingFiltersType) => {
    // Simple estimation logic based on filter combinations
    let base = 100000; // Base pool
    
    Object.values(currentFilters).forEach(filterArray => {
      if (Array.isArray(filterArray) && filterArray.length > 0) {
        base = Math.floor(base * 0.3); // Each filter reduces by ~70%
      }
    });
    
    setEstimatedResults(Math.max(base, 50));
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      addFilter('keywords', keywordInput.trim());
      setKeywordInput('');
    }
  };

  const addExcludeCompany = () => {
    if (excludeCompanyInput.trim()) {
      addFilter('excludeCompanies', excludeCompanyInput.trim());
      setExcludeCompanyInput('');
    }
  };

  const clearAllFilters = () => {
    const emptyFilters: ProspectingFiltersType = {
      industries: [],
      locations: [],
      companySizes: [],
      revenues: [],
      jobTitles: [],
      seniorities: [],
      departments: [],
      technologies: [],
      keywords: [],
      excludeCompanies: [],
      excludeIndustries: []
    };
    setFilters(emptyFilters);
    updateEstimatedResults(emptyFilters);
  };

  const loadTemplate = (template: EnrichmentTemplate) => {
    setFilters(template.filters);
    updateEstimatedResults(template.filters);
  };

  const saveTemplate = () => {
    if (templateName.trim()) {
      console.log('Saving template:', templateName, filters);
      setShowSaveTemplate(false);
      setTemplateName('');
    }
  };

  const totalFilters = Object.values(filters).flat().length;

  const handleSearch = () => {
    if (onSearch) {
      // Add limit and offset to filters
      const searchFilters = {
        ...filters,
        limit: 50, // Default limit
        offset: 0  // Start from beginning
      };
      onSearch(searchFilters);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Advanced Prospecting Filters
            </div>
            {totalFilters > 0 && (
              <Badge variant="outline" className="ml-2">
                {totalFilters} filter{totalFilters !== 1 ? 's' : ''} applied
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Template Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <Label>Saved Templates</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveTemplate(!showSaveTemplate)}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Current
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => loadTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <BookOpen className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Used {template.usageCount} times</span>
                      </div>
                    </div>
                    {template.isDefault && (
                      <Badge variant="outline" className="text-xs">Default</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Save Template Form */}
            {showSaveTemplate && (
              <div className="mt-4 p-4 border rounded-lg bg-blue-50">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Template name..."
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={saveTemplate}>
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowSaveTemplate(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Sections */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="border rounded-lg">
                <button
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                    {(filters[section.id as keyof ProspectingFiltersType] as string[])?.length > 0 && (
                      <Badge variant="outline" className="ml-2">
                        {(filters[section.id as keyof ProspectingFiltersType] as string[]).length}
                      </Badge>
                    )}
                  </div>
                  {section.isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {section.isOpen && (
                  <div className="p-3 border-t bg-gray-50">
                    {section.id === 'jobTitles' && (
                      <FilterCheckboxGrid
                        options={jobTitleOptions}
                        selected={filters.jobTitles || []}
                        onToggle={(value) => 
                          filters.jobTitles?.includes(value) 
                            ? removeFilter('jobTitles', value)
                            : addFilter('jobTitles', value)
                        }
                      />
                    )}
                    {section.id === 'industries' && (
                      <FilterCheckboxGrid
                        options={industryOptions}
                        selected={filters.industries || []}
                        onToggle={(value) => 
                          filters.industries?.includes(value) 
                            ? removeFilter('industries', value)
                            : addFilter('industries', value)
                        }
                      />
                    )}
                    {section.id === 'locations' && (
                      <FilterCheckboxGrid
                        options={locationOptions}
                        selected={filters.locations || []}
                        onToggle={(value) => 
                          filters.locations?.includes(value) 
                            ? removeFilter('locations', value)
                            : addFilter('locations', value)
                        }
                      />
                    )}
                    {section.id === 'companySizes' && (
                      <FilterCheckboxGrid
                        options={companySizeOptions}
                        selected={filters.companySizes || []}
                        onToggle={(value) => 
                          filters.companySizes?.includes(value) 
                            ? removeFilter('companySizes', value)
                            : addFilter('companySizes', value)
                        }
                      />
                    )}
                    {section.id === 'revenues' && (
                      <FilterCheckboxGrid
                        options={revenueOptions}
                        selected={filters.revenues || []}
                        onToggle={(value) => 
                          filters.revenues?.includes(value) 
                            ? removeFilter('revenues', value)
                            : addFilter('revenues', value)
                        }
                      />
                    )}
                    {section.id === 'seniorities' && (
                      <FilterCheckboxGrid
                        options={seniorityOptions}
                        selected={filters.seniorities || []}
                        onToggle={(value) => 
                          filters.seniorities?.includes(value) 
                            ? removeFilter('seniorities', value)
                            : addFilter('seniorities', value)
                        }
                      />
                    )}
                    {section.id === 'departments' && (
                      <FilterCheckboxGrid
                        options={departmentOptions}
                        selected={filters.departments || []}
                        onToggle={(value) => 
                          filters.departments?.includes(value) 
                            ? removeFilter('departments', value)
                            : addFilter('departments', value)
                        }
                      />
                    )}
                    {section.id === 'technologies' && (
                      <FilterCheckboxGrid
                        options={technologyOptions}
                        selected={filters.technologies || []}
                        onToggle={(value) => 
                          filters.technologies?.includes(value) 
                            ? removeFilter('technologies', value)
                            : addFilter('technologies', value)
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Keywords Section */}
            <div className="border rounded-lg p-3">
              <Label className="text-sm font-medium">Keywords</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  placeholder="e.g., startup, AI, machine learning..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button size="sm" onClick={addKeyword}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {filters.keywords && filters.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{keyword}</span>
                      <button onClick={() => removeFilter('keywords', keyword)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Exclude Companies Section */}
            <div className="border rounded-lg p-3">
              <Label className="text-sm font-medium">Exclude Companies</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  placeholder="e.g., Microsoft, Google, Apple..."
                  value={excludeCompanyInput}
                  onChange={(e) => setExcludeCompanyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addExcludeCompany()}
                />
                <Button size="sm" onClick={addExcludeCompany}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {filters.excludeCompanies && filters.excludeCompanies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters.excludeCompanies.map((company, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1 bg-red-50 text-red-700">
                      <span>{company}</span>
                      <button onClick={() => removeFilter('excludeCompanies', company)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Applied Filters Summary */}
          {totalFilters > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-900">Applied Filters ({totalFilters})</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearAllFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="mr-2 h-3 w-3" />
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-2">
                {Object.entries(filters).map(([key, values]) => {
                  if (!Array.isArray(values) || values.length === 0) return null;
                  
                  return (
                    <div key={key} className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium text-blue-800 capitalize mr-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      {values.map((value, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Actions */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-600">
              Estimated results: <strong>{estimatedResults.toLocaleString()}</strong> prospects
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={clearAllFilters}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSearch} disabled={totalFilters === 0}>
                <Search className="mr-2 h-4 w-4" />
                Find Prospects
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface FilterCheckboxGridProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterCheckboxGrid({ options, selected, onToggle }: FilterCheckboxGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={option}
            checked={selected.includes(option)}
            onCheckedChange={() => onToggle(option)}
          />
          <Label
            htmlFor={option}
            className="text-sm font-normal cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default ProspectingFilters;