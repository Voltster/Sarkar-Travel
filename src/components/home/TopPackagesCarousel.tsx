"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Star, Clock, MapPin, Check, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/navigation';
import { usePackages } from "@/hooks/usePackages";
import type { Package } from "@/types";

import React, { useState } from "react";
import type { Swiper as SwiperType } from 'swiper';

interface TopPackagesCarouselProps {
    initialPackages?: Package[];
}

export function TopPackagesCarousel({ initialPackages }: TopPackagesCarouselProps = {}) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const { packages: hookedPackages, isLoading } = usePackages();

    const packages = initialPackages || hookedPackages;
    const showLoading = !initialPackages && isLoading;

    if (showLoading) {
        return (
            <section className="pt-20 pb-16 md:pb-20 bg-white dark:bg-slate-950 overflow-hidden relative">
                <div className="2xl:container mx-auto pl-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 w-80 bg-slate-200 dark:bg-slate-800 rounded" />
                        <div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
                        <div className="h-64 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-20 pb-16 md:pb-20 bg-white dark:bg-slate-950 overflow-hidden relative">
            <div className="2xl:container mx-auto pl-8 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="1174" height="330" viewBox="0 0 1174 330" fill="none" className="absolute -top-20 right-0">
                    <path d="M1.24322 -197.284L138.636 -218.9C209.786 -230.094 281.873 -205.422 331.244 -152.981L354.813 -127.946L365.777 -114.195C378.574 -98.1454 393.574 -83.9837 410.332 -72.1295L664.964 107.993C723.007 149.051 797.425 159.226 864.359 135.255L1002.89 85.6447C1075.78 59.5416 1157.04 74.0548 1216.39 123.774L1454.27 323.064" stroke="#FFE3E3" strokeWidth="16" />
                </svg>
                <div className="relative z-10">

                    {/* <h2 className="text-5xl md:text-6xl text-slate-900 dark:text-white mb-4 font-serif leading-tight font-medium ">
                        Explore Our Top <br />
                        Destination Packages
                    </h2> */}
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
                        Explore Our  </span>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                        {/* <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 border border-red-200 dark:border-green-800 rounded-full px-4 py-1.5">
                            <span className="md:text-xl text-lg">😍</span>
                            <span className="md:text-xl text-lg font-semibold text-slate-800 dark:text-green-100">70+ trips booked this month</span>
                        </div> */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                            Top Destination{" "}
                            <span className="italic text-red-600 dark:text-red-400">
                                Packages
                            </span>
                        </h2>
                        <Link href="/packages" className="flex items-center gap-2 text-xl font-medium text-slate-700 hover:text-slate-900 transition-colors pr-8">
                            View all packages
                            <ChevronRight className="w-6 h-6" />
                        </Link>
                    </div>

                </div>

                <div className="relative">
                    {/* Custom Left Navigation Button */}
                    <div
                        onClick={() => swiperInstance?.slidePrev()}
                        className={`absolute left-0 top-[104px] md:top-[120px] -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/70 hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 backdrop-blur-sm text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/50 dark:border-slate-800/50 shadow-premium transition-all duration-300 z-50 block cursor-pointer ${isBeginning ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </div>

                    {/* Custom Right Navigation Button */}
                    <div
                        onClick={() => swiperInstance?.slideNext()}
                        className={`absolute right-4 md:right-8 top-[104px] md:top-[120px] -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/70 hover:bg-white dark:bg-slate-900/70 dark:hover:bg-slate-900 backdrop-blur-sm text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 border border-slate-200/50 dark:border-slate-800/50 shadow-premium transition-all duration-300 z-50 block cursor-pointer ${isEnd ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'}`}
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </div>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={16}
                        slidesPerView={1.1}
                        onSwiper={setSwiperInstance}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            1024: { slidesPerView: 2.5 },
                            1280: { slidesPerView: 3.2 },
                        }}
                        className="pb-20! top-packages-swiper"
                    >
                        {packages.map((pkg, index) => (
                            <SwiperSlide key={pkg.id}>
                                <PackageCard item={pkg} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

function PackageCard({ item }: { item: Package }) {
    const featuresToShow = item.highlights ? item.highlights.slice(0, 3) : [];
    const extraFeatures = item.highlights ? Math.max(0, item.highlights.length - 3) : 0;
    console.log(item);

    return (
        <Link href={`/packages/${item.slug}`} className="block group h-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 transition-all duration-300 h-full flex flex-col">

                {/* Image Section */}
                <div className="relative h-52 md:h-60 w-full overflow-hidden">
                    <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                        {/* Duration Badge */}
                        <div className="inline-flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-sm">
                            <Clock className="w-3.5 h-3.5 text-red-500" />
                            {item.duration}
                        </div>

                        {/* Seasonal Tag - Only shown if seasonal */}
                        {item.isSeasonal && (
                            <div className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/40 px-3 py-1.5 rounded-lg text-xs font-bold text-amber700 dark:text-amber300 shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-amber500 text-amber500" />
                                Seasonal
                            </div>
                        )}
                    </div>

                    {/* Price Overlay on Image */}
                    <div className="absolute bottom-3 left-3">
                        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">₹{item.price.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">/person</span>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red400 transition-colors">
                        {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                        {item.overview || "Experience an unforgettable journey with curated activities, comfortable stays, and breathtaking views."}
                    </p>

                    {/* Route Info */}
                    {item.route && item.route.length > 0 && (() => {
                        const route = item.route;
                        return (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <span className="font-medium">Route:</span>
                                {route.slice(0, 3).map((loc, i) => (
                                    <span key={i} className="flex items-center">
                                        {loc}
                                        {i < Math.min(route.length, 3) - 1 && (
                                            <ChevronRight className="w-3 h-3 mx-0.5 text-slate-400" />
                                        )}
                                    </span>
                                ))}
                                {route.length > 3 && (
                                    <span className="text-slate-400">+{route.length - 3} more</span>
                                )}
                            </div>
                        );
                    })()}

                    {/* Reserve Price */}
                    {/* <div className="mb-4">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Reserve now for only{' '}
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                ₹{item.reservePrice ? item.reservePrice.toLocaleString() : "2,000"}
                            </span>
                        </p>
                    </div> */}

                    {/* Divider */}
                    <div className="border-t border-slate-100 dark:border-slate-800 my-auto" />

                    {/* Footer Features */}
                    <div className="pt-4 flex items-center gap-3 overflow-x-auto scrollbar-hide">
                        {featuresToShow.map((feat, i) => (
                            <div key={i} className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-slate-600 dark:text-slate-300">
                                <div className="w-4 h-4 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-2.5 h-2.5 text-green-600 dark:text-green400" />
                                </div>
                                {feat}
                            </div>
                        ))}
                        {extraFeatures > 0 && (
                            <div className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                                +{extraFeatures} more
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
