"use client";

import { Package } from "@/types";
import { PackageCard } from "@/components/shared";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface RelatedPackagesProps {
    title: string;
    packages: Package[];
    viewAllLink?: string;
    className?: string;
}

export function RelatedPackages({
    title,
    packages,
    viewAllLink,
    className = ""
}: RelatedPackagesProps) {
    if (packages.length === 0) return null;

    return (
        <section className={`py-8 ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {title}
                </h2>

                {viewAllLink && (
                    <Link
                        href={viewAllLink}
                        className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                    >
                        View all <ChevronRight className="w-4 h-4" />
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {packages.slice(0, 3).map((pkg, index) => (
                    <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <PackageCard pkg={pkg} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
