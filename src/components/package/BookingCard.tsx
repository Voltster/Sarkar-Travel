"use client";

import { Package } from "@/types";
import { useState } from "react";
import { BookingModal } from "./BookingModal";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BookingCardProps {
    pkg: Package;
}

export function BookingCard({ pkg }: BookingCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const guests = 1;

    const price = pkg.price || 0;
    const baseTotal = price * guests;
    const serviceFee = 0;
    const total = baseTotal + serviceFee;

    const firstReview = pkg.reviews?.[0] || {
        author: "Nandhu Mohandas",
        content: `Had a wonderful honeymoon trip to ${pkg.location} with Ananta Travels. Everything was perfectly planned and executed.`,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
    };

    return (
        <>
            <div className="sticky top-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 border border-border dark:border-red-400/10 rounded-2xl shadow-airbnb overflow-hidden mb-4"
                >
                    {/* Top Header Row (Ref image layout) */}
                    <div className="py-3.5 px-6 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-center gap-2 text-red-500 dark:text-red-400 text-sm font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <span>Add trip details</span>
                    </div>

                    {/* Main Card Content */}
                    <div className="p-6">
                        <div className="flex flex-col mb-6">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">₹{price.toLocaleString()}</span>
                                <span className="text-base text-slate-500 dark:text-slate-400 font-normal ml-1">/ person</span>
                            </div>
                            <span className="text-[13px] text-slate-500 dark:text-slate-400 font-normal mt-1.5 leading-none">Excluding Applicable Taxes</span>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-500/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center text-base"
                        >
                            Unlock your itinerary
                        </button>

                        <p className="text-center text-color-text-tertiary text-xs mt-4">You won't be charged yet</p>

                        {serviceFee > 0 && (
                            <div className="mt-4 flex justify-between text-color-text-secondary text-sm">
                                <span className="underline">Service fee</span>
                                <span>₹{serviceFee.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="my-5 border-t border-border" />

                        <div className="flex justify-between items-center font-bold text-color-text-primary text-sm">
                            <span>Total before taxes</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </motion.div>

                {/* WhatsApp Support Outlined / Secondary style */}
                <Link 
                    href={`https://api.whatsapp.com/send/?phone=+917505545010&text=Hi%2C%20I%27m%20interested%20in%20${pkg.slug}%20trip.%20Can%20you%20please%20provide%20me%20more%20details%3F`} 
                    target="_blank"
                >
                    <button
                        className="w-full bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-600/20 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 py-3 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20 transition-all flex justify-between items-center px-4 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0"><path fill="currentColor" d="M4 12a8 8 0 113.96 6.906 1 1 0 00-.773-.101l-2.724.753.775-2.653a1 1 0 00-.103-.795A7.958 7.958 0 014 12zm8-10C6.477 2 2 6.477 2 12a9.96 9.96 0 001.199 4.751L2.04 20.72a1 1 0 001.226 1.244l4.059-1.122A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm2.004 12.226l.435-.38a.83.83 0 011-.07l1.068.699a.835.835 0 01.135.11l.114.114a.842.842 0 01-.069 1.248l-.9.725c-.296.238-.663.369-1.038.317-.977-.136-3.018-.634-4.839-2.466-1.77-1.781-2.555-3.983-2.862-5.117-.13-.475.01-.97.329-1.344l.654-.769a.83.83 0 011.263-.004l.616.714.655.778a.831.831 0 01-.172 1.224c-.29.194-.425.55-.3.877.35.922 1.257 2.745 3.141 3.495a.752.752 0 00.77-.152z"></path></svg>
                            <span className="flex flex-col items-start">
                                <span className="font-semibold text-sm leading-none mb-1">WhatsApp Support</span>
                                <span className="text-[11px] opacity-80 leading-none">Instant responses</span>
                            </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-emerald-800/60 dark:text-emerald-400/60" />
                    </button>
                </Link>

                {/* Customer Testimonial Snippet Card (Ref image layout) */}
                {firstReview && (
                    <div className="mt-4 p-5 bg-[#f0f3f8] dark:bg-slate-900/40 rounded-2xl flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 shadow-inner">
                            {firstReview.avatar ? (
                                <Image src={firstReview.avatar} alt={firstReview.author} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold text-sm">
                                    {firstReview.author[0]?.toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-1 font-normal">
                                {firstReview.content}
                            </p>
                            <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200 truncate">
                                {firstReview.author}, Trip to {pkg.location}
                            </p>
                        </div>
                    </div>
                )}

            </div>

            <BookingModal
                pkg={pkg}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export function MobileBookingButton({ pkg }: BookingCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold h-12 px-4 md:px-6 rounded-xl shadow-md shadow-red-500/20 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center text-sm md:text-base"
            >
                Unlock your itinerary
            </button>
            <BookingModal
                pkg={pkg}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
