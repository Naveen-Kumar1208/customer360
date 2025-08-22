"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";

interface NavbarProps {
  username?: string;
}

export function Navbar({ username = "Admin User" }: NavbarProps) {
  const { signout, user } = useAuth();
  const router = useRouter();
  
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    signout();
    router.push("/signin");
  };

  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-muted bg-white px-6">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#e85b5e]" />
        <Input
          type="search"
          placeholder="Search here..."
          className="w-full rounded-lg bg-[#e85b5e]/5 border-[#e85b5e]/20 pl-8 focus-visible:ring-[#e85b5e]"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full text-[#e85b5e] hover:text-[#c7494c]"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#e85b5e]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-[#e85b5e] hover:text-[#c7494c]"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatar.png" alt={username} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-none text-[#c7494c]">{username}</p>
            <p className="text-xs text-muted-foreground">
              {user?.role === 'agent' ? 'Agent user' : 'Admin'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-red-500 hover:text-red-700"
          aria-label="Logout"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
