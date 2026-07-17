import { publicFetch, normalizeId } from "@/lib/api/client";
import type { Package } from "@/types";

interface PackagesResponse {
  packages: Package[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicPackages(params?: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));

  const suffix = search.toString() ? `?${search.toString()}` : "";
  try {
    const data = await publicFetch<PackagesResponse>(`/api/public/packages${suffix}`, {
      next: { revalidate: 60 },
    });

    return {
      ...data,
      packages: data.packages.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching packages:", err);
    return {
      packages: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getPublicPackageBySlug(slug: string) {
  const data = await publicFetch<Package>(`/api/public/packages/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  return normalizeId(data);
}

export async function getHomepagePackages() {
  try {
    const data = await publicFetch<{ packages: Package[] }>(`/api/public/packages/homepage`, {
      next: { revalidate: 60 },
    });
    return {
      packages: data.packages.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching homepage packages:", err);
    return { packages: [] };
  }
}

export async function getFeaturedPackages() {
  try {
    const data = await publicFetch<{ packages: Package[] }>(`/api/public/packages/featured`, {
      next: { revalidate: 60 },
    });
    return {
      packages: data.packages.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching featured packages:", err);
    return { packages: [] };
  }
}
