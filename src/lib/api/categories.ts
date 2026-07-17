import { publicFetch, normalizeId } from "@/lib/api/client";
import type { CategoryItem } from "@/types";

interface CategoriesResponse {
  categories: CategoryItem[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicCategories(params?: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));

  const suffix = search.toString() ? `?${search.toString()}` : "";
  const data = await publicFetch<CategoriesResponse>(`/api/public/categories${suffix}`, {
    next: { revalidate: 60 },
  });

  return {
    ...data,
    categories: data.categories.map(normalizeId),
  };
}
