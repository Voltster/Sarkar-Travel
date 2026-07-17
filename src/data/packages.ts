import { Package } from "@/types";

export const packages: Package[] = [

    {
        id: "1",
        slug: "dubai-family-holiday",
        title: "Family Holiday: 6 Nights in Dubai",
        price: 71634,
        originalPrice: 73634,
        discount: 3,
        reservePrice: 2000,
        badge: "Family Holiday",
        nights: 6,
        route: ["Dubai (3N)", "Al Awir (2N)", "Palm Jumeirah (1N)"],
        duration: "7 Days & 6 Nights",
        location: "Dubai",
        rating: 4.9,
        reviewsCount: 85,
        targetAudience: ["Families", "Couples"],
        tripPace: "Moderate",
        startCity: "Dubai",
        endCity: "Dubai",
        bestTimeToVisit: "November to March",
        hotelQuality: "4-Star Premium City Hotels",
        transportQuality: "Private AC Sedan/SUV",
        images: [
            "https://images.pexels.com/photos/13256066/pexels-photo-13256066.jpeg",
            "https://images.pexels.com/photos/29470806/pexels-photo-29470806.jpeg",
            "https://images.pexels.com/photos/33669490/pexels-photo-33669490.jpeg",
            "https://images.pexels.com/photos/4531669/pexels-photo-4531669.jpeg",
            "https://images.pexels.com/photos/1707213/pexels-photo-1707213.jpeg?auto=compress&cs=tinysrgb&w=1600",
        ],
        highlights: [
            "Burj Khalifa 124th Floor Ticket",
            "Desert Safari with BBQ Dinner",
            "Dubai Marina Dhow Cruise",
            "Miracle Garden Visit",
            "Stay in 4-Star Downtown Hotel"
        ],
        overview: "Discover the dazzling city of Dubai with this family-friendly package. Experience the world's tallest building, thrilling desert safaris, and luxury shopping, all while staying in premium accommodations.",
        whatsInside: [
            { icon: "hotel", title: "4 Star Hotel Stay" },
            { icon: "meal", title: "Daily Breakfast" },
            { icon: "transport", title: "Private Transfers" },
            { icon: "activity", title: "Burj Khalifa Entry" },
            { icon: "flight", title: "Visa Assistance" }
        ],
        knowBeforeYouGo: [
            "Passport validity must be at least 6 months.",
            "Dirham is the local currency.",
            "Dress modestly in public areas.",
            "Alcohol consumption is allowed only in licensed venues."
        ],
        itinerary: [
            { day: 1, title: "Arrival in Dubai", description: "Airport pickup and transfer to hotel. Dhow Cruise dinner in the evening.", stay: "4 Star Hotel", meals: ["Dinner"] },
            { day: 2, title: "Dubai City Tour & Burj Khalifa", description: "Half-day city tour followed by Burj Khalifa visit.", stay: "4 Star Hotel", meals: ["Breakfast"] },
            { day: 3, title: "Desert Safari", description: "Afternoon pickup for Desert Safari with BBQ dinner and entertainment.", stay: "4 Star Hotel", meals: ["Breakfast", "Dinner"] },
            { day: 4, title: "Abu Dhabi Day Trip", description: "Visit Sheikh Zayed Mosque and Ferrari World.", stay: "4 Star Hotel", meals: ["Breakfast"] },
            { day: 5, title: "Miracle Garden & Shopping", description: "Visit Miracle Garden and Global Village.", stay: "4 Star Hotel", meals: ["Breakfast"] },
            { day: 6, title: "Leisure Day", description: "Day free for shopping or optional activities.", stay: "4 Star Hotel", meals: ["Breakfast"] },
            { day: 7, title: "Departure", description: "Transfer to airport.", meals: ["Breakfast"] }
        ],
        inclusions: ["Visas", "Stay", "Transfers", "Sightseeing", "Breakfast"],
        exclusions: ["Flights", "Lunch", "Personal expenses"],
        policies: { cancellation: "Non-refundable booking fee.", refund: "Depends on airline policy." },
        reviews: [
            {
                id: "r1",
                author: "Sarah Jenkins",
                avatar: "https://images.pexels.com/photos/16892222/pexels-photo-16892222.jpeg",
                rating: 5,
                date: "Jan 2026",
                content: "The team prepares itinerary in such a way that forenoon sessions left for leisure. I wish arrange both sessions. Like Dubai tour and Burjkhalifa Morning and evening. Hotel - very good with breakfast Outdoor trips - Excellent Pick up drop - Super Cost - Normal Be sure that few of our request left unattended by the team when we are on tour. So get solved all our queries before commencement of tour.",
                images: ["https://images.pexels.com/photos/10866298/pexels-photo-10866298.jpeg",
                    "https://images.pexels.com/photos/14404276/pexels-photo-14404276.jpeg"
                ]
            },
            {
                id: "r2",
                author: "Rajesh Kumar",
                rating: 4,
                date: "Dec 2025",
                content: "We had a lovely very well organized tour of Dubai with pickyourtrail company Cars sent for pick up and drop were spotless and the drivers and tour guides very courteous Especially the tour guide for our Dubai city tour Mr Ali gave us a a detailed explanation of how the city started and is today Also the backend team was in constant touch with us to get our feedback on how the tour was progressing and if any concerns which was felt good about the ownership and accountability Mr Rahul and Mr Vignesh from the backend team thank you for your support Thank you team",
                images: ["https://images.pexels.com/photos/6898245/pexels-photo-6898245.jpeg"]
            },
            {
                id: "r3",
                author: "Priya & Amit",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60",
                rating: 5,
                date: "Nov 2025",
                content: "BHad a good time with pyt on our trip to dubai this year. From itneary to live chat pickyourtrail was smooth and easy. Had lots of fun and thanks to the whole team. Thanks to priyanka who initiated the call and helped us with preparing the documents and initial itneary. Special thanks to sharon vaz for customizing our trip and live chat team nitya nimmi , shreya menon and adityan for giving us the support needed throughout the trip. Kudos to the whole team. Cheers guys..",
            }
        ]
    },
    {
        id: "2",
        slug: "maldives-couple-escape",
        title: "Couple Escape: 6 Nights in Maldives",
        price: 80300,
        originalPrice: 85000,
        discount: 5,
        reservePrice: 2000,
        badge: "Couple Escape",
        nights: 6,
        route: ["Male (1N)", "Water Villa (4N)", "Male (1N)"],
        duration: "7 Days & 6 Nights",
        location: "Maldives",
        rating: 5.0,
        reviewsCount: 42,
        targetAudience: ["Couples", "Honeymooners"],
        tripPace: "Relaxed",
        startCity: "Male",
        endCity: "Male",
        bestTimeToVisit: "November to April",
        hotelQuality: "Luxury Water & Beach Villas",
        transportQuality: "Speedboat / Seaplane",
        images: [
            "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1600", // Water Villa
            "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1600", // Beach
            "https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=1600", // Blue Water
            "https://images.pexels.com/photos/2695231/pexels-photo-2695231.jpeg?auto=compress&cs=tinysrgb&w=1600", // Couple
            "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1600", // Sunset
        ],
        highlights: [
            "Stay in Overwater Villa",
            "Sunset Dolphin Cruise",
            "Candlelight Dinner on Beach",
            "Snorkeling Session",
            "Seaplane Transfer Included"
        ],
        overview: "Escape to paradise with your loved one. Crystal clear waters, white sandy beaches, and luxurious private villas await you in the Maldives.",
        whatsInside: [
            { icon: "hotel", title: "Water Villa Stay" },
            { icon: "meal", title: "All Inclusive Meal Plan" },
            { icon: "transport", title: "Speedboat/Seaplane" },
            { icon: "activity", title: "Water Sports" }
        ],
        knowBeforeYouGo: [
            "No visa required for Indians (Visa on Arrival).",
            "Alcohol is prohibited on local islands.",
            "Carry reef-safe sunscreen.",
            "USD is widely accepted."
        ],
        itinerary: [
            { day: 1, title: "Arrival in Male", description: "Transfer to resort via speedboat.", stay: "Beach Villa", meals: ["Dinner"] },
            { day: 2, title: "Leisure Day", description: "Explore item and water sports.", stay: "Beach Villa", meals: ["Breakfast", "Lunch", "Dinner"] },
            { day: 3, title: "Move to Water Villa", description: "Check-in to Overwater Villa.", stay: "Water Villa", meals: ["Breakfast", "Lunch", "Dinner"] },
            { day: 4, title: "Snorkeling & Spa", description: "Guided snorkeling and couple spa session.", stay: "Water Villa", meals: ["Breakfast", "Lunch", "Dinner"] },
            { day: 5, title: "Sunset Cruise", description: "Romantic sunset cruise with champagne.", stay: "Water Villa", meals: ["Breakfast", "Lunch", "Dinner"] },
            { day: 6, title: "Departure", description: "Transfer to airport.", meals: ["Breakfast"] }
        ],
        inclusions: ["All Meals", "Transfers", "Stay", "Green Tax"],
        exclusions: ["Flights", "Water sports not mentioned"],
        policies: { cancellation: "Free up to 15 days.", refund: "Processed within 7 days." },
        reviews: [
            {
                id: "r1",
                author: "Emily & David",
                avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&auto=format&fit=crop&q=60",
                rating: 5,
                date: "Feb 2026",
                content: "Maldives is paradise and this package made it affordable! The water villa experience is a must.",
                images: [
                    "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800",
                    "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800"
                ]
            },
            {
                id: "r2",
                author: "Michael T.",
                rating: 5,
                date: "Jan 2026",
                content: "Seamless transfers and excellent hospitality at the resort. The sunset cruise was the highlight of our trip.",
            }
        ]
    },
    {
        id: "3",
        slug: "vietnam-honeymoon",
        title: "Honeymoon Special: 5 Nights in Vietnam",
        price: 55000,
        originalPrice: 60000,
        discount: 8,
        reservePrice: 2000,
        badge: "Honeymoon Special",
        nights: 5,
        route: ["Hanoi (2N)", "Halong Bay (1N)", "Da Nang (2N)"],
        duration: "6 Days & 5 Nights",
        location: "Vietnam",
        rating: 4.7,
        reviewsCount: 30,
        targetAudience: ["Couples", "History Buffs"],
        tripPace: "Active",
        startCity: "Hanoi",
        endCity: "Da Nang",
        bestTimeToVisit: "February to April",
        hotelQuality: "4-Star Boutique Hotels",
        transportQuality: "Private Car & Internal Flights",
        images: [
            "https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/2357317/pexels-photo-2357317.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/10368595/pexels-photo-10368595.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/10565612/pexels-photo-10565612.jpeg?auto=compress&cs=tinysrgb&w=1600",
            "https://images.pexels.com/photos/5994384/pexels-photo-5994384.jpeg?auto=compress&cs=tinysrgb&w=1600",
        ],
        highlights: [
            "Cruise in Halong Bay",
            "Explore Ancient Town Hoi An",
            "Ba Na Hills & Golden Bridge",
            "Hanoi Street Food Tour",
            "Romantic Dinner Cruise"
        ],
        overview: "A romantic journey through the cultural heart of Vietnam. Cruise the emerald waters of Halong Bay and walk hand-in-hand through the lantern-lit streets of Hoi An.",
        whatsInside: [
            { icon: "hotel", title: "4 Star Hotels" },
            { icon: "meal", title: "Breakfast & Selected Meals" },
            { icon: "transport", title: "Private Car" },
            { icon: "activity", title: "Cruise & Tours" }
        ],
        knowBeforeYouGo: [
            "Visa required (E-Visa available).",
            "Tropical climate, pack accordingly.",
            "Try the local coffee!"
        ],
        itinerary: [
            { day: 1, title: "Arrival Hanoi", description: "Transfer to hotel.", stay: "Hanoi Hotel", meals: ["Dinner"] },
            // ...
            { day: 6, title: "Departure", description: "Fly back.", meals: ["Breakfast"] }
        ],
        inclusions: ["Stay", "Breakfast", "Tours", "Internal Flights"],
        exclusions: ["International Flights", "Visa"],
        policies: { cancellation: "Standard", refund: "Standard" },
        reviews: [
            {
                id: "r1",
                author: "Anjali Gupta",
                avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60",
                rating: 5,
                date: "Dec 2025",
                content: "Vietnam is beautiful! Halong Bay overnight cruise was magical. The guides spoke good English.",
                images: ["https://images.pexels.com/photos/2357317/pexels-photo-2357317.jpeg?auto=compress&cs=tinysrgb&w=800"]
            },
            {
                id: "r2",
                author: "Rohan M.",
                rating: 4,
                date: "Jan 2026",
                content: "Good value for money. Hotels were centrally located. Just wish we had more free time in Hoi An.",
            }
        ]
    },
    {
        id: "4",
        slug: "mountains-solo-trip",
        title: "Solo Trip: 3 Nights in Mountains",
        price: 15500,
        originalPrice: 20000,
        discount: 22,
        reservePrice: 500,
        badge: "Solo Trip",
        nights: 3,
        route: ["Manali (2N)", "Solang Valley (1N)"],
        duration: "4 Days & 3 Nights",
        location: "Himachal",
        rating: 4.6,
        reviewsCount: 18,
        targetAudience: ["Solo Travelers", "Youth", "Adventure Seekers"],
        tripPace: "Active",
        startCity: "Delhi (Volvo)",
        endCity: "Delhi",
        bestTimeToVisit: "March to June",
        hotelQuality: "Premium Hostels & Camps",
        transportQuality: "Volvo Bus & Local Cabs",
        images: [
            "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=800", // Mountains
            "https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg?auto=compress&cs=tinysrgb&w=800", // Hiking
            "https://images.pexels.com/photos/931224/pexels-photo-931224.jpeg?auto=compress&cs=tinysrgb&w=800", // Camping
        ],
        highlights: [
            "Trekking in Solang Valley",
            "Bonfire & Music Night",
            "River Rafting in Kullu",
            "Visit Hadimba Temple",
            "Cafe Hopping in Old Manali"
        ],
        overview: "Reconnect with yourself in the serene mountains of Himachal. This solo trip is designed for adventure, relaxation, and making new friends along the way.",
        whatsInside: [
            { icon: "hotel", title: "Backpacker Hostel" },
            { icon: "meal", title: "Breakfast & Dinner" },
            { icon: "transport", title: "Volvo Bus" },
            { icon: "activity", title: "Trekking & Rafting" }
        ],
        knowBeforeYouGo: [
            "Carry warm clothes even in summer.",
            "Network connectivity might be intermittent.",
            "Carry a power bank."
        ],
        itinerary: [
            { day: 1, title: "Arrival in Manali", description: "Check-in to hostel. Evening cafe hopping.", stay: "Zostel/Hostel", meals: ["Dinner"] },
            { day: 2, title: "Solang Valley Trek", description: "Day trek to Solang Valley.", stay: "Camping", meals: ["Breakfast", "Dinner"] },
            { day: 3, title: "River Rafting & Sightseeing", description: "Rafting in Kullu and local sightseeing.", stay: "Hostel", meals: ["Breakfast"] },
            { day: 4, title: "Departure", description: "Volvo bus back to Delhi.", meals: ["Breakfast"] }
        ],
        inclusions: ["Stay in Dorms", "Meals", "Bus Tickets", "Trek Guide"],
        exclusions: ["Lunch", "Personal Expenses"],
        policies: { cancellation: "Free up to 7 days.", refund: "Instant." },
        reviews: [
            {
                id: "r1",
                author: "Karan S.",
                rating: 5,
                date: "Jan 2026",
                content: "Perfect for solo travelers! Made so many friends at the hostel. The trek was beginner friendly.",
            },
            {
                id: "r2",
                author: "Neha Verma",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
                rating: 5,
                date: "Dec 2025",
                content: "Manali in winter is a dream. The camping experience near the river was chilly but unforgettable!",
                images: ["https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800"]
            }
        ]
    }
];
