import { publicFetch, normalizeId } from "@/lib/api/client";
import type { FAQ } from "@/types";

interface FaqsResponse {
  faqs: FAQ[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicFaqs(params?: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));

  const suffix = search.toString() ? `?${search.toString()}` : "";
  const data = await publicFetch<FaqsResponse>(`/api/public/faqs${suffix}`, {
    next: { revalidate: 60 },
  });

  return {
    ...data,
    faqs: data.faqs.map(normalizeId),
  };
}
