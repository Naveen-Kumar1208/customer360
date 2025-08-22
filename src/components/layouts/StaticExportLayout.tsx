"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { AgentSidebar } from "./AgentSidebar";
import { Navbar } from "./Navbar";
import { FloatingAIButton } from "@/components/ai-agent/FloatingAIButton";
import { useAuth } from "@/app/authContext";

interface StaticExportLayoutProps {
  children: ReactNode;
}

export function StaticExportLayout({ children }: StaticExportLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [showAuthCheck, setShowAuthCheck] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Track mount state for hydration safety
  useEffect(() => {
    setIsMounted(true);
    // Delay auth check to prevent SSG issues
    const timer = setTimeout(() => {
      setShowAuthCheck(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle authentication and redirects only after component mounts and auth check is enabled
  useEffect(() => {
    if (isMounted && showAuthCheck && !isLoading) {
      // Add additional check to ensure auth state has been properly restored
      // Only redirect if genuinely not authenticated (no stored token) to prevent race condition
      if (!isAuthenticated && pathname !== "/signin" && 
          typeof window !== 'undefined' && !window.localStorage.getItem("authToken")) {
        // Preserve the current path by passing it as a redirect parameter
        const redirectParam = encodeURIComponent(pathname);
        router.replace(`/signin?redirect=${redirectParam}`);
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, isMounted, showAuthCheck]);

  // Determine which sidebar to show
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
  
  // For static export: always render the layout with content
  // Authentication and redirects happen transparently after mount
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f8fb]">
      <SidebarComponent />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <Navbar username={isMounted && user ? (user.name || user.email) : "User"} />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Always show content during static generation */}
          {/* Only show loading/redirect UI after mount and when actually needed */}
          {isMounted && showAuthCheck && isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                <p>Loading...</p>
              </div>
            </div>
          ) : isMounted && showAuthCheck && !isAuthenticated && pathname !== "/signin" ? (
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