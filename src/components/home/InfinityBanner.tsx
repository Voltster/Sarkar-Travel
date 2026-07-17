"use client";

import { motion } from "framer-motion";

const words = [
    "ॐ नमः शिवाय • Om Namah Shivaya",
    "चरैवेति चरैवेति • Keep Moving Forward",
    "सत्यं शिवं सुन्दरम् • Truth, Auspiciousness, Beauty",
    "वसुधैव कुटुम्बकम् • The World is One Family",
    "लोकः समस्ताः सुखिनो भवन्तु • May All Beings Be Happy",
    "नमो भगवते वासुदेवाय • Salutations to the Divine",
    "Ananta Yatras • Sacred Journeys",
    "Divine Darshan • Spiritual Awakening"
];

export function InfinityBanner() {
    return (
        <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 py-4 overflow-hidden relative shadow-inner">
            {/* Subtle overlay texture */}
            <div className="absolute inset-0 bg-mandala opacity-10" />
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-6 md:gap-14 items-center"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 160, // Slower, more peaceful scroll
                    }}
                >
                    {/* Repeat content enough times to fill screen + buffer for smooth loop */}
                    {Array.from({ length: 8 }).flatMap((_, i) =>
                        words.flatMap((word, index) => [
                            <span key={`${i}-${index}`} className="text-white font-serif tracking-wider text-xl md:text-2xl font-medium drop-shadow-sm">
                                {word}
                            </span>,
                            <span key={`${i}-${index}-dot`} className="text-amber-200 text-xl md:text-2xl select-none">
                                • 🪷 •
                            </span>
                        ])
                    )}
                </motion.div>
            </div>
        </section>
    );
}
