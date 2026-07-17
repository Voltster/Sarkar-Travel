"use client";

import { useState, useEffect, useMemo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Compass,
  Heart,
  Globe,
  ChevronDown,
  User,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";

const CONTACT_CONFIG = {
  tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID as string,
  phone: {
    display: "+91 75055 45010",
    href: "tel:+917505545010",
  },
  email: {
    display: "hello@anantatravels.com",
    href: "mailto:hello@anantatravels.com",
  },
  address: {
    line1: "123 Travel Street, Connaught Place",
    line2: "New Delhi, India - 110001",
  },
  hours: {
    weekdays: "Mon - Sat: 9:00 AM - 7:00 PM",
    sunday: "Sunday: 10:00 AM - 5:00 PM",
  },
  whatsapp: {
    number: "917505545010",
    message: "Hi! I'm interested in your custom travel packages. Can you help me?",
    display: "Chat on WhatsApp",
  },
  map: {
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224096.97987921594!2d76.92842151266856!3d28.64428531076825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1768848727789!5m2!1sen!2sin",
    label: "Headquarters: New Delhi, India",
  },
  hero: {
    title: "Let's Plan Your Trip",
    subtitle:
      "Have a question or ready to start planning? Reach out to us and our travel experts will help you create unforgettable experiences.",
    image:
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=2000",
  },
  faqs: [
    {
      question: "How do I book a trip?",
      answer: "Simply fill out the contact form, call us, or send us a WhatsApp message. Our travel expert will get back to you within 24 hours.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, net banking, UPI, and EMI options. A 20-30% advance payment is required to confirm your booking.",
    },
    {
      question: "Can I customize my package?",
      answer: "Absolutely! All our packages are customizable. Let us know your preferences and we'll create a personalized itinerary for you.",
    },
    {
      question: "What's included in your packages?",
      answer: "Our packages typically include accommodation, transfers, sightseeing, and some meals. Specific inclusions vary by package.",
    },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

const parseLocalDate = (dateStr: string) => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    // email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travelers: "2",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [travelDateOpen, setTravelDateOpen] = useState(false);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${CONTACT_CONFIG.whatsapp.number
    }&text=${encodeURIComponent(
      CONTACT_CONFIG.whatsapp.message
    )}&type=phone_number&app_absent=0`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      tenantId: CONTACT_CONFIG.tenantId,
      inquiryType: "custom",
      customerName: formState.name,
      phone: formState.phone,
      // email: formState.email || undefined,
      message: formState.message || undefined,
      additionalFields: {
        destination: formState.destination || undefined,
        travelDate: formState.travelDate || undefined,
        travelers: formState.travelers,
      },
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
      setFormState({
        name: "",
        // email: "",
        phone: "",
        destination: "",
        travelDate: "",
        travelers: "2",
        message: "",
      });
    } catch (err: any) {
      setSubmitError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0a09]">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <PageHero
        title={CONTACT_CONFIG.hero.title}
        subtitle={CONTACT_CONFIG.hero.subtitle}
        image={CONTACT_CONFIG.hero.image}
        breadcrumbs={[{ label: "Contact Us" }]}
        className="mb-16 md:mb-24"
      />

      {/* ═══════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════ */}
      <section className="pb-20 md:pb-28">
        <div className="2xl:container mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* ── LEFT: Contact Info + CTA ── */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <motion.div custom={0} variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                    <Sparkles className="w-4 h-4" />
                    Get in Touch
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                    We'd Love to Hear
                    <br />
                    <span className="italic text-red-600 dark:text-red-400">
                      From You
                    </span>
                  </h2>
                </motion.div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: CONTACT_CONFIG.phone.display,
                      href: CONTACT_CONFIG.phone.href,
                      color: "bg-red-50 dark:bg-red-950/30",
                      iconColor: "text-red-600 dark:text-red-400",
                    },
                    // {
                    //   icon: Mail,
                    //   label: "Email",
                    //   value: CONTACT_CONFIG.email.display,
                    //   href: CONTACT_CONFIG.email.href,
                    //   color: "bg-amber-50 dark:bg-amber-950/30",
                    //   iconColor: "text-amber-600 dark:text-amber-400",
                    // },
                    {
                      icon: MapPin,
                      label: "Address",
                      value: `${CONTACT_CONFIG.address.line1}, ${CONTACT_CONFIG.address.line2}`,
                      href: null,
                      color: "bg-slate-50 dark:bg-slate-800",
                      iconColor: "text-slate-600 dark:text-slate-400",
                    },
                    {
                      icon: Clock,
                      label: "Hours",
                      value: `${CONTACT_CONFIG.hours.weekdays} • ${CONTACT_CONFIG.hours.sunday}`,
                      href: null,
                      color: "bg-green-50 dark:bg-green-950/30",
                      iconColor: "text-green-600 dark:text-green-400",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i + 1}
                      variants={fadeUp}
                      className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div
                        className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center shrink-0`}
                      >
                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-semibold text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-[#dcf8c6] dark:bg-[#075e54]/20 border border-[#25d366]/30 rounded-2xl p-5 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {CONTACT_CONFIG.whatsapp.display}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Usually replies in minutes
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                </motion.a>
              </motion.div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden"
              >
                {/* Form Header */}
                <div className="px-8 md:px-10 pt-8 md:pt-10 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.2em]">
                      Custom Package
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Plan Your Dream Trip
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Tell us your vision. We'll craft the perfect itinerary.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="px-8 md:px-10 py-16 text-center flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      Request Received
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      Our travel expert will contact you within 24 hours with a
                      personalized itinerary.
                    </p>

                    {/* Chat on WhatsApp Button */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428.002 9.85-4.417 9.853-9.852.002-2.633-1.02-5.107-2.876-6.967C17.18 1.947 14.716.924 12.01.924c-5.437 0-9.856 4.416-9.859 9.852-.001 1.923.499 3.8 1.447 5.4l-.952 3.473 3.568-.936zm11.367-7.461c-.327-.164-1.93-.953-2.229-1.062-.299-.11-.517-.164-.734.164-.217.328-.841 1.062-1.031 1.281-.19.218-.38.245-.707.081-.327-.164-1.382-.509-2.63-1.621-.972-.867-1.627-1.938-1.817-2.265-.19-.327-.02-.504.143-.667.147-.146.327-.382.49-.573.163-.19.217-.327.327-.546.11-.218.054-.41-.028-.573-.082-.164-.734-1.77-.996-2.433-.26-.628-.519-.544-.712-.554l-.608-.01c-.217 0-.571.082-.87.41-.299.327-1.14 1.12-1.14 2.732 0 1.613 1.17 3.17 1.332 3.388.163.218 2.302 3.515 5.578 4.922.779.335 1.388.536 1.862.687.783.249 1.496.214 2.06.13.629-.094 1.93-.789 2.202-1.554.272-.765.272-1.42.19-1.554-.082-.134-.299-.218-.627-.382z" />
                      </svg>
                      Chat on WhatsApp
                    </a>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-sm hover:underline"
                    >
                      <Send className="w-4 h-4" />
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-8 md:px-10 py-8 space-y-6">
                    {submitError && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                          {submitError}
                        </p>
                      </div>
                    )}

                    {/* Priority Fields: Name & Phone */}
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Your Contact
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-red-500" />
                            Full Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                name: e.target.value,
                              })
                            }
                            placeholder="John Doe"
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-red-500" />
                            Phone{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formState.phone}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                phone: e.target.value,
                              })
                            }
                            maxLength={10}
                            minLength={10}
                            pattern="[0-9]{10}"
                            placeholder="1234567890"
                            className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* Email: Optional, muted */}
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
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          placeholder="john@example.com"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                          disabled={isSubmitting}
                        />
                      </div> */}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                        Trip Details
                      </p>

                      {/* Destination: Text input instead of dropdown */}
                      <div className="space-y-1.5 mb-4">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" /> Destination
                        </label>
                        <input
                          type="text"
                          value={formState.destination}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              destination: e.target.value,
                            })
                          }
                          placeholder="Where do you want to go? (e.g., Maldives, Japan, Europe...)"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Date & Travelers */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> Travel Date
                          </label>
                          <Popover open={travelDateOpen} onOpenChange={setTravelDateOpen}>
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                disabled={isSubmitting}
                                className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-left flex items-center justify-between cursor-pointer"
                              >
                                <span className={formState.travelDate ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                                  {formState.travelDate
                                    ? parseLocalDate(formState.travelDate).toLocaleDateString("en-IN", {
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
                                selected={formState.travelDate ? parseLocalDate(formState.travelDate) : undefined}
                                onSelect={(date) => {
                                  if (date) {
                                    const yyyy = date.getFullYear();
                                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                                    const dd = String(date.getDate()).padStart(2, '0');
                                    setFormState((prev) => ({
                                      ...prev,
                                      travelDate: `${yyyy}-${mm}-${dd}`,
                                    }));
                                    setTravelDateOpen(false);
                                  }
                                }}
                                disabled={{ before: today }}
                              />
                            </PopoverContent>
                          </Popover>

                          {/* Date Helper / Smart Guidance */}
                          <div className="text-[11px] font-medium mt-1.5">
                            {!formState.travelDate ? (
                              <span className="text-amber-600 dark:text-amber-400">
                                Please select your intended travel date
                              </span>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                ✓ Intended travel date: {parseLocalDate(formState.travelDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" /> Travelers
                          </label>
                          <select
                            value={formState.travelers}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                travelers: e.target.value,
                              })
                            }
                            className="w-full h-11 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all appearance-none"
                            disabled={isSubmitting}
                          >
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5">5+ People</option>
                            <option value="group">Group (10+)</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Tell us about your dream trip{" "}
                          <span className="text-slate-400 font-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          rows={4}
                          value={formState.message}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              message: e.target.value,
                            })
                          }
                          placeholder="Specific preferences, must-see places, special occasions, dietary requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center gap-2 text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending Your Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Get My Custom Package
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                      <Heart className="w-3 h-3" />
                      Handcrafted itineraries, no cookie-cutter packages
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              FAQ & MAP
              ═══════════════════════════════════════ */}
          <div className="grid lg:grid-cols-12 gap-12 mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
            {/* FAQ */}
            <div className="lg:col-span-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span
                  custom={0}
                  variants={fadeUp}
                  className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-4 block"
                >
                  Common Questions
                </motion.span>
                <motion.h2
                  custom={1}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-10"
                >
                  Everything You Need to{" "}
                  <span className="italic text-red-600 dark:text-red-400">
                    Know
                  </span>
                </motion.h2>

                <div className="space-y-3">
                  {CONTACT_CONFIG.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      custom={index + 2}
                      variants={fadeUp}
                      className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setActiveFaq(activeFaq === index ? null : index)
                        }
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="font-semibold text-slate-900 dark:text-white text-sm pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === index ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? "max-h-40" : "max-h-0"
                          }`}
                      >
                        <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div custom={6} variants={fadeUp} className="mt-8">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 hover:gap-3 transition-all"
                  >
                    View all FAQs <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Map */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-4 block">
                  Visit Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-10">
                  Find Us in{" "}
                  <span className="italic text-red-600 dark:text-red-400">
                    Delhi
                  </span>
                </h2>

                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                  <iframe
                    src={CONTACT_CONFIG.map.iframeSrc}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md py-2.5 px-4 rounded-xl shadow-sm text-xs font-semibold flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-slate-900 dark:text-white">
                      {CONTACT_CONFIG.map.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}