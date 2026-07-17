import Image from "next/image";
import Link from "next/link";
import { getPublicPartners } from "@/lib/api/partners";
import { ArrowUpRight, Globe, Award, Handshake, MapPin } from "lucide-react";

export default async function TourismBoardPartnersPage() {
    const { partners } = await getPublicPartners({ limit: 100 });

    return (
        <main className="min-h-screen bg-[#faf8f5] dark:bg-[#0c0a09]">
            {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
            <section className="relative h-[70vh] md:h-[80vh] min-h-[600px] w-full overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=2000&dpr=2"
                    alt="Tourism Board Partners"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Multi-layer gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

                {/* Ambient glow */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end md:items-center">
                    <div className="2xl:container mx-auto px-8 pb-16 md:pb-0 w-full">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-px w-12 bg-amber-400" />
                                <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em]">
                                    Global Network
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-6">
                                Our Trusted
                                <br />
                                <span className="italic text-amber-300">Partners</span>
                            </h1>

                            <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed">
                                Collaborating with global tourism boards to bring you authentic
                                and exclusive travel experiences.
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-8 mt-10">
                                <div className="flex items-center gap-2 text-white/60">
                                    <Globe className="w-5 h-5" />
                                    <span className="text-sm font-medium">{partners.length}+ Countries</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-2 text-white/60">
                                    <Award className="w-5 h-5" />
                                    <span className="text-sm font-medium">Certified Partners</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-2 text-white/60">
                                    <Handshake className="w-5 h-5" />
                                    <span className="text-sm font-medium">Since 2015</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          PARTNERS GRID
          ═══════════════════════════════════════ */}
            <section className="py-20 md:py-28 -mt-20 relative z-10">
                <div className="2xl:container mx-auto px-8">
                    {/* Section Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-[0.25em] mb-3 block">
                            <Handshake className="w-4 h-4 inline-block mr-2" />
                            Tourism Boards
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                            Explore by{" "}
                            <span className="italic text-red-600 dark:text-red-400">Destination</span>
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {partners.map((partner, index) => (
                            <Link
                                key={partner.id}
                                href={`/tourism-board-partners/${partner.slug}`}
                                className="group block"
                            >
                                <div className="relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-black/30 bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-black/50 hover:-translate-y-2">
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={partner.image}
                                            alt={partner.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                        {/* Hover tint */}
                                        <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors duration-500" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                        {/* Tag */}
                                        <div className="mb-4">
                                            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                <MapPin className="w-3 h-3" />
                                                Official Partner
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                                            {partner.name}
                                        </h3>

                                        {/* Expandable description */}
                                        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-out">
                                            <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                                                {partner.description}
                                            </p>
                                        </div>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            <span>Explore {partner.name}</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Corner accent */}
                                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          TRUST BAR
          ═══════════════════════════════════════ */}
            <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                <div className="2xl:container mx-auto px-8">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                        {[
                            { num: `${partners.length}+`, label: "Partner Countries" },
                            { num: "150+", label: "Exclusive Deals" },
                            { num: "50K+", label: "Travelers Served" },
                            { num: "4.9/5", label: "Partner Rating" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                    {stat.num}
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em] font-semibold mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}