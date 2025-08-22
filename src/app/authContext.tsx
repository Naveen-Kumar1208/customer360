"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { User, UserRole, AgentType, LoginResponse } from "@/types/auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  signin: (email: string, password: string) => Promise<LoginResponse>;
  signout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasPermission: (permission: string) => boolean;
}

const validCredentials = [
  { 
    email: "admin@example.com", 
    password: "password123",
    user: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "organization" as UserRole,
      organizationId: "org_1",
      permissions: ["*"]
    }
  },
  { 
    email: "raja@360.com", 
    password: "raja123",
    user: {
      id: "2",
      email: "raja@360.com",
      name: "Raja",
      role: "organization" as UserRole,
      organizationId: "org_1",
      permissions: ["*"]
    }
  },
  {
    email: "agent@example.com",
    password: "agent123",
    user: {
      id: "3",
      email: "agent@example.com",
      name: "Agent",
      role: "agent" as UserRole,
      agentType: "sales" as AgentType,
      organizationId: "org_1",
      permissions: ["dashboard.view", "contacts.manage", "leads.manage", "campaigns.view", "projects.manage", "customers.manage"]
    }
  },
  {
    email: "investor@cdp360.com",
    password: "investor123",
    user: {
      id: "4",
      email: "investor@cdp360.com",
      name: "Investor",
      role: "investor" as UserRole,
      organizationId: "org_1",
      permissions: ["investor.dashboard.view", "portfolio.view", "analytics.view"]
    }
  },
];

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Function to generate a sample token
const generateToken = (email: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 15);
  return btoa(`${email}:${timestamp}:${randomStr}`);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side to avoid SSR issues
    if (typeof window !== 'undefined') {
      const storedToken = window.localStorage.getItem("authToken");
      const storedUser = window.localStorage.getItem("authUser");
      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsAuthenticated(true);
          setUser(parsedUser);
          setToken(storedToken);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          window.localStorage.removeItem("authToken");
          window.localStorage.removeItem("authUser");
        }
      }
      setIsLoading(false);
    }
  }, []);

  const signin = useCallback(async (enteredEmail: string, enteredPassword: string): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    const credential = validCredentials.find(
      cred => cred.email === enteredEmail && cred.password === enteredPassword
    );
    
    if (credential) {
      const newToken = generateToken(enteredEmail);
      setIsAuthenticated(true);
      setUser(credential.user);
      setToken(newToken);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem("authToken", newToken);
        window.localStorage.setItem("authUser", JSON.stringify(credential.user));
      }
      return { success: true, user: credential.user, token: newToken };
    }
    return { success: false, message: "Invalid email or password." };
  }, []);

  const signout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem("authToken");
      window.localStorage.removeItem("authUser");
    }
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes("*") || user.permissions.includes(permission);
  }, [user]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isAuthenticated,
    isLoading,
    user,
    token,
    signin,
    signout,
    hasRole,
    hasPermission
  }), [isAuthenticated, isLoading, user, token, signin, signout, hasRole, hasPermission]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext must be used within AuthProvider");
  return ctx;
};
