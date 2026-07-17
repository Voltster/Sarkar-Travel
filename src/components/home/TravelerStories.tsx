"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";

// Fallback stories if no blog posts are available
const fallbackStories = [
  {
    id: "fallback-1",
    slug: "swiss-alps-romance",
    title: "Swiss Alps: A Honeymoon to Remember",
    excerpt:
      "Waking up to the Matterhorn from our private balcony, a chocolate-making class in Gruyères, and a spontaneous picnic by Lake Brienz.",
    image:
      "https://images.pexels.com/photos/27869485/pexels-photo-27869485.jpeg",
    category: "travel-stories",
    author: { name: "Priya & Arjun", avatar: "" },
    publishedAt: "2026-03-15",
    tags: ["Honeymoon", "Mountains"],
  },
  {
    id: "fallback-2",
    slug: "bali-beyond-borders",
    title: "Bali Beyond the Tourist Trail",
    excerpt:
      "We stayed in a rice-paddy villa in Ubud, had a private sunrise at Batur with a local guide, and found secret beaches in Uluwatu.",
    image:
      "https://images.pexels.com/photos/35154999/pexels-photo-35154999.jpeg",
    category: "travel-stories",
    author: { name: "Rahul Mehta", avatar: "" },
    publishedAt: "2026-01-20",
    tags: ["Adventure", "Culture"],
  },
  {
    id: "fallback-3",
    slug: "japan-solo-immersion",
    title: "Solo in Japan: Temples, Ramen & Dawn Walks",
    excerpt:
      "Kyoto's temple walk at dawn, alone with the monks — soul-stirring. An absolute masterpiece of planning by the Ananta team.",
    image:
      "https://images.pexels.com/photos/19828848/pexels-photo-19828848.jpeg",
    category: "travel-stories",
    author: { name: "Vikram Patil", avatar: "" },
    publishedAt: "2026-02-10",
    tags: ["Solo", "Culture"],
  },
];

export function TravelerStories() {
  const { blogs, isLoading } = useBlogs();

  // Get featured blog posts, max 3
  const featuredBlogs = blogs
    .filter((b: any) => b.featured === true)
    .slice(0, 3);

  // Use featured blogs or fallback to static stories
  const stories =
    featuredBlogs.length > 0
      ? featuredBlogs.map((b: any) => ({
          id: b.id,
          slug: b.slug,
          title: b.title || "",
          excerpt: b.excerpt || "",
          image: b.image || "",
          category: b.category || "travel-stories",
          author: b.author || { name: "Ananta Travels", avatar: "" },
          publishedAt: b.publishedAt || "",
          tags: b.tags || [],
        }))
      : fallbackStories;

  return (
    <section className="py-20 md:py-28 bg-[#faf8f5] dark:bg-[#0c0a09]">
      <div className="2xl:container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block"
            >
              Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
            >
              Traveler{" "}
              <span className="italic text-red-600 dark:text-red-400">
                Stories
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-3 max-w-lg"
            >
              Real experiences from travelers who journeyed with us.
            </motion.p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors group"
          >
            Read More Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && featuredBlogs.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-3" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-4/5 mb-2" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Stories Grid */}
        {(!isLoading || fallbackStories.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            Read More Stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StoryCard({
  story,
  index,
}: {
  story: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    author: { name: string; avatar: string };
    publishedAt: string;
    tags: string[];
  };
  index: number;
}) {
  const formattedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "";

  const categoryLabel = story.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={`/blog/${story.slug}`} className="block group">
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-slate-950/40 hover:-translate-y-1 transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {story.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {story.excerpt}
            </p>

            {/* Author + Date */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {story.author.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                  {story.author.name}
                </span>
              </div>
              {formattedDate && (
                <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
