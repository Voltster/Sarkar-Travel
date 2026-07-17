"use client";

import { Package } from "@/types";
import { Compass, Calendar, Route, Sun } from "lucide-react";
import Image from "next/image";

interface PackageInfoProps {
    pkg: Package;
}

export function PackageInfo({ pkg }: PackageInfoProps) {
    return (
        <div className="space-y-8">
            {/* Host Banner */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                        Trip organized by Ananta Travels
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                        {pkg.duration} · {pkg.location}
                    </p>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 ml-4">
                    <Image src="/images/Ananta Travel red Logo.svg" alt="Ananta Travels" width={32} height={32} />
                </div>
            </div>

            {/* Key Facts */}
            <div className="space-y-6">
                {pkg.duration && (
                    <div className="flex gap-4">
                        <Calendar className="w-7 h-7 text-slate-900 dark:text-white shrink-0" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Duration</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pkg.duration}</p>
                        </div>
                    </div>
                )}
                {pkg.startCity && pkg.endCity && (
                    <div className="flex gap-4">
                        <Route className="w-7 h-7 text-slate-900 dark:text-white shrink-0" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Route</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pkg.startCity} → {pkg.endCity}</p>
                        </div>
                    </div>
                )}
                {pkg.tripPace && (
                    <div className="flex gap-4">
                        <Compass className="w-7 h-7 text-slate-900 dark:text-white shrink-0" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Trip Pace</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pkg.tripPace} paced journey</p>
                        </div>
                    </div>
                )}
                {pkg.bestTimeToVisit && (
                    <div className="flex gap-4">
                        <Sun className="w-7 h-7 text-slate-900 dark:text-white shrink-0" strokeWidth={1.5} />
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Best time to visit</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{pkg.bestTimeToVisit}</p>
                        </div>
                    </div>
                )}
                
                {/* Additional Highlights */}
                {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="pt-4">
                        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white mb-4">Highlights</h3>
                        <ul className="grid md:grid-cols-2 gap-y-3 gap-x-6">
                            {pkg.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <div className="mt-2 w-1.5 h-1.5 bg-slate-900 dark:bg-white rounded-full shrink-0" />
                                    <span className="leading-relaxed">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
