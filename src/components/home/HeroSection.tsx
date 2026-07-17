"use client";

import { motion } from "framer-motion";
import { Compass, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const destinations = [
  { label: "Maldives", href: "/destinations/maldives" },
  { label: "Japan", href: "/destinations/japan" },
  { label: "Dubai", href: "/destinations/dubai" },
  { label: "Bali", href: "/destinations/bali" },
  { label: "Switzerland", href: "/destinations/switzerland" },
  { label: "Thailand", href: "/destinations/thailand" },
  { label: "Vietnam", href: "/destinations/vietnam" },
  { label: "Greece", href: "/destinations/greece" },
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Rotating background images for cinematic feel
  const bgImages = [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] max-h-[780px] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* ═══════════════════════════════════════
          CINEMATIC BACKGROUND
          ═══════════════════════════════════════ */}
      {/* Animated background images */}
      {bgImages.map((img, i) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentImage ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={img}
            alt="Travel destination"
            fill
            className="object-cover brightness-80"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent z-10 scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 z-10 scale-110" />
          <div className="absolute inset-0 bg-linear-to-br from-red-900/10 via-transparent to-transparent z-10 mix-blend-overlay scale-110" />
        </div>
      ))}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ═══════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════ */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-red-500/90 text-xs font-bold uppercase tracking-[0.3em]">
              <Compass className="w-4 h-4" />
              Ananta Travels
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-5"
          >
            Where Will You
            <br />
            <span className="italic text-red-500">Go Next?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light"
          >
            Discover handpicked destinations, curated experiences, and
            personalized journeys.
          </motion.p>

          {/* ═══════════════════════════════════════
              SEARCH BAR
              ═══════════════════════════════════════ */}
          <SearchBar />

          {/* ═══════════════════════════════════════
              DESTINATION QUICK CHIPS
              ═══════════════════════════════════════ */}
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mt-5 max-w-xl mx-auto"
          >
            {destinations.slice(0, 6).map((dest) => (
              <Link
                key={dest.label}
                href={dest.href}
                className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 text-xs font-medium hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-200"
              >
                {dest.label}
              </Link>
            ))}
          </motion.div> */}

          {/* ═══════════════════════════════════════
              CTA BUTTONS
              ═══════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8"
          >
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 group"
            >
              Explore Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#callback"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Talk to Travel Expert
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/30">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side decorative elements (desktop) */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-4">
          {["01", "02", "03"].map((num, i) => (
            <button
              key={num}
              onClick={() => setCurrentImage(i)}
              className={`text-xs font-bold transition-all duration-300 ${i === currentImage
                ? "text-red-400 text-lg"
                : "text-white/30 hover:text-white/60"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}