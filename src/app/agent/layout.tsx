"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AuthGuard } from "@/app/authGuard";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  // Redirect non-agent users to appropriate dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === 'organization' || user.role === 'admin') {
        router.replace('/');
      } else if (user.role === 'investor') {
        router.replace('/investor/dashboard');
      }
    }
  }, [user, isAuthenticated, isLoading, router]);
  
  // Show loading if redirecting
  if (!isLoading && isAuthenticated && user && user.role !== 'agent') {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f6f8fb]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }
  
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}