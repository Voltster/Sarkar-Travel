"use client";

import { BedDouble, Utensils, Car, Camera, Plane } from "lucide-react";
import { Package } from "@/types";

interface WhatsInsideProps {
    items: Package["whatsInside"];
}

const iconMap: Record<string, any> = {
    hotel: BedDouble,
    meal: Utensils,
    transport: Car,
    activity: Camera,
    flight: Plane
};

export function WhatsInside({ items }: WhatsInsideProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="py-6">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">What this trip offers</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {items.map((item, idx) => {
                    const Icon = iconMap[item.icon] || Camera;
                    return (
                        <div key={idx} className="flex items-center gap-4">
                            <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300 shrink-0" strokeWidth={1.5} />
                            <span className="text-base text-slate-700 dark:text-slate-300">{item.title}</span>
                        </div>
                    );
                })}
            </div>
            
            {items.length > 4 && (
                <button className="mt-8 px-6 py-2.5 bg-transparent dark:bg-slate-900 text-color-text-primary hover:bg-muted dark:hover:bg-slate-800 border border-border rounded-md text-sm font-semibold transition-all cursor-pointer">
                    Show all {items.length} amenities
                </button>
            )}
        </div>
    );
}
