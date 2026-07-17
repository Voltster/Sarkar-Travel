import { publicFetch, normalizeId } from "@/lib/api/client";
import type { Hotel } from "@/types";

interface HotelsResponse {
  hotels: Hotel[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicHotels(params?: {
  query?: string;
  destinationId?: string;
  propertyType?: string;
  starRating?: string;
  page?: number;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params?.query) search.set("query", params.query);
  if (params?.destinationId) search.set("destinationId", params.destinationId);
  if (params?.propertyType) search.set("propertyType", params.propertyType);
  if (params?.starRating) search.set("starRating", params.starRating);
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));

  const suffix = search.toString() ? `?${search.toString()}` : "";
  try {
    const data = await publicFetch<HotelsResponse>(`/api/public/hotels${suffix}`);

    return {
      ...data,
      hotels: data.hotels.map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching hotels:", err);
    return {
      hotels: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getPublicHotelById(id: string) {
  const data = await publicFetch<Hotel>(`/api/public/hotels/${id}`);
  return normalizeId(data);
}
