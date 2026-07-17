"use client";

import { motion } from "framer-motion";

export function SpiritualQuote() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Subtle Mandala */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] text-amber-700 animate-[spin_120s_linear_infinite]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          {/* Decorative spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 80 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 80 * Math.sin((angle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="0.25"
              />
            );
          })}
          {/* Inner lotus patterns */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const x = 100 + 40 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 40 * Math.sin((angle * Math.PI) / 180);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
              />
            );
          })}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Top Ornament */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
          <span className="text-amber-500 dark:text-amber-400 text-lg">✦ 🔱 ✦</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
        </motion.div>

        {/* Sanskrit Verse */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-800 dark:text-amber-300 font-bold tracking-wide leading-relaxed mb-6"
        >
          “ चरैवेति चरैवेति ”
        </motion.h3>

        {/* Translation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg sm:text-xl font-serif italic text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          “Keep moving forward, keep wandering. For the traveler's soul blossoms, and their journey leads them to the divine.”
        </motion.p>

        {/* Source */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold block"
        >
          — Aitareya Brahmana, Rigveda
        </motion.span>

        {/* Bottom Ornament */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center gap-4 mt-8"
        >
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-500/30" />
          <span className="text-amber-500/60 dark:text-amber-400/60 text-sm">🪷</span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-500/30" />
        </motion.div>
      </div>
    </section>
  );
}
