"use client";

import React, { useMemo, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Target,
  MessageSquare,
  GitBranch,
  Activity,
  FolderOpen,
  UserCircle,
  BarChart3,
  Database,
  Mail,
  Phone,
  MessageCircle,
  Zap,
  TrendingUp,
  Building2,
  FileText,
  Settings,
  Search,
  UserPlus,
  PhoneCall,
  Calendar,
  CheckSquare,
  Linkedin,
  Globe,
  Workflow,
  Route
} from "lucide-react";
import { useAuth } from "@/app/authContext";

interface AgentSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const agentSidebarRoutes = [
  { 
    label: "Dashboard Overview", 
    icon: LayoutDashboard, 
    href: "/agent/dashboard",
    permission: "dashboard.view"
  },
  { 
    label: "Contact Intelligence", 
    icon: Users, 
    href: "/agent/contacts",
    permission: "contacts.manage",
    submenu: [
      { label: "Contact Database", icon: Users, href: "/agent/contacts/database" },
      { label: "Stakeholder Mapping", icon: GitBranch, href: "/agent/contacts/stakeholders" },
      { label: "Vendor Management", icon: Building2, href: "/agent/contacts/vendors" },
      { label: "Contact Scoring", icon: TrendingUp, href: "/agent/contacts/scoring" },
      { label: "Deal Relevance", icon: Target, href: "/agent/contacts/deal-relevance" }
    ]
  },
  { 
    label: "Lead Management", 
    icon: Target, 
    href: "/agent/leads",
    permission: "leads.manage",
    submenu: [
      { label: "Lead Prospecting", icon: Search, href: "/agent/leads/prospecting" },
      { label: "TOFU Leads", icon: UserPlus, href: "/agent/leads/tofu" },
      { label: "MOFU Leads", icon: PhoneCall, href: "/agent/leads/mofu" },
      { label: "BOFU Leads", icon: CheckSquare, href: "/agent/leads/bofu" }
    ]
  },
  { 
    label: "Customers", 
    icon: UserCircle, 
    href: "/agent/customers",
    permission: "customers.manage",
    submenu: [
      { label: "Customer Database", icon: Users, href: "/agent/customers/database" },
      { label: "Customer Profiles", icon: UserCircle, href: "/agent/customers/profiles" },
      { label: "Customer Journey", icon: TrendingUp, href: "/agent/customers/journey" },
      { label: "Customer Support", icon: Phone, href: "/agent/customers/support" }
    ]
  },
  
  { 
    label: "Campaign Management", 
    icon: Target, 
    href: "/agent/campaigns",
    
    
  },
  { 
    label: "Automation", 
    icon: Workflow, 
    href: "/automation",
    permission: "automation.manage"
  },
  { 
    label: "Data & Integrations", 
    icon: Database, 
    href: "/agent/integrations",
    permission: "integrations.manage",
    submenu: [
      { label: "Lusha Integration", icon: Users, href: "/agent/integrations/lusha" },
      { label: "LinkedIn Sales Navigator", icon: Linkedin, href: "/agent/integrations/linkedin" },
      { label: "Apollo.io", icon: Target, href: "/agent/integrations/apollo" }
    ]
  },
  { 
    label: "Calendars", 
    icon: Calendar, 
    href: "/agent/calendars",
    permission: "calendar.view"
  },
  { 
    label: "Projects", 
    icon: FolderOpen, 
    href: "/agent/projects"
  },
  { 
    label: "Analytics & Reports", 
    icon: BarChart3, 
    href: "/agent/analytics",
    
  }
];

export function AgentSidebar({ className, ...props }: AgentSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signout, user, hasPermission } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter routes based on user permissions
  const filteredRoutes = useMemo(() => 
    agentSidebarRoutes.map(route => ({
      ...route,
      // Only check pathname after component is mounted to prevent hydration mismatch
      active: isMounted && (pathname === route.href || pathname.startsWith(route.href + "/") || 
             (route.href === "/agent/dashboard" && (pathname === "/agent" || pathname === "/agent/" || pathname.startsWith("/agent/dashboard"))))
    })), [hasPermission, pathname, isMounted]
  );

  const handleLogout = useCallback(() => {
    signout();
    router.replace("/signin");
  }, [signout, router]);

  const toggleSubmenu = useCallback((routeLabel: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [routeLabel]: !prev[routeLabel]
    }));
  }, []);

  // Auto-open submenu if on a subroute
  React.useEffect(() => {
    if (isMounted) {
      filteredRoutes.forEach(route => {
        if (route.submenu && route.submenu.some(sub => pathname.startsWith(sub.href))) {
          setOpenSubmenus(prev => ({ ...prev, [route.label]: true }));
        }
      });
    }
  }, [filteredRoutes, pathname, isMounted]);

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
            Agent Portal
          </div>
        )}
      </div>

      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {filteredRoutes.map((route) => {
          const isSubmenuOpen = openSubmenus[route.label];
          const hasActiveSubmenu = isMounted && route.submenu?.some(sub => 
            pathname === sub.href || pathname.startsWith(sub.href + "/")
          );

          if (route.submenu) {
            return (
              <div key={route.label}>
                <Button
                  variant={route.active || hasActiveSubmenu ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-4 transition flex items-center",
                    route.active || hasActiveSubmenu
                      ? "bg-red-100 text-[#e85b5e] hover:bg-red-200"
                      : "hover:bg-red-50 hover:text-[#e85b5e]"
                  )}
                  onClick={() => toggleSubmenu(route.label)}
                  type="button"
                >
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                  <span className={cn("ml-auto transition-transform", isSubmenuOpen ? "rotate-90" : "")}>▶</span>
                </Button>
                {isSubmenuOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {route.submenu.map((sub) => {
                      const isSubActive = isMounted && (pathname === sub.href || pathname.startsWith(sub.href + "/"));
                      return (
                        <Button
                          key={sub.href}
                          variant={isSubActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start h-9 px-3 text-sm",
                            isSubActive
                              ? "bg-red-50 text-[#e85b5e] hover:bg-red-100"
                              : "hover:bg-red-50 hover:text-[#e85b5e]"
                          )}
                          asChild
                        >
                        <Link href={sub.href}>
                          <sub.icon className="mr-2 h-4 w-4" />
                          {sub.label}
                        </Link>
                      </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

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
              <Link href={route.href}>
                <route.icon className="mr-3 h-5 w-5" />
                {route.label}
              </Link>
            </Button>
          );
        })}
      </div>
      
      <div className="py-4 border-t border-muted bg-white/80 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-4 hover:bg-red-50 hover:text-[#e85b5e]"
          asChild
        >
          <Link href="/agent/settings">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </Button>
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