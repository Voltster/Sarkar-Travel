"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types";
import { getPublicTestimonials } from "@/lib/api/testimonials";

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicTestimonials({ limit: 50 });
        if (!isMounted) return;
        setTestimonials(data.testimonials);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load testimonials");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { testimonials, isLoading, error };
}
