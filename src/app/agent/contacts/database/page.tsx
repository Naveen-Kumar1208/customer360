"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  Phone,
  Mail,
  Building2,
  MapPin,
  Star,
  Linkedin,
  Twitter,
  Upload
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleContacts } from "@/lib/data/contactData";
import { type Contact, ContactFilter } from "@/types/contact";
import { AddNewLeadModal } from "@/components/leads/AddNewLeadModal";
import { ImportDataModal } from "@/components/dashboard/ImportDataModal";

function ContactCard({ contact }: { contact: Contact }) {
  // Add safety check
  if (!contact) {
    return null;
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospect': return 'bg-gray-100 text-gray-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'opportunity': return 'bg-yellow-100 text-yellow-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'churned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'linkedin': return <Linkedin className="h-3 w-3" />;
      case 'apollo': return <Building2 className="h-3 w-3" />;
      case 'lusha': return <Search className="h-3 w-3" />;
      default: return <UserPlus className="h-3 w-3" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{contact.fullName}</h3>
                <p className="text-sm text-gray-600">{contact.designation} at {contact.company}</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>{contact.industry}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{contact.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={getStageColor(contact.stage)}>
                  {contact.stage}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  {getSourceIcon(contact.source)}
                  <span className="capitalize">{contact.source}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{contact.score}</span>
                </div>
                
                {contact.socialProfiles?.linkedin && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                )}
                
                {contact.socialProfiles?.twitter && (
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Twitter className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {contact.tags && Array.isArray(contact.tags) && contact.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {contact.tags && contact.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{contact.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

export default function ContactDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showImportDataModal, setShowImportDataModal] = useState(false);
  
  // Contact list state
  const [contacts, setContacts] = useState(sampleContacts);

  const handleContactAdded = (contactData: any) => {
    // Add the new contact to the contacts list
    setContacts(prev => [contactData, ...prev]);
  };



  // Get unique values for filters
  const stages = [...new Set(contacts.map(c => c.stage))];
  const sources = [...new Set(contacts.map(c => c.source))];
  const industries = [...new Set(contacts.map(c => c.industry))];

  // Filter contacts based on search and filters
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = searchTerm === "" || 
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = stageFilter === "all" || contact.stage === stageFilter;
      const matchesSource = sourceFilter === "all" || contact.source === sourceFilter;
      const matchesIndustry = industryFilter === "all" || contact.industry === industryFilter;

      return matchesSearch && matchesStage && matchesSource && matchesIndustry;
    });
  }, [contacts, searchTerm, stageFilter, sourceFilter, industryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Database</h1>
          <p className="text-gray-600 mt-1">Manage and organize all your business contacts</p>
        </div>
        <div className="flex space-x-2">
          <Button type="button" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); setShowImportDataModal(true); }}>
            <Upload className="mr-2 h-4 w-4" />
            Import Data
          </Button>
          <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); setShowAddLeadModal(true); }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
          <Button type="button" onClick={(e) => { e.preventDefault(); setShowAddLeadModal(true); }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage} className="capitalize">
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {sources.map(source => (
                  <SelectItem key={source} value={source} className="capitalize">
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue="name">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="created">Created Date</SelectItem>
              <SelectItem value="updated">Last Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContacts.map((contact, index) => (
          <ContactCard 
            key={`${contact.id}-${index}`} 
            contact={contact}
          />
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button type="button" onClick={(e) => { e.preventDefault(); setShowAddLeadModal(true); }}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Contact
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <AddNewLeadModal 
        isOpen={showAddLeadModal}
        onClose={() => setShowAddLeadModal(false)}
        onLeadAdded={handleContactAdded}
      />
      
      <ImportDataModal 
        isOpen={showImportDataModal}
        onClose={() => setShowImportDataModal(false)}
      />
    </div>
  );
}