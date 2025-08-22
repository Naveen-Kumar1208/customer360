"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomersIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/agent/customers/database");
  }, [router]);

  return null;
}

