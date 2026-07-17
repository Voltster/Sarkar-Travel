/**
 * Image Placeholder Configuration
 * 
 * This file provides utilities for handling placeholder images
 * during development before real images are added.
 */

export const PLACEHOLDER_CONFIG = {
  // Base URL for placeholder service (optional)
  placeholderService: "https://placehold.co",
  
  // Default dimensions
  defaultWidth: 800,
  defaultHeight: 600,
  
  // Image categories with specific dimensions
  destinations: {
    width: 800,
    height: 600,
    fallbackColor: "e74c3c", // Red theme color
  },
  
  testimonials: {
    width: 400,
    height: 400,
    fallbackColor: "3498db",
  },
  
  hero: {
    width: 400,
    height: 300,
    fallbackColor: "2ecc71",
  },
};

/**
 * Generate a placeholder image URL
 * @param category - Category from PLACEHOLDER_CONFIG
 * @param text - Optional text to display on placeholder
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(
  category: keyof typeof PLACEHOLDER_CONFIG,
  text?: string
): string {
  if (typeof category === "string" && category in PLACEHOLDER_CONFIG) {
    const config = PLACEHOLDER_CONFIG[category as keyof typeof PLACEHOLDER_CONFIG];
    if (typeof config === "object" && "width" in config) {
      const { width, height, fallbackColor } = config;
      const displayText = text || category;
      return `${PLACEHOLDER_CONFIG.placeholderService}/${width}x${height}/${fallbackColor}/white?text=${encodeURIComponent(displayText)}`;
    }
  }
  return `${PLACEHOLDER_CONFIG.placeholderService}/${PLACEHOLDER_CONFIG.defaultWidth}x${PLACEHOLDER_CONFIG.defaultHeight}/cccccc/333?text=${encodeURIComponent(text || "Image")}`;
}

/**
 * Get image source with fallback to placeholder
 * @param path - Image path from public directory
 * @param fallbackCategory - Category for placeholder fallback
 * @param fallbackText - Text for placeholder
 * @returns Image path or placeholder URL
 */
export function getImageSrc(
  path: string,
  fallbackCategory?: keyof typeof PLACEHOLDER_CONFIG,
  fallbackText?: string
): string {
  // In production, you might want to check if image exists
  // For now, we'll use the path as-is
  return path;
  
  // Uncomment below to use placeholders during development:
  // return fallbackCategory 
  //   ? getPlaceholderUrl(fallbackCategory, fallbackText)
  //   : path;
}

// Export image paths for easy reference
export const IMAGE_PATHS = {
  destinations: {
    dubai: "/images/dubai.jpg",
    maldives: "/images/maldives.jpg",
    singapore: "/images/singapore.jpg",
    vietnam: "/images/vietnam.jpg",
    bali: "/images/bali.jpg",
    bali2: "/images/bali-2.jpg",
    korea: "/images/korea.jpg",
    malaysia: "/images/malaysia.jpg",
    india: "/images/india.jpg",
    china: "/images/china.jpg",
    australia: "/images/australia.jpg",
    austria: "/images/austria.jpg",
    japan: "/images/japan.jpg",
  },
  testimonials: {
    person1: "/images/testimonial-1.jpg",
    person2: "/images/testimonial-2.jpg",
    person3: "/images/testimonial-3.jpg",
  },
  hero: {
    dest1: "/images/dest-1.jpg",
    dest2: "/images/dest-2.jpg",
    dest3: "/images/dest-3.jpg",
    dest4: "/images/dest-4.jpg",
    dest5: "/images/dest-5.jpg",
    dest6: "/images/dest-6.jpg",
  },
};
