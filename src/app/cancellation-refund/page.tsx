"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { HelpCircle, RefreshCw, Plane, Home, DollarSign, Calendar, ShieldAlert } from "lucide-react";

const sections = [
  { id: "overview", title: "1. Policy Overview" },
  { id: "customer-cancellation", title: "2. Cancellation by Customer" },
  { id: "flights", title: "3. Flight Cancellations & Refunds" },
  { id: "accommodation", title: "4. Accommodation & Land Tours" },
  { id: "process", title: "5. Refund Request & Process" },
  { id: "service-charges", title: "6. Non-Refundable Service Charges" },
  { id: "force-majeure", title: "7. Force Majeure & Special Events" },
  { id: "support", title: "8. Support & Contact" },
];

export default function CancellationRefundPolicyPage() {
  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <PageHero
        title="Cancellation & Refund Policy"
        subtitle={`Effective Date: ${lastUpdated}. Learn about cancellation windows, refund timelines, and supplier rules for bookings.`}
        image="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Cancellation & Refund Policy" }]}
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
              <HelpCircle className="w-8 h-8 text-red-500 mx-auto" strokeWidth={1.5} />
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Have Booking Questions?
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Contact our support desk for 24/7 help modifying or cancelling active trips.
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
              {/* Section 1 */}
              <section id="overview" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    1. Policy Overview
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  At Ananta Travels, we understand that plans can change. Since our packages combine multiple travel services (flights, hotels, activities, and transport) from various independent suppliers, cancellations and refunds are governed by both our agency guidelines and supplier rules.
                </p>
                <p className="leading-relaxed">
                  This Cancellation & Refund Policy outlines the terms, timelines, and fees associated with cancelling or modifying your bookings. Please read it carefully before completing payments.
                </p>
              </section>

              {/* Section 2 */}
              <section id="customer-cancellation" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    2. Cancellation by Customer
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  If you decide to cancel a booking, the charges depend on how early we receive your written cancellation notice before the scheduled departure date. The standard timeline of charges is detailed below:
                </p>
                
                {/* Visual table for clarity and premium feel */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full border-collapse text-left text-sm text-slate-700 dark:text-slate-300">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                        <th className="p-4 font-semibold text-slate-900 dark:text-white">Cancellation Notice Period</th>
                        <th className="p-4 font-semibold text-slate-900 dark:text-white">Standard Fee Charged</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="p-4">30 days or more before departure</td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">Deposit amount + any non-refundable flight/hotel tickets</td>
                      </tr>
                      <tr>
                        <td className="p-4">15 to 29 days before departure</td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">50% of the total booking cost</td>
                      </tr>
                      <tr>
                        <td className="p-4">8 to 14 days before departure</td>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">75% of the total booking cost</td>
                      </tr>
                      <tr>
                        <td className="p-4">7 days or less / No-show</td>
                        <td className="p-4 font-medium text-red-500 font-semibold">100% of the total booking cost (No Refund)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Note: Custom, promotional, or high-season holiday packages may have customized timelines. Check your booking voucher for specific details.
                </p>
              </section>

              {/* Section 3 */}
              <section id="flights" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Plane className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    3. Flight Cancellations & Refunds
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Flights included in package itineraries are subject to airline fare rules:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Non-refundable fares:</strong> Many promotional, economy, and group booking fares are completely non-refundable once tickets are issued.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Cancellation fees:</strong> For refundable tickets, the airline charges cancellation fees, which will be deducted from your refund amount.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">No-Shows:</strong> If you miss your flight without prior cancellation notice, the ticket holds zero refund value under standard airline policies.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="accommodation" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Home className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    4. Accommodation & Land Tours
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Hotel and land operator cancellations depend on individual supplier terms:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    Some hotels enforce non-refundable booking rates. If you choose these rates during itinerary planning, they are entirely non-refundable and non-changeable.
                  </li>
                  <li>
                    Standard bookings canceled within the hotel penalty window (usually 48 to 72 hours before check-in) incur a penalty of at least one-night lodging charge.
                  </li>
                  <li>
                    Private tour guides, local transportation, and entry tickets to theme parks or museums are almost always non-refundable once booked.
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="process" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    5. Refund Request & Process
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  To request a cancellation and request a refund:
                </p>
                <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
                  <li>
                    Submit a formal cancellation request via email to your dedicated travel designer or to <strong className="text-slate-900 dark:text-white">Bookings@anantatravels.com</strong>, referencing your booking ID.
                  </li>
                  <li>
                    Our team will verify refund eligibility with suppliers and calculate cancellation charges.
                  </li>
                  <li>
                    Once approved, refunds are processed back to the original payment source (credit card, bank account, etc.) used for booking.
                  </li>
                  <li>
                    Refund processing takes between <strong className="text-slate-900 dark:text-white">7 to 14 business days</strong>, depending on processing times of corresponding banks and card networks.
                  </li>
                </ol>
              </section>

              {/* Section 6 */}
              <section id="service-charges" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    6. Non-Refundable Service Charges
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Ananta Travels charges a modest, non-refundable booking service fee of $30 (or equivalent local currency) per booking to cover administration and planning services. This fee is excluded from any eligible refunds. 
                </p>
                <p className="leading-relaxed">
                  Additionally, flight or hotel modification assistance fees ($15 per modification request) are non-refundable.
                </p>
              </section>

              {/* Section 7 */}
              <section id="force-majeure" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    7. Force Majeure & Special Events
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  In case of extraordinary events beyond control, including natural disasters (earthquakes, cyclones, floods), epidemics, political unrest, military actions, or government travel bans, bookings may need to be altered or cancelled.
                </p>
                <p className="leading-relaxed">
                  In such cases, we will negotiate with suppliers to secure refunds or travel credits (vouchers) for future use. Ananta Travels is not liable for supplier denials, and refund issuance is subject entirely to supplier cooperation.
                </p>
              </section>

              {/* Section 8 */}
              <section id="support" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    8. Support & Contact
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  If you need urgent assistance with cancelling or modifying your itinerary:
                </p>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200/50 dark:border-slate-800/50 space-y-2">
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Support Helpdesk:</strong> Travel Support Operations
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Email:</strong> Bookings@anantatravels.com
                  </p>
                  <p className="text-sm">
                    <strong className="text-slate-900 dark:text-white">Phone:</strong> +91 987 6543 321
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
