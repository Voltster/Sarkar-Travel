"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Package } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

type CardVariant = "standard" | "immersive";

interface CarouselItem {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  location?: string;
}

interface ContentCarouselProps {
  title: string;
  items: CarouselItem[];
  variant?: CardVariant;
  className?: string;
  seeAllLink?: string;
}

export function ContentCarousel({
  title,
  items,
  variant = "standard",
  className = "",
  seeAllLink = "/destinations",
}: ContentCarouselProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (process.env.NODE_ENV === "development" && items.length > 0) {
    console.log(`[ContentCarousel] "${title}" - ${items.length} items`);
  }

  return (
    <section
      className={`pt-20 pb-16 md:pb-20 ${className}`}
    >
      <div className="2xl:container mx-auto px-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
              {variant === "standard" ? "Explore" : "Discover"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {variant === "standard" ? (
                <>
                  Pick from{" "}
                  <span className="italic text-red-600 dark:text-red-400">
                    Trending
                  </span>
                </>
              ) : (
                <>
                  Visa{" "}
                  <span className="italic text-red-600 dark:text-red-400">
                    Free
                  </span>
                </>
              )}
            </h2>
          </div>
          <Link
            href={seeAllLink}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors pb-1"
          >
            See all destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile See All */}
        <div className="md:hidden mb-6">
          <Link
            href={seeAllLink}
            className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No destinations available</p>
          </div>
        ) : (
          <div className="relative">
            {/* Custom Navigation */}
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/30 flex items-center justify-center text-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-all duration-300 ${
                isBeginning
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/30 flex items-center justify-center text-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-all duration-300 ${
                isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.1}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              breakpoints={{
                480: { slidesPerView: variant === "standard" ? 1.2 : 2.2 },
                640: { slidesPerView: variant === "standard" ? 1.5 : 3.2 },
                768: { slidesPerView: variant === "standard" ? 2.2 : 3.2 },
                1024: { slidesPerView: variant === "standard" ? 2.5 : 4.2 },
                1280: { slidesPerView: variant === "standard" ? 3.2 : 5.2 },
              }}
              className="content-carousel-swiper !overflow-visible"
            >
              {items.map((item, index) => (
                <SwiperSlide key={item.id} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="h-full"
                  >
                    {variant === "standard" ? (
                      <TrendingCard item={item} />
                    ) : (
                      <VisaFreeCard item={item} />
                    )}
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   TRENDING CARD — Horizontal Layout
   For long titles + package counts
   ═══════════════════════════════════════ */
function TrendingCard({ item }: { item: CarouselItem }) {
  const packageCount = item.subtitle?.match(/^(\d+)/)?.[1];
  const hasPackages = item.subtitle?.toLowerCase().includes("package");

  const CardContent = (
    <div className="group h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row ">
      {/* Image — Square on mobile, left side on sm+ */}
      <div className="relative w-full sm:w-40 md:w-48 lg:w-56 aspect-[4/3] sm:aspect-auto sm:shrink-0 overflow-hidden">
        <Image
          src={item.image || "/placeholder-destination.jpg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-destination.jpg";
          }}
        />
        {/* Subtle gradient for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent sm:hidden" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-5 md:p-6 flex-1 min-w-0">
        <div>
          {/* Location tag if available */}
          {item.location && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.15em] mb-2">
              <MapPin className="w-3 h-3" />
              {item.location}
            </div>
          )}

          {/* Title — Truncated with line clamp for very long names */}
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {item.title}
          </h3>

          {/* Subtitle / Package count */}
          {hasPackages && packageCount ? (
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Package className="w-3.5 h-3.5" />
              <span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {packageCount}
                </span>{" "}
                {parseInt(packageCount) === 1 ? "Package" : "Packages"} available
              </span>
            </div>
          ) : (
            item.subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                {item.subtitle}
              </p>
            )
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider group-hover:gap-2 transition-all">
            Explore
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );

  return item.link ? (
    <Link href={item.link} className="block h-full">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}

/* ═══════════════════════════════════════
   VISA FREE CARD — Immersive Square
   For short names, full-bleed images
   ═══════════════════════════════════════ */
function VisaFreeCard({ item }: { item: CarouselItem }) {
  const CardContent = (
    <div className="group relative aspect-square w-full rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-slate-200/50 dark:shadow-black/40 hover:shadow-xl transition-shadow duration-300">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content — Bottom centered */}
      <div className="absolute inset-x-0 bottom-0 p-6 text-center">
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight drop-shadow-lg">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-white/60 text-xs mt-1.5 font-medium uppercase tracking-wider">
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <ArrowRight className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  return item.link ? (
    <Link href={item.link} className="block">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}