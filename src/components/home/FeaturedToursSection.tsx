import { BookOpen, Home, Sparkles, Flower2 } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Spiritual Guidance",
    description: "Our yatras are curated with experienced guides (Yatra Margdarshaks) to enrich your inner journey.",
  },
  {
    icon: Home,
    title: "Sattvik Comfort",
    description: "Meticulously selected stays offering pure vegetarian (Sattvik) meals in close proximity to sacred shrines.",
  },
  {
    icon: Sparkles,
    title: "Auspicious Darshan",
    description: "Pre-arranged VIP temple entries, special Pooja bookings, and Aarti passes so you can focus on devotion.",
  },
  {
    icon: Flower2,
    title: "Seva & Wellness",
    description: "Engage in holy baths (Teertham Snanam), riverside aartis, and traditional wellness rituals.",
  },
];

export function WhyAnanta() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FDFBF7] to-[#FAF6EE] dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
      {/* Background mandala decoration */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.03] dark:opacity-[0.015] pointer-events-none select-none">
        <svg className="w-full h-full text-primary animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="2 2" />
          <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="2xl:container mx-auto px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] mb-3 block">
            Auspicious Journeys
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-zinc-900 dark:text-white leading-tight">
            Why Pilgrimage With{" "}
            <span className="text-gold-gradient">
              Ananta Yatras?
            </span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg mt-4">
            We honor your devotion by handling all journey logistics, ensuring a safe, pure, and spiritually elevating experience.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="group text-center p-6 md:p-8 rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-xs hover:border-primary/30 hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 dark:bg-primary/15 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                <value.icon
                  className="w-6 h-6 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-serif font-bold text-zinc-800 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[280px] mx-auto">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Backwards-compatible alias
export const FeaturedToursSection = WhyAnanta;
