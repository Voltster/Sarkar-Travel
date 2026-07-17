"use client";

import { motion } from "framer-motion";
import { ArrowRight, Palmtree, Crown, Users, Heart, Sparkles, Tent } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    title: "Beach Escapes",
    description: "Sun, sand, and serenity by the ocean",
    icon: Palmtree,
    href: "/packages?tag=beach",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderHover: "hover:border-cyan-300 dark:hover:border-cyan-700",
  },
  {
    title: "Luxury Holidays",
    description: "Five-star stays and premium experiences",
    icon: Crown,
    href: "/packages?tag=luxury",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
  },
  {
    title: "Family Trips",
    description: "Memorable adventures for all ages",
    icon: Users,
    href: "/packages?tag=family",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-600 dark:text-green-400",
    borderHover: "hover:border-green-300 dark:hover:border-green-700",
  },
  {
    title: "Honeymoon",
    description: "Romantic getaways for two",
    icon: Heart,
    href: "/packages?tag=honeymoon",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    borderHover: "hover:border-rose-300 dark:hover:border-rose-700",
  },
  {
    title: "Spiritual Journeys",
    description: "Find peace at sacred destinations",
    icon: Sparkles,
    href: "/packages?tag=spiritual",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderHover: "hover:border-violet-300 dark:hover:border-violet-700",
  },
  {
    title: "Weekend Getaways",
    description: "Quick escapes from the everyday",
    icon: Tent,
    href: "/packages?tag=weekend",
    gradient: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    borderHover: "hover:border-orange-300 dark:hover:border-orange-700",
  },
];

export function TravelCollections() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="2xl:container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block"
          >
            Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
          >
            Travel{" "}
            <span className="italic text-red-600 dark:text-red-400">
              Collections
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-3 max-w-md mx-auto"
          >
            Find your perfect trip by travel style.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
            >
              <Link href={collection.href} className="block group">
                <div
                  className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 ${collection.borderHover} bg-white dark:bg-slate-900 p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-slate-950/40 hover:-translate-y-1`}
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <collection.icon
                        className={`w-5 h-5 ${collection.iconColor}`}
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {collection.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-red-500 dark:group-hover:text-red-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
