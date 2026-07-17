import { publicFetch } from "@/lib/api/client";

export interface PageData {
  id?: string;
  slug: string;
  title?: string;
  content?: Record<string, any>;
  status?: string;
}

export async function getPublicPage(slug: string) {
  return publicFetch<PageData>(`/api/public/pages/${slug}`, {
    next: { revalidate: 60 },
  });
}
