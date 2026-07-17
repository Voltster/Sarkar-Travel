"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    currentIndex: number;
    onIndexChange: (index: number) => void;
}

export function ImageLightbox({
    isOpen,
    onClose,
    images,
    currentIndex,
    onIndexChange,
}: ImageLightboxProps) {
    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                onIndexChange((currentIndex - 1 + images.length) % images.length);
            } else if (e.key === "ArrowRight") {
                onIndexChange((currentIndex + 1) % images.length);
            }
        },
        [isOpen, onClose, currentIndex, images.length, onIndexChange]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        // Lock body scroll when open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [handleKeyDown, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-white/95 backdrop-blur-sm"
                    onClick={onClose} // Close on backdrop click
                >
                    {/* Close Button */}
                    {/* Close Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="fixed top-14 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-black hover:bg-white/20 transition-all shadow-premium cursor-pointer md:top-6 md:right-6"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>

                    {/* Navigation Buttons (only if > 1 image) */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onIndexChange((currentIndex - 1 + images.length) % images.length);
                                }}
                                className="absolute left-4 md:left-8 p-3 rounded-full bg-black/10 text-black hover:bg-black/20 transition-colors z-50 hidden md:block cursor-pointer"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onIndexChange((currentIndex + 1) % images.length);
                                }}
                                className="absolute right-4 md:right-8 p-3 rounded-full bg-black/10 text-black hover:bg-black/20 transition-colors z-50 hidden md:block cursor-pointer"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* Main Image Container */}
                    <div
                        className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            key={currentIndex}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full flex items-center justify-center"
                        >
                            <div className="relative w-full h-full max-h-[85vh]  ">
                                <Image
                                    src={images[currentIndex]}
                                    alt={`Gallery Image ${currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                    quality={100}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer / Counter */}
                    <div className="absolute bottom-6 left-0 right-0 text-center text-black/70 text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Thumbnail Strip (Optional - Simple Dots/Preview) */}
                    <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 no-scrollbar">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onIndexChange(idx);
                                }}
                                className={`cursor-pointer relative w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex ? "border-red-600 opacity-100 scale-110" : "border-transparent opacity-50 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
