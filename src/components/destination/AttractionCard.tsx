"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AttractionCardProps {
    name: string;
    description: string;
    image: string;
}

export function AttractionCard({ name, description, image }: AttractionCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Threshold for showing the "Read More" button
    const charLimit = 120;
    const shouldTruncate = description.length > charLimit;

    return (
        <div className="section-card overflow-hidden flex flex-col h-full">
            <div className="relative h-48 shrink-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
                    {name}
                </h3>

                <div className="relative flex-1">
                    <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 ${!isExpanded && shouldTruncate ? "line-clamp-3" : ""
                        }`}>
                        {description}
                    </p>
                </div>

                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide self-start"
                    >
                        {isExpanded ? (
                            <>
                                Read Less <ChevronUp className="w-3 h-3" />
                            </>
                        ) : (
                            <>
                                Read More <ChevronDown className="w-3 h-3" />
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
