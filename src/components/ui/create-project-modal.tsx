"use client";

import type React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus,
  FolderOpen,
  Users,
  Calendar,
  Target,
  DollarSign,
  Tag,
  Settings,
  Rocket,
  Building2,
  ShoppingCart,
  CreditCard,
  Database,
  Code2,
  Brain,
  Shield,
  Smartphone,
  Globe,
  X,
  Check
} from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    name: string;
    description: string;
    category: string;
    priority: string;
    budget: number;
    timeline: string;
    tags: string[];
    team: string[];
    services: string[];
    template?: string;
  }) => void;
}

const projectTemplates = [
  {
    id: 'cdp',
    name: 'Customer Data Platform',
    description: 'Comprehensive CDP with analytics, automation, and data management',
    icon: Database,
    category: 'CDP',
    services: [
      'Customer Analytics',
      'Marketing Automation',
      'Data Integration',
      'Segmentation',
      'Personalization',
      'Journey Mapping'
    ],
    estimatedTimeline: '6-12 months',
    budgetRange: '$100K - $500K',
    complexity: 'High',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    description: 'Complete banking platform with loans, cards, and insurance',
    icon: Building2,
    category: 'Banking',
    services: [
      'Account Management',
      'Loan Processing',
      'Credit Card Services',
      'Insurance Products',
      'Investment Services',
      'Digital Banking'
    ],
    estimatedTimeline: '8-15 months',
    budgetRange: '$200K - $1M+',
    complexity: 'Very High',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Platform',
    description: 'Full-featured online shopping platform with payments and inventory',
    icon: ShoppingCart,
    category: 'E-commerce',
    services: [
      'Product Catalog',
      'Shopping Cart',
      'Payment Gateway',
      'Order Management',
      'Inventory System',
      'Customer Support'
    ],
    estimatedTimeline: '4-8 months',
    budgetRange: '$50K - $250K',
    complexity: 'Medium',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'fintech',
    name: 'FinTech Application',
    description: 'Digital financial services and payment solutions',
    icon: CreditCard,
    category: 'FinTech',
    services: [
      'Payment Processing',
      'Digital Wallet',
      'Peer-to-Peer Transfers',
      'Cryptocurrency Support',
      'Financial Analytics',
      'Compliance Management'
    ],
    estimatedTimeline: '6-10 months',
    budgetRange: '$150K - $750K',
    complexity: 'High',
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  {
    id: 'custom',
    name: 'Custom Project',
    description: 'Start from scratch with your own requirements',
    icon: Settings,
    category: 'Custom',
    services: [],
    estimatedTimeline: 'Variable',
    budgetRange: 'Variable',
    complexity: 'Variable',
    color: 'bg-gray-100 text-gray-700 border-gray-200'
  }
];

const availableServices = [
  'Customer Analytics', 'Marketing Automation', 'Data Integration', 'Segmentation',
  'Personalization', 'Journey Mapping', 'Account Management', 'Loan Processing',
  'Credit Card Services', 'Insurance Products', 'Investment Services', 'Digital Banking',
  'Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management',
  'Inventory System', 'Customer Support', 'Payment Processing', 'Digital Wallet',
  'Peer-to-Peer Transfers', 'Cryptocurrency Support', 'Financial Analytics',
  'Compliance Management', 'Mobile Development', 'Web Development', 'API Development',
  'DevOps Services', 'Quality Assurance', 'Data Science', 'AI/ML Services',
  'Security Services', 'Cloud Infrastructure', 'Business Intelligence'
];

const teamMembers = [
  { id: 'pm1', name: 'Sarah Johnson', role: 'Project Manager', avatar: 'SJ' },
  { id: 'dev1', name: 'Mike Chen', role: 'Senior Developer', avatar: 'MC' },
  { id: 'des1', name: 'Emily Davis', role: 'Lead Designer', avatar: 'ED' },
  { id: 'data1', name: 'Alex Rodriguez', role: 'Data Engineer', avatar: 'AR' },
  { id: 'sec1', name: 'David Kim', role: 'Security Specialist', avatar: 'DK' },
  { id: 'qa1', name: 'Lisa Zhang', role: 'QA Engineer', avatar: 'LZ' }
];

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [budget, setBudget] = useState<number>(0);
  const [timeline, setTimeline] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const selectedTemplateData = projectTemplates.find(t => t.id === selectedTemplate);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = projectTemplates.find(t => t.id === templateId);
    if (template && template.id !== 'custom') {
      setProjectName(template.name + ' Project');
      setDescription(template.description);
      setCategory(template.category);
      setSelectedServices(template.services);
      setTags([template.category, template.complexity]);
    } else {
      // Clear form for custom template
      setProjectName('');
      setDescription('');
      setCategory('');
      setSelectedServices([]);
      setTags([]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTeamMemberToggle = (memberId: string) => {
    setSelectedTeam(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    const projectData = {
      name: projectName,
      description,
      category,
      priority,
      budget,
      timeline,
      tags,
      team: selectedTeam,
      services: selectedServices,
      template: selectedTemplate
    };

    onSubmit(projectData);
    
    // Reset form
    setActiveTab("template");
    setSelectedTemplate('');
    setProjectName('');
    setDescription('');
    setCategory('');
    setPriority('medium');
    setBudget(0);
    setTimeline('');
    setTags([]);
    setSelectedTeam([]);
    setSelectedServices([]);
  };

  const isFormValid = projectName.trim() && description.trim() && category && selectedTemplate;

  const getPriorityColor = (priorityLevel: string) => {
    switch (priorityLevel) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Very High': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-blue-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="template">1. Choose Template</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedTemplate}>2. Project Details</TabsTrigger>
            <TabsTrigger value="team" disabled={!selectedTemplate}>3. Team & Services</TabsTrigger>
            <TabsTrigger value="review" disabled={!isFormValid}>4. Review & Create</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Project Template</CardTitle>
                <CardDescription>
                  Choose a template that best matches your project requirements. You can customize it in the next steps.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projectTemplates.map((template) => {
                    const IconComponent = template.icon;
                    return (
                      <div
                        key={template.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate === template.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          {selectedTemplate === template.id && (
                            <div className="p-1 bg-blue-600 rounded-full">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Timeline:</span>
                            <span className="font-medium">{template.estimatedTimeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Budget Range:</span>
                            <span className="font-medium">{template.budgetRange}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Complexity:</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getComplexityColor(template.complexity)} border-current`}
                            >
                              {template.complexity}
                            </Badge>
                          </div>
                        </div>

                        {template.services.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-500 mb-2">Included Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {template.services.slice(0, 3).map((service) => (
                                <Badge key={service} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                              {template.services.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.services.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter project name..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your project goals and requirements..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CDP">Customer Data Platform</SelectItem>
                            <SelectItem value="Banking">Banking & Finance</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="FinTech">FinTech</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Education">Education</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="Custom">Custom/Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={priority} onValueChange={setPriority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="low">Low Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Planning</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (USD)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          placeholder="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timeline">Expected Timeline</Label>
                        <Select value={timeline} onValueChange={setTimeline}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3 months">1-3 months</SelectItem>
                            <SelectItem value="3-6 months">3-6 months</SelectItem>
                            <SelectItem value="6-12 months">6-12 months</SelectItem>
                            <SelectItem value="1+ years">1+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Project Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="flex items-center gap-1">
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTag}>
                          <Tag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {selectedTemplateData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <selectedTemplateData.icon className="w-5 h-5" />
                        Template Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{selectedTemplateData.description}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <Badge className={selectedTemplateData.color}>
                            {selectedTemplateData.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Timeline:</span>
                          <span className="font-medium">{selectedTemplateData.estimatedTimeline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Budget:</span>
                          <span className="font-medium">{selectedTemplateData.budgetRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Complexity:</span>
                          <span className={`font-medium ${getComplexityColor(selectedTemplateData.complexity)}`}>
                            {selectedTemplateData.complexity}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Current Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <Badge className={getPriorityColor(priority)}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Budget:</span>
                      <span className="font-medium">
                        {budget > 0 ? `$${budget.toLocaleString()}` : 'Not set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Timeline:</span>
                      <span className="font-medium">{timeline || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tags:</span>
                      <span className="font-medium">{tags.length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Team Members</CardTitle>
                  <CardDescription>Choose team members who will work on this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={member.id}
                          checked={selectedTeam.includes(member.id)}
                          onCheckedChange={() => handleTeamMemberToggle(member.id)}
                        />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Services</CardTitle>
                  <CardDescription>Choose the services and features for your project</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {availableServices.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                        />
                        <Label htmlFor={service} className="text-sm cursor-pointer">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Project Configuration</CardTitle>
                <CardDescription>Review all settings before creating your project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Project Name:</span>
                          <span className="font-medium">{projectName || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span className="font-medium">{category || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Priority:</span>
                          <Badge className={getPriorityColor(priority)}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Template:</span>
                          <span className="font-medium">
                            {selectedTemplateData?.name || 'Not selected'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Project Planning</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Budget:</span>
                          <span className="font-medium">
                            {budget > 0 ? `$${budget.toLocaleString()}` : 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Timeline:</span>
                          <span className="font-medium">{timeline || 'Not set'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Team Members ({selectedTeam.length})</h4>
                      <div className="space-y-2">
                        {selectedTeam.map((memberId) => {
                          const member = teamMembers.find(m => m.id === memberId);
                          return member ? (
                            <div key={member.id} className="flex items-center space-x-2 text-sm">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-xs">
                                {member.avatar}
                              </div>
                              <span>{member.name}</span>
                              <span className="text-gray-500">- {member.role}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Services ({selectedServices.length})</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedServices.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-blue-600 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Ready to Create</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your project configuration is complete. Click "Create Project" to get started.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {activeTab !== "template" && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ["template", "details", "team", "review"];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
              >
                Previous
              </Button>
            )}
            {activeTab !== "review" ? (
              <Button
                onClick={() => {
                  const tabs = ["template", "details", "team", "review"];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
                disabled={activeTab === "template" && !selectedTemplate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="bg-green-600 hover:bg-green-700"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};