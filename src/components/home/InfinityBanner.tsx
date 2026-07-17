"use client";

import { motion } from "framer-motion";

const words = [
    "Travellerforlife",
    "Wanderlust",
    "Explore More",
    "Adventure Awaits",
    "Discover the World",
    "Endless Journeys",
    "Escape the Ordinary",
    "Set Sail",
    "Roam Free"
];

export function InfinityBanner() {
    return (
        <section className="bg-linear-to-br from-zinc-900 via-black to-zinc-900 py-4 overflow-hidden relative">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-6 md:gap-14 items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 200, // Adjust speed
                    }}
                >
                    {/* Repeat content enough times to fill screen + buffer for smooth loop */}
                    {Array.from({ length: 10 }).flatMap((_, i) =>
                        words.flatMap((word, index) => [
                            <span key={`${i}-${index}`} className="text-white/90 text-2xl md:text-4xl italic tracking-wide">
                                {word}
                            </span>,
                            <span key={`${i}-${index}-dot`} className="text-zinc-200 text-2xl md:text-4xl select-none">
                                •
                            </span>
                        ])
                    )}
                </motion.div>
            </div>
        </section>
    );
}
