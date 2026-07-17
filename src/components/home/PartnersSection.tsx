"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from "next/image";

import 'swiper/css';
import Link from "next/link";

import { usePartners } from "@/hooks/usePartners";

export function PartnersSection() {
  const { partners, isLoading } = usePartners();
  const items = partners || [];

  if (isLoading && items.length === 0) {
    return (
      <section className="pb-20 dark:bg-slate-950">
        <div className="2xl:container mx-auto pl-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-40 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="pt-16 md:pt-20 pb-20 dark:bg-slate-950 bg-white">
      <div className="2xl:container mx-auto pl-8">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900 dark:text-white">
            Tourism Board Partners
          </h2>
          <Link href="/tourism-board-partners" className="hidden md:flex items-center gap-1 text-xl font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors pr-8">
            See all
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </Link>
        </div>

        <Swiper
          // modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
          className="w-full"
        >
          {items.map((partner, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/tourism-board-partners/${partner.slug}`} className="block relative aspect-video md:aspect-2/1 rounded-2xl overflow-hidden cursor-pointer group">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Logo Simulation - In real app, use actual transparent logos */}
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-lg text-center leading-none">
                    {partner.name.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex justify-center md:hidden">
          <Link href="#" className="flex items-center gap-1 text-sm font-medium text-slate-600">
            See all
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
