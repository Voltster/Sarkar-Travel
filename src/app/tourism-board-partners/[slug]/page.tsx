import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublicPartners, getPublicPartnerBySlug } from "@/lib/api/partners";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const { partners } = await getPublicPartners({ limit: 100 });
    return partners.map((partner) => ({ slug: partner.slug }));
}

export default async function PartnerDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    let partner;
    try {
        partner = await getPublicPartnerBySlug(slug);
    } catch {
        notFound();
    }

    if (!partner) {
        notFound();
    }

    return (
        <div className="page-shell pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900 overflow-hidden">
                <Image
                    src={partner.heroImage || partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-20 px-4">
                    <div className="page-container w-full">
                        <h1 className="text-5xl md:text-7xl font-serif text-white font-bold drop-shadow-2xl mb-4">
                            {partner.name}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 font-light max-w-2xl drop-shadow-md">
                            {partner.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="page-container mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="section-card p-8 md:p-12">
                        <h2 className="section-title mb-6">About {partner.name}</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                            {(partner.longDescription || [partner.description || ""]).map((paragraph, index) => (
                                <p key={index} className="mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {partner.website && (
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                <Link
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium"
                                >
                                    Visit Official Website
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Gallery Grid */}
                    <div className="space-y-6">
                        <h2 className="section-title">Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(partner.gallery || [partner.image]).filter(Boolean).map((image, idx) => (
                                <div key={idx} className={`relative rounded-xl overflow-hidden aspect-video ${idx === 0 ? 'md:col-span-2 md:aspect-21/9' : ''}`}>
                                    <Image
                                        src={image}
                                        alt={`${partner.name} gallery image ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar / quick info */}
                <div className="space-y-6">
                    <div className="section-card p-6 sticky top-24">
                        <h3 className="font-serif text-2xl mb-4 text-slate-800 dark:text-slate-100">Plan your trip</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Ready to explore {partner.name}? Let us help you craft the perfect itinerary.
                        </p>
                        <Link href="/contact" className="block w-full text-center py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Contact Us
                        </Link>
                        <div className="mt-4 text-center">
                            <span className="text-sm text-slate-500">or browse related packages</span>
                        </div>
                        <Link href={`/search?q=${partner.name}`} className="mt-2 block w-full text-center py-3 px-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            View Packages
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
