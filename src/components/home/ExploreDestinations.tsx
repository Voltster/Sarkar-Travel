"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";

interface DestinationItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  heroImage?: string;
  packageCount: number;
  featured?: boolean;
}

interface ExploreDestinationsProps {
  destinations: DestinationItem[];
}

export function ExploreDestinations({ destinations }: ExploreDestinationsProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (destinations.length === 0) return null;

  return (
    <section className="pt-36 md:pt-40 pb-16 md:pb-20">
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
              Destinations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
            >
              Explore{" "}
              <span className="italic text-red-600 dark:text-red-400">
                Destinations
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-3 max-w-lg"
            >
              Browse all destinations and discover available journeys.
            </motion.p>
          </div>
          <Link
            href="/destinations"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors group"
          >
            See All Destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav Buttons */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/30 flex items-center justify-center text-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-all duration-300 ${
              isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => swiperInstance?.slideNext()}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/30 flex items-center justify-center text-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-all duration-300 ${
              isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.3}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              640: { slidesPerView: 3.2 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="overflow-hidden"
          >
            {destinations.map((dest, index) => (
              <SwiperSlide key={dest.id} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                >
                  <DestinationCard item={dest} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            See All Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ item }: { item: DestinationItem }) {
  const imageUrl = item.image || item.heroImage || "/placeholder-destination.jpg";

  return (
    <Link href={`/destinations/${item.slug}`} className="block group">
      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md shadow-slate-200/40 dark:shadow-black/40 hover:shadow-xl transition-shadow duration-300">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-white text-lg md:text-xl font-bold tracking-tight drop-shadow-lg">
            {item.name}
          </h3>
          <p className="text-white/60 text-xs font-medium uppercase tracking-wider mt-1">
            {item.packageCount} {item.packageCount === 1 ? "Package" : "Packages"}
          </p>
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </Link>
  );
}
