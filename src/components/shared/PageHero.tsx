"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    image: string;
    breadcrumbs?: { label: string; href?: string }[];
    children?: React.ReactNode;
    className?: string;
    overlayOpacity?: number;
}

export function PageHero({
    title,
    subtitle,
    image,
    breadcrumbs,
    children,
    className = "",
    overlayOpacity = 0.5
}: PageHeroProps) {
    return (
        <div className={`relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden flex items-center justify-center ${className}`}>
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                sizes="100vw"
                quality={100}
                className="object-cover"
                loading="lazy"
                draggable={false}

            />

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black transition-opacity duration-700"
                style={{ opacity: overlayOpacity }}
            />

            {/* Gradient for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center text-white">
                {/* Breadcrumb - Optional to show here or standard location */}
                {breadcrumbs && (
                    <div className="flex justify-center mb-6">
                        <Breadcrumb items={breadcrumbs} className="text-white/80" variant="hero" />
                    </div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Custom content injection (e.g. search bar, tags) */}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
