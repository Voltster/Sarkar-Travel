import { Package, Destination, BlogPost } from "@/types";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";

// Package Filtering
export interface PackageFilters {
  destination?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  durationMin?: number;
  durationMax?: number;
  rating?: number;
  search?: string;
}

export function filterPackages(
  filters: PackageFilters,
  sourcePackages: Package[] = packages
): Package[] {
  let filtered = [...sourcePackages];

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(pkg =>
      pkg.title?.toLowerCase().includes(searchTerm) ||
      pkg.location?.toLowerCase().includes(searchTerm) ||
      pkg.overview?.toLowerCase().includes(searchTerm) ||
      pkg.highlights?.some(h => h.toLowerCase().includes(searchTerm))
    );
  }

  // Destination filter
  if (filters.destination) {
    const destSlug = filters.destination.toLowerCase();
    filtered = filtered.filter(pkg => {
      if (pkg.location?.toLowerCase() === destSlug) return true;
      const destId = pkg.destinationId;
      if (destId) {
        if (typeof destId === "object") {
          const d = destId as any;
          if (d.slug?.toLowerCase() === destSlug) return true;
          if (d._id === filters.destination || d.id === filters.destination) return true;
        } else if (typeof destId === "string") {
          if (destId.toLowerCase() === destSlug) return true;
        }
      }
      return false;
    });
  }

  // Category filter
  if (filters.category) {
    const catSlug = filters.category.toLowerCase();
    filtered = filtered.filter(pkg => {
      if (pkg.category?.toLowerCase() === catSlug) return true;
      const catId = (pkg as any).categoryId;
      if (catId) {
        if (typeof catId === "object") {
          const c = catId as any;
          if (c.slug?.toLowerCase() === catSlug) return true;
          if (c._id === filters.category || c.id === filters.category) return true;
          if (c.name?.toLowerCase() === catSlug) return true;
        } else if (typeof catId === "string") {
          if (catId.toLowerCase() === catSlug) return true;
        }
      }
      if (pkg.badge?.toLowerCase().includes(catSlug)) return true;
      if (pkg.targetAudience?.some(t => t.toLowerCase().includes(catSlug))) return true;
      return false;
    });
  }

  // Price filter
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(pkg => (pkg.price || 0) >= (filters.priceMin || 0));
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(pkg => (pkg.price || 0) <= (filters.priceMax || Infinity));
  }

  // Duration filter (extract nights from duration string)
  if (filters.durationMin !== undefined || filters.durationMax !== undefined) {
    filtered = filtered.filter(pkg => {
      const nights = pkg.nights || parseInt(pkg.duration?.match(/\d+/)?.[0] || "0");
      const meetsMin = filters.durationMin === undefined || nights >= filters.durationMin;
      const meetsMax = filters.durationMax === undefined || nights <= filters.durationMax;
      return meetsMin && meetsMax;
    });
  }

  // Rating filter
  if (filters.rating !== undefined) {
    filtered = filtered.filter(pkg => (pkg.rating || 0) >= (filters.rating || 0));
  }

  return filtered;
}

// Sorting
export type SortOption = "popular" | "price-low" | "price-high" | "rating" | "duration";

export function sortPackages(packages: Package[], sortBy: SortOption): Package[] {
  const sorted = [...packages];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "duration":
      return sorted.sort((a, b) => (a.nights || 0) - (b.nights || 0));
    case "popular":
    default:
      return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }
}

