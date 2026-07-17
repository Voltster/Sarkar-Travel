// ============================================
// CORE TYPES FOR ANANTA TRAVELS
// ============================================

// Package Types
export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  images?: string[];
  location?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  stay?: string;
}

export interface StayInfo {
  hotelName?: string;
  hotelCategory?: string;
  roomType?: string;
  mealPlan?: string;
  location?: string;
  image?: string;
}

export interface WhatsInsideItem {
  icon: "hotel" | "meal" | "transport" | "activity" | "flight";
  title: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  duration: string;
  location: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  highlights?: string[];
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  reviews: Review[];
  policies?: {
    use_global_policies?: boolean;
    booking_policy?: string;
    cancellation_policy?: string;
    refund_policy?: string;
    important_notes?: string[];
    cancellation?: string;
    refund?: string;
  };
  whatsInside: WhatsInsideItem[];
  knowBeforeYouGo: string[];
  reservePrice?: number;
  badge?: string;
  nights?: number;
  route?: string[];
  targetAudience?: string[];
  tripPace?: "Relaxed" | "Moderate" | "Active" | "Fast-paced";
  startCity?: string;
  endCity?: string;
  bestTimeToVisit?: string;
  hotelQuality?: string;
  transportQuality?: string;
  category?: string;
  destinationId?: string;
  featured?: boolean;
  isSeasonal?: boolean;
  // Package-level Stay Information
  stayInfo?: StayInfo | null;
  faqs?: { question: string; answer: string }[];
}

export interface QuickInfoField {
  id: string;
  label: string;
  icon: string;
  value: string;
  color?: string;
}

// Destination Types
export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  continent: "Asia" | "Europe" | "Africa" | "North America" | "South America" | "Oceania" | "Antarctica";
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  gallery?: string[];
  highlights: string[];
  bestTimeToVisit: string;
  quickInfo?: QuickInfoField[];
  currency?: string;
  language?: string;
  timezone?: string;
  visaRequired?: boolean;
  visaInfo?: string;
  averageBudget?: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  topAttractions?: {
    name: string;
    description: string;
    image: string;
  }[];
  travelTips?: string[];
  weather?: {
    summer: string;
    winter: string;
    monsoon?: string;
  };
  packagesCount?: number;
}

// Category Types
export type PackageCategory =
  | "family"
  | "honeymoon"
  | "adventure"
  | "luxury"
  | "budget"
  | "solo"
  | "group"
  | "pilgrimage"
  | "beach"
  | "mountain"
  | "wildlife"
  | "cultural";

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  relatedPackages?: string[];
  relatedDestinations?: string[];
}

export type BlogCategory =
  | "travel-tips"
  | "destination-guide"
  | "travel-stories"
  | "budget-travel"
  | "luxury-travel"
  | "adventure"
  | "food-culture"
  | "packing-tips";

// Testimonial Types
export interface Testimonial {
  id: string;
  customerName?: string;
  rating: number;
  shortReview?: string;
  packageId?: any; // Can be string or populated package object { id, title, slug }
  featured?: boolean;
  city?: string;
  travelMonth?: string;

  // Legacy/Fallback fields for backward compatibility
  author?: string;
  avatar?: string;
  location?: string;
  content?: string;
  packageName?: string;
  packageSlug?: string;
  destination?: string;
  travelDate?: string;
  images?: string[];
}

// Activity Types
export interface Activity {
  id: string;
  slug: string;
  name: string;
}

// Partner Types
export interface Partner {
  id: string;
  slug: string;
  name: string;
  image: string;
  heroImage?: string;
  description?: string;
  longDescription?: string[];
  gallery?: string[];
  website?: string;
  logo?: string;
}

// FAQ Types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | "booking"
  | "payment"
  | "cancellation"
  | "visa"
  | "travel"
  | "packages"
  | "general";

// Filter Types
export interface PackageFilters {
  destination?: string;
  category?: PackageCategory;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  rating?: number;
  sortBy?: "price-low" | "price-high" | "rating" | "popular" | "duration";
}

// Search Types
export interface SearchResult {
  packages: Package[];
  destinations: Destination[];
  blogs: BlogPost[];
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  packageInterest?: string;
}

export interface EnquiryForm {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  travelDate: string;
  travelers: number;
  message?: string;
}

export interface FlightInquiryForm {
  customerName: string;
  email: string;
  phone: string;
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate?: string;
  cabinClass: string;
  passengers: number;
  preferredAirline?: string;
}

export interface FlightInquiryPayload {
  tenantId: string;
  inquiryType: "flight";
  customerName: string;
  phone: string;
  additionalFields: {
    fromCity: string;
    toCity: string;
    departureDate: string;
    returnDate: string | null;
    cabinClass: string;
    passengers: number;
    preferredAirline: string | null;
  };
}

// UI Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Hotel {
  id: string;
  _id?: string;
  name: string;
  destinationId: {
    id: string;
    _id?: string;
    name: string;
    slug: string;
  } | string;
  location: string;
  propertyType: string;
  starRating: string;
  defaultRoomTypes: any[];
  defaultMealPlans: string[];
  description?: string;
  startingPrice: number;
  priceUnit: "Per Night" | "Per Room" | "Per Person";
  coverImage?: {
    url: string;
    alt?: string;
  };
  images?: {
    url: string;
    alt?: string;
  }[];
}

