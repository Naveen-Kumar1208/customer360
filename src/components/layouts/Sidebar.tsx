"use client";

import type React from "react";
import { useMemo, useCallback, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Users,
  LogOut,
  Target,
  Workflow,
  Plug,
  Database,
  FolderOpen,
  UserCircle,
  GitBranch,
  Activity,
  Shield,
  Eye,
  Banknote,
  CreditCard,
  TrendingUp,
  UserCheck,
  Zap,
  RefreshCw,
  Brain,
  Calendar,
  Gem,
  ArrowLeft,
  Route,
  PieChart,
  AlertTriangle,
  Settings,
  TrendingDown,
  Bot,
  Clock,
  Layers,
  Lock
} from "lucide-react";
import { useAuth } from "@/app/authContext";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}


const sidebarRoutes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Portfolio Dashboard", icon: PieChart, href: "/investor/dashboard", roles: ["investor"] },
  { label: "Projects", icon: FolderOpen, href: "/projects", roles: ["investor", "organization", "agent"] },
  { label: "Customers", icon: UserCircle, href: "/customers", roles: ["organization", "agent"] },
  { label: "Customer Intelligence", icon: UserCircle, href: "/investor/customers", roles: ["investor"] },
  { label: "Campaign Performance", icon: Target, href: "/investor/campaigns", roles: ["investor"] },
  { label: "Revenue Operations", icon: GitBranch, href: "/investor/funnel", roles: ["investor"] },
  { label: "Visitors", icon: Eye, href: "/visitors" },
  { label: "Journey Analytics", icon: GitBranch, href: "/journey-analytics" },
  { label: "Journey Builder", icon: Route, href: "/journey-builder" },
  { label: "Funnel", icon: Package, href: "/products" },
  { label: "Segments", icon: Users, href: "/segment" },
  { label: "Campaigns", icon: Target, href: "/engagement" },
  { label: "Automation", icon: Workflow, href: "/automation" },
  { label: "Live Events", icon: Activity, href: "/admin/live-events" },
  { label: "Personalization Hub", icon: Zap, href: "/personalization" },
  { label: "AI Campaigns", icon: Brain, href: "/ai-campaign" },
  { label: "Wealth Management", icon: Gem, href: "/wealth-management" },
  { label: "Data Services", icon: Database, href: "/data-services" },
  { label: "Integrations", icon: Plug, href: "/integrations" },
];

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signout, user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize routes with active state, filtering based on user role
  const routes = useMemo(() => {
    if (user?.role === "investor") {
      // For investors, show investor dashboard and projects
      return sidebarRoutes
        .filter(route => route.roles && route.roles.includes("investor"))
        .map(route => ({
          ...route,
          active: isMounted && (pathname === route.href || pathname.startsWith(route.href + "/"))
        }));
    }
    
    // For non-investors, show all routes except investor-specific ones and filtered ones
    return sidebarRoutes
      .filter(route => route.label !== "Journey Analytics" && route.label !== "Personalization Hub") // Hide Journey Analytics and Personalization Hub
      .filter(route => !route.roles || !route.roles.includes("investor") || route.roles.includes(user?.role || "")) // Show routes that either have no role restrictions or include the user's role
      .map(route => ({
        ...route,
        // Only check pathname after component is mounted to prevent hydration mismatch
        active: isMounted && (pathname === route.href || pathname.startsWith(route.href + "/"))
      }));
  }, [pathname, isMounted, user]);

  const handleLogout = useCallback(() => {
    signout();
    router.replace("/signin");
  }, [signout, router]);


  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 border-r border-muted bg-white p-2 shadow-sm fixed left-0 top-0 z-40",
        className
      )}
      {...props}
    >
      <div className="flex items-center h-14 px-4 border-b border-muted bg-white/80">
        {!imageError ? (
          <Image 
            src="/Customer360-logo.png" 
            alt="Customer 360" 
            width={200}
            height={40}
            className="h-10 w-auto"
            priority
            quality={95}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAJhAAAgEEAQMEAwEAAAAAAAAAAQIAAxEhBBIxQVFhcYGRobHB0f/EABYBAQEBAAAAAAAAAAAAAAAAAAEAA//EABcRAQEBAQAAAAAAAAAAAAAAAAERADH/2gAMAwEAAhEDEQA/APZPFypcmxy6aKrFWGCCL5InGtXdGNyHOCM1sRCDh0qAUbAjKoqxILa6ggOUNdLKdKa/oI6tEbdCfLCc52gqJEFhYNbJAPOT0/r8SpggwBEaEFjAIE4BEhBYQCBSEIQwSEIQEIQgP//Z"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-xl font-bold text-[#e85b5e]">
            Customer 360°
          </div>
        )}
      </div>
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {routes.map((route) => {
          return (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10 px-4 transition",
                route.active
                  ? "bg-red-100 text-[#e85b5e] hover:bg-red-200"
                  : "hover:bg-red-50 hover:text-[#e85b5e]"
              )}
              asChild
            >
              <Link 
                href={route.href}
              >
                <route.icon className="mr-3 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          );
        })}
      </div>
      <div className="py-4 border-t border-muted bg-white/80">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-4 hover:bg-red-50 hover:text-[#e85b5e]"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
