"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Grid,
  List,
  Heart,
  Compass,
  Mountain,
  Gem,
  Sun,
  Users,
  Home,
  MapPin,
  X,
  Flame,
  Landmark,
  Trees,
  Calendar,
  Luggage,
  ChevronDown
} from "lucide-react";
import { Package } from "@/types";
import { PackageCard, Pagination } from "@/components/shared";
import { usePublicFilters } from "@/hooks/usePublicFilters";
import { useDestinations } from "@/hooks/useDestinations";
import { useCategories } from "@/hooks/useCategories";
import { usePackages } from "@/hooks/usePackages";
import { useMemo } from "react";

interface PackagesContentProps {
  packages: Package[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

const getCategoryIcon = (slug: string) => {
  switch (slug.toLowerCase()) {
    case "family":
      return Home;
    case "honeymoon":
      return Heart;
    case "adventure":
      return Flame;
    case "luxury":
      return Gem;
    case "budget":
      return Luggage;
    case "solo":
      return Compass;
    case "group":
      return Users;
    case "pilgrimage":
      return Landmark;
    case "beach":
      return Sun;
    case "mountain":
      return Mountain;
    case "wildlife":
      return Trees;
    case "cultural":
      return Calendar;
    default:
      return Compass;
  }
};

export function PackagesContent({
  packages,
  totalItems,
  totalPages,
  currentPage
}: PackagesContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { filters } = usePublicFilters();
  const { destinations, isLoading: destinationsLoading } = useDestinations();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { packages: allPackages } = usePackages();

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    allPackages.forEach(pkg => {
      const catObj = (pkg as any).categoryId || pkg.category;
      if (catObj) {
        const id = typeof catObj === 'object' ? catObj.id || catObj._id : catObj;
        if (id) {
          counts.set(String(id).toLowerCase(), (counts.get(String(id).toLowerCase()) || 0) + 1);
        }
      }
    });
    return counts;
  }, [allPackages]);

  const activeCategories = useMemo(() => {
    return categories.filter(cat => {
      const catId = String(cat.id || (cat as any)._id).toLowerCase();
      const catSlug = String(cat.slug || "").toLowerCase();
      
      const countById = categoryCounts.get(catId) || 0;
      const countBySlug = categoryCounts.get(catSlug) || 0;
      
      return countById > 0 || countBySlug > 0;
    });
  }, [categories, categoryCounts]);

  const sortOptions =
    filters?.sortOptions?.length
      ? filters.sortOptions
      : [
          { id: "popular", label: "Most Popular" },
          { id: "price-low", label: "Price: Low to High" },
          { id: "price-high", label: "Price: High to Low" },
          { id: "rating", label: "Highest Rated" },
          { id: "duration", label: "Duration" },
        ];

