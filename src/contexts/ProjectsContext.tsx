"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { projectsList } from '@/lib/data/projectsData';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  createdDate: string;
  lastUpdated: string;
  automationsCount: number;
  segmentsCount: number;
  activeCustomers: number;
  conversionRate: number;
  category: string;
  tags: string[];
  budget?: number;
  timeline?: string;
  team?: string[];
  services?: string[];
  template?: string;
}

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  getProject: (id: string) => Project | undefined;
  updateProject: (id: string, updates: Partial<Project>) => void;
  clearDynamicProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

interface ProjectsProviderProps {
  children: ReactNode;
}

const PROJECTS_STORAGE_KEY = 'customer360_projects';
const PROJECTS_VERSION_KEY = 'customer360_projects_version';
const CURRENT_VERSION = '1.0';

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [projects, setProjects] = useState<Project[]>(projectsList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  // Track mount state for hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load projects from localStorage on mount
  useEffect(() => {
    if (!isMounted) return;

    if (!isLocalStorageAvailable()) {
      console.warn('localStorage is not available, using default projects only');
      setProjects(projectsList);
      setIsLoaded(true);
      return;
    }

    try {
      const storedVersion = localStorage.getItem(PROJECTS_VERSION_KEY);
      const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
      
      if (storedVersion === CURRENT_VERSION && storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        
        // Validate that parsedProjects is an array
        if (Array.isArray(parsedProjects)) {
          // Merge stored projects with default projects, avoiding duplicates
          const existingIds = new Set(projectsList.map(p => p.id));
          const newProjects = parsedProjects.filter((p: Project) => 
            p && typeof p === 'object' && p.id && !existingIds.has(p.id)
          );
          
          setProjects([...newProjects, ...projectsList]);
        } else {
          throw new Error('Invalid projects data in localStorage');
        }
      } else {
        // Version mismatch or no stored data, use default projects
        localStorage.setItem(PROJECTS_VERSION_KEY, CURRENT_VERSION);
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([]));
        setProjects(projectsList);
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      // Fallback to default projects and clear potentially corrupted data
      setProjects(projectsList);
      try {
        localStorage.removeItem(PROJECTS_STORAGE_KEY);
        localStorage.setItem(PROJECTS_VERSION_KEY, CURRENT_VERSION);
      } catch {
        // Ignore localStorage errors in fallback
      }
    }
    setIsLoaded(true);
  }, [isMounted]);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (isLoaded && isLocalStorageAvailable()) {
      try {
        // Only save the dynamically created projects (not the default ones)
        const existingIds = new Set(projectsList.map(p => p.id));
        const newProjects = projects.filter(p => !existingIds.has(p.id));
        
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(newProjects));
        localStorage.setItem(PROJECTS_VERSION_KEY, CURRENT_VERSION);
      } catch (error) {
        console.error('Error saving projects to localStorage:', error);
      }
    }
  }, [projects, isLoaded]);

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    );
  };

  const clearDynamicProjects = () => {
    setProjects(projectsList);
    if (isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(PROJECTS_STORAGE_KEY);
        localStorage.setItem(PROJECTS_VERSION_KEY, CURRENT_VERSION);
      } catch (error) {
        console.error('Error clearing projects from localStorage:', error);
      }
    }
  };

  // For static export: always render children, only show loading after mount if needed
  // Don't show loading screen during static generation
  if (isMounted && !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <ProjectsContext.Provider value={{
      projects,
      addProject,
      getProject,
      updateProject,
      clearDynamicProjects
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}