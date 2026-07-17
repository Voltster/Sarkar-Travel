"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Building2,
  CalendarDays,
  Hotel,
  MapPin,
  Users,
  Phone,
  Mail,
  User,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  BedDouble,
  Star,
  Shield,
  Clock,
  Sparkles,
  Send,
  Home,
  Castle,
  Tent,
  Waves,
  Search,
  ChevronDown,
  Loader2,
  Globe,
} from "lucide-react";
import { useDestinations } from "@/hooks/useDestinations";
import { useHotels } from "@/hooks/useHotels";
import { HotelSwiperSection } from "@/components/hotel/HotelSwiperSection";
import { HotelInquiryModal } from "@/components/hotel/HotelInquiryModal";
import type { Hotel as HotelType } from "@/types";

const heroImage = "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
// "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

interface HotelFormData {
  customerName: string;
  phone: string;
  // email: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  roomType: string;
  hotelType: string;
}

const defaultForm: HotelFormData = {
  customerName: "",
  phone: "",
  // email: "",
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  rooms: 1,
  roomType: "standard",
  hotelType: "hotel",
};

const roomTypes = [
  { value: "standard", label: "Standard Room", icon: BedDouble },
  { value: "deluxe", label: "Deluxe Room", icon: Star },
  { value: "suite", label: "Suite", icon: Castle },
  { value: "villa", label: "Private Villa", icon: Home },
  { value: "bungalow", label: "Bungalow", icon: Tent },
];

const hotelTypes = [
  { value: "hotel", label: "Hotel", icon: Building2 },
  { value: "resort", label: "Resort", icon: Waves },
  { value: "boutique", label: "Boutique", icon: Sparkles },
  { value: "heritage", label: "Heritage Property", icon: Castle },
  { value: "homestay", label: "Homestay", icon: Home },
];

const benefits = [
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "We match any competitor's price for similar hotel bookings.",
  },
  {
    icon: Building2,
    title: "Handpicked Stays",
    description: "Every property is personally verified by our team.",
  },
  {
    icon: Clock,
    title: "Under 2 Min Response",
    description: "Our hotel experts callback within minutes during business hours.",
  },
];

const featuredStays = [
  {
    name: "The Leela Palace",
    location: "Udaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&q=80",
    tag: "Heritage",
  },
  {
    name: "Vivanta by Taj",
    location: "Goa",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    tag: "Beach Resort",
  },
  {
    name: "Kumarakom Lake Resort",
    location: "Kerala",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    tag: "Backwater",
  },
  {
    name: "The Himalayan",
    location: "Manali, Himachal",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    tag: "Mountain View",
  },
];

/* ─────────────────────────────────────────────
   Destination Dropdown Component
   ───────────────────────────────────────────── */
function DestinationDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { destinations, isLoading } = useDestinations();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Group destinations by continent
  const grouped = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = q
      ? destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country?.toLowerCase().includes(q) ||
          d.continent?.toLowerCase().includes(q)
      )
      : destinations;

    const map = new Map<string, typeof filtered>();
    for (const dest of filtered) {
      const key = dest.continent || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(dest);
    }
    return map;
  }, [destinations, searchQuery]);

  const selectedDest = destinations.find((d) => d.slug === value || d.name === value);
  const displayText = selectedDest?.name || "";

  return (
    <div ref={dropdownRef} className="relative">
      {/* Hidden native input for form validation */}
      <input
        type="text"
        name="destination"
        value={value}
        required
        readOnly
        tabIndex={-1}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 px-4 rounded-lg border text-left text-sm flex items-center gap-2 outline-none transition-all ${isOpen
            ? "border-red-500 ring-2 ring-red-500/20 bg-white dark:bg-slate-800"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
          }`}
      >
        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
        <span
          className={`flex-1 truncate ${displayText
              ? "text-slate-900 dark:text-white"
              : "text-slate-400 dark:text-slate-500"
            }`}
        >
          {displayText || "Where do you want to go?"}
        </span>
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-slate-400 animate-spin shrink-0" />
        ) : (
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden"
          >
            {/* Search input */}
            <div className="p-2.5 border-b border-slate-100 dark:border-slate-700/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400/30 transition-all"
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-56 overflow-y-auto overscroll-contain scrollbar-thin">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading destinations...
                </div>
              ) : grouped.size === 0 ? (
                <div className="flex flex-col items-center justify-center gap-1.5 py-8 text-sm text-slate-400">
                  <Globe className="w-5 h-5" />
                  <span>No destinations found</span>
                </div>
              ) : (
                <div className="py-1.5">
                  {Array.from(grouped.entries()).map(([continent, dests]) => (
                    <div key={continent}>
                      {/* Continent header */}
                      <div className="px-3.5 pt-2.5 pb-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                          {continent}
                        </span>
                      </div>
                      {/* Destination items */}
                      {dests.map((dest) => {
                        const isSelected = dest.slug === value || dest.name === value;
                        return (
                          <button
                            key={dest.id}
                            type="button"
                            onClick={() => {
                              onChange(dest.name);
                              setIsOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full px-3.5 py-2 flex items-center gap-3 text-left transition-colors ${isSelected
                                ? "bg-red-50 dark:bg-red-950/20"
                                : "hover:bg-slate-50 dark:hover:bg-slate-700/30"
                              }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSelected
                                  ? "bg-red-100 dark:bg-red-900/30"
                                  : "bg-slate-100 dark:bg-slate-700/50"
                                }`}
                            >
                              <MapPin
                                className={`w-3.5 h-3.5 ${isSelected
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-slate-400"
                                  }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${isSelected
                                    ? "text-red-700 dark:text-red-400"
                                    : "text-slate-800 dark:text-slate-200"
                                  }`}
                              >
                                {dest.name}
                              </p>
                              {dest.country && (
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                                  {dest.country}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hotel Page
   ───────────────────────────────────────────── */
const parseLocalDate = (dateStr: string) => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
};

export default function HotelPage() {
  const [formData, setFormData] = useState<HotelFormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const { hotels } = useHotels();

  const handleInquireClick = (hotel: HotelType) => {
    setSelectedHotel(hotel);
    setIsInquiryModalOpen(true);
  };

  const luxuryHotels = useMemo(() => {
    return [...hotels]
      .filter((h) => h.starRating.toLowerCase().includes("luxury") || h.starRating.toLowerCase().includes("5-star"))
      .sort((a, b) => b.startingPrice - a.startingPrice);
  }, [hotels]);

  const resortsAndVillas = useMemo(() => {
    return hotels.filter(
      (h) =>
        h.propertyType.toLowerCase().includes("resort") ||
        h.propertyType.toLowerCase().includes("villa")
    );
  }, [hotels]);

  const budgetFriendlyHotels = useMemo(() => {
    return [...hotels]
      .sort((a, b) => a.startingPrice - b.startingPrice)
      .slice(0, 8);
  }, [hotels]);

  const propertyTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      hotel: 0,
      resort: 0,
      villa: 0,
      boutique: 0,
      heritage: 0,
    };
    hotels.forEach((h) => {
      const type = h.propertyType.toLowerCase();
      if (type.includes("resort")) counts.resort++;
      else if (type.includes("villa")) counts.villa++;
      else if (type.includes("boutique")) counts.boutique++;
      else if (type.includes("heritage") || type.includes("palace")) counts.heritage++;
      else counts.hotel++;
    });
    return counts;
  }, [hotels]);

  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const rangeModifiers = useMemo(() => {
    const from = formData.checkIn ? parseLocalDate(formData.checkIn) : undefined;
    const to = formData.checkOut ? parseLocalDate(formData.checkOut) : undefined;
    if (!from) return {};
    if (!to) return { range_start: from };
    return {
      range_start: from,
      range_end: to,
      range_middle: { after: from, before: to },
    };
  }, [formData.checkIn, formData.checkOut]);

  const handleCheckInSelect = (date: Date | undefined) => {
    if (!date) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const nextCheckIn = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => {
      let nextCheckOut = prev.checkOut;
      if (!prev.checkOut || prev.checkOut <= nextCheckIn) {
        const outDate = new Date(date);
        outDate.setDate(date.getDate() + 1);
        const oyyyy = outDate.getFullYear();
        const omm = String(outDate.getMonth() + 1).padStart(2, '0');
        const odd = String(outDate.getDate()).padStart(2, '0');
        nextCheckOut = `${oyyyy}-${omm}-${odd}`;
      }
      return {
        ...prev,
        checkIn: nextCheckIn,
        checkOut: nextCheckOut,
      };
    });

    setCheckInOpen(false);
    setCheckOutOpen(true);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    if (!date) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    setFormData((prev) => ({
      ...prev,
      checkOut: `${yyyy}-${mm}-${dd}`,
    }));
    setCheckOutOpen(false);
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=917505545010&text=${encodeURIComponent(
    "Hi! I've submitted a hotel inquiry and would like to chat about accommodation options."
  )}&type=phone_number&app_absent=0`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "checkIn" && next.checkOut && next.checkOut < value) {
        next.checkOut = "";
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hotel-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID as string,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
      setFormData(defaultForm);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0a09] ">
      {/* ═══════════════════════════════════════
          SPLIT HERO: Image Left + Form Right
          ═══════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col lg:flex-row 2xl:min-h-[600px] md:max-h-[800px] relative 2xl:container mx-auto overflow-hidden">
        {/* Left: Image Panel */}
        <div className="lg:w-1/2 xl:w-3/5 relative min-h-[50vh] 2xl:min-h-[600px] md:max-h-[800px]">
          <Image
            src={heroImage}
            alt="Luxury hotel pool at sunset"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
          {/* Content overlay on image */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-amber-400" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em]">
                  Hotel Booking
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-6">
                Find Your
                <br />
                <span className="italic text-amber-300">Perfect Stay</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-8">
                From boutique hideaways to grand palaces, we curate stays that
                turn your trip into an experience.
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-8 text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Best Price Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 2-Min Callback
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Form Panel */}
        <div className="lg:w-1/2 xl:w-2/5 bg-white dark:bg-slate-900 flex items-center justify-center p-6 md:p-10 lg:p-12 xl:p-16">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center max-w-sm flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Inquiry Received
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Our hotel team will call you within minutes with handpicked
                  options matching your preferences.
                </p>
                
                {/* Chat on WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428.002 9.85-4.417 9.853-9.852.002-2.633-1.02-5.107-2.876-6.967C17.18 1.947 14.716.924 12.01.924c-5.437 0-9.856 4.416-9.859 9.852-.001 1.923.499 3.8 1.447 5.4l-.952 3.473 3.568-.936zm11.367-7.461c-.327-.164-1.93-.953-2.229-1.062-.299-.11-.517-.164-.734.164-.217.328-.841 1.062-1.031 1.281-.19.218-.38.245-.707.081-.327-.164-1.382-.509-2.63-1.621-.972-.867-1.627-1.938-1.817-2.265-.19-.327-.02-.504.143-.667.147-.146.327-.382.49-.573.163-.19.217-.327.327-.546.11-.218.054-.41-.028-.573-.082-.164-.734-1.77-.996-2.433-.26-.628-.519-.544-.712-.554l-.608-.01c-.217 0-.571.082-.87.41-.299.327-1.14 1.12-1.14 2.732 0 1.613 1.17 3.17 1.332 3.388.163.218 2.302 3.515 5.578 4.922.779.335 1.388.536 1.862.687.783.249 1.496.214 2.06.13.629-.094 1.93-.789 2.202-1.554.272-.765.272-1.42.19-1.554-.082-.134-.299-.218-.627-.382z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm hover:underline"
                >
                  <RotateCcw className="w-4 h-4" />
                  Submit another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                {/* Form Header */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Request a Stay
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                    Tell us what you're looking for. We'll handle the rest.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Priority Contact Fields */}
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-red-500" />
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-red-500" />
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          maxLength={10}
                          minLength={10}
                          pattern="[0-9]{10}"
                          placeholder="1234567890"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                    {/* <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Email{" "}
                        <span className="text-slate-400 font-normal normal-case">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                      />
                    </div> */}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5" />
                      Stay Details
                    </p>

                    {/* Destination — Custom Dropdown */}
                    <div className="space-y-1.5 mb-4">
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> Destination
                      </label>
                      <DestinationDropdown
                        value={formData.destination}
                        onChange={(val) =>
                          setFormData((prev) => ({ ...prev, destination: val }))
                        }
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" /> Check-in
                        </label>
                        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-left flex items-center justify-between cursor-pointer"
                            >
                              <span className={formData.checkIn ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                {formData.checkIn
                                  ? parseLocalDate(formData.checkIn).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Select Date"}
                              </span>
                              <CalendarDays className="w-4 h-4 text-slate-400" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.checkIn ? parseLocalDate(formData.checkIn) : undefined}
                              onSelect={handleCheckInSelect}
                              disabled={{ before: today }}
                              modifiers={rangeModifiers}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" /> Check-out
                        </label>
                        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              disabled={!formData.checkIn}
                              className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                            >
                              <span className={formData.checkOut ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                {formData.checkOut
                                  ? parseLocalDate(formData.checkOut).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Select Date"}
                              </span>
                              <CalendarDays className="w-4 h-4 text-slate-400" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.checkOut ? parseLocalDate(formData.checkOut) : undefined}
                              onSelect={handleCheckOutSelect}
                              disabled={{
                                before: formData.checkIn ? new Date(parseLocalDate(formData.checkIn).getTime() + 24 * 60 * 60 * 1000) : today,
                              }}
                              defaultMonth={formData.checkIn ? parseLocalDate(formData.checkIn) : undefined}
                              modifiers={rangeModifiers}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Guests
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date Helper / Smart Guidance */}
                    <div className="text-[11px] font-medium mt-1.5 mb-4">
                      {!formData.checkIn ? (
                        <span className="text-amber-600 dark:text-amber-400">
                          Please select a check-in date first
                        </span>
                      ) : !formData.checkOut ? (
                        <span className="text-red-600 dark:text-red-400">
                          Select your check-out date (must be after {parseLocalDate(formData.checkIn).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })})
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          ✓ {Math.ceil((parseLocalDate(formData.checkOut).getTime() - parseLocalDate(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))} night(s) selected
                        </span>
                      )}
                    </div>

                    {/* Guests & Rooms */}
                    {/* <div className="grid grid-cols-2 gap-3 mb-4">

                    </div> */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" /> Rooms
                        </label>
                        <select
                          name="rooms"
                          value={formData.rooms}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Room" : "Rooms"}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* Room Type */}
                      <div className="space-y-1.5 mb-4">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5" /> Room Type
                        </label>
                        <select
                          value={formData.roomType}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, roomType: e.target.value }))
                          }
                          className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          <option value="" disabled>Select Room Type</option>
                          {roomTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Hotel Type */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Hotel className="w-3.5 h-3.5" /> Property Type
                        </label>
                        <select
                          value={formData.hotelType}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, hotelType: e.target.value }))
                          }
                          className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          <option value="" disabled>Select Property Type</option>
                          {hotelTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Find My Stay
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                    <Shield className="w-3 h-3" />
                    Your contact is encrypted and never shared
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BENEFITS SECTION
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="2xl:container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
              Why Book With Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              Beyond Just a{" "}
              <span className="italic text-red-600 dark:text-red-400">Room</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DYNAMIC HOTEL SECTIONS
          ═══════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900/50">
        <div className="2xl:container mx-auto px-8 space-y-16">
          
          {/* Section 1: Featured Luxury Stays Swiper */}
          {luxuryHotels.length > 0 && (
            <HotelSwiperSection
              title="Featured Luxury Stays"
              subtitle="Indulge in our collection of handpicked 5-star hotels, palaces, and ultra-luxury beach resorts."
              badge="Curated Luxury"
              hotels={luxuryHotels}
              onInquire={handleInquireClick}
              uniqueId="luxury"
            />
          )}

          {/* Section 2: Explore by Property Type Grid */}
          <div className="py-12 border-t border-b border-slate-150/70 dark:border-slate-800">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-2 block">
                Find Your Vibe
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                Explore Stays by Property Type
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-2">
                From secluded jungle villas to majestic heritage palaces, choose what fits your dream stay.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { name: "Resort", icon: Waves, count: propertyTypeCounts.resort, label: "Luxury Resorts", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { name: "Villa", icon: Home, count: propertyTypeCounts.villa, label: "Private Villas", img: "https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { name: "Boutique", icon: Sparkles, count: propertyTypeCounts.boutique, label: "Boutique Stays", img: "https://images.pexels.com/photos/15011110/pexels-photo-15011110.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { name: "Heritage", icon: Castle, count: propertyTypeCounts.heritage, label: "Heritage Palaces", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600" },
                { name: "Hotel", icon: Building2, count: propertyTypeCounts.hotel, label: "Premium Hotels", img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600" }
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="group relative h-44 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col justify-end p-4 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                >
                  <Image
                    src={cat.img}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 45vw, 18vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/25 to-transparent" />
                  <div className="relative z-10 text-white space-y-1">
                    <cat.icon className="w-5 h-5 text-red-500 mb-1.5 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-bold leading-tight">{cat.label}</h4>
                    <p className="text-[9px] text-slate-350 font-semibold">
                      {cat.count > 0 ? `${cat.count} Stays Available` : "Handpicked Stays"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Handpicked Resorts & Villas Swiper */}
          {resortsAndVillas.length > 0 && (
            <HotelSwiperSection
              title="Resorts & Private Villas"
              subtitle="Secluded getaways with direct beach access, private pools, and pristine views."
              badge="Exclusive Havens"
              hotels={resortsAndVillas}
              onInquire={handleInquireClick}
              uniqueId="resorts-villas"
            />
          )}

          {/* Section 4: Budget-Friendly Stays Swiper */}
          {budgetFriendlyHotels.length > 0 && (
            <HotelSwiperSection
              title="Premium Value Stays"
              subtitle="Exceptional comfort, personal service, and central locations at great prices."
              badge="Best Value Stays"
              hotels={budgetFriendlyHotels}
              onInquire={handleInquireClick}
              uniqueId="value"
            />
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════ */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="2xl:container mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { num: "10K+", label: "Stays Booked" },
              { num: "500+", label: "Properties" },
              { num: "4.8/5", label: "Guest Rating" },
              { num: "₹1Cr+", label: "Saved for Guests" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.num}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] font-semibold mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <HotelInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        hotel={selectedHotel}
      />
    </main>
  );
}