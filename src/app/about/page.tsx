"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  CheckCircle2,
  Award,
  ShieldCheck,
  Heart,
  Globe,
  Map,
  Compass,
  Sparkles,
  TrendingUp,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  users: Users,
  flexibility: CheckCircle2,
  award: Award,
  shield: ShieldCheck,
  heart: Heart,
  globe: Globe,
  map: Map,
};

const PAGE_CONTENT = {
  hero: {
    title: "About Ananta Travels",
    subtitle:
      "The most popular and trusted travel agency in India. We craft journeys that are as unique as you are.",
    image: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
  },
  story: {
    title: "The Highest Level of Comfort, Convenience and Service",
    paragraphs: [
      "At Ananta Travels, we combine premium service with attention to detail. Whether it's a private journey tailored just for you, a shared group experience, or a seamless transfer – we take care of everything, so you can enjoy every moment.",
      "Founded in 2015, our mission has been simple: to create travel experiences that linger in your memory long after you've returned home. We don't just book trips; we design chapters of your life's story.",
    ],
    image: "https://images.pexels.com/photos/3885597/pexels-photo-3885597.jpeg",
    stats: [
      { number: "200+", label: "Destinations" },
      { number: "9+", label: "Years Experience" },
      { number: "24/7", label: "Support Team" },
    ],
  },
  whyChooseUs: {
    title: "Why Choose Us?",
    subtitle:
      "We don't just plan trips; we curate experiences that become lifelong memories.",
    features: [
      {
        title: "Professional Team",
        description:
          "Our team consists of travel experts with over 10 years of experience in curating seamless travel experiences.",
        icon: "users",
      },
      {
        title: "Total Flexibility",
        description:
          "Change of plans? No problem. We offer flexible booking and cancellation options to give you peace of mind.",
        icon: "flexibility",
      },
      {
        title: "Curated Stays",
        description:
          "Handpicked hotels that meet our strict quality and luxury standards.",
        icon: "award",
      },
      {
        title: "Best Price Promise",
        description:
          "Luxury doesn't have to break the bank. We negotiate the best rates directly with partners to ensure you get more value.",
        icon: "shield",
      },
    ],
  },
  offerings: {
    title: "What We Offer",
    subtitle:
      "From a private tour to an accessible travel experience – we've got the perfect option for you.",
    services: [
      {
        title: "Private Tours",
        description: "Custom itineraries designed just for your group.",
        image: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg",
      },
      {
        title: "Scheduled Tours",
        description: "Join small groups on our curated adventures.",
        image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
      },
      {
        title: "Premium Transfers",
        description: "Luxury vehicles and professional chauffeurs.",
        image: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
      },
    ],
  },
  cta: {
    title: "Tailored Private Tours",
    subtitle: "Travel Your Way",
    description:
      "Enjoy a personalized journey in our premium fleet. Our expert planners work with you to design the perfect itinerary, ensuring total flexibility and comfort.",
    benefits: [
      "Flexible Timing",
      "Curated Stops",
      "Private Chauffeur",
      "Concierge Support",
    ],
    buttonText: "Explore Tours",
    buttonLink: "/packages",
    image: "https://images.pexels.com/photos/35148802/pexels-photo-35148802.jpeg",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
  }),
};

export default function AboutPage() {
  return (
    <main className="bg-[#faf8f5] dark:bg-[#0c0a09] min-h-screen overflow-hidden">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <PageHero
        title={PAGE_CONTENT.hero.title}
        subtitle={PAGE_CONTENT.hero.subtitle}
        image={PAGE_CONTENT.hero.image}
        breadcrumbs={[{ label: "About Us" }]}
        className="mb-16 md:mb-24"
      />

      {/* ═══════════════════════════════════════
          STORY & STATS
          ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="2xl:container mx-auto px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/30">
                <Image
                  src={PAGE_CONTENT.story.image}
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating experience badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-5 md:p-6 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      9+
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                      Years Exploring
                    </p>
                  </div>
                </div>
              </motion.div>
              {/* Decorative background shape */}
              <div className="absolute -z-10 -top-8 -left-8 w-full h-full rounded-3xl bg-red-50 dark:bg-red-950/20" />
            </motion.div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.span
                  custom={0}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold tracking-[0.2em] uppercase"
                >
                  <Sparkles className="w-4 h-4" />
                  Our Story
                </motion.span>

                <motion.h2
                  custom={1}
                  variants={fadeUp}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-[1.15] tracking-tight"
                >
                  {PAGE_CONTENT.story.title}
                </motion.h2>

                <div className="space-y-5">
                  {PAGE_CONTENT.story.paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      custom={idx + 2}
                      variants={fadeUp}
                      className="text-slate-600 dark:text-slate-400 leading-[1.8] text-base md:text-lg"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-800"
              >
                {PAGE_CONTENT.story.stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                      {stat.number}
                    </p>
                    <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-500 mt-1 uppercase tracking-[0.15em] font-semibold">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE US
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-900/50 relative">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="2xl:container mx-auto px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              <TrendingUp className="w-4 h-4" />
              Why Ananta
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight"
            >
              {PAGE_CONTENT.whyChooseUs.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg"
            >
              {PAGE_CONTENT.whyChooseUs.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PAGE_CONTENT.whyChooseUs.features.map((feature, idx) => {
              const Icon = ICON_MAP[feature.icon] || Award;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group bg-[#faf8f5] dark:bg-slate-900 p-7 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT WE OFFER
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="2xl:container mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-4"
            >
              <Globe className="w-4 h-4" />
              Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight"
            >
              {PAGE_CONTENT.offerings.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg"
            >
              {PAGE_CONTENT.offerings.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PAGE_CONTENT.offerings.services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="group relative h-[320px] md:h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-slate-200/50 dark:shadow-black/40"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Arrow button */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TAILORED CTA
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-slate-900 dark:bg-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />

        <div className="2xl:container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="lg:col-span-6 space-y-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.span
                  custom={0}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 text-red-400 text-xs font-bold tracking-[0.2em] uppercase"
                >
                  <Heart className="w-4 h-4" />
                  Premium Experience
                </motion.span>

                <motion.div custom={1} variants={fadeUp}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                    {PAGE_CONTENT.cta.title}
                  </h2>
                  <p className="text-xl md:text-2xl font-serif italic text-red-400 mt-3">
                    {PAGE_CONTENT.cta.subtitle}
                  </p>
                </motion.div>

                <motion.p
                  custom={2}
                  variants={fadeUp}
                  className="text-slate-400 leading-[1.8] text-base md:text-lg max-w-lg"
                >
                  {PAGE_CONTENT.cta.description}
                </motion.p>

                <motion.div
                  custom={3}
                  variants={fadeUp}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  {PAGE_CONTENT.cta.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-300 text-sm md:text-base"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  custom={4}
                  variants={fadeUp}
                  className="pt-4 flex flex-wrap gap-4"
                >
                  <Link
                    href={PAGE_CONTENT.cta.buttonLink}
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 hover:-translate-y-0.5"
                  >
                    {PAGE_CONTENT.cta.buttonText}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:+917505545010"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src={PAGE_CONTENT.cta.image}
                  alt="Tailored Tours"
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 to-transparent" />
              </div>
              {/* Decorative frame */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-red-500/20" />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}