"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchFormProps {
    initialQuery: string;
}

export function SearchForm({ initialQuery }: SearchFormProps) {
    const router = useRouter();
    const [searchInput, setSearchInput] = useState(initialQuery);

    useEffect(() => {
        setSearchInput(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchInput.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto w-full">
            <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search destinations, packages, or travel tips..."
                    className="w-full pl-14 pr-32 py-4 rounded-full border-0 bg-white/95 backdrop-blur shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-500 text-lg text-slate-900 placeholder:text-slate-400"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors font-medium"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
