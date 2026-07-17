"use client";

import { useEffect, useState } from "react";
import { getPublicBlogs } from "@/lib/api/blogs";
import type { BlogPost } from "@/types";

export function useBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await getPublicBlogs({ limit: 200 });
        if (!isMounted) return;
        setBlogs(data.blogs);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Failed to load blogs");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { blogs, isLoading, error };
}
