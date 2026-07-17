"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { Shield, Eye, Lock, RefreshCw, FileText } from "lucide-react";

const sections = [
  { id: "introduction", title: "1. Introduction & Scope" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Your Information" },
  { id: "sharing", title: "4. Information Sharing & Disclosure" },
  { id: "security", title: "5. Data Security & Retention" },
  { id: "rights", title: "6. Your Rights & Choices" },
  { id: "cookies", title: "7. Cookies & Tracking Technologies" },
  { id: "contact", title: "8. Contact Us" },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <PageHero
        title="Privacy Policy"
        subtitle={`Effective Date: ${lastUpdated}. Learn how Ananta Travels protects, respects, and handles your personal information.`}
        image="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Privacy Policy" }]}
        className="mb-16"
      />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Sticky Navigation Sidebar ── */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-xs">
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
                On This Page
              </p>
              <nav className="flex flex-col space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="group flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors py-2 pl-3 border-l-2 border-transparent hover:border-red-500/50"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick trust badges */}
            <div className="mt-6 bg-slate-100 dark:bg-slate-900/40 rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/30 text-center space-y-3">
              <Shield className="w-8 h-8 text-red-500 mx-auto" strokeWidth={1.5} />
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Safe & Secure Bookings
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Your data is protected under leading travel industry security standards.
              </p>
            </div>
          </aside>

          {/* ── Content Area ── */}
          <div className="lg:col-span-9 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-8 lg:p-12 shadow-xs space-y-10 text-slate-700 dark:text-slate-300"
            >
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    1. Introduction & Scope
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Welcome to Ananta Travels (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Operated by Ananta Labs Global Private Ltd., we are dedicated to curating premium and seamless travel experiences. We respect your privacy and are committed to safeguarding the personal data you share with us.
                </p>
                <p className="leading-relaxed">
                  This Privacy Policy details how we collect, use, process, and disclose your personal information in connection with your access to and use of our website, mobile application, customer service interactions, and holiday bookings. By accessing our services, you consent to the practices described in this document.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="collection" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    2. Information We Collect
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  To provide our custom travel and booking services, we collect several categories of information:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Personal Identifiers:</strong> Full name, date of birth, gender, nationality, passport number, passport expiration date, and visa details required for international travel.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Contact Information:</strong> Email address, phone number, and physical billing/shipping address.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Travel & Booking Preferences:</strong> Flight preferences, dietary requirements, hotel and room selections, frequent flyer/loyalty program details, and accessibility or medical requests related to your journey.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Financial Details:</strong> Payment card numbers, billing details, and transaction history. All payments are processed through secure, PCI-compliant payment gateways.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Usage & Technical Data:</strong> IP addresses, browser types, operating systems, referring URLs, device information, and interaction history on our website.
                  </li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section id="usage" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    3. How We Use Your Information
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  We use your personal data to power our customized holiday planning and operations:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Fulfilling Bookings:</strong> Reserving flights, hotels, cruises, transport, and tours with local and global suppliers.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Customer Support:</strong> Responding to inquiries, modifying itineraries, and offering 24/7 on-trip assistance.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Account Management:</strong> Managing your user profile, travel history, and wishlists.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Communications:</strong> Sending itinerary confirmations, flight updates, travel advisories, and administrative notifications.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Marketing & Personalization:</strong> Sending newsletters, customized travel recommendations, and promotional offers (only where you have opted in).
                  </li>
                </ul>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    4. Information Sharing & Disclosure
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  We do not sell your personal data to third parties. We share your information only under the following necessary circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Travel Service Suppliers:</strong> We share passenger details with airlines, hotels, vehicle rental agencies, and tour operators to secure your reservations. These suppliers operate as independent data controllers.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Technology & Service Providers:</strong> We share data with hosting platforms, email dispatch utilities, and analytics partners who perform services on our behalf.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Legal & Regulatory Authorities:</strong> We disclose information when required to comply with visa regulations, border control mandates, court orders, or requests from law enforcement.
                  </li>
                </ul>
              </section>

              {/* Data Security & Retention */}
              <section id="security" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    5. Data Security & Retention
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  We utilize robust administrative, technical, and physical safeguards to prevent unauthorized access, alteration, disclosure, or destruction of your personal data. This includes secure database systems, network firewalls, and SSL/TLS encryption for all data transmissions.
                </p>
                <p className="leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the booking purposes outlined in this policy, comply with financial audit rules, and resolve disputes. When data is no longer required, it is safely anonymized or securely deleted.
                </p>
              </section>

              {/* Your Rights */}
              <section id="rights" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    6. Your Rights & Choices
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Depending on your jurisdiction, you may have specific rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Right of Access:</strong> Request a copy of the personal data we hold about you.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete personal records.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Right to Deletion:</strong> Request the erasure of your personal data, subject to legal retention obligations.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Right to Restrict or Object:</strong> Restrict or object to certain processing types, such as direct marketing.
                  </li>
                </ul>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    7. Cookies & Tracking Technologies
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  We use cookies, web beacons, and similar tracking technologies to store your preferences, keep you logged in, analyze site traffic, and track behavior on our web application. You can manage your cookie preferences directly in your browser settings. Restricting cookies may prevent certain features of our booking platform from functioning correctly.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    8. Contact Us
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please reach out to us:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Data Protection Officer:</strong> Privacy Operations Team
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Email:</strong> Contact@anantatravels.com
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Phone:</strong> +91 987 6543 321
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Corporate Office:</strong> Ananta Labs Global Private Ltd., Global Operations, India
                  </p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
