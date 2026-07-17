"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { Heart, Trash2, ChevronRight, Package } from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { getWishlist, removeFromWishlist, clearWishlist } from "@/lib/storage";
import { Breadcrumb, PackageCard } from "@/components/shared";

import { PageHero } from "@/components/shared/PageHero";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const { packages, isLoading } = usePackages();

  useEffect(() => {
    setMounted(true);
    setWishlistIds(getWishlist());
  }, []);

  const wishlistPackages = useMemo(() => {
    return packages.filter((pkg) => wishlistIds.includes(pkg.id));
  }, [wishlistIds, packages]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setWishlistIds(getWishlist());
  };

  const handleClearAll = () => {
    clearWishlist();
    setWishlistIds([]);
  };

  if (!mounted || isLoading) {
    return (
      <main className="min-h-screen bg-[#fbfbfb] dark:bg-black pt-8 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-slate-200 rounded mb-6" />
            <div className="h-12 w-64 bg-slate-200 rounded mb-8" />
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pb-20">
      <PageHero
        title="Your Wishlist"
        subtitle={`${wishlistPackages.length} ${wishlistPackages.length === 1 ? "package" : "packages"} saved. Start planning your dream vacation today.`}
        image="https://images.pexels.com/photos/17168353/pexels-photo-17168353.jpeg"
        breadcrumbs={[{ label: "Wishlist" }]}
        className="mb-12"
      />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Your Wishlist
          </h2>
          {wishlistPackages.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {wishlistPackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Start exploring our packages and save your favorites to plan your next
              adventure.
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
            >
              <Package className="w-5 h-5" />
              Explore Packages
            </Link>
          </motion.div>
        )}

        {/* Wishlist Grid */}
        {wishlistPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {wishlistPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <PackageCard pkg={pkg} />
                  {/* Remove button overlay */}
                  <button
                    onClick={() => handleRemove(pkg.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/30"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Recommendations */}
        {wishlistPackages.length > 0 && wishlistPackages.length < packages.length && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                You Might Also Like
              </h2>
              <Link
                href="/packages"
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages
                .filter((pkg) => !wishlistIds.includes(pkg.id))
                .slice(0, 3)
                .map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
