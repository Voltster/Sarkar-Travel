"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { HotelCard } from "./HotelCard";
import type { Hotel } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HotelSwiperSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  hotels: Hotel[];
  onInquire: (hotel: Hotel) => void;
  uniqueId: string;
}

export function HotelSwiperSection({
  title,
  subtitle,
  badge,
  hotels,
  onInquire,
  uniqueId,
}: HotelSwiperSectionProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!hotels || hotels.length === 0) return null;

  const prevButtonClass = `prev-btn-${uniqueId}`;
  const nextButtonClass = `next-btn-${uniqueId}`;
  const paginationClass = `pagination-${uniqueId}`;

  return (
    <section className="relative overflow-hidden py-10">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-2.5 block"
              >
                {badge}
              </motion.span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2 max-w-lg"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Navigation Buttons for larger screens */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              disabled={isBeginning}
              className={`w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer ${prevButtonClass}`}
              aria-label="Previous stays"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              disabled={isEnd}
              className={`w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all cursor-pointer ${nextButtonClass}`}
              aria-label="Next stays"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Area */}
        <div className="relative">
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
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: `.${paginationClass}`,
              bulletClass: "featured-bullet",
              bulletActiveClass: "featured-bullet-active",
            }}
            breakpoints={{
              540: { slidesPerView: 1.8 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!overflow-visible"
          >
            {hotels.map((hotel, index) => (
              <SwiperSlide key={hotel.id || hotel._id} className="h-auto flex">
                <HotelCard hotel={hotel} index={index} onInquire={onInquire} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination container */}
          <div className={`${paginationClass} flex justify-center items-center gap-1 mt-8`} />
        </div>
      </div>
    </section>
  );
}
