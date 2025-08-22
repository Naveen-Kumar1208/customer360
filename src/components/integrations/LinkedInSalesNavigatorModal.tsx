"use client";

import type React from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Linkedin,
  X,
  Search,
  Filter,
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Star,
  Eye,
  Download,
  Send,
  UserPlus,
  Calendar,
  TrendingUp,
  Target,
  MessageCircle,
  Settings,
  Zap,
  Globe,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface LinkedInSalesNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'VP of Engineering',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    connections: '2nd degree',
    mutualConnections: 12,
    recentActivity: 'Posted about AI adoption',
    profileUrl: '#',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    companySize: '500-1000',
    industry: 'Software Development',
    matched: true,
    score: 92
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Director of Product',
    company: 'InnovateLabs',
    location: 'New York, NY',
    connections: '3rd degree',
    mutualConnections: 8,
    recentActivity: 'Shared article on product strategy',
    profileUrl: '#',
    email: 'michael.chen@innovatelabs.com',
    phone: '+1 (555) 987-6543',
    companySize: '200-500',
    industry: 'Technology',
    matched: true,
    score: 88
  },
  {
    id: '3',
    name: 'Jennifer Lee',
    title: 'Chief Marketing Officer',
    company: 'GrowthCo',
    location: 'Austin, TX',
    connections: '2nd degree',
    mutualConnections: 15,
    recentActivity: 'Attended MarTech Summit',
    profileUrl: '#',
    email: 'jennifer.lee@growthco.com',
    phone: '+1 (555) 456-7890',
    companySize: '100-200',
    industry: 'Marketing Technology',
    matched: true,
    score: 85
  }
];

const savedSearches = [
  { id: '1', name: 'SaaS CTOs', results: 1847, lastRun: '2 hours ago', alerts: true },
  { id: '2', name: 'Marketing Directors - Enterprise', results: 932, lastRun: '1 day ago', alerts: true },
  { id: '3', name: 'VP Engineering - Series B', results: 445, lastRun: '3 days ago', alerts: false },
  { id: '4', name: 'Founders - Fintech', results: 278, lastRun: '1 week ago', alerts: true }
];

const inMailTemplates = [
  {
    id: '1',
    name: 'Cold Outreach - Product Demo',
    subject: 'Quick 15-min demo of [Product] for [Company]?',
    template: `Hi [Name],

I noticed your recent post about [specific topic] and thought you might be interested in how [Company] solved a similar challenge.

Would you be open to a brief 15-minute call to show you how we've helped similar companies like [similar company] achieve [specific result]?

Best regards,
[Your name]`,
    successRate: 24,
    responses: 18
  },
  {
    id: '2',
    name: 'Warm Introduction Request',
    subject: 'Introduction request - [Mutual Connection Name]',
    template: `Hi [Name],

[Mutual connection] suggested I reach out to you regarding [specific topic/challenge]. 

I'd love to connect and share some insights that might be valuable for [Company]'s [specific area].

Would you be interested in a brief conversation?

Best,
[Your name]`,
    successRate: 35,
    responses: 12
  }
];

