"use client";

import { useEffect, useState } from "react";
import { getPublicFilters, type PublicFilters } from "@/lib/api/filters";

export function usePublicFilters() {
  const [filters, setFilters] = useState<PublicFilters | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicFilters();
        if (!isMounted) return;
        setFilters(data);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load filters");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { filters, isLoading, error };
}
