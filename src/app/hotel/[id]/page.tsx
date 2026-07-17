"use client";

import { use, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  MapPin,
  Building2,
  CalendarDays,
  Users,
  Shield,
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles,
  Waves,
  Castle,
  Tent,
  Home,
  Utensils,
  Coffee,
  Heart,
  Loader2,
} from "lucide-react";
import { useHotels } from "@/hooks/useHotels";
import { getPublicHotelById } from "@/lib/api/hotels";
import { HotelSwiperSection } from "@/components/hotel/HotelSwiperSection";
import { HotelInquiryModal } from "@/components/hotel/HotelInquiryModal";
import type { Hotel as HotelType } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function HotelDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleInquireClick = (h: HotelType) => {
    setSelectedHotel(h);
    setIsInquiryModalOpen(true);
  };

  // Fetch related hotels in the same destination or property type
  const { hotels: allHotels } = useHotels();

  useEffect(() => {
    let isMounted = true;
    const fetchHotel = async () => {
      try {
        setIsLoading(true);
        const data = await getPublicHotelById(id);
        if (!isMounted) return;
        setHotel(data);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || "Failed to load hotel details");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchHotel();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const relatedHotels = useMemo(() => {
    if (!hotel) return [];
    const destId = typeof hotel.destinationId === "object" ? hotel.destinationId.id : hotel.destinationId;
    return allHotels.filter(
      (h) =>
        h.id !== hotel.id &&
        (typeof h.destinationId === "object" ? h.destinationId.id : h.destinationId) === destId
    );
  }, [hotel, allHotels]);

  // Fallback to general hotels if no hotels in same destination
  const fallbackRelatedHotels = useMemo(() => {
    if (relatedHotels.length > 0) return relatedHotels;
    if (!hotel) return [];
    return allHotels.filter((h) => h.id !== hotel.id).slice(0, 6);
  }, [relatedHotels, allHotels, hotel]);

  const allImages = useMemo(() => {
    if (!hotel) return [];
    const cover = hotel.coverImage?.url;
    const list = (hotel.images || []).map((img) => img.url);
    const combined = cover ? [cover, ...list] : list;
    return Array.from(new Set(combined.filter(Boolean)));
  }, [hotel]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#faf8f5] dark:bg-[#0c0a09]">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading hotel details...</p>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5] dark:bg-[#0c0a09] px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hotel Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">
          {error || "The hotel you are looking for might have been removed or is temporarily unavailable."}
        </p>
        <button
          onClick={() => router.push("/hotel")}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const destinationName =
    typeof hotel.destinationId === "object" && hotel.destinationId
      ? hotel.destinationId.name
      : hotel.location;

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0a09] pb-24 pt-24 md:pt-28 w-full">
      <div className="container max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/hotel" className="hover:text-red-500 transition-colors">Hotels</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[200px]">{hotel.name}</span>
          </div>
          <button
            onClick={() => router.push("/hotel")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-650 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Hotels
          </button>
        </div>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-red-100/50 dark:border-red-900/30">
                {hotel.propertyType}
              </span>
              <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{hotel.starRating.replace("-Star", "").replace("star", "").trim()} ★</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-1.5 text-slate-550 dark:text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{hotel.location} • {destinationName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                isWishlisted
                  ? "bg-red-50 border-red-200 text-red-550 dark:bg-red-950/20 dark:border-red-900"
                  : "bg-white border-slate-200 text-slate-650 hover:text-red-550 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
              } shadow-xs cursor-pointer`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => handleInquireClick(hotel)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/35 transition-all text-sm cursor-pointer"
            >
              Inquire / Book Stay
            </button>
          </div>
        </div>

        {/* Dynamic Image Grid Gallery */}
        <div className="mb-12">
          {allImages.length === 1 && (
            <div className="relative h-[350px] md:h-[500px] lg:h-[550px] w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
              <Image src={allImages[0]} alt={hotel.name} fill priority className="object-cover" />
            </div>
          )}

          {allImages.length === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[300px] md:h-[450px] lg:h-[500px]">
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                <Image src={allImages[0]} alt={hotel.name} fill priority className="object-cover" />
              </div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                <Image src={allImages[1]} alt={hotel.name} fill className="object-cover" />
              </div>
            </div>
          )}

          {allImages.length === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[320px] md:h-[460px] lg:h-[520px]">
              <div className="md:col-span-2 relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                <Image src={allImages[0]} alt={hotel.name} fill priority className="object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                  <Image src={allImages[1]} alt={hotel.name} fill className="object-cover" />
                </div>
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                  <Image src={allImages[2]} alt={hotel.name} fill className="object-cover" />
                </div>
              </div>
            </div>
          )}

          {allImages.length >= 4 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[350px] md:h-[480px] lg:h-[540px]">
              <div className="md:col-span-2 relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                <Image src={allImages[0]} alt={hotel.name} fill priority className="object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full md:col-span-1">
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                  <Image src={allImages[1]} alt={hotel.name} fill className="object-cover" />
                </div>
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-850">
                  <Image src={allImages[2]} alt={hotel.name} fill className="object-cover" />
                </div>
              </div>
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-md md:col-span-1 border border-slate-100 dark:border-slate-850">
                <Image src={allImages[3]} alt={hotel.name} fill className="object-cover" />
                {allImages.length > 4 && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">+{allImages.length - 4}</span>
                    <span className="text-xs font-medium uppercase tracking-wider mt-1">Photos</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Layout Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Description & Accommodation details */}
          <div className="lg:col-span-2 space-y-10">
                     {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                Property Overview
              </h3>
              {hotel.description ? (
                <div className="text-slate-650 dark:text-slate-350 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {hotel.description}
                </div>
              ) : (
                <>
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    Welcome to <strong>{hotel.name}</strong>, a luxury {hotel.starRating} sanctuary nestled in the heart of {hotel.location}. Designed for discerning travelers seeking exceptional personal service and refined comfort, this {hotel.propertyType.toLowerCase()} blends modern convenience with timeless elegance.
                  </p>
                  <p className="text-slate-650 dark:text-slate-355 text-sm md:text-base leading-relaxed">
                    Whether you want to unwind by our panoramic pools, savor custom culinary creations, or explore the rich cultural landmarks of {destinationName}, our dedicated stay experts ensure every detail is tailored to your taste.
                  </p>
                </>
              )}
            </div>

            {/* Room Categories */}
            {hotel.defaultRoomTypes && hotel.defaultRoomTypes.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  Available Room Choices
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                  We match you with the best available room type based on your travel party size and booking date.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    // Normalize and sort room types
                    const normalized = hotel.defaultRoomTypes.map((room: any) => {
                      if (typeof room === "string") {
                        return { name: room, description: "Includes free high-speed Wi-Fi, air conditioning, and premium toiletries.", icon: "Home", displayOrder: 0 };
                      }
                      return {
                        name: room.name || "",
                        description: room.description || "Includes free high-speed Wi-Fi, air conditioning, and premium toiletries.",
                        icon: room.icon || "Home",
                        displayOrder: room.displayOrder || 0,
                      };
                    }).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

                    return normalized.map((room, i) => {
                      const getRoomIcon = (iconName?: string) => {
                        const name = (iconName || "").toLowerCase().trim();
                        if (name.includes("waves") || name.includes("pool") || name.includes("water")) return Waves;
                        if (name.includes("coffee") || name.includes("food") || name.includes("breakfast")) return Coffee;
                        if (name.includes("castle") || name.includes("palace") || name.includes("royal")) return Castle;
                        if (name.includes("tent") || name.includes("camp")) return Tent;
                        if (name.includes("spark") || name.includes("luxury")) return Sparkles;
                        return Home;
                      };
                      const RoomIcon = getRoomIcon(room.icon);

                      return (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 flex items-start gap-3"
                        >
                          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/20 flex items-center justify-center text-red-500 shrink-0">
                            <RoomIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{room.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">{room.description}</p>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Dining Options & Meal Plans */}
            {hotel.defaultMealPlans && hotel.defaultMealPlans.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
                  Dining & Meal Options
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {hotel.defaultMealPlans.map((meal, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-xl"
                    >
                      <Utensils className="w-3.5 h-3.5 text-red-500" />
                      {meal}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Core Values / Benefits */}
            <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 space-y-4">
              <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                Book Safely with Ananta Travels
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-850 dark:text-slate-200">No Hidden Costs</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-455">Local taxes and hotel service fees are always factored in.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-850 dark:text-slate-200">Personalized Concierge</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-455">Direct access to stay specialists for custom itineraries.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="space-y-6 lg:sticky lg:top-28">
            
            {/* Sticky Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">starting price</span>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                    ₹{hotel.startingPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-450 ml-1 font-medium">/{hotel.priceUnit === "Per Night" ? "night" : hotel.priceUnit === "Per Room" ? "room" : "person"}</span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="space-y-3.5 py-4 border-t border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> Property Type</span>
                  <span className="font-semibold text-slate-850 dark:text-slate-200">{hotel.propertyType}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5"><Star className="w-4 h-4 text-slate-400" /> Rating</span>
                  <span className="font-semibold text-slate-850 dark:text-slate-200">{hotel.starRating}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> Location</span>
                  <span className="font-semibold text-slate-850 dark:text-slate-200 truncate max-w-[150px]">{hotel.location}</span>
                </div>
              </div>

              {/* Inquiry CTA */}
              <button
                onClick={() => handleInquireClick(hotel)}
                className="w-full h-12 bg-red-650 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
              >
                Inquire / Send Request
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Best price guarantee callback in 2 mins</span>
              </div>
            </div>

            {/* Direct Expert Contact */}
            <div className="p-5 rounded-2xl bg-linear-to-r from-red-50 to-orange-50 dark:from-red-950/10 dark:to-orange-950/10 border border-red-100/50 dark:border-red-900/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-550 shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">Talk to a Stay Expert</h4>
                <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-normal">Our vacation specialists can configure customized flight + luxury hotel + activities packages for Bali, Maldives, and Europe.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Section: Related Hotels Carousel */}
        {fallbackRelatedHotels.length > 0 && (
          <div className="mt-20 border-t border-slate-200/60 dark:border-slate-800/60 pt-16">
            <HotelSwiperSection
              title="Stays You May Also Like"
              subtitle={`Handpicked premium options in ${destinationName} and other luxury getaways.`}
              badge="Similar Properties"
              hotels={fallbackRelatedHotels}
              onInquire={handleInquireClick}
              uniqueId="related-hotels"
            />
          </div>
        )}

      </div>

      {/* Inquiry Modal */}
      <HotelInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        hotel={selectedHotel}
      />
    </main>
  );
}
