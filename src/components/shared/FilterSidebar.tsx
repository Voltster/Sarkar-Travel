"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDestinations } from "@/hooks/useDestinations";
import { usePublicFilters } from "@/hooks/usePublicFilters";
import { useCategories } from "@/hooks/useCategories";

interface FilterSidebarProps {
  selectedDestination?: string;
  selectedCategory?: string;
  selectedPriceRange?: string;
  selectedDuration?: string;
  selectedRating?: string;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
  showMobileToggle?: boolean;
}

export interface FilterState {
  destination?: string;
  category?: string;
  priceRange?: string;
  duration?: string;
  rating?: string;
}

// Filter Section Component - moved outside main component
function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="font-medium text-slate-900 dark:text-white">{title}</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>
      {expanded && children}
    </div>
  );
}

// Filter Content Component - moved outside main component  
function FilterContent({
  hasActiveFilters,
  clearAllFilters,
  expandedSections,
  toggleSection,
  selectedDestination,
  selectedCategory,
  selectedPriceRange,
  selectedDuration,
  selectedRating,
  handleFilterChange,
  destinations,
  categoryOptions,
  priceRanges,
  durationOptions,
  ratingOptions,
}: {
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  selectedDestination?: string;
  selectedCategory?: string;
  selectedPriceRange?: string;
  selectedDuration?: string;
  selectedRating?: string;
  handleFilterChange: (key: keyof FilterState, value: string | undefined) => void;
  destinations: { id: string; slug: string; name: string; packagesCount?: number }[];
  categoryOptions: { id: string; slug: string; name: string }[];
  priceRanges: { id: string; label: string }[];
  durationOptions: { id: string; label: string }[];
  ratingOptions: { id: string; label: string }[];
}) {
  return (
    <div className="space-y-6">
      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Clear all filters
        </button>
      )}

      {/* Price Filter */}
      <FilterSection
        title="Budget"
        expanded={expandedSections.price}
        onToggle={() => toggleSection("price")}
      >
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === range.id}
                onChange={() => handleFilterChange("priceRange", range.id)}
                className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-red-600">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Duration Filter */}
      <FilterSection
        title="Duration"
        expanded={expandedSections.duration}
        onToggle={() => toggleSection("duration")}
      >
        <div className="space-y-2">
          {durationOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={selectedDuration === option.id}
                onChange={() => handleFilterChange("duration", option.id)}
                className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-red-600">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Destination Filter */}
      <FilterSection
        title="Destination"
        expanded={expandedSections.destination}
        onToggle={() => toggleSection("destination")}
      >
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {destinations.map((dest) => (
            <label key={dest.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="destination"
                checked={selectedDestination === dest.slug}
                onChange={() => handleFilterChange("destination", dest.slug)}
                className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-red-600">
                {dest.name}
              </span>
              <span className="text-xs text-slate-400 ml-auto">({dest.packagesCount || 0})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Category/Activity Filter */}
      <FilterSection
        title="Category"
        expanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categoryOptions.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.slug}
                onChange={() => handleFilterChange("category", category.slug)}
                className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-red-600">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection
        title="Rating"
        expanded={expandedSections.rating}
        onToggle={() => toggleSection("rating")}
      >
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === option.id}
                onChange={() => handleFilterChange("rating", option.id)}
                className="w-4 h-4 text-red-600 border-slate-300 focus:ring-red-500"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-red-600">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>


    </div>
  );
}

export function FilterSidebar({
  selectedDestination,
  selectedCategory,
  selectedPriceRange,
  selectedDuration,
  selectedRating,
  onFilterChange,
  className,
  showMobileToggle = true,
}: FilterSidebarProps) {
  const { destinations, isLoading: destinationsLoading } = useDestinations();
  const { filters, isLoading: filtersLoading } = usePublicFilters();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    destination: true,
    category: true,
    price: true,
    duration: true,
    rating: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key: keyof FilterState, value: string | undefined) => {
    onFilterChange({
      destination: selectedDestination,
      category: selectedCategory,
      priceRange: selectedPriceRange,
      duration: selectedDuration,
      rating: selectedRating,
      [key]: value === (key === 'destination' ? selectedDestination :
        key === 'category' ? selectedCategory :
          key === 'priceRange' ? selectedPriceRange :
            key === 'duration' ? selectedDuration :
              selectedRating) ? undefined : value,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      destination: undefined,
      category: undefined,
      priceRange: undefined,
      duration: undefined,
      rating: undefined,
    });
  };

  const hasActiveFilters = !!(selectedDestination || selectedCategory || selectedPriceRange || selectedDuration || selectedRating);

  const priceRanges = filters?.priceRanges || [];
  const durationOptions = filters?.durationOptions || [];
  const ratingOptions = filters?.ratingOptions || [];
  const categoryOptions = categories || [];

  const filterContentProps = {
    hasActiveFilters,
    clearAllFilters,
    expandedSections,
    toggleSection,
    selectedDestination,
    selectedCategory,
    selectedPriceRange,
    selectedDuration,
    selectedRating,
    handleFilterChange,
    destinations,
    categoryOptions,
    priceRanges,
    durationOptions,
    ratingOptions,
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {showMobileToggle && (
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setMobileOpen(true)}
            variant="outline"
            className="w-full gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </Button>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
        {(destinationsLoading || filtersLoading || categoriesLoading) && (
          <div className="animate-pulse space-y-3 mb-4">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        )}
            <FilterContent {...filterContentProps} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={cn("hidden lg:block", className)}>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h3>
            {(destinationsLoading || filtersLoading || categoriesLoading) && (
              <div className="animate-pulse space-y-3 mb-4">
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            )}
          <FilterContent {...filterContentProps} />
        </div>
      </aside>
    </>
  );
}
