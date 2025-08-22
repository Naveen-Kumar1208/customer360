"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Building2, 
  Target, 
  BarChart3, 
  Settings,
  CheckCircle,
  Activity,
  Zap,
  Key
} from 'lucide-react';

// Import all Lusha components
import LushaDashboard from '@/components/lusha/LushaDashboard';
import PersonEnrichmentForm from '@/components/lusha/person/PersonEnrichmentForm';
import BulkPersonEnrichment from '@/components/lusha/person/BulkPersonEnrichment';
import PersonResultCard from '@/components/lusha/person/PersonResultCard';
import CompanySearchForm from '@/components/lusha/company/CompanySearchForm';
import CompanyProfileCard from '@/components/lusha/company/CompanyProfileCard';
import BulkCompanyProcessor from '@/components/lusha/company/BulkCompanyProcessor';
import ProspectingFilters from '@/components/lusha/prospecting/ProspectingFilters';
import ProspectResultsGrid from '@/components/lusha/prospecting/ProspectResultsGrid';
import LeadScoringCard from '@/components/lusha/prospecting/LeadScoringCard';
import CreditUsageDashboard from '@/components/lusha/analytics/CreditUsageDashboard';
import UsageAnalyticsChart from '@/components/lusha/analytics/UsageAnalyticsChart';
import APIKeyManager from '@/components/lusha/analytics/APIKeyManager';

import { 
  mockPersonData, 
  mockCompanyData, 
  mockProspectData, 
  mockLeadScores,
  type PersonSearchData,
  type CompanySearchData,
  type ProspectingFilters as ProspectingFiltersType,
  type PersonData,
  type CompanyData,
  type ProspectData
} from '@/components/lusha';

// Import the Lusha API hooks
import { useLushaPerson } from '@/hooks/useLushaPerson';
import { useLushaCompany } from '@/hooks/useLushaCompany';
import { useLushaProspect } from '@/hooks/useLushaProspect';

