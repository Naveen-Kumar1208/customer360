"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Target, 
  Users,
  Building2,
  UserPlus,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Phone,
  Mail,
  Calendar,
  Star,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProspectingFilters } from "@/components/lusha/prospecting/ProspectingFilters";
import { useLushaProspecting } from "@/hooks/useLushaProspecting";
import type { PersonData, CompanyData, ProspectData, ProspectingFilters as ProspectingFiltersType } from "@/types/lusha";

function ContactCard({ contact, onAction }: { 
  contact: PersonData; 
  onAction: (contact: PersonData, action: string) => void; 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {contact.firstName ? contact.firstName.charAt(0) : contact.email[0]?.charAt(0) || '?'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {contact.firstName && contact.lastName 
                    ? `${contact.firstName} ${contact.lastName}` 
                    : contact.email[0] || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-600">{contact.title || 'No title'}</p>
                <p className="text-sm text-gray-500">{contact.company || 'No company'}</p>
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
              <DropdownMenuItem onClick={() => onAction(contact, 'view')}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(contact, 'enrich')}>
                <Zap className="mr-2 h-4 w-4" />
                Enrich Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(contact, 'export')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {contact.verified && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {contact.source && (
                <Badge variant="outline">{contact.source}</Badge>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{contact.confidence}%</span>
            </div>
          </div>

          {contact.email.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Email:</strong> {contact.email[0]}
            </div>
          )}

          {contact.phone.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Phone:</strong> {contact.phone[0]}
            </div>
          )}

          {contact.department && (
            <div className="text-sm text-gray-600">
              <strong>Department:</strong> {contact.department}
            </div>
          )}

          {contact.seniority && (
            <div className="text-sm text-gray-600">
              <strong>Seniority:</strong> {contact.seniority}
            </div>
          )}

          <div className="text-xs text-gray-500">
            Enriched: {new Date(contact.enrichedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction(contact, 'call')}>
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction(contact, 'email')}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onAction(contact, 'meet')}>
            <Calendar className="mr-2 h-4 w-4" />
            Meet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CompanyCard({ company, onAction }: { 
  company: CompanyData; 
  onAction: (company: CompanyData, action: string) => void; 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.industry || 'Industry not specified'}</p>
                <p className="text-sm text-gray-500">{company.domain}</p>
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
              <DropdownMenuItem onClick={() => onAction(company, 'view')}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(company, 'enrich')}>
                <Zap className="mr-2 h-4 w-4" />
                Enrich Data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction(company, 'export')}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {company.verified && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge variant="outline">{company.size || 'Size unknown'}</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{company.confidence}%</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <strong>Location:</strong> {company.location.city}, {company.location.country}
          </div>

          {company.revenue && (
            <div className="text-sm text-gray-600">
              <strong>Revenue:</strong> {company.revenue}
            </div>
          )}

          {company.employees > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Employees:</strong> {company.employees.toLocaleString()}
            </div>
          )}

          {company.founded > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Founded:</strong> {company.founded}
            </div>
          )}

          {company.technologies.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Technologies:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {company.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {company.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{company.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500">
            Last updated: {new Date(company.lastUpdated).toLocaleDateString()}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction(company, 'visit')}>
            <Eye className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onAction(company, 'find_contacts')}>
            <Users className="mr-2 h-4 w-4" />
            Find Contacts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProspectCard({ prospect, onAction }: { 
  prospect: ProspectData; 
  onAction: (prospect: ProspectData, action: string) => void; 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                {prospect.person.firstName ? prospect.person.firstName.charAt(0) : prospect.person.email[0]?.charAt(0) || '?'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {prospect.person.firstName && prospect.person.lastName 
                    ? `${prospect.person.firstName} ${prospect.person.lastName}` 
                    : prospect.person.email[0] || 'Unknown'}
                </h3>
                <p className="text-sm text-gray-600">{prospect.person.title || 'No title'}</p>
                <p className="text-sm text-gray-500">{prospect.company.name}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">{prospect.score}%</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onAction(prospect, 'view')}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(prospect, 'add_to_sequence')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add to Sequence
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction(prospect, 'export')}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-3">
          {/* Match Criteria */}
          <div className="flex flex-wrap gap-1">
            {prospect.criteria.titleMatch && (
              <Badge className="bg-blue-100 text-blue-800 text-xs">Title Match</Badge>
            )}
            {prospect.criteria.industryMatch && (
              <Badge className="bg-green-100 text-green-800 text-xs">Industry Match</Badge>
            )}
            {prospect.criteria.locationMatch && (
              <Badge className="bg-purple-100 text-purple-800 text-xs">Location Match</Badge>
            )}
            {prospect.criteria.seniorityMatch && (
              <Badge className="bg-orange-100 text-orange-800 text-xs">Seniority Match</Badge>
            )}
            {prospect.criteria.companySizeMatch && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">Company Size Match</Badge>
            )}
          </div>

          {/* Company Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{prospect.company.name}</p>
                <p className="text-xs text-gray-600">{prospect.company.industry}</p>
                <p className="text-xs text-gray-500">
                  {prospect.company.location.city}, {prospect.company.location.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">{prospect.company.size}</p>
                {prospect.company.revenue && (
                  <p className="text-xs text-gray-500">{prospect.company.revenue}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {prospect.person.email.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Email:</strong> {prospect.person.email[0]}
            </div>
          )}

          {prospect.person.phone.length > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Phone:</strong> {prospect.person.phone[0]}
            </div>
          )}

          <div className="text-xs text-gray-500">
            Status: <span className="capitalize">{prospect.status}</span> • 
            Found: {new Date(prospect.enrichmentDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction(prospect, 'call')}>
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onAction(prospect, 'email')}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button size="sm" className="flex-1" onClick={() => onAction(prospect, 'add_lead')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add as Lead
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EnhancedProspecting() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [activeTab, setActiveTab] = useState("contacts");
  
  const {
    contactResults,
    companyResults,
    combinedResults,
    loading,
    error,
    searchContacts,
    searchCompanies,
    searchAll,
    enrichContacts,
    enrichCompanies,
    clearResults,
    clearError
  } = useLushaProspecting();

  const handleSearch = async (filters: ProspectingFiltersType) => {
    try {
      clearError();
      if (activeTab === "contacts") {
        await searchContacts(filters);
      } else if (activeTab === "companies") {
        await searchCompanies(filters);
      } else {
        await searchAll(filters);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleContactAction = (contact: PersonData, action: string) => {
    console.log('Contact action:', action, contact);
    if (action === 'enrich') {
      enrichContacts([contact.id]);
    }
  };

  const handleCompanyAction = (company: CompanyData, action: string) => {
    console.log('Company action:', action, company);
    if (action === 'enrich') {
      enrichCompanies([company.id]);
    }
  };

  const handleProspectAction = (prospect: ProspectData, action: string) => {
    console.log('Prospect action:', action, prospect);
  };

  // Filter results based on search term
  const filteredContactResults = contactResults.filter(contact => 
    searchTerm === "" || 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.some(email => email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredCompanyResults = companyResults.filter(company => 
    searchTerm === "" || 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCombinedResults = combinedResults.filter(prospect => 
    searchTerm === "" || 
    `${prospect.person.firstName} ${prospect.person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Prospecting</h1>
          <p className="text-gray-600 mt-1">Find and enrich prospects using Lusha's powerful search capabilities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={clearResults}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Clear Results
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">{error}</span>
              <Button size="sm" variant="ghost" onClick={clearError}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      {showFilters && (
        <ProspectingFilters onSearch={handleSearch} />
      )}

      {/* Search and Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search results..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {loading && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </div>
              )}
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="contacts" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Contacts ({filteredContactResults.length})</span>
              </TabsTrigger>
              <TabsTrigger value="companies" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Companies ({filteredCompanyResults.length})</span>
              </TabsTrigger>
              <TabsTrigger value="prospects" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Prospects ({filteredCombinedResults.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts" className="mt-6">
              {filteredContactResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredContactResults.map((contact) => (
                    <ContactCard 
                      key={contact.id} 
                      contact={contact}
                      onAction={handleContactAction}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria to find contacts.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="companies" className="mt-6">
              {filteredCompanyResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCompanyResults.map((company) => (
                    <CompanyCard 
                      key={company.id} 
                      company={company}
                      onAction={handleCompanyAction}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria to find companies.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="prospects" className="mt-6">
              {filteredCombinedResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCombinedResults.map((prospect) => (
                    <ProspectCard 
                      key={prospect.id} 
                      prospect={prospect}
                      onAction={handleProspectAction}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No prospects found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria to find prospects.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}