import { HeroSection } from "@/components/home/HeroSection";
import { PremiumBanner } from "@/components/home/PremiumBanner";
// import { ContentCarousel } from "@/components/home/ContentCarousel";
import { TopPackagesCarousel } from "@/components/home/TopPackagesCarousel";
import { FeaturedToursSection } from "@/components/home/FeaturedToursSection";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { InfinityBanner } from "@/components/home/InfinityBanner";
// import { PartnersSection } from "@/components/home/PartnersSection";
import { TravelTestimonials } from "@/components/home/Testimonials";
import { ExploreDestinations } from "@/components/home/ExploreDestinations";
import { ConversionCTA } from "@/components/home/ConversionCTA";
import { getPublicDestinations, getHomepageDestinations } from "@/lib/api/destinations";
import { getHomepagePackages, getFeaturedPackages } from "@/lib/api/packages";
import { getPublicTestimonials } from "@/lib/api/testimonials";
import { getPublicBanners } from "@/lib/api/banners";
import { destinations as staticDestinations } from "@/data/destinations";
import { packages as staticPackages } from "@/data/packages";
import { SpiritualQuote } from "@/components/home/SpiritualQuote";

export const dynamic = "force-dynamic";

const FALLBACK_TRIP_IMAGES = [
  "https://images.pexels.com/photos/27869485/pexels-photo-27869485.jpeg",
  "https://images.pexels.com/photos/35154999/pexels-photo-35154999.jpeg",
  "https://images.pexels.com/photos/30440725/pexels-photo-30440725.jpeg",
  "https://images.pexels.com/photos/19828848/pexels-photo-19828848.jpeg",
  "https://images.pexels.com/photos/30854355/pexels-photo-30854355.jpeg",
  "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg",
  "https://images.pexels.com/photos/1005456/pexels-photo-1005456.jpeg",
  "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
];

