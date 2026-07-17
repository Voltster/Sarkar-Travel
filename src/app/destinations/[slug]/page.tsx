import { notFound } from "next/navigation";
import { DestinationGallery } from "@/components/destination/DestinationGallery";
import { AttractionCard } from "@/components/destination/AttractionCard";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  MapPin, Calendar, DollarSign, Globe, Clock, Plane,
  Sun, CloudRain, Snowflake, ChevronRight, Star, Info
} from "lucide-react";
import { getPublicDestinations, getPublicDestinationBySlug } from "@/lib/api/destinations";
import { Breadcrumb, PackageCard } from "@/components/shared";
import { RelatedPackages } from "@/components/shared/RelatedPackages";
import { getPublicPackages } from "@/lib/api/packages";

export async function generateStaticParams() {
  const { destinations } = await getPublicDestinations({ limit: 200 });
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const destination = await getPublicDestinationBySlug(slug);
    return {
      title: `${destination.name} Travel Packages | Ananta Travels`,
      description: destination.description,
    };
  } catch {
    return { title: "Destination Not Found" };
  }
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let destination;
  try {
    destination = await getPublicDestinationBySlug(slug);
  } catch {
    notFound();
  }

  // Get packages for this destination
  const { packages } = await getPublicPackages({ limit: 200 });
  const destinationPackages = packages.filter((pkg) => {
    const loc = (pkg.location || "").toLowerCase();
    const destName = (destination.name || "").toLowerCase();
    const destSlug = (destination.slug || "").toLowerCase();

    // Check if destinationId is an object with slug, or a string
    const pkgDestId = pkg.destinationId as any;
    const pkgDestSlug = typeof pkgDestId === 'object' && pkgDestId !== null
      ? (pkgDestId.slug || "").toLowerCase()
      : (pkgDestId || "").toLowerCase();

    return (
      (loc && destName && (loc.includes(destName) || destName.includes(loc))) ||
      (pkgDestSlug && pkgDestSlug === destSlug)
    );
  });

  return (
    <main className="page-shell pb-20">
      {/* Hero Section */}
      <div className="relative">
        <div className="page-container pt-24 md:pt-8">
          <Breadcrumb
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
            className="mb-4 text-black/80"
          />
          <div className="relative  h-[300px] md:h-[450px] lg:h-[500px] rounded-2xl page-hero bg-slate-900 flex items-center justify-center">
            {destination.heroImage?.trim() ? (
              <Image
                src={destination.heroImage.trim()}
                alt={destination.name}
                fill
                sizes="100vw"
                quality={100}
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-slate-500 font-medium z-10">No Hero Image</span>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="page-container pb-12">
                <h1 className="text-5xl md:text-7xl font-medium font-serif text-white mb-4">
                  {destination.name}
                </h1>
                <p className="text-xl text-white/90 mb-4">{destination.tagline}</p>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {destination.country}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    {destination.continent}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Best: {destination.bestTimeToVisit}
                  </span>
                  {destination.packagesCount && (
                    <span className="bg-white px-3 py-1 rounded-full text-red-500 text-sm font-medium">
                      {destination.packagesCount}+ Packages
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-8 relative z-10 mb-8">
          <InfoCard
            icon={<Clock className="w-6 h-6 text-red-500" />}
            title="Time Zone"
            value={destination.timezone || "GMT+5:30"}
          />
          <InfoCard
            icon={<DollarSign className="w-6 h-6 text-red-500" />}
            title="Currency"
            value={destination.currency || "INR"}
          />
          <InfoCard
            icon={<Globe className="w-6 h-6 text-red-500" />}
            title="Language"
            value={destination.language || "English"}
          />
          <InfoCard
            icon={<Plane className="w-6 h-6 text-red-500" />}
            title="Visa"
            value={destination.visaRequired ? "Required" : "Not Required"}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="section-card p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                About {destination.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                {destination.description}
              </p>
            </section>

            {/* Highlights */}
            <section className="section-card p-6">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Top Highlights
              </h2>
              <ul className="space-y-3">
                {(destination.highlights || []).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Star className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Top Attractions */}
            {/* <section>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Top Attractions
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {destination.topAttractions.map((attraction, index) => (
                  <AttractionCard
                    key={index}
                    name={attraction.name}
                    description={attraction.description}
                    image={attraction.image}
                  />
                ))}
              </div>
            </section> */}

            {/* Gallery Section */}
            {/* <DestinationGallery images={destination.gallery} /> */}

            {/* Packages for this destination */}
            <RelatedPackages
              title={`${destination.name} Packages`}
              packages={destinationPackages}
              viewAllLink={`/packages?destination=${destination.slug}`}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Guide */}
            <div className="sticky top-24">
              {/* <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Budget Guide
              </h3>
              <div className="space-y-4">
                <BudgetRow label="Budget" value={destination.averageBudget.budget} color="green" />
                <BudgetRow label="Mid-Range" value={destination.averageBudget.midRange} color="yellow" />
                <BudgetRow label="Luxury" value={destination.averageBudget.luxury} color="red" />
              </div> */}

              {/* Weather */}
              {/* <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Weather</h4>
                <div className="space-y-3">
                  <WeatherRow icon={<Sun />} season="Summer" info={destination.weather.summer} />
                  <WeatherRow icon={<Snowflake />} season="Winter" info={destination.weather.winter} />
                  {destination.weather.monsoon && (
                    <WeatherRow icon={<CloudRain />} season="Monsoon" info={destination.weather.monsoon} />
                  )}
                </div>
              </div> */}

              <div className="section-card p-6">


                <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg leading-snug">
                  Create your next sooper hit holiday
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Our destination experts can help curate an itinerary exactly for you. Free to connect over a call?
                </p>
                <Link
                  href={`/contact?destination=${destination.slug}`}
                  className="w-full bg-red-500 text-white py-3 rounded-luxury font-bold text-base hover:brightness-110 transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer rounded-xl"
                >
                  Contact Us
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              <Link href={`https://api.whatsapp.com/send/?phone=+917505545010&text=Hi%2C%20I%27m%20interested%20in%20${destination.slug}%20trip.%20Can%20you%20please%20provide%20me%20more%20details%3F`} target="_blank" >
                <button
                  // whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#cef9eb] rounded-2xl border border-[#008B5C] text-white py-3.5 rounded-luxury hover:brightness-105 transition-all shadow-md shado w-green-200 flex justify-around items-center gap-2 px-3 mt-4"
                >
                  <svg width="28px" height="28px" viewBox="0 0 24 24"><path fill="#008B5C" d="M4 12a8 8 0 113.96 6.906 1 1 0 00-.773-.101l-2.724.753.775-2.653a1 1 0 00-.103-.795A7.958 7.958 0 014 12zm8-10C6.477 2 2 6.477 2 12a9.96 9.96 0 001.199 4.751L2.04 20.72a1 1 0 001.226 1.244l4.059-1.122A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm2.004 12.226l.435-.38a.83.83 0 011-.07l1.068.699a.835.835 0 01.135.11l.114.114a.842.842 0 01-.069 1.248l-.9.725c-.296.238-.663.369-1.038.317-.977-.136-3.018-.634-4.839-2.466-1.77-1.781-2.555-3.983-2.862-5.117-.13-.475.01-.97.329-1.344l.654-.769a.83.83 0 011.263-.004l.616.714.655.778a.831.831 0 01-.172 1.224c-.29.194-.425.55-.3.877.35.922 1.257 2.745 3.141 3.495a.752.752 0 00.77-.152z" clipRule="#008B5C"></path></svg>
                  <span className="flex flex-col items-start pr-6">
                    <p className="text-base text-zinc-800">Whatsapp AnantaTravels</p>
                    <p className="text-sm text-zinc-500">Planned 200+ trips so far</p>
                  </span>
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="PJLV PJLV-ibKfaRC-css"><path fill="#008B5C" d="M5.164 2.13a.5.5 0 01.706.034l5 5.5a.5.5 0 010 .672l-5 5.5a.5.5 0 11-.74-.672L9.824 8 5.13 2.836a.5.5 0 01.034-.706z" clipRule="#008B5C"></path></svg>
                </button>
              </Link>

              <p className="text-center text-muted-text text-sm mt-4">or call us on +917505545010 or request callback for help</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


// Helper Components
function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="section-card p-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-[10px] text-color-text-tertiary uppercase tracking-wider">{title}</p>
          <p className="font-semibold text-color-text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}

function BudgetRow({ label, value, color }: { label: string; value: string; color: "green" | "yellow" | "red" }) {
  const colorClasses = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="flex items-center justify-between">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
        {label}
      </span>
      <span className="text-slate-900 dark:text-white font-medium">{value}</span>
    </div>
  );
}

function WeatherRow({ icon, season, info }: { icon: React.ReactNode; season: string; info: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-slate-400 mt-1">{icon}</div>
      <div>
        <p className="font-medium text-slate-900 dark:text-white text-sm">{season}</p>
        <p className="text-xs text-slate-500">{info}</p>
      </div>
    </div>
  );
}
