"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export function BackButton({ className, children, href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={cn("mb-4", className)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {children || "Back"}
    </Button>
  );
}