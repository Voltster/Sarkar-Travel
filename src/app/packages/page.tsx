import { Metadata } from "next";
import { PackagesContent } from "@/components/packages/PackagesContent";
import { PageHero } from "@/components/shared/PageHero";
import {
  filterPackages,
  sortPackages,
  paginateResults,
  SortOption,
  PackageFilters
} from "@/lib/filters";
import { getPublicPackages } from "@/lib/api/packages";

export const metadata: Metadata = {
  title: "Travel Packages | Ananta Travels",
  description: "Browse our curated travel packages for memorable holidays.",
};

interface PageProps {
  searchParams: Promise<{
    destination?: string;
    category?: string;
    search?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function PackagesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { packages } = await getPublicPackages({ limit: 200 });

  const page = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 9;

  const filters: PackageFilters = {
    destination: params.destination,
    category: params.category,
    search: params.search,
  };

  // Filter and Sort
  const filteredPackages = filterPackages(filters, packages);
  const sortedPackages = sortPackages(
    filteredPackages,
    (params.sortBy as SortOption) || "popular"
  );

  // Paginate
  const paginatedData = paginateResults(sortedPackages, page, ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#fbfbfb] dark:bg-black pb-20">
      <PageHero
        title="Find Your Perfect Trip"
        subtitle={`Discover ${paginatedData.totalItems}+ curated holiday packages designed for unforgettable memories.`}
        image="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=2000"
        breadcrumbs={[{ label: "Packages" }]}
        className="mb-12"
      />

      <PackagesContent
        packages={paginatedData.items}
        totalItems={paginatedData.totalItems}
        totalPages={paginatedData.totalPages}
        currentPage={paginatedData.currentPage}
      />
    </main>
  );
}
