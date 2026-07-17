"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  CalendarDays,
  Users,
  Building2,
  BedDouble,
  Send,
  CheckCircle,
  RotateCcw,
  Shield,
  MessageSquare,
} from "lucide-react";
import type { Hotel } from "@/types";

interface HotelInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel | null;
}

export function HotelInquiryModal({ isOpen, onClose, hotel }: HotelInquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
    roomType: "standard",
    hotelType: hotel?.propertyType?.toLowerCase() || "hotel",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  if (!hotel) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const destinationName =
      typeof hotel.destinationId === "object" && hotel.destinationId
        ? hotel.destinationId.name
        : hotel.location;

    try {
      const response = await fetch("/api/hotel-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          destination: destinationName,
          hotelName: hotel.name,
          hotelId: hotel.id,
          tenantId: process.env.NEXT_PUBLIC_DEFAULT_TENANT_ID,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=917505545010&text=${encodeURIComponent(
    `Hi! I have just submitted an inquiry for "${hotel.name}" in ${
      typeof hotel.destinationId === "object" ? hotel.destinationId.name : hotel.location
    }. I would like to lock in this booking.`
  )}&type=phone_number&app_absent=0`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 z-10"
          >
            {/* Header */}
            <div className="relative px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-linear-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/10 dark:to-orange-950/10">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest block mb-1">
                Luxury Hotel Booking
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white pr-8 line-clamp-1">
                Inquire: {hotel.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {hotel.location} • {hotel.starRating}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mb-5">
                      <CheckCircle className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Inquiry Submitted!
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                      We've received your request for <strong>{hotel.name}</strong>. Our specialist will review and call you back shortly.
                    </p>

                    {/* WhatsApp CTA */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5 mb-4"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428.002 9.85-4.417 9.853-9.852.002-2.633-1.02-5.107-2.876-6.967C17.18 1.947 14.716.924 12.01.924c-5.437 0-9.856 4.416-9.859 9.852-.001 1.923.499 3.8 1.447 5.4l-.952 3.473 3.568-.936zm11.367-7.461c-.327-.164-1.93-.953-2.229-1.062-.299-.11-.517-.164-.734.164-.217.328-.841 1.062-1.031 1.281-.19.218-.38.245-.707.081-.327-.164-1.382-.509-2.63-1.621-.972-.867-1.627-1.938-1.817-2.265-.19-.327-.02-.504.143-.667.147-.146.327-.382.49-.573.163-.19.217-.327.327-.546.11-.218.054-.41-.028-.573-.082-.164-.734-1.77-.996-2.433-.26-.628-.519-.544-.712-.554l-.608-.01c-.217 0-.571.082-.87.41-.299.327-1.14 1.12-1.14 2.732 0 1.613 1.17 3.17 1.332 3.388.163.218 2.302 3.515 5.578 4.922.779.335 1.388.536 1.862.687.783.249 1.496.214 2.06.13.629-.094 1.93-.789 2.202-1.554.272-.765.272-1.42.19-1.554-.082-.134-.299-.218-.627-.382z"/>
                      </svg>
                      Connect on WhatsApp
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-semibold hover:underline"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Customer Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-red-500" /> Name *
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-red-500" /> Phone *
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
                          placeholder="10-digit number"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                      />
                    </div>

                    {/* Stay Details */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" /> Check-in *
                          </label>
                          <input
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            required
                            min={todayStr}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5" /> Check-out *
                          </label>
                          <input
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            required
                            min={formData.checkIn || todayStr}
                            className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" /> Guests
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" /> Rooms
                        </label>
                        <select
                          name="rooms"
                          value={formData.rooms}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 outline-none"
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Room" : "Rooms"}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5" /> Room Type
                        </label>
                        <select
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 outline-none"
                        >
                          <option value="standard">Standard</option>
                          <option value="deluxe">Deluxe</option>
                          <option value="suite">Suite</option>
                          <option value="villa">Private Villa</option>
                          <option value="heritage">Heritage</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" /> Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Any dietary needs, bed configurations, or airport transfer requests..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-3 text-xs bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 mt-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center justify-center gap-2 text-sm transition-all"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                          Submitting inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Submit Inquiry
                        </>
                      )}
                    </button>

                    <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> Verified stays • Secure booking
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
