"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface FeaturedPackage {
  id: string;
  slug: string;
  title: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  highlights?: string[];
  overview?: string;
  featured?: boolean;
  featuredImage?: string | { url: string };
}

interface FeaturedJourneysProps {
  packages: FeaturedPackage[];
}

export function FeaturedJourneys({ packages }: FeaturedJourneysProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (packages.length === 0) return null;

  return (
    <section className="relative overflow-hidden 2xl:container mx-auto">
      {/* Premium Background Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-500/5 dark:bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-orange-500/5 dark:bg-orange-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="2xl:container mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block"
            >
              Curated for You
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
            >
              Featured{" "}
              <span className="italic text-red-600 dark:text-red-400">
                Journeys
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-3 max-w-lg"
            >
              Handpicked experiences selected by our travel experts.
            </motion.p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              href="/packages"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors group"
            >
              View All Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative">
          {/* Custom Premium Left Navigation Button */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className={`absolute -left-4 md:-left-6 top-[200px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Previous Featured Package"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Custom Premium Right Navigation Button */}
          <button
            onClick={() => swiperInstance?.slideNext()}
            className={`absolute -right-4 md:-right-6 top-[200px] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Next Featured Package"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".featured-pagination-container",
              bulletClass: "featured-bullet",
              bulletActiveClass: "featured-bullet-active",
            }}
            breakpoints={{
              
              540: { slidesPerView: 1.8 },
              768: { slidesPerView: 2.4 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={pkg.id} className="h-auto">
                <FeaturedCard pkg={pkg} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Premium Pagination Indicator container */}
          <div className="featured-pagination-container flex justify-center items-center gap-1 mt-12" />
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            View All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ pkg, index }: { pkg: FeaturedPackage; index: number }) {
  const imageUrl = getPackageImage(pkg);
  const highlights = pkg.highlights?.slice(0, 3) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/packages/${pkg.slug}`} className="block group h-full">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/[0.04] dark:hover:shadow-red-500/[0.08] hover:border-red-500/20 dark:hover:border-red-500/20 hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col">
          
          {/* Image Wrapper */}
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={pkg.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Premium Duration Badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-md border border-white/20 dark:border-slate-800/30">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                {pkg.duration}
              </div>
            </div>

            {/* Premium Price Badge */}
            <div className="absolute bottom-3 left-3 z-10">
              <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg shadow-md border border-white/20 dark:border-slate-800/30">
                <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-medium">
                  /person
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-grow bg-white dark:bg-slate-900">
            {/* Destination/Location */}
            {pkg.location && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.15em] mb-2.5">
                <MapPin className="w-3 h-3 text-red-500" />
                {pkg.location}
              </div>
            )}

            {/* Title */}
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors leading-snug">
              {pkg.title}
            </h3>

            {/* Divider/Spacer */}
            <div className="mt-auto" />

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2.5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <div className="w-4.5 h-4.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getPackageImage(pkg: FeaturedPackage): string {
  if (pkg.featuredImage) {
    return typeof pkg.featuredImage === "string"
      ? pkg.featuredImage
      : pkg.featuredImage.url;
  }
  if (pkg.images && pkg.images.length > 0) {
    return typeof pkg.images[0] === "string"
      ? pkg.images[0]
      : (pkg.images[0] as any).url || "";
  }
  return "/placeholder-destination.jpg";
}
