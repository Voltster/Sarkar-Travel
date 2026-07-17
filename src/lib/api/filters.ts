import { publicFetch } from "@/lib/api/client";

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface DurationOption {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface RatingOption {
  id: string;
  label: string;
  min: number;
}

export interface SortOption {
  id: string;
  label: string;
}

export interface PublicFilters {
  priceRanges: PriceRange[];
  durationOptions: DurationOption[];
  ratingOptions: RatingOption[];
  sortOptions: SortOption[];
}

export async function getPublicFilters() {
  return publicFetch<PublicFilters>("/api/public/filters", {
    next: { revalidate: 60 },
  });
}
