"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, User, ArrowRight, Clock, CheckCircle, Loader2 } from "lucide-react";

export function ConversionCTA() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          inquiryType: "custom",
          message: "Request callback from homepage CTA",
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to submit inquiry. Please try again.");
      }

      setIsSubmitted(true);
      setName("");
      setPhone("");
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setError(err?.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section
      id="callback"
      className="py-20 md:py-28 bg-linear-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 2xl:container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold text-red-400 uppercase tracking-[0.25em] mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Need help{" "}
              <span className="italic text-red-400">planning?</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Our travel experts will call you back and help plan the perfect
              trip — whether it&apos;s a weekend getaway or a month-long
              adventure.
            </p>

            {/* Trust points */}
            <div className="space-y-3">
              {[
                "No spam, just expert advice",
                "Available 7 days a week",
                "Personalized trip recommendations",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 text-white/50 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    We&apos;ll call you soon!
                  </h3>
                  <p className="text-white/50 text-sm">
                    A travel expert will reach out within 15 minutes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Request Callback
                  </h3>
                  <p className="text-white/40 text-sm mb-6">
                    Fill in your details and we&apos;ll get back to you.
                  </p>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="callback-name"
                      className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block"
                    >
                      Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        id="callback-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="callback-phone"
                      className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block"
                    >
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        id="callback-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                        minLength={10}
                        pattern="[0-9]{10}"
                        placeholder="1234567890"
                        className="w-full bg-white/[0.06] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all"
                        required
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-400 text-xs font-medium">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Callback
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Footnote */}
                  <p className="text-center text-white/30 text-xs flex items-center justify-center gap-1.5 pt-1">
                    <Clock className="w-3 h-3" />
                    Travel expert usually responds within 15 minutes.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
