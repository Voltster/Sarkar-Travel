"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-xl mx-auto w-full relative z-30 mt-6"
        >
            <form onSubmit={handleSearch}>
                <div className="bg-transparent rounded-full p-1.5 border border-[#DFDFDF] mx-4 sm:mx-8 md:mx-0">
                    <div className="bg-white rounded-full p-1 flex flex-row items-center gap-2 md:gap-4 border border-[#C5C5C5] relative">
                        <Search size={50} className="w-8 h-8 md:w-14 md:h-14 ml-4 stroke-1 max-md:hidden" />
                        <input 
                            type="text" 
                            placeholder={isMobile ? "Search destinations..." : "Search by City/Country/Destination"} 
                            className="w-full h-11 md:h-12 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none border-none text-sm md:text-base pl-4 md:pl-0 pr-[85px] md:pr-4 truncate" 
                            aria-placeholder={isMobile ? "Search destinations..." : "Search by City/Country/Destination"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {/* Search Button */}
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 md:relative md:top-auto md:translate-y-0 md:right-auto p-1 md:p-2 w-auto md:w-64 flex items-center">
                            <Button
                                type="submit"
                                className="w-full rounded-full! bg-red-600 hover:bg-red-700 text-white h-10 md:h-12 px-5 md:px-8 text-sm md:text-base font-semibold shadow-md shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Search
                            </Button>
                        </div>

                    </div>
                </div>
            </form>
        </motion.div>
    );
};

export default SearchBar;