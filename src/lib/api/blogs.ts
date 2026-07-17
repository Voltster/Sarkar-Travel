import { publicFetch, normalizeId } from "@/lib/api/client";
import type { BlogPost } from "@/types";

// Raw API response shape (all fields can be partial)
interface RawBlogPost {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: { name?: string; avatar?: string; bio?: string };
  tags?: string[];
  publishedAt?: string;
  featured?: boolean;
  readTime?: number;
  relatedDestinations?: string[];
}

interface BlogsResponse {
  blogs: RawBlogPost[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export async function getPublicBlogs(params?: {
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
    const data = await publicFetch<BlogsResponse>(`/api/public/blogs${suffix}`, {
      next: { revalidate: 60 },
    });

    return {
      ...data,
      blogs: data.blogs.map((b) => normalizeId(b) as BlogPost),
    };
  } catch (err) {
    console.error("API error fetching blogs:", err);
    return {
      blogs: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function getPublicBlogBySlug(slug: string) {
  const data = await publicFetch<RawBlogPost>(`/api/public/blogs/slug/${slug}`, {
    next: { revalidate: 60 },
  });
  return normalizeId(data) as BlogPost;
}