// Get related packages
export function getRelatedPackages(
  currentPackage: Package,
  limit: number = 4,
  sourcePackages: Package[] = packages
): Package[] {
  const getPkgDestSlug = (p: Package): string => {
    if (p.location) return p.location.toLowerCase();
    const dest = p.destinationId;
    if (dest && typeof dest === "object") return (dest as any).slug?.toLowerCase() || "";
    if (dest && typeof dest === "string") return dest.toLowerCase();
    return "";
  };

  const getPkgCatSlug = (p: Package): string => {
    if (p.category) return p.category.toLowerCase();
    const cat = (p as any).categoryId;
    if (cat && typeof cat === "object") return (cat as any).slug?.toLowerCase() || "";
    if (cat && typeof cat === "string") return cat.toLowerCase();
    return "";
  };

  const currentDestSlug = getPkgDestSlug(currentPackage);
  const currentCatSlug = getPkgCatSlug(currentPackage);

  return sourcePackages
    .filter(pkg => {
      if (pkg.id === currentPackage.id) return false;
      const sameDest = currentDestSlug && getPkgDestSlug(pkg) === currentDestSlug;
      const sameCat = currentCatSlug && getPkgCatSlug(pkg) === currentCatSlug;
      const sameBadge = pkg.badge && currentPackage.badge && pkg.badge.toLowerCase() === currentPackage.badge.toLowerCase();
      return sameDest || sameCat || sameBadge;
    })
    .slice(0, limit);
}

// Get packages by destination
export function getPackagesByDestination(
  destinationSlug: string,
  sourcePackages: Package[] = packages
): Package[] {
  const destination = destinations.find(d => d.slug === destinationSlug);
  const destName = destination ? destination.name.toLowerCase() : "";
  const destSlug = destinationSlug.toLowerCase();

  return sourcePackages.filter(pkg => {
    if (pkg.location?.toLowerCase() === destName) return true;
    const destId = pkg.destinationId;
    if (destId) {
      if (typeof destId === "object") {
        const d = destId as any;
        return d.slug?.toLowerCase() === destSlug || d._id === destinationSlug || d.id === destinationSlug;
      } else if (typeof destId === "string") {
        return destId.toLowerCase() === destSlug;
      }
    }
    return false;
  });
}

// Get packages by category/activity
export function getPackagesByCategory(
  category: string,
  sourcePackages: Package[] = packages
): Package[] {
  const catSlug = category.toLowerCase();
  return sourcePackages.filter(pkg => {
    if (pkg.category?.toLowerCase() === catSlug) return true;
    const catId = (pkg as any).categoryId;
    if (catId) {
      if (typeof catId === "object") {
        const c = catId as any;
        if (c.slug?.toLowerCase() === catSlug || c._id === category || c.id === category || c.name?.toLowerCase() === catSlug) return true;
      } else if (typeof catId === "string") {
        if (catId.toLowerCase() === catSlug) return true;
      }
    }
    if (pkg.badge?.toLowerCase().includes(catSlug)) return true;
    if (pkg.targetAudience?.some(t => t.toLowerCase().includes(catSlug))) return true;
    return false;
  });
}

// Search everything
export function globalSearch(query: string, sourcePackages: Package[] = packages) {
  const searchTerm = query.toLowerCase();

  const matchedPackages = sourcePackages.filter(pkg =>
    pkg.title?.toLowerCase().includes(searchTerm) ||
    pkg.location?.toLowerCase().includes(searchTerm)
  ).slice(0, 5);

  return {
    packages: matchedPackages,
    destinations: [] as Destination[],
    blogs: [] as BlogPost[],
    totalResults: matchedPackages.length
  };
}

// Get featured packages
export function getFeaturedPackages(limit: number = 6, sourcePackages: Package[] = packages): Package[] {
  return sourcePackages
    .filter(pkg => pkg.featured || pkg.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Get budget-friendly packages
export function getBudgetPackages(maxPrice: number = 50000, sourcePackages: Package[] = packages): Package[] {
  return sourcePackages
    .filter(pkg => pkg.price <= maxPrice)
    .sort((a, b) => a.price - b.price);
}

// Get luxury packages
export function getLuxuryPackages(minPrice: number = 100000, sourcePackages: Package[] = packages): Package[] {
  return sourcePackages
    .filter(pkg => pkg.price >= minPrice)
    .sort((a, b) => b.price - a.price);
}

// Pagination helper
export function paginateResults<T>(items: T[], page: number, perPage: number = 12): {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    items: items.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

// Price formatting
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

// Duration formatting
export function formatDuration(nights: number): string {
  const days = nights + 1;
  return `${days} Days & ${nights} Nights`;
}
