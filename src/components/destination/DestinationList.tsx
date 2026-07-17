"use client";

import { motion } from "framer-motion";
import { DestinationCard } from "@/components/shared";
import { Destination } from "@/types";

interface DestinationListProps {
    destinations: Destination[];
}

export function DestinationList({ destinations }: DestinationListProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((dest, index) => (
                <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <DestinationCard destination={dest} />
                </motion.div>
            ))}
        </div>
    );
}
