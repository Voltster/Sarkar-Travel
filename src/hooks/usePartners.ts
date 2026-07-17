"use client";

import { useEffect, useState } from "react";
import type { Partner } from "@/types";
import { getPublicPartners } from "@/lib/api/partners";

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicPartners({ limit: 100 });
        if (!isMounted) return;
        setPartners(data.partners);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load partners");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { partners, isLoading, error };
}
