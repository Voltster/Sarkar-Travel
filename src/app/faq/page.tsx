"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useFaqs } from "@/hooks/useFaqs";
import type { FAQ } from "@/types";
import { Breadcrumb } from "@/components/shared";
import { PageHero } from "@/components/shared/PageHero";

export default function FAQPage() {
  const { faqs, isLoading } = useFaqs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, faqs]);

  const groupedFAQs = useMemo(() => {
    return filteredFAQs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [filteredFAQs, faqs]);

  const categories = Array.from(new Set(faqs.map((f) => f.category))).filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black pb-20">
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our travel services, booking process, and policies."
        image="https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "FAQ" }]}
        className="mb-12"
      />

      <div className="container mx-auto px-4 max-w-4xl">

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all"
              ? "bg-red-500 text-white"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-500"
              }`}
          >
            All Topics
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat
                ? "bg-red-500 text-white"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-500"
                }`}
            >
              {String(cat).replace("-", " ")}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="animate-pulse space-y-3">
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-80 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        )}

        {/* FAQs */}
        {filteredFAQs.length > 0 ? (
          selectedCategory === "all" ? (
            Object.entries(groupedFAQs).map(([category, categoryFaqs]) => (
              <div key={category} className="mb-8">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 capitalize">
                  {String(category).replace("-", " ")}
                </h2>
                <div className="space-y-3">
                  {categoryFaqs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openFAQ === faq.id}
                      onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-slate-500 mb-4">
              Try adjusting your search or browse all topics
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-red-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 bg-linear-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-serif text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-white/90 mb-6">
            Our team is here to help you with any questions about your trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@anantatravels.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors"
            >
              Email Us
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=917505545010&text=Hi%21+I%27m+interested+in+your+travel+packages.+Can+you+help+me%3F&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-slate-900 dark:text-white pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-slate-600 dark:text-slate-400">
          {faq.answer}
        </div>
      </motion.div>
    </div>
  );
}
