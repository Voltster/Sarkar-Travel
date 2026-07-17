"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Star, Headphones, Map } from "lucide-react";

const partners = [
  { name: "Expedia", src: "/images/partners/expedia.png", height: 24 },
  { name: "Amadeus", src: "/images/partners/amadeus.png", height: 20 },
  { name: "IATA", src: "/images/partners/aa.png", height: 28 },
  { name: "NBAA", src: "/images/partners/nbaa.png", height: 18 },
  { name: "Viator", src: "/images/partners/viator.png", height: 22 },
  { name: "AIG", src: "/images/partners/aig.png", height: 24 },
];

const stats = [
  { icon: Users, value: "15k+", label: "Travelers" },
  { icon: Star, value: "4.9", label: "Rating" },
  { icon: Headphones, value: "24×7", label: "Support" },
  { icon: Map, value: "100+", label: "Curated Trips" },
];

export function TrustStrip() {
  return (
    <section className="relative bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/50">
      <div className="2xl:container mx-auto px-6 md:px-8">
        {/* Partner Logos Row */}
        <div className="py-8 border-b border-slate-100 dark:border-slate-800/30">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] text-center mb-6">
            Trusted Industry Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="relative opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  height={partner.height}
                  width={120}
                  className="h-5 md:h-6 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Stats Row */}
        <div className="py-6 md:py-8">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4.5 h-4.5 text-red-600 dark:text-red-400" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