export const LinkedInSalesNavigatorModal: React.FC<LinkedInSalesNavigatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchFilters, setSearchFilters] = useState({
    keywords: '',
    location: '',
    industry: '',
    companySize: '',
    title: '',
    seniority: ''
  });
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">LinkedIn Sales Navigator</h2>
              <p className="text-sm text-gray-600">Advanced lead prospecting and social selling</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="search">Lead Search</TabsTrigger>
                <TabsTrigger value="results">Search Results</TabsTrigger>
                <TabsTrigger value="saved">Saved Searches</TabsTrigger>
                <TabsTrigger value="inmail">InMail</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Advanced Lead Search
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="keywords">Keywords</Label>
                        <Input
                          id="keywords"
                          placeholder="Job titles, skills, companies..."
                          value={searchFilters.keywords}
                          onChange={(e) => setSearchFilters({...searchFilters, keywords: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, state, country..."
                          value={searchFilters.location}
                          onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <select
                          id="industry"
                          value={searchFilters.industry}
                          onChange={(e) => setSearchFilters({...searchFilters, industry: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="retail">Retail</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <select
                          id="companySize"
                          value={searchFilters.companySize}
                          onChange={(e) => setSearchFilters({...searchFilters, companySize: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seniority">Seniority Level</Label>
                        <select
                          id="seniority"
                          value={searchFilters.seniority}
                          onChange={(e) => setSearchFilters({...searchFilters, seniority: e.target.value})}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="">Select level</option>
                          <option value="entry">Entry level</option>
                          <option value="associate">Associate</option>
                          <option value="mid-senior">Mid-Senior level</option>
                          <option value="director">Director</option>
                          <option value="executive">Executive</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="flex-1"
                      >
                        {isSearching ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Search Leads
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Advanced Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Search Results ({sampleLeads.length})</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export ({selectedLeads.length})
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add to List
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {sampleLeads.map((lead) => (
                    <Card key={lead.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead.id)}
                              onChange={() => handleLeadSelect(lead.id)}
                              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-lg font-semibold text-gray-900">{lead.name}</h4>
                                <Badge className="bg-green-100 text-green-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  {lead.score}% match
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-1">{lead.title}</p>
                              <p className="text-sm text-gray-500 mb-2">{lead.company}</p>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {lead.location}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {lead.connections}
                                </div>
                                <div className="flex items-center">
                                  <Building2 className="w-4 h-4 mr-1" />
                                  {lead.companySize}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 text-sm">
                                <Badge variant="outline">{lead.mutualConnections} mutual connections</Badge>
                                <Badge variant="outline">{lead.industry}</Badge>
                              </div>
                              
                              <p className="text-sm text-blue-600 mt-2">
                                Recent: {lead.recentActivity}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm">
                              <Send className="w-3 h-3 mr-1" />
                              InMail
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Searches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedSearches.map((search) => (
                        <div key={search.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{search.name}</h4>
                            <p className="text-sm text-gray-600">{search.results} results • Last run {search.lastRun}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {search.alerts && (
                              <Badge className="bg-green-100 text-green-800">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Alerts ON
                              </Badge>
                            )}
                            <Button size="sm" variant="outline">
                              <Search className="w-3 h-3 mr-1" />
                              Run Search
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inmail" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>InMail Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {inMailTemplates.map((template) => (
                          <div key={template.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge className="bg-blue-100 text-blue-800">
                                {template.successRate}% success
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                            <p className="text-xs text-gray-500">{template.responses} responses</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              Use Template
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>InMail Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                          <p className="text-3xl font-bold text-blue-600">23</p>
                          <p className="text-sm text-gray-600">InMail credits remaining</p>
                          <p className="text-xs text-gray-500">out of 50 monthly credits</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>This Month's Usage</span>
                            <span>27/50 credits</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '54%' }}></div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Recent InMail Performance</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Response Rate</span>
                              <span className="text-green-600">34%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Average Response Time</span>
                              <span>2.3 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Best Performing Template</span>
                              <span>Warm Introduction</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Searches</p>
                          <p className="text-2xl font-bold text-blue-600">847</p>
                          <p className="text-xs text-gray-500">this month</p>
                        </div>
                        <Search className="h-8 w-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Leads Generated</p>
                          <p className="text-2xl font-bold text-green-600">2,847</p>
                          <p className="text-xs text-gray-500">+23% vs last month</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Connection Rate</p>
                          <p className="text-2xl font-bold text-purple-600">18%</p>
                          <p className="text-xs text-gray-500">industry average: 15%</p>
                        </div>
                        <Target className="h-8 w-8 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Search Performance by Industry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { industry: 'Technology', searches: 234, leads: 1247, rate: '22%' },
                        { industry: 'Finance', searches: 156, leads: 892, rate: '19%' },
                        { industry: 'Healthcare', searches: 98, leads: 445, rate: '16%' },
                        { industry: 'Manufacturing', searches: 67, leads: 263, rate: '14%' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.industry}</p>
                            <p className="text-sm text-gray-600">{item.searches} searches • {item.leads} leads</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            {item.rate} success
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};