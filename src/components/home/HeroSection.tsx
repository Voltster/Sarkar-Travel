"use client";

import { motion } from "framer-motion";
import { Flame, ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const destinations = [
  { label: "Varanasi", href: "/destinations/varanasi" },
  { label: "Kedarnath", href: "/destinations/kedarnath" },
  { label: "Ayodhya", href: "/destinations/ayodhya" },
  { label: "Rameswaram", href: "/destinations/rameswaram" },
  { label: "Rishikesh", href: "/destinations/rishikesh" },
  { label: "Haridwar", href: "/destinations/haridwar" },
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Rotating background video and image media of spiritual Indian landmarks
  const bgMedia = [
    { type: "video", url: "https://www.pexels.com/download/video/27413987/" },
    { type: "video", url: "https://www.pexels.com/download/video/32919071/" },
    { type: "image", url: "https://images.pexels.com/photos/11539838/pexels-photo-11539838.jpeg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bgMedia.length);
    }, 10000); // 10s gives video clips plenty of time to show
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] max-h-[780px] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {/* ═══════════════════════════════════════
          CINEMATIC BACKGROUND
          ═══════════════════════════════════════ */}
      {/* Animated background videos & images */}
      {bgMedia.map((media, i) => (
        <div
          key={media.url}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === currentImage ? "opacity-100" : "opacity-0"
            }`}
        >
          {media.type === "video" ? (
            <video
              src={media.url}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full brightness-50 scale-105"
            />
          ) : (
            <Image
              src={media.url}
              alt="Spiritual Yatra Destination"
              fill
              className="object-cover brightness-50 scale-105"
              priority={i === 0}
              sizes="100vw"
            />
          )}
          {/* Multi-layer Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent z-10 scale-110" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 z-10 scale-110" />
          <div className="absolute inset-0 bg-linear-to-br from-amber-900/20 via-transparent to-transparent z-10 mix-blend-overlay scale-110" />
        </div>
      ))}

      {/* Gradient overlays for depth */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/80" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" /> */}

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

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
            <span className="inline-flex items-center gap-2 text-primary/95 text-xs font-bold uppercase tracking-[0.3em]">
              <Flame className="w-4 h-4 text-primary animate-pulse" />
              Ananta Yatras
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-5"
          >
            Embark on a
            <br />
            <span className="text-gold-gradient italic">Sacred Yatra</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light"
          >
            Experience meticulously curated pilgrimages, sacred Char Dham yatras,
            and soul-stirring spiritual retreats across the timeless land of Bharat.
          </motion.p>

          {/* ═══════════════════════════════════════
              SEARCH BAR
              ═══════════════════════════════════════ */}
          <SearchBar />

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
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 group"
            >
              Begin Your Yatra
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#callback"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-amber-400" />
              Connect with Yatra Guide
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
          {bgMedia.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`text-xs font-bold transition-all duration-300 ${i === currentImage
                ? "text-amber-400 text-lg"
                : "text-white/30 hover:text-white/60"
                }`}
            >
              {`0${i + 1}`}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}