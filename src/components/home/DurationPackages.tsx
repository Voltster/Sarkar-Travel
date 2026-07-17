"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { durationPackages, durationOptions } from "@/data/categories";
import { ArrowUpRight } from "lucide-react";

export function DurationPackages() {
  const [activeDuration, setActiveDuration] = useState("short");

  const filteredPackages = durationPackages.filter(
    (pkg) => pkg.duration === activeDuration
  );

  return (
    <section className="py-20">
      <div className="2xl:container mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4">
              Packages by duration
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Select a duration to find the perfect getaway for your schedule.
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full self-start md:self-auto">
            {durationOptions.map((duration) => (
              <button
                key={duration.id}
                onClick={() => setActiveDuration(duration.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative ${activeDuration === duration.id
                  ? "text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                {activeDuration === duration.id && (
                  <motion.div
                    layoutId="activeDuration"
                    className="absolute inset-0 bg-[#350d0d] rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{duration.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((item, index) => (
              <Card
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ item, index }: { item: typeof durationPackages[0]; index: number }) {
  // Determine span based on index for variety, but keep it robust
  // First item helps anchor the grid visually in "short" and "long" modes
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.26 }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${isLarge ? "md:col-span-2" : ""
        }`}
    >
      <Link href={item.link} className="block h-full w-full">
        <Image
          src={item.image}
          alt={item.destination}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 p-8 w-full text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-3xl tracking-wide">{item.destination}</h3>
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-base font-medium text-white/90">
            Starts from <span className="text-xl font-bold">₹{item.price}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
