import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DestinationList } from "@/components/destination/DestinationList";
import { PageHero } from "@/components/shared/PageHero";
import { Destination } from "@/types";
import { Metadata } from "next";
import { getPublicDestinations } from "@/lib/api/destinations";

export const metadata: Metadata = {
  title: "Destinations | Ananta Travels",
  description: "Explore our curated list of destinations around the world.",
};

export default async function DestinationsPage() {
  const { destinations } = await getPublicDestinations({ limit: 200 });
  // Group destinations by continent
  const continents = destinations.reduce((acc: Record<string, Destination[]>, dest: Destination) => {
    if (!acc[dest.continent]) {
      acc[dest.continent] = [];
    }
    acc[dest.continent].push(dest);
    return acc;
  }, {} as Record<string, Destination[]>);

  return (
    <main className="page-shell pb-20">
      <PageHero
        title="Explore Destinations"
        subtitle="Discover breathtaking locations around the world. From tropical beaches to snow-capped mountains, find your perfect getaway."
        image="https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Destinations" }]}
        className="mb-16"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {["Beach", "Mountains", "City", "Cultural", "Adventure"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </PageHero>

      <div className="page-container">

        {/* Featured Destinations */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium  text-slate-900">
                Featured Destinations
              </h2>
              <p className="text-slate-600 mt-2">
                Our most popular and loved travel destinations
              </p>
            </div>
          </div>

          <DestinationList destinations={destinations.slice(0, 6)} />
        </section>

        {/* Destinations by Continent */}
        {Object.entries(continents).map(([continent, dests]) => (
          <section key={continent} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium  text-slate-900">
                  {continent}
                </h2>
                <p className="text-slate-500 mt-1">{dests.length} destinations</p>
              </div>
              <Link
                href={`/destinations?continent=${continent}`}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <DestinationList destinations={dests} />
          </section>
        ))}

        {/* CTA Section */}
        <section className="bg-linear-to-r from-gray-900 to-gray-950 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-serif text-white mb-4">
            Can&apos;t find your dream destination?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Let us help you plan a custom trip to anywhere in the world. Our travel experts
            are ready to create your perfect itinerary.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </main>
  );
}
