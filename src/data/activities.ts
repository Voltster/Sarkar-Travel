import { CategoryItem, FAQ } from "@/types";

// Package Categories (unified category system for filtering and display)
export const packageCategories: CategoryItem[] = [
  {
    id: "family",
    slug: "family",
    name: "Family Holidays"
  },
  {
    id: "honeymoon",
    slug: "honeymoon",
    name: "Honeymoon Special"
  },
  {
    id: "adventure",
    slug: "adventure",
    name: "Adventure Tours"
  },
  {
    id: "luxury",
    slug: "luxury",
    name: "Luxury Escapes"
  },
  {
    id: "budget",
    slug: "budget",
    name: "Budget Friendly"
  },
  {
    id: "solo",
    slug: "solo",
    name: "Solo Trips"
  },
  {
    id: "beach",
    slug: "beach",
    name: "Beach & Island"
  },
  {
    id: "wildlife",
    slug: "wildlife",
    name: "Wildlife Safari"
  },
  {
    id: "cultural",
    slug: "cultural",
    name: "Cultural Tours"
  },
  {
    id: "pilgrimage",
    slug: "pilgrimage",
    name: "Pilgrimage"
  },
  {
    id: "group",
    slug: "group",
    name: "Group Tours"
  }
];

// FAQs
export const faqs: FAQ[] = [
  // Booking FAQs
  {
    id: "faq-1",
    question: "How do I book a package with Ananta Travels?",
    answer: "Booking is simple! Browse our packages, select your preferred one, and click 'Book Now' or 'Enquire'. You can also call us directly at +91-XXXXXXXXXX or fill out the enquiry form. Our travel experts will get back to you within 24 hours with a customized itinerary and quote.",
    category: "booking"
  },
  {
    id: "faq-2",
    question: "Can I customize a package according to my preferences?",
    answer: "Absolutely! All our packages are customizable. You can modify the duration, hotels, activities, and add-ons. Simply mention your preferences while enquiring, and our team will create a personalized itinerary for you at no extra cost.",
    category: "booking"
  },
  {
    id: "faq-3",
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 4-6 weeks in advance for domestic trips and 8-12 weeks for international trips. For peak seasons (like December-January or summer vacations), book 3-4 months ahead to ensure availability and best prices.",
    category: "booking"
  },

  // Payment FAQs
  {
    id: "faq-4",
    question: "What payment methods do you accept?",
    answer: "We accept multiple payment methods including: Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, UPI (Google Pay, PhonePe, Paytm), EMI options (0% EMI available on select cards), and Bank Transfers. International payments via wire transfer are also accepted.",
    category: "payment"
  },
  {
    id: "faq-5",
    question: "Can I pay in installments or EMI?",
    answer: "Yes! We offer flexible payment options including: Reserve now with just ₹2,000-5,000, Pay in 2-3 installments before travel date, and 0% EMI options on credit cards from HDFC, ICICI, SBI, and other major banks. Contact us for details on EMI tenure and applicable cards.",
    category: "payment"
  },
  {
    id: "faq-6",
    question: "Is my payment secure?",
    answer: "Absolutely. We use industry-standard SSL encryption and are PCI-DSS compliant. All card payments are processed through secure payment gateways like Razorpay and PayU. We never store your complete card details on our servers.",
    category: "payment"
  },

  // Cancellation FAQs
  {
    id: "faq-7",
    question: "What is your cancellation policy?",
    answer: "Our cancellation policy varies by package and timing: More than 30 days before travel: Full refund minus processing fee (5%), 15-30 days before: 50% refund, 7-14 days before: 25% refund, Less than 7 days: No refund (credit note may be issued). Some packages have different policies - please check the specific package details.",
    category: "cancellation"
  },
  {
    id: "faq-8",
    question: "Can I reschedule my trip instead of cancelling?",
    answer: "Yes, rescheduling is often possible subject to availability. Rescheduling more than 15 days before travel is usually free of charge. Closer to the date, there may be a nominal fee plus any fare/rate differences. Contact us immediately if you need to reschedule.",
    category: "cancellation"
  },
  {
    id: "faq-9",
    question: "What happens if Ananta Travels cancels my trip?",
    answer: "In the rare event we need to cancel (due to natural disasters, political unrest, etc.), you'll receive a full refund or the option to reschedule to a later date with priority booking. We also offer credit for future trips with additional benefits.",
    category: "cancellation"
  },

  // Visa FAQs
  {
    id: "faq-10",
    question: "Do you assist with visa applications?",
    answer: "Yes! We provide comprehensive visa assistance including: Document checklist, Application form filling guidance, Appointment scheduling (where applicable), Cover letter and travel itinerary, and Document verification. Visa fees are additional and payable directly to the embassy/VFS.",
    category: "visa"
  },
  {
    id: "faq-11",
    question: "Which destinations offer visa-free travel for Indians?",
    answer: "Several destinations offer visa-free or visa-on-arrival for Indian passport holders including: Maldives (30 days), Thailand (60 days), Indonesia/Bali (30 days), Mauritius (60 days), Seychelles (30 days), Sri Lanka (ETA required), and UAE (visa on arrival for select travelers). Note: Requirements may change - we'll confirm during booking.",
    category: "visa"
  },
  {
    id: "faq-12",
    question: "What if my visa gets rejected?",
    answer: "While we ensure proper documentation, visa decisions are at the embassy's discretion. If your visa is rejected: We'll help you reapply addressing the rejection reasons, Non-refundable components (like some flight tickets) may not be refundable, and We recommend travel insurance that covers visa rejection. Always apply early to have time for reapplication if needed.",
    category: "visa"
  },

  // Travel FAQs
  {
    id: "faq-13",
    question: "What's included in a typical package?",
    answer: "Most packages include: Accommodation as per itinerary, Meals as specified (typically breakfast), Airport/station transfers, Sightseeing as per itinerary, Local transport, and Basic travel insurance. Exclusions typically are: International/domestic flights (unless mentioned), Visa fees, Personal expenses, Tips, and Optional activities. Each package clearly lists what's included.",
    category: "travel"
  },
  {
    id: "faq-14",
    question: "Do you provide 24/7 support during the trip?",
    answer: "Yes! Every traveler gets: A dedicated trip coordinator's contact, 24/7 emergency helpline, WhatsApp support group, Local partner contacts at destination, and Pre-loaded emergency contacts in the destination country. We're always just a call away.",
    category: "travel"
  },
  {
    id: "faq-15",
    question: "What if I face issues during my trip?",
    answer: "Contact your trip coordinator immediately - they're available 24/7. We have local partners at all destinations who can assist on-ground within hours. Whether it's a hotel issue, missed connection, or emergency, we'll help resolve it quickly. That's the Ananta promise!",
    category: "travel"
  },

  // Package FAQs
  {
    id: "faq-16",
    question: "Are the prices shown per person or for the whole package?",
    answer: "Prices displayed are per person based on twin/double sharing. Single occupancy rooms cost extra (typically 30-50% more). Child prices vary by age - children under 5 are often free without extra bed, 5-11 years get discounted rates, and 12+ are charged as adults. Contact us for exact pricing.",
    category: "packages"
  },
  {
    id: "faq-17",
    question: "Can I travel with a group and get discounts?",
    answer: "Absolutely! Group discounts are available: 5-9 travelers: 5% discount, 10-19 travelers: 8% discount, and 20+ travelers: 10% discount + 1 free seat. We also offer customized group itineraries for corporate retreats, destination weddings, and large family trips.",
    category: "packages"
  },
  {
    id: "faq-18",
    question: "Do you offer honeymoon/anniversary special arrangements?",
    answer: "Yes! Our romantic packages include special touches like: Room decoration, Complimentary cake, Candlelight dinner, Couple spa sessions, Sunset cruises, and Photography sessions. Let us know you're celebrating, and we'll make it extra special!",
    category: "packages"
  },

  // General FAQs
  {
    id: "faq-19",
    question: "Why should I book with Ananta Travels instead of directly?",
    answer: "Great question! With Ananta you get: Better prices through our negotiated rates, 24/7 on-trip support (hotels don't offer this!), Hassle-free planning - we handle everything, Customization options, Package deals combining flights + hotels + activities, and Expert advice from people who've actually visited these places. Plus, if anything goes wrong, you have someone to call!",
    category: "general"
  },
  {
    id: "faq-20",
    question: "Is travel insurance included in packages?",
    answer: "Basic travel insurance is included in most international packages covering medical emergencies up to $10,000. We recommend upgrading to comprehensive insurance (₹500-2000) for coverage including: Higher medical limits ($50,000+), Trip cancellation, Lost baggage, Flight delays, and Adventure activities. We can arrange this for you.",
    category: "general"
  }
];

