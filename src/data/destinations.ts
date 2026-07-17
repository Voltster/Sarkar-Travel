import { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "dubai",
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    continent: "Asia",
    tagline: "Where Dreams Touch the Sky",
    description: "Dubai is a city of superlatives – home to the world's tallest building, largest shopping mall, and most luxurious hotels. This gleaming metropolis in the desert offers a unique blend of traditional Arabian culture and ultramodern architecture. From thrilling desert safaris to world-class shopping and dining, Dubai promises an unforgettable experience.",
    image: "https://images.pexels.com/photos/1534411/pexels-photo-1534411.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1534411/pexels-photo-1534411.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Burj Khalifa - World's tallest building",
      "Palm Jumeirah - Iconic man-made island",
      "Desert Safari with BBQ dinner",
      "Dubai Mall & Dubai Fountain",
      "Gold and Spice Souks"
    ],
    bestTimeToVisit: "November to March",
    currency: "UAE Dirham (AED)",
    language: "Arabic, English widely spoken",
    timezone: "GMT+4",
    visaRequired: true,
    visaInfo: "Indians can apply for visa on arrival or e-visa. Valid passport with 6 months validity required."
  },
  {
    id: "maldives",
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    continent: "Asia",
    tagline: "Paradise on Earth",
    description: "The Maldives is a tropical paradise like no other. With its crystal-clear turquoise waters, pristine white sandy beaches, and luxurious overwater villas, it's the ultimate destination for romance and relaxation. Each resort occupies its own private island, offering unparalleled privacy and world-class hospitality.",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Stay in iconic overwater villas",
      "World-class snorkeling and diving",
      "Romantic sunset dolphin cruises",
      "Underwater restaurants",
      "Private beach dining experiences"
    ],
    bestTimeToVisit: "November to April",
    currency: "Maldivian Rufiyaa (MVR), USD widely accepted",
    language: "Dhivehi, English widely spoken",
    timezone: "GMT+5",
    visaRequired: false,
    visaInfo: "Indians get 30-day visa on arrival. Valid passport required."
  },
  {
    id: "vietnam",
    slug: "vietnam",
    name: "Vietnam",
    country: "Vietnam",
    continent: "Asia",
    tagline: "Timeless Charm",
    description: "Vietnam captivates visitors with its stunning natural beauty, rich history, and vibrant culture. From the emerald waters of Halong Bay to the ancient streets of Hoi An, and the bustling energy of Ho Chi Minh City, Vietnam offers an incredible diversity of experiences. The cuisine alone is worth the journey!",
    image: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Halong Bay cruise among limestone karsts",
      "Ancient town of Hoi An with lantern-lit streets",
      "Cu Chi Tunnels historical experience",
      "Vietnamese coffee and street food culture",
      "Golden Bridge at Ba Na Hills"
    ],
    bestTimeToVisit: "February to April, August to October",
    currency: "Vietnamese Dong (VND)",
    language: "Vietnamese, English in tourist areas",
    timezone: "GMT+7",
    visaRequired: true,
    visaInfo: "E-visa available for Indians. 30-day single entry visa can be obtained online."
  },
  {
    id: "bali",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    tagline: "Island of the Gods",
    description: "Bali is a magical island that seamlessly blends spirituality, natural beauty, and vibrant culture. From ancient temples perched on clifftops to terraced rice paddies, pristine beaches, and world-class wellness retreats, Bali offers something for every traveler. The warm Balinese hospitality makes every visitor feel like family.",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Iconic Gates of Heaven at Lempuyang Temple",
      "Ubud's rice terraces and art villages",
      "Sunset at Tanah Lot Temple",
      "World-class surfing at Uluwatu",
      "Balinese spa and wellness experiences"
    ],
    bestTimeToVisit: "April to October",
    currency: "Indonesian Rupiah (IDR)",
    language: "Balinese, Indonesian, English widely spoken",
    timezone: "GMT+8",
    visaRequired: false,
    visaInfo: "Indians get 30-day visa on arrival for tourism purposes."
  },
  {
    id: "thailand",
    slug: "thailand",
    name: "Thailand",
    country: "Thailand",
    continent: "Asia",
    tagline: "Land of Smiles",
    description: "Thailand is a feast for the senses – from the ornate temples of Bangkok to the pristine beaches of Phuket and Krabi, the mountainous north around Chiang Mai, and the legendary nightlife. Thai cuisine, warm hospitality, and incredible value make it one of the world's most beloved destinations.",
    image: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Grand Palace and Wat Phra Kaew in Bangkok",
      "Island hopping in Phuket and Phi Phi",
      "Elephant sanctuaries in Chiang Mai",
      "Floating markets experience",
      "World-famous Thai street food"
    ],
    bestTimeToVisit: "November to February",
    currency: "Thai Baht (THB)",
    language: "Thai, English in tourist areas",
    timezone: "GMT+7",
    visaRequired: false,
    visaInfo: "Indians get visa exemption for 60 days for tourism."
  },
  {
    id: "japan",
    slug: "japan",
    name: "Japan",
    country: "Japan",
    continent: "Asia",
    tagline: "Where Tradition Meets Tomorrow",
    description: "Japan is a fascinating juxtaposition of ancient traditions and cutting-edge modernity. From the serene temples of Kyoto to the neon-lit streets of Tokyo, the iconic Mount Fuji to the deer of Nara, Japan offers experiences found nowhere else on Earth. The cherry blossom season transforms the country into a pink wonderland.",
    image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Cherry blossom viewing (Hanami)",
      "Traditional Geisha district in Kyoto",
      "Mount Fuji views and climbing",
      "Bullet train (Shinkansen) experience",
      "Unique Japanese cuisine and ramen culture"
    ],
    bestTimeToVisit: "March to May, September to November",
    currency: "Japanese Yen (JPY)",
    language: "Japanese, limited English",
    timezone: "GMT+9",
    visaRequired: true,
    visaInfo: "Indians need a tourist visa. Apply through VFS with proper documentation."
  },
  {
    id: "switzerland",
    slug: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    continent: "Europe",
    tagline: "Heaven on Earth",
    description: "Switzerland is nature's masterpiece – majestic Alps, pristine lakes, charming villages, and world-class chocolate and cheese. Whether you're skiing in Zermatt, exploring Interlaken, or taking a scenic train through the mountains, Switzerland offers breathtaking beauty at every turn. It's pure magic in every season.",
    image: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Scenic train rides - Glacier Express & Bernina",
      "Matterhorn views from Zermatt",
      "Jungfraujoch - Top of Europe",
      "Lucerne's Chapel Bridge",
      "Swiss chocolate and cheese tastings"
    ],
    bestTimeToVisit: "June to September for hiking, December to March for skiing",
    currency: "Swiss Franc (CHF)",
    language: "German, French, Italian, Romansh",
    timezone: "GMT+1 (GMT+2 in summer)",
    visaRequired: true,
    visaInfo: "Schengen visa required for Indians. Apply well in advance."
  },
  {
    id: "himachal",
    slug: "himachal",
    name: "Himachal Pradesh",
    country: "India",
    continent: "Asia",
    tagline: "Land of the Gods",
    description: "Himachal Pradesh is a Himalayan wonderland of snow-capped peaks, lush valleys, ancient temples, and charming hill stations. From the adventure capital Manali to spiritual Dharamshala, the British-era charm of Shimla, and the hippie haven of Kasol, Himachal offers diverse experiences for every traveler.",
    image: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Rohtang Pass and Solang Valley adventures",
      "Trekking in Parvati Valley",
      "Dalai Lama's residence in Dharamshala",
      "Mall Road shopping in Shimla",
      "River rafting in Kullu"
    ],
    bestTimeToVisit: "March to June, September to November",
    currency: "Indian Rupee (INR)",
    language: "Hindi, Pahari",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "new-delhi",
    slug: "new-delhi",
    name: "New Delhi",
    country: "India",
    continent: "Asia",
    tagline: "Heart of India",
    description: "New Delhi, the capital of India, is an eclectic mix of history and modernity. From the Mughal-era Red Fort and Jama Masjid to the colonial grandeur of Lutyens' Delhi and the bustling markets of Chandni Chowk, Delhi offers a sensory overload of culture, food, and heritage.",
    image: "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1542620/pexels-photo-1542620.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Visit India Gate and Rashtrapati Bhavan",
      "Explore Qutub Minar complex",
      "Shop at Chandni Chowk and Khan Market",
      "Experience spiritual peace at Lotus Temple",
      "Taste authentic North Indian cuisine"
    ],
    bestTimeToVisit: "October to March",
    currency: "Indian Rupee (INR)",
    language: "Hindi, English, Punjabi",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "mumbai",
    slug: "mumbai",
    name: "Mumbai",
    country: "India",
    continent: "Asia",
    tagline: "The City of Dreams",
    description: "Mumbai, formerly Bombay, is India's financial powerhouse and fashion capital. It's a city of contrasts, where Victorian architecture stands beside skyscrapers, and glamour coexists with grit. From the iconic Gateway of India to the bustling Marine Drive, Mumbai never sleeps.",
    image: "https://images.pexels.com/photos/2574636/pexels-photo-2574636.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/2574636/pexels-photo-2574636.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Walk along Marine Drive at sunset",
      "Visit the Gateway of India",
      "Take a ferry to Elephanta Caves",
      "Explore Colaba Causeway",
      "Taste authentic Mumbai street food (Vada Pav)"
    ],
    bestTimeToVisit: "November to February",
    currency: "Indian Rupee (INR)",
    language: "Marathi, Hindi, English",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "goa",
    slug: "goa",
    name: "Goa",
    country: "India",
    continent: "Asia",
    tagline: "Sun, Sand, and Sea",
    description: "Goa is India's pocket-sized paradise, famous for its beaches, Portuguese heritage, and laid-back vibe. Whether you want to party in North Goa, relax in South Goa, or explore spice plantations and waterfalls, Goa has it all.",
    image: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg",
    heroImage: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Beach hopping in North and South Goa",
      "Visit Basilica of Bom Jesus",
      "Water sports at Calangute and Baga",
      "Dudhsagar Waterfalls trek",
      "Cruising on the Mandovi River"
    ],
    bestTimeToVisit: "November to March",
    currency: "Indian Rupee (INR)",
    language: "Konkani, English, Hindi",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "chennai",
    slug: "chennai",
    name: "Chennai",
    country: "India",
    continent: "Asia",
    tagline: "Gateway to South India",
    description: "Chennai, formerly Madras, is a city where tradition meets technology. Famous for its Marina Beach, ancient temples, classic music and dance festivals, and filtered coffee, it serves as the cultural capital of South India.",
    image: "https://images.pexels.com/photos/18625307/pexels-photo-18625307.jpeg",
    heroImage: "https://images.pexels.com/photos/18625307/pexels-photo-18625307.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Sunrise at Marina Beach",
      "Kapaleeshwarar Temple",
      "Mahabalipuram shore temples",
      "Santhome Cathedral",
      "Authentic South Indian thali"
    ],
    bestTimeToVisit: "November to February",
    currency: "Indian Rupee (INR)",
    language: "Tamil, English",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "kolkata",
    slug: "kolkata",
    name: "Kolkata",
    country: "India",
    continent: "Asia",
    tagline: "City of Joy",
    description: "Kolkata is a city with a soul. Known for its colonial architecture, art galleries, literary heritage, and grand festivals like Durga Puja, it's a place where time seems to slow down. The food, from street rolls to sweets, is legendary.",
    image: "https://images.pexels.com/photos/3520942/pexels-photo-3520942.jpeg",
    heroImage: "https://images.pexels.com/photos/3520942/pexels-photo-3520942.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Victoria Memorial",
      "Howrah Bridge",
      "Dakshineswar Kali Temple",
      "Tram ride through the city",
      "Sweets (Rasgulla and Sandesh)"
    ],
    bestTimeToVisit: "October to March",
    currency: "Indian Rupee (INR)",
    language: "Bengali, English, Hindi",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "hyderabad",
    slug: "hyderabad",
    name: "Hyderabad",
    country: "India",
    continent: "Asia",
    tagline: "City of Pearls",
    description: "Hyderabad offers a fascinating blend of history and technology. Known for its pearls, IT hubs, and the world-famous Hyderabadi Biryani, the city is home to grand monuments like Charminar and Golconda Fort.",
    image: "https://images.pexels.com/photos/720726/pexels-photo-720726.jpeg",
    heroImage: "https://images.pexels.com/photos/720726/pexels-photo-720726.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Charminar",
      "Golconda Fort",
      "Ramoji Film City",
      "Hussain Sagar Lake",
      "Hyderabadi Biryani"
    ],
    bestTimeToVisit: "October to February",
    currency: "Indian Rupee (INR)",
    language: "Telugu, Urdu, English",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "rishikesh",
    slug: "rishikesh",
    name: "Rishikesh",
    country: "India",
    continent: "Asia",
    tagline: "Yoga Capital of the World",
    description: "Located in the foothills of the Himalayas beside the Ganges River, Rishikesh is renowned for its yoga schools, ashrams, and adventure sports. It's a place where spirituality meets adrenaline.",
    image: "https://images.pexels.com/photos/20035455/pexels-photo-20035455.jpeg",
    heroImage: "https://images.pexels.com/photos/20035455/pexels-photo-20035455.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "White Water Rafting on Ganges",
      "Attend Ganga Aarti at Parmarth Niketan",
      "Yoga and Meditation sessions",
      "Visit Beatles Ashram",
      "Bungee Jumping"
    ],
    bestTimeToVisit: "September to June",
    currency: "Indian Rupee (INR)",
    language: "Hindi, English",
    timezone: "GMT+5:30",
    visaRequired: false,
    visaInfo: "No visa required for Indian citizens."
  },
  {
    id: "malaysia",
    slug: "malaysia",
    name: "Malaysia",
    country: "Malaysia",
    continent: "Asia",
    tagline: "Truly Asia",
    description: "Malaysia is a bubbling, bustling melting pot of races and religions where Malays, Indians, Chinese and many other ethnic groups live together in peace and harmony. From the towering Petronas Towers in Kuala Lumpur to the pristine beaches of Langkawi and the cool highlands of Cameron, Malaysia offers a diverse travel experience.",
    image: "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Petronas Twin Towers in KL",
      "Batu Caves",
      "Langkawi Cable Car",
      "Street food in Penang",
      "Tea plantations in Cameron Highlands"
    ],
    bestTimeToVisit: "December to February, June to August",
    currency: "Malaysian Ringgit (MYR)",
    language: "Malay, English",
    timezone: "GMT+8",
    visaRequired: false,
    visaInfo: "Visa-free entry for Indian citizens for up to 30 days (until Dec 2024)."
  },
  {
    id: "seychelles",
    slug: "seychelles",
    name: "Seychelles",
    country: "Seychelles",
    continent: "Africa",
    tagline: "Another World",
    description: "Seychelles is an archipelago of 115 islands in the Indian Ocean, home to rare animals, such as giant Aldabra tortoises. Known for its white-sand beaches, coral reefs, and nature reserves, it's a dream destination for honeymooners and nature lovers.",
    image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/5074116/pexels-photo-5074116.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Anse Source d'Argent (La Digue)",
      "Vallee de Mai Nature Reserve",
      "Curieuse Island Giant Tortoises",
      "Snorkeling and Diving",
      "Beau Vallon Beach"
    ],
    bestTimeToVisit: "April to May, October to November",
    currency: "Seychellois Rupee (SCR)",
    language: "Seychellois Creole, English, French",
    timezone: "GMT+4",
    visaRequired: false,
    visaInfo: "Visa-free access for all nationalities. Visitor's permit issued on arrival."
  },
  {
    id: "mauritius",
    slug: "mauritius",
    name: "Mauritius",
    country: "Mauritius",
    continent: "Africa",
    tagline: "The Star and Key of the Indian Ocean",
    description: "Mauritius is famous for its Sapphire waters, powder-white beaches and luxury resorts. But there’s so much more attraction to Mauritius than the beach, including hiking in the forested and mountainous interior and world-class diving and snorkeling.",
    image: "https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/3355788/pexels-photo-3355788.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Seven Colored Earths of Chamarel",
      "Ile aux Cerfs Island",
      "Le Morne Brabant (UNESCO Site)",
      "Black River Gorges National Park",
      "Port Louis Central Market"
    ],
    bestTimeToVisit: "May to December",
    currency: "Mauritian Rupee (MUR)",
    language: "English, French, Creole",
    timezone: "GMT+4",
    visaRequired: false,
    visaInfo: "Visa-free entry for Indian citizens. Visa on arrival available for many."
  },
  {
    id: "finland",
    slug: "finland",
    name: "Finland",
    country: "Finland",
    continent: "Europe",
    tagline: "Land of a Thousand Lakes",
    description: "Finland is a magical winter wonderland and the official home of Santa Claus. Famous for the mesmerizing Northern Lights (Aurora Borealis), pristine snowy landscapes, and unique glass igloos, it offers a once-in-a-lifetime Arctic experience. From husky safaris to sauna culture, Finland is truly enchanting.",
    image: "https://images.pexels.com/photos/640947/pexels-photo-640947.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/640947/pexels-photo-640947.jpeg?auto=compress&cs=tinysrgb&w=1600",
    highlights: [
      "Witness the magical Northern Lights (Aurora Borealis)",
      "Visit Santa Claus Village in Rovaniemi",
      "Stay in a glass igloo under the stars",
      "Husky and Reindeer sleigh rides",
      "Traditional Finnish Sauna experience"
    ],
    bestTimeToVisit: "December to March for Northern Lights, June to August for Midnight Sun",
    currency: "Euro (€)",
    language: "Finnish, Swedish, English widely spoken",
    timezone: "GMT+2 (GMT+3 in summer)",
    visaRequired: true,
    visaInfo: "Schengen visa required for Indians. Apply well in advance."
  }
];

// Helper functions
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getDestinationsByContinent(continent: Destination["continent"]): Destination[] {
  return destinations.filter(d => d.continent === continent);
}

export function getFeaturedDestinations(limit: number = 6): Destination[] {
  return destinations.slice(0, limit);
}

export function searchDestinations(query: string): Destination[] {
  const searchTerm = query.toLowerCase();
  return destinations.filter(d =>
    d.name.toLowerCase().includes(searchTerm) ||
    d.country.toLowerCase().includes(searchTerm) ||
    d.tagline.toLowerCase().includes(searchTerm)
  );
}
