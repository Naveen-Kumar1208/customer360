"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeadsIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/agent/leads/prospecting");
  }, [router]);

  return null;
}