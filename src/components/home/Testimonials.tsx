"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Navigation, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TravelerReview {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  rating: number;
  text: string;
  tripImage: string;
  tripName: string;
  tripLocation: string;
  date: string;
  tags: string[];
}

interface TravelTestimonialsProps {
  reviews?: TravelerReview[];
  autoPlayInterval?: number;
}

const defaultReviews: TravelerReview[] = [
  {
    id: "1",
    name: "Priya & Arjun",
    location: "Mumbai",
    rating: 5,
    text: "The Swiss honeymoon exceeded every expectation. Waking up to the Matterhorn from our private balcony, the chocolate-making class in Gruyères, and that spontaneous picnic by Lake Brienz—Ananta didn't just plan a trip, they curated memories we'll relive forever.",
    tripImage: "https://images.pexels.com/photos/27869485/pexels-photo-27869485.jpeg",
    tripName: "Swiss Alps Romance",
    tripLocation: "Switzerland",
    date: "March 2026",
    tags: ["Honeymoon", "Mountains", "Luxury"],
  },
  {
    id: "2",
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "Bali through Ananta's eyes is completely different from the tourist trail. We stayed in a rice-paddy villa in Ubud, had a private sunrise at Batur with a local guide, and found secret beaches in Uluwatu. This was travel, not tourism.",
    tripImage: "https://images.pexels.com/photos/35154999/pexels-photo-35154999.jpeg",
    tripName: "Bali Beyond Borders",
    tripLocation: "Indonesia",
    date: "January 2026",
    tags: ["Adventure", "Culture", "Solo"],
  },
  {
    id: "3",
    name: "The Iyer Family",
    location: "Bangalore",
    rating: 5,
    text: "Traveling with two kids under 10 is usually chaos. But Ananta thought of everything—the houseboat in Alleppey had a mini library for my daughter, the Munnar tea estate tour had a scavenger hunt for my son. They turned 'family trip' into 'family magic.'",
    tripImage: "https://images.pexels.com/photos/30440725/pexels-photo-30440725.jpeg",
    tripName: "Kerala Family Odyssey",
    tripLocation: "India",
    date: "December 2025",
    tags: ["Family", "Backwaters", "Nature"],
  },
  {
    id: "4",
    name: "Vikram Patil",
    location: "Pune",
    rating: 5,
    text: "Solo in Japan sounded intimidating until Ananta mapped it out. They paired me with a local 'friend' in Tokyo who took me to izakayas no guidebook knows. Kyoto's temple walk at dawn, alone with the monks—soul-stirring. Absolute masterpiece of planning.",
    tripImage: "https://images.pexels.com/photos/19828848/pexels-photo-19828848.jpeg",
    tripName: "Japan Solo Immersion",
    tripLocation: "Japan",
    date: "February 2026",
    tags: ["Solo", "Culture", "Food"],
  },
];

export function TravelTestimonials({
  reviews = defaultReviews,
  autoPlayInterval = 7000,
}: TravelTestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrent((prev) => {
        if (newDirection === 1) return prev === reviews.length - 1 ? 0 : prev + 1;
        return prev === 0 ? reviews.length - 1 : prev - 1;
      });
    },
    [reviews.length]
  );

  useEffect(() => {
    if (isHovered || reviews.length <= 1) return;
    const timer = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(timer);
  }, [isHovered, autoPlayInterval, paginate, reviews.length]);

  const active = reviews[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 400 : -400, opacity: 0 }),
  };

  return (
    <section className="relative w-full pt-20 pb-16 md:pb-20 overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100/40 dark:bg-orange-950/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        {/* <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-100/30 dark:bg-amber-950/15 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" /> */}
      </div>

      <div className="relative z-10 2xl:container px-8 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
         <h2 className="text-3xl md:text-4xl font-medium  text-slate-900">
            Travel Diaries, Stories from
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-500 text-xs font-bold tracking-[0.25em] uppercase mb-4"
            >
              <Navigation className="w-4 h-4" />
              Travel Diaries
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 dark:text-stone-100 leading-[1.1]"
            >
              Stories from
              <br />
              <span className="italic text-amber-700 dark:text-amber-600">the road</span>
            </motion.h2> */}
          </h2>

          {/* Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-400 hover:border-amber-600 hover:text-amber-700 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Feature Card */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50 dark:shadow-black/40 border border-stone-100 dark:border-stone-800"
            >
              {/* Left: Destination Image */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[400px] lg:min-h-[520px] overflow-hidden">
                <Image
                  src={active.tripImage}
                  alt={active.tripName}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20" />
                
                {/* Polaroid-style trip badge */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                  <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg inline-flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{active.tripLocation}</p>
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{active.tripName}</p>
                    </div>
                  </div>
                </div>

                {/* Date stamp */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
                  <span className="inline-block bg-black/30 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {active.date}
                  </span>
                </div>
              </div>

              {/* Right: Review Content */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative">
                {/* Quote icon watermark */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-stone-100 dark:text-stone-800 rotate-180" />

                <div className="relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber800 dark:text-amber400 border border-amber100 dark:border-amber900/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          i < active.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-stone-200 text-stone-200 dark:fill-stone-700 dark:text-stone-700"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-stone-500 dark:text-stone-400">
                      {active.rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-[1.7] mb-8 font-medium">
                    &ldquo;{active.text}&rdquo;
                  </blockquote>

                  {/* Traveler Profile */}
                  <div className="flex items-center gap-4 pt-6 border-t border-stone-100 dark:border-stone-800">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-200 dark:ring-amber-900/50 ring-offset-2 ring-offset-white dark:ring-offset-stone-900">
                      {active.avatar ? (
                        <Image src={active.avatar} alt={active.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                          {active.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">{active.name}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {active.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {reviews.map((review, i) => (
              <button
                key={review.id}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="group relative flex items-center gap-3"
              >
                {/* Thumbnail preview on hover (desktop) */}
                <div className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-20 h-14 rounded-lg overflow-hidden shadow-lg border-2 border-white dark:border-stone-800">
                    <Image src={review.tripImage} alt={review.tripName} width={80} height={56} className="object-cover" />
                  </div>
                </div>

                <div className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-amber-600 dark:bg-amber-500" : "w-2 bg-stone-300 dark:bg-stone-700 group-hover:bg-stone-400 dark:group-hover:bg-stone-600"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Marquee Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 sm:mt-20 pt-10 border-t border-stone-200 dark:border-stone-800"
        >
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 sm:gap-x-16 lg:gap-x-24">
            {[
              { num: "15,000+", label: "Stories Written" },
              { num: "4.9", label: "Average Rating" },
              { num: "50+", label: "Countries" },
              { num: "98%", label: "Recommend Us" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  {stat.num}
                </p>
                <p className="text-base md:text-lg sm:text-xs font-semibold text-stone-500 dark:text-stone-500 uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}