  // Local state for search input to avoid debounce lag/url thrashing
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const updateFilters = (newFilters: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset page on filter change unless specifically changing page
    if (!newFilters.page) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (categorySlug: string) => {
    const currentCategory = searchParams.get("category");
    updateFilters({
      category: currentCategory === categorySlug ? undefined : categorySlug,
    });
  };

  const handleDestinationSelect = (destinationSlug: string) => {
    updateFilters({
      destination: destinationSlug || undefined,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchQuery });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    updateFilters({
      destination: undefined,
      category: undefined,
      search: undefined,
      page: undefined,
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Header filter dashboard */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xl shadow-slate-100/50 dark:shadow-slate-950/50 mb-10 space-y-6">
        
        {/* Upper row: Search, Destination, Sorting, View Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
          {/* Search Field */}
          <form onSubmit={handleSearch} className="lg:col-span-5 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              placeholder="Where is your next adventure?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 dark:text-white transition-all duration-300 font-medium placeholder-slate-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  updateFilters({ search: undefined });
                }}
                className="absolute right-[84px] top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Destination Selector */}
          <div className="lg:col-span-3 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <select
              value={searchParams.get("destination") || ""}
              onChange={(e) => handleDestinationSelect(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 dark:text-white transition-all duration-300 font-medium appearance-none cursor-pointer"
            >
              <option value="">All Destinations</option>
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.slug}>
                  {dest.name} {dest.packagesCount ? `(${dest.packagesCount})` : ""}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Sorting Dropdown */}
          <div className="lg:col-span-3 relative">
            <select
              value={searchParams.get("sortBy") || "popular"}
              onChange={(e) => updateFilters({ sortBy: e.target.value })}
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-slate-900 dark:text-white transition-all duration-300 font-medium appearance-none cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Grid/List toggler */}
          <div className="lg:col-span-1.5 flex items-center justify-end border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-1 bg-slate-50 dark:bg-slate-800/30 w-full lg:w-auto self-stretch">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 lg:flex-none p-2 rounded-xl transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-red-500 text-white shadow-md shadow-red-500/10"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100"
              }`}
              title="Grid View"
            >
              <Grid className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 lg:flex-none p-2 rounded-xl transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-red-500 text-white shadow-md shadow-red-500/10"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100"
              }`}
              title="List View"
            >
              <List className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-slate-100 dark:border-slate-800/60" />

        {/* Categories Tab Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase ">
              Browse by Category
            </span>
            {categoriesLoading && (
              <span className="text-xs text-slate-400 animate-pulse ">Loading categories...</span>
            )}
          </div>
          
          {/* Horizontal scroll of category pills */}
          <div className="flex items-center gap-3 overflow-x-auto! pb-2 scrollbar-hide px-4 lg:px-0">
            {/* "All" Pill */}
            <button
              onClick={() => updateFilters({ category: undefined })}
              className={`flex items-center gap-2 px-2 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:font-medium transition-all duration-300 whitespace-nowrap md:ml-1 ${
                !searchParams.get("category")
                  ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 scale-[1.02]"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300"
              }`}
            >
              <Compass className="w-4 h-4" />
              All Categories
            </button>

            {/* Category Items */}
            {activeCategories.map((cat) => {
              const IconComponent = getCategoryIcon(cat.slug);
              const isActive = searchParams.get("category") === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`flex items-center gap-2 px-2 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Badges row */}
        {(searchParams.get("destination") || searchParams.get("category") || searchParams.get("search")) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/40">
            <span className="text-xs font-semibold text-slate-400 mr-2 uppercase tracking-wider">Active filters:</span>
            
            {/* Search Badge */}
            {searchParams.get("search") && (
              <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100/50 dark:border-red-900/30">
                Search: "{searchParams.get("search")}"
                <button onClick={() => {
                  setSearchQuery("");
                  updateFilters({ search: undefined });
                }} className="hover:scale-110 p-0.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Destination Badge */}
            {searchParams.get("destination") && (
              <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100/50 dark:border-red-900/30">
                Destination: {destinations.find(d => d.slug === searchParams.get("destination"))?.name || searchParams.get("destination")}
                <button onClick={() => updateFilters({ destination: undefined })} className="hover:scale-110 p-0.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Category Badge */}
            {searchParams.get("category") && (
              <span className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-xs font-bold border border-red-100/50 dark:border-red-900/30">
                Category: {categories.find(c => c.slug === searchParams.get("category"))?.name || searchParams.get("category")}
                <button onClick={() => updateFilters({ category: undefined })} className="hover:scale-110 p-0.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Clear All button */}
            <button
              onClick={clearAllFilters}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold underline ml-2 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count & Layout */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {packages.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalItems}
            </span>{" "}
            packages
          </p>
        </div>

        {/* Packages Grid or List */}
        {packages.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No packages found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              We couldn't find any holiday packages matching your selection. Try adjusting your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-sm"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                >
                  <PackageCard
                    pkg={pkg}
                    variant={viewMode === "list" ? "horizontal" : "default"}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => updateFilters({ page })}
              className="mt-12"
            />
          </>
        )}
      </div>
    </div>
  );
}
