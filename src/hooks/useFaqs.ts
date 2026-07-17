"use client";

import { useEffect, useState } from "react";
import type { FAQ } from "@/types";
import { getPublicFaqs } from "@/lib/api/faqs";

export function useFaqs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicFaqs({ limit: 200 });
        if (!isMounted) return;
        setFaqs(data.faqs);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load FAQs");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { faqs, isLoading, error };
}
