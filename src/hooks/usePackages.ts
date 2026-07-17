"use client";

import { useEffect, useState } from "react";
import type { Package } from "@/types";
import { getPublicPackages } from "@/lib/api/packages";

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicPackages({ limit: 200 });
        if (!isMounted) return;
        setPackages(data.packages);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load packages");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { packages, isLoading, error };
}
