"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projectsList } from "@/lib/data/projectsData";
import {
  ArrowLeft,
  GraduationCap,
  Play,
  BookOpen,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle,
  Download,
  Video,
  FileText,
  Headphones
} from "lucide-react";

const trainingPrograms = [
  {
    id: "course-001",
    title: "Customer Analytics Fundamentals",
    description: "Learn the basics of customer data analysis and visualization",
    category: "Analytics",
    level: "Beginner",
    duration: "4 weeks",
    enrolled: 24,
    rating: 4.8,
    progress: 65,
    instructor: "Dr. Sarah Chen",
    format: "video",
    status: "in_progress"
  },
  {
    id: "course-002",
    title: "Advanced Data Pipeline Engineering",
    description: "Master complex data pipeline architectures and optimization",
    category: "Engineering",
    level: "Advanced",
    duration: "8 weeks",
    enrolled: 12,
    rating: 4.9,
    progress: 30,
    instructor: "Mike Rodriguez",
    format: "video",
    status: "in_progress"
  },
  {
    id: "course-003",
    title: "Machine Learning Operations",
    description: "Deploy and monitor ML models in production environments",
    category: "ML/AI",
    level: "Intermediate",
    duration: "6 weeks",
    enrolled: 18,
    rating: 4.7,
    progress: 85,
    instructor: "Alex Kim",
    format: "hands-on",
    status: "completed"
  },
  {
    id: "course-004",
    title: "Customer Segmentation Strategies",
    description: "Advanced techniques for customer segmentation and targeting",
    category: "Marketing",
    level: "Intermediate",
    duration: "5 weeks",
    enrolled: 31,
    rating: 4.6,
    progress: 0,
    instructor: "Emma Watson",
    format: "workshop",
    status: "not_started"
  }
];

const certifications = [
  {
    id: "cert-001",
    title: "CDP Certified Analyst",
    description: "Professional certification for customer data platform analysis",
    requirements: ["Complete 3 analytics courses", "Pass final exam", "Submit capstone project"],
    progress: 70,
    status: "in_progress",
    badge: "/api/placeholder/60/60"
  },
  {
    id: "cert-002",
    title: "Data Engineering Specialist",
    description: "Advanced certification for data pipeline engineering",
    requirements: ["Complete 2 engineering courses", "Build production pipeline", "Peer review"],
    progress: 25,
    status: "in_progress",
    badge: "/api/placeholder/60/60"
  }
];

interface TuitionClientProps {
  params: {
    projectId: string;
  };
}

export default function TuitionClient({ params }: TuitionClientProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const project = projectsList.find(p => p.id === params.projectId);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const filteredPrograms = trainingPrograms.filter(program => {
    const categoryMatch = selectedCategory === "all" || program.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || program.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in_progress": return "bg-blue-500";
      case "not_started": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "not_started": return "Not Started";
      default: return "Unknown";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "video": return <Video className="w-4 h-4" />;
      case "hands-on": return <FileText className="w-4 h-4" />;
      case "workshop": return <Headphones className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/projects/${params.projectId}`)}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Project
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-blue-600" />
                Training & Certification
              </h1>
              <p className="text-muted-foreground">
                Enhance your skills with {project.name} training programs
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="programs" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Training Programs
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      className="border rounded-md px-3 py-2 text-sm"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="Analytics">Analytics</option>
                      <option value="Engineering">Engineering</option>
                      <option value="ML/AI">ML/AI</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <select
                      className="border rounded-md px-3 py-2 text-sm"
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Programs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <Card key={program.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <Badge variant="outline" className="w-fit">
                          {program.category}
                        </Badge>
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getFormatIcon(program.format)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {program.description}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {program.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {program.enrolled} enrolled
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Level: {program.level}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {program.rating}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{program.progress}%</span>
                      </div>
                      <Progress value={program.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(program.status)} text-white`}
                      >
                        {getStatusText(program.status)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        by {program.instructor}
                      </span>
                    </div>

                    <div className="pt-2">
                      {program.status === "not_started" ? (
                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Start Course
                        </Button>
                      ) : program.status === "in_progress" ? (
                        <Button className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id}>
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Requirements:</h4>
                      <ul className="space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      Continue Certification
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}