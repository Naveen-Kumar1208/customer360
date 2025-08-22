"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  className?: string;
}

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const TooltipContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn(
      "absolute z-50 overflow-hidden rounded-md border bg-black text-white px-3 py-1.5 text-sm shadow-md",
      "opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible",
      "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
      "before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2",
      "before:border-4 before:border-transparent before:border-t-black",
      className
    )}>
      {children}
    </div>
  );
};

// Simple tooltip component that works without Radix UI
const SimpleTooltip: React.FC<TooltipProps> = ({ children, content, className }) => {
  const [showBelow, setShowBelow] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Show below if element is in the top third of the viewport
      setShowBelow(rect.top < viewportHeight / 3);
    }
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-block group" 
      onMouseEnter={handleMouseEnter}
    >
      {children}
      <div className={cn(
        "absolute z-[9999] overflow-visible rounded-md shadow-xl",
        "opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible",
        showBelow 
          ? "top-full left-1/2 transform -translate-x-1/2 translate-y-2" 
          : "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2",
        showBelow
          ? "before:content-[''] before:absolute before:bottom-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-white"
          : "before:content-[''] before:absolute before:top-full before:left-1/2 before:transform before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-white",
        className
      )}>
        {content}
      </div>
    </div>
  );
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, SimpleTooltip }