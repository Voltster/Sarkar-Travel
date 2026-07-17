"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  ArrowUp,
  MapPin,
} from "lucide-react";

const footerLinks = [
  { label: "Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  // { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-refund" },
];

const socials = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-950 text-white overflow-hidden">
      {/* ── Ambient Tricolor Glows (Saffron, White, Green) ── */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF9933]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#128807]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* ── Unique: Giant background watermark with Tricolor Gradient ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[25vw] font-bold tracking-tighter whitespace-nowrap leading-none translate-y-12 bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#128807] bg-clip-text text-transparent opacity-[0.02]">
          ANANTA
        </span>
      </div>

      {/* ── Unique: Top gradient accent line (Indian Tricolor) ── */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#128807]" />

      {/* ── Main Footer Content ── */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Column 1: Brand + Mission (spans 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative w-40 h-12">
              <Image
                src="/images/Ananta Travel red Logo.svg"
                alt="Ananta Travels"
                fill
                className="object-contain"
              />
            </div>
            
            <div className="space-y-4 max-w-md">
              <p className="text-sm text-white/50 leading-relaxed">
                Planning an international getaway shouldn&apos;t feel like a full-time job. 
                At Ananta Travel, we built a better way—fully customized holidays that are 
                effortless to create and unforgettable to experience.
              </p>
              <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                Our technology matches you with the best flights, stays, and activities in minutes, 
                while our experts fine-tune every detail to your pace, style, and budget. 
                Add 24×7 support and transparent pricing, and you get a planning experience 
                as smooth as the holiday itself.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (spans 3) */}
          <div className="lg:col-span-3 lg:pl-6">
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact (spans 4) */}
          <div className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/[0.06]">
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.2em] mb-6">
              Get in Touch
            </h4>
            
            <div className="space-y-5">
              <a
                href="mailto:Contact@anantatravels.com"
                className="group flex items-start gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm font-medium">Contact@anantatravels.com</p>
                </div>
              </a>

              <a
                href="tel:+91987654321"
                className="group flex items-start gap-4 text-white/60 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-sm font-medium">+91 987 6543 321</p>
                </div>
              </a>

              <div className="flex items-start gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Headquarters</p>
                  <p className="text-sm">Global Operations, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p className="text-xs text-white/25 text-center md:text-left">
              Ananta Labs Global Private Ltd. © {currentYear}. All rights reserved.
            </p>
            <p className="text-[11px] text-white/20 text-center md:text-left">
              Powered by <a href="https://www.anantalabs.net" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors underline underline-offset-2">Anantalabs</a>
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/25 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Unique: Back to Top Button ── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute bottom-8 right-8 w-11 h-11 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 z-50 group"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}