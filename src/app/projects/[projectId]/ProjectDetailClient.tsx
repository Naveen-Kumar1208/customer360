"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projectServices } from "@/lib/data/projectsData";
import { useProjects } from "@/contexts/ProjectsContext";
import {
  ArrowLeft,
  Users,
  Calendar,
  DollarSign,
  Target,
  ArrowRight,
  Database,
  Workflow,
  BarChart3,
  Mail,
  Rocket,
  Code2,
  Laptop,
  Zap,
  Headphones,
  Brain,
  Building2,
  CheckCircle,
  GitBranch,
  RefreshCw,
  Server,
  CreditCard,
  Shield,
  PiggyBank,
  TrendingUp,
  Smartphone,
  Globe,
  Briefcase,
  Package,
  ShoppingCart,
  Package2,
  UserCheck,
  Megaphone,
  BarChart,
  Truck,
  Star
} from "lucide-react";

interface ProjectDetailClientProps {
  projectId: string;
}

export default function ProjectDetailClient({ projectId }: ProjectDetailClientProps) {
  const router = useRouter();
  const { getProject } = useProjects();
  const project = getProject(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold text-muted-foreground">Project Not Found</h1>
        <Button 
          className="mt-4" 
          onClick={() => router.push('/projects')}
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800 border-green-200" },
      planning: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      draft: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      paused: { color: "bg-gray-100 text-gray-800 border-gray-200" },
      completed: { color: "bg-blue-100 text-blue-800 border-blue-200" }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <Badge className={config.color}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { color: "bg-red-100 text-red-800 border-red-200" },
      medium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      low: { color: "bg-green-100 text-green-800 border-green-200" }
    };
    
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <Badge className={config.color}>
        {priority}
      </Badge>
    );
  };

  const getServiceCardColor = (color: string) => {
    const colorMap = {
      blue: "border-blue-200 hover:border-blue-300 hover:bg-blue-50",
      green: "border-green-200 hover:border-green-300 hover:bg-green-50",
      purple: "border-purple-200 hover:border-purple-300 hover:bg-purple-50",
      orange: "border-orange-200 hover:border-orange-300 hover:bg-orange-50",
      indigo: "border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50",
      red: "border-red-200 hover:border-red-300 hover:bg-red-50",
      pink: "border-pink-200 hover:border-pink-300 hover:bg-pink-50",
      cyan: "border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50",
      emerald: "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50",
      violet: "border-violet-200 hover:border-violet-300 hover:bg-violet-50",
      amber: "border-amber-200 hover:border-amber-300 hover:bg-amber-50",
      lime: "border-lime-200 hover:border-lime-300 hover:bg-lime-50",
      rose: "border-rose-200 hover:border-rose-300 hover:bg-rose-50"
    };
    return colorMap[color] || "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
  };

  const getServiceIconColor = (color: string) => {
    const colorMap = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      indigo: "text-indigo-600",
      red: "text-red-600",
      pink: "text-pink-600",
      cyan: "text-cyan-600",
      emerald: "text-emerald-600",
      violet: "text-violet-600",
      amber: "text-amber-600",
      lime: "text-lime-600",
      rose: "text-rose-600"
    };
    return colorMap[color] || "text-gray-600";
  };

  const getServiceIcon = (iconName: string) => {
    const iconMap = {
      Database: Database,
      Workflow: Workflow,
      Users: Users,
      BarChart3: BarChart3,
      Target: Target,
      Mail: Mail,
      Rocket: Rocket,
      Code2: Code2,
      Laptop: Laptop,
      Zap: Zap,
      Headphones: Headphones,
      Brain: Brain,
      Building2: Building2,
      CheckCircle: CheckCircle,
      GitBranch: GitBranch,
      RefreshCw: RefreshCw,
      Server: Server,
      DollarSign: DollarSign,
      CreditCard: CreditCard,
      Shield: Shield,
      PiggyBank: PiggyBank,
      TrendingUp: TrendingUp,
      Smartphone: Smartphone,
      Globe: Globe,
      Briefcase: Briefcase,
      Package: Package,
      ShoppingCart: ShoppingCart,
      Package2: Package2,
      UserCheck: UserCheck,
      Megaphone: Megaphone,
      BarChart: BarChart,
      Truck: Truck,
      Star: Star
    };
    return iconMap[iconName] || Database;
  };

  const handleServiceClick = (serviceId: string) => {
    router.push(`/projects/${projectId}/${serviceId}`);
  };

  // Get services for the project - either from projectServices data or from project's services list
  const getProjectServices = () => {
    // First try to get services from the static data
    const staticServices = projectServices[projectId];
    if (staticServices) {
      return staticServices;
    }

    // If no static services, create dynamic services from project's services list
    if (project?.services && project.services.length > 0) {
      return project.services.map((serviceName, index) => ({
        id: `${projectId}-SRV-${String(index + 1).padStart(3, '0')}`,
        name: serviceName,
        description: `${serviceName} service for ${project.name}`,
        icon: getIconForService(serviceName),
        color: getColorForService(serviceName)
      }));
    }

    return [];
  };

  // Helper function to get icon based on service name
  const getIconForService = (serviceName: string) => {
    const serviceIconMap = {
      'Customer Analytics': 'BarChart3',
      'Marketing Automation': 'Mail',
      'Data Integration': 'Database',
      'Segmentation': 'Users',
      'Personalization': 'Target',
      'Journey Mapping': 'Workflow',
      'Account Management': 'Building2',
      'Loan Processing': 'DollarSign',
      'Credit Card Services': 'CreditCard',
      'Insurance Products': 'Shield',
      'Investment Services': 'TrendingUp',
      'Digital Banking': 'Smartphone',
      'Product Catalog': 'Package',
      'Shopping Cart': 'ShoppingCart',
      'Payment Gateway': 'CreditCard',
      'Order Management': 'Package2',
      'Inventory System': 'Database',
      'Customer Support': 'Headphones',
      'Payment Processing': 'CreditCard',
      'Digital Wallet': 'Smartphone',
      'Peer-to-Peer Transfers': 'Users',
      'Cryptocurrency Support': 'Globe',
      'Financial Analytics': 'BarChart3',
      'Compliance Management': 'Shield'
    };
    return serviceIconMap[serviceName] || 'Database';
  };

  // Helper function to get color based on service name
  const getColorForService = (serviceName: string) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'indigo', 'red', 'pink', 'cyan'];
    const hash = serviceName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/projects')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>

      {/* Project Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getStatusBadge(project.status)}
                {getPriorityBadge(project.priority)}
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="flex items-center gap-1 mt-1">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium">{project.createdDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{project.lastUpdated}</p>
                </div>
              </div>
              {project.budget && project.budget > 0 && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">${project.budget.toLocaleString()}</p>
                  </div>
                </div>
              )}
              {project.timeline && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-medium">{project.timeline}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Conversion Rate</p>
                  <p className="font-medium">{project.conversionRate}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Active Customers</p>
                  <p className="font-medium">{project.activeCustomers.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Automations</p>
                  <p className="font-medium">{project.automationsCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Segments</p>
                  <p className="font-medium">{project.segmentsCount}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Section */}
      {project.team && project.team.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {project.team.map((memberId, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                    {memberId.includes('pm') ? 'PM' : 
                     memberId.includes('dev') ? 'DEV' : 
                     memberId.includes('des') ? 'DES' : 
                     memberId.includes('data') ? 'DA' :
                     memberId.includes('sec') ? 'SEC' :
                     memberId.includes('qa') ? 'QA' : 
                     memberId.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {memberId.includes('pm1') ? 'Sarah Johnson' :
                       memberId.includes('dev1') ? 'Mike Chen' :
                       memberId.includes('des1') ? 'Emily Davis' :
                       memberId.includes('data1') ? 'Alex Rodriguez' :
                       memberId.includes('sec1') ? 'David Kim' :
                       memberId.includes('qa1') ? 'Lisa Zhang' :
                       'Team Member'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {memberId.includes('pm') ? 'Project Manager' :
                       memberId.includes('dev') ? 'Senior Developer' :
                       memberId.includes('des') ? 'Lead Designer' :
                       memberId.includes('data') ? 'Data Engineer' :
                       memberId.includes('sec') ? 'Security Specialist' :
                       memberId.includes('qa') ? 'QA Engineer' :
                       'Team Member'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Services */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Available Services</h2>
        <p className="text-muted-foreground mb-6">
          Select a service to access its features and functionalities
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getProjectServices().map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer transition-all duration-200 ${getServiceCardColor(service.color)} h-full`}
                onClick={() => handleServiceClick(service.id)}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg bg-white border ${getServiceIconColor(service.color)} flex-shrink-0`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm leading-tight break-words">
                            {service.name}
                          </h3>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(service.id);
                      }}
                    >
                      <span className="text-sm">Access Service</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}