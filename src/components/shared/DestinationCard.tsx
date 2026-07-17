"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  variant?: "default" | "featured" | "compact";
}

export function DestinationCard({ destination, variant = "default" }: DestinationCardProps) {
  const heroImageValid = destination.heroImage?.trim() ? destination.heroImage.trim() : "";
  const imageValid = destination.image?.trim() ? destination.image.trim() : "";
  if (variant === "featured") {
    return (
      <Link href={`/destinations/${destination.slug}`} className="block group">
        <motion.div
          whileHover={{ y: -8 }}
          className="relative h-[400px] rounded-2xl overflow-hidden"
        >
          {heroImageValid ? (
            <Image
              src={heroImageValid}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
              No Image Available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/80 uppercase tracking-wider">
                {destination.country}
              </span>
              <span className="w-1 h-1 bg-white/50 rounded-full" />
              <span className="text-xs text-white/80">
                {destination.packagesCount} Packages
              </span>
            </div>
            <h3 className="text-3xl font-serif text-white mb-2">
              {destination.name}
            </h3>
            <p className="text-white/80 text-sm mb-4 line-clamp-2">
              {destination.tagline}
            </p>
            <div className="flex items-center gap-2 text-white font-medium">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/destinations/${destination.slug}`} className="block group">
        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
            {imageValid ? (
              <Image
                src={imageValid}
                alt={destination.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs text-center">
                No Image
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {destination.name}
            </h4>
            <p className="text-sm text-slate-500">
              {destination.packagesCount} Packages
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/destinations/${destination.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -4 }}
        className="relative h-72 rounded-2xl overflow-hidden"
      >
        {imageValid ? (
          <Image
            src={imageValid}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-sm">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {destination.name}
              </h3>
              <p className="text-white/80 text-sm">
                {destination.packagesCount || "12"} Packages
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
