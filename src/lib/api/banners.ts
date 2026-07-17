import { publicFetch, normalizeId } from "@/lib/api/client";

export interface Banner {
  id: string;
  _id?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  openInNewTab: boolean;
  linkType: "manual" | "package" | "destination";
  showSearchBar: boolean;
  showScrollIndicator: boolean;
  order: number;
}

interface BannersResponse {
  banners: Banner[];
}

export async function getPublicBanners() {
  try {
    const data = await publicFetch<BannersResponse>("/api/public/banners", {
      next: { revalidate: 60 },
    });
    return {
      banners: (data.banners || []).map(normalizeId),
    };
  } catch (err) {
    console.error("API error fetching banners:", err);
    return {
      banners: [],
    };
  }
}
