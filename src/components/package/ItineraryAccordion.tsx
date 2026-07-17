"use client";

import { useState } from "react";
import { Package } from "@/types";
import { ChevronDown, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ItineraryAccordionProps {
    itinerary: Package['itinerary'];
}

export function ItineraryAccordion({ itinerary }: ItineraryAccordionProps) {
    const [expandedDays, setExpandedDays] = useState<number[]>([1]);

    const toggleDay = (day: number) => {
        setExpandedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    const allExpanded = expandedDays.length === itinerary.length;
    const toggleAll = () => {
        if (allExpanded) {
            setExpandedDays([]);
        } else {
            setExpandedDays(itinerary.map(d => d.day));
        }
    };

    return (
        <div className="py-4">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Itinerary</h3>
                <button
                    onClick={toggleAll}
                    className="text-slate-900 dark:text-white underline font-semibold text-sm hover:text-slate-600 transition-colors"
                >
                    {allExpanded ? "Collapse all" : "Expand all"}
                </button>
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pb-4">
                {itinerary.map((day, index) => {
                    const isOpen = expandedDays.includes(day.day);
                    const isLast = index === itinerary.length - 1;
                    return (
                        <div key={day.day} className={`relative pl-8 ${!isLast ? 'pb-8' : ''}`}>
                            {/* Timeline Node */}
                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 shadow-sm" />
                            
                            <button
                                onClick={() => toggleDay(day.day)}
                                className="w-full flex justify-between items-start text-left group"
                            >
                                <div className="pr-8">
                                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:underline decoration-slate-300 underline-offset-4 mb-1">
                                        Day {day.day}: {day.title}
                                    </h4>
                                </div>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-1 rounded-full text-slate-500 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-4 pb-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl space-y-4">
                                            <p className="whitespace-pre-wrap">{day.description}</p>

                                            {/* Extra details like meals */}
                                            {day.meals && day.meals.length > 0 && (
                                                <div className="pt-2 flex flex-wrap gap-4 text-sm border-t border-slate-100 dark:border-slate-800 mt-4">
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Utensils className="w-4 h-4 text-slate-500" />
                                                        <span className="font-semibold text-slate-900 dark:text-slate-200">Meals included:</span>
                                                        <span>{day.meals.join(", ")}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
