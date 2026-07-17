"use client";

import { useEffect, useState } from "react";
import type { CategoryItem } from "@/types";
import { getPublicCategories } from "@/lib/api/categories";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicCategories({ limit: 200 });
        if (!isMounted) return;
        setCategories(data.categories);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load categories");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, isLoading, error };
}
