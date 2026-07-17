"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import { ImageLightbox } from "@/components/shared/ImageLightbox";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsSectionProps {
    reviews: Review[];
    rating: number;
    count: number;
}

export function ReviewsSection({ reviews = [], rating, count }: ReviewsSectionProps) {
    const [visibleCount, setVisibleCount] = useState(5);
    const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; images: string[]; index: number }>({
        isOpen: false,
        images: [],
        index: 0
    });

    const openLightbox = (images: string[], index: number) => {
        setLightboxState({
            isOpen: true,
            images,
            index
        });
    };

    const closeLightbox = () => {
        setLightboxState(prev => ({ ...prev, isOpen: false }));
    };

    const visibleReviews = reviews.slice(0, visibleCount);

    return (
        <section className="py-8 scroll-mt-32">
            {/* Header / Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400">
                        <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-color-text-primary">
                            {rating} Rating
                        </h3>
                        <p className="text-sm text-color-text-secondary">
                            Based on {reviews.length || count} verified reviews
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {visibleReviews.length > 0 ? (
                    <AnimatePresence mode="popLayout">
                        {visibleReviews.map((review, idx) => (
                            <motion.div
                                key={review.id || idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3, delay: (idx % 5) * 0.05 }}
                                className="flex flex-col p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 shadow-xs"
                            >
                                {/* Author and location */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gradient-to-tr from-red-500 to-red-500 shrink-0 shadow-inner">
                                        {review.avatar ? (
                                            <Image 
                                                src={review.avatar} 
                                                alt={review.author} 
                                                fill 
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-base">
                                                {review.author[0]?.toUpperCase() || "G"}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-color-text-primary text-base leading-none mb-1.5 flex items-center gap-1.5">
                                            {review.author}
                                            <span className="flex items-center gap-0.5 text-color-text-secondary text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full font-normal">
                                                <CheckCircle className="w-3 h-3 text-green-500" /> Verified
                                            </span>
                                        </h5>
                                        <div className="text-xs text-color-text-secondary leading-none">
                                            {review.location || "Verified Traveler"}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Star Rating and Date */}
                                <div className="flex items-center gap-2 mb-3 text-xs">
                                    <div className="flex text-amber-500 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                                        ))}
                                    </div>
                                    <span className="text-color-text-tertiary">·</span>
                                    <span className="font-medium text-color-text-secondary">{review.date}</span>
                                </div>
                                
                                {/* Review Text */}
                                <p className="text-color-text-secondary leading-relaxed text-sm flex-grow whitespace-pre-line">
                                    {review.content}
                                </p>
                                
                                {/* Review Images */}
                                {review.images && review.images.length > 0 && (
                                    <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
                                        {review.images.map((img, imageIdx) => (
                                            <div
                                                key={imageIdx}
                                                className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 cursor-pointer group/img"
                                                onClick={() => openLightbox(review.images || [], imageIdx)}
                                            >
                                                <Image
                                                    src={img}
                                                    alt="Review attachment"
                                                    fill
                                                    className="object-cover group-hover/img:scale-110 transition-transform duration-300"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="col-span-2 text-center py-12 text-color-text-secondary bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                        No reviews yet for this package. Be the first to review!
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
                {reviews.length > visibleCount && (
                    <button
                        onClick={() => setVisibleCount(prev => Math.min(prev + 5, reviews.length))}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-md shadow-red-200 dark:shadow-none inline-flex items-center gap-1.5"
                    >
                        Show next 5 reviews ({reviews.length - visibleCount} remaining)
                    </button>
                )}
                {visibleCount > 5 && (
                    <button
                        onClick={() => setVisibleCount(5)}
                        className="px-6 py-2.5 bg-transparent dark:bg-slate-900 text-color-text-primary hover:bg-muted dark:hover:bg-slate-800 border border-border rounded-lg text-sm font-semibold transition-all cursor-pointer"
                    >
                        Show less
                    </button>
                )}
            </div>

            <ImageLightbox
                isOpen={lightboxState.isOpen}
                onClose={closeLightbox}
                images={lightboxState.images}
                currentIndex={lightboxState.index}
                onIndexChange={(newIndex) => setLightboxState(prev => ({ ...prev, index: newIndex }))}
            />
        </section>
    );
}
