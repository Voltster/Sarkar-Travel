import { publicFetch } from "@/lib/api/client";

export interface LandingPageConfig {
  sections: Record<string, any>;
  sectionOrder: { key: string; enabled: boolean }[];
  lastUpdated: string;
  updatedBy?: string;
}

export async function getPublicLandingConfig() {
  return publicFetch<LandingPageConfig>("/api/public/landing-page", {
    next: { revalidate: 60 },
  });
}
