"use client";

import { useEffect, useState } from "react";
import type { Destination } from "@/types";
import { getPublicDestinations } from "@/lib/api/destinations";

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicDestinations({ limit: 200 });
        if (!isMounted) return;
        setDestinations(data.destinations);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load destinations");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { destinations, isLoading, error };
}
