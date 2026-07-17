"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/shared/PageHero";
import { Scale, BookOpen, CreditCard, Shield, FileText } from "lucide-react";

const sections = [
  { id: "agreement", title: "1. Agreement to Terms" },
  { id: "bookings", title: "2. Booking & Reservation" },
  { id: "payments", title: "3. Payments & Fees" },
  { id: "documents", title: "4. Travel Documents & Visas" },
  { id: "suppliers", title: "5. Supplier Rules & Policies" },
  { id: "cancellations", title: "6. Cancellations & Schedule Changes" },
  { id: "liability", title: "7. Limitation of Liability" },
  { id: "ip", title: "8. Intellectual Property" },
  { id: "governing-law", title: "9. Governing Law" },
  { id: "amendments", title: "10. Amendments & Updates" },
];

export default function TermsAndConditionsPage() {
  const lastUpdated = "May 2026";

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <PageHero
        title="Terms & Conditions"
        subtitle={`Effective Date: ${lastUpdated}. Please read these terms carefully before planning and booking your holidays with us.`}
        image="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
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

            {/* Support Box */}
            <div className="mt-6 bg-slate-100 dark:bg-slate-900/40 rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/30 text-center space-y-3">
              <Scale className="w-8 h-8 text-red-500 mx-auto" strokeWidth={1.5} />
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Need Clarification?
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                If you have questions about our booking agreements, please reach out to our legal helpdesk.
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
              <section id="agreement" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    1. Agreement to Terms
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  These Terms & Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and Ananta Travels (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated by Ananta Labs Global Private Ltd., concerning your access to and use of our booking platform and custom travel curations.
                </p>
                <p className="leading-relaxed">
                  By accessing the website, making reservations, or planning customized travel itineraries with us, you agree that you have read, understood, and agree to be bound by all of these Terms & Conditions. If you do not agree with all of these terms, you are expressly prohibited from using our services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="bookings" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    2. Booking & Reservation
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  When booking custom travel packages through Ananta Travels:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    All bookings are subject to availability and final confirmation by the respective travel suppliers (airlines, hotels, land operators, etc.).
                  </li>
                  <li>
                    You must provide accurate and complete personal details (matching passports) for all passengers in your party. We are not responsible for bookings denied or reissued due to incorrect details supplied by you.
                  </li>
                  <li>
                    A booking is only deemed confirmed once a written booking confirmation has been issued and the required deposit has been successfully processed.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="payments" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    3. Payments & Fees
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  To complete and maintain your reservations, the following payment policies apply:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Pricing structure:</strong> Prices quoted are in the designated currency and include taxes where specified. Prices are subject to change until booking confirmation is finalized.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Payment deadlines:</strong> Failure to pay the full package price or required deposits by the indicated deadlines may result in automatic cancellation of the booking and forfeiture of any deposit.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Transaction safety:</strong> Payments are processed via secure transaction networks. You represent and warrant that you have the legal right to use the selected payment instrument.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="documents" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    4. Travel Documents & Visas
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  It is the sole responsibility of the passenger to ensure all travel documents are in order:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Passports:</strong> Your passport must be valid for at least six (6) months beyond your planned return date.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Visas & Permits:</strong> You must secure all necessary transit visas, entry visas, permits, and vaccination certificates required by the countries you are visiting or transiting through.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Insurance:</strong> We strongly recommend purchasing comprehensive travel insurance covering trip cancellation, medical emergencies, evacuation, and baggage loss.
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="suppliers" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    5. Supplier Rules & Policies
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Ananta Travels acts as an agent arranging bookings between you and travel suppliers (airlines, hotels, vehicle rental companies, tour operators). Each supplier has its own terms, conditions of carriage, rules, and restrictions. You agree to read and adhere to the supplier terms regarding luggage limits, check-in timelines, behavior standards, and safety procedures.
                </p>
              </section>

              {/* Section 6 */}
              <section id="cancellations" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    6. Cancellations & Schedule Changes
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  All requests for cancellation or modification of a booking must be submitted in writing. Cancellations are subject to charges detailed in our <a href="/cancellation-refund" className="text-red-500 hover:underline">Cancellation & Refund Policy</a>.
                </p>
                <p className="leading-relaxed">
                  In case of flight delays, airline cancellations, schedule revisions, or destination closures initiated by suppliers, we will assist you in finding alternative arrangements. However, we are not liable for any additional costs incurred or compensation claims resulting from supplier actions.
                </p>
              </section>

              {/* Section 7 */}
              <section id="liability" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    7. Limitation of Liability
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  To the maximum extent permitted by applicable law, Ananta Travels, its affiliates, directors, or partners shall not be held liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                  <li>
                    Any injury, loss, claim, damage, or any special, exemplary, punitive, indirect, incidental, or consequential damages of any kind, arising from your travel bookings.
                  </li>
                  <li>
                    Acts of God, weather anomalies, strike disruptions, epidemics, wars, political instability, border closures, or any force majeure events out of our direct control.
                  </li>
                  <li>
                    Discrepancies, delays, default, insolvency, or negligence committed by any airline, hotel, or transportation provider.
                  </li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="ip" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    8. Intellectual Property
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  Unless otherwise indicated, our website, web application, custom designs, source code, data compilations, logos, graphics, and text content are our proprietary property and are protected by international copyright, trademark, and unfair competition laws. You are granted a limited license to browse the site and make personal copies of your travel itineraries. Any unauthorized commercial copying, distribution, or modification is strictly prohibited.
                </p>
              </section>

              {/* Section 9 */}
              <section id="governing-law" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    9. Governing Law
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  These Terms & Conditions and your booking agreements with us shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India.
                </p>
              </section>

              {/* Section 10 */}
              <section id="amendments" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h2 className="text-2xl font-serif font-semibold text-slate-900 dark:text-white">
                    10. Amendments & Updates
                  </h2>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <p className="leading-relaxed">
                  We reserve the right, in our sole discretion, to modify or replace these Terms & Conditions at any time. The most current version will always be posted on this page with the updated effective date. Your continued use of our services following any changes constitutes acceptance of the new Terms & Conditions.
                </p>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
