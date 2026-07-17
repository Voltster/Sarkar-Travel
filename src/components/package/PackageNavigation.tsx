"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "reviews", label: "Reviews" },
];

export function PackageNavigation() {
    const [activeIds, setActiveIds] = useState<string>("overview");

    // Handle click to scroll
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for the sticky header (approx 120px: 80px navbar + 40px padding/margin)
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveIds(id);
        }
    };

    // Optional: Active state on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveIds(entry.target.id);
                    }
                });
            },
            { rootMargin: "-120px 0px -80% 0px" } // Adjust based on viewport
        );

        navItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="sticky top-[72px] md:top-[80px] z-20 bg-gray-50 dark:bg-black/95 back drop-blur-md py-3 border-y border-slate-200 dark:border-slate-800 -mx-4 px-4 md:mx-0 md:px-0 md:round ed-lg md:bor der flex justify-between gap-2 md:gap-6 text-sm font-medium overflow-x-auto scrollbar-hide transition-all">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                        "whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-300",
                        activeIds === item.id
                            ? "bg-red-600 text-white shadow-md shadow-red-200"
                            : "text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    )}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