// Helper Functions
export function getActivityBySlug(slug: string): CategoryItem | undefined {
  return packageCategories.find(c => c.slug === slug);
}

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  return packageCategories.find(c => c.slug === slug);
}

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter(f => f.category === category);
}

export function getAllFAQCategories(): string[] {
  return [...new Set(faqs.map(f => f.category))];
}

export function searchFAQs(query: string): FAQ[] {
  const searchTerm = query.toLowerCase();
  return faqs.filter(f =>
    f.question.toLowerCase().includes(searchTerm) ||
    f.answer.toLowerCase().includes(searchTerm)
  );
}

// FAQ Categories
export const faqCategories = [
  { id: "booking", name: "Booking", slug: "booking" },
  { id: "payment", name: "Payment", slug: "payment" },
  { id: "cancellation", name: "Cancellation", slug: "cancellation" },
  { id: "visa", name: "Visa & Documents", slug: "visa" },
  { id: "travel", name: "Travel", slug: "travel" },
  { id: "packages", name: "Packages", slug: "packages" },
  { id: "general", name: "General", slug: "general" },
];

// Duration options for filtering
export const durationOptions = [
  { id: "1-3", label: "1-3 Days", min: 1, max: 3 },
  { id: "4-6", label: "4-6 Days", min: 4, max: 6 },
  { id: "7-10", label: "7-10 Days", min: 7, max: 10 },
  { id: "10+", label: "10+ Days", min: 10, max: 999 },
];

// Price ranges for filtering
export const priceRanges = [
  { id: "budget", label: "Under ₹30,000", min: 0, max: 30000 },
  { id: "mid", label: "₹30,000 - ₹60,000", min: 30000, max: 60000 },
  { id: "premium", label: "₹60,000 - ₹1,00,000", min: 60000, max: 100000 },
  { id: "luxury", label: "Above ₹1,00,000", min: 100000, max: 9999999 },
];

// Rating options for filtering
export const ratingOptions = [
  { id: "4.5+", label: "4.5+ Rating", min: 4.5 },
  { id: "4+", label: "4+ Rating", min: 4 },
  { id: "3.5+", label: "3.5+ Rating", min: 3.5 },
];

// Sort options
export const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "duration", label: "Duration" },
];
