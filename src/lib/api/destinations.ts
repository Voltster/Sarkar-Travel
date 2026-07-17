import { publicFetch, normalizeId } from "@/lib/api/client";
import type { Destination } from "@/types";

interface DestinationsResponse {
  destinations: Destination[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicDestinations(params?: {
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
    const data = await publicFetch<DestinationsResponse>(
      `/api/public/destinations${suffix}`,
      { next: { revalidate: 60 } }
    );

    return {
      ...data,
      destinations: data.destinations.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching destinations:", err);
    return {
      destinations: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getPublicDestinationBySlug(slug: string) {
  const data = await publicFetch<Destination>(
    `/api/public/destinations/slug/${slug}`,
    { next: { revalidate: 60 } }
  );
  return normalizeId(data);
}

export async function getHomepageDestinations() {
  try {
    const data = await publicFetch<{ destinations: Destination[] }>(
      `/api/public/destinations/homepage`,
      { next: { revalidate: 60 } }
    );
    return {
      destinations: data.destinations.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching homepage destinations:", err);
    return { destinations: [] };
  }
}
