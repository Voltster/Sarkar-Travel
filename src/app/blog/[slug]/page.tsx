import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared";
import { getPublicBlogBySlug, getPublicBlogs } from "@/lib/api/blogs";
import type { BlogPost } from "@/types";

export async function generateStaticParams() {
  const { blogs } = await getPublicBlogs({ limit: 200 });
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPublicBlogBySlug(slug);
    return {
      title: `${post.title} | Ananta Travels Blog`,
      description: post.excerpt || "",
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost;
  try {
    const raw = await getPublicBlogBySlug(slug);
    post = {
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      excerpt: raw.excerpt || "",
      content: raw.content || "",
      image: raw.image || "",
      category: (raw.category || "travel-tips") as BlogPost["category"],
      author: {
        name: raw.author?.name || "Ananta Travel Team",
        avatar: raw.author?.avatar || "",
        bio: raw.author?.bio,
      },
      publishedAt: raw.publishedAt || new Date().toISOString(),
      readTime: raw.readTime || 5,
      tags: raw.tags || [],
      featured: raw.featured,
      relatedDestinations: raw.relatedDestinations || [],
      relatedPackages: [],
    };
  } catch {
    notFound();
  }

  const { blogs } = await getPublicBlogs({ limit: 200 });
  const relatedPosts = blogs
    .filter((b) => b.id !== post.id && b.category === post.category)
    .slice(0, 3)
    .map((b) => ({
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
    }));

  // Remove the first H1 from content if it exists to avoid duplication with the page title
  const content = post.content.replace(/^#\s+[^\n]*\n+/i, "");

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl -mt-32 relative z-10">
        {/* Article Header */}
        <article className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="p-6 md:p-12">
            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                { label: post.category.replace("-", " ") },
              ]}
              className="mb-8"
            />

            {/* Category */}
            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-bold tracking-wide uppercase mb-6">
              {post.category.replace("-", " ")}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-medium font-serif text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full aspect-square object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {post.author.name}
                  </p>
                  <p className="text-xs uppercase tracking-wider">Travel Writer</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden md:block" />
              <span className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl text-gray-600 leading-relaxed prose-strong:text-gray-900 prose-headings:text-gray-900 prose-blockquote:border-l-red-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-li:marker:text-red-500">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            
            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-5 h-5 text-gray-400" />
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Blog
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Share2 className="w-5 h-5" /> Share:
                  </span>
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl p-6 mt-8 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={64}
              height={64}
              className="rounded-full aspect-square object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {post.author.name}
              </h3>
              <p className="text-gray-500 text-sm mb-2">Travel Writer</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                A passionate travel writer who has explored over 40 countries. Sharing
                insights and tips to help you make the most of your adventures.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <span className="text-xs text-red-600 font-bold uppercase tracking-wide mb-2">
                        {relatedPost.category.replace("-", " ")}
                      </span>
                      <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 group-hover:text-red-600 transition-colors mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-auto flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {relatedPost.readTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
