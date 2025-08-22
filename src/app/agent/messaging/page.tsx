"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MessagingIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/agent/messaging/email");
  }, [router]);

  return null;
}