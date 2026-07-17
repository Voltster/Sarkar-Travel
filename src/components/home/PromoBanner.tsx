"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

interface BannerItem {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    link: string;
    color?: string; // Optional text color override
}

// Dummy Data - in a real app this would come from the CMS
const banners: BannerItem[] = [
    {
        id: "1",
        image: "https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg",
        title: "Northern Lights",
        subtitle: "#THE BEST NIGHT OF YOUR LIFE IN THE ARCTIC",
        link: "/packages?type=adventure",
        color: "#FFD700", // Gold color for text as seen in example
    },
    {
        id: "2",
        image: "https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg", // Tropical beach
        title: "Maldives Escape",
        subtitle: "Experience luxury in the heart of the ocean",
        link: "/destinations/maldives",
    },
    {
        id: "3",
        image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg", // Mountains
        title: "Swiss Alps",
        subtitle: "Adventure awaits at the top of the world",
        link: "/packages?type=adventure",
    }
];

export function PromoBanner() {
    const [swiperRef, setSwiperRef] = useState<any>(null);

    // Animation variants for text content
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="relative group">
                    <Swiper
                        onSwiper={setSwiperRef}
                        modules={[Navigation, Autoplay, EffectFade]}
                        spaceBetween={20}
                        slidesPerView={1}
                        effect="fade"
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="w-full rounded-2xl overflow-hidden shadow-premium"
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <Link href={banner.link} className="block relative aspect-[21/9] md:aspect-[3/1] w-full group overflow-hidden">
                                    <Image
                                        src={banner.image}
                                        alt={banner.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            variants={contentVariants}
                                            className="max-w-xl"
                                        >
                                            <h2
                                                className="text-4xl md:text-6xl lg:text-7xl font-serif mb-2"
                                                style={{ color: banner.color || "white", fontFamily: "cursive" }} // Using cursive for the style in image
                                            >
                                                {/* Note: In a real implementation, might want to use a specific font like 'Great Vibes' or similar for that script look */}
                                                <span className="font-serif italic">{banner.title}</span>
                                            </h2>
                                            <p className="text-white/90 text-sm md:text-lg font-bold tracking-widest uppercase">
                                                {banner.subtitle}
                                            </p>
                                        </motion.div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons (Outside the banner) */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button
                            onClick={() => swiperRef?.slidePrev()}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Previous
                        </button>
                        <button
                            onClick={() => swiperRef?.slideNext()}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors group"
                        >
                            Next
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
