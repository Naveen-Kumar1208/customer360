"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { Navbar } from "./Navbar";
import { FloatingAIButton } from "@/components/ai-agent/FloatingAIButton";
import { useAuth } from "@/app/authContext";

interface ProtectedDashboardLayoutProps {
  children: ReactNode;
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f6f8fb]">
      <svg className="animate-spin h-12 w-12 text-blue-500 mb-3" viewBox="0 0 24 24">
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-blue-700 font-medium">Loading...</span>
    </div>
  );
}

export function ProtectedDashboardLayout({ children }: ProtectedDashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle authentication and redirects only on client-side
  useEffect(() => {
    if (isMounted && !isLoading) {
      // Add additional check to ensure auth state has been properly restored
      // Only redirect if genuinely not authenticated (no stored token) to prevent race condition
      if (!isAuthenticated && pathname !== "/signin" && 
          typeof window !== 'undefined' && !window.localStorage.getItem("authToken")) {
        // Preserve the current path by passing it as a redirect parameter
        const redirectParam = encodeURIComponent(pathname);
        router.replace(`/signin?redirect=${redirectParam}`);
        return;
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, isMounted]);

  // Use appropriate sidebar based on user role
  const getSidebarComponent = () => {
    // During SSR/SSG, always render admin sidebar for consistency
    // During client-side loading, also default to admin sidebar
    if (!isMounted || isLoading || !user) {
      return Sidebar; // Default to admin sidebar
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
  
  // For static generation: always render the layout with content
  // For client-side: show loading only after mount if needed
  const shouldShowLoading = isMounted && (isLoading || (!isAuthenticated && pathname !== "/signin"));
  
  if (shouldShowLoading) {
    return <LoadingSpinner />;
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