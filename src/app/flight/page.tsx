"use client";

import { useState, useEffect, useMemo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Plane,
  Phone,
  Mail,
  User,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Armchair,
  ChevronRight,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  Clock,
  Shield,
  Headphones,
  Sparkles,
  Send,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2000&q=80";

interface FlightFormData {
  customerName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  travelClass: string;
  passengers: string;
}

const defaultForm: FlightFormData = {
  customerName: "",
  phone: "",
  email: "",
  from: "",
  to: "",
  departureDate: "",
  returnDate: "",
  travelClass: "economy",
  passengers: "1",
};

const travelClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

const passengerOptions = Array.from({ length: 9 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i === 0 ? "Passenger" : "Passengers"}`,
}));

const benefits = [
  {
    icon: Shield,
    title: "Price Match Guarantee",
    description: "Found a better fare? We'll match it and add a discount.",
  },
  {
    icon: Clock,
    title: "Under 2 Min Response",
    description: "Our flight experts callback within minutes during business hours.",
  },
  {
    icon: Headphones,
    title: "24/7 Travel Support",
    description: "Real humans, not bots. Before, during, and after your flight.",
  },
];

const destinations = [
  {
    city: "Dubai",
    country: "UAE",
    price: "₹18,499",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Singapore",
    country: "Singapore",
    price: "₹22,999",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Bangkok",
    country: "Thailand",
    price: "₹14,999",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "London",
    country: "UK",
    price: "₹45,999",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
  },
];

const parseLocalDate = (dateStr: string) => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
};

export default function FlightPage() {
  const [formData, setFormData] = useState<FlightFormData>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");
  const [submitError, setSubmitError] = useState("");
  const [depPopoverOpen, setDepPopoverOpen] = useState(false);
  const [retPopoverOpen, setRetPopoverOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const rangeModifiers = useMemo(() => {
    const from = formData.departureDate ? parseLocalDate(formData.departureDate) : undefined;
    if (tripType === "oneway" || !from) {
      return from ? { range_start: from } : {};
    }
    const to = formData.returnDate ? parseLocalDate(formData.returnDate) : undefined;
    if (!to) return { range_start: from };
    return {
      range_start: from,
      range_end: to,
      range_middle: { after: from, before: to },
    };
  }, [formData.departureDate, formData.returnDate, tripType]);

  const handleDepartureSelect = (date: Date | undefined) => {
    if (!date) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const nextDeparture = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => {
      let nextReturn = prev.returnDate;
      if (tripType === "roundtrip") {
        if (!prev.returnDate || prev.returnDate <= nextDeparture) {
          const retDate = new Date(date);
          retDate.setDate(date.getDate() + 5);
          const ryyyy = retDate.getFullYear();
          const rmm = String(retDate.getMonth() + 1).padStart(2, '0');
          const rdd = String(retDate.getDate()).padStart(2, '0');
          nextReturn = `${ryyyy}-${rmm}-${rdd}`;
        }
      } else {
        nextReturn = "";
      }
      return {
        ...prev,
        departureDate: nextDeparture,
        returnDate: nextReturn,
      };
    });

    setDepPopoverOpen(false);
    if (tripType === "roundtrip") {
      setRetPopoverOpen(true);
    }
  };

  const handleReturnSelect = (date: Date | undefined) => {
    if (!date) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const nextReturn = `${yyyy}-${mm}-${dd}`;

    setFormData((prev) => ({
      ...prev,
      returnDate: nextReturn,
    }));
    setRetPopoverOpen(false);
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=917505545010&text=${encodeURIComponent(
    "Hi! I've submitted a flight inquiry and would like to chat about flight options."
  )}&type=phone_number&app_absent=0`;

  const updateField = (field: keyof FlightFormData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "departureDate" && next.returnDate && next.returnDate < value) {
        next.returnDate = "";
      }
      return next;
    });
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    // Validation
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setSubmitError("Please fill in all required fields (Name and Phone).");
      setIsSubmitting(false);
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      setSubmitError("Phone number must be exactly 10 digits.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID || "travelworld",
        inquiryType: "flight",
        customerName: formData.customerName.trim(),
        phone: `+91-${phoneDigits}`,
        email: formData.email.trim() || undefined,
        additionalFields: {
          fromCity: formData.from.trim() || undefined,
          toCity: formData.to.trim() || undefined,
          departureDate: formData.departureDate || undefined,
          returnDate: tripType === "roundtrip" ? (formData.returnDate || undefined) : null,
          cabinClass: formData.travelClass,
          passengers: Number(formData.passengers),
          tripType,
        },
      };

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Submission failed");
      }
      setIsSubmitted(true);
      setFormData(defaultForm);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0a09]">
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="relative min-h-[90vh] 2xl:min-h-[600px] md:max-h-[800px] flex items-end md:items-center overflow-hidden pb-12">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Aerial view from airplane window"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
        </div>

        {/* Ambient orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-[#faf8f5] dark:from-[#0c0a09] to-transparent" /> */}

        {/* Content */}
        <div className="relative z-10 w-full 2xl:container mx-auto px-8 pb-8 md:pb-0 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pb-4 md:pb-8 max-md:mt-20"
            >
               <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-amber-400" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em]">
                  Flight Booking
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] mb-6">
                Your Journey
                <br />
                <span className="italic text-amber-300">Begins Here</span>
              </h1>

              <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-8">
                Skip the endless search. Tell us where you want to go, and our
                flight experts will find you the best fares—often beating online
                prices.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Best Price Guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 2-Min Callback
                </span>
              </div>
            </motion.div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-lg lg:max-w-none lg:ml-auto"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/10 text-center flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      Inquiry Received
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                      Our flight team will call you within minutes with the best
                      matching options and fares.
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
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm hover:underline"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Submit another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden"
                  >
                    {/* Form Header */}
                    <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                          Request a Quote
                        </h2>
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => {
                              setTripType("roundtrip");
                              setFormData((prev) => {
                                let nextReturn = prev.returnDate;
                                if (prev.departureDate && (!prev.returnDate || prev.returnDate <= prev.departureDate)) {
                                  const depDate = parseLocalDate(prev.departureDate);
                                  const retDate = new Date(depDate);
                                  retDate.setDate(depDate.getDate() + 5);
                                  const ryyyy = retDate.getFullYear();
                                  const rmm = String(retDate.getMonth() + 1).padStart(2, '0');
                                  const rdd = String(retDate.getDate()).padStart(2, '0');
                                  nextReturn = `${ryyyy}-${rmm}-${rdd}`;
                                }
                                return { ...prev, returnDate: nextReturn };
                              });
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${tripType === "roundtrip"
                              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                              : "text-slate-500 dark:text-slate-400"
                              }`}
                          >
                            Round Trip
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTripType("oneway");
                              setFormData((prev) => ({ ...prev, returnDate: "" }));
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${tripType === "oneway"
                              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                              : "text-slate-500 dark:text-slate-400"
                              }`}
                          >
                            One Way
                          </button>
                        </div>
                      </div>

                      {/* Priority Fields */}
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-red-500" />
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.customerName}
                              onChange={(e) => updateField("customerName", e.target.value)}
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
                              required
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
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
                            Email <span className="text-slate-400 font-normal normal-case">(optional)</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="john@example.com"
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                          />
                        </div> */}
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="px-6 md:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5" />
                        Flight Details
                      </p>

                      <div className="space-y-4">
                        {/* From / To */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <PlaneTakeoff className="w-3.5 h-3.5" /> From
                            </label>
                            <input
                              type="text"
                              value={formData.from}
                              onChange={(e) => updateField("from", e.target.value)}
                              placeholder="Mumbai (BOM)"
                              className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <PlaneLanding className="w-3.5 h-3.5" /> To
                            </label>
                            <input
                              type="text"
                              value={formData.to}
                              onChange={(e) => updateField("to", e.target.value)}
                              placeholder="Dubai (DXB)"
                              className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            />
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className={`space-y-1.5 ${tripType === "oneway" ? "sm:col-span-2" : ""}`}>
                            <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                              <CalendarIcon className="w-3.5 h-3.5" /> Departure
                            </label>
                            <Popover open={depPopoverOpen} onOpenChange={setDepPopoverOpen}>
                              <PopoverTrigger asChild>
                                <button
                                  type="button"
                                  className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-left flex items-center justify-between cursor-pointer"
                                >
                                  <span className={formData.departureDate ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                    {formData.departureDate
                                      ? parseLocalDate(formData.departureDate).toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "Select Date"}
                                  </span>
                                  <CalendarIcon className="w-4 h-4 text-slate-400" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={formData.departureDate ? parseLocalDate(formData.departureDate) : undefined}
                                  onSelect={handleDepartureSelect}
                                  disabled={{ before: today }}
                                  modifiers={rangeModifiers}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          {tripType === "roundtrip" && (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                                <CalendarIcon className="w-3.5 h-3.5" /> Return
                              </label>
                              <Popover open={retPopoverOpen} onOpenChange={setRetPopoverOpen}>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    disabled={!formData.departureDate}
                                    className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                  >
                                    <span className={formData.returnDate ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                      {formData.returnDate
                                        ? parseLocalDate(formData.returnDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "Select Date"}
                                    </span>
                                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={formData.returnDate ? parseLocalDate(formData.returnDate) : undefined}
                                    onSelect={handleReturnSelect}
                                    disabled={{
                                      before: formData.departureDate ? new Date(parseLocalDate(formData.departureDate).getTime() + 24 * 60 * 60 * 1000) : today,
                                    }}
                                    defaultMonth={formData.departureDate ? parseLocalDate(formData.departureDate) : undefined}
                                    modifiers={rangeModifiers}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          )}
                        </div>
 
                        {/* Date Helper / Smart Guidance */}
                        {tripType === "roundtrip" ? (
                          <div className="text-[11px] font-medium mt-1.5">
                            {!formData.departureDate ? (
                              <span className="text-amber-600 dark:text-amber-400">
                                Please select a departure date first
                              </span>
                            ) : !formData.returnDate ? (
                              <span className="text-red-600 dark:text-red-400">
                                Select your return date (must be after {parseLocalDate(formData.departureDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })})
                              </span>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                ✓ Trip duration: {Math.ceil((parseLocalDate(formData.returnDate).getTime() - parseLocalDate(formData.departureDate).getTime()) / (1000 * 60 * 60 * 24))} days selected
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="text-[11px] font-medium mt-1.5">
                            {!formData.departureDate ? (
                              <span className="text-amber-600 dark:text-amber-400">
                                Please select your departure date
                              </span>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                ✓ Departure date: {parseLocalDate(formData.departureDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Class & Passengers */}
                    {/* <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Armchair className="w-3.5 h-3.5" /> Class
                        </label>
                        <select
                          value={formData.travelClass}
                          onChange={(e) => updateField("travelClass", e.target.value)}
                          className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          {travelClasses.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Passengers
                        </label>
                        <select
                          value={formData.passengers}
                          onChange={(e) => updateField("passengers", e.target.value)}
                          className="w-full h-11 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                        >
                          {passengerOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}

                    {/* Message & Submit */}
                    <div className="px-6 md:px-8 py-6 space-y-4">
                      {submitError && (
                        <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 rounded-lg px-4 py-3">
                          {submitError}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Inquiry...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Get Flight Quotes
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                        <Shield className="w-3 h-3" />
                        Your contact info is encrypted and never shared
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
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
              <span className="italic text-red-600 dark:text-red-400">Ticket</span>
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
          TRENDING DESTINATIONS
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900/50">
        <div className="2xl:container mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
                Trending Now
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white">
                Popular Routes
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <motion.div
                key={dest.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              >
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">
                      {dest.country}
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {dest.city}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-bold text-sm">
                        From {dest.price}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════ */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="2xl:container mx-auto px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { num: "50K+", label: "Flights Booked" },
              { num: "200+", label: "Airlines" },
              { num: "4.9/5", label: "Customer Rating" },
              { num: "₹2Cr+", label: "Saved for Travelers" },
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
    </main>
  );
}