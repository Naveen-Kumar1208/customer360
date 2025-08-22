"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { Navbar } from "./Navbar";
import { FloatingAIButton } from "@/components/ai-agent/FloatingAIButton";
import { useAuth } from "@/app/authContext";

interface StaticSafeDashboardLayoutProps {
  children: ReactNode;
}

export function StaticSafeDashboardLayout({ children }: StaticSafeDashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Track mount state for hydration safety
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle authentication and redirects only after component mounts
  useEffect(() => {
    if (isMounted && !isLoading) {
      // Add additional check to ensure auth state has been properly restored
      // Only redirect if genuinely not authenticated (no stored token) to prevent race condition
      if (!isAuthenticated && pathname !== "/signin" && 
          typeof window !== 'undefined' && !window.localStorage.getItem("authToken")) {
        // Preserve the current path by passing it as a redirect parameter
        const redirectParam = encodeURIComponent(pathname);
        router.replace(`/signin?redirect=${redirectParam}`);
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, isMounted]);

  // Determine which sidebar to show
  // For static generation: always show admin sidebar
  // For client after mount: show appropriate sidebar based on user role
  const getSidebarComponent = () => {
    if (isMounted && user) {
      switch (user.role) {
        case 'agent':
          return AgentSidebar;
        default:
          return Sidebar;
      }
    }
    // Default for static generation and before authentication loads
    return Sidebar;
  };
  
  const SidebarComponent = getSidebarComponent();
  
  // Always render the layout - authentication happens transparently
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8fb]">
      <SidebarComponent />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <Navbar username={isMounted && user ? (user.name || user.email) : "User"} />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Show loading only if we're mounted, loading, and need to redirect */}
          {isMounted && isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p>Loading...</p>
              </div>
            </div>
          ) : isMounted && !isAuthenticated && pathname !== "/signin" ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p>Redirecting to sign in...</p>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      <FloatingAIButton />
    </div>
  );
}