export default async function Home() {
  // ── Fetch data ──────────────────────────────────────────────────────────────
  const [
    { destinations: rawHomepageDestinations },
    { packages: rawHomepagePackages },
    { packages: rawFeaturedPackages },
    { testimonials },
    { banners },
    { destinations: rawAllDestinations }
  ] = await Promise.all([
    getHomepageDestinations(),
    getHomepagePackages(),
    getFeaturedPackages(),
    getPublicTestimonials({ featured: true, limit: 10 }),
    getPublicBanners(),
    getPublicDestinations({ limit: 200 }),
  ]);

  const homepageDestinations = rawHomepageDestinations && rawHomepageDestinations.length > 0 ? rawHomepageDestinations : staticDestinations;
  const homepagePackages = rawHomepagePackages && rawHomepagePackages.length > 0 ? rawHomepagePackages : staticPackages;
  const featuredPackages = rawFeaturedPackages && rawFeaturedPackages.length > 0 ? rawFeaturedPackages : staticPackages;
  const allDestinations = rawAllDestinations && rawAllDestinations.length > 0 ? rawAllDestinations : staticDestinations;

  const mappedBanners = (banners || []).map((b: any) => ({
    id: b.id,
    image: b.image,
    title: b.title,
    subtitle: b.subtitle || "",
    link: b.buttonLink || "",
    tag: b.tag || undefined,
    price: b.price || undefined,
  }));

  // Map backend reviews to homepage slider format
  const mappedReviews = testimonials.map((t: any, index: number) => ({
    id: t.id,
    name: t.customerName || t.author || "Traveler",
    location: t.city || t.location || "Verified Traveler",
    rating: t.rating || 5,
    text: t.shortReview || t.content || "",
    tripImage:
      t.packageId?.featuredImage?.url ||
      t.avatar ||
      FALLBACK_TRIP_IMAGES[index % FALLBACK_TRIP_IMAGES.length],
    tripName: t.packageId?.title || t.packageName || "Tour Journey",
    tripLocation: t.city || t.location || "",
    date: t.travelMonth || t.travelDate || "",
    tags: ["Verified"],
  }));

  // ── Featured packages ───────────────────────────────────────────────────────
  const featuredPackagesMapped = featuredPackages
    .map((pkg: any) => ({
      ...pkg,
      location:
        typeof pkg.destinationId === "object" && pkg.destinationId !== null
          ? pkg.destinationId.name || ""
          : "",
    }));

  // ── Trending destinations (from packages, with image) ───────────────────────
  const trendingItems = homepagePackages
    .map((pkg: any) => {
      let imageUrl = "";
      if (pkg.featuredImage) {
        imageUrl =
          typeof pkg.featuredImage === "string"
            ? pkg.featuredImage
            : pkg.featuredImage.url;
      } else if (pkg.images?.length) {
        imageUrl =
          typeof pkg.images[0] === "string" ? pkg.images[0] : pkg.images[0].url;
      }
      return {
        id: pkg.id,
        title: pkg.title,
        subtitle: pkg.duration,
        image: imageUrl,
        link: `/packages/${pkg.slug}`,
      };
    })
    .filter((item: any) => item.image)
    .slice(0, 7);

  // ── Visa-free destinations ──────────────────────────────────────────────────
  // const visaFreeItems = allDestinations
  //   .filter(
  //     (d: any) =>
  //       d.country.toLowerCase() !== "india" &&
  //       (d.visaRequired === false || d.visa_free === true)
  //   )
  //   .map((d: any) => {
  //     const count = d.packagesCount || 0;
  //     const imageUrl =
  //       d.image || d.heroImage || (d.images?.[0]
  //         ? typeof d.images[0] === "string" ? d.images[0] : d.images[0]?.url
  //         : "");
  //     return {
  //       id: d.id,
  //       title: d.name,
  //       subtitle: `${count} ${count === 1 ? "Package" : "Packages"}`,
  //       image: imageUrl,
  //       link: `/destinations/${d.slug}`,
  //     };
  //   })
  //   .filter((item: any) => item.image);

  // ── All destinations (for Explore section) ──────────────────────────────────
  const exploreDestinationsMapped = homepageDestinations
    .map((d: any) => {
      const imageUrl =
        d.image || d.heroImage || (d.images?.[0]
          ? typeof d.images[0] === "string" ? d.images[0] : d.images[0]?.url
          : "");
      return {
        id: d.id as string,
        slug: d.slug as string,
        name: d.name as string,
        image: imageUrl as string,
        heroImage: d.heroImage as string | undefined,
        packageCount: d.packagesCount as number,
        featured: d.featured as boolean | undefined,
      };
    })
    .filter((d: any) => d.image);

  // ── Holiday pick items (for HolidayPickSection) ─────────────────────────────
  const holidayPickItems = allDestinations
    .map((d: any) => {
      const imageUrl =
        d.image || d.heroImage || (d.images?.[0]
          ? typeof d.images[0] === "string" ? d.images[0] : d.images[0]?.url
          : "");
      return { name: d.name as string, image: imageUrl as string };
    })
    .filter((d: any) => d.image);

  // ── Page ────────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-background text-foreground bg-mandala">
      <HeroSection />
      <InfinityBanner />
      <SpiritualQuote />
      <TopPackagesCarousel initialPackages={homepagePackages} />
      <FeaturedJourneys packages={featuredPackagesMapped} />
      <ExploreDestinations destinations={exploreDestinationsMapped} />
      {/* <ContentCarousel
        title="Visa free destinations"
        variant="immersive"
        items={visaFreeItems}
        seeAllLink="/destinations"
      /> */}
      <FeaturedToursSection />
      {mappedBanners.length > 0 && <PremiumBanner data={mappedBanners} />}
      <ConversionCTA />
      <TravelTestimonials reviews={mappedReviews.length > 0 ? mappedReviews : undefined} />
      {/* <PartnersSection /> */}
    </main>
  );
}
