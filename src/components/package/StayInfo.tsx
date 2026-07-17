"use client";

import { Package } from "@/types";
import { Hotel, MapPin, Utensils, Star, BedDouble } from "lucide-react";

interface StayInfoProps {
    stayInfo: Package['stayInfo'];
}

const CATEGORY_LABELS: Record<string, string> = {
    standard: "Standard (2-3 star)",
    comfort: "Comfort (3 star)",
    premium: "Premium (4 star)",
    luxury: "Luxury (5 star)",
    "ultra-luxury": "Ultra Luxury (5 star+)",
};

const MEAL_PLAN_LABELS: Record<string, string> = {
    "breakfast-only": "Breakfast Only",
    "half-board": "Half Board (Breakfast + Dinner)",
    "full-board": "Full Board (All Meals)",
    "all-inclusive": "All Inclusive",
};

export function StayInfo({ stayInfo }: StayInfoProps) {
    if (!stayInfo || (!stayInfo.hotelName && !stayInfo.roomType && !stayInfo.mealPlan)) {
        return null;
    }

    return (
        <div className="py-2">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">Where you'll sleep</h3>
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row gap-6">
                
                {/* Hotel Image or Icon Placeholder */}
                {stayInfo.image ? (
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                        <img 
                            src={stayInfo.image} 
                            alt={stayInfo.hotelName || "Accommodation"} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full md:w-48 h-32 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        <BedDouble className="w-10 h-10 text-slate-400 mb-2" strokeWidth={1} />
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Accommodation</span>
                    </div>
                )}
                
                {/* Hotel Details */}
                <div className="flex-1 flex flex-col justify-center">
                    {stayInfo.hotelName && (
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{stayInfo.hotelName}</h4>
                    )}
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {stayInfo.hotelCategory && (
                            <div className="flex items-start gap-3">
                                <Star className="w-5 h-5 text-slate-900 dark:text-white shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Category</span>
                                    <span className="block text-sm text-slate-500">{CATEGORY_LABELS[stayInfo.hotelCategory] || stayInfo.hotelCategory}</span>
                                </div>
                            </div>
                        )}
                        {stayInfo.roomType && (
                            <div className="flex items-start gap-3">
                                <Hotel className="w-5 h-5 text-slate-900 dark:text-white shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Room Type</span>
                                    <span className="block text-sm text-slate-500">{stayInfo.roomType}</span>
                                </div>
                            </div>
                        )}
                        {stayInfo.mealPlan && (
                            <div className="flex items-start gap-3">
                                <Utensils className="w-5 h-5 text-slate-900 dark:text-white shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Meals</span>
                                    <span className="block text-sm text-slate-500">{MEAL_PLAN_LABELS[stayInfo.mealPlan] || stayInfo.mealPlan}</span>
                                </div>
                            </div>
                        )}
                        {stayInfo.location && (
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-slate-900 dark:text-white shrink-0 mt-0.5" strokeWidth={1.5} />
                                <div>
                                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">Location</span>
                                    <span className="block text-sm text-slate-500">{stayInfo.location}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}