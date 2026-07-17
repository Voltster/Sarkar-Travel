import { BlogContent } from "@/components/blog/BlogContent";
import { PageHero } from "@/components/shared/PageHero";
import { Metadata } from "next";
import type { BlogPost } from "@/types";
import { getPublicBlogs } from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Blog | Ananta Travels",
  description: "Travel stories, tips, and guides for your next adventure.",
};

export default async function BlogPage() {
  const { blogs } = await getPublicBlogs({ limit: 200 });
  const categories = Array.from(
    new Set(blogs.map((b) => b.category).filter(Boolean))
  ).map((slug) => ({
    id: slug as string,
    name: String(slug).replace(/-/g, " "),
    slug: slug as string,
    count: blogs.filter((b) => b.category === slug).length,
  }));

  return (
    <main className="page-shell pb-20">
      <PageHero
        title="Travel Stories & Tips"
        subtitle="Discover inspiring travel stories, expert tips, and comprehensive guides to help you plan your perfect adventure."
        image="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Blog" }]}
        className="mb-12"
      />

      <BlogContent
        blogPosts={blogs.map((b) => ({
          id: b.id,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || "",
          content: b.content || "",
          image: b.image || "",
          category: (b.category || "travel-tips") as BlogPost["category"],
          author: {
            name: b.author?.name || "Ananta Travel Team",
            avatar: b.author?.avatar || "",
            bio: b.author?.bio,
          },
          publishedAt: b.publishedAt || new Date().toISOString(),
          readTime: b.readTime || 5,
          tags: b.tags || [],
          featured: b.featured,
          relatedDestinations: b.relatedDestinations || [],
          relatedPackages: [],
        }))}
        categories={categories}
      />
    </main>
  );
}
