"use client";
import { useAuth } from "@/app/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

function Spinner() {
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

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after loading is complete
    // Add additional check to ensure auth state has been properly restored
    // Only redirect if genuinely not authenticated (no stored token) to prevent race condition
    if (!isLoading && !isAuthenticated && pathname !== "/signin" && 
        typeof window !== 'undefined' && !window.localStorage.getItem("authToken")) {
      // Preserve the current path by passing it as a redirect parameter
      const redirectParam = encodeURIComponent(pathname);
      router.replace(`/signin?redirect=${redirectParam}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // If still loading auth state, show spinner
  if (isLoading) {
    return <Spinner />;
  }

  // If not authenticated and not on signin page, show spinner while redirecting
  if (!isAuthenticated && pathname !== "/signin") {
    return <Spinner />;
  }

  return <>{children}</>;
}
