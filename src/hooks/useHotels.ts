"use client";

import { useEffect, useState } from "react";
import type { Hotel } from "@/types";
import { getPublicHotels } from "@/lib/api/hotels";

export function useHotels(params?: {
  query?: string;
  destinationId?: string;
  propertyType?: string;
  starRating?: string;
  limit?: number;
}) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getPublicHotels({ limit: 100, ...params });
        if (!isMounted) return;
        setHotels(data.hotels);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load hotels");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [
    params?.query,
    params?.destinationId,
    params?.propertyType,
    params?.starRating,
    params?.limit,
  ]);

  return { hotels, isLoading, error };
}
