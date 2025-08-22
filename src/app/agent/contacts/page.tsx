"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactsIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/agent/contacts/database");
  }, [router]);

  return null;
}