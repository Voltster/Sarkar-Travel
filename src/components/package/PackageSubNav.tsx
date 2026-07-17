"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const PackageSubNav = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero-gallery');
            const offset = heroSection ? heroSection.offsetHeight + 100 : 500;
            setIsSticky(window.scrollY > offset);

            // Determine active section
            const sections = ['Overview', 'Itinerary', 'Inclusions', 'Reviews'];
            for (const section of sections) {
                const element = document.getElementById(section.toLowerCase());
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < 300) {
                        setActiveTab(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string, label: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveTab(label);
        }
    };

    if (!isSticky) return null;

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 bg-white border-b border-soft-border hidden md:block shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-8 flex gap-8">
                {[
                    { label: 'Overview', id: 'overview' },
                    { label: 'Itinerary', id: 'itinerary' },
                    { label: 'Inclusions', id: 'inclusions' },
                    { label: 'Reviews', id: 'reviews' }
                ].map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => scrollToSection(tab.id, tab.label)}
                        className={`py-6 text-sm font-semibold border-b-2 transition-all duration-200 ${activeTab === tab.label
                                ? 'text-charcoal border-charcoal'
                                : 'text-muted-text border-transparent hover:text-charcoal hover:border-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </motion.nav>
    );
};
