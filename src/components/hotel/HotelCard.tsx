"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Building, Sparkles, Waves, Castle, Tent, Home, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/types";

interface HotelCardProps {
  hotel: Hotel;
  index: number;
  onInquire: (hotel: Hotel) => void;
}

const getPropertyIcon = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes("resort") || t.includes("waves")) return Waves;
  if (t.includes("villa") || t.includes("home")) return Home;
  if (t.includes("boutique") || t.includes("spark")) return Sparkles;
  if (t.includes("heritage") || t.includes("castle") || t.includes("palace")) return Castle;
  if (t.includes("tent") || t.includes("glamp") || t.includes("camp")) return Tent;
  return Building;
};

export function HotelCard({ hotel, index, onInquire }: HotelCardProps) {
  const Icon = getPropertyIcon(hotel.propertyType);
  const coverImageUrl = hotel.coverImage?.url || hotel.images?.[0]?.url || "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.5 }}
      className="h-full flex w-full"
    >
      <div className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/[0.04] dark:hover:shadow-red-500/[0.08] hover:border-red-500/20 dark:hover:border-red-500/20 hover:-translate-y-1.5 transition-all duration-500 h-full flex flex-col w-full">
        <Link href={`/hotel/${hotel.id}`} className="flex flex-col flex-grow">
          {/* Image Section */}
          <div className="relative h-56 w-full overflow-hidden shrink-0">
            <Image
              src={coverImageUrl}
              alt={hotel.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />
            
            {/* Property Type Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 dark:text-slate-200 shadow-xs border border-white/20 dark:border-slate-800/30 uppercase tracking-wider">
                <Icon className="w-3.5 h-3.5 text-red-500" />
                {hotel.propertyType}
              </span>
            </div>

            {/* Rating Star Badge */}
            <div className="absolute top-3 right-3 z-10">
              <div className="inline-flex items-center gap-1 bg-amber-500/90 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-xs">
                <Star className="w-3 h-3 fill-current" />
                <span>{hotel.starRating.replace("-Star", "").replace("star", "").trim()} ★</span>
              </div>
            </div>

            {/* Price display overlayed inside the image bottom */}
            <div className="absolute bottom-3 left-3 z-10">
              <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/20 dark:border-slate-800/30 flex flex-col leading-none">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-0.5">Starting from</span>
                <div className="flex items-baseline">
                  <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                    ₹{hotel.startingPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 ml-1 font-medium">
                    /{hotel.priceUnit === "Per Night" ? "night" : hotel.priceUnit === "Per Room" ? "room" : "person"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div className="space-y-2">
              {/* Location */}
              <div className="flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.15em]">
                <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate">{hotel.location}</span>
              </div>

              {/* Name */}
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {hotel.name}
              </h3>

              {/* Default Room Types & Amenities Highlights */}
              {hotel.defaultRoomTypes.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1">
                  {hotel.defaultRoomTypes.slice(0, 2).map((room, i) => (
                    <span
                      key={i}
                      className="inline-block bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-850"
                    >
                      {room}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Action button */}
        <div className="p-5 pt-0">
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={() => onInquire(hotel)}
              className="w-full h-10 rounded-xl bg-slate-900 hover:bg-red-600 text-white dark:bg-slate-850 dark:hover:bg-red-600 font-bold text-xs shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              Book / Inquire Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
