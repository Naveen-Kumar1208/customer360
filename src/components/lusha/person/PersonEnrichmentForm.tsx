"use client";

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Loader2, Search, User, Building2, Linkedin, Settings } from 'lucide-react';
import type { PersonSearchData, PersonData } from '@/types/lusha';
import { LushaSetupInstructions } from '@/components/lusha/setup/LushaSetupInstructions';

interface PersonEnrichmentFormProps {
  onEnrich?: (data: PersonSearchData) => void;
  loading?: boolean;
  className?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

export function PersonEnrichmentForm({ onEnrich, loading = false, className }: PersonEnrichmentFormProps) {
  const [activeTab, setActiveTab] = useState<'name-company' | 'email' | 'linkedin'>('name-company');
  const [formData, setFormData] = useState<PersonSearchData>({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    linkedinUrl: ''
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<PersonData | null>(null);
  const [rawApiResponse, setRawApiResponse] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [apiConfigError, setApiConfigError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    if (activeTab === 'name-company') {
      if (!formData.firstName?.trim()) {
        newErrors.push({ field: 'firstName', message: 'First name is required' });
      }
      if (!formData.lastName?.trim()) {
        newErrors.push({ field: 'lastName', message: 'Last name is required' });
      }
      if (!formData.company?.trim()) {
        newErrors.push({ field: 'company', message: 'Company is required' });
      }
    } else if (activeTab === 'email') {
      if (!formData.email?.trim()) {
        newErrors.push({ field: 'email', message: 'Email is required' });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.push({ field: 'email', message: 'Please enter a valid email address' });
      }
    } else if (activeTab === 'linkedin') {
      if (!formData.linkedinUrl?.trim()) {
        newErrors.push({ field: 'linkedinUrl', message: 'LinkedIn URL is required' });
      } else if (!formData.linkedinUrl.includes('linkedin.com')) {
        newErrors.push({ field: 'linkedinUrl', message: 'Please enter a valid LinkedIn URL' });
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Prepare the request data for the API
      const requestData: any = {
        contacts: []
      };

      // Build contact based on active tab
      const contactData: any = {
        contactId: `search_${Date.now()}`
      };

      if (activeTab === 'email' && formData.email) {
        contactData.email = formData.email;
      } else if (activeTab === 'linkedin' && formData.linkedinUrl) {
        contactData.linkedinUrl = formData.linkedinUrl;
      } else if (activeTab === 'name-company' && formData.firstName && formData.lastName) {
        contactData.fullName = `${formData.firstName} ${formData.lastName}`;
        if (formData.company) {
          contactData.companies = [{
            name: formData.company,
            isCurrent: true
          }];
        }
      }

      requestData.contacts.push(contactData);

      // Call the API
      const response = await fetch('/api/lusha/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Check if this is an API configuration error
        if (response.status === 500 && errorData.error?.includes('API key not configured')) {
          setApiConfigError(errorData.error);
          return;
        }
        
        throw new Error(errorData.error || 'Failed to enrich person data');
      }

      const data = await response.json();
      
      // Store the raw API response for display
      setRawApiResponse(data);
      
      // Display the response - use the first contact if available
      if (data.data && data.data.length > 0) {
        const enrichedPerson = data.data[0];
        
        // Transform API response to our PersonData format
        const transformedResult: PersonData = {
          id: enrichedPerson.id || `person_${Date.now()}`,
          firstName: enrichedPerson.firstName || formData.firstName || '',
          lastName: enrichedPerson.lastName || formData.lastName || '',
          fullName: enrichedPerson.fullName || `${formData.firstName} ${formData.lastName}`,
          email: enrichedPerson.emails?.map((e: any) => e.email) || [formData.email].filter(Boolean),
          phone: enrichedPerson.phoneNumbers?.map((p: any) => p.number) || [],
          company: enrichedPerson.companies?.[0]?.name || formData.company || '',
          title: enrichedPerson.jobTitle || enrichedPerson.title || '',
          department: enrichedPerson.department || '',
          seniority: enrichedPerson.seniority || '',
          linkedinUrl: enrichedPerson.linkedinUrl || formData.linkedinUrl || '',
          confidence: enrichedPerson.confidence || 85,
          verified: enrichedPerson.verified || false,
          location: enrichedPerson.location || '',
          industry: enrichedPerson.industry || ''
        };

        setSearchResult(transformedResult);
        setShowResult(true);
      } else {
        throw new Error('No person data found in the response');
      }

      if (onEnrich) {
        onEnrich(formData);
      }
    } catch (error) {
      console.error('Person enrichment error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to enrich person data'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  const handleInputChange = (field: keyof PersonSearchData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      linkedinUrl: ''
    });
    setErrors([]);
    setShowResult(false);
    setSearchResult(null);
    setRawApiResponse(null);
    setShowRawResponse(false);
    setApiConfigError(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* API Configuration Error */}
      {apiConfigError && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-800">
              <Settings className="mr-2 h-5 w-5" />
              API Configuration Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{apiConfigError}</span>
              </div>
              <LushaSetupInstructions />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Person Enrichment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="name-company">Name + Company</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn URL</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="name-company" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="e.g., John"
                      value={formData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={getFieldError('firstName') ? 'border-red-500' : ''}
                    />
                    {getFieldError('firstName') && (
                      <div className="flex items-center mt-1 text-sm text-red-600">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        {getFieldError('firstName')}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="e.g., Smith"
                      value={formData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={getFieldError('lastName') ? 'border-red-500' : ''}
                    />
                    {getFieldError('lastName') && (
                      <div className="flex items-center mt-1 text-sm text-red-600">
                        <AlertCircle className="mr-1 h-4 w-4" />
                        {getFieldError('lastName')}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    placeholder="e.g., TechCorp Solutions"
                    value={formData.company || ''}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={getFieldError('company') ? 'border-red-500' : ''}
                  />
                  {getFieldError('company') && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {getFieldError('company')}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g., john.smith@company.com"
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={getFieldError('email') ? 'border-red-500' : ''}
                  />
                  {getFieldError('email') && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {getFieldError('email')}
                    </div>
                  )}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Work emails typically provide better enrichment results than personal emails.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="linkedin" className="space-y-4">
                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile URL *</Label>
                  <Input
                    id="linkedinUrl"
                    placeholder="e.g., https://linkedin.com/in/johnsmith"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    className={getFieldError('linkedinUrl') ? 'border-red-500' : ''}
                  />
                  {getFieldError('linkedinUrl') && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      {getFieldError('linkedinUrl')}
                    </div>
                  )}
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Pro Tip:</strong> LinkedIn URLs often provide the most comprehensive enrichment data.
                  </p>
                </div>
              </TabsContent>

              <div className="flex space-x-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isLoading || loading}
                  className="flex-1"
                >
                  {isLoading || loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enriching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Enrich Contact
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Reset
                </Button>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Result */}
      {showResult && searchResult && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="mr-2 h-5 w-5" />
              Enrichment Successful
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                  {searchResult.firstName.charAt(0)}{searchResult.lastName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {searchResult.firstName} {searchResult.lastName}
                  </h3>
                  <p className="text-gray-600">{searchResult.title}</p>
                  <p className="text-gray-500">{searchResult.company}</p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={`${searchResult.confidence >= 90 ? 'bg-green-100 text-green-800' : 
                      searchResult.confidence >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                      {searchResult.confidence}% Confidence
                    </Badge>
                    {searchResult.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information</h4>
                  {searchResult.email.length > 0 ? searchResult.email.map((email, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Email:</span>
                      <span>{email}</span>
                    </div>
                  )) : (
                    <div className="text-sm text-gray-500">No email found</div>
                  )}
                  {searchResult.phone.length > 0 ? searchResult.phone.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Phone:</span>
                      <span>{phone}</span>
                    </div>
                  )) : (
                    <div className="text-sm text-gray-500">No phone found</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Professional Details</h4>
                  {searchResult.department && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Department:</span>
                      <span>{searchResult.department}</span>
                    </div>
                  )}
                  {searchResult.seniority && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Seniority:</span>
                      <span>{searchResult.seniority}</span>
                    </div>
                  )}
                  {searchResult.location && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span>{searchResult.location}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Additional Info</h4>
                  {searchResult.industry && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Industry:</span>
                      <span>{searchResult.industry}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Data Source:</span>
                    <span>Lusha API</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-600">Retrieved:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button size="sm" className="flex-1">
                  Add to CRM
                </Button>
                <Button size="sm" variant="outline">
                  Export Data
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setShowRawResponse(!showRawResponse)}
                >
                  {showRawResponse ? 'Hide' : 'Show'} Raw Response
                </Button>
                {searchResult.linkedinUrl && (
                  <Button size="sm" variant="outline">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                )}
              </div>
              
              {/* Raw API Response Display */}
              {showRawResponse && rawApiResponse && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Raw API Response</h4>
                  <pre className="text-xs text-gray-700 bg-white p-3 rounded border overflow-auto max-h-96">
                    {JSON.stringify(rawApiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PersonEnrichmentForm;