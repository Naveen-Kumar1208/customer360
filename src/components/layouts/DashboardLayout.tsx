"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { Navbar } from "./Navbar";
import { FloatingAIButton } from "@/components/ai-agent/FloatingAIButton";
import { useAuth } from "@/app/authContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Handle authentication and redirects
  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated && pathname !== "/signin") {
      const redirectParam = encodeURIComponent(pathname);
      router.replace(`/signin?redirect=${redirectParam}`);
    }
  }, [isAuthenticated, isLoading, pathname, router, isMounted]);
  
  // Use appropriate sidebar based on user role
  const getSidebarComponent = () => {
    // Only determine sidebar after mount and auth is complete
    if (!isMounted || isLoading || !isAuthenticated || !user) {
      // Don't render any specific sidebar during loading
      return null;
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
  
  // Show loading state during auth initialization
  if (!isMounted || isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f6f8fb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  const SidebarComponent = getSidebarComponent();
  
  // If no sidebar component determined, still loading
  if (!SidebarComponent) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f6f8fb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Loading...</p>
        </div>
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
