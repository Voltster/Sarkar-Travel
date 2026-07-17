"use client";

import { Package } from "@/types";
import { Users, Gauge, CalendarDays, MapPin, Star, Car, HotelIcon , IndianRupee } from "lucide-react";

interface QuickFactsProps {
    pkg: Package;
}

export function QuickFacts({ pkg }: QuickFactsProps) {
    if (!pkg.tripPace) return null;

    const facts = [
        {
            label: "Recommended",
            value: pkg.targetAudience?.join(", "),
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            label: "Pacing",
            value: pkg.tripPace,
            icon: IndianRupee,
            color: "text-orange-500",
            bg: "bg-orange-50 dark:bg-orange-900/20"
        },
        {
            label: "Best Season",
            value: pkg.bestTimeToVisit,
            icon: CalendarDays,
            color: "text-teal-500",
            bg: "bg-teal-50 dark:bg-teal-900/20"
        },
        {
            label: "Route",
            value: `${pkg.startCity} → ${pkg.endCity}`,
            icon: MapPin,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/20"
        },
        {
            label: "Hotel Grade",
            value: pkg.hotelQuality,
            icon: HotelIcon,
            color: "text-yellow-500",
            bg: "bg-yellow-50 dark:bg-yellow-900/20"
        },
        {
            label: "Transport",
            value: pkg.transportQuality,
            icon: Car,
            color: "text-indigo-500",
            bg: "bg-indigo-50 dark:bg-indigo-900/20"
        },
    ];

    return (
        <div className="py-8 my-8 border-y border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
                {facts.map((fact, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-4 group">
                        {/* Icon with soft background glow */}
                        {/* <div className={`w-12 h-12 rounded-2xl ${fact.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                            <fact.icon className={`w-6 h-6 ${fact.color}`} strokeWidth={1.5} />
                        </div> */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                            <fact.icon className={`w-8 h-8`} strokeWidth={1.5} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <span className="text-xs text-center text-slate-600 uppercase text-no">
                                {fact.label}
                            </span>
                            <span className="text-sm text-center font-medium text-slate-800 dark:text-white leading-snug">
                                {fact.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
