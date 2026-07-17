"use client";

import { Check, X } from "lucide-react";

interface InclusionsListProps {
    inclusions: string[];
    exclusions: string[];
}

export function InclusionsList({ inclusions, exclusions }: InclusionsListProps) {
    return (
        <div className="grid md:grid-cols-2 gap-8  p-6">
            {/* Inclusions */}
            <div>
                <h3 className="text-lg font-bold text-color-text-primary mb-4 flex items-center gap-2">
                    {/* <span className="w-8 h-1 bg-green-500 rounded-full inline-block" /> */}
                    Inclusions:
                </h3>
                <ul className="space-y-3">
                    {inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-color-text-secondary">
                            <div className="mt-0.5 min-w-[18px]">
                                <Check className="w-4.5 h-4.5 text-green-500" strokeWidth={2.5} />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Exclusions */}
            <div>
                <h3 className="text-lg font-bold text-color-text-primary mb-4 flex items-center gap-2">
                    {/* <span className="w-8 h-1 bg-red-500 rounded-full inline-block" /> */}
                    Exclusions:
                </h3>
                <ul className="space-y-3">
                    {exclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-color-text-secondary">
                            <div className="mt-0.5 min-w-[18px]">
                                <X className="w-4.5 h-4.5 text-red-500" strokeWidth={2.5} />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
