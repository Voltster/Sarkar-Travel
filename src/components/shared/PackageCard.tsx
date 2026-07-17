"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Check, Heart } from "lucide-react";
import { Package } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { isInWishlist, toggleWishlist } from "@/lib/storage";

interface PackageCardProps {
  pkg: Package;
  variant?: "default" | "horizontal" | "compact";
  showWishlist?: boolean;
  priority?: boolean;
}

export function PackageCard({ 
  pkg, 
  variant = "default", 
  showWishlist = true,
  priority = false 
}: PackageCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWishlisted(isInWishlist(pkg.id));
  }, [pkg.id]);

  const handleWishlistClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleWishlist(pkg.id);
    setWishlisted(newState);
  }, [pkg.id]);

  const firstImage = pkg.images?.[0];
  const primaryImage = typeof firstImage === "string" ? firstImage.trim() : "";
  const hasImage = Boolean(primaryImage);
  const featuresToShow = pkg.highlights?.slice(0, 3) || [];
  const routeDisplay = pkg.route || [];

  if (variant === "horizontal") {
    return (
      <Link href={`/packages/${pkg.slug}`} className="block group">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative h-48 md:h-auto md:w-72 shrink-0">
            {hasImage ? (
              <Image
                src={primaryImage}
                alt={pkg.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={priority}
              />
            ) : (
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
                No Image
              </div>
            )}
            {pkg.badge && (
              <span className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 dark:text-white">
                {pkg.badge}
              </span>
            )}
            {pkg.discount > 0 && (
              <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {pkg.discount}% OFF
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-slate-900 dark:text-white line-clamp-1 pr-4">
                {pkg.title}
              </h3>
              {showWishlist && mounted && (
                <button onClick={handleWishlistClick} className="p-1 hover:scale-110 transition-transform">
                  <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {pkg.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {pkg.rating} ({pkg.reviewsCount})
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
              {pkg.overview}
            </p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-500 ml-1">/person</span>
                {pkg.originalPrice > pkg.price && (
                  <span className="text-sm text-slate-400 line-through ml-2">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="text-red-600 font-medium text-sm">View Details →</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/packages/${pkg.slug}`} className="block group">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-md transition-all">
          <div className="relative h-32 w-full">
            {hasImage ? (
              <Image
                src={primaryImage}
                alt={pkg.title}
                fill
                className="object-cover"
                priority={priority}
              />
            ) : (
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
                No Image
              </div>
            )}
            {pkg.discount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                {pkg.discount}% OFF
              </span>
            )}
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-1">
              {pkg.title}
            </h4>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                ₹{pkg.price.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {pkg.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ═══════════════════════════════════════════════════
  // DEFAULT VARIANT — REDESIGNED
  // ═══════════════════════════════════════════════════
  return (
    <Link href={`/packages/${pkg.slug}`} className="block group h-full">
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300 h-full flex flex-col"
      >
        {/* Image Section */}
        <div className="relative h-52 md:h-60 w-full overflow-hidden">
          {hasImage ? (
            <Image
              src={primaryImage}
              alt={pkg.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
              No Image Available
            </div>
          )}

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <div className="flex flex-col gap-2">
              {/* Duration Badge */}
              <div className="inline-flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-sm">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                {pkg.duration}
              </div>

              {/* Seasonal Tag — only renders if seasonal */}
              {pkg.isSeasonal && (
                <div className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/40 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-amber-700 dark:text-amber-300 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Seasonal
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            {showWishlist && mounted && (
              <button 
                onClick={handleWishlistClick}
                className="p-2 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300"}`} />
              </button>
            )}
          </div>

          {/* Discount Badge */}
          {pkg.discount > 0 && (
            <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
              {pkg.discount}% OFF
            </div>
          )}

          {/* Rating Badge */}
          {pkg.rating > 0 && (
            <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{pkg.rating}</span>
              <span className="text-xs text-slate-500">({pkg.reviewsCount})</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {pkg.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
            {pkg.overview || "Experience an unforgettable journey with curated activities, comfortable stays, and breathtaking views."}
          </p>

          {/* Route Info */}
          {routeDisplay.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              {routeDisplay.slice(0, 3).map((loc, i) => (
                <span key={i} className="flex items-center">
                  {loc}
                  {i < Math.min(routeDisplay.length, 3) - 1 && (
                    <span className="mx-1 text-slate-400">›</span>
                  )}
                </span>
              ))}
              {routeDisplay.length > 3 && (
                <span className="text-slate-400">+{routeDisplay.length - 3} more</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ₹{pkg.price.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500">/person</span>
            {pkg.originalPrice > pkg.price && (
              <span className="text-xs text-slate-400 line-through ml-1">
                ₹{pkg.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Reserve Price */}
          {/* <div className="mb-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reserve now for only{' '}
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₹{pkg.reservePrice?.toLocaleString() || "2,000"}
              </span>
            </p>
          </div> */}

          {/* Divider */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-auto" />

          {/* Footer Features */}
          <div className="pt-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {featuresToShow.map((feat, i) => (
              <div key={i} className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="w-4 h-4 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-green-600 dark:text-green-400" />
                </div>
                <span className="truncate max-w-[100px]">{feat}</span>
              </div>
            ))}
            {pkg.highlights && pkg.highlights.length > 3 && (
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                +{pkg.highlights.length - 3} more
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}