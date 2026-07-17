import { publicFetch, normalizeId } from "@/lib/api/client";
import type { Partner } from "@/types";

interface PartnersResponse {
  partners: Partner[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicPartners(params?: {
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
    const data = await publicFetch<PartnersResponse>(`/api/public/partners${suffix}`, {
      next: { revalidate: 60 },
    });

    return {
      ...data,
      partners: data.partners.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching partners:", err);
    return {
      partners: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getPublicPartnerBySlug(slug: string) {
  const data = await publicFetch<Partner>(`/api/public/partners/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  return normalizeId(data);
}
