"use client";

import { Info } from "lucide-react";

interface KnowBeforeYouGoProps {
    items: string[];
}

export function KnowBeforeYouGo({ items }: KnowBeforeYouGoProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white dark:bg-slate-900 border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-color-text-primary mb-4">Know Before You Go</h3>
            <ul className="space-y-3">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-color-text-secondary leading-relaxed">
                        <div className="min-w-[5px] h-1.5 w-1.5 rounded-full bg-color-text-tertiary shrink-0" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
