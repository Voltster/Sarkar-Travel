"use client";

import { Phone, Mail } from "lucide-react";

export function SupportSection() {
    return (
        <section className="bg-black text-white p-10 rounded-2xl relative overflow-hidden text-center md:text-left">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        Our travel experts are ready to personalize this itinerary for you.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:+919876543210" className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-full hover:scale-105 transition-transform duration-300">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-wide">Call Expert</span>
                    </a>

                    <a href="mailto:support@ananta.com" className=" items-center gap-3 border border-white/20 px-6 py-4 rounded-full hover:bg-white/10 transition-colors hidden md:flex">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-wide">Email Us</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
