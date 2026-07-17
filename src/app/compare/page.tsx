"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  X, Check, Minus, ArrowRight, Scale, Package, 
  Clock, MapPin, Star, Users, Utensils, Plane, Hotel
} from "lucide-react";
import { usePackages } from "@/hooks/usePackages";
import { getCompareList, removeFromCompare, clearCompare } from "@/lib/storage";
import { Breadcrumb } from "@/components/shared";
import { formatPrice } from "@/lib/filters";

export default function ComparePage() {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const { packages, isLoading } = usePackages();

  useEffect(() => {
    setMounted(true);
    setCompareIds(getCompareList());
  }, []);

  const comparePackages = useMemo(() => {
    return packages.filter((pkg) => compareIds.includes(pkg.id));
  }, [compareIds, packages]);

  const handleRemove = (id: string) => {
    removeFromCompare(id);
    setCompareIds(getCompareList());
  };

  const handleClearAll = () => {
    clearCompare();
    setCompareIds([]);
  };

  if (!mounted || isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-black pt-8 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-slate-200 rounded mb-6" />
            <div className="h-12 w-64 bg-slate-200 rounded mb-8" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Compare Packages" }]} className="mb-6" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-2"
            >
              Compare Packages
            </motion.h1>
            <p className="text-slate-600 dark:text-slate-400">
              Compare up to 3 packages side by side
            </p>
          </div>
          {comparePackages.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Empty State */}
        {comparePackages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
              No packages to compare
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              Add packages to compare their features, prices, and inclusions side by side.
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
            >
              <Package className="w-5 h-5" />
              Browse Packages
            </Link>
          </motion.div>
        )}

        {/* Comparison Table */}
        {comparePackages.length > 0 && (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Package Headers */}
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${comparePackages.length}, 1fr)` }}>
                <div className="p-4" />
                {comparePackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4"
                  >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                      <button
                        onClick={() => handleRemove(pkg.id)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30"
                      >
                        <X className="w-4 h-4 text-slate-500 hover:text-red-500" />
                      </button>
                      <div className="relative h-40">
                        <Image
                          src={pkg.images[0]}
                          alt={pkg.title}
                          fill
                          className="object-cover"
                        />
                        {pkg.badge && (
                          <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                          <MapPin className="w-3 h-3" />
                          {pkg.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-red-600">
                              {formatPrice(pkg.price)}
                            </span>
                            <span className="text-sm text-slate-500">/person</span>
                          </div>
                          <Link
                            href={`/packages/${pkg.slug}`}
                            className="text-red-600 hover:text-red-700"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Rows */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <ComparisonRow
                  label="Duration"
                  icon={<Clock className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => pkg.duration)}
                  count={comparePackages.length}
                />
                <ComparisonRow
                  label="Rating"
                  icon={<Star className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => (
                    <span key={pkg.id} className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {pkg.rating} ({pkg.reviewsCount} reviews)
                    </span>
                  ))}
                  count={comparePackages.length}
                />
                <ComparisonRow
                  label="Trip Pace"
                  icon={<Users className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => pkg.tripPace || "Moderate")}
                  count={comparePackages.length}
                />
                <ComparisonRow
                  label="Meals"
                  icon={<Utensils className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => 
                    pkg.inclusions.filter(i => i.toLowerCase().includes("meal") || i.toLowerCase().includes("breakfast") || i.toLowerCase().includes("dinner")).length > 0 
                      ? "Included" 
                      : "Not Included"
                  )}
                  count={comparePackages.length}
                  highlight
                />
                <ComparisonRow
                  label="Flights"
                  icon={<Plane className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => 
                    pkg.inclusions.some(i => i.toLowerCase().includes("flight")) 
                      ? "Included" 
                      : "Not Included"
                  )}
                  count={comparePackages.length}
                  highlight
                />
                <ComparisonRow
                  label="Hotel"
                  icon={<Hotel className="w-4 h-4" />}
                  values={comparePackages.map((pkg) => 
                    pkg.inclusions.some(i => i.toLowerCase().includes("hotel") || i.toLowerCase().includes("accommodation") || i.toLowerCase().includes("resort")) 
                      ? "Included" 
                      : "Not Included"
                  )}
                  count={comparePackages.length}
                  highlight
                />
              </div>

              {/* Inclusions */}
              <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    All Inclusions
                  </h3>
                </div>
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${comparePackages.length}, 1fr)` }}>
                  <div className="p-4" />
                  {comparePackages.map((pkg) => (
                    <div key={pkg.id} className="p-4 border-l border-slate-200 dark:border-slate-700">
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exclusions */}
              <div className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Exclusions
                  </h3>
                </div>
                <div className="grid" style={{ gridTemplateColumns: `200px repeat(${comparePackages.length}, 1fr)` }}>
                  <div className="p-4" />
                  {comparePackages.map((pkg) => (
                    <div key={pkg.id} className="p-4 border-l border-slate-200 dark:border-slate-700">
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="grid mt-6" style={{ gridTemplateColumns: `200px repeat(${comparePackages.length}, 1fr)` }}>
                <div className="p-4" />
                {comparePackages.map((pkg) => (
                  <div key={pkg.id} className="p-4">
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="w-full block text-center py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                      View Package
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Need help */}
        {comparePackages.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-serif text-white mb-2">
              Need help choosing?
            </h3>
            <p className="text-white/90 mb-6">
              Our travel experts can help you find the perfect package for your needs
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors"
            >
              Talk to an Expert
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

function ComparisonRow({
  label,
  icon,
  values,
  count,
  highlight = false,
}: {
  label: string;
  icon: React.ReactNode;
  values: React.ReactNode[];
  count: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid border-b border-slate-200 dark:border-slate-700 last:border-b-0 ${
        highlight ? "bg-slate-50 dark:bg-slate-800/50" : ""
      }`}
      style={{ gridTemplateColumns: `200px repeat(${count}, 1fr)` }}
    >
      <div className="p-4 flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
        {icon}
        {label}
      </div>
      {values.map((value, idx) => (
        <div
          key={idx}
          className="p-4 border-l border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          {typeof value === "string" ? (
            value === "Included" ? (
              <span className="flex items-center gap-1 text-green-600">
                <Check className="w-4 h-4" /> Included
              </span>
            ) : value === "Not Included" ? (
              <span className="flex items-center gap-1 text-slate-400">
                <Minus className="w-4 h-4" /> Not Included
              </span>
            ) : (
              value
            )
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );
}
