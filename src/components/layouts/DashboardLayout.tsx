"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { Navbar } from "./Navbar";
import { FloatingAIButton } from "@/components/ai-agent/FloatingAIButton";
import { useAuth } from "@/app/authContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Use appropriate sidebar based on user role with explicit handling
  const getSidebarComponent = () => {
    // During SSR or before mount, always return Sidebar to ensure consistency
    if (!isMounted || isLoading || !user) {
      return Sidebar; // Default to admin sidebar for consistency
    }
    
    switch (user.role) {
      case 'agent':
        return AgentSidebar;
      case 'admin':
      case 'organization':
      case 'user':
      default:
        return Sidebar;
    }
  };
  
  const SidebarComponent = getSidebarComponent();
  
  // Show loading state during auth initialization to prevent flashing
  if (!isMounted || isLoading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#f6f8fb]">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden ml-64">
          <Navbar username="Loading..." />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p>Loading...</p>
              </div>
            </div>
          </main>
        </div>
        <FloatingAIButton />
      </div>
    );
  }
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8fb]">
      <SidebarComponent />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <Navbar username={user?.name || user?.email || "User"} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
      <FloatingAIButton />
    </div>
  );
}
