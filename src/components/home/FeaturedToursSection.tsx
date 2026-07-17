import { Map, PlaneTakeoff, CalendarRange, Globe } from "lucide-react";

const values = [
  {
    icon: Map,
    title: "Curated itineraries",
    description: "Every trip is hand-designed by our travel experts for unforgettable experiences.",
  },
  {
    icon: PlaneTakeoff,
    title: "Airport assistance",
    description: "Seamless pickup, drop-off, and transit support at every step.",
  },
  {
    icon: CalendarRange,
    title: "Flexible planning",
    description: "Modify dates, routes, and preferences anytime before departure.",
  },
  {
    icon: Globe,
    title: "Local expertise",
    description: "On-ground partners who know every destination inside out.",
  },
];

export function WhyAnanta() {
  return (
    <section className="pt-20 pb-16 md:pb-20">
      <div className="2xl:container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-14 md:mb-16">
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
            Why Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
            Why Travel With{" "}
            <span className="italic text-red-600 dark:text-red-400">
              Ananta
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mt-3">
            The little things that make a big difference.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="group text-center p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/40 dark:hover:shadow-slate-950/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <value.icon
                  className="w-6 h-6 text-red-600 dark:text-red-400"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px] mx-auto">
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