export default function LushaIntegration() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [personSubTab, setPersonSubTab] = useState('search');
  const [companySubTab, setCompanySubTab] = useState('search');
  const [prospectSubTab, setProspectSubTab] = useState('filters');
  const [analyticsSubTab, setAnalyticsSubTab] = useState('credit-usage');

  // Initialize Lusha API hooks
  const personApi = useLushaPerson();
  const companyApi = useLushaCompany();
  const prospectApi = useLushaProspect();

  // State for search results (using API data)
  const personResults = personApi.data;
  const companyResults = companyApi.data;
  const prospectResults = prospectApi.data.length > 0 ? prospectApi.data : mockProspectData;

  const handlePersonEnrich = async (data: PersonSearchData) => {
    try {
      console.log('Enriching person:', data);
      await personApi.enrichPerson(data);
    } catch (error) {
      console.error('Failed to enrich person:', error);
      // Optionally show user-friendly error message
    }
  };

  const handleCompanySearch = async (data: CompanySearchData) => {
    try {
      console.log('Searching companies:', data);
      await companyApi.searchCompany(data);
    } catch (error) {
      console.error('Failed to search company:', error);
      // Optionally show user-friendly error message
    }
  };

  const handleProspectSearch = async (filters: ProspectingFiltersType) => {
    try {
      console.log('Searching prospects:', filters);
      await prospectApi.searchProspects(filters);
    } catch (error) {
      console.error('Failed to search prospects:', error);
      // Optionally show user-friendly error message
    }
  };

  const handleAddToCRM = (item: PersonData | CompanyData | ProspectData) => {
    console.log('Adding to CRM:', item);
    // Implement CRM integration
  };

  const handleExport = (items: PersonData[] | CompanyData[] | ProspectData[]) => {
    console.log('Exporting items:', items);
    // Implement export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header - Only show for non-dashboard tabs */}
      {activeTab !== 'dashboard' && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lusha Integration</h1>
            <p className="text-gray-600 mt-1">Comprehensive B2B contact intelligence platform</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Connected
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>People</span>
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Companies</span>
          </TabsTrigger>
          <TabsTrigger value="prospects" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Prospects</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <LushaDashboard />
        </TabsContent>

        {/* People Tab */}
        <TabsContent value="people" className="space-y-6">
          <Tabs value={personSubTab} onValueChange={setPersonSubTab}>
            <TabsList>
              <TabsTrigger value="search">Person Search</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Enrichment</TabsTrigger>
              <TabsTrigger value="results">Results ({personResults.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search">
              <PersonEnrichmentForm 
                onEnrich={handlePersonEnrich} 
                loading={personApi.loading}
                error={personApi.error}
              />
            </TabsContent>
            
            <TabsContent value="bulk">
              <BulkPersonEnrichment />
            </TabsContent>
            
            <TabsContent value="results">
              {personResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {personResults.map((person) => (
                    <PersonResultCard
                      key={person.id}
                      person={person}
                      onAddToCRM={handleAddToCRM}
                      onExport={(person) => handleExport([person])}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No person results</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by searching for people in the Person Search tab.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <Tabs value={companySubTab} onValueChange={setCompanySubTab}>
            <TabsList>
              <TabsTrigger value="search">Company Search</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Processing</TabsTrigger>
              <TabsTrigger value="results">Results ({companyResults.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search">
              <CompanySearchForm 
                onSearch={handleCompanySearch}
                loading={companyApi.loading}
                error={companyApi.error}
              />
            </TabsContent>
            
            <TabsContent value="bulk">
              <BulkCompanyProcessor />
            </TabsContent>
            
            <TabsContent value="results">
              {companyResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {companyResults.map((company) => (
                    <CompanyProfileCard
                      key={company.id}
                      company={company}
                      onAddToCRM={handleAddToCRM}
                      onExport={(company) => handleExport([company])}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No company results</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by searching for companies in the Company Search tab.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Prospects Tab */}
        <TabsContent value="prospects" className="space-y-6">
          <Tabs value={prospectSubTab} onValueChange={setProspectSubTab}>
            <TabsList>
              <TabsTrigger value="filters">Prospecting Filters</TabsTrigger>
              <TabsTrigger value="results">Prospect Results</TabsTrigger>
              <TabsTrigger value="scoring">Lead Scoring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="filters">
              <ProspectingFilters 
                onSearch={handleProspectSearch}
                loading={prospectApi.loading}
                error={prospectApi.error}
              />
            </TabsContent>
            
            <TabsContent value="results">
              <ProspectResultsGrid
                prospects={prospectResults}
                onExport={handleExport}
                onViewDetails={(prospect) => console.log('View details:', prospect)}
              />
            </TabsContent>
            
            <TabsContent value="scoring">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockProspectData.slice(0, 2).map((prospect, index) => (
                  <LeadScoringCard
                    key={prospect.id}
                    prospect={prospect}
                    leadScore={mockLeadScores[index]}
                    onContact={handleAddToCRM}
                    onViewDetails={(prospect) => console.log('View details:', prospect)}
                    detailed={false}
                  />
                ))}
              </div>
              
              {/* Detailed scoring example */}
              <LeadScoringCard
                prospect={mockProspectData[0]}
                leadScore={mockLeadScores[0]}
                onContact={handleAddToCRM}
                onViewDetails={(prospect) => console.log('View details:', prospect)}
                detailed={true}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Tabs value={analyticsSubTab} onValueChange={setAnalyticsSubTab}>
            <TabsList>
              <TabsTrigger value="credit-usage">Credit Usage</TabsTrigger>
              <TabsTrigger value="usage-analytics">Usage Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="credit-usage">
              <CreditUsageDashboard />
            </TabsContent>
            
            <TabsContent value="usage-analytics">
              <UsageAnalyticsChart />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <APIKeyManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}