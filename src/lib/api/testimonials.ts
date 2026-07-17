import { publicFetch, normalizeId } from "@/lib/api/client";
import type { Testimonial } from "@/types";

interface TestimonialsResponse {
  testimonials: Testimonial[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicTestimonials(params?: {
  query?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
  packageId?: string;
}) {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.featured) search.set("featured", "true");
  if (params?.packageId) search.set("packageId", params.packageId);

  const suffix = search.toString() ? `?${search.toString()}` : "";
  try {
    const data = await publicFetch<TestimonialsResponse>(
      `/api/public/testimonials${suffix}`,
      { next: { revalidate: 60 } }
    );

    return {
      ...data,
      testimonials: data.testimonials.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching testimonials:", err);
    return {
      testimonials: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}
