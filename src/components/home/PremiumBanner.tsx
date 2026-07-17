"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  tag?: string;
  price?: string;
}

interface BannerProps {
  data: BannerSlide[];
}

export const PremiumBanner = ({ data }: BannerProps) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1 === data.length ? 0 : prev + 1));
    setProgress(0);
  }, [data.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    setProgress(0);
  }, [data.length]);

  // Auto-play with progress bar
  useEffect(() => {
    if (!isHovered && data.length > 1) {
      const duration = 5000;
      const interval = 50;
      const step = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            next();
            return 0;
          }
          return prev + step;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isHovered, data.length, next]);

  if (!data || data.length === 0) return null;

  const current = data[index];

  return (
    <section className="relative w-full bg-amber-200/5 dark:bg-slate-950">
      <div
        className="relative w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Banner Container */}
        <div className="relative h-[320px] sm:h-[380px] md:h-[440px] lg:h-[500px] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 dark:shadow-black/40 border bg-black">

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: `${direction * 100}%` }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: `${direction * -100}%` }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Link
                href={current.link}
                className="block w-full h-full relative group/link"
              >
                {/* Image with Ken Burns effect */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.08 }}
                  transition={{ duration: 8, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1440px"
                  />
                </motion.div>

                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent z-10 scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 z-10 scale-110" />
                <div className="absolute inset-0 bg-linear-to-br from-red-900/20 via-transparent to-transparent z-10 mix-blend-overlay scale-110" />


                {/* Content Container */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center px-6 sm:px-10 md:px-16 lg:px-20 pb-12 sm:pb-0 pointer-events-none">
                  <div className="max-w-2xl">

                    {/* Tag Badge */}
                    <AnimatePresence mode="wait">
                      {current.tag && (
                        <motion.div
                          key={`tag-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mb-4 inline-flex"
                        >
                          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                            <Play className="w-3 h-3 fill-white" />
                            {current.tag}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Subtitle */}
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      className="block text-white/70 text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3"
                    >
                      {current.subtitle}
                    </motion.span>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] sm:leading-[1.15] tracking-tight mb-4 sm:mb-6"
                    >
                      <span className="block">{current.title}</span>
                    </motion.h2>

                    {/* Price & CTA Row */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.6 }}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                    >
                      {current.price && (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-white/50 text-sm">from</span>
                          <span className="text-white text-xl sm:text-2xl font-bold">{current.price}</span>
                          <span className="text-white/50 text-sm">/person</span>
                        </div>
                      )}

                      <button className="pointer-events-auto inline-flex items-center gap-2 bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:bg-red-50 hover:text-red-700 transition-all duration-300 shadow-lg shadow-black/20 group/btn">
                        Explore Now
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom Right: Slide Counter */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 pointer-events-none">
                  <div className="flex items-center gap-3 text-white/60">
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-8 h-px bg-white/30" />
                    <span className="text-sm font-medium">
                      {String(data.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {data.length > 1 && (
            <>
              <div className="absolute inset-y-0 left-0 z-30 flex items-center pl-3 sm:pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  onClick={(e) => { e.preventDefault(); prev(); }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="absolute inset-y-0 right-0 z-30 flex items-center pr-3 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button
                  onClick={(e) => { e.preventDefault(); next(); }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </>
          )}

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-orange-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Bottom Indicators */}
          {data.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setDirection(i > index ? 1 : -1); setIndex(i); setProgress(0); }}
                  className="group/indicator relative"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-8 sm:w-10 bg-white' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/60'}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};