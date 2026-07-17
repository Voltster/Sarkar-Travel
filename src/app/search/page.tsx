import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { PackageCard } from "@/components/shared";
import { globalSearch } from "@/lib/filters";
import { SearchForm } from "@/components/search/SearchForm";
import { getPublicPackages } from "@/lib/api/packages";
import { getPublicDestinations } from "@/lib/api/destinations";
import { getPublicBlogs } from "@/lib/api/blogs";

export const metadata: Metadata = {
  title: "Search | Ananta Travels",
  description: "Search for destinations, packages, and travel guides.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "";

  const [{ packages }, { destinations }, { blogs }] = await Promise.all([
    getPublicPackages({ limit: 200 }),
    getPublicDestinations({ limit: 200 }),
    getPublicBlogs({ limit: 200 }),
  ]);

  const results = globalSearch(query, packages);
  results.destinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(query.toLowerCase()) ||
    dest.country.toLowerCase().includes(query.toLowerCase())
  );
  results.blogs = blogs.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    (post.tags || []).some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <main className="page-shell pb-20">
      <PageHero
        title={query ? `Results for "${query}"` : "Search"}
        subtitle="Find your next adventure. Search diverse destinations, exclusive packages, and helpful travel tips."
        image="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Search" }]}
        className="mb-12"
      >
        <SearchForm initialQuery={query} />
      </PageHero>

      <div className="page-container">

        {/* Results Summary */}
        {query && (
          <div className="mb-8">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Found{" "}
              <span className="font-semibold text-slate-900 dark:text-white">
                {results.totalResults}
              </span>{" "}
              results
            </p>
          </div>
        )}

        {/* No Query State */}
        {!query && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Start your search
            </h3>
            <p className="text-slate-500">
              Enter a destination, package name, or keyword to find what you&apos;re looking for
            </p>
          </div>
        )}

        {/* No Results */}
        {query && results.totalResults === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-slate-500 mb-6">
              We couldn&apos;t find anything matching &quot;{query}&quot;
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <p className="text-slate-500 w-full mb-2">Popular searches:</p>
              {["Dubai", "Maldives", "Bali", "Vietnam", "Thailand"].map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${term}`}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm hover:border-red-500 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && results.totalResults > 0 && (
          <div className="space-y-12">
            {/* Destinations */}
            {results.destinations.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Destinations ({results.destinations.length})
                  </h2>
                  <Link
                    href="/destinations"
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.destinations.slice(0, 4).map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/destinations/${dest.slug}`}
                      className="group"
                    >
                      <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white font-semibold text-lg">
                            {dest.name}
                          </h3>
                          <p className="text-white/80 text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {dest.country}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Packages */}
            {results.packages.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Packages ({results.packages.length})
                  </h2>
                  <Link
                    href="/packages"
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.packages.slice(0, 6).map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}

            {/* Blog Posts */}
            {results.blogs.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Blog Posts ({results.blogs.length})
                  </h2>
                  <Link
                    href="/blog"
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.blogs.slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="relative h-48">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5">
                          <span className="text-xs text-red-600 font-medium uppercase tracking-wider">
                            {post.category.replace("-", " ")}
                          </span>
                          <h3 className="font-semibold text-slate-900 dark:text-white mt-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
