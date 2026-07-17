import { getPublicPackages, getPublicPackageBySlug } from "@/lib/api/packages";
import { getPublicTestimonials } from "@/lib/api/testimonials";
import { PackageNavigation } from "@/components/package/PackageNavigation";
import { HeroGallery } from "@/components/package/HeroGallery";
import { BookingCard, MobileBookingButton } from "@/components/package/BookingCard";
import { ItineraryAccordion } from "@/components/package/ItineraryAccordion";
import { InclusionsList } from "@/components/package/InclusionsList";
import { PackageInfo } from "@/components/package/PackageInfo";
import { ReviewsSection } from "@/components/package/ReviewsSection";
import { WhatsInside } from "@/components/package/WhatsInside";
import { KnowBeforeYouGo } from "@/components/package/KnowBeforeYouGo";
import { StayInfo } from "@/components/package/StayInfo";
import { FaqContent } from "@/components/package/FaqContent";
import { notFound } from "next/navigation";
import { ChevronRight, Star, MapPin, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { SupportSection } from "@/components/package/SupportSection";
import { RelatedPackages } from "@/components/shared/RelatedPackages";

// Enable Static Site Generation (SSG) for all packages
export async function generateStaticParams() {
    const { packages } = await getPublicPackages({ limit: 200 });
    return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const pkg = await getPublicPackageBySlug(slug);
        return {
            title: `${pkg.title} | Ananta Travels`,
            description: pkg.overview,
        };
    } catch {
        return { title: "Package Not Found" };
    }
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let pkg;
    try {
        pkg = await getPublicPackageBySlug(slug);
    } catch {
        notFound();
    }
    const [{ packages }, { testimonials }] = await Promise.all([
        getPublicPackages({ limit: 200 }),
        getPublicTestimonials({ packageId: pkg.id, limit: 100 })
    ]);

    if (!pkg) {
        notFound();
    }

    // Filter testimonials to only match the current package ID to prevent leaks
    const packageTestimonials = (testimonials || []).filter((t: any) => {
        if (!t.packageId) return false;
        const tPkgId = typeof t.packageId === "object" 
            ? (t.packageId.id || t.packageId._id) 
            : t.packageId;
        return String(tPkgId) === String(pkg.id);
    });

    const normalizedReviews = [
        ...packageTestimonials.map((t: any) => ({
            id: t.id || t._id,
            author: t.customerName || t.author || "Guest",
            avatar: t.avatar,
            location: t.city || t.location || "Verified Traveler",
            rating: t.rating,
            date: t.travelMonth || t.travelDate || "Recently",
            content: t.shortReview || t.content || "",
            images: t.images || []
        })),
        ...(pkg.reviews || []).map((r: any) => ({
            id: r.id || r._id,
            author: r.author || "Guest",
            avatar: r.avatar,
            location: r.location || "Verified Traveler",
            rating: r.rating,
            date: r.date || "Recently",
            content: r.content || "",
            images: r.images || []
        }))
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 pb-20 pt-24 md:pt-6 w-full">
            <div className="container w-full mx-auto px-4 md:max-w-6xl xl:max-w-7xl">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-color-text-secondary mb-6">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-color-text-tertiary" />
                    <Link href="/packages" className="hover:text-primary transition-colors">Packages</Link>
                    <ChevronRight className="w-4 h-4 text-color-text-tertiary" />
                    <span className="text-color-text-primary font-medium truncate max-w-[200px]">{pkg.title}</span>
                </div>

                {/* Main Header (Airbnb Style with TravelCore custom look) */}
                <div className="mb-6 w-full">
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-[-0.02em] leading-tight text-color-text-primary mb-2">
                        {pkg.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-sm text-color-text-secondary">
                        <span className="flex items-center text-color-text-primary font-semibold">
                            <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                            {pkg.rating || "4.8"}
                        </span>
                        <span className="mx-1 text-color-text-tertiary">·</span>
                        <a href="#reviews" className="font-semibold underline text-color-text-primary hover:text-primary hover:no-underline transition-colors">
                            {pkg.reviewsCount} reviews
                        </a>
                        <span className="mx-1 text-color-text-tertiary">·</span>
                        <span className="flex items-center text-color-text-secondary">
                            <MapPin className="w-4 h-4 mr-1 text-color-text-tertiary" />
                            {pkg.location}
                        </span>
                    </div>
                </div>

                {/* Hero Gallery */}
                <div className="mb-10 w-full">
                    <HeroGallery images={pkg.images} />
                </div>

                {/* Asymmetric Desktop Detail Columns: Left ~58% (8/12), Right ~36% (4/12 with offset) */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">

                        {/* Host & Key Facts */}
                        <div>
                            <PackageInfo pkg={pkg} />
                        </div>

                        {/* Whats Inside Box */}
                        <div>
                            <WhatsInside items={pkg.whatsInside} />
                        </div>

                        <div className="border-b border-border" />

                        {/* Highlights & Overview */}
                        <div id="overview" className="scroll-mt-32">
                            <h3 className="text-2xl font-semibold tracking-tight text-color-text-primary mb-4">About this trip</h3>
                            <div className="text-color-text-secondary text-base leading-relaxed space-y-4">
                                <p className="whitespace-pre-wrap">{pkg.overview}</p>
                            </div>
                        </div>

                        <div className="border-b border-border" />

                        {/* Itinerary */}
                        <div id="itinerary" className="scroll-mt-32">
                            <ItineraryAccordion itinerary={pkg.itinerary} />
                        </div>

                        {/* Stay Information */}
                        {pkg.stayInfo && (
                            <>
                                <div className="border-b border-border" />
                                <div id="stay" className="scroll-mt-32">
                                    <StayInfo stayInfo={pkg.stayInfo} />
                                </div>
                            </>
                        )}

                        <div className="border-b border-border" />

                        {/* Inclusions */}
                        <div id="inclusions" className="scroll-mt-32">
                            <InclusionsList inclusions={pkg.inclusions} exclusions={pkg.exclusions} />
                        </div>

                        <div className="border-b border-border" />

                        {/* 7. IMPORTANT POLICIES */}
                        <section className="bg-muted dark:bg-slate-900/50 border border-border rounded-lg p-6 space-y-4">
                            <h3 className="text-lg font-bold text-color-text-primary flex items-center gap-2">
                                <HelpCircle className="w-5 h-5 text-primary" />
                                Essential Policies & Booking Notes
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-6 text-sm text-color-text-secondary">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-color-text-primary">Cancellation Policy</h4>
                                    <p className="text-color-text-secondary">Free cancellation up to 15 days before your trip start date. Cancellations made within 15 days are subject to standard resort charges.</p>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-color-text-primary">Refund Processing</h4>
                                    <p className="text-color-text-secondary">Refunds are processed back to your original source of payment within 5 to 7 working days.</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-border flex justify-between items-center flex-wrap gap-2 text-xs">
                                <span className="text-color-text-tertiary font-medium">Please review details before booking.</span>
                                <Link
                                    href="/cancellation-refund"
                                    className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                                >
                                    Full Cancellation & Refund Policy
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </section>

                        {pkg.faqs && pkg.faqs.length > 0 && (
                            <>
                                <div className="border-b border-border" />
                                <div id="faqs" className="scroll-mt-32">
                                    <FaqContent faqs={pkg.faqs} />
                                </div>
                            </>
                        )}

                        {/* 8. TESTIMONIALS */}
                        <div id="reviews" className="scroll-mt-32">
                            <ReviewsSection 
                                reviews={normalizedReviews} 
                                rating={pkg.rating || 4.8} 
                                count={pkg.reviewsCount || normalizedReviews.length} 
                            />
                        </div>

                        <div className="border-b border-border" />
                        <SupportSection />

                        {/* Related Packages */}
                        {(() => {
                            const relatedPackages = packages.filter(p =>
                                p.id !== pkg.id && (
                                    p.location === pkg.location ||
                                    p.badge === pkg.badge ||
                                    Math.abs(p.price - pkg.price) < 20000
                                )
                            ).slice(0, 3);

                            return (
                                <RelatedPackages
                                    title="More trips you might like"
                                    packages={relatedPackages}
                                    className="mt-8"
                                />
                            );
                        })()}
                    </div>


                    {/* Right Column: Sticky Booking Card - Occupies 4 columns with offset */}
                    <div className="hidden lg:block lg:col-span-4 lg:col-start-9 relative">
                        <BookingCard pkg={pkg} />
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 py-3.5 px-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_16px_rgba(15,23,42,0.05)]">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">₹{(pkg.price || 0).toLocaleString()}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 font-normal ml-1">/ person</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-1 leading-none">Excluding Applicable Taxes</span>
                </div>
                <MobileBookingButton pkg={pkg} />
            </div>
        </main>
    );
}
