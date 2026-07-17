"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { BlogPost, CategoryItem } from "@/types";

interface BlogCategoryItem {
    id: string;
    name: string;
    slug: string;
    count: number;
}

interface BlogContentProps {
    blogPosts: BlogPost[];
    categories: BlogCategoryItem[];
}

export function BlogContent({ blogPosts, categories }: BlogContentProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = useMemo(() => {
        return blogPosts.filter((post) => {
            const matchesCategory =
                selectedCategory === "all" || post.category === selectedCategory;
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, blogPosts]);

    const featuredPost = blogPosts.find((post) => post.featured);
    const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

    return (
        <div className="page-container">
            {/* Featured Post */}
            {featuredPost && selectedCategory === "all" && !searchQuery && (
                <section className="mb-20">
                    <Link href={`/blog/${featuredPost.slug}`} className="group">
                        <div className="relative h-[400px] md:h-[500px] page-hero">
                            <Image
                                src={featuredPost.image}
                                alt={featuredPost.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium w-fit mb-4">
                                    Featured
                                </span>
                                <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 max-w-3xl transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-white/80 text-lg mb-4 max-w-2xl line-clamp-2">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-white/70">
                                    <span className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {featuredPost.author.name}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-8 mb-16">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all text-gray-900 placeholder:text-gray-500"
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedCategory("all")}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === "all"
                            ? "bg-black text-white shadow-lg shadow-black/20"
                            : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                    >
                        All Posts
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat.slug
                                ? "bg-black text-white shadow-lg shadow-black/20"
                                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {regularPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex flex-col h-full"
                        >
                            <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                                <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 h-full flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                        <span className="absolute top-5 left-5 px-4 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold tracking-wide text-gray-900 uppercase shadow-sm">
                                            {post.category.replace("-", " ")}
                                        </span>
                                    </div>
                                    <div className="p-8 flex flex-col grow">
                                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
                                            <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span>{post.readTime} min read</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-red-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center jus gap-3 pt-6 border-t border-gray-100 mt-auto">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
                                            </div>
                                            <span className="text-slate-500">
                                                {post.readTime} min read
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="text-6xl mb-6 opacity-50">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No articles found
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        We couldn't find any articles matching your criteria. Try adjusting your search or filters.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                        }}
                        className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Tags Section */}
            <section className="mt-24 pt-12 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-red-500" />
                    Trending Topics
                </h2>
                <div className="flex flex-wrap gap-3">
                    {Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
                        .slice(0, 20)
                        .map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-black hover:text-black hover:bg-white transition-all duration-300"
                            >
                                #{tag}
                            </button>
                        ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="mt-24">
                <div className="relative bg-[#170405] text-white rounded-[2.5rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl shadow-black/5">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-bold tracking-widest uppercase mb-6">
                                Weekly Updates
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif mb-4">
                                Get Travel Inspiration
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Subscribe to our newsletter and never miss the latest travel tips, destination guides, and exclusive offers.
                            </p>
                        </div>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                            >
                                Subscribe
                            </button>
                        </form>

                        <p className="text-white/40 text-xs">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                </div>
            </section>
        </div>
    );
